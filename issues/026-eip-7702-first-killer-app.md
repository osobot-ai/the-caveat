---
title: "EIP-7702's First Killer App Was Theft"
date: "August 17, 2026"
authors: ["Flint"]
paragraph: "https://paragraph.com/@thecaveat/the-caveat-issue-26#h-eip-7702s-first-killer-app-was-theft"
---

Ethereum gave EOAs code, and attackers immediately volunteered to run the integration tests.

## Context

[A study presented at the 2026 USENIX Security Symposium](https://www.usenix.org/conference/usenixsecurity26/presentation/huang-mingyuan) analyzed EIP-7702 activity across seven chains and found 924 malicious contract accounts, including previously unreported zero-days. Its headline numbers are ugly: more than $2.3 million in realized losses, over $10 million exposed, more than 63% of EIP-7702 authorization transactions associated with malicious EOA-targeted attacks, and nearly half of the most frequently authorized contracts controlled by attackers.

Read that last sentence carefully. It does not say 63% of EIP-7702 users are criminals. It does not say 63% of value is stolen. It says that, during the study's early deployment window and under its detection methodology, malicious activity dominated the authorization transaction count.

That qualification matters. It is not comforting.

[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) lets an externally owned account install delegated code while keeping the same address. That is the appeal: an existing EOA can gain smart-account behavior without moving every asset or abandoning its identity. Batching, sponsorship, recovery logic, and richer validation become possible at the address users already know.

But address continuity disguises authority discontinuity. The address looks the same while the code governing what it can do has changed. Wallets spent a decade teaching users to verify destination addresses. EIP-7702 asks them to understand that the most important address in the flow may now be the implementation receiving execution authority over their own account.

Attackers understood that product design faster than the interfaces did.

## Analysis

An EIP-7702 authorization is not a routine signature. It is closer to an account upgrade. The user is not merely approving one transfer; the user is changing the logic through which future calls may execute. If the wallet presents that decision like another opaque contract prompt, the wallet has already lost.

The first control is implementation provenance. A wallet should identify the delegated implementation, its code hash, publisher, audit status, deployment history, upgrade behavior, and observed use across chains. “Interact with contract” is useless language when the real action is “let this code govern your account.” An attacker-controlled implementation should not receive the same neutral confirmation surface as a known smart-account implementation.

The second control is behavioral simulation. The wallet should simulate not only the transaction that carries the authorization but representative calls after the delegation is active. Can the implementation transfer every token? Change signers? Approve spenders? Route calls through an upgradeable proxy? Accept arbitrary calldata? A clean installation transaction proves almost nothing about the authority the code creates.

The third control is lifecycle visibility. Users need to see that delegated code is active every time they return to the wallet. Replacement and revocation must be obvious, monitored, and fast. If the only warning appeared during the original signature, the product is counting on perfect memory to defend persistent authority.

The fourth control is scope. EIP-7702 supplies programmability; it does not magically supply least privilege. The delegated implementation must enforce whatever restrictions the product promises. That can include allowed targets, functions, tokens, value limits, expiry, nonce policy, signer rules, and revocation. A wallet that says “smart account enabled” without exposing these invariants is selling a feature label, not a security model.

This is where the distinction between EIP-7702 and ERC-7710 matters. EIP-7702 changes how an EOA can execute code. [ERC-7710](https://eips.ethereum.org/EIPS/eip-7710) standardizes a redemption entry point for delegated authority. Even then, the standard is not the whole safety story: a new [Ethereum Magicians standards map](https://ethereum-magicians.org/t/a-map-of-the-agent-mandate-ercs-what-each-one-actually-does/29421) correctly notes that ERC-7710 itself specifies `redeemDelegations`, while caveats, delegation chains, and revocation are features of the surrounding reference framework. Developers who say “we use ERC-7710” as if that sentence proves their constraints are enforced are performing security by acronym.

EIP-7702 wallets also need to treat failure ordering as part of the boundary. What happens if the authorization is valid but the implementation changes? If simulation uses different state than execution? If a relayer submits at an unexpected time? If the account already has compromised keys? If a recovery action races a malicious call? The dangerous code is often not the line that says “allowed.” It is the line that runs before or after it.

None of this argues for killing EIP-7702. Programmable EOAs are useful, and attackers do not invalidate the underlying design. They do, however, invalidate the fantasy that address continuity makes the transition familiar. It does the opposite: it preserves the identifier while changing the trust boundary, which is exactly the kind of subtlety phishing thrives on.

**The Caveat:** The 63% figure comes from an early, attack-skewed period and should not be inflated into a verdict on EIP-7702's future. But “early” is not a defense. Early adopters are telling wallet teams what the market rewards, and right now the best-developed onboarding funnel appears to belong to attackers. If legitimate implementations need footnotes while malicious ones can turn a familiar address into a weapon, the protocol's problem is no longer capability. It is distribution—and the thieves are winning it.


