# Step 5: Architecture, Strategy & Backlog

**Consolidates**: Architecture Solutioning workflow, Test & DevOps Strategy, Epic Forming, and Govern Readiness Check.

**Skills Required**: Load skills on-demand as each part executes (lazy loading for token efficiency):
- **Part 1 (Architecture)**: Load `explore.proc.architecture-solutioning` — single skill manages the full B.0–B.4 lifecycle. Sub-skills loaded on-demand per sub-step:
  - **B.0 (Domain Onboarding)**: Load `explore.proc.domain-onboarding` — skip if domain profile already exists
  - **B.1 (Context & Design Direction)**: Load `explore.proc.boundary-mapping` then `explore.proc.design-sketch`. Also load `explore.util.decision-log` and `explore.util.blocker-register` (Eager — persist through all B sub-steps)
  - **B.2 (Consolidated Draft)**: Load `explore.proc.hld-drafting`
  - **B.3 (Review & Hardening)**: Load `explore.proc.feedback-integration`; load `explore.util.cross-domain-alignment` if adjacent HLDs available
  - **B.4 (Socialization & Handoff)**: Load `explore.proc.socialization-handoff`
- **Part 2 (Strategies)**: Load `explore.proc.test-strategy` and `explore.proc.define-devops-strategy` after HLD is complete
- **Part 3 (Epics & Tasks)**: Epic forming and iteration events (steering team triggered)
- **Part 4 (Govern Readiness)**: Govern readiness checklist

**Objective**: Produce architecture baseline (HLD, ADRs), test & DevOps strategies, epics, tasks, run Govern Readiness Check, and prepare handoff to Govern phase. Depth adapts based on Explore Type.

---

## Trigger Phrases

| Shorthand | Full Phrase |
|-----------|-------------|
| `Explore Architecture` | `Let's start the architecture work...` |
| `Explore Strategy` | `Let's generate test and DevOps strategies...` |
| `Prepare for Govern` | `Prepare the backlog for Govern handoff...` |

---

## Prerequisites (Gate In)

Before running this step:
- [ ] PRD complete and approved (Step 4 Part A finished — all 4 groups signed off)
- [ ] Architecture readiness confirmed (evaluation passed in Step 4)
- [ ] Risk register complete
- [ ] Experience designs complete (if applicable for Explore Type)
- [ ] All discovery and design artifacts are complete and cross-referenced

**If prerequisites are not met, return to Step 4 (PRD & Experience Design).**

---

## Execution Settings

> See SKILL.md § Execution Defaults for temperature, one-step-at-a-time, and Human-First rules.

**Step-specific risks with high temperature (>0.5):**
- Hallucinated architectural decisions not grounded in discovery
- Unsupported assumptions in HLD
- False confidence in readiness assessments
- Boundary violations in architecture (M1)

---

## Loader Protocol

Every `**Load skill:**` block in this step MUST be executed as follows:

1. **Check presence:**
   ```bash
   dft skills list --json | jq -e '.[] | select(.slug == "<slug>")'
   ```
2. **Install if missing:**
   ```bash
   dft skills add <slug>
   ```
   `dft skills add` resolves transitive dependencies automatically.
3. **Install optional sub-skills, if any.** `dft skills add <slug>` (step 2) resolves the full transitive `requires` tree automatically. Any `optional = [...]` entries in the skill's `flow.toml` are NOT resolved by `dft` and must be installed explicitly by the step body when the corresponding sub-step may run (see § Sub-skill Install Pass below for the canonical pattern).
4. **On install failure**, branch by class:
   - **Workflow skill** → **STOP**. Surface the `dft` error to the steering team. Do not proceed to the next action.
   - **Auxiliary skill** → warn the steering team, note degraded quality, continue.
5. **Confirm readiness** before executing the skill:
   ```
   ✓ <slug> ready
   ```

**Classification for this step:**

| Slug | Class | On install failure |
|------|-------|--------------------|
| `explore.proc.architecture-solutioning` | workflow | STOP — entire B.0–B.4 lifecycle blocked |
| `explore.proc.test-strategy` | workflow | STOP — mandatory Part 2 deliverable |
| `explore.proc.define-devops-strategy` | workflow | STOP — mandatory Part 2 deliverable |
| `explore.proc.boundary-mapping` | auxiliary (sub-skill of architecture-solutioning) | warn + note impact on B.1 |
| `explore.proc.design-sketch` | auxiliary (sub-skill) | warn + note impact on B.1 |
| `explore.proc.hld-drafting` | auxiliary (sub-skill) | warn + note impact on B.2 |
| `explore.proc.feedback-integration` | auxiliary (sub-skill) | warn + note impact on B.3 |
| `explore.proc.socialization-handoff` | auxiliary (sub-skill) | warn + note impact on B.4 |
| `explore.proc.domain-onboarding` | auxiliary | warn + skip B.0 if no domain profile |
| `explore.util.decision-log` | auxiliary | warn + continue with ad-hoc decisions |
| `explore.util.blocker-register` | auxiliary | warn + continue with ad-hoc blockers |
| `explore.util.cross-domain-alignment` | auxiliary | warn + skip B.3.2 |

**Sub-skill policy**: The workflow STOP for the architecture package is owned exclusively by `explore.proc.architecture-solutioning`. If a sub-skill fails to install, warn and continue; do NOT halt the parent. `explore.proc.architecture-solutioning` itself will surface any sub-step gap when it runs the affected sub-step.

---

## Explore Type Adaptation

> **Canonical reference**: [`explore.proc.architecture-solutioning/SKILL.md`](../../proc/architecture-solutioning/SKILL.md) § Explore Type Adaptation — sub-step depth by Explore Type. See also [`arch-depth-matrix.md`](../../proc/architecture-context/arch-depth-matrix.md) for the full depth matrix (updated for new skill names).

---

## What This Step Does

1. **Architecture** (Part 1) - HLD, ADRs, architecture package (depth varies by Explore Type)
2. **Test & DevOps Strategy** (Part 2) - After HLD complete, produce strategy documents
3. **Epic Forming & Tasks** (Part 3) - Steering team triggers epic/task generation
4. **Govern Readiness Check** (Part 4) - Comprehensive checklist evaluation
5. **Consistency Check** - Cross-artifact validation
6. **Glossary Update** - Update `explore/glossary.md`

**Key Difference from Agent-First:**
- Single architecture path via `explore.proc.architecture-solutioning` (no path selection needed)
- Epic forming and iteration events require explicit steering team trigger
- Agent does NOT automatically proceed to epic/task generation

---

## Part 1: Technical Architecture

> **Governing Principles**: The Architect Mindset (M1–M12) is always active throughout this part. See `explore.proc.architecture-solutioning/SKILL.md` §Always-Active Behaviors and §Copilot Governance for the full enforcement rules.
>
> **Interaction model**: Human-First (Leading Authority). The agent operates as a co-pilot — it generates, synthesizes, and checks consistency. The PM/Architect retains control over truth hierarchy, boundary decisions, blocker classification, and gate outcomes.
>
> **Gate model**: PASS / CONDITIONAL PASS (proceed with tracked caveats) / FAIL (loop back with scoped rework) / WHOLESALE REDESIGN (fundamental flaw — retain M12 outcomes, loop to B.1). Every gate is human-decided.

---

### Domain-Analysis Gate (before HLD generation)

**Agent checks for domain analysis artifacts:**

1. **Check for** `explore/explore-[slug]/domain-analysis.md`
2. **If found**: Load Domain Glossary, validate terminology, apply domain naming convention
3. **Name each HLD** as `HLD · [Domain Name]` (exact glossary match from `domain-analysis.md`)
4. **Validate terminology** in all architecture artifacts → flag `[GLOSSARY-GAP: term "{term}" not found in domain-analysis.md]`
5. **Add traceability header** to every HLD:

```yaml
---
domain: [Domain Name from glossary]
source: explore/explore-[slug]/domain-analysis.md
glossary_version: [hash or date of domain-analysis.md]
validated_by: [steering team member]
explore_type: [Fast Lane / ERC / Diverge/Converge]
evidence_label: OBS  # All domain names are OBSERVED from domain-analysis.md
---
```

**If domain-analysis.md NOT found + multi-domain Explore:**
> **STOP** — Domain analysis is required for multi-domain Explores. Return to Step 2 Activity 3 or run domain analysis now before proceeding with architecture.

**If domain-analysis.md NOT found + single-domain Explore:**
> **STOP** — Domain analysis is required for all Explores regardless of domain count. Return to Step 2 Activity 3 or run domain analysis now before proceeding with architecture.

---

#### Context Bridge — What This Step Provides to Architecture Solutioning

All artifacts from Explore Steps 1–4 consumed by `explore.proc.architecture-solutioning`. The primary context input is `architecture-context.md` (from Step 2 Activity 6). Additional Explore artifacts are consumed per sub-step.

> **Note**: `discovery.md` is used directly by this step (Part 4 Govern Readiness audit trail) — not passed to the solutioning skill.

| Artifact | Location | Produced In | Solutioning Sub-steps |
|----------|----------|-------------|----------------------|
| **`architecture-context.md`** | `explore/explore-[slug]/` | **Step 2 Activity 6** | **B.1.1 (primary input)** |
| `explore-bundle.md` | `explore/explore-[slug]/` | Step 1 | B.0, B.1.1 |
| `context.md` | `explore/explore-[slug]/` | Step 2 Activity 1 | B.0, B.1.1, B.1.2, B.3.1 |
| `domain-analysis.md` | `explore/explore-[slug]/` | Step 2 Activity 3 | B.0, B.1.2, B.4.2 |
| `technical-feasibility.md` | `explore/explore-[slug]/` | Step 2 Activity 5 | B.0, B.1.1, B.1.2, B.1.3, B.2 |
| `regulatory-compliance.md` | `explore/explore-[slug]/` | Step 2 Activity 4 (optional) | B.0, B.1.1, B.2, B.3.4 |
| `hypothesis.md` | `explore/explore-[slug]/` | Step 2 Activity 9 (D/C) | B.1.1, B.3.4 |
| `market-research.md` | `explore/explore-[slug]/` | Step 2 Activity 2 (optional) | B.1.3 |
| `personas-[slug].md` | `explore/domain/` | Step 2 Activity 7 (optional) | B.1.3, B.2 |
| `journey-[slug].md` | `explore/domain/` | Step 2 Activity 8 (optional) | B.1.3, B.2 |
| `flows-[slug].md` | `explore/domain/` | Step 4 Part B | B.1.3, B.2 |
| `[slug]-refined-concepts.md` | `explore/explore-[slug]/ideation/` | Step 3 | B.1.1, B.1.2, B.1.3 |
| `[slug]-framing.md` | `explore/explore-[slug]/ideation/` | Step 3 | B.1.1 |
| `[slug]-prd.md` | `explore/prds/` | Step 4 Part A | B.1.1, B.1.2, B.1.3, B.2, B.3.4 |
| `risks.md` | `explore/explore-[slug]/` | Step 4 Part C | B.3.4 |
| `ooux.md` | `explore/design/` | Step 4 Part B | B.1.3 (conditional: D/C with `ui_in_scope`) |
| `design-language.md` | `explore/design/` | Step 4 Part B | B.2 (conditional: FL exit) |
| `design-system.md` | `explore/design/` | Step 4 Part B | B.2 (conditional: D/C with `ui_in_scope`) |
| `component-inventory.md` | `explore/design/` | Step 4 Part B | B.2 (conditional: D/C) |
| `handoff-notes.md` | `explore/design/` | Step 4 Part B | B.2, B.3.4 (conditional: D/C) |
| `accessibility-[slug].md` | `explore/design/` | Step 4 Part B | B.2 (conditional) |
| `glossary.md` | `explore/` | Throughout Explore | B.4.2 |

---


#### Architecture Context Detection

The agent checks for `architecture-context.md` before starting any B sub-step:

| Signal | Effect on B sub-steps |
|--------|----------------------|
| `architecture-context.md` exists in `explore/explore-[slug]/` | B.1.1 reads consolidated context (drivers, landscape, constraints, domain model) directly from this artifact. Higher-quality path — discovery findings are pre-consolidated. |
| `architecture-context.md` absent | B.1.1 falls back to reading individual Explore artifacts directly (`context.md`, `technical-feasibility.md`, `domain-analysis.md`, etc.). Lower-quality path — discovery findings not consolidated. Agent logs warning. |

**No `context_mode` branching** — the solutioning skill always follows the same B.0–B.4 structure. The presence of `architecture-context.md` simply determines pre-population depth in B.1.1.

---

### Load Architecture Solutioning Skill

> **Load skill:** `explore.proc.architecture-solutioning` — follow Loader Protocol above. Workflow skill; STOP on install failure blocks the entire B.0–B.4 lifecycle.

**Sub-skill Install Pass** (run immediately after `explore.proc.architecture-solutioning` installs):

1. **Required sub-skills are already installed.** `dft skills add explore.proc.architecture-solutioning` resolves the full transitive `requires` tree as part of step 2 of the Loader Protocol. Expected set (for auditing only — do NOT re-install):
   - `explore.proc.boundary-mapping` (B.1)
   - `explore.proc.design-sketch` (B.1)
   - `explore.proc.hld-drafting` (B.2)
   - `explore.proc.feedback-integration` (B.3)
   - `explore.proc.socialization-handoff` (B.4)
   - `explore.util.decision-log` (persists B.0–B.4)
   - `explore.util.blocker-register` (persists B.0–B.4)

   Verify with:
   ```bash
   dft skills list --json | jq -r '.[].slug' | sort > /tmp/installed.txt
   for s in explore.proc.boundary-mapping explore.proc.design-sketch explore.proc.hld-drafting explore.proc.feedback-integration explore.proc.socialization-handoff explore.util.decision-log explore.util.blocker-register; do
     grep -qx "$s" /tmp/installed.txt || echo "MISSING: $s"
   done
   ```
   If any `MISSING:` line appears, surface the warning per the auxiliary branch of the Loader Protocol and continue.

2. **Optional sub-skills must be installed explicitly.** The `optional = [...]` array in the skill's `flow.toml` is NOT resolved by `dft skills add` (the current dft schema ignores it). For each slug below, run `dft skills add <slug>` only if the corresponding sub-step may run in this engagement:
   - `explore.proc.domain-onboarding` (B.0 — skip if a domain profile already exists)
   - `explore.util.cross-domain-alignment` (B.3.2 — install only if adjacent HLDs are available)

3. **Apply sub-skill failure semantics** from the classification table above: warn and continue on individual sub-skill failures; do NOT STOP the parent workflow here. `explore.proc.architecture-solutioning` will surface any sub-step gap when it runs the affected sub-step.

Pass to skill:
- `slug` — project identifier
- Standard artifact paths from the Context Bridge table above

The skill manages its own sub-step execution (B.0 → B.1 → B.2 → B.3 → B.4) and all human gates (ARCH-B0 through ARCH-B4). See `explore.proc.architecture-solutioning/SKILL.md` for the full skill definition including sub-step detail, always-active behaviors, Copilot Governance, and Explore Type adaptation.

**Explore Type adaptation**: See [`explore.proc.architecture-solutioning/SKILL.md`](../../proc/architecture-solutioning/SKILL.md) § Explore Type Adaptation for sub-step depth by Explore Type.

---

### On Completion

When `explore.proc.architecture-solutioning` Gate B.4 returns PASS or CONDITIONAL PASS:

1. **Update `discovery.md`** — set HLD row and all ADR rows from ⏳ → ✓
2. **Apply backport findings** — if `[slug]-backport-findings.md` contains items for upstream artifacts (PRD, risks, glossary), apply or flag for steering team action
3. **Proceed to Part 2** (Test & DevOps Strategy — automatic, no steering team trigger required)

**Architecture package produced by skill:**
- `explore/hlds/[slug]-hld.md` — socialization-ready HLD (14 sections)
- `explore/hlds/[slug]-engagement-brief.md` · `[slug]-boundary-map.md` · `[slug]-truth-hierarchy.md` · `[slug]-design-sketch.md`
- `explore/hlds/[slug]-decision-log.md` · `[slug]-blocker-register.md` · `[slug]-backport-findings.md`
- `explore/hlds/[slug]-feedback-disposition.md` (if B.3.1 ran) · `[slug]-cross-domain-alignment.md` (if B.3.2 ran)
- `explore/decisions/[slug]-adr-[###]-[name].md` (one per significant decision, all Accepted)

---

## Part 2: Test & DevOps Strategy

**Position**: After HLD is complete (Part 1 finished), before Epic Forming.

**Skills Required**: Load after HLD is written:
- **Test Strategy**: Load `explore.proc.test-strategy` skill (9-step process)
- **DevOps Strategy**: Load `explore.proc.define-devops-strategy` skill (11-step process)

**Objective**: Produce comprehensive test strategy and DevOps strategy documents grounded in the complete PRD and HLD. These complement the PRD's Group 3 (Quality Definition) with full-depth strategy documents.

### Trigger

**Agent proceeds automatically after Architecture package is complete (Part 1 finished).** Both strategies are mandatory.

**Agent declares after Part 1 Architecture is complete:**

```
Architecture Complete — Proceeding to Test & DevOps Strategy

The HLD and architecture package are complete. Before proceeding to
epic forming, we will now define:

1. **Test Strategy** — Comprehensive testing pyramid, automation, coverage
   targets, CI/CD quality gates, test data strategy (9-step process)
   
2. **DevOps Strategy** — CI/CD pipeline design, environment model, IaC,
   observability, DevSecOps, governance, DORA metrics (11-step process)

These strategies complement the PRD's Quality Definition (Group 3,
from Step 4) with full-depth documents.

Available artifacts for grounding:
  - PRD: explore/prds/[slug]-prd.md (from Step 4)
  - HLD: explore/hlds/[slug]-hld.md (from Part 1)
  - ADRs: explore/decisions/[slug]-adr-*.md (from Part 1)
  - Risk register: explore/explore-[slug]/risks.md (from Step 4)
  - Tech stack: from HLD Section 6

Starting with Test Strategy...
```

### Explore Type Adaptation

Both strategies are always produced. Depth varies by Explore Type:

| Component | Fast Lane | ERC | Diverge/Converge |
|-----------|-----------|-----|------------------|
| **Test Strategy** | ✅ Lightweight (key layers + coverage targets) | ✅ Standard (full 9-step process) | ✅ Full depth (full 9-step process with extended analysis) |
| **DevOps Strategy** | ✅ Lightweight (pipeline + environments + key gates) | ✅ Standard (full 11-step process) | ✅ Full depth (full 11-step process with extended analysis) |

---

### Test Strategy

> **Load skill:** `explore.proc.test-strategy` — follow Loader Protocol above. Workflow skill.

**Context bridge — what the Explore Agent provides to the test-strategy skill:**

| Test Strategy Input | Source from Explore Agent | Location |
|---------------------|--------------------------|----------|
| PRD | Step 4 Part A output (complete) | `explore/prds/[slug]-prd.md` |
| HLD | Step 5 Part 1 output | `explore/hlds/[slug]-hld.md` |
| ADRs | Step 5 Part 1 output | `explore/decisions/[slug]-adr-*.md` |
| Tech stack | HLD Section 6 (Technology Stack) | Extracted from HLD |
| Component boundaries | HLD Section 3 (Component Breakdown) | Extracted from HLD |
| Quality attributes | PRD Group 3 (NFRs) + HLD Section 8 | `explore/prds/[slug]-prd.md` |
| Risk register | Step 4 Part C output | `explore/explore-[slug]/risks.md` |
| NFR targets | PRD Group 3 (Non-Functional Requirements) | Extracted from PRD |
| Acceptance criteria | PRD Group 3 (per requirement) | Extracted from PRD |
| Architecture drivers | Step 2 Activity 6 output (quality attributes) | `explore/explore-[slug]/architecture-drivers.md` |
| Regulatory compliance | Step 2 Activity 4 output (compliance requirements) | `explore/explore-[slug]/regulatory-compliance.md` |
| Accessibility specs | Step 4 Part B Activity 5 output (a11y requirements) | `explore/design/accessibility-[slug].md` |

**Explore Agent adaptations applied to test-strategy skill:**
- **Evidence labeling**: Test strategy claims tagged as OBS/INF/ASM consistent with Explore pipeline
- **PRD grounding**: Full PRD is available — use it as the primary input alongside HLD
- **Artifact location**: Output written to `explore/explore-[slug]/test-strategy.md`

**Agent delegates to test-strategy skill:**

```
Delegating to Test Strategy skill (explore.proc.test-strategy)

Inputs provided:
  - PRD: explore/prds/[slug]-prd.md (complete)
  - HLD: explore/hlds/[slug]-hld.md
  - ADRs: [N] decisions in explore/decisions/
  - Tech stack: [languages, frameworks from HLD]
  - Architecture type: [from HLD]
  - Risk profile: [from risks.md]
  - NFRs: [from PRD Group 3]
  - Acceptance criteria: [from PRD]

The test-strategy skill will guide you through 9 steps:
  01 — Load Context
  02 — Assess Scope & Risk
  03 — Define Pyramid Layers
  04 — Automation & Tooling
  05 — Test Data & Environments
  06 — CI/CD Quality Gates
  07 — Metrics & Coverage
  08 — Write Document
  09 — Validation

ONE STEP AT A TIME — follow the skill's interaction model.
```

**On completion:**

```
Test Strategy Complete

Output: explore/explore-[slug]/test-strategy.md

Summary:
  - Testing pyramid: [layer distribution]
  - Automation frameworks: [per layer]
  - Coverage targets: [per layer]
  - Quality gates: [N] gates defined
  - CI/CD integration: [pipeline stages mapped]
  
This document complements the PRD's Quality Definition (Group 3).
```

---

### DevOps Strategy

> **Load skill:** `explore.proc.define-devops-strategy` — follow Loader Protocol above. Workflow skill.

**Context bridge — what the Explore Agent provides to the devops-strategy skill:**

| DevOps Strategy Input | Source from Explore Agent | Location |
|-----------------------|--------------------------|----------|
| PRD | Step 4 Part A output (complete) | `explore/prds/[slug]-prd.md` |
| HLD | Step 5 Part 1 output | `explore/hlds/[slug]-hld.md` |
| ADRs | Step 5 Part 1 output | `explore/decisions/[slug]-adr-*.md` |
| Tech stack | HLD Section 6 (Technology Stack) | Extracted from HLD |
| Architecture type | HLD Section 2 (Architecture Approach) | Extracted from HLD |
| Test strategy | Test Strategy output (if just produced) | `explore/explore-[slug]/test-strategy.md` |
| Quality attributes | PRD Group 3 (NFRs) + HLD Section 8 | `explore/prds/[slug]-prd.md` |
| Deployment architecture | HLD Section 10 | Extracted from HLD |
| Monitoring baseline | HLD Section 11 | Extracted from HLD |
| Regulatory requirements | Step 2 regulatory compliance | `explore/explore-[slug]/regulatory-compliance.md` |
| Risk register | Step 4 Part C output | `explore/explore-[slug]/risks.md` |

**Explore Agent adaptations applied to devops-strategy skill:**
- **Evidence labeling**: DevOps strategy claims tagged as OBS/INF/ASM consistent with Explore pipeline
- **PRD grounding**: Full PRD is available — use it as the primary input alongside HLD
- **Test strategy alignment**: If test strategy was just produced, the devops-strategy skill MUST read it for quality gate alignment
- **Artifact location**: Output written to `explore/explore-[slug]/devops-strategy.md`

**Agent delegates to devops-strategy skill:**

```
Delegating to DevOps Strategy skill (explore.proc.define-devops-strategy)

Inputs provided:
  - PRD: explore/prds/[slug]-prd.md (complete)
  - HLD: explore/hlds/[slug]-hld.md
  - ADRs: [N] decisions in explore/decisions/
  - Tech stack: [languages, frameworks from HLD]
  - Architecture type: [from HLD]
  - Test strategy: [path if just produced, or "not available"]
  - Regulatory requirements: [from regulatory-compliance.md]
  - NFRs: [from PRD Group 3]

The devops-strategy skill will guide you through 11 steps:
  01 — Load Context
  02 — Assess Context
  03 — Design Pipeline
  04 — Design Environments
  05 — Design Release Strategy
  06 — Design Observability
  07 — Design DevSecOps
  08 — Design Governance
  09 — DORA Metrics
  10 — Write Document
  11 — Validation

ONE STEP AT A TIME — follow the skill's interaction model.
```

**On completion:**

```
DevOps Strategy Complete

Output: explore/explore-[slug]/devops-strategy.md

Summary:
  - CI/CD pipeline: [N] stages with quality gates
  - Environment model: [topology]
  - Release strategy: [approach]
  - Observability: [SLOs, alerting]
  - DevSecOps: [scanning integration]
  - DORA targets: [metrics]
  
This document complements the PRD's Quality Definition (Group 3).
```

---

### Strategy Artifact Updates

**Agent updates after strategies are produced:**

1. **Enriches `discovery.md`** — adds test-strategy and/or devops-strategy artifact paths, updates rows to ✓
2. **Enriches `explore-bundle.md`** — notes which strategies were produced
3. **Updates HLD cross-references** — if test or DevOps strategies identify changes needed in HLD Sections 10-11 (Deployment Architecture, Monitoring & Observability), agent proposes HLD amendments via back-port findings
4. **Updates PRD Group 3** — adds cross-references to the full strategy documents

**Artifact locations:**

| Artifact | Location | Status |
|----------|----------|--------|
| Test Strategy | `explore/explore-[slug]/test-strategy.md` | produced |
| DevOps Strategy | `explore/explore-[slug]/devops-strategy.md` | produced |

---

### Cross-Skill Integration Validation

Agent validates alignment between both strategies and existing artifacts:

```
Cross-Skill Alignment Check:

Test Strategy ↔ DevOps Strategy:
  [✓/✗] Quality gates in DevOps pipeline align with test strategy gates
  [✓/✗] CI/CD pipeline stages map to testing pyramid layers
  [✓/✗] Test environments align with DevOps environment model
  [✓/✗] Coverage targets are enforceable in pipeline quality gates
  [✓/✗] Test data strategy is compatible with environment provisioning

Test Strategy ↔ HLD:
  [✓/✗] Integration test boundaries match HLD component boundaries
  [✓/✗] Contract tests defined for all inter-service APIs in HLD
  [✓/✗] Performance test targets match HLD quality attribute targets

DevOps Strategy ↔ HLD:
  [✓/✗] Pipeline architecture matches HLD architecture type
  [✓/✗] Environment model supports HLD deployment architecture
  [✓/✗] Observability stack covers all HLD components
  [✓/✗] Release strategy compatible with HLD architecture type

Test Strategy ↔ PRD:
  [✓/✗] Test coverage addresses all PRD acceptance criteria
  [✓/✗] NFR targets from PRD have corresponding test targets
  [✓/✗] Quality gates enforce PRD quality attributes

DevOps Strategy ↔ PRD:
  [✓/✗] Deployment strategy supports PRD availability requirements
  [✓/✗] Observability SLOs match PRD performance targets
  [✓/✗] Compliance requirements from PRD are enforced in pipeline
```

**If misalignments found:**

```
Question SB-strategy-align
  Header:      "Strategy Alignment Issues"
  Question:    "I found [N] misalignments between strategies. How should we proceed?"
  Multi-select: No
  Options:
    - Fix now           — I'll address each misalignment
    - Accept as-is      — Document as known gaps; proceed to epic forming
    - Revise strategy   — Tell me which strategy to update
```

---

## Part 3: Epic Forming & Task Generation

### Pre-Epic Consistency Validation

**Before proceeding to epic forming, agent MUST trigger consistency-check process.**

**Agent action**: Recommend running the **consistency-check process** to validate:

- **Cross-activity consistency**: Ensure insights from different activities align
- **Persona-journey alignment**: Verify personas are consistent with journey maps
- **Insight validation**: Confirm insights are supported by data and analysis
- **Prototype consistency**: Ensure prototypes align with personas and journeys
- **Output completeness**: Validate all necessary artifacts are present and consistent

**Trigger phrase**: `Let's run a consistency check on the Explore outputs`

**Reference**: See `phases/02-explore/README.md` → Consistency Check Integration

---

### Turbine Glossary Integration

**Turbine** provides automated glossary management:

- **Automated extraction**: Extract terminology from all AI activity outputs
- **Glossary maintenance**: Update project glossary as new terms are identified
- **Consistency validation**: Validate consistent terminology usage across artifacts
- **Cross-reference checking**: Ensure terms used consistently in personas, journeys, insights
- **Living documentation**: Maintain evolving glossary reflecting current project terminology

**Agent action**: If Turbine is available, recommend glossary extraction before epic forming.

**Output**: `explore/glossary.md` updated with all domain terms from Explore artifacts

---

### Epic Forming Process

**Human-First Pattern: Steering team explicitly triggers epic forming (not automatic)**

**Agent declares**:

```
Architecture & Strategies Complete

**Artifacts ready for epic forming**:
- PRD: explore/prds/[slug]-prd.md (from Step 4)
- HLD: explore/hlds/[slug]-hld.md (from Part 1)
- ADRs: explore/decisions/[slug]-adr-*.md (from Part 1)
- Test Strategy: explore/explore-[slug]/test-strategy.md (from Part 2)
- DevOps Strategy: explore/explore-[slug]/devops-strategy.md (from Part 2)
- Personas: explore/domain/personas-[slug].md (if created)
- Journey Maps: explore/domain/journey-[slug].md (if created)
- Domain Model: explore/explore-[slug]/context.md
- Risk Register: explore/explore-[slug]/risks.md (from Step 4) — mitigation stories become acceptance criteria or dedicated stories
- Glossary: explore/glossary.md — acceptance criteria must use canonical terminology
- Accessibility Specs: explore/design/accessibility-[slug].md (if created) — a11y requirements become dedicated stories

**STOP HERE - Human decision required**

PRD, architecture, and strategies are complete. Epic forming is a separate
process that YOU must trigger.

**To continue:**
1. Review the PRD, HLD, and all artifacts
2. When ready, trigger epic forming: `Let's form epics from the [slug] Explore outputs`
3. OR skip epic forming if not needed for this project

**Reference**: See `phases/02-explore/README.md` → Epic Forming Process
```

**Human-First Enforcement:**
- Agent does NOT automatically proceed to epic forming
- Steering team must explicitly trigger epic forming process
- This prevents unwanted epic generation if steering team wants to adjust PRD first

---

### Iteration Event Trigger

**Human-First Pattern: Steering team explicitly triggers iteration event (not automatic)**

**Agent declares** (only if epic forming was completed):

```
Epics Formed

**Epics created**:
- explore/epics/[epic-1].md
- explore/epics/[epic-2].md
- explore/epics/[epic-3].md

**STOP HERE - Human decision required**

Epics are complete. Iteration event is a separate process that YOU must trigger.

**To continue:**
1. Review the epics
2. When ready, trigger iteration event: `Let's create an iteration event for [slug]`
3. OR skip iteration event if not needed yet

**Reference**: See `phases/02-explore/README.md` → Iteration Event

**Output**: Task stubs in `work/01-pending-planning/`
```

**Human-First Enforcement:**
- Agent does NOT automatically proceed to iteration event
- Steering team must explicitly trigger iteration event process
- This prevents unwanted task generation if steering team wants to adjust epics first

---

## Part 4: Govern Readiness Check

**The agent runs this checklist — not the human.**

Agent evaluates each item based on artifacts produced throughout the session. For each item it cannot confirm from artifacts alone, it asks the human a single targeted question.

**Agent runs and presents checklist:**

```
Govern Readiness Check — agent assessment:

Signal & Planning
  [✓/✗] Signal was Active and routed to Explore
  [✓/✗] Explore Bundle was produced and approved
  [✓/✗] All step checks completed

Step 2 — Discovery (Context + Stakeholder + Hypothesis)
  [✓/✗] Problem statement — unambiguous: [brief evidence]
  [✓/✗] Domain model — complete: [N entities, no undefined terms]
  [✓/✗] All [ASSUMPTION] claims — resolved or listed as open questions with owners
  [✓/✗] Technical constraints — documented and confirmed
  [✓/✗] Personas — evidence-based attributes documented
  [✓/✗] Journeys — current-state and target-state documented
  [✓/✗] Hypothesis — written, evidence-backed, stakeholder-validated

Step 3 — Ideation (if D/C or PM requested)
  [✓/✗] Ideation artifacts present (if Ideation was run)
  [✓/✗] Refined concepts documented with risks and assumptions
  [✓/✗] Solution Design seeding section completed
  [✓/✗] Discovery artifacts enriched retroactively

Step 4 — PRD & Experience Design
  [✓/✗] PRD — written, signed off, all 4 groups approved
  [✓/✗] Success metrics — measurable and testable
  [✓/✗] Information architecture — documented and approved
  [✓/✗] User flows — documented and approved
  [✓/✗] Wireframes — documented and approved
  [✓/✗] Usability test plan — documented
  [✓/✗] Accessibility specifications — documented
  [✓/✗] Future-state journey — added to journey map
  [✓/✗] Risk register — complete, all risks documented
  [✓/✗] Accepted risks — explicitly stated with steering team confirmation
  [✓/✗] Architecture readiness — PASS

Step 5 — Architecture, Strategy & Backlog
  [✓/✗] HLD — documented, hardened, and locked
  [✓/✗] ADRs — written with rationale for all key decisions, all Accepted
  [✓/✗] ADR trade-offs — each trade-off risk fed back to risk register (rejected alternatives as fallback scenarios)
  [✓/✗] Architecture package — complete (boundary map, truth hierarchy, decision log, blocker register)
  [✓/✗] DoD and DoR — defined for every task
  [✓/✗] NFRs — documented in PRD Group 3
  [✓/✗] At least one epic — formed with acceptance criteria referencing PRD
  [✓/✗] Tasks — in work/01-pending-planning/
  [✓/✗] Govern can start without a discovery meeting

Test & DevOps Strategy (Part 2)
  [✓/✗] Test strategy document exists and is complete
  [✓/✗] Test strategy aligns with HLD component boundaries
  [✓/✗] Test strategy coverage targets are enforceable in CI/CD quality gates
  [✓/✗] DevOps strategy document exists and is complete
  [✓/✗] DevOps strategy aligns with HLD architecture type
  [✓/✗] Quality gates in DevOps strategy align with test strategy
  [✓/✗] CI/CD pipeline stages map to testing pyramid layers
  [✓/✗] Cross-skill alignment check passed (or misalignments documented)

Execution Audit Trail
  [✓/✗] discovery.md artifact index matches actual files in explore/explore-[slug]/
  [✓/✗] discovery.md enrichment log confirms all steps executed (step completion evidence)

Enrichment Consistency
  [✓/✗] All enrichment logs are consistent across artifacts (no orphaned updates)
  [✓/✗] All ASSUMED → EVIDENCE-BASED transitions are logged with source

Process Integration Validation
  [✓/✗] Consistency check run and passed
  [✓/✗] Glossary updated (if Turbine available)
  [✓/✗] Epic forming process triggered and completed
  [✓/✗] Decision documentation complete (all ADRs + additional decisions)
  [✓/✗] Security review complete (if applicable)
  [✓/✗] Iteration event triggered (task stubs generated)

Domain Traceability (if domain-analysis.md was produced)
  [✓/✗] Every PRD named `PRD · [Domain Name]` from Domain Glossary
  [✓/✗] Every HLD named `HLD · [Domain Name]` from Domain Glossary
  [✓/✗] All PRD/HLD traceability headers complete
  [✓/✗] No unresolved `[GLOSSARY-GAP]` flags (or steering team accepted)
  [✓/✗] No unresolved `[DOMAIN-RULE-VIOLATION]` flags (or steering team accepted)
  [✓/✗] Domain-to-artifact mapping confirmed by steering team
  [✓/✗] glossary_version in headers matches current domain-analysis.md

Naming Convention Validation
  [✓/✗] All file names use lowercase, hyphen-separated slugs
  [✓/✗] No spaces or special characters in file names
  [✓/✗] ADRs numbered sequentially (001, 002, 003...)
  [✓/✗] All artifacts in correct `explore/` subfolders
  [✓/✗] Document history tables present in all artifacts
  [✓/✗] Cross-references valid and up-to-date
  [✓/✗] Glossary updated (single file at `explore/glossary.md`)

**Anti-patterns to check for**:
- ❌ Uppercase in file names
- ❌ Underscores instead of hyphens
- ❌ Missing slug in file names
- ❌ Artifacts outside `explore/` folder
- ❌ Duplicate glossary files per signal

Overall: [N] of [N] items confirmed.
```

**If any items are ✗**: agent identifies the specific artifact or action that closes the gap and proposes it.

**STOP — AskUserQuestion (only for ✗ items the agent cannot close from artifacts):**

```
Question SB-4
  Header:      "Govern Readiness gaps"
  Question:    "I found [N] items I cannot confirm from the artifacts alone.
                I need your input on: [specific items listed]."
  Multi-select: No
  Options:
    - I'll answer them now     — Provide input in the next message
    - They can be closed now   — Tell me what artifact or action closes each
    - Accept as known gaps     — Document as explicitly deferred with an owner
```

**After user responds:**
- Close gaps with provided information or artifacts
- Document deferred items with owners
- Update discovery.md status to PRD-READY
- Continue to Final Confirmation

---

### Human Checkpoint: Govern Readiness

**Final review before completing Step 5.**

**Review Criteria:**
- [ ] All Govern Readiness checklist items are ✓
- [ ] All gaps are closed or explicitly deferred
- [ ] Consistency check passed
- [ ] Epic forming and iteration event completed
- [ ] All artifacts are in correct locations

**Questions to consider:**
- Is Govern ready to execute without additional discovery?
- Are all critical gaps closed?
- Should we address any deferred items before handoff?

**Once reviewed:**
- Step 5 is complete
- Explore phase is complete
- Ready for Govern phase handoff

Once all items are confirmed, agent updates `discovery.md` status to PRD-READY and proceeds to final confirmation.

---

## Final Confirmation

**Agent presents complete artifact set:**

```
Step 5 complete. Full artifact set:

**Core Specification:**
explore/prds/[slug]-prd.md                                [approved]
explore/hlds/[slug]-hld.md                                [locked]
explore/decisions/[slug]-adr-001-[name].md                [accepted]
explore/decisions/[slug]-adr-00N-[name].md                [accepted]

**Domain & User Research:**
explore/domain/[slug]-domain.md                           [locked]
explore/domain/personas-[slug].md                         [validated]
explore/domain/journey-[slug].md                          [complete]
explore/domain/flows-[slug].md                            [approved]

**Experience Design:**
explore/design/information-architecture-[slug].md         [approved]
explore/design/wireframes-[slug].md                       [approved]
explore/design/usability-test-plan-[slug].md             [documented]
explore/design/accessibility-[slug].md                    [documented]

**Strategy Documents (Part 2):**
explore/explore-[slug]/test-strategy.md                   [complete]
explore/explore-[slug]/devops-strategy.md                 [complete]

**Discovery Context:**
explore/explore-[slug]/context.md                         [complete]
explore/explore-[slug]/market-research.md                 [complete]
explore/explore-[slug]/domain-analysis.md                 [complete]
explore/explore-[slug]/regulatory-compliance.md           [complete]
explore/explore-[slug]/technical-feasibility.md           [complete]
explore/explore-[slug]/hypothesis.md                      [stakeholder-validated]
explore/explore-[slug]/risks.md                           [complete]
explore/explore-[slug]/explore-bundle.md                  [approved]
explore/explore-[slug]/discovery.md                       [status: PRD-READY]

**Epics & Tasks:**
explore/epics/DFE-[EPIC-ID].md                            [formed]
explore/epics/DFE-[EPIC-ID].md                            [formed]
work/01-pending-planning/[task-stubs]                       [generated]

**Glossary:**
explore/glossary.md                                       [updated]

Consistency check:
  [✓] Terminology consistent with glossary
  [✓] All Signal [ASSUMPTION] claims appear as open questions
  [✓] Success metrics are measurable and testable
  [✓] Acceptance criteria reference PRD requirements
  [✓] DoD and DoR defined for every task
  [✓] No blank sections

Process handoffs ready:
  → Consistency Check (completed)
  → Turbine Glossary Extraction (completed if available)
  → Epic Forming Process (completed)
  → Decision Documentation (all ADRs documented)
  → Security Review (completed if applicable)
  → Iteration Event (task stubs generated)

Govern Readiness Check: PASS

All [N] checklist items confirmed. Context Warehouse fully populated.
Govern Agent can execute without discovering anything new.
```

---


---

## Exit Criteria (Gate Out)

Before completing Step 5 and handing off to Govern, verify:

**Architecture Artifacts (Part 1):**
- [ ] HLD documented, hardened, and locked (`explore/hlds/[slug]-hld.md`)
- [ ] All ADRs in Accepted status (`explore/decisions/[slug]-adr-*.md`)
- [ ] Boundary map validated (`explore/hlds/[slug]-boundary-map.md`)
- [ ] Truth hierarchy validated (`explore/hlds/[slug]-truth-hierarchy.md`)
- [ ] Decision log complete (`explore/hlds/[slug]-decision-log.md`)
- [ ] Blocker register complete (`explore/hlds/[slug]-blocker-register.md`)
- [ ] Hardening checklist passed (BASE + EXTENDED + DOMAIN categories)
- [ ] Hypothesis validation confirmed
- [ ] PRD validation confirmed (architecture delivers all PRD requirements)
- [ ] All evidence labels maintained (OBS/INF/ASM)

**PRD Artifacts (from Step 4):**
- [ ] PRD complete and approved (`explore/prds/[slug]-prd.md`)
- [ ] All 4 groups approved (Product Definition, Technical Specification, Quality Definition, Specification Completion)
- [ ] Success metrics are measurable and testable
- [ ] DoD and DoR defined
- [ ] NFRs documented
- [ ] Open questions documented with owners

**Epic & Task Artifacts:**
- [ ] Consistency check run and passed
- [ ] Glossary updated (`explore/glossary.md`)
- [ ] Epic forming process triggered and completed
- [ ] At least one epic formed (`explore/epics/DFE-[EPIC-ID].md`)
- [ ] Iteration event triggered (task stubs in `work/01-pending-planning/`)

**Test & DevOps Strategy (Part 2):**
- [ ] Test strategy complete and validated (`explore/explore-[slug]/test-strategy.md`)
- [ ] DevOps strategy complete and validated (`explore/explore-[slug]/devops-strategy.md`)
- [ ] Test strategy aligns with HLD component boundaries
- [ ] DevOps strategy aligns with HLD architecture type
- [ ] Cross-skill alignment check passed (quality gates, pipeline stages, coverage targets)

**Govern Readiness:**
- [ ] All Govern Readiness checklist items confirmed (✓)
- [ ] All artifacts in correct `explore/` subfolders
- [ ] All naming conventions followed (lowercase, hyphen-separated)
- [ ] ADRs numbered sequentially (001, 002, 003...)
- [ ] Document history tables present in all artifacts
- [ ] Cross-references valid and up-to-date
- [ ] Discovery.md status: PRD-READY
- [ ] All enrichment logs consistent

**Quality Gates:**
- [ ] All artifacts are evidenced (no hallucinated content)
- [ ] All Signal [ASSUMPTION] claims appear as open questions
- [ ] Terminology consistent with glossary
- [ ] Acceptance criteria reference PRD requirements
- [ ] No blank sections in any artifact

**Traceability:**
- [ ] PRD links back to Signal, Hypothesis, HLD, Personas, Journey Map, Risk Register
- [ ] Requirements trace to discovery findings
- [ ] Success metrics align with hypothesis (if D/C)
- [ ] Technical notes reference Step 2, Step 4, and Step 5 artifacts
- [ ] HLD cross-references PRD requirements

**If any criterion fails, STOP and address before completing Explore phase.**

---

## Workflow Complete

**STOP HERE** - Architecture, Strategy & Backlog step has finished.

**Explore Phase Complete**

This is the final step of the Explore Agent process. The Explore phase is now complete.

**What to do next:**

1. **Handoff to Govern:** The Govern Agent can now execute using the complete artifact set
2. **Review all artifacts:** Check the complete specification set in `explore/` before handoff
3. **Refinement (if needed):** Say `Explore Refinement` if new inputs require updates

**Do NOT automatically proceed to Govern.**

**Human decision required for phase transition.**

---

## Related

- **Previous Step:** `04-solution-design.md` (requires human trigger — say `Explore PRD & Experience Design`)
- **Next Step:** Govern Phase (separate process - requires human trigger)
- **Refinement:** `06-refinement.md` (say `Explore Refinement` if new inputs arrive)
- **Skills Used:** 
  - Architecture Solutioning (Part 1): `explore.proc.architecture-solutioning` (orchestrates B.0–B.4; manages all sub-skills internally)
  - `explore.proc.test-strategy` (invoked in Part 2 after HLD, before epic forming)
  - `explore.proc.define-devops-strategy` (invoked in Part 2 after HLD, before epic forming)
- **Artifacts Folders:** 
  - `explore/hlds/` (HLD, boundary map, truth hierarchy, design sketch, decision log, blocker register)
  - `explore/decisions/` (ADRs)
  - `explore/prds/` (PRD — from Step 4)
  - `explore/epics/` (epics)
  - `explore/domain/` (domain model)
  - `explore/explore-[slug]/` (all discovery artifacts, test strategy, devops strategy)
  - `work/01-pending-planning/` (task stubs)
- **Key Files:** 
  - `[slug]-hld.md` (socialization-ready HLD)
  - `[slug]-adr-*.md` (architectural decision records)
  - `[slug]-prd.md` (complete PRD — from Step 4)
  - `[slug]-domain.md` (locked domain model)
  - `DFE-[EPIC-ID].md` (formed epics)
  - `discovery.md` (artifact index - status: PRD-READY)
  - `glossary.md` (updated terminology)
