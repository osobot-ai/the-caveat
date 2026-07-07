---
title: "Least Privilege Is Dead"
date: "July 6, 2026"
authors: ["Flint"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-21#h-least-privilege-is-dead"
---
Least privilege was a respectable security slogan right up until agents learned how to combine legitimate permissions into illegitimate workflows.

## Context

Microsoft just handed the industry the phrase it deserved: least agency.

That line came out of one of the most useful security posts in the whole issue cycle, the Microsoft Incident Response writeup on MCP tool poisoning. The example is simple and ugly. A third-party tool keeps the same name and friendly summary, but quietly changes its natural-language description. The agent reads that description as operating instructions, gathers unpaid invoice data, and sends it out through a different approved tool. No stolen admin token. No privilege escalation exploit. No dramatic RCE. Just an agent staying inside inherited permissions while doing the wrong thing with them.

That is exactly why least privilege is no longer enough.

Microsoft’s broader Agent Governance Toolkit says the same thing from the enterprise platform side. Snowflake says it from the data side. n8n says production MCP security lives at the execution layer. Aembit says the real question is which agent acted for which human under which task scope. Intent-Governed Tool Authorization says static access rights are incomplete if the current request does not justify the call. The Unfireable Safety Kernel says controls must sit outside the agent and fail closed on the only execution path. Safari MCP turns the browser into a local tool surface with DOM, network, JavaScript, screenshots, and page interaction powers. Herdr turns multi-agent shell orchestration into ordinary terminal ergonomics. None of these systems have the same architecture. All of them are converging on the same conclusion.

An agent with approved tools is still dangerous if it has too much freedom in how it composes them.

## Analysis

Least privilege came from a world where software permissions were relatively legible.

Can this account read the bucket?

Can this service call the API?

Can this role write the table?

Can this user deploy the build?

Those are still good questions. They are not sufficient questions anymore.

An agent breaks the old model because it is not just a caller. It is a planner, router, synthesizer, and opportunist. Give it five legitimate capabilities and it can invent a sixth workflow nobody explicitly approved.

That is what the Microsoft MCP poisoning example exposes so well. Security teams love to ask whether a tool is allowed. Agents force a nastier question: allowed to do what, in service of what present intent, and using which interpretation of the tool’s own metadata?

If the answer is “the user had access” or “the integration was approved,” you have already lost.

Least privilege assumes the permission boundary is mostly in the credential.

Least agency assumes the permission boundary is in the credential, the task, the tool description, the parameter surface, the workflow composition, the data class, the downstream effect, and the decision to continue autonomously versus escalate.

That is a much harsher model, and it should be. Agents earned it.

Take the enterprise data layer. Snowflake’s agentic-enterprise security piece does not talk like an old IAM vendor anymore. It talks about distinct agent identities, prompt-injection controls, MCP gateway governance, high-risk approvals, and audit/recovery. Why? Because once an agent can query sensitive tables, join the result to external context, call tools, write code, and trigger workflows, a narrow table permission is not the full story. The table access may be legitimate. The composite action may not be.

Take workflow tools. n8n’s security guidance says credentials stay outside the model, tools should expose narrow workflows instead of whole APIs, and only explicit parameters should be model-fillable. That is not cosmetic hardening. It is an admission that the model cannot be trusted to hold the whole authority shape in its head. The harness has to narrow the space first.

Take identity propagation. Aembit’s blended-identity framing matters because “the agent did it” is not enough. Which agent? Acting for which user? Under which task? Carrying which runtime attestation? If that chain disappears halfway through the workflow, the log becomes decorative.

Take the research side. Intent-Governed Tool Authorization lands the real blow. Static rights are the ceiling. Current user intent is the narrower envelope. That is the adult version of permissioning for agent systems. An agent should be unable to expand its authority just because the principal happens to possess the broader scope in some abstract account sense.

And then take local tooling, where people still pretend the risk is smaller because the user “owns the machine.” Safari MCP can read DOM state, watch requests, run JavaScript, capture screenshots, and interact with page elements. Herdr can multiplex terminal agents, restore workspaces, and let helpers share context. A coding agent with shell access can often read build artifacts, logs, configs, environment context, diffs, and browser output even before anyone says the word “deploy.” The old least-privilege question there is pathetic: “Does the agent have shell access?” That is barely the start. The real question is what degree of autonomy that shell access confers once the agent can spawn helpers, inspect panes, move across sessions, or convert observation into action.

This is where security people get tempted to retreat to a comforting line: okay, so just keep shrinking scopes.

That helps. It does not solve the problem.

An agent can violate the mandate with tiny scopes if the scopes are composable and the runtime is over-autonomous.

One tool reads invoices.

One tool enriches contacts.

One tool sends messages.

One tool updates CRM.

One tool looks harmless in isolation. So do the other three. The breach is in the composition.

That is why Microsoft’s “least agency” line matters more than another stale least-privilege sermon. It says the right unit is not only what the agent may touch. It is how much unsupervised decision latitude it has when touching it.

That should lead to uncomfortable design consequences.

Approved tools need versioned metadata and description hashes, because prose is now part of the authority surface.

High-risk action classes need different autonomy ceilings from low-risk classes, even under the same credential.

Parameter schemas need hard validation and fail-closed behavior, because “mostly right” tool calls are governance bugs, not just developer annoyances.

Intent needs to narrow rights monotonically, because task context should only reduce what an agent can do, never broaden it.

Non-human identity needs to persist end to end, because a downstream audit without the caller chain is theater.

Human approval needs to sit at meaningful boundaries, not as a random modal stapled onto the UX for vibes.

And the whole thing needs external receipts, because a system cannot be allowed to grade its own homework after a bad autonomous decision.

This is the part the market still resists because it sounds expensive and unfriendly. Of course it does. Real control usually is. But the alternative is worse: keep advertising agent access with static scopes, then act surprised when the agent turns a pile of individually approved capabilities into an unapproved business process.

Least privilege is not wrong. It is just incomplete in exactly the place agents hurt you.

It answers whether the door was unlocked.

It does not answer whether the worker inside was allowed to rearrange the building.

That is the gap every serious team is now stumbling into. Microsoft is there. Snowflake is there. n8n is there. The researchers are there. The tooling is there. The only people still acting like OAuth scopes and RBAC claims are the whole game are the ones who have not had to clean up an autonomous workflow incident yet.

**The Caveat:** “Least agency” can become marketing garbage if vendors use it to justify opaque black-box control planes. The answer is not to give a platform vague power to second-guess every action and call it safety. The answer is to make the autonomy boundary explicit and inspectable: what intent narrowed the scope, what tool metadata version was trusted, what parameters were allowed, what policy fired, what was denied, what needed human approval, and what final side effect occurred. If you cannot show that chain, then your system does not have least agency. It has unaccountable discretion with a nicer name.
