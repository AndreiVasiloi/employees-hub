# Problem Capture

## Problem Statement

Employee Hub has a runnable application foundation, but it must not expose
employee or organization information until identity and authorization are
server-owned and consistently enforced.

The desired state is a provider-neutral local identity contract for fictional
users, fixed Employee/Manager/HR/Administrator roles, organization and
reporting-line boundaries, safe unauthorized responses, and attributable audit
evidence. This is needed now because all later workforce and leave capabilities
depend on a trustworthy access boundary.

## Stakeholders

- **Andrei — Product Manager, Architect, Developer:** owns the learning scope,
  architecture decisions, and implementation review.
- **Employee:** needs access only to permitted self-service information.
- **Manager:** needs scoped access to direct reports and manager actions.
- **HR:** needs authorized workforce administration access.
- **Administrator:** needs organization-level administrative access.
- **Future reviewers:** need clear positive and negative authorization evidence.

## Affected Components

- [ ] Manager
- [x] Server
- [x] App
- [x] Cross-cutting

The server owns identity resolution and authorization. The application consumes
the resulting safe access outcomes and must not become an authorization source.

## Initial Questions

- [ ] What is the exact local identity contract and identity lifecycle?
- [ ] Which identity fields come from the adapter, and which are resolved by
      the server?
- [ ] How are absent, invalid, expired, and unlinked identities represented?
- [ ] What minimum fields may each fixed role view or operate on?
- [ ] How is a manager's direct-report relationship represented and validated?
- [ ] Which audit fields and correlation identifiers are mandatory?
- [ ] Which protected endpoint or service boundary should be implemented first?

## Existing Context

- [EH-E1 Secure Workforce Foundation](../../../../explore/epics/EH-E1-secure-workforce-foundation.md)
- [Employee Hub HLD](../../../../explore/hlds/employee-hub-hld.md)
- [ADR-003 Provider-Neutral Identity Adapter](../../../../explore/decisions/employee-hub-adr-003-provider-neutral-identity-adapter.md)
- [ADR-006 Fixed-Role Permission Matrix](../../../../explore/decisions/employee-hub-adr-006-explicit-fixed-role-permission-matrix.md)
- [EH0002 implementation summary](../../../../work/06-completed/EH0002-scaffold-employee-hub-applications-and-local-quali/summary.md)
