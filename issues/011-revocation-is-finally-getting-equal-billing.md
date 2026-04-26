---
title: "Revocation Is Finally Getting Equal Billing"
date: "April 26, 2026"
authors: ["Piper"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-11#h-revocation-is-finally-getting-equal-billing"
---

Agent permissions have had an obvious blind spot from the start: everyone wants to talk about how authority gets granted, and almost nobody wants to talk about how it gets unwound.

That is why a seemingly narrow MetaMask Delegation Framework pull request deserves more attention than its scope might suggest. On April 22, the framework opened `ApprovalRevocationEnforcer`, a caveat enforcer designed to let a delegated permission revoke existing approvals across ERC-20, ERC-721, and ERC-1155 flows with a single permission surface ([PR #177](https://github.com/MetaMask/delegation-framework/pull/177)). Read narrowly, this is just another enforcer. Read more carefully, it is a signal that the delegated-wallet stack is starting to take cleanup, rollback, and stale authority seriously.

That shift matters because the market has mostly treated agent permissions as a grant problem. Can an account delegate? Can a wallet issue scoped permissions? Can an agent execute without asking every time? Those are important questions, but they are incomplete. A permission model is only half-built if it has elegant grant flows and clumsy recovery.

The new enforcer is explicit about the problem it is solving. It grants authority to revoke approvals previously set through `approve` and `setApprovalForAll` style patterns, while verifying the existing approval state before letting the revocation proceed. In plain English: it is trying to make reduction of authority a first-class delegated action, not an afterthought left to manual wallet hygiene.

That sounds incremental. It is not.

The broader smart-account and agent-wallet conversation has spent the last year celebrating more expressive control surfaces: caveats, session keys, delegated execution, batched flows, and intent-like authorization. But one uncomfortable truth keeps surfacing underneath the demos. Authority has a tendency to linger.

The lingering-authority problem shows up in several forms:

- old token approvals nobody remembers granting
- time-boxed automations that outlive their actual purpose
- wallet-specific session systems with weak portability
- recovery paths that require more expertise than the original approval

This is exactly why revocation deserves to be treated as architecture, not support tooling.

The practical deployment side of the market is already pointing in the same direction. Openfort’s wallet-permissions guide presents agent access as temporary, non-admin, and explicitly expiring: register a session key on a smart account, give it a short window, and let the account enforce the boundary rather than trusting the agent’s judgment ([Openfort](https://www.openfort.io/blog/how-to-build-wallet-permissions)). Pimlico’s guide for using MetaMask Smart Accounts with `permissionless.js` makes the same broader point from another angle: ERC-7715 requests and ERC-7710 redemption are starting to appear inside the normal account-abstraction developer path, with clear warnings that unrestricted delegation is dangerous and caveat enforcers matter ([Pimlico](https://docs.pimlico.io/guides/how-to/accounts/use-metamask-account)).

Those guides are not about revocation specifically. But together they expose the emerging shape of the stack. The industry is slowly learning that bounded authority is not one feature. It is a lifecycle.

That lifecycle has at least four stages:

1. **Grant** — define what an agent or delegate may do.
2. **Constrain** — attach time limits, spending limits, calldata rules, or execution conditions.
3. **Observe** — record what actually happened.
4. **Unwind** — revoke, expire, or clean up leftover authority safely.

Most implementations are still strongest on stages one and two. The new MetaMask enforcer matters because it strengthens stage four, which has usually been left to the user’s memory and whatever wallet UI happens to exist.

This is also where the consumer and enterprise stories start to converge.

In enterprise agent systems, the language is different, but the problem is the same. Microsoft’s Agent Governance Toolkit centers kill switches, approval workflows, trust decay, and runtime intervention because long-lived authority without credible interruption paths is not governance at all ([Microsoft](https://opensource.microsoft.com/blog/2026/04/02/introducing-the-agent-governance-toolkit-open-source-runtime-security-for-ai-agents/)). Google’s Gemini Enterprise stack talks about centralized control, agent identity, and lifecycle governance because large organizations already understand the cost of orphaned automation ([Google Cloud](https://cloud.google.com/blog/products/ai-machine-learning/the-new-gemini-enterprise-one-platform-for-agent-development)). The wallet world is arriving at the same lesson from the other side: if permissions can accumulate faster than they can be reduced, users inherit silent risk.

That is why revocation tooling is more important than it first appears. It forces the ecosystem to admit that delegation is not just about enabling action. It is about making authority shrinkable.

There is a deeper standards point here too. ERC-7710 and ERC-7715 get attention because they define cleaner interfaces for delegated execution and permission requests. But standards only become trustworthy in practice when they support the less glamorous parts of the lifecycle — partial rollback, revocation semantics, cleanup across token standards, and credible recovery after context changes. A wallet that can grant elegantly but revoke awkwardly is not mature. It is just persuasive.

The most interesting line in the MetaMask PR is not the specific method coverage. It is the design assumption behind it: a user should be able to sign one permission that reduces risk across multiple approval types. That is a different posture from the usual “compose enough caveats and hope the UI holds together.” It says the framework is beginning to optimize not only for expressiveness, but for safe simplification.

That is the right direction.

Permission systems usually fail in the boring places. Not in the demo flow, but in the leftover approval. Not in the grant, but in the week-old automation nobody retired. Not in the theoretical policy model, but in the recovery step users postpone because it is too fragmented or too technical. If delegated agents are going to become normal wallet actors, revocation has to become cheap, legible, and routine.

The wallet ecosystem should treat this pull request as more than a convenience feature. It is an early sign that the delegated-authority stack is starting to internalize a harder truth: users do not just need better ways to say yes. They need better ways to say “not anymore.”

**The Caveat:** It is possible to overread this. `ApprovalRevocationEnforcer` is still a pull request in one framework, not a finished cross-wallet standard. And revoking token approvals is only one slice of the broader cleanup problem. Session keys, delegated spend limits, offchain permissions, and cross-service agent access all need similarly legible unwind paths. Still, that is exactly why this development matters. It does not solve revocation generally — but it makes the neglected half of permissions visible enough that the rest of the stack can no longer pretend grant flows are the whole story.
