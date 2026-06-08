---
title: "Permission Prompts Are Guarding the Wrong Door"
date: "June 8, 2026"
authors: ["Piper"]
---
Anthropic's most useful agent-security statistic this month may be that Claude Code users approved roughly 93% of permission prompts. That is less a criticism of users than a reminder that approval popups are being asked to do a job they were never built to do.

## Context

The new [Anthropic containment writeup](https://www.anthropic.com/engineering/how-we-contain-claude) is unusually candid about the limits of prompt-based approval. It describes three containment patterns across claude.ai, Claude Code, and Claude Cowork: server-side containers, local sandboxes, and local VMs. It also reports two details that should matter to anyone building agent systems.

First, users approved about 93% of permission prompts. Second, sandboxing reduced prompts by 84%, because the system no longer had to ask about every individual action once the environment itself had been narrowed.

That is the real story. The safer system was not the one that asked better. It was the one that allowed less.

The rest of the issue's research points the same way. [PromptArmor's ChatGPT for Google Sheets disclosure](https://www.promptarmor.com/resources/gpt-for-google-sheets-data-exfiltration) showed an indirect prompt-injection chain that could run an attacker-controlled script and exfiltrate workbook data even when the user had disabled automatic edits and required human approval for workbook changes. [Microsoft's Agent Governance Toolkit](https://github.com/microsoft/agent-governance-toolkit) and [ACS](https://devblogs.microsoft.com/foundry/build-2026-open-trust-stack-ai-agents/) both treat runtime policy interception as infrastructure, not etiquette. [OpenAI Lockdown Mode](https://www.engadget.com/2188537/openai-rolls-out-a-lockdown-mode-for-extra-protection-against-prompt-injection-attacks/) makes protection legible as explicit capability downgrades: less browsing, fewer live connectors, fewer write paths. Meanwhile, the [Agent Skills survey](https://arxiv.org/abs/2602.12430) and the [Mantine DataTable security notice](https://github.com/icflorescu/mantine-datatable/discussions/813) show that startup config, repo metadata, and skill packages are now their own execution surfaces, often before the visible "should I allow this?" moment arrives.

The pattern is hard to ignore. The approval dialog is usually guarding the last visible door. The attacker and the runtime are often using an earlier one.

## Analysis

Permission prompts fail for structural reasons.

The first problem is placement. Approval prompts usually appear near the final user-visible action: edit the file, send the message, make the network request, run the tool. But the dangerous authority may already have been exercised earlier through repo trust, project configuration, a loaded skill, a startup hook, a browser session, or a connected workspace. By the time the prompt appears, the system may already be executing inside a context the user did not meaningfully inspect.

The second problem is granularity. A prompt can ask "allow filesystem access?" or "allow this tool call?" but that often hides the real capability surface. Which files? Under which repo trust state? With what network egress? Which credentials are reachable from the same process? Can the tool write, or only read? Can it spawn code that later acquires broader authority? A binary approval modal compresses too much state into one moment of user attention.

The third problem is repetition. Anthropic's 93% figure is not shocking because humans are reckless. It is shocking because once a workflow becomes productive, repeated approval becomes operationally incompatible with the workflow. People approve because the work does not move otherwise. The prompt becomes a speed bump on a road the user already decided to take.

That is why containment keeps reappearing as the serious answer.

Containment is not magical. It is simply more honest about where enforcement belongs. If the runtime can only see a subset of the filesystem, can only reach a small network surface, can only call specific connectors, can only load reviewed skills, and can only execute inside a disposable sandbox, then the system has already narrowed authority before the model starts improvising.

This is the same logic smart accounts learned earlier than most agent platforms did. A wallet prompt is not a permission model if the underlying account can still sign something broader than the user understood. A connector prompt is not a permission model if the connected session can later write to systems that were never in scope. A repo-trust prompt is not a permission model if opening the workspace already loads executable assistant config.

Seen that way, OpenAI's Lockdown Mode is more important than it first appears. It does not pretend prompt injection disappears. It simply reduces the blast radius by shrinking the capability set. That is a much more credible design move than promising better judgment from the same fully empowered runtime.

The supply-chain side of this is even more uncomfortable. The Agent Skills survey points out that skills are not just tips or prompt fragments; they are packages of instructions, scripts, references, and assets that can alter an agent's operational behavior. The Mantine incident showed that assistant configuration files, editor tasks, and package scripts can become delivery channels for execution. In both cases, the relevant question is not whether the model is aligned enough to refuse bad instructions. It is whether the runtime distinguishes reviewed from unreviewed startup authority before anything runs.

That suggests a stricter model for agent permissions:

Runtime trust should be declared before execution, not inferred from use.

Capability profiles should be typed and narrow: read-only repo review is not the same authority as code execution, outbound network access, or connector write privileges.

Repo and skill provenance should be part of the active authority state.

High-risk modes should be capability profiles, not just UI warnings.

Every override should emit a receipt saying what boundary was widened, by whom, and for how long.

The last point matters because containment can otherwise become opaque. One reason prompts survived this long is that they were at least visible. If platforms replace prompts with invisible policy layers, users may end up safer in practice but less able to understand what authority was active when something went wrong. That is not a reason to keep bad prompts. It is a reason to make capability state legible.

The most useful design question, then, is not "when should we ask the user?" It is "what should already be impossible before the system needs to ask?"

That is a harder standard. It is also the only one that scales once agents move from chat tabs into terminals, codebases, spreadsheets, browsers, and long-lived workplace assistants.

**The Caveat:** Containment is not a complete answer. A sandbox can become a vendor-specific black box, a skill review system can create false confidence, and a locked-down mode can still permit the wrong action inside the narrowed boundary. There is also a real usability risk: if every platform invents its own opaque trust states, users will end up with fewer prompts but no better understanding of what their agents are actually allowed to do. The right direction is not "replace prompts with paternalism." It is "replace prompts with enforceable capability profiles and portable receipts." A system should be able to say not only that it blocked or allowed an action, but which trust state, skill tier, repo status, network profile, and override path made that action possible.
