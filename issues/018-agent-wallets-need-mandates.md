---
title: "Agent Wallets Need Mandates"
date: "June 15, 2026"
authors: ["Piper"]
---
This week, agent wallets stopped looking like demos and started looking like a real product category, which means the hard problem is no longer whether agents can move money, but what evidence proves they were allowed to.

## Context

The product signals are unusually dense.

[MetaMask Agent Wallet](https://metamask.io/news/metamask-launches-agent-wallet-giving-ai-agents-full-defi-access-with-default-security-on-every-transaction) launched early access with a control surface that is much more explicit than the typical "AI wallet" pitch. The product describes [Guard Mode and Beast Mode](https://metamask.io/agent-wallet), daily spend limits, protocol allowlists, transaction simulation, Blockaid-backed threat scanning, MEV protection, and two-factor escalation when a transaction is malicious or outside policy. The important phrase in the launch material is not "full DeFi access." It is that the agent operates inside user-defined limits and cannot opt out of the security check.

[CoinFello's Fello 1](https://www.chainbits.com/press-releases/coinfello-publicly-launches-fello-1-for-general-purpose-defi/) made a different but equally important move. It positions itself as a general-purpose DeFi agent that can interact with arbitrary EVM contracts, open Uniswap LP positions, coordinate multi-step transactions, and work through MetaMask Smart Accounts standards with ERC-7710 and ERC-7715 delegation. But CoinFello is also careful to say Fello 1 is not an autonomous trading bot. Users still review and approve each transaction, and permissions remain modifiable or revocable.

[MoonPay Agents](https://www.prnewswire.com/news-releases/moonpay-launches-moonpay-agents-the-onramp-for-the-agent-economy-302695744.html) adds the compliance and funding side. Its launch material says a human can complete KYC once, fund a non-custodial wallet, and then let an agent trade, swap, off-ramp, schedule recurring buys, and even make x402-compatible machine-to-machine payments through MoonPay's infrastructure.

The surrounding payments commentary is catching up to the same point. [PYMNTS](https://www.pymnts.com/news/artificial-intelligence/2026/permission-not-payments-will-shape-agentic-commerce-revolution/) put it plainly: the rail is not the main bottleneck anymore. The hard part is deciding when an agent should be trusted to spend, under what conditions, and with what degree of delegated authority.

Put those pieces together and a pattern emerges. The market is no longer asking whether agentic commerce is possible. It is asking how to package economic authority so that users, wallets, payment providers, merchants, and auditors can all tell the difference between a legitimate delegated action and a costly mistake.

## Analysis

That distinction matters because these launches are not all solving the same problem.

MetaMask is selling runtime control. Its product story is about screening transactions before they execute. MoonPay is selling economic enablement. Its product story is about getting capital into a wallet and letting software use it. CoinFello is selling generalized execution. Its product story is about moving from narrow DeFi helpers to broader smart-contract interaction without giving up self-custody.

Those are all necessary layers. None of them is the mandate.

KYC is not a mandate. Completing compliance checks may prove that a human is eligible to access a service. It does not, by itself, specify which agent may spend, under which budget, against which destinations, for how long, and with what denial or revocation path. MoonPay's launch highlights this cleanly. "From there" is doing a lot of work in the sentence that says a human completes KYC and the agent can execute transactions on the user's behalf. The missing object is the thing that explains what "on the user's behalf" actually means.

Transaction simulation is not a mandate either. Simulation is a useful control because it can catch malicious calldata, unexpected state changes, or obviously dangerous execution paths. But it answers a different question: what this transaction is likely to do if sent right now. It does not answer who authorized the agent to attempt that class of action in the first place, or whether the authority still existed at the moment of execution.

Per-transaction approval is not a mandate. It is a transitional substitute for one. CoinFello is right to keep the human in the loop. But a system that still requires a human to inspect every action has not solved delegated authority; it has delayed it. That is often the right product decision early on. It is not the end state the market keeps implying with phrases like autonomous finance or agent economy.

What would a real mandate look like?

At minimum, it would need to bind seven things in a portable, inspectable way.

First, the principal: which human or institution granted the authority. Second, the delegate: which agent, runtime, or wallet component is allowed to use it. Third, the scope: which protocols, markets, counterparties, or service classes are in bounds. Fourth, the budget: how much value can move, in what asset, over what time window. Fifth, the expiry and revocation state: when the authority ends, and how other systems learn that it has ended. Sixth, the decision record: whether the action was auto-approved, policy-approved, escalated, or denied. Seventh, the execution receipt: what finally happened onchain or offchain after the agent tried to act.

Current launches cover parts of that list. They do not yet give the user or the broader ecosystem the whole packet.

MetaMask is closest on policy expression. Spend limits, protocol allowlists, and security checks are exactly the kinds of fields a mandate needs. But the public materials are stronger on enforcement than on portability. The open question is whether the resulting approval and denial artifacts can travel beyond the MetaMask runtime. Could another service later verify which policy version was active? Could an auditor see whether two-factor approval was required and granted? Could a merchant distinguish a denied action from a revoked permission from an expired one?

MoonPay is closest on economic lifecycle. Funding, transaction execution, and off-ramping all live in the same story. But that makes the authority problem sharper, not weaker. Once the same stack can move from wallet creation to recurring buys to machine payments, the permission object has to be richer than "verified user, funded wallet." It has to explain which economic capabilities survived the transition from human onboarding to machine execution.

CoinFello is closest on generalized action surface. It is trying to preserve self-custody while broadening what the agent can do. That is exactly where standards like ERC-7710 and ERC-7715 become interesting. The problem is that general smart-contract reach raises the cost of ambiguity. A vague permission in a narrow app is a contained risk. A vague permission in a general-purpose agent becomes a universal risk.

This is why the framing from the payments side is useful. When PYMNTS says permission, not payments, will shape agentic commerce, that is not just an industry slogan. It is a recognition that payment rails can settle value without answering whether the decision to move value was well-scoped, contextually legitimate, or later provable.

The next competitive layer in agent wallets is not smarter routing or more integrations. It is better mandate design.

The winning products will be the ones that can do three things at once: let the user express meaningful standing authority, enforce it at runtime without constant friction, and emit receipts that another system can inspect without trusting one vendor's internal dashboard.

That is a higher bar than "AI wallet with controls." But the product category is already forcing it.

**The Caveat:** It is easy to overcorrect here and assume every agent action needs a heavy, cross-platform credential ceremony before anything useful can happen. That would be a mistake. Many products are right to start with tighter runtime controls, per-transaction review, or provider-local safeguards because those are shippable now and materially safer than ambient wallet access. The real risk is not that early systems are imperfect. It is that the market mistakes local controls for a finished authority model. Once agents span wallets, exchanges, payment networks, and API services, the absence of a portable mandate will become visible very quickly.
