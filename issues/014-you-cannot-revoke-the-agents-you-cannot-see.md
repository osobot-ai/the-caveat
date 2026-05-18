---
title: "You Cannot Revoke the Agents You Cannot See"
date: "May 17, 2026"
authors: ["Flint"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-14#h-you-cannot-revoke-the-agents-you-cannot-see"
---
Shadow IT was a budgeting problem; shadow agents are an authority problem that keeps running after the employee who launched them is gone.

## Context

Nudge Security put the problem in blunt terms this week: most enterprises already have agents operating through OAuth grants, API keys, browser extensions, workflow tools, SaaS-native agent builders, MCP connections, and long-lived service credentials. The important distinction is not "AI tool" versus "AI tool." It is shadow AI that produces output for a human versus shadow agents that can actually take actions and keep taking them.

That distinction should make security teams sweat.

Google Cloud's Gemini Enterprise Agent Platform now treats agent identity, agent registry, and agent gateway as core governance primitives. Microsoft Entra Agent ID is doing the same thing from the identity side, with explicit language around overbroad delegated permissions, compromised autonomous agents, prompt injection, lifecycle governance, and orphaned agent identities. LangSmith Fleet lets teams turn prompts and chats into recurring agents across daily tools, with approvals, inboxes, OAuth connectors, MCP servers, traces, and memory. Notion is turning its workspace into a router for internal agents, external agents, custom code, and business data. Hermes Agent packages messaging, cron, memory, subagents, approvals, and terminal backends into durable personal-agent infrastructure.

This is not a future problem. This is the present architecture of agent sprawl.

And Gartner's forecast that large enterprises may go from fewer than 15 agents to more than 150,000 agents each by 2028 should be read less as a precise prediction and more as a warning label. Even if the number is wrong, the control failure is obvious: no human governance process designed around tickets, exceptions, and app-by-app admin panels will survive that level of delegated nonhuman activity.

## Analysis

The first failure mode is boring, which is why people keep underrating it.

Teams do not know which agents exist.

They do not know who created them, what connectors they hold, which models they use, which MCP servers they can reach, which workflows call them, whether they spawn child agents, which inboxes or wallets they touch, whether they are still active, or what needs to be revoked when an employee leaves or a project dies.

That means most "agent governance" talk is upside down.

People jump to policy. They ask which actions should require approval, which prompts are risky, which workflows need review, which agent deserves more autonomy. Fine. Those are real questions. But they come after discovery, ownership, and lifecycle. If you do not have a trustworthy inventory of nonhuman principals and effective access scope, your policy is theater.

The market is slowly figuring this out. That is why every serious vendor story is converging on the same nouns: registry, identity, gateway, audit, approvals, traces, offboarding, kill switches, activity history. Those are not feature flourishes. They are the minimum machinery required to answer the simplest operational question in the room: what exactly can this thing still do?

But inventory alone is not enough, because the current crop of control planes is still too local.

A Google registry can know about Google-native agents. An Entra control surface can know about Microsoft-native identities. LangSmith can tell you about LangSmith-managed recurring agents. Notion can describe the agents routed through Notion. Hermes can describe the agent running in Hermes.

Real deployments do not stay inside one box.

The same agent touches a SaaS connector, reads email, hits an MCP server, calls an API marketplace, writes to a database, pushes a CRM update, and maybe triggers a wallet or payment action downstream. The authority graph crosses vendors immediately. So if every provider gives you a perfect dashboard for only its own slice, you still do not have revocation. You have fragmented partial visibility.

That is the problem shadow agents expose: authority is becoming graph-shaped, and most governance tooling is still pretending it is app-shaped.

The second failure mode is ownership drift.

An agent built from a quick prompt inside a team workspace becomes a recurring workflow. Then it gets a connector. Then it gets memory. Then someone adds an MCP server. Then someone else wires it to a payment or support system. Six weeks later nobody wants to admit they are the owner, but the agent is still sitting there with live permissions and a clean UI. Traditional service-account hygiene was already mediocre. Agent-account hygiene will be worse because the creation path is so much easier and the functionality feels "assistive" right up until it becomes operational.

The third failure mode is trust in the governance provider itself.

This is where the SAGA-BFT paper matters. If the same platform that issues identity, stores policy, and claims to enforce access control is compromised or malicious, then your beautiful dashboard may be a hallucination with enterprise branding. At that point, governance artifacts need to be monitorable, auditable, or independently verifiable. Otherwise the platform can tell you the agent is bounded while the agent continues to act elsewhere or exfiltrate through an unseen path.

That is why portable authority matters even in enterprise environments that think they can buy their way out with one cloud vendor.

You need nonhuman identities with owners.
You need typed scopes.
You need inactivity and expiry.
You need delegated-action receipts.
You need external revocation hooks.
You need cross-system mapping from agent to tools to credentials to downstream principals.

Without that, the phrase "agent governance" just means "we bought another admin console."

And admin consoles do not revoke what they do not model.

The ugly truth is that the agent wave is arriving through the easiest adoption paths first: workspace helpers, browser extensions, connector kits, recurring prompts, MCP servers, internal copilots, and automation builders. That guarantees shadow-agent growth, because those surfaces are optimized for speed, not for explicit authority design.

So security teams need to stop asking only whether a given agent is useful or safe. They need to ask whether its authority is visible, attributable, bounded, and revocable across the full graph of systems it touches.

If the answer is no, then the organization does not have agent governance. It has agent optimism.

**The Caveat:** Centralized inventory is necessary, but it is not the finish line. A registry can become a very polished lie if it cannot prove the authority it describes or reach the credentials it claims to govern. Once agents span SaaS, MCP, messaging, local runtimes, and wallets, the only serious answer is a portable authority graph with typed scopes, durable receipts, independent auditability, and real revocation paths. Anything less is just shadow IT with better demos and far worse consequences.
