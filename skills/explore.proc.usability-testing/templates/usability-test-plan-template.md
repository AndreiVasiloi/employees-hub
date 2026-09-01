+++
template_name = "Usability Test Plan Template"
version = "1.0"
output_format = "explore/design/usability-test-plan-[slug].md"
validation_required = true
+++

# Usability Test Plan: {Project Name}

**Project**: {project-name}  
**Created**: {YYYY-MM-DD}  
**Last Updated**: {YYYY-MM-DD}  
**Status**: Draft | Approved | In Progress | Complete

---

## 1. Snapshot

### Study Objective
{What this test is meant to validate or learn - e.g., "Validate that users can complete the core signup flow without assistance and understand the value proposition"}

### What is Being Tested

**Experience scope**: {Feature/product area - e.g., "User onboarding flow from landing page to first project creation"}

**Artifacts**:
- {Wireframes / Low-fi prototype / Hi-fi prototype / Live product}
- Link: {URL or file location}

**Flows and screens in scope**:
- {Flow 1 - e.g., "Sign up flow (5 screens)"}
- {Flow 2 - e.g., "First project creation (3 screens)"}
- {Flow 3 - e.g., "Navigation and findability"}

### Primary Decisions This Study Will Inform
- {Decision 1 - e.g., "Should we use tabs or side navigation for the main interface?"}
- {Decision 2 - e.g., "Is the onboarding flow too long or just right?"}
- {Decision 3 - e.g., "Do users understand the difference between 'Draft' and 'Published' status?"}

### Success Definition

**Task success rate target**: {e.g., ">80% of participants complete all critical tasks"}

**Time on task target** (if relevant): {e.g., "Complete signup in <5 minutes"}

**Critical issues threshold**: {What would block release - e.g., "No critical issues that prevent task completion"}

### Key Risks Being Tested
- **Findability risk**: {e.g., "Users cannot find the 'Create Project' action"}
- **Comprehension risk**: {e.g., "Users don't understand what 'Draft' status means"}
- **Workflow risk**: {e.g., "Users get stuck in the multi-step form"}
- **Trust or safety risk**: {e.g., "Users are unclear about data privacy"}

---

## 2. Research Questions and Hypotheses

### Research Questions
1. {RQ1 - e.g., "Can users find the 'Create Project' action from the home page within 10 seconds?"}
2. {RQ2 - e.g., "Do users understand the difference between 'Draft' and 'Published' status without explanation?"}
3. {RQ3 - e.g., "Can users recover from a validation error without moderator assistance?"}
4. {RQ4 - e.g., "Do users trust the product enough to enter real data during onboarding?"}

### Hypotheses (Optional)

**H1**: {Hypothesis - e.g., "Users will click the primary CTA on the home page within 5 seconds"}
- **Evidence that supports it**: {e.g., "CTA is prominently placed and uses action-oriented language"}
- **Evidence that disproves it**: {e.g., "Users spend >10 seconds scanning the page or click elsewhere first"}

**H2**: {Hypothesis - e.g., "Users will understand 'Draft' status without additional explanation"}
- **Evidence that supports it**: {e.g., "Status badge uses clear icon and label"}
- **Evidence that disproves it**: {e.g., "Users ask what 'Draft' means or try to publish without understanding"}

**H3**: {Hypothesis}
- **Evidence that supports it**: {What would confirm}
- **Evidence that disproves it**: {What would refute}

---

## 3. Method

### Study Type
{Select one and tailor}:
- **Moderated usability test** (remote or in-person)
- **Unmoderated usability test**
- **First-click test** (for IA or entry points)
- **Tree test** (for findability and labeling)
- **Intercept test** (if testing live product)

**Selected**: {Study type}

**Rationale**: {Why this method is appropriate for the objectives and constraints}

### Format

**Session length**: {e.g., "45-60 minutes" for moderated, "15-20 minutes" for unmoderated}

**Moderation**: {Moderated / Unmoderated}

**Location**: {Remote / In-person}

**Recording**: {Yes / No}
- Tools: {e.g., "Zoom recording, Loom, UserTesting.com"}
- Permissions: {Consent obtained, NDA if needed}

### Stimulus

**Prototype link or artifact location**: {URL or file path}

**Notes about prototype fidelity and limitations**:
- {What is clickable - e.g., "All primary navigation and form fields are functional"}
- {What is not clickable - e.g., "Secondary actions show placeholder messages"}
- {What is faked - e.g., "Form submissions show success message but don't save data"}
- {Known limitations - e.g., "Mobile view is not fully responsive"}

---

## 4. Participants

### Target Profile

**Primary participants**:
- **Role or segment**: {e.g., "Product managers at B2B SaaS companies"}
- **Experience level**: {Novice / Intermediate / Expert with similar tools}
- **Context of use**: {e.g., "Daily users who manage 5-10 projects"}
- **Devices**: {Desktop / Mobile / Tablet / All}

**Secondary participants** (if needed):
- **Role or segment**: {e.g., "Team members who collaborate on projects"}
- **Experience level**: {Novice / Intermediate / Expert}

### Screening Criteria

**Must have**:
- {Criterion 1 - e.g., "Currently works as a product manager"}
- {Criterion 2 - e.g., "Manages at least 3 projects simultaneously"}
- {Criterion 3 - e.g., "Uses project management tools at least 3x per week"}

**Must not have**:
- {Exclusion 1 - e.g., "Works for a competitor"}
- {Exclusion 2 - e.g., "Has participated in our research in the last 6 months"}
- {Exclusion 3 - e.g., "Works in UX or product design (too expert)"}

### Sample Size

**Recommended**: {e.g., "5 to 8 participants for directional usability testing"}

**If comparing variants**: {e.g., "8 to 12 participants split per variant (adjust based on risk)"}

**Actual target**: {N participants}

### Recruitment Approach

**Source**: {Internal / External / Panel / Customer list / Social media}

**Incentive** (if applicable): {e.g., "$75 Amazon gift card for 60-minute session"}

**Scheduling notes**: {e.g., "Schedule 2-3 sessions per day over 3 days"}

**Timeline**:
- Recruitment start: {YYYY-MM-DD}
- Testing dates: {YYYY-MM-DD to YYYY-MM-DD}
- Analysis complete: {YYYY-MM-DD}

---

## 5. Scenarios and Tasks

### Task Structure Rules
- Use realistic scenarios and avoid leading wording
- One task per flow outcome
- Include at least one recovery task (error, change mind, or permission limit)
- Start tasks with context, not instructions

### Scenario
{Short scenario that frames the user's goal and context - e.g., "You're a product manager who just joined a new company. You need to set up your first project to track the upcoming product launch."}

---

### Task 1: {Task Name}

**Goal**: {What the participant is trying to achieve - e.g., "Create a new project"}

**Starting point**: {Where they begin - e.g., "Home page, logged in"}

**Task prompt**: {Exact wording - e.g., "You need to create a new project called 'Q4 Product Launch'. Show me how you would do that."}

**Success criteria**: {Observable outcome - e.g., "Participant successfully creates a project with the correct name"}

**Data to capture**:
- Time to complete: {Start/end timestamps}
- Errors: {Critical / Non-critical}
- Confidence: {1-7 scale after task}
- Path: {Screens visited, clicks made}

**Expected confusion points**: {e.g., "May not see 'Create Project' button if it's in the header"}

---

### Task 2: {Task Name}

**Goal**: {What the participant is trying to achieve}

**Starting point**: {Where they begin}

**Task prompt**: {Exact wording}

**Success criteria**: {Observable outcome}

**Data to capture**:
- Time to complete
- Errors
- Confidence
- Path

**Expected confusion points**: {Where we anticipate issues}

---

### Task 3: {Task Name}

**Goal**: {What the participant is trying to achieve}

**Starting point**: {Where they begin}

**Task prompt**: {Exact wording}

**Success criteria**: {Observable outcome}

**Data to capture**:
- Time to complete
- Errors
- Confidence
- Path

**Expected confusion points**: {Where we anticipate issues}

---

### Task 4: Recovery Task (Recommended)

**Goal**: {What the participant is trying to achieve - e.g., "Recover from a validation error"}

**Starting point**: {Where they begin - e.g., "Form with intentional validation error"}

**Task prompt**: {Exact wording - e.g., "You submitted the form but got an error. Show me how you would fix it."}

**Success criteria**: {Observable outcome - e.g., "Participant identifies error, corrects it, and successfully submits"}

**Data to capture**:
- Time to complete
- Errors
- Confidence
- Path

**Expected confusion points**: {e.g., "Error message may not be clear enough"}

---

## 6. Metrics and Data Capture

### Behavioral Metrics

**Task completion**:
- Success: {Participant completes task without assistance}
- Partial: {Participant completes task with minor prompts}
- Fail: {Participant cannot complete task or requires significant help}

**Time on task** (if meaningful):
- Measure: {Start to completion time}
- Target: {e.g., "<5 minutes for signup"}

**Error rate**:
- Critical errors: {Errors that block progress}
- Non-critical errors: {Errors that slow progress but have workarounds}

**Path analysis**:
- Where users click
- Where users hesitate (>5 seconds)
- Backtracking behavior

**Assistance required**:
- None: {Completes independently}
- Minor prompts: {1-2 hints needed}
- Guided: {Requires step-by-step help}

### Attitudinal Metrics

**Single ease question** (after each task):
- Scale: 1-7 (1 = Very difficult, 7 = Very easy)
- Question: "How easy or difficult was it to complete this task?"

**Confidence rating** (after each task):
- Scale: 1-7 (1 = Not at all confident, 7 = Very confident)
- Question: "How confident are you that you completed this task correctly?"

**Post-test satisfaction**:
- {Short questionnaire - e.g., "System Usability Scale (SUS)" or custom questions}
- {Interview prompts for qualitative feedback}

### Qualitative Capture

**Quotes tied to moments**:
- Capture exact quotes with timestamps
- Note context (what they were doing when they said it)

**Observed behaviors and confusion points**:
- Hesitations (>5 seconds)
- Backtracking
- Misclicks
- Verbal confusion ("Where is...?", "What does this mean?")

**Mental model statements and terminology used**:
- How participants describe features
- What terms they use vs what we use
- Expectations vs reality

---

## 7. Moderation Guide

### Introduction (Script)

**Thank you and purpose**:
"Thank you for joining today. We're testing a new [product/feature] to make sure it works well for people like you. Your feedback will help us improve it before launch."

**Consent and recording**:
"Before we start, I need to confirm you've signed the consent form. We'll be recording this session for our team to review later. Is that okay with you?"

**This is the product being tested, not you**:
"Just to be clear, we're testing the product, not you. There are no wrong answers. If something doesn't work or is confusing, that's valuable feedback for us."

**Think aloud reminder**:
"As you go through the tasks, please think aloud. Tell me what you're looking at, what you're thinking, and what you're trying to do. This helps us understand your thought process."

**Questions before we start**:
"Do you have any questions before we begin?"

---

### Warm-up Questions

1. "Tell me about how you currently {do the task today - e.g., 'manage your projects'}."
2. "What tools or workflows do you use?"
3. "What frustrates you most about this process?"
4. "What would make this easier for you?"

---

### Task Prompts

{Use the tasks from Section 5. After each task, ask:}

**After each task**:
1. "What were you expecting to happen?"
2. "What, if anything, felt unclear or confusing?"
3. "How confident are you that you completed it correctly?" (1-7 scale)
4. "What would you do next?"

**If participant gets stuck**:
- Wait 10-15 seconds before prompting
- Use neutral prompts: "What are you thinking?" or "What are you looking for?"
- Avoid leading: Don't say "Did you see the button in the corner?"

---

### Wrap-up Questions

1. "What stood out as most useful or helpful?"
2. "What felt most confusing or risky?"
3. "If you could change one thing, what would it be?"
4. "How likely would you be to use this in your real work? Why or why not?"
5. "Is there anything else you'd like to share that we didn't cover?"

**Thank you and next steps**:
"Thank you so much for your time and feedback. This has been incredibly helpful. We'll use your insights to improve the product. [Explain incentive delivery if applicable]."

---

## 8. Logistics

### Tools

**Video call**: {Zoom / Microsoft Teams / Google Meet / Other}

**Recording**: {Tool - e.g., "Zoom cloud recording"}

**Note-taking**: {Tool - e.g., "Shared Google Doc with note template"}

**Prototype**: {Tool - e.g., "Figma prototype link"}

**Other tools**: {e.g., "Miro for affinity mapping, Dovetail for analysis"}

### Roles

**Moderator**: {Name}
- Responsibilities: Lead session, ask questions, keep on track

**Note-taker**: {Name}
- Responsibilities: Capture quotes, behaviors, timestamps, issues

**Observer(s)**: {Names - limit to 2-3 to avoid intimidating participants}
- Responsibilities: Silent observation, questions at end if time allows

**Decision maker review**: {Name and when they'll review findings}

### Session Checklist

**Before each session**:
- [ ] Prototype ready and tested on target device/browser
- [ ] Test accounts or data set prepared
- [ ] Task sheet and note template ready
- [ ] Consent and NDA handled if needed
- [ ] Recording tools tested
- [ ] Moderator and note-taker briefed

**During each session**:
- [ ] Timebox tasks (don't let participants struggle too long)
- [ ] Capture key moments and timestamps
- [ ] Avoid leading participants
- [ ] Note non-verbal cues (facial expressions, body language)

**After each session**:
- [ ] Save recording and notes
- [ ] Consolidate notes within 24 hours while fresh
- [ ] Tag issues by severity and frequency
- [ ] Update running list of patterns

---

## 9. Analysis Plan

### Synthesis Approach

**Per-task summary**:
- Success rates: {X/N participants completed successfully}
- Common failure points: {Where participants got stuck}
- Average time on task: {If measured}
- Confidence ratings: {Average score}

**Cluster issues into themes**:
- Navigation and findability issues
- Comprehension and labeling issues
- Interaction and workflow issues
- Content and messaging issues

**Map issues to screens and flows**:
- Which screens have the most issues?
- Which flows are most problematic?
- Are issues isolated or systemic?

**Identify root causes**:
- Labeling: {Unclear terms, inconsistent terminology}
- Hierarchy: {Important elements not prominent}
- Interaction: {Unclear affordances, unexpected behavior}
- Content: {Missing information, unclear instructions}

### Severity Rating

**Define severity levels**:

- **Critical**: Blocks task completion or causes harmful error
  - Example: {e.g., "Cannot submit form due to validation bug"}
  - Action: {Must fix before launch}

- **High**: Major friction or repeated confusion
  - Example: {e.g., "5/8 participants couldn't find the 'Save' button"}
  - Action: {Should fix before launch}

- **Medium**: Slows progress, workaround exists
  - Example: {e.g., "Participants expected different label but figured it out"}
  - Action: {Fix in next iteration}

- **Low**: Cosmetic or minor annoyance
  - Example: {e.g., "Participants mentioned icon is unclear but still completed task"}
  - Action: {Nice to have, backlog}

### Output Deliverables

**Findings report**: `explore/design/usability-findings-[slug].md`
- Executive summary
- Key findings by theme
- Severity and frequency of issues
- Quotes and evidence

**Recommendations**: Prioritized changes with rationale
- What to fix and why
- Suggested solutions
- Impact vs effort assessment

**Updated wireframes or prototype** (if quick wins):
- Incorporate critical and high-priority fixes
- Document what changed and why

**Timeline**: {When deliverables will be ready - e.g., "Within 3 business days of final session"}

---

## 10. Risks and Mitigations

**Risk 1**: Prototype fidelity limits realism
- **Mitigation**: {e.g., "Explain limitations upfront, focus on structure not polish"}

**Risk 2**: Participant mismatch (wrong profile recruited)
- **Mitigation**: {e.g., "Rigorous screener, backup participants on standby"}

**Risk 3**: Observers influence moderation or intimidate participants
- **Mitigation**: {e.g., "Limit observers to 2-3, keep cameras off, no interruptions"}

**Risk 4**: Technical issues disrupt sessions
- **Mitigation**: {e.g., "Test all tools beforehand, have backup plan (phone call, different tool)"}

**Risk 5**: Insufficient time for analysis
- **Mitigation**: {e.g., "Block calendar immediately after sessions, use note template for efficiency"}

---

## 11. Approvals and Sign-off

**Owner**: {Name - person responsible for test execution}

**Stakeholders**: {Names - people who need to approve plan and review findings}

**Date**: {YYYY-MM-DD}

**Approval status**: {Draft / Approved / Changes requested}

**Notes**: {Any conditions or changes requested}

---

## Acceptance Criteria

- [ ] Clear objective, scope, and decisions to inform
- [ ] Participant profile and recruitment criteria defined
- [ ] 3 to 5 realistic tasks with measurable success criteria
- [ ] Data capture plan includes behavioral and qualitative signals
- [ ] Moderation guide includes intro, tasks, and wrap-up
- [ ] Analysis plan includes severity rating and deliverables
- [ ] Logistics and roles assigned
- [ ] Risks identified with mitigations
- [ ] Stakeholder approval obtained
- [ ] Timeline defined for recruitment, testing, and analysis

---

## Related Artifacts

- **Wireframes**: `explore/design/wireframes-[slug].md`
- **Information Architecture**: `explore/design/information-architecture-[slug].md`
- **User Flows**: `explore/domain/flows-[slug].md`
- **Personas**: `explore/domain/personas-[slug].md`
- **Journey Maps**: `explore/domain/journey-[slug].md`
- **Findings Report**: `explore/design/usability-findings-[slug].md` (created after testing)

---

**Last Updated**: {YYYY-MM-DD}  
**Status**: {Draft | Approved | In Progress | Complete}

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.usability-testing:0.1.2:2026-09-01T07:11:28Z -->
