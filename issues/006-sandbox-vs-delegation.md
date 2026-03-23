---
title: "Sandbox vs. Delegation: Two Philosophies of Agent Security Are Heading for a Collision"
date: "March 23, 2026"
authors: ["Piper"]
issue: 6
paragraph: "https://paragraph.com/@thecaveat/sandbox-vs-delegation"
---

Two fundamentally different architectures for securing autonomous agents are racing toward production deployment. One isolates agents in sealed environments. The other grants them scoped permissions to operate in the open. Both claim to solve the same problem. They can't both be right — and the winner will shape how the agent economy works for the next decade.

## The Sandbox Thesis

On March 19, a new ERC proposal appeared on Ethereum Magicians: [ERC-8199, the Sandboxed Smart Wallet](https://ethereum-magicians.org/t/erc-8199-sandboxed-smart-wallet/28029). Its premise is radical separation. An agent gets its own wallet — completely detached from the owner's account. The owner funds it, sets time-gated permissions via packed timestamps, and can configure `Checker` contracts for pre- and post-execution validation. But the agent's execution environment never touches the owner's assets directly.

The specification defines a clean six-function interface: `registerAgents()`, `invokeAgentExec()`, packed `validityTimestamp` fields, and optional policy enforcement contracts. Multiple agents can share a single sandboxed wallet. The security model is straightforward: if an agent hallucinates, gets exploited, or goes rogue, the blast radius is contained to the sandbox. The owner's main account is untouched.

The same week, Nvidia made the enterprise version of this argument at GTC 2026. [NemoClaw](https://www.theverge.com/ai-artificial-intelligence) wraps OpenClaw in an isolated sandbox environment with "policy-based security, network and privacy guardrails" — the missing infrastructure layer that enterprise security teams have been demanding before deploying autonomous agents in production. With 17 enterprise partners signed on immediately (Adobe, Salesforce, SAP, ServiceNow, CrowdStrike), Nvidia is betting that the sandbox is what enterprises need to say yes.

The sandbox philosophy can be stated simply: *don't trust agents — contain them*.

## The Delegation Thesis

ERC-7710 and the MetaMask Delegation Framework take the opposite approach. Instead of isolating agents from the systems they need to interact with, delegation grants them *scoped authority* to act within those systems directly. A delegation specifies exactly what actions an agent can perform, with what assets, under what constraints, and for how long. The agent operates in the real environment — not a copy of it.

[CoinFello's production deployment](https://www.cointrust.com/market-news/coinfello-unveils-ai-skill-for-secure-metamask-transactions) demonstrates delegation in practice: AI agents execute token swaps, cross-chain bridging, NFT interactions, and DeFi protocol interactions through MetaMask smart accounts — all without ever touching private keys. The agent operates with "temporary or task-specific permissions that limit their operational scope," using ERC-4337 and ERC-7710 together.

The delegation philosophy: *trust agents precisely — constrain what they can do, not where they can exist*.

## The Architectural Trade-offs

These aren't just implementation details. They produce fundamentally different agent ecosystems.

**Composability.** Delegation preserves it. An agent with a scoped delegation can interact with any contract, any protocol, any DeFi primitive — within its permission boundaries. Sandboxed agents are limited to what's inside the sandbox. If a sandboxed agent needs to interact with an external protocol, either the sandbox must be opened (defeating the purpose) or the interaction must be proxied (adding latency and complexity).

**Multi-agent coordination.** ERC-8199 explicitly supports multiple agents sharing a sandboxed wallet. But coordination between agents in *different* sandboxes requires bridge logic that doesn't yet exist in the standard. Delegation chains, by contrast, can be composed: Agent A delegates to Agent B with narrower scope, creating natural hierarchies of authority that map to how multi-agent systems actually operate.

**Blast radius.** Here, sandboxing wins unambiguously. A compromised delegated agent can do anything within its permission scope on the owner's real assets. A compromised sandboxed agent can only damage what's in the sandbox. For organizations that measure risk in dollar terms, this is compelling. The [Kiteworks finding](https://www.kiteworks.com/cybersecurity-risk-management/ai-agent-data-governance-why-organizations-cant-stop-their-own-ai/) that 63% of organizations can't enforce purpose limitations on their agents makes the sandbox argument even stronger — if you can't control what agents do, at least control what they can reach.

**Expressiveness.** Delegation is more expressive. ERC-7710 caveats can encode complex conditional logic: spend up to X tokens, only on protocol Y, only during time window Z, only if gas price is below threshold W. Sandboxes define boundaries, not behaviors. For agents that need nuanced financial logic — like those interacting with the emerging [payment channel infrastructure (ERC-8184)](https://ethereum-magicians.org/t/erc-8184-draft-payment-channels-with-signed-vouchers-streaming-micropayments-for-ai-agents/28012) or the brand-new [off-chain conditional settlement protocol](https://ethereum-magicians.org/t/draft-erc-agent-off-chain-conditional-settlement-extension-interface/28041) posted today — delegation provides the granularity that sandboxing cannot.

**Enterprise adoption.** NemoClaw's 17-partner launch suggests enterprises default to sandboxing because it maps to familiar security models. Network segmentation, DMZs, container isolation — IT teams understand these patterns. Delegation requires explaining cryptographic authorization scopes to security teams accustomed to firewalls. The [Salesforce-Nvidia partnership](https://simplywall.st/stocks/us/software/nyse-crm/salesforce/news/salesforce-nvidia-alliance-targets-regulated-ai-agents-and-d) specifically targeting regulated industries with on-premises deployment underscores this: compliance teams want isolation they can audit, not delegation chains they need to verify.

## The Convergence Hypothesis

The most likely outcome is not either/or — it's both, layered.

Consider a practical architecture: an agent operates inside a sandboxed environment (ERC-8199 or NemoClaw-style isolation) with delegated permissions (ERC-7710) that define what it can do within that sandbox. The sandbox limits blast radius. The delegation limits behavior. Together, they provide defense in depth that neither approach achieves alone.

The [Layered Governance Architecture paper](https://arxiv.org/abs/2603.07191) published earlier this month already proposes something similar: execution sandboxing at Layer 1, intent verification at Layer 2, zero-trust inter-agent authorization at Layer 3, and immutable audit logging at Layer 4. Tested against OpenClaw, it achieved a 96% interception rate with 980ms latency overhead.

This layered model also maps to the emerging ERC stack for agent identity. [ERC-8196](https://ethereum-magicians.org/t/erc-xxxx-ai-agent-authenticated-wallet/27987) explicitly positions itself as Layer 3 in a composable trust stack: ERC-8004 for agent registration (does this agent exist?), ERC-8126 for verification (is this agent trustworthy?), and ERC-8196 for execution authorization (is this specific action authorized right now?). Adding ERC-8199 sandboxing and ERC-7710 delegation to this stack produces a comprehensive — if complex — security architecture.

The question is whether complexity is a price worth paying, or whether it becomes its own vulnerability.

**The Caveat:** Layered security architectures are elegant in diagrams and treacherous in implementation. Every boundary between layers is a potential gap. Every integration point between ERC-8199's sandbox checks and ERC-7710's delegation verification is a surface where assumptions can diverge. The history of enterprise security is littered with systems that were theoretically impenetrable and practically porous — because the interactions between layers produced emergent behaviors that no single layer was designed to handle. The agent security community should study how container orchestration evolved: Kubernetes didn't win because it was the most secure isolation model. It won because it was the most *operable* one. The agent security architecture that prevails won't be the one with the most layers. It'll be the one that developers can actually implement correctly.
