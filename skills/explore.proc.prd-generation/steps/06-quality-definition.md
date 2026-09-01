# Step 6: Generate Quality Definition (Group 3)

## Objective

Generate Group 3 sections: Non-Functional Requirements, Quality Gates (DoD, DoR, acceptance criteria), Testing Strategy, and DevOps & Deployment Strategy.

## Entry Criteria

- [ ] Step 5 (Review Group 2) complete with human approval

## Actions

### 6.1 Generate Group 3 Sections

- **Non-Functional Requirements**: Performance, Security, Availability, Scalability targets. Use `NFR-XXX` format for each NFR ID.
  - Performance: response time, throughput, scalability targets
  - Security: authentication, authorization, data protection, compliance
  - Availability: uptime targets, disaster recovery (RTO/RPO)
  - Usability: accessibility standards, browser/mobile support, localization
  - Maintainability: code quality standards, documentation, testing coverage
- **Quality Gates**: Definition of Done (DoD), Definition of Ready (DoR), acceptance criteria for each requirement.
- **Testing Strategy**: Unit, integration, E2E testing approach (inline summary — full test strategy document produced in Step 5 of explore.agent).
- **DevOps & Deployment Strategy**: Deployment approach, environments, monitoring (inline summary — full DevOps strategy document produced in Step 5 of explore.agent).

### 6.2 Cross-Reference Requirements

Each NFR must:
- Have a unique ID in `NFR-XXX` format
- Reference related functional requirements (`R-XXX`)
- Include testable acceptance criteria

## Exit Criteria

- [ ] All Group 3 sections generated
- [ ] NFRs cover performance, security, reliability, usability, maintainability
- [ ] NFRs use `NFR-XXX` ID format
- [ ] Quality gates defined (DoD, DoR)
- [ ] Testing strategy outlined
- [ ] DevOps & deployment strategy outlined

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.prd-generation:0.1.2:2026-08-31T11:34:43Z -->
