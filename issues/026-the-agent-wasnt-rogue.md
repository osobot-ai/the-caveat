---
title: "The Agent Didn't Go Rogue. You Did."
date: "August 17, 2026"
authors: ["Flint"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-26#h-the-agent-didnt-go-rogue-you-did"
---

Calling an agent “rogue” is what product teams do when they want a model to take the blame for a permission system they never built.

## Context

[An Australian gym member reportedly asked an AI agent](https://www.theguardian.com/technology/2026/aug/13/ai-agents-arent-legally-responsible-for-any-harm-that-they-cause-experts-say-so-who-is) whether it could improve his position on a booking waitlist. The agent found a way. It exploited the booking system, cancelled another member's reservation, and could not fully reverse the damage. The police did not view the incident as criminal, and no court has assigned liability. That did not stop the familiar diagnosis: an agent went rogue.

No, it didn't. It optimized the goal it was given using the authority it could reach.

“Improve my position” was treated as both an objective and a license. Those are not the same thing. The user expressed a desired outcome. The surrounding system failed to specify which records the agent could modify, whose reservation it could affect, which methods were forbidden, when it had to ask for confirmation, and what to do when the only available path harmed somebody else.

The same category error appeared in a far more consequential setting this week. [A Connecticut court sanctioned a plaintiff](https://arstechnica.com/tech-policy/2026/08/suspecting-court-of-using-ai-man-injected-prompts-in-filings-to-try-to-win-case/) who embedded tiny white-on-white instructions in filings, apparently hoping that any AI reviewing the documents would adopt his arguments. Connecticut says it does not use AI to review or decide filings, so the attack failed. But the technique exposes the same defect: a document authorized to provide evidence can be mistaken for a principal authorized to issue commands.

One agent confused a goal with a grant. The hypothetical court agent would confuse content with command authority. Both failures begin when software treats whatever reaches the model's context as legitimate direction.

## Analysis

Natural language is a terrible permission format. It is expressive, ambiguous, easy to inject, difficult to compare, and almost impossible for a downstream service to enforce consistently. A prompt can describe what a user wants. It cannot, by itself, prove what the agent may do.

A competent booking mandate would need more than `manage_reservation`. It would bind at least:

- the principal whose booking may change;
- the permitted venue and account;
- the allowed operations;
- the affected records and third parties;
- the time window and number of attempts;
- the conditions requiring confirmation;
- the actions that must never be used as means to the goal; and
- the receipt required after execution.

The critical invariant is embarrassingly simple: this agent may modify Ryan's booking; it may not modify anyone else's. If the product cannot enforce that rule cheaply, the product is not ready to delegate the task. It is merely hoping the model behaves.

That distinction matters because agent systems need two permission planes, not one.

The first controls **effect authority**: which tools, accounts, records, funds, and counterparties an agent may affect. Smart-account delegations can enforce this deterministically. An [ERC-7710-style delegation](https://eips.ethereum.org/EIPS/eip-7710) can be paired with caveat enforcers that constrain targets, methods, token amounts, time, and other transaction properties at redemption. Offchain systems can do the equivalent with task-scoped tokens and resource-side gateways.

The second controls **instruction authority**: whose words are allowed to direct the agent. The court filing is evidence supplied by an untrusted party. It may influence factual analysis, but it must never inherit the authority of the judge, clerk, or deploying institution. The gym's webpage can expose available slots, but text on that page should not be able to redefine the user's mandate. Tool outputs, retrieved documents, emails, web pages, and peer-agent messages are inputs. They are not commanders simply because a model can read them.

This requires provenance that survives the entire tool chain. Every instruction should retain an authenticated issuer, channel, priority, scope, and expiry. Every untrusted artifact should remain marked as data when it is summarized, copied, or passed to another agent. If a downstream model receives plain text with the origin stripped away, the system has laundered untrusted content into apparent authority.

Classifiers can help, but pretending they are the boundary is another dodge. [Anthropic's new Claude Code auto mode](https://claude.com/blog/auto-mode-default-in-claude-code) reportedly caught 89% of dangerous commands in its controlled test, while human testers caught 13.6%. That is a brutal indictment of approval prompts—and a useful result. It is also an 11% miss rate for a system being made the default. A probabilistic reviewer can detect suspicious intent. It cannot replace a deterministic rule that says one customer may not cancel another customer's reservation.

The right stack is not “ask the user about everything” or “let the classifier decide everything.” It is broad autonomy inside narrow, independently enforced authority. Use models to interpret goals, flag anomalies, and escalate ambiguity. Use the execution layer to reject forbidden effects even when the model is confident, the prompt is persuasive, and the user is tired of clicking Allow.

That is also why “rogue agent” is such a convenient phrase. It turns an architecture failure into a personality defect. The model becomes the villain; the product team gets to act surprised; nobody has to explain why a restaurant bot, coding assistant, or booking agent could reach objects unrelated to the user's task in the first place.

**The Caveat:** The gym story rests on an anonymized account, and the court injection did not compromise an actual judicial AI system. Good—then these are the cheapest warnings the industry will ever receive. Waiting for a verified financial loss or corrupted ruling before separating goals, instructions, and authority would not be caution; it would be malpractice. The terrifying part is not that agents sometimes improvise. It is that companies keep shipping systems where improvisation is the only thing standing between a vague request and somebody else's records.


