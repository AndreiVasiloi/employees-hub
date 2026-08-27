# Step 2: Discovery

**Consolidates**: Original steps 5-9 (SP1 Context + SP2 Stakeholder + Hypothesis Readiness Check + Hypothesis + Hypothesis Validation Check)

**Objective**: Build complete context baseline, create evidence-based personas and journey maps, evaluate readiness inline, draft and validate hypothesis with stakeholders.

---

## Trigger Phrases

| Shorthand | Full Phrase |
|-----------|-------------|
| `Explore Discovery` | `Let's start the discovery phase...` |
| `Start discovery` | `Execute discovery activities for this explore...` |
| `Run discovery phase` | `Run the discovery phase...` |

---

## Prerequisites (Gate In)

Before running this step:
- [ ] Explore Bundle exists in `explore/explore-[slug]/explore-bundle.md`
- [ ] Domains are confirmed and approved by steering team
- [ ] Explore Type is locked (Fast Lane / ERC / Diverge-Converge)
- [ ] Activities are selected and listed in the bundle
- [ ] All Signal attachments converted to markdown (if applicable)

**If prerequisites are not met, return to Step 1 (Explore Bundle).**

---

## Execution Settings

> See SKILL.md § Execution Defaults for temperature, one-step-at-a-time, and Human-First rules.

**Step-specific risks with high temperature (>0.5):**
- Invented personas not evidenced in research
- Hallucinated journey pain points
- Unsupported hypothesis statements
- False confidence in validation status

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
| `explore.proc.context-documentation` | workflow | STOP — baseline context required for PRD |
| `explore.proc.technical-feasibility` | workflow | STOP — always-executed baseline |
| `explore.proc.architecture-context` | workflow | STOP — B.1.1 consolidated input |
| `explore.proc.domain-onboarding` | auxiliary | warn + continue without domain profile |
| `explore.proc.market-research` | auxiliary | warn + continue |
| `explore.proc.domain-analysis` | auxiliary | warn + continue (no domain-driven labels) |
| `explore.proc.regulatory-compliance` | auxiliary | warn + continue |
| `explore.proc.persona` | auxiliary | warn + continue |
| `explore.proc.journey-mapping` | auxiliary | warn + continue |
| `explore.proc.hypothesis-documentation` | auxiliary | warn + continue |
| `explore.util.document-ingestion` | auxiliary | warn + continue (skip binary sources) |

---

## Explore Type Adaptation

**This step adapts based on Explore Type from Step 1:**

| Part | Fast Lane | ERC | Diverge/Converge |
|------|-----------|-----|------------------|
| **Part A** | Activities 1, 5 only | Activities 1, 4, 5 | All Activities 1-9 (selectable) |
| **Domain Analysis (Activity 3)** | ❌ Skip | ⚠️ Optional | ✅ Recommended |
| **Architecture Context (Activity 6)** | ❌ Skip | ⚠️ Optional | ✅ Recommended |
| **Domain Onboarding (Activity 9)** | ❌ Skip | ⚠️ Optional | ✅ Recommended (if new domain) |
| **Part B** | ❌ Skip | ⚠️ Quick personas only | ✅ Full personas + journeys |
| **Part C** | ❌ Skip | ❌ Skip | ✅ Hypothesis generation |
| **Part D** | ❌ Skip | ❌ Skip | ✅ Hypothesis validation |

**For [Explore Type], execute the following parts:**

---

## What This Step Does

**Human-First Pattern: Agent executes ONLY activities selected in Step 1**

1. **Build Context Baseline** (Part A) - Execute ONLY selected activities from bundle (1, 2, 3, 4, 5)
2. **Create Personas & Journeys** (Part B - if selected) - Execute ONLY if steering team selected in Step 1
3. **Evaluate Inline** (was Step 7 - if Part C needed) - "Do I have enough evidence for a hypothesis?"
4. **Draft Hypothesis** (Part C - D/C only, if selected) - Execute ONLY if steering team selected in Step 1
5. **Stakeholder Validation** (Part D - D/C only, if selected) - Execute ONLY if hypothesis was generated

**Key Difference from Agent-First:**
- Agent does NOT produce artifacts for unselected activities
- Steering team controlled scope in Step 1 (leading authority)
- Agent executes ONLY what was selected
- No speculative work on personas/journeys if steering team skipped them

---

## Part A: Context Capture & Signal Enrichment

**Agent reads Explore Bundle to determine which activities to execute:**

```
Reading: explore/explore-[slug]/explore-bundle.md

Selected Activities (from Step 1):
- ✅ Activity 1: Context Documentation (always required)
- [✅/❌] Activity 2: Market Research (Steering team selected: Yes/No)
- [✅/❌] Activity 3: Domain Analysis (Steering team selected: Yes/No)
- [✅/❌] Activity 4: Regulatory Compliance (Steering team selected: Yes/No)
- ✅ Activity 5: Technical Feasibility (always required)
- [✅/❌] Activity 6: Architecture Context (Steering team selected: Yes/No)
- [✅/❌] Activity 7: Personas (Steering team selected: Yes/No)
- [✅/❌] Activity 8: Journey Mapping (Steering team selected: Yes/No)
- [✅/❌] Activity 9: Hypothesis (Steering team selected: Yes/No)

Activities excluded by steering team: [List activities steering team chose to skip]
```

**Agent will execute ONLY selected activities. Skipped activities will NOT generate artifacts.**

**Human-First Enforcement:**
- If Activity 2 not selected → Skip market research, no market-research.md created
- If Activity 6 not selected → Skip architecture context, no architecture-context.md created
- If Activity 7 not selected → Skip personas, no personas-[slug].md created
- If Activity 9 not selected → Skip hypothesis, no hypothesis.md created
- Agent does NOT ask "Should I create this?" - Steering team already decided in Step 1

---

### Execution Strategy: Parallel vs Sequential Activities

**Part A activities have dependencies that determine execution order:**

**Sequential (must execute in order):**
1. **Activity 1 (Context Documentation)** → Must complete first (baseline for all other activities)
2. **Activity 6 (Architecture Context)** → Depends on Activity 1 and Activity 5 (`technical-feasibility.md`)

**Parallel (can execute concurrently after Activity 1):**
- **Activity 2 (Market Research)** + **Activity 3 (Domain Analysis)** + **Activity 4 (Regulatory Compliance)** + **Activity 5 (Technical Feasibility)**
  - These are independent and can run in parallel
  - All depend on Activity 1 (Context) but not on each other
  - Steering team can assign different members to work on these simultaneously

**Execution Pattern:**
```
Phase 1 (Sequential):
  Activity 1: Context Documentation ← Must complete first

Phase 2 (Parallel - if selected):
  ├─ Activity 2: Market Research (independent)
  ├─ Activity 3: Domain Analysis (independent)
  ├─ Activity 4: Regulatory Compliance (independent)
  └─ Activity 5: Technical Feasibility (independent)

Phase 3 (Sequential - if selected):
  Activity 6: Architecture Context ← Depends on Activity 1 + Activity 5 (requires technical-feasibility.md)
```

**Steering Team Coordination:**
- **Product Manager** leads Activity 1 (Context) and Activity 2 (Market Research)
- **Architect** leads Activity 5 (Technical Feasibility) and Activity 6 (Architecture Context)
- **Lead Engineer** supports Activity 5 (Technical Feasibility)
- **Domain Expert** (if available) leads Activity 3 (Domain Analysis)
- **Compliance Lead** (if available) leads Activity 4 (Regulatory Compliance)

### Optional Early Activity: Domain Onboarding

**Status**: [✅ Execute / ❌ Skip] (steering team decision — recommended if team is new to the domain)

**If selected:**
> **Load skill:** `explore.proc.domain-onboarding` — follow Loader Protocol above.
> 
> Run BEFORE Activity 1 to build a domain profile for the team.
> 
> Expected output: `persistent-knowledge/[domain]-profile.md`

**When to select:**
- Team has not worked in this domain before
- Domain is complex or regulated
- Multiple domains are in scope

**Note:** If a domain profile is produced here, Architecture Solutioning in Step 5 can skip B.0 (Domain Onboarding) — the profile already exists at `persistent-knowledge/[domain]-profile.md`.

---

### Activity 1: Context Documentation - Conditional Skill Loading

**Status**: ✅ Always executed (required baseline)

**Check if specialized skills are needed:**

**If Signal contains binary attachments (.pdf, .docx, .pptx):**
> **Load skill:** `explore.util.document-ingestion` — follow Loader Protocol above.
> 
> Convert binary documents to markdown before proceeding.
> 
> Command: `python tools/doc-to-md.py <input-file> --output-dir explore/sources/`

**For context documentation:**
> **Load skill:** `explore.proc.context-documentation` — follow Loader Protocol above.
> 
> Follow the skill's procedure for creating context baseline.
> 
> Expected outputs: Problem reframe, scope, stakeholder map, assumptions, gaps.

**Otherwise:**
> Proceed with inline context documentation using the template below.

Use `context-documentation` skill to create baseline:
1. **Problem reframe** — actionable problem statement from Signal framing
2. **Scope & Boundaries** — in-scope and out-of-scope from Signal + Explore Bundle
3. **Stakeholder Map & RACI** — from Signal actors + Explore Bundle
4. **Governance Framework** — who decides what, based on Signal sponsor and actors
5. **Assumptions Catalogue** — every ASSUMPTION from Signal, converted to open questions with risk assessment
6. **Gaps Catalogue** — everything missing that Part B must gather
7. **Context Summary** — one-page baseline linking all above

### Activity 2: Market Research - Conditional Skill Loading

**Status**: [✅ Execute / ❌ Skip] (based on Step 1 selection)

**If this activity is selected in the Explore Bundle:**
> **Load skill:** `explore.proc.market-research` — follow Loader Protocol above.
> 
> Follow the skill's procedure for market validation.
> 
> Expected outputs: Market size, competitive landscape, opportunity gaps.

**If this activity is skipped:**
> Skip to Activity 3.

Use `market-research` skill to validate market opportunity:
1. **Market size and growth** — validate addressable market
2. **Competitive landscape** — understand existing solutions
3. **Market gap analysis** — identify opportunity gaps
4. **Supply and demand** — validate market need
5. **Regulatory context** — identify market-specific regulations

### Activity 3: Domain Analysis - Conditional Skill Loading

**Status**: [✅ Execute / ❌ Skip] (based on Step 1 selection)

**If this activity is selected in the Explore Bundle:**
> **Load skill:** `explore.proc.domain-analysis` — follow Loader Protocol above.
> 
> Follow the skill's procedure for domain modeling.
> 
> Expected outputs: Domain glossary, domain model, domain rules, user roles.

**If this activity is skipped:**
> Skip to Activity 4.
> 
> Log: `[DEPENDENCY: domain-analysis.md not produced — will block domain-driven naming in Steps 4–5 for multi-domain Explores]`

Use `domain-analysis` skill to understand domain structure:
1. **Domain glossary** — canonical names + definitions (terms that must be used consistently across all artifacts)
2. **Domain model** — entities, relationships, boundaries per domain, lifecycle states
3. **Domain rules** — constraints, invariants, business rules per domain
4. **User roles and responsibilities** — domain roles, not org chart
5. **Current state** — what exists today, known pain points
6. **Risks and unknowns** — what we don't know about the domain

**Artifact**: `explore/explore-[slug]/domain-analysis.md` — contains Domain Glossary, Domain Model, Domain Rules sections.

**Consolidation note**: If Architecture Context (Activity 6) is also selected and its Step 4 (Model Domain) produces domain modeling artifacts, agent MUST produce a single consolidated `domain-analysis.md` that merges both sources. Do not create duplicate domain artifacts.

### Activity 4: Regulatory and Compliance Focus - Conditional Skill Loading

**Status**: [✅ Execute / ❌ Skip] (based on Step 1 selection)

**If this activity is selected in the Explore Bundle:**
> **Load skill:** `explore.proc.regulatory-compliance` — follow Loader Protocol above.
> 
> Follow the skill's procedure for compliance analysis.
> 
> Expected outputs: Standards, data handling rules, accessibility requirements, non-negotiables.

**If this activity is skipped:**
> Skip to Activity 5.

Use `regulatory-compliance` skill to capture constraints:
1. **Applicable standards and policies** — by region, industry, data type
2. **Data handling rules** — collection, retention, consent, auditability
3. **Accessibility requirements** — baseline obligations
4. **Copy and disclosure requirements** — what must be shown, when
5. **Evidence requirements** — logs, confirmations, records needed
6. **Non-negotiables** — requirements that cannot be compromised

### Activity 5: Technical Feasibility and Trends - Conditional Skill Loading

**Status**: ✅ Always executed (required baseline)

**For technical feasibility:**
> **Load skill:** `explore.proc.technical-feasibility` — follow Loader Protocol above.
> 
> Follow the skill's procedure for technical validation.
> 
> Expected outputs: System context, data realities, constraints, opportunities, design guardrails.

**Otherwise:**
> Proceed with inline technical feasibility assessment using the template below.

Use `technical-feasibility` skill to identify constraints and opportunities:
1. **System context** — existing platforms, dependencies, integrations
2. **Data realities** — what data exists, quality, latency, ownership
3. **Technical constraints** — auth, roles, performance, offline, devices
4. **Technical opportunities** — automation, AI, personalization, instrumentation
5. **Design constraints and guardrails** — boundaries for UX design
6. **Questions for engineering** — targeted validation questions

### Activity 6: Architecture Context - Conditional Skill Loading

**Status**: [✅ Execute / ❌ Skip] (based on Step 1 selection)

**When to select:**
- Team is inheriting or extending an existing system that needs to be baselined
- Architecture constraints, drivers, and landscape need to be captured before PRD
- The team wants a consolidated architecture context to feed into solutioning (Step 5)
- Any engagement where understanding the existing technical landscape is valuable

**If this activity is selected in the Explore Bundle:**
> **Load skill:** `explore.proc.architecture-context` — follow Loader Protocol above.
> 
> Execute all applicable steps (depth adapts by Explore Type):
> 1. Ingest existing client architecture documents (HLDs, diagrams, API specs, runbooks)
> 2. Capture architecture landscape (structured AQ-001–012 questions)
> 3. Extract architecture drivers (functional drivers, quality attributes, constraints — scored)
> 4. Light domain modeling (bounded contexts, context map — consolidates with Activity 3 if both ran)
> 5. Write consolidated `architecture-context.md`
> 
> Expected outputs: Consolidated architecture context baseline, existing-state HLD (if legacy system), extracted ADRs (if existing decisions found).

**If this activity is skipped:**
> Skip to Part A summary. Architecture solutioning in Step 5 will read individual Explore artifacts directly (lower-quality path — discovery findings not consolidated).

**Explore Type adaptation for Architecture Context:**

| Explore Type | Architecture Context Depth |
|-------------|----------------------------|
| **Fast Lane** | Step 1 only (ingest docs) + Step 3 light (drivers from docs, no AQ questions) |
| **ERC** | Steps 1–3 + Step 5 (skip deep domain modeling) |
| **Diverge/Converge** | All 5 steps (full ingest + landscape + drivers + domain model + consolidated context) |

**Artifacts created:**
- `explore/explore-[slug]/architecture-context.md` — consolidated architecture context (primary output)
- `explore/hlds/[slug]-existing-hld.md` — HLD of existing system (optional, if legacy system exists — produced via `hld-drafting` baseline)
- `explore/decisions/[slug]-adr-NNN-[name].md` — ADRs for existing significant decisions (if found — produced via `hld-drafting` baseline + `adr-lifecycle`)

**Note:** The `architecture-context.md` artifact is the primary input for `explore.proc.architecture-solutioning` in Step 5. It replaces the former separate `architecture-drivers.md`, `domain-model.md`, and `landscape-assessment.md` artifacts with a single consolidated document.

---

**After producing all Part A artifacts, agent presents assessment:**

```
Part A (Context) complete. Here is what I produced and what I found:

Produced:
  ✓ Context baseline: Problem reframe, scope, stakeholder map, assumptions
  ✓ Market research: Market size validated, [N] competitors identified, [N] opportunity gaps
  ✓ Domain analysis: [N] entities, [N] domain rules, [N] roles defined
  ✓ Regulatory compliance: [N] regulations identified, [N] non-negotiables, [N] compliance risks
  ✓ Technical feasibility: [N] constraints, [N] opportunities, [N] design guardrails
  ✓ Architecture context: [N] documents ingested, [N] drivers ranked, [N] constraints captured, [N] bounded contexts identified (if Activity 6 selected)

Files created:
  • explore/explore-[slug]/context.md
  • explore/explore-[slug]/market-research.md
  • explore/explore-[slug]/domain-analysis.md
  • explore/explore-[slug]/regulatory-compliance.md
  • explore/explore-[slug]/technical-feasibility.md
  • explore/explore-[slug]/architecture-context.md (if Activity 6 selected — consolidated architecture context)
  • explore/hlds/[slug]-existing-hld.md (if Activity 6 selected and legacy system exists)
  • explore/decisions/[slug]-adr-*.md (if Activity 6 selected and existing decisions found)
  • explore/glossary.md (updated)

Items I could not resolve — I need your input:
  1. [Gap] — e.g., "Domain includes [entity] but its relationship to [entity] is unclear. Can you describe it?"
  2. [Gap] — e.g., "Regulatory requirement [X] is unclear for [region]. Can you confirm?"
  3. [Gap] — e.g., "Technical constraint [X] is tagged [ASSUMPTION]. Can you confirm or is it still unknown?"

Items I made a judgment call on — confirm or correct:
  1. [Judgment] — e.g., "I assumed [actor] is a secondary stakeholder. Is that right?"
  2. [Judgment] — e.g., "I interpreted [Signal phrase] as meaning [interpretation]. Correct?"
  3. [Judgment] — e.g., "I classified [regulation] as high priority. Does that align with your view?"
```

**STOP — AskUserQuestion (targeted to agent-identified gaps only):**

```
Question D-1
  Header:      "Context gaps"
  Question:    "I identified [N] items I need your input on (listed above).
                How would you like to proceed?"
  Multi-select: No
  Options:
    - I'll answer them now     — Provide input for each gap in the next message
    - Accept as open questions — Flag them in the context; Part B will close them
    - Some I can answer        — Tell me which ones; I'll answer those
    - None — proceed           — No additional input; proceed to Part B
```

**After user responds:**
- Incorporate any provided input into context artifacts
- Flag remaining items as open questions
- Update discovery.md with artifact status
- Continue to file creation

---

### Human Checkpoint: Context Baseline Review

**Pause for human review before proceeding to Part B.**

**Review Criteria:**
- [ ] All Part A activities executed as planned
- [ ] Context baseline is complete and evidenced
- [ ] No hallucinated content (all claims traced to Signal or research)
- [ ] Open questions are properly documented
- [ ] Assumptions are catalogued with risk assessments
- [ ] Files created follow naming conventions

**Questions to consider:**
- Does the context baseline accurately capture the problem and scope?
- Are all stakeholders properly identified in the RACI?
- Are technical constraints and opportunities realistic?
- Should we address any gaps before moving to Part B?

**Once reviewed:**
- Continue to Part B (Personas & Journeys)
- OR stop here and refine context if needed

**Agent writes to Context Warehouse immediately after Part A (incorporating any corrections):**

`explore/explore-[slug]/context.md` — create with these sections:
- **Problem Statement** — actionable reframe from the Signal (specific, not symptomatic)
- **Scope** — in-scope list and out-of-scope list from Signal + Explore Bundle
- **Domain Model** — table: Entity · Description · Key attributes · Relationships
- **System Map** — table: Component · Role · Integrates with
- **Technical Constraints** — table: Constraint · Source · Status (confirmed / assumed)
- **Stakeholder Map & RACI** — table: Stakeholder · Role · R · A · C · I
- **Governance Framework** — who decides what, decision-making authority
- **Assumptions Catalogue** — table: Assumption from Signal · Open question · Risk if wrong · Owner
- **Gaps for Part B** — table: Gap · Why it matters · Closes in (sub-phase)
- **Enrichment Log** — table starts empty; updated at every enrichment point

`explore/explore-[slug]/market-research.md` — create with these sections:
- **Executive Summary** — market opportunity overview
- **Market Size & Growth** — addressable market validation
- **Competitive Landscape** — existing solutions and positioning
- **Market Gap Analysis** — opportunity gaps identified
- **Supply and Demand Analysis** — market need validation
- **Key Insights & Recommendations** — strategic recommendations

`explore/explore-[slug]/domain-analysis.md` — create with these sections:
- **Domain Glossary** — terms that must be used consistently
- **Domain Model** — entities, relationships, lifecycle states
- **Domain Rules and Constraints** — business rules, invariants, validations
- **User Roles and Responsibilities** — domain roles with permissions
- **Current State** — existing processes, systems, pain points
- **Domain Risks and Unknowns** — what we don't know, assumptions to validate
- **Domain Model Summary** — core entities, relationships, implications

`explore/explore-[slug]/regulatory-compliance.md` — create with these sections:
- **Applicable Standards and Policies** — by region, industry, data type
- **Data Handling Rules** — collection, retention, access, security
- **Accessibility Requirements** — standards, obligations, baseline
- **Copy and Disclosure Requirements** — what must be shown, when
- **Evidence Requirements** — audit logs, confirmations, proof
- **Compliance Risk Register** — risks with mitigation strategies
- **Non-Negotiables List** — requirements that cannot be compromised
- **Compliance Acceptance Criteria** — testable criteria

`explore/explore-[slug]/technical-feasibility.md` — create with these sections:
- **System Context** — platforms, dependencies, integrations, tech stack
- **Data Realities** — availability, quality, latency, ownership, gaps
- **Technical Constraints** — auth, performance, offline, devices, APIs
- **Technical Opportunities** — automation, AI, personalization, analytics
- **Technical Risks and Unknowns** — risks, unknowns, debt, scalability
- **Design Constraints and Guardrails** — must/should constraints, performance, accessibility
- **Questions for Engineering** — targeted validation questions

`explore/glossary.md` — add or update any domain terms introduced in the domain model that are not already present.

---

### Mid-Execution Consistency Check: Part A Validation

**After completing Part A activities, validate consistency before proceeding to Part B:**

**Agent performs cross-artifact validation:**

```
Part A Consistency Check:

Validating cross-artifact alignment:
  [✓/✗] Context assumptions match Signal assumptions
  [✓/✗] Domain model terms consistent across all Part A artifacts
  [✓/✗] Technical constraints align with regulatory requirements
  [✓/✗] Stakeholder map consistent between context.md and domain-analysis.md
  [✓/✗] Market research findings align with Signal hypothesis
  [✓/✗] All [ASSUMPTION] tags documented in assumptions catalogue
  [✓/✗] No conflicting constraints across artifacts

Inconsistencies found: [N]

[If inconsistencies found, list each one with:]
  • Inconsistency: [Description]
  • Artifacts affected: [List]
  • Recommended fix: [Proposed resolution]
```

**STOP — AskUserQuestion (if inconsistencies found):**

```
Question D-1
  Header:      "Part A Consistency Check"
  Question:    "I found [N] inconsistencies across Part A artifacts.
                Should I fix them before proceeding to Part B?"
  Multi-select: No
  Options:
    - Fix all automatically        — Agent resolves all inconsistencies
    - Review each inconsistency    — Agent presents each for approval
    - Proceed anyway               — Continue to Part B, address later
    - Stop and review manually     — Pause for steering team review
```

**After steering team responds:**
- If fix all: Apply all recommended fixes and re-validate
- If review each: Present each inconsistency for individual approval
- If proceed anyway: Document inconsistencies in discovery.md for later resolution
- If stop: Pause execution for manual review

**Consistency validation benefits:**
- Catches conflicts early (before Part B builds on inconsistent foundation)
- Prevents cascading errors in personas, journeys, and hypothesis
- Reduces rework in later steps (Solution Design, PRD)
- Ensures steering team alignment before proceeding

**Once validated:**
- All Part A artifacts are consistent
- Continue to Part B (Stakeholder Input & Hypothesis)

---

## Part B: Stakeholder Input & Hypothesis Backlog - Conditional Execution

**Agent checks Explore Bundle: Were personas/journeys selected in Step 1?**

```
Reading bundle for Part B activities:
- Activity 6 (Personas): [✅ Selected / ❌ Excluded by steering team]
- Activity 7 (Journey Mapping): [✅ Selected / ❌ Excluded by steering team]
```

**If BOTH activities excluded by steering team:**
> ❌ **SKIP Part B entirely** - Steering team chose not to create personas/journeys in Step 1.
> 
> No persona or journey artifacts will be generated.
> 
> Continue to Part C evaluation (if hypothesis selected).

**If Activity 6 (Personas) selected:**
> ✅ **Execute persona creation**
> 
> **Load skill:** `explore.proc.persona` — follow Loader Protocol above.
> 
> Create evidence-based personas as selected by steering team.

**If Activity 7 (Journey Mapping) selected:**
> ✅ **Execute journey mapping**
> 
> **Load skill:** `explore.proc.journey-mapping` — follow Loader Protocol above.
> 
> Create journey maps as selected by steering team.

**Human-First Enforcement:**
- Agent does NOT ask "Should I create personas?" - Steering team already decided
- Agent does NOT produce personas speculatively - only if selected
- If steering team excluded personas, agent skips Part B without generating artifacts

**Agent produces — without asking first:**

1. **Personas** — from stakeholder input and Signal actors
   - Evidence tagging: `[FACT]` or `[ASSUMPTION]`
   - Need statements clearly articulated
   - Validation status tracked

2. **Journey Maps** — current-state user journeys
   - Pain points identified
   - Opportunities highlighted
   - Validation status for each stage

3. **Draft Hypothesis** — evidence-based hypothesis from discovery findings

**After producing all artifacts, agent presents assessment:**

```
Part B (Stakeholder) complete. Here is what I produced:

Produced:
  ✓ Personas: [N] personas created
  ✓ Journey maps: [N] journeys documented
  ✓ Draft hypothesis: Evidence-based hypothesis statement

Items I need your input on:
  ⚠ [Specific persona attribute] — is this [FACT] or [ASSUMPTION]?
  ⚠ [Journey pain point] — can you validate this is accurate?

Items I made a call on — confirm or correct:
  • [Persona judgment]
  • [Journey judgment]
```

**STOP — AskUserQuestion:**

```
Question D-2
  Header:      "Stakeholder artifacts"
  Question:    "I've created personas and journey maps (above). Are they accurate?"
  Multi-select: No
  Options:
    - All accurate             — Proceed to hypothesis evaluation
    - One correction needed    — Tell me what to change
    - Add evidence             — I have additional facts to strengthen these
    - Flag assumptions         — Tell me which items are assumptions, not facts
```

**After user responds:**
- Incorporate corrections into persona and journey artifacts
- Update evidence tagging ([FACT] vs [ASSUMPTION])
- Write files to Context Warehouse
- Update discovery.md
- Continue to inline evaluation

---

### Human Checkpoint: Personas & Journeys Review

**Pause for human review before hypothesis generation.**

**Review Criteria:**
- [ ] Personas are evidence-based (not invented)
- [ ] Evidence tagging is accurate ([FACT] vs [ASSUMPTION])
- [ ] Journey maps reflect real user experiences
- [ ] Pain points are validated
- [ ] No hallucinated user needs

**Questions to consider:**
- Do these personas represent actual user segments?
- Are journey pain points backed by evidence?
- Should we strengthen any assumptions with additional research?

**Once reviewed:**
- Continue to Hypothesis Readiness Evaluation
- OR stop here and refine personas/journeys if needed

**Agent writes to Context Warehouse after Part B (incorporating any human input):**

`explore/domain/personas-[slug].md` — create with:
- Persona profiles with evidence tagging
- Need statements
- Validation status

`explore/domain/journey-[slug].md` — create with:
- Current-state journey stages
- Pain points and opportunities
- Validation status
- Future-state column (empty, filled in Step 3)

Agent enriches `discovery.md` — updates context, personas, and journey rows from ⏳ → ✓.

---

## Inline Evaluation: Hypothesis Readiness

**Agent evaluates (was Step 7 - Hypothesis Readiness Check):**

```
Hypothesis Readiness Evaluation:

Evidence gathered:
  ✓ Context baseline complete
  ✓ [N] personas documented
  ✓ [N] journey maps created
  ✓ [N] stakeholder inputs captured

Evaluation:
  [✓/✗] Enough evidence to draft hypothesis
  [✓/✗] User needs clearly articulated
  [✓/✗] Problem validated by stakeholders
  [✓/✗] Success signals identifiable

Assessment: [READY | NEEDS MORE EVIDENCE]
```

**If NEEDS MORE EVIDENCE**: Agent identifies specific gaps and asks steering team for targeted input.

**If READY**: Agent proceeds to hypothesis drafting.

---

## Part C: Hypothesis Generation - Conditional Execution

**Agent checks Explore Bundle: Was hypothesis selected in Step 1?**

```
Reading bundle for Part C:
- Activity 8 (Hypothesis): [✅ Selected / ❌ Excluded by steering team]
```

**If hypothesis excluded by steering team:**
> ❌ **SKIP Part C entirely** - Steering team chose not to create hypothesis in Step 1.
> 
> No hypothesis.md will be generated.
> 
> Proceed to Step 2 completion.

**If hypothesis selected by steering team:**
> ✅ **Execute hypothesis generation**
> 
> **Load skill:** `explore.proc.hypothesis-documentation` — follow Loader Protocol above.
> 
> Follow the skill's procedure for hypothesis drafting.
> 
> Expected outputs: Evidence-based hypothesis statement with measurable signals.

**Human-First Enforcement:**
- Agent does NOT ask "Should I create a hypothesis?" - Steering team already decided
- Agent does NOT generate hypothesis speculatively - only if selected
- If steering team excluded hypothesis (e.g., Fast Lane), agent skips Part C without generating artifacts

**Agent drafts hypothesis from Part A + Part B findings:**

```
Hypothesis draft — based on discovery findings:

Statement:
  "We believe [user] need [capability/outcome]
   because [evidence from Parts A & B].
   We will know this is true when [measurable signal]."

Evidence base:
  ✓ [Evidence item — source]
  ✓ [Evidence item — source]
  ⚠ [Assumption still embedded — flagged]

Remaining assumptions in this hypothesis:
  1. [Assumption] — risk if wrong: [impact]
```

**STOP — AskUserQuestion:**

```
Question D-3
  Header:      "Hypothesis review"
  Question:    "Here is my hypothesis draft. Does it accurately capture what
                we believe and why?"
  Multi-select: No
  Options:
    - Yes, accurate            — Proceed to stakeholder validation
    - Adjust the statement     — Tell me what to change
    - Strengthen the evidence  — I have additional evidence to add
    - The measurable signal is wrong — Tell me the right one
```

**After user responds:**
- Incorporate adjustments into hypothesis
- Strengthen evidence base if additional evidence provided
- Write hypothesis.md to Context Warehouse
- Continue to Part D (Stakeholder Validation)

---

### Human Checkpoint: Hypothesis Review

**Pause for human review before stakeholder validation.**

**Review Criteria:**
- [ ] Hypothesis statement is clear and testable
- [ ] Evidence base is comprehensive and sourced
- [ ] Measurable signals are specific and achievable
- [ ] Remaining assumptions are identified and risk-assessed
- [ ] No unsupported claims

**Questions to consider:**
- Does this hypothesis accurately reflect our discovery findings?
- Are the success signals measurable and realistic?
- Are we comfortable with the remaining assumptions?

**Once reviewed:**
- Continue to Part D (Stakeholder Validation)
- OR stop here and refine hypothesis if needed

**Agent writes `explore/explore-[slug]/hypothesis.md` once confirmed:**

File structure:
- **Status**: DRAFT (updated to STAKEHOLDER-VALIDATED after Part D)
- **Signal**: [link] · **Date created**: [date]
- **Statement**: "We believe [user] need [capability/outcome] because [evidence]. We will know this is true when [measurable signal]."
- **Evidence Base** — table: Evidence item · Source (SP2 interview / Signal FACT / SP1 finding) · Type (confirmed / assumed — flagged)
- **Open Assumptions** — table: Assumption · Risk if wrong · Owner
- **Stakeholder Validation** — populated in Part D: validator name · date · outcome (approved / approved with changes) · any refinements incorporated
- **Enrichment Log** — appended after stakeholder validation

---

## Part D: Hypothesis Validation Check

**Agent evaluates (was Step 9 - Hypothesis Validation Check):**

```
Hypothesis Validation Check:

Hypothesis status: DRAFT
Validation required: RACI stakeholders must review and approve

Validation checklist:
  [✓/✗] Hypothesis presented to RACI stakeholders
  [✓/✗] Stakeholders confirmed hypothesis accuracy
  [✓/✗] Any refinements incorporated
  [✓/✗] Hypothesis status updated to STAKEHOLDER-VALIDATED

Assessment: [VALIDATED | NEEDS STAKEHOLDER REVIEW]
```

**STOP — AskUserQuestion:**

```
Question D-4
  Header:      "Stakeholder validation"
  Question:    "Has the hypothesis been reviewed and approved by RACI stakeholders?"
  Multi-select: No
  Options:
    - Yes, validated           — Update status to STAKEHOLDER-VALIDATED; proceed to Step 3
    - Not yet                  — I'll get stakeholder feedback and return
    - Stakeholders requested changes — Tell me what changes they requested
    - Validation not possible  — Document as accepted risk; proceed with caution
```

**After user responds:**
- Update hypothesis.md status to STAKEHOLDER-VALIDATED
- Populate Stakeholder Validation section
- Update discovery.md with validation status
- Update enrichment logs

**Once validated, agent updates:**

1. `explore/explore-[slug]/hypothesis.md`:
   - Status: DRAFT → STAKEHOLDER-VALIDATED
   - Stakeholder Validation section populated
   - Enrichment log updated

2. `explore/explore-[slug]/discovery.md`:
   - Hypothesis row updated from ⏳ → ✓
   - Enrichment log appended

---

---

### Human Checkpoint: Stakeholder Validation Complete

**Final review before completing Step 2.**

**Review Criteria:**
- [ ] Hypothesis is stakeholder-validated (if D/C)
- [ ] All validation feedback incorporated
- [ ] Status updated in all artifacts
- [ ] Discovery.md is current

**Questions to consider:**
- Are we confident in the validated hypothesis?
- Should we address any stakeholder concerns before proceeding?

**Once reviewed:**
- Step 2 is complete
- Ready to proceed to Step 3 (Solution Design)

---

## Exit Criteria (Gate Out)

Before proceeding to Step 3 (Solution Design), verify:

**Part A Artifacts:**
- [ ] Context baseline documented (`explore/explore-[slug]/context.md`)
- [ ] Market research completed (if selected) (`market-research.md`)
- [ ] Domain analysis documented (if selected) (`domain-analysis.md`)
- [ ] Regulatory compliance documented (if selected) (`regulatory-compliance.md`)
- [ ] Technical feasibility documented (`technical-feasibility.md`)
- [ ] Glossary updated with domain terms

**Part B Artifacts (if required by Explore Type):**
- [ ] Personas created with evidence tagging (`explore/domain/personas-[slug].md`)
- [ ] Journey maps created (`explore/domain/journey-[slug].md`)
- [ ] Evidence tagging is accurate ([FACT] vs [ASSUMPTION])

**Part C & D Artifacts (if Diverge/Converge):**
- [ ] Hypothesis readiness evaluated inline (PASS)
- [ ] Hypothesis drafted (`explore/explore-[slug]/hypothesis.md`)
- [ ] Hypothesis validated by RACI stakeholders (status: STAKEHOLDER-VALIDATED)
- [ ] Stakeholder Validation section populated

**Quality Gates:**
- [ ] All artifacts are evidenced (no hallucinated content)
- [ ] All enrichment logs are consistent
- [ ] All artifacts cross-reference each other
- [ ] Discovery.md is updated with all artifact statuses
- [ ] Open questions are documented and assigned

**Traceability:**
- [ ] All context links back to Signal
- [ ] All personas link to stakeholder research
- [ ] Hypothesis links to discovery evidence
- [ ] No unsupported claims

**If any criterion fails, STOP and address before proceeding to Solution Design.**

---

## Workflow Complete

**STOP HERE** - Discovery step has finished.

**What to do next (requires human decision):**

This workflow is complete. To continue the Explore Agent process, you must explicitly trigger the next step:

1. **Continue to Solution Design:** Start a new session — `Explore Solution Design`
2. **Review discovery artifacts:** Check all files in `explore/explore-[slug]/` before proceeding
3. **Refine discovery:** Say `Explore Discovery` again if any artifacts need adjustment

**Do NOT automatically proceed to Solution Design.**

**Human checkpoint required before continuing.**

---

## Related

- **Previous Step:** `01-explore-bundle.md` (requires human trigger — say `Explore Bundle`)
- **Next Step:** `03-solution-design.md` (requires human trigger — say `Explore Solution Design`)
- **Skills Used:** 
  - `explore.proc.context-documentation` (conditional)
  - `explore.proc.market-research` (conditional)
  - `explore.proc.domain-analysis` (conditional)
  - `explore.proc.regulatory-compliance` (conditional)
  - `explore.proc.technical-feasibility` (conditional)
  - `explore.proc.persona` (conditional - ERC/D/C only)
  - `explore.proc.journey-mapping` (conditional - D/C only)
  - `explore.proc.hypothesis-documentation` (conditional - D/C only)
  - `explore.util.document-ingestion` (conditional - if binary attachments)
- **Artifacts Folder:** `explore/explore-[slug]/`
- **Key Files:** 
  - `context.md` (context baseline)
  - `market-research.md` (if selected)
  - `domain-analysis.md` (if selected)
  - `regulatory-compliance.md` (if selected)
  - `technical-feasibility.md` (always)
  - `explore/domain/personas-[slug].md` (if ERC/D/C)
  - `explore/domain/journey-[slug].md` (if D/C)
  - `hypothesis.md` (if D/C)
  - `discovery.md` (artifact index)
