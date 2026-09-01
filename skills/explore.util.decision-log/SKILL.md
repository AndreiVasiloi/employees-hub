+++
name = "explore.util.decision-log"
description = "Use this skill to maintain a running log of every architectural decision — recording what was decided, why, what alternatives were rejected, and who drove it — throughout an HLD engagement. Activates at engagement start and persists through all steps. Also relevant when someone says 'why did we choose this,' 'document the rationale,' 'track this decision,' or 'what alternatives did we consider.' Does NOT track blockers or dependencies — use Blocker Register for that."
license = "Proprietary. See LICENSE.md"
+++

# Decision Log

Maintain a running log of architectural decisions with alternatives considered, rationale, and ownership throughout an HLD engagement.

## When to Use

Use this skill when you need to:

- Track every architectural decision made during an HLD engagement
- Record alternatives considered and rationale for each selection
- Document who drove each decision (architect or agent recommendation)
- Flag decision reversals with links to the original entry
- Maintain an audit trail for future design reviews and onboarding
- Provide traceability from decisions to the artifacts they affect

**Processes that use this skill**:
- Architecture Copilot (Steps 1–4: all steps — loaded eagerly at Step 1, persists through engagement)

**Key principle**: Decisions are first-class artifacts. Every decision must be traceable to who made it, why, and what alternatives were rejected.

## Inputs to Request

Before initializing a decision log, ensure you have:

1. **HLD name** — the name of the HLD engagement for the log header
2. **Engagement start date** — for the first entry timestamp
3. **Slug** — project identifier for file naming (e.g., `payments-reconciliation`)

**STOP**: If the HLD name or slug is not confirmed, request it from the architect before proceeding.

## Procedure

### Step 1: Initialize the Decision Log

Create the decision log file at the start of the engagement.

```
Decision Log Initialized

File: explore/hlds/[slug]-decision-log.md
HLD: [HLD Name]
Engagement start: [YYYY-MM-DD]
Total decisions: 0

The decision log is now active. Every substantive decision from this point forward will be recorded.

How would you like to proceed?
- Confirm — decision log is ready
- Adjust — change the HLD name or slug
```

**STOP**: Wait for architect to confirm the decision log is initialized correctly.

### Step 2: Record a Decision

After every substantive interaction where a decision is made, add an entry using this format.

```
Decision Recorded: DEC-[NNN]

Decision: [Short title]
Date: [YYYY-MM-DD]
Step: [Which step this occurred in]
Driver: Architect / Agent recommendation

What was decided:
[Description of the decision]

Why this option was chosen:
[Rationale]

Alternatives rejected:
- [Option A] — rejected because [reason]
- [Option B] — rejected because [reason]

Evidence level: [VALIDATED] / [ASSUMPTION]
Impact: [What this affects downstream]
Status: Active

Running total: [N] decisions ([N] active, [N] reversed, [N] superseded)
```

**STOP**: No explicit stop — this step runs continuously after every substantive interaction.

### Step 3: Record a Reversal

If a previously accepted decision is revisited or reversed, create a new entry that links to the original.

```
Decision Reversal: DEC-[NNN] reverses DEC-[MMM]

Original decision (DEC-[MMM]): [Short title of original]
Original date: [Date]
Original driver: [Architect / Agent]

New decision: [What is now decided]
Reversal reason: [Why the original decision was overturned]
Triggered by: [What feedback, finding, or new context caused this]
Impact: [What downstream artifacts or decisions are affected]

⚠️ Downstream items to update:
- [Artifact or decision affected]
- [Artifact or decision affected]

DEC-[MMM] status updated to: Reversed (see DEC-[NNN])

How would you like to proceed?
- Confirm reversal — update all downstream references
- Reconsider — keep original decision, discard reversal
- Partial reversal — modify only [specific aspect]
```

**STOP**: Wait for architect to confirm the reversal before updating downstream references.

### Step 4: Mid-Engagement Summary

At the end of each step, produce a decision log summary for the architect.

```
Decision Log Summary — End of Step [N]

| # | Decision | Driver | Status | Evidence |
|---|----------|--------|--------|----------|
| DEC-001 | [Short title] | Architect / Agent | Active / Reversed | [VALIDATED] / [ASSUMPTION] |
| DEC-002 | [Short title] | Architect / Agent | Active / Reversed | [VALIDATED] / [ASSUMPTION] |

Total decisions: [N]
Active: [N] | Reversed: [N] | Superseded: [N]
Architect-driven: [N] | Agent-recommended: [N]
Assumption-based: [N] (these carry validation risk)

How would you like to proceed?
- All accurate — proceed to next step
- Correct an entry — tell me which decision and what to change
- Add missing decision — I made a decision that wasn't logged
```

**STOP**: Wait for architect to validate the decision log summary before proceeding to the next step.

### Step 5: Finalize Decision Log

At engagement completion, run the validation checklist and produce the final version.

**Validation checklist:**

- [ ] Every major architectural decision has an entry
- [ ] Every entry has: what, when, why, alternatives rejected, driver
- [ ] Every reversal links to the original entry with reason
- [ ] Evidence tags ([VALIDATED] / [ASSUMPTION]) on every entry
- [ ] No orphaned references (reversed decisions updated in downstream artifacts)
- [ ] Decision index matches detail section (no missing or extra entries)
- [ ] Status field is current for every entry (Active / Reversed / Superseded)
- [ ] File written to correct path with correct slug

```
Decision Log Complete

File: explore/hlds/[slug]-decision-log.md
Total decisions: [N]
Active: [N] | Reversed: [N] | Superseded: [N]
Architect-driven: [N] | Agent-recommended: [N]
Assumption-based decisions: [N]
Validation: [N] of 8 checks passed ✓

Ready for handoff as companion document to final HLD.
```

**STOP**: Wait for architect to confirm the decision log is finalized.

## Output Format

```
explore/hlds/[slug]-decision-log.md
```

**Template**: `templates/decision-log.md`

1. **Header** — HLD name, engagement start date, last updated date, total decisions count
2. **Decision Index** — summary table with #, date, step, decision title, driver, status
3. **Decision Details** — each entry (DEC-NNN) with date, step, driver, decision, rationale, alternatives rejected, evidence level, impact, status
4. **Reversals** — reversal entries with link to original, reason, triggered by, downstream impact

## Integration with Workflows

Architecture Copilot loads this skill eagerly before Step 1 begins. It persists across all 4 steps of the engagement and is one of the 4 final deliverables in the handoff package. Every other skill in the process feeds decisions into this log.

**Integrates with**:
- **Boundary Mapping** — feeds truth hierarchy and ownership decisions as initial entries
- **Design Sketch** — feeds architect selections for decision points and calibration shifts
- **HLD Drafting** — feeds decisions made during draft generation
- **Feedback Integration** — feeds feedback dispositions and hardening findings
- **Socialization & Handoff** — feeds simplification selections as final entries
- **Blocker Register** — references decision entries when blockers are related to decisions

## Best Practices

**Do**:
- Record decisions immediately after each substantive interaction — never batch
- Distinguish architect-driven vs agent-recommended decisions explicitly
- Link every reversal to the original entry with a clear reason
- Tag evidence level on every entry — [VALIDATED] or [ASSUMPTION]
- List all rejected alternatives with reasons — not just the selected option
- Produce a summary at the end of each step for architect validation

**Don't**:
- Batch decision updates at the end of a step — decisions may be lost
- Silently modify previous entries — create a new reversal or superseding entry
- Omit rejected alternatives — they are critical for future design reviews
- Present agent recommendations as architect decisions — always attribute correctly
- Leave reversal chains unresolved — every reversed entry must link to its replacement
- Skip the mid-engagement summary — it catches missing or incorrect entries

If you propose changes, keep them minimal and clearly scoped.

## Gotchas

- ⚡ **Agent decisions attributed to architect**: The agent sometimes records its own recommendations as architect decisions. Always distinguish who drove each decision — misattribution corrupts the audit trail and can undermine trust during reviews.
- ⚡ **Missing rejected alternatives**: The agent tends to record only the selected option, omitting the alternatives that were considered and rejected. Rejected alternatives with reasons are critical for future design reviews — they prevent revisiting settled questions.
- ⚡ **Silent entry modification**: When context changes, the agent may update a previous decision entry in-place instead of creating a reversal or superseding entry. Never modify existing entries — always create a new entry that references and supersedes the original.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.util.decision-log:0.1.2:2026-08-31T12:53:30Z -->
