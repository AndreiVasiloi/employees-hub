+++
name = "explore.proc.accessibility-specifications"
description = "Use this skill when you need to define accessibility requirements and acceptance criteria for flows, screens, and components to ensure WCAG compliance. Activates before high-fidelity design or development begins. Also relevant when someone says 'make it accessible,' 'WCAG requirements,' or 'what are the a11y criteria.' Does NOT create the wireframes or designs themselves — use Wireframing for screen structure and Usability Testing to validate accessibility with users."
license = "Proprietary. See LICENSE.md"
+++

# Accessibility Specifications

Create accessibility specifications that define requirements and acceptance criteria for flows, screens, and components to ensure WCAG compliance.

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## When to Use

Use this skill when you need to:
- Define accessibility requirements before high-fidelity design or development
- Ensure WCAG compliance for key flows, screens, and components
- Document keyboard navigation, focus management, and screen reader behavior
- Specify error handling, dynamic content announcements, and form validation
- Create testable acceptance criteria for QA and definition of done
- Prevent accessibility gaps during design-to-development handoff
- Support inclusive design for users with disabilities

**Key principle**: Accessibility specifications define testable requirements early in the design process, ensuring that accessibility is built in from the start rather than retrofitted later.

## Pre-Check

If accessibility specifications already exist for the target flows/screens:
1. Load the existing specifications
2. Present to the steering team: "Existing accessibility specifications found. Review and update, or create fresh?"
3. If updating → skip to the validation step with existing data for review
4. If creating fresh → proceed from Step 1

## Inputs to Request (if missing)

Before creating accessibility specifications, ensure you have:

1. **Context baseline** - Problem, domain, constraints
2. **Wireframes** - Screens and flows to specify
3. **Target surfaces** - Web, mobile, or both
4. **User roles and permissions** - If applicable
5. **Conformance target** - WCAG version and level (default: WCAG 2.2 AA)
6. **Slug** - Project identifier for file naming (e.g., `care-it`)

**Optional inputs**:
- Interaction specifications (if available)
- Design system or component library constraints
- Supported browsers and assistive technologies
- Content guidelines (tone, reading level)

**STOP**: If wireframes are missing, create them first. If conformance target is unclear, default to WCAG 2.2 AA.

## Process Steps

| Step | File | Purpose |
|------|------|---------|
| 1 | [01-establish-baseline.md](./steps/01-establish-baseline.md) | Establish baseline standard and test environment |
| 2 | [02-identify-critical-flows.md](./steps/02-identify-critical-flows.md) | Identify critical user flows and screens |
| 3 | [03-cross-cutting-requirements.md](./steps/03-cross-cutting-requirements.md) | Define cross-cutting requirements |
| 4 | [04-component-requirements.md](./steps/04-component-requirements.md) | Define component-level requirements |
| 5 | [05-state-and-messaging.md](./steps/05-state-and-messaging.md) | Define state and messaging requirements |
| 6 | [06-flow-level-checks.md](./steps/06-flow-level-checks.md) | Define flow-level accessibility checks |
| 7 | [07-test-plan-and-acceptance.md](./steps/07-test-plan-and-acceptance.md) | Define test plan and acceptance criteria |
| 8 | [08-open-questions-and-risks.md](./steps/08-open-questions-and-risks.md) | Identify open questions and risks |
| 9 | [09-write-specification.md](./steps/09-write-specification.md) | Write accessibility specifications document |
| 10 | [10-validation.md](./steps/10-validation.md) | Run completeness validation |

## Output Format

```
explore/design/accessibility-[slug].md
```

**Template**: `templates/accessibility-template.md`

## Integration with Workflows

**Consumes**:
- **Wireframing** — Provides screens and flows to specify (component list)
- **Information Architecture** — Informs navigation and structure requirements
- **PRD Generation** — Accessibility requirements inform functional requirements
- **Hi-Fi Handoff** (`explore.proc.hifi-handoff`) — Provides implementation guidance

**Bidirectional**:
- **Usability Testing** (`explore.proc.usability-testing`) — Can include accessibility checks in test plan; usability findings may surface new a11y requirements

**Produces** (consumed by):
- **Epic Forming** (`explore.proc.epic-forming`) — A11y tasks and a11y acceptance criteria
- **Test Strategy** (`explore.proc.test-strategy`) — A11y test cases (keyboard, screen reader, contrast, touch targets)

## Best Practices

**Do**:
- ✅ Define accessibility requirements early (after wireframes, before high-fi)
- ✅ Use testable, specific language ("Focus moves to dialog" not "Focus is managed")
- ✅ Document keyboard patterns for all interactive components
- ✅ Specify screen reader announcements explicitly
- ✅ Include error handling and recovery paths
- ✅ Define acceptance criteria that can be used in QA
- ✅ Test with real assistive technologies, not just automated tools
- ✅ Document known limitations with rationale

**Don't**:
- ❌ Wait until after development to think about accessibility
- ❌ Use vague requirements ("Should be accessible")
- ❌ Rely only on automated testing tools (they catch ~30% of issues)
- ❌ Forget about keyboard-only users
- ❌ Ignore dynamic content and state changes
- ❌ Assume color alone is sufficient for conveying information
- ❌ Skip documentation of custom component patterns
- ❌ Treat accessibility as optional or "nice to have"

## Completeness Checklist

**Post-edit**: Re-run this checklist after any modification to the output artifact.

- [ ] WCAG conformance level confirmed with steering team (A, AA, or AAA)
- [ ] All critical user flows assessed for accessibility
- [ ] Keyboard navigation paths defined per interactive component
- [ ] Screen reader announcements specified for state changes
- [ ] Color contrast ratios verified against WCAG thresholds
- [ ] Acceptance criteria written as testable statements for QA

## Gotchas

- ⚡ **WCAG level mismatch**: The agent defaults to WCAG 2.2 AA, but some flows may require AAA (e.g., government, healthcare). Always confirm the conformance target with the steering team before writing specs — retrofitting from AA to AAA is expensive.
- ⚡ **Automated tool false confidence**: Automated accessibility scanners catch ~30% of issues. The agent may report "all checks passed" based on tool output alone. Always specify manual testing requirements (keyboard navigation, screen reader) alongside automated checks.
- ⚡ **Dynamic content blind spot**: Specifications for static screens are straightforward, but ARIA live regions, focus management on route changes, and dynamic content announcements are frequently under-specified. Explicitly document behavior for every state change, not just initial render.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.accessibility-specifications:0.1.2:2026-09-01T07:59:41Z -->
