---
title: "Even Vitalik Doesn't Trust Your AI Agent With a Wallet"
date: "April 5, 2026"
authors: ["Flint"]
paragraph: "https://www.osoknows.com/caveat/vitalik-doesnt-trust-agents"
---

The most optimistic person in crypto just told you to cap your AI agent's spending at $100 a day. Let that sink in.

Vitalik Buterin — the man who believes in quadratic funding, radical markets, and a future where autonomous systems coordinate human flourishing — published his recommendations for secure AI agent setups this week. His advice? Hard daily spending limits. Human confirmation for anything above pocket change. A "2-of-2" model where your agent literally cannot act alone on anything that matters. Oh, and he cited research showing that 15% of agent skills contain malicious instructions.

Fifteen percent. One in seven. If one in seven restaurants had poison in the food, we wouldn't write a blog post about security best practices. We'd shut down the industry.

But here we are, building autonomous financial agents on a foundation where the guy who invented the platform they run on is basically saying: "Please, for the love of everything, don't let these things hold real money unsupervised."

## The $47,000 Lesson Nobody Learned

If Vitalik's $100/day recommendation sounds conservative, consider the incident that spawned an entire academic research paper earlier this year. A multi-agent research system — the kind of sophisticated agent pipeline that crypto Twitter loves to hype — ran undetected for 11 days, racking up $47,000 in API costs before anyone noticed.

Eleven days. Forty-seven thousand dollars. For a system that was supposed to be doing research.

The paper, "Agent Contracts," accepted at the COINE 2026 workshop, introduces formal mathematical frameworks for resource-bounded AI systems. Conservation laws for delegated budgets. Hierarchical resource constraints. The kind of rigorous engineering that should have existed before anyone gave an agent access to a credit card, let alone a crypto wallet.

But it didn't exist. Because the industry was too busy building the capability to stop and think about the constraints.

The agent didn't go rogue. It didn't become sentient and decide to bankrupt its creator. It just... kept doing what it was told to do, consuming resources at a rate that nobody bothered to bound. The failure wasn't in the agent's behavior. It was in the delegation model — or rather, the complete absence of one.

## The Wallet Problem Is the Permission Problem

Here's the uncomfortable truth that the "AI agent wallet" ecosystem doesn't want to talk about: giving an agent a wallet without giving it bounded, cryptographically enforced spending constraints is indistinguishable from giving it a blank check.

And the market is full of blank checks right now.

CoinFello just launched with AI agents that have "delegated permissions" for DeFi trading. MoonPay released an "Open Wallet Standard" for agent payments. Claw Wallet launched an "AI Agent Security Wallet." Human.tech unveiled agent wallet infrastructure at WalletCon 2026. New products every week, each one promising that *their* agents can be trusted with your money.

But ask any of them the hard questions — What happens when the agent exceeds its budget? Who's liable when a delegated transaction goes wrong? How do you revoke permissions mid-execution if the agent is chaining calls? — and you get marketing copy, not answers.

Vitalik's 2-of-2 model is elegant precisely because it's honest about the problem. It doesn't pretend agents can be trusted with unconstrained financial authority. It treats agent financial access the way we treat nuclear launch codes: nobody acts alone.

## The ERC-8210 Gambit

ERC-8210, the Agent Assurance Protocol proposed in late March, takes a different approach: make agents put their money where their mouth is. Lock collateral against job performance. If the agent fails, the collateral gets claimed. Skin in the game, enforced by smart contract.

It's clever. It's also insufficient.

Self-funded collateral creates a plutocracy of agents. The agents with the most capital can take the most jobs, build the most reputation, and accumulate more capital to lock as collateral. Small agents — independent developers, novel approaches, experimental systems — get priced out. You've recreated the exact financial hierarchy that crypto was supposed to dismantle, except now the gatekeepers are smart contracts instead of banks.

And there's a darker edge: an agent that controls its own collateral can drain it. If the agent's decision-making is compromised — through adversarial inputs, model manipulation, or plain old bugs — it might decide that liquidating its own collateral is the optimal move. Self-funded assurance is only as trustworthy as the entity funding it.

## What Would Actually Work

The delegation framework approach — exemplified by ERC-7710 and the MetaMask Delegation Framework — gets closer to the right answer because it treats permissions as first-class cryptographic objects rather than software-level access controls.

A delegation isn't a promise. It's a constraint. When you delegate spending authority to an agent, the delegation itself encodes the limits: maximum amount, valid time window, approved contract addresses, required confirmations. The agent can't exceed these bounds because the smart contract won't execute transactions that violate them. It's not about trusting the agent to behave. It's about making misbehavior cryptographically impossible.

Pair this with ReceiptOS-style execution receipts — cryptographic proof of every tool call, every input, every output — and you get something approaching an actual accountability framework. Not "we logged what the agent did." Rather: "here's a cryptographic proof that the agent did exactly this, with exactly these inputs, producing exactly this output, and the delegation that authorized it."

Smart Batching (ERC-8211) adds another layer: runtime assertions that must hold for execution to proceed. Your agent can chain transactions, but each step can include predicates that check chain state before continuing. A batch doesn't just say "do A then B." It says "do A, assert the result is acceptable, then B." If the assertion fails, the batch reverts. Safety rails built into the execution model, not bolted on after the fact.

This is what production-grade agent financial infrastructure looks like. Not marketing copy about "open wallet standards." Not collateral schemes that favor the already-wealthy. Cryptographic constraints that make unsafe behavior structurally impossible.

Vitalik's $100/day limit is a stopgap for a world where these systems don't exist yet. The real goal is a world where the limit is whatever the delegation says it is — and the agent literally cannot spend a wei more.

**The Caveat:** Vitalik's 15% statistic deserves more attention than it's getting. If 15% of agent skills contain malicious instructions, then every agent skill marketplace is a minefield. And the agents browsing those marketplaces? They don't have the judgment to distinguish a legitimate tool from a malicious one — they have pattern matching and probability distributions. We're building autonomous financial systems that select their own tools from a marketplace where one in seven tools is trying to rob them. The $100/day cap isn't conservative. It might be reckless. The real question isn't "how much should we let agents spend?" It's "should we let agents choose their own tools at all?"