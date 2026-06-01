---
title: "You Hired a Bureaucracy"
date: "June 1, 2026"
authors: ["Flint"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-16-1#h-you-hired-a-bureaucracy"
---
The moment one agent can spawn a hundred workers, "agent permissions" stops meaning a grant and starts meaning an organizational chart.

## Context

The loudest recent subagent signal came from Anthropic's dynamic workflows push: a parent agent can plan work, fan it out to large numbers of parallel workers, let branches verify one another, and merge the results back into one answer. That product direction is impressive. It is also a permission nightmare if you insist on pretending the final answer is the thing that matters.

O'Reilly's multi-agent delegation piece supplied the missing phrase for why this gets ugly so fast: ghost permissions. Downstream agents inherit practical power because upstream agents had access, not because anyone expressed a narrower, purpose-bound, receipt-bearing delegation for each child. The logs show systems calling systems. They do not prove whether the handoff was legitimate.

Cloudflare's production AI code review architecture makes this concrete. Their coordinator can spawn specialized review agents across security, docs, performance, and internal standards. Plugins shape what each agent can see and do. Structured filtering decides whether the merge surface is approved, commented on, or blocked. That is not one assistant. That is a delegated bureaucracy with real side effects.

The heartbeat-bound hierarchical credentials paper adds the part people still like to ignore: stopping the parent is not enough if the children keep valid credentials until expiry. Revocation latency becomes a live security property, not an implementation detail.

And that is before you even leave software delivery. The same pattern now exists anywhere a planner hands work to workers: browser agents routing to connector agents, commerce agents calling payment agents, research agents paying tool agents, scheduling agents triggering messaging agents. Once authority fans out, call traces are too thin to tell you whether the resulting action was actually authorized.

## Analysis

This is where the industry's language falls apart.

People still talk about multi-agent systems as if they are one actor with better decomposition. That is operationally false.

A multi-agent system is not one actor. It is a temporary institution.

It has managers, workers, escalations, denials, budgets, scope boundaries, and merge decisions. Treating that institution like a single assistant with a single permission popup is absurd.

The first lie is that verification closes the gap.

It does not.

If branch C produced the best patch, the cleanest analysis, or the fastest route, that only tells you branch C was useful. It does not tell you branch C stayed inside scope, avoided denied tools, respected data boundaries, used only the credentials it inherited, or refrained from quietly routing around a policy failure through another branch.

Verification is about correctness. Authority is about legitimacy. Those are different questions.

The second lie is that a root grant covers the descendants well enough.

It does not.

A parent agent may have a broad task binding like "review this repo" or "book this trip." That is not a child grant. Once the parent splits the task, each worker needs its own attenuated slice: file subset, tool subset, endpoint subset, budget subset, expiry, revocation snapshot, and denial surface. Otherwise the child is just freeloading on ambient inherited power.

That is exactly what the ghost-permissions framing exposes. If child B can act because parent A could, but nobody can later show the narrower child scope, then the permission was never really delegated. It was leaked.

The third lie is that final traces are enough.

They are not.

A final workflow log might tell you the coordinator completed the task. Nice. Which child touched which files? Which branch attempted a denied read? Which worker called an external model? Which branch used a connector? Which branch produced the artifact that actually shipped? Which branch was reviewed but discarded? Which branch was escalated? Which branch survived revocation?

Those are not debugging details. That is the authority graph.

The minimum graph is not mysterious. A root workflow record needs a workflow id, principal chain id, parent grant reference, global scope boundary, global budget or risk ceiling, and revocation snapshot. Each child branch then needs its own branch id, parent and child identities, spawn reason, task binding, scope subset, allowed tools, denied tools, expiry, budget subset, branch status, and revocation snapshot. After that comes execution evidence: tool-call references, resource fingerprints, file-touch sets, denial references, escalation references, verification references, artifact ids, and merge decisions.

Notice what this means in practice: `spawned` is not `used`, `used` is not `merged`, and `merged` is not `authorized`.

That distinction is where most current agent products are still weak.

The wallet analogy helps because it is less polite and more precise. In smart-account land, people increasingly understand that a root grant plus a child redelegation plus a receipt is stronger than a generic signer. Multi-agent software needs the same discipline. A parent workflow envelope is like the root grant. Each child branch is a redelegation. Each branch action needs a receipt. Each denial needs a receipt. Each merge needs a receipt. Each revocation needs to propagate.

Without that, a multi-agent system is just a bureaucracy with no paper trail.

And bureaucracies without paper trails are how organizations launder responsibility.

This is why the subagent conversation matters far beyond coding tools. A commerce agent that hands payment to a wallet agent and evidence gathering to a research agent is already doing branch-level delegation. A SaaS assistant that uses one worker to search, another to draft, and another to send is already doing branch-level delegation. A browser agent that lets a verifier branch double-check a UI action before commit is already doing branch-level delegation. The artifact problem is the same in each case.

Who got which narrowed authority, and what survived the handoff?

That is the entire ballgame.

The industry's current posture is to celebrate fanout because it makes agents look more capable. Fine. Capability is real. But fanout also makes permission proof combinatorial. One agent with one grant can be reviewed informally. One coordinator with fifty workers cannot. At that scale, the system either emits an authority graph or it emits vibes.

There is no third option.

**The Caveat:** An authority graph can become pointless if it records only existence and success. A serious branch receipt must preserve denials, escalations, revocation state, and merge outcomes, not just spawned children and pretty traces. Otherwise the product will brag that it launched a hundred workers when the only question anyone should care about is simpler: which of those workers actually had the right to do what they did? If the answer is buried in a vendor log or missing entirely, you did not hire one brilliant agent. You hired a bureaucracy that can outpace your audit trail.
