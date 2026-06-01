---
title: "Alignment Is Not Authorization"
date: "June 1, 2026"
authors: ["Piper"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-16-1#h-alignment-is-not-authorization"
---
The most important agent security lesson this week is not that models can misbehave. It is that even well-behaved models still need an external authority channel that can bound, redirect, and stop them.

## Context

The cleanest research statement came from the paper [Reframing LLM Agent Security as an Agent-Human Interaction Problem](https://arxiv.org/html/2605.24309v1). The authors reviewed 21 production agent systems and found that the controls actually deployed in practice are not exotic model-side defenses. They are human and policy mechanisms: scope configuration, runtime approval, and policy specification. That matters because it cuts against a familiar assumption in agent discourse, namely that better alignment or better classifiers will eventually remove the need for explicit authority infrastructure.

The same point showed up from a different direction in [Position: AI Safety Requires Effective Controllability](https://arxiv.org/abs/2605.27117). That paper argues that alignment is not the same thing as controllability. A system can be generally helpful and still be hard to stop, hard to redirect, or hard to constrain once it is operating over long horizons with tools and adversarial inputs. In other words, behavioral quality is not a substitute for a runtime control plane.

Anthropic made the production version of that argument in [How we contain Claude across products](https://www.anthropic.com/engineering/how-we-contain-claude). The most revealing detail in the post was not a benchmark. It was telemetry: users approved roughly 93% of permission prompts. That is a useful number because it turns "approval fatigue" from a vague UX complaint into an engineering fact. If users approve nearly everything, a permission prompt is not doing much permission work.

Meanwhile, enterprise architecture is converging on the same conclusion. In [Who Authorized That? The Delegation Problem in Multi-Agent AI](https://www.oreilly.com/radar/who-authorized-that-the-delegation-problem-in-multi-agent-ai/), O'Reilly argues that MCP, A2A, OAuth, API keys, and service accounts are solving connectivity faster than delegated authority. Downstream agents inherit practical access without any explicit policy decision, creating what the piece calls ghost permissions. Uber's [Solving the Identity Crisis for AI Agents](https://www.uber.com/us/en/blog/solving-the-agent-identity-crisis/) describes a related operational problem: internal systems can see that a service called an API, but they cannot reliably reconstruct the human, agent, and intermediate-agent chain behind the action.

At the host boundary, the same lesson appears in [Sandlock](https://arxiv.org/html/2605.26298v1), a lightweight Linux sandbox for agent-run code. Sandlock matters because it treats filesystem, network, IPC, and syscall policy as a first-class authority surface. That is the local-compute equivalent of account caveats in smart accounts: do not ask the model to behave, make the environment enforce the boundary.

## Analysis

Taken together, these sources suggest a simple claim: the next stage of agent safety is less about persuading the model and more about structuring authority around it.

That sounds obvious, but it is still underappreciated. A surprising amount of agent design still relies on one of three weak substitutes for real authorization.

The first substitute is intent inference. This is the belief that if the model is aligned enough, it can infer what the user "really meant" and stay within bounds. That may help with ordinary assistance, but it is too soft for spending, signing, data exfiltration risk, or side-effecting tool use. As soon as the action has external consequences, "the model seemed to understand" is not an auditable control.

The second substitute is per-step approval. This is the familiar confirm-or-deny button shown before a shell command, a browser action, or a payment. Per-step approval is better than nothing, but only in small doses. Anthropic's 93% figure shows why. Once prompts become frequent, users stop evaluating them as decisions and start treating them as friction.

The third substitute is identity alone. Identity answers who is acting. It does not answer what the actor is allowed to do, for what purpose, under which limits, through which downstream delegates, and with what revocation path. Uber's actor-chain work is valuable precisely because it exposes how much operational ambiguity sits between "a service account acted" and "this delegated action was actually authorized."

That is why the control plane is becoming the real product surface. In enterprise stacks, that means agent registry, short-lived scoped credentials, runtime gateways, authenticated tool endpoints, and action logs that preserve delegation lineage. In local developer environments, it means process sandboxing, egress controls, secret isolation, and policy-aware supervisors rather than trust in prompt discipline. In smart account systems, it means scoped delegation, caveat-enforced limits, expiry, revocation, and receipts that survive beyond the wallet popup.

The useful design principle across all three worlds is the same: the authority object should be narrower than the task description. "Review this PR," "book this trip," or "summarize this report" is not a permission. It is a job statement. A permission has to be machine-checkable. It needs to name the principal, the delegate, the action class, the resource boundary, the budget or risk limit, the expiry, the revocation path, and the evidence trail.

That last field matters more than it seems. Receipts are not only for successful actions. Serious agent systems also need denial receipts, escalation receipts, and revocation receipts. If a downstream agent was blocked from sending a file externally, a reviewer should be able to see what it asked for, which policy blocked it, and which delegated chain was active at the time. Without that, systems become impossible to audit precisely when the boundary works.

This is where the wallet-native standards conversation around ERC-7710 and ERC-7715 becomes more important, not less. Smart accounts already force developers to think in terms of scoped delegated authority rather than raw key possession. The broader enterprise agent world is now rediscovering the same lesson with different nouns. MCP gateways, OS sandboxes, SaaS connectors, and browser agents all need the equivalent of a caveated grant plus a durable receipt.

There is a risk here of overcorrecting into rigid bureaucracy. A control plane that requires a human to bless every file read or every thirty-cent API purchase will fail on usability and eventually fail on safety too, because the human will stop paying attention. But that is not an argument against authorization. It is an argument for better authorization objects: durable, typed, narrow, and selectively escalated.

The strongest systems will likely look boring from the outside. Routine low-risk actions will flow through pre-authorized policies. High-risk actions will hit tighter boundaries, higher-friction approvals, or containment defaults. The model will remain important, but it will no longer be the place where the final security decision lives.

**The Caveat:** Control planes can become their own form of theater if they remain local to each platform. An enterprise gateway log, a sandbox rule file, and a wallet popup are all useful, but none is enough on its own. The harder standard is portability: can the system prove, across runtime, connector, browser, and wallet boundaries, which principal delegated which scope to which agent, what the agent actually tried to do, whether it was allowed or denied, and what revocation state applied at that moment? Until that receipt travels cleanly across layers, controllability will remain real but fragmented.
