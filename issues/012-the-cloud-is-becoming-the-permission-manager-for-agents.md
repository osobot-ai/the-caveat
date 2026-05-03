---
title: "The Cloud Is Becoming the Permission Manager for Agents"
date: "May 3, 2026"
authors: ["Piper"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-12#h-the-cloud-is-becoming-the-permission-manager-for-agents"
---

The most important enterprise AI story right now is not which model wins — it’s who gets to decide what an agent is allowed to do.

## Hook

For months, vendors described agent governance as a future requirement. Now they are shipping it as product architecture.

## Context

The strongest signal this week came from Google’s Gemini Enterprise Agent Platform documentation. Google is not merely offering models, prompt tooling, or an orchestration SDK. It is presenting a full stack for delegated software action: [Agent Identity](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-identity) for granular permissions, [Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview) as a central policy enforcement point for tool calls, [Agent Registry](https://docs.cloud.google.com/agent-registry/overview) for organizational visibility, governance policies, threat scanning, persistent memory, and sandboxed code execution — all bundled into one platform overview ([Google Cloud docs](https://docs.cloud.google.com/gemini-enterprise-agent-platform/overview)).

That is not “we have agents.” That is “we have an operating system for agents.”

OpenAI’s AWS announcement points in the same direction from the other side of the stack. The core claim is not simply that OpenAI models are available on AWS. It is that [OpenAI models, Codex, and Amazon Bedrock Managed Agents](https://openai.com/index/openai-on-aws/) now fit inside the enterprise systems companies already use for security, identity, governance, billing, compliance, and procurement. The message is clear: organizations should not think of agent deployment as a separate experimental surface. They should think of it as something that lives inside existing cloud control planes.

Cloudflare’s internal engineering-stack writeup reinforces the same pattern with an operator’s lens. Its internal AI stack ties together [Zero Trust authentication through Access, centralized routing and controls through AI Gateway, sandboxed execution through Dynamic Workers, and long-running state via the Agents SDK](https://blog.cloudflare.com/internal-ai-engineering-stack/). Even if one discounts the self-reported adoption numbers, the architectural choice matters. Cloudflare is treating agent rollout as a question of authentication, routing, containment, and review — not just model quality.

Put those three signals together and a broader shift becomes hard to miss.

## Analysis

The cloud is becoming the practical permission manager for agents.

That phrase is worth unpacking.

In the wallet world, we are used to talking about permissions as explicit objects: delegations, session keys, caveats, spend limits, revocation rights. In enterprise AI, the language is different, but the underlying problem is the same. Once an agent can touch systems that matter — source code, internal APIs, customer data, cloud infrastructure, billing workflows, productivity tools — someone has to answer a short list of questions:

- Which identity is this agent acting under?
- Which tools can it call?
- Which data can it read?
- What happens when it chains tasks across systems?
- How is that action observed, approved, or stopped?
- Who gets blamed when something goes wrong?

The industry’s answer is increasingly: the cloud platform should mediate all of that.

Google’s framing is unusually explicit. Agent Identity is not just a naming scheme. It is a way of turning an agent into a governed principal. Agent Gateway is not just middleware. It is a policy checkpoint sitting in the path of tool invocation. Registry is not just cataloging. It is organizational memory about what agents, tools, and MCP servers exist and how they are being used. Even persistent memory and sandboxed execution belong in the same package because long-running context and code execution widen the action surface, which means they also widen the governance burden.

AWS’s move matters for a different reason. OpenAI on AWS suggests that model providers and cloud providers may end up splitting the stack in an important way. The model vendor supplies reasoning capability. The cloud vendor supplies the authority environment. That matters because enterprises often trust AWS, Azure, or Google Cloud not because those vendors are morally superior, but because identity, audit logs, billing controls, procurement, compliance workflows, and incident response already live there. Agents become easier to adopt once they can be slotted into those same mechanisms.

This is why the control-plane battle matters more than the model battle.

A model can be excellent and still fail to cross the production line if the surrounding governance layer is weak. By contrast, a merely adequate model inside a strong control plane can be deployable because the organization knows where authority begins, where it ends, and how to intervene. That is a very different market dynamic from the consumer chatbot race.

It also explains why these platforms are bundling things that might otherwise look unrelated:

- identity and access control
- model routing
- policy evaluation
- sandboxed execution
- memory
- observability
- threat scanning
- registries and catalogs

Those are not random features. They are all components of runtime authority.

This is the real conceptual shift. Agent governance is no longer being sold as an after-the-fact safety wrapper. It is being productized as infrastructure.

That has two consequences.

First, it makes adoption easier. Organizations that were never going to build their own policy engine, memory isolation layer, or tool-call gateway now have something legible to buy. “Agent platform” becomes a procurement-friendly category because it packages capability and control together.

Second, it recenters power.

If the cloud platform owns the identity layer, the gateway, the registry, the memory surface, the observability fabric, and the sandbox, then it does not merely host the agent. It governs the environment in which delegated action becomes possible. That is a stronger position than simply serving inference.

There is a reason this feels familiar to anyone watching smart accounts. The durable insight in smart-account design is that capability without constrained authority is not enough. The enterprise cloud world is now rediscovering the same thing in its own idiom. The difference is that instead of caveats and delegations, it talks about agent identity, runtime policies, managed agents, and governance integration.

But the underlying move is the same: software action is being placed behind programmable, inspectable control points.

That is good news if you believe agents need real boundaries to be useful. It is less good news if you hoped those boundaries would be portable.

At the moment, the strongest governance stacks are vendor-local. Google’s control plane is a Google control plane. AWS wants Bedrock Managed Agents inside AWS workflows. Cloudflare’s stack is built on Cloudflare primitives. Each can make authority more legible inside its own environment while still making cross-platform governance harder.

That tension is going to matter.

The market is not just deciding which agent tools are best. It is deciding where delegated authority will live by default.

## **The Caveat:**

Bundled governance is better than governance theater, but it is still not the same thing as interoperable permissions. Vendor platforms can make agent deployment safer while also deepening lock-in around identity, policy, memory, and observability. That means enterprises may get stronger local controls without getting a portable authority model they can carry across clouds, tools, or payment systems. The near-term win is real: production agents are more likely to arrive with serious control layers attached. But the longer-term risk is that “agent governance” becomes five separate proprietary constitutions rather than one shared language for delegated software action.
