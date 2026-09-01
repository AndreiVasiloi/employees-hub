+++
template_name = "Explore Bundle Template"
version = "1.0"
output_format = "explore/explore-[slug]/explore-bundle.md"
validation_required = true
+++

# Explore Bundle: {Project Name}

**Overview**  
{2-3 sentence summary of what this Explore phase will validate. Include: the problem being solved, key validation areas (stakeholder requirements, technical feasibility, compliance, etc.), and what will be delivered at the end of Explore (validated requirements, complete PRD, architecture ready for Govern).}

## Header

| Field | Value |
|-------|-------|
| Status | {Active / Paused / Complete} |
| Created | {YYYY-MM-DD} |
| Timeline | {N weeks} |
| Explore Type | {Explore Readiness Check / Standard Explore / Fast Track} |
| Steering Team | {Product Team / Stakeholder names - TBD if not yet identified} |

## Signal Information

| Field | Value |
|-------|-------|
| Signal Title | {Signal title from Signal document} |
| Problem Statement | {Problem statement from Signal - what pain point or opportunity is being addressed} |
| Tech Stack | {Technology stack from Signal - can be TBD if not yet decided} |
| Key Page Types / Features | {Key features or page types from Signal - high-level feature list} |
| Key Requirements | {Key requirements from Signal - critical must-haves for the solution} |

## Solution Profile — Domains in Scope

| Domain | In Scope | Description |
|--------|----------|-------------|
| UX / UI | {Yes (confirmed) / Yes (TBD) / No} | {Description of UI/UX scope: platforms, user types, key flows, design requirements} |
| Backend Services | {Yes (confirmed) / Yes (TBD) / No} | {Description of backend scope: services, APIs, business logic, integrations} |
| Data Layer | {Yes (confirmed) / Yes (TBD) / No} | {Description of data scope: data models, storage, retention, privacy requirements} |
| Integrations | {Yes (confirmed) / Yes (TBD) / No} | {Description of integration scope: third-party services, APIs, external systems} |
| Infrastructure | {Yes (confirmed) / Yes (TBD) / No} | {Description of infrastructure scope: cloud provider, scalability, availability requirements} |
| Security / Compliance | {Yes (confirmed) / Yes (TBD) / No} | {Description of security/compliance scope: regulations, certifications, data privacy} |
| Mobile Development | {Yes (confirmed) / Yes (TBD) / No} | {Description of mobile scope: native vs cross-platform, platforms, key features} |
| {Custom Domain} | {Yes (confirmed) / Yes (TBD) / Partial (clarification needed) / No} | {Description of custom domain scope - add rows as needed for project-specific domains} |

## Planned Activities

### Phase 1: {Phase Name} (Week {N})

| Code | Activity | Owner | Dependencies | Output | What it closes |
|------|----------|-------|-------------|--------|----------------|
| A1 | {Activity description} | {Role - PM / Tech Lead / etc.} | {None / A# codes} | {Deliverable description} | {Open Q#, AS-#, AT-#, etc.} |
| A2 | {Activity description} | {Role} | {A# codes} | {Deliverable description} | {Open Q#, AS-#, etc.} |

### Phase 2: {Phase Name} (Weeks {N-M})

| Code | Activity | Owner | Dependencies | Output | What it closes |
|------|----------|-------|-------------|--------|----------------|
| A{N} | {Activity description} | {Role} | {A# codes} | {Deliverable description} | {Open Q#, AS-#, AT-#, etc.} |

### Phase 3: {Phase Name} (Week {N})

| Code | Activity | Owner | Dependencies | Output | What it closes |
|------|----------|-------|-------------|--------|----------------|
| A{N} | {Activity description} | {Role} | {A# codes} | {Deliverable description} | {Open Q#, AS-#, etc.} |

### Phase 4: Synthesis & PRD (Week {N})

| Code | Activity | Owner | Dependencies | Output | What it closes |
|------|----------|-------|-------------|--------|----------------|
| A{N} | User journey mapping | UX Designer | {A# codes} | Journey maps for all user types | — |
| A{N+1} | Wireframes & prototypes | UX Designer | {A# codes} | High-fidelity wireframes for all platforms | — |
| A{N+2} | Architecture decision records (ADRs) | Architect | {A# codes} | ADRs for key technical decisions | — |
| A{N+3} | PRD drafting | PM | All Phase 1-3 + A{N}-A{N+2} | Complete PRD with validated requirements, architecture, business model | — |
| A{N+4} | Epic & task breakdown | PM | A{N+3} | Epics and tasks ready for Govern phase | — |

## Open Questions

### {Category Name - e.g., Scope & Requirements}
- Q1: {Question text} — resolves in: {A# code}
- Q2: {Question text} — resolves in: {A# code}

### {Category Name - e.g., Technical Feasibility}
- Q{N}: {Question text} — resolves in: {A# code}

### {Category Name - e.g., Business Model}
- Q{N}: {Question text} — resolves in: {A# code}

### {Category Name - e.g., Stakeholders}
- Q{N}: {Question text} — resolves in: {A# code}

## Active Assumptions

| Code | Assumption | Risk if wrong | Validate in |
|------|-----------|---------------|-------------|
| **{Category - e.g., Stakeholder Assumptions}** |
| AS-1 | {Assumption statement} | {Impact if this assumption is incorrect} | {A# code} |
| AS-2 | {Assumption statement} | {Impact if incorrect} | {A# code} |
| **{Category - e.g., Technical Assumptions}** |
| AT-1 | {Assumption statement} | {Impact if incorrect} | {A# code} |
| AT-2 | {Assumption statement} | {Impact if incorrect} | {A# code} |
| **{Category - e.g., Operational Assumptions}** |
| AO-1 | {Assumption statement} | {Impact if incorrect} | {A# code} |
| **{Category - e.g., Business Assumptions}** |
| AB-1 | {Assumption statement} | {Impact if incorrect} | {A# code} |

## Risks

| Code | Risk | Impact | Likelihood | Mitigation |
|------|------|--------|-----------|------------|
| R1 | {Risk description} | {High / Medium / Low} | {High / Medium / Low} | {Mitigation strategy - reference A# codes where applicable} |
| R2 | {Risk description} | {High / Medium / Low} | {High / Medium / Low} | {Mitigation strategy} |

## Expected Outputs

- {Output 1 - e.g., Validated stakeholder map with roles and approval authority}
- {Output 2 - e.g., Requirements document from stakeholder interviews}
- {Output 3 - e.g., Technology stack decision document}
- {Output 4 - e.g., Architecture design}
- {Output 5 - e.g., User journey maps}
- {Output 6 - e.g., Wireframes}
- {Output 7 - e.g., Architecture Decision Records (ADRs)}
- {Output 8 - e.g., Complete PRD ready for Govern}
- {Output 9 - e.g., Epic & task breakdown ready for implementation}

## Constraints

| Type | Constraint |
|------|-----------|
| Budget | {Budget constraint - can be "TBD" if not yet determined} |
| Timeline | {Timeline constraint - e.g., "4-week Explore phase; implementation timeline to be proposed in PRD"} |
| Resources | {Resource constraint - e.g., "Team shape to be confirmed; requires PM, Tech Lead, Architect, UX Designer"} |
| Technical | {Technical constraints - e.g., "Must comply with regulations; 24/7 availability; scalability requirements"} |
| Compliance | {Compliance constraints - e.g., "Regulatory requirements; certifications; data privacy"} |
| Operational | {Operational constraints - e.g., "Multi-language support; incident management; SLAs"} |

## Checkpoints

| Milestone | Criteria |
|-----------|---------|
| Week {N} end | {Checkpoint criteria - list completed activities with A# codes} |
| Week {N} end | {Checkpoint criteria} |
| Week {N} end | {Checkpoint criteria} |
| Week {N} end | {Final checkpoint - PRD drafted and approved, epics ready} |

---

**Document History**

| Date | Version | Author | Changes |
|------|---------|--------|---------|
| {YYYY-MM-DD} | 1.0 | Explore Agent | Initial Explore Bundle created from Signal |

---

**Related Artifacts**
- Signal: `signal/signals/signal-{source}-{slug}.md`
- Discovery Index: `explore/explore-{slug}/discovery.md` 
- PRD: `explore/prds/{slug}-prd.md` (to be created in Step 4)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.discovery-planning:0.1.2:2026-08-27T13:21:11Z -->
