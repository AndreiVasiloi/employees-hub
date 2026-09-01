+++
name = "explore.proc.define-devops-strategy"
description = "Use this skill when you need to define a DevOps strategy grounded in the project's PRD and HLD — designing CI/CD pipelines, environment models, release strategy, observability, DevSecOps, and DORA metrics adapted to architecture type and team maturity. Also relevant when someone says 'how do we deploy this,' 'define the CI/CD pipeline,' or 'what's our DevOps approach.' Does NOT extract deployment facts from existing documents — use Extract Path to Production for that."
license = "Proprietary. See LICENSE.md"
+++

# Define DevOps Strategy

Design a comprehensive DevOps strategy that is grounded in the project's PRD, HLD, and architecture decisions — not generic templates. The strategy adapts to the system's architecture type (microservices, monolith, event-driven), scale, risk profile, team maturity, and compliance requirements.

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## When to Use

Use this skill when you need to:
- Design a DevOps strategy for a new product or major feature
- Define CI/CD pipeline stages with quality gates and feedback loops
- Establish an environment model (local → CI → staging → prod, ephemeral environments)
- Define Infrastructure as Code approach and governance
- Design observability strategy (logs, metrics, traces, SLOs)
- Integrate DevSecOps practices into the delivery pipeline
- Define release and deployment strategy (progressive delivery, feature flags, rollback)
- Establish governance and policy-as-code for compliance
- Set DORA metrics baselines and improvement targets
- Align DevOps strategy with an existing or planned test strategy

**Key principle**: A good DevOps strategy is not a checklist of tools — it is a coherent system that optimises for fast feedback, high automation, safety, and developer velocity. Every recommendation must be grounded in the project's actual context.

## Pre-Check

If a DevOps strategy already exists at `explore/explore-[slug]/devops-strategy.md`:
1. Load the existing strategy
2. Present to the steering team: "Existing DevOps strategy found. Review and update, or create fresh?"
3. If updating → load existing content and skip to Step 11 (validation) for review
4. If creating fresh → proceed from Step 1

## Relationship to Other Skills

- **`explore.proc.define-path-to-production`**: Extracts deployment facts from existing documents. This skill *designs* the strategy. If path-to-production output exists, consume it as input.
- **`explore.proc.test-strategy`**: Defines the testing pyramid and quality gates. This skill references those gates in CI/CD pipeline design. If a test strategy exists, align with it; if not, define testing integration independently.
- **`explore.proc.architecture-solutioning`** / **`explore.proc.hld-drafting`**: Produces the HLD that this skill reads for architecture context.
- **`explore.proc.prd-generation`**: Produces the PRD that this skill reads for NFRs and quality attributes.

## Inputs to Request (if missing)

Before defining the DevOps strategy, ensure you have:

1. **PRD** — `explore/prds/[slug]-prd.md` (NFRs, quality attributes, compliance requirements, success metrics)
2. **HLD** — `explore/hlds/[slug]-hld.md` (architecture type, component boundaries, integration points, tech stack)
3. **Architecture decisions** — `explore/decisions/` (ADRs affecting deployment, infrastructure, or operations)
4. **Tech stack** — Languages, frameworks, build tools (from HLD or `explore/tooling.md`)
5. **Slug** — Project identifier for file naming

**Optional inputs** (enhance recommendations if available):
- Existing CI/CD pipeline configuration or workflow files
- Existing test strategy (`explore/explore-[slug]/test-strategy.md`)
- Existing path-to-production section
- Cloud platform constraints or preferences
- Regulatory or compliance requirements
- Team size, structure, and DevOps maturity level

**STOP**: If PRD or HLD do not exist, the DevOps strategy cannot be properly grounded. Complete those artifacts first or flag the gap to the steering team.

## Process Steps

| Step | File | Purpose |
|------|------|---------|
| 1 | [01-load-context.md](./steps/01-load-context.md) | Read PRD, HLD, ADRs, tech stack; extract DevOps drivers |
| 2 | [02-assess-context.md](./steps/02-assess-context.md) | Assess system scale, criticality, team maturity, and constraints via user questions |
| 3 | [03-design-pipeline.md](./steps/03-design-pipeline.md) | Design CI/CD pipeline stages with quality gates and feedback loops |
| 4 | [04-design-environments.md](./steps/04-design-environments.md) | Design environment model and Infrastructure as Code approach |
| 5 | [05-design-release-strategy.md](./steps/05-design-release-strategy.md) | Design release strategy, progressive delivery, rollback, and feature flags |
| 6 | [06-design-observability.md](./steps/06-design-observability.md) | Design observability stack, SLOs, alerting, and incident response |
| 7 | [07-design-devsecops.md](./steps/07-design-devsecops.md) | Design DevSecOps integration and supply chain security |
| 8 | [08-design-governance.md](./steps/08-design-governance.md) | Design governance, policy-as-code, compliance, and audit trails |
| 9 | [09-dora-metrics.md](./steps/09-dora-metrics.md) | Define DORA metrics baselines, targets, and improvement loops |
| 10 | [10-write-document.md](./steps/10-write-document.md) | Write the DevOps strategy document using the template |
| 11 | [11-validation.md](./steps/11-validation.md) | Run completeness and consistency validation |

## Architecture Adaptation Matrix

The skill adapts recommendations based on architecture type extracted from HLD:

| Architecture Type | CI/CD Impact | Environment Impact | Observability Impact | Release Impact |
|-------------------|-------------|-------------------|---------------------|---------------|
| **Monolith** | Single pipeline; longer build times; full test suite per change | Fewer environments; simpler promotion | Application-level metrics; single log stream | Blue-green or rolling; longer rollback window |
| **Microservices** | Per-service pipelines; independent deployability; contract tests critical | Per-service ephemeral envs; service mesh in staging | Distributed tracing essential; per-service SLOs | Canary per service; independent rollback |
| **Event-driven** | Pipeline includes schema registry validation; async test patterns | Event broker in all environments; schema registry | Event flow tracing; dead letter queue monitoring | Schema-compatible deployments; expand-and-contract |
| **Modular monolith** | Single pipeline with module-scoped test stages | Shared environments; module isolation via feature flags | Module-tagged metrics; shared log stream | Feature flags per module; shared deployment |

## Output Format

```
explore/explore-[slug]/devops-strategy.md
```

**Template**: `templates/devops-strategy-template.md`
**References**: `references/best-practices.md`, `references/checklist.md`

**Complete Structure** (13 sections):
1. **Overview & Context** — System type, scale, risk posture, quality attributes, source documents
2. **CI/CD Pipeline Design** — Stages, triggers, durations, tooling, artifact management
3. **Quality Gates** — Per-stage gates with thresholds, failure policies, flaky test handling
4. **Testing Integration** — Pyramid layers mapped to pipeline stages (cross-ref test-strategy)
5. **Environment Strategy** — Environment topology, ephemeral environments, IaC provisioning
6. **Infrastructure as Code** — IaC approach, modules, policy gates, drift management
7. **Release & Deployment Strategy** — Progressive delivery, feature flags, rollback, hotfix path
8. **Observability & Incident Response** — Logging, metrics, tracing, SLOs, alerting, runbooks
9. **DevSecOps** — SAST/DAST, dependency scanning, container scanning, SBOM, secrets management
10. **Governance & Compliance** — Policy-as-code, audit trails, approval workflows, change management
11. **Developer Experience** — Local dev loop, self-service, golden paths, DX metrics
12. **DORA Metrics & Continuous Improvement** — Baseline, targets, measurement, improvement loops
13. **Risks & Open Questions** — Unresolved items, delivery risks, dependencies

## Explore Agent Mode

When this skill is invoked from within the `explore.agent` pipeline (Step 5, Part 2), the following adaptations apply. Since Part 2 runs after the PRD is written (Groups 1-4 complete), the full PRD is always available as a primary input.

### Upstream Artifact Acceptance

| Input | Source from Explore Agent | Location |
|-------|--------------------------|----------|
| PRD | Step 5 output (complete, signed off) | `explore/prds/[slug]-prd.md` |
| HLD | Step 4 Workstream B output | `explore/hlds/[slug]-hld.md` |
| ADRs | Step 4 Workstream B output | `explore/decisions/[slug]-adr-*.md` |
| Tech stack | HLD Section 6 | Extracted from HLD |
| Architecture type | HLD Section 2 | Extracted from HLD |
| Test strategy | Step 5a Part A output (if produced) | `explore/explore-[slug]/test-strategy.md` |
| Quality attributes | PRD Group 3 (NFRs) + HLD Section 8 | `explore/prds/[slug]-prd.md` |
| Deployment architecture | HLD Section 10 | Extracted from HLD |
| Monitoring baseline | HLD Section 11 | Extracted from HLD |
| Regulatory requirements | Step 2 output | `explore/explore-[slug]/regulatory-compliance.md` |
| Risk register | Step 4 Workstream C output | `explore/explore-[slug]/risks.md` |

### Test Strategy Alignment

If the test strategy was produced in Part 2 (before this skill runs), the DevOps strategy MUST:
- Read `explore/explore-[slug]/test-strategy.md`
- Align CI/CD pipeline quality gates with the test strategy's quality gate definitions
- Map pipeline stages to testing pyramid layers defined in the test strategy
- Ensure environment model supports the test strategy's test data and environment requirements

### Evidence Labeling (Explore Pipeline Consistency)

When running within explore.agent, every claim must be tagged:
- **OBS** (OBSERVED) — directly evidenced in an Explore artifact
- **INF** (INFERRED) — inferred from patterns across artifacts
- **ASM** (ASSUMED) — filling a gap; never present as fact

### Output Location

When invoked from explore.agent Step 5 Part 2, output is written to:
```
explore/explore-[slug]/devops-strategy.md
```

This document is referenced by Step 5 Group 3 (Quality Definition) in the PRD.

## Integration with Workflows

**Consumes**:
- **PRD Generation** (`explore.proc.prd-generation`) — NFRs and compliance requirements drive DevOps scope
- **Architecture Solutioning** (`explore.proc.architecture-solutioning`) — System architecture drives pipeline design and environment model
- **Test Strategy** (`explore.proc.test-strategy`) — Quality gates and pipeline stages align with testing pyramid
- **Technical Feasibility** (`explore.proc.technical-feasibility`) — Infrastructure constraints affect IaC and environment choices
- **Risk Documentation** (`explore.proc.risk-documentation`) — Delivery and operational risks feed into DevOps risk section

**Produces** (consumed by):
- **Architecture Solutioning** (`explore.proc.architecture-solutioning`) — DevOps strategy feeds HLD Section 10 (Operational Concerns)
- **Epic Forming** (`explore.proc.epic-forming`) — DevOps setup becomes its own epic or contributes to infrastructure epics
- **Explore Agent Step 5 Part 2** — DevOps strategy produced as optional activity after PRD Groups 1-4, before epic forming

## Best Practices

**Do**:
- ✅ Ground the strategy in the actual PRD and HLD (not generic templates)
- ✅ Adapt recommendations to architecture type, scale, and team maturity
- ✅ Define measurable thresholds for every quality gate
- ✅ Align CI/CD pipeline stages with the testing pyramid
- ✅ Design for fast feedback — seconds for lint, minutes for tests, minutes for deploy
- ✅ Shift security left — automate scanning in the earliest pipeline stage possible
- ✅ Include observability from day one — not as an afterthought
- ✅ Define DORA metrics baselines and improvement targets
- ✅ Make rollback a first-class operation with defined SLOs
- ✅ Treat IaC with the same rigour as application code (PR review, testing, policy gates)

**Don't**:
- ❌ Write a generic DevOps strategy disconnected from project specifics
- ❌ Over-engineer for scale the project doesn't need (yet)
- ❌ Assume a specific cloud provider without confirming constraints
- ❌ Skip environment strategy — "it works on my machine" is not a strategy
- ❌ Ignore developer experience — slow inner loops kill productivity
- ❌ Define security as a separate phase — it must be integrated into every pipeline stage
- ❌ Set targets without a measurement plan
- ❌ Forget incident response — observability without runbooks is incomplete
- ❌ Treat policy-as-code as optional for regulated industries (insurance, finance, healthcare)

If you propose changes, keep them minimal and clearly scoped.

## Completeness Checklist

**Post-edit**: Re-run this checklist after any modification to the output artifact.

- [ ] All 13 strategy sections populated per template
- [ ] Recommendations adapted to architecture type from HLD
- [ ] CI/CD pipeline stages defined with quality gates and thresholds
- [ ] Environment model documented with promotion flow
- [ ] DORA metrics baselines and targets defined
- [ ] Observability strategy covers logs, metrics, traces, and alerting
- [ ] DevSecOps integrated into pipeline stages
- [ ] Test strategy alignment verified (if test-strategy.md exists)

## Gotchas

- ⚡ **Over-engineering for scale**: The agent defaults to microservices-grade DevOps (per-service pipelines, service mesh, canary deployments) even for monoliths or early-stage products. Always check the architecture type from the HLD before recommending infrastructure complexity — a monolith needs one pipeline, not twelve.
- ⚡ **Cloud provider assumption**: The agent tends to assume AWS or a specific cloud provider when writing IaC and observability sections. If the HLD or project constraints don't specify a provider, ask explicitly — never default to a provider without confirmation.
- ⚡ **Test strategy misalignment**: When the test strategy is produced before this skill runs (in Explore Agent Step 5 Part 2), the agent sometimes writes quality gates that contradict the test strategy's definitions. Always read `test-strategy.md` first and cross-reference every quality gate threshold against the test strategy's coverage targets.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.define-devops-strategy:0.1.3:2026-09-01T09:19:01Z -->
