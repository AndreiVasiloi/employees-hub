# Step 5: Evidence Escalation

Before running hardening, force-resolve assumptions by replacing them with actual upstream evidence. Hardening is only as strong as the evidence it operates on — running hardening against ASSUMED contracts produces false confidence.

1. Walk the blocker register and identify every item tagged as **ASSUMED**
2. For each ASSUMED item, attempt to load the real upstream artifact:
   - Real HLDs from adjacent domains
   - Actual event schemas (not assumed schemas)
   - Published API contracts and query surfaces
   - Downstream consumer contracts
3. Classify the result for each ASSUMED item:

```
Evidence Escalation Results

| # | Assumed Item | Source Step | Upstream Artifact | Result | Action Taken |
|---|-------------|-----------|-------------------|--------|-------------|
| 1 | [Item] | Step [N] | [Artifact or "Not found"] | RESOLVED / CORRECTED / CONFIRMED BLOCKER / DEFERRED | [What changed] |

Results:
RESOLVED: [N] — real evidence validates the assumption
CORRECTED: [N] — real evidence contradicts the assumption (HLD updated)
CONFIRMED BLOCKER: [N] — upstream artifact doesn't exist yet
DEFERRED: [N] — artifact exists but is in flux

Evidence coverage: [N]% real evidence vs [N]% remaining assumptions

How would you like to proceed?
- Proceed to hardening — evidence base is sufficient
- Load more artifacts — I can provide additional upstream documents
- Reclassify — some of these should be different categories
- Pause — need to resolve confirmed blockers before hardening
```

**STOP**: Wait for architect to confirm evidence escalation results before proceeding to hardening.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.feedback-integration:0.1.2:2026-09-01T08:21:27Z -->
