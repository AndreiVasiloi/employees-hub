---
version: 1.0
created: 2026-09-01
last_updated: 2026-09-01
status: approved plan; not yet executed
product_context: Employee Hub leave-management learning project
participant_target: 3 directional sessions
---

# Usability Test Plan: Employee Hub

**Project**: Employee Hub  
**Created**: 2026-09-01  
**Last Updated**: 2026-09-01  
**Status**: Approved plan; sessions and user evidence pending

---

## 1. Snapshot

### Study Objective

Validate whether representative users can find, understand, and safely complete the approved low-fidelity leave workflows without moderator guidance. This study produces directional learning evidence; it does not validate the broad product problem, demonstrate production readiness, or substitute for security/authorization testing.

### What is Being Tested

**Experience scope**: Employee and Manager leave workflows, HR findability, shared navigation, and recovery states.

**Artifacts**:

- Approved [wireframe blueprint](wireframes-employee-hub.md).
- A future clickable low-fidelity prototype derived from S01-S10.
- Static walkthrough fallback only when explicitly labelled as lower-confidence evidence.

**Flows and screens in scope**:

- F1: plan and submit leave — S01-S04.
- F2: track and cancel eligible leave — S05-S07.
- F3: review and decide a request — S08-S10.
- Cross-cutting: Home, sidebar/collapsed icons, phone-sized drawer, validation, readiness, stale-result, and denied recovery.
- HR findability probe: S11-S14.

Administrator/security flows and F4-F9 are not representative-user tested in this initial three-participant pilot.

### Primary Decisions This Study Will Inform

- Whether core leave work is findable from Home, My Leave, Team, and compact navigation.
- Whether calculation, balance, status, receipt, and cancellation explanations are understandable.
- Whether Managers can decide with the proposed privacy-safe context.
- Whether recovery states avoid false-success and duplicate-action expectations.
- Whether Employee/HR navigation labels and readiness relationship make sense.

### Success Definition

**Task success rate target**: At least 80% unaided success across core-task attempts. With a 2-3 participant pilot, every attempted core task must complete unaided to meet this target.

**Time on task target**: Record timing and outliers; no strict time threshold is set for this small low-fidelity study.

**Critical issues threshold**: No issue may cause an incorrect leave submission, duplicate command, false success belief, unauthorized-data expectation, or inability to use a safe recovery route.

### Key Risks Being Tested

- **Findability risk**: users cannot find a core task, collapsed icon, or phone drawer destination.
- **Comprehension risk**: users misunderstand calculation, balance effect, status, notification, or cancellation eligibility.
- **Workflow risk**: validation, stale state, or recovery causes abandonment or duplicate actions.
- **Trust or safety risk**: Manager context feels insufficient or exposes more information than expected.

---

## 2. Research Questions and Hypotheses

### Research Questions

1. Can Employees find and start a leave request from Home, My Leave, and compact navigation without guidance?
2. Can Employees understand counted/excluded dates, balance effect, and Pending status before submitting?
3. Can Employees find a previous request, determine cancellation eligibility, and recover from an ineligible or changed state?
4. Can Managers find assigned approvals, use available Team context, and make one decision without seeking sensitive data?
5. Can users safely recover from validation, readiness, stale-result, and denied states without believing a duplicate command occurred?

### Hypotheses

| ID | Proposition | Design support | Disproving evidence |
|---|---|---|---|
| H1 | Goal-based navigation makes core leave tasks findable. | Approved Home, Request leave, My leave, Team labels; persistent/compact navigation. | Hesitation, unrelated first clicks, or moderator prompting to begin. |
| H2 | Server-produced calculation and balance explanation are understandable before submission. | S02-S03 display breakdown, balance effect, and not-submitted context. | Participant confuses preview with commitment or cannot explain expected result. |
| H3 | Status, receipt, and eligibility gating support safe self-service. | S04/S07 separate status and notification delivery and show receipt/history. | Participant cannot find request, misreads status, or expects unavailable cancellation. |
| H4 | Managers can decide with privacy-safe context. | S08-S10 provide assigned work and availability but omit reasons/full balance history. | Manager cannot decide or repeatedly asks for omitted sensitive details. |
| H5 | Explicit recovery states prevent dangerous misunderstanding. | Inline errors, Error Summary, stale/conflict, status check, and safe retry routes. | Participant believes failed/uncertain action succeeded or retries as if duplication were safe. |

---

## 3. Method

### Study Type

**Selected**: Moderated remote usability test with embedded first-click observations.

**Rationale**: A small moderated study exposes findability, comprehension, recovery, and trust issues more clearly than an unmoderated questionnaire. First-click observations test Home and compact navigation without running a separate study.

### Format

- **Session length**: 45 minutes per participant.
- **Moderation**: neutral task-based think-aloud; help is withheld until task status is recorded.
- **Location**: remote.
- **Recording**: consented screen/audio recording through Microsoft Teams or an approved equivalent. Participants may decline or withdraw recording.

### Stimulus

- **Location**: [wireframe blueprint](wireframes-employee-hub.md); clickable low-fidelity prototype to be created from S01-S10 before sessions.
- **Clickable scope**: primary navigation, core task paths, form states, status/recovery routes.
- **Faked behaviour**: fictional data and simulated results only; no persistence, real employee, security, or provider integration.
- **Limitations**: any static handoff is labelled to participants and analysed as lower-confidence interaction evidence; visual styling is deliberately absent.

---

## 4. Participants

### Target Profile

| Participant | Required experience | Context/device |
|---|---|---|
| Employee | Requested leave through any workplace process in the previous 12 months. | Desktop; include a phone-sized browser test where possible. |
| Manager | Approved/rejected leave for direct reports in the previous 12 months. | Desktop primary. |
| HR / People Operations | Maintained employee, leave, holiday, balance, or policy information. | Desktop primary. |

Administrator/security work remains explicitly untested in this first study.

### Screening Criteria

**Must have**:

- Current experience of an organization leave-request or approval process.
- Willingness to evaluate fictional prototype data and share candid feedback.
- At least one participant who routinely uses a phone-sized browser for workplace tasks.
- A mix of familiarity with formal HR systems where recruitment allows.

**Must not have**:

- Direct contribution to Employee Hub or prior detailed knowledge of its navigation.
- Requirement to use or disclose real employee data.
- Recruitment based solely on close friends/family convenience.

### Sample Size

- **Recommended by the skill**: 5-8 for directional testing.
- **Actual approved target**: 3 sessions, one per Employee, Manager, and HR profile.
- **Evidence limitation**: results are directional only; expand to five participants when feasible before making stronger usability claims.

### Recruitment Approach

- **Source**: volunteers outside the Employee Hub delivery group, such as independent colleagues or professional contacts with relevant experience.
- **Incentive**: none assumed; optional only if separately approved.
- **Scheduling**: select role-relevant tasks; do not recruit direct reports of the moderator.
- **Timeline**: recruitment starts within two business days after prototype readiness; sessions run in the following five business days; synthesis completes within two business days of the last session.

---

## 5. Scenarios and Tasks

### Task Structure Rules

- Use realistic goals, never labels or navigation instructions.
- One task measures one primary flow outcome.
- Include recovery behaviour and record task status before help.
- Use fictional scenarios and non-leading wording.

### Scenario

Employee Hub is a fictional workplace leave-management application. Participants should imagine ordinary work responsibilities and use the prototype as they would a real tool; no real people, leave records, or security data are involved.

### T1 — Check and prepare a new leave request

**Goal**: Determine whether time away can be requested and proceed to the point of submission.

**Starting point**: Home; one session begins with collapsed sidebar or phone drawer.

**Task prompt**: “Imagine you want to take three days away next month. Please use this as you normally would to check whether that time can be requested, then go as far as you would before making the request.”

**Success criteria**: Participant finds request entry, enters type/dates, reaches calculation review, and explains that the request is not yet submitted.

**Data to capture**: first click, path, time, wrong turns, calculation/status interpretation, assistance, ease, confidence.

**Expected confusion points**: Request leave versus My leave; compact navigation; preview versus committed status.

### T2 — Find and withdraw an eligible request

**Goal**: Understand an existing request and take the appropriate cancellation action.

**Starting point**: Home or My Leave with a fictional eligible request.

**Task prompt**: “You made a request earlier and now need to understand where it stands. Please find it and show what you would do if you no longer needed the time away.”

**Success criteria**: Participant finds request, interprets status, identifies cancellation eligibility, and reaches cancellation confirmation/current result.

**Data to capture**: path, status interpretation, cancellation expectation, time, assistance, ease, confidence.

**Expected confusion points**: locating history, difference between notification and business status, eligibility wording.

### T3 — Recovery task: respond to an unavailable request

**Goal**: Recover safely after an eligibility/readiness or changed-state message.

**Starting point**: Request flow at a fictional unavailable state.

**Task prompt**: “You see this message after choosing the time you wanted. What would you do next?”

**Success criteria**: Participant explains message in their own words and takes a safe correction, support, refresh, or return route without believing a request was created.

**Data to capture**: interpretation, next action, duplicate-action expectation, assistance, ease, confidence.

**Expected confusion points**: readiness versus validation, safe retry, support destination, false success.

### T4 — Decide a team leave request

**Goal**: Make one informed Manager decision.

**Starting point**: Home or notification with one assigned Pending request.

**Task prompt**: “A request from someone on your team needs a decision. Please review what is available and make the decision you think is appropriate. Talk through anything you would want to know first.”

**Success criteria**: Participant finds assigned work, uses available context when needed, chooses/confirm one decision, and understands the result.

**Data to capture**: first click, requested missing information, privacy concern, path, time, assistance, ease, confidence.

**Expected confusion points**: Pending Approvals findability, Team Availability return, decision consequence, need for sensitive detail.

### T5 — Find HR setup/readiness starting point

**Goal**: Identify how to prepare a fictional colleague for functioning leave operations.

**Starting point**: Home with role-aware navigation.

**Task prompt**: “A new fictional colleague needs to be set up so leave can work correctly. Show where you would begin and what you would check before considering the setup ready.”

**Success criteria**: Participant finds an appropriate Employee or readiness route and identifies relevant relationships/configuration without unrelated navigation.

**Data to capture**: first click, path, terminology interpretation, missing information, assistance, ease, confidence.

**Expected confusion points**: Employee setup versus Leave Readiness, Team/Manager relationship, breadth of Administration.

---

## 6. Metrics and Data Capture

### Behavioral Metrics

- **Completion**: Success = unaided; Partial = safe intermediate outcome or minor clarification; Fail = cannot complete, unsafe/wrong outcome, or guided help.
- **Time**: prompt completed to participant-declared completion, including pauses.
- **First click and path**: destination, screens, backtracking, repeated action, and recovery use.
- **Errors**: Critical = duplicate command, false success belief, privacy/safety misunderstanding, or abandonment; Non-critical = hesitation, detour, terminology confusion, or recoverable wrong turn.
- **Assistance**: None; neutral prompt repeat; minor clarification; guided help.

### Attitudinal Metrics

After each assigned task:

- Ease: “Overall, how easy or difficult was this task?” on 1 (very difficult) to 7 (very easy).
- Confidence: “How confident are you that the outcome is what you intended?” on 1 (not confident) to 7 (very confident).

At wrap-up: most clear, least clear, expected real-life next step, and trust in a real leave request/decision.

### Qualitative Capture

- Participant code, role, task ID, timestamp/prototype state, exact quote where possible, observed behaviour, and stated mental model.
- Notes must separate observation from later interpretation and recommendation.
- Record hesitations, backtracking, repeated clicks, verbal confusion, terminology, and expectation-versus-reality statements.
- Consented recordings are reference evidence; all notes use fictional data only.

---

## 7. Moderation Guide

### Introduction Script

“Thank you for taking part. We are testing an early fictional Employee Hub prototype, not testing you. There are no right or wrong answers; what feels clear or unclear is valuable. The prototype uses fictional data and some interactions are simplified. With your permission, we will record screen and audio only to support accurate notes. You may stop recording or end the session at any time. Please say what you are looking for and what you expect to happen. Do you have any questions before we start?”

### Warm-up Questions

1. “How do you currently request or manage time away from work?”
2. “What usually makes that process easy or difficult?”
3. “Have you approved leave or maintained leave-related information? What mattered most?”
4. “Which device would you normally use for this kind of task?”

### Task Prompts and Facilitation

Use T1-T5 prompts exactly as written. Employee: T1-T3; Manager: T1 or T3 when time permits, then T4; HR: T5 plus T1 or T3 when time permits.

After each task ask what was expected, what was unclear, ease (1-7), and confidence (1-7).

When stuck, wait 10-15 seconds, then use only “What are you thinking?”, “What would you expect to happen next?”, or “Please keep talking as you look around.” If blocked, ask whether to continue with a hint or move on; record the block before helping. Do not name a label, icon, or intended route and do not defend the design.

### Wrap-up Questions

1. “What felt most useful?”
2. “What felt most confusing, risky, or uncertain?”
3. “If you could change one thing, what would it be?”
4. “Would you trust this for a real leave request or approval? Why or why not?”
5. “Is there anything you expected to find that was missing?”

Close by thanking participant, explaining that feedback will improve the fictional prototype, and reminding them of their recording-withdrawal option.

---

## 8. Logistics

### Tools

| Need | Plan |
|---|---|
| Video call | Microsoft Teams or organization-approved equivalent. |
| Recording | Consented screen/audio recording in the meeting tool. |
| Prototype | Clickable low-fidelity Figma prototype derived from S01-S10; static blueprint fallback. |
| Notes | Timestamped Markdown notes with participant codes only. |
| Analysis | Context Warehouse issue-and-evidence table; no external repository required. |

### Roles

- **Moderator**: Andrei — Product Manager; reads prompts, maintains neutral facilitation, and timeboxes session.
- **Note-taker / technical observer**: Sponsor / Lead Engineer; captures timestamped evidence without interrupting.
- **Observers**: none by default; at most one silent observer when necessary.
- **Findings review**: Andrei and Sponsor / Lead Engineer before any wireframe, flow, IA, or PRD change.

Both named session facilitators contributed to the design. The script, silent observation, and observation/interpretation separation mitigate confirmation bias but do not eliminate it.

### Session Checklist

**Before**: prototype/starting/recovery states tested; fictional-data banner visible; consent/recording choice confirmed; task and note sheet ready; role-relevant tasks selected.

**During**: read exact prompts; timebox; capture first click/path/time/assistance/quote/rating; use neutral prompts; expose no real employee/security data; mark blocked before hint.

**After**: store recording in agreed access-controlled location; save coded notes; consolidate within 24 hours; tag issue severity/frequency; update running pattern list.

---

## 9. Analysis Plan

### Synthesis Approach

Within 24 hours of each session, complete coded task records. After the final session, summarize task success/partial/fail, time range, ease/confidence range, first clicks, assistance, and failure points. Cluster navigation/findability, calculation/status comprehension, recovery/interaction, content/terminology, and privacy/trust themes. Map each issue to task, flow, screen, pattern, and PRD requirement; identify likely label, hierarchy, content, interaction, state, or missing-information root cause.

Frequency is directional: one of three is a signal to inspect; two of three is recurring; three of three is a strong directional signal. It does not establish population prevalence.

### Severity Rating

| Severity | Meaning | Action |
|---|---|---|
| Critical | Blocks core task or could cause duplicate command, false success, privacy/safety misunderstanding, or harmful decision. | Fix before affected implementation planning; retest. |
| High | Major friction or repeated unsafe confusion. | Resolve before affected epic is Ready; retest if practical. |
| Medium | Progress slows but safe workaround exists. | Prioritize next wireframe/prototype iteration. |
| Low | Minor clarity/presentation concern without material task impact. | Record for later backlog review. |

Priority considers severity and frequency; widespread mild friction can outrank severe one-off friction.

### Output Deliverables

- Planned findings report at `explore/design/usability-findings-employee-hub.md`, produced within two business days after the last session.
- Prioritized recommendations with evidence, rationale, affected artifact, and proposed owner.
- Approved quick-win updates to wireframes, flows, IA, or PRD only after findings review.
- Risk and decision updates carried to risk/HLD work.

---

## 10. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Low-fidelity prototype limits realism. | Explain limits, test structure/understanding, and label static interactions as lower-confidence evidence. |
| Three participants are below recommended directional sample. | Label results directional; expand toward five when feasible; do not make broad usability claims. |
| Participant mismatch or recruitment bias. | Use role-specific screener; recruit outside delivery group; avoid direct reports and convenience-only friends/family. |
| Moderators confirm their own design assumptions. | Use exact prompts, neutral probes, silent observer, recordings, and observation/interpretation separation. |
| Technical disruption. | Test prototype/recording; have static fallback and approved meeting alternative. |
| Sensitive data enters study. | Use visible fictional-data notice, synthetic fixtures, participant codes, and access-controlled recordings. |
| Findings are not acted on. | Findings review with Andrei and Sponsor / Lead Engineer before affected work proceeds. |

---

## 11. Approvals and Sign-off

| Role | Person | Status | Date |
|---|---|---|---|
| Product Manager / Moderator | Andrei | Approved plan | 2026-09-01 |
| Architect | Andrei | Approved plan | 2026-09-01 |
| Lead Engineer / Sponsor / Note-taker | Initiative owner | Approved plan | 2026-09-01 |

**Condition**: Approval covers the study plan only. The plan is not evidence that usability sessions, participant recruitment, consent, or prototype preparation have occurred.

---

## 12. Acceptance Criteria

- [x] Objective, scope, decisions, success definition, and risks are explicit.
- [x] Research questions and evidence criteria are defined.
- [x] Moderated method, 45-minute format, and stimulus limitations are documented.
- [x] Participant profiles, screening, directional sample limit, recruitment, and relative timeline are defined.
- [x] Five non-leading tasks include measurable success and a recovery task.
- [x] Behavioral, attitudinal, and qualitative data capture is defined.
- [x] Moderation guide, logistics, roles, and session checklist are included.
- [x] Synthesis, severity, deliverables, risks, and mitigations are defined.
- [x] Stakeholder approval of the plan is recorded.

---

## Related Artifacts

- [Wireframes](wireframes-employee-hub.md)
- [Information Architecture](information-architecture-employee-hub.md)
- [User Flows](../domain/flows-employee-hub.md)
- [Personas](../domain/personas-employee-hub.md)
- [Journey map](../domain/journey-employee-hub.md)
- [PRD](../prds/employee-hub-prd.md)
- Planned findings report: `explore/design/usability-findings-employee-hub.md`

**Last Updated**: 2026-09-01  
**Status**: Approved plan; sessions and user evidence pending
