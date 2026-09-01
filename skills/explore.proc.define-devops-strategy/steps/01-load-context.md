# Step 1: Load Context

## Objective

Read PRD, HLD, ADRs, tech stack, and any existing deployment documentation to extract DevOps-relevant drivers. Build a context profile that grounds all subsequent strategy decisions.

## Entry Criteria

- [ ] PRD exists at `explore/prds/[slug]-prd.md` (or location provided)
- [ ] HLD exists at `explore/hlds/[slug]-hld.md` (or location provided)
- [ ] Slug is known for output file naming

## Actions

### 1.1 Read PRD and Extract DevOps Drivers

Read the PRD in full. Extract:

**NFRs and Quality Attributes**:
- Performance targets (response time, throughput, concurrent users)
- Availability / uptime requirements
- Scalability expectations
- Security and compliance requirements (GDPR, FCA, PCI-DSS, etc.)
- Data residency or sovereignty constraints
- Recovery objectives (RTO, RPO)

**Success Metrics** that affect DevOps:
- Deployment frequency targets
- Time-to-market expectations
- Defect escape rate targets

**Constraints**:
- Budget or resource constraints
- Regulatory constraints
- Vendor or platform lock-in constraints
- Timeline constraints

### 1.2 Read HLD and Extract Architecture Context

Read the HLD in full. Extract:

**Architecture Type**:
- Monolith / Modular monolith / Microservices / Event-driven / Hybrid
- Deployment topology (single service, multi-service, distributed)

**Component Boundaries**:
- Number of deployable units
- Inter-service communication patterns (REST, gRPC, async messaging)
- Shared dependencies (databases, caches, message brokers)

**Integration Points**:
- External APIs and third-party services
- Data sources and sinks
- Event buses or message queues

**Tech Stack** (confirm from HLD or `explore/tooling.md`):
- Languages and frameworks (frontend, backend)
- Build tools (npm, Maven, Gradle, etc.)
- Database technology
- API specification format (OpenAPI, GraphQL, etc.)

### 1.3 Read ADRs for Deployment-Relevant Decisions

Scan `explore/decisions/` for ADRs that affect:
- Infrastructure choices (cloud provider, container orchestration, serverless)
- CI/CD tooling selections
- Database migration strategy
- Authentication / authorisation approach
- Caching strategy
- Event/message broker choice

### 1.4 Read Existing Artifacts (if available)

If any of the following exist, read them:
- **Test Strategy** — `explore/explore-[slug]/test-strategy.md` → extract quality gates, pipeline stages, coverage targets
- **Path to Production** — `explore/[slug]/path-to-production.md` → extract confirmed environment and promotion facts
- **Existing pipeline files** — GitHub Actions, GitLab CI, Jenkinsfile, etc.
- **Existing IaC files** — Terraform, Helm, Pulumi, CloudFormation, etc.

### 1.5 Compile Context Profile

Produce a structured context profile:

```
DevOps Context Profile:

Architecture Type:     [monolith | modular-monolith | microservices | event-driven | hybrid]
Deployable Units:      [count]
Tech Stack:            [frontend] + [backend] + [database] + [build tools]
Integration Points:    [list external APIs, data sources, event buses]

NFR Highlights:
  Performance:         [targets from PRD]
  Availability:        [target from PRD]
  Scalability:         [expectations from PRD]
  Security/Compliance: [requirements from PRD]
  Recovery:            [RTO/RPO from PRD]

Existing Artifacts:
  Test Strategy:       [exists / not found]
  Path to Production:  [exists / not found]
  Pipeline Config:     [exists / not found]
  IaC Config:          [exists / not found]

Confirmed Decisions:
  [ADR-XXX]: [decision summary]
  ...

Gaps Identified:
  [list areas where no information was found]
```

## Checkpoint

Present the context profile to the human for confirmation.

**STOP**: Confirm with the human that the context profile is accurate and complete. If the human identifies missing documents or incorrect extractions, update before proceeding.

## Exit Criteria

- [ ] PRD read and DevOps drivers extracted
- [ ] HLD read and architecture context extracted
- [ ] ADRs scanned for deployment-relevant decisions
- [ ] Existing artifacts checked (test strategy, path-to-production, pipeline, IaC)
- [ ] Context profile compiled and confirmed by human

## Next Step

-> [02-assess-context.md](./02-assess-context.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.define-devops-strategy:0.1.3:2026-09-01T09:19:01Z -->
