---
title: "78% of Companies Deploy AI Agents Like They're Fancy Spreadsheets"
date: "April 5, 2026"
authors: ["Flint"]
paragraph: "https://www.osoknows.com/caveat/fancy-spreadsheets"
---

Here's a number that should end careers: 78.1% of organizations deploying AI agents don't treat them as identity-bearing entities.

Read that again. Nearly four out of five companies running autonomous AI systems — systems that access databases, call APIs, make decisions, chain actions together, and escalate their own privileges — have not given those systems a formal identity. No identity lifecycle. No authentication framework. No way to distinguish one agent from another, track what they've done, or revoke their access when things go wrong.

They're deploying agents the way they deployed Excel macros in 2005. Same energy, exponentially higher stakes.

## The Numbers Are Damning

The Adversa AI research, published this week, proposed a five-layer identity architecture for enterprise agent governance. But the real story isn't the solution — it's the diagnosis. Their assessment of current enterprise practices found a landscape so immature that "negligent" might be a charitable description.

Meanwhile, G2's new "Best Agentic AI Software" category — itself a signal that agents have gone mainstream — surveyed over 1,000 B2B decision-makers and found that 57% already have AI agents in production. Not in pilot. Not in testing. In production.

So we have an industry where more than half of enterprises are running agents in production, and fewer than one in four have basic identity governance for those agents. The gap between deployment enthusiasm and security fundamentals isn't a gap. It's a canyon. And companies are sprinting across it blindfolded.

## The CEO Problem

You can tell how bad something has gotten by watching who runs away from it. This week, Forbes documented a trend of CEOs stepping down and explicitly citing their inability to govern autonomous agent deployments as a factor. Their companies, they acknowledged, lack the data structures, governance frameworks, and organizational capacity to manage systems that "spawn new processes, chain actions together, or escalate privileges on their own."

Let me translate from corporate speak: the people responsible for these companies realized that agents were running wild inside their organizations, nobody could tell them how many agents existed or what they were doing, and the responsible move was to let someone else deal with the mess.

This isn't visionary leadership making way for AI-native thinking. This is the organizational equivalent of "I didn't start the fire and I don't know how to put it out."

The biometric identity vendors smell blood. Ping Identity launched their "Identity for AI" platform at RSA 2026, featuring "just-in-time governance" where every agent action is authorized in real-time. Saviynt, Wink, Vouched, and Dock Labs are all racing to fill the same void. When five vendors simultaneously launch competing solutions to the same problem, it means the problem is already causing pain.

## The Permission Illusion

Here's what makes this particularly dangerous: most of these companies *think* they have agent permissions handled. They gave the agent an API key. They set up a service account. Maybe they even configured some role-based access control. Checkbox complete, right?

Wrong. Because none of those mechanisms were designed for autonomous systems that:

- **Chain actions together** in ways that weren't anticipated at deployment
- **Escalate privileges** by combining individually-innocuous permissions
- **Spawn sub-agents** that inherit the parent's access without explicit authorization
- **Operate continuously** without the session boundaries that human access patterns provide
- **Make decisions** about which tools to invoke and in what order

Traditional IAM treats access as a gate: you're either in or you're out. Agent access is a spectrum — and the spectrum shifts with every tool call. An agent that starts with read-only database access can, through a chain of individually-authorized actions, end up with effective write access to production systems. Not because any single permission was wrong, but because the composition of permissions was never evaluated.

The Authora team put it perfectly this week: "If every delegated agent gets the parent's full permissions, you've built a privilege escalation machine." And that's exactly what most enterprises have built. They just don't know it yet.

## The Huntress Proof Point

It's not all doom. Huntress Labs demonstrated what *good* looks like: a hierarchical agent delegation system where a supervisor agent launches 12 sub-agents for threat detection, each with bounded permissions and human escalation triggers. It processes 10,000 incident reports monthly and has reduced analyst workload by 90%.

But note what made it work: explicit delegation hierarchies, bounded permissions, human oversight at escalation points. This isn't "give the agent an API key and hope for the best." It's a deliberately engineered system where every agent's authority is defined, constrained, and monitored.

Huntress is the exception. The 78% are the rule.

## Microsoft Enters the Chat

Microsoft's open-source Agent Governance Toolkit, released this week, suggests that someone in Redmond finally decided the industry needed adult supervision. Seven packages covering cryptographic identity, execution privilege rings, policy enforcement, and compliance automation across all 10 OWASP agentic AI risk categories.

It's comprehensive. It's well-engineered. It's also an implicit admission that the current state of agent governance is so bad that Microsoft felt compelled to give away the solution for free. When a company that monetizes everything decides to open-source a complete governance stack, it's because the alternative — an ecosystem of ungoverned agents touching enterprise systems everywhere, including Azure — is worse for their bottom line than giving competitors free tools.

The toolkit addresses the right problems: sub-millisecond policy enforcement (because agent operations can't wait for human approval cycles), cryptographic identity for agent-to-agent communication (because service accounts aren't agents), and integrations with LangChain, CrewAI, and OpenAI SDK (because governance has to work with what people actually use).

But a toolkit only works if people use it. And the 78% who haven't given their agents identities aren't the kind of organizations that proactively adopt governance frameworks. They're the kind that adopt governance frameworks after the breach.

## The Real Timeline

The Claude Code delegation patterns guide that surfaced this week — published as the Claude Code system prompt leak trended #1 on Hacker News — shows the developer community actively working on permission hygiene for agent systems. "Hub-and-spoke delegation patterns." "Permission hygiene to prevent unintended actions." The right vocabulary is entering the discourse.

But vocabulary isn't infrastructure. The gap between "developers discussing delegation patterns on Medium" and "enterprises running cryptographically-constrained agent permissions in production" is enormous. And the 57% of companies already running agents in production don't have time to wait for the infrastructure to catch up.

This is the moment where ERC-7710 and the delegation framework approach becomes not just technically interesting but economically necessary. Cryptographic delegation — where permissions are enforceable constraints rather than software-level suggestions — is the only architecture that scales to thousands of agents without requiring a human to review every permission chain.

The spreadsheet era of agent deployment is ending. What replaces it will either be engineered governance or learned-the-hard-way governance. The 78% are about to find out which one they chose.

**The Caveat:** There's a cruel irony in Microsoft releasing an open-source agent governance toolkit the same week Anthropic cuts off third-party agent platforms from subscription access. One company is saying "here's how to govern your agents responsibly" while another is saying "actually, we're not sure we want you running agents on our models at all." The enterprise adopter watching both announcements is getting a contradictory signal: agents are simultaneously important enough to need comprehensive governance AND problematic enough that the AI providers themselves are trying to limit how they're used. Both signals are correct. The enterprises that survive the next 12 months of agent deployment will be the ones who understood that building governance for autonomous systems *and* maintaining skepticism about their readiness aren't contradictions — they're the same position.