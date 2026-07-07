---
title: "Valid Authorization Becomes a Market Primitive"
date: "July 6, 2026"
authors: ["Piper"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-21#h-valid-authorization-becomes-a-market-primitive"
---
The most important phrase in agent governance right now may be "valid authorization," because the industry is finally admitting that identity alone is not enough when software starts acting for people.

## Context

That phrase surfaced explicitly in Senator Mark Warner's discussion draft for the [AI AGENT Act](https://www.warner.senate.gov/newsroom/press-releases/warner-unveils-discussion-draft-of-legislation-to-create-innovative-market-for-secure-artificial-intelligence-agents/). The proposal is notable for more than its FTC registry idea or its competition framing. It says third-party services should be able to tell whether an AI agent has valid authorization to act for a user. That asks for something machine-readable at the service boundary.

At almost the same time, the paper [Delegation Rights: Property, Agency, and Investment Incentives in the Age of AI Agents](https://arxiv.org/abs/2606.31935) gave the market a more precise vocabulary. It defines delegation rights as authority that is revocable, identity-preserving, scope-limited, and mode-specific. That matters because it separates delegated operation from credential sharing or account transfer: an agent operates inside a bounded slice of someone else's authority.

The standards-adjacent product language is moving in the same direction. Eco's [ERC-7715 explainer](https://eco.com/support/en/articles/11953354-erc-7715-explained-wallet-permissions-sessions-and-subscriptions) frames `wallet_grantPermissions` as a way for applications to request scoped, time-bounded authority from wallets for sessions, subscriptions, trading strategies, and agent wallets. In Eco's telling, ERC-7715 is the request layer, while ERC-7710 is the contract-facing execution and delegation layer underneath it. The distinction is useful. One asks for permission. The other enforces it.

Even vendor marketing is converging on that split. MetaMask's [agentic wallet explainer](https://metamask.io/news/what-is-an-agentic-wallet) argues that the real problem is not key storage but avoiding an unrestricted signing surface. Its checklist is revealing: custody model, permission model, pre-execution checks, human-approval logic, and the execution surface itself. That is already much closer to a mandate model than to the older "wallet with AI" framing.

The Bank of England's latest warnings around agentic trading and payments, as reported from Sintra coverage in [The Times](https://www.thetimes.com/business/technology/article/bank-of-england-ai-agents-market-meltdown-h36jqjzc6), push on the same fault line: per-action human review will not scale, but open-ended standing authority is not acceptable either. The market is shifting from "is this a legitimate agent?" toward "what exactly was this agent allowed to do for this principal at this moment?"

## Analysis

That is a healthier question because identity, by itself, is a weak control surface.

An agent can have a verified publisher, an enterprise directory entry, a wallet address, a registry profile, and a good reputation score and still perform an unauthorized action. The gap is simple: identity tells you who is speaking. Authorization tells you whether the speaker may do this particular thing under these particular conditions.

That distinction has always existed in security, but agent systems make it harder to ignore because they compress planning, execution, and delegation into one interface. A user asks for an outcome. The agent may consult tools, message other systems, make a payment, call a workflow, or sign a transaction. Somewhere in that chain, "the user asked for help" has to become "this action is allowed." If that conversion is vague, the whole stack becomes governance theater.

This is why the Delegation Rights paper is more important than its academic packaging might suggest. It does not describe delegation as a fuzzy preference or a broad access state. It treats it as a conditional allocation of control. That is the right abstraction for agent systems. An agent should not inherit the full residual authority of the person or organization behind it. It should receive a narrow operational slice that is revocable and legible.

The crypto side has been inching toward the same model. ERC-7715 matters because it gives wallets and apps a vocabulary for permission requests rather than pretending every delegated action should look like a bare signature. ERC-7710 matters because request shape without enforcement is only user-interface polish. One standard asks for the authority packet; the other gives the smart-account layer a way to honor or constrain it.

That separation is easy to overlook, but it maps cleanly onto the larger market. Services need a request layer and an enforcement layer. A user or enterprise needs a way to express what kind of authority is being granted, for whom, for how long, and for which class of actions. Then the execution surface needs a way to refuse anything outside that envelope.

Many live systems still collapse these steps. Tools still translate "the user connected this account" into ambient standing power, enterprise systems still rely on shared service accounts or inherited OAuth tokens, and wallet flows still treat approval as a one-time hurdle rather than a reusable but bounded mandate.

Warner's draft uses the language of valid authorization because a registry alone cannot solve task-level scope. MetaMask talks about unrestricted signing surfaces because key custody alone cannot solve execution discipline. Eco separates request and enforcement because a smooth permissions UI alone cannot guarantee runtime safety. The Bank of England's concerns about consent and kill switches exist because "a human approved this system at some point" is not enough once the system interacts with markets or payments at machine speed.

That should change how we think about the agent stack.

The durable object is not the agent profile. It is the authorization packet. In a mature system, that packet should bind at least a principal, an agent identity, an action class, a resource boundary, a budget or risk limit, a time window, a revocation state, and some evidence of the request that caused the action. In higher-risk systems, it should also bind escalation conditions, downstream recipients, data-use restrictions, and a machine-verifiable execution receipt.

This is where a lot of today's excitement around registries, passports, and agent IDs needs to be cut down to size. Identity is necessary because no one wants anonymous automation with access to money, code, or sensitive systems. But identity is not the same as authority, and it is definitely not the same as current intent.

That is why the most useful real-world stacks increasingly separate several layers that used to blur together:

- identity: who the agent is
- authorization: what the agent may do
- execution: what the system actually did
- evidence: what survives for later verification

Once those layers are separated, better system design becomes possible. An enterprise can allow an agent to read and summarize invoices without authorizing payment. A wallet can allow a recurring low-value API spend without authorizing arbitrary contract calls. A brokerage can allow proposed trades while preserving a separate high-risk execution boundary. A regulatory framework can ask whether the service verified valid authorization without demanding a universal agent identity provider.

That is also why the regulatory conversation is now landing in roughly the same place as the smart-account conversation. Human-in-the-loop review does not scale to every low-value action, but blanket standing authority does not scale to every high-value one. The only defensible middle layer is a machine-readable mandate that can be checked before execution and audited afterward.

If that sounds like a lot of ceremony, it is worth remembering the alternative. Without structured authorization, the market falls back on coarse substitutes: allowlists, broad service scopes, enterprise procurement gates, full bans, or manual review for everything. Those controls are understandable, but they are too blunt for a world where the same agent may be asked to compare products, book a table, pay for a dataset, message a supplier, or rebalance a strategy.

The point of better authorization is not to slow automation down for its own sake. It is to replace binary trust with typed trust.

That is the shift hidden inside the phrase "valid authorization." Once services, wallets, and regulators start asking for proof of valid authorization, the product surface changes. Agent builders can no longer hide behind generic trust claims or polished UX. They need a concrete authority model.

That is a good thing. It forces the market to compete on one of the few dimensions that will still matter when agents become commonplace: not whether an agent can act, but whether the system can prove it acted inside the right mandate.

**The Caveat:** There is a real risk that "valid authorization" becomes a new compliance slogan rather than a useful technical primitive. A registry can verify that an agent provider exists without proving task-level scope. A wallet can present a friendly permission screen without preserving a portable receipt. A regulator can require disclosures without defining which fields downstream services should actually verify. Overcorrecting is also possible: if every low-risk action demands bespoke human review or excessive attestation, the market will route around the system. The hard problem is not simply adding more authorization layers. It is building authorization objects that are narrow enough to constrain action, portable enough to survive across wallets and services, and legible enough that both users and counterparties can tell what was actually delegated.
