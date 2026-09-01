# Step 7: Define Test Plan and Acceptance Criteria

## Objective

Create a definition of done with testable acceptance criteria and a testing approach for the accessibility specification.

## Entry Criteria

- [ ] Step 6 (Flow-Level Checks) complete with validated checklists
- [ ] All components, states, and flows have accessibility requirements

## Actions

### 7.1 Define Acceptance Criteria

Create the definition of done:

```
Acceptance Criteria

**Definition of done** (minimum):
- [ ] P0 flows pass keyboard-only testing
- [ ] Screen reader announces labels, errors, and status changes correctly
- [ ] Dialogs, menus, and tabs meet expected keyboard patterns
- [ ] No critical issues against conformance target
- [ ] Known limitations documented with rationale and mitigation

**Testing approach**:
- Automated: [Tools - e.g., "axe DevTools, Lighthouse"]
- Manual keyboard: [Who tests, when]
- Screen reader: [Which screen reader, who tests]

**Acceptance process**:
- [Who reviews and approves]
- [When testing occurs - design review, dev handoff, QA]

Does this acceptance criteria work for your workflow?
```

**STOP**: Wait for human to confirm acceptance criteria.

## Exit Criteria

- [ ] Definition of done established with testable criteria
- [ ] Testing approach defined (automated, manual keyboard, screen reader)
- [ ] Acceptance process documented (who reviews, when)
- [ ] Human confirmed acceptance criteria

## Next Step

→ [08-open-questions-and-risks.md](./08-open-questions-and-risks.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.accessibility-specifications:0.1.2:2026-09-01T07:59:41Z -->
