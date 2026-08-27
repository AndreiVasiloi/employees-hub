# Step 3 — Integrations

## Objective

Configure sync connection profiles for external tools (JIRA, Miro) and establish per-phase workflow stage bindings. Both sync profiles and workflow bindings are independently deferrable.

## Entry Criteria

- Step 2 (Skills Check) is complete or deferred
- `ADR 260417-phase-workflow-binding-config` defines the `.flow/{phase}.toml` schema (reference: `explore/decisions/260417-phase-workflow-binding-config.md`)

## Actions

### 3.1 Sync Connection Profiles

Present the integration menu:

> "Would you like to configure any sync integrations now?"
>
> | Option | Description |
> |--------|-------------|
> | **JIRA** | Sync tasks with a JIRA project |
> | **Miro** | Sync boards with a Miro workspace |
> | **Skip** | Configure later — say "Setup JIRA" or "Setup Miro" at any time |

Handle each integration independently:

#### JIRA

If the user selects JIRA:
- Load `flow.proc.config-jira` and follow its steps
- The sub-skill guides the user through credential location and registers the profile in `.flow/config.toml` via `dft config set-secret`
- Return here after `flow.proc.config-jira` completes

If skipped:
- Note in deferred list: "3.1 JIRA Sync Profile — say 'Setup JIRA' or load flow.proc.config-jira"

#### Miro

If the user selects Miro:
- Load `flow.proc.config-miro` and follow its steps
- The sub-skill guides credential location and registers the profile via `dft config set-secret`
- Return here after `flow.proc.config-miro` completes

If skipped:
- Note in deferred list: "3.1 Miro Sync Profile — say 'Setup Miro' or load flow.proc.config-miro"

---

### 3.2 Per-Phase Workflow Bindings

> ℹ️ Workflow bindings define which tasks sync to which external systems at each workflow stage, on a per-phase basis. They are stored in `.flow/{phase}.toml` (one file per Dava.Flow phase). The schema is defined in `ADR 260417`.

Ask:
> "Would you like to configure workflow bindings for any phases? This connects workflow stages to your sync profiles."
>
> Available phases: `govern`, `explore`, `signal`, `evolve`

For each phase the user wants to configure:

#### 3.2.1 Create Stub If Absent

Check whether `.flow/{phase}.toml` exists. If it does not exist, create it with the full 6-stage stub:

```toml
# .flow/{phase}.toml
# Per-phase workflow sync binding configuration.
# Schema: explore/decisions/260417-phase-workflow-binding-config.md
# Sync profiles are defined in .flow/config.toml under [sync.profiles.*]

[phase]
name = "{phase}"

# [workflow.stages.{stage-id}.{profile-id}]
# stage-map = "{external-status}"    # required
# include_tags = ["{tag}", ...]       # optional — OR logic: sync if task has ANY listed tag
# exclude_tags = ["{tag}", ...]       # optional — OR logic: skip if task has ANY listed tag

# --- 01-pending-planning ---
# [workflow.stages.01-pending-planning.{profile-id}]
# stage-map = ""

# --- 02-planning ---
# [workflow.stages.02-planning.{profile-id}]
# stage-map = ""

# --- 03-pending-implementation ---
# [workflow.stages.03-pending-implementation.{profile-id}]
# stage-map = ""

# --- 04-implementing ---
# [workflow.stages.04-implementing.{profile-id}]
# stage-map = ""

# --- 05-pending-completion ---
# [workflow.stages.05-pending-completion.{profile-id}]
# stage-map = ""

# --- 06-completed ---
# [workflow.stages.06-completed.{profile-id}]
# stage-map = ""
```

Replace `{phase}` with the actual phase name.

#### 3.2.2 Guide Binding Configuration

If the user has sync profiles configured (from 3.1), offer to help them add bindings:

> "You have the following sync profiles available: [{list profile IDs}]. Would you like to bind any stages now, or leave all stages commented-out for later?"

If they want to configure bindings:
- For each stage they want to bind, ask: "Which profile and what external status label?"
- Uncomment and populate the corresponding `[workflow.stages.{stage}.{profile}]` block
- Add `include_tags` or `exclude_tags` only if the user requests tag filtering

If they prefer to leave everything commented-out, confirm the stub is saved and move on.

If skipped entirely:
- Note in deferred list: "3.2 Per-Phase Workflow Bindings — edit `.flow/{phase}.toml` files when ready"

---

### 3.3 Create `.flow/govern.toml` Stub (If Not Present)

As a baseline, always check for `.flow/govern.toml`. If it does not exist, create it using the stub template from 3.2.1 with `name = "govern"`:

```toml
# .flow/govern.toml
# Per-phase workflow sync binding configuration.
# Schema: explore/decisions/260417-phase-workflow-binding-config.md

[phase]
name = "govern"

# [workflow.stages.01-pending-planning.{profile-id}]
# stage-map = ""

# [workflow.stages.02-planning.{profile-id}]
# stage-map = ""

# [workflow.stages.03-pending-implementation.{profile-id}]
# stage-map = ""

# [workflow.stages.04-implementing.{profile-id}]
# stage-map = ""

# [workflow.stages.05-pending-completion.{profile-id}]
# stage-map = ""

# [workflow.stages.06-completed.{profile-id}]
# stage-map = ""
```

This file is created silently (no user interaction required) if absent. If it already exists, leave it untouched.

## Discussion Point (Governed)

After completing all integration sub-sections, summarise:
- Which integrations were configured
- Which phases have `.flow/{phase}.toml` stubs
- Any items deferred

Ask: "Integration setup complete [or deferred]. Ready to move to Step 4 — Complete?"

## Heuristic (Delegated)

In delegated mode: skip all integration prompts unless sync profiles were already present in `.flow/config.toml`. Always create `.flow/govern.toml` stub if absent. Mark all integration items as deferred and proceed to Step 4.

## Next Step

Proceed to [04-complete.md](./04-complete.md).
