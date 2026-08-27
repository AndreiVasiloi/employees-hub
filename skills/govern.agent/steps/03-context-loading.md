# Step 3: Context Loading

**Objective**: Classify the selected task's concerns, load matching knowledge and stack skills from the config, and ensure the required workflow skill is installed.

**Entry Criteria**: Step 2 complete — user has selected a task, task definition file has been read.

**Exit Criteria**: All relevant knowledge and stack skills loaded, workflow skill confirmed installed, ready to delegate.

---

## Actions

### Action 1: Classify Concerns

Analyse the selected task definition to determine which concern areas apply:

| Concern | Signal words / task characteristics |
|---------|-------------------------------------|
| **domain** | Aggregates, commands, events, value objects, ubiquitous language |
| **architecture** | Hexagonal, ports/adapters, module boundaries, deployment, data storage |
| **api** | OpenAPI, endpoints, schemas, contract stability |
| **ui** | Components, forms, accessibility, copy, UX patterns |
| **planning** | Technical plan, test inventory, dependencies, sequencing |
| **implementation** | Code, TDD, command handlers, RBAC enforcement |
| **review** | Compliance, quality gates, violations, recommendations |
| **check** | Consistency, cross-artifact validation, completeness |
| **security** | RBAC, four-eyes, audit, secrets, Kong |

Present the classification to the user for confirmation:

```
Task: [NCPT-XXX] [Task Title]
Type: [planning | implementation | review | check]

Classified concerns:
  ✓ [concern-1] — [reason]
  ✓ [concern-2] — [reason]

Knowledge to load:
  ✓ [knowledge-area] — [description] (via skill: [slug] | via path: [path])
  ✓ [knowledge-area] — [description] (via skill: [slug] | via path: [path])

Stack skills to load:
  ✓ [stack-area] — [value] (skill: [slug])

Confirm? [Y/n]
```

**Rules**:
- Match classified concerns against `[knowledge.*].load_when` and `[stack.*].load_when` arrays in `.flow/govern.toml`
- Load ONLY matching entries — never load everything
- If no entries match, proceed without extra context (some tasks may not need it)

---

### Action 2: Load Knowledge

For each matched `[knowledge.*]` entry, load **both** `skill` and `sources` when present:

**Skill** (structured, progressive-disclosure conventions):
1. If `skill` is populated, load the skill's `SKILL.md` (the index).
2. If deeper detail is needed during the workflow, load specific guide files from the skill's `guides/` folder.

**Sources** (project-specific content and reference material):
1. For each path in the `sources` array, read the document.
2. Paths may point to local files or enterprise warehouse locations.
3. If a path ends with `/`, it references a directory — list its contents for navigation but do not load all files.

If both `skill` and `sources` are empty, skip — this knowledge area is declared but not yet available.

For each matched `[stack.*]` entry:

1. **If `skill` is populated**: Load the skill's `SKILL.md` for conventions and constraints related to that technology.
2. **If `skill` is empty**: Note the `value` and `description` for quick reference but no deeper guidance is available yet.

Confirm loading:

```
Context loaded:
  ✓ target-architecture — skill: (none) + 2 sources
  ✓ design-system — skill: (none) + 3 sources
  ✓ domain-model — skill: (none) + 2 sources
  ✓ frontend — Next.js 16.x / React 19.x (no skill yet)
  ✓ component_library — MUI 7.x (no skill yet)
```

**If a referenced source or skill is missing**: Warn but do not block.

```
⚠️ WARNING: Source not found: [path]
Proceeding without this source. Quality may be reduced.
```

---

### Action 3: Determine Workflow Skill

Map the task type to the workflow skill using `[workflows]` from `.flow/govern.toml`:

| Task Type | Workflow Skill |
|-----------|---------------|
| planning | `govern.proc.task-planning` |
| implementation | `govern.proc.task-implementation` |
| review | `govern.proc.task-review` |
| check | `govern.proc.task-check` |

---

### Action 4: Ensure Skills Installed

Check if the required workflow skill and any matched knowledge/stack skills exist:

```bash
dft skills list --json
```

**For each skill that is NOT installed**: Install it:

```bash
dft skills add <skill-slug>
```

This will also install transitive dependencies automatically.

Confirm installation:

```
Skills ready:
  ✓ [workflow-skill] installed (+ [N] dependencies)
  ✓ [knowledge-skill] installed
  ✓ [stack-skill] installed
```

**If workflow skill installation fails**: STOP. The agent cannot delegate without it.

```
❌ ERROR: Failed to install [skill-slug].

[error output from dft skills add]

Please resolve the installation issue before continuing.
```

**If a knowledge/stack skill fails to install**: Warn but continue — these enhance quality but are not blocking.

---

### Action 5: Load Workflow Skill Dependencies

Read the workflow skill's `flow.toml` to identify its own dependencies (e.g., utility skills). Ensure all are present:

```bash
dft skills add <dep-1> <dep-2> ...
```

---

## Exit

All matched knowledge and stack skills loaded, workflow skill installed and ready. Proceed to Step 4 (Workflow Execution).

---

## Related

- **Previous Step**: `02-work-discovery.md`
- **Next Step**: `04-workflow-execution.md`
- **Config Sections**: `[knowledge.*]`, `[stack.*]`, `[workflows]`
- **CLI Commands**: `dft skills list`, `dft skills add`
