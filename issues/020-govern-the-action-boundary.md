---
title: "Govern the Action Boundary"
date: "June 29, 2026"
authors: ["Piper"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-20#h-govern-the-action-boundary"
---
The most useful idea in agent governance right now is also the least glamorous: stop trying to make the agent itself the unit of trust, and start governing the irreversible action.

## Context

That argument now has a clear academic statement. The recent paper [Governing Actions, Not Agents](https://arxiv.org/html/2606.26298v1) argues that agents should keep planning autonomy while being denied standing authority over high-risk execution. Instead of giving the model a broad power envelope and hoping downstream safeguards catch abuse, the paper proposes a different boundary: the agent declares intent, independent systems attest to the relevant facts, deterministic policy checks evaluate the request, and only then does a narrow capability get issued or an action hub execute on the agent's behalf.

This is not only a research posture. It is showing up in production systems from a different direction. OpenAI's [Daybreak](https://openai.com/index/daybreak-securing-the-world/) now frames cyber agents less as advisory copilots and more as participants in governed remediation workflows. The emphasis is no longer just on finding a bug. It is on validation, patch generation, testing, review, scoped controls, and evidence around what change was prepared and what a human or trusted operator ultimately authorized.

The standards side is moving in parallel. Ethereum Magicians' [Privileged Role Control Framework](https://ethereum-magicians.org/t/introducing-a-privileged-role-control-framework/28859) treats authority as a lifecycle problem: operation limits, time-bound grants, timelocks, emergency states, and observability. The [Programmable Settlement Locks](https://ethereum-magicians.org/t/erc-xxxx-programmable-settlement-locks/28861) thread makes a related move for value transfer by separating preparation of a value-bearing operation from delegation of the right to finalize or cancel it. And in implementation land, MetaMask's draft [Optimized Delegation Manager](https://github.com/MetaMask/delegation-framework/pull/189) narrows the ERC-7710 execution surface for cheaper, more predictable gasless flows rather than pretending every imaginable delegation pattern should live in one universal path.

Taken together, these developments point to the same conclusion. The industry is slowly abandoning a weak question, "is this a trusted agent?", for a much stronger one, "what exactly is this system allowed to cause in the world right now?"

## Analysis

This is a better framing because the old one was too abstract to enforce.

An agent identity can be useful. So can a model-access policy, a connector allowlist, or an admin approval button. But none of those artifacts, on their own, bind a concrete side effect to a concrete authority packet. They tell you who or what may participate in a system. They do not necessarily tell you whether a specific deployment, patch, transfer, trade, or disclosure was authorized under the conditions that actually existed at execution time.

That gap matters more as agents move from suggestion into execution. Planning is continuous, exploratory, and hard to formalize. Execution is narrower. It can be made legible. A deployment can be tied to a repo, a branch, a diff, a review state, and a target environment. A payment can be tied to a beneficiary, amount cap, merchant class, time window, and refusal condition. A remediation action can be tied to a vulnerability, a test result, a rollback plan, and a disclosure rule.

This is why the action boundary is emerging as the real control point. It is the place where several different forms of evidence can meet:

- principal intent
- agent identity
- scope and expiry
- external attestations
- deterministic policy checks
- execution proof

That bundle is much closer to what smart-account delegation has been reaching for than the casual industry shorthand around "agent permissions." ERC-7710 and ERC-7715 matter because they do not reduce authorization to a login state. They treat it as an explicit object: who delegated, what was delegated, under what limits, and through which execution path. The recent research and product work outside crypto is converging on the same shape, even when it uses different language.

The Magicians threads are especially useful here because they show what happens once authority is treated as something more than a boolean. PRCF does not merely ask whether a privileged role exists. It asks how that role is bounded over time, delayed for safety, restricted for certain operations, and exposed during emergencies. Programmable Settlement Locks do not simply ask whether value may move. They ask who can finalize an already-prepared operation and under what committed path. These are not complete agent-mandate standards, but they are evidence that authority is being decomposed into enforceable, inspectable components.

That decomposition is also what makes the draft Optimized Delegation Manager interesting. Its value is not just lower gas. It is the willingness to narrow expressiveness in exchange for cheaper, more predictable policy enforcement. That is the opposite of the old maximalist instinct to make one generic control plane do everything. In practice, high-value agent flows usually do not need every theoretical authorization pattern. They need common patterns that are cheap to use, narrow to audit, and predictable to explain.

The action-boundary model also gives a cleaner answer to a recurring confusion in agent debates: the difference between autonomy and standing authority.

An agent can be highly autonomous in planning and still be tightly bounded in execution. It can inspect logs, draft patches, compare alternatives, and even queue proposed actions without directly possessing the power to mutate production or move funds. This is where the new academic and enterprise thinking is ahead of much public discourse. The question is not whether autonomy is allowed in the abstract. The question is which parts of the workflow can tolerate autonomy without separate action-time checks.

That distinction has practical consequences.

If a patching agent proposes three fixes and only one is allowed to execute after code review, environment attestation, and policy checks, the system still benefited from autonomy. If a wallet agent can route between payment options but needs a fresh, bounded mandate before spending above a threshold or outside an allowlist, it is still useful. The real product challenge is not suppressing autonomy. It is compressing the path from useful autonomous preparation to governed execution.

That is also where receipts become more than an audit convenience. A good execution receipt is not just a log that the action happened. It is evidence that the relevant conditions held when the action crossed the boundary. Which attestation was presented? Which policy version evaluated it? Which scope was active? Which denial path was bypassed or triggered? Which execution surface actually consumed the grant?

Once you define the problem that way, a lot of current industry work looks immature in a revealing way. Many systems already have strong internal policy, but weak portable proof. They can often block or allow an action locally. Fewer can produce an artifact another system can independently evaluate later. That is the missing bridge between enterprise action governance and smart-account-style delegated execution.

The strongest version of the market thesis, then, is not that identity is irrelevant. It is that identity becomes operationally meaningful only when it is attached to a governed action path. An agent ID without an action-boundary receipt is mostly attribution theater. A permission prompt without a machine-checkable execution record is still only a promise.

There is also a strategic reason to prefer action governance over broad standing authority: it scales better across institutions.

Different organizations will always disagree about which models they trust, which vendors they allow, and how much autonomy they tolerate. They have a better chance of interoperating on action proofs than on universal trust in the agent itself. A code-hosting platform, an enterprise IAM layer, a payment rail, and a smart account do not need the same internal governance model to recognize the same receipt fields: principal, delegate, task, scope, expiry, attestation set, policy result, and execution evidence.

That is a more realistic standards target than a universal theory of safe agents.

It is also where the crypto side can contribute something practical. Smart accounts are good at enforceable authority objects and tamper-resistant execution logs. They are not, by themselves, good at proving every offchain fact that matters. The action-boundary model makes that tradeoff explicit. Use offchain attestations for facts like code review state, sanctions screening, budget approval, or environment classification. Use wallet-side or account-side enforcement for the final authority handoff and receipt. Neither layer is sufficient alone.

That division of labor feels closer to where real deployments are headed than the older hope that one model, one app, or one admin dashboard could own the whole governance story.

**The Caveat:** Governing the action boundary is stronger than granting standing authority, but it is not free. It depends on action classification that can be gamed or drift over time, attesters that stay independent, freshness windows that are not silently stale, and policy engines that do not become bureaucratic bottlenecks. There is also a risk of performative governance: too many signatures, too little real constraint, and receipts that prove process without proving substance. Smart accounts can help with enforcement and tamper-evident logs, but they do not magically solve the offchain side of the problem. If the action depends on facts like code review, clinical approval, legal context, or spending authorization, those facts still need credible attestations before onchain enforcement means much.
