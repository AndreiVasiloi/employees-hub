# Step 7: Classify Hardening Findings

Classify every finding from Step 6 by severity.

**Priority-ordered resolution** — when multiple findings exist, resolve in this order:

| Priority | Category | Mindset | Rationale |
|----------|----------|---------|----------|
| **P1** | Truth hierarchy / boundary ownership | M1, M2 | Wrong boundaries invalidate everything downstream |
| **P2** | Runtime correctness / determinism / contract realism | M5, M9 | Incorrect contracts or non-deterministic flows break implementation |
| **P3** | Abstraction level / audience fitness | M8 | Implementation teams can't build from wrong abstraction level |
| **P4** | Polish / local component clarity | M6, M7 | Wording issues don't block implementation but invite avoidable debate |

Resolve all P1 findings before moving to P2. A P1 resolution may invalidate P2–P4 findings.

```
Hardening Findings Classification

| # | Category | Finding | Severity | Recommended Resolution | Evidence |
|---|----------|---------|----------|----------------------|----------|
| 1 | [Category] | [Finding] | BLOCKER | [Resolution] | [VALIDATED] / [ASSUMPTION] |
| 2 | [Category] | [Finding] | SIGNIFICANT | [Resolution] | [VALIDATED] / [ASSUMPTION] |
| 3 | [Category] | [Finding] | MINOR | [Resolution] | [VALIDATED] / [ASSUMPTION] |

Summary:
BLOCKER: [N] | SIGNIFICANT: [N] | MINOR: [N]

⚠️ BLOCKER items must be resolved or explicitly deferred before proceeding to Step 4.

How would you like to proceed?
- Resolve blockers now — let's address blocker issues
- Accept classification — I'll handle blockers separately, proceed to Step 4
- Reclassify — some findings should be different severity levels
- Address blockers + significant — resolve both categories before proceeding
```

**STOP**: Wait for architect to validate severity classifications and decide on resolution approach.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.feedback-integration:0.1.2:2026-09-01T08:21:27Z -->
