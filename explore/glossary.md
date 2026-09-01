# Employee Hub Glossary

This is the canonical vocabulary for Employee Hub discovery, specifications, architecture, and implementation. Detailed rules and relationships are maintained in the [domain analysis](explore-employee-hub/domain-analysis.md).

## Usage Rules

- Use preferred terms in APIs, UI copy, documentation, tests, and decisions.
- Use “tenant” only as a technical synonym for the Organization boundary.
- Keep organizational relationships such as Manager separate from domain responsibilities such as Approver.
- Keep User Account, Employee profile, and access Role Assignment as separate concepts.
- Use lifecycle actions such as deactivate, retire, cancel, and adjust instead of “delete” for decision-relevant records.

## Terms

| Preferred term | Definition | Context | Avoid or clarify |
|---|---|---|---|
| Organization | Security, ownership, and configuration boundary containing all Employee Hub records | Authorization and data ownership | Tenant except in technical context |
| Organization Scope | Authoritative organization identity constraining an operation, query, relationship, or event | Security and persistence | Client-provided filter as authority |
| User Account | Authentication identity used to access Employee Hub | Identity | User when a person/profile is intended |
| Employee | Worker profile belonging to an organization | Workforce and leave ownership | User Account |
| Team | Organizational grouping of employees | Reporting and availability | Department unless explicitly equivalent |
| Manager | Employee referenced by another employee's reporting relationship | Organizational structure | Approver outside the MVP |
| Direct Report | Employee whose configured manager is another employee | Reporting relationship | Subordinate in user-facing language |
| Role Assignment | Effective fixed access role granted to a user account | Authorization | Job title |
| Requester | Domain responsibility for managing eligible personal leave requests | Leave workflow | Employee profile |
| Approver | Domain responsibility for deciding a leave request | Leave workflow | Manager job title outside the MVP |
| HR role | Fixed role bundling workforce, policy, calendar, balance, and business-audit responsibilities | MVP access model | Administrator role |
| Administrator role | Fixed role responsible for accounts, access, organization settings, and security audit | MVP access model | HR role |
| Leave Type | Category of leave with consistent meaning and configuration | Policy, request, balance | Absence type unless broader absence is intended |
| Leave Policy | Effective-dated rules governing a leave type and entitlement behavior | Configuration and calculation | Holiday policy, PTO policy |
| Entitlement | Amount of a leave type granted for an entitlement period | Balance accounting | Available Balance |
| Entitlement Period | Bounded period to which entitlement and balance apply | Policy and balance | Leave year unless specifically calendar-year based |
| Accrual | Incremental granting of entitlement over time | Policy | Grant when no incremental behavior is intended |
| Carry-over | Unused entitlement transferred to a later period under policy rules | Policy and ledger | Rollover |
| Leave Balance | Current projection for one employee, leave type, and entitlement period | Self-service and validation | Entitlement or allowance |
| Available Balance | Amount currently available for eligible requests | Balance projection | Total entitlement |
| Reserved Balance | Amount held for pending requests if reservation is adopted | Balance projection | Used Balance |
| Used Balance | Amount consumed by approved leave under the selected accounting rule | Balance projection | Taken leave when status is unclear |
| Balance Transaction | Immutable record explaining a grant, reservation, use, release, restore, or adjustment | Accounting and audit | Mutable balance row change |
| Balance Adjustment | Authorized corrective balance transaction with a reason | HR correction | Override or direct edit |
| Leave Request | Request for one leave type across a calendar-date range | Workflow | Booking, absence request |
| Request Day Breakdown | Per-date explanation of counted amount or exclusion | Calculation and UI explanation | Hidden calculation detail |
| Approval Decision | Immutable approval or rejection record | Workflow and audit | Approval when process/outcome is ambiguous |
| Work Schedule | Effective-dated pattern defining normally worked dates and fractions | Working-day calculation | Calendar |
| Holiday Calendar | Named collection of public-holiday dates | Working-day calculation | Work Schedule |
| Public Holiday | Calendar date treated as non-working by an applicable holiday calendar | Calculation | Bank holiday unless region-specific term is intended |
| Working Day | Date or fraction counted against leave after schedule and holiday rules | Calculation | Calendar Day |
| Calendar Date | Date without a time-of-day or UTC offset | Request period | Timestamp |
| Overlap | Intersection of counted dates between requests for the same employee | Validation | Calendar adjacency |
| Submit | Create a valid request and place it into review | Request lifecycle | Save draft; drafts are not in MVP |
| Approve | Accept a pending request and apply its approved balance effect | Request lifecycle | Accept when domain action is intended |
| Reject | Decline a pending request without consuming leave | Request lifecycle | Delete |
| Cancel | End an eligible pending or approved request and reverse applicable balance effects | Request lifecycle | Withdraw unless separately defined later |
| Adjust | Append a corrective balance transaction | Balance lifecycle | Edit balance |
| Retire | End future applicability while preserving history | Configuration lifecycle | Delete |
| Pending | Submitted request awaiting its one MVP decision | Leave Request | Draft |
| Approved | Request accepted by the authorized approver | Leave Request | Completed |
| Rejected | Request declined by the authorized approver | Leave Request | Cancelled |
| Cancelled | Eligible request ended by an authorized actor | Leave Request | Rejected |
| Deterministic Calculation | Calculation that returns the same result for the same versioned inputs | Domain and testing | AI recommendation |
| Invariant | Rule that must remain true across every valid state transition | Domain and architecture | Validation that applies only at the UI |
| Optimistic Version | Version value used to detect a conflicting concurrent change | Transaction handling | Request status alone |
| Immutable Record | Record appended and preserved rather than silently overwritten | Decision, ledger, and audit | Read-only projection |
| Audit Event | Immutable record of a significant business or security action | Investigation and accountability | Notification or generic application log |
| Notification | Delivery intent and outcome for a user message | Workflow communication | Audit Event |

## Open Terminology Decisions

- Whether “withdrawn” should differ from “cancelled.”
- Whether Team and Department become separate concepts.
- Whether “day” remains the only leave unit or partial-day/hour units are required.
- Whether the entitlement period is always a calendar year or is policy-defined.
- Whether pending requests create Reserved Balance.

All open decisions are `[NEEDS VALIDATION]` and are tracked in the [domain analysis](explore-employee-hub/domain-analysis.md#9-assumptions-to-validate).
