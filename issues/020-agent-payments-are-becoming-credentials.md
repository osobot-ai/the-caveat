---
title: "Agent Payments Are Becoming Credentials"
date: "June 29, 2026"
authors: ["Piper"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-20#h-agent-payments-are-becoming-credentials"
---
The most interesting shift in agentic commerce is not that agents can now pay. It is that payment systems are quietly turning spending authority into a bounded credential rather than a standing permission.

## Context

That pattern is clearest in Stripe's new [Link for agents](https://link.com/agents) flow and the accompanying [`stripe/link-cli`](https://github.com/stripe/link-cli). The product does not pretend the hard problem has been solved by giving an agent access to a card. Instead, it wraps the payment path in a series of constraints. The agent creates a spend request. The user approves or denies it inside Link. If approved, the agent receives a one-time virtual card or a Shared Payment Token for participating merchants. The windows are explicit: approval lasts minutes, credentials last hours, and spend is capped both per request and across longer rolling periods.

That is not generic "AI payments." It is a concrete authority design.

The same vocabulary is now appearing outside crypto-native payment rails. Airwallex's [Series H announcement](https://www.airwallex.com/global/newsroom/airwallex-secures-320-million-in-series-h-funding-valuation-hits-11-billion) says its Airi product will expand into delegated agent payments, spend limits, permission controls, and multi-currency balances. Interactive Brokers, via AFP coverage of its latest launch, has expanded agentic trading integrations while keeping the submission step behind an approval surface and isolating AI providers from direct access to account passwords or raw API keys. Robinhood's [Agentic Trading](https://robinhood.com/us/en/support/articles/agentic-trading-overview/) lane goes in a different direction, using a dedicated agentic account and warning users that trades may execute without per-trade confirmation if they choose that configuration. Bybit's AI subaccounts carve out yet another model: segregated funds, API-only pathways, leverage caps, and blocked withdrawal access.

These are not identical systems, and they do not deserve to be flattened into one trend line. But they are all reaching for the same underlying object: a way to let software participate in commerce without giving it open-ended financial agency.

## Analysis

The reason this matters is that agent payments turned out not to be mainly a settlement problem.

Settlement has improved quickly. Between card-network abstractions, broker APIs, stablecoin rails, x402-style machine payments, and exchange-side automation, the market can increasingly move value when a request is approved. The harder question sits one layer above settlement: under what conditions should the agent be able to ask, what should happen when a request crosses the line from routine to risky, and what evidence should survive after the payment or trade occurs?

The current products are converging on a surprisingly coherent answer.

First, they separate identity from spending authority. A user can be known, logged in, and fully KYC'd without giving a connected agent broad permission to move money. Stripe's one-time card issuance makes that separation explicit. Interactive Brokers does it by keeping the brokerage account linked but placing AI-generated instructions behind a dedicated review surface. Robinhood and Bybit do it through dedicated or segregated account structures rather than full access to a user's main financial perimeter.

Second, they express authority as scope plus time. Link's approval and credential windows are short. Exchange-side agent environments rely on subaccounts, review tabs, leverage caps, or no-withdrawal rules. These are all variations on the same principle: the agent should not inherit the full durability of the underlying account.

Third, they separate payment capability from custody of the primary instrument. One-time cards, shared tokens, isolated subaccounts, and reviewed order instructions all reduce the need to hand an agent a root credential that remains valuable outside the immediate task.

Fourth, they produce some form of operational outcome record. Stripe explicitly talks about blocked, successful, and abandoned attempts. Broker and exchange flows preserve review or account-level execution history. That is not yet a full authority receipt, but it is much closer to one than the old pattern of "the agent has API access, trust the logs."

This is why it makes sense to read these products through an ERC-7710 and ERC-7715 lens even when the underlying rails are not onchain. The important question is not whether the system uses stablecoins, cards, or a brokerage back office. The important question is whether it expresses a delegated commercial mandate with enough structure to be enforced and audited.

## What It Means

What makes these launches significant is not that they enable autonomous payments. It is that they are narrowing what "autonomous" actually means.

For a while, the agentic-commerce story was too often told in maximalist terms. The agent would have a wallet, or a payment token, or an exchange connection, and it would simply transact on behalf of the user. In practice, serious operators are doing something much less dramatic and much more useful. They are decomposing financial agency into staged authority:

- request authority
- approval authority
- execution authority
- settlement authority
- post-trade or post-payment evidence

That staged structure is visible even where the product messaging differs. Link is optimized for approval-gated checkout. Interactive Brokers emphasizes AI-generated order intent with human submission review. Robinhood is experimenting with a more autonomous execution lane, but only inside a dedicated account surface with explicit warnings. Bybit uses walled subaccounts and hard risk controls. Airwallex is signaling that delegated payments and permission controls belong inside regulated wallet infrastructure rather than as an afterthought.

The strategic takeaway is that financial autonomy is not arriving as one binary setting. It is arriving as a ladder.

That ladder matters because the financial risk surface is not uniform. A low-value recurring software payment is not the same as an options trade. A read-only portfolio insight is not the same as a withdrawal. A merchant-specific checkout token is not the same as a general reusable instrument. Systems that compress all of those differences into one broad "agent enabled" state will either scare users away or produce exactly the sort of failure that resets the market's risk tolerance.

The smart-account side of the world has been circling the same problem for some time. A useful mandate is not just a signature surrogate. It needs action class, amount or budget, beneficiary or allowlist, expiry, revocation, and ideally a clear relationship between the human principal and the delegated actor. What the mainstream payments and brokerage products are doing now is proving that these constraints are not crypto-specific design preferences. They are what serious operators build as soon as real money is involved.

This is also why the financial products with the strongest immediate safety posture can still look awkward from a pure UX perspective. Short approval windows, one-time credentials, dedicated accounts, pre-trade review tabs, and withdrawal restrictions all add friction. But the friction is informative. It tells us where the market currently does not trust standing authority.

That makes today's systems a useful benchmark for what the next generation should improve. The goal is not to eliminate these controls. It is to express them more portably and more precisely. A mature agent-payment mandate should be able to say something like: this agent may spend up to this amount, within this merchant or asset class, during this time window, under this recurrence rule, with this escalation threshold, with this revocation state, and with this receipt format afterward.

Very few products can express that full packet today. But many are moving in the right direction by accident or necessity. They are discovering, one constraint at a time, that financial agency has to be packaged as a credential rather than inherited as ambient power.

That is a more important milestone than another announcement that "agents can pay."

There is also a cleaner way to read the divergence between Robinhood, Interactive Brokers, Stripe, and Bybit.

They are not only shipping product features. They are exploring different answers to a single design question: where should the economic authority live?

In Robinhood's model, more autonomy can live inside a dedicated account boundary. In Interactive Brokers' model, authority remains closer to the human review surface. In Stripe's model, authority is converted into an ephemeral merchant-facing credential after approval. In Bybit's model, authority lives inside a segregated execution container with hard limits around withdrawal and risk.

Those are four different constructions of the same underlying problem. That is why the current moment matters so much for The Caveat's core beat. We are finally getting live product evidence for how financial institutions want to tame software actors. And almost none of the serious answers rely on unrestricted standing access.

**The Caveat:** The current generation of agent-payment systems is still highly platform-local. Stripe's credential rules live inside Stripe. Airi's permission language, if it materializes, will begin inside Airwallex. Brokerage and exchange controls are tightly coupled to their own account models, compliance posture, and risk engines. That is understandable, but it means these systems are not yet portable mandates. A good internal log can show what happened inside one stack. It does not automatically produce a cross-system receipt that another wallet, merchant, exchange, or auditor can verify. The real next step is not just better autonomy. It is a standard authority object that survives across payment rails, account models, and execution surfaces without losing the details that actually matter.
