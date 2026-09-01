# DevOps Strategy Completeness Checklist

Use this checklist when reviewing or validating a DevOps strategy document.

## CI/CD Pipeline
- [ ] Pipeline stages defined with triggers and duration targets
- [ ] Quality gates at each stage with measurable thresholds
- [ ] Failure policies documented per gate
- [ ] Flaky test policy defined
- [ ] Artifact strategy defined (build once, promote everywhere)
- [ ] Pipeline-as-code (version-controlled pipeline definitions)

## Testing Integration
- [ ] Test pyramid layers mapped to pipeline stages
- [ ] Coverage targets per layer
- [ ] Test strategy cross-referenced (if exists)
- [ ] No duplication between DevOps and test strategy quality gates

## Environment Strategy
- [ ] Environment topology defined (local, CI, staging, prod)
- [ ] Environment purpose, data, and users documented per env
- [ ] Ephemeral environment strategy (if Standard/Enterprise profile)
- [ ] Environment parity rules documented
- [ ] No shared databases across environments
- [ ] Production credentials separated from non-prod

## Infrastructure as Code
- [ ] IaC tool selected with rationale
- [ ] IaC pipeline defined (validate, plan, policy check, apply, verify)
- [ ] Reusable module strategy defined
- [ ] Drift detection and management documented
- [ ] No manual infrastructure changes (break-glass exceptions documented)

## Release & Deployment
- [ ] Deployment style selected with rationale
- [ ] Progressive delivery defined (if Standard/Enterprise profile)
- [ ] Feature flag strategy and lifecycle documented
- [ ] Application rollback mechanism defined with RTO
- [ ] Database rollback strategy defined
- [ ] Hotfix path documented
- [ ] Rollback ownership and triggers defined

## Observability
- [ ] Structured logging defined (format, fields, retention)
- [ ] Metrics defined (RED + USE + business metrics)
- [ ] Distributed tracing defined (standard, sampling, tooling)
- [ ] SLOs defined per critical user journey
- [ ] Error budget policy defined
- [ ] Alerting severity matrix defined
- [ ] Every alert is actionable (no noise alerts)
- [ ] Dashboards defined per audience

## Incident Response
- [ ] On-call rotation defined
- [ ] Escalation path documented
- [ ] Runbooks linked to P1/P2 alerts
- [ ] Post-incident review process defined
- [ ] Blameless retrospective culture specified

## DevSecOps
- [ ] Shift-left security checks mapped to pipeline stages
- [ ] Secret detection (pre-commit + CI)
- [ ] Dependency vulnerability scanning
- [ ] Container image scanning (if containers used)
- [ ] SBOM generation at build time
- [ ] DAST on staging environment
- [ ] Secrets management strategy defined (store, injection, rotation)
- [ ] Vulnerability triage SLAs defined
- [ ] Supply chain security (signing, provenance) — if Enterprise profile
- [ ] Compliance automation (if regulatory requirements exist)

## Governance
- [ ] Policy-as-code framework defined
- [ ] Policies categorised (security, compliance, cost, quality, operational)
- [ ] Approval workflows per change type
- [ ] Segregation of duties for production (if regulated)
- [ ] Audit trail requirements documented
- [ ] Audit evidence package per release defined
- [ ] Branch strategy selected with rationale
- [ ] Change management integration (if CAB/ITIL applies)

## Developer Experience
- [ ] Local development setup time targeted
- [ ] Self-service capabilities defined
- [ ] DX metrics defined (build time, PR review time, provisioning time)
- [ ] Golden paths defined or planned

## DORA Metrics
- [ ] Four DORA metrics defined with baselines and targets
- [ ] Extended metrics defined (DX + operational health)
- [ ] Measurement infrastructure identified
- [ ] Continuous improvement loops defined (sprint, monthly, quarterly)
- [ ] Maturity roadmap with phases and phase gates

## Cross-References
- [ ] PRD referenced
- [ ] HLD referenced
- [ ] ADRs referenced
- [ ] Test Strategy referenced (or noted as pending)
- [ ] Path to Production referenced (or noted as not applicable)
- [ ] Tooling reference linked
- [ ] Glossary linked

## Red Flags to Surface
- Pipeline takes > 30 minutes to reach staging
- No quality gates defined
- No rollback strategy documented
- No observability strategy (logs/metrics/tracing absent)
- Security checks only at the end of pipeline
- No IaC — manual infrastructure provisioning
- No SLOs defined
- No incident response process
- No DORA metrics tracking
- Shared mutable environments with no isolation
- Feature flags without cleanup lifecycle
- Manual-only deployments to production
- No audit trail for production changes
- Developer environment setup takes > 30 minutes

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.define-devops-strategy:0.1.3:2026-09-01T09:19:01Z -->
