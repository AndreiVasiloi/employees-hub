# Test Strategy: Employee Hub

| Version | Date | Author | Changes |
| --- | --- | --- | --- |
| 0.1 | 2026-09-01 | Dava.Flow with Sponsor/Andrei | Initial strategy |

## 1. Overview

This business-critical strategy verifies Employee Hub’s leave workflow, balances, authorization, auditability, and accessible UI before implementation increments are accepted. `[OBS: PRD; HLD]`

**In scope:** R-001–R-017, NFR-001–NFR-020, five backend modules, Angular P0 flows, and all selected non-functional testing. **Out:** payroll/recruitment/performance, real data, external delivery channels, and real IdP/Rancher integration until contracts exist. `[OBS]`

Principles: pyramid; automate every testable behavior; push tests down; no duplicated assertions; fast feedback; test code is production code; numeric targets are floors. `[INF]`

Sources: [PRD](../prds/employee-hub-prd.md), [HLD](../hlds/employee-hub-hld.md), ADR-001–006, and [accessibility specs](../design/accessibility-employee-hub.md).

## 2. Testing Pyramid

| Layer | Floor | Scope | Duration |
| --- | ---: | --- | --- |
| Unit | 70–80% | Rules, calculation, lifecycle, authorization, ledger/outbox, UI components | <2 min |
| Integration | 20–30% | PostgreSQL/TypeORM, APIs, auth adapter, outbox worker | <10 min |
| Contract | 0–5% | Angular–NestJS OpenAPI schema validation | <2 min |
| E2E | 5–10% | Five critical journeys only | <30 min |

Unit <60%, E2E >15%, flaky >1%, or PR feedback >20 minutes are red flags. `[INF]`

## 3. Unit Testing

Use Jest for NestJS and Vitest + Angular Testing Library for Angular. A unit is an isolated function/class/component; database, network, filesystem, and provider calls are mocked. Use AAA/Given-When-Then, factories, independent tests, and `should_[expected]_when_[condition]` naming. `[OBS: approved tooling]`

Coverage floors: ≥90% line, ≥85% branch, ≥95% public-function coverage; Workflow & Balances, Access, calculation, and audit logic target ≥95% line/≥90% branch. `[OBS]`

## 4. Integration Testing

Use Jest + Supertest + Testcontainers PostgreSQL. Test migrations, scoped queries, transactions, idempotency/version/lock conflicts, serialization, authorization matrix, audit/outbox persistence, and worker retry/claim behavior. Every boundary has happy, error, and edge scenarios. `[OBS: ADR-001–004]`

## 5. Contract Testing

Generate OpenAPI from NestJS Swagger and validate it with Spectral in CI. Angular consumes the approved HTTP contract; internal module collaboration is covered by integration tests. Future IdP adapter contracts are added when a provider is selected. `[OBS]`

## 6. E2E Testing

Use Playwright with explicit condition waits and no sleeps; flaky target <1%, quarantine immediately, fix within one sprint. `[OBS]`

1. Employee preview/submit → Manager approval → committed balance/status.
2. Employee preview/submit → Manager rejection → recovery guidance.
3. HR readiness configuration → Employee preview.
4. HR balance adjustment → audit investigation.
5. Administrator account/role change → permitted and denied access.

## 7. Non-Functional Testing

- Performance: k6 against NFR-001/002 targets, in shared staging when available.
- Security: `npm audit`, dependency scan, Trivy image scan, authorization negative matrix, ZAP baseline in shared staging.
- Accessibility: axe-core with Playwright plus keyboard/NVDA evidence per accessibility specification.
- Compatibility: Playwright Chromium, Firefox, WebKit; responsive P0 checks. `[OBS]`

## 8. Test Data & Environments

All data is fictional and version-controlled. Factories/builders create isolated unit data; integration tests seed then rollback/truncate Testcontainers PostgreSQL; E2E uses deterministic seeds/accounts for policies, calendars, balances, relationships, overlaps, and concurrency. `[OBS]`

| Environment | Tests | Infrastructure |
| --- | --- | --- |
| Local | Unit + narrow integration | Developer machine/Testcontainers |
| GitHub Actions | Unit + integration + contract | Ephemeral runners/containers |
| Shared staging | E2E + k6 + ZAP | Rancher when BLK-002 resolves |
| Production-like | Smoke only | Only after verified runtime exists |

## 9. CI/CD Integration

1. Push/PR: lint, format, unit, coverage (<3 min); failure blocks merge.
2. PR: integration, OpenAPI, security checks (<10 min); failure blocks merge.
3. Main: build and package image (<5 min); failure blocks deployment.
4. Staging: E2E, accessibility, performance, security (<30 min); failure blocks promotion.
5. Post-deploy: health/readiness and critical smoke; alert and rollback/hotfix decision on failure.

PR gates require 100% test pass, coverage floors on changed business logic, zero lint violations, and no new high/critical dependency issue. `[OBS]`

## 10. Metrics & Success Criteria

Every integration boundary has happy/error/edge coverage; all five E2E journeys are automated. Track suite duration, coverage, flaky ratio <1%, defect escape <3%, test-maintenance <20%, and DORA baselines once shared deployment exists. Targets are floors. `[OBS]`

## 11. Risks and Mitigations

| Risk | Mitigation |
| --- | --- |
| Flaky E2E | Quarantine, ticket, fix within one sprint; push assertions down. |
| Test data drift | Versioned factories/seeds and resettable environments. |
| Identity/Rancher contracts unknown | Stubs/contract tests now; real integration once blockers resolve. |
| Transaction/concurrency defects | Real PostgreSQL integration and fault/retry/concurrent-command suites. |
| Accessibility gap | Automated checks plus required manual evidence; record unavailable mobile-device coverage. |

## 12. References

- [PRD](../prds/employee-hub-prd.md)
- [HLD](../hlds/employee-hub-hld.md)
- [ADRs](../decisions/)
- [Accessibility specifications](../design/accessibility-employee-hub.md)
