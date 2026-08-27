# Step 2: Work Discovery

**Objective**: Run `dft task next` to discover available work and present a prioritised list to the user.

**Entry Criteria**: Step 1 complete — `.flow/govern.toml` loaded, project identity confirmed.

**Exit Criteria**: User has selected a task from the presented list.

---

## Actions

### Action 1: Run `dft task next`

Execute the CLI command from the warehouse root:

```bash
dft task next
```

This command deterministically analyses the task graph in `work/` and returns a prioritised list of available tasks. The output includes:
- Tasks ready for implementation (dependencies met)
- Tasks ready for planning (unplanned but available)
- Tasks ready for review (implementation complete)
- Tasks needing checks (consistency, completeness)

**If `dft` is not installed or not on PATH**: STOP.

```
❌ ERROR: `dft` CLI not found.

The Govern Agent requires the Dava.Flow Turbine CLI (`dft`) to discover available work.
Install it or ensure it is on your PATH.
```

**If `dft task next` returns no tasks**: Inform the user.

```
No tasks available in the govern pipeline.

Options:
- Check if there are epics to break down into tasks
- Check if explore handoff is pending
- Start an iteration planning session
```

---

### Action 2: Present Prioritised Options

Format the `dft task next` output into a clear, selectable list grouped by action type:

```
## Available Work

### 📋 Ready for Planning
[Tasks from dft output with status pending-planning]

### 🔨 Ready for Implementation
[Tasks from dft output with status pending-implementation]

### 🔍 Ready for Review
[Tasks from dft output with status pending-review]

### ✅ Ready for Check
[Tasks needing consistency/completeness checks]

Which task would you like to work on?
```

**Rules**:
- Present the `dft task next` output faithfully — do NOT re-prioritise, filter, or editorialize
- Include task IDs, titles, and any dependency/blocking information from the CLI output
- If a task has unmet dependencies, show them so the user understands sequencing

---

### Action 3: Confirm Selection

**STOP — Wait for user selection.**

The user must explicitly choose a task before proceeding. Do not suggest or assume a selection.

Once the user selects a task:
1. Record the task ID, title, and type (planning / implementation / review / check)
2. Read the task definition file to understand its scope
3. Proceed to Step 3 (Context Loading)

---

## Exit

Proceed to Step 3 (Context Loading) with the selected task.

---

## Related

- **Previous Step**: `01-session-entry.md`
- **Next Step**: `03-context-loading.md`
- **CLI Command**: `dft task next`
- **Task Location**: `work/`
