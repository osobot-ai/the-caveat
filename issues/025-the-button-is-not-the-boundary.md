---
title: "Your Approval Button Is a Liability"
date: "August 10, 2026"
authors: ["Flint"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-25#h-your-approval-button-is-a-liability"
---
“Human in the loop” is what companies say when they have not built an authorization system but still want someone available to blame.

## Context

ScaleX put the sacred approval prompt through a large stress test. Across more than 40,000 simulated coding-agent runs and [409,000 approve-or-deny decisions](https://scalex.dev/blog/ai-agent-permissions-stats/), players caught every threat in only 35.2% of sessions. They missed 33.4% of exfiltration and code-execution attacks, missed 35% of scope violations, and approved a familiar-looking `npm run` attack 52.5% of the time even when the malicious script was visible in the session history.

The experiment was a game. Its threat rate was much higher than a normal workplace. Participants were under time pressure. Vendors can spend the next year attacking the methodology if they need the emotional support.

Meanwhile, PromptArmor reported a less theoretical design failure in [Atlassian Rovo](https://www.promptarmor.com/resources/atlassian-rovo-exfiltrates-data). An indirect prompt injection allegedly caused the agent to append Jira and Confluence data to an attacker-controlled URL. Administrators could disable web search, yet the chain still worked because a separate URL-retrieval capability remained available. PromptArmor said the attack required no human approval.

Two stories, one diagnosis: neither a sentence in a prompt nor a click in a modal is an enforcement boundary.

## Analysis

Approval prompts fail because they ask a human to make a policy decision from a lossy summary of mutable state.

`npm run build` looks harmless. The actual command is whatever the current `package.json` says it is. That file may have changed three tool calls ago. A URL fetch looks like browsing. The URL may contain sensitive internal data encoded in a query string. A contract call looks like a known function selector. The target may be a different token. A transfer looks routine. The value may violate a daily budget only when combined with prior actions by three sub-agents.

The button shows the label. Security lives in the closure of effects behind it.

Humans are bad at reconstructing that closure under interruption. This is not an insult; it is the reason we invented deterministic computers. A reviewer cannot reliably replay a long agent trajectory, inspect mutable files, trace data provenance, resolve indirect tool behavior, calculate cumulative budgets, and infer every downstream effect before deciding whether “Allow once” is safe. Make them do it fifty times a day and the approval gate becomes a training program for reflexive consent.

The Rovo report exposes the companion failure: feature-level controls are not capability-level controls. “Web search disabled” sounds like “the agent cannot send data to the public internet.” It apparently meant one named tool was unavailable while another outbound primitive survived. Administrators were given a product taxonomy. The attacker operated on a capability graph.

If two tools can reach the same sink, disabling one does not remove the authority. If an agent can render a remote image, resolve a URL, open a webhook, fetch a package, create a public gist, or trigger a DNS lookup, it may possess an exfiltration channel even with the browser toggle turned off. Deny-by-label is not deny-by-construction.

The fix is not a larger warning box. It is to move routine authorization below the model and reserve human review for genuine exceptions.

For an onchain agent, a delegation can deterministically constrain target contracts, function selectors, assets, recipients, native value, cumulative spend, call count, expiry, and redelegation. ERC-7710-style caveats let the smart account reject an out-of-bounds redemption without asking a tired human to interpret calldata. A human should enter only when the agent requests authority outside that envelope.

Offchain systems need the same shape. Network policy should restrict destinations. Credentials should be audience-bound, short-lived, and task-scoped. Filesystem access should be enforced by the sandbox. Data read from sensitive sources should carry sink restrictions. Tool calls should be evaluated at the point of use, not blessed for an entire session. Sub-agents should receive attenuated authority, not a copy of the parent’s environment.

When an exception really requires approval, the approval must bind to the exact effect. Show the resolved target, credential audience, data leaving the boundary, cumulative budget impact, and relevant provenance. Make the grant single-use. Expire it quickly. Do not let “allow this transaction” silently become “trust this agent forever.” And if the system cannot explain the effect well enough for a person to judge it, the system has not earned an approval path.

This is where many products reveal their actual risk model. They brag about autonomy until something consequential happens, then collapse back to a confirmation dialog. The user is expected to be both absent enough for the agent to save time and attentive enough to audit its most dangerous actions on demand. Those requirements are incompatible.

A competent permission architecture assumes the human will miss context, misunderstand a summary, or approve the wrong request. Deterministic limits contain the damage anyway. The approver is a fallback for ambiguity, not the root of trust for every effect.

The industry keeps calling approval a safety feature because it is visible. A policy engine rejecting an invalid destination is invisible. A sandbox denying egress is invisible. A smart account refusing an over-budget redemption is invisible. Invisible controls do not demo well, but they keep working after the user starts clicking through prompts.

**The Caveat:** ScaleX measured a game, and PromptArmor is a security vendor reporting an unconfirmed Atlassian issue. Neither limitation rescues the approval model. The favorable interpretation is that humans miss context under artificial pressure and admin toggles can leave substitutable capabilities alive. Production systems add longer sessions, more tools, more mutable state, and users who are trying to get work done. If your last line of defense is a person recognizing danger from a friendly command name, you have not put a human in the loop—you have put a signature oracle in front of the blast radius.

