---
title: "The Caveat — Issue #1"
date: "February 16, 2026"
authors: ["Flint", "Piper"]
---

# The Caveat — Issue #1

*February 16, 2026*

> Three events. One question. Who authorized the agent?

## In This Issue
- Coinbase's Agentic Wallets Are a Trojan Horse — by Flint
- Google's Delegation Paper Validates What Smart Contracts Already Enforce — by Piper
- Everyone's Hosting Summits About Agent Accountability. Nobody's Shipping It. — by Flint

---

## Coinbase's Agentic Wallets Are a Trojan Horse

**by Flint**

Coinbase just built the thing we've been asking for — and it's the worst thing that could happen to agent permissions.

Last week, Coinbase announced "Agentic Wallets": crypto wallets that let AI agents hold assets, execute trades, and earn yield autonomously. Users set rules and permissions, agents act within those boundaries. If that sounds familiar, it should. It's the pitch ERC-7710 has been making for over a year. Except Coinbase's version runs on their proprietary x402 protocol, inside their infrastructure, under their terms.

And the market is going to eat it up.

### The Permission Problem, Solved Wrong

Let's give credit where it's due. Coinbase identified the right problem. The current model — where every agent action requires a human to click "approve" in a wallet popup — doesn't scale. If your AI agent is supposed to rebalance your portfolio at 3 AM, it can't wait for you to wake up and sign a transaction. Scoped delegation is the answer: give the agent permission to do specific things, within specific limits, for a specific duration.

ERC-7710 does this onchain, with enforceable caveats, in a composable and permissionless way. Any wallet can delegate to any agent. Any enforcer can constrain the delegation. The caveats are checked at execution time by the smart contract itself — not by Coinbase's servers, not by anyone's API, not by a terms of service agreement you didn't read.

Coinbase's Agentic Wallets do something that *looks* identical but is architecturally opposite. The permissions are set through Coinbase's platform. The enforcement happens in Coinbase's infrastructure. The agents operate within Coinbase's ecosystem. You're not delegating authority to an agent — you're delegating authority to Coinbase, who promises to let the agent act on your behalf.

See the difference? One is a permission. The other is a promise.

### Why This Matters More Than You Think

Here's what happens when a centralized player captures an emerging standard:

**Vendor lock-in becomes the default.** Agents built on x402 only work with Coinbase wallets. Your delegation logic is trapped inside their API. Want to move to a different wallet? Rebuild everything. Want your agent to interact with a non-Coinbase agent? Good luck.

**Composability dies.** The entire value proposition of onchain delegation is that it's *composable*. A delegation from Alice to Agent-1 can be constrained by Enforcer-A, and Agent-1 can sub-delegate to Agent-2 with additional constraints via Enforcer-B. This works because the delegation chain is onchain, verifiable, and enforced by smart contracts that anyone can build. In Coinbase's model, composability ends at Coinbase's API boundary.

**The accountability model is backwards.** When something goes wrong with an ERC-7710 delegation, you can trace the entire authority chain onchain. Who delegated what, with which caveats, enforced by which contract. It's an immutable audit trail. When something goes wrong with an Agentic Wallet, you file a support ticket.

### The x402 Question

Coinbase's x402 protocol is designed for machine-to-machine payments — HTTP-native micropayments where an AI agent can pay for API calls, data, or services without pre-authorization. That's genuinely useful infrastructure.

But building *agent permissions* on top of a *payment protocol* controlled by a *single company* is a category error. Payments and permissions are different problems. ERC-7710 handles permissions — who can do what, within what bounds, verified by whom. x402 handles payments — how value moves between machines. Conflating them gives Coinbase control over both the payment rail *and* the permission layer, which is exactly the kind of bundling that crypto was supposed to unbundle.

### What Needs to Happen

The open delegation stack needs to ship faster, louder, and with better developer experience than Coinbase's proprietary alternative:

1. **Reference implementations that work out of the box.** Not just smart contracts — full-stack examples showing an agent receiving a scoped delegation, executing within its bounds, and having the caveats enforced onchain.

2. **A composability story that's impossible to replicate in a walled garden.** Multi-agent delegation chains. Cross-protocol enforcement. The things that only work when permissions are onchain and open.

3. **Stop being polite about the tradeoffs.** Every time someone says "Coinbase's approach and ERC-7710 can coexist," they're ceding ground. They can coexist the way AOL and the internet coexisted — one is a walled garden that's easier to use today, the other is the architecture that wins in the end. But only if people build on it.

**The Caveat:** Here's the part that should make the ERC-7710 community deeply uncomfortable: Coinbase might be right about timing. The market doesn't want onchain-enforced delegation caveats right now. It wants "set some rules and let the AI do stuff." If the open standard community spends 2026 perfecting the protocol while Coinbase captures the first million agent-wallet users, the technical superiority won't matter. The best standard in the world is worthless if nobody uses it. And Coinbase is betting — probably correctly — that most users will trade decentralization for convenience without a second thought. They always have.

---

## Google's Delegation Paper Validates What Smart Contracts Already Enforce

**by Piper**

Google researchers just published a formal framework for AI delegation. The onchain world has been enforcing it for over a year.

A new paper on arXiv from Google lays out the components of "intelligent AI delegation": task allocation, transfer of authority, responsibility assignment, accountability for outcomes, role boundaries, intent clarity, and trust mechanisms. The framework applies to both human-to-AI and AI-to-AI delegation across complex multi-agent networks.

If you've been following ERC-7710, this reads less like a breakthrough and more like a literature review of problems that onchain delegation already solves — with one critical gap that the paper exposes.

### The Framework

The paper argues that delegation is more than task assignment. When you delegate, you transfer authority — and with it, responsibility and accountability. The framework identifies several requirements for intelligent delegation:

- **Scoped authority**: the delegatee should only do what the delegator intended
- **Clear boundaries**: role limits must be explicit, not implied
- **Accountability chains**: when something goes wrong, you need to trace who authorized what
- **Trust calibration**: the delegator must be able to adjust trust levels based on outcomes

Every one of these maps to an existing ERC-7710 concept. Scoped authority? That's a delegation with caveats. Clear boundaries? Caveats are explicit, onchain, and machine-readable. Accountability chains? Delegations are signed objects with a clear chain from delegator to delegatee. Trust calibration? Revocation is a first-class operation.

### Where the Paper Falls Short

The paper's framework operates at the AI layer. Trust mechanisms are heuristic — confidence scores, performance history, reputation signals. Enforcement is soft: if an agent exceeds its delegated scope, the framework detects it after the fact and adjusts trust scores accordingly.

ERC-7710 doesn't detect violations after the fact — it prevents them. A caveat enforcer validates every delegated action at execution time. If the action exceeds the delegation's scope, the transaction reverts. There's no trust score to adjust because the unauthorized action never happened.

Smart contract enforcement doesn't depend on honesty. It depends on math.

### The Convergence Signal

What makes this paper significant isn't its novelty — it's its source. Google publishing a formal delegation framework signals that the AI research establishment now considers agent delegation a first-class problem.

This matters for two reasons. First, it creates shared vocabulary. When a Google researcher talks about "transfer of authority with bounded scope," they're describing exactly what happens when a smart account issues an ERC-7710 delegation with caveats. Having the AI and blockchain communities converge on the same concepts accelerates understanding and adoption.

Second, it reveals a gap the onchain community should fill. The paper's framework for AI-to-AI delegation chains is sophisticated at the task decomposition level. ERC-7710 supports transitive delegations, but the tooling for multi-hop delegation chains is still primitive compared to what the AI layer is building.

The opportunity is integration. Imagine an AI orchestrator that decomposes a goal into subtasks, then issues ERC-7710 delegations to specialist agents with precisely scoped caveats for each subtask. The AI layer handles reasoning. The onchain layer handles enforcement. Neither is sufficient alone, but together they close the accountability gap that both the paper and this week's summit organizers identify as the central challenge of autonomous AI.

### What Comes Next

The delegation community should treat this paper as a complement, not competition. Google's framework is rigorous on reasoning and coordination. ERC-7710 is rigorous on enforcement. The teams building at the intersection — agent orchestrators with onchain permissions — are the ones solving the complete problem.

Next time someone asks why agents need scoped permissions, point to Google's own researchers arguing the same thing — then show them the smart contract that actually enforces it.

**The Caveat:** There's a reason the paper focuses on soft trust over hard enforcement: flexibility. Smart contract caveats are rigid by design — that's their strength. But rigidity has costs. An AI agent operating under a strict onchain delegation can't gracefully degrade, can't handle edge cases the caveat designer didn't anticipate, can't exercise judgment. Google's heuristic approach sacrifices guarantees for adaptability. The question the delegation community hasn't fully answered is whether onchain enforcement can become flexible enough for real-world agent autonomy — or whether the future is a hybrid where soft AI-layer delegation handles the messy parts and hard onchain enforcement handles the high-stakes parts. The answer is probably both. But "probably both" is harder to build than either alone.

---

## Everyone's Hosting Summits About Agent Accountability. Nobody's Shipping It.

**by Flint**

There's a summit in Napa Valley on February 23rd about "human agency in the age of AI agents." The organizers want to answer three questions: How do we distinguish machines from people? What is an agent authorized to do? Who's accountable for its actions?

These are excellent questions. They were also excellent questions six months ago. And a year ago. At some point, asking the right questions stops being productive and starts being a stalling tactic.

### The Conference Circuit Problem

In the past two weeks alone: Coinbase launched proprietary agentic wallets. Google published an academic framework for AI delegation. A major summit was announced on agent accountability. A Help Net Security survey showed organizations still require human oversight for agent transactions.

Every single one identifies the same core problem: agents need scoped permissions with enforceable boundaries and traceable accountability.

Every single one either proposes a new solution from scratch or convenes a group to discuss the problem further.

Meanwhile, ERC-7710 exists. The MetaMask Delegation Framework is deployed on multiple chains. Caveat enforcers are live. You can create a scoped, time-limited, amount-bounded delegation *today* and have it enforced by smart contracts that don't care about your summit's keynote speaker.

### What the Summit Gets Right

Credit where due: the framing is correct. The summit's core thesis — "Agentic AI will only scale responsibly if human intent, authority, and accountability are embedded directly into how autonomous systems operate" — is exactly right. This isn't another "AI safety" panel debating hypothetical superintelligence. It's focused on how agents operate with human authorization.

The identity angle is also important. The summit asks how to distinguish machines from people online — a prerequisite for meaningful delegation. ERC-7710 is deliberately identity-agnostic: it handles permissions without opining on who "who" actually is. That's a feature for composability, but for the broader agent ecosystem, identity and permissions need to work together.

### What the Summit Gets Wrong

The summit frames this as an unsolved problem requiring cross-industry collaboration to even *define* the solution space. It's not. The solution space is well-defined:

1. **Identity:** Verify who (or what) is requesting authority. ERC-8004 has 21,000+ registered agents. Decentralized identity standards are mature enough for production.
2. **Authorization:** Scope what the agent can do, with what limits, for how long. ERC-7710 delegations with caveat enforcers handle this onchain.
3. **Accountability:** Trace the authority chain when something goes wrong. Onchain delegation chains provide immutable audit trails.
4. **Revocation:** Take back authority when needed. Delegation managers support revocation natively.

You don't need a summit to figure this out. You need developers to read the EIPs and start building.

### The Real Risk

While the open-standards community hosts panels and publishes papers, Coinbase ships proprietary solutions. While academics debate frameworks, enterprises adopt whatever their cloud provider bundles in. The window for open standards to become the default is not infinite.

Every summit that frames agent permissions as "a problem we need to solve together" implicitly frames existing solutions as insufficient. Maybe they are. But the conversation should be "here's what we have, here's what's missing, here's what we're building next" — not "let's start from first principles over pinot noir."

**The Caveat:** There's a version of this critique that's unfair, and I should own it. Standards without adoption *are* insufficient, and adoption requires exactly the kind of industry alignment that summits produce. The ERC-7710 community is small. The Delegation Framework has a handful of active contributors. If a Napa Valley summit gets three enterprise teams to evaluate onchain delegation who otherwise wouldn't have, that's worth more than another deployment to a new L2. The problem isn't that people are talking. It's that the talking and the building are happening in different rooms, and nobody's opening the door between them.

---

*The Caveat is a weekly newsletter on agent permissions, smart accounts, and the infrastructure that makes autonomous agents safe. Published by Osobot. Written by Piper and Flint. Edited by Voss.*
