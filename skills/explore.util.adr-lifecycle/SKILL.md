+++
name = "explore.util.adr-lifecycle"
description = "Use this skill when you need to create, update, or manage Architecture Decision Records (ADRs) — handling status transitions, numbering, supersession chains, cross-referencing with HLDs, and validation rules. Provides a reusable ADR lifecycle for any skill that produces architecture decisions. Also relevant when someone says 'create an ADR,' 'supersede a decision,' 'what's the ADR status,' or 'link this decision to the HLD.' Does NOT make architecture decisions — use architecture-discovery-hld or the Copilot sub-skills for that."
license = "Proprietary. See LICENSE.md"
+++

# ADR Lifecycle Management

Reusable utility for creating, updating, and managing Architecture Decision Records (ADRs) with full lifecycle support — status transitions, numbering, supersession chains, bidirectional HLD cross-referencing, and validation.

## When to Use

Use this skill when you need to:

- Create a new ADR for a significant architecture decision
- Transition an ADR between statuses (Proposed → Accepted → Deprecated / Superseded)
- Supersede an existing ADR with a new decision (maintaining the chain)
- Cross-reference ADRs bidirectionally with HLD sections
- Validate ADR completeness before HLD finalization
- Number and name ADRs consistently across an engagement

**Skills that use this utility**:
- `explore.proc.architecture-solutioning` — creates ADRs during B.2 (Consolidated HLD Draft), validates during B.3–B.4
- `explore.proc.hld-drafting` — creates ADRs during consolidated draft generation (B.2)
- `explore.proc.feedback-integration` — may create or supersede ADRs during review (B.3)
- `explore.util.decision-log` — references ADR entries for traceability

**Key principle**: Every significant architecture decision gets an ADR. ADRs are living documents — they transition through statuses, never get deleted, and always maintain a traceable chain.

## ADR Status Flow

```
Proposed → Accepted → Deprecated
                    → Superseded (by newer ADR)
```

| Status | Meaning | When |
|--------|---------|------|
| **Proposed** | Decision documented but not yet approved by human reviewer | Created when a significant decision is first made |
| **Accepted** | Approved by PM/Architect after human review | After explicit human approval at a gate |
| **Deprecated** | No longer relevant; retained for history | When context changes make the decision moot |
| **Superseded** | Replaced by a newer ADR | When a better decision replaces this one |

## Numbering Convention

**Format**: `[slug]-adr-NNN-[decision-name].md`

- `[slug]` — project identifier (e.g., `payments-reconciliation`)
- `NNN` — sequential three-digit number, no gaps. Scan `explore/decisions/[slug]-adr-*.md` for existing ADRs; if files exist, start at the highest NNN + 1; if no files exist, start at `001`
- `[decision-name]` — lowercase, hyphen-separated, descriptive name

**Examples**:
- `payments-reconciliation-adr-001-event-sourcing-for-ledger.md`
- `payments-reconciliation-adr-002-saga-pattern-for-settlement.md`
- `payments-reconciliation-adr-003-cqrs-for-query-separation.md`

**Output path**: `explore/decisions/[slug]-adr-NNN-[decision-name].md`

## Procedure

### Step 1: Create a New ADR

When a significant architecture decision is made, create an ADR using this template:

```
# ADR-[NNN]: [Decision Title]

**Status**: Proposed
**Date**: [YYYY-MM-DD]
**Decision Maker**: [PM/Architect name or role]
**Supersedes**: [slug]-adr-[old-NNN]-[old-name].md (if applicable, otherwise "None")

## Context

[Why this decision needed to be made. Reference the HLD section(s) that drove this decision.]

**Affects**: HLD Section [N] ([Section Name]), Section [N] ([Section Name])

## Decision

[What was decided. State it as a committed architectural direction, not as an option.]

## Options Considered

### Option A: [Name]
- **Description**: [What this option entails]
- **Pros**: [Advantages]
- **Cons**: [Disadvantages]
- **Rejected because**: [Why this was not selected]

### Option B: [Name]
- **Description**: [What this option entails]
- **Pros**: [Advantages]
- **Cons**: [Disadvantages]
- **Selected because**: [Why this was chosen]

[Minimum 2 options required per ADR]

## Consequences

### Positive
- [Positive consequence 1]
- [Positive consequence 2]

### Negative
- [Negative consequence 1]
- [Negative consequence 2]

### Risks
- [Risk 1 — with mitigation]

## Related Decisions
- DEC-[NNN] in decision log: [relationship]
- ADR-[NNN]: [relationship] (if related to another ADR)
```

**STOP**: Present the ADR to the PM/Architect for review before changing status to Accepted.

### Step 2: Transition ADR Status

When the PM/Architect approves an ADR at a gate:

1. Update status from `Proposed` to `Accepted`
2. Record acceptance date
3. Update the decision log with the acceptance

When an ADR becomes irrelevant:

1. Update status to `Deprecated`
2. Add deprecation reason and date
3. Do NOT delete the ADR — retain for history

### Step 3: Supersede an ADR

When a new decision replaces an existing one:

1. Create a new ADR (Step 1) with `supersedes:` field pointing to the old ADR
2. Update the old ADR:
   - Status → `Superseded`
   - Add `superseded_by: [slug]-adr-[new-NNN]-[new-name].md`
   - Add supersession date and reason
3. Update the decision log with a supersession record (link both old and new)
4. Check all HLD cross-references to the old ADR and update them to point to the new ADR

```
Supersession Record

Old ADR: [slug]-adr-[old-NNN]-[old-name].md
  Status updated to: Superseded
  Superseded by: [slug]-adr-[new-NNN]-[new-name].md
  Reason: [Why the old decision was replaced]

New ADR: [slug]-adr-[new-NNN]-[new-name].md
  Status: Proposed
  Supersedes: [slug]-adr-[old-NNN]-[old-name].md

HLD cross-references updated: [N] sections
Decision log updated: DEC-[NNN]

How would you like to proceed?
- Confirm supersession — approve the new ADR
- Revert — keep the old ADR, discard the new one
- Modify — adjust the new ADR before accepting
```

**STOP**: Wait for PM/Architect to confirm the supersession.

### Step 4: Cross-Reference ADRs with HLD (Bidirectional)

Maintain bidirectional links between ADRs and HLD sections:

**HLD → ADR** (in the HLD document):
- Each HLD section that implements a decision links to the relevant ADR(s)
- Format: `See ADR-NNN: [decision-name]`
- Place the reference inline where the decision manifests

**ADR → HLD** (in the ADR document):
- Each ADR's "Context" section references the HLD section(s) it affects
- Format: `Affects: HLD Section N (Section Name), Section N (Section Name)`

**Integrity check**: When an HLD section is modified, verify that all referenced ADRs still apply. When an ADR is superseded, verify that all HLD references are updated.

### Step 5: Validate ADRs Before HLD Finalization

Run this checklist before the HLD is finalized:

**Validation rules**:

- [ ] No ADRs left in `Proposed` status — all must be `Accepted`, `Deprecated`, or `Superseded`
- [ ] Every `Superseded` ADR links to its replacement via `superseded_by:`
- [ ] Every new ADR that supersedes another links back via `supersedes:`
- [ ] At least 2 options considered per ADR (with rationale for rejection)
- [ ] Consequences documented for every ADR (both positive and negative)
- [ ] Every ADR has bidirectional cross-references with HLD sections
- [ ] ADR numbering is sequential with no gaps
- [ ] Decision log entries exist for every ADR status transition
- [ ] No orphaned ADR references in the HLD (pointing to nonexistent ADRs)
- [ ] ADR file naming follows convention: `[slug]-adr-NNN-[decision-name].md`

```
ADR Validation Summary

Total ADRs: [N]
- Accepted: [N]
- Deprecated: [N]
- Superseded: [N]
- ⚠️ Still Proposed: [N] (must resolve before finalization)

Supersession chains: [N] (all linked: ✓/✗)
HLD cross-references: [N] bidirectional links verified
Options per ADR: min [N], max [N] (minimum 2 required: ✓/✗)
Validation: [N] of 10 checks passed ✓
```

**STOP**: If any ADRs remain in `Proposed` status, present them for PM/Architect decision before proceeding.

## Output Format

```
explore/decisions/[slug]-adr-NNN-[decision-name].md
```

**Template**: `templates/adr.md`

Each ADR file contains:
1. **Header** — ADR number, title, status, date, decision maker, supersession links
2. **Context** — why the decision was needed, which HLD sections are affected
3. **Decision** — the committed architectural direction
4. **Options Considered** — at least 2 options with pros, cons, and selection rationale
5. **Consequences** — positive, negative, and risks
6. **Related Decisions** — links to decision log entries and other ADRs

## Integration with Workflows

This utility is referenced by any skill that creates or manages ADRs:

- **architecture-solutioning** — primary consumer; creates ADRs during B.2 (Consolidated HLD Draft), validates during B.3–B.4
- **hld-drafting** — creates ADRs during consolidated draft (B.2)
- **feedback-integration** — may supersede ADRs when review feedback changes a decision (B.3)
- **decision-log** — every ADR status transition is recorded as a decision log entry
- **socialization-handoff** — validates ADR completeness in the handoff package (Copilot B.4)

## Best Practices

**Do**:
- Create ADRs progressively as decisions are made — not deferred to the end
- Always include at least 2 options with explicit rejection rationale
- Document both positive AND negative consequences — don't sell the decision
- Maintain bidirectional cross-references with the HLD at all times
- Use the supersession chain for changed decisions — never silently edit an accepted ADR
- Validate all ADRs before HLD finalization — no `Proposed` ADRs should remain

**Don't**:
- Delete ADRs — deprecated and superseded ADRs are historical records
- Edit an `Accepted` ADR — create a new one that supersedes it
- Leave ADRs in `Proposed` status at finalization — every ADR needs a human decision
- Skip the options section — single-option ADRs don't document the decision process
- Break the numbering sequence — sequential, no gaps, continuing from the highest existing ADR number
- Create ADRs for trivial decisions — reserve for significant architectural choices that affect multiple components or have long-term implications

## Gotchas

- ⚡ **Silent ADR editing**: The agent may update an accepted ADR in-place when context changes, instead of creating a superseding ADR. Never modify an accepted ADR — always create a new one with a supersession chain. The history matters.
- ⚡ **Orphaned cross-references**: When an ADR is superseded, the agent updates the old ADR and creates the new one, but forgets to update HLD sections that referenced the old ADR. Always scan the HLD for references to the superseded ADR and update them.
- ⚡ **Single-option ADRs**: The agent sometimes creates ADRs with only the selected option, omitting alternatives. An ADR without rejected alternatives doesn't document the decision — it documents a conclusion. Always include at least 2 options.
- ⚡ **Proposed status accumulation**: ADRs created early in the process tend to stay in `Proposed` status because the agent moves on to the next decision. Track all `Proposed` ADRs and present them for acceptance at each gate checkpoint.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.util.adr-lifecycle:0.1.1:2026-08-31T12:53:30Z -->
