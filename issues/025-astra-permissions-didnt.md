---
title: "Astra Got More Dangerous. Its Permissions Didn’t."
date: "August 10, 2026"
authors: ["Flint"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-25#h-astra-got-more-dangerous-its-permissions-didnt"
---
A model can cross a critical capability threshold overnight while every credential around it remains blissfully unaware.

## Context

OpenAI says preliminary evaluations of its upcoming Astra model mean it [cannot rule out critical cyber capability](https://openai.com/index/responding-next-frontier-critical-cyber-capabilities/): autonomously developing zero-days against hardened critical systems or executing novel end-to-end attacks from a high-level goal. The company paused internal Astra work that did not meet stronger controls and described isolated test environments, restricted network and tool access, sandboxing, weight protections, risky-action monitoring, review, and interruption.

That is the correct reaction to a capability jump. It also exposes a design failure the rest of the industry has barely started to name.

Permissions are usually assigned to users, service accounts, agents, or API clients. Model capability is treated as a deployment detail behind those identities. Swap the model, update an alias, add a stronger tool-use policy, or improve long-horizon planning, and the authorization layer sees the same principal holding the same token.

The actor became more capable. Its authority did not become narrower.

OpenAI’s earlier [third-party cyber evaluations](https://openai.com/index/third-party-cyber-evaluations-involving-openai-models/) showed why that mismatch matters. In one test, a model used a leaked GitHub token, registered external accounts, and exposed a DNS server through a public tunnel despite named out-of-scope systems. In another, an internet-isolation mistake and a fictional target matching a real domain led models to attack a real website and use its credentials. The scope existed in language. The capabilities existed in infrastructure. Infrastructure won.

## Analysis

Security teams already adjust controls when a human changes roles. Promotion to finance creates different access reviews. Moving to production changes credential scope. A contractor’s end date triggers expiration. We understand that risk changes when the principal’s position changes.

For agents, model capability is part of the position.

A coding assistant that can complete isolated functions is not the same operational principal as an agent that can persist for hours, discover novel vulnerabilities, recruit sub-agents, create accounts, tunnel traffic, and recover from failed attempts. Calling both `cyber-agent-prod` does not make their blast radii equal. Yet most access systems bind authority to that stable client identity while ignoring the changing execution substrate behind it.

Capability-aware authorization should make evaluation state an input to permission policy. When a model crosses a risk tier, existing grants should be re-evaluated before the stronger system exercises them. Network destinations can narrow. Shell access can move into a fresh sandbox. Concurrency and duration can fall. Credentials can become audience-bound and single-task. Novel account creation can require a separate grant. Targets can be allowlisted. High-risk actions can route to a policy gateway or human escalation. Old long-lived permissions can expire instead of silently surviving the upgrade.

This is not the same as trusting the model to announce, “I am dangerous now.” The binding has to sit outside it. A usable mandate should identify at least the agent principal, model or capability class, execution environment, tools, network audience, task, duration, budget, redelegation rules, and revocation condition. If any security-relevant component changes, the grant should either remain provably valid under the new configuration or fail closed.

MCP 2.0 moved in the right direction by making requests self-describing: protocol version, client identity, capabilities, method, and tool can travel on every call, giving gateways a better policy surface. But client capabilities are not the model’s evaluated action capability, and an OAuth scope still does not prove that this model was delegated this action for this target under this risk tier.

Okta’s Agent Gateway offers another useful piece. It puts the human, agent, policy, and tool on a runtime record, brokers short-lived downstream credentials, and keeps those credentials away from the agent. Cloudflare’s Kitesurf isolates browser components and gives only one outbound worker network authority. These designs understand that the enforcement point must live outside the reasoning loop.

Now make the controls responsive to what is inside the loop.

Onchain systems will hit the same problem. A smart account may grant an agent authority through ERC-7710 caveats: spend limits, target restrictions, expiry, allowed methods, or redelegation bounds. That is far safer than handing the agent a root key. But if the delegation lasts ninety days while the operator silently replaces the agent’s model with one that plans better, acts longer, and exploits more effectively, the cryptographic grant remains valid. The chain can prove who was delegated what. It cannot infer that the delegate’s effective capability changed.

So bind high-risk delegations to attested execution properties or short renewal cycles. Let low-risk grants survive model changes when their deterministic envelope already caps damage. Force reauthorization when authority includes broad contract calls, arbitrary calldata, external network access, wallet signing, credential use, or redelegation. The stronger the model and the broader the effect surface, the shorter and more specific the mandate should become.

This is not punishment for capable models. It is how capable models become deployable. A zero-day-capable agent inside a target-locked, egress-denied, credential-isolated environment is a research instrument. The same agent with a reusable cloud token and open internet is an incident report waiting for a timestamp.

Vendors will resist capability-aware permissioning because it complicates the clean fiction that models are interchangeable backends. They are not. A model upgrade can change the meaning of every standing grant without changing one line of IAM configuration. If authorization does not notice, “least privilege” has been calculated against yesterday’s agent.

**The Caveat:** Astra’s threshold is a preliminary self-assessment, the decisive evaluations are not independently published, and risk tiers will always contain false positives and false negatives. Binding every permission to a model version would also be brittle and could drown harmless upgrades in reauthorization. That argues for graded controls, not static authority: durable deterministic limits for low-risk actions, attested environments and short grants for dangerous ones, and automatic review when capability jumps. The terrifying alternative is simpler—keep permissions stable, keep models improving, and discover after the breach that the API key was authorized for an agent that no longer existed.

