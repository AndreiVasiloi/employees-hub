+++
name = "explore.proc.usability-testing"
description = "Use this skill when you need to plan usability tests that validate design decisions with real users — testing wireframes or prototypes for findability, task success, and friction points. Activates after wireframes or prototypes are ready for testing. Also relevant when someone says 'test this with users,' 'does the design work,' or 'validate the prototype.' Does NOT create the designs being tested — use Wireframing for screen structure and User Flow Creation for interaction paths."
license = "Proprietary. See LICENSE.md"
+++

# Usability Testing

Plan and execute usability tests to validate design decisions, identify friction points, and inform iteration priorities.

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## When to Use

Use this skill when you need to:
- Validate wireframes or prototypes with real users before development
- Test findability and navigation (tree testing, first-click testing)
- Identify usability issues and friction points in key flows
- Measure task success rates and time on task
- Gather qualitative feedback on design decisions
- Prioritize design improvements based on user evidence
- Validate that IA and wireframes support top user tasks

**Key principle**: Usability testing validates design decisions with real users before development, reducing costly rework and ensuring the product supports actual user needs and mental models.

## Pre-Check

If a usability test plan already exists at `explore/explore-[slug]/usability-test-plan.md`:
1. Load the existing test plan
2. Present to the steering team: "Existing usability test plan found. Review and update, or create fresh?"
3. If updating → skip to the validation step with existing data for review
4. If creating fresh → proceed from Step 1

## Inputs to Request (if missing)

Before creating a usability test plan, ensure you have:

1. **Wireframes or prototype** - What you're testing
2. **Information Architecture** - Navigation to validate
3. **User flows** - Flows to test
4. **Personas** - Who to recruit
5. **Journey maps** - Key tasks to test
6. **Research questions** - What decisions need validation
7. **Slug** - Project identifier for file naming (e.g., `care-it`)

**STOP**: If wireframes or prototype are missing, create them first. If research questions are unclear, work with stakeholders to define what decisions need validation.

## Process Steps

| Step | File | Purpose |
|------|------|---------|
| 1 | [01-study-objective.md](./steps/01-study-objective.md) | Define study objective and scope |
| 2 | [02-research-questions.md](./steps/02-research-questions.md) | Define research questions and hypotheses |
| 3 | [03-method.md](./steps/03-method.md) | Select method and format |
| 4 | [04-participants.md](./steps/04-participants.md) | Define participant profile and recruitment |
| 5 | [05-scenarios-tasks.md](./steps/05-scenarios-tasks.md) | Create scenarios and tasks |
| 6 | [06-metrics.md](./steps/06-metrics.md) | Define metrics and data capture |
| 7 | [07-moderation-guide.md](./steps/07-moderation-guide.md) | Create moderation guide |
| 8 | [08-logistics.md](./steps/08-logistics.md) | Plan logistics and roles |
| 9 | [09-analysis-plan.md](./steps/09-analysis-plan.md) | Define analysis plan |
| 10 | [10-write-document.md](./steps/10-write-document.md) | Write usability test plan |
| 11 | [11-validation.md](./steps/11-validation.md) | Run completeness validation |

## Output Format

```
explore/design/usability-test-plan-[slug].md
```

**Template**: `templates/usability-test-plan-template.md`

**Complete Structure** (12 sections):
1. **Snapshot** - Objective, what is being tested, decisions to inform, success definition, key risks
2. **Research Questions and Hypotheses** - Questions, hypotheses with evidence
3. **Method** - Study type, format, stimulus
4. **Participants** - Profile, screening, sample size, recruitment
5. **Scenarios and Tasks** - Task structure rules, tasks with success criteria
6. **Metrics and Data Capture** - Behavioral, attitudinal, qualitative
7. **Moderation Guide** - Introduction, warm-up, task prompts, wrap-up
8. **Logistics** - Tools, roles, session checklist
9. **Analysis Plan** - Synthesis approach, severity rating, deliverables
10. **Risks and Mitigations** - Risks with mitigation strategies
11. **Approvals and Sign-off** - Owner, stakeholders, date
12. **Acceptance Criteria** - Final validation checklist

## Integration with Workflows

**Consumes**:
- **Wireframing** — Provides artifacts to test
- **Information Architecture** — Validates navigation and findability
- **User Flow Creation** — Validates task flows
- **Persona** — Informs participant recruitment
- **Journey Mapping** — Identifies key tasks to test

**Produces** (consumed by):
- **Risk Documentation** (`explore.proc.risk-documentation`) — Interaction risks, usability edge cases
- **PRD Generation** (`explore.proc.prd-generation`) — Findings inform requirements refinement (retroactive enrichment)

## Best Practices

**Do**:
- ✅ Test early with low-fidelity prototypes (cheaper to iterate)
- ✅ Use realistic scenarios, avoid leading language
- ✅ Include recovery tasks (errors, edge cases)
- ✅ Recruit participants that match target personas
- ✅ Test with 5-8 participants for directional insights
- ✅ Record sessions for later review
- ✅ Consolidate findings within 24 hours while fresh
- ✅ Prioritize issues by severity and frequency

**Don't**:
- ❌ Wait for high-fidelity designs to test (too late, too expensive)
- ❌ Use leading language in tasks ("Click the blue button")
- ❌ Only test happy paths (test errors and edge cases)
- ❌ Recruit friends and family (biased feedback)
- ❌ Test with too few participants (<5) or too many (>12 for moderated)
- ❌ Skip recording (you'll miss important details)
- ❌ Delay analysis (insights fade quickly)
- ❌ Treat all issues equally (prioritize by impact)

## Completeness Checklist

**Post-edit**: Re-run this checklist after any modification to the output artifact.

- [ ] Test plan covers all critical user flows
- [ ] Participant criteria defined and aligned with personas
- [ ] Task scenarios written without leading language
- [ ] Success metrics defined per task
- [ ] Findings separate observations from interpretations
- [ ] Recommendations prioritized by severity × frequency

## Gotchas

- ⚡ **Task scenario leading**: The agent tends to write task scenarios that hint at the expected path (e.g., "Click the menu icon to find your orders"). Task scenarios must describe the goal without revealing the path — otherwise you're testing recall, not findability.
- ⚡ **Participant recruitment bias**: The agent may define recruitment criteria that match the team's assumptions about users rather than actual user demographics. Always cross-reference recruitment criteria against persona research data, not team intuition.
- ⚡ **Severity conflation**: A usability issue that affects all users mildly (e.g., confusing label) may be more impactful than one that blocks a few users completely. The agent tends to prioritize by individual severity. Always factor in frequency × severity for prioritization.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.usability-testing:0.1.2:2026-09-01T07:11:28Z -->
