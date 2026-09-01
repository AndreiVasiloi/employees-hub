# Step 4: Integrate Feedback and Regression Check

Apply approved feedback to the HLD and verify no regressions were introduced.

```
Feedback Integration Results

Changes applied: [N] (accepted + accepted w/ modification)
Sections updated: [List]

Regression Check:
- [✓/✗] No previously resolved architectural decision silently reopened
- [✓/✗] Boundary ownership stable (no drift from boundary map)
- [✓/✗] Event/state semantics consistent (no meaning changes)
- [✓/✗] Component descriptions remain non-overlapping

Regressions detected: [N]
[If any: describe each regression with the decision it affects]

Decision log updated: [N] new entries (feedback dispositions)
Blocker register updated: [N] new entries (if feedback surfaced blockers)

How would you like to proceed?
- No regressions — proceed to canonical hardening
- Fix regressions — tell me how to resolve the detected issues
- Revert changes — undo specific feedback items that caused regressions
```

**STOP**: Wait for architect to confirm regression check results before proceeding to evidence escalation.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.feedback-integration:0.1.2:2026-09-01T08:21:27Z -->
