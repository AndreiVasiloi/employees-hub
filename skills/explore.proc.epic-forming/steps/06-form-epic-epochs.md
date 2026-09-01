# Step 6: Form Epic Epochs

## Objective

Define the epoch structure for the epic, ensuring each period of active work is properly represented in the TOML frontmatter and has a corresponding description section in the epic body. Epochs enable granular JIRA sync and clear iteration boundaries.

## Entry Criteria

- Epic content created or amended (Step 5 complete)
- Epic structure populated with capability information
- Ready to define epoch boundaries for the epic

## Actions

### 6.1 Determine Epoch Strategy

#### New Epic

Create epoch 0 representing the initial period of work. Consider whether the epic's scope naturally splits into multiple sequential phases — if so, define additional epochs upfront where the boundaries are clear. Small, focused epics typically need only one epoch.

#### Amended Epic — Epoch Change Detection

When amending an existing epic that already has epochs, determine whether the new work belongs to the current epoch or warrants a new one:

1. **Identify the current epoch**: Read the epic's `[epochs]` frontmatter and find the highest-indexed epoch. This is the "current" epoch.
2. **Scan for active tasks**: Search all `work/` stage directories **except** `05-pending-release/` and `06-released/` for tasks whose `sources.epic` references this epic (with or without an epoch suffix). Active tasks are those in `01-pending-planning/`, `02-planning/`, `03-pending-implementation/`, or `04-implementing/`.
3. **Decision logic**:
   - **Active tasks exist** → The current epoch is still in flight. Continue with the current epoch — add new capabilities to it.
   - **No active tasks exist** → All previous work for this epic has completed. Present the user with a choice:

**STOP (Governed Mode)**: Ask the user:
- "All tasks from the current epoch (*[epoch name]*) have completed."
- "Would you like to:"
  - **(a) Start a new epoch** — creates the next epoch index for the new period of work
  - **(b) Continue the current epoch** — adds the new capabilities to the existing epoch

**Heuristic (Delegated Mode)**: If no active tasks exist, default to starting a new epoch. If active tasks exist, continue the current epoch.

### 6.2 Define Epoch Frontmatter

Add or update the `[epochs]` section in the epic's TOML frontmatter. Each epoch must include:
- **Index**: Zero-indexed integer (`[epochs.0]`, `[epochs.1]`, etc.)
- **Name**: Short descriptive name for the period of work
- **Started**: Date the epoch began or is planned to begin (`YYYY-MM-DD`)
- **jira_key**: Leave empty for new epochs (populated by `dft sync`)

**Format reference**:

```toml
+++
[metadata]
epic_id = "DFE-EXAMPLE"
last_updated = "YYYY-MM-DD"

[epochs]

  [epochs.0]
  name = "Foundation & Core"
  started = "2025-11-01"
  jira_key = ""

  [epochs.1]
  name = "Advanced Features & Hardening"
  started = "2026-02-01"
  jira_key = ""
+++
```

### 6.3 Write Epoch Description Sections

For each epoch defined in the frontmatter, add a corresponding markdown section at the bottom of the epic file:
- **Heading**: Use a `##` heading that **exactly matches** the epoch's `name` field from the frontmatter
- **Content**: Write a concise description of the epoch's goals, scope, and expected outcomes
- **Ordering**: Epoch description sections should appear in the same order as the frontmatter entries

**Format reference**:

```markdown
## Foundation & Core

Establish the core pipeline, including profile configuration,
status mapping, and basic field sync.

## Advanced Features & Hardening

Extend coverage to include epic/epoch linking, historical event
comments, and assignment audit trails.
```

The sync engine extracts the content from the heading matching the target epoch's `name` until the next heading of the same level (or end of file). This extracted section becomes the JIRA Epic's description.

### 6.4 Validate Epoch–Task Alignment

If tasks already reference this epic:
- **Epoch Suffix Convention**: Tasks link to a specific epoch by suffixing the epic ID with `-000` format (e.g. `DFE-EXAMPLE-001` for epoch 1). No suffix defaults to epoch 0.
- **Verify References**: Ensure existing task `sources.epic` references align with the correct epoch index.
- **New Epics**: No task references exist yet — this validation is deferred to iteration-management.

## Discussion Point (Governed Mode)

**STOP**: Present epoch structure for validation:
- "I've defined the following epoch structure for the epic:"
- "Epoch count: [number of epochs]"
- "Epoch 0: [name] — [brief description]"
- "Epoch N: [name] — [brief description]" (for each additional epoch)
- "Epoch description sections added to epic body: [list of headings]"
- "Does this epoch structure correctly represent the planned periods of work?"

## Heuristic (Delegated Mode)

If in delegated mode:
- Default to a single epoch (epoch 0) for new epics unless the scope clearly spans distinct phases
- Name the epoch to match the epic's primary objective
- Set `started` to today's date for new epochs
- Leave `jira_key` empty for all new epochs
- Write epoch description sections matching frontmatter names
- Proceed to Step 7 with epochs formed

## Exit Criteria

- [ ] `[epochs]` section present in epic TOML frontmatter
- [ ] At least one epoch (epoch 0) defined with `name` and `started`
- [ ] `jira_key` left empty for new epochs (populated by sync)
- [ ] Epoch description sections in epic body match frontmatter `name` fields exactly
- [ ] Epoch boundaries align with planned periods of work
- [ ] For amended epics: active task scan performed and new-epoch vs continue decision resolved
- [ ] Existing task references validated against epoch indices (if applicable)

## Next Step

→ [07-validate-epic-boundaries.md](./07-validate-epic-boundaries.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.epic-forming:0.1.3:2026-09-01T11:38:04Z -->
