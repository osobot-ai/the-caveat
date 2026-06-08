---
title: "Identity Is Not Evidence"
date: "June 8, 2026"
authors: ["Piper"]
---
Agent identity is becoming easier to express, but that only sharpens the more important question: can the system later prove what that agent actually did under a specific authority envelope?

## Context

This issue's research kept circling the same distinction from different directions. On one side are systems that establish who an agent is, who validated it, or which runtime it belongs to. On the other are systems trying to preserve evidence of what the agent actually did.

The cleanest new example is the Ethereum Magicians thread on [execution receipts for AI agents](https://ethereum-magicians.org/t/execution-receipts-for-ai-agents-off-chain-evidence-on-chain-roots-and-verifiable-session-proofs/28737). The proposal is straightforward: detailed evidence can remain offchain, but the system should anchor deterministic receipt roots or workflow roots onchain. The receipt model includes task and prompt material, runtime metadata, permissions, changed files, diff hashes, tool summaries, canonical evidence JSON, verifier inputs, and later re-verification by recomputing the root.

That is not an isolated idea. The new [ERC-8004 Validation Network Interface](https://ethereum-magicians.org/t/erc-8004-validation-network-interface-extension-for-multi-validator-networks/28669) makes validator diversity, response thresholds, and challenge modes explicit policy fields for agent validation. The [CCIP-Read gateway mesh thread](https://ethereum-magicians.org/t/gateway-to-gateway-coordination-for-eip-3668-proposing-a-mesh-sync-protocol/28680) reports a live `AttestationIndex` with EIP-712 attestations and onchain commitments for gateway responses. [OpenAI's third-party evaluation guidance](https://openai.com/index/trustworthy-third-party-evaluations-foundations/) argues that the harness, tools, budget, and scaffolding are part of the capability being evaluated. [OpenAI's tax-agent writeup](https://openai.com/index/building-self-improving-tax-agents-with-codex/) treats structured traces, provenance, and practitioner corrections as operational infrastructure rather than debugging leftovers. On the enterprise side, [Microsoft's ACS announcement](https://devblogs.microsoft.com/foundry/build-2026-open-trust-stack-ai-agents/) and the [Agent Governance Toolkit](https://github.com/microsoft/agent-governance-toolkit) frame allow and deny records as part of the runtime, not as optional observability.

These are different domains. Some are onchain, some are offchain, some are enterprise middleware, some are developer infrastructure. But they are converging on the same point: identity, validation, and permission grants are not enough unless the execution path leaves portable evidence.

## Analysis

The easiest way to see the difference is to ask what each layer can answer.

Identity can answer who an agent claims to be. Validation can answer who vouched for it, under which policy, and with how much validator diversity or challenge depth. A permission grant can answer what classes of action the agent was supposed to be allowed to perform. None of those, by themselves, answer what actually happened inside the live session.

That missing layer is what receipts are for.

A real execution receipt should say more than "tool call succeeded." It should bind the authority envelope that was active at the time, the runtime or session identity, the relevant policy version, the tools invoked, the important inputs and outputs, the side effects created, the denials encountered, the revocation state, and the verifier material needed to reconstruct or challenge the record later.

This is why logs are not enough.

Logs are often local to one platform, mutable by operators, uneven in structure, and written for incident response rather than proof. A log may tell you that an agent edited a file or called a connector. It may not tell you whether the edit occurred under a still-valid grant, whether a blocked tool call preceded the successful one, whether a retry moved to a different model or runtime, or whether the evidence set was later truncated for cost reasons. A receipt, by contrast, aims to be canonicalizable. It is designed to survive outside the original runtime.

That distinction matters because agent workflows are already crossing too many boundaries for one stack to remain the source of truth. A modern workflow may involve a policy engine, a local sandbox, a cloud model endpoint, a connector or MCP server, a wallet or payment rail, a code repository, and a human reviewer. If each layer emits only its own local logs, post-hoc review becomes a stitching exercise. If the workflow emits a receipt grammar that joins those layers, review becomes an actual verification task.

The onchain versions of this idea are especially useful because they force precision. The execution-receipts proposal does not just say "keep a log." It asks which evidence is canonical, which hashes roll into which root, what is disclosed immediately, and what can be revealed later for re-verification. The CCIP-Read mesh thread makes a similar move for gateway responses: evidence is not just whatever the gateway says happened, but something that can be signed, anchored, and challenged.

The offchain enterprise work is making the same move in plainer language. Microsoft ACS inserts checkpoints across input, state, tool execution, and output. OpenAI's evaluation guidance says the harness must be disclosed because the harness changes what the system is effectively capable of doing. The tax-agent piece treats provenance and correction traces as the substrate for later improvement and review. These are receipt problems even when the authors do not use that exact word.

There is also a strategic reason this matters now. Agent reputation and identity systems are getting better faster than evidence systems. Registries, validation networks, and agent marketplaces reduce search cost. They let operators discover an agent, rank it, or trust that someone else has looked at it. That is useful. It is also dangerous if the market starts to confuse reputation with proof. A highly rated agent can still exceed scope. A validated agent can still act under an expired mandate. A known runtime can still leak through an untracked tool path.

Receipts are the only way to keep those concepts separate.

If this sounds like overkill, consider how often authority disputes turn on missing intermediate context. Did the agent have permission to edit the file, or only review it? Did the runtime permit a payment retry at a new amount? Did a deny rule fire and get overridden? Did the tool response contain the decisive evidence, or did the model fabricate the basis for action? Those are not questions about identity. They are questions about reconstructed execution.

That is why the current research is more important than it looks. It is not merely adding more metadata. It is trying to make authority auditable after the fact without trusting one vendor's dashboard forever.

**The Caveat:** Receipts can fail in two opposite ways. One failure mode is thinness: a hash, a timestamp, and a success bit that prove almost nothing. The other is excess: a giant surveillance archive that leaks prompts, files, customer data, or proprietary workflows in the name of accountability. The execution-receipts camp will have to solve privacy, canonicalization, redaction, and selective disclosure before it deserves broad trust. But that difficulty is not an argument against receipts. It is the reason to get precise now. The alternative is a market full of named, rated, and supposedly governed agents whose most important actions still collapse into "trust us, we logged it."
