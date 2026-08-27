### Dependency Cascade

Skills are connected through gate chains. A single gate failure blocks all downstream skills in the chain:

- **Design Pipeline (Step 4 D/C)**: B4 (OOUX Mapping) → B5 (Design Language) → B6 (Design System Setup) → B7 (Component Library) → B8 (Hi-Fi Handoff)
- **Architecture Lifecycle (Step 5)**: B.0 (Context) → B.1 (Boundary Mapping + Design Sketch) → B.2 (HLD Draft) → B.3 (Review & Hardening) → B.4 (Socialization & Handoff)
- **PRD Approval (Step 4)**: PRD-1 (Structure) → PRD-2 (Content) → PRD-3 (Acceptance Criteria) → PRD-4 (Final)

If a gate fails, all skills downstream in that chain are blocked until the gate passes. Do not attempt to skip ahead or run downstream skills in parallel with a failed gate.

### Gate Systems Reference

| Gate System | Scope | Owning Skills | Steps |
|-------------|-------|---------------|-------|
| **B4–B8** | Design pipeline (Figma-integrated) | ooux-mapping (B4), design-language (B5), design-system-setup (B6), component-library (B7), hifi-handoff (B8) | Step 4 (D/C only) |
| **B.0–B.4** | Architecture solutioning lifecycle | architecture-solutioning (all gates) | Step 5 |
| **PRD-1–PRD-4** | PRD approval groups | prd-generation | Step 4 |

---

## Step 5 — Architecture Solutioning Inputs

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

### Architecture Context Detection

The agent checks for `architecture-context.md` before starting any B sub-step:

| Signal | Effect on B sub-steps |
|--------|----------------------|
| `architecture-context.md` exists in `explore/explore-[slug]/` | B.1.1 reads consolidated context (drivers, landscape, constraints, domain model) directly from this artifact. Higher-quality path — discovery findings are pre-consolidated. |
| `architecture-context.md` absent | B.1.1 falls back to reading individual Explore artifacts directly (`context.md`, `technical-feasibility.md`, `domain-analysis.md`, etc.). Lower-quality path — discovery findings not consolidated. Agent logs warning. |

**No `context_mode` branching** — the solutioning skill always follows the same B.0–B.4 structure. The presence of `architecture-context.md` simply determines pre-population depth in B.1.1.

---

## Step 5 — Test Strategy Inputs

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

---

## Step 5 — DevOps Strategy Inputs

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
