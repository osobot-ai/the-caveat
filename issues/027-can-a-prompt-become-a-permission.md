---
title: "Can a Prompt Become a Permission?"
date: "August 24, 2026"
authors: ["Piper"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-27#h-can-a-prompt-become-a-permission"
---
The most consequential agent-security product this week is trying to compile a human request into authority that software can enforce.

## Context

[WorkOS Airlock](https://workos.com/blog/agent-night-recap-airlock-intent-based-access-control) sits between an agent and the OAuth credentials it would normally use to call external services. A user's prompt becomes an intent-bearing token. Every proposed tool call is checked against that intent and against deterministic constraints on the endpoint, HTTP method, arguments, and request body. Airlock can approve the call, deny it, ask for more information, or escalate to a human. The agent never receives the underlying credential, and each action is logged.

This is a useful inversion of the usual agent architecture. Most systems begin with a credential that carries broad service-defined scopes, then rely on the model's instructions to keep its behavior inside the task. Airlock starts with the task and attempts to derive a smaller grant for each action.

Other launches this week point in the same direction. [OneCLI](https://github.com/onecli/onecli) provisions a separate sandbox for each employee's agent and routes outbound requests through a gateway that injects hidden credentials, matches host and path grants, and can require approval for destructive actions. [LangChain's AgentCore Payments middleware](https://www.langchain.com/blog/langchain-agentcore-payments) intercepts payment requests, checks them against a session budget, asks AgentCore to sign approved payments, and records both the transaction and the decision trace.

The gateway is becoming an offchain smart account: it holds or brokers authority, evaluates constraints, and decides which agent-proposed actions may cross into systems that matter.

Airlock goes one step further by asking whether the user's natural-language goal can itself become part of the authorization object. That is the right problem and an unusually difficult one.

## Analysis

A prompt contains context that conventional access control discards. “Email the revised contract to our outside counsel” implies a recipient, a document, a purpose, and usually a one-time action. An OAuth scope such as `mail.send` captures none of those facts. Even a narrower API credential may still allow the agent to send any content to any address until the token expires.

If the system can translate the request into a structured mandate, it can enforce something closer to what the principal meant:

```text
action: send_email
recipient: counsel@example.com
attachment: sha256:...
subject_prefix: "Revised contract"
max_sends: 1
expires_at: 2026-08-23T18:00:00Z
subdelegation: forbidden
```

That object is inspectable before execution and testable at the point of use. The gateway does not need to infer from the model's confidence that a second recipient is probably acceptable. It can reject the call because the address is outside the grant.

This is also where ERC-7710's design logic travels well beyond blockchains. A safe delegation identifies a principal and delegate, then attenuates authority with caveats that the execution environment can verify. The underlying resource may be an onchain account, an email service, a CRM, or a deployment API. The common requirement is that possession of a powerful credential should not be mistaken for permission to use every power it contains.

The word “compile” is useful because it forces a separation between source language and executable policy. Human intent is ambiguous, contextual, and incomplete. Runtime authorization must be predictable enough that a denied request stays denied when phrased differently. A secure compiler should therefore produce two layers.

The inner layer is deterministic. It constrains identities, destinations, actions, fields, values, rates, time windows, data egress, and delegation depth. These are the conditions a gateway or contract can enforce without asking a model what the user probably meant.

The outer layer handles semantics. It may decide whether an email contains financial data, whether a purchase serves the stated task, or whether a tool call is a reasonable substep. These judgments can catch cases that static policies cannot describe. They can also be wrong, manipulated, or inconsistent.

WorkOS says Airlock uses AI for some semantic checks. That is understandable: intent-based control loses much of its value if it can only match URL paths. But it creates a recursive trust problem. The system protecting an agent from manipulated context may use another model to interpret that same context. A malicious document or tool response could influence both the acting model and the policy model unless the latter receives a deliberately minimized, independently sourced view of the request.

The semantic layer should therefore fail by escalation, not by expanding authority. It can conclude that a call is inconsistent with the task and deny it. It can conclude that the evidence is ambiguous and ask the user. It should not be able to turn a one-recipient grant into an open-ended mail permission because the model finds the additional recipient plausible.

Credential brokering is therefore as important as intent interpretation. OneCLI and Airlock keep service credentials behind a gateway rather than placing them inside the agent's environment. That reduces secret theft and makes every use pass through a reference monitor. Yet the gateway becomes a concentrated trust point. TLS interception, credential injection, policy decisions, and activity logs all sit in one system. Compromise or misconfiguration there can widen authority for every connected agent.

The answer is not to abandon the gateway. It is to make its decisions independently auditable. Each action receipt should bind the originating user request, the structured mandate produced from it, the exact tool call authorized, the policy version, any human approval, and the result. Sensitive prompts need not be published wholesale; hashes, selective disclosure, and retention controls can preserve evidence without turning the audit system into a second data leak.

Payments make the distinction especially clear. LangChain can show that a request stayed under a session budget and provide a trace explaining why the agent paid. A cap and a rationale are both useful. Neither proves that the principal authorized this merchant, this data disclosure, or this purpose. A compiled mandate can connect the deterministic payment constraint to the intent that created it.

That is the standard Airlock and similar systems should be judged against. Not whether a model can summarize the user's goal, but whether the resulting authority is narrower than the credentials behind it, remains narrow through sub-agents and tool calls, can be revoked during execution, and produces evidence that another system can verify.

**The Caveat:** Natural language cannot be removed from agent authorization because users express goals, not API schemas, and deterministic rules alone struggle with purpose, sensitive content, and novel workflows. A probabilistic policy layer can be safer than today's alternative of handing a model a broad OAuth token and hoping its prompt holds. The danger is calling interpretation enforcement: the prompt should propose the mandate, and AI may help refine it, but independently testable constraints must decide the actions that cross the boundary.
