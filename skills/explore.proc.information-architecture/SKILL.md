+++
name = "explore.proc.information-architecture"
description = "Use this skill when you need to define information structure, navigation models, and labeling taxonomies so users can find content and complete key tasks. Activates after personas and journeys establish who the users are and what they need. Also relevant when someone says 'organize the content,' 'define the navigation,' or 'how should we structure this.' Does NOT define screen layouts or interaction details — use User Flow Creation for interaction paths and Wireframing for screen structure."
license = "Proprietary. See LICENSE.md"
+++

# Information Architecture

Define information structure, navigation, and labeling that enables users to find content and complete key tasks with minimal friction.

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## When to Use

Use this skill when you need to:
- Define navigation model and hierarchy for a product or feature
- Organize content and screens into a logical structure
- Create labeling and taxonomy for sections, screens, and entities
- Define entry points and wayfinding rules
- Map role or permission impacts on structure and access
- Prepare for wireframing and prototyping (IA comes first)
- Validate findability and navigation before visual design

**Key principle**: Information architecture defines the skeleton of the user experience. It must be validated before wireframing begins, as navigation and structure decisions impact every screen and interaction.

## Pre-Check

If an IA document already exists at `explore/explore-[slug]/ia-[slug].md`:
1. Load the existing IA document
2. Present to the steering team: "Existing information architecture found. Review and update, or create fresh?"
3. If updating → skip to the validation step with existing data for review
4. If creating fresh → proceed from Step 1

## Inputs to Request (if missing)

Before creating information architecture, ensure you have:

1. **PRD** — `explore/prds/[slug]-prd.md` (navigation requirements, page hierarchy, feature scope)
2. **Context baseline** — From Context Documentation skill (domain model, system map)
3. **Personas** — From Persona skill (who will use the product)
4. **Journey maps** — From Journey Mapping skill (key tasks and workflows)
5. **Content inventory** — List of screens, sections, and entities to organize
6. **Slug** — Project identifier for file naming (e.g., `care-it`)

**STOP**: If PRD or personas are missing, create them first. IA decisions must be grounded in product requirements and user needs.

## Process Steps

| Step | File | Purpose |
|------|------|---------|
| 1 | [01-top-tasks.md](./steps/01-top-tasks.md) | Review inputs and identify top tasks |
| 2 | [02-organizing-principles.md](./steps/02-organizing-principles.md) | Define organizing principles |
| 3 | [03-navigation-model.md](./steps/03-navigation-model.md) | Propose navigation model |
| 4 | [04-sitemap.md](./steps/04-sitemap.md) | Create sitemap or screen hierarchy |
| 5 | [05-labeling.md](./steps/05-labeling.md) | Define labeling and taxonomy |
| 6 | [06-entry-points.md](./steps/06-entry-points.md) | Define entry points and wayfinding |
| 7 | [07-roles-impact.md](./steps/07-roles-impact.md) | Document roles and permissions impact |
| 8 | [08-open-questions.md](./steps/08-open-questions.md) | Identify open questions and validation plan |
| 9 | [09-write-document.md](./steps/09-write-document.md) | Write information architecture document |
| 10 | [10-validation.md](./steps/10-validation.md) | Run completeness validation |

## Output Format

```
explore/design/information-architecture-[slug].md
```

**Template**: `templates/ia-template.md`

**Complete Structure** (11 sections):
1. **Snapshot** - Objective, Scope, Users, Surfaces, Assumptions, Constraints
2. **Organizing Principles** - Primary strategy, Supporting principles, Trade-offs
3. **Navigation Model** - Model selection, Rationale, Behavior rules
4. **Sitemap or Screen Hierarchy** - Complete hierarchy with ASCII tree
5. **Content Model Alignment** - Key entities, Relationships, Governance
6. **Labeling and Taxonomy** - Section/screen labels, Controlled vocabulary, Facets
7. **Entry Points and Wayfinding** - Primary/secondary entry points, Deep linking, Location awareness
8. **Roles and Permissions Impact** - Roles, Visibility by role
9. **Open Questions and Validation Plan** - Prioritized questions, Validation methods
10. **Decisions Log** - Key decisions with alternatives and rationale
11. **Acceptance Criteria** - Validation checklist

## Integration with Workflows

**Consumes**:
- **PRD Generation** — Navigation requirements, page hierarchy, and feature scope drive IA structure
- **Persona** — Informs user needs and mental models
- **Journey Mapping** — Identifies key tasks and workflows
- **Content Strategy** — Aligns with labeling and taxonomy

**Produces** (consumed by):
- **User Flow Creation** (`explore.proc.user-flow-creation`) — Page structure defines flow paths
- **Wireframing** (`explore.proc.wireframing`) — Provides structure for screen design
- **Accessibility Specifications** (`explore.proc.accessibility-specifications`) — Navigation and structure requirements inform a11y specs

## Best Practices

**Do**:
- ✅ Start with user tasks, not organizational structure
- ✅ Keep hierarchy shallow (2-4 levels maximum)
- ✅ Use consistent, plain-language labels throughout
- ✅ Validate with tree testing or card sorting before wireframing
- ✅ Document role-based access explicitly
- ✅ Separate operational areas from admin/settings
- ✅ Provide clear wayfinding and return paths
- ✅ Consider mobile and responsive implications

**Don't**:
- ❌ Organize by internal departments or teams
- ❌ Use jargon or technical terms in navigation labels
- ❌ Create deep nesting (>4 levels) without justification
- ❌ Use synonyms for the same concept in different places
- ❌ Skip validation with actual users
- ❌ Design navigation without understanding top tasks
- ❌ Mix different organizational principles inconsistently
- ❌ Forget to document role-based visibility

## Completeness Checklist

**Post-edit**: Re-run this checklist after any modification to the output artifact.

- [ ] Navigation structure organized by user tasks (not system entities)
- [ ] Hierarchy depth ≤ 4 levels
- [ ] Labeling glossary created and applied consistently
- [ ] Role-based visibility documented
- [ ] Search strategy defined for content-heavy areas
- [ ] Mobile/responsive implications addressed

## Gotchas

- ⚡ **Developer mental model bias**: The agent tends to organize IA by system entities (e.g., "Users", "Orders", "Settings") rather than by user tasks (e.g., "Track my order", "Update my profile"). IA should reflect the user's mental model, not the database schema.
- ⚡ **Nesting depth creep**: Navigation structures deeper than 4 levels cause findability problems. The agent often creates deeply nested hierarchies to be "comprehensive." Push back — if an item is 5 levels deep, it needs a shortcut or a flatter structure.
- ⚡ **Label inconsistency**: The agent may use different terms for the same concept across different sections (e.g., "Dashboard" vs. "Overview" vs. "Home"). Always create a labeling glossary and enforce it consistently throughout the IA.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.information-architecture:0.1.2:2026-08-31T12:24:54Z -->
