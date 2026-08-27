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
- **Part 3 (Epics)**: Epic forming (steering team triggered)
- **Part 4 (Govern Readiness)**: Govern readiness checklist

**Objective**: Produce architecture baseline (HLD, ADRs), test & DevOps strategies, epics, tasks, run Govern Readiness Check, and prepare handoff to Govern phase. Depth adapts based on Explore Type.

---

## Entry Condition

Fresh start — this is the first sub-step of Step 5.

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

> See [Loader Protocol](../references/loader-protocol.md) — follow all 5 steps before loading any skill in this step.

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
- Epic forming requires explicit steering team trigger
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
> **STOP —** Domain analysis is required for multi-domain Explores. Return to Step 2 Activity 3 or run domain analysis now before proceeding with architecture.

**If domain-analysis.md NOT found + single-domain Explore:**
> **STOP —** Domain analysis is required for all Explores regardless of domain count. Return to Step 2 Activity 3 or run domain analysis now before proceeding with architecture.

---

> Artifact input mapping: see [Context Bridge Tables](../references/context-bridge-tables.md) § Step 5 — Architecture Solutioning Inputs.

---

### Load Architecture Solutioning Skill

> **Load skill:** `explore.proc.architecture-solutioning` — follow Loader Protocol above. Workflow skill; STOP on install failure blocks the entire B.0–B.4 lifecycle.

> **Sub-skill Install Pass**: see [Loader Protocol](../references/loader-protocol.md) § Step 5 — Sub-skill Install Pass. Pass `slug` and artifact paths from the Context Bridge table above.

The skill manages its own sub-step execution (B.0 → B.1 → B.2 → B.3 → B.4) and all human gates (ARCH-B0 through ARCH-B4). See `explore.proc.architecture-solutioning/SKILL.md` for the full skill definition including sub-step detail, always-active behaviors, Copilot Governance, and Explore Type adaptation.

---

### On Completion

When `explore.proc.architecture-solutioning` Gate B.4 returns PASS or CONDITIONAL PASS:

1. **Update `discovery.md`** — set HLD row and all ADR rows from ⏳ → ✓
2. **Apply backport findings** — if `[slug]-backport-findings.md` contains items for upstream artifacts (PRD, risks, glossary), apply or flag for steering team action
3. **Proceed to Part 2** (Test & DevOps Strategy — automatic, no steering team trigger required)

**Architecture package**: `explore/hlds/` (HLD, boundary-map, decision-log, etc.) + `explore/decisions/` (ADRs). See skill SKILL.md for full artifact list.

---

**Next**: → [`05b-strategies.md`](./05b-strategies.md)
