# B.1: Context & Design Direction

## Objective

Scope the architecture engagement, produce a validated boundary map and truth hierarchy, generate an initial breadth-first design sketch with quality attribute constraints and negative boundary statements, and iterate via calibration loop until direction is approved.

## Entry Criteria

- [ ] B.0 complete (or skipped per entry conditions)
- [ ] Approved PRD available at `explore/prds/[slug]-prd.md`

**Load skills (eager — persist through all B sub-steps)**:
- `explore.util.decision-log`
- `explore.util.blocker-register`

---

## B.1.1 — Engagement Setup

**Objective**: Confirm architecture engagement scope from Explore artifacts and `architecture-context.md`. Initialize decision log and blocker register.

**Pre-populate from `architecture-context.md`** (agent confirms, does not re-ask):

| Field | Source |
|-------|--------|
| Existing architecture state | `architecture-context.md` Section 1 — Existing Architecture Baseline |
| Landscape answers (AQ-001–012) | `architecture-context.md` Section 2 — Landscape Assessment |
| Architecture drivers | `architecture-context.md` Section 3 — Architecture Drivers |
| Domain model sketch | `architecture-context.md` Section 4 — Domain Model Sketch |
| Constraints | `architecture-context.md` Section 5 — Constraints Register |
| Open questions | `architecture-context.md` Section 6 — Open Questions |

**Pre-populate from other Explore artifacts**:

| Field | Source |
|-------|--------|
| Engagement type | `explore-bundle.md` Explore Type (FL → Confirmation, ERC → Analysis+HLD, D/C → Comprehensive) |
| Quality attributes | `technical-feasibility.md` design guardrails + `explore-bundle.md` constraints |
| Applicable regulations | `regulatory-compliance.md` applicable standards |
| Stakeholder register | `context.md` Stakeholder Map & RACI |
| Success criteria | `explore-bundle.md` expected outputs + `hypothesis.md` success metrics |
| Hardening config | 4 BASE categories (always) + EXTENDED driven by quality attributes and regulations |
| Ideation direction seeds | `[slug]-refined-concepts.md` architecture implications + `[slug]-framing.md` problem classification |
| PRD requirements | `[slug]-prd.md` — full requirements (R-XXX), NFRs (NFR-XXX), constraints, success metrics |

**Fallback (if `architecture-context.md` does not exist)**:
Read individual Explore artifacts directly. Log warning: "Architecture context not available — reading individual artifacts. Discovery findings are not consolidated."

**Agent initializes**:
- `explore/hlds/[slug]-decision-log.md` — running decision log
- `explore/hlds/[slug]-blocker-register.md` — running blocker register

Each decision log entry may include timing classification: **NOW** (must decide before HLD finalized) / **SOON** (before implementation) / **LATER** (before production) / **DEFERRED** (out of scope with rationale).

**STOP — AskUserQuestion:**

```
Question ARCH-B1a
  Header:      "Architecture Engagement Scope"
  Question:    "I've scoped the architecture engagement from Explore artifacts, architecture context, and PRD:
                Type: [type based on Explore Type]
                Quality priorities: [top 3-5]
                Constraints: [N] (from architecture-context.md + technical-feasibility.md)
                Regulations: [N] (from regulatory-compliance.md)
                Stakeholders: [N] (from context.md RACI)
                Hardening: [4 base + N extended] categories
                Direction seeds: [N] concepts from Ideation
                PRD requirements: [N] functional (R-XXX), [N] non-functional (NFR-XXX)
                Architecture drivers: [N] ranked (from architecture-context.md)
                
                Please confirm the architecture engagement scope."
  Multi-select: No
  Options:
    - Confirmed — proceed with this scope
    - Adjust — I need to change some of these
    - Add constraints — I have additional architectural constraints
```

Write `explore/hlds/[slug]-engagement-brief.md`.

---

## B.1.2 — Boundary Map + Truth Hierarchy

**Load skill**: `explore.proc.boundary-mapping`

**Inputs consumed**:

| Artifact | Location | What is extracted |
|----------|----------|------------------|
| `architecture-context.md` | `explore/explore-[slug]/` | Existing architecture baseline, domain model sketch, constraints register |
| `context.md` | `explore/explore-[slug]/` | Domain model, system map, stakeholder map, governance framework |
| `domain-analysis.md` | `explore/explore-[slug]/` | Entity relationships, bounded contexts, domain rules |
| `technical-feasibility.md` | `explore/explore-[slug]/` | System context, integrations, dependencies, design guardrails |
| `[slug]-refined-concepts.md` | `explore/explore-[slug]/ideation/` | Architecture implications from ideation |
| `[slug]-prd.md` | `explore/prds/` | Requirements, constraints, NFRs |

**Agent produces**:
1. **Ownership matrix** — what each domain OWNS, CONSUMES, PRODUCES (seeded from `architecture-context.md` domain model sketch + `context.md` system map + `domain-analysis.md` entities)
2. **Upstream dependencies** — events, APIs, data needed; contract status (Exists / Needs Creation / PROVISIONAL)
3. **Platform conventions** — patterns from adjacent HLDs to inherit or deviate from
4. **Open questions** — ambiguities and gaps requiring resolution
5. **Truth hierarchy** — Authority → Scope → Consumers → Constraints

**Evidence labeling**: Mark every claim as `[OBS]`, `[INF]`, or `[ASM]` with source artifact reference.

Write `explore/hlds/[slug]-boundary-map.md` and `explore/hlds/[slug]-truth-hierarchy.md`.

**STOP — AskUserQuestion:**

```
Question ARCH-B1b
  Header:      "Boundary Map & Truth Hierarchy"
  Question:    "I've produced the boundary map and truth hierarchy from Explore artifacts.
                Please validate:
                1. Is the truth hierarchy correct?
                2. Is the ownership matrix accurate?
                3. Are upstream dependencies missing or wrong?
                4. Any open questions I missed?"
  Multi-select: No
  Options:
    - All correct — proceed to design sketch
    - Corrections needed — I'll provide specific corrections
    - Major reframe needed — boundaries are fundamentally different
```

---

## B.1.3 — Design Sketch

**Load skill**: `explore.proc.design-sketch` (replaces boundary-mapping to stay within 3-skill limit)

**Inputs consumed**:

| Artifact | Location | What is extracted |
|----------|----------|------------------|
| `[slug]-boundary-map.md` | `explore/hlds/` | Validated boundaries and ownership (from B.1.2) |
| `[slug]-truth-hierarchy.md` | `explore/hlds/` | Authority and scope (from B.1.2) |
| `architecture-context.md` | `explore/explore-[slug]/` | Architecture drivers, constraints register, domain model sketch |
| `technical-feasibility.md` | `explore/explore-[slug]/` | Technical constraints, opportunities, design guardrails |
| `[slug]-refined-concepts.md` | `explore/explore-[slug]/ideation/` | Selected concepts as direction seeds |
| `journey-[slug].md` | `explore/domain/` | Current-state flows informing integration design |
| `personas-[slug].md` | `explore/domain/` | User roles informing API surface and access patterns |
| `[slug]-prd.md` | `explore/prds/` | Requirements driving component design |
| `market-research.md` | `explore/explore-[slug]/` | Competitive differentiation context |
| `ooux.md` | `explore/design/` | Object model → service decomposition (conditional: D/C with `ui_in_scope`) |

**Agent produces a breadth-first design sketch**:

1. **Service boundaries** with justification (grounded in boundary map)
2. **Main components and responsibilities** (informed by domain model from `architecture-context.md`)
3. **Data model sketch** (seeded from `domain-analysis.md` entity relationships)
4. **Events produced and consumed** — milestone events only (M6)
5. **APIs needed** (informed by persona access patterns and journey touchpoints)
6. **Quality attribute constraints** — how architecture addresses each top NFR from engagement brief
7. **Negative boundary statements** for every component (M4) — what each component does NOT own
8. **Decision points** — present OPTIONS with tradeoffs, do NOT pre-select (reference pattern library)
9. **Ideation concept mapping** — how selected concepts from Ideation map to architectural components
10. **Open questions and explicit assumptions**

Write `explore/hlds/[slug]-design-sketch.md`.

**STOP — AskUserQuestion:**

```
Question ARCH-B1c
  Header:      "Design Sketch Review"
  Question:    "I've produced the initial design sketch grounded in Explore artifacts,
                architecture context, PRD requirements, and Ideation concepts.
                This is a scaffold, not a final design.
                1. Major omissions?
                2. Wrong boundaries?
                3. False assumptions?
                4. Decision points — which option do you prefer for each?"
  Multi-select: No
  Options:
    - Direction is right — proceed with minor corrections
    - Major reframe needed — approach needs to change
    - More context needed — I'll provide additional constraints
```

---

## B.1.4 — Calibration Loop

When PM/Architect provides feedback on the design sketch:

1. **Classify** feedback type:
   - **Content Correction** — factual error in the output → fix error, update decision log
   - **Evaluation Function Reset** — different framing or priority → adjust evaluation criteria, re-run affected analysis
   - **Context Injection** — new information not previously available → integrate, check for cascading impacts

2. **Apply** feedback to design sketch

3. **Update** decision log with what changed and why

4. **Regression check** — verify no previously accepted decisions silently changed:
   - Check component names consistent between B.1.2 boundary map and updated sketch
   - Check no ownership changes contradict validated truth hierarchy
   - Check terminology has not drifted from domain-analysis.md glossary

5. **Repeat** until direction approved

**Gate B.1** (human decides): PASS / CONDITIONAL PASS / FAIL

- **PASS** / **CONDITIONAL PASS** → proceed to B.2
- **FAIL** → loop back to B.1.3 with scoped rework

## Exit Criteria

- [ ] `[slug]-engagement-brief.md` written and confirmed
- [ ] `[slug]-decision-log.md` initialized
- [ ] `[slug]-blocker-register.md` initialized
- [ ] `[slug]-boundary-map.md` written and validated
- [ ] `[slug]-truth-hierarchy.md` written and validated
- [ ] `[slug]-design-sketch.md` written and direction approved (Gate B.1 PASS or CONDITIONAL PASS)
- [ ] All calibration feedback classified and applied
- [ ] All claims evidence-labeled (OBS/INF/ASM)

## Next Step

→ [B2-consolidated-hld-draft.md](./B2-consolidated-hld-draft.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.architecture-solutioning:1.0.1:2026-09-01T08:21:26Z -->
