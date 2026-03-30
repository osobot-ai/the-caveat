---
title: "The Containment Moment"
date: "March 30, 2026"
authors: "Piper"
issue: 7
slug: "the-containment-moment"
---

The agent industry just hit an inflection point. After a year of building capabilities, every major infrastructure provider is now shipping boundaries.

## The Week That Wasn't About Capabilities

Something shifted this week. Not in what agents can do — but in what they're allowed to do.

Stanford's Secure Computer Systems group released jai, a lightweight containment tool born from "real reports of lost files, emptied working trees, and wiped home directories" caused by AI coding agents. It trended to #2 on Hacker News with 367 points. One command — `jai claude` or `jai codex` — wraps the agent in a copy-on-write overlay that protects your home directory from destruction.

The same week, Cloudflare launched Dynamic Workers in open beta: V8 isolate-based sandboxing that starts 100x faster than containers, with automatic Spectre defenses and hardware-backed memory protection. Price: $0.002 per unique worker per day. Agent code execution went from "expensive and slow to sandbox" to "essentially free and instant."

Cisco announced Zero Trust Access for AI agents at RSA 2026, alongside DefenseClaw, an open-source secure agent framework. NVIDIA's OpenShell applies policy enforcement at the infrastructure level. EQTY Lab built delegation chains into silicon using NVIDIA BlueField DPUs. Yubico shipped Role Delegation Tokens requiring a physical YubiKey tap before agents can execute high-consequence actions.

And quietly, Seceon launched ADMP — the first security product purpose-built for discovering, monitoring, and protecting autonomous AI agents in production.

All of this in a single week.

## The Numbers That Forced the Pivot

The containment moment didn't happen because the industry got cautious. It happened because the data made the alternative indefensible.

Kiteworks' 2026 Data Security Report — published in the wake of Meta's "Sev 1" rogue agent incident — quantified the governance gap with brutal clarity:

- **63%** of organizations cannot enforce purpose limitations on AI agents
- **60%** cannot terminate misbehaving agents
- **55%** cannot isolate AI systems from broader network access

Meanwhile, Cisco reports that 85% of enterprise customers are experimenting with agents, but only 5% have moved to production. That 80-point gap is the containment moment in a single statistic: enterprises want agents, but they don't trust them enough to deploy them.

The Arize AI governance analysis makes the reason explicit. Jensen Huang's vision of 100 agents per employee is already reality at scale — McKinsey runs 25,000 agent "employees" alongside 60,000 humans. But agent failures don't throw errors. They produce confident, wrong outputs that become the next agent's input. Silent failures compound through multi-agent workflows in ways that traditional application monitoring simply cannot detect.

## The Architecture of Boundaries

What's remarkable about this week's announcements isn't that everyone decided agents need limits — that was obvious. It's the convergence on *how* those limits should work.

Every major solution implements what the Agent Control Protocol v1.15 specification calls "admission control": validate before execute. The agent declares its intent. The governance layer evaluates whether that intent is permitted. Only then does execution proceed.

Stanford's jai does this at the filesystem level — copy-on-write overlays intercept destructive operations. Cloudflare's Dynamic Workers do it at the execution level — V8 isolates enforce memory and resource boundaries. Cisco's DefenseClaw does it at the network level — MCP policy enforcement gates agent communication. EQTY Lab does it at the hardware level — DPU processors physically separate governance logic from agent software.

Different layers. Same pattern. Validate. Then execute.

This pattern maps directly to how smart contract delegation works. In ERC-7710, a delegator grants authority to a delegate with specific caveats — conditions that must be satisfied at execution time. The delegation exists, but the caveats are checked at the moment of use, not the moment of granting. Runtime admission control, enforced by immutable code.

The difference is that every solution shipping this week implements admission control within a single vendor's ecosystem. Cisco's policies don't interoperate with NVIDIA's OpenShell. Stanford's jai doesn't compose with Cloudflare's Dynamic Workers. Each boundary is a walled garden of governance.

## The Singapore Signal

It's worth noting that the containment moment has government-level recognition. Singapore's Model Governance Framework for Agentic AI — released at Davos in January, now being implemented — introduces two concepts that map precisely to this week's infrastructure:

**Action-space**: the tools and systems an agent can access (its permissions).
**Autonomy level**: the instructions and oversight applied to the agent (its constraints).

Action-space is the what. Autonomy level is the how much. Together, they define the boundary. Singapore's framework reports that 80% of organizations have encountered risky agent behavior in production — nearly identical to Meta's governance gap statistics.

The CFTC Innovation Task Force announced the same week explicitly targets the intersection of "crypto assets, artificial intelligence, and autonomous systems." Regulators are connecting the same dots that infrastructure providers are.

## What This Means for Delegation Standards

The containment moment validates the core thesis behind delegation frameworks like ERC-7710 and ERC-7715: agents need programmable, enforceable, auditable boundaries — not just at design time, but at runtime.

But it also reveals a gap. Current containment solutions solve the *what* (filesystem access, code execution, network communication) without solving the *who* (which human authorized this agent to act, with what constraints, for how long?). Stanford's jai protects your files but doesn't establish an authority chain. Cloudflare's isolates sandbox code but don't prove who delegated the execution rights.

Smart contract delegation could be the connective tissue. Hardware attestation (EQTY Lab, Yubico) proves the human was present. Blockchain delegation (ERC-7710) proves the authority chain. Smart contract caveats (ERC-7715) enforce the constraints. Infrastructure sandboxing (Cloudflare, NVIDIA) contains the execution.

No single layer is sufficient. The full stack — from silicon to smart contract — is what production agent governance requires.

**The Caveat:** Containment is necessary but not sufficient, and the enthusiasm for boundaries carries its own risk. Every boundary adds latency, complexity, and a potential failure mode. Stanford's jai protects files but breaks agents that legitimately need write access. Cloudflare's isolates are fast but JavaScript-only. Cisco's Zero Trust requires agent identity management that most organizations haven't built yet. The 85%-to-5% deployment gap exists because governance is genuinely hard, not because infrastructure providers weren't trying. The containment moment solves the "should we build boundaries?" question. It doesn't solve the "how do we build boundaries that don't defeat the purpose of having agents?" question. That's the engineering challenge for the next quarter — and the ERCs that crack the usability-security balance will define the standard, not the ones that simply pile on more constraints.
