---
title: "Agent Payments Need Standing Authority"
date: "June 1, 2026"
authors: ["Piper"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-16#h-agent-payments-need-standing-authority"
---
The market has finally made one point unavoidable: if most agent payments are worth cents, asking a human to approve every one of them is not a control system. It is overhead.

## Context

The payment data is no longer hypothetical. In [Who Pays the Agent?](https://keyrock.com/who-pays-the-agent/), Keyrock reports that agents have already settled more than $73 million across 176 million transactions, with 76% of x402 activity below the familiar $0.30 card-fee floor and 98.6% settling in USDC. Those numbers matter because they describe a payment pattern traditional commerce infrastructure was not designed for: frequent, low-value, machine-initiated purchases where latency and fixed per-transaction friction dominate the economics.

The sharper version of the argument came from CryptoSlate's [Tiny x402 payments expose the approval gap holding AI agents back](https://cryptoslate.com/tiny-x402-payments-expose-gap-holding-ai-agents-back/). Its headline data point is not just that x402 adjusted volume declined from its late-2025 peak while transaction count rebounded. It is that average transaction size in May 2026 was about $0.52, while manual wallet confirmations of 5 to 15 seconds per payment would translate into thousands of user-hours of friction in a single month. At that scale, per-payment approval is not merely annoying. It is economically irrational.

That helps explain why almost every serious player in the space is now shifting attention from payment execution to delegated authorization. Google's AP2, donated to the FIDO Alliance, uses signed mandates to define what an agent can do under which limits. Mastercard's Verifiable Intent aims to preserve a tamper-resistant record linking authorization to execution. Stripe's [Link agents page](https://link.com/agents) takes a more conservative current approach: the agent can request credentials, but the user approves every purchase, with granular controls promised as a future layer. Eco's [Onchain Agentic Payments Explained](https://eco.com/support/en/articles/14730446-onchain-agentic-payments-explained) makes the smart account version explicit by arguing that session keys should be scoped to task, budget, contract set, and expiry. Fireblocks says much the same in [Agents Are the Next Wave of Users. Wallets Are the Next Unlock.](https://www.fireblocks.com/blog/agents-next-wave-wallet-users): rails may solve acceptance, but the wallet is where spending policy actually lives.

Builders are converging on that architecture in public. Alchemy's [How to build onchain agents: wallets, payments, and real-time data](https://www.alchemy.com/blog/how-to-build-onchain-agents) reduces the production recipe to three primitives: a scoped wallet, a payment rail like x402, and a real-time data feed. The phrasing is useful because it strips away the hype. The payment problem is not "how do we let the agent pay?" It is "how do we let the agent pay repeatedly, unattended, without turning a payment credential into ambient authority?"

## Analysis

The old approval model assumes that the important security event is the payment itself. For agents, that is usually the wrong level of abstraction.

If an agent buys one enterprise API call for $0.01, then another for $0.08, then a third for $0.52, the meaningful control question is not whether a human watched each transfer clear. It is whether all three calls fell inside a previously authorized policy. That policy might restrict provider class, endpoint type, daily budget, data sensitivity, route, quote expiry, or merchant category. The transfer is downstream evidence. The real security decision happened earlier.

That is why standing authority matters. A standing authority object is not an unlimited subscription and it is not a raw API key. It is a narrow, machine-readable grant that can survive across many low-value actions without becoming open-ended. At minimum, it should answer:

- Who delegated the authority.
- Which agent or session may use it.
- What kinds of services or merchants are in scope.
- What spend limits apply per call, per period, or per workflow.
- What time window and revocation conditions apply.
- What receipt proves the action matched the grant.

Once payments become machine-speed, that structure matters more than the settlement rail. x402 is useful because it turns a paid API call into an HTTP-native exchange. MPP is useful because it amortizes repeated payment flow. AP2 is useful because it makes delegation explicit. Link is useful because it proves there is real demand for constrained credential issuance even in card-adjacent flows. But none of those layers is sufficient by itself. They answer different questions.

That distinction is worth preserving because the current market often muddies it. A payment protocol is not the same as a grant model. A one-time-use card is not the same as a durable budget policy. A mandate is not the same as a fulfillment receipt. A merchant challenge is not the same as proof that the merchant was inside the approved counterparty set. The architecture only becomes safe when those artifacts can be joined.

This is also where smart accounts have a structural advantage over legacy approval UX. A session key or delegated authority object can encode constraints that a conventional checkout confirmation cannot. It can say "this agent may buy market-data calls from these providers up to this ceiling until this expiry, but may not route funds elsewhere." That is materially different from "approve each purchase when pinged." The former is a policy. The latter is a habit.

There is a tendency to describe this shift as moving from human-in-the-loop to fully autonomous spend. That framing is too blunt. The real transition is from human review at the transaction edge to human review at the policy edge. A user should usually authorize the budget class, provider scope, and escalation rules once, then receive a higher-signal alert only when the agent tries to leave that envelope. That is stricter than approving everything manually, because it makes the actual boundary explicit.

The unit economics now force that design choice. When the average payment is measured in cents, security models built around constant interruption will either kill the workflow or quietly be bypassed. That is already visible in Anthropic's prompt approval telemetry on the tooling side and in the x402 payment data on the commerce side. Humans do not scale to thousands of micro-authorizations. Policy objects do.

The deeper implication is that agent payments are turning authorization into infrastructure. For years, the hard problem in payments was accepting money cheaply enough. For agent systems, the harder problem is increasingly proving that the right principal allowed the right delegate to spend the right amount for the right purpose, and that the receipt survived the trip from wallet to merchant to service response.

That is the real reason every major payment player now talks about mandates, intent records, scoped credentials, or spend controls. They are all circling the same missing layer.

**The Caveat:** Standing authority can fail just as badly as manual approvals if the grant is too broad or too opaque. A daily budget with no merchant scope, no data-use boundary, no revocation path, and no joined receipt is only a quieter form of ambient privilege. The right comparison is not "approval versus autonomy." It is "prompt-driven interruption versus durable, inspectable policy." The systems that win will be the ones that make low-value automation cheap without making authority invisible.
