# Step 4: PRD & Experience Design

**Consolidates**: Original steps 10-12 (SP3 Synthesis + SP4 Validation + PRD Readiness Check)

**Skills Required**: Each `**Load skill:**` block in this step MUST be executed via the **Loader Protocol** below. Skills are lazy-loaded per activity (no pre-warm at step entry):
- **Part A (PRD Generation)**: `explore.proc.prd-generation`; `explore.util.document-ingestion` if binary reference docs present
- **Part B (Experience Design)**: `explore.proc.information-architecture`, `explore.proc.user-flow-creation`, `explore.proc.wireframing`, `explore.proc.usability-testing`, `explore.proc.accessibility-specifications` per selected activity
- **Part B (Design Pipeline — Activities 7–12)**: `explore.proc.ooux-analysis`, `explore.proc.ooux-mapping` (B4), `explore.proc.design-language` (B5), `explore.proc.design-system-setup` (B6), `explore.proc.component-library` (B7), `explore.proc.hifi-handoff` (B8) — each gated, installed only after the previous gate passes
- **Part C (Risk & Decisions)**: `explore.proc.risk-documentation`

**Objective**: Generate PRD from discovery artifacts, produce experience designs, assess risks, and validate readiness for architecture work in Step 5. Depth adapts based on Explore Type.

**Entry Criteria**: Hypothesis stakeholder-validated (D/C) OR Context documented (Fast Lane/ERC). If Ideation was run (Step 3), refined concepts available as direction seeds.

**Exit Criteria**: PRD approved, experience designs complete, risks assessed, ready for architecture (Step 5)

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
3. **Install optional sub-skills, if any.** `dft skills add <slug>` (step 2) resolves the full transitive `requires` tree automatically. Any `optional = [...]` entries in the skill's `flow.toml` are NOT resolved by `dft` and must be installed explicitly by the step body when the corresponding sub-step may run (see Step 5 § Sub-skill Install Pass for the canonical pattern).
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
| `explore.proc.prd-generation` | workflow | STOP — PRD cannot be produced |
| `explore.proc.ooux-mapping` | workflow | STOP — B4-gate cannot pass |
| `explore.proc.design-language` | workflow | STOP — B5-gate cannot pass |
| `explore.proc.design-system-setup` | workflow | STOP — B6-gate cannot pass |
| `explore.proc.component-library` | workflow | STOP — B7-gate cannot pass |
| `explore.proc.hifi-handoff` | workflow | STOP — B8-gate cannot pass |
| `explore.proc.information-architecture` | auxiliary | warn + continue with inline IA |
| `explore.proc.user-flow-creation` | auxiliary | warn + continue |
| `explore.proc.wireframing` | auxiliary | warn + continue |
| `explore.proc.usability-testing` | auxiliary | warn + continue |
| `explore.proc.accessibility-specifications` | auxiliary | warn + continue |
| `explore.proc.ooux-analysis` | auxiliary | warn + continue (OOUX Mapping can proceed without the analysis artifact but with reduced evidence) |
| `explore.proc.risk-documentation` | auxiliary | warn + continue |
| `explore.util.document-ingestion` | auxiliary | warn + continue (skip binary sources) |

**Gate-cascade note**: Activities 7–12 run sequentially behind gates B4 → B5 → B6 → B7 → B8. Each `**Load skill:**` MUST execute **after** the preceding gate has passed. A workflow STOP at any gate halts the entire cascade; a warn on an auxiliary skill does NOT advance the gate.

---

## Explore Type Adaptation

**This step adapts based on Explore Type from Step 1:**

| Component | Fast Lane | ERC | Diverge/Converge |
|-----------|-----------|-----|------------------|
| **Domain-Analysis Gate** | ⛔ STOP if no `domain-analysis.md` | ⛔ STOP if no `domain-analysis.md` | ⛔ STOP if no `domain-analysis.md` |
| **Part A (PRD Generation)** | ✅ Lightweight (core sections only) | ✅ Standard (all sections, moderate detail) | ✅ Comprehensive (all sections, full detail) |
| **PRD Domain Naming** | Single PRD, bundle name | Per-domain PRDs (if domain-analysis exists) | Per-domain PRDs (required if multi-domain) |
| **Part B (Experience Design)** | ❌ Skip (unless UX/UI in scope → ⚠️ Targeted: IA + flows) | ⚠️ Targeted (IA + flows + wireframes if UX/UI) | ✅ Full (IA + flows + wireframes + testing + accessibility) |
| **Part B (Design Pipeline)** | ❌ Skip (unless UX/UI in scope → ⚠️ Lightweight: OOUX + Tokens) | ❌ Skip (unless UX/UI in scope → ⚠️ Moderate: OOUX → Tokens → System) | ✅ Full (requires UX/UI in scope; OOUX → Tokens → System → Components → Hi-Fi) |
| **Part C (Risk, Validation & Decisions)** | ⚠️ Critical risks only | ✅ Risk assessment + feasibility | ✅ Full risk register + edge cases + validation |

**For [Explore Type], execute the following parts:**

---

## What This Step Does

**Human-First Pattern: PRD depth based on Step 1 selections, steering team approves each group**

1. **Generate PRD** (Part A) - Using Signal-to-PRD bridge, present in 4 groups for steering team approval
2. **Experience Design** (Part B - if required) - User flows, prototypes, future-state journey
3. **Risk & Decisions** (Part C - always) - Edge cases, feasibility, risk register (depth varies)
4. **Evaluate Inline** - "Is everything ready for architecture in Step 5?"

---

## Part A: PRD Generation (4 Groups) - Conditional Skill Loading

**Agent reads Explore Bundle to determine PRD depth:**

```
Reading: explore/explore-[slug]/explore-bundle.md

Explore Type (from Step 1): [Fast Lane / ERC / Diverge/Converge]
PRD Depth: [Lightweight / Standard / Comprehensive]

Selected Activities (determines PRD content):
- Context Documentation: ✅ (always)
- Personas: [✅/❌] (affects Target Users section)
- Hypothesis: [✅/❌] (affects Goals section)
- Architecture Discovery: [✅/❌] (affects Technical Notes)
- Risk Register: ✅ (always, affects Constraints)
```

**PRD will include ONLY sections for artifacts that were created in Steps 2-3.**

### Domain-Analysis Gate (before PRD generation)

**Agent checks for domain analysis artifacts:**

1. **Load** `explore/explore-[slug]/domain-analysis.md`
2. **If found**: Extract Domain Glossary, Domain Model, Domain Rules
3. **Present domain-to-artifact mapping** to steering team for confirmation:

```
Question PRD-DOMAIN
  Header:      "Domain-to-PRD Mapping"
  Question:    "I found domain-analysis.md with [N] domains defined.
                Each PRD will be named using the Domain Glossary:
                
                [Domain 1] → PRD · [Domain Name 1]
                [Domain 2] → PRD · [Domain Name 2] (if multi-domain)
                
                Confirm the domain-to-PRD mapping."
  Multi-select: No
  Options:
    - Confirmed — proceed with this mapping
    - Adjust — I need to change the mapping
    - Single PRD — this is a single-domain Explore; use one PRD
```

4. **Name each PRD** as `PRD · [Domain Name]` (exact glossary match)
5. **Validate terminology** throughout PRD → flag `[GLOSSARY-GAP: term "{term}" not found in domain-analysis.md]`
6. **Validate requirements** against Domain Rules → flag `[DOMAIN-RULE-VIOLATION: requirement conflicts with rule "{rule}" in domain-analysis.md]`
7. **Add traceability header** to every PRD:

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
> **STOP** — Domain analysis is required for multi-domain Explores. Return to Step 2 Activity 3 or run domain analysis now.

**If domain-analysis.md NOT found + single-domain Explore:**
> **STOP** — Domain analysis is required for all Explores regardless of domain count. Return to Step 2 Activity 3 or run domain analysis now.

---

**Human-First Enforcement:**
- If personas not created → Target Users section uses Signal actors only
- If hypothesis not created → Goals section uses Signal outcomes only
- PRD depth matches Explore Type selected by steering team in Step 1

**Check if specialized skills are needed:**

**If user provides binary specification reference documents (.pdf, .docx, .pptx):**
> **Load skill:** `explore.util.document-ingestion` — follow Loader Protocol above.
> 
> Convert binary documents to markdown before proceeding.
> 
> Command: `python tools/doc-to-md.py <input-file> --output-dir explore/sources/`

**For PRD generation:**
> **Load skill:** `explore.proc.prd-generation` — follow Loader Protocol above.
> 
> Follow the skill's procedure for PRD creation using Signal-to-PRD bridge.
> 
> Expected outputs: Complete PRD with all 4 groups (Product Definition, Technical Specification, Quality Definition, Specification Completion).

**Otherwise:**
> Proceed with inline PRD generation using Signal-to-PRD bridge below.

**Agent produces PRD using Signal-to-PRD bridge from PRD Generation skill.**

### Signal-to-PRD Bridge

| Signal Field | PRD Section | Transformation |
|-------------|-------------|----------------|
| The Signal | Problem Statement | 2–4 sentences; strip tags; preserve meaning |
| Initial Evidence | Background / Research | Linked sources; flag `[ASSUMPTION]` items as unverified |
| Why This Matters | Goals / Value Proposition | Validated hypothesis → goals |
| Actors identified | Target Users | Actor + Step 2 persona need statement |
| Expected outcomes | Success Metrics | Measurable, testable acceptance criteria |
| Constraints identified | Constraints | Direct transfer; flag `[ASSUMPTION]`-tagged items |
| Technical feasibility | Technical Notes | Step 2 baseline + architecture discovery enrichment (if run) |
| Severity score (1–5) | Priority | 1–2 Low · 3 Medium · 4–5 High |
| Resonance score (1–5) | Stakeholder Appetite | 1–2 Low · 3 Moderate · 4–5 High |
| `[ASSUMPTION]` claims | Open Questions | Every assumption → prioritised open question |

**Additional direct PRD inputs (beyond Signal bridge):**

| Discovery / Design Artifact | PRD Section | How It Feeds PRD |
|-----------------------------|-------------|------------------|
| Market Research (`market-research.md`) | Background / Constraints | Competitive positioning, market gaps, pricing benchmarks |
| Regulatory Compliance (`regulatory-compliance.md`) | Constraints | Compliance requirements as first-class product constraints (GDPR, HIPAA, PCI-DSS) |
| Journey Maps (`journey-[slug].md`) | Goals / Target Users | Pain points and opportunity moments as requirements |
| Glossary (`glossary.md`) | All sections | Canonical terminology — all requirement language must use glossary terms |
| Refined Concepts (`refined-concepts.md`, if ideation ran) | Goals / Technical Notes | Experience design direction, architecture implications |

---

### Group 1 — Product Definition

Agent produces:
- **Draft PRD** — using the Signal-to-PRD Bridge
- **Final domain model** — from Step 2 + Step 3 refinements (if Ideation ran)

**PRD Structure (Group 1 sections)**:
- **Status**: Draft (updated to Approved after Group 4 sign-off)
- **Links**: Signal · Hypothesis · Personas · Journey Map · Risk Register
- **Priority**: [from Signal severity score] · **Stakeholder appetite**: [from Signal resonance score]
- **Problem Statement** — from Signal stripped of tags, enriched by Step 2 reframe
- **Goals** — from "Why This Matters" + validated hypothesis outcomes
- **Success Metrics** — table: Metric · Target · Measurement method (must be measurable and testable)
- **Target Users** — from Signal actors + Step 2 persona need statements

**STOP — AskUserQuestion after Group 1:**

```
Question PRD-1
  Header:      "PRD Group 1: Product Definition"
  Question:    "I've drafted the product definition sections of the PRD.
                Review and tell me if anything needs to change."
  Multi-select: No
  Options:
    - Approved                 — PRD Group 1 is correct; move to Group 2
    - One section needs change — Tell me which section and what to change
    - Success metrics need work — Tell me the correct measurable outcomes
    - Add a requirement        — Tell me what is missing
```

---

### Group 2 — Technical Specification

Agent produces:
- Architecture discovery artifacts (from Step 2 Activity 6, if run)
- API contracts (from technical feasibility)
- Data model (from Step 2 domain analysis)

**PRD Structure (Group 2 sections)**:
- **Requirements** — table: # · Requirement · Acceptance criteria · Priority
- **Constraints** — from Signal + Step 2; `[ASSUMPTION]`-tagged items flagged as unverified
- **Out of Scope** — from Step 2 scope definition
- **Technical Notes** — Step 2 baseline + architecture discovery enrichment (if Activity 6 ran)

**STOP — AskUserQuestion after Group 2:**

```
Question PRD-2
  Header:      "PRD Group 2: Technical Specification"
  Question:    "Technical specifications are documented above. Does the
                Engineering Lead confirm these are correct?"
  Multi-select: No
  Options:
    - Confirmed               — Specs are locked; move to Group 3
    - One correction needed   — Tell me what to change
    - Architecture needs revision — Tell me the specific concern
```

---

### Group 3 — Quality Definition

Agent produces:
- Acceptance criteria for each PRD requirement
- Definition of Done (DoD) and Definition of Ready (DoR)
- Non-Functional Requirements (NFRs)
- Testing strategy (inline summary — full strategy produced in Step 5)
- Deployment readiness checklist

**PRD Structure (Group 3 sections)**:
- **Non-Functional Requirements** — Performance, Security, Availability, Scalability
- **Quality Gates** — DoD, DoR, acceptance criteria
- **Testing Strategy** — Unit, integration, E2E testing approach (inline). Full test strategy document produced in Step 5
- **DevOps & Deployment Strategy** — Deployment approach, environments, monitoring (inline). Full DevOps strategy document produced in Step 5

**STOP — AskUserQuestion after Group 3:**

```
Question PRD-3
  Header:      "PRD Group 3: Quality Definition"
  Question:    "I've defined DoD, DoR, acceptance criteria, and NFRs. Are these
                the right quality standards for this delivery?"
  Multi-select: No
  Options:
    - Approved                — Quality definitions are correct; move to Group 4
    - DoD needs adjustment    — Tell me what the correct completion criteria are
    - NFRs need adjustment    — Tell me the right performance/security requirements
    - Add acceptance criteria — Tell me the missing requirement
```

---

### Group 4 — Specification Completion

Agent produces:
- **Open Questions** — every Signal `[ASSUMPTION]` not yet resolved, with owner
- **Dependencies** — external and internal dependencies
- **Assumptions** — documented assumptions that may affect implementation

**PRD Structure (Group 4 sections)**:
- **Open Questions** — table: # · Question · Owner · Priority · Target Resolution
- **Dependencies** — External and internal dependencies
- **Assumptions** — table: # · Assumption · Risk if Wrong · Validation Plan

**STOP — AskUserQuestion after Group 4:**

```
Question PRD-4
  Header:      "PRD Group 4: Specification Completion"
  Question:    "Open questions, dependencies, and assumptions are documented.
                Does the steering team approve before I write the PRD to disk?"
  Multi-select: No
  Options:
    - Approved                 — Write PRD to disk
    - Adjust open questions    — Tell me what to change
    - Add dependency           — Tell me what's missing
    - Flag assumption          — Tell me which assumption needs re-evaluation
```

**After PRD-4 approval — Agent writes PRD to Context Warehouse:**

`explore/prds/[slug]-prd.md` — complete PRD with all 4 groups

`explore/domain/[slug]-domain.md` — locked final version from Step 2 + Step 3 refinements

**Agent enriches `context.md`** — updates Problem Statement to final approved version from PRD.

**Agent enriches `discovery.md`** — adds PRD artifact path, updates row to ✓.

**PRD is enriched retroactively by downstream artifacts:**
- **Wireframes** — design work regularly reveals requirement gaps, ambiguities, or missing edge cases. Agent updates PRD when wireframes surface issues.
- **HLD** (Step 5) — architecture decisions may surface feasibility constraints or require new requirements. Agent updates PRD when HLD reveals changes.

---

## Part B: Experience Design

Agent produces drafts; PM validates against user reality:

#### Activity 1: Information Architecture
> **Load skill:** `explore.proc.information-architecture` — follow Loader Protocol above.

Use `information-architecture` skill to define structure:
1. **Navigation model** — primary, secondary, utility navigation
2. **Sitemap** — page hierarchy and relationships
3. **Labeling and taxonomy** — consistent terminology
4. **Entry points and wayfinding** — how users find content
5. **Roles and permissions impact** — access control considerations

#### Activity 2: User Flow Creation
> **Load skill:** `explore.proc.user-flow-creation` — follow Loader Protocol above.

Use `user-flow-creation` skill to map task flows:
1. **User flow diagrams** — step-by-step task completion paths
2. **Decision points** — branching logic and conditions
3. **Error states** — failure paths and recovery flows
4. **Success states** — completion criteria and outcomes
5. **Alternative paths** — edge cases and variations

#### Activity 3: Wireframing
> **Load skill:** `explore.proc.wireframing` — follow Loader Protocol above.

Use `wireframing` skill to create low-fidelity designs: structures:
1. **Low-fidelity wireframes** — layout and component placement
2. **Screen states** — default, loading, error, success, empty
3. **Interaction notes** — behavior, transitions, animations
4. **Responsive considerations** — breakpoints and adaptations
5. **Content patterns** — reusable UI patterns

#### Activity 4: Usability Testing Plan
> **Load skill:** `explore.proc.usability-testing` — follow Loader Protocol above.

Use `usability-testing` skill to define validation:
1. **Test plan** — research questions and hypotheses
2. **Participant criteria** — target users and recruitment
3. **Scenarios and tasks** — test scripts and prompts
4. **Metrics and data capture** — what to measure and how
5. **Analysis plan** — how to interpret results

#### Activity 5: Accessibility Specifications
> **Load skill:** `explore.proc.accessibility-specifications` — follow Loader Protocol above.

Use `accessibility-specifications` skill to define requirements:
1. **Conformance target** — WCAG level and baseline (e.g., WCAG 2.2 AA)
2. **Component specifications** — accessibility requirements per component
3. **Flow-level checks** — end-to-end accessibility validation
4. **Acceptance criteria** — testable accessibility criteria
5. **Testing approach** — automated and manual testing methods

#### Activity 6: Future-State Journey
6. **Future-state experience journey** — update Step 3 journey map with target-state
7. **Validation questions** — for PM to validate designs with stakeholders

---

### Design Pipeline (Activities 7–12)

**Precondition**: This pipeline requires `UX / UI` capability in scope (`ui_in_scope = true` from Step 1). If `UX / UI` is not in scope, skip to Part C — do not propose, mention, or offer design activities.

**Depth by Explore Type** (when UX/UI is in scope):
- **Diverge/Converge**: Full pipeline (Activities 7–12, B4–B8 gating). Requires wireframes (Activity 3).
- **ERC**: Moderate pipeline (Activities 7–10 only: OOUX Analysis → OOUX Mapping B4 → Design Language B5 → System Setup B6). Wireframes not required.
- **Fast Lane**: Lightweight pipeline (Activities 7–9 only: OOUX Analysis → OOUX Mapping B4 → Design Language B5). Wireframes not required.

**Sequential Gating**: Each activity below is gated. Load one skill at a time (lazy loading). Do NOT load the next skill until the previous gate explicitly passes. On gate failure, return to the affected skill — do not skip forward.

**Design Pipeline Pre-Flight**:

Before loading any design pipeline skill, verify:
1. `explore/prds/[slug]-prd.md` exists
2. `explore/domain/[slug]-domain.md` exists
3. Figma file URL is available and Figma MCP connection is active
4. Wireframe frames exist on the Figma Screens page (Activity 3 output) — **D/C only**; skip this check for ERC and Fast Lane

If any required check fails, halt with the specific missing prerequisite. Do not proceed into Activity 7 until all applicable checks pass.

**STOP**: Present pre-flight results to human. Ask: "Design pipeline pre-flight passed. Ready to begin Activity 7: OOUX Analysis. Confirm to start."

#### Activity 7: OOUX Analysis
> **Load skill:** `explore.proc.ooux-analysis` — follow Loader Protocol above. Execute **after** the design-pipeline pre-flight STOP has passed.

Use `ooux-analysis` skill to run the standalone ORCA process:
1. **Object Inventory** — extract core system nouns from product description
2. **ORCA Table** — relationships, calls to action, attributes per object
3. **Object Map** — Mermaid diagram showing object relationships
4. **Design Notes** — assumptions, ambiguities, next steps

→ Produces: `explore/explore-[slug]/ooux-analysis.md`

#### Activity 8: OOUX Mapping (B4-gate)
> **Load skill:** `explore.proc.ooux-mapping` — follow Loader Protocol above. Workflow skill; STOP halts the B4 → B8 cascade.

Use `ooux-mapping` skill to extend analysis with Figma output and gate governance:
1. **Extract and classify** objects from PRD and domain analysis (core / supporting / boundary)
2. **Map ORCA** — properties, relationships, CTAs, states per object
3. **B4-gate** — obtain explicit approval of the complete object model
4. **Write output** — `explore/design/ooux.md` + Figma OOUX page with object cards

→ Produces: `explore/design/ooux.md` + Figma OOUX page
→ **B4-gate must pass before proceeding to Activity 9**

**STOP**: Confirm with human: "B4-gate passed and OOUX Mapping is complete. Ready to proceed to Activity 9: Design Language?"

#### Activity 9: Design Language (B5-gate)
> **Load skill:** `explore.proc.design-language` — follow Loader Protocol above. Execute **after** B4-gate passes; workflow skill.

Use `design-language` skill to generate the full token specification:
1. **Analyze tone** — classify product tone (enterprise / consumer / utility) from domain
2. **Generate tokens** — color palette, typography scale, spacing, elevation, motion, iconography
3. **B5-gate** — obtain explicit approval of all token values (last chance before Figma push)
4. **Write and push** — `explore/design/design-language.md` + push Variables and Styles to Figma

→ Produces: `explore/design/design-language.md` + Figma Variables + Figma Styles
→ **B5-gate must pass before proceeding to Activity 10**

**STOP**: Confirm with human: "B5-gate passed and tokens are live in Figma. Ready to proceed to Activity 10: Design System Setup?"

**Fast Lane exit point**: If Explore Type is Fast Lane, the design pipeline ends here. Proceed to Part C.

#### Activity 10: Design System Setup (B6-gate)
> **Load skill:** `explore.proc.design-system-setup` — follow Loader Protocol above. Execute **after** B5-gate passes; workflow skill.

Use `design-system-setup` skill to initialize the Figma file structure:
1. **Audit Figma** — verify B5 tokens are present in Figma
2. **Set up pages and grids** — canonical 6-page structure + responsive layout grids
3. **Design Language reference** — populate visual token reference page
4. **B6-gate** — infrastructure verification (pages, grids, token presence — not aesthetic)

→ Produces: `explore/design/design-system.md` + Figma canonical file structure
→ **B6-gate must pass before proceeding to Activity 11**

**STOP**: Confirm with human: "B6-gate passed and Figma file is initialized. Ready to proceed to Activity 11: Component Library?"

**ERC exit point**: If Explore Type is ERC, the design pipeline ends here. Proceed to Part C.

#### Activity 11: Component Library (B7-gate)
> **Load skill:** `explore.proc.component-library` — follow Loader Protocol above. Execute **after** B6-gate passes; workflow skill.

Use `component-library` skill to scaffold all components:
1. **Derive components** — mechanically derive component list from OOUX object model
2. **Define anatomy** — slots, props, variant axes per component
3. **Scaffold in Figma** — build components with Auto Layout and tokens
4. **Token audit** — zero violations required
5. **B7-gate** — design lead + frontend lead approval

→ Produces: `explore/design/component-inventory.md` + Figma Components page
→ **B7-gate must pass before proceeding to Activity 12**

**STOP**: Confirm with human: "B7-gate passed and the component library is approved. Ready to proceed to Activity 12: Hi-Fi Handoff?"

#### Activity 12: Hi-Fi Handoff (B8-gate)
> **Load skill:** `explore.proc.hifi-handoff` — follow Loader Protocol above. Execute **after** B7-gate passes; workflow skill.

Use `hifi-handoff` skill to produce developer-ready hi-fi screens:
1. **Map wireframes** — map wireframe elements to component library entries
2. **Build hi-fi** — duplicate wireframes, replace with component instances
3. **Token and spacing audit** — zero violations required
4. **Annotate** — interaction, state, and accessibility annotations
5. **Coverage report** — cross-reference PRD R-XXX requirements against screens
6. **B8-gate** — design lead, product owner, tech lead approval

→ Produces: `explore/design/handoff-notes.md` + Figma hi-fi screens
→ **B8-gate passage completes the design pipeline and unlocks Step 5 Architecture**

**STOP**: Present the final design pipeline summary to the human for confirmation.

---

### Part C — Risk, Validation & Decisions

> **Load skill:** `explore.proc.risk-documentation` — follow Loader Protocol above.

Agent captures continuously during Parts A and B, then consolidates:

1. **Edge case list** — non-happy paths from user flows
2. **Feasibility notes** — risks identified during design work
3. **Simulated testing scenarios** — validate solution against hypothesis
4. **Feasibility assessment** — technical, operational, resource feasibility
5. **Risk register** — identify, score, propose mitigation (consolidated from PRD analysis and experience design)
6. **Accepted risks** — explicitly document risks PM accepts

---

**Agent presents combined assessment:**

```
Step 4 complete. Here is what I produced and where I need your input:

Part A (PRD):
  ✓ PRD Groups 1-4 — all sections drafted and approved
  ✓ Domain model — locked final version
  ✓ PRD written to explore/prds/[slug]-prd.md

Part B (Experience):
  ✓ Information architecture — [N] pages, [N] navigation levels
  ✓ User flows — [N] flows covering [N] scenarios
  ✓ Wireframes — [N] screens with [N] states
  ✓ Usability test plan — [N] scenarios, [N] participants
  ✓ Accessibility specifications — WCAG [level] conformance defined
  ✓ Future-state journey — [N] stages
  ⚠ Requires your validation: [specific design decisions I made that need confirmation]
    1. "[Decision I made]" — is this right?
    2. "[Decision I made]" — or should it be [alternative]?

Part B (Design Pipeline — Diverge/Converge only):
  ✓ B4 OOUX Mapping — [N] core, [N] supporting, [N] boundary objects
  ✓ B5 Design Language — [N] color tokens, [N] type steps, [N] spacing tokens
  ✓ B6 Design System Setup — 6 pages, 3 breakpoint grids, tokens verified
  ✓ B7 Component Library — [N] components, [N] variants, zero token violations
  ✓ B8 Hi-Fi Handoff — [N] screens, [N] requirements covered, zero audit violations
  [or "Design Pipeline skipped — not Diverge/Converge Explore Type"]

Part C (Risk, Validation & Decisions):
  ✓ Edge cases — [N] identified
  ✓ Feasibility assessed: [FEASIBLE | CONCERNS | BLOCKED]
  ✓ Risk register — [N] risks identified ([N] high, [N] medium, [N] low)
  ✓ Solution validates against hypothesis

Feasibility concerns (if any):
  ⚠ [Concern 1] — impact: [description]
  ⚠ [Concern 2] — impact: [description]

Items requiring PM action before Step 5:
  • [Risk] — accept or mitigate?
  • [Feasibility concern] — how should we address this?
  • [Specific item — e.g., "Validate lo-fi with stakeholders; bring back feedback"]
```

**STOP — AskUserQuestion:**

```
Question SD-1
  Header:      "Step 4 review"
  Question:    "I've produced PRD, experience designs, and risk/validation assessment.
                How would you like to proceed?"
  Multi-select: No
  Options:
    - All good — proceed to Step 5 (Architecture, Strategy & Backlog)
    - Validate with stakeholders first — I'll share designs; bring back feedback
    - Mitigate specific risks  — Tell me which risks need mitigation strategies
    - One correction needed    — Tell me specifically what to change
```

**Agent writes to Context Warehouse (incorporating any human input on open items):**

`explore/design/information-architecture-[slug].md` — create with:
- **Snapshot** — project context and IA scope
- **Organizing Principles** — how content is structured
- **Navigation Model** — primary, secondary, utility navigation
- **Sitemap** — page hierarchy and relationships
- **Labeling and Taxonomy** — consistent terminology
- **Entry Points and Wayfinding** — how users find content
- **Roles and Permissions Impact** — access control considerations
- **Decisions Log** — IA decisions and rationale

`explore/domain/flows-[slug].md` — create with:
- **Flow Inventory** — list of all user flows
- **Flow Diagrams** — step-by-step task completion paths
- **Decision Points** — branching logic and conditions
- **Error Handling** — failure paths and recovery
- **Success Criteria** — completion outcomes
- **Validation Status** — evidence tags for each flow

`explore/design/wireframes-[slug].md` — create with:
- **Snapshot** — project context and wireframe scope
- **Screen Inventory** — list of all screens
- **Wireframe Conventions** — notation and symbols used
- **Screen Specs** — detailed wireframes with annotations
- **Cross-Screen Patterns** — reusable UI patterns
- **Validation Checklist** — design validation criteria

`explore/design/usability-test-plan-[slug].md` — create with:
- **Snapshot** — project context and test scope
- **Research Questions and Hypotheses** — what to validate
- **Method** — test approach and format
- **Participants** — target users and recruitment
- **Scenarios and Tasks** — test scripts
- **Metrics and Data Capture** — what to measure
- **Analysis Plan** — how to interpret results

`explore/design/accessibility-[slug].md` — create with:
- **Snapshot** — project context and accessibility scope
- **Conformance Target** — WCAG level and baseline
- **Cross-Cutting Requirements** — global accessibility requirements
- **Component Specifications** — accessibility requirements per component
- **Flow-Level Accessibility Checks** — end-to-end validation
- **Acceptance Criteria** — testable accessibility criteria

**Design Pipeline Outputs (Diverge/Converge only):**

`explore/explore-[slug]/ooux-analysis.md` — standalone OOUX analysis (Activity 7)

`explore/design/ooux.md` — OOUX map with object inventory, ORCA table, relationship diagram (Activity 8, B4-gate)

`explore/design/design-language.md` — full token spec: color, typography, spacing, elevation, motion, iconography (Activity 9, B5-gate)

`explore/design/design-system.md` — Figma setup log: page structure, token verification, layout grids (Activity 10, B6-gate)

`explore/design/component-inventory.md` — component registry: names, OOUX source, slots, variants, token compliance (Activity 11, B7-gate)

`explore/design/handoff-notes.md` — hi-fi screen index, audit results, PRD coverage, scope decisions, accessibility notes (Activity 12, B8-gate)

`explore/prds/[slug]-prd.md` — complete PRD with all 4 groups (Product Definition, Technical Specification, Quality Definition, Specification Completion)

`explore/domain/[slug]-domain.md` — locked final domain model

`explore/explore-[slug]/risks.md` — create with:
- **Risk Register** — table: Code · Risk · Impact · Likelihood · Mitigation · Owner
- **Accepted Risks** — explicitly documented with PM confirmation
- **Mitigation Tracking** — status of mitigation activities
- **Enrichment Log** — updated when risks change

**Risk register sources (beyond PRD, flows, wireframes, handoff-notes):**
- **Usability Test Plan** — interaction risks and edge cases from usability testing
- **Architecture Drivers** (Step 2) — quality attribute trade-off risks (e.g., choosing availability over consistency)
- **ADRs** (Step 5, retroactive) — architecture trade-off risks; rejected alternatives become fallback scenarios

**Risk coding format**:
- `RISK-001`, `RISK-002`, `RISK-003`, etc.
- Impact/likelihood scoring: High / Medium / Low

Agent enriches `journey-[slug].md` — adds future-state column from Part B experience design.

Agent enriches `discovery.md` — updates PRD, IA, flows, wireframes, usability test plan, accessibility, risk register rows from ⏳ → ✓.

---

## Inline Evaluation: Architecture Readiness

**Agent evaluates — is Step 4 complete enough for architecture in Step 5?**

```
Architecture Readiness Evaluation:

Step 4 outputs:
  ✓ PRD complete with [N] groups approved
  ✓ User experience designed (if applicable for Explore Type)
  ✓ Risk register complete
  ✓ Feasibility confirmed

Evaluation:
  [✓/✗] PRD approved (all 4 groups signed off)
  [✓/✗] Success metrics are measurable and testable
  [✓/✗] Risks assessed and mitigated/accepted
  [✓/✗] Feasibility confirmed
  [✓/✗] PRD validates against hypothesis
  [✓/✗] Experience designs approved (if applicable)

Assessment: [READY FOR ARCHITECTURE | NEEDS MORE DEFINITION]
```

**If NEEDS MORE DEFINITION**: Agent identifies specific gaps:

```
Architecture readiness gaps:

Missing:
  ✗ [Gap 1] — e.g., "PRD Group 2 not yet approved"
  ✗ [Gap 2] — e.g., "Risk RISK-003 not yet mitigated or accepted"

To close these gaps:
  • [Specific action needed]
  • [Specific action needed]
```

**STOP — AskUserQuestion (only if gaps exist):**

```
Question SD-2
  Header:      "Architecture readiness gaps"
  Question:    "I found [N] gaps that need to be closed before architecture. How should we proceed?"
  Multi-select: No
  Options:
    - Close them now           — I'll provide the missing information
    - Accept as open questions — Document as open questions; proceed
    - One needs closure        — Tell me which one and I'll provide info
```

**If READY FOR ARCHITECTURE**: Agent confirms and proceeds to Step 5.

```
Architecture Readiness: PASS

All criteria met:
  ✓ PRD approved
  ✓ Risks assessed
  ✓ Feasibility confirmed
  ✓ PRD validates against hypothesis

Ready to proceed to Step 5: Architecture, Strategy & Backlog.
```

---

## Success Criteria

Step 4 is complete when:

**Part A Outputs (PRD):**
- [ ] PRD complete and approved (`explore/prds/[slug]-prd.md`)
- [ ] All 4 groups approved (Product Definition, Technical Specification, Quality Definition, Specification Completion)
- [ ] Success metrics are measurable and testable
- [ ] Domain model locked (`explore/domain/[slug]-domain.md`)

**Part B Outputs (Experience Design):**
- [ ] Information architecture documented (`information-architecture-[slug].md`)
- [ ] User flows documented (`flows-[slug].md`)
- [ ] Wireframes documented (`wireframes-[slug].md`)
- [ ] Usability test plan documented (`usability-test-plan-[slug].md`)
- [ ] Accessibility specifications documented (`accessibility-[slug].md`)
- [ ] Future-state journey added to journey map

**Part C Outputs (Risk, Validation & Decisions):**
- [ ] Risk register complete (`risks.md`)
- [ ] Feasibility assessed
- [ ] All risks mitigated or accepted
- [ ] Architecture readiness evaluated inline (PASS)

**Tracking:**
- [ ] Discovery index updated (all rows ✓)
- [ ] All enrichment logs consistent

---

**Next step**: [05a-architecture-solutioning.md](./05a-architecture-solutioning.md) (Architecture, Strategy & Backlog)
