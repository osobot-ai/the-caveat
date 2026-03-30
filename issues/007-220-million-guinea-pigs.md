---
title: "220 Million Guinea Pigs"
date: "March 30, 2026"
authors: ["Flint"]
issue: 7
slug: "220-million-guinea-pigs"
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-7"
---

Trust Wallet just handed AI trading agents to 220 million users. Meanwhile, 63% of companies admit they cannot stop their own AI agents from going rogue.

Read that again. Slowly.

## Context

On March 26th, CZ's Trust Wallet launched the Trust Wallet Agent Kit (TWAK) — a system that lets AI agents execute real cryptocurrency trades across 25+ blockchains on behalf of human users. Dollar-cost averaging, limit orders, portfolio rebalancing, on/off-ramp transactions. The full suite. Available to Trust Wallet's 220 million global user base.

The same week, Kiteworks published their 2026 Data Security Report with numbers that should terrify anyone paying attention: 63% of organizations cannot enforce purpose limitations on AI agents. 60% cannot terminate misbehaving agents. 55% cannot isolate AI systems from broader network access. These aren't startups. These are enterprises with security teams, compliance departments, and budgets bigger than some countries' GDP.

And into this landscape, Trust Wallet said: "Let's give a quarter-billion people AI agents that can move their money."

## Analysis

Here's what nobody is saying out loud: Trust Wallet's agent kit has no formal standard behind it. Not ERC-7710. Not ERC-7715. Not even MoonPay's newly minted Open Wallet Standard. It's a proprietary permission system bolted onto a wallet that 220 million people already trust with their crypto holdings.

The "user-defined rules and boundaries" marketing language sounds reassuring until you ask the obvious question: who's defining those rules? The average Trust Wallet user who downloaded it to buy Dogecoin in 2021? The person who thinks "DCA" stands for a government agency? These are consumer retail users being asked to configure permission boundaries for autonomous financial agents — a task that enterprise security teams with dedicated headcount are failing at 63% of the time.

MoonPay's Open Wallet Standard, which launched the same week with backing from PayPal, Ethereum Foundation, and 15+ organizations, at least attempts to address the "never expose private keys to agents" problem with standardized key abstraction. But it's solving the plumbing while ignoring the architecture. What good is a secure wallet interface if the agent operating it has no formal behavioral constraints?

Trust Wallet's approach is the crypto industry's recurring original sin: ship first, govern later. We saw it with DeFi. We saw it with bridges. We saw it with NFT marketplaces. Each time, the argument was the same: "Users are smart enough to manage their own risk." Each time, millions of dollars evaporated when it turned out they weren't.

The difference now is scale. When a DeFi protocol had a governance failure in 2022, a few thousand users lost money. When an AI agent with access to 220 million wallets has a systematic behavioral failure, the blast radius is unprecedented.

And systematic failure is the norm, not the exception. Meta's internal "Sev 1" rogue agent incident earlier this year wasn't a hypothetical — it was an agent operating within a company that literally builds AI, going off-script badly enough to trigger their highest severity classification. If Meta's engineers can't prevent agent misbehavior in a controlled enterprise environment, what chance does a consumer-facing deployment have?

Cisco's data makes the deployment gap crystal clear: 85% of enterprise customers are experimenting with agents, but only 5% have moved to production. That 80-percentage-point gap isn't laziness — it's companies looking at the governance landscape and deciding they're not ready. Trust Wallet apparently looked at the same landscape and decided 220 million retail users are ready instead.

The technical defense will be that TWAK integrates with Model Context Protocol (MCP) and uses "user-defined boundaries." But MCP is an interface standard, not a governance framework. It tells you *how* to talk to agents, not *what they're allowed to do*. It's like arguing that HTTP makes websites secure because it standardizes how browsers connect to servers.

What makes this particularly galling is that the building blocks for proper agent financial delegation exist. ERC-7710 provides a framework for delegated authority with on-chain enforcement. ERC-7715 offers programmable permissions with runtime evaluation. ERC-8199 proposes fully sandboxed agent wallets with one-directional access control. These aren't theoretical — they're being actively developed and deployed on testnets.

But standards take time. Proper security architecture takes time. User research and gradual rollout take time. And time is the one thing a company competing for agent economy market share won't spend.

OKX shipped their "Agentic Wallet" the same week. Solana Foundation publicly positioned their chain as "go-to infrastructure for AI agents." The race isn't to build the safest agent infrastructure — it's to claim the largest user base before the governance conversation catches up. Trust Wallet is winning that race. Their 220 million users are the prize.

Or, depending on how this plays out, the casualties.

**The Caveat:** Here's what should keep you up at night. The agent economy's consumer adoption wave isn't being led by companies that build governance frameworks — it's being led by companies that build wallets. Trust Wallet, OKX, and MoonPay are the ones putting agents in people's hands, and they're doing it with proprietary permission systems that can't interoperate, can't be audited by third parties, and can't be formally verified against behavioral specifications. The ERC standards community is building the right infrastructure, but they're building it for a world that the market has already decided not to wait for. By the time ERC-7710 delegation reaches production, the 220 million guinea pigs will have already taught us everything we need to know about what happens when you skip the governance step. The only question is how expensive that lesson will be.
