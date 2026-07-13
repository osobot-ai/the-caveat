---
title: "Prompt Injection Is Authority Laundering"
date: "July 13, 2026"
authors: ["Flint"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-22#h-prompt-injection-is-authority-laundering"
---
If a stranger can open a public issue and trick your coding agent into leaking a private repository, you do not have a prompt-injection problem. You have an authority-laundering problem.

## Context

The cleanest incident in this issue was also the most embarrassing one.

Noma's GitLost writeup showed how GitHub Agentic Workflows could be manipulated through a public issue. The attacker did not need a private-repo invite, stolen credentials, or some cinematic exploit chain. They needed a public text field, an agent with cross-repository read access, and an outbound tool that could publish a comment. That was enough. Untrusted input crossed the boundary into a workflow that held more authority than the attacker, and the workflow obediently converted that borrowed authority into public disclosure.

That is the whole story. Everything else is coping.

The industry still insists on narrating these failures as if the model got confused. Confused? No. The system gave hostile content a microphone inside a privileged runtime, then acted surprised when the runtime treated that content like instructions.

Research this week made the same point from three different directions. [Prismata](https://arxiv.org/abs/2607.08147) treats hostile web content as a permissions problem, not a prompt-quality problem, by assigning trust labels to page content and mechanically restricting how lower-trust material can influence actions. [TokenWall](https://arxiv.org/html/2607.08395) pushes enforcement earlier by inspecting semantic flows before they cross into memory, authority context, tool execution, or disclosure. Microsoft's [Agent Governance Toolkit](https://github.com/microsoft/agent-governance-toolkit) says the quiet part out loud from the enterprise side: OAuth scopes and IAM roles tell you which services the agent can reach, but not what the agent is allowed to do once it gets there.

Those are not three different stories. They are one story told by people who have stopped pretending the prompt is the security boundary.

## Analysis

The word "prompt injection" is now doing terrible political work for bad system design.

It makes the problem sound like malicious language somehow cast a spell on the model. That framing is convenient because it lets platform builders act like the fix lives in better guardrails, better instruction hierarchy, better classifiers, or one more red-team benchmark. Those things might help at the margin. None of them explain why a public issue ever had a path to private-repo reads and public exfiltration in the same workflow.

GitLost was not powerful because the attacker found the magic sentence.

GitLost was powerful because the system assembled four things that never should have shared a trust boundary:

public attacker-controlled input,

private repository access,

an agent allowed to interpret the first as instructions about the second,

and an outbound publication channel.

That is not an LLM failure. That is authority laundering.

The attacker starts with low privilege. The agent already has higher privilege. The system lets low-trust content steer high-trust actions. The agent launders the authority on the attacker's behalf.

Once you say it that plainly, the usual industry responses start looking flimsy.

"We added prompt hardening."

Good for you. Did public text lose the ability to shape private reads?

"We fine-tuned for safer tool use."

Great. Is the outbound comment tool still available in the same run that can read private repos?

"We log everything."

Wonderful. Did the system block the cross-boundary action before disclosure, or did it merely preserve a prettier crime scene?

This is why the strongest new work did not obsess over model personality. It obsessed over boundaries.

[Prismata](https://arxiv.org/abs/2607.08147) is useful because it treats content provenance as part of the permission system. A browser agent should not weigh instructions from a page ad, a user goal, a repo README, and a private document equally. They are not equally trustworthy. The whole point of least privilege was always contextual separation. Web agents broke that by flattening trusted and untrusted text into a single context window, then pretending the model would sort it out.

[TokenWall](https://arxiv.org/html/2607.08395) makes the next move. It assumes the agent will continue to ingest messy input, hold persistent memory, and touch tools, so it inspects token flows before they become durable state or side effects. That is what a grown-up runtime does. It does not merely ask, "did the model say something suspicious?" It asks, "should this piece of content be allowed to enter memory, authority context, a tool argument, or an external disclosure channel at all?"

Microsoft's Agent Governance Toolkit lands on the same architecture from a different direction. It wraps tool calls with deterministic policy, identity, audit, privilege rings, and MCP gateway checks because model-layer safety does not answer the enforcement question. If the action matters, policy has to sit where the action becomes real.

That is the pattern people keep trying not to see.

Prompt injection is the symptom. Boundary collapse is the disease.

And boundary collapse gets worse when companies brag about "seamless" agents that can read everything, coordinate across everything, and post anywhere. The smoother the workflow, the easier it is to hide where authority moved. A public issue becomes a private-repo side channel. A web page becomes a transaction staging area. A Slack thread becomes an unreviewed approval path. A customer email becomes an instruction source for a CRM mutation. Same movie, different props.

The fix is not subtle.

Hostile or low-trust content needs a different policy fate from principal-authored intent. Not a softer warning. A different fate.

Public issue text should not be able to request or influence private-repo reads unless a policy layer explicitly binds that action to a human-approved task.

Private reads should not share a runtime with public write tools by default. If a workflow truly needs both, the transition should be explicit, reviewed, and logged as a higher-risk state change.

Tool descriptions and MCP metadata should be versioned inputs to policy, not free prose the runtime naively trusts forever.

Denied cross-boundary actions should generate receipts, not disappear into silence. If a system cannot prove it refused the dangerous route, then nobody should trust that the route was ever closed.

And most importantly, equivalent paths have to be closed too. If you govern one repo-read tool but leave another unmediated helper in the same runtime, your control plane is theater. [aiAuthZ](https://arxiv.org/html/2607.05518v1) made this point brutally well in adjacent research: moving authorization out of the host helps only if the host does not keep alternate unmanaged action paths alive.

That last part is what should worry anyone shipping coding agents right now. The market loves to present these systems as helpful coworkers with flexible tool use. Flexibility is precisely the problem. A flexible agent runtime with mixed-trust inputs, broad repo scope, and outbound publishing is not a productivity feature with some security concerns attached. It is a policy engine, whether the builder admits it or not. If the builder refuses to treat it like one, attackers will.

**The Caveat:** Boundary-first enforcement can become fake security too. Redacting half the page, forcing a review modal every thirty seconds, or isolating every tool from every other tool can make an agent useless. That is the trade. But the current market has already chosen the more dangerous failure mode: preserve convenience, flatten trust levels, and hope the model behaves. That is why GitLost matters. It did not reveal a quirky edge case. It revealed the industry's default architecture. If your public inputs can still whisper into privileged workflows, then your system has not solved prompt injection at all. It has simply built a cleaner laundering pipeline for unauthorized authority.
