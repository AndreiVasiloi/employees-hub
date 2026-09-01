+++
name = "explore.proc.wireframing"
description = "Use this skill when you need to produce low-fidelity wireframes — translating discovery context into screen structure, layout, component placement, and interaction intent before visual design. Activates after IA and user flows define structure and paths. Also relevant when someone says 'sketch the screens,' 'show me the layout,' or 'what does this page look like.' Does NOT produce architecture-level design — use Design Sketch for system-level architecture. Does NOT test the wireframes — use Usability Testing for that."
license = "Proprietary. See LICENSE.md"
+++

# Wireframing

Produce low-fidelity wireframes that translate discovery context into clear screen structure, key flows, and interaction intent.

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## When to Use

Use this skill when you need to:
- Translate discovery context into concrete screen structures
- Define layout, hierarchy, and component placement before visual design
- Document key flows and interaction patterns at low fidelity
- Validate structure and navigation with stakeholders before build
- Create alignment between design, product, and engineering teams
- Prepare for usability testing with clickable prototypes
- Bridge the gap between IA and high-fidelity design

**Key principle**: Wireframes focus on structure, hierarchy, and interaction intent—not visual styling. They enable rapid iteration and validation before investing in high-fidelity design and development.

## Pre-Check

If wireframes already exist at `explore/explore-[slug]/wireframes-[slug].md`:
1. Load the existing wireframes
2. Present to the steering team: "Existing wireframes found. Review and update, or create fresh?"
3. If updating → skip to the validation step with existing data for review
4. If creating fresh → proceed from Step 1

## Inputs to Request (if missing)

Before creating wireframes, ensure you have:

1. **Context baseline** - From Context Documentation skill (problem, domain, constraints)
2. **Information Architecture** - From Information Architecture skill (navigation, sitemap, labeling)
3. **Personas** - From Persona skill (primary users and their goals)
4. **Journey maps** - From Journey Mapping skill (key tasks and workflows)
5. **User flows** - From User Flow Creation skill (task-specific flows)
6. **Slug** - Project identifier for file naming (e.g., `care-it`)

**STOP**: If IA is missing, you can infer a draft IA but must flag it as a risk. If personas or user flows are missing, create them first using the appropriate skills.

## Process Steps

| Step | File | Purpose |
|------|------|---------|
| 1 | [01-review-scope.md](./steps/01-review-scope.md) | Review inputs and identify scope |
| 2 | [02-screen-inventory.md](./steps/02-screen-inventory.md) | Create screen inventory |
| 3 | [03-conventions.md](./steps/03-conventions.md) | Define wireframe conventions |
| 4 | [04-wireframe-screens.md](./steps/04-wireframe-screens.md) | Wireframe each P0 screen |
| 5 | [05-document-flows.md](./steps/05-document-flows.md) | Document key flows |
| 6 | [06-cross-screen-patterns.md](./steps/06-cross-screen-patterns.md) | Define cross-screen patterns |
| 7 | [07-open-questions.md](./steps/07-open-questions.md) | Identify open questions and risks |
| 8 | [08-write-document.md](./steps/08-write-document.md) | Write wireframe document |
| 9 | [09-validation.md](./steps/09-validation.md) | Run completeness validation |

## Output Format

```
explore/design/wireframes-[slug].md
```

**Template**: `templates/wireframe-template.md`

**Complete Structure** (13 sections):
1. **Snapshot** - Objective, inputs, output, fidelity rules, assumptions
2. **Users and Top Tasks** - Primary users, top tasks
3. **Scope and Constraints** - In scope, out of scope, constraints
4. **Information Architecture Alignment** - Navigation model, sections, entities, labeling, risks
5. **Key Flows** - Purpose, entry points, steps, success outcome, edge cases
6. **Screen Inventory** - P0/P1/P2 screens with priorities
7. **Wireframe Conventions** - Layout regions, component naming, annotation style
8. **Screen Specs** - Purpose, actions, layout, components, content, data, interactions, states, accessibility, questions
9. **Cross-Screen Patterns** - Navigation, forms, feedback, tables, search, permissions
10. **Validation Checklist** - Coverage, clarity, feasibility, test readiness
11. **Open Questions and Decisions Needed** - Prioritized questions with resolution plans
12. **Next Steps** - Immediate and near-term actions
13. **Acceptance Criteria** - Final validation checklist

## Integration with Workflows

**Consumes**:
- **Information Architecture** — Uses navigation model and sitemap
- **Persona** — Informs user needs and priorities
- **Journey Mapping** — Identifies key tasks and workflows
- **User Flow Creation** — Provides task-specific flow details
- **Context Documentation** — Provides constraints and requirements

**Produces** (consumed by):
- **Accessibility Specifications** (`explore.proc.accessibility-specifications`) — Screens and flows to specify for a11y
- **Hi-Fi Handoff** (`explore.proc.hifi-handoff`) — Wireframe frames are the input for hi-fi screen creation
- **Risk Documentation** (`explore.proc.risk-documentation`) — Design feasibility notes, interaction complexity risks
- **Usability Testing** (`explore.proc.usability-testing`) — Wireframes become test artifacts
- **PRD Generation** (`explore.proc.prd-generation`) — Wireframes inform functional requirements (retroactive enrichment)

## Best Practices

**Do**:
- ✅ Focus on structure and hierarchy, not visual styling
- ✅ Document all states (empty, loading, error, no permission)
- ✅ Use consistent component naming across screens
- ✅ Capture interaction behaviors with numbered callouts
- ✅ Define edge cases for every critical flow
- ✅ Validate with stakeholders before moving to high-fidelity
- ✅ Create clickable prototypes for usability testing
- ✅ Document accessibility considerations early

**Don't**:
- ❌ Add visual design details (colors, fonts, imagery)
- ❌ Skip edge cases and error states
- ❌ Use inconsistent terminology for components
- ❌ Assume data is always available (define empty states)
- ❌ Forget about mobile/responsive considerations
- ❌ Ignore accessibility from the start
- ❌ Create wireframes without validating IA first
- ❌ Move to high-fidelity before stakeholder alignment

## Completeness Checklist

**Post-edit**: Re-run this checklist after any modification to the output artifact.

- [ ] All critical screens wireframed at low fidelity
- [ ] Empty, loading, and error states documented per screen
- [ ] Interactive elements annotated with behavior
- [ ] Responsive breakpoints defined (desktop + mobile for top flows)
- [ ] Wireframes align with information architecture
- [ ] Accessibility considerations noted per interactive component

## Gotchas

- ⚡ **Visual design creep**: The agent tends to add visual polish (colors, shadows, specific fonts) to wireframes, making them look like mockups. Wireframes must remain low-fidelity — visual styling distracts stakeholders from evaluating structure and hierarchy.
- ⚡ **Empty state blindness**: The agent almost always wireframes the "full data" state. Real users encounter empty states, loading states, and error states. Always wireframe at least the empty state and one error state for each key screen.
- ⚡ **Responsive afterthought**: The agent frequently wireframes only the desktop layout. If the product supports mobile, always produce at least a mobile wireframe for the top 3 flows — responsive behavior must be designed, not assumed.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.wireframing:0.1.2:2026-08-31T13:28:29Z -->
