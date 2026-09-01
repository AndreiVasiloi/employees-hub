# Architecture Engagement Brief: Employee Hub

**Slug**: employee-hub  
**Date**: 2026-09-01  
**Explore type**: Diverge-Converge — comprehensive architecture package  
**Status**: Pending architecture-scope confirmation

## Scope

Design the greenfield Employee Hub modular-monolith architecture and its supporting HLD, decisions, boundary map, truth hierarchy, and blockers. The application is limited to fictional employee leave management; it does not include payroll, recruitment, performance management, or formal legal-compliance features. `[OBS: architecture-context.md#1; #5]`

## Evidence Inputs

| Input | Status | Notes |
| --- | --- | --- |
| PRD | Approved | 17 functional requirements (R-001–R-017) and 20 non-functional requirements (NFR-001–NFR-020). `[OBS: employee-hub-prd.md]` |
| Architecture context | Validated | Greenfield baseline, 8 ranked drivers, 17 constraints, domain boundaries, and open questions. `[OBS: architecture-context.md]` |
| Domain profile | Approved | Persistent vocabulary, concerns, authority patterns, and quality priorities. `[OBS: persistent-knowledge/employee-leave-management-profile.md]` |
| Experience design | Approved | IA, flows, wireframes, usability plan, and accessibility specification. `[OBS: explore/design/]` |
| Ideation | Approved | Three refined concepts seed explainable preview, reliable workflow, and readiness. `[OBS: ideation/employee-hub-refined-concepts.md]` |

## Priorities and Constraints

1. Atomic request, balance, and audit outcomes. `[OBS]`
2. Server-enforced organization isolation and fixed-role authorization. `[OBS]`
3. Explainable, historically reproducible working-day calculation. `[OBS]`
4. Immutable audit and balance history. `[OBS]`
5. Angular/NestJS/PostgreSQL modular monolith, deployed to Rancher when environment facts permit. `[OBS]`

## Stakeholders and Governance

- Sponsor / Lead Engineer: technical and delivery authority. `[OBS: context.md]`
- Andrei, Product Manager: product scope/outcomes authority. `[OBS: context.md]`
- Andrei, Architect: architecture review authority. `[OBS: context.md]`
- Future HR reviewer: validates leave-policy practice before policy implementation. `[OBS: domain-analysis.md]`

## Hardening Scope

BASE hardening: boundary integrity, cross-view consistency, failure-mode analysis, and contract completeness. Extended focus: security/threat model, auditability, latency, accessibility, and operational readiness. `[INF: architecture-context.md#3; accessibility-employee-hub.md]`

## Known Inputs to Carry Forward

Identity/account linking, supported versions, Rancher/GitHub capabilities, historical configuration semantics, and final leave-policy details remain unresolved; persistence/concurrency choices are accepted in ADR-001 and ADR-002. `[OBS: architecture-context.md#6; ADR-001; ADR-002]`
