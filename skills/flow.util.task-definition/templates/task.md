+++
[metadata]
task_id = "<task_id>"
title = "<Task Title>"
status = "<workflow_status>"  # See .flow/config.toml [workflow.stages] for valid status values
release = ""                    # Target release identifier (e.g., "DFI-001"), aligned with iteration

[sync_ids]
# Optional: Dictionary of sync IDs keyed by profile (only if they exist)
# profile_name = "sync_id"

[sources]
epic = "<path/to/epic.md>"  # Optional but typically present
documents = [
    "<path/to/source1.md#L15-25>",
    "<path/to/source2.md#L42>"
]
code = [
    "<path/to/code1.go#L100-120>",  # Specific functions or methods
    "<path/to/code2.py#L45-60>",    # Key implementation details
    "<path/to/config.yaml>"          # Configuration files
]

[links]
blocks = ["<path/to/blocker-task/task.md>"]
related = ["<path/to/related-task/task.md>", "<path/to/another-related-task/task.md>"]
parent = ["<path/to/parent-task/task.md>"]
child = ["<path/to/child-task/task.md>"]

[workflow]
defined = "<YYYY-MM-DD>"      # Date task folder was created
planned = ""                    # Date plan.md was created or task.md last updated for planning
implemented = ""                # Date task moved to implementing or pending-completion

[assignments]
definition = ""                 # Email of person who created the task folder
planning = ""                   # Email of person who created plan.md or last updated task.md
implementation = ""             # Email of person who moved task to implementing/done
+++

# Task: <Task Title>

**Task ID**: <task_id>  
**Title**: <Task Title>  
**Status**: <workflow_status>  
**Date**: <YYYY-MM-DD>  
**Epic**: <epic_name_if_applicable>  

## Problem Statement

<Brief description of what problem this task solves and why it matters. Focus on the "what" and "why", not the "how".>

## Goals & Acceptance Criteria

### Goals
<Clear, high-level objectives this task aims to achieve.>

### Acceptance Criteria
<Specific, testable outcomes that define when this task is complete. Each criterion should be:
- Observable and measurable
- Independent of implementation details
- Testable through verification or demonstration>

- [ ] <Acceptance criterion 1>
- [ ] <Acceptance criterion 2>
- [ ] <Acceptance criterion 3>

## Non-Goals

<Explicitly out-of-scope features or capabilities. This helps prevent scope creep and clarifies boundaries.>

- <Non-goal 1>
- <Non-goal 2>
- <Non-goal 3>

## Context & References

### Source Material
<Epic documents, requirements, design specs, or other source material that informed this task. Use GitHub-style line references where appropriate.>

- <Source document 1> - <Relevance>
- <Source document 2> - <Relevance>

### Related Tasks
<Tasks that are related, dependent, or provide context for this work.>

- **Blocks**: Tasks that must be completed before this one
- **Related**: Tasks with shared functionality or dependencies
- **Parent**: Tasks that this task is part of
- **Child**: Tasks that depend on this one

### Design Documents
<Relevant design documents, diagrams, or architectural decisions.>

- <Design document> - <Relevance>

## Constraints & Dependencies

### Business Constraints
<Business rules, regulatory requirements, or organizational constraints.>

- <Constraint 1>
- <Constraint 2>

### Technical Constraints
<Technical limitations, platform requirements, or architectural constraints.>

- <Constraint 1>
- <Constraint 2>

### Dependencies
<External systems, teams, or resources this task depends on.>

- <Dependency 1> - <Impact and timeline>
- <Dependency 2> - <Impact and timeline>

## Success Metrics

<How success will be measured for this task. Include both quantitative and qualitative metrics.>

- **Metric 1**: <How it will be measured>
- **Metric 2**: <How it will be measured>
- **Metric 3**: <How it will be measured>

## Notes

<Additional context, assumptions, or considerations that don't fit in other sections.>

---

**Implementation Note**: This task definition captures requirements and acceptance criteria only. Technical implementation details, design decisions, and step-by-step implementation plans should be documented in a plan.md file during the planning phase.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:flow.util.task-definition:0.1.1:2026-09-01T11:38:04Z -->
