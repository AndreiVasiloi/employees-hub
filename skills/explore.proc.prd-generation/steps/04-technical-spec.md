# Step 4: Generate Technical Specification (Group 2)

## Objective

Generate Group 2 sections: User Flows, Functional Requirements, Non-Functional Requirements, Constraints, Out of Scope, and Technical Architecture.

## Entry Criteria

- [ ] Step 3 (Review Group 1) complete with human approval

## Actions

### 4.1 Generate Group 2 Sections

- **User Flows & Scenarios**: From journey maps and user flows. Primary flow, alternative flows, edge cases.
- **Functional Requirements**: Table with # | Requirement | User Story | Acceptance Criteria | Priority. Core and supporting features. Use `R-XXX` format for requirement IDs (e.g., R-001, R-002).
- **Non-Functional Requirements**: Performance, Security, Reliability, Usability, Maintainability targets. Use `NFR-XXX` format for NFR IDs (e.g., NFR-001, NFR-002).
- **Constraints**: From Signal + context. Technical, business, regulatory, resource. Flag `[ASSUMPTION]`-tagged items.
- **Out of Scope**: From context scope definition. Explicitly excluded items with reasons.
- **Technical Architecture**: From Step 2 technical feasibility notes; enriched by HLD if available. Key components, integrations, data model.

### 4.2 Write Requirements as Testable Statements

Each requirement must have:
- Clear user story (As a [persona], I want to [action] so that [benefit])
- Testable acceptance criteria (checkboxes)
- Priority (High/Medium/Low)

## Exit Criteria

- [ ] All Group 2 sections generated
- [ ] Requirements have user stories and acceptance criteria
- [ ] Constraints tagged [CONFIRMED] or [ASSUMPTION]
- [ ] Out of scope items documented with reasons

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.prd-generation:0.1.2:2026-08-31T11:34:43Z -->
