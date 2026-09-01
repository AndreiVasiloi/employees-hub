+++
template_name = "Journey Set Template"
version = "1.0"
created = "2026-08-31"
source = "Sponsor-confirmed scope and stages; current-state details inferred from Explore context"
product_context = "Employee Hub leave-management learning project"
journey_count = 1
persona_set_ref = "explore/domain/personas-employee-hub.md"
status = "current-state approved assumptions"
+++

# Journey Set: Employee Hub

**version**: 1.0  
**created**: 2026-08-31  
**source**: Sponsor-confirmed scope and stages; current-state details inferred from Explore context  
**product_context**: Employee Hub leave-management learning project  
**journey_count**: 1  
**persona_set_ref**: [Personas](personas-employee-hub.md)  
**status**: Current-state approved assumptions; future state deferred

---

## AGENT USAGE INSTRUCTIONS

- Reference journeys by journey_id (for example, J1) and actors by persona_id (P1).
- [VALIDATED] means the sponsor confirmed the journey scope, stage, or opportunity; it does not replace real-user research.
- [ASSUMPTION] means current-state detail inferred from project context; use it as a hypothesis.
- The Future State column is intentionally empty until solution design/HLD work grounds it.
- Use the assumptions list to prioritize interview or usability-research questions.
- Validation priority is High when more than 50% of current-state steps are assumptions.

---

## Journey J1: Employee Requests and Tracks Leave

**journey_id**: J1  
**persona_id**: P1  
**persona_name**: Employee  
**scenario**: Employee decides to request leave, submits it through the current available process, and learns the final outcome. [VALIDATED]  
**journey_type**: Linear with recovery decision. [ASSUMPTION]  
**entry**: Employee identifies a need for time away. [VALIDATED]  
**exit**: Employee receives a final decision or follows a recovery path for a delayed, unclear, or rejected request. [VALIDATED]  
**status**: Current-state complete; future state deferred

### Journey Map Table

| Phase | Step | Actor | Action | Thought | Emotion and cause | Goal | Touchpoints | Current-state output | Future state | Tag |
|---|---:|---|---|---|---|---|---|---|---|---|
| Identify need | 1 | Employee | Decides they need time away and considers whether to request leave. | "What is the right process, and do I have enough leave?" | Uncertain because the process and balance may not be immediately visible. | Start the request correctly. | Personal calendar; informal conversation; existing documents. | Need to find guidance. |  | [ASSUMPTION] |
| Find guidance | 2 | Employee | Looks for policy, balance, holidays, and the correct request channel. | "Which rule applies to me, and where is my current balance?" | Frustrated when information is split across spreadsheet, email, chat, or disconnected tools. | Find trustworthy information. | Spreadsheet; email; chat; shared drive; HR or manager. | Chosen channel and tentative understanding. |  | [ASSUMPTION] |
| Prepare request | 3 | Employee | Selects dates and manually considers weekends, public holidays, and remaining balance. | "How many days will count, and will this overlap with another request?" | Anxious about submitting an incorrect request or finding a short balance later. | Prepare an eligible request. | Calendar; spreadsheet; policy document; manager or HR. | Dates and request details ready. |  | [ASSUMPTION] |
| Submit and wait | 4 | Employee | Sends request through email, chat, form, or another local process, then waits. | "Was it received, who decides it, and when will I know?" | Uncertain when acknowledgement and status are absent or delayed. | Obtain a recorded request and timely decision. | Email; chat; spreadsheet; manager. | Pending request with uncertain visibility. |  | [ASSUMPTION] |
| Receive decision and recover | 5 | Employee | Learns approval, rejection, or no clear outcome; checks information or follows up with manager/HR. | "What was decided, what changed in my balance, and what should I do next?" | Relieved when clear; frustrated when delayed, unclear, or rejected without next action. | Understand outcome and recover when necessary. | Email; chat; manager; HR; spreadsheet. | Final outcome, follow-up, or resubmission path. |  | [ASSUMPTION] |

### Narrative Walkthrough

The Employee decides to take time away and needs to understand the applicable leave process. Assumed: they search across existing documents and informal channels to find balance, policy, and holiday information, then manually prepare dates before submitting through the available channel. Assumed: while waiting, a lack of reliable acknowledgement or status can make the employee unsure whether to follow up. Assumed: after a decision, the employee needs a clear explanation of the outcome and a recovery path when the request is delayed, unclear, or rejected.

### Assumptions to Validate

- [ ] Employees currently use spreadsheets, email, chat, or other disconnected channels to find leave guidance and submit requests.
- [ ] Employees need balance, policy, holiday, and working-day explanations before they submit.
- [ ] Lack of acknowledgement and visible status causes employees to chase managers or HR.
- [ ] Employees need an explicit next action after a delayed, unclear, or rejected request.
- [ ] Phone-sized browser access is important for this journey.

### Opportunities

- Provide one clear entry point for leave guidance and requests. [VALIDATED]
- Show current balance, relevant policy, and applicable holidays together. [VALIDATED]
- Calculate and explain included and excluded dates before submission. [VALIDATED]
- Use a structured request with committed confirmation and visible status. [VALIDATED]
- Show decision outcome, balance effect, and a next action; keep notification delivery separate from committed workflow status. [VALIDATED]

---

## Validation Summary

| Journey | Total Steps | Validated | Assumptions | Validation Priority |
|---|---:|---:|---:|---|
| J1: Employee Requests and Tracks Leave | 5 | 0 | 5 | High |

**Overall validation priority**: High. The journey scope, stages, and improvement opportunities are sponsor-approved, but all current-state actions, thoughts, emotions, touchpoints, and pain points need direct user validation.

## Related Artifacts

- [Personas](personas-employee-hub.md)
- [Context](../explore-employee-hub/context.md)
- [Domain Analysis](../explore-employee-hub/domain-analysis.md)
- [Technical Feasibility](../explore-employee-hub/technical-feasibility.md)

