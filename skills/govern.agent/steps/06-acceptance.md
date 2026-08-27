# Step 6: Acceptance

**Objective**: Review validation results, refine if needed, and accept or reject the work.

**Entry Criteria**: Step 5 complete — validation report received from subagent.

**Exit Criteria**: Work is accepted (all artifacts pass validation) or session ends with documented issues.

---

## Actions

### Action 1: Evaluate Validation Report

Assess the validation report from Step 5:

**All PASS**: Proceed directly to Action 3 (Accept).

**Any WARN (no FAIL)**: Present warnings to the user for decision:

```
Validation passed with warnings.

Warnings:
  ⚠️ [artifact]: [warning detail]
  ⚠️ [artifact]: [warning detail]

Options:
  - Accept with warnings — proceed, track warnings as follow-up
  - Address warnings now — refine artifacts before accepting
```

**Any FAIL**: Enter the refinement loop (Action 2).

```
Validation failed.

Failures:
  ❌ [artifact]: [failure detail + remediation]
  ❌ [artifact]: [failure detail + remediation]

These must be addressed before acceptance.
Entering refinement loop.
```

---

### Action 2: Refinement Loop

For each FAIL item:

1. **Present the failure** with the subagent's specific, actionable feedback
2. **Apply the fix** — re-enter the workflow skill's relevant step to address the issue, using the loaded guides as constraints
3. **Confirm the fix** with the user

After all FAIL items are addressed:

```
All validation failures addressed.

Changes made:
  ✓ [artifact]: [what was changed]
  ✓ [artifact]: [what was changed]

Re-running validation...
```

**Re-validate**: Return to Step 5 to spawn a fresh subagent validation on the updated artifacts.

**Loop limit**: Maximum 3 refinement cycles. If validation still fails after 3 cycles:

```
⚠️ Refinement loop limit reached (3 cycles).

Remaining issues:
  ❌ [artifact]: [issue]

Options:
  - Accept with known issues — document in task and proceed
  - Escalate — flag for steering team review
  - Abandon — discard changes and return to Step 2
```

---

### Action 3: Accept

Once validation passes (all PASS, or WARN accepted by user):

1. **Confirm acceptance**:

```
✅ Work accepted.

Task:      [NCPT-XXX] [Task Title]
Workflow:  [skill-slug]
Validated: [subagent name] — [PASS | PASS with warnings]

Artifacts:
  ✓ [artifact-1 path]
  ✓ [artifact-2 path]

Session complete.
```

2. **Update task status** if applicable (move task file to next bucket in `work/`)

3. **End session**. Do NOT automatically loop back to Step 2 for the next task. The user must explicitly start a new Govern session.

---

## Workflow Complete

**STOP HERE** — Govern Agent session has finished.

**What to do next (requires human decision):**

1. **Start another task**: Say "Let's Govern" to begin a new session
2. **Review the artifacts**: Check the output files before committing
3. **Commit and push**: The agent does not auto-commit

**Do NOT automatically proceed to a new task.**

**Human checkpoint required before continuing.**

---

## Related

- **Previous Step**: `05-validation.md`
- **Config Section**: `[validation]`
- **Task Location**: `work/`
