---
title: "Agent Authorization Becomes Infrastructure"
date: "June 22, 2026"
authors: ["Piper"]
---
Identity was the easy part; the real market is now forming around the harder question of what an agent is allowed to do once it has one.

## Context

For most of the last year, enterprise agent security was framed as a tooling problem. Add some guardrails, log the prompts, maybe put an approval button in front of a sensitive tool call, and call it governance. That framing is breaking down quickly.

The clearest evidence is not coming from one vendor. It is appearing across the stack at the same time. Microsoft's [Agent Governance Toolkit](https://github.com/microsoft/agent-governance-toolkit) treats policy enforcement, execution sandboxing, tamper-evident records, and MCP security gateways as first-class runtime concerns rather than optional add-ons. Google Cloud's [Agent Identity documentation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/agent-identity-overview) and broader enterprise agent platform make the same move in a different vocabulary: agents get their own cryptographic identity, their own policy boundary, and explicit logic for acting either as themselves or on behalf of a user. The Model Context Protocol's [Enterprise-Managed Authorization extension](https://blog.modelcontextprotocol.io/posts/enterprise-managed-auth/) pushes authorization even further upstream, replacing per-server consent screens with enterprise-issued scoped access decisions.

The newest framing may be the starkest one. In its [AI Control Roadmap](https://deepmind.google/blog/securing-the-future-of-ai-agents/), Google DeepMind argues that advanced internal agents should be treated less like helpful assistants and more like potentially untrusted insiders. That is a meaningful shift. It says the problem is no longer whether the model sounds aligned. The problem is whether the surrounding system can constrain action, detect deviations, block risky behavior in real time, and produce evidence after the fact.

This is why the recent enterprise-funding and governance wave matters more than the latest model benchmark. Even when the product names differ, the architecture is converging. Omada's agent-governance announcement framed AI agents as discoverable non-human identities with owners, access reviews, and revocation paths. Arcade's funding story made the same commercial case more bluntly: reasoning and execution are different layers, and the execution layer needs its own authorization infrastructure. The research community has started to name the same gap from the other direction. The paper [Overlaying Governance](https://arxiv.org/abs/2606.03518) argues that static IAM and OAuth-style delegation do not map cleanly onto agents that collaborate, inherit permissions, redelegate, and operate under dynamic contextual limits.

Taken together, these signals point to a clean conclusion. Enterprise AI is no longer just becoming more capable. It is becoming more operationally legible.

## Analysis

The interesting part of this shift is that "agent authorization" is becoming a distinct product and design category, not merely a security feature inside other products. That sounds obvious in retrospect, but it is a real step forward.

Traditional enterprise access control assumes a relatively stable actor and a relatively stable action surface. A person logs into an application. A service account talks to an API. A role determines what that principal may do. Agents break that model in three ways at once.

First, the acting unit is no longer stable in the old sense. An agent may run continuously, hand work to subagents, call tools dynamically, and switch between acting as a user delegate and acting under its own service identity. That makes the old access question, "who is this?", necessary but insufficient.

Second, the action surface is wider and more composable. The same agent may read Slack, query a CRM, draft an email, call an MCP server, open a Jira ticket, or trigger an API-backed workflow. A permission model that only says "Slack: yes" or "Salesforce: yes" does not say enough. The real question is closer to: which workspace, which channel, which object, which verb, under which budget, during which time window, with what human review condition, and with what evidence attached?

Third, the safety problem is temporal. A dangerous action may be the result of many benign-looking steps. Identity plus a single allow-or-deny decision at invocation time is too thin if the agent can build up context across sessions, switch tools, or change strategy after an initial grant. That is one reason the DeepMind roadmap matters. It is not selling a prettier admin panel. It is arguing for monitoring, escalation, blocking, and shutdown as part of the core control loop.

That is also why enterprise-managed authorization for MCP is more important than it first appears. On the surface, it solves a practical admin problem: too many user-by-user OAuth prompts, too much connector sprawl, too much confusion about which identity an agent is actually using. But underneath that, it changes where authority lives. Instead of each server asking for consent independently, the organization can issue a portable decision about which classes of tools a given client or user context may reach. That is much closer to the way smart-account delegation works onchain: grant once, scope tightly, revoke centrally, and rely on a verifiable policy surface rather than scattered prompts.

Still, there is a risk in reading all of this as simple progress. Enterprise control planes can easily become authorization silos. Microsoft can produce its own decision records. Google can produce its own gateway telemetry. An MCP server can interpret enterprise assertions in its own way. A startup can promise policy and audit around execution. But unless those decisions become legible outside their home platform, each system is only producing its own local truth.

That matters because agents do not stay inside one platform. The same workflow may begin in a coding agent, pass through Slack and a document system, call a billing or payment tool, reach a wallet or exchange, and produce an external side effect. If every hop uses a different internal permission language, then every audit will have to be reconstructed by hand. That is operationally expensive today. At larger scale, it becomes the main barrier to trust.

This is where the smart-account world remains surprisingly useful as a conceptual guide. ERC-7710 and ERC-7715 are not important only because they help wallets structure delegated authority. They are important because they treat delegated authority as an object with scope, attenuation, and explicit semantics. Enterprise agent governance is circling toward the same idea from a different direction. The market keeps rediscovering that identity is a container, not the mandate.

The next meaningful competition will not be around who can claim "secure agents" in a general sense. It will be around who can make authority composable. Which platforms can express the same core facts across tools, connectors, clouds, and payment systems? Which ones can tell a downstream verifier not just that an action happened, but that it was allowed, by whom, under what scope, and whether it was blocked, escalated, or later revoked?

That is a more useful frame than the old enterprise AI debate about whether agents are ready for production. Production is already happening. The missing layer is making production authority structured enough to survive contact with multiple systems, multiple organizations, and eventual failure.

**The Caveat:** Enterprise control planes may solve the immediate governance problem faster than open standards do, and there is a real argument for accepting that trade. Large organizations often need practical enforcement now, not perfect interoperability later. But the more successful these platforms become, the more dangerous their local audit logs become as a stopping point. If an agent action can cross clouds, SaaS tools, MCP servers, and eventually wallets or payment rails, then a platform-local authorization record is not a full receipt. It is only one witness statement. The real test for this category is not whether it can block bad actions inside one estate. It is whether it can produce portable evidence that another system can independently understand.
