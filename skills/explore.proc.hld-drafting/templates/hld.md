# HLD Template — MOVED

> **This template has been superseded by the canonical template in `explore.util.hld-template`.**
>
> Load the template from: `explore.util.hld-template/templates/hld-template.md`
>
> The canonical template provides 13 numbered sections with OBS/INF/ASM evidence labeling and Mermaid diagram conventions. Do not use this file.

---

## System Overview

[High-level description of what the solution does, how it operates, and what the design goal is. Describe the architectural boundary and what is intentionally excluded.]

**Key Characteristics**:
- [Characteristic 1 — e.g., assisted workflow architecture for agent-led conversations]
- [Characteristic 2 — e.g., engine-centered boundary with explicit dependency]
- [Characteristic 3 — e.g., state visibility and decision capture prioritized over downstream depth]

---

## Architecture Approach

**Pattern**: [e.g., Modular service-oriented web application]

**Rationale**: [Why this pattern fits the current evidence better than alternatives. Reference feasibility findings, boundary constraints, and what flexibility is preserved. State what is intentionally left open for later phases.]

---

## Component Breakdown

| Component | Responsibility | Technology | Dependencies |
|-----------|---------------|------------|--------------|
| [Component] | [What it does] | [Tech choice or TBD] | [What it depends on] |

---

## Integration & Data Flows

### External Integrations

| System | Integration Type | Purpose | Protocol |
|--------|-----------------|---------|----------|
| [System] | API / Event / Internal service | [Purpose] | [Protocol or TBD] |
| [System] | Not in scope | [Explicitly excluded — reason] | N/A |

### Internal Data Flows

```text
[ASCII diagram showing data flow between components]
```

**Key Flows**:

1. **[Flow name]**: [Source] → [Destination] → [Destination]
   - Trigger: [What initiates this flow]
   - Data: [What data moves]
   - Outcome: [What the result is]

2. **[Flow name]**: [Source] → [Destination] → [Destination]
   - Trigger: [What initiates this flow]
   - Data: [What data moves]
   - Outcome: [What the result is]

---

## Key Architectural Decisions

Reference ADRs for detailed rationale:

1. **[Decision title]** — see `[adr-file-reference.md]`
   - Decision: [What was decided]
   - Impact: [What this means for the design]

2. **[Decision title]** — see `[adr-file-reference.md]`
   - Decision: [What was decided]
   - Impact: [What this means for the design]

---

## Technology Stack

### Frontend
- Framework: [Choice or TBD]
- State Management: [Choice or TBD]
- UI Library: [Choice or TBD]
- Channel posture: [e.g., Internal assisted web workflow for agent use]

### Backend
- Language: [Choice or TBD]
- Framework: [Choice or TBD]
- API Style: [Choice or TBD]
- Core backend shape: [e.g., Session Service + Orchestration boundary]

### Data Layer
- Primary Database: [Choice or TBD]
- Cache: [Choice or TBD / not yet evidenced]
- Message Queue: [Choice or TBD / not yet evidenced]

### Infrastructure
- Cloud Provider: [Choice or TBD / not yet evidenced]
- Container Orchestration: [Choice or TBD / not yet evidenced]
- CI/CD: [Choice or TBD / not yet evidenced]

---

## Security Considerations

- **Authentication**: [Auth mechanism, access model, open questions]
- **Authorization**: [RBAC/ABAC model, permission matrix reference]
- **Data Encryption**: [At rest and in transit requirements]
- **Compliance**: [Regulatory frameworks that shape implementation, non-negotiables reference]
- **Auditability**: [What must be logged, immutability, retention]
- **Breach Notification**: [Notification obligations and timelines]
- **Data Retention**: [Retention periods by data type, purge mechanisms]

---

## Scalability & Performance

**Expected Load**:
- Users: [User base description and concurrency expectations]
- Requests: [Request pattern — e.g., conversation-paced, batch, real-time]
- Data Volume: [Data scale expectations]

**Scaling Strategy**:
- [Strategy 1 — e.g., keep services stateless where practical]
- [Strategy 2 — e.g., isolate external calls behind orchestration]
- [Strategy 3 — e.g., persist state incrementally to avoid data loss]
- [Strategy 4 — e.g., defer formal scaling commitments until constraints confirmed]

---

## Deployment Architecture

**Environments**:
- Development: [Purpose]
- Staging: [Purpose]
- Production: [Purpose]

**Deployment Strategy**: [Strategy or TBD]

**Current deployment posture**:
- [Constraint 1 — e.g., no infrastructure commitment in this phase]
- [Constraint 2 — e.g., specific systems excluded from scope]
- [Constraint 3 — e.g., integration boundary must be testable before handoff]

---

## Monitoring & Observability

- **Logging**:
  - [What events are logged]
  - [State transition logging requirements]
  - [Log format, indexing, and protection requirements]
- **Metrics**: [What to track — e.g., completion rates, latency, failure rates, decision outcomes]
- **Tracing**: [End-to-end traceability requirements across components]
- **Alerting**: [What triggers alerts — e.g., failures, latency, validation errors, persistence failures]
- **Audit Access**: [Who can access logs, access logging requirements]

---

## Future-State Experience Journey

[Reference to current-state journey evidence if it exists.]

[Description of future-state assumptions if not yet documented as a validated artifact:]
- [Assumption 1]
- [Assumption 2]
- [Assumption 3]

---

## Open Questions

| # | Question | Owner | Target Resolution |
|---|----------|-------|-------------------|
| Q1 | [Question] | [Person / Role] | [When — e.g., Step 3 HLD review] |

---

## Enrichment Log

| Date | Change | Source | Updated By |
|------|--------|--------|------------|
| [YYYY-MM-DD] | [What changed] | [What triggered the change] | [Who made it] |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 | [YYYY-MM-DD] | [Author] | [Initial draft description] |

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.hld-drafting:0.2.1:2026-08-31T12:53:29Z -->
