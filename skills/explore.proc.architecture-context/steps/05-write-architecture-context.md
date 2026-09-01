# Step 5: Write Architecture Context

## Objective

Consolidate all findings from Steps 1-4 into a single `architecture-context.md` artifact that serves as the primary input for architecture solutioning in Step 5.

## Entry Criteria

- [ ] Step 1 complete — documents ingested, existing-state baseline produced
- [ ] Step 2 complete (or skipped per Fast Lane) — landscape captured
- [ ] Step 3 complete — architecture drivers extracted and validated
- [ ] Step 4 complete (or skipped per Fast Lane/ERC) — domain model sketched

## Actions

### 5.1 Assemble Architecture Context

Write `explore/explore-[slug]/architecture-context.md` with the following sections:

**Front matter:**
- slug, explore_type, created date, status (VALIDATED)
- steps_completed (subset per Explore Type)
- source_documents count
- evidence_coverage (OBS/INF/ASM counts)

**Section 1 — Existing Architecture Baseline** (from Step 1):
- System overview (as-is) or "Greenfield — no existing system"
- Component inventory, integration points, technology stack (if legacy)
- Known issues and technical debt
- Existing decisions extracted (ADR references)

**Section 2 — Landscape Assessment** (from Step 2, or "Skipped (Fast Lane)"):
- AQ Question Answers table (ID, Question, Answer, Source, Evidence label)
- IT Environment Summary
- Maturity Assessment table (Dimension, Level, Evidence)

**Section 3 — Architecture Drivers** (from Step 3):
- Ranked Driver Matrix (Rank, Driver, Type, Impact, Uncertainty, Tension With, Source, Evidence)
- Functional Drivers with MUST/SHOULD/COULD priorities
- Quality Attributes with measurable targets
- PoC Candidates (high-uncertainty drivers needing validation)

**Section 4 — Domain Model Sketch** (from Step 4, or "Skipped" if applicable):
- Bounded Contexts with responsibilities and data ownership
- Context Map (Mermaid diagram)
- Core Aggregates with state machines (D/C only)
- Glossary Additions (new terms not already in glossary)

**Section 5 — Constraints Register** (consolidated from Steps 1-3):
- Table: #, Constraint, Type (Platform/Technology/Skills/Regulatory/...), Classification (Hard/Soft), Source, Evidence

**Section 6 — Open Questions:**
- Table: #, Question, Owner, Priority, Impact if Unresolved, Source Step

### 5.2 Cross-Reference Validation

Before finalizing, validate:
- [ ] Every functional driver (MUST) maps to a bounded context (if Step 4 ran)
- [ ] Every hard constraint is reflected in at least one driver or quality attribute
- [ ] No ASM-tagged items are presented as facts
- [ ] All AQ questions are accounted for (answered, confirmed, or documented as gaps)
- [ ] Existing-state findings (Step 1) are consistent with landscape assessment (Step 2)
- [ ] Glossary additions do not conflict with existing `explore/glossary.md` or `domain-analysis.md`

### 5.3 Identify Solutioning Inputs

Append a **Solutioning Readiness Summary** to the artifact:

- Checklist of what is available for B.1 (Context & Design Direction): existing architecture baseline, landscape assessment, ranked drivers, domain model sketch, constraints register
- High-priority items for solutioning to address (top 3-5 drivers/constraints that shape design)
- Risks carried forward (ASM items, open questions with impact)

## Checkpoint

**STOP — AskUserQuestion:**

```
Question AC-5
  Header:      "Architecture Context Complete"
  Question:    "I've produced the consolidated architecture-context.md:
                Source documents ingested: [N]
                Existing-state baseline: [Produced / Greenfield]
                Landscape questions: [N] answered
                Architecture drivers: [N] ranked (top: [driver 1], [driver 2])
                Constraints: [N] hard, [N] soft
                Domain model: [N] bounded contexts (or Skipped)
                Open questions: [N]
                Evidence: [N] OBS, [N] INF, [N] ASM
                
                Ready for solutioning after PRD step."
  Multi-select: No
  Options:
    - Approved — architecture context is complete
    - Corrections — specific items need fixing
    - Additional context — I have more information to add
```

## Exit Criteria

- [ ] `explore/explore-[slug]/architecture-context.md` written with all applicable sections
- [ ] Cross-reference validation passed
- [ ] Solutioning readiness summary appended
- [ ] All findings evidence-labeled (OBS/INF/ASM)
- [ ] Human has approved the architecture context
- [ ] Agent Step 2 discovery tracker updated: Architecture Context row marked complete

## Next Step

Architecture context complete. Return to `explore.agent` Step 2 for remaining discovery activities.

The `architecture-context.md` artifact will be consumed by `explore.proc.architecture-solutioning` in Step 5 (after PRD generation in Step 4).

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.architecture-context:1.0.1:2026-08-27T13:34:38Z -->
