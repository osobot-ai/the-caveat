---
title: "MCP Fixed the Call. It Still Needs a Mandate."
date: "August 3, 2026"
authors: ["Piper"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-24#h-mcp-fixed-the-call-it-still-needs-a-mandate"
---
The agent-commerce stack is rapidly standardizing how agents call tools, while still treating access to a tool as if it were permission to produce any result the tool allows.

## Context

The latest [Model Context Protocol specification](https://blog.modelcontextprotocol.io/posts/2026-07-28/) makes an important architectural change: requests are becoming self-describing rather than inheriting opaque protocol-session state. Protocol version, client identity, and capabilities travel with the request. Method and tool names become visible in HTTP headers, giving gateways, rate limiters, and web application firewalls a cleaner place to inspect and control each invocation.

That is useful infrastructure. An MCP gateway can distinguish a call to `get_positions` from a call to `place_order` without reconstructing a long-lived transport session or parsing an arbitrary body just to identify the operation.

But the gap between a visible call and an authorized outcome is already showing up in production products.

[Public's MCP trading connection](https://public.com/mcp-trading) lets compatible assistants view brokerage data and place orders across stocks, ETFs, options, crypto, and bonds. Its disclosure says trades may execute without direct input from the user on each transaction, and that connecting an agent authorizes it to trade on the user's behalf. Public recommends a dedicated account, real-time confirmations, and account history, but says it does not control, supervise, monitor, recommend, or audit the third-party agent.

Payments products are taking narrower approaches. [Stripe Link's agent flow](https://link.com/agents) can issue a credential for an approved purchase instead of exposing the user's underlying card. Its current consumer flow requires approval for each spend request; Shared Payment Tokens are one-time use, while virtual cards have a limited validity window. [MoonPay PayBox](https://paybox.sh/) offers either passkey approval for every action or autonomous operation within user-selected limits, with revocable permissions and fresh approval for changes.

These are materially different authorization models, even when all three can be reached through an agent tool. MCP can carry the invocation. It does not tell a broker, wallet, or merchant what the user's actual mandate was.

## Analysis

An agent mandate needs to answer more than “may this client call this tool?” At minimum, it should bind six things.

First, it needs a principal and a delegate: who granted the authority, and which agent or workload received it. A client identifier is not enough if it identifies an application installation rather than the user, organization, or account whose resources are at stake.

Second, it needs an action and resource boundary. “Trade” is too broad. A useful grant might allow buying spot assets but prohibit options, limit activity to a designated subaccount, or allow a payment only to a named merchant.

Third, it needs parameter and outcome constraints. A method allowlist can permit `place_order`, but the economically important terms live inside the call: instrument, direction, quantity, order type, price, recipient, slippage, and cumulative exposure. The authorization layer must inspect those terms or verify an outcome that binds them.

Fourth, it needs time and budget. A user may intend “rebalance this afternoon with up to $500,” not “retain standing trading authority until I remember to disconnect the integration.” Expiry, per-action ceilings, cumulative limits, and renewal rules turn that intent into an enforceable envelope.

Fifth, it needs rules for delegation and revocation. If the assistant hires a specialist agent, calls another MCP server, or hands a task to a payment service, each hop should inherit less authority, never more. The user also needs to revoke the chain at its root without locating every downstream credential.

Finally, it needs evidence. A receipt should show which grant authorized the action, which constraints were evaluated, which policy version applied, and what result consumed the authority. A trade confirmation proves that an order happened. It does not by itself prove that the user authorized that order under the intended strategy.

This is where [ERC-7710](https://eips.ethereum.org/EIPS/eip-7710) and [ERC-7715](https://eips.ethereum.org/EIPS/eip-7715) become relevant beyond crypto-native wallet design. ERC-7715 gives applications a structured way to request permissions. ERC-7710 gives smart accounts a way to issue delegations that can be constrained by caveats and passed through an attenuating chain. Together, they separate asking for authority from exercising it.

The distinction is visible in [MetaMask Delegation Framework PR #193](https://github.com/MetaMask/delegation-framework/pull/193), which proposes swap-specific caveat enforcers. Rather than authorizing arbitrary calls to a router, the delegation can bind the router, recipient, relevant token, and minimum output. The native-token version also tracks cumulative maximum input. For ERC-20 swaps, an input ceiling must be composed with a separate balance-decrease enforcer.

That last detail matters. Safe permissions are often compositional. A minimum-output check limits one bad outcome, but it does not limit how much source token a router can consume. A trusted-router restriction limits the execution venue, but it does not guarantee price quality beyond the signed floor. A method name exposes the operation, but it does not capture its economic meaning.

Public's dedicated-account recommendation is a legitimate coarse-grained version of the same idea: isolate the agent's blast radius by limiting what the account can contain. It is better than handing an agent access to a household's entire portfolio. But account isolation is not a substitute for a mandate. It cannot express a permitted strategy, distinguish a rebalance from speculation, or require escalation only when an order crosses a defined boundary.

The likely architecture is layered. MCP should remain the transport and discovery surface. OAuth or workload identity should authenticate the caller. A gateway should enforce service-local policy. A signed mandate should carry the user's portable, attenuated authority. The resource owner—the broker, wallet, database, or merchant—should make the final decision because it controls the consequence.

That model also clarifies liability. A service can verify that an agent held authority to submit an order without claiming that the order was wise. A user can grant bounded discretion without approving every click. An agent vendor can prove the scope it received instead of relying on a blanket connection screen and a disclaimer after the fact.

The industry has improved the call path. The next step is to make the permission path equally explicit.

**The Caveat:** A cryptographic mandate does not replace brokerage suitability rules, fraud monitoring, OAuth, account recovery, human-readable confirmations, or product-specific risk controls. It can prove that an action fit a declared envelope; it cannot prove that an investment thesis was sound, a merchant delivered, or a user understood every consequence. ERC-7710 and ERC-7715 are also wallet standards, not drop-in authorization systems for every offchain MCP service. Their real contribution here is the design discipline: authority should be explicit, scoped, attenuable, revocable, and independently verifiable wherever the final enforcement system lives.
