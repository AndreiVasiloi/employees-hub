# Capability Placement Decisions

| Capability | Placement | Rationale | Planning impact |
| --- | --- | --- | --- |
| E1 - Secure Workforce Foundation | New epic `EH-E1` | Establishes the independent access/workforce foundation required by all leave workflows. | Unblocks every later business capability. |
| E2 - Leave Rules and Explainable Preview | New epic `EH-E2` | Delivers a distinct HR/employee readiness and explanation outcome. | Provides validated calculation/configuration behavior before writes. |
| E3 - Tracked Employee Request | New epic `EH-E3` | Owns the employee request lifecycle, reservation/history, and cancellation boundary. | Depends on E1-E2; establishes transaction-critical workflow. |
| E4 - Manager Decision and Availability | New epic `EH-E4` | Adds a distinct manager outcome and privacy-limited team context. | Depends on E3 and cannot be safely merged without obscuring decision authority. |
| E5 - HR Corrections and Audit | New epic `EH-E5` | Owns HR correction and investigative evidence outcomes. | Builds on workflow/balance evidence while preserving an auditable boundary. |
| E6 - Notifications and Production-like Delivery | New epic `EH-E6` | Integrates notification state with verified delivery/operational learning. | Depends on E1-E5 and external delivery capability; cross-cutting foundations remain earlier obligations. |

No amendment option exists because no epic artifact is present. Splitting by capability maintains the approved PRD roadmap, preserves stakeholder clarity, and keeps each epic within a plausible 2-4 sprint planning boundary.

