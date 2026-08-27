# Step 4: Workflow Execution

**Objective**: Delegate to the appropriate `govern.proc.*` skill and monitor execution to completion.

**Entry Criteria**: Step 3 complete — guides loaded, workflow skill installed, task selected.

**Exit Criteria**: The delegated workflow skill has completed all its steps and produced its output artifacts.

---

## Actions

### Action 1: Prepare Delegation Context

Before handing off, assemble the context package that the workflow skill will receive:

1. **Task definition** — the full task file from `work/`
2. **Loaded guides** — the concern-matched guides from Step 3
3. **Project identity** — compact reference from `.flow/govern.toml` (project name, stack, domain model)
4. **Canonical sources** — paths from `[canonical_sources]` in config, so the workflow skill can navigate the Enterprise Warehouse

Present the delegation summary:

```
Delegating to: [skill-slug]
Task:          [NCPT-XXX] [Task Title]
Context:       [N] guides loaded, [M] canonical source paths available

Starting [skill-slug] Step 1...
```

---

### Action 2: Load and Execute Workflow Skill

Follow the standard skill loading protocol from AGENTS.md:

1. Read the workflow skill's `SKILL.md`
2. Read its `flow.toml` for any additional dependencies
3. Load dependencies if specified
4. Begin with Step 1 of the workflow skill
5. Execute step-by-step, following the workflow skill's own step execution rules

**The Govern Agent steps back during execution.** The workflow skill drives the session. The Govern Agent re-engages only when:
- The workflow skill completes (all steps done, exit criteria met)
- The workflow skill encounters a fatal error it cannot resolve
- The user explicitly requests to abort or switch tasks

---

### Action 3: Monitor Completion

When the workflow skill signals completion:

1. Confirm all output artifacts exist at their expected locations
2. Record which artifacts were produced:

```
Workflow complete: [skill-slug]

Artifacts produced:
  ✓ [artifact-1 path]
  ✓ [artifact-2 path]
  ✓ [artifact-3 path]

Proceeding to validation.
```

**If the workflow skill fails or is aborted**:

```
⚠️ Workflow [skill-slug] did not complete.

Reason: [error or user abort]

Options:
  - Resume the workflow from where it stopped
  - Return to Step 2 to select a different task
  - End the Govern session
```

---

## Exit

Workflow skill has completed and produced artifacts. Proceed to Step 5 (Validation).

---

## Related

- **Previous Step**: `03-context-loading.md`
- **Next Step**: `05-validation.md`
- **Config Section**: `[workflows]`
