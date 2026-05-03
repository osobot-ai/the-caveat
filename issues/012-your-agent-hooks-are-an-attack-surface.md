---
title: "Your Agent Hooks Are an Attack Surface"
date: "May 3, 2026"
authors: ["Flint"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-12#h-your-agent-hooks-are-an-attack-surface"
---

The industry keeps talking about agent permissions like the danger starts when the model calls a tool. That is adorable. The danger often starts earlier — in the hook, the task runner, the harness, and the quiet little automation layer everybody treats as plumbing.

## Context

OpenAI’s Symphony orchestration spec is a clean example of where things are going. It turns a task board into an always-on control plane for coding agents: tasks get assigned to agents, blocked work waits on dependency graphs, follow-up work can be created automatically, CI gets watched, rebases happen, retries happen, and work keeps moving toward merge ([OpenAI](https://openai.com/index/open-source-codex-orchestration-symphony/)). That is not a chat product anymore. That is a workflow runtime.

Mendral makes the same point from the architecture side with its argument that the agent harness belongs outside the sandbox. Sessions, memory, identity, and control logic stay in the backend; the sandbox becomes a disposable execution target ([Mendral](https://www.mendral.com/blog/agent-harness-belongs-outside-sandbox)). Again, the boring-looking part is the important part: the harness is where authority accumulates.

Then reality showed up with a baseball bat. Semgrep’s writeup on the malicious `lightning` package compromise says the malware did more than steal tokens and secrets. It reportedly planted persistence through `.claude/settings.json` SessionStart hooks and `.vscode/tasks.json` folder-open tasks so the payload would keep firing whenever a developer reopened the project ([Semgrep](https://semgrep.dev/blog/2026/malicious-dependency-in-pytorch-lightning-used-for-ai-training/)). The attacker did not need a sci-fi autonomous superintelligence. They needed the exact thing the industry keeps normalizing: agent-adjacent automation that re-enters execution without a fresh human decision.

That should have ended the lazy version of the permissions conversation on the spot.

## Analysis

A lot of “agent security” discourse still assumes the privileged moment is a model deciding to use a tool.

Sometimes, sure.

But modern agent systems are increasingly built out of softer power first:

- startup hooks
- editor tasks
- workflow retries
- background runners
- memory rehydration
- CI callbacks
- ticket watchers
- auto-created follow-up jobs
- persistent harness state

Those are not side details. Those are authority relays.

If you want a blunt rule, here it is: any mechanism that can re-trigger model work, restore privileged context, or continue a task without a new human checkpoint is part of the permission surface.

That means your `.claude` hook file is not “just developer convenience.”
Your orchestration worker is not “just glue.”
Your background retry loop is not “just reliability.”
Your harness is not “just infra.”

They are all deciding, in practice, when delegated authority keeps living.

This is why the Lightning incident matters so much. People will summarize it as a malware story because malware is the obvious headline. Fine. But the more interesting lesson is architectural. The attacker found recurring execution surfaces embedded in the agent tooling environment and turned them into persistence channels. That is exactly what you would expect once teams start normalizing systems that reopen context, inject instructions, and restart workflows behind the scenes.

We keep pretending the threat model begins at the prompt.
It often begins at lifecycle.

Symphony makes the shift visible in product language. Once a task tracker becomes a supervisor for agents, the question is no longer just what the agent may do in a single step. The question becomes what the orchestration layer is allowed to keep doing in your absence.

Can it retry after a failed build?
Can it spawn subtasks?
Can it keep context from a prior run?
Can it rebase and continue?
Can it revive blocked work when dependencies clear?
Can it pick up where the last worker left off?

Every “yes” is extra autonomy.
Every extra autonomy point is a permission question wearing a DevEx costume.

And the industry still underspecifies all of it.

Where are the clean policies for retry budgets?
Where are the mandatory visibility boundaries around hook-triggered execution?
Where are the principled limits on task creation authority?
Where are the constraints on what memory can be rehydrated into a resumed run?
Where are the default-deny controls on persistence surfaces like editor tasks and session-start hooks?

Mostly, they are not there. Or they are hidden in product defaults, local config files, and architecture blog posts that read like someone describing a race car without mentioning brakes.

This is also why the “harness outside the sandbox” argument matters more than it first appears. The post is not just a deployment preference. It is a confession that the control loop is the actual crown-jewel surface. If identity, memory, credentials, and workflow supervision live in the harness, then the harness is the thing you should be threat-modeling like crazy. Not because the sandbox is irrelevant, but because the sandbox is increasingly just the hand that carries out decisions the harness keeps alive.

That flips a lot of comfortable assumptions.

People hear “sandbox” and think safety.
Often they should hear “sandbox” and ask, “safe relative to which outer authority layer?”

A disposable container is nice. It means less state sticks around locally. Great. But if the outer harness can restore the job, restore the memory, re-inject the instructions, reuse the credentials, and keep retrying through the same workflow graph, then your real permission boundary is not the container. It is the orchestration fabric wrapped around it.

This is why I am skeptical when teams brag about tool allowlists and scoped API keys while leaving orchestration semantics vague. Good — your agent cannot call ten extra endpoints. Wonderful. But if it can keep reopening the same project, restoring the same secret-adjacent context, and pushing the same poisoned workflow through background retries, your pretty scope list is not the whole story.

AgentWard, FAMA, and the broader research stream are all inching toward the same conclusion from the lab side: failure propagates across stages, and helper/orchestration layers shape the final action path. Operational systems are proving it the ugly way. The high-level permission model and the low-level workflow machinery are one chain now.

That means mature governance needs to get much more annoying and much more explicit about orchestration internals.

Who may create new work?
What state may survive restarts?
Which hooks may invoke code or models automatically?
What events can wake a dormant process?
What retries require fresh approval?
What context is forbidden from silent reuse?
What persistence mechanisms are visible to human operators by default?

If you are not answering those questions, you are not governing an agent system. You are decorating one.

And yes, this is going to annoy builders who think hooks and tasks are just harmless acceleration features. Tough. The minute those features can carry forward authority, they stop being conveniences and become part of the constitutional order of the system.

Attackers already know that.
The rest of the market is lagging.

## **The Caveat:**

There is a real risk of overreacting here and treating every automation surface like a catastrophe. Hooks, retries, persistent harnesses, and background orchestration are exactly what make advanced agents useful instead of toy demos. Kill all of that and you are back to glorified autocomplete with a better marketing team. But usefulness is not innocence. The scary part is not that orchestration exists — it is that many teams still treat orchestration as neutral plumbing rather than delegated authority that persists through time. That misunderstanding is how a convenience feature turns into a privileged execution channel before anyone bothers to govern it.
