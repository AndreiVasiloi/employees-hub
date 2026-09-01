+++
template_name = "Hypothesis Documentation Template"
version = "1.0"
output_format = "explore/explore-employee-hub/hypothesis.md"
created = "2026-08-31"
status = "STAKEHOLDER-VALIDATED"
validation_required = true
+++

# Hypothesis: Employee Hub

**Signal**: [Employee Hub Leave Management](../../signal/signals/20260827-employee-hub-leave-management.md)  
**Phase**: Explore Discovery  
**Created**: 2026-08-31  
**Status**: STAKEHOLDER-VALIDATED — learning hypothesis; no direct user validation yet

## 1. Hypothesis Statement

**We believe that** Employees (P1) in small and medium organizations

**experience** difficulty confidently requesting and tracking leave

**when** leave guidance, balances, calculations, request submission, and status are managed through disconnected channels

**because** the current process may require manual interpretation of policy, working days, and approval outcome.

**We will know this direction is promising when** a minimum three-participant learning test using fictional data shows at least two participants can submit a request without assistance, correctly explain its leave effect, and say the workflow is clearer than their current process.

## 2. Evidence Base

| Evidence type | Source | Key finding | Status |
|---|---|---|---|
| Sponsor-confirmed problem scope | [Signal](../../signal/signals/20260827-employee-hub-leave-management.md) | Employee leave requests, manager approval, balances, audit, and scoped access are in scope | [VALIDATED] |
| Sponsor-confirmed Employee capabilities | [Personas](../domain/personas-employee-hub.md#persona-p1-employee) | Employee should request leave, view profile, and view leave information | [VALIDATED] |
| Sponsor-approved journey scope | [Journey J1](../domain/journey-employee-hub.md#journey-j1-employee-requests-and-tracks-leave) | Journey spans need identification, guidance, preparation, submission, waiting, outcome, and recovery | [VALIDATED] |
| Independent category evidence | [Market Research](market-research.md) | Dedicated leave-management products and spreadsheet/email/chat substitutes exist | [VALIDATED] |
| Current-state pain | Journey J1 | Guidance, balance, working-day calculation, acknowledgement, and status may be fragmented or unclear | [ASSUMPTION] |
| Employee needs and behavior | Persona P1 | Employees may need pre-submit explanation, visible status, privacy, and cancellation guidance | [ASSUMPTION] |
| Product fit | Context and Market Research | A focused workflow may be valuable without a full HR platform | [ASSUMPTION] |
| Workflow usability | Proposed validation test | Three representative participants can provide useful early directional learning | [ASSUMPTION] |

**Evidence strength**: 50% documented/sponsor-confirmed or independently sourced; 50% assumption-led.  
**Confidence**: Low for customer demand and usability because no direct Employee research, production data, or adoption evidence exists.

## 3. Success Criteria

| Metric | Baseline | Target | Measurement method | Timeline |
|---|---|---|---|---|
| Unassisted request completion | Not measured | At least 2 of 3 participants complete a fictional-data request without facilitator assistance | Moderated prototype or working-increment task test | Before treating the PRD direction as customer-validated |
| Correct leave-effect explanation | Not measured | At least 2 of 3 participants correctly explain included/excluded dates and balance effect | Ask participant to explain result after task | Same sessions |
| Relative clarity | Not measured | At least 2 of 3 participants say the workflow is clearer than their current process | Short post-task question with reasoning captured | Same sessions |

**Validation threshold**

- **Confirmed direction**: all three targets are met.
- **Partial direction**: two targets are met.
- **Rejected direction**: zero or one target is met.
- **Two participants only**: record directional learning; do not claim confirmation.

Qualitative indicators:

- Participants can state where to find leave information and status.
- Participants identify a clear next action after a rejected or delayed request.
- Participants do not infer sensitive leave details are broadly visible.

## 4. Assumptions to Validate

### Critical assumptions

| ID | Assumption | Risk if wrong | Validation method | Owner | Status |
|---|---|---|---|---|---|
| A1 | Employees experience fragmented guidance, unclear balances, or weak request-status visibility today. | High: the central problem may not be important. | Interview 2–3 representative employees about a recent leave request. | Andrei / Sponsor | Pending |
| A2 | A single explainable workflow materially improves clarity for employees. | High: solution may not address the real problem. | Task test 3 representative employees with fictional data. | Andrei / Sponsor | Pending |
| A3 | Participants can understand working-day and balance explanations without assistance. | High: high-risk business rule remains opaque. | Ask participants to explain a completed request result. | Lead Engineer / Andrei | Pending |

### Supporting assumptions

| ID | Assumption | Risk if wrong | Validation method | Owner | Status |
|---|---|---|---|---|---|
| A4 | Manager visibility should be limited to minimum necessary information. | Medium: privacy or usability mismatch. | Manager/employee interviews and policy review. | Andrei | Pending |
| A5 | Employees need self-service cancellation of eligible requests. | Medium: unnecessary MVP scope. | Interview and task-test question. | Andrei | Pending |
| A6 | A simple one-step manager workflow is sufficient for the first increment. | Medium: process mismatch. | Manager/HR interview and scenario review. | Andrei | Pending |

## 5. Alternative Hypotheses

1. **The primary problem is policy inconsistency, not the request channel.**  
   Supporting evidence would be employees who understand their balance/status but cannot determine which policy applies. Solution work would prioritize policy configuration and explanation over request UX.

2. **Managers and HR receive more value than employees.**  
   Supporting evidence would be employees reporting an acceptable process while managers/HR report approval, calculation, and audit overhead. Solution work would prioritize manager/HR workflow and administration.

3. **A focused leave workflow is insufficient without integrations.**  
   Supporting evidence would be users refusing the workflow unless calendar, HRIS, or notification integrations exist. Solution scope and technical dependencies would need review.

## 6. Validation Plan

### Phase 1: Discovery validation

- Recruit 2–3 representative Employees, if available, and discuss a recent leave-request experience.
- Run a fictional-data task test against a prototype or working increment.
- Capture task outcome, explanation accuracy, clarity feedback, and unexpected needs.

**Expected outcome**: evidence for A1–A3 and a confirmed, partial, or rejected learning result.  
**Timeline**: before claiming customer validation; exact date not committed.

### Phase 2: Solution validation

- Test the same core task after solution design with the accepted architecture and UX artifacts.
- Validate manager visibility, rejection/recovery, and calculation explanation scenarios.

**Expected outcome**: refine acceptance criteria and identify usability or policy gaps.  
**Timeline**: after solution design/HLD; before implementation commitment for affected features.

### Phase 3: Implementation validation

- Execute automated authorization, calculation, transaction, and audit tests.
- Repeat a small usability test on a deployed learning increment where practical.

**Expected outcome**: evidence that implementation preserves the validated workflow and technical invariants.  
**Timeline**: during Govern increments.

## 7. Risks to Hypothesis

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Employees do not experience the assumed pain points | High | High | Interview 2–3 representative Employees before calling the problem validated |
| The root cause is policy ambiguity rather than disconnected tools | Medium | High | Ask about process, policy, balance, and approval separately |
| Three participants give overly optimistic or unrepresentative results | High | Medium | Treat outcome as directional learning and document participant context |
| Calculation explanation remains hard to understand | Medium | High | Test explanation separately and use worked examples |
| Test participants are unavailable | Medium | Medium | Keep status unvalidated; use sponsor/domain review only as a weaker evidence tier |

## 8. Stakeholder Validation

| Date | Stakeholder | Feedback | Status |
|---|---|---|---|
| 2026-08-31 | Sponsor / Lead Engineer | Approved hypothesis direction, assumptions, and learning validation plan; reduced minimum participant target from five to three. | Approved |

**Overall validation**: Stakeholder-validated.  
**Important limitation**: stakeholder approval validates the learning hypothesis and test plan; it does not validate the assumed employee problem, demand, or usability outcome.

## 9. Impact on Solution Design

If the direction is confirmed or partial, solution design should prioritize:

1. Clear employee access to leave information, request submission, and visible status.
2. Server-authoritative, explainable working-day and balance calculation.
3. Manager approval/rejection with scoped data and a clear recovery path.
4. Automated tests for authorization, concurrency, audit, and calculation rules.

If the direction is rejected, revisit the primary persona/problem, policy configuration emphasis, and the assumed value of a focused employee workflow before expanding implementation scope.

## 10. Related Artifacts

- [Signal](../../signal/signals/20260827-employee-hub-leave-management.md)
- [Context](context.md)
- [Market Research](market-research.md)
- [Domain Analysis](domain-analysis.md)
- [Technical Feasibility](technical-feasibility.md)
- [Architecture Context](architecture-context.md)
- [Personas](../domain/personas-employee-hub.md)
- [Journey J1](../domain/journey-employee-hub.md)

## 11. Enrichment Log

| Date | Trigger | Change |
|---|---|---|
| 2026-08-31 | Discovery completion | Initial learning hypothesis created from signal, discovery artifacts, and sponsor input. |
| 2026-08-31 | Stakeholder feedback | Sponsor approved the hypothesis and changed the learning-test minimum from five participants to three. |
| 2026-08-31 | Ideation completion | Approved concepts operationalize the hypothesis through explainable calculation, committed workflow tracking, and safe operational readiness; A1–A6 remain unvalidated. |

**Last Updated**: 2026-08-31  
**Updated By**: Sponsor / Lead Engineer with Dava.Flow  
**Validation Status**: STAKEHOLDER-VALIDATED
