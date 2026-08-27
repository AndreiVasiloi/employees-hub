# Step 1: Signal Capture

**Objective**: Transform raw input (conversation, document, or client profile) into a structured Signal Seed document with all claims tagged.

**Read ONLY this step file during execution. Do not load other steps until this step is complete.**

---

## Step Execution Rule

❌ Do not generate the Signal Seed document without first probing the user for key information.
❌ Do not leave claims untagged — every statement must be `[ASSUMPTION]`, `[OPINION]`, or `[FACT]`.
❌ Do not design solutions — Signal phase qualifies the problem, not the solution.
❌ Do not skip claim tagging in The Signal, Initial Evidence, and Why This Matters sections.

---

## Skills Required

- **Document Ingestion** (`../explore.util.document-ingestion/`) — Load if user provides binary files (PDF, DOCX, PPTX)

---

## Actions

### 1. Detect Input Mode

Determine which input mode to use based on what the user provides:

- **Conversation mode** (default): Interactive Q&A to extract the Signal from a verbal/written observation
- **Document mode**: User provides a document — extract the Signal from document contents
- **Client Profile mode**: User mentions a new or existing client — create/update client profile first, then capture Signal

### 2. Client Profile (if applicable)

If the user mentions a client, check `{clients-dir}/` for an existing profile.

- **If exists**: Load client context into the session
- **If new**: Create `{clients-dir}/[client-slug].md` with: name, industry, engagement model, key stakeholders, objectives, constraints, on-going projects

### 3. Initial Capture

Guide the user through structured probing:

1. **What happened?** — The raw observation, problem, opportunity, or risk
2. **Who is affected?** — Actors, stakeholders, users
3. **What evidence exists?** — Data points, sources, documents
4. **Why does this matter?** — Business impact, strategic alignment
5. **What are we assuming?** — Explicit assumptions, unknowns

### 4. Tag All Claims

Review every statement and tag:
- `[FACT — source: [document/person], [date]]` — Verified with a real source
- `[OPINION — rationale: [reasoning]]` — Subjective judgement with reasoning
- `[ASSUMPTION]` — Unverified belief, needs future validation

### 5. Assess Initial Completion Status

Run a quick assessment of the 7 completion criteria to understand initial gaps:

| Criteria | Status |
|----------|--------|
| 1. Fundamentals | [Complete/Partial/Missing] |
| 2. Evidence & Context | [Complete/Partial/Missing] |
| 3. Framing & Meaning | [Complete/Partial/Missing] |
| 4. Strategic Alignment | [Complete/Partial/Missing] |
| 5. Readiness & Feasibility | [Complete/Partial/Missing] |
| 6. Prioritisation | [Complete/Partial/Missing] |
| 7. Explore Type | [Complete/Partial/Missing] |

### 6. Generate Signal Seed Document

Write the Signal Seed to `{signals-dir}/YYYYMMDD-[slug].md` using the template in `templates/signal-seed.md`.

Required sections:
- **Frontmatter**: Date, title, state (Active), source, type, importance (field: `severity`)
- **The Signal**: One-sentence problem statement
- **Initial Evidence**: Evidence points with claim tags
- **Why This Matters**: Business impact with claim tags
- **Actors**: Key actors identified
- **Constraints**: Known constraints
- **Completion Criteria Status**: Checkbox status for all 7 criteria
- **Completion Notes**: Session entry

### 7. Summarize and Confirm

Present the Signal Seed summary to the user and confirm:
- Signal title and one-sentence problem statement
- Key evidence points
- Initial completion status
- Recommended next step (Complete or Route)

---

## Exit Criteria

- [ ] Signal Seed document created at `{signals-dir}/YYYYMMDD-[slug].md`
- [ ] All claims tagged as `[ASSUMPTION]`, `[OPINION]`, or `[FACT]`
- [ ] Initial completion status assessed
- [ ] User has confirmed the Signal Seed is accurate

**Next step**: Step 2 (Signal Strengthen) to fill remaining gaps, or Step 3 (Signal Route) if all criteria are already complete.
