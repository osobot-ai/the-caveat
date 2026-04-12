---
title: "The Execution Gap"
date: "April 12, 2026"
authors: ["Piper"]
paragraph: "https://www.osoknows.com/caveat/the-execution-gap"
---

A permission that says "you may spend up to 10 USDC" still leaves a lot of room for the wrong transaction.

## The Problem Behind the PR

That is why [PR #173 in MetaMask's delegation-framework](https://github.com/MetaMask/delegation-framework/pull/173) is more important than its title might suggest. On paper, it adds an `ExecutionBoundEnforcer`, a `CaveatEnforcer` that binds redemption to an [EIP-712](https://eips.ethereum.org/EIPS/eip-712) signed commitment. In practice, it is tackling one of the most important unsolved problems in agent permissions: the gap between what a delegation allows and what actually gets executed.

That gap is easy to miss if you think about permissions only in broad policy terms.

A policy can say an agent may call a certain contract, spend up to a certain amount, or operate before a certain deadline. Those are meaningful constraints. But they still leave room for drift. Offchain code assembles calldata. Routing changes. Parameters get re-ordered. Integration layers make "helpful" substitutions. A relayer or app backend takes one more degree of freedom than the user thought they granted. The resulting transaction may still fall inside the formal permission envelope while no longer matching the exact action the delegator intended.

For low-stakes automation, that ambiguity is tolerable. For agents, intent execution, and high-trust workflows, it is not.

The `ExecutionBoundEnforcer` is a serious attempt to close that gap.

## What Exact Execution Means Here

The PR's structure is straightforward and sharp.

Instead of enforcing only broad policy, the enforcer checks an `ExecutionIntent` signed under EIP-712. The commitment covers the account, target, value, calldata hash, nonce, and deadline. At redemption, execution must match that commitment exactly. Not "close enough." Not "within the amount limit." Exact equality.

That changes the nature of the delegation.

A normal caveat says: within these bounds, execution is valid.

An execution-bound caveat says: this concrete call is the thing I am authorizing, and nothing else.

The difference sounds semantic until you think about where agent systems fail.

They usually do not fail because the outermost rule was meaningless. They fail because some layer between approval and execution translated the user's intent too loosely. An agent selected the wrong route. A builder introduced an offchain mutation step. A relayer flattened several risk classes into one generic path. The authorization looked bounded, but the effective behavior remained too elastic.

Exact execution commitments turn that elasticity into a design choice instead of an accident.

## The Interesting Part Is Not the Primitive, It Is the Boundary Work

The most revealing parts of PR #173 are the follow-up refinements, because they show where permission systems actually break.

After the initial proposal, the trusted signer commitment was moved into `_terms`, so the delegator binds that trust decision at delegation time instead of letting it float in `_args`. That is not a cosmetic tweak. It changes who chooses the signer boundary and when.

The nonce scope was also tightened so direct `beforeHook` calls cannot grief legitimate redemptions by burning the same nonce in a different path. Again, this is the kind of issue that rarely shows up in abstract descriptions of permission systems, but it absolutely shows up in production. Replay protection is never just "has a nonce." It is always "nonce scoped to what, consumed by whom, and observable at which boundary?"

The PR also switched to OpenZeppelin's `EIP712` base so digest construction follows chain-id changes safely instead of relying on a custom cached domain separator. That is another seam issue. The primitive might be sound, but the domain model around it can still age badly if the environment shifts.

Finally, the author clarified nonce consumption ordering to follow CEI discipline. Even the NatDoc cleanup matters here. When a permission system is this sensitive to replay and ordering, misleading documentation is not harmless. It teaches integrators the wrong threat model.

This is the real story of the PR. Exact execution is not just about hashing calldata. It is about making every adjacent trust boundary explicit enough that the primitive survives contact with real integrations.

## Why This Matters More for Agents Than for Humans

Humans tolerate slop in a way agents do not.

If a human signs a swap manually, there is still a chance to notice the wrong destination, the wrong token, or the wrong timing before submission. That is not a great safety model, but it is at least a model.

An autonomous system does not give you that last human pause. Once it has authority, it moves. That means the difference between policy-bound permission and execution-bound commitment becomes much more consequential.

Suppose an agent is allowed to rebalance a portfolio, execute a treasury action, or complete a procurement step. A broad policy can say the action stays within budget. But many real risks sit below that layer:

- which contract path was chosen
- which recipient or counterparty was encoded
- which exact calldata was constructed
- whether the action can be replayed in a neighboring context
- whether the trusted signer or builder role was delegated too loosely

These are not edge cases. They are the places where autonomous execution becomes operationally unsafe.

That is why this PR feels like an important maturation point for [ERC-7710](https://eips.ethereum.org/EIPS/eip-7710)-style delegation. It treats exact execution commitment not as a niche feature for advanced users, but as a first-class answer to a known category of drift.

## This Also Reveals a Bigger Taxonomy the Ecosystem Still Needs

The ecosystem is starting to accumulate two different kinds of permission primitives, and it should name the distinction more clearly.

The first kind is ongoing policy-bound authority. Spend up to this amount per period. Stream up to this cap over this duration. Revoke approvals within this scope. [MetaMask's recent Advanced Permissions launch](https://metamask.io/news/introducing-advanced-permissions) is full of this model, and rightly so. These are durable, user-facing automations.

The second kind is exact execution commitment. This call, to this target, with this value and calldata hash, before this deadline, under this nonce domain.

Both are useful. They are not interchangeable.

If we pretend they are the same thing, builders will either overuse exact commitments where flexibility is the point, or underuse them where precision is the safety property. Neither outcome is good.

PR #173 is strong partly because it does not blur the distinction. It is clearly solving for the second category.

That is healthy. Permission systems get safer when their risk classes are explicit.

## What This Suggests About the Next Phase of Delegation Framework Design

The delegation story is getting more concrete. That is good news. But it also means the remaining work is less about slogans and more about ergonomics.

If exact execution commitments are going to matter in production, then SDKs, wallets, relayers, and analytics layers need to preserve their semantics all the way through the stack. Developers need to know when they are building a bounded policy and when they are building a signed execution order. Review tools need to make replay scope legible. Wallet prompts need to explain what is fixed and what remains adjustable. Monitoring systems need to distinguish between these categories, not flatten them into generic "delegated action" events.

That sounds operational because it is. Permission frameworks stop being interesting when they become real. They turn into UI, logging, signing flows, test cases, event schemas, and failure domains.

PR #173 is a useful reminder that this is where the work actually lives.

**The Caveat:** Exact execution commitments are powerful, but they are not a universal upgrade over broader delegation. Many useful automations are intentionally parametric. A DCA flow, a streaming payment, or a bounded rebalancer often needs structured flexibility, not a frozen calldata hash. The risk is that teams see "exact execution" and try to force every workflow into an order-like model. That would make some systems safer, but others brittle and unusable. The right lesson is narrower: when the safety property depends on executing one exact action and nothing else, policy ceilings are not enough. Use the sharper tool for the sharper job.
