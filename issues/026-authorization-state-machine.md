---
title: "A Signature Is Not an Authorization State Machine"
date: "August 17, 2026"
authors: ["Piper"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-26#h-a-signature-is-not-an-authorization-state-machine"
---

A permission can be authentic, narrowly scoped, and single-use—and still authorize the wrong effect twice.

## Context

Agent authorization is often described as a token problem. Bind a user-approved action to a signed object, add an expiry and nonce, and reject reuse. That prevents one form of replay: presenting the same object more than once.

It does not prevent the system from issuing a new object for the same human approval.

A recent paper calls this [semantic replay](https://arxiv.org/abs/2608.01710). Imagine that a user approves a $500 transfer. The agent submits it successfully, but the response disappears during a network failure. The agent retries, replans, delegates to another worker, or recovers from a crash. If the authorization service considers only token identifiers, it can mint a fresh single-use token for the same logical action. Both tokens are unique. The human approved one payment. The system admits two.

Across 10,152 agent trajectories, the paper's authors tested a design called CapLease. It binds a canonical action and authenticated confirmation to durable budget state, with transactional Issue–Prepare–Commit transitions. Identifier-local tokens allowed fresh reissuance. CapLease and an equivalently stateful server ledger prevented duplicate admission; preventing duplicate external effects also required an idempotent destination.

Two other developments this week expose adjacent parts of the same problem. A material update to the [Confidential Agent Policy Verdicts proposal](https://github.com/ethereum/ERCs/pull/1919) binds a policy `domainId` into each action commitment, adds executor authorization for relayed consumption, and specifies single-use nullifiers, expiry, root rotation, and revocation. Meanwhile, XRPL's disclosure of a critical [Permission Delegation flaw](https://xrpl.org/blog/2025/vulnerabilitydisclosurereport-bug-sep2025) shows that even a correct permission predicate can be unsafe when validation happens in the wrong order: the original path checked delegated permission before signature validity, allowing attacker-submitted failures to reach a fee-charging path.

Together, these cases make a more useful point than “use nonces.” Authorization is a state machine whose safety depends on identity, meaning, order, and effect.

## Analysis

There are at least four distinct replay and lifecycle questions in an agent transaction.

The first is **object replay**: can the same signed authorization be redeemed twice? A nonce, nullifier, or consumed-bit can answer this, provided consumption is atomic with the protected transition.

The second is **semantic replay**: can a different authorization object be issued for the same underlying user decision? Preventing that requires canonicalization and durable state outside the token identifier. The system must decide what makes two actions equivalent: principal, asset, amount, recipient, chain, purpose, confirmation event, and policy version may all matter. If “send 500 USDC to vendor X” and “pay invoice 481” resolve to the same effect, the budget ledger must recognize that equivalence across retries and delegate chains.

The third is **context replay**: can a valid decision cross into a domain where it was never approved? This is why the confidential-verdict update's domain separation matters. A verdict for the same bytes should not move between policy domains merely because they share a guard contract. Executor binding matters for the same reason: integrity proves that an object is authentic; audience binding proves who may consume it.

The fourth is **effect replay**: can the downstream service perform the effect more than once even when authorization was admitted once? This is an idempotency problem. A wallet can atomically consume a nullifier with an onchain transfer. Cross-system workflows are harder. If an agent receives permission to place an order through an API, the authorization gateway and merchant need a common action key or transactional protocol. Otherwise a timeout can leave the permission service certain that it approved one action and the destination free to execute two.

These layers interact with execution order. A safe flow generally needs to authenticate the caller, resolve the current mandate, validate the exact action and domain, reserve or consume the relevant budget, execute the effect, and record the outcome. Failure paths must specify which state changes survive. If a signature is invalid, no fee should be charged to the alleged principal. If execution fails, the system must decide whether the authorization can be retried, how long the reservation remains, and whether a new executor may take over.

This is where simple “stateless permissions” reach their limit. A signature can prove that a principal authorized some message. It cannot, by itself, prove that the approval has not already been represented by another message, that the policy is still current, or that the external effect did not already occur.

For smart accounts and ERC-7710-style delegations, the practical design checklist is concrete:

- Canonicalize the action before authorization, including chain, account, target, calldata or typed method, value, relevant policy domain, and intended executor.

- Keep token-independent consumption state for budgets and one-time human confirmations. A new signature should not reset the principal's intent ledger.

- Bind every grant to an audience and domain. Relayers, executors, chains, and policy versions are security context, not metadata.

- Update nullifiers, nonces, and budgets atomically with the state transition whenever the execution environment permits it.

- Use idempotency keys and outcome reconciliation when execution crosses into an external system. “Submitted” and “completed” are different states.

- Define failure ordering explicitly. Authentication must precede any state mutation charged to the principal, while policy and revocation checks must happen against the state that will govern execution.

- Monitor unresolved prepared actions. A reservation that never commits can become either a denial-of-service vector or a path to unsafe reissuance.

The appeal of capability tokens is that they can be portable and locally verifiable. The cost is that portability encourages designers to treat the token as the whole authorization system. It is not. The token is one transition input. The system still needs a durable record of what the principal approved, what was consumed, what actually happened, and which failures permit another attempt.

**The Caveat:** Stateful authorization is not automatically decentralized, simple, or correct. CapLease assumes trusted canonicalization, authenticated confirmations, atomic storage, current schemas, and an idempotent sink; the paper also found that a conventional stateful server ledger can provide equivalent replay protection. The confidential-verdict reference suite still uses a mock verifier, and a zero-knowledge ALLOW result proves policy execution, not policy legitimacy. XRPL's critical flaw was disclosed before activation and replaced through its amendment process, so it should not be framed as a mainnet loss. The conclusion is narrower but durable: signatures and nonces are necessary primitives, while safe agent authority depends on the state machine around them.
