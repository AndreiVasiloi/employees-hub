+++
name = "explore.proc.test-strategy"
description = "Use this skill when you need to define a test strategy following the testing pyramid — specifying automation at every layer (unit, integration, contract, E2E), coverage targets, tooling, and CI/CD quality gates grounded in PRD and HLD context. Also relevant when someone says 'how should we test this,' 'define the test approach,' or 'what's our quality strategy.' Does NOT execute tests or write test code — it defines the strategy that implementation follows."
license = "Proprietary. See LICENSE.md"
+++

# Test Strategy

Define a comprehensive, automation-maximised test strategy grounded in the testing pyramid. Reads existing PRD, HLD, and architecture decisions to propose a strategy tailored to the project's tech stack, risk profile, and quality goals. The goal is to automate as close to 100% of test execution as possible — manual testing is reserved exclusively for exploratory sessions.

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## When to Use

Use this skill when you need to:
- Define a test strategy for a new product or major feature
- Establish testing pyramid layer definitions with automation at every level
- Select testing frameworks and tooling per layer
- Set coverage targets and quality gate metrics
- Integrate testing into CI/CD deployment pipelines
- Define test data and environment strategies
- Create risk-based test prioritisation

**Key principle**: A good test strategy follows the testing pyramid — many fast unit tests at the base, fewer integration tests in the middle, and minimal high-value E2E tests at the top. Every layer **must** be fully automated. Manual testing is reserved for exploratory sessions only. All numeric targets in this skill are **floors, not ceilings** — teams should exceed them wherever the risk profile justifies it, and high-risk or regulated modules should aim for near-complete coverage.

## Pre-Check

If a test strategy already exists at `explore/explore-[slug]/test-strategy.md`:
1. Load the existing strategy
2. Present to the steering team: "Existing test strategy found. Review and update, or create fresh?"
3. If updating → load existing content and skip to Step 9 (validation) for review
4. If creating fresh → proceed from Step 1

## Inputs to Request (if missing)

Before defining the test strategy, ensure you have:

1. **PRD** — `explore/prds/[slug]-prd.md` (functional requirements, acceptance criteria, NFRs)
2. **HLD** — `explore/hlds/[slug]-hld.md` (architecture, component boundaries, integration points)
3. **Architecture decisions** — `explore/decisions/` (ADRs affecting testability)
4. **Tech stack** — Languages, frameworks, build tools (from HLD or `explore/tooling.md`)
5. **Slug** — Project identifier for file naming

**Strongly recommended**:
- **Accessibility specs** — `explore/design/accessibility-[slug].md` (a11y test cases: keyboard, screen reader, contrast, touch targets)
- **Architecture drivers** — `explore/explore-[slug]/architecture-drivers.md` (quality attribute priorities for risk-based test allocation)

**Optional inputs**:
- Existing test infrastructure or CI/CD pipeline configuration
- Team testing experience and capacity
- Regulatory or compliance testing requirements (`explore/explore-[slug]/regulatory-compliance.md`)
- Performance SLAs or NFR targets from PRD

**STOP**: If PRD or HLD do not exist, the test strategy cannot be properly grounded. Complete those artifacts first or flag the gap to the steering team.

## Process Steps

| Step | File | Purpose |
|------|------|---------|
| 1 | [01-load-context.md](./steps/01-load-context.md) | Read PRD, HLD, ADRs, and tech stack; extract testability drivers |
| 2 | [02-assess-scope-risk.md](./steps/02-assess-scope-risk.md) | Assess testing scope and risk profile via user questions |
| 3 | [03-define-pyramid-layers.md](./steps/03-define-pyramid-layers.md) | Define each testing pyramid layer with targets and ownership |
| 4 | [04-automation-tooling.md](./steps/04-automation-tooling.md) | Select automation frameworks and tooling per layer |
| 5 | [05-test-data-environments.md](./steps/05-test-data-environments.md) | Define test data strategy and environment topology |
| 6 | [06-cicd-quality-gates.md](./steps/06-cicd-quality-gates.md) | Define CI/CD pipeline integration and quality gates |
| 7 | [07-metrics-coverage.md](./steps/07-metrics-coverage.md) | Set coverage targets, KPIs, and success metrics |
| 8 | [08-write-document.md](./steps/08-write-document.md) | Write the test strategy document |
| 9 | [09-validation.md](./steps/09-validation.md) | Run completeness validation |

## Testing Pyramid Reference

```
         /\
        /  \         E2E Tests (5-10%)
       / E2E\        Critical user journeys only
      /------\       Slow, expensive, high confidence
     /Contract\      Contract Tests (optional layer)
    /----------\     API contract validation between services
   /Integration \    Integration Tests (20-30%)
  /--------------\   DB, API, message queue boundaries
 / Unit Tests   \  Unit Tests (70-80%)
/------------------\ Fast, isolated, business logic focused
```

**All targets are FLOORS, not ceilings.** High-risk, regulated, or business-critical modules should exceed these minimums significantly. The ambition is near-complete automated coverage — every testable behaviour should have an automated assertion.

**Core principles** (from Fowler, Cohn, modern practice):
- **Push tests down**: If a condition can be tested at a lower level, test it there
- **No duplication across layers**: Each layer tests what the layer below cannot
- **Automate everything**: Manual testing is exploratory only
- **Fast feedback**: Unit + narrow integration tests run in seconds, not minutes
- **Pyramid not ice-cream cone**: Resist the temptation to write mostly E2E tests

## Output Format

```
explore/explore-[slug]/test-strategy.md
```

**Template**: `templates/test-strategy-template.md`

**Complete Structure** (9 sections):
1. **Overview** — Purpose, scope, guiding principles
2. **Testing Pyramid** — Layer definitions, distribution targets, rationale
3. **Unit Testing** — Scope, patterns, frameworks, coverage targets
4. **Integration Testing** — Boundaries tested, patterns, frameworks, data strategy
5. **Contract Testing** — Consumer/provider contracts, tooling (if multi-service)
6. **E2E Testing** — Critical journeys, framework, environment, stability approach
7. **Test Data & Environments** — Data strategy, environment topology, isolation
8. **CI/CD Integration** — Pipeline stages, quality gates, feedback loops
9. **Metrics & Success Criteria** — Coverage targets, KPIs, red flags

## Explore Agent Mode

When this skill is invoked from within the `explore.agent` pipeline (Step 5, Part 2), the following adaptations apply. Since Part 2 runs after the PRD is written (Groups 1-4 complete), the full PRD is always available as a primary input.

### Upstream Artifact Acceptance

| Input | Source from Explore Agent | Location |
|-------|--------------------------|----------|
| PRD | Step 5 output (complete, signed off) | `explore/prds/[slug]-prd.md` |
| HLD | Step 4 Workstream B output | `explore/hlds/[slug]-hld.md` |
| ADRs | Step 4 Workstream B output | `explore/decisions/[slug]-adr-*.md` |
| Tech stack | HLD Section 6 | Extracted from HLD |
| Component boundaries | HLD Section 3 | Extracted from HLD |
| Quality attributes | PRD Group 3 (NFRs) + HLD Section 8 | `explore/prds/[slug]-prd.md` |
| Risk register | Step 4 Workstream C output | `explore/explore-[slug]/risks.md` |
| Regulatory requirements | Step 2 output | `explore/explore-[slug]/regulatory-compliance.md` |
| Accessibility specs | Step 4 Activity 5 output | `explore/design/accessibility-[slug].md` |
| Architecture drivers | Step 2 Phase A output | `explore/explore-[slug]/architecture-drivers.md` |
| Acceptance criteria | PRD Group 3 | Extracted from PRD |

### Evidence Labeling (Explore Pipeline Consistency)

When running within explore.agent, every claim must be tagged:
- **OBS** (OBSERVED) — directly evidenced in an Explore artifact
- **INF** (INFERRED) — inferred from patterns across artifacts
- **ASM** (ASSUMED) — filling a gap; never present as fact

### Output Location

When invoked from explore.agent Step 5 Part 2, output is written to:
```
explore/explore-[slug]/test-strategy.md
```

This document is referenced by Step 5 Group 3 (Quality Definition) in the PRD.

## Integration with Workflows

**Consumes**:
- **PRD Generation** — Acceptance criteria and NFRs drive test scope
- **Architecture Documentation / HLD** — Component boundaries define integration test surface
- **Technical Feasibility** — Technical constraints affect testability
- **Risk Documentation** — High-risk areas get deeper test coverage
- **Accessibility Specifications** (`explore.proc.accessibility-specifications`) — A11y test cases (keyboard, screen reader, contrast, touch targets)
- **Architecture Drivers** — Quality attribute priorities for risk-based test allocation
- **Explore Agent Step 5 Part 2** — Test strategy produced as optional activity after PRD Groups 1-4, before epic forming

**Consumed by**:
- **Task Planning** — Test approach per task references the strategy
- **Task Implementation** — TDD execution follows the strategy's layer definitions
- **Task Review** — Reviewers check test coverage against strategy targets

## Best Practices

**Do**:
- ✅ Ground the strategy in the actual PRD and HLD (not generic templates)
- ✅ Define automation at every pyramid layer
- ✅ Set ambitious coverage targets per layer (floors, not ceilings)
- ✅ Align tooling with the project's tech stack
- ✅ Include contract tests for multi-service architectures
- ✅ Define test data strategies (factories, fixtures, seeding)
- ✅ Integrate quality gates into CI/CD pipeline stages
- ✅ Prioritise test effort by risk (high-risk areas get more coverage)
- ✅ Keep E2E tests to critical user journeys only

**Don't**:
- ❌ Write a generic strategy disconnected from project specifics
- ❌ Skip integration tests (the "forgotten layer" — Cohn)
- ❌ Build an ice-cream cone (mostly E2E, few unit tests)
- ❌ Duplicate test conditions across layers
- ❌ Ignore test data management (tests fail when data is wrong)
- ❌ Set low coverage targets as an excuse to skip testing
- ❌ Treat coverage floors as ceilings — always push higher where risk justifies it
- ❌ Forget flaky test management (quarantine + fix, never ignore)
- ❌ Treat test code as second-class (same quality as production code)

## Completeness Checklist

**Post-edit**: Re-run this checklist after any modification to the output artifact.

- [ ] All 9 strategy sections populated per template
- [ ] Testing pyramid distribution defined (unit 70–80%, integration 20–30%, E2E 5–10%)
- [ ] Automation framework selected per layer
- [ ] Coverage targets stated as floors (not ceilings)
- [ ] CI/CD quality gates defined with measurable thresholds
- [ ] Test data strategy documented
- [ ] High-risk modules identified for deeper coverage

## Gotchas

- ⚡ **Ice-cream cone inversion**: The agent tends to write more E2E tests than unit tests when requirements are described as user journeys. Always check the pyramid distribution before finalizing — if E2E exceeds 15% of total test effort, push conditions down to lower layers.
- ⚡ **Coverage target as ceiling**: Teams treat the strategy's floor targets (e.g., 70% unit coverage) as ceilings and stop there. Always state explicitly that targets are minimums — high-risk or regulated modules should aim for near-complete coverage.
- ⚡ **Tool assumption drift**: The agent recommends testing frameworks based on training data that may predate the project's actual stack versions. Always verify framework compatibility with the tech stack from the HLD before committing to specific tooling choices.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.test-strategy:0.2.1:2026-09-01T09:06:28Z -->
