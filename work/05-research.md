# Research Findings: EH0003

## Search Terms

- provider-neutral identity adapter
- fixed-role authorization matrix
- organization and reporting-line scope
- audit attribution and correlation IDs
- negative authorization testing

## Decision Inventory

| Decision ID | Status   | Key Requirement                                                                                                                                              | Link                                                                                          |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| ADR-003     | Accepted | Keep identity provider-neutral: use an OIDC/JWT-shaped adapter and a fictional local identity stub; do not select or integrate a real provider in this task. | [ADR-003](../explore/decisions/employee-hub-adr-003-provider-neutral-identity-adapter.md)     |
| ADR-006     | Accepted | Use explicit fixed-role permissions. Administrator breadth must not bypass self-approval or audit/ledger immutability.                                       | [ADR-006](../explore/decisions/employee-hub-adr-006-explicit-fixed-role-permission-matrix.md) |
| ADR-001     | Accepted | Use TypeORM with PostgreSQL migrations and preserve explicit transaction control for later critical commands.                                                | [ADR-001](../explore/decisions/employee-hub-adr-001-typeorm-postgresql-migrations.md)         |
| ADR-002     | Accepted | Keep later command idempotency, versioning, and targeted-lock work compatible with the access and persistence boundaries.                                    | [ADR-002](../explore/decisions/employee-hub-adr-002-idempotency-versioning-locks.md)          |

## Related Tasks

| Task ID | Status                                    | Relationship                                                                                                                                                     | Link                                                                                                     |
| ------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| EH0002  | 04-implementing (implementation complete) | Supplies the NestJS, TypeORM, PostgreSQL, Vitest, and CI foundation. It explicitly excludes identity and authorization, making EH0003 the next E1 boundary task. | [EH0002 task](../work/04-implementing/EH0002-scaffold-employee-hub-applications-and-local-quali/task.md) |
| EH0001  | 05-pending-completion                     | Formed the E1–E6 epic structure and established Govern task decomposition; it has no implementation dependency for EH0003.                                       | [EH0001 task](../work/05-pending-completion/EH0001-form-employee-hub-epics/task.md)                      |

No other task under implementation, pending completion, or completed stages matches the identity/authorization boundary closely enough to add a dependency.

## Documentation References

| Document              | Relevance                                                                                                                                                                                   | Link                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Employee Hub HLD      | Defines the Access bounded context, server-owned identity and organization scope, fixed-role authorization, safe rejection, and correlation-aware observability.                            | [HLD](../explore/hlds/employee-hub-hld.md)                                        |
| Employee Hub PRD      | Defines R-009 organization/permission enforcement, R-010 traceable sensitive actions, R-011 reporting lines, R-017 explicit Administrator permissions, and NFR-004/NFR-005/NFR-011.         | [PRD](../explore/prds/employee-hub-prd.md)                                        |
| Technical Feasibility | Identifies provider claims and role mapping as open risks, and requires server-side authorization, organization isolation, safe errors, and negative tests.                                 | [Technical feasibility](../explore/explore-employee-hub/technical-feasibility.md) |
| Test Strategy         | Requires unit, API/integration, and adversarial authorization-matrix coverage; the repository implementation uses Vitest instead of the document's older Jest wording.                      | [Test strategy](../explore/explore-employee-hub/test-strategy.md)                 |
| E1 Epic               | Sets the scope: secure fictional workforce foundation, organization/role/reporting-line authorization, safe errors, and foundational audit/telemetry; excludes the final external provider. | [EH-E1](../explore/epics/EH-E1-secure-workforce-foundation.md)                    |

## Conflicts and Gaps

| Conflict/Gap                                 | Description                                                                                                                                                                 | Resolution                                                                                                                                                                                                        |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Provider claims remain open                  | The final identity provider, claim names, token/session model, and account-linking lifecycle are not selected.                                                              | Implement a narrow provider-neutral adapter contract with a deterministic fictional stub and contract tests for valid, absent, invalid, expired, and unlinked identities. Keep provider selection outside EH0003. |
| Administrator breadth versus least privilege | The product direction says Administrator can access every feature, while the approved architecture prohibits bypasses for self-approval and immutable audit/ledger history. | Treat ADR-006 as authoritative: encode explicit permissions and negative tests for the prohibited actions; do not implement an implicit superuser bypass.                                                         |
| Exact permission matrix is not yet written   | Existing documents define role boundaries but do not provide a complete route/action matrix for this increment.                                                             | Define the EH0003 matrix as part of planning and link each permission to a server-side policy test. Unspecified business capabilities remain future-task scope.                                                   |
| Test-strategy runner wording is stale        | The Explore test strategy mentions Jest, while the approved repository baseline uses Vitest for Angular and NestJS.                                                         | Follow the repository's current Vitest commands and retain the strategy's behavioral requirements (unit, integration, and negative matrix coverage).                                                              |
| Task-stage references can drift              | Dava.Flow moves task directories and updates metadata, so older relative links/status text may become stale.                                                                | Revalidate links and status during task finalization; use Dava.Flow for all stage transitions.                                                                                                                    |
