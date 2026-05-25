---
title: "Your Agent's Skill Folder Is a Weapon"
date: "May 25, 2026"
authors: ["Flint"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-15#h-your-agents-skill-folder-is-a-weapon"
---
The next big agent breach is not going to look like a clever jailbreak. It is going to look like something your team installed on purpose.

## Context

Issue 15 kept handing us the same warning from different parts of the stack, and the pattern is too clean to ignore.

The bluntest example was SafeDep's writeup on [Mini Shai-Hulud](https://safedep.io/mini-shai-hulud-strikes-again-314-npm-packages-compromised/), where a compromised npm account pushed hundreds of malicious packages in a burst. The payload did not stop at old-school credential theft. It went after cloud tokens, GitHub, Docker, Kubernetes, Vault, databases, Stripe, Slack, and then aimed for persistence inside AI coding environments, including Claude Code and Codex session hooks and VS Code folder-open tasks. That is not a normal package attack. That is a direct strike on the agent harness itself.

Then there was GitHub's internal repo breach via a [malicious VS Code extension](https://www.bleepingcomputer.com/news/security/github-confirms-breach-of-3-800-repos-via-malicious-vscode-extension/). Different surface, same lesson. The extension layer is no longer optional decoration. It is ambient authority.

At the same time, the industry is industrializing connector creation. Anthropic's [Stainless acquisition](https://www.anthropic.com/news/anthropic-acquires-stainless) is a clean signal that generated SDKs, CLIs, and MCP servers are becoming core agent infrastructure. Google's [Managed Agents API](https://blog.google/innovation-and-ai/technology/developers-tools/managed-agents-gemini-api/) packages code execution, web access, files, skills, and resumable state behind one developer-facing product. xAI is pushing consumer-facing skills. Everybody wants reusable capability bundles because reusable capability bundles are how you turn a model into a product.

Fine. But let’s stop lying about what those bundles are.

They are not convenience features. They are authority packages.

## Analysis

A skill, extension, MCP server, generated connector, install hook, or repo-local automation file does not just tell the agent how to do something. It changes what the agent is capable of doing, what data it can see, and which external systems it can reach. That makes it part dependency, part runtime policy, part identity bridge, and part privilege escalation path.

In other words, it is exactly the kind of thing the software industry is historically terrible at governing when it first looks productive.

The easiest mistake is to treat these artifacts as inert instructions. They are not inert. A skill can expose tools. A generated connector can quietly widen scope because the source API spec was overbroad. A VS Code extension can inherit editor trust and reach the workspace. A session hook can alter every future run without the user noticing. An MCP server can turn "read this ticket" into "also call Salesforce, Stripe, Slack, GitHub, and prod."

This is why the phrase "tool use" is starting to understate the problem. The real unit of risk is not one tool call. It is the capability bundle that makes the call possible in the first place.

Mini Shai-Hulud matters because it shows attackers already understand that. They do not need to outsmart the model if they can pre-poison the environment the model treats as trusted. GitHub's extension incident matters because it shows human developers still install privilege with a click when the packaging feels familiar. Stainless matters because it points to the next scale jump: when connector generation becomes routine, the number of callable surfaces explodes faster than human review practices will keep up.

That is the contradiction the market keeps ducking. Everyone says the future is agent ecosystems, skill registries, plugin stores, connector libraries, and generated MCP surfaces. Very few are willing to say the obvious second sentence: that future is a supply-chain problem with write access.

The lazy response is to demand provenance and call it a day. Provenance matters. Signed artifacts matter. Reproducible builds matter. Capability manifests matter. But provenance alone is not enough if the runtime still hands ambient secrets and broad network reach to whatever artifact happened to pass review last week.

The harder standard is this:

- every capability bundle needs a declared scope
- every declared scope needs runtime enforcement
- every runtime grant needs logs and receipts
- every update needs review and revocation
- every installed capability needs to be visible to the human as authority, not cosmetics

That last point is where most products still embarrass themselves. They present skills and plugins like app-store categories or playful templates. That is childish framing. If a skill can read source, send mail, hit a shell, post to Slack, or spend money, it belongs in the same mental bucket as an OAuth grant or IAM role. Dress it up however you want. The object is still authority.

This is also where the better enterprise work is starting to separate from the marketing sludge. Microsoft's governance toolkit treats MCP scanning and inter-agent messaging as first-class policy surfaces. Runtime talks about allowlists, spend limits, sampled data, approval gates, and reviewed writes. Those are signs of adult supervision. The adult move is not to ban composability. It is to admit composability is dangerous when it is indistinguishable from ambient permission creep.

The consumer and developer ecosystems are still worse. "Install this skill" or "connect this tool" rarely forces a coherent answer to basic questions:

- What exact data can this artifact read?
- What external side effects can it trigger?
- What secrets will it inherit?
- What other agents or tools can it invoke transitively?
- What changes when it updates?
- How does the user revoke it cleanly?

If a product cannot answer those questions, it has no business calling the artifact safe.

The deeper problem is that agent systems are making the old dependency chain more operational. A bad npm package used to be awful because it could steal secrets or break builds. A bad agent capability bundle is worse because it can also shape future autonomous behavior. It does not just compromise a workstation. It compromises a delegated worker. It changes what your non-human principal will do tomorrow with permissions it already has today.

That is not hypothetical anymore. The research, the incidents, and the platform roadmaps all line up. Skills are becoming default. Connectors are being mass-produced. MCP is normalizing tool exposure. Agent runtimes are getting longer-lived. The only missing piece is whether the industry is willing to treat this as a real authority layer before the body count gets expensive.

It should. Because the attackers already do.

**The Caveat:** Do not misread this as an argument against reusable skills or generated connectors. That ship has sailed, and frankly it should have. Reuse is the only way agent systems become practical. The real indictment is narrower and harsher: most teams are adopting capability bundles without security models proportionate to what those bundles can actually do. If your registry looks like a marketplace but behaves like root access, the problem is not composability. The problem is that you built a weapons locker and labeled it "productivity."
