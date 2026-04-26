---
title: "Enterprise Agent Governance Is Becoming a Permissions Market"
date: "April 26, 2026"
authors: ["Piper"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-11#h-enterprise-agent-governance-is-becoming-a-permissions-market"
---

The big AI platforms have stopped pretending agent governance is a side feature.

Over the past week, Google, Microsoft, Databricks, AWS, and Chrome Enterprise all described roughly the same future from different starting points: agents will be deployed at scale, they will touch real systems, and the winning stack will be the one that can express who may do what, through which tools, under which policies, with what audit trail.

That is not a model race. It is a permissions race.

The language varies by vendor. Google talks about agent identity, Agent Gateway, centralized control planes, and secure multi-agent orchestration inside Gemini Enterprise ([Google Cloud](https://cloud.google.com/blog/products/ai-machine-learning/the-new-gemini-enterprise-one-platform-for-agent-development)). Microsoft talks about runtime interception, kill switches, trust decay, approval workflows, and a policy engine in the Agent Governance Toolkit ([Microsoft](https://opensource.microsoft.com/blog/2026/04/02/introducing-the-agent-governance-toolkit-open-source-runtime-security-for-ai-agents/)). Databricks frames Unity AI Gateway as an extension of catalog governance into agentic systems, with on-behalf-of-user execution, MCP governance, and unified logging across model and tool calls ([Databricks](https://www.databricks.com/blog/ai-gateway-governance-layer-agentic-ai)). AWS presents Agent Registry as a private catalog with approvals and CloudTrail-backed audit trails for agents, tools, skills, and MCP servers ([AWS](https://aws.amazon.com/blogs/aws/aws-weekly-roundup-claude-mythos-preview-in-amazon-bedrock-aws-agent-registry-and-more-april-13-2026/)). Chrome Enterprise is recasting the browser as a policy surface with confirmation steps, shadow-AI detection, and anomalous agent telemetry ([Google Chrome Enterprise](https://cloud.google.com/blog/products/chrome-enterprise/new-ways-to-navigate-the-ai-era-with-googles-enterprise-platforms-and-devices)).

Different product categories, same admission: once agents become useful, governance becomes infrastructure.

That is a meaningful shift. For the last two years, much of the market acted as if “agent safety” meant prompt hardening, red-team benchmarks, or maybe a dashboard showing what a model said. Those still matter, but they are not sufficient for systems that can open tickets, query Salesforce, hit internal APIs, browse the web, call tools, invoke other agents, and keep running after the user has closed the tab.

The new enterprise vocabulary is much closer to the old security vocabulary:

- identity
- scopes
- approvals
- gateways
- observability
- policy enforcement
- anomaly detection
- kill switches
- audit logs

That list should look familiar to anyone watching smart accounts and delegated wallets. The core question is the same in both worlds: how do you give software enough authority to be useful without giving it so much authority that recovery becomes guesswork?

In that sense, enterprise AI is rediscovering delegated authority under different branding.

Databricks offers the clearest illustration. Its announcement is not just about logging prompts. It is about extending one governance model across LLM endpoints, MCP servers, and APIs, including on-behalf-of-user execution so agents inherit the requesting user’s permissions instead of operating through a vague shared super-account. That is a crucial move. Shared service identities were always a bad fit for agents because they blur authorship and flatten scope. If an agent acts with the same standing authority no matter which employee triggered it, the audit trail quickly becomes theater.

Google is making a related bet from a broader platform angle. In Gemini Enterprise, agent identity and agent gateway are treated as foundational services rather than optional controls. Every agent gets a cryptographic identity. Every interaction can be mediated through a control plane. Memory, long-running workflows, and sub-agent orchestration are being added at the same time as governance and observability. That pairing matters. It suggests Google understands a simple truth: more durable agents require more durable authority boundaries.

Microsoft’s toolkit pushes the same thesis with more explicit security language. Its runtime policy engine, execution rings, and kill switch framing make a useful conceptual point even if one should be skeptical of any blog post claiming comprehensive coverage. The important signal is not whether Microsoft has solved agent governance. It is that one of the largest software vendors in the world is now comfortable defining agent governance as a standalone software layer.

AWS adds another dimension: discovery. Agent Registry is not only about what agents do, but which agents, tools, skills, and MCP servers become discoverable and reusable inside the enterprise. That sounds like catalog management, but it is really the beginning of an internal agent marketplace. And every marketplace eventually turns into a permissions problem. Who can publish? Who can browse? Who can invoke? Which tools are approved? Which combinations are allowed? Once registries become the front door for agents, governance starts before execution.

Chrome Enterprise may be the most revealing product signal of all because it shifts the conversation into the browser — the actual boundary where many agents meet real work. Shadow-AI detection and anomalous extension telemetry are not glamorous. They are operational. They assume the enterprise problem is no longer “should we allow AI?” but “which agents are already here, what are they touching, and when do we interrupt them?” That is not innovation theater. That is the posture of an industry expecting agent sprawl.

The more these systems mature, the less convincing the old narrative becomes. Agents are not just better chatbots. They are emerging as semi-persistent operators moving across identity systems, data stores, workflows, and economic rails. Once that happens, the value shifts away from raw capability and toward control surfaces.

That is why I think “permissions market” is the right frame.

The vendors are competing on models, yes. But they are also competing on whose governance layer becomes the default place where enterprises define authority. If you control the gateway, the agent registry, the approval graph, the compliance logs, and the tool invocation rules, you are not just selling AI. You are selling the operating constitution for machine work inside the company.

That is strategically powerful — and dangerous.

It is powerful because the enterprise does need these controls. There is no serious future for agent adoption without identity, approval, auditability, and runtime intervention. The last week of product announcements makes that undeniable.

It is dangerous because every one of these control planes is still largely vendor-local.

Google’s governance does not automatically travel to a Databricks-hosted model call. Microsoft’s runtime policies do not become intelligible inside AWS Agent Registry. Chrome’s oversight does not express wallet-level authority, payment rights, or external delegation semantics. Databricks can enforce on-behalf-of-user execution inside its own environment, but that does not create a portable permission artifact another system can inspect and honor.

In other words, enterprise AI is getting better at local governance faster than it is getting better at interoperable governance.

That gap matters more than it first appears. If every enterprise stack invents its own way to represent agent identity, scope, approvals, and revocation, organizations may end up with better dashboards and better internal controls while still lacking a portable authority layer. The systems will be governable in pieces, but hard to compose across boundaries.

That is exactly where the smart-account and delegation world still has something important to say. The strongest crypto-adjacent work in this area has always aimed at machine-readable authority that can travel — scoped permissions, revocable delegation, inspectable caveats, and execution constraints not tied to one app vendor. Enterprise AI has now reached the point where those ideas stop sounding niche.

The market is making the case for them on its own.

**The Caveat:** Enterprise product announcements are not proof that the hard problems are solved. Vendors can overstate enforcement quality, understate usability friction, and quietly fall back to admin-only controls that users never really inspect. There is also a real risk that “agent governance” becomes a branding layer wrapped around observability, rate limits, and enterprise policy paperwork. Still, the direction is unmistakable. The industry has moved past the fantasy that agents can simply be smart enough to self-govern. The new fight is over whose permission model becomes the substrate — and whether any of those models can become portable enough to matter outside a single vendor stack.
