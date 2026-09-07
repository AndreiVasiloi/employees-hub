# Integration Verification: EH0004 — Team Creation Repository Increment

## Scope

Verification now covers team and employee repositories, separate team and
employee controllers, authorization boundaries, access relationships, health,
and migration sequencing.

## Data Persistence

- [x] `PostgresWorkforceRepository.createTeam` uses the TypeORM `DataSource`
      query boundary and a parameterized PostgreSQL `INSERT ... RETURNING` query.
- [x] `PostgresWorkforceRepository.getTeam` uses the same query boundary and
      scopes its lookup by both team ID and server-supplied organization ID.
- [x] `PostgresWorkforceRepository.listTeams` scopes its query by organization
      ID and passes explicit pagination values to PostgreSQL.
- [x] `PostgresWorkforceRepository.updateTeam` scopes writes by team ID and
      organization ID, and enforces optimistic concurrency with `expectedVersion`.
- [x] A zero-row version-constrained update is converted to a stable domain
      conflict, ready for later controller mapping to HTTP 409.
- [x] Employee creation validates account activity and organization ownership
      in the database query, and only accepts an active same-organization team.
- [x] Cross-organization accounts produce no insert row and are mapped to the
      same safe validation error used for other unavailable account/team inputs.
- [x] The application database configuration supplies PostgreSQL connection
      settings and keeps `synchronize: false`.
- [x] The workforce migration defines the `teams` table consumed by the query.
- [x] A live PostgreSQL execution passed through Testcontainers using
      `postgres:18.6-alpine`; the access and workforce migrations apply cleanly in
      sequence.

## Other Diagram Connections

- [x] Team and employee controllers resolve server-side access context, enforce
      fixed-role permissions, and delegate to separate feature services.
- [x] Workforce mutations emit structured authorization audit events through
      the existing in-memory `AuditPort`; durable persistence remains EH0006.
- [x] No event producer, event consumer, or external HTTP client is required
      for this increment.

## Status

The implementation uses real PostgreSQL persistence through TypeORM's
`DataSource`, explicit migrations with `synchronize: false`, and Docker-backed
Testcontainers verification.
