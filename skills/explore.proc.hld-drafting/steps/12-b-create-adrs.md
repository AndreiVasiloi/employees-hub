# Step 12b: Create ADRs

**Mode**: `baseline` only

## Objective

Identify significant architectural decisions embedded in the existing system. Create an ADR for each using `explore.util.adr-lifecycle`. Link each ADR bidirectionally to the relevant HLD section.

## Entry Criteria

- [ ] Step 11b complete — HLD written to `explore/hlds/[slug]-existing-hld.md`

## Actions

### 12b.1 Identify Significant Decisions

Review the HLD (especially Sections 1.4, 3, 4, 5, and 8) and identify decisions that are architecturally significant. A decision is significant if:

- It would be difficult or expensive to reverse
- It constrains major downstream choices (technology, deployment, data model)
- It represents a non-obvious trade-off

Present the candidate list to the human:

```
Identified [N] significant architectural decisions for ADR capture:

| # | Decision Topic | HLD Section | Significance |
|---|---------------|-------------|--------------|
| 1 | [Topic] | Section [N] | [Why it matters] |
| 2 | [Topic] | Section [N] | [Why it matters] |
...

Would you like to add, remove, or adjust any decisions before I create the ADRs?
```

**STOP**: Wait for human confirmation of the decision list before creating ADRs.

### 12b.2 Load ADR Lifecycle Utility

> **Load utility:** `explore.util.adr-lifecycle`
>
> Follow the utility's procedure for creating, numbering, and managing ADRs.

### 12b.3 Create ADRs for Each Decision

For each confirmed decision, use `explore.util.adr-lifecycle` to:

1. Create an ADR file at `explore/decisions/[slug]-adr-NNN-[decision-name].md`
2. Follow `adr-lifecycle` numbering convention (scan existing ADRs, continue from highest)
3. Document at least 2 options considered for each decision
4. Set initial status to `Proposed`
5. Present each ADR to the human for approval

For each ADR, ask the human to provide:
- The rationale for why the documented option was chosen
- What alternatives were considered (even if not formally evaluated)
- Any known consequences or technical debt introduced

### 12b.4 Update ADR Statuses

After each ADR is reviewed by the human:
- Transition approved decisions to `Accepted`
- If the decision is known to be superseded, set to `Superseded` and link the newer decision
- No ADR should remain in `Proposed` status at the end of this step

### 12b.5 Link ADRs to HLD

Update the written HLD (`[slug]-existing-hld.md`) to add ADR references:
- In **Section 1.4** (Key Architecture Decisions): list all ADRs with one-line summaries
- In each relevant section body: add inline reference `(see [slug]-adr-NNN-[name].md)`

## Exit Criteria

- [ ] All significant decisions identified and confirmed with human
- [ ] ADR files created at `explore/decisions/[slug]-adr-NNN-[name].md`
- [ ] ADR numbering sequential with no gaps
- [ ] Every ADR has at least 2 options documented
- [ ] All ADRs transitioned from Proposed to Accepted or Superseded
- [ ] HLD Section 1.4 and relevant section bodies updated with ADR references

## Next Step

→ [13-b-validate.md](./13-b-validate.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.hld-drafting:0.2.1:2026-08-31T12:53:29Z -->
