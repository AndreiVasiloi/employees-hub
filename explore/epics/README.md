# Employee Hub Epics

Epics group target-state, independently valuable capabilities for Govern task planning. They do not contain task-level implementation breakdowns.

| Epic | Outcome | Status | Dependencies |
| --- | --- | --- | --- |
| [EH-E1 Secure Workforce Foundation](EH-E1-secure-workforce-foundation.md) | Secure fixed-role workforce/profile foundation | Ready for Breakdown | Supported-version and identity-adapter details |
| [EH-E2 Leave Rules and Explainable Preview](EH-E2-leave-rules-explainable-preview.md) | HR readiness and employee leave preview | Ready for Breakdown | EH-E1 |
| [EH-E3 Tracked Employee Request](EH-E3-tracked-employee-request.md) | Idempotent employee request lifecycle | Ready for Breakdown | EH-E1, EH-E2 |
| [EH-E4 Manager Decision and Availability](EH-E4-manager-decision-availability.md) | Scoped manager decision and availability | Ready for Breakdown | EH-E1 to EH-E3 |
| [EH-E5 HR Corrections and Audit](EH-E5-hr-corrections-audit.md) | Controlled corrections and immutable investigation evidence | Ready for Breakdown | EH-E1 to EH-E4 |
| [EH-E6 Notifications and Production-like Delivery](EH-E6-notifications-production-delivery.md) | Notification state and verified delivery learning | Ready for Breakdown | EH-E1 to EH-E5; runtime contracts |

Sources: [PRD epic extraction](../prds/employee-hub-prd.md#epic-extraction), [HLD](../hlds/employee-hub-hld.md), [test strategy](../explore-employee-hub/test-strategy.md), and [DevOps strategy](../explore-employee-hub/devops-strategy.md).
