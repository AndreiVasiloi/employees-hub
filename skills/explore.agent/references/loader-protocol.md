## Skills Integration

This process uses 36 reusable skills with **lazy loading** for token efficiency:

**Step 1**: Discovery Planning, Document Ingestion
**Step 2**: Context Documentation, Market Research, Domain Analysis, Regulatory Compliance, Technical Feasibility, Architecture Context (`explore.proc.architecture-context` — Activity 6, if selected), Domain Onboarding (if selected)
**Step 3**: Problem Classification, Brainstorm Methods, Cognitive Primitives
**Step 4 (PRD & Experience Design)**: PRD Generation (`explore.proc.prd-generation`), Information Architecture, User Flow Creation, Wireframing, Usability Testing, Accessibility Specifications, Risk Documentation
**Step 4 (Design Pipeline — D/C only)**: OOUX Analysis (`explore.proc.ooux-analysis`), OOUX Mapping (`explore.proc.ooux-mapping`), Design Language (`explore.proc.design-language`), Design System Setup (`explore.proc.design-system-setup`), Component Library (`explore.proc.component-library`), Hi-Fi Handoff (`explore.proc.hifi-handoff`) — sequential, gated B4→B8
**Step 5 (Architecture)**: Architecture Solutioning (`explore.proc.architecture-solutioning` — B.0–B.4 lifecycle), with sub-skills: Domain Onboarding, Boundary Mapping, Design Sketch, HLD Drafting, Feedback Integration, Cross-Domain Alignment, Socialization & Handoff, Decision Log, Blocker Register
**Step 5 (Strategy & Backlog)**: Test Strategy (`explore.proc.test-strategy`), DevOps Strategy (`explore.proc.define-devops-strategy`), Extract Path to Production (`explore.proc.extract-path-to-production`), Epic Forming — loaded after HLD is complete

**Domain-driven labels active in Steps 4–5**: `[GLOSSARY-GAP]` and `[DOMAIN-RULE-VIOLATION]` (if `domain-analysis.md` exists)

---

## Step 5 — Loader Protocol

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

## Step 5 — Delegated Skill Step Lists

### explore.proc.test-strategy (9 steps)

```
  01 — Load Context
  02 — Assess Scope & Risk
  03 — Define Pyramid Layers
  04 — Automation & Tooling
  05 — Test Data & Environments
  06 — CI/CD Quality Gates
  07 — Metrics & Coverage
  08 — Write Document
  09 — Validation
```

### explore.proc.define-devops-strategy (11 steps)

```
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
```

---

## Step 5 — Sub-skill Install Pass

Run immediately after `explore.proc.architecture-solutioning` installs:

1. **Required sub-skills are already installed.** `dft skills add explore.proc.architecture-solutioning` resolves the full transitive `requires` tree automatically. Expected set (for auditing only — do NOT re-install):
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

2. **Optional sub-skills must be installed explicitly.** The `optional = [...]` array in the skill's `flow.toml` is NOT resolved by `dft skills add`. Install only if the corresponding sub-step may run:
   - `explore.proc.domain-onboarding` (B.0 — skip if domain profile already exists)
   - `explore.util.cross-domain-alignment` (B.3.2 — install only if adjacent HLDs are available)

3. **Apply sub-skill failure semantics**: warn and continue on individual sub-skill failures; do NOT STOP the parent. `explore.proc.architecture-solutioning` will surface any sub-step gap when it runs the affected sub-step.

---

## Step 5 — Announcement Templates

### Architecture Complete

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

### Test Strategy Complete

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

### DevOps Strategy Complete

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
