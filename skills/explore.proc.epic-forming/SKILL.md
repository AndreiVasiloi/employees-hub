+++
name = "explore.proc.epic-forming"
description = "Use this skill when you need to transform PRDs, concepts, or requirements into well-formed epics for iteration planning — structuring them as clean interfaces to system capabilities with proper sizing and task definitions. Also relevant when someone says 'break this into epics,' 'create backlog items,' or 'structure this for delivery.' Does NOT generate the PRD itself — use PRD Generation for that. Does NOT handle task execution or sprint management."
license = "Proprietary. See LICENSE.md"
+++

# Epic Forming

Create and maintain logical groupings of system capabilities as interfaces for iteration planning, ensuring consistency with existing epic patterns.

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## Purpose

Transform arbitrary inputs (PRDs, concepts, requirements) into well-formed epics that serve as clean interfaces to system capabilities. The process analyzes existing epic patterns to maintain grouping consistency and decides whether new capabilities require new epics or amendments to existing ones.

**Critical Principle**: Epics represent a **target future state** - what we want to build or achieve. They should not document existing state or current implementation. Documentation of existing state belongs in the working folder, not in specification epics.

## Trigger Phrases

| Shorthand | Full Phrase |
|-----------|-------------|
| `Epic` | `Let's start an epic forming session...` |
| `Form Epic` | `Let's form an epic from [input]...` |
| `Epic Breakdown` | `Let's break down [input] into an epic...` |

## Pre-Check

If an epic already exists in `explore/epics/` for the target capability:
1. Load the existing epic
2. Present to the steering team: "Existing epic found. Amend existing epic, or create a new one?"
3. If amending → skip to Step 4 (decide-capability-placement) with existing data
4. If creating new → proceed from Step 1

## Inputs

**Required**:
1. **PRD** — `explore/prds/[slug]-prd.md` (requirements → tasks, acceptance criteria)
2. **HLD** — `explore/hlds/[slug]-hld.md` (architecture → technical tasks, component boundaries)
3. **Risk register** — `explore/explore-[slug]/risks.md` (risk mitigations → acceptance criteria, dedicated tasks)

**Strongly recommended**:
- **Glossary** — `explore/glossary.md` (canonical terminology for acceptance criteria)
- **Accessibility specs** — `explore/design/accessibility-[slug].md` (a11y tasks, a11y acceptance criteria)

**Optional**:
- Existing epics for pattern analysis
- Implementation state context

## Output Format

**Template:** `templates/epic-template.md`

## Outputs

- Complete epic markdown file in `explore/epics/`
- Epic indexed in `explore/epics/README.md`
- **Working Task**: `work/04-implementing/XXXX-epic-{description}/` with task.md, plan.md, and size.md for epic formation
- Consistent capability grouping aligned with existing epic patterns
- Clear epic boundaries for iteration planning interfaces

## Process Modes

### Governed Mode (Default)
Interactive session with discussion points for epic pattern analysis and placement decisions.

### Delegated Mode
Autonomous epic formation using heuristics for pattern matching and capability placement.

## Quality Gates

**Post-edit**: Re-run this checklist after any modification to the output artifact.

- [ ] Working task created with task.md, plan.md, and size.md for epic formation
- [ ] Epic follows template structure completely
- [ ] Capability grouping aligns with existing epic patterns
- [ ] **Epic epochs properly formed with frontmatter and matching description sections**
- [ ] Epic boundaries maintain logical coherence
- [ ] Placement decision (new vs amend) properly justified
- [ ] Epic indexed and discoverable
- [ ] No task breakdown or demo planning (handled by iteration-management)
- [ ] **Epic represents target future state, not existing state documentation**
- [ ] **Govern readiness validation passed** — epic confirmed consumable by downstream Govern processes

## Steps

1. [01-create-working-task.md](./steps/01-create-working-task.md) — Create working task for epic formation
2. [02-analyze-inputs.md](./steps/02-analyze-inputs.md) — Analyze source materials and extract capabilities
3. [03-analyze-existing-patterns.md](./steps/03-analyze-existing-patterns.md) — Review existing epic grouping patterns
4. [04-decide-capability-placement.md](./steps/04-decide-capability-placement.md) — Determine new epic vs amend existing
5. [05-create-or-amend-epic.md](./steps/05-create-or-amend-epic.md) — Generate epic shell or amend existing
6. [06-form-epic-epochs.md](./steps/06-form-epic-epochs.md) — Define epoch structure, frontmatter, and description sections
7. [07-validate-epic-boundaries.md](./steps/07-validate-epic-boundaries.md) — Ensure logical grouping and consistency
8. [08-index-and-link.md](./steps/08-index-and-link.md) — Update epic index and establish links
9. [09-govern-readiness-validation.md](./steps/09-govern-readiness-validation.md) — Validate epic against Govern phase requirements via govern.agent
10. [10-complete-process.md](./steps/10-complete-process.md) — Move epic-forming task to completed

## Integration with Workflows

**Consumes**:
- **PRD Generation** (`explore.proc.prd-generation`) — Requirements → tasks and acceptance criteria
- **Architecture Solutioning** (`explore.proc.architecture-solutioning`) — Architecture → technical tasks, component boundaries
- **Risk Documentation** (`explore.proc.risk-documentation`) — Risk mitigations → acceptance criteria, dedicated tasks
- **Glossary** — Canonical terminology for acceptance criteria naming
- **Accessibility Specifications** (`explore.proc.accessibility-specifications`) — A11y tasks and acceptance criteria

**Produces** (consumed by):
- **Govern Readiness** — Epics are a primary artifact in the Govern Readiness checklist
- **Govern Agent** (`govern.agent`) — Epic readiness validation

## Gotchas

- ⚡ **Existing state contamination**: Epics must describe the target future state. The agent frequently mixes in descriptions of how things currently work, creating confusion about what's being built vs. what already exists. Current state documentation belongs in the working folder, never in the epic itself.
- ⚡ **Epic sprawl**: Without pushback, a single epic can accumulate 20+ tasks, making it undeliverable in 2-4 sprints. If task count exceeds 15, split the epic into multiple epics along capability boundaries — don't just add more tasks.
- ⚡ **Pattern drift**: When analyzing existing epic patterns, the agent may match against the most recent epic rather than the most representative one. Always review at least 3 existing epics for pattern analysis to avoid inheriting one-off deviations.
- ⚡ **Explore→Govern handoff gap**: Epics that look complete from an Explore perspective may lack the granularity Govern needs for task planning and sizing. The govern readiness validation (Step 9) catches this, but be prepared for amendments — especially around epoch scope clarity and capability boundary precision.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.epic-forming:0.1.3:2026-09-01T11:38:04Z -->
