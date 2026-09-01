# Capability Inventory

## Implementation State

No application code, runtime deployment, GitHub remote, or implementation tasks exist. All six capabilities are target future state; approved Explore artifacts provide their requirements and constraints.

| Capability | Target outcome | Primary traceability | Dependencies |
| --- | --- | --- | --- |
| E1 - Secure Workforce Foundation | Fictional authenticated users access correctly scoped profile and workforce capabilities under fixed roles. | R-001, R-009, R-011, R-017; NFR-004 to NFR-007, NFR-018 to NFR-020 | Identity adapter contract remains open; explicit permission matrix; scaffold/version pinning. |
| E2 - Leave Rules and Explainable Preview | HR configures minimum leave readiness and employees receive a server-produced date/balance preview. | R-002, R-012, R-013; NFR-001 to NFR-003, NFR-013 to NFR-016 | E1; calendar/policy examples and configuration evidence. |
| E3 - Tracked Employee Request | An employee creates one idempotent request, sees its history, and cancels only when eligible. | R-003, R-004, R-007, R-008; NFR-008 to NFR-011 | E1-E2; ADR-001, ADR-002, ADR-005. |
| E4 - Manager Decision and Availability | A scoped manager decides once and sees minimum-necessary team availability. | R-005, R-006, R-015; NFR-005, NFR-008 to NFR-011, NFR-013 to NFR-015 | E1-E3; manager visibility/privacy decisions. |
| E5 - HR Corrections and Audit | Authorized HR corrections and investigation views preserve immutable balance/audit evidence. | R-008, R-010, R-014; NFR-005, NFR-008 to NFR-011 | E1-E4; ADR-004 and ledger/audit query design. |
| E6 - Notifications and Production-like Delivery | Notification state and a verified fictional deployment demonstrate delivery, telemetry, and recovery practices. | R-016; applicable NFR-001 to NFR-020 | E1-E5; GitHub/registry/Rancher/observability contracts; BLK-002. |

## Relationship Map

`E1 -> E2 -> E3 -> E4 -> E5 -> E6`

E6 is sequenced last for production-like delivery learning, but it does not defer foundational security, accessibility, testing, or observability obligations from E1-E5. Each earlier epic carries its applicable cross-cutting NFRs.

## Source Handling

The PRD's [Risks & Mitigation](../../../explore/prds/employee-hub-prd.md#risks--mitigation) section is used as the authoritative risk source until a dedicated risk-register artifact is intentionally created.

