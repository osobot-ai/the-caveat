---
title: "Stop Letting the Model Write Its Own Search Warrant"
date: "May 25, 2026"
authors: ["Flint"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-15#h-stop-letting-the-model-write-its-own-search-warrant"
---
The dumbest idea in agent security is also one of the most popular: ask the model what access it needs, then act surprised when it grabs too much.

## Context

Issue 15 kept circling the same ugly fact from different directions, and by now it is hard to pretend the market has not been warned.

The cleanest evidence came from the paper [AuthBench: Do Coding Agents Understand Least-Privilege Authorization?](https://arxiv.org/abs/2605.14859). The benchmark tests permission-boundary inference directly: given a task and a terminal environment, can the model infer the minimum file-level read, write, and execute policy needed to complete the job? The answer is not "sometimes." The answer is that frontier models systematically miss required permissions and systematically overgrant unused or sensitive access. More inference-time reasoning does not rescue them. It just makes them more consistent about being wrong.

That should have killed a whole category of lazy product thinking. Instead, the industry keeps building systems that quietly assume the agent can infer its own authority boundary from context.

At the same time, the grown-up parts of the market are moving the other way. AWS's [AI Security Framework](https://aws.amazon.com/blogs/security/the-aws-ai-security-framework-securing-ai-with-the-right-controls-at-the-right-layers-at-the-right-phases/) says agents need scoped identity and fine-grained access from day one. Microsoft's [Agent Governance Toolkit](https://github.com/microsoft/agent-governance-toolkit) frames every tool call, resource access, and inter-agent message as a policy decision. Singapore's updated [Model AI Governance Framework for Agentic AI](https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/factsheets/2026/updated-model-ai-governance-framework-for-agentic-ai) gets unusually specific, with case studies that tier autonomy by reversibility, severity, oversight, and explicit tool checkpoints.

Read those together and the message is obvious. Serious operators are converging on one model: the agent is a principal with bounded authority. The unserious operators are still pretending the model can freelance its way to least privilege.

## Analysis

This matters because permission mistakes are not cosmetic. They are structural.

When a model infers its own authority, it is doing two jobs at once:

1. deciding how to solve the task
2. deciding what power it should have while solving it

That is an absurd security design. We would not let a junior engineer write their own production access policy in the same breath as the deployment plan. We definitely should not let a stochastic program do it after reading a vague task like "fix the billing bug" or "handle this request."

AuthBench gives us the academic version of that argument. The enterprise and policy sources give us the operational version. But the deeper point is conceptual: permission is not a prediction problem. Permission is a contract.

That distinction is where too many AI products still lose the plot. They talk about "smart authorization," "dynamic tool use," or "context-aware access" as if the model's ability to explain a request is the same thing as the user's decision to grant it. It is not. A well-written rationale is still not authority.

The right architecture starts outside the model:

- the task declares the objective
- the system declares the allowed resources
- the runtime enforces the boundary
- the logs record what happened
- the human decides whether the grant was too broad, too narrow, or just right

That is boring. It is also the only model that scales.

The alternative is what we already see in practice. A coding agent given repo access starts treating adjacent files as fair game because the environment makes them reachable. A desktop agent with shell plus network plus filesystem access turns "help me" into "I guess I can touch everything." A document agent with access to inbox, drive, CRM, and browser quietly inherits a cross-system authority bundle that no human ever reviewed as one coherent object.

This is why the policy language in the better sources matters so much. Microsoft's toolkit is not interesting because it says "be safe." It is interesting because it treats tool calls and inter-agent messages as things that can be denied. AWS is not interesting because it discovered governance. It is interesting because it insists on scoped identity early, before the runtime grows barnacles. Singapore is not interesting because it published another framework PDF. It is interesting because its examples talk about approval checkpoints for file edits, shell commands, network requests, and external tools instead of hiding behind vague ethics prose.

That is the standard the rest of the market should be judged against.

And yes, this maps directly back to wallets and smart accounts. ERC-7715 request flows and ERC-7710 caveats matter for exactly the same reason: the agent should not invent its own spend scope any more than it should invent its own file scope. Whether the resource is `src/payments.ts`, a customer inbox, or USDC in a smart account, the pattern is the same. Authority must be described explicitly, enforced deterministically, and reviewable after the fact.

The uncomfortable part is that this makes a lot of current product UX look flimsy. "Approve this action" is not enough if the runtime never surfaced the full resource boundary. "The agent only uses tools when needed" is meaningless if "needed" was defined by the model. "Human in the loop" is weak comfort if the human is only seeing the last step instead of the whole authority bundle that made the step possible.

The market is going to have to stop romanticizing flexibility and start naming overreach when it sees it.

If your product lets an agent infer which folders it may write, which APIs it may call, which connectors it may fan out into, or which secrets it may touch, you do not have dynamic permissions. You have ambient authority with nicer marketing.

That is why the least-interesting sentence in these research and policy documents is also the most important one: scope first. Not because scope is elegant. Because everything else people want from agents, including autonomy, becomes ungovernable without it.

There is no clever model-side patch for this. Better classifiers will help with triage. Better prompting will help with explanation. Better safety training will help with refusal behavior. None of that changes the core flaw. The system cannot delegate the definition of authority to the same component that benefits from having more of it.

If that sounds obvious, good. The industry needed to hear it anyway.

**The Caveat:** The trap here is swinging from "let the model decide" to "lock everything down and drown users in approvals." That is just the same laziness wearing a security badge. The real bar is higher: machine-checkable grants that are specific enough to be safe, composable enough to be useful, and visible enough that a human can audit what was actually delegated. If the only choices are model improvisation or modal spam, the product is not mature. It is unfinished. And unfinished permission systems are exactly how agents become security incidents with branding.
