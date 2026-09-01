# Step 10: Write the DevOps Strategy Document

## Objective

Compile all design decisions from Steps 3-9 into the final DevOps strategy document using the output template. Write to the specification folder.

## Entry Criteria

- [ ] Steps 1-9 complete with all designs confirmed by human
- [ ] Slug known for output file naming
- [ ] All user questions answered or deferred

## Actions

### 10.1 Load the Output Template

Load `templates/devops-strategy-template.md`.

Review the 13-section structure:
1. Overview & Context
2. CI/CD Pipeline Design
3. Quality Gates
4. Testing Integration
5. Environment Strategy
6. Infrastructure as Code
7. Release & Deployment Strategy
8. Observability & Incident Response
9. DevSecOps
10. Governance & Compliance
11. Developer Experience
12. DORA Metrics & Continuous Improvement
13. Risks & Open Questions

### 10.2 Map Designs to Template Sections

| Template Section | Source Step |
|-----------------|------------|
| 1. Overview & Context | Step 1 (context profile) + Step 2 (assessment profile) |
| 2. CI/CD Pipeline Design | Step 3 (pipeline stages, artifact strategy) |
| 3. Quality Gates | Step 3 (gates, thresholds, failure policies) |
| 4. Testing Integration | Step 3 (test strategy alignment) + test-strategy cross-reference |
| 5. Environment Strategy | Step 4 (environment topology, ephemeral envs) |
| 6. Infrastructure as Code | Step 4 (IaC approach, pipeline, drift management) |
| 7. Release & Deployment Strategy | Step 5 (deployment style, progressive delivery, rollback, hotfix) |
| 8. Observability & Incident Response | Step 6 (three pillars, SLOs, alerting, incident response) |
| 9. DevSecOps | Step 7 (shift-left pipeline, supply chain, secrets, vulnerability mgmt) |
| 10. Governance & Compliance | Step 8 (policy-as-code, approvals, audit trails, change mgmt) |
| 11. Developer Experience | Step 4 (local dev) + Step 3 (fast feedback) + Step 9 (DX metrics) |
| 12. DORA Metrics & Continuous Improvement | Step 9 (DORA metrics, extended metrics, maturity roadmap) |
| 13. Risks & Open Questions | All steps — unresolved items and deferred questions |

### 10.3 Populate Each Section

For each section:
- Write only what is supported by confirmed design decisions
- Reference specific tools only when confirmed by user answers (DS-06, DS-07, DS-08, DS-10)
- Where tools are not yet decided, use `[TBD — select from: option1 / option2 / option3]`
- Keep each section concise — prefer tables and bullet points over prose
- Mark any assumption with *(assumed — confirm with team)*
- For deferred items, insert: `> **TBD**: [description of what needs to be decided]`

### 10.4 Populate Risks and Open Questions

In Section 13, consolidate:
- Items still TBD after all steps
- Questions deferred by the human
- Risks identified during the design process
- Dependencies on external decisions (cloud platform, vendor selections, etc.)

For each item, state:
- The specific decision or fact needed
- Impact if unresolved (delivery risk, security risk, performance risk)
- Suggested owner and target date

### 10.5 Add Cross-References

Ensure the document links to:
- PRD: `explore/prds/[slug]-prd.md`
- HLD: `explore/hlds/[slug]-hld.md`
- ADRs: `explore/decisions/[slug]-adr-*.md`
- Test Strategy: `explore/explore-[slug]/test-strategy.md` (if exists)
- Path to Production: `explore/[slug]/path-to-production.md` (if exists)
- Tooling: `explore/tooling.md`
- Glossary: `explore/glossary.md`

### 10.6 Write the Output File

Write the completed document to:
```
explore/explore-[slug]/devops-strategy.md
```

Replace `[slug]` with the project identifier provided at skill start. If no slug was provided, ask the human for one before writing.

### 10.7 Present for Review

Present the completed document to the human. Highlight:
- Strategy profile applied (Lean / Standard / Enterprise)
- Key design decisions and their rationale
- Items marked as TBD or assumed
- Open questions and risks
- Maturity roadmap phases

**STOP**: Wait for human acknowledgement before proceeding to validation. If the human requests changes, update the document and re-present affected sections only.

## Exit Criteria

- [ ] Template loaded and all 13 sections populated
- [ ] Cross-references added to related documents
- [ ] TBD items and assumptions clearly marked
- [ ] Risks and open questions consolidated in Section 13
- [ ] File written to `explore/explore-[slug]/devops-strategy.md`
- [ ] Human has reviewed and acknowledged the document

## Next Step

-> [11-validation.md](./11-validation.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.define-devops-strategy:0.1.3:2026-09-01T09:19:01Z -->
