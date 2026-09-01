# Step 9: Govern Readiness Validation

## Objective

Validate the formed epic against Govern phase requirements by invoking the `govern.agent` validation subprocess. Epic forming is a gateway between Explore and Govern — this step ensures the epic contains everything that downstream Govern processes (task planning, implementation, iteration management) will need to operate effectively.

## Entry Criteria

- Epic indexed and linked (Step 8 complete)
- Epic content finalized with epochs, boundaries, and cross-references
- `govern.agent` skill loaded (declared as a dependency in `flow.toml`)

## Why This Step Exists

The Explore phase produces epics using explore-context inputs (PRDs, concepts, discovery artifacts). The Govern phase consumes those epics to drive planning, sizing, and implementation. Without a validation gate at the handoff boundary, epics may be well-formed from an Explore perspective but missing critical information that Govern needs — acceptance criteria granularity, capability boundaries suitable for task decomposition, or architectural constraints that inform planning.

This step applies the `govern.agent` validation subprocess (Step 5 of `govern.agent`) against the epic artifacts, treating the epic as if it were a Govern output being reviewed for downstream readiness.

## Actions

### 9.1 Assemble Validation Package

Prepare the inputs for the govern.agent validation subprocess:

1. **Epic artifact**: The complete epic markdown file from `explore/epics/`
2. **Epic index entry**: The updated `explore/epics/README.md` entry
3. **Working task**: The epic-forming task folder (task.md, plan.md, size.md)
4. **Project config**: `.flow/govern.toml` (if present — provides project identity and architecture constraints)

### 9.2 Define Govern Readiness Criteria

The validation evaluates the epic against what Govern processes require as inputs:

| Govern Process | What It Needs from Epics |
|----------------|--------------------------|
| `govern.proc.task-planning` | Clear capability boundaries for task decomposition; epochs with well-defined scope |
| `govern.proc.iteration-management` | Epic structure suitable for iteration slicing; capability groupings that map to 2–4 sprint delivery |
| `govern.util.task-sizing` | Sufficient detail per epoch/capability to estimate complexity |
| `flow.util.task-definition` | Unambiguous capability descriptions that translate to task acceptance criteria |

### 9.3 Invoke Govern Validation

Apply the `govern.agent` validation pattern (per `govern.agent` Step 5 — Validation) to the epic.

#### 9.3.1 Construct Validation Prompt

Build a structured prompt scoped to Govern readiness:

```markdown
# Govern Readiness Validation Request

## Epic
[EPIC-ID] [Epic Title]

## Govern Readiness Criteria
[The criteria table from 9.2 — what each Govern process needs]

## Output Artifacts
[Epic file path, epic index entry, working task folder]

## Project Configuration
[Relevant sections from .flow/govern.toml — project identity, architecture rules, stack constraints]

## Instructions
Evaluate whether downstream Govern processes can consume this epic
without requiring the original Explore session context. For each
criterion, report:
- PASS: Epic provides what this Govern process needs
- WARN: Minor gaps that should be addressed but are not blocking
- FAIL: Critical information missing — must be fixed before handoff

Provide specific, actionable feedback for any WARN or FAIL items.
Do not invent requirements beyond what is documented above.
```

#### 9.3.2 Determine Subagent

Resolution follows two tiers:

**Tier 1 — Native subagent**: If the current agent platform supports subagents (e.g., Devin terminals, API-based orchestrators), use the platform's native subagent capability. This keeps the validation in a clean context without leaving the session.

**Tier 2 — CLI exec fallback**: If the platform does **not** support native subagents (e.g., Cascade/Windsurf), fall back to running a CLI agent in exec mode. Read `[validation]` from `.flow/govern.toml` for the configured agents:

| Config Key | Purpose | Default |
|-----------|---------|---------|
| `default_agent` | Primary CLI agent to invoke | `devin` |
| `mode` | Invocation mode | `terminal` |
| `fallback_agent` | Used if default is unavailable | `codex` |

```bash
# Devin (default terminal agent)
devin "$(cat /tmp/govern-readiness-validation-prompt.md)"

# Codex (fallback)
codex --prompt /tmp/govern-readiness-validation-prompt.md
```

**If neither agent is available**:

```
⚠️ WARNING: No validation subagent available.
  default_agent: devin — not found
  fallback_agent: codex — not found

Options:
  - Perform manual validation (user reviews against Govern readiness criteria)
  - Skip validation and accept with documented caveat
  - End session and resolve subagent availability
```

#### 9.3.3 Capture Validation Report

Receive the subagent's output as the validation report with per-criterion PASS / WARN / FAIL ratings.

### 9.4 Review Validation Results

Present the Govern readiness validation report:

```
## Govern Readiness Validation Report

Epic: [EPIC-ID] [Epic Title]

### Criteria Results

Task Planning Readiness:     PASS | WARN | FAIL
  [Details if WARN or FAIL]

Iteration Management Fit:    PASS | WARN | FAIL
  [Details if WARN or FAIL]

Task Sizing Readiness:       PASS | WARN | FAIL
  [Details if WARN or FAIL]

Task Definition Readiness:   PASS | WARN | FAIL
  [Details if WARN or FAIL]

### Summary
  ✅ PASS: [N] criteria
  ⚠️ WARN: [N] criteria
  ❌ FAIL: [N] criteria
```

### 9.5 Address Issues (If Any)

If any criteria received WARN or FAIL:

1. **FAIL items**: Must be resolved before proceeding. Return to the relevant earlier step (typically Step 5 or Step 6) to amend the epic content.
2. **WARN items**: Present to the steering team for decision — amend now or accept with documented caveats.
3. **Re-validate**: After amendments, re-run the validation to confirm resolution.

## Discussion Point (Governed Mode)

**STOP**: Present Govern readiness validation results for confirmation:
- "I've validated the epic against Govern phase requirements:"
- "Task planning readiness: [result]"
- "Iteration management fit: [result]"
- "Task sizing readiness: [result]"
- "Task definition readiness: [result]"
- "Overall: [summary of PASS/WARN/FAIL counts]"
- "[If issues exist] Recommended actions: [specific amendments]"
- "Should we proceed to process completion, or address the identified issues first?"

## Heuristic (Delegated Mode)

If in delegated mode:
- Execute validation against all Govern readiness criteria
- Auto-resolve WARN items by amending epic content where unambiguous
- FAIL items trigger automatic return to relevant step for amendment
- Re-validate after amendments until all criteria pass
- Proceed to Step 10 when all criteria are PASS or WARN-with-caveat

## Exit Criteria

- [ ] Govern readiness validation executed against all criteria
- [ ] Validation report generated and presented
- [ ] All FAIL items resolved (or escalated to steering team)
- [ ] WARN items either resolved or accepted with documented caveats
- [ ] Epic confirmed ready for Govern phase consumption

## Next Step

→ [10-complete-process.md](./10-complete-process.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.epic-forming:0.1.3:2026-09-01T11:38:04Z -->
