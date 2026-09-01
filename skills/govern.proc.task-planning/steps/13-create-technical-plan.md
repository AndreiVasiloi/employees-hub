# Create Technical Plan

Consolidate all interim artifacts from `work/` folder into plan.md using the task-planning skill template.

## Objective

Create a comprehensive technical implementation plan (plan.md) by consolidating all interim artifacts created during planning steps 3-12. The plan.md serves as the single source of truth for implementation.

**Important**: Technical details belong in plan.md, NOT in task.md. Task.md remains product-readable requirements only.

## Entry Criteria

- [ ] Steps 01-12 completed with all interim artifacts created
- [ ] Task.md contains product-readable requirements (TOML frontmatter + body)
- [ ] Working folder contains interim artifacts:
  - `work/03-problem.md` — Problem statement, stakeholders
  - `work/04-goals.md` — Goals, constraints, non-goals
  - `work/05-research.md` — Decision inventory, related tasks
  - `work/07-technical-approach.md` — Technical decisions, approach
  - `work/08-pipeline-tests.md` — Pipeline test requirements
  - `work/09-architecture.md` — Architectural context diagram
  - `work/10-acceptance-criteria.md` — Testable acceptance criteria
  - `work/11-risks.md` — Risk assessment, dependencies
  - `work/12-sequencing.md` — Implementation phases

## Exit Criteria

- [ ] plan.md created in work/02-planning/{TASK_ID}-{slug}/
- [ ] plan.md populated with content from all work/* artifacts
- [ ] All technical decisions properly documented in plan.md
- [ ] Plan.md serves as complete implementation guide
- [ ] plan.md committed to planning branch

## Actions

### Consolidate Working Artifacts

Read and consolidate content from each interim artifact:

| Working Artifact | Plan.md Section |
|------------------|-----------------|
| `work/03-problem.md` | Overview, Task Definition Reference |
| `work/04-goals.md` | Task Definition Reference (key requirements) |
| `work/05-research.md` | Related Work (decisions, tasks, docs) |
| `work/07-technical-approach.md` | Technical Approach, Component Changes, Dev Hints |
| `work/08-pipeline-tests.md` | Test Inventory → Pipeline Tests |
| `work/09-architecture.md` | Technical Approach (diagram), Integration Points |
| `work/10-acceptance-criteria.md` | Test Inventory (derived from AC) |
| `work/11-risks.md` | Risk Assessment, Technical Dependencies |
| `work/12-sequencing.md` | Implementation Strategy (phases) |

### Quality Assurance

Verify that:
- All content from work/* artifacts is in plan.md
- No technical decisions are missing
- All links and references are correct
- Plan.md is implementation-ready
- Task.md remains product-readable (no technical details)

## 💬 If GOVERNED Mode

- **Stop**
- Display > ## 💬 Discussion Point
- Present technical plan for review:
  - "Input completeness: Do we have all required information from the planning steps to create a comprehensive plan?"
  - "Plan structure: Does the plan.md include all necessary sections?"
  - "Technical completeness: Are all implementation decisions properly documented in the plan?"
  - "Implementation readiness: Is the plan.md sufficient for developers to start implementation?"
- Wait for confirmation before continuing execution.

### Mid-Session Check Prompt
```
I've completed the technical plan consolidation. Current progress:
- [Summary of technical details gathered during planning]
- [Key technical decisions made in steps 5-12]

**Planning Results:**
- [Problem statement and goals from task.md]
- [Technical approach and architecture decisions]
- [Test inventory and pipeline requirements]
- [Risk assessment and dependencies]
- [Complete plan.md created with all technical details]

Ready to proceed to Step 14 (Sizing) or do you need adjustments to the technical plan?
```

## 🤖 If DELEGATED Mode

- Apply the following heuristic
- **Consolidate planning details**: Gather all technical information from steps 5-12
- **Completeness validation**: Confirm no planning details are omitted
- **Quality check**: Ensure plan.md meets all quality standards
- Proceed to Step 14 after plan.md created

## Quality Checks

- [ ] All required inputs validated and present
- [ ] Plan.md created in correct location
- [ ] All technical decisions from planning steps included
- [ ] Problem analysis and goals properly documented
- [ ] Architecture decisions and component changes detailed
- [ ] Test requirements and pipeline needs specified
- [ ] Risk assessment and dependencies documented
- [ ] Implementation sequencing and phases defined
- [ ] All links and references are valid
- [ ] Plan.md serves as complete implementation guide
- [ ] Task.md remains product-readable (no technical details)
- [ ] Changes committed to planning branch

## Common Pitfalls

- **Missing inputs**: Proceeding without all required planning information
- **Incomplete consolidation**: Not capturing all technical decisions from planning steps
- **Broken references**: Links or cross-references that don't resolve
- **Poor organization**: Plan.md not structured for easy implementation
- **Adding technical details to task.md**: Technical details belong in plan.md only

## Tips

- Consolidate all technical details gathered during steps 5-12
- Verify all links and references before committing
- Keep the plan.md focused on implementation guidance
- Ensure the plan is readable and actionable for developers
- Keep task.md product-readable — technical details go in plan.md

## Integration Notes

This step bridges the gap between planning research/analysis and implementation:
- **Before**: Technical details gathered during planning steps (not in task.md)
- **After**: Plan.md provides structured implementation guide with all technical details
- **Next**: Step 14 (Sizing) can use the completed plan for complexity estimation

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-planning:0.2.0:2026-09-01T12:25:50Z -->
