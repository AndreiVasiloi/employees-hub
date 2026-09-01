+++
name = "workflow-check-consistency"
description = "Perform comprehensive quality and consistency checks across documentation folders, validating content quality, formatting, structural integrity, and generating actionable work plans for identified issues."
license = "Proprietary. See LICENSE.md"
+++

# Workflow: Check Consistency

Perform comprehensive quality and consistency checks across documentation folders, validating content quality, formatting consistency, structural integrity, and generating actionable work plans.

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## Purpose

- **Quality Assurance**: Ensure documentation meets high standards for clarity, accuracy, and completeness
- **Consistency Validation**: Maintain consistent formatting, structure, and cross-references across all documentation
- **Gap Identification**: Identify missing content, outdated information, and structural inconsistencies
- **Work Plan Generation**: Create actionable tasks to address identified issues

## Skills Required

- **Task Sizing** — Multi-axis complexity scoring for consistency check task sizing (Step 02)

## When to Use

Use this skill when you need to:
- Validate documentation quality across one or more repository folders
- Check for contradictions, redundancy, gaps, and clarity issues
- Validate cross-references and structural integrity
- Generate prioritized work plans for documentation improvements
- Create ad-hoc implementation tasks for identified issues

## Scope

The process can be run against one or more of the following folders:
- **docs/**: General documentation, process guides, and operational procedures
- **explore/**: Technical specifications, architectural decisions, and design documents
- **work/**: Workflow definitions, process flows, and operational procedures

## Inputs to Request (if missing)

1. **Target folders** — Which folders to analyze: docs, specification, working, or all (required)
2. **Working directory** — Must be the tooling context warehouse (required)
3. **Quality thresholds** — Minimum acceptable quality scores (optional)

## Process Modes

### Governed Mode (Default)
- Step-by-step execution with confirmation at each checkpoint
- User confirms findings before proceeding
- Best for initial consistency checks or critical documentation

### Delegated Mode
- Add `delegated` or `auto` to trigger phrase
- Auto-selects "all" folders if none specified
- Continues with available folders if some are missing
- Proceeds through all steps with minimal user interaction

## Process Execution Rules

### Critical Requirements

1. **Step-by-Step with Confirmation** — Each step must be completed and confirmed before proceeding
2. **File-by-File Processing** — During analysis steps, process files individually to prevent context overflow
3. **Working Defects File** — Create and accumulate findings in a central working defects file
4. **Skip Completed Files** — Files in `work/05-pending-release/` and `work/06-released/` are considered complete and should not be analyzed

## Process Steps

This workflow consists of 12 steps organized into 4 phases:

### Phase 1: Task Creation and Sizing (Steps 1–2)

| Step | File | Purpose |
|------|------|---------|
| 1 | [01-create-consistency-check-task.md](./steps/01-create-consistency-check-task.md) | Create session task with scope, plan, and working files |
| 2 | [02-sizing.md](./steps/02-sizing.md) | Apply multi-axis sizing framework to estimate complexity |

### Phase 2: Documentation Folder Analysis (Steps 3–5)

| Step | File | Purpose |
|------|------|---------|
| 3 | [03-folder-selection-and-context-loading.md](./steps/03-folder-selection-and-context-loading.md) | Select folders, validate existence, load context |
| 4 | [04-docs-content-quality-analysis-file-by-file.md](./steps/04-docs-content-quality-analysis-file-by-file.md) | File-by-file content quality analysis of docs/ |
| 5 | [05-docs-format-structure-validation.md](./steps/05-docs-format-structure-validation.md) | Format, structure, and navigation validation for docs/ |

### Phase 3: Specification Folder Analysis (Steps 6–8)

| Step | File | Purpose |
|------|------|---------|
| 6 | [06-specification-content-review.md](./steps/06-specification-content-review.md) | Technical accuracy, completeness, and terminology review |
| 7 | [07-specification-cross-reference-validation.md](./steps/07-specification-cross-reference-validation.md) | Cross-reference validation within and across folders |
| 8 | [08-specification-format-consistency.md](./steps/08-specification-format-consistency.md) | Format consistency, document structure, version management |

### Phase 4: Working Folder Analysis (Steps 9–12)

| Step | File | Purpose |
|------|------|---------|
| 9 | [09-workflow-process-validation.md](./steps/09-workflow-process-validation.md) | Process completeness, execution, and consistency validation |
| 10 | [10-workflow-interprocess-consistency.md](./steps/10-workflow-interprocess-consistency.md) | Cross-folder reference, terminology, and integration validation |
| 11 | [11-work-plan-generation.md](./steps/11-work-plan-generation.md) | Consolidate issues, generate work plan, create ad-hoc tasks |
| 12 | [12-complete-process.md](./steps/12-complete-process.md) | Move session task to done, verify deliverables |

**Conditional Steps**: Steps 4–5 run only if docs/ is selected. Steps 6–8 run only if explore/ is selected. Steps 9–10 run only if work/ is selected. Steps 11–12 always run.

## Quality Checks Performed

### Content Quality
- **Contradictions**: Conflicting statements within and across documents
- **Redundancy**: Duplicate content and overlapping information
- **Gaps**: Missing information, incomplete sections, orphaned references
- **Clarity**: Readability, technical accuracy, and completeness

### Format Consistency
- **Index Files**: All folders have up-to-date index files
- **Markdown Structure**: Consistent heading levels, formatting, and style
- **Cross-References**: Valid internal links and process references
- **File Organization**: Proper file naming and folder structure

### Structural Integrity
- **Document Hierarchy**: Parent-child relationships between documents
- **Process Links**: Valid and current process references
- **Navigation**: Users can navigate between related documents
- **Metadata**: Consistent front matter and document properties

## Outputs

- **Session task** in `work/04-implementing/` with task.md, plan.md, size.md
- **Working defects file** with accumulated findings from file-by-file analysis
- **Quality scores** per folder and overall (0–10 scale)
- **Ad-hoc implementation tasks** (up to 3, one per folder) with complete task.md, plan.md, size.md
- **Optional cross-folder integration task** if cross-folder issues exist

## Issue Classification

| Severity | Criteria |
|----------|----------|
| **Critical** | Blockers that prevent documentation use |
| **High** | Significant quality or consistency issues |
| **Medium** | Minor inconsistencies or improvements |
| **Low** | Nice-to-have enhancements |

## Quality Gates

- [ ] All target folders analyzed using file-by-file approach
- [ ] Working defects file created and populated with findings
- [ ] Quality scores calculated for each folder
- [ ] Cross-file contradictions and redundancies identified
- [ ] Work plan generated with prioritized issues
- [ ] Ad-hoc implementation tasks created (up to 3) if issues found
- [ ] Consistency check session task moved to completed

## Integration with Workflows

**Integrates with**:
- **Task Planning** — For creating properly structured improvement tasks
- **Task Sizing** — For estimating complexity of identified issues
- **Task Review** — For validating proposed fixes
- **Process Breakdown** — For updating process documentation

## Best Practices

**Do**:
- ✅ Process files individually to avoid context limits
- ✅ Accumulate findings in the working defects file
- ✅ Apply the quality rubric consistently to every file
- ✅ Skip completed files in `work/05-pending-release/` and `work/06-released/`
- ✅ Create one comprehensive task per folder (not per issue)
- ✅ Present findings at each checkpoint for user confirmation

**Don't**:
- ❌ Read all files at once (causes context overflow)
- ❌ Skip the file-by-file analysis approach
- ❌ Create more than 3 implementation tasks (one per folder)
- ❌ Proceed past checkpoints without confirmation in governed mode
- ❌ Analyze completed files in `work/05-pending-release/` or `work/06-released/`

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:flow.proc.workflow-check-consistency:0.1.2:2026-09-01T11:38:02Z -->
