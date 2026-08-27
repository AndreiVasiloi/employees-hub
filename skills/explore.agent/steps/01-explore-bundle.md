# Step 1: Explore Bundle

**Consolidates**: Original steps 3-4 (Capability Areas Validation + Explore Bundle)

**Objective**: Validate capability area scope and build the complete discovery plan. Agent proposes based on pre-validated Signal; steering team confirms capability areas and approves bundle.

---

## Trigger Phrases

| Shorthand | Full Phrase |
|-----------|-------------|
| `Explore Bundle` | `Let's start the explore bundle...` |
| `Start explore bundle` | `Create the discovery plan for this Signal...` |
| `Generate explore bundle` | `Build the explore bundle from this Signal...` |

---

## Prerequisites (Gate In)

**Signal Acceptance Gate (must pass before starting):**
- [ ] A Route-Ready Signal exists in `signal/signals/`
- [ ] Signal routing decision = "Route to Explore"
- [ ] Engagement signoff is complete
- [ ] Steering team assigned (Product, Architect, Lead Engineer minimum)
- [ ] Resource allocation confirmed (team capacity, budget)
- [ ] Clear engagement scope and constraints defined

**Step 1 Prerequisites:**
- [ ] Pre-validated Signal exists from Signal Agent (7 criteria validated)
- [ ] Signal file path is provided (e.g., `signal/signals/20260209-client-needs-ai-assistant.md`)
- [ ] Steering team is available for planning session and bundle approval

**If prerequisites are not met, STOP and address them first.**

---

## Execution Settings

> See SKILL.md § Execution Defaults for temperature, one-step-at-a-time, and Human-First rules.

**Step-specific risks with high temperature (>0.5):**
- Invented capability areas not evidenced in Signal
- Hallucinated activities not aligned with Explore Type
- Inconsistent artifact references
- False confidence in risk assessments

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
| `explore.proc.discovery-planning` | workflow | STOP — bundle cannot be produced |
| `explore.util.document-ingestion` | auxiliary | warn + continue with text-only Signal |

---

## What This Step Does

**Human-First Pattern: Steering team selects BEFORE agent generates**

1. **Read Signal & Extract Explore Type** - Read Signal file, verify routing, extract Explore Type recommendation
2. **Propose Capability Area Scope** - Agent recommends capability areas from Signal; steering team confirms/adjusts
3. **Confirm Explore Type** - Agent presents extracted recommendation; steering team selects type (FL/ERC/D/C)
4. **Recommend Activities** - Agent proposes activities based on type; steering team selects which to execute
5. **Generate Explore Bundle** - Agent builds bundle with ONLY selected activities
6. **Get Steering Team Approval** - Steering team reviews and approves final bundle

**Key Difference from Agent-First:**
- Agent does NOT generate artifacts speculatively
- Steering team makes upfront selections (capability areas, type, activities)
- Agent executes ONLY what steering team selected
- No wasted work on unwanted artifacts

---

## Agent Actions

### Action 0: Read Signal and Extract Explore Type Recommendation

**Agent asks for Signal file path:**

```
Please provide the Signal file path (e.g., `signal/signals/20260209-client-needs-ai-assistant.md`)
```

**Agent actions:**
1. Read the Signal file from provided path
2. Verify routing decision = "Route to Explore"
3. Extract problem statement, hypothesis, constraints, suggested activities
4. **Extract Explore Type Recommendation** (Fast Lane / Explore Readiness Check / Diverge/Converge)

**Agent presents Signal summary:**

```
Signal Summary:

File: signal/signals/[filename].md
Routing: ✅ Route to Explore (validated)

Problem Statement:
[Extracted from Signal]

Hypothesis:
[Extracted from Signal, if present]

Constraints:
[Extracted from Signal]

Explore Type Recommendation (from Signal):
[Fast Lane / Explore Readiness Check / Diverge/Converge]

Rationale:
[Why this Explore Type was recommended in Signal]

Suggested Activities (from Signal):
- [Activity 1]
- [Activity 2]
- [Activity 3]
```

**If Signal routing ≠ "Route to Explore":**

```
❌ ERROR: Signal routing decision is not "Route to Explore"

This Signal was routed to: [actual routing]

STOP: This Signal should not enter Explore phase.
Please verify the Signal file or return to Signal Agent for re-routing.
```

**If Explore Type recommendation is missing:**

```
⚠️ WARNING: No Explore Type recommendation found in Signal

I will analyze the Signal content to recommend an Explore Type in the next step.
```

**After presenting summary:**
- Continue to Action 1 (Propose Capability Areas in Scope)
- Use extracted Explore Type recommendation as starting point for confirmation

---

### Action 1: Propose Capability Areas in Scope

Agent analyzes Signal and proposes capability area table:

**Standard capability areas to check** (not all apply to every project):

| Capability Area | Agent's Suggestion | Evidence from Signal |
|--------|-------------------|----------------------|
| UX / UI | Yes / No / Partial | [page types, user-facing scope from Signal] |
| Backend Services | Yes / No / Partial | [API, proxy, SSR functions from Signal] |
| Data Layer | Yes / No / Partial | [data sources, feeds, integration data model from Signal] |
| Integrations | Yes / No / Partial | [third-party APIs, CMS, auth systems from Signal] |
| Infrastructure | Yes / No / Partial | [cloud infra, hosting, scalability from Signal] |
| Security / Compliance | Yes / No / Partial | [auth, regulatory, data privacy from Signal] |
| [Agent adds any capability area inferred from Signal not listed above] | Yes | [evidence] |

Agent marks each capability area "Yes (suggested)" / "No (not evidenced)" / "Partial (clarification needed)" and states Signal evidence.

**STOP — AskUserQuestion:**

```
Question EB-1
  Header:      "Capability areas in scope"
  Question:    "I've proposed which capability areas are in scope based on the Signal
                (table above). Are any wrong, missing, or should one be excluded?"
  Multi-select: No
  Options:
    - All correct — proceed    — Capability areas confirmed; build the Explore Bundle
    - Adjust one capability area — Tell me which capability area and what to change
    - Add a capability area     — Tell me the capability area name and what it covers
    - Exclude a capability area — Tell me which capability area is out of scope and why
```

**After user responds:**
- Record the confirmed capability areas in the capability area table
- Update any adjusted capability area descriptions
- Lock the capability area scope for bundle generation
- **Set override flag**: If `UX / UI` capability area is confirmed `Yes` or `Partial`, record `ui_in_scope = true`. This flag activates the Design Pipeline in Step 4 regardless of Explore Type. When `UX / UI = No`, design activities are never proposed.
- Continue to Action 2

---

### Human Checkpoint: Capability Area Validation

**Pause for steering team review before proceeding to bundle generation.**

**Steering Team Review:**
- [ ] **Product Manager** validates business capability area coverage
- [ ] **Architect** validates technical capability area coverage  
- [ ] **Lead Engineer** validates implementation capability area coverage
- [ ] All capability areas are evidenced from Signal (no hallucinated capability areas)
- [ ] Capability area descriptions accurately reflect Signal content
- [ ] No critical capability areas are missing
- [ ] Out-of-scope capability areas are correctly excluded

**Questions to consider:**
- Does the capability area scope match your understanding of the project?
- Are there any capability areas that need clarification?
- Should we adjust any capability area before building the bundle?

**Once reviewed:**
- Continue to Action 1.5 (Validate Folder Structure)
- OR stop here and refine capability area scope if needed

---

### Action 1.5: Validate and Setup Folder Structure

**Agent checks if specification folder structure exists:**

```
Checking folder structure in: explore/

Required folders:
- [ ] explore/prds/           # Product Requirements Documents
- [ ] explore/hlds/           # High-Level Design documents
- [ ] explore/architecture/   # System architecture and patterns
- [ ] explore/domain/         # Domain models and business rules
- [ ] explore/decisions/      # Architecture and design decisions
- [ ] explore/glossary.md     # Shared terminology (file)
- [ ] explore/epics/          # Long-lived epics (created later)
- [ ] explore/explore-[slug]/ # Explore-specific artifacts
- [ ] signal/signals/        # Signal documents
- [ ] explore/sources/        # Converted source documents
```

**If folders are missing:**

**STOP — AskUserQuestion:**

```
Question EB-1.5
  Header:      "Folder structure setup required"
  Question:    "The specification folder structure is incomplete.
                Should I create the missing folders?"
  Multi-select: No
  Options:
    - Yes — create folders          — Agent creates missing folders
    - Already exist elsewhere       — Tell me the correct path
    - Manual setup preferred        — I'll create them manually
```

**After steering team responds:**
- If yes: Create missing folders with README.md in each explaining purpose
- If elsewhere: Update path configuration and re-validate
- If manual: Wait for confirmation that folders are ready

**Folder structure standards:**
- Each folder includes README.md explaining its purpose
- Naming conventions documented in each README
- `.gitkeep` files to preserve empty folders in git

**Once validated:**
- All required folders exist and are accessible
- Continue to Action 2 (Generate Explore Bundle)

---

### Action 2: Generate Explore Bundle - Conditional Skill Loading

**Check if specialized skills are needed:**

**If Signal contains binary attachments (.pdf, .docx, .pptx):**
> **Load skill:** `explore.util.document-ingestion` — follow Loader Protocol above.
> 
> Convert binary documents to markdown before proceeding with bundle generation.
> 
> Command: `python tools/doc-to-md.py <input-file> --output-dir explore/sources/`
> 
> Expected outputs: Markdown files in `explore/sources/` for reference during bundle creation.

**For bundle generation:**
> **Load skill:** `explore.proc.discovery-planning` — follow Loader Protocol above.
> 
> Follow the skill's procedure for creating the Explore Bundle structure.
> 
> Expected outputs: Complete bundle with activities, questions, assumptions, risks, checkpoints.

**Otherwise:**
> Proceed with inline bundle generation using the template below.

**Agent builds the Explore Bundle:**

**Explore Bundle: [Topic]**

**Overview**  
[1–3 sentences: what the project is, what the Explore phase will validate, and what it will produce at the end.]

**Header**

| Field | Value |
|-------|-------|
| Status | Active |
| Created | [date] |
| Explore Type | [type] (FL [score] · ERC [score] · D/C [score]) |
| Steering Team | [Name — Role, Organisation per person] |

**Explore Type Determination**

Agent analyzes Signal and proposes Explore Type based on:

| Criteria | Fast Lane | Explore Readiness Check | Diverge/Converge |
|----------|----------------------|-------------------------------------|------------------------------|
| **Scope Clarity** | Clear, well-defined | Partially defined | Ambiguous, needs exploration |
| **Technical Risk** | Low, proven tech | Medium, some unknowns | High, novel/complex |
| **Stakeholder Alignment** | Aligned, consensus | Some gaps | Divergent views |
| **Capability Complexity** | Simple, 1-2 areas | Moderate, 3-4 areas | Complex, 5+ areas |
| **Hypothesis Needed** | No | Optional | Yes, critical |

**Recommended Type**: [Fast Lane / ERC / Diverge-Converge]  
**Rationale**: [Based on Signal analysis]

**STOP — AskUserQuestion:**

```
Question EB-2
  Header:      "Explore Type selection"
  Question:    "Based on the Signal, I recommend [Type] because [rationale].
                This determines which activities and artifacts we'll produce.
                Which Explore Type should we use?"
  Multi-select: No
  Options:
    - Use recommended [Type]        — Follow agent recommendation
    - Use Fast Lane instead         — Streamlined exploration
    - Use ERC instead               — Moderate exploration
    - Use Diverge/Converge instead  — Comprehensive exploration
```

**After user responds:**
- Lock the selected Explore Type
- Use this type to filter activity recommendations
- Continue to activity selection

---

### Human Checkpoint: Explore Type Selection

**Pause for human decision on exploration depth.**

**Review Criteria:**
- [ ] Explore Type recommendation is evidence-based from Signal
- [ ] Type rationale is clear and justified
- [ ] Type aligns with project constraints

**Questions to consider:**
- Does the recommended type match project constraints?
- Should we adjust the type based on stakeholder needs?

**Once selected:**
- Explore Type is locked for this session
- Continue to Activity Recommendation

**Explore Type locked**: [Confirmed Type]

**Signal Information**

| Field | Value |
|-------|-------|
| Signal Title | [from Signal] |
| Problem Statement | [from Signal, stripped of tags] |
| Tech Stack | [from Signal technical context] |
| Key Page Types / Features | [if applicable, from Signal] |
| Key Requirements | [from Signal expected outcomes and constraints] |

**Solution Profile — Capability Areas in Scope**  
[Validated capability area table from Action 1]

| Capability Area | In Scope | Description |
|--------|----------|-------------|
| UX / UI | Yes (confirmed) | [description from Signal + Capability Area Validation] |
| Backend Services | Yes (confirmed) | [description] |
| Data Layer | Yes (confirmed) | [description] |
| Integrations | Yes (confirmed) | [description] |
| Infrastructure | Yes (confirmed) | [description] |
| Security / Compliance | Yes (confirmed) | [description] |

**Planned Activities**

Activities are filtered based on Explore Type to prevent unnecessary work:

**Activity Filtering by Explore Type:**

| Activity | Fast Lane | ERC | D/C | Rationale |
|----------|-----------|-----|-----|-----------|
| Context Documentation | ✅ Required | ✅ Required | ✅ Required | Baseline for all types |
| Market Research | ❌ Skip | ⚠️ Optional | ✅ Required | FL has clear market fit |
| Domain Analysis | ❌ Skip | ⚠️ Targeted | ✅ Comprehensive | FL has simple domain |
| Regulatory Compliance | ⚠️ If needed | ✅ Required | ✅ Required | Based on domain |
| Technical Feasibility | ✅ Required | ✅ Required | ✅ Required | Always validate tech |
| Personas | ❌ Skip | ⚠️ Quick | ✅ Comprehensive | FL has known users |
| Journey Mapping | ❌ Skip | ❌ Skip | ✅ Required | Only for complex UX |
| Hypothesis | ❌ Skip | ❌ Skip | ✅ Required | Only for D/C |
| Architecture Analysis | ✅ Confirmation | ✅ Analysis | ✅ Comprehensive | Depth varies |
| Wireframing | ❌ Skip | ⚠️ Optional | ✅ Required | FL uses existing patterns |
| PRD | ✅ Lightweight | ✅ Standard | ✅ Comprehensive | Depth varies |

**Agent proposes activities based on [Confirmed Explore Type]:**

**Recommended Activities:**

| Code | Activity | Recommended | Rationale |
|------|----------|-------------|-----------|
| A1 | Context Documentation | ✅ Required | Baseline for all Explore types |
| A2 | Market Research | [✅/⚠️/❌] | [Based on Type and Signal gaps] |
| A3 | Domain Analysis | [✅/⚠️/❌] | [Based on Type and domain complexity] |
| A4 | Regulatory Compliance | [✅/⚠️/❌] | [Based on domain requirements] |
| A5 | Technical Feasibility | ✅ Required | Always validate technical constraints |
| A6 | Personas | [✅/⚠️/❌] | [Based on Type and user knowledge] |
| A7 | Journey Mapping | [✅/⚠️/❌] | [Based on Type and UX complexity] |
| A8 | Hypothesis | [✅/❌] | [D/C only] |
| A9 | Architecture Analysis | ✅ Required | [Depth varies by Type] |
| A10 | Wireframing | [✅/⚠️/❌] | [Based on Type and design needs] |
| A11 | PRD Generation | ✅ Required | Final deliverable |

**STOP — AskUserQuestion:**

```
Question EB-3
  Header:      "Activity selection (HUMAN LEADS)"
  Question:    "I've recommended activities based on [Type] and Signal gaps.
                YOU decide which activities to execute. I will ONLY generate
                artifacts for selected activities. Which should we run?"
  Multi-select: Yes
  Options:
    - All recommended activities (✅)     — Execute all activities marked ✅
    - All required only (✅ Required)     — Execute only mandatory activities
    - Let me select individually          — Choose specific activities one-by-one
    - Adjust recommendations              — Tell me which to add/remove and why
```

**After user responds:**
- Record selected activities
- Mark unselected activities as "Excluded by steering team"
- Generate bundle with ONLY selected activities
- Continue to bundle generation

---

### Human Checkpoint: Activity Selection (LEADING AUTHORITY)

**This is the critical Human-First decision point.**

**Review Criteria:**
- [ ] Activity recommendations are appropriate for Explore Type
- [ ] Effort estimates are realistic
- [ ] Dependencies between activities are clear
- [ ] Steering team understands what each activity produces

**Questions to consider:**
- Do we need all recommended activities?
- Are there activities we can skip to save time/cost?
- Should we add activities not recommended?
- What's the minimum viable set for Govern readiness?

**Once selected:**
- Agent will ONLY execute selected activities in Steps 2-4
- Unselected activities will NOT generate artifacts
- This prevents wasted work on unwanted outputs
- Continue to bundle generation with locked selections

**If "Let me select individually":**

```
For each activity, confirm:

A1 - Context Documentation (✅ Required):
  [ ] Execute  [ ] Skip (not recommended - baseline needed)

A2 - Market Research ([✅/⚠️/❌]):
  [ ] Execute  [ ] Skip
  If skip: [Reason - e.g., "Market already validated in Signal"]

A3 - Domain Analysis ([✅/⚠️/❌]):
  [ ] Execute  [ ] Skip
  If skip: [Reason]

[Continue for all activities...]
```

**Selected Activities (confirmed by steering team):**

Phase 1: Foundation & Context
| Code | Activity | Owner | Dependencies | Output | What it closes |
|------|----------|-------|-------------|--------|----------------|
| A1 | Context Documentation | Product Manager | None | context.md | [gap numbers] |
| [Selected] | [Activity name] | [Steering team role] | [deps] | [output] | [gaps] |

Phase 2: Domain Analysis
| Code | Activity | Owner | Dependencies | Output | What it closes |
|------|----------|-------|-------------|--------|----------------|
| [Selected] | [Activity name] | [Steering team role] | [deps] | [output] | [gaps] |

Phase 3: Synthesis & Proposal
| Code | Activity | Owner | Dependencies | Output | What it closes |
|------|----------|-------|-------------|--------|----------------|
| A11 | PRD Generation | Product Manager + Architect | All Phase 2 | [slug]-prd.md | — |

**Activities excluded by steering team**: [List activities steering team chose to skip with reasons]

**Note**: Only selected activities will be executed in Steps 2-4. Skipped activities won't generate artifacts.

**Open Questions**

Grouped by Signal completion section. Each question states what is unknown and which activity resolves it.

[Category — e.g., Framing & Constraints]
- Q1: [Question] — resolves in: [activity code]
- Q2: [Question] — resolves in: [activity code]

[Category — e.g., Strategic Alignment]
- Q3: [Question] — resolves in: [activity code]

[Category — e.g., Readiness & Feasibility]
- Q4: [Question] — resolves in: [activity code]

**Active Assumptions**

From Signal ASSUMPTION-tagged claims. Each assumption has a code, description, risk if wrong, and which activity validates it.

| Code | Assumption | Risk if wrong | Validate in |
|------|-----------|---------------|-------------|
| AS-1 | [assumption from Signal] | [risk] | [activity] |
| AT-1 | [technical assumption] | [risk] | [activity] |
| AO-1 | [organisational assumption] | [risk] | [activity] |

**Risks**

| Code | Risk | Impact | Likelihood | Mitigation |
|------|------|--------|-----------|------------|
| R1 | [risk description] | High / Med / Low | High / Med / Low | [activity that mitigates] |

**Expected Outputs**

[List of what this Explore phase will produce — one item per line. Must include PRD ready for Govern.]

**Constraints**

| Type | Constraint |
|------|-----------|
| Budget | [from Signal or "To be determined during Explore"] |
| Resources | [team shape from Signal or "To be confirmed"] |
| Technical | [pre-selected stack or architectural constraints from Signal] |
| Compliance | [regulatory requirements from Signal] |

**Checkpoints**

| Milestone | Criteria |
|-----------|---------|
| Phase 1 complete | [Foundation & Context activities complete — specific outputs] |
| Phase 2 midpoint | [Key domain analysis outputs ready] |
| Phase 2 complete | [All domain analyses complete] |
| Final milestone | [Commercial proposal / PRD ready; approval review scheduled] |

---

**STOP — AskUserQuestion:**

```
Question EB-2
  Header:      "Explore Bundle approval"
  Question:    "I've built the complete Explore Bundle (above). Does this
                discovery plan cover everything we need to validate?"
  Multi-select: No
  Options:
    - Approved — proceed       — Bundle is complete; start Discovery
    - Add an activity          — Tell me what activity to add
    - Adjust timeline          — Tell me the correct timeline
    - Revise assumptions       — Tell me which assumptions to change
```

**After user responds:**
- If approved: Proceed to Slug Generation and File Creation
- If adjustments needed: Update the bundle and re-present for approval
- Record approval decision in bundle header

---

### Human Checkpoint: Bundle Approval

**Pause for human review before creating files.**

**Review Criteria:**
- [ ] All selected activities align with Explore Type
- [ ] Timeline is realistic for the scope
- [ ] Open questions are comprehensive and assigned to activities
- [ ] Assumptions are properly categorized and have validation plans
- [ ] Risks are identified with mitigation strategies
- [ ] Expected outputs match the capability area scope

**Questions to consider:**
- Does this bundle give us the discovery plan we need?
- Are any critical activities missing?
- Is the timeline achievable with available resources?
- Are all assumptions and risks captured?

**Once approved:**
- Continue to Slug Generation and File Creation
- OR stop here and revise bundle if needed

---

## Slug Generation

**Agent MUST extract or generate a slug from the signal title:**

1. Convert to lowercase
2. Replace spaces with hyphens
3. Remove special characters
4. Validate uniqueness (check if `explore/explore-[slug]/` exists)

**Example**:
- Signal Title: "Care It Medical Equipment Logistics Platform"
- Generated Slug: `care-it`

**Agent confirms slug with user:**
```
Signal slug: `care-it`
This will be used for all artifact naming. Confirm? [Y/n]
```

**Slug validation rules**:
- Lowercase only
- Hyphens to separate words
- No special characters
- Descriptive (captures essence of project)
- Unique (not already used)

---

## File Creation

**Agent writes to Context Warehouse once bundle is approved:**

### File 1: explore-bundle.md

`explore/explore-[slug]/explore-bundle.md` — create using the full structure above

**Before writing, agent MUST verify:**

- [ ] Slug is confirmed and valid
- [ ] Folder `explore/explore-[slug]/` exists (create if not)
- [ ] File name follows pattern: `explore-bundle.md`
- [ ] Document history table included
- [ ] Cross-references to related artifacts included
- [ ] All file paths use correct naming conventions

**File naming patterns to enforce**:
- PRD: `explore/prds/[slug]-prd.md`
- HLD: `explore/hlds/[slug]-hld.md`
- ADR: `explore/decisions/[slug]-adr-[###]-[decision-name].md`
- Personas: `explore/domain/personas-[slug].md`
- Journey Maps: `explore/domain/journey-[slug].md`

### File 2: discovery.md

`explore/explore-[slug]/discovery.md` — create as living artifact index

**Structure**:
- Header: Signal link · Status: In Progress · Last updated: [date]
- Artifact index table: Artifact · Path · Status (✓ done / ⏳ pending)
- Open questions section: pulled from assumptions catalogue
- Enrichment Log: appended at every update

---

**Agent confirms file creation:**

```
Explore Bundle written to Context Warehouse:
  ✓ explore/explore-[slug]/explore-bundle.md — created
  ✓ explore/explore-[slug]/discovery.md — created (artifact index initialized)

Both files confirmed.
```

---

## Exit Criteria (Gate Out)

Before proceeding to Step 2 (Discovery), verify:

**Artifacts:**
- [ ] `explore/explore-[slug]/explore-bundle.md` exists and is complete
- [ ] `explore/explore-[slug]/discovery.md` exists with artifact index initialized
- [ ] Slug is validated and follows naming conventions
- [ ] All file paths use correct patterns

**Quality Gates:**
- [ ] Steering team has confirmed capability area scope
- [ ] Steering team has approved Explore Bundle structure
- [ ] Explore Type is locked (Fast Lane / ERC / Diverge-Converge)
- [ ] All selected activities are listed with owners and outputs
- [ ] All assumptions from Signal are carried forward
- [ ] Open questions are documented and assigned to activities

**Traceability:**
- [ ] Bundle links back to Signal file
- [ ] All capability areas have evidence from Signal
- [ ] Activities align with Explore Type recommendations
- [ ] No hallucinated content (all claims evidenced)

**If any criterion fails, STOP and address before proceeding to Discovery.**

---

## Workflow Complete

**STOP HERE** - Explore Bundle step has finished.

**What to do next (requires human decision):**

This workflow is complete. To continue the Explore Agent process, you must explicitly trigger the next step:

1. **Continue to Discovery:** Start a new session — `Explore Discovery`
2. **Review the bundle:** Check `explore/explore-[slug]/explore-bundle.md` and `discovery.md` before proceeding
3. **Refine the bundle:** Say `Explore Bundle` again if capability areas or activities need adjustment

**Do NOT automatically proceed to Discovery.**

**Human checkpoint required before continuing.**

---

## Related

- **Previous Step:** Signal Agent validation (external)
- **Next Step:** `02-discovery.md` (requires human trigger — say `Explore Discovery`)
- **Skills Used:** 
  - `explore.proc.discovery-planning` (conditional)
  - `explore.util.document-ingestion` (conditional - if binary attachments)
- **Artifacts Folder:** `explore/explore-[slug]/`
- **Key Files:** 
  - `explore-bundle.md` (discovery plan)
  - `discovery.md` (artifact index)
