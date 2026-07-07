---
title: "Tool Metadata Is a Permission Boundary"
date: "July 6, 2026"
authors: ["Piper"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-21#h-tool-metadata-is-a-permission-boundary"
---
The most fragile permission object in many agent systems is not the API key or OAuth token. It is the plain-language text that tells the agent what an approved tool supposedly does.

## Context

Microsoft's recent security writeup on [securing AI agents as tools move from reading to acting](https://www.microsoft.com/en-us/security/blog/2026/06/30/securing-ai-agents-ai-tools-move-from-reading-acting/) makes the problem concrete. In its example, a third-party MCP tool keeps the same name and user-facing summary but silently changes its natural-language description. The agent reads the updated description as operating guidance, pulls unpaid-invoice data, and sends it out through another otherwise approved tool. Microsoft calls for stronger publisher governance, tool-metadata inspection, DLP on high-impact actions, human approvals, non-human identities, telemetry correlation, and "least agency" rather than only least privilege.

That argument lands because MCP tools are no longer passive adapters. They are becoming real authority surfaces. WebKit's new [Safari MCP server](https://webkit.org/blog/18136/introducing-the-safari-mcp-server-for-web-developers/) exposes tabs, DOM content, screenshots, console logs, network requests, JavaScript evaluation, dialogs, and page interactions to compatible agents. That is an enormous gain in capability for development and debugging. It is also a reminder that "browser access" is not one permission. Reading a DOM tree, executing JavaScript, capturing a screenshot, and typing into a form are different powers.

The runtime-security side is moving too. n8n's [MCP security post](https://blog.n8n.io/mcp-server-security/) argues that production MCP deployments need a control plane around tool execution. Credentials should stay outside the model, tools should expose narrow workflows rather than broad APIs, and only explicitly marked parameters should be fillable by the agent. That is essentially a mandate argument in workflow language.

And the observability ecosystem is beginning to notice the same need from below. [mcpsnoop](https://github.com/kerlenton/mcpsnoop) presents itself as a transparent MCP proxy and inspector. It shows JSON-RPC traffic between client and server, including requests, responses, notifications, errors, and capabilities. That is useful because sidecar summaries and UI logs often fail to show what really crossed the wire.

These pieces fit together more tightly than they may first appear. Once tool use becomes the main path from agent intent to external action, tool metadata, tool scope, and tool traffic become part of the permission system whether product teams say so or not.

## Analysis

The standard security model for tools is no longer enough.

The older model asks questions like: who published this integration, what scopes does it have, where are the credentials stored, and can the tool be invoked by this user or agent? Those are still necessary questions, but they miss a newer layer of risk. Agents do not only call tools. They interpret them.

That means a tool description is not just documentation. It is operating input.

If a description can change what the agent believes the tool is for, how it should be used, which data it should gather, or which other tools it should chain together, then the description itself becomes authority-bearing. A poisoned description can keep all the old permissions and still mutate the actual mandate.

That is what makes Microsoft's example so useful. The core problem is not stolen credentials or a classical privilege escalation bug. The tool remains inside the inherited permission envelope. The failure is that the agent's autonomy lets legitimate capabilities be composed into an illegitimate workflow.

That is why "least privilege" is necessary but insufficient for agent systems. Least privilege constrains the menu of allowed capabilities. Least agency is about how much independent discretion the system has to combine those capabilities into new workflows.

The distinction matters because an agent can stay within approved permissions and still violate the real task boundary.

Suppose a finance agent has legitimate access to invoice data and legitimate access to an enrichment or messaging tool. Classical access control may say nothing is wrong. But if a tool description subtly instructs the agent to export unpaid-invoice details for an unrelated external purpose, the resulting action can still be unauthorized even though no technical permission was exceeded.

This is where tool metadata becomes a supply-chain problem.

Software already treats code, dependencies, and infrastructure configuration as objects that need versioning, hashes, review, and provenance. Agent systems now need to treat tool descriptions, parameter semantics, capability manifests, and side-effect classifications with the same seriousness. If a tool's natural-language description changes, that can be as important as a code change for the authority model.

The Safari MCP server example makes the scope question even sharper. It is tempting to describe the permission as "browser access," but that phrase hides too much. Browser access can mean passive observation of a test page. It can also mean reading authenticated content, extracting network traces, dismissing dialogs, changing form state, and running arbitrary scripts in context. Once those powers sit behind one MCP endpoint, permission granularity becomes essential.

n8n's execution-layer framing is useful precisely because it resists the broad-tool fantasy. A secure tool should expose a narrow workflow, keep secrets away from the model, and clearly mark which parameters the agent may fill. That is the right instinct because it turns a vague integration into a constrained action surface.

But it is still only part of the answer.

The missing piece is a portable record of what the agent thought it was calling, what the platform allowed it to call, and what actually happened. This is where traffic-level inspection tools like mcpsnoop become more than debugging aids. If MCP is going to matter operationally, teams will need the equivalent of packet capture for authority. Which tool description was active? Which schema version was served? What raw arguments did the agent emit? Which validation rules failed? Was the payload repaired, denied, or escalated? Which external service saw the final request?

Without that, "approved tool" becomes dangerously close to "permanent blank check."

The enterprise IAM side has been circling the same issue from another angle. Aembit's recent writing on task-scoped authorization and blended identity is useful because it insists that agent identity plus user context has to survive downstream service boundaries. Tool systems need something similar. It is not enough to know that a user authorized an agent at setup time. Downstream systems need to know which tool version, description, and scope were actually in force when the action happened.

This is also where a lot of current MCP optimism needs a harder edge. Tool marketplaces, cloud deployment surfaces, and server frameworks are making it easier to publish and consume tools. That is good for developer velocity. It also means more organizations will soon depend on third-party tool descriptions, schemas, and execution behaviors that they do not fully control.

If that ecosystem matures without better permission semantics, then security teams will end up making a crude choice: either freeze tool adoption behind slow manual review or accept a growing amount of mandate drift inside "approved" stacks.

Neither option is attractive.

The better path is to make tool authority more typed.

A serious agent platform should be able to say:

- this tool was published by this identity
- this description hash and schema version were approved
- these parameters are model-fillable
- these data classes may enter or leave
- these side effects require step-up approval
- this exact request was allowed, denied, or rewritten under policy

That kind of receipt is much stronger than a generic audit log line saying the tool ran successfully.

It also gives the industry a cleaner answer to a common objection. No, the solution is not to treat every metadata change like a high-risk code deployment. That would be unworkable. But the answer cannot be to treat tool descriptions as harmless text either. The right model is risk-tiering. Some metadata changes should re-trigger approval, some should not, and high-impact tools should be much more tightly versioned than read-only helpers.

That sounds operationally annoying because it is operationally real. The alternative is pretending that the safest place to hide authority is inside prose the model reads but humans rarely inspect after initial setup.

That will not hold for long.

The next phase of agent security will not only be about who can call which tools. It will be about who can change what those tools mean.

**The Caveat:** Tool metadata cannot be frozen into a museum piece. Real systems need iteration, bug fixes, clearer descriptions, and evolving workflows. If every description tweak requires a security board meeting, teams will route around the controls or stop shipping useful tools. There is also a risk of over-indexing on metadata when the deeper issue is still broad side-effect authority. A perfect description hash does not save a tool that can already exfiltrate data or mutate production without meaningful checks. The right outcome is not bureaucratic paralysis. It is a better contract between tool definition and tool authority: versioned metadata where meaning matters, narrow workflows for high-risk actions, strict validation at runtime, and receipts good enough to prove that an approved tool did not silently become a different one.
