---
title: "Permissions Have Moved Below the Prompt"
date: "May 17, 2026"
authors: ["Piper"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-14#h-permissions-have-moved-below-the-prompt"
---
The most important agent-security work now looks less like prompt engineering and more like operating-system and middleware design.

The false choice in agent UX is not "approval spam or full autonomy." It is whether permission enforcement lives below the model or inside the model's own judgment.

## Context

OpenAI's recent engineering writeup on [Codex's Windows sandbox](https://openai.com/index/building-codex-windows-sandbox/) is the clearest mainstream statement of the problem. The team describes the bad options Windows users originally faced: approve nearly every command, or grant the coding agent unrestricted access. OpenAI's answer was not a better prompt. It was an execution boundary. Codex needed file-write restrictions, network controls, and OS-enforced isolation because the agent otherwise runs with the same authority as the human user.

Microsoft is making the same point more abstractly in its security post on [defense in depth for autonomous AI agents](https://www.microsoft.com/en-us/security/blog/2026/05/14/defense-in-depth-autonomous-ai-agents/). The key claim is that as autonomy rises, the decisive layer becomes the application layer: how agents are assembled, constrained, permissioned, and escalated inside real systems. Microsoft's recommended patterns are not exotic. They are scoped agents, least permissions, deterministic human review, and unique agent identity.

Platform and tooling vendors are turning that thesis into product surfaces.

Google Cloud's [Gemini Enterprise Agent Platform overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/overview) explicitly packages Agent Registry, Agent Identity, Agent Gateway, governance policies, tracing, evaluation, memory, and code execution as one control stack. Microsoft's public-preview [Agent Governance Toolkit](https://github.com/microsoft/agent-governance-toolkit) says every tool call, resource access, and inter-agent message should be evaluated against deterministic policy before execution. Statewright's [workflow engine](https://github.com/statewright/statewright) is even more direct: states are laws, tools are phase-bound, and high-risk transitions can require explicit approval before the model moves forward.

These systems differ in scope and maturity, but they share a structural idea. Safety no longer means asking the model to behave. It means deciding which actions are actually possible.

## Analysis

This is a bigger shift than it first appears.

For much of the last two years, agent safety has been discussed as if the primary challenge were instructional: improve the system prompt, rank tools more carefully, add more warnings, add better content filters, or teach the model to escalate when it feels uncertain. Those measures still matter. But they do not define authority. They shape behavior inside an authority boundary set somewhere else.

The current generation of infrastructure is finally making that explicit.

Codex's Windows sandbox is useful because it exposes the product tradeoff in plain language. An agent that can read, write, execute, and call tools on a real machine is not safe because it was politely asked to stay in bounds. It is safe to the extent that the underlying system actually constrains where it can write, what it can reach, and when a human must approve an expansion of scope.

That lesson generalizes beyond coding agents.

A business agent operating across email, CRM, payments, documents, and internal tools has the same problem as a coding agent on a laptop. The visible interface may be a chat window, but the real risk lives in the action surface behind it. Which tools are available? Which data stores can be read or modified? What approvals are mandatory? What identity does the agent act under? What happens if a workflow fails halfway through? Which logs survive afterward?

Microsoft's application-layer framing is strong precisely because it names the control point correctly. The model layer remains probabilistic. The application layer determines deterministic outcomes. That is where least privilege, escalation logic, identity separation, and rollback discipline become real.

Statewright and the Agent Governance Toolkit show two versions of the same design instinct.

Statewright treats tool access as workflow-state policy. A planning phase gets read-only tools. An implementation phase gets edit tools with limits. A testing phase gets only designated commands. The point is not merely convenience. It is that a model should never have to remember its whole operating constitution at once. The tool surface itself shrinks and expands according to explicit rules.

The Agent Governance Toolkit takes a broader enterprise view. Instead of reasoning in terms of phases, it reasons in terms of deterministic policy checks before execution. Every tool call, resource access, and inter-agent message is evaluated against policy. The ambition is not to make the model wiser. It is to make certain classes of behavior impossible regardless of what the model tries.

That distinction matters for human-in-the-loop design too.

Microsoft's security guidance is right to insist that high-stakes escalation triggers belong in code, not in the model's own discretionary reasoning. If the model decides whether it should request human review, then the review path is only as reliable as the model's current interpretation of its situation. A determined attacker, an ambiguous prompt, or a context failure can all turn "the model should know when to ask" into a silent bypass.

This is why deterministic HITL is more important than generic approval UX. A human approval button is only a meaningful control if the system can reliably force the agent into that branch when the policy says it must.

The convergence with smart-account design is hard to miss.

Onchain systems have spent the last year arguing that user authority should not be represented as a raw private key plus good intentions. Instead, the interesting primitives are delegated execution, scoped caveats, session bounds, revoke paths, and policy-aware redemption. Enterprise AI is now arriving at the same conclusion from a different direction. The names are different, but the logic is the same: identity, bounded action, deterministic enforcement, and receipts.

That does not mean these systems are interchangeable.

An OS sandbox constrains a process tree. An enterprise gateway constrains tool access inside one platform. A workflow engine constrains phase transitions inside one authored process. A smart-account caveat constrains execution against a wallet or contract boundary. Each solves a different slice of the authority problem.

But the common lesson is still important. Permissions have moved below the prompt.

The prompt can describe intent. It can ask for caution. It can explain user preferences. It can help the model choose among options. What it cannot do reliably is serve as the only source of truth for what the agent is permitted to do in the first place.

That shift also explains why registries, gateways, traces, and identities are showing up everywhere at once. Once agents become multi-step actors instead of one-shot answer engines, the infrastructure has to answer operational questions that chat UX alone cannot:

- Which agent did this?
- Which tools were visible at the time?
- Which policy version applied?
- Which transition or event triggered the action?
- Which human approval was required or bypassed?
- Which runtime actually enforced the restriction?

Those are not merely observability questions. They are the minimum facts needed to reason about delegated authority after something goes right or wrong.

The same will increasingly be true for browser agents, wallet agents, and SaaS-connected assistants. The risk surface is different in each case, but the control pattern is converging. Strong agent products will not be the ones with the most human-like explanations for why they were safe. They will be the ones that can prove the unsafe branches were not available at all.

**The Caveat:** Moving permissions below the prompt is necessary, but it does not solve everything. A sandbox can still be misconfigured. A workflow can still over-authorize. A registry can still become a centralized control bottleneck. And none of these systems automatically produce portable authority semantics across machines, clouds, wallets, and third-party services. The prompt is no longer the real permission boundary. But replacing prompt trust with platform trust is only an improvement if the enforcement logic is legible, reviewable, and revocable at the layer where the action actually happens.
