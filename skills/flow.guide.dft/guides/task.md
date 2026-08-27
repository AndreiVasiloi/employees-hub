# dft task

Task helpers for workflow management. Maps dependencies, suggests next tasks, and claims work.

## Commands

| Command | Type | Purpose |
|---------|------|---------|
| `dft task next` | Read-only | Suggest next task based on dependency graph and workflow state |
| `dft task map` | Read-only | Visualise task dependency graph |
| `dft task claim <task-id>` | Mutating | Claim a task to begin work on it |

## `dft task next`

Deterministic task suggestion. Analyses the task graph in `govern/working/` and returns a prioritised list based on:
- Dependency readiness (all upstream tasks complete)
- Workflow state (which bucket the task is in)
- No LLM heuristics — output is fully deterministic

**Usage**: `dft task next`

## `dft task map`

Displays the full task dependency graph. Useful for understanding blocking relationships.

**Usage**: `dft task map`

## `dft task claim <task-id>`

Records that a person or pair has claimed a task. Updates the warehouse task state.

**Usage**: `dft task claim NCPT-0042`

**Safety**: Mutating — ensure you intend to work on the claimed task.

## Deeper Documentation

```bash
dft task --llm
```
