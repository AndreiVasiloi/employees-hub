# Step 4: Map Events and API Contracts

List all events produced and consumed, and all APIs needed (upstream queries, downstream notifications).

```
Event Map

| # | Event | Direction | Owner | Consumer(s) | Schema Status | Evidence |
|---|-------|-----------|-------|-------------|---------------|----------|
| 1 | [Event] | Produced | [Domain] | [Domain(s)] | Defined / Assumed | [VALIDATED] / [ASSUMPTION] |
| 2 | [Event] | Consumed | [Domain] | [This service] | Defined / Assumed | [VALIDATED] / [ASSUMPTION] |

API Contracts

| # | API | Direction | Purpose | Contract Status | Evidence |
|---|-----|-----------|---------|-----------------|----------|
| 1 | [API] | Upstream | [Purpose] | Exists / Needs Creation | [VALIDATED] / [ASSUMPTION] |
| 2 | [API] | Downstream | [Purpose] | Exists / Needs Creation | [VALIDATED] / [ASSUMPTION] |

Events: [N] ([N] produced, [N] consumed)
APIs: [N] ([N] upstream, [N] downstream)
Assumed schemas: [N] — each is a potential blocker

How would you like to proceed?
- All correct — proceed to decision points
- Correct event/API — tell me which item and what to change
- Add event/API — tell me what's missing
- Flag blocker — an assumed contract is higher risk than shown
```

**STOP**: Wait for architect to validate events and APIs.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.design-sketch:0.1.2:2026-09-01T08:21:27Z -->
