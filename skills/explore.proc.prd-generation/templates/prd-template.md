+++
template_name = "Product Requirements Document Template"
version = "2.0"
output_format = "explore/prds/[slug]-prd.md"
validation_required = true
+++

---
domain: [Domain Name from glossary]
slug: [slug]
source: explore/explore-[slug]/domain-analysis.md
glossary_version: [hash or date of domain-analysis.md]
validated_by: [steering team member]
explore_type: [Fast Lane / ERC / Diverge/Converge]
evidence_label: OBS
---

# PRD · [Domain Name]

**Status**: Created | Reviewed | Epics Extracted | Implementation | Complete  
**Priority**: Low | Medium | High  
**Stakeholder Appetite**: Low | Moderate | High  
**Created**: {YYYY-MM-DD}  
**Last Updated**: {YYYY-MM-DD}

**Related Documents**:
- Signal: `signal/signals/signal-seed-[slug].md`
- Hypothesis: `explore/explore-[slug]/hypothesis.md`
- Technical Feasibility: `explore/explore-[slug]/technical-feasibility.md`
- HLD: `explore/hlds/[slug]-hld.md` _(if available)_
- Personas: `explore/domain/personas-[slug].md`
- Journey Maps: `explore/domain/journey-[slug].md`
- User Flows: `explore/domain/flows-[slug].md`
- Epics: `explore/epics/` (extracted via [epic-extraction process](../../docs/process/epic-extraction.md))

---

## Problem Statement

**User Need**: [Focus on problems to solve, not solutions]

[2-4 sentences from Signal, stripped of tags, preserving meaning. Describe the problem from the user's perspective and why it matters.]

**Background**: [Context from research, validated hypothesis, and stakeholder input]

---

## Goals

**What success looks like**:

1. **[Goal 1]**: [From validated hypothesis - measurable outcome]
2. **[Goal 2]**: [From "Why This Matters" - business value]
3. **[Goal 3]**: [From expected outcomes - user impact]

---

## Success Metrics & KPIs

**How will you know if it's successful?**

| Metric | Baseline | Target | Measurement Method | Timeline |
|--------|----------|--------|-------------------|----------|
| [Metric 1] | [Current state] | [Quantifiable target] | [How measured] | [When measured] |
| [Metric 2] | [Current state] | [Quantifiable target] | [How measured] | [When measured] |
| [Metric 3] | [Current state] | [Quantifiable target] | [How measured] | [When measured] |

**Key Performance Indicators**:
- **Primary KPI**: [Most important metric]
- **Secondary KPIs**: [Supporting metrics]

---

## Target Users

### Primary Users
- **[Persona Name]** (from `personas-[slug].md`): [Need statement and key pain point]

### Secondary Users
- **[Persona Name]** (from `personas-[slug].md`): [Need statement and key pain point]

**User Segments**: [Any additional segmentation or targeting criteria]

---

## User Flows & Scenarios

**Reference**: See `explore/domain/flows-[slug].md` for detailed user flows

### Primary User Flow
**Flow ID**: [F1, F2, etc. from flows document]  
**Scenario**: [Brief description of the scenario]  
**Steps**: [High-level flow summary]

### Alternative Flows
**Flow ID**: [F#]  
**Scenario**: [When this flow is used]

### Edge Cases
- [Edge case 1]: [How it's handled]
- [Edge case 2]: [How it's handled]

---

## Functional Requirements

### Core Features

| # | Requirement | User Story | Acceptance Criteria | Priority |
|---|-------------|-----------|-------------------|----------|
| R-001 | [Feature description] | As a [persona], I want to [action] so that [benefit] | - [ ] [Criterion 1]<br>- [ ] [Criterion 2]<br>- [ ] [Criterion 3] | High |
| R-002 | [Feature description] | As a [persona], I want to [action] so that [benefit] | - [ ] [Criterion 1]<br>- [ ] [Criterion 2] | Medium |
| R-003 | [Feature description] | As a [persona], I want to [action] so that [benefit] | - [ ] [Criterion 1]<br>- [ ] [Criterion 2] | Low |

**Domain validation**: Flag any requirement that conflicts with domain rules as `[DOMAIN-RULE-VIOLATION: requirement conflicts with rule "{rule}" in domain-analysis.md]`.

### Supporting Features

| # | Requirement | User Story | Acceptance Criteria | Priority |
|---|-------------|-----------|-------------------|----------|
| R-004 | [Feature description] | As a [persona], I want to [action] so that [benefit] | - [ ] [Criterion 1]<br>- [ ] [Criterion 2] | Medium |

---

## Non-Functional Requirements

### Performance
- **NFR-001 Response Time**: [Target - e.g., "Page load < 2 seconds"]
- **NFR-002 Throughput**: [Target - e.g., "Handle 1000 requests/second"]
- **NFR-003 Scalability**: [Target - e.g., "Support 10,000 concurrent users"]

### Security
- **NFR-004 Authentication**: [Requirements]
- **NFR-005 Authorization**: [Requirements]
- **NFR-006 Data Protection**: [Requirements - e.g., "Encrypt PII at rest and in transit"]
- **NFR-007 Compliance**: [Standards - e.g., "GDPR, HIPAA, SOC 2"]

### Reliability
- **NFR-008 Availability**: [Target - e.g., "99.9% uptime"]
- **NFR-009 Disaster Recovery**: [RTO/RPO targets]
- **NFR-010 Error Handling**: [Requirements]

### Usability
- **NFR-011 Accessibility**: [Standards - e.g., "WCAG 2.1 AA compliance"]
- **NFR-012 Browser Support**: [Requirements]
- **NFR-013 Mobile Support**: [Requirements]
- **NFR-014 Localization**: [Languages/regions]

### Maintainability
- **NFR-015 Code Quality**: [Standards]
- **NFR-016 Documentation**: [Requirements]
- **NFR-017 Testing**: [Coverage targets]

---

## Constraints

**Domain validation**: Flag any term not in the domain glossary as `[GLOSSARY-GAP: term "{term}" not found in domain-analysis.md]`.

**Technical Constraints**:
- [Constraint 1] `[CONFIRMED]` or `[ASSUMPTION]`
- [Constraint 2] `[CONFIRMED]` or `[ASSUMPTION]`

**Business Constraints**:
- [Constraint 1] `[CONFIRMED]` or `[ASSUMPTION]`
- [Constraint 2] `[CONFIRMED]` or `[ASSUMPTION]`

**Regulatory Constraints**:
- [Constraint 1] `[CONFIRMED]` or `[ASSUMPTION]`
- [Constraint 2] `[CONFIRMED]` or `[ASSUMPTION]`

**Resource Constraints**:
- **Timeline**: [Constraint]
- **Budget**: [Constraint]
- **Team**: [Constraint]

---

## Out of Scope

**Explicitly excluded from this PRD**:

- [Item 1] — [Reason for exclusion]
- [Item 2] — [Reason for exclusion]
- [Item 3] — [Reason for exclusion]

**Future Considerations** (not in this release):
- [Item 1]
- [Item 2]

---

## Open Questions

| # | Question | Owner | Priority | Target Resolution |
|---|----------|-------|----------|------------------|
| Q1 | [Question] | [Name] | High | [Date or milestone] |
| Q2 | [Question] | [Name] | Medium | [Date or milestone] |

**Assumptions** (tagged from Signal):
- [Assumption 1] `[ASSUMPTION]` — [Validation plan]
- [Assumption 2] `[ASSUMPTION]` — [Validation plan]

---

## Technical Architecture

**Summary**: [High-level architecture approach from Step 2 technical feasibility; enriched by HLD if available]

**Key Components**:
- [Component 1]: [Purpose]
- [Component 2]: [Purpose]

**Integrations**:
- [System 1]: [Integration type and purpose]
- [System 2]: [Integration type and purpose]

**Data Model**: [Key entities and relationships]

**Reference**: See `explore/hlds/[slug]-hld.md` for complete architecture details

---

## Risks & Mitigation

| Risk | Likelihood | Impact | Mitigation Strategy | Owner |
|------|-----------|--------|-------------------|-------|
| [Risk 1] | High/Medium/Low | High/Medium/Low | [Strategy] | [Name] |
| [Risk 2] | High/Medium/Low | High/Medium/Low | [Strategy] | [Name] |

**Reference**: See `explore/explore-[slug]/risks.md` for complete risk register

---

## Dependencies

**Upstream Dependencies** (must be completed before this):
- [Dependency 1] — [Status]
- [Dependency 2] — [Status]

**Downstream Dependencies** (blocked by this):
- [Dependency 1]
- [Dependency 2]

**External Dependencies**:
- [Third-party service/API]
- [External team/system]

---

## Epic Extraction

**Status**: Not Started | In Progress | Complete

**Process**: Use [epic-extraction process](../../docs/process/epic-extraction.md) to break down requirements into epics

**Extracted Epics**:
- [Epic 1]: `explore/epics/DFE-[EPIC-ID].md`
- [Epic 2]: `explore/epics/DFE-[EPIC-ID].md`

**Epic Summary**:

| Epic ID | Epic Name | Requirements Covered | Priority | Status |
|---------|-----------|---------------------|----------|--------|
| E1 | [Epic name] | R-001, R-002, R-003 | High | Not Started |
| E2 | [Epic name] | R-004, R-005 | Medium | Not Started |

---

## Implementation Notes

**Phasing** (if applicable):
- **Phase 1**: [Scope]
- **Phase 2**: [Scope]
- **Phase 3**: [Scope]

**Technical Considerations**:
- [Consideration 1]
- [Consideration 2]

**Design Considerations**:
- [Consideration 1]
- [Consideration 2]

---

## Approval & Sign-Off

| Role | Name | Date | Status |
|------|------|------|--------|
| Product Manager | [Name] | [YYYY-MM-DD] | ✅ Approved / ⏳ Pending / ❌ Rejected |
| Tech Lead | [Name] | [YYYY-MM-DD] | ✅ Approved / ⏳ Pending / ❌ Rejected |
| UX Lead | [Name] | [YYYY-MM-DD] | ✅ Approved / ⏳ Pending / ❌ Rejected |
| Stakeholder | [Name] | [YYYY-MM-DD] | ✅ Approved / ⏳ Pending / ❌ Rejected |

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | {YYYY-MM-DD} | [Name] | Initial PRD created |
| 1.1 | {YYYY-MM-DD} | [Name] | [What changed] |

---

## Related Documentation

**Explore Phase Artifacts**:
- Context: `explore/explore-[slug]/context.md`
- Hypothesis: `explore/explore-[slug]/hypothesis.md`
- Discovery Index: `explore/explore-[slug]/discovery.md`

**Design Artifacts**:
- Personas: `explore/domain/personas-[slug].md`
- Journey Maps: `explore/domain/journey-[slug].md`
- User Flows: `explore/domain/flows-[slug].md`
- Wireframes: `explore/design/wireframes-[slug].md` (if applicable)

**Technical Artifacts**:
- HLD: `explore/hlds/[slug]-hld.md`
- ADRs: `explore/decisions/[slug]-adr-###-[name].md`
- Risk Register: `explore/explore-[slug]/risks.md`

**Implementation Artifacts**:
- Epics: `explore/epics/DFE-[EPIC-ID].md`
- Iterations: `explore/iterations/` (specification changes)
- Tasks: `work/` (active tasks)

---

**Slug**: [slug]  
**Domain**: [Domain Name]  
**Last Updated**: {YYYY-MM-DD}  
**Status**: {Created | Reviewed | Epics Extracted | Implementation | Complete}

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.prd-generation:0.1.2:2026-08-31T11:34:43Z -->
