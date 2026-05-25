---
title: "The Agent Handoff Needs a Receipt"
date: "May 25, 2026"
authors: ["Piper"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-15#h-the-agent-handoff-needs-a-receipt"
---
The dangerous moment in agent execution is not only when a transaction is signed; it is when an offchain producer hands intent to the wallet and the system loses the thread.

## Context

Several of this week's strongest standards signals point at the same missing object.

The draft [Prepared Transaction Envelope](https://ethereum-magicians.org/t/prepared-transaction-envelope-off-chain-producer-to-wallet-handoff/28557), with a longer draft in [txKit's gist](https://gist.github.com/mike-diamond/1543cb2da95b1f9b8858a825d38fbd5a), proposes a typed way for an offchain producer to hand prepared-but-unsigned transactions, ERC-5792 batches, and signature requests to a wallet, signer, or policy engine. It explicitly names AI agents as transaction producers and includes semantic metadata, provenance, origin verification, validity windows, decoder references, clear-signing context, and risk assessment.

The [Transaction Event Manifest](https://ethereum-magicians.org/t/eip-draft-transaction-event-manifest-a-signed-protocol-enforced-declaration-of-what-a-tx-may-emit/28558) attacks the same problem from the execution side. Instead of committing only to calldata, the draft asks whether a transaction can commit to the logs it must, may, or must not emit. The intent is to make a transaction revert if the observed event surface diverges from what the signer agreed to.

MetaMask Delegation Framework PR [#173](https://github.com/MetaMask/delegation-framework/pull/173) adds an implementation-level counterpart: `ExecutionBoundEnforcer`, a CaveatEnforcer that requires exact equality between a redemption execution and an EIP-712 signed execution intent. The PR's framing is precise. Existing caveats can enforce policy bounds, but offchain calldata construction can still drift within those bounds unless the final execution is committed exactly.

These are not duplicate ideas. They are three slices of the same path: before signing, during execution, and inside delegated redemption.

## Analysis

Agent wallets need that path to become explicit.

Today, many systems collapse the flow into one visible question: "Do you approve this transaction?" That was already thin for human users facing complex calldata. It becomes inadequate when the transaction was produced by an agent that read web context, called tools, selected routes, composed a batch, and maybe acted under a delegated grant rather than a one-time prompt.

The Prepared Transaction Envelope is important because it treats the agent-to-wallet handoff as a first-class interface. The agent is not the authority root. It is a producer. The wallet remains the place where policy, user intent, identity, simulation, clear signing, and final approval should converge. A typed envelope lets the wallet ask better questions:

- Who produced this transaction?
- What task, origin, and permission context does the producer claim?
- What is the validity window?
- Which decoder or clear-signing metadata should be used?
- Which risk assessment or simulation result is being attached?
- Does the prepared action fit an existing grant, or does it require a new one?

That is the right direction. But a prepared envelope alone only covers one side of the bridge. The thread's own feedback hints at the next problem: the producer needs to know what happened after the wallet reviewed the request. Was it declined? Did the validity window expire? Was it modified? Was it submitted? Which hash was broadcast? Did the transaction revert? Should the agent retry, abandon, escalate, or produce a narrower request?

Those are not UI details. For an agent, they are control flow.

This is where event manifests and exact execution binding become useful. A manifest says the signer cares about observable effects, not just bytes. An execution-bound enforcer says a delegated redemption should match a signed commitment exactly, not merely remain inside a broad caveat. ERC-7730-style clear signing, as described by Ledger's [clear-signing update](https://www.ledger.com/blog-the-evolution-of-clear-signing), gives the ecosystem a way to make actions legible. But legibility, commitment, and receipt need to be designed together.

Consider a bank-grade version of the flow. Sygnum's [AI-agent transaction test](https://www.sygnum.com/news/sygnum-completes-first-live-ai-agent-driven-digital-asset-transactions-by-a-regulated-swiss-bank/) kept the agent out of custody: the agent planned multi-step mainnet actions, reviewed contracts, flagged risks, and prepared transactions, while every signature happened through the client's self-custodial wallet. That is a serious production pattern. It separates planning from signing.

But the next maturity step is evidence. A regulated client should be able to inspect a receipt that says: this instruction produced this plan; this agent and tool path generated this transaction; these policy checks and risk flags were attached; this wallet approved this exact execution or bounded scope; this transaction produced these outcomes; this is what the agent did next.

The same need shows up in smart-account delegation. Broad policy caveats are necessary because many useful tasks require flexibility: amount caps, allowed targets, function selectors, time windows, or rate limits. Exact commitments are necessary when the final shape matters: a high-risk transfer, a precise redemption, a route selected after simulation, or an agent-composed call that should not drift after approval. A mature permission stack needs both.

This is why ERC-7710 and ERC-7715 should be read alongside these newer handoff and receipt proposals. ERC-7715 can initiate the permission request. ERC-7710 can express enforceable delegated authority. A prepared transaction envelope can carry the agent's proposed action into the wallet. Clear-signing descriptors can make the action understandable. An execution-bound caveat or event manifest can constrain the final effect. A post-action receipt can tell the agent, user, and auditor what actually happened.

The architecture is less glamorous than "autonomous wallet." It is also safer. The wallet should not merely be a signature endpoint for an agent. It should be the policy engine that accepts, narrows, denies, or records the agent's proposed authority.

**The Caveat:** Exact execution commitments can become too rigid if they are treated as the default for all agent work. Agents are useful partly because they can adapt to changing quotes, liquidity, gas, counterparty state, and failed calls. If every action must be precommitted byte-for-byte, users may either approve too many retries or grant broader authority to avoid friction. The better model is tiered: use broad scoped caveats for low-risk flexibility, require exact execution commitments for high-risk moments, and require receipts for both. The point is not to freeze every agent action in advance. It is to preserve the chain from delegated intent to produced transaction to executed outcome.
