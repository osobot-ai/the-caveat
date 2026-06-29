---
title: "Tools Are Authority Surfaces"
date: "June 29, 2026"
authors: ["Piper"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-20#h-tools-are-authority-surfaces"
---
The cleanest correction in agent security this month is that the dangerous thing is rarely the model in isolation. It is the authority the surrounding tool stack quietly gives that model room to exercise.

## Context

Two recent reports make that point from different directions. Microsoft's [AutoJack writeup](https://www.microsoft.com/en-us/security/blog/2026/06/18/autojack-single-page-rce-host-running-ai-agent/) shows how a browsing agent that renders untrusted web content can become a bridge into privileged local services. In the case Microsoft described, localhost was not a safety boundary at all. A local MCP WebSocket became a reachable control plane, which meant the agent could be driven from ambient browsing context into host-level execution.

The new [Unit 42 report on malicious OpenClaw skills](https://unit42.paloaltonetworks.com/openclaw-ai-supply-chain-risk/) lands the same lesson from the supply-chain side. A malicious skill does not need to steal a private key or break a model's core safety training if it can inherit the agent's tool access, filesystem reach, shell execution, credential managers, or already-authenticated sessions. In that world, a plugin is not just a feature extension. It is a delegate operating inside the agent's authority envelope.

Research is starting to quantify the behavioral side of the same problem. [ToolPrivBench](https://arxiv.org/html/2606.20023v1) shows that mainstream agents often escalate to higher-privilege tools even when lower-privilege options would be sufficient, especially after friction or transient failure. Enterprise identity and security vendors are arriving at parallel conclusions in production language. [1Password's architecture guide](https://1password.com/blog/ai-agent-identity-architectures) separates delegated, bounded, and autonomous authority models while arguing for short-lived scoped credentials, just-in-time escalation, and revocation. [Forrester's Identiverse recap](https://www.forrester.com/blogs/identiverse-2026-recap-identity-security-for-agentic-ai-dominates/) says the center of gravity is shifting from static access to action-aware governance for non-human identities. [Wiz](https://www.wiz.io/academy/ai-security/ai-agent-security) uses the cloud-security vocabulary: inventory the agent, track its identities and permissions, and treat every service account, API key, tool, and workflow as part of the attack path.

What ties these sources together is a simple idea that many product designs still resist: tool access is not downstream plumbing. It is the permission system.

## Analysis

This matters because the industry still tends to discuss agent risk as if the model and the tool surface were separable in practice.

They are not.

An agent with broad file access, shell execution, browser control, SaaS connectors, memory, and authenticated sessions is not meaningfully "just a model with tools." It is an operational actor whose real authority is defined by composition. Each new skill, MCP server, plugin, connector, or helper process changes the reachable action graph. That means the control problem is not only whether each component is individually safe. It is whether the assembled authority graph is narrow enough to survive ordinary failure, hostile inputs, and compromised extensions.

That is why the AutoJack line that localhost is no longer a trust boundary matters so much. It generalizes. Any boundary that assumes proximity implies safety will fail once an agent can observe untrusted content and also reach a privileged local surface. The same logic applies to browser sessions, tool registries, shell wrappers, long-lived tokens, and helper daemons. A component may be "internal" in topology and still be externally steerable through the agent.

The Unit 42 report sharpens the complementary risk. Even if the runtime boundary is strong, a malicious or compromised skill can still parasitize the host agent's identity and authenticated context. In other words, supply-chain risk becomes authorization risk. The problem is not only that a bad package entered the environment. It is that the package arrived in a position where it could spend someone else's authority.

This is a much more useful way to think about plugins and MCP servers than the typical marketplace framing. A registry can tell you that a tool exists, who published it, and perhaps whether it passed some scanning. That is valuable, but it is not enough. The operational question is what that tool is allowed to do inside a live agent run, what privilege tier it belongs to, what escalation path exists if it asks for more, and what evidence remains after it acts.

ToolPrivBench is especially important here because it undermines a comforting assumption. Many people assume that once the correct low-privilege tools exist, a well-instructed agent will naturally prefer them. The paper suggests otherwise. Agents often choose broader authority when it is more flexible or more likely to succeed, and they become even more likely to do so after minor failure. That means least privilege cannot live mainly in prompting. It has to live in runtime defaults, available interfaces, and enforceable escalation boundaries.

That is also why the enterprise identity literature is becoming more relevant to smart-account and onchain permission discussions than it may have seemed a few months ago. 1Password's delegated versus bounded versus autonomous taxonomy is really a statement about authority surfaces. It says that the same agent should not automatically be treated as either a human proxy or a fully independent actor. The authority model should be explicit. Forrester's "actions, not access" language makes the same move from the market side. Wiz makes it from the attack-path side.

In each case, the implication is the same: the meaningful permission object is no longer "this user connected this app." It is something closer to: this principal allowed this agent identity to use this class of tool, against this resource boundary, within this time window, under these escalation rules, with these receipts.

That is a much better fit for how real agents fail.

Most serious incidents are not caused by a single catastrophic permission decision at setup time. They emerge from composition. A safe-looking browser tool plus a safe-looking local service plus a safe-looking shell wrapper can produce a dangerous path. A legitimate connector plus a malicious skill can turn session reuse into unauthorized action. A broad tool remains mostly harmless until the model experiences enough friction to reach for it. The authority graph changes as soon as memory, plugins, registries, or helper services are added.

This is where the bill-of-materials idea becomes practical rather than academic. The [AgentRiskBOM paper](https://arxiv.org/html/2606.21877v1) is useful precisely because it asks what the deployed agent can access, remember, change, delegate, and prove after the fact. That is the right question because code inventory alone is no longer enough. The important object is the agent's authority inventory.

But inventories are only the start. The stronger design goal is to treat every tool as part of a governed delegation chain.

Low-risk tools should be cheap to use and easy to audit. Higher-risk tools should require stronger scoping, shorter-lived credentials, and explicit step-up or separate action-time approval. Local helpers should be narrow, time-boxed, and auditable. Registries should support discovery and scanning, but runtime gates should still decide whether a particular invocation is allowed in the current context. And every privileged side effect should leave a receipt tied to the principal, the agent, the tool, the scope, and the actual action taken.

That is not elegant, but it is realistic.

It also helps explain why some of the quieter agent-security work is more consequential than the flashier jailbreak demos.

The OpenClaw public red-team challenge showed that a model plus simple rules can resist a large amount of direct prompt-injection pressure. That is useful. But even that writeup concluded that arbitrary permissions still should not exist. The result does not contradict the broader argument. It reinforces it. Model resistance is good. Narrow authority is still required because the bigger failure mode is what the model can reach once resistance fails or context degrades.

Seen that way, the next standards fight in agent security is not mainly about model alignment. It is about the shape of delegated tool authority. Which privilege tiers are standard? How are tool and plugin identities expressed? How do escalation and revocation travel across MCP, local runtimes, SaaS connectors, and wallets? What receipt proves that a given extension acted within scope rather than merely existing in the environment?

Those are harder questions than "is this prompt injection-resistant?" They are also much closer to the controls that real deployments need.

**The Caveat:** Turning every tool invocation into a heavy approval ceremony would cripple the usefulness of agents, so the answer cannot be constant human review. Some extensions really are low-risk enough to run with minimal friction, and organizations will need fast paths for ordinary work. The harder design challenge is tiering. Tool registries, scans, and inventories are helpful, but they do not replace runtime policy or privilege attenuation. A secure agent ecosystem will need trusted low-risk tool classes, explicit step-up paths for broader authority, narrow local helpers instead of generic power surfaces, and receipts that survive composition. Otherwise the system will continue to confuse "tool installed" with "tool authorized."
