+++
name = "explore.util.blocker-register"
description = "Use this skill to track missing upstream contracts, unresolved dependencies, and implementation blockers with severity classification throughout an HLD engagement. Activates at engagement start and persists through all steps, logging blockers proactively as they are discovered. Also relevant when someone says 'something is blocking us,' 'dependency issue,' 'can't proceed without,' or 'what's still unresolved.' Does NOT track architectural decisions — use Decision Log for that."
license = "Proprietary. See LICENSE.md"
+++

# Blocker Register

Track missing upstream contracts, unresolved dependencies, and implementation blockers with severity classification throughout an HLD engagement.

## When to Use

Use this skill when you need to:

- Track missing upstream contracts that block implementation
- Log unresolved dependencies on other teams or artifacts
- Flag implementation gaps discovered during design
- Classify blockers by severity (BLOCKER / SIGNIFICANT / MINOR)
- Assign owning teams and resolution paths to each blocker
- Maintain a living record of what must be resolved before implementation

**Processes that use this skill**:
- Architecture Copilot (Steps 1–4: all steps — loaded eagerly at Step 1, persists through engagement)

**Key principle**: Blockers are logged proactively the instant they are discovered. Do not wait to be asked. Every PROVISIONAL dependency is a potential blocker.

## Inputs to Request

Before initializing a blocker register, ensure you have:

1. **HLD name** — the name of the HLD engagement for the register header
2. **Engagement start date** — for the first entry timestamp
3. **Slug** — project identifier for file naming (e.g., `payments-reconciliation`)

**STOP**: If the HLD name or slug is not confirmed, request it from the architect before proceeding.

## Procedure

### Step 1: Initialize the Blocker Register

Create the blocker register file at the start of the engagement.

```
Blocker Register Initialized

File: explore/hlds/[slug]-blocker-register.md
HLD: [HLD Name]
Engagement start: [YYYY-MM-DD]
Open blockers: 0

The blocker register is now active. Blockers will be added proactively as they are discovered throughout the engagement.

How would you like to proceed?
- Confirm — blocker register is ready
- Adjust — change the HLD name or slug
```

**STOP**: Wait for architect to confirm the blocker register is initialized correctly.

### Step 2: Log a Blocker

When any of the following are identified, add an entry immediately — do not wait for a review phase:

- Missing upstream contract (API, event, or data source assumed but not confirmed)
- Unresolved dependency (design element depending on another team's decision)
- Implementation gap (cannot safely implement without resolution)
- Ambiguous requirement (PRD or stakeholder requirement with multiple valid interpretations)

```
Blocker Logged: BLK-[NNN]

Title: [Short descriptive title]
Discovered: [YYYY-MM-DD] (Step [N])
Category: Missing Contract / Unresolved Dependency / Implementation Gap / Ambiguous Requirement

Description: [What is missing or unresolved]
Impact: [What cannot proceed without this]
Owning team: [Who must resolve this]
Resolution path: [Recommended approach]
Related decisions: DEC-[NNN] (if applicable)

Severity: [BLOCKER / SIGNIFICANT / MINOR]
Severity rationale: [Why this classification]

Running total: [N] open blockers ([N] BLOCKER, [N] SIGNIFICANT, [N] MINOR)

How would you like to proceed?
- Correct severity — this should be classified differently
- Add context — I have additional information about this blocker
- Acknowledge — blocker logged, continue with current work
```

**STOP**: Wait for architect to acknowledge or reclassify the blocker.

### Step 3: Classify Severity

Apply consistent severity classification using these definitions:

```
Severity Classification Guide

| Severity | Definition | Action Required | Example |
|----------|-----------|----------------|---------|
| BLOCKER | Cannot implement safely without resolving | Must resolve before implementation begins | Missing upstream API contract with no fallback |
| SIGNIFICANT | Should resolve before wider review / socialization | Resolve before Step 4 | Ambiguous requirement with two valid interpretations |
| MINOR | Can defer to LLD or later iteration | Track but do not block progress | Naming convention mismatch with adjacent HLD |

Current blocker distribution:
| Severity | Open | Resolved |
|----------|------|----------|
| BLOCKER | [N] | [N] |
| SIGNIFICANT | [N] | [N] |
| MINOR | [N] | [N] |

Any severity reclassifications needed?
- Reclassify — tell me which blocker and new severity
- All correct — classifications are accurate
```

**STOP**: Wait for architect to validate severity classifications (typically at the end of Step 3: Review & Hardening).

### Step 4: Resolve a Blocker

When a blocker is resolved, update the entry with resolution details.

```
Blocker Resolved: BLK-[NNN]

Original blocker: [Title]
Original severity: [BLOCKER / SIGNIFICANT / MINOR]
Discovered: [Date] (Step [N])

Resolution: [What was done to resolve this]
Resolved by: [Who — architect, stakeholder, owning team]
Resolution date: [YYYY-MM-DD]
Related decision: DEC-[NNN] (if a new decision was made)

BLK-[NNN] status updated to: Resolved

Remaining open blockers: [N] ([N] BLOCKER, [N] SIGNIFICANT, [N] MINOR)

How would you like to proceed?
- Confirm resolution — blocker is fully resolved
- Partial resolution — blocker is reduced but not eliminated (reclassify severity)
- Reopen — resolution is insufficient, keep blocker open
```

**STOP**: Wait for architect to confirm the resolution is adequate.

### Step 5: Mid-Engagement Summary

At the end of each step, produce a blocker register summary for the architect.

```
Blocker Register Summary — End of Step [N]

| # | Title | Category | Severity | Status | Owning Team |
|---|-------|----------|----------|--------|-------------|
| BLK-001 | [Title] | [Category] | BLOCKER | Open / Resolved | [Team] |
| BLK-002 | [Title] | [Category] | SIGNIFICANT | Open / Resolved | [Team] |

Open: [N] ([N] BLOCKER, [N] SIGNIFICANT, [N] MINOR)
Resolved: [N]

⚠️ Implementation readiness: [Ready / Blocked — N BLOCKER items remain]

How would you like to proceed?
- All accurate — proceed to next step
- Reclassify — tell me which blocker and new severity
- Add blocker — I know of a blocker that wasn't logged
- Resolve blocker — tell me which blocker and how it was resolved
```

**STOP**: Wait for architect to validate the blocker register summary before proceeding to the next step.

### Step 6: Finalize Blocker Register

At engagement completion, run the validation checklist and produce the final version.

**Validation checklist:**

- [ ] Every discovered blocker has an entry (none silently dropped)
- [ ] Every entry has: title, category, severity, description, impact, owning team, resolution path
- [ ] Severity classifications validated by architect (especially during Step 3)
- [ ] Every resolved blocker has: resolution description, date, who resolved it
- [ ] Related decision log entries linked where applicable
- [ ] No BLOCKER-severity items remain open (or explicitly deferred by architect with rationale)
- [ ] Summary table matches detail section (no missing or extra entries)
- [ ] File written to correct path with correct slug

```
Blocker Register Complete

File: explore/hlds/[slug]-blocker-register.md
Total blockers: [N]
Open: [N] ([N] BLOCKER, [N] SIGNIFICANT, [N] MINOR)
Resolved: [N]
Implementation readiness: [Ready / Blocked]
Validation: [N] of 8 checks passed ✓

Ready for handoff as companion document to final HLD.
```

**STOP**: Wait for architect to confirm the blocker register is finalized.

## Output Format

```
explore/hlds/[slug]-blocker-register.md
```

**Template**: `templates/blocker-register.md`

1. **Header** — HLD name, engagement start date, last updated date, open/resolved counts
2. **Summary Table** — severity distribution (open vs resolved per category)
3. **Open Blockers** — each entry (BLK-NNN) with severity, category, description, impact, owning team, resolution path, related decisions
4. **Resolved Blockers** — each entry with original severity, resolution, resolved by, date

## Integration with Workflows

Architecture Copilot loads this skill eagerly before Step 1 begins. It persists across all 4 steps of the engagement and is one of the 4 final deliverables in the handoff package. Blockers flow in from every other skill as PROVISIONAL dependencies and implementation gaps are discovered.

**Integrates with**:
- **Boundary Mapping** — feeds PROVISIONAL upstream dependencies as initial blocker candidates
- **Design Sketch** — feeds assumed event schemas and API contracts as potential blockers
- **HLD Drafting** — feeds missing contracts discovered during full draft generation
- **Feedback Integration** — feeds hardening findings classified as BLOCKER or SIGNIFICANT
- **Decision Log** — references decision entries when blockers are related to architectural decisions

## Best Practices

**Do**:
- Log blockers immediately when discovered — do not wait for a review phase
- Assign an owning team to every blocker — blockers without owners don't get resolved
- Provide a concrete resolution path — not just "needs resolution"
- Link to related decision log entries when the blocker stems from a design choice
- Produce a summary at the end of each step for architect validation
- Track resolved blockers with full details — don't just delete them

**Don't**:
- Wait to be asked before logging a blocker — proactive logging is mandatory
- Classify everything as BLOCKER — use the severity guide to differentiate
- Leave resolved blockers without resolution details — the audit trail matters
- Drop blockers silently — every discovered blocker must have an entry
- Skip the mid-engagement summary — it catches missing or misclassified blockers
- Assume a blocker is resolved without confirmation — always verify with architect

If you propose changes, keep them minimal and clearly scoped.

## Gotchas

- ⚡ **Severity inflation**: The agent tends to classify everything as BLOCKER to appear cautious. Overuse of BLOCKER severity causes decision fatigue for the architect. Use the severity guide strictly — a missing upstream contract that has a known workaround is not a BLOCKER.
- ⚡ **Silent resolution**: The agent sometimes stops mentioning a blocker after context shifts, treating it as implicitly resolved. Every blocker must be explicitly resolved with resolution details and architect confirmation — silence is not resolution.
- ⚡ **Duplicate entries**: When the same underlying issue surfaces in multiple steps, the agent may log it as separate blockers. Always check existing entries before logging — duplicate blockers dilute the register's usefulness.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.util.blocker-register:0.1.2:2026-08-31T12:53:30Z -->
