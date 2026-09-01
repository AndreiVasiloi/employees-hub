+++
name = "task-definition"
description = "Deterministic task scaffolding for dft task create — provides the default basic.toml template manifest (ADR 260418) and task.md LLM-process template for single task creation."
license = """
© 2026 Endava (UK) Limited. All rights reserved.
Endava Confidential and Proprietary. May include Endava trade secrets.
Internal reference / reusable material.
Use is restricted to authorised persons on a need-to-know basis for approved Endava or project purposes.
Do not disclose outside authorised recipients except under applicable confidentiality obligations. See the LICENSE.md file in this repository.
"""
+++

## When to use

Use this skill when you need to create a new task definition. It is automatically invoked by `dft task create` (default template) and can be used directly by LLMs following the task-definition process.

This skill is the **successor to `govern.util.task-definition`**. It adds the `templates/basic.toml` ADR 260418 manifest required by `dft task create`, and aligns the slug to the `flow.*` namespace.

## Inputs to request (if missing)

- Task title and purpose
- Epic document (if applicable)
- Source material documents with line references
- Related task dependencies (blocks, related, parent, child)
- Task ID (if not auto-assigned; use `dft task create` for deterministic allocation)
- Whether this is a new task or an update to an existing task

## Procedure

1. **Gather Task Requirements**
   - Collect task title and purpose
   - Identify source material with GitHub-style line references
   - Document task relationships and dependencies
   - Determine whether you are creating a new task or updating an existing task
   - **STOP**: Ask for clarification if information is incomplete or conflicting

2. **Create Task File Structure**
   - If creating a new task, use `dft task create "<title>"` to allocate the next ID and scaffold the directory
   - If `dft` is unavailable, create task folder manually: `work/{stage}/{TASK_ID}-{slug}/`
   - If creating a new task and no stage is specified, default to `work/01-pending-planning/{TASK_ID}-{slug}/`
   - If updating an existing task, modify the task in its current folder and preserve its current stage
   - Create or update task.md file with TOML frontmatter

3. **Complete TOML Frontmatter**
   - Fill `[metadata]` section with task details
   - Complete `[sources]` with epic and document links
   - Add `[links]` for task relationships
   - Use GitHub-style `#L` line references for sources
   - Preserve existing `[metadata].status` when updating an existing task unless a stage-owning workflow explicitly changes it

4. **Write Task Content**
   - Problem statement and goals
   - Acceptance criteria (requirements only, no implementation)
   - Non-goals and constraints
   - Context and references
   - **STOP**: Ensure no implementation details included

5. **Validate Task Definition**
   - Verify TOML structure is valid
   - Check all links are correct and accessible
   - Ensure requirements are testable
   - Confirm implementation details are excluded
   - Confirm folder stage and `[metadata].status` remain aligned

## Templates

This skill ships two templates:

| Template | Purpose |
|----------|---------|
| `templates/basic.toml` | ADR 260418 manifest — used by `dft task create` to scaffold `task.md` |
| `templates/task.md` | LLM-process template — full task.md structure for manual or LLM-assisted creation |

## Output format

Creates a single `task.md` file with TOML frontmatter:

```toml
+++
[metadata]
task_id = "DFT-0224"
title   = "My Task Title"
status  = "01-pending-planning"

[sources]
epic      = "../../../explore/epics/EPIC_ID.md"
documents = []

[links]
blocks  = []
related = []
parent  = []
child   = []
+++
```

## Integration with Workflows

This skill integrates with:
- **`dft task create`**: Provides the default `basic.toml` manifest for automated task scaffolding
- **Planning skill**: Receives task definitions for technical planning
- **Sizing skill**: Takes completed task definitions for complexity estimation
- **Iteration management**: Supports task synchronisation and updates

## Stage Handling

- New tasks default to `01-pending-planning` unless the calling workflow explicitly provides a different stage
- Existing tasks are updated in place and keep their current folder stage
- This skill does not move tasks between workflow stages

## Best Practices

- **Requirements focus**: Capture what needs to be done, not how to implement
- **Clear linking**: Use GitHub-style line references for precise source attribution
- **Implementation boundary**: Explicitly defer technical details to planning phase
- **Use `dft task create`**: Prefer the CLI for new task creation to ensure deterministic ID allocation

If you propose changes, keep them minimal and clearly scoped.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:flow.util.task-definition:0.1.1:2026-09-01T11:38:04Z -->
