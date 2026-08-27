# Step 5: Validation

**Objective**: Spawn a clean-context subagent to validate the workflow outputs against project requirements, without the pollution of the execution session context.

**Entry Criteria**: Step 4 complete — workflow skill finished, output artifacts identified.

**Exit Criteria**: Validation report received from the subagent.

---

## Why Clean-Context Validation

The agent that executed the workflow has accumulated session context — decisions, assumptions, compromises, partial reasoning. This context can blind it to issues that a fresh reviewer would catch.

The validation subagent:
- Has **no session history** from the execution
- Sees **only** the configuration (`.flow/govern.toml`) and the output artifacts
- Loads the **validation-relevant knowledge** (`validation-checklists`, `quality-criteria`) from config
- Evaluates outputs **solely against project requirements**, not execution rationale

This is the Govern Agent's equivalent of a code review by someone who wasn't the author.

---

## Actions

### Action 1: Prepare Validation Package

Assemble the inputs the subagent will receive:

1. **Config file**: `.flow/govern.toml`
2. **Output artifacts**: The specific files produced in Step 4
3. **Task definition**: The original task file (for acceptance criteria)
4. **Validation knowledge**: Read `[validation].always_load` from config to determine which knowledge entries to include. For each, load both `skill` and `sources` per the same resolution logic as Step 3. By default:
   - `knowledge.validation-checklists`
   - `knowledge.quality-criteria`
5. **Concern-specific knowledge**: Include knowledge and stack skills that were loaded in Step 3 (the subagent needs the same constraining context)

---

### Action 2: Determine Subagent

Resolution follows two tiers:

**Tier 1 — Native subagent**: If the current agent platform supports subagents (e.g., Devin terminals, API-based orchestrators), use the platform's native subagent capability. This keeps the validation in a clean context without leaving the session.

**Tier 2 — CLI exec fallback**: If the platform does **not** support native subagents (e.g., Cascade/Windsurf), fall back to running a CLI agent in exec mode. Read `[validation]` from `.flow/govern.toml` for the configured agents:

| Config Key | Purpose | Default |
|-----------|---------|--------|
| `default_agent` | Primary CLI agent to invoke | `devin` |
| `mode` | Invocation mode | `terminal` |
| `fallback_agent` | Used if default is unavailable | `codex` |

---

### Action 3: Construct Subagent Prompt

Build a structured prompt for the validation subagent:

```markdown
# Govern Agent Validation Request

## Task
[NCPT-XXX] [Task Title]

## Acceptance Criteria
[From task definition]

## Output Artifacts
[List of file paths produced in Step 4]

## Project Configuration
[Relevant sections from .flow/govern.toml — project identity, architecture rules, stack constraints]

## Validation Guides
[Contents of validation-checklists.md and quality-criteria.md]
[Contents of concern-specific guides]

## Instructions
Review the output artifacts against:
1. The task's acceptance criteria
2. The project's architecture rules and constraints
3. The validation checklists and quality criteria provided
4. The technology stack constraints

For each artifact, report:
- PASS: Meets all applicable criteria
- WARN: Minor issues that should be addressed but are not blocking
- FAIL: Does not meet criteria — must be fixed before acceptance

Provide specific, actionable feedback for any WARN or FAIL items.
Do not invent requirements beyond what is documented above.
```

---

### Action 4: Invoke Subagent

**Tier 1 — Native subagent**: Use the platform's built-in subagent tool to spawn the validation in a clean context. Pass the constructed prompt directly. No CLI invocation needed.

**Tier 2 — CLI exec fallback** (terminal mode, default):

```bash
# Devin (default terminal agent)
devin "$(cat /tmp/govern-validation-prompt.md)"

# Codex (fallback)
codex --prompt /tmp/govern-validation-prompt.md
```

The agent tries `default_agent` first, then `fallback_agent` if the default is unavailable.

**If neither agent is available**:

```
⚠️ WARNING: No validation subagent available.
  default_agent: [agent] — not found
  fallback_agent: [agent] — not found

Options:
  - Perform manual validation (user reviews against checklists)
  - Skip validation and accept with caveat
  - End session and resolve subagent availability
```

---

### Action 5: Receive Validation Report

Capture the subagent's output as the validation report. Present it to the user:

```
## Validation Report

Validator: [subagent name]
Task:      [NCPT-XXX] [Task Title]

### Results

[Artifact 1]: PASS | WARN | FAIL
  [Details if WARN or FAIL]

[Artifact 2]: PASS | WARN | FAIL
  [Details if WARN or FAIL]

### Summary
  ✅ PASS: [N] artifacts
  ⚠️ WARN: [N] artifacts
  ❌ FAIL: [N] artifacts
```

---

## Exit

Validation report received. Proceed to Step 6 (Acceptance).

---

## Related

- **Previous Step**: `04-workflow-execution.md`
- **Next Step**: `06-acceptance.md`
- **Config Section**: `[validation]`
- **Guides**: `validation-checklists.md`, `quality-criteria.md`
