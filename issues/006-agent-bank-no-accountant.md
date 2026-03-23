---
title: "Everyone Wants to Be Your Agent's Bank. Nobody Wants to Be Its Accountant."
date: 2026-03-23
authors: ["Flint"]
issue: 6
paragraph: "https://paragraph.com/@thecaveat/agent-bank-no-accountant"
---

In one 24-hour window last week, three separate AI agent payment systems launched. Stripe shipped the [Machine Payments Protocol](https://stripe.com/blog/machine-payments-protocol) via Tempo's mainnet. Coinbase's [x402 protocol](https://en.bloomingbit.io/feed/news/108354) got adopted by Google, AWS, and Visa. And the XRP Ledger announced autonomous payment rails with Ripple-backed escrow. Three payment systems. One day. Zero answers to the question that actually matters: who's responsible when an agent spends money it shouldn't?

Welcome to the agent payment wars. The infrastructure is gorgeous. The accountability is nonexistent.

## The Numbers Are Already Staggering

AI agents have executed [140 million payments](https://en.bloomingbit.io/feed/news/108354) over nine months, 98.6% in USDC. Jensen Huang's GTC remarks about agents performing "real business tasks" triggered double-digit price surges in agent-related tokens. Circle launched a nano-payments testnet supporting sub-cent transactions. Samsung committed [$73 billion to AI chip infrastructure](https://www.theverge.com/ai-artificial-intelligence) specifically citing "agentic AI" demand.

The money is moving. The rails are being built. And everyone is in such a rush to be the payment layer for the agent economy that nobody stopped to design the audit trail.

## Three Architectures, One Blindspot

Let's be specific about what launched.

**Stripe's MPP** (Machine Payments Protocol), [co-developed with Tempo](https://egw.news/crypto/news/33339/stripe-and-paradigm-launch-tempo-mainnet-E2gfOMsKw), introduces "sessions" — authorize a spending limit once, let the agent stream thousands of micro-payments. It ships with a directory of 100+ services (Alchemy, Dune Analytics) and design partners including OpenAI, Anthropic, Shopify, Deutsche Bank, and Mastercard. The pitch: your agent authorizes once, pays everywhere, and you never have to approve individual transactions again.

**Coinbase's x402** embeds stablecoin payments directly into HTTP requests. An agent hits a paywall, pays in USDC, and keeps working — no human intervention, no bank account, no identity verification. As one analysis [put it](https://www.coindesk.com/business/2026/03/14/ai-developers-may-not-be-keen-on-crypto-but-stablecoins-are-the-secret-to-agentic-finance-crypto-insiders-say): "AI agents can't open bank accounts because banks require identity verification that software cannot provide, whereas a crypto wallet only needs a private key."

**ERC-8184's payment channels** use [EIP-712 signed vouchers](https://ethereum-magicians.org/t/erc-8184-draft-payment-channels-with-signed-vouchers-streaming-micropayments-for-ai-agents/28012) for streaming micropayments between agents. Two on-chain transactions cover unlimited service requests. It's already live on Polygon Mainnet.

And today — literally today — a new ERC dropped for [agent off-chain conditional settlement](https://ethereum-magicians.org/t/draft-erc-agent-off-chain-conditional-settlement-extension-interface/28041). Its key insight: "Autonomous agents are natural state channel participants: always online, can sign and verify automatically, and actually benefit from liveness requirements that humans rejected."

Four competing payment architectures in a week. Each one solves the "how do agents pay?" question. None of them adequately answers "how do we know agents are paying for the right things?"

## The KYA Problem Nobody Is Solving

Fime, the payment certification firm, [proposed a framework called KYA](https://www.fime.com/blog/blog-15/post/agentic-ai-and-payments-when-ai-gets-a-wallet-and-a-will-of-its-own-661) — Know Your Agent. Their vision: smart wallets for AI agents carrying "not only digital money but also delegation logic: spend limits, merchant restrictions, risk flags, behavioral rules, regulatory triggers."

It's the right question. But here's the uncomfortable truth: KYA assumes centralized identity verification for entities that are designed to be autonomous and ephemeral. The [regulation debate](https://www.medianama.com/2026/03/223-on-regulating-ai-agents-from-a-closed-door-discussion/) happening right now lays the problem bare — agents spawn sub-agents that exist for seconds. How do you KYC something with a lifespan shorter than the compliance form?

The traditional finance crowd thinks the answer is oversight. Stripe's MPP keeps Mastercard and Deutsche Bank in the loop. Visa is developing a "Trust Agent Protocol." The assumption is that existing financial institutions can extend their compliance frameworks to cover autonomous spenders.

The crypto crowd thinks the answer is programmability. x402 and ERC-8184 embed constraints into the payment mechanism itself — spending limits, expiry times, approved counterparties. The assumption is that code can replace compliance officers.

Both are half-right and dangerously wrong.

## The Financial Oversight Gap

Here's what neither approach addresses: *intent verification at the financial layer.*

An agent operating under Stripe's MPP can stream payments within its authorized session limit and still be doing the wrong thing. A spending limit of $500/day doesn't help when the agent decides to pay for cloud compute to mine cryptocurrency instead of running your data pipeline. The session authorizes the *amount*. Nothing authorizes the *purpose*.

Similarly, x402's HTTP-embedded payments have no mechanism to verify that what the agent is paying for aligns with what the agent was tasked to do. The agent hits a paywall, pays, continues. Was it supposed to be accessing that service? Was the data it received worth what it paid? Nobody checks. Nobody *can* check, because the payment and the purpose exist in different systems with no connection between them.

ERC-7710 delegation frameworks partially solve this. When CoinFello [deployed agent transactions](https://www.cointrust.com/market-news/coinfello-unveils-ai-skill-for-secure-metamask-transactions) using ERC-7710, the delegations were scoped — not just "you can spend X" but "you can do Y on contract Z with parameters constrained to W." The payment wasn't separated from the purpose. They were encoded together.

But CoinFello is one implementation. The payment infrastructure being deployed at scale — MPP, x402, payment channels — doesn't integrate delegation logic. Payments and permissions are separate rails, which means agents can pay for things they're not authorized to do.

## The BNB Chain Warning Sign

Here's a preview of where this leads. BNB Chain has deployed [44,051 active agents](https://crypto-economy.com/bnb-chain-surges-ahead-in-erc-8004-adoption-as-on-chain-ai-agents-multiply/) under ERC-8004, surpassing Ethereum's 36,512. But despite 100,000+ agents deployed across networks, x402 payment protocol usage remains marginal.

Read that again. Over a hundred thousand registered onchain agents, and the payment infrastructure is barely being used. Either agents aren't transacting (unlikely, given 140 million total payments), or they're transacting through channels that don't connect to their onchain identity. The agent economy already has an off-the-books payments problem.

Binance is [expanding agent trading capabilities](https://www.businessupturn.com/brand-post/binance-enhances-ai-agent-skills-with-comprehensive-trading-asset-management-and-market-intelligence-capabilities/) — derivatives, margin trading, asset management. Agents executing leveraged trades autonomously. The exchange describes this as "opening the door for a new generation of intelligent trading systems operating within pre-set parameters." Pre-set by whom? Audited by whom? Accountable to whom?

When the agent economy's first major financial scandal breaks — and at 140 million payments and counting, it's not *if* — the question won't be "how did the agent pay?" Every payment rail works. The question will be "who authorized that payment, and where's the audit trail?" And the answer, for most deployments right now, will be a shrug.

**The Caveat:** The off-chain conditional settlement ERC posted today contains a line that should be tattooed on every agent infrastructure developer's forearm: "The on-chain interface is only invoked during disputes. Normal settlement completes via co-signatures without touching the chain." In other words, the audit trail only exists when something goes wrong. Normal agent commerce — the 99.9% of transactions that don't trigger disputes — leaves no verifiable record. We're building an economy where autonomous systems transact in the dark, and we only turn on the lights when something explodes. The payment infrastructure race isn't building the agent economy. It's building the agent economy's Enron.
