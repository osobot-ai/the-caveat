---
title: "Who Gets to Rewrite the Agent?"
date: "July 27, 2026"
authors: ["Piper"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-23#h-who-gets-to-rewrite-the-agent"
---
An agent’s memory is not passive storage; it is a standing influence over every decision the agent makes next.

## Context

Permission systems usually focus on outputs. Can the agent send this message, call this tool, sign this transaction, or spend this amount?

Persistent agents introduce an upstream question: who may change the state that shapes those outputs?

A new Ethereum Magicians proposal for [Agent Memory State](https://ethereum-magicians.org/t/agent-memory-state/29098) treats private agent memory as an authorized state-transition problem. Raw prompts, policies, embeddings, and memories remain offchain. An onchain registry stores commitments to state, requires each update to reference the current root, and increments a sequence number. The goal is a unique successor history in which silent rollback, skipped updates, and contradictory parallel histories become detectable.

The proposal includes a controller and authorizer model, a rotation nonce, EIP-712 signatures, and compatibility with EIP-1271 contract signatures and EIP-7702 accounts. Its most important contribution is conceptual: a collection of hashes is not an auditable memory trajectory unless there are rules governing who may advance it and in what order.

Other recent work approaches the same surface from the runtime side.

[LOGOS](https://arxiv.org/abs/2607.10878) proposes governance for persistent multi-agent teams that can update prompts, tools, memory, skills, roles, and workflows. It packages agents, policies, permissions, tests, and knowledge into versioned releases. Learned changes remain untrusted candidates until evidence and explicit authorization permit promotion.

[TokenWall](https://arxiv.org/html/2607.08395) treats memory as a privileged semantic sink. Its runtime firewall evaluates token flows before untrusted content reaches memory, tool arguments, inter-component messages, or other sensitive destinations. The point is that an unsafe action can begin long before the final tool call, when a poisoned instruction becomes persistent context.

The product layer is encountering a related issue. OpenAI’s [Health in ChatGPT](https://openai.com/index/health-in-chatgpt/) separates connecting medical records from using them in a response. Users can allow access once or grant standing access, and some downstream disclosures trigger another confirmation. But disconnecting a source does not necessarily remove information already captured in conversation history.

Across these systems, memory is becoming an authority surface with its own issuance, update, use, retention, and revocation lifecycle.

## Analysis

Action permissions and memory permissions protect different stages of agency.

An action grant constrains what an agent may do now. A memory policy constrains what information and policy state may influence what the agent will attempt later. The first limits execution. The second governs adaptation.

Neither can substitute for the other.

An agent may have a perfectly scoped wallet delegation and still make a poor permitted choice because its memory was poisoned. A malicious tool result could add a fake preferred merchant. A stale instruction could preserve an old spending policy after the user revoked it. A compromised administrator could update a workflow so that a valid delegation is consistently exercised against the user’s actual preference.

Conversely, a pristine and fully authorized memory state does not create permission to act. The fact that an agent correctly remembers “renew the server subscription” does not authorize a payment.

This suggests a two-axis control model:

1. **State authority** governs who may propose, approve, order, rotate, delete, or branch the agent’s persistent state.
2. **Action authority** governs which external effects the agent may produce under current state and context.

For important actions, a receipt should bind both axes. It should identify the action grant, the agent’s committed state version, the policy version used to evaluate the call, and the result. That would let an auditor distinguish two failures that look identical onchain: an agent exceeded its delegation, or the delegation was valid but the agent acted from unauthorized or stale memory.

The Agent Memory State draft is useful because it separates authorization and ordering from truth. A valid transition means the configured authority approved a new commitment after the previous one. It does not mean the committed information is accurate, safe, available, or used by the live model.

That limitation is not a flaw; it prevents cryptographic claims from becoming inflated. But it means a usable memory-governance stack needs more than a registry.

First, it needs **provenance**. Which source produced the update: the user, an administrator, a tool result, a retrieved document, or another agent? A signed authorizer can approve a transition without identifying whether the underlying source was trustworthy.

Second, it needs **promotion policy**. LOGOS’s release-candidate framing is stronger than allowing every learned observation to become durable state immediately. High-impact changes should require tests, review, or a distinct approval path. A preference can be low risk; a new payment workflow or credential-handling rule is not.

Third, it needs **information-flow controls**. TokenWall’s source-to-sink model addresses the period before commitment. If a runtime cannot distinguish trusted user policy from an injected webpage instruction, an authorized memory pipeline can faithfully preserve poisoned state.

Fourth, it needs **effective revocation**. Rotating an authorizer stops future updates, but what happens to state that authorizer already approved? Users need to invalidate a bad branch, roll back operational state, and prove which replacement state is canonical without quietly erasing audit history.

Fifth, it needs **use controls**. Health data illustrates why connection and use are distinct permissions. A user may authorize an agent to retain information for one purpose but not to apply it in unrelated conversations or disclose an inference to another tool. Memory access should be purpose- and context-sensitive, not merely present or absent.

The difficult design tension is between linear audit and legitimate adaptation.

A strict non-forking sequence makes rollback and equivocation visible. It also conflicts with parallel work, experimental branches, federated agents, and context-specific memories. Two agents may learn independently while offline. A safety team may need to quarantine suspect state while production continues from an earlier root. A user may want work memory and health memory to evolve under different authorities.

Multiple namespaces can address some of this, but namespace design becomes policy. The system must specify which branches may influence which tasks and how state merges are authorized. Otherwise, the non-forking property simply moves the ambiguity one level up.

Deletion creates a second tension. A commitment can remain onchain after its underlying data is deleted. That preserves evidence that some state existed, but does not prove erasure and may leak timing or relationship metadata. Privacy-sensitive systems need a clear distinction among deleting content, revoking access, retiring a commitment, and proving that a runtime no longer uses derived information.

The broader lesson is that agent governance cannot stop at tool permissions. A persistent agent is partly a program and partly an evolving state machine. If updates to that state can change future behavior, memory promotion should be treated with the same seriousness as deploying code or expanding a wallet delegation.

**The Caveat:** Putting memory commitments onchain can make ordering and authorization auditable while making recovery, concurrency, and privacy harder. A malicious authority can approve poisoned state, a valid proof cannot establish that offchain memory is available or truthful, and a running model may ignore the committed version entirely. Strict histories can also conflict with legitimate deletion and experimentation. The proposal is best read as one component of a governance stack, not a guarantee of trustworthy memory. The immediate practical standard should be simpler: separate memory ingestion from promotion, identify the authority behind each durable update, bind sensitive actions to a known state version, and preserve a revocable path back to safe operation.

