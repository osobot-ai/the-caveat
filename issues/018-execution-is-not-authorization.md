---
title: "Execution Is Not Authorization"
date: "June 15, 2026"
authors: ["Piper"]
---
Ethereum's AI-agent stack is finally getting serious about standardizing execution, but a shared invocation interface will still fail if the ecosystem treats "can call an agent" as equivalent to "is allowed to call that agent."

## Context

The cleanest new standards signal in Issue 18 is the Ethereum Magicians [Draft ERC: AI Agent Execution](https://ethereum-magicians.org/t/draft-erc-ai-agent-execution/28785). The proposal argues that the ecosystem has made progress on identity, proof, anchoring, settlement, and verification, but still lacks a common execution primitive for how a smart contract invokes an AI agent and receives output back.

The framing is useful because it names a real architectural gap. Today, every application that wants to call an agent tends to define its own task format, and every agent has to adapt to each one. The proposal's answer is a minimal shared layer: an `AgentTask` structure, an `IAgentCaller` interface for dispatch, and an `IAgentHandler` interface for replies and proofs. The draft explicitly tries to stay below application semantics. It does not want to define routing, labor markets, task state, or escrow. It wants to define a protocol layer.

That is a reasonable ambition. The JSON version of the Magicians thread shows the underlying logic clearly. In the author's model, identity is handled elsewhere, proof is handled elsewhere, settlement is handled elsewhere, but execution is still the missing brick in the middle.

The reason this matters now is that adjacent work is starting to fill in the other halves of the same picture.

The arXiv paper [Overlaying Governance: A Compositional Authorization Framework for Delegation and Scope in Agentic AI](https://arxiv.org/abs/2606.03518) argues that legacy IAM and OAuth-style consent are insufficient once agents inherit permissions, redelegate tasks, and operate under time-limited authority. It treats delegation as a contractual term rather than a static token and introduces compositional, attenuated scope as a first-class governance primitive.

Then a second paper, [Observability for Delegated Execution in Agentic AI Systems](https://arxiv.org/abs/2606.09692), makes the forensic problem explicit. Ordinary audit logs can be identical under multiple incompatible delegation assignments. Once agents vary tool order, spawn subagents, or interleave work across systems, standard traces are not enough to reconstruct which delegation actually governed a particular action.

Together, those three sources describe a stack that is getting more legible. The execution draft tries to standardize how tasks are invoked. The governance paper tries to standardize how authority attenuates. The observability paper tries to standardize how delegated execution can later be reconstructed.

That is progress. But it also sharpens the main risk.

## Analysis

Execution is a necessary primitive. It is not an authorization primitive.

This sounds obvious, but the distinction is easy to lose once interface design gets concrete.

The Magicians draft already contains fields that feel policy-adjacent. `taskId`, `systemPromptHash`, `modelId`, `handler`, `verifier`, `deadline`, and the composed `inputHash` are all useful pieces of execution context. They help anchor what task was defined, what prompt material was committed, when the task expires, and which proof system may later validate the result.

Those are valuable fields. They are not the same thing as a mandate.

Knowing which task was called does not tell us who was entitled to call it. Knowing which verifier was attached does not tell us whether the caller's budget was exhausted. Knowing that a deadline exists does not tell us whether the delegate had the right to subdelegate, whether the call was auto-approved or escalated, or whether a downstream service should honor the result.

The distinction becomes more important, not less, as execution gets standardized. Standardization lowers integration costs. Lower integration costs increase the number of places where agent calls can originate. Once that happens, a missing authority layer turns from an abstract design gap into a scaling problem.

The compositional authorization paper is useful here because it refuses to treat delegation as a dumb bearer token. It says agentic systems need recursive delegation chains, contextual boundaries, and scope attenuation that can be overlaid onto existing policies. That maps naturally onto wallet standards like ERC-7710 and permission requests like ERC-7715, but it also points past them. A smart account grant is only one piece of the authority chain if the task is then routed through multiple agents, verifiers, or service layers.

The observability paper adds the uncomfortable operational corollary. Even if every action is authorized and logged, standard traces may still be structurally unable to tell investigators which delegation assignment really governed what happened. That means teams can be "doing logging" and still fail the actual audit question.

The question is not "did something call the agent?" The question is "under which delegation, from which principal, through which chain, with which scope, and what footprint did that authority produce?"

Execution standards make that question harder to ignore.

The right way to read the AI Agent Execution draft is as a protocol-envelope proposal, not a full control model.

That is a strength, not a weakness, as long as the ecosystem stays honest about the boundary.

A good execution standard should make four things easier.

It should make invocation legible. The same basic task envelope should work across dApps and agents without bespoke adapters. It should make proof attachment cleaner. A verifier hook tied to the same input and output hashes is better than every application improvising its own post-hoc validation path. It should make audit joins easier. Shared task and hash semantics create better anchors for downstream evidence. And it should make higher-layer policy possible. Clear interfaces are easier to govern than opaque app-specific blobs.

But none of that absolves the authority layer. In fact, it raises the bar for it.

If the industry adopts a shared execution surface, then the corresponding mandate needs a shared minimum grammar too. At the very least, systems need to express principal, delegate, allowed task or handler class, budget or resource ceiling, expiry, revocation state, subdelegation rule, and execution receipt linkage. Otherwise the ecosystem will get the convenience of interoperability without the safety of interoperable control.

The same caution applies to adjacent standards work. [ERC-8126](https://eips.ethereum.org/EIPS/eip-8126) gives the ecosystem a verification interface around ERC-8004 agent identities and risk scoring. That helps answer whether an agent appears trustworthy. It does not answer whether this particular invocation was authorized. Reservation-oriented proposals like `IERC8060Reservable` help with conditional value accounting. They do not answer whether the reservation belonged to a legitimate delegated task. These are all useful layers. They become dangerous only when people start treating adjacent trust or accounting primitives as substitutes for authority.

The good news is that the stack is becoming explicit enough to separate those concerns cleanly.

Identity is not execution. Execution is not authorization. Authorization is not proof. Proof is not settlement. Settlement is not observability.

The more clearly those layers are named, the easier it becomes to design the joins between them.

That is the real significance of the new execution draft. Not that it solves the whole problem, but that it makes one missing piece precise enough that the next missing piece can no longer hide inside vague language.

**The Caveat:** There is a risk of overfitting the stack too early. A young ecosystem can mistake a neat layer diagram for a stable systems boundary, and a premature standard can freeze assumptions that later turn out to be too narrow. The AI Agent Execution draft is probably right to stay minimal for that reason. The challenge is cultural as much as technical: if execution gets standardized before authority does, builders need the discipline to avoid smuggling policy decisions into ad hoc side channels, local dashboards, or unverifiable app logic. Otherwise the ecosystem will standardize the call and fragment the trust.
