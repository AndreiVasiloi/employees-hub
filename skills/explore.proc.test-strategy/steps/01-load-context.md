# Step 1: Load Context

## Entry Criteria
- PRD exists at `explore/prds/[slug]-prd.md`
- HLD exists at `explore/hlds/[slug]-hld.md`
- Slug is known

## Actions

### Action 1: Read PRD and Extract Testability Drivers

**Agent reads the PRD and extracts:**

1. **Functional requirements** — features and acceptance criteria that need test coverage
2. **Non-Functional Requirements (NFRs)** — performance, security, availability, scalability targets
3. **Success metrics** — measurable outcomes that imply verification needs
4. **User journeys** — critical paths that become E2E test candidates
5. **Acceptance criteria** — specific conditions that map to test assertions
6. **Constraints** — regulatory, compliance, or business rules requiring validation

**Agent presents PRD summary:**

```
PRD Testability Drivers:

Functional Requirements: [N] requirements identified
  - [Requirement 1] — [acceptance criteria summary]
  - [Requirement 2] — [acceptance criteria summary]
  ...

NFRs:
  - Performance: [targets from PRD]
  - Security: [requirements from PRD]
  - Availability: [targets from PRD]
  - Scalability: [targets from PRD]

Critical User Journeys (E2E candidates):
  - [Journey 1] — [description]
  - [Journey 2] — [description]

Compliance/Regulatory: [any requirements]
```

### Action 2: Read HLD and Extract Architecture Boundaries

**Agent reads the HLD and extracts:**

1. **Component inventory** — services, modules, layers that become unit test scopes
2. **Integration points** — APIs, databases, message queues, external services that become integration test boundaries
3. **Service boundaries** — inter-service communication that becomes contract test surface
4. **Data flows** — serialisation/deserialisation points requiring integration tests
5. **Tech stack** — languages, frameworks that determine tooling choices
6. **Deployment topology** — environments, infrastructure affecting test environment strategy

**Agent presents HLD summary:**

```
HLD Testability Map:

Components ([N] total):
  - [Component 1] — [tech] — unit test scope
  - [Component 2] — [tech] — unit test scope

Integration Boundaries ([N] total):
  - [Component A] ↔ [Database] — DB integration test
  - [Component B] ↔ [External API] — API integration test
  - [Component C] ↔ [Message Queue] — queue integration test

Service Boundaries ([N] contracts):
  - [Service A] → [Service B] — REST/gRPC contract
  - [Service C] → [Service D] — event contract

Tech Stack:
  - Frontend: [framework, language]
  - Backend: [framework, language]
  - Database: [type]
  - Build tools: [tools]
  - CI/CD: [platform, if known]
```

### Action 3: Read Architecture Decisions

**Agent scans `explore/decisions/` for ADRs that affect testability:**

- Decisions about API design (REST vs GraphQL vs gRPC)
- Decisions about data storage (SQL vs NoSQL, event sourcing)
- Decisions about authentication/authorisation
- Decisions about deployment (containers, serverless, monolith vs microservices)
- Decisions about third-party integrations

**Agent lists relevant ADRs:**

```
Testability-Relevant ADRs:
  - [ADR-001] [title] — impact: [how it affects testing]
  - [ADR-002] [title] — impact: [how it affects testing]
```

**If no ADRs exist**: Note this and proceed — the HLD provides sufficient architectural context.

### Action 4: Present Combined Context Summary

**Agent presents the full context extraction:**

```
Test Strategy Context Summary:

Source Documents:
  ✓ PRD: explore/prds/[slug]-prd.md
  ✓ HLD: explore/hlds/[slug]-hld.md
  ✓ ADRs: [N] relevant decisions

Testability Profile:
  - [N] functional requirements with acceptance criteria
  - [N] NFR targets (performance, security, availability)
  - [N] components (unit test scopes)
  - [N] integration boundaries
  - [N] service contracts
  - [N] critical user journeys (E2E candidates)
  - Tech stack: [summary]

Key Testability Concerns:
  - [Concern 1 — e.g., "Multiple external API integrations require stubbing strategy"]
  - [Concern 2 — e.g., "Real-time data requirements need performance test approach"]
  - [Concern 3 — e.g., "Regulatory compliance requires audit trail verification"]
```

## Checkpoint
- [ ] PRD testability drivers extracted (requirements, NFRs, journeys, criteria)
- [ ] HLD architecture boundaries mapped (components, integrations, contracts)
- [ ] Relevant ADRs identified
- [ ] Combined context summary presented to user

## Exit Criteria
- All source documents read and testability drivers extracted
- Context summary is complete and accurate
- Ready to proceed to scope and risk assessment

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.test-strategy:0.2.1:2026-09-01T09:06:28Z -->
