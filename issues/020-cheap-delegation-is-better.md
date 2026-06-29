---
title: "Cheap Delegation Is Better"
date: "June 29, 2026"
authors: ["Flint"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-20#h-cheap-delegation-is-better"
---
If your delegation framework can express every edge case, there is a good chance it is too expensive, too vague, and too politically polite to secure anything important.

## Context

Crypto loves a universal abstraction. If a new authority framework promises maximum flexibility, endless composability, and support for every possible execution pattern, people clap first and ask audit questions later. That instinct is a liability in agent permissions.

The more interesting signal this week was not a grand new standard claiming to solve everything. It was something narrower: MetaMask’s draft [Optimized Delegation Manager](https://github.com/MetaMask/delegation-framework/pull/189), which keeps the canonical ERC-7710 redemption interface while deliberately trimming the surface for cheaper gasless flows. The design is explicit about what it gives up. No self-authorized redemption path. No after-hook caveat model. A leaner validation and hook pass. Before-hook logic only. Purpose-built, not maximal.

That matters because it says something the market usually avoids saying: not every permission pattern deserves first-class support forever.

The Ethereum Magicians threads around the [Privileged Role Control Framework](https://ethereum-magicians.org/t/introducing-a-privileged-role-control-framework/28859) and [Programmable Settlement Locks](https://ethereum-magicians.org/t/erc-xxxx-programmable-settlement-locks/28861) point in the same direction. Both are useful because they narrow the problem. PRCF treats authority as a lifecycle with grant delays, time bounds, operation limits, timelocks, and emergency states. Settlement Locks separate preparing value movement from delegating who can finalize or cancel it. Neither tries to flatten every authority problem into one magical “yes, the agent may act” object.

Even the EIP-7702 commentary is starting to admit the same thing from the other side. ERCs Solved’s updated explainer got the critical line exactly right: EIP-7702 is not a permission vocabulary. It gives EOAs programmability. It does not give the ecosystem a shared language for session keys, spend caps, app permissions, relay policy, or lifecycle control. Programmability is not policy. That distinction should have been obvious from day one, but apparently we needed another cycle of industry optimism before anyone would say it plainly.

## Analysis

The strongest case for narrower delegation is not aesthetic. It is operational.

Every extra execution path you support is another place policy can become ambiguous, expensive, or fake. Every extra hook type is another place developers can convince themselves they have a meaningful restriction when they really have a fragile composition story nobody will understand in six months. Every extra “just in case” feature adds another branch auditors need to reason about and another reason gas or execution complexity will quietly push teams toward skipping checks in production.

That is why the Optimized Delegation Manager is more mature than some people will want to admit. It chooses narrower authority expression in exchange for cheaper, more predictable, more auditable execution.

This is where crypto’s culture problem shows up. The ecosystem still treats expressiveness as moral virtue. If one framework can encode more exotic delegation patterns than another, people assume the more expressive one is more advanced. That is backwards for real-world agent flows. In practice, production systems want the smallest authority grammar that covers the common high-value cases cleanly:

bounded transfers

approved execution classes

limited call counts

explicit expiries

narrow redeemer sets

clear revocation behavior

receipts that are cheap to produce and easy to inspect

Once you care about those things, some kinds of flexibility start looking less like innovation and more like unresolved governance debt.

The industry already knows this in every other security domain. IAM teams do not brag that a junior service account can theoretically assume fifty strange roles through six conditional branches if you line up the stars correctly. Financial-control teams do not brag that their approval engine can express infinite exception logic nobody can explain to auditors. Mature systems converge on simpler surfaces because simplicity is what keeps the control legible under pressure.

Agent permissions need the same discipline.

That is also why PRCF and Settlement Locks are more relevant than they first appear. PRCF is interesting because it refuses to treat “has the role” as the whole story. It asks when the role activates, how long it lasts, what operations it covers, whether high-impact actions are delayed, and what emergency controls exist. Settlement Locks are interesting because they refuse to treat “funds may move” as the whole story. They split preparation from finalization and give delegation a narrower object to operate on.

Those are good instincts because agent authority is not one problem. It is a stack of smaller ones. Who prepared the action? Who may finalize it? Under what limits? For how long? With what cancellation path? Under which emergency state? Against which target set? Through which redeemer or coordinator?

The moment you try to collapse all of that into a universal, endlessly composable delegation substrate, you start lying to yourself. You tell yourself the abstraction is elegant. What it usually means is that the real policy got pushed outward into app code, docs, or “operator discipline.”

That is not security. That is outsourcing.

The EIP-7702 lane makes the same point in a blunter way. There has been too much loose talk implying that once EOAs can temporarily act like smart accounts, the permissioning story is basically solved. No. 7702 gives you a programmable execution slot. It does not tell you what policy language should occupy it. If your product story jumps from “programmable account” to “safe delegated agent behavior” without a real permission vocabulary in the middle, you are selling air.

This is where the usual composability rhetoric breaks down hardest. People love to say that standards should be neutral, general, and open-ended. Fine, up to a point. But agent authority is not a toy abstraction layer. It sits next to money, production systems, regulated data, and irreversible actions. Neutrality is overrated when ambiguity becomes the operating mode.

In that context, cheaper delegation is not just about gas. It is about refusing to preserve every theoretical power just because somebody, somewhere, might want it one day.

A cheaper path is easier to benchmark.

A narrower caveat surface is easier to audit.

A smaller policy grammar is easier to explain to users.

A constrained redemption model is easier to simulate and reason about.

A purpose-built manager is less likely to encourage people to smuggle weird business logic into authorization layers that should stay boring.

None of that is glamorous. It is also why it will probably work better.

There is a second, less comfortable implication here. Narrower delegation surfaces are also a political statement about what kinds of authority the ecosystem wants to normalize.

If the preferred path is optimized for gasless flows with before-hook checks and simpler redemption semantics, that is not just an engineering decision. It is a signal that the ecosystem values common bounded consumer and agent flows over maximal custom composition. Some developers will hate that because they want every exotic authorization pattern available on the canonical path. They will call it limiting. They will say innovation should not be constrained by the standard library.

That complaint misses the point. Standards are allowed to choose their center of gravity. And in agent permissions, the right center of gravity is not “anything is possible.” It is “the important things are safe, cheap, and easy to prove.”

This does create a real tradeoff. Narrow systems fragment. If you optimize for one family of use cases, some other family will need a different manager, a more specialized framework, or a separate layer. Interoperability gets messier. The dream of one universal delegation substrate gets weaker.

That is fine. Fake interoperability is worse.

An ecosystem where everybody claims to share the same universal authorization primitive while silently relying on app-specific exceptions, undocumented assumptions, and hard-to-audit extension points is not more interoperable. It is just better at pretending.

The more honest future probably looks plural. A small number of narrow, legible delegation surfaces optimized for distinct consequence classes. Clean transfer-style mandates. Specialized settlement-finalization patterns. Enterprise identity bridges. High-friction remediation lanes. Payment-specific bounded credentials. Different tools for genuinely different authority problems.

That sounds less elegant than “one framework to rule them all.” It also sounds much closer to how serious security systems actually evolve.

Crypto does not need another abstraction that can theoretically encode every permission story while practical teams end up using ten percent of it and fearing the rest. It needs authority surfaces that cost little, explain themselves, and fail closed when the agent inevitably gets weird.

The mature move is not supporting everything. It is choosing what not to support and being proud of that choice.

**The Caveat:** Narrowing the surface is not a free win. It can strand legitimate advanced use cases, multiply specialized managers, and create compatibility headaches across wallets, apps, and coordinators. Some teams will absolutely use “simplicity” as an excuse to dodge hard but necessary policy features. That risk is real. But the scarier risk is the opposite one: keeping every expressive path alive until nobody can tell whether the system is enforcing a real mandate or just hosting a policy mirage. In agent permissions, unsupported complexity is often a feature, not a bug.
