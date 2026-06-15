---
title: "Permissions Fail in Composition"
date: "June 15, 2026"
authors: ["Piper"]
---
Many agent security failures do not come from missing controls; they come from controls that look narrow in isolation and become broad when composed with the rest of the system.

## Context

The most concrete example this week is not an exploit report. It is documentation.

MetaMask Delegation Framework [PR #188](https://github.com/MetaMask/delegation-framework/pull/188) adds security guidance for caveat-enforcer edge cases, and the details are more important than the fact that the change is docs-only. One warning says `AllowedMethodsEnforcer` checks only the outer selector, which means allowing `redeemDelegations` on a self-targeted delegation can accidentally create unrestricted execution authority if nested calldata is not inspected. Another warning says multiple `ERC20PeriodTransferEnforcer` caveats on one delegation collide on shared state, so only the first initializer's terms actually apply.

That is a precise statement of a broader problem. The permission object can look narrow. The executed authority can still become broad.

The same pattern appears outside wallets.

[WorkOS's 2026 AI agent auth checklist](https://workos.com/blog/ai-agent-auth-checklist) argues that production failures usually come from predictable mistakes: borrowed user sessions, static API keys, weak audit trails, and agents inheriting the union of their own permissions and the user's permissions. Their recommended fix is the intersection rule. The agent's effective authority should be the strict overlap of the agent role and the current user authority, evaluated per action.

[AWS's Agentic AI Security Scoping Matrix](https://aws.amazon.com/ai/security/agentic-ai-scoping-matrix/) reaches the same conclusion from a cloud-security angle. As agents gain breadth and autonomy, AWS says higher-scope systems need identity delegation, continuous verification, just-in-time credentials, tamper-evident logs, dynamic constraints, rollback mechanisms, resource quotas, and explicit control over agent-to-system interaction flows.

[Claw Patrol](https://github.com/denoland/clawpatrol) shows what this looks like as executable infrastructure rather than advice. It sits between agents and production systems, parses outbound traffic at the wire, and evaluates actions against rules before the request reaches SQL, Kubernetes, HTTP services, or other endpoints. Its examples are intentionally concrete: deny secret access, block destructive SQL, require human approval before a production delete.

Those are three different implementation cultures: wallet caveats, OAuth and workload identity, and proxy-level enforcement. They are all converging on the same operational lesson. Permissions are not trustworthy just because they exist. They are trustworthy when the system can prove how they compose at execution time.

## Analysis

This is why so many "agent incidents" feel strange on first inspection.

Take the cases that were circulating through Issue 18 research. The Fedora contributor incident showed how inherited contributor access, plausible output, and maintainer trust can start to look like a supply-chain event even before anyone can cleanly explain whether the cause was a human, a compromised account, an unsupervised agent, or some mixture. The DN42 and AWS runaway-cost story showed an agent turning vague scanning authority into real cloud spend and external risk. Neither case is fundamentally about one missing permission bit. Both are about systems failing to express or enforce the actual boundary that mattered.

That is the composition problem in practice. A valid credential plus a legitimate tool plus an apparently reasonable task can still produce illegitimate behavior if the joins are wrong.

A wallet caveat that authorizes the outer call but not the nested one is a composition failure. A user token borrowed by an agent that should have had a smaller runtime scope is a composition failure. A proxy that can see the traffic but not the human approval state behind it is a composition failure. An audit log that records the action but cannot reconstruct which delegation governed it is a composition failure.

The failure mode is consistent: the system verifies local facts while losing the global meaning of the action.

The industry is slowly learning that agent permissioning has to move from static entitlement to per-action evaluation.

That sounds obvious. It is not the default architecture in most stacks.

Traditional access systems are good at answering reachability questions. Can this principal connect to this service? Does this token include this scope? Is this role allowed to assume that role? Those are useful checks. They are not enough once agents choose tools, transform instructions, delegate subtasks, or execute nested calls.

Per-action evaluation means the control surface has to inspect the actual attempted behavior, not just the fact that a channel was opened.

PR #188 makes that point for smart-account caveats. The dangerous behavior is not the existence of `redeemDelegations`. It is the combination of that method, that target shape, and nested calldata the outer caveat does not understand.

WorkOS makes the point for enterprise identity. The dangerous behavior is not that a user is highly privileged. It is that an agent acting for that user can silently inherit a broader set than intended if the runtime computes a union rather than an intersection.

AWS makes the point for cloud agent infrastructure. The dangerous behavior is not merely autonomous execution. It is autonomous execution without dynamic constraints, just-in-time credentials, or an explicit mechanism to stop, roll back, or contain a runaway agent.

Claw Patrol makes the point for enforcement architecture. The dangerous behavior is not that a model "wanted" to do something bad. It is that the request reached production because nothing deterministic intercepted it before the wire.

These are all versions of the same rule: permission systems need a decision point that is close enough to the actual side effect to judge what is really happening.

For wallet-native systems, that means caveat analyzers, nested-call awareness, conflict detection between enforcers, and receipts that preserve which caveat path actually authorized or denied execution.

For enterprise agents, it means scoped workload identity, audience-bound short-lived tokens, approval thresholds for sensitive actions, and logs that distinguish the human principal, the agent principal, the requested action, the rule that fired, and the final effect.

For multi-system workflows, it means portable evidence. Otherwise every local policy engine becomes another silo that can say "trust me, I checked."

This is why the next useful standards conversation is not just about new permission types. It is about analyzability.

Can a wallet warn that two caveats collide? Can an SDK refuse obviously dangerous combinations? Can a proxy include upstream approval context in its decision record? Can an auditor reconstruct the executed authority path without reading five vendor dashboards and guessing which one mattered?

Those are not secondary tooling questions. They are the practical definition of whether a permission model survives contact with real systems.

**The Caveat:** There is a real tradeoff here. If every system moves its own decision point closer to execution, builders can end up with a thicket of local policy engines, each technically correct and collectively hard to reason about. A smart-account caveat, an API gateway, an enterprise auth layer, and a wire proxy can all deny or allow the same action for different reasons. That does not mean the answer is to centralize everything into one control plane. It means composition has to become a first-class design target. The system needs not just more gates, but a way to show how the gates relate.
