# Step 3: Ideation

**Source**: Adapted from the Brainstorm Process (docs/process/brainstorm/) — 6 brainstorm phases consolidated into a single Explore Agent step.

**Skills Required**: All three skills are installed ONCE at Step Entry (see Loader Protocol and Step Entry sections below). Each phase then **re-reads** the relevant sections of the already-installed guides:
- **Phase A (Frame)**: `explore.util.problem-classification` (full skill), `explore.guide.cognitive-primitives` → `reframe` section
- **Phase B (Stimulate)**: `explore.guide.brainstorm-methods` → routed method protocol only, `explore.guide.cognitive-primitives` → `associate`, `blend`, `decompose`, `transform`
- **Phase C (Diverge)**: `explore.guide.cognitive-primitives` → `generate` section + (persistence) `transform` section
- **Phase D (Externalize)**: `explore.guide.cognitive-primitives` → `cluster` section
- **Phase E (Converge)**: `explore.guide.cognitive-primitives` → `evaluate` and `select` sections
- **Phase F (Refine)**: No additional skills needed (process-level instructions only)

**Objective**: Run structured creative ideation on the validated hypothesis and discovery outputs to explore the solution space before solution design. Separates generation from evaluation. Produces 1-3 actionable concepts with explicit tradeoffs that seed Step 4 (Solution Design) with direction.

**Entry Criteria**: Discovery complete (Step 2) — context documented, personas/journeys created (if required), hypothesis stakeholder-validated (if D/C).

**Exit Criteria**: Steering team has selected 1-3 refined concepts with risks, assumptions, and next steps. Concepts feed into Step 4 (Solution Design) as direction seeds.

---

## Discovery Artifact Inputs

**Agent MUST load and reference Discovery artifacts before starting Ideation.** This grounds brainstorming in validated evidence rather than speculation.

| Discovery Artifact | Location | How It Feeds Ideation |
|-------------------|----------|----------------------|
| **Context Baseline** | `explore/explore-[slug]/context.md` | Phase A: Problem statement, domain model, system map define the problem space. Phase C: Constraints and assumptions become launch points for ideas. Phase E: Success criteria from context inform evaluation. |
| **Hypothesis** | `explore/explore-[slug]/hypothesis.md` | Phase A: Validated hypothesis frames the core problem direction. Phase C: Hypothesis assumptions become divergence seeds ("what if this assumption is wrong?"). Phase E: Hypothesis success metrics become evaluation criteria. |
| **Personas** | `explore/domain/personas-[slug].md` | Phase A: Persona need statements enrich HMW framings. Phase B: Persona pain points and goals become stimulus sources. Phase C: Each persona is a lens for idea generation ("how would this work for [persona]?"). Phase E: Persona fit becomes an evaluation criterion. |
| **Journey Maps** | `explore/domain/journey-[slug].md` | Phase B: Journey pain points and opportunity moments become stimuli. Phase C: Each journey stage is a divergence prompt. Phase D: Ideas can be clustered by journey stage. Phase F: Concept mechanisms mapped to journey touchpoints. |
| **Domain Analysis** | `explore/explore-[slug]/domain-analysis.md` | Phase A: Entity relationships and domain rules define constraints. Phase B: Cross-domain analogies sourced from domain model. Phase C: Domain entities become building blocks for ideas. Phase D: Domain taxonomy informs cluster structure. |
| **Market Research** | `explore/explore-[slug]/market-research.md` | Phase B: Competitive landscape reveals white space for stimuli. Phase C: Market gaps become divergence targets. Phase E: Competitive differentiation becomes evaluation criterion. |
| **Technical Feasibility** | `explore/explore-[slug]/technical-feasibility.md` | Phase A: Technical constraints feed into constraint classification. Phase C: Technical capabilities become enablers for ideas. Phase E: Feasibility assessment grounds evaluation scores. Phase F: Technical risks inform concept risk analysis. |
| **Regulatory Compliance** | `explore/explore-[slug]/regulatory-compliance.md` | Phase A: Regulatory constraints become hard constraints in framing. Phase E: Compliance fit becomes pass/fail evaluation gate. Phase F: Regulatory risks flagged per concept. |
| **Explore Bundle** | `explore/explore-[slug]/explore-bundle.md` | Phase A: Explore Type, domains, and discovery plan provide overall direction. |

**Loading rule**: Agent loads the relevant Discovery artifact at the start of each phase where it is referenced. Do NOT load all artifacts at once — maintain lazy loading for token efficiency. Summarize relevant sections inline rather than quoting full artifacts.

---

## Explore Type Adaptation

**This step adapts based on Explore Type from Step 1:**

| Mode | Fast Lane | ERC | Diverge/Converge |
|------|-----------|-----|------------------|
| **Phase A (Frame)** | ⚠️ Compressed (quick classification) | ⚠️ Compressed (quick classification) | ✅ Full classification + framings |
| **Phase B (Stimulate)** | ❌ Skip | ❌ Skip | ✅ Full stimulus techniques |
| **Phase C (Diverge)** | ⚠️ Compressed (Crazy 8s or 15 ideas) | ⚠️ Compressed (Crazy 8s or 15 ideas) | ✅ Full dual pathway (flexibility → persistence) |
| **Phase D (Externalize)** | ❌ Skip (use top 3 directly) | ❌ Skip (use top 3 directly) | ✅ Full affinity clustering |
| **Phase E (Converge)** | ⚠️ Compressed (top 3 without formal eval) | ⚠️ Compressed (top 3 without formal eval) | ✅ Full evaluation with bias defenses |
| **Phase F (Refine)** | ⚠️ Brief concept descriptions | ⚠️ Brief concept descriptions | ✅ Full elaboration with risks and next steps |

**For Fast Lane**: Agent proposes compressed ideation (Phase A → Phase C → top 3). If user declines, skip to Step 4 (Solution Design).

**For ERC**: Agent proposes compressed ideation (Phase A → Phase C → top 3). If user declines, skip to Step 4.

**For Diverge/Converge**: Full ideation. All 6 phases execute with steering team gates.

---

## What This Step Does

1. **Frame** (Phase A) — Classify the problem, generate alternative framings, align on direction
2. **Stimulate** (Phase B) — Inject stimuli to expand search space and prevent fixation
3. **Diverge** (Phase C) — Generate ideas using dual pathway (flexibility → persistence)
4. **Externalize** (Phase D) — Cluster and structure raw ideas into manipulable groups
5. **Converge** (Phase E) — Evaluate ideas with bias defenses, produce shortlist
6. **Refine** (Phase F) — Elaborate selected concepts, identify risks, define next steps

---

## Key Principles

**Separation of generation and evaluation** — never mixed. Anti-fixation and anti-bias policies active throughout. Human-First: steering team selects framings and directions; agent generates and structures.

**Explain Before Proposing** — Whenever the agent proposes a concept, method, technique, framing, or classification, it MUST explain it in plain language first. Never assume the human knows what a term means. For every proposal, provide: (1) what the concept is, (2) why the agent is recommending it, and (3) what it means in the context of this specific problem. Jargon-free explanations are the default; technical terms are only used after they have been defined.

**Human-Gated Flow (No Auto-Advance)** — Ideation is NOT an automatic pipeline. Every phase, every action that produces output, and every proposal MUST stop and wait for explicit human confirmation before proceeding. The agent never chains phases together, never batches multiple phases into a single turn, and never assumes approval. Each STOP gate is a hard stop — the agent presents, explains, and waits.

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
| `explore.util.problem-classification` | auxiliary | warn + continue with ad-hoc classification |
| `explore.guide.cognitive-primitives` | auxiliary | warn + continue without structured primitives |
| `explore.guide.brainstorm-methods` | auxiliary | warn + continue with routed-method fallback |

**Install-once semantics (guide variant)**: Each slug above MUST be installed at most once per session via the Step Entry block below. Phase bodies use `**Re-read section (no install)**: ...` directives to re-read sections of the already-installed guide — do NOT re-run `dft skills add` for them.

---

## Step Entry: Install Skills

Before starting Phase A, execute the Loader Protocol for all three skills listed above. This pre-warms the session: every subsequent `**Re-read section (no install)**: ...` directive in phase bodies is then a pure section re-read.

> **Load skill:** `explore.util.problem-classification` — follow Loader Protocol above.
> **Load skill:** `explore.guide.cognitive-primitives` — follow Loader Protocol above.
> **Load skill:** `explore.guide.brainstorm-methods` — follow Loader Protocol above.

---

## Phase A: Frame

**Load Discovery artifacts now**: `context.md` (problem statement, domain model, assumptions), `hypothesis.md` (validated hypothesis direction), `domain-analysis.md` (entities, rules, constraints), `technical-feasibility.md` (technical constraints), `regulatory-compliance.md` (hard regulatory constraints)

> **Re-read section (no install)**: `explore.util.problem-classification` — full skill (installed at Step Entry).

### Action 1: Problem Classification

Classify the problem using Discovery artifacts as primary evidence:

- **From `context.md`**: Problem statement defines the core challenge; domain model reveals complexity; system map shows dependencies; Assumptions Catalogue surfaces unknowns
- **From `hypothesis.md`**: Validated hypothesis frames the direction; success metrics define what "solved" looks like; evidence tags show confidence level
- **From `domain-analysis.md`**: Entity relationships reveal structural constraints; domain rules define hard boundaries
- **From `technical-feasibility.md`**: Technical constraints feed into solution space classification (narrow/wide)
- **From `regulatory-compliance.md`**: Regulatory constraints become hard constraints in the classification

Present the classification in a table with the proposed value AND a description explaining the reasoning:

```markdown
| Dimension | Proposed | Description (Why) |
|-----------|----------|--------------------|
| **Definition level** | [well / semi / ill-defined] | [Why this level — cite specific evidence from Discovery artifacts] |
| **Solution space** | [narrow / wide / contradictory] | [Why this space — what constraints or openness led to this] |
| **Novelty needed** | [incremental / adjacent / breakthrough] | [Why this novelty level — what the situation demands and why] |
| **Complexity** | [simple / complicated / complex] | [Why this complexity — what makes it so] |
| **User state** | [fresh / informed / stuck / frustrated] | [Why this state — what signals point to this] |
| **Prior context** | [greenfield / building on previous work] | [Why — what exists already or doesn't] |
```

**Explain each dimension in plain language before presenting the table.** The human should understand what "Definition level" or "Solution space" means and why the proposed value matters for the ideation approach.

Use evidence from Discovery artifacts (not just Signal phrases) to determine classification. Cross-reference hypothesis confidence level with problem definition level. If ambiguous, note the ambiguity — the steering team will resolve it.

**Look up the Method Routing Table** (from Problem Classification skill) to identify:
- Primary method recommended
- Supporting methods
- Pathway (Flexibility / Persistence / Mode Switching)

**STOP — AskUserQuestion:**

```
Question ID-1
  Header:      "Problem Classification"
  Question:    "I've classified the problem from the Signal as follows (see table
                above). Does this match your understanding? This determines which
                ideation methods I'll use."
  Multi-select: No
  Options:
    - Looks right — proceed with this classification
    - Adjust classification — tell me what's different
    - I'm not sure — let's explore before classifying
    - Skip ideation — go straight to Solution Design
```

**If PM selects "Skip ideation"**: Proceed to Step 4 (Solution Design). Document skip reason.

### Action 2: Generate Alternative Framings

> **Re-read section (no install)**: `explore.guide.cognitive-primitives` → `reframe` section (installed at Step Entry).

Apply 2-3 reframing techniques based on the classification:

**For ill-defined problems → HMW (How Might We):**
1. Generate 5-8 HMW questions at varying abstraction:
   - 2 narrow (specific pain points from persona need statements and journey pain points)
   - 2 broad (underlying needs from hypothesis direction and context problem statement)
   - 2 inverted (how might we make this worse? — informed by journey friction points)
   - 1-2 analogical (how might we apply [domain X]'s approach? — sourced from domain analysis cross-domain patterns)

**For well-defined problems → Constraint Flip:**
1. List 3-5 constraints from Discovery artifacts (technical constraints from `technical-feasibility.md`, domain rules from `domain-analysis.md`, regulatory constraints from `regulatory-compliance.md`, assumptions from `context.md` Assumptions Catalogue)
2. For each: "If we removed [constraint], what becomes possible?"
3. For each: "If we doubled [constraint], what would we be forced to do?"

**For any problem → Starbursting (optional):**
1. Generate non-obvious questions across: Who? What? Where? When? Why? How?
2. Each non-obvious question is a potential reframing

Present all framings in a structured table **with a Description column explaining the "why"** — why this framing matters, what it opens up, and how it changes the direction:

```markdown
| # | Framing | Type | Abstraction | Description (Why this framing) | Opens which search space? |
|---|---------|------|-------------|-------------------------------|--------------------------|
| 1 | [framing] | [type] | [level] | [Plain-language explanation of why this framing is worth pursuing — what insight or shift it brings, and how it reframes the problem] | [direction] |
```

**For each framing, the agent MUST explain:**
1. What the framing means in concrete terms (no jargon without definition)
2. Why this particular reframe is interesting or useful for this problem
3. What kinds of solutions become visible through this lens that weren't before

**STOP — AskUserQuestion:**

```
Question ID-2
  Header:      "Select Framing(s) to Pursue"
  Question:    "Which framing(s) should we pursue? The choice of framing IS
                the creative act — it determines what kinds of solutions feel
                natural. You can pick 1-2."
  Multi-select: Yes
  Options:
    - Framing [N] — [short label]
    - Framing [N] — [short label]
    - Framing [N] — [short label]
    - None of these — suggest different framings
```

### Action 3: Write Framing Artifact

**File:** `explore/explore-[slug]/ideation/[slug]-framing.md`

Contents: Problem classification, method routing, all framings explored, selected framings, constraints (hard + soft), success criteria.

**Before writing, agent MUST verify:**
- [ ] `explore/explore-[slug]/ideation/` folder exists (create if not)
- [ ] Slug matches Step 1
- [ ] Problem classification complete (all dimensions)
- [ ] At least one framing selected

---

## Phase B: Stimulate

> **Re-read section (no install)**: `explore.guide.brainstorm-methods` → ONLY the routed method protocol (installed at Step Entry).
> **Re-read section (no install)**: `explore.guide.cognitive-primitives` → relevant primitive sections (associate, blend, decompose, transform) (installed at Step Entry).
**Load Discovery artifacts now**: `personas-[slug].md` (pain points, goals, behaviors), `journey-[slug].md` (pain points, opportunity moments), `market-research.md` (competitive white space, market gaps), `domain-analysis.md` (cross-domain patterns for analogies)

### Action 1: Select Stimulus Techniques

Read the method routing from the framing artifact.

**Discovery-grounded stimulus sources** (use these as raw material for stimulus techniques):
- **From personas**: Each persona's unmet needs, frustrations, and workarounds are stimulus seeds
- **From journey maps**: Pain points at each stage, moments of delight in adjacent journeys, and opportunity gaps between stages
- **From market research**: Competitive white space (what nobody does), adjacent market solutions (what works elsewhere), and unserved segments
- **From domain analysis**: Cross-domain entity patterns ("domain X solves this with [mechanism] — what if we applied it here?")

Select stimuli based on problem type:

| Problem Profile | Stimulus Techniques | Discovery Artifact Source |
|----------------|-------------------|-------------------------|
| Cross-domain / Breakthrough | `associate(far)` + `blend` → Synectics/Bisociation | Domain analysis cross-domain patterns, market research adjacent solutions |
| Stuck / Frustrated | Random entry + Provocation + Inversion | Journey map friction points inverted, persona workarounds as provocations |
| Complex / Multi-parameter | `decompose` → Morphological Analysis | Domain model entities as parameters, technical feasibility as dimension |
| Stakeholder-heavy | Perspective shifts → Six Hats / Round-Robin | One hat per persona, journey stage as perspective frame |
| Incremental / Well-defined | `transform` operators → SCAMPER walkthrough | Existing journey touchpoints as SCAMPER targets |
| Contradictory | TRIZ contradiction identification | Technical constraints vs. user needs from hypothesis |

**STOP — AskUserQuestion:**

```
Question ID-3
  Header:      "Stimulus Approach"
  Question:    "Based on the problem classification, I recommend the following
                stimulus technique(s) before we generate ideas. This will expand
                our search space and prevent fixation."
  Multi-select: No
  Options:
    - Proceed with recommended approach
    - Use a different method — [tell me which]
    - Skip stimulation — go straight to divergence
    - I'm stuck — hit me with provocations and random entry
```

### Action 2: Execute Stimulus Technique

Execute the selected technique following the method protocol from the Brainstorm Methods skill. See the skill README for detailed protocols per method (Synectics, Morphological Analysis, SCAMPER, Random Entry, Six Hats, TRIZ Lite).

### Action 3: Present Stimuli

Present outputs organized by technique with agent assessment of most promising stimuli.

**STOP — AskUserQuestion:**

```
Question ID-4
  Header:      "Stimulus Review"
  Question:    "Here are the stimuli I've generated. Which ones resonate or open
                interesting directions? These will seed the divergence phase."
  Multi-select: Yes
  Options:
    - These are good — proceed to divergence
    - Focus on stimulus [N] — that direction is interesting
    - Need more stimuli — try [specific technique or domain]
    - Add my own stimulus — [steering team provides input]
```

No standalone artifact for this phase. Stimuli are appended to the framing artifact as a `## Stimuli` section.

---

## Phase C: Diverge

> **Re-read section (no install)**: `explore.guide.cognitive-primitives` → `generate` section (installed at Step Entry).

**Reference Discovery artifacts**: `personas-[slug].md` (need statements as idea lenses), `journey-[slug].md` (stages as divergence prompts), `context.md` (assumptions as "what if wrong?" seeds), `market-research.md` (gaps as divergence targets), `hypothesis.md` (assumptions as divergence seeds)

### Action 1: Flexibility Pass — Breadth

**Rules for flexibility mode:**
- Produce ideas rapidly — one-liners or two-liners
- Do NOT evaluate while generating
- Do NOT filter for feasibility
- After each idea, check category — if same as last 2, force category switch
- Push for remote associations and non-obvious combinations
- Use stimuli from Phase B as launch points
- **Ground in Discovery**: Use persona need statements as idea lenses (“how would this work for [persona]?”), journey pain points as problem targets, hypothesis assumptions as “what if wrong?” divergence seeds, and market gaps as opportunity targets

**Budget:** 15-30 raw ideas

**Anti-fixation policy (active during generation):**
- If 3+ consecutive ideas are variations of the same concept → STOP → inject random stimulus or switch primitive
- If semantic diversity declining → switch to different stimulus or domain
- If all ideas cluster in one area → force at least 3 ideas from a deliberately contrarian framing

**If using a specific method (from routing):**
Load `explore.guide.brainstorm-methods` → routed method protocol. Methods mapping to flexibility mode: Crazy 8s, HMW + idea generation, Reverse Brainstorming, Brainwriting 6-3-5.

Present all raw ideas in a numbered list with category tags.

**STOP — AskUserQuestion:**

```
Question ID-5
  Header:      "Promising Directions"
  Question:    "Here are [N] raw ideas across [M] categories. Which 2-3
                directions look most promising for deep exploration?"
  Multi-select: Yes
  Options:
    - Direction: [category/cluster A] — ideas [N, N, N]
    - Direction: [category/cluster B] — ideas [N, N, N]
    - Direction: [category/cluster C] — ideas [N, N, N]
    - Explore more breadth first — need more categories
```

### Action 2: Persistence Pass — Depth

> **Re-read section (no install)**: `explore.guide.cognitive-primitives` → `generate` section (persistence mode) + `transform` section (installed at Step Entry).

For each selected direction (2-3 clusters):
- Stay within the cluster
- Apply SCAMPER transform operators to promising ideas
- Generate elaborated variants with mechanism + what's new
- **Ground in Discovery**: For each elaborated variant, note which persona it serves, which journey stage it targets, and which hypothesis assumption it validates or challenges
- **Budget:** 5-10 elaborated variants per cluster

### Action 3: Capture Raw Output

**File:** `explore/explore-[slug]/ideation/[slug]-ideas-raw.md`

Contents: Session metadata, framing used, methods used, primitives activated, total ideas, fixation interventions, flexibility pass (full list), persistence pass (elaborated variants by cluster), flagged ideas.

---

## Phase D: Externalize

> **Re-read section (no install)**: `explore.guide.cognitive-primitives` → `cluster` section (installed at Step Entry).
**Reference Discovery artifacts**: `domain-analysis.md` (domain taxonomy for cluster structure), `journey-[slug].md` (journey stages as clustering lens), `personas-[slug].md` (persona segments as clustering lens)

### Action 1: Affinity Clustering

Read all ideas from the raw ideas artifact without judging quality.

**Clustering protocol:**
1. Group by: mechanism similarity, problem space similarity, user/stakeholder similarity, **journey stage alignment** (from journey maps), **persona segment** (from personas), **domain entity** (from domain analysis)
2. Name each cluster with a **one-line thesis** (not just a topic label):
   - ❌ Bad: "AI-related ideas"
   - ✅ Good: "Ideas that delegate cognitive load to an AI co-pilot"
3. Flag orphans (don't fit any cluster — often most original)
4. Flag bridges (connect two clusters — often most integrative)

**Expected output:** 4-8 clusters, each with 3-10 ideas.

### Action 2: Map Cluster Relationships

For each pair of adjacent clusters, note: Combines, Conflicts, Depends.

### Action 3: Present Clustered Map

**STOP — AskUserQuestion:**

```
Question ID-6
  Header:      "Cluster Validation"
  Question:    "Here are the idea clusters with thesis labels. Do these
                groupings make sense? Should any ideas move between clusters?"
  Multi-select: No
  Options:
    - Clusters look right — proceed to evaluation
    - Move ideas — [tell me which ideas and where]
    - Rename clusters — [tell me which and new name]
    - Merge or split clusters — [tell me which]
```

### Action 4: Write Cluster Artifact

**File:** `explore/explore-[slug]/ideation/[slug]-idea-clusters.md`

Contents: Summary stats, full cluster detail with thesis labels, orphans, bridges, cluster relationships, steering team adjustments.

---

## Phase E: Converge

> **Re-read section (no install)**: `explore.guide.cognitive-primitives` → `evaluate` and `select` sections (installed at Step Entry).
**Load Discovery artifacts now**: `hypothesis.md` (success metrics as evaluation criteria), `technical-feasibility.md` (feasibility grounding), `regulatory-compliance.md` (compliance as pass/fail gate), `personas-[slug].md` (persona fit as criterion), `market-research.md` (competitive differentiation as criterion), `context.md` (success criteria)

### Action 1: Establish Evaluation Criteria

**Discovery-grounded criteria** (default — adjust based on problem):

| Criterion | What It Measures | Weight Signal | Discovery Source |
|-----------|-----------------|---------------|------------------|
| **Impact** | How much value does this create if it works? | Always high weight | Hypothesis success metrics from `hypothesis.md` |
| **Feasibility** | How hard is this to build/implement? | Higher for incremental problems | Technical constraints from `technical-feasibility.md` |
| **Novelty** | How different is this from what exists? | Higher for breakthrough problems | Competitive landscape from `market-research.md` |
| **Risk** | What's the downside if this fails? | Higher for high-stakes problems | Assumptions Catalogue from `context.md` |
| **Alignment** | Does this fit constraints and success criteria? | Always relevant | Success criteria from `context.md` + `hypothesis.md` |
| **Persona Fit** | Does this serve validated persona needs? | Higher for stakeholder-heavy | Need statements from `personas-[slug].md` |
| **Regulatory** | Does this comply with hard constraints? | Pass/fail gate | Requirements from `regulatory-compliance.md` |

**Agent MUST cite specific Discovery evidence when scoring.** For example: "Feasibility: M — `technical-feasibility.md` notes [constraint] which limits approach X but enables approach Y."

**STOP — AskUserQuestion:**

```
Question ID-7
  Header:      "Evaluation Criteria"
  Question:    "I'll evaluate ideas against these criteria. Should I adjust
                the criteria or their relative importance?"
  Multi-select: No
  Options:
    - Criteria look right — proceed with evaluation
    - Adjust weights — [tell me which criteria matter more/less]
    - Add a criterion — [tell me what else matters]
    - Remove a criterion — [tell me which to drop]
```

### Action 2: Batch Evaluation

**Critical rule: Evaluate in batches of 3-5 ideas. NEVER evaluate ideas one-by-one serially.**

Score using H/M/L relative comparison within batch. Include at least one orphan or bridge idea.

### Action 3: Bias Checks

After all batches scored, run bias defenses:

- **Anti-Anchoring**: Is the highest-ranked also the first generated?
- **Anti-Fixation**: Are all top ideas from the same cluster?
- **Anti-Availability**: Are top-ranked ideas simply the most familiar?
- **AI-Specific**: Do top ideas cluster too tightly (homogeneity)? Did agent rank user's early preferences higher (sycophancy)?

### Action 4: Devil's Advocate Pass

For each top-3 candidate:
1. Strongest argument against it
2. Failure scenario — how this fails concretely
3. Hostile stakeholder — who would resist and why

### Action 5: Selection — Portfolio Approach

Apply portfolio thinking to build the shortlist (3-5 candidates):

| Policy | When to Use | What It Produces |
|--------|------------|-----------------|
| **Top-N by Score** | Feasibility is priority | Safe, buildable ideas |
| **Portfolio Mix** | Want optionality | 1 high-risk/high-reward + 1 safe + 1 novel |
| **Impact × Effort Quadrant** | Need prioritization | Quick wins + big bets + fill-ins + drops |
| **User Resonance Check** | Ideas require sustained effort | Steering team energy matters |

**STOP — AskUserQuestion:**

```
Question ID-8
  Header:      "Shortlist Selection"
  Question:    "Here are the top candidates with tradeoffs and devil's
                advocate analysis. Which 1-3 should we refine?"
  Multi-select: Yes
  Options:
    - Refine candidate [1] — [name]
    - Refine candidate [2] — [name]
    - Refine candidate [3] — [name]
    - None of these excite me — loop back for more ideas
```

### Action 6: Write Evaluation Artifact

**File:** `explore/explore-[slug]/ideation/[slug]-evaluation.md`

Contents: Evaluation criteria, all batch evaluation tables, bias check results, devil's advocate analysis, shortlist with rationale.

---

## Phase F: Refine

No additional skills needed — uses process-level instructions only.
**Load Discovery artifacts now**: `technical-feasibility.md` (technical risks), `regulatory-compliance.md` (regulatory risks), `context.md` (assumptions to cross-reference), `hypothesis.md` (hypothesis to refine), `journey-[slug].md` (touchpoints for mechanism mapping), `personas-[slug].md` (persona fit validation)

### Action 1: Elaborate Selected Concepts

For each candidate selected in Phase E, produce (grounding in Discovery artifacts):

```markdown
## Concept: [Name]

### Description
[2-3 paragraph description — what it is, how it works, why it matters]

### Mechanism
[How this would work in practice — map to specific journey touchpoints from `journey-[slug].md`]

### Value Proposition
[Who benefits and how — reference specific persona need statements from `personas-[slug].md`]

### Key Differentiator
[What makes this different from existing solutions — reference competitive landscape from `market-research.md`]

### Constraints Addressed
- **Hard constraints met**: [list — sourced from `technical-feasibility.md` and `regulatory-compliance.md`]
- **Soft constraints met**: [list — sourced from `context.md` and `domain-analysis.md`]
- **Constraints NOT met**: [list — be honest, cite the specific constraint source]
```

### Action 2: Risk and Assumption Analysis

**Cross-reference with Discovery artifacts:**
- Check each concept's assumptions against the Assumptions Catalogue in `context.md` — are any already validated or invalidated?
- Check technical risks against `technical-feasibility.md` constraints — are any already documented?
- Check regulatory risks against `regulatory-compliance.md` — are any already identified?
- Check whether the concept challenges or supports the validated hypothesis in `hypothesis.md`

For each concept:

| Risk | Likelihood | Impact | Mitigation | Discovery Source |
|------|-----------|--------|------------|------------------|
| [risk] | H/M/L | H/M/L | [mitigation] | [which artifact flagged this or "New — surfaced by ideation"] |

Assumptions tagged `[ASSUMPTION]` with status (Untested / Partially validated / Validated), consequence if wrong, and validation method. **Cross-reference against `context.md` Assumptions Catalogue** — if an assumption already exists there, link to it rather than duplicating.

### Action 3: Define Next Steps

For each concept:
1. **Validate**: Key assumption to test first and how
2. **Prototype**: Minimum viable experiment
3. **Stakeholders**: Who needs to be consulted
4. **Decision point**: Go/no-go criteria

### Action 4: Session Assessment

Check loop-back conditions:

| Condition | Status | Action if True |
|-----------|--------|----------------|
| Top candidates all from same cluster | [Y/N] | Loop to Phase B with forced domain-switch |
| Best idea has inherent contradiction | [Y/N] | Loop to Phase A with TRIZ reframe |
| Team says "fine but not exciting" | [Y/N] | Loop to Phase B with provocation/bisociation |
| Refinement reveals missing parameters | [Y/N] | Loop to Phase B with re-decomposition |
| Novelty low across the board | [Y/N] | Loop to Phase B with far associations |

**Loop limit**: Do NOT loop more than 3 times without checking in with steering team.

**STOP — AskUserQuestion:**

```
Question ID-9
  Header:      "Ideation Outcome"
  Question:    "Here are the refined concepts with risks, assumptions, and
                next steps. What would you like to do?"
  Multi-select: No
  Options:
    - Session complete — these concepts are ready for Discovery
    - Loop back — need more/different ideas
    - Refine further — go deeper on concept [N]
    - Combine concepts — merge elements from [N] and [N]
```

### Action 5: Write Refined Concepts Artifact

**File:** `explore/explore-[slug]/ideation/[slug]-refined-concepts.md`

```markdown
# Ideation Refined Concepts: [Signal Title]

## Session Summary
- **Signal**: [signal title and link]
- **Problem**: [problem statement from Signal]
- **Framing used**: [selected framing]
- **Methods used**: [list]
- **Total ideas generated**: [N]
- **Clusters formed**: [N]
- **Candidates evaluated**: [N]
- **Concepts refined**: [N]
- **Loops completed**: [N]
- **Fixation interventions**: [N]

## Discovery Evidence Used
- **Context baseline**: [key problem statement and constraints referenced from `context.md`]
- **Hypothesis**: [validated hypothesis direction and success metrics from `hypothesis.md`]
- **Personas**: [persona need statements that shaped framings and evaluation from `personas-[slug].md`]
- **Journey maps**: [pain points and opportunity moments used as stimuli from `journey-[slug].md`]
- **Domain analysis**: [entity patterns and domain rules used for analogies from `domain-analysis.md`]
- **Market research**: [competitive gaps and adjacent solutions used from `market-research.md`]
- **Technical feasibility**: [constraints that grounded feasibility scores from `technical-feasibility.md`]
- **Regulatory compliance**: [hard constraints used as pass/fail gates from `regulatory-compliance.md`]

## Refined Concepts
### Concept 1: [Name]
[Full elaboration from Actions 1-3]

### Concept 2: [Name]
[Full elaboration from Actions 1-3]

## Concept Comparison
| Dimension | Concept 1 | Concept 2 | Concept 3 |
|-----------|-----------|-----------|----------|
| Impact | [H/M/L] | [H/M/L] | [H/M/L] |
| Feasibility | [H/M/L] | [H/M/L] | [H/M/L] |
| Novelty | [H/M/L] | [H/M/L] | [H/M/L] |
| Risk | [H/M/L] | [H/M/L] | [H/M/L] |
| Time to validate | [estimate] | [estimate] | [estimate] |
| Key assumption | [critical] | [critical] | [critical] |

## Steering Team Decision
- **Selected for pursuit**: [concept name(s)]
- **Rationale**: [why]
- **Immediate next step**: [action]

## Solution Design Seeding
These concepts seed Step 4 (Solution Design) with direction:
- **Experience design direction**: [which concept(s) inform UX/UI decisions]
- **Architecture implications**: [technical directions to explore in HLD]
- **Risk areas**: [risks surfaced by ideation for the risk register]
- **User flow implications**: [user interactions surfaced by concept mechanisms]
- **Open questions for Solution Design**: [questions that ideation raised but could not answer]
- **Discovery outputs**: [list of relevant outputs from Discovery that inform Solution Design]

---

## Connection to Step 4 (Solution Design)

**Ideation outputs feed directly into Solution Design:**

| Ideation Output | Solution Design Input |
|----------------|----------------------|
| Selected concepts | Direction for experience design (Workstream A) |
| Problem classification | Enriches architecture decisions (Workstream B) |
| Assumptions from concepts | Added to risk register (Workstream C) |
| Technical exploration areas | Focuses HLD and ADR creation (Workstream B) |
| Risk analysis from concepts | Seeds risk register (Workstream C) |
| Concept mechanisms | Informs user flows and wireframes (Workstream A) |
| Constraints analysis | Feeds into feasibility assessment (Workstream C) |
| Discovery outputs | Inform Solution Design decisions (Workstreams A-C) |

**Ideation also enriches Discovery artifacts retroactively:**
- `context.md` — Assumptions Catalogue updated with concept assumptions
- `hypothesis.md` — Hypothesis may be refined based on ideation insights
- `discovery.md` — Ideation artifact paths added as enrichment log entry

**Agent carries forward** the refined concepts artifact path in `discovery.md` as an ideation reference.

---

## File Creation Summary

Agent writes to Context Warehouse across phases:

| Phase | Artifact | Location |
|-------|----------|----------|
| A — Frame | Problem classification + framings | `explore/explore-[slug]/ideation/[slug]-framing.md` |
| C — Diverge | Raw idea set | `explore/explore-[slug]/ideation/[slug]-ideas-raw.md` |
| D — Externalize | Clustered idea map | `explore/explore-[slug]/ideation/[slug]-idea-clusters.md` |
| E — Converge | Evaluation matrix + shortlist | `explore/explore-[slug]/ideation/[slug]-evaluation.md` |
| F — Refine | Refined concepts + next steps | `explore/explore-[slug]/ideation/[slug]-refined-concepts.md` |

**Before writing any artifact, agent MUST verify:**
- [ ] Slug matches Step 1 Explore Bundle slug
- [ ] `explore/explore-[slug]/ideation/` folder exists (create if not)
- [ ] File name follows pattern above

---

## Adaptive Behavior

| Session Type | Signal | Adaptation |
|-------------|--------|------------|
| **Quick** | ERC type or "quick brainstorm" | Compress: Phase A → Phase C → Top 3. Skip formal externalization and evaluation matrix. |
| **Deep** | D/C type or "let's really explore this" | Full framework. Multiple loops. Morphological decomposition. Formal evaluation. |
| **Iterative** | "let's build on last time" | Start from Phase D or E with previous output. Persistence-mode depth on selected clusters. |
| **Stuck** | "I'm stuck", "nothing's working" | Start with Phase B stimulation heavy. Use provocation, random entry, forced analogy. Skip normal framing. |

---

## Step Execution Rule

**ONE PHASE AT A TIME.** The agent must complete one phase and receive human confirmation before advancing. Phases may be compressed for ERC sessions but never skipped without explicit human decision.

**Enforcement rules:**
1. Agent completes phase actions → presents output → STOP
2. Agent waits for human to trigger next phase
3. Agent does NOT auto-advance, even if confident
4. For compressed sessions, agent proposes compression upfront and gets approval
5. Agent NEVER chains two or more phases in a single response — each phase ends with a STOP gate
6. Agent NEVER assumes the human wants to continue — always ask explicitly
7. Between every phase, the agent must receive an explicit human message before proceeding

---

## Violation Checks

**Human-First Pattern Violations:**
- ❌ Agent generated ideas before problem framing was approved: premature divergence
- ❌ Agent evaluated ideas during generation phase: generation/evaluation separation violated
- ❌ Agent automatically proceeded to next phase without human trigger
- ❌ Agent selected final concepts without steering team approval
- ❌ Agent chained multiple phases in a single response: auto-advance violated
- ❌ Agent assumed human approval and continued without waiting: human-gate bypassed

**Quality & Process Violations:**
- ❌ Gate advanced without agent declaring PASS: gate integrity violated
- ❌ All top ideas from same cluster with no fixation intervention: anti-fixation policy violated
- ❌ Ideas evaluated serially instead of in batches: anti-anchoring policy violated
- ❌ Phase skipped without explicit human decision: process integrity violated
- ❌ More than 3 skills loaded simultaneously: token efficiency violated

**AI-Specific Violations:**
- ❌ 3+ consecutive ideas are variations of the same concept without stimulus injection: homogeneity detected
- ❌ Agent agreed with user's first suggestion without generating alternatives: sycophancy guard violated
- ❌ Agent proposed a method, technique, or classification without explaining it first: explain-before-proposing violated
- ❌ Agent used jargon or technical terms without defining them in plain language: clarity obligation violated

---

## Success Criteria

Step 3 is complete when:

- [ ] Problem classified and framing selected (Phase A)
- [ ] Minimum idea volume achieved (15-30 flexibility + 5-10 persistence per cluster)
- [ ] Ideas clustered with thesis labels (Phase D)
- [ ] Anti-bias evaluation completed (Phase E)
- [ ] 1-3 refined concepts with risks, assumptions, and next steps (Phase F)
- [ ] Steering team has approved final concepts
- [ ] Solution Design Seeding section completed (links ideation outputs to Step 4 inputs)
- [ ] Discovery artifacts enriched retroactively (context.md, hypothesis.md, discovery.md)
- [ ] All ideation artifacts written to `explore/explore-[slug]/ideation/`

---

## Anti-Pattern Guards (Active Throughout)

| Guard | Trigger | Response |
|-------|---------|----------|
| **Semantic diversity** | 3+ consecutive ideas same-category | Inject random stimulus or switch primitive |
| **Provocation injection** | Flexibility mode producing diminishing returns | Switch to De Bono provocation or force domain analogy |
| **Mode switch** | 15+ flexibility ideas with declining novelty | Switch to persistence on top 2-3 clusters |
| **Batch evaluation** | Convergence phase starts | Evaluate in groups of 3-5, never serially |
| **Anchoring defense** | First idea ranks highest | Flag and re-examine |
| **Homogeneity check** | Ideas cluster too tightly | Force 3+ contrarian/edge-case ideas |
| **Sycophancy guard** | User signals early preference | Generate alternatives even if user seems decided |

---

**Previous step**: [02-discovery.md](./02-discovery.md)
**Next step**: [04-solution-design.md](./04-solution-design.md)
