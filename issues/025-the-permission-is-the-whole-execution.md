---
title: "The Permission Is the Whole Execution"
date: "August 10, 2026"
authors: ["Piper"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-25#h-the-permission-is-the-whole-execution"
---

A permission that validates the function call but ignores where the call goes, how much native value travels with it, or which state bucket records it is not narrow authority—it is a partially checked transaction.

## Context

Four recent pull requests against MetaMask's Delegation Framework expose different versions of the same design problem.

[PR #199](https://github.com/MetaMask/delegation-framework/pull/199) reports that `ExactCalldataBatchEnforcer` decoded each authorized execution as a complete object—target, native value, and calldata—but compared only the calldata at redemption. A delegate could therefore take the exact bytes approved for an ERC-20 transfer and send them to a different token contract. Because common token contracts share the same function selectors and argument encoding, byte-for-byte agreement on calldata does not identify the asset being moved. The same gap also allowed native ETH to accompany the call even when the approved execution specified none.

[PR #195](https://github.com/MetaMask/delegation-framework/pull/195) and [PR #197](https://github.com/MetaMask/delegation-framework/pull/197) describe a related native-value channel. Several enforcers intended for token transfers, token streams, and ownership transfers decoded the execution target and calldata while discarding its `value` field. The delegator's account ultimately performs a call equivalent to:

```solidity
target.call{value: value}(callData)
```

If the matching selector is payable, a permission described as “token only” can carry ETH alongside the token action. Standard ERC-20 `transfer` functions are ordinarily non-payable, but wrappers, proxies, fee-splitting contracts, or deliberately compatible contracts can expose payable functions with the same selector.

[PR #194](https://github.com/MetaMask/delegation-framework/pull/194) moves the problem from transaction fields to state. Alternative branches inside `LogicalOrWrapperEnforcer` forwarded the same delegation hash to stateful sub-enforcers. Two branches that appeared to have independent call limits or periodic budgets could therefore write into the same accounting namespace. Each branch could be locally correct while their composition produced premature budget exhaustion or shared initialization state.

None of these reports describes a known exploit, and all four patches were still open when the research was collected. But together they offer a useful lesson for every system implementing [ERC-7710](https://eips.ethereum.org/EIPS/eip-7710)-style authority: the security boundary is not the label attached to a caveat. It is every field and every state transition that the execution path actually consumes.

## Analysis

The natural unit of authorization is an execution tuple:

```text
(target, value, calldata, mode, state namespace, delegation chain)
```

Depending on the application, that tuple may also need to bind a chain, nonce, recipient, expected balance change, price limit, or authenticated external fact. The point is not that every grant must constrain every conceivable property. It is that an unconstrained property remains authority, whether the user interface mentions it or not.

The target is the clearest example. Calldata answers which selector and arguments will be presented to a contract. It does not answer which contract gets to interpret them. The bytes for `transfer(Bob, 100)` can be identical across USDC, an unrelated token, and a malicious contract designed to accept that selector. Calling a permission “exact calldata” invites users and integrators to read “exact” as a statement about the effect. It is only a statement about one component of the input.

Native value is an even quieter channel because developers often infer its safety from the ABI. If a familiar function is non-payable, sending ETH normally reverts. That is a useful property of the target implementation, but it is not a substitute for authorization. A delegation should not rely on every possible target preserving the mutability declared by one canonical interface. If the intended permission carries no native value, the enforcer should require `value == 0`. MetaMask's current Smart Accounts Kit follows that principle for function-call scopes by defaulting native value to zero unless a `valueLte` constraint explicitly allows it.

PR #194 shows why checking the visible execution fields is still not sufficient. Stateful caveats—limited calls, streams, periodic budgets—need a stable identity for their counters. Logical composition creates a naming problem: should two alternative branches share one budget or receive separate budgets? Either behavior can be valid, but it must be deliberate. Namespacing state by both delegation identity and branch index makes independence explicit. If a shared budget is desired, it can be modeled as one common constraint instead of emerging accidentally from a hash collision in the policy structure.

This gives builders three practical rules.

First, define permissions from effects backward. “Transfer up to 100 USDC” implies at least a token target, selector, amount bound, recipient policy, and zero native value. In adversarial testing, vary each field independently while keeping the others valid. Swap the target. Add one wei. Reorder a batch. Reuse a branch under a different index. A complete test matrix is more valuable than a long list of happy-path examples.

Second, treat combinators as security-critical code. `AND`, `OR`, batching, and redelegation do more than connect individually safe checks. They define how restrictions accumulate, how state is keyed, and whether the association between an approved batch position and its destination survives decoding. Composition needs its own invariants and integration tests.

Third, make product language match the enforced object. If an enforcer validates only calldata, call it “calldata match,” not “exact execution.” If the permission binds target, value, and calldata, expose those fields in the review surface. Users cannot meaningfully approve a narrow mandate when the interface compresses several independent powers into a reassuring label.

ERC-7710's central promise is that authority can be delegated without transferring the root key. That promise becomes useful only when attenuation is semantic, not cosmetic. The delegate must receive less power in the actual execution environment, not merely a more specific description of power in the signing flow.

**The Caveat:** These findings are self-reported in open pull requests, not evidence of a production exploit or a completed independent audit. The native-value cases also depend on a payable target exposing the expected selector; conventional token implementations normally reject the call. PR #194's concrete failure mode is interfering budgets and premature exhaustion, not an obvious way to exceed the combined limit. Still, those qualifications narrow the immediate impact more than the design lesson. The terms already contained fields that enforcement ignored, and documented logical branches did not receive the state independence integrators could reasonably expect. Least authority is a property of the complete redemption path. Audits, tests, SDK defaults, and permission UX all need to evaluate that same path.

