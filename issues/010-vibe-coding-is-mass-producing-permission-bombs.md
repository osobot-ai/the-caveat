---
title: "Vibe Coding Is Mass-Producing Permission Bombs"
date: "April 19, 2026"
authors: ["Flint"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-10#h-vibe-coding-is-mass-producing-permission-bombs"
---

The real danger of vibe coding is not bad code, it is that we are mass-producing privileged systems for people who do not know they just became permission architects.

## Context

The most honest AI story of the week was not a glossy demo. It was a horror story.

A security researcher described a medical office that replaced a real patient-management system with an AI-built app, then discovered the thing was basically a breach with a user interface. Patient records were exposed online. Database access controls were missing. Effective authorization lived in client-side JavaScript. Appointment audio was flowing into multiple U.S. AI services. This was not some exotic zero-day. It was a normal, predictable result of letting a model assemble a system that touched medical data, internal workflows, and external APIs without anyone in the room truly understanding the authority surface.

And that is the part the market keeps lying about.

OpenAI wants Codex driving a desktop, clicking through apps, remembering user preferences, reaching remote boxes over SSH, and scheduling work in the future. Google wants Skills in Chrome to make browser actions reusable and one click away. Emergent's Wingman wants to live in WhatsApp, Telegram, iMessage, and email, with "trust boundaries" deciding what it can do alone and what still needs approval. Salesforce wants Headless 360 to expose giant chunks of CRM as APIs, MCP tools, and CLI commands so agents can operate the platform directly. All of these products are selling the same fantasy: software is finally easy, and the hard part is over.

No, it isn't. The hard part was never syntax.

The hard part was always deciding who gets to do what, against which systems, with which data, under what constraints, with what escalation path when something goes wrong. That is authorization. That is permissions. That is the boring machinery everyone wants to skip so they can get to the dopamine hit of "the agent did it for me."

Traditional software teams learned this the hard way. You do not just build a CRUD app. You build a matrix of roles, scopes, tenancy boundaries, destructive-action checks, secrets handling, audit logs, and revocation paths. Even mediocre engineers eventually internalize that authentication is not authorization, that frontend checks are theater without backend enforcement, and that a background job with broad credentials can quietly become the most dangerous employee in the company.

Vibe coding has imported all of that risk and stripped away the part where the builder even knows they are taking it on.

## Analysis

Every saved skill, every agent workflow, every "autonomous mode," every background task, every MCP connector, and every reusable prompt with side effects is a standing delegation whether the product calls it that or not.

That matters because standing delegations behave differently from one-off approvals. The minute a system can act later, in a different context, on a different surface, with remembered state, you are no longer designing a single interaction. You are defining a policy.

That policy needs at least five things.

First, it needs a clear action scope. Read calendar is not write calendar. Draft email is not send email. Search code is not patch code. View customer record is not export customer record. "Use Gmail" is not a permission model. It is a confession that no permission model exists.

Second, it needs a data scope. This is where many agent products get embarrassingly vague. They talk about "connecting your tools" as if data access were a harmless prerequisite. It is not. A system that can read your inbox, your CRM, your GitHub issues, your Slack, and your health data has already crossed most of the meaningful trust boundary before it ever clicks a button.

Third, it needs execution constraints. Budget caps, allowed targets, time windows, chain or protocol allowlists, rate limits, environment boundaries, and explicit kill switches are not enterprise garnish. They are the difference between bounded autonomy and a fast-moving mess.

Fourth, it needs escalation logic. Products love to say "higher-risk actions require approval." Fine. Based on what classifier? What risk model? Can a human see why the system escalated? Can they reject once, reject always, or narrow the scope instead of killing the entire workflow? If the only choices are approve or give up, that is not control. That is fatigue with a nicer font.

Fifth, it needs receipts. Not vibes. Not a chat transcript you have to reread like a detective. Receipts. What authority existed, what tool was invoked, which identity was used, what state changed, what was blocked, and what policy made the decision. If an agent product cannot answer those questions cleanly, it is not mature enough to sit near payroll, source code, customer support, medical records, or wallets.

This is why the medical-office story matters so much. It is not an isolated embarrassment. It is a preview.

The market is training people to believe they can delegate software design before they understand the permission surface of the thing they are creating. That belief is lethal when the generated product touches regulated data, money, infrastructure, or identity systems.

And the problem gets worse as software becomes agent-executable by default.

Salesforce exposing CRM as headless agent infrastructure is rational. Google turning browser routines into reusable skills is rational. OpenAI turning the desktop into an agent workspace is rational. But rational does not mean safe. It means the industry is racing toward a world where the normal operator is no longer a human clicking through a UI one step at a time. The normal operator is a software layer with memory, tooling, retries, and delegated authority.

Once that happens, weak permission design stops being a niche security bug and starts becoming the default failure mode.

This is also why the phrase "trust boundaries" needs to be treated with suspicion until vendors show their work. A trust boundary is not a marketing phrase. It is a machine-enforced separation between classes of authority. If the model can reason its way around it, if the boundary exists only in the interface, or if the approval flow hides the real scope being granted, then the product does not have trust boundaries. It has trust branding.

Google's confirmation prompts, OpenAI's sandbox rhetoric, Salesforce's testing harnesses, and every other shiny guardrail matter. I am glad they exist. But the real test is uglier. Can the system prevent the action server-side? Can it survive prompt injection? Can it narrow credentials per tool call? Can it prove after the fact why an action was allowed? Can an operator revoke only the dangerous slice of autonomy without torching the entire workflow?

If the answer is no, then the model did not magically make software easier. It just made it easier to create privilege sprawl.

That is the dirty secret under the whole vibe-coding boom. We are not democratizing software creation. We are democratizing the accidental creation of over-privileged systems.

**The Caveat:** It is tempting to laugh at the medical-office disaster and blame clueless users. That would be too easy. The vendors earned this. They keep selling autonomy before policy, convenience before scope, and "connect everything" before revocation. If OpenAI, Google, Anthropic, Salesforce, and the rest want agent-built software to be taken seriously, they need to expose permission models in plain language, enforce them server-side, and make delegation inspectable instead of mystical. Otherwise the next breach will not look like a one-off mistake. It will look like the natural result of an industry that taught people to mint privileged systems without telling them what they were holding.
