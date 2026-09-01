+++
template_name = "Persona Set Template"
version = "1.0"
created = "2026-08-31"
source = "Manual sponsor input and Explore artifacts; no user interviews"
product_context = "Employee Hub leave-management learning project"
persona_count = 4
status = "approved assumptions"
+++

# Persona Set: Employee Hub

**version**: 1.0  
**created**: 2026-08-31  
**source**: Manual sponsor input and Explore artifacts; no user interviews  
**product_context**: Employee Hub leave-management learning project  
**persona_count**: 4  
**status**: Approved as assumptions; requires real-user validation

---

## AGENT USAGE INSTRUCTIONS

- Reference personas by their persona_id, for example P1.
- [VALIDATED] means confirmed by the project sponsor, not directly by users.
- [ASSUMPTION] means agent-inferred; treat it as a hypothesis in journeys, flows, requirements, and design.
- Do not turn assumptions into product facts without user research.
- Each persona's checklist identifies the highest-priority research gaps.
- Validation priority is High when more than 50% of profile fields are assumptions.

---

## Persona P1: Employee

**persona_id**: P1  
**status**: Approved assumptions

### Demographics

| Field | Value | Tag |
|---|---|---|
| Name, age, location, education | Not specified; role-based persona rather than a fictional individual | [ASSUMPTION] |
| Occupation | Employee in an organization using Employee Hub | [VALIDATED] |
| Technical Proficiency | Not specified | [ASSUMPTION] |

### Goals & Motivations

- Request a new leave period. [VALIDATED]
- View their profile. [VALIDATED]
- View all relevant leave information. [VALIDATED]
- Understand remaining balance, request status, and eligible cancellation. [ASSUMPTION]

### Pain Points

- May be uncertain about balance or request status. [ASSUMPTION]
- May currently use inconsistent leave-request channels. [ASSUMPTION]
- May need a clear explanation of which requested dates count as leave. [ASSUMPTION]

### Behaviors

- Checks leave information before submitting a request. [ASSUMPTION]
- Expects a clear committed result after submitting a request. [ASSUMPTION]

### Mental Models

- Views leave as a personal request with a visible lifecycle. [ASSUMPTION]
- Expects profile, balance, requests, and status to be easy to find. [ASSUMPTION]

### Devices & Channels

- Primary: browser on a work desktop or laptop. [ASSUMPTION]
- Secondary: browser on a phone-sized screen. [ASSUMPTION]
- Usage context: completes relevant tasks during normal work. [ASSUMPTION]

### Values

- Clarity about leave balance and request outcome. [ASSUMPTION]
- Privacy of personal leave information. [ASSUMPTION]

### Assumptions to Validate

> Confirm each item with real user research before using it as a product fact.

- [ ] Employees need to see balance and an included/excluded-date explanation before submission.
- [ ] Employees use both desktop and phone-sized screens for leave tasks.
- [ ] Employees need self-service cancellation of eligible approved requests.

### Brief Narrative

The Employee uses Employee Hub to request new leave, view their profile, and view leave information. Assumed: they value a simple, private experience that clearly confirms the request and explains its status.

---

## Persona P2: Manager

**persona_id**: P2  
**status**: Approved assumptions

### Demographics

| Field | Value | Tag |
|---|---|---|
| Name, age, location, education | Not specified; role-based persona rather than a fictional individual | [ASSUMPTION] |
| Occupation | Manager with Employee capabilities and leave approval/rejection responsibility | [VALIDATED] |
| Technical Proficiency | Not specified | [ASSUMPTION] |

### Goals & Motivations

- Use all Employee capabilities. [VALIDATED]
- Approve or reject leave requests. [VALIDATED]
- Understand direct-report and team availability context before deciding. [ASSUMPTION]

### Pain Points

- May need to make decisions without enough team context. [ASSUMPTION]
- May receive requests late or through inconsistent channels. [ASSUMPTION]
- May need protection from seeing unnecessary private leave detail. [ASSUMPTION]

### Behaviors

- Reviews pending requests alongside normal management work. [ASSUMPTION]
- Needs a clear final result after approving or rejecting. [ASSUMPTION]

### Mental Models

- Treats approval as responsibility for direct reports. [ASSUMPTION]
- Expects only the information needed for a fair decision. [ASSUMPTION]

### Devices & Channels

- Primary: browser on a work desktop or laptop. [ASSUMPTION]
- Secondary: browser on a phone-sized screen. [ASSUMPTION]
- Usage context: completes relevant tasks during normal work. [ASSUMPTION]

### Values

- Timely, fair decisions. [ASSUMPTION]
- Clear team availability with minimum necessary personal detail. [ASSUMPTION]

### Assumptions to Validate

> Confirm each item with real user research before using it as a product fact.

- [ ] Managers need a focused pending-approval view.
- [ ] Managers need team availability to decide on leave.
- [ ] Managers should not see sensitive leave reasons by default.

### Brief Narrative

The Manager has the same self-service capabilities as an Employee and approves or rejects leave requests. Assumed: they need quick, scoped decision support that respects employee privacy.

---

## Persona P3: HR Administrator

**persona_id**: P3  
**status**: Approved assumptions

### Demographics

| Field | Value | Tag |
|---|---|---|
| Name, age, location, education | Not specified; role-based persona rather than a fictional individual | [ASSUMPTION] |
| Occupation | HR role with Employee capabilities and ability to add new employees | [VALIDATED] |
| Technical Proficiency | Not specified | [ASSUMPTION] |

### Goals & Motivations

- Use all Employee capabilities. [VALIDATED]
- Add new employees. [VALIDATED]
- Maintain accurate teams, policies, holidays, balances, and history. [ASSUMPTION]

### Pain Points

- May currently perform calculations or record keeping manually. [ASSUMPTION]
- May need to investigate unexpected balance or request changes. [ASSUMPTION]
- May need clear configuration readiness before employees request leave. [ASSUMPTION]

### Behaviors

- Sets up workforce and leave-rule data before relying on workflows. [ASSUMPTION]
- Investigates exceptions through leave and audit history. [ASSUMPTION]

### Mental Models

- Treats HR data and leave policies as controlled organizational configuration. [ASSUMPTION]
- Expects significant changes to be traceable. [ASSUMPTION]

### Devices & Channels

- Primary: browser on a work desktop or laptop. [ASSUMPTION]
- Secondary: browser on a phone-sized screen. [ASSUMPTION]
- Usage context: completes relevant tasks during normal work. [ASSUMPTION]

### Values

- Accurate employee and leave data. [ASSUMPTION]
- Traceability and controlled access. [ASSUMPTION]

### Assumptions to Validate

> Confirm each item with real user research before using it as a product fact.

- [ ] HR needs to manage policies, holidays, balances, and audit history in the MVP.
- [ ] HR needs explicit balance-adjustment authority.
- [ ] HR needs exports or reporting beyond in-app history.

### Brief Narrative

The HR Administrator can use Employee capabilities and add new employees. Assumed: they also need reliable configuration and audit information to maintain trustworthy leave operations.

---

## Persona P4: Organization Administrator

**persona_id**: P4  
**status**: Approved assumptions

### Demographics

| Field | Value | Tag |
|---|---|---|
| Name, age, location, education | Not specified; role-based persona rather than a fictional individual | [ASSUMPTION] |
| Occupation | Organization administrator with access to every feature | [VALIDATED] |
| Technical Proficiency | Not specified | [ASSUMPTION] |

### Goals & Motivations

- Access every Employee Hub feature. [VALIDATED]
- Manage organization-level access, settings, and security-sensitive activity. [ASSUMPTION]
- Ensure broad access is controlled and traceable. [ASSUMPTION]

### Pain Points

- May lack clear visibility into permissions and sensitive changes. [ASSUMPTION]
- May need evidence when investigating access issues. [ASSUMPTION]
- May risk excessive access if role boundaries are unclear. [ASSUMPTION]

### Behaviors

- Changes access cautiously. [ASSUMPTION]
- Reviews security-sensitive activity when needed. [ASSUMPTION]

### Mental Models

- Broad access carries administrative accountability. [ASSUMPTION]
- Expects every high-impact change to be auditable. [ASSUMPTION]

### Devices & Channels

- Primary: browser on a work desktop or laptop. [ASSUMPTION]
- Secondary: browser on a phone-sized screen. [ASSUMPTION]
- Usage context: completes relevant tasks during normal work. [ASSUMPTION]

### Values

- Security and controlled access. [ASSUMPTION]
- Traceability of administrative actions. [ASSUMPTION]

### Assumptions to Validate

> Confirm each item with real user research before using it as a product fact.

- [ ] An administrator needs every feature in the MVP rather than a narrower permission set.
- [ ] Administrators need dedicated security-sensitive activity views.
- [ ] Administrators need phone-sized access for oversight tasks.

### Brief Narrative

The Organization Administrator has access to every feature. Assumed: they use that broad access to manage organization settings and review sensitive activity responsibly.

---

## Validation Summary

| Persona | Total Fields | Validated | Assumptions | Validation Priority |
|---|---:|---:|---:|---|
| P1: Employee | 19 | 4 | 15 | High |
| P2: Manager | 18 | 3 | 15 | High |
| P3: HR Administrator | 18 | 3 | 15 | High |
| P4: Organization Administrator | 18 | 2 | 16 | High |

**Overall validation priority**: High. Roles and primary capabilities are sponsor-confirmed, but user needs, pain points, behaviors, mental models, devices, and values have not been validated through user research.

## Related Artifacts

- [Signal](../../signal/signals/20260827-employee-hub-leave-management.md)
- [Context](../explore-employee-hub/context.md)
- [Domain Analysis](../explore-employee-hub/domain-analysis.md)
- [Architecture Context](../explore-employee-hub/architecture-context.md)
