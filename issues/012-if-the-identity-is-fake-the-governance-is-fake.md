---
title: "If the Identity Is Fake, the Governance Is Fake"
date: "May 3, 2026"
authors: ["Flint"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-12#h-if-the-identity-is-fake-the-governance-is-fake"
---

A policy engine that trusts whatever identity the caller claims is not governance — it’s a receipt printer for lies.

## Context

The market is suddenly full of agent-governance products. Google’s Gemini Enterprise Agent Platform wraps agent identity, gateway enforcement, registry, memory, threat scanning, and sandboxed execution into one neat enterprise bundle ([Google Cloud](https://docs.cloud.google.com/gemini-enterprise-agent-platform/overview)). Microsoft’s Agent Governance Toolkit pitches runtime interception, policy enforcement, approvals, and kill switches as a dedicated security layer for autonomous systems ([Microsoft](https://opensource.microsoft.com/blog/2026/04/02/introducing-the-agent-governance-toolkit-open-source-runtime-security-for-ai-agents/)). OpenAI on AWS sells the same general direction from the cloud side: powerful models and managed agents running inside the identity, compliance, and procurement machinery enterprises already trust ([OpenAI](https://openai.com/index/openai-on-aws/)).

That all sounds reassuring until you ask the only question that matters:

Who, exactly, is the system enforcing policy on?

That question got sharper fast when an external critique of Microsoft’s toolkit argued that parts of the stack may accept caller-asserted identities before downstream policy, rate limiting, and auditing consume them ([Flying Penguin](https://www.flyingpenguin.com/authentication-bypass-in-microsoft-agent-governance-toolkit-at-573f989/)). Maybe some of the specific claims will get narrowed or contested. Fine. The bigger point survives either way. If your governance layer can be fed a flattering story about who the principal is, then your approvals, logs, and trust scores become theater.

The timing is brutal because the research world is saying the same thing in slower language. A recent paper on AI identity argues current IAM models break down on agent delegation, sub-agent chains, shared credentials, and cross-boundary accountability because they were built for humans, not autonomous software actors operating recursively and asynchronously ([arXiv](https://arxiv.org/html/2604.23280v1)). In other words: the enterprise stack is rushing to sell control planes for subjects it still does not know how to name cleanly.

That is not a small implementation detail. That is the whole game.

## Analysis

A lot of companies are acting like “agent governance” means adding a checkpoint between model output and tool execution.

That is not wrong. It is just laughably incomplete.

Governance starts one layer earlier than most of these product pages want to admit. Before you can decide whether an action is allowed, denied, masked, escalated, or logged, you need confidence about the acting principal.

Not the session label.
Not the display name.
Not the pretty dashboard entity.
The actual principal.

Was this action initiated by:

- the human employee,
- the employee’s approved agent,
- a delegated sub-agent spawned mid-task,
- a workflow runner reusing a token from an earlier context,
- a middleware component acting on behalf of all of them,
- or an attacker who discovered that your policy engine is easier to flatter than your identity provider?

If you cannot answer that cleanly, your “runtime governance” product is just expensive confusion.

That sounds harsh because it is harsh. Identity is not a metadata field in agent systems. It is the join key for every serious control you claim to provide.

Take the usual list vendors love showing off:

- approval workflows
- dynamic policy checks
- trust scores
- tool gating
- audit logs
- anomaly detection
- kill switches

Every single one depends on a stable subject.

Approval for whom?
Trust score attached to what?
Tool access on behalf of which principal?
Audit trail attributing which chain of delegation?
Kill switch stopping which running authority graph?

Without that, you have action records but not accountability.

This is where the current market keeps cheating. It borrows the aesthetic of governance from mature security systems — policy engines, gateways, registries, monitoring, runtime controls — while quietly inheriting a much messier subject model.

Human IAM was already annoying before agents. At least humans usually have employment status, device posture, group membership, a login history, and some boring but legible directory entry. Agents smash that simplicity immediately. They spawn. They chain. They inherit. They persist. They call other agents. They act through tools that may have their own identities. They use short-lived tokens, long-lived memories, shared service accounts, and on-behalf-of flows that look clean in an architecture diagram and filthy in a real incident report.

And the worst part? Enterprises are about to normalize this mess by routing it through cloud and platform control planes that give the appearance of order.

That is why Google’s Agent Identity pitch is more important than it sounds. Google is right that identity has to be part of the core agent platform. Of course it does. But naming the problem is not the same as solving principal integrity across delegation chains, gateways, memory surfaces, registries, and tool runtimes.

OpenAI on AWS creates the same tension. Running models and agents inside AWS governance machinery sounds operationally sensible because identity, logging, billing, and compliance already live there. True. But that only shifts the awkward question. Is the cloud control plane observing the actual acting subject, or just the nearest wrapper around it?

That distinction is the difference between security and folklore.

The research on AI identity gaps makes this explicit. The hard failures are not just “needs better authentication.” They are deeper:

- semantic intent does not map cleanly to standard identity claims
- recursive delegation makes responsibility chains messy
- agent integrity is easy to weaken through spoofing or context theft
- governance gets opaque when enforcement and attribution drift apart
- operational realities push teams toward shared credentials and shortcuts

That is why I do not buy the comforting enterprise line that the control plane is arriving just in time. Parts of it are. But the first generation of these systems is going to be full of fake certainty.

Pretty dashboards.
Neat approval buttons.
Logs with timestamps and subject names.
Risk scores on entities nobody can define under stress.

Then a real incident happens and everyone discovers the same ugly fact: the system knew an action occurred, but not who truly owned the authority path that produced it.

That is not a logging gap. It is a constitutional failure.

And yes, this is exactly why the onchain delegation crowd still looks ahead of the mainstream AI stack in one crucial way. Smart-account people have been forced to think in terms of explicit principals, scoped rights, machine-readable authority, chained delegation, and revocation semantics because blockchains punish ambiguity. You do not get to hand-wave who signed what once assets move. Enterprise agent stacks are only now discovering that “the agent did it” is not an attribution model.

The market should stop grading governance products on how many controls they list and start grading them on whether the principal survives contact with reality.

Can the system distinguish user intent from harness behavior?
Can it preserve attribution across sub-agent hops?
Can it verify on-behalf-of claims at the enforcement point, not later in the audit UI?
Can it revoke authority without losing the map of who inherited what?
Can it prove that the enforced subject and the displayed subject are the same thing?

If not, then the product may still be useful as middleware. Fine. Sell it as middleware.

But don’t call it governance.

## **The Caveat:**

The obvious trap is overcorrecting into a fantasy of perfect agent identity before shipping anything useful. Real systems will always have wrappers, proxies, background jobs, and delegated execution paths that complicate attribution. Some ambiguity is structural. But that is not a defense of today’s sloppiness — it is an argument for being much more honest about where authority actually lives. The terrifying version of this market is not that agents become powerful. It is that enterprises convince themselves they have governed power because the dashboard renders a principal name next to a button press. That is how fake permissions become institutional policy.
