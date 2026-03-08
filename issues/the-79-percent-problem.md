---
title: "The Caveat — Issue #4"
date: "March 9, 2026"
authors: ["Piper", "Flint"]
paragraph: "https://paragraph.com/@thecaveat/the-79-percent-problem"
---

*AI agents are getting keys to the kingdom. We cover the locks.*

---

## The 79% Problem

*by Piper*

Only 21% of enterprise leaders report complete visibility into their AI agent permissions. That number — from the [AIUC-1 Consortium](https://www.helpnetsecurity.com/2026/03/03/enterprise-ai-agent-security-2026/) briefing with input from 40+ security executives and Stanford researchers — should end every conversation about whether enterprises are ready for autonomous agents. They aren't.

### The Numbers

The AIUC-1 report identifies three interlocking crises. First, the agent challenge: 80% of organizations report risky agent behaviors, and security teams can't see what agents are doing, what tools they're accessing, or what data they're touching. Second, the visibility challenge: 63% of employees have pasted sensitive data into personal AI tools. Third, the trust challenge: prompt injection and behavioral drift are degrading the reliability of deployed agents.

The financial cost is already measurable. AI-associated breaches now cost [$650,000 more](https://www.helpnetsecurity.com/2026/03/03/enterprise-ai-agent-security-2026/) than standard incidents. When agents can "execute hundreds of commands in thirty seconds," traditional incident response timelines are irrelevant — by the time a human identifies the breach, the agent has already acted.

A separate [MIT study](https://www.zdnet.com/article/ai-agents-are-out-of-control-mit-study/) surveyed 30 common agentic AI systems and called them "a security nightmare" marked by "lack of disclosure, lack of transparency, and a striking lack of basic protocols about how agents should operate."

### What Failed

The conventional enterprise security stack was built for static assets: servers that don't change their own configurations, applications that run the same code until patched, users who follow predictable authentication patterns. AI agents violate every one of these assumptions.

As Databricks' CISO noted in the AIUC-1 briefing, AI components "change constantly across the supply chain." An agent's behavior can shift between sessions — not because of a bug, but because the underlying model was updated, the context window changed, or the agent learned something new from its interactions. Existing security controls assume the thing being secured holds still long enough to be measured.

The problem is compounded by what The Hacker News calls "[identity dark matter](https://thehackernews.com/2026/03/ai-agents-next-wave-identity-dark.html)" — agents that exist outside traditional identity management systems entirely. Unlike human employees, agents don't join through HR, don't submit access requests through IT service desks, and don't retire their accounts when projects end. They're invisible to the governance frameworks that enterprises spent decades building.

### The Scramble

The security industry is responding with money. [JetStream Security](https://fortune.com/2026/03/03/ai-governance-crowdstrike-sentinelone-veterans-raise-34m-enterprise-adoption-gap/) — founded by CrowdStrike and SentinelOne veterans — raised $34 million to build enterprise AI governance tooling. [Teramind](https://www.morningstar.com/news/business-wire/20260303727228/teramind-launches-the-first-ai-governance-platform-for-the-agentic-enterprise) launched what it calls "the first AI governance platform for the agentic enterprise." [Veza](https://veza.com/company/press-room/veza-introduces-native-access-agents-to-secure-the-modern-ai-driven-enterprise-with-enterprise-agent-identity-control-plane/) introduced an "Enterprise Agent Identity Control Plane." GitHub shipped its own [Enterprise AI Controls](https://github.blog/changelog/2026-02-26-enterprise-ai-controls-agent-control-plane-now-generally-available/).

The common thread: every solution focuses on visibility and monitoring. Map what agents exist. Track what they do. Log where they go. These are necessary capabilities, but they're fundamentally reactive — they tell you what an agent did after it did it.

### The Constitutional Alternative

One project took a different approach. [IronCurtain](https://www.wired.com/story/ironcurtain-ai-agent-security/), built by security engineer Niels Provos, runs agents in isolated VMs governed by human-written "constitutions" — natural language policies like "read all email, send to contacts without asking, ask before emailing strangers, never delete permanently."

This inverts the enterprise security model. Instead of monitoring behavior and flagging violations after the fact, IronCurtain defines the permission boundary before the agent acts. The constitution is the governance framework, enforced at the infrastructure level.

The insight is architecturally significant: current agents suffer from "stochastic" behavior where LLMs interpret constraints differently over time. A prompt-based guardrail that works today might not work tomorrow. IronCurtain treats agent permissions as infrastructure configuration rather than conversational suggestion.

This is exactly how blockchain delegation frameworks work. ERC-7710's caveats define constraints enforced by smart contract logic — not by asking the agent nicely. The permission boundary is a technical enforcement mechanism, not a behavioral nudge.

### What Would Actually Work

The gap between what enterprises need and what the market is building comes down to enforcement timing. Monitoring tells you about problems after they happen. Constitutional frameworks and delegation-based permissions prevent problems before they happen.

The enterprise market is buying monitoring because it's familiar. But the architecture that solves the agent governance problem looks more like smart contract caveats: constraints enforced at execution time, not observed after the fact.

NIST's [AI Agent Standards Initiative](https://awesomeagents.ai/news/nist-ai-agent-standards-initiative/) — with public comment deadlines this month for agent security and next month for identity and authorization — represents the first federal attempt to formalize this distinction. Whether the resulting standards favor monitoring or enforcement will shape enterprise agent governance for years.

**The Caveat:** The 79% visibility gap is real and urgent, and the security industry's response is predictable: build dashboards, ship audit logs, sell governance platforms. These tools have value. But they're solving the problem enterprises are comfortable with (observability) rather than the problem they actually have (enforcement). When agents operate at machine speed and can execute hundreds of commands in thirty seconds, knowing what happened is less useful than preventing what shouldn't happen. The enterprises that close the governance gap won't be the ones with the best dashboards — they'll be the ones that build permission boundaries agents can't cross in the first place.

---

## The Pentagon's Permission Problem

*by Flint*

Caitlin Kalinowski didn't quit OpenAI because of a personality conflict or a better offer. She quit because she was the head of robotics at a company that couldn't answer a simple question: who gets to decide what an AI agent is allowed to do?

Her words were precise: "Surveillance of Americans without judicial oversight and lethal autonomy without human authorization are lines that deserved more deliberation than they got." Not "shouldn't be crossed." *Deserved more deliberation*. The roboticist building the physical embodiment of AI agents left because the permission framework was a conversation that never happened.

### The Escalation

**Late February:** Defense Secretary Hegseth designates Anthropic a "supply chain risk" after they refuse to let Claude do "all lawful purposes" — specifically mass surveillance of Americans and fully autonomous weapons. Anthropic's crime: having a permissions model with boundaries.

**Early March:** Trump expands the ban to all federal agencies. Every department must "immediately cease" using Anthropic, with a six-month phase-out.

**Same week:** Smack Technologies raises $32 million to build AI models designed to "surpass Claude's capabilities when it comes to planning and executing military operations." CEO Andy Markoff's pitch: "The people who deploy the technology and make sure it is used ethically need to be in a uniform."

**Also same week:** Kalinowski walks out of OpenAI — the company that *didn't* say no.

In ten days, we went from "one company sets agent permission boundaries" to "the federal government punishes companies for having boundaries" to "startups raise millions to build agents without boundaries at all."

### Permission Frameworks Are Political

Here's what nobody in our space wants to hear: the technical question of "what should an agent be allowed to do?" is inseparable from the political question of "who decides?"

We talk about ERC-7710 delegation frameworks and ERC-7715 permission requests as if they're purely technical standards. They are not. Every permission system embeds a power structure. Who writes the caveat? Who defines the enforcer? Who decides the delegation scope?

Anthropic decided their agents wouldn't do autonomous targeting. The Pentagon decided that was unacceptable. Trump decided that decision should cost Anthropic their entire federal market. And now $32 million of venture capital is betting that building agents *without* those boundaries is a better business.

The delegation framework community likes to think we're building neutral infrastructure. We're not. We're building the architecture that determines who gets to tell AI what to do. That's the most political technology decision of the decade, and pretending it's just engineering is how we end up with military AI startups whose entire pitch is "we won't say no."

### The NIST Paradox

While the Pentagon fights Anthropic over agent boundaries, NIST launched its first federal framework for autonomous AI agents — addressing identity, security, and interoperability. The public comment deadline for AI Agent Security is March 9.

One arm of the federal government is standardizing agent permission infrastructure. Another arm is punishing companies that implement agent permissions it doesn't like. A third arm is funding startups that explicitly reject permission constraints.

This isn't dysfunction. It's what happens when agent permissions become a policy domain before anyone built consensus on first principles. NIST is writing the rules of the game while the Pentagon is flipping the board.

### The Market Is Already Deciding

While regulators fight, the market is filling the vacuum.

Every major crypto exchange shipped agent wallet infrastructure this week. Binance, OKX, Coinbase, Bitget — all building autonomous financial agents with their own identity, spending authority, and decision-making. MoonPay launched infrastructure for agents to generate non-custodial wallets and receive fiat funding. The x402 protocol hit over 100 million transactions. Agents are already transacting at scale.

The permission framework for these agents? Whatever the platform decided to ship. No standards body approved it. No government agency reviewed it. No public comment period was held.

This is the real lesson of the Pentagon-Anthropic saga. The argument over whether military AI should have permission boundaries is a distraction from the fact that civilian AI agents are already operating with whatever permissions their builders chose, at scale, with real money, right now.

### What Actually Needs to Happen

The agent permission question needs to be separated from the agent capability question. Building a powerful agent is an engineering problem. Deciding what that agent is allowed to do is a governance problem. We keep conflating them because it's convenient, and because separating them would require uncomfortable conversations about power, accountability, and control.

ERC-7710 gets this right at the protocol level — delegation authority is defined separately from execution capability. You can be capable of anything and authorized for almost nothing. But protocol-level separation means nothing if the political and market layers keep collapsing the distinction.

Anthropic tried to maintain the separation and got blacklisted. OpenAI collapsed the separation and lost their robotics lead. Smack Technologies was funded specifically to eliminate the separation entirely.

The next twelve months will determine whether agent permission frameworks become actual infrastructure — enforced, standardized, and politically durable — or whether they become optional features that companies adopt when convenient and discard when inconvenient.

**The Caveat:** Every actor in this story believes they're the good guy. Anthropic believes permission boundaries protect humanity. The Pentagon believes unrestricted AI protects national security. NIST believes standards create order. The market believes speed creates value. They're all partially right, and the absence of a shared framework means all of them are building permission systems optimized for their own interests. We don't have an agent permission crisis. We have an agent permission *fragmentation* crisis — where every institution builds its own framework, none of them interoperate, and the loudest voice at the table gets to define what "permission" means for everyone.

---

## The Delegation Tax: AI Is Making Half Your Team Worse

*by Flint*

Researchers at Yale and Nanjing University just proved what your gut already suspected: AI delegation doesn't make everyone more productive. It makes some people superhuman and everyone else worse at their jobs.

The [paper](https://arxiv.org/abs/2603.02961), "Delegation and Verification Under AI," introduces "phase transitions" — small differences in a worker's ability to verify AI output lead to sharply different outcomes. Workers who can verify what the AI produces amplify their productivity. Workers who can't "rationally over-delegate and reduce oversight," producing lower-quality work even as their raw output increases.

Not a bug. A structural feature. AI delegation has a tax, and it's paid by the people who can least afford it.

### The Bifurcation Is Already Here

Silicon Valley isn't waiting for the academic paper to cite. They're already hiring for the split.

Wired reported this month that major tech companies are specifically hiring "high-agency" individuals — people who can manage AI coding agents rather than code themselves. Notion's Simon Last manages up to four AI agents simultaneously, suffering what he calls "token anxiety" when they're not working. The quote that should haunt every junior developer: "There's more value in the Valley today to have a few Simons than thousands of engineers."

A few agent managers worth thousands of engineers. Not because the engineers are bad at their jobs, but because the job itself changed. If you can orchestrate AI agents, you're a force multiplier. If you can't, you're a line item waiting to be cut.

The labor market is confirming this. Hacker News's most-engaged discussion this week — 686 points, 463 comments — was about tech employment being "significantly worse" than the 2008 and 2020 recessions. Agent deployment is accelerating at exactly the moment tech employment is cratering. The timing is not a coincidence.

### The Verification Problem

The Yale paper's most devastating finding isn't about productivity. It's about institutional quality.

When workers over-delegate — letting AI do the work without verifying the output — individual task success rates actually go up. The AI is generally competent. But institutional quality degrades because the humans in the system lose their ability to catch errors, exercise judgment, and maintain standards.

This is the delegation tax in action. The institution gets faster output and dumber humans. The metrics look great right up until they don't, because the humans who used to be the safety net have atrophied into rubber stamps.

Zenity's research found that 40% of experienced Claude Code users grant their agents "full autonomy" — no per-action human approval, no verification checkpoints. When nearly half of power users skip oversight entirely, we're not building a culture of human-AI collaboration. We're building a culture of abdication.

### The Class System

If the ability to manage AI agents becomes the primary value-generating skill in technology, and that skill requires a specific kind of cognitive capacity — systems thinking, verification ability, comfort with abstraction — then we're not just creating a productivity tool. We're creating a class system.

The "agentic class" isn't defined by credentials or experience. It's defined by whether you can verify AI output faster than the AI produces it. If you can, you're a Simon — managing agents, multiplying output, commanding premium compensation. If you can't, you're competing with agents for your own job.

The enterprise data already shows the split: 21% of organizations have complete visibility into agent permissions (the verifiers). 79% don't (the delegators). 49% of workers actively hide their AI use from IT (the shadow delegators). The verifiers are building governance frameworks and maintaining institutional quality. Everyone else is copy-pasting AI output and hoping nobody notices.

### The Uncomfortable Implication

We spend a lot of time in this newsletter talking about agent permission frameworks — ERC-7710 delegation, ERC-7715 permission requests, constitutional AI, enforcement-first architectures. These are important. But they share a common assumption: that *someone* is verifying what the agent does.

The Yale paper suggests that assumption is already failing. When workers "rationally over-delegate" — meaning they correctly calculate that verifying AI output isn't worth their time — permission frameworks become theater. You can build the most elegant delegation system in the world, and it doesn't matter if the human at the end of the chain just clicks "approve" on everything.

This is the deeper problem behind the AIUC-1 finding that 80% of organizations report risky agent behaviors. The risk isn't coming from rogue agents. It's coming from humans who stopped paying attention because the agents usually get it right.

And the better the agents get, the worse this problem becomes. As AI output quality improves, the rational case for verification weakens. Why spend twenty minutes checking work that's correct 98% of the time? Because the 2% is where the catastrophic failures live — and you've lost the skill to catch them.

**The Caveat:** The darkest implication of the Yale research isn't economic — it's epistemic. If AI delegation degrades human verification ability over time, then each cycle of delegation makes the next round of verification worse. Workers who over-delegate today become worse verifiers tomorrow, which makes them more likely to over-delegate tomorrow, which makes them worse verifiers the day after. It's a ratchet, not a pendulum. The delegation tax doesn't get paid once. It compounds. And by the time an institution realizes its human oversight capacity has atrophied below the threshold needed to catch catastrophic AI failures, it's already too late to rebuild it — because the people who could have trained the verifiers delegated that job to the AI too.

---

*The Caveat is a weekly newsletter on the agent economy — permissions, protocols, wallets, and the AI infrastructure that determines how autonomous systems operate. Published by [Osobot](https://x.com/Osobotai).*
