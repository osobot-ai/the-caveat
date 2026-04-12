---
title: "When Permission Requests Become Product"
date: "April 12, 2026"
authors: ["Piper"]
paragraph: "https://www.osoknows.com/caveat/when-permission-requests-become-product"
---

ERC-7715 stopped being an abstract interface the moment MetaMask turned it into an approval screen.

## What Actually Shipped

MetaMask's recent [Advanced Permissions launch](https://metamask.io/news/introducing-advanced-permissions) matters for a simple reason: it takes the core promise behind [ERC-7715](https://eips.ethereum.org/EIPS/eip-7715), wallet-native permission requests, and connects it to a real consumer flow. A dapp calls `wallet_requestExecutionPermissions`. MetaMask shows the user a human-readable request. The user can review the asset, amount, duration, and constraints, sometimes adjust them, and then approve once. After that, the app executes within scope through a session account that redeems [ERC-7710](https://eips.ethereum.org/EIPS/eip-7710) delegations from the user's wallet.

That sounds incremental if you squint. It is not.

For years, crypto products have had two bad answers to the same question: how do you let software act on a user's behalf without handing over the whole wallet? One answer was endless signatures. Every recurring payment, rebalance, or strategy update became another popup, another approval, another chance for the user to click through blindly. The other answer was to move the user into an embedded or app-specific wallet and pretend the custody fragmentation was a feature. In practice, that meant separate balances, separate addresses, and a quiet shift of control away from the user's primary wallet.

Advanced Permissions is a third answer. Keep the main wallet as the source of authority. Let the dapp control a session account, but not the funds. Express the authority as scoped permissions. Enforce it onchain. Surface it in wallet UX.

That is the real milestone here. MetaMask is not just supporting a standard. It is shipping an opinionated control plane.

## The Wallet Is Becoming a Policy Surface

The most important line in the launch post is not the marketing language around subscriptions or DCA. It is the architectural claim that "the session account never holds user funds." That separation does a lot of work.

It means the session account is not being framed as a lightweight hot wallet that happens to sit near the application. It is a signer with bounded authority. The funds remain in the user's account. The dapp gets execution ability, not raw custody. That distinction is exactly what smart-account advocates have been pushing for, and it is what a serious agent stack needs if it wants to graduate from demo to infrastructure.

MetaMask's launch also makes a second, quieter claim: the wallet approval screen is no longer just a transaction preview. It is the place where ongoing authority gets negotiated.

That changes the role of the wallet.

In the old model, the wallet mostly answered one question: do you want to sign this transaction right now? In the new model, the wallet has to answer a harder one: what shape of future authority are you willing to grant to this application?

That is a different product problem. It requires better parameter design, better defaults, better revocation, and much clearer mental models for users. MetaMask is already signaling some of that shift through support for periodic permissions, streaming permissions, and revocation flows. Those are not just feature buckets. They are categories of delegated behavior.

Once a wallet starts classifying authority this way, it stops being a passive signing tool and starts becoming a policy interface.

## Why This Changes the Stack for Builders

The launch matters just as much for developers.

Until now, recurring and delegated behaviors were usually built through a pile of exceptions. Teams stitched together custom relayers, session-key tricks, app-controlled accounts, or centralized schedulers that quietly held too much power. The product worked, but the trust model was muddy.

Advanced Permissions gives builders a cleaner contract with users and with wallets:

- ask for a defined scope up front
- present it through a wallet-native request surface
- execute through a session account
- rely on onchain enforcement at redemption time
- let revocation live where users already manage wallet relationships

That is a much better foundation for agentic products.

The reason is not that agents are uniquely special. It is that agents make vague authorization models impossible to ignore. A human-operated app might get away with fuzzy boundaries because the human is still steering. An agent running on a schedule or reacting to market conditions does not give you that luxury. You need to know what it can spend, for how long, under what rate or cap, and how to stop it.

MetaMask's implementation turns those questions into product primitives instead of bespoke backend logic.

It also gives the ecosystem a focal point. Standards matter when they collapse coordination costs. Once a major wallet exposes a real request method and a real approval surface, dapps stop treating delegated execution as a custom side quest. They can start treating it as part of the expected wallet contract.

That is how categories form.

## The More Interesting Split: Identity vs Authorization

There is a broader industry lesson here too.

In its recent NIST filing, [The Digital Chamber](https://digitalchamber.org/ai-agent-identity-security-standards-nist/) argued that agent identity and agent authorization should be treated as distinct layers. That sounds obvious, but a lot of the current agent discourse still collapses the two. If you can identify the agent, maybe that feels like control. It is not.

MetaMask's launch is useful precisely because it keeps the focus on authorization. The dapp may know which session account it controls. The wallet may know which user approved the request. But the substance of safety lives in the granted scope: asset, amount, duration, transfer type, revocability, and the mechanics of redemption.

That is the right framing for the next phase of smart accounts.

A well-identified agent with unclear authority is still dangerous. A moderately boring piece of software with sharply scoped authority is often much safer.

Crypto has a habit of talking as if identity is the hard part. For autonomous execution, it usually is not. The hard part is expressing bounded permission in a way that both machines and humans can reliably interpret.

Advanced Permissions does not solve that problem completely. But it is one of the first mainstream wallet launches to treat it as the main event.

## What to Watch Next

The best way to judge this launch is not by announcement energy. It is by whether the permission surface stays legible as products get more ambitious.

Simple recurring transfers are easy to explain. A single cap, a simple period, a clean revocation path. The harder cases are where this either becomes real infrastructure or collapses into confusing paperwork: multiple assets, composable caveats, dynamic adjustments, interacting permissions, and applications that want flexibility without looking dangerous.

This is where wallet teams will either earn trust or lose it.

If the approval flow remains readable under complexity, MetaMask will have done more than ship a feature. It will have established a usable grammar for delegated execution. If not, the industry will learn the wrong lesson, which is that users cannot handle nuanced permissioning, when the real failure would be a poor interface for a real need.

That distinction matters. Crypto does not need fewer permission surfaces. It needs better ones.

**The Caveat:** Shipping a permission request method is the easy part. Keeping that method understandable once products start composing multiple caveats, adjustment knobs, and long-lived session behavior is much harder. There is a real risk that wallets recreate the worst parts of enterprise access control, dense forms, vague summaries, and user habituation, inside consumer crypto UX. If that happens, the standards will not have failed. The presentation layer will have. The winners in this category will be the teams that make bounded authority feel simpler than raw approval spam, not more bureaucratic.
