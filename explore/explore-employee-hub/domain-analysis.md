+++
template_name = "Domain Analysis Template"
version = "1.0"
output_format = "explore/explore-employee-hub/domain-analysis.md"
validation_required = true
+++

# Domain Analysis: Employee Hub

**Project**: Employee Hub  
**Created**: 2026-08-28  
**Last Updated**: 2026-08-28  
**Status**: Complete  
**Owners**: Andrei — Product/Architecture; Sponsor — Lead Engineer  
**Domain-expert status**: No HR or leave-policy expert has reviewed this analysis; domain-practice claims remain `[NEEDS VALIDATION]`  

---

## 1. Domain Glossary

The canonical cross-artifact vocabulary is maintained in [the shared glossary](../glossary.md). This section records the terms most important to domain decisions.

### Core Domain Terms

| Term | Definition | Synonyms to avoid or clarify | Context | Example |
|---|---|---|---|---|
| **Organization** | Security, ownership, and configuration boundary containing all Employee Hub records | Tenant is a technical synonym only | Authorization and data ownership | Fictional Acme organization |
| **User Account** | Authentication identity used to access Employee Hub | User, when a person or profile is intended | Identity boundary | `andrei@example.test` |
| **Employee** | Worker profile belonging to an organization; it may or may not have an active account | Worker, staff member | Workforce and leave ownership | Employee E-104 |
| **Team** | Organizational grouping of employees | Department is not assumed equivalent | Reporting and availability | Engineering team |
| **Leave Type** | Category of leave with consistent meaning and configuration | Absence type | Requests, policies, and balances | Annual leave |
| **Leave Policy** | Effective-dated rules governing a leave type, entitlement, and balance behavior | Holiday policy, PTO policy | Validation and calculation | 25 days per entitlement period |
| **Leave Request** | Employee request for one leave type across a calendar-date range | Booking, absence request | Request and approval workflow | Annual leave from 7–11 September |
| **Approval Decision** | Immutable record that an authorized approver approved or rejected a request | Approval, which can mean process or result | Decision history | Approved by manager at 10:15 |
| **Leave Balance** | Current projection for one employee, leave type, and entitlement period | Entitlement, allowance | Self-service and validation | 12 available, 3 reserved, 10 used |
| **Balance Transaction** | Immutable record explaining a grant, reservation, use, release, or correction | Balance change | Accounting and audit | Reserve 5 days for request LR-22 |
| **Work Schedule** | Effective-dated pattern defining normally worked dates and fractions | Working week | Working-day calculation | Monday–Friday, one day each |
| **Holiday Calendar** | Named collection of non-working public-holiday dates | Bank-holiday list | Working-day calculation | Romania default calendar |
| **Request Day Breakdown** | Per-date explanation of whether and how much a request date counts | Calculation line | Explainability and recalculation | 1 day counted; holiday excluded |
| **Audit Event** | Immutable record of a significant business or security action | Activity log, history | Investigation and accountability | Role assigned; request approved |

### Domain Actions

| Action | Definition | Applies when | Example |
|---|---|---|---|
| **Submit** | Create a valid request and place it into manager review | Employee has an applicable policy and sufficient balance | Submit five working days |
| **Approve** | Accept a pending request and apply its approved balance effect | Authorized approver completes review | Move reserved amount to used |
| **Reject** | Decline a pending request without consuming leave | Authorized approver completes review | Release any reservation |
| **Cancel** | End an eligible pending or approved request and reverse applicable balance effects | Request meets cancellation rules | Cancel future approved leave |
| **Adjust** | Append an authorized corrective balance transaction with a reason | HR corrects a balance | Add one day for a corrected grant |
| **Retire** | End future applicability without deleting history | Configuration is replaced or no longer offered | Retire an old policy |

### States and Statuses

| State | Definition | Applies to | Next states |
|---|---|---|---|
| **Pending** | Submitted request awaiting its one MVP decision | Leave Request | Approved, Rejected, Cancelled |
| **Approved** | Request accepted by its approver | Leave Request | Cancelled when eligible |
| **Rejected** | Request declined by its approver | Leave Request | Terminal |
| **Cancelled** | Request ended by an authorized actor | Leave Request | Terminal |
| **Draft** | Configuration exists but is not applicable | Leave Policy | Active, Retired |
| **Active** | Record is available and applicable within its effective range | Organization, account, employee, team, configuration | Suspended, Inactive, Disabled, Retired, or Archived as applicable |
| **Retired** | Configuration remains historical but is not newly applicable | Policy, schedule, calendar | Terminal for the record version |
| **Open** | Balance period accepts ordinary transactions | Leave Balance | Closed |
| **Closed** | Balance period does not accept ordinary transactions | Leave Balance | Terminal unless a later correction process is approved |

### Roles and Actors

| Role | Definition | Responsibility | Not to be confused with |
|---|---|---|---|
| **Requester** | Domain role acting on personal leave | Submit, view, and cancel eligible personal requests | Employee profile |
| **Manager** | Organizational relationship to direct reports | Reporting structure | Approver domain responsibility |
| **Approver** | Domain role authorized to decide a request | Approve or reject within assigned scope | Manager job title outside the MVP |
| **Workforce Data Steward** | Domain role maintaining employees and teams | Accurate workforce structure | Organization access administration |
| **Policy and Calendar Administrator** | Domain role maintaining leave configuration | Effective policy, schedule, and holiday data | Approver |
| **Balance Administrator** | Domain role making reasoned corrections | Balance adjustment and investigation | Direct database editor |
| **Organization Access Administrator** | Domain role managing accounts, roles, and organization settings | Access lifecycle | HR data steward |
| **Audit Reviewer** | Domain role reading appropriate immutable history | Investigation and oversight | Actor who can alter history |
| **System Actor** | Automated component executing an authorized operation | Calculate, record, or deliver | Independent business decision-maker |

---

## 2. Domain Model

### Bounded Subdomains

| Subdomain | Responsibility | Principal entities |
|---|---|---|
| Identity & Access | Identity references, fixed roles, and organization scope | Organization, User Account, Role Assignment |
| Workforce Structure | Employees, reporting lines, and teams | Employee, Team |
| Leave Configuration | Leave categories and effective policies | Leave Type, Leave Policy |
| Calendar & Calculation | Working patterns, holidays, and explainable date calculation | Work Schedule, Holiday Calendar, Public Holiday, Request Day Breakdown |
| Request & Approval | Request lifecycle and manager decision | Leave Request, Approval Decision |
| Balance Accounting | Current projection and immutable changes | Leave Balance, Balance Transaction |
| Audit & Notification | Traceability and delivery outcomes | Audit Event, Notification |

### Entity Catalogue

| Entity | Category | Essential attributes | Lifecycle | Key relationships | Principal rule |
|---|---|---|---|---|---|
| **Organization** | Core | ID, name, default time zone, status | Active, Suspended, Archived | Owns all scoped records | Every owned record and relationship carries the same organization scope |
| **Employee** | Core | Organization, account, team, manager, schedule, status | Active, Inactive | Belongs to organization; optionally team/account/manager; owns balances and requests | Team, manager, and schedule must belong to the same organization |
| **Team** | Core | Organization, name, manager, status | Active, Inactive | Contains employees; optionally managed by employee | Name is unique within organization; manager is in scope |
| **Leave Type** | Core | Organization, code, name, unit, visibility, status | Active, Inactive | Has policies, balances, and requests | Code is unique in organization; inactive types remain historical |
| **Leave Policy** | Core | Leave type, entitlement, accrual, carry-over, effective dates | Draft, Active, Retired | Governs requests and balances for a leave type | No conflicting applicable policy for the same scope and date |
| **Leave Balance** | Core | Employee, leave type, period, available, reserved, used, version | Open, Closed | Projected from balance transactions | Unique by organization, employee, leave type, and period |
| **Leave Request** | Core | Employee, type, start date, end date, working days, status, version | Pending, Approved, Rejected, Cancelled | Has day breakdown, optional decision, transactions, notifications, and audit | A state transition and its financial effects are atomic |
| **User Account** | Supporting | Organization, email, identity-provider reference, status | Invited, Active, Disabled | Optionally linked one-to-one with employee; has role assignments | Authentication does not itself grant domain authority |
| **Role Assignment** | Supporting | Account, fixed role, effective dates | Active, Revoked | Belongs to user account | Cross-organization or implicit role inheritance is forbidden |
| **Work Schedule** | Supporting | Organization, working weekdays/fractions, effective dates | Active, Retired | Applied to employees; default may be organization-wide | One applicable schedule determines each request date's normal fraction |
| **Holiday Calendar** | Supporting | Organization, name, effective scope, status | Active, Retired | Contains public holidays; applied to employees or organization | MVP proposes one organization default calendar `[NEEDS VALIDATION]` |
| **Public Holiday** | Supporting | Calendar, date, name, status | Active, Removed | Belongs to holiday calendar | Date is unique within a calendar |
| **Request Day Breakdown** | Supporting | Request, date, scheduled fraction, excluded reason, counted amount, calculation version | Calculated, Superseded | Composed by leave request | Counted sum equals request working days |
| **Approval Decision** | Transactional | Request, approver, decision, reason, decided time | Final | Belongs one-to-one-or-zero with request | Immutable; at most one for the MVP request |
| **Balance Transaction** | Transactional | Balance, type, amount, request, reason, actor, timestamp | Posted | Belongs to balance; optionally references request | Immutable; corrections use compensating entries |
| **Audit Event** | Transactional | Organization, actor, action, subject, timestamp, metadata | Recorded | References affected record | Immutable and sanitized for sensitive data |
| **Notification** | Transactional | Organization, recipient, type, channel, status, attempts, request | Pending, Processing, Sent, Failed | Optionally references request | Delivery outcome cannot alter the business decision |

### Reference Data

| Reference type | Values for initial design | Status |
|---|---|---|
| Fixed access roles | Employee, Manager, HR, Administrator | `[VALIDATED]` project constraint; domain suitability `[NEEDS VALIDATION]` |
| Leave unit | Day | Full-day-only MVP is `[NEEDS VALIDATION]` |
| Request status | Pending, Approved, Rejected, Cancelled | Proposed MVP lifecycle |
| Decision | Approved, Rejected | One final decision in MVP |
| Transaction type | Grant, Carry Over, Reserve, Release, Use, Restore, Adjustment | Proposed ledger vocabulary `[NEEDS VALIDATION]` |
| Day exclusion reason | Non-working schedule date, Public holiday | Proposed calculation explanation |
| Notification status | Pending, Processing, Sent, Failed | Technical delivery lifecycle |

### Entity Relationship Diagram

```text
Organization
├── UserAccount 1 ── 0..* RoleAssignment
├── Employee 0..* ── 0..1 UserAccount
│   ├── belongs to 0..1 Team
│   ├── reports to 0..1 Employee
│   ├── uses 1 WorkSchedule
│   ├── owns 0..* LeaveBalance
│   └── submits 0..* LeaveRequest
├── Team 0..*
├── WorkSchedule 1..*
├── HolidayCalendar 1..* ── 0..* PublicHoliday
├── LeaveType 1..* ── 1..* LeavePolicy over time
└── AuditEvent 0..*

LeaveRequest
├── composed of 1..* RequestDayBreakdown
├── has 0..1 ApprovalDecision
├── causes 0..* BalanceTransaction
├── causes 0..* Notification
└── causes 1..* AuditEvent

LeaveBalance ── explained by 0..* BalanceTransaction
```

---

## 3. Entity Lifecycle States

### Leave Request Lifecycle

```text
Pending ──approve──> Approved ──eligible cancellation──> Cancelled
   │
   ├──reject──> Rejected
   └──cancel──> Cancelled
```

| State | Entry condition | Allowed actions | Exit condition and effects | Rules |
|---|---|---|---|---|
| **Pending** | Valid request submitted and day breakdown recorded | Read, decide by approver, cancel by requester; proposed MVP excludes edit | Approve, reject, or cancel | Proposed reservation is held; one concurrency version controls state change |
| **Approved** | Authorized approver accepts pending request | Read; cancel when eligible | Eligible cancellation restores used amount | Cannot transition to Rejected; decision is immutable |
| **Rejected** | Authorized approver declines pending request | Read only | Terminal | Reservation, if used, is released atomically |
| **Cancelled** | Authorized actor cancels pending or approved request | Read only | Terminal | Applicable reservation or use is reversed with compensating transaction |

Invalid transitions include Approved → Rejected, Rejected → Approved, Cancelled → Pending, and any second decision. A new request is required instead of reopening a terminal request.

### Configuration and Supporting Lifecycles

| Entity | Transitions | Terminal or invalid behavior |
|---|---|---|
| Organization | Active ↔ Suspended → Archived | Archived is terminal; suspended organization rejects ordinary user actions |
| User Account | Invited → Active → Disabled; Disabled → Active when authorized | Disabled account cannot authenticate; history remains |
| Employee | Active ↔ Inactive | Inactive employee cannot submit; future approved leave handling is `[NEEDS VALIDATION]` |
| Team | Active ↔ Inactive | Inactive team is not assigned to new employees; historical references remain |
| Leave Type | Active ↔ Inactive | Inactive type cannot receive new requests; history remains |
| Leave Policy | Draft → Active → Retired | Retired policy is not reactivated; create a new effective version |
| Work Schedule | Active → Retired | Historical request calculations retain their snapshot/version |
| Holiday Calendar | Active → Retired | Historical request calculations retain their snapshot/version |
| Leave Balance | Open → Closed | Closed periods reject ordinary transactions; correction policy is `[NEEDS VALIDATION]` |
| Request Day Breakdown | Calculated → Superseded | Existing lines are retained if recalculation is permitted |
| Notification | Pending → Processing → Sent; Processing → Failed; Failed → Processing | Retry limit and terminal failure are technical-policy decisions |

Approval Decisions, Balance Transactions, and Audit Events are immutable after creation. Corrections create new records rather than changing final records.

---

## 4. Domain Rules and Constraints

### Business Rules

| ID | Rule | Applies to | Validation | Violation handling | Status |
|---|---|---|---|---|---|
| BR-01 | Every read, write, relationship, and event is organization-scoped | All entities | Compare authoritative organization scope across actor and records | Reject and record security event where appropriate | `[VALIDATED]` product requirement |
| BR-02 | Only active accounts and eligible active employees perform ordinary leave actions | Account, Employee, Request | Check status and role at command time | Reject without mutation | Proposed |
| BR-03 | The employee's active manager is the one MVP approver | Employee, Request, Decision | Resolve manager in the same organization | Reject if absent or inactive | Project constraint; suitability `[NEEDS VALIDATION]` |
| BR-04 | An employee cannot approve their own request | Request, Decision | Approver ID differs from requester employee ID | Reject and audit attempt | Proposed security rule |
| BR-05 | A request has at most one final decision | Request, Decision | Unique request reference plus version/state check | Return conflict; no duplicate effects | Proposed |
| BR-06 | Start and end are calendar dates with start on or before end | Request | Date-only validation | Reject with field error | Proposed |
| BR-07 | Working days are derived from the applicable schedule and holiday calendar | Request, Breakdown | Recalculate from effective inputs | Reject inconsistent stored total | Proposed |
| BR-08 | A submitted request must count at least one working day | Request | Sum breakdown counted amount greater than zero | Reject request | `[NEEDS VALIDATION]` |
| BR-09 | A request cannot exceed the available balance unless policy explicitly permits a negative balance | Request, Balance | Compare calculated amount under a row lock/transaction | Reject with current availability | Negative balance behavior `[NEEDS VALIDATION]` |
| BR-10 | Submission reserves the calculated amount | Request, Balance | Post reservation with request in one transaction | Roll back request if reservation fails | `[NEEDS VALIDATION]` proposed default |
| BR-11 | Approval moves reserved amount to used; rejection or pending cancellation releases it | Request, Balance | Validate expected reservation and atomic entries | Return conflict and preserve prior state | Depends on BR-10 |
| BR-12 | Pending or approved requests for one employee cannot overlap counted dates | Request | Query active requests and compare counted dates | Reject with conflicting request reference | `[NEEDS VALIDATION]` |
| BR-13 | Pending requests are cancelled and recreated rather than edited | Request | No update command for dates/type | Explain required cancel-and-resubmit action | `[NEEDS VALIDATION]` scope choice |
| BR-14 | Future approved leave may be cancelled by its requester; started/historical leave requires HR correction | Request, Balance | Compare organization-local date and authority | Reject or route to HR | `[NEEDS VALIDATION]` |
| BR-15 | Balance adjustments require HR authority, reason, amount, and audit event | Balance, Transaction | Role, reason, and atomic append validation | Reject without changing projection | Proposed |
| BR-16 | Request calculation inputs are snapshotted or version-referenced | Policy, Schedule, Calendar, Request | Persist input versions with breakdown | Reject approval if required evidence is missing | `[NEEDS VALIDATION]` design choice |
| BR-17 | Significant state, configuration, access, and balance changes emit audit events | All sensitive actions | Transaction asserts required event exists | Roll back business action if audit record fails | Proposed |
| BR-18 | Notification delivery is asynchronous and independent of the committed business result | Notification | Create delivery intent in the business transaction | Retry delivery; never reverse decision | Proposed |
| BR-19 | Manager and team views expose minimum necessary leave information | Request, Employee | Authorization plus field-level response policy | Deny or redact sensitive fields | Visibility details `[NEEDS VALIDATION]` |

### Constraints

| ID | Constraint | Type | Impact and rationale |
|---|---|---|---|
| C-01 | Fictional employee data only | Product/security | Real personal data is prohibited during the learning project |
| C-02 | Fixed roles | Product | Dynamic permissions are excluded to bound scope |
| C-03 | One manager approval step | Product | Delegation and multi-step workflows are excluded |
| C-04 | Simple leave policy | Product | Country-specific legal automation is not promised |
| C-05 | One organization in initial local runtime, organization scope everywhere | Product/security | Enables learning locally without deferring tenant isolation design |
| C-06 | Calendar-date request range | Domain/technical | Avoids treating leave dates as UTC instants; event timestamps still use instants |
| C-07 | Full-day requests proposed for MVP | Product | Partial-day rules are deferred, subject to validation |
| C-08 | One default work schedule and holiday calendar proposed for MVP | Product | Multiple-office/time-zone policy is deferred, subject to validation |
| C-09 | No formal compliance claim | Regulatory | A launch country and qualified review are required before real use |
| C-10 | Immutable decision, balance, and audit records | Business/security | Preserves traceability and supports investigation |

### Invariants

1. Every referenced record belongs to the command's authoritative organization.
2. Every Leave Balance is unique by employee, leave type, and entitlement period within an organization.
3. `available = grants + carry-over + adjustments - reserved - used` for the projection's included transactions.
4. `workingDays = Σ RequestDayBreakdown.countedAmount` for the active calculation version.
5. A request has zero decisions while Pending and exactly one decision when Approved or Rejected.
6. A terminal request cannot receive another decision or cancellation effect.
7. A request transition, balance entries, active breakdown, and required audit event commit atomically.
8. The same command or delivery retry cannot post its business effect twice.
9. Balance Transactions, Approval Decisions, and Audit Events are never silently changed or deleted.
10. Notification state cannot change request or balance state.

### Calculations

| Calculation | Formula | Inputs | Output | Example |
|---|---|---|---|---|
| Working days | `Σ scheduleFraction(date) × requestedFraction(date)` for dates not excluded by holiday calendar | Inclusive dates, effective schedule, holiday calendar, request fraction | Counted leave amount and per-date breakdown | Mon–Fri request with Wednesday holiday = 4 days |
| Available balance | `grants + carry-over + adjustments - reserved - used` | Posted transactions in entitlement period | Current available amount | 25 + 2 + 0 - 3 - 10 = 14 |
| Submit reservation | `reserved' = reserved + requestAmount`; `available' = available - requestAmount` | Open balance and request amount | Reserved amount | Reserve 5 from available 14 → available 9 |
| Approval | `reserved' = reserved - requestAmount`; `used' = used + requestAmount` | Existing reservation | No change to already-net available | Reserved 5 → used 5 |
| Rejection/pending cancellation | `reserved' = reserved - requestAmount`; `available' = available + requestAmount` | Existing reservation | Released amount | Release 5 → available increases by 5 |
| Approved cancellation | `used' = used - requestAmount`; `available' = available + requestAmount` | Existing used effect and cancellation eligibility | Restored amount | Restore 5 future days |

Reservation formulas are contingent on validating BR-10. Signed transaction conventions must be fixed before implementation.

### Validation Rules

| Entity/field | Rule | User-facing outcome | Severity |
|---|---|---|---|
| Leave Request dates | Both dates required; start must not follow end | “Choose a valid leave period.” | Critical |
| Leave Request working days | Must be positive under applicable calculation | “This period contains no working days.” | Critical |
| Leave Request overlap | No conflicting counted dates under proposed MVP rule | “This request overlaps an existing request.” | Critical |
| Leave Request balance | Amount must satisfy policy and current transactional balance | “The available balance is insufficient.” | Critical |
| Approval approver | Active, in-scope, assigned approver and not requester | “You are not authorized to decide this request.” | Critical |
| Approval version/state | Request remains Pending with expected version | “This request has already changed. Refresh and review it again.” | Critical |
| Balance Adjustment | Non-zero amount, allowed period, reason, HR authority | “Provide an adjustment reason and valid amount.” | Critical |
| Configuration dates | Effective ranges do not conflict for the same scope | “These configuration dates overlap an active version.” | Critical |
| Audit metadata | Approved allow-listed fields only; no unnecessary sensitive details | Internal action fails safely | Critical |

---

## 5. User Roles and Responsibilities

### Domain Role Definitions

| Category | Domain role | Responsibilities and permissions | Constraints | Typical tasks |
|---|---|---|---|---|
| Primary | Requester | Read own employee summary and balances; create/read/cancel eligible own requests | No access to another employee's private data; no self-approval | Check balance, submit request, track status, cancel future leave |
| Primary | Approver | Read minimum direct-report request context; approve or reject pending requests | Assigned scope only; no policy/balance administration; no self-approval | Review impact and team availability, record decision |
| Secondary | Team Availability Viewer | Read team availability at the permitted detail level | No sensitive reason or unrestricted employee record access | Plan team coverage |
| Administrative | Workforce Data Steward | Create/update/deactivate employees and teams | No implicit access-role administration | Maintain manager and team relationships |
| Administrative | Policy and Calendar Administrator | Create/activate/retire leave types, policies, schedules, and calendars | Effective-date and history rules apply | Configure entitlement and holidays |
| Administrative | Balance Administrator | Read balances and append reasoned adjustments | Cannot rewrite ledger; closed-period policy applies | Correct a grant and investigate projection |
| Administrative | Organization Access Administrator | Manage accounts, role assignments, and high-level organization settings | No implicit HR or leave-detail access | Invite account, revoke role, suspend account |
| Administrative | Audit Reviewer | Read authorized business or security events | Cannot mutate audit history | Investigate access or balance change |
| System | Calculation Actor | Produce deterministic day breakdown and validate formulas | No business decision authority | Calculate working days |
| System | Audit Actor | Append required audit events | Cannot suppress required events | Record approval and role change |
| System | Notification Actor | Claim and deliver notification intents | Cannot alter business outcome | Send approval outcome and retry failure |

### Fixed MVP Role Mapping

| Fixed access role | Bundled domain responsibilities |
|---|---|
| Employee | Requester |
| Manager | Requester, Approver, Team Availability Viewer |
| HR | Requester, Workforce Data Steward, Policy and Calendar Administrator, Balance Administrator, business Audit Reviewer |
| Administrator | Requester when linked to an employee, Organization Access Administrator, security Audit Reviewer |

Multiple explicit Role Assignments are allowed. No fixed role implicitly inherits another role's administrative responsibility.

### Role Relationships

- Requester submits a Leave Request to the assigned Approver.
- Approver records a decision that becomes visible to the Requester and relevant HR users.
- Workforce Data Steward maintains the manager relationship used to resolve the Approver.
- Policy/Calendar and Balance Administrators provide validated inputs consumed by Calculation Actors.
- Organization Access Administrator assigns fixed access roles but does not grant themselves leave-data access implicitly.
- Delegation and approval chains are not supported in the MVP.

### Permission Matrix

| Domain role | Employee/Team | Policy/Calendar | Balance/Ledger | Leave Request | Decision | Roles/Accounts | Audit | Special actions |
|---|---|---|---|---|---|---|---|---|
| Requester | Read own | Read applicable summary | Read own balance | Create/read/cancel own | Read own outcome | None | Read own request history | Submit, cancel eligible |
| Approver | Read minimum direct-report/team context | Read applicable summary | Read decision impact, not unrestricted ledger | Read assigned pending requests | Create one final decision | None | Read decision history | Approve, reject |
| Team Viewer | Read permitted availability | None | None | Read availability projection only | None | None | None | View coverage |
| Workforce Data Steward | Create/read/update/deactivate | None | Read where needed for support | Read organization history | Read | None | Read relevant business audit | Assign manager/team |
| Policy/Calendar Administrator | Read scope | Create/read/update/activate/retire | Read projected effects | Read for support | Read | None | Read configuration audit | Publish effective configuration |
| Balance Administrator | Read employees | Read applicable rules | Read/append adjustment; no delete | Read/correct through approved process | Read | None | Read balance audit | Adjust with reason |
| Access Administrator | Read minimal identity link | None | None | None by default | None | Create/read/update/disable | Read security audit | Assign/revoke role |
| Audit Reviewer | Scope-dependent read | Scope-dependent read | Read immutable history | Read permitted history | Read | Security reviewer may read | Read only | Investigate/export if approved |
| System Actors | Read required scoped inputs | Read effective versions | Append authorized entries | Apply authorized transition | Append authorized decision | None | Append | Calculate, record, deliver |

Delete means hard deletion and is not granted for decision-relevant records. Domain lifecycle actions use deactivate, retire, cancel, or compensating transactions.

---

## 6. Current State

No current organization or production workflow was observed. This is an illustrative composite based on the Signal, market research, and initiative assumptions. Frequency, severity, and prevalence are `[NEEDS VALIDATION]`.

### Composite Current Process

1. Employee checks a spreadsheet or asks HR for their balance.
2. Employee sends a request through email, chat, a form, or a shared file.
3. Manager reconstructs team availability from messages and calendars.
4. HR or the manager applies policy, weekend, and holiday rules manually.
5. Manager communicates approval or rejection.
6. HR updates a spreadsheet, calendar, payroll/HR tool, or more than one record.
7. Later questions or corrections are reconstructed from messages, files, and change histories.

### Current Systems and Data Flows

| System/substitute | Purpose | Typical data flow | Limitation hypothesis |
|---|---|---|---|
| Spreadsheet | Employee list, balance, request register | HR edits rows; employees/managers view copies | Formula ownership, permissions, and concurrent edits may be unclear |
| Email/chat | Submission, approval, reminders | Employee → Manager → HR | Status and evidence are distributed across threads |
| Shared calendar | Team availability | Approved request manually copied into event | Balance and policy context are absent; sensitive details may be overexposed |
| HR/payroll tool | Employee or payroll records | HR re-enters approved leave | Integration and source-of-truth ownership may be unclear |
| Local policy documents | Entitlement and approval rules | Human reads and interprets text | Rules can be inconsistently applied or outdated |

### Prioritized Pain Hypotheses

| Priority | Pain hypothesis | Impact | Frequency | Current mitigation |
|---|---|---|---|---|
| High | Incorrect or unclear balances and working-day calculations | Employee trust, HR corrections, approval confidence | Unknown | Manual verification and spreadsheet formulas |
| High | Fragmented request status and ownership | Employees, managers, and HR cannot reliably see next action | Unknown | Follow-up messages and reminders |
| High | Unclear access to sensitive employee information | Privacy and cross-organization exposure risk | Unknown | File permissions and informal restraint |
| Medium | Manager cannot see reliable team availability and decision impact | Delayed decisions or staffing conflicts | Unknown | Shared calendars and direct messages |
| Medium | Change history is difficult to reconstruct | Troubleshooting and trust suffer | Unknown | Search email/chat and spreadsheet version history |
| Medium | Notifications are forgotten or delayed | Requests remain pending and users ask for status | Unknown | Manual reminders |

### What Works Well

1. **Familiar tools** reduce training and initial setup; preserve a low-friction interaction model.
2. **Human judgment** allows managers to consider context; preserve a human final decision.
3. **Calendar visibility** communicates absence patterns quickly; preserve a clear team calendar.
4. **Flexible conversation** lets people clarify exceptional requests; preserve optional non-sensitive comments without requiring medical detail.

---

## 7. Domain Risks and Unknowns

### Unknowns

| ID | Unknown | Why it matters | Resolution | Owner | Deadline/priority |
|---|---|---|---|---|---|
| U-01 | Required MVP leave types | Determines policies, visibility, and balances | HR/employee interviews and PRD decision | Andrei | Before PRD; High |
| U-02 | Entitlement, accrual, carry-over, and negative-balance rules | Determines accounting model | Domain expert interview and examples | Andrei + Lead | Before implementation; High |
| U-03 | Pending reservation behavior | Determines overcommitment and manager expectations | Prototype scenarios and transaction feasibility | Andrei + Lead | Before solution design; High |
| U-04 | Weekend, holiday, schedule, and partial-day calculation | Highest-risk business logic | Domain examples and property-based test model | Lead + HR representative | Before solution design; High |
| U-05 | Pending and approved overlap policy | Affects balance and availability | Journey scenarios and HR interview | Andrei | Before PRD; High |
| U-06 | Edit and cancellation eligibility | Affects lifecycle and reversals | Journey mapping and policy decision | Andrei | Before PRD; High |
| U-07 | Manager-visible leave information | Affects usefulness and privacy | Manager/employee interviews and privacy review | Andrei | Before PRD; High |
| U-08 | Balance adjustment and closed-period correction | Affects auditability and support | HR/accounting-style scenarios | Andrei + Lead | Before implementation; Medium |
| U-09 | Manager absence, change, or termination | Can block decisions or leave future approvals orphaned | Workforce lifecycle scenarios | Andrei | Before implementation; Medium |
| U-10 | Multiple offices, calendars, and time zones | May invalidate one-default assumptions | Target-country and organization interviews | Andrei + Lead | Before scope broadening; Medium |
| U-11 | Notification channels and timing | Affects workflow completion | Persona/journey research | Andrei | Before implementation; Medium |

### Assumptions

| ID | Assumption | Risk if wrong | Validation method | Status | Owner |
|---|---|---|---|---|---|
| A-01 | Fixed access roles cover the first useful workflow | Authorization redesign | Persona and journey validation | `[NEEDS VALIDATION]` | Andrei |
| A-02 | One manager decision is sufficient | Workflow redesign | Manager/HR interviews | `[NEEDS VALIDATION]` | Andrei |
| A-03 | Pending requests should reserve balance | Incorrect availability or extra complexity | Scenario testing and prototype | `[NEEDS VALIDATION]` | Andrei + Lead |
| A-04 | Overlapping pending/approved requests should be blocked | Legitimate workflows prevented | HR/employee interviews | `[NEEDS VALIDATION]` | Andrei |
| A-05 | Pending requests need no edit action | User frustration and duplicate work | Journey testing | `[NEEDS VALIDATION]` | Andrei |
| A-06 | Full-day requests are sufficient for MVP | Common use cases excluded | HR/employee interviews | `[NEEDS VALIDATION]` | Andrei |
| A-07 | One schedule and holiday calendar per organization is sufficient | Incorrect calculations for distributed teams | Target-segment interviews | `[NEEDS VALIDATION]` | Andrei + Lead |
| A-08 | Calculation input versions should be preserved with each request | Storage/complexity added or history becomes irreproducible | Architecture and audit scenarios | `[NEEDS VALIDATION]` | Lead |
| A-09 | Manual balance adjustment belongs to HR | Wrong authority or segregation of duties | HR/security review | `[NEEDS VALIDATION]` | Andrei |
| A-10 | Sensitive leave reasons are unnecessary for manager approval | Missing decision context or excess data collection | Manager/employee research | `[NEEDS VALIDATION]` | Andrei |

### Domain Risks

| ID | Risk | Likelihood | Impact | Mitigation | Owner/status |
|---|---|---|---|---|---|
| R-01 | Incorrect working-day or balance calculation | High | High | Explicit formulas, examples, property tests, immutable breakdown | Lead / Open |
| R-02 | Concurrent decisions or retries apply duplicate effects | Medium | High | Database transaction, uniqueness, version check, idempotency | Lead / Open |
| R-03 | Cross-organization access or relationship | Medium | High | Authoritative scope, database constraints, negative authorization tests | Lead + Architect / Open |
| R-04 | Retroactive policy/schedule/holiday change alters historical meaning | High | High | Effective versions and request calculation evidence | Andrei + Lead / Open |
| R-05 | Sensitive leave details are exposed to managers or peers | Medium | High | Data minimization, field-level responses, visibility tests | Andrei + Lead / Open |
| R-06 | Balance projection drifts from immutable transactions | Medium | High | Reconciliation invariant and transactional updates | Lead / Open |
| R-07 | Country variation expands a simple policy into legal automation | High | High | Select launch country; no compliance claim; bounded policy model | Sponsor + Andrei / Open |
| R-08 | Domain model expands into complete HRIS | Medium | Medium | Preserve exclusions and require evidence for new subdomains | Andrei / Open |

### Complexity Areas

1. Calendar-date and working-pattern calculation
2. Balance accounting and period boundaries
3. Atomic request lifecycle under concurrency
4. Effective-dated configuration and historical reproducibility
5. Role, reporting-line, and organization authorization
6. Privacy-preserving team availability

### Edge Cases

| Edge case | Proposed handling | Priority |
|---|---|---|
| Date range contains only weekends/holidays | Reject zero-count request | High |
| Two active requests overlap counted dates | Reject under proposed rule and identify conflict | High |
| Employee has no active manager | Do not submit or route until corrected; final behavior requires product decision | High |
| Manager attempts self-approval | Reject and audit | High |
| Two approvers act on stale copies | First valid transaction wins; second receives conflict | High |
| Policy, schedule, or holiday changes while pending | Use preserved input version or require explicit recalculation decision | High |
| Approval occurs after balance becomes insufficient | Transaction revalidates current balance and returns conflict | High |
| Approved leave is cancelled after it starts | Require HR correction under proposed rule | High |
| Employee becomes inactive with future approved leave | HR resolution workflow is `[NEEDS VALIDATION]` | Medium |
| Manager changes while request is pending | Decide whether approver is snapshotted or dynamically reassigned | Medium |
| Holiday is added retroactively | Preserve historical calculation unless authorized recalculation occurs | Medium |
| Leap day or daylight-saving transition | Calendar dates count by schedule; event timestamps remain UTC instants | Medium |
| Notification sends twice after retry | Idempotent provider key and delivery record; business state unchanged | Medium |

---

## 8. Domain Model Summary

### Core Entities and Relationships

The model contains 17 decision-relevant entities across seven bounded subdomains. The core product chain is:

```text
Policy + Work Schedule + Holiday Calendar
                    │
                    ▼
Employee ──submits──> Leave Request ──decided by──> Approval Decision
                           │
                           ├──explained by──> Request Day Breakdown
                           ├──posts──> Balance Transaction ──projects──> Leave Balance
                           ├──records──> Audit Event
                           └──emits──> Notification
```

Critical relationships are organization-owned and must never cross scope. The Employee manager relationship supplies the one MVP Approver. Effective Policy, Schedule, and Calendar inputs calculate a composed day breakdown. Request transitions generate immutable decision, balance, and audit records.

### Critical Business Rules

1. Organization scope is authoritative for every operation and relationship.
2. Working days are deterministic and explainable per calendar date.
3. A request has one final decision and cannot be decided twice.
4. Request, balance, breakdown, and audit effects are atomic and idempotent.
5. Balance projections reconcile with immutable transactions.
6. Corrections append compensating records instead of rewriting history.
7. Manager and team views expose only necessary information.
8. Notification delivery is independent of the committed domain result.

### Complexity Drivers

- Different schedules, holidays, partial days, and configuration-effective dates complicate date calculation.
- Reservation, approval, cancellation, adjustment, and period closure complicate balance accounting.
- Concurrent actions and retries threaten one-decision and one-effect invariants.
- Organizational roles, domain responsibilities, reporting lines, and organization scope interact but must remain distinct.
- Policy and jurisdiction variation can expand the product beyond its intended boundary.

### Product and Architecture Implications

1. Show the date-by-date calculation and resulting balance effect before submission and approval.
2. Keep the manager decision screen minimal, scoped, and free of unnecessary sensitive details.
3. Treat policy, schedule, and holiday changes as effective versions, not in-place historical edits.
4. Use transactional commands with uniqueness, version checks, and idempotency for decisions and balance effects.
5. Store an immutable transaction ledger and verify its projection through reconciliation tests.
6. Centralize organization scoping and still enforce it at persistence and test boundaries.
7. Use lifecycle actions—retire, deactivate, cancel, adjust—rather than hard deletion.
8. Keep notification delivery asynchronous through a durable intent/outbox boundary.

---

## 9. Assumptions to Validate

### High Priority — Before Solution Design and PRD Approval

| Assumption | Risk if wrong | Validation method | Owner | Deadline | Status |
|---|---|---|---|---|---|
| Required leave types and simple policy shape are sufficient | Core configuration and journeys change | HR/employee interviews and domain examples | Andrei | Before PRD approval | `[NEEDS VALIDATION]` |
| Schedule/holiday calculation and full-day-only scope cover the MVP | Calculation model or UI changes | Worked examples, HR interviews, prototype | Andrei + Lead | Before solution design | `[NEEDS VALIDATION]` |
| Pending requests reserve balance | Availability semantics or transaction model changes | Scenario walkthrough and technical spike | Andrei + Lead | Before solution design | `[NEEDS VALIDATION]` |
| Active request overlaps are blocked | Legitimate use cases fail or balances overcommit | Journey testing | Andrei | Before PRD approval | `[NEEDS VALIDATION]` |
| Pending requests can use cancel-and-resubmit instead of edit | User experience is unnecessarily poor | Employee journey/prototype test | Andrei | Before PRD approval | `[NEEDS VALIDATION]` |
| Future approved leave can be self-cancelled; other correction belongs to HR | Wrong authority or balance reversal | HR/employee scenario interview | Andrei | Before PRD approval | `[NEEDS VALIDATION]` |
| The employee's manager is the one approver and cannot self-approve | Requests can be orphaned or workflows excluded | Manager/HR interviews | Andrei | Before PRD approval | `[NEEDS VALIDATION]` |
| Manager visibility can exclude sensitive reasons while supporting a decision | Too little context or excess exposure | Manager/employee privacy testing | Andrei | Before PRD approval | `[NEEDS VALIDATION]` |
| Request calculation evidence preserves historical meaning | Added complexity or irreproducible decisions | Architecture review and change scenarios | Lead + Andrei | Before solution design | `[NEEDS VALIDATION]` |

### Medium Priority — Before Implementation

| Assumption | Risk if wrong | Validation method | Owner | Deadline | Status |
|---|---|---|---|---|---|
| Entitlement can begin with a simple grant before advanced accrual | Ledger redesign | HR examples and PRD decision | Andrei + Lead | Before implementation | `[NEEDS VALIDATION]` |
| HR owns balance adjustments and closed-period correction | Permission and audit redesign | HR/security review | Andrei | Before implementation | `[NEEDS VALIDATION]` |
| Employee/manager deactivation has a simple resolution path | Orphaned requests and leave | Workforce lifecycle scenarios | Andrei | Before implementation | `[NEEDS VALIDATION]` |
| One organization schedule/calendar is sufficient initially | Incorrect distributed-team calculation | Target-user interviews | Andrei + Lead | Before implementation | `[NEEDS VALIDATION]` |
| Email/in-app notification is enough for initial workflow | Pending work is missed | Persona and journey validation | Andrei | Before implementation | `[NEEDS VALIDATION]` |

### Lower Priority — Before Pilot or Scope Expansion

| Assumption | Risk if wrong | Validation method | Owner | Deadline | Status |
|---|---|---|---|---|---|
| Delegation and multi-step approval can remain deferred | Some organizations cannot pilot | Segment screening | Andrei | Before pilot selection | `[NEEDS VALIDATION]` |
| Detailed leave reasons and documents can remain excluded | Required HR workflow missing | HR/privacy review | Andrei | Before pilot | `[NEEDS VALIDATION]` |
| Operational reports are sufficient before forecasting | Manager planning value is limited | Pilot feedback | Andrei | During pilot | `[NEEDS VALIDATION]` |
| Broader HR capabilities are unnecessary for the focused workflow | Product lacks adoption context | Buyer interviews | Andrei | Before scope expansion | `[NEEDS VALIDATION]` |

### Validation Plan

| Activity | Method | Timeline | Owner | Dependencies |
|---|---|---|---|---|
| Personas | Evidence-tagged employee, manager, HR, and administrator needs | Explore Discovery | Andrei | Market and domain analysis |
| Journey Mapping | Current/future scenarios including overlap, cancellation, and visibility | Explore Discovery | Andrei | Personas and domain rules |
| Technical Feasibility | Calculation examples, transaction/concurrency model, authorization tests | Explore Discovery | Lead Engineer | Domain invariants |
| Architecture Context | Resolve effective configuration, modules, data ownership, and quality attributes | Explore Discovery | Andrei + Lead | Domain and feasibility |
| Hypothesis Documentation | Measurable tests for workflow value and domain assumptions | Explore Discovery | Andrei | Personas, journeys, market evidence |
| PRD Review | Convert validated decisions into testable requirements; retain unresolved gaps | Explore Specification | Andrei + Sponsor | Discovery activities |
| Future Representative Research | Interviews/prototype testing with HR, managers, and employees | Before commercial or real-data claim | Andrei | Participant recruitment |

---

## Related Artifacts

- [Signal](../../signal/signals/20260827-employee-hub-leave-management.md)
- [Explore Bundle](explore-bundle.md)
- [Context](context.md)
- [Market Research](market-research.md)
- [Shared Glossary](../glossary.md)
- [Personas](../domain/personas-employee-hub.md)
- [Journey Maps](../domain/journey-employee-hub.md)
- [Architecture HLD](../hlds/employee-hub-hld.md)
- [PRD](../prds/employee-hub-prd.md)

---

**Last Updated**: 2026-08-28  
**Status**: Complete — artifact validated; domain-practice assumptions still require representative review  
