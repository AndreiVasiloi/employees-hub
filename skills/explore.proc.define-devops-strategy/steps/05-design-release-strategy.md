# Step 5: Design Release and Deployment Strategy

## Objective

Design the release strategy including deployment style, progressive delivery, feature flags, rollback mechanisms, and hotfix path. Ensure the strategy matches the system's criticality, architecture type, and team maturity.

## Entry Criteria

- [ ] Step 4 complete with confirmed environment model
- [ ] System criticality and deployment frequency known from Step 2
- [ ] Architecture type known from Step 1

## Actions

### 5.1 Select Deployment Style

**Choose based on system criticality and architecture type:**

| Style | Best For | Pros | Cons |
|-------|----------|------|------|
| **Rolling** | Stateless services; K8s deployments | Zero downtime; gradual; simple | Mixed versions during rollout; harder to rollback mid-roll |
| **Blue-Green** | Monoliths; stateful apps; regulated environments | Instant switchover; easy rollback; full validation before switch | Double infrastructure cost; database schema compatibility required |
| **Canary** | Microservices; high-traffic systems | Risk-limited; data-driven promotion; automatic rollback | Requires traffic splitting; observability must detect issues quickly |
| **Recreate** | Dev/test environments; batch systems | Simplest; no version mixing | Downtime during deploy; not for production |
| **Feature Flags** | Any architecture; progressive feature rollout | Decouple deploy from release; instant rollback; A/B testing | Flag management overhead; technical debt if not cleaned up |

**Recommendation matrix:**

| Profile | Recommended Style |
|---------|------------------|
| **Lean** | Rolling (K8s) or Blue-Green (VM/PaaS) |
| **Standard** | Blue-Green with feature flags for major features |
| **Enterprise** | Canary with automated SLO-based promotion + feature flags |

### 5.2 Design Progressive Delivery (Standard + Enterprise)

Progressive delivery decouples deployment from release:

```
Deploy to Prod → Feature Flag OFF → Enable for internal users → Enable for 5% → 25% → 100%
                                     (dogfooding)               (canary)         (rollout)
```

| Phase | Traffic | Duration | Gate |
|-------|---------|----------|------|
| 1. Deploy (flag off) | 0% | Immediate | Build passes; artifacts promoted |
| 2. Internal dogfood | Internal users only | 1-4 hours | Manual validation; no errors |
| 3. Canary | 5% of traffic | 1-24 hours | SLO metrics within thresholds; error rate < baseline |
| 4. Ramp up | 25% → 50% → 100% | Hours to days | Automated SLO checks at each step |
| 5. Full release | 100% | — | Feature flag removed in next cleanup cycle |

**Automated rollback triggers:**
- Error rate exceeds 2x baseline for > 5 minutes
- p95 latency exceeds SLO for > 5 minutes
- Canary health check fails
- Manual kill switch activated

### 5.3 Design Feature Flag Strategy

| Aspect | Design |
|--------|--------|
| **Tool** | [LaunchDarkly / Unleash / Flagsmith / custom] — select based on DS-06/DS-08 answers |
| **Flag types** | Release flags (temporary), Ops flags (permanent kill switches), Experiment flags (A/B) |
| **Naming** | `[type]-[feature]-[date]` e.g. `release-new-dashboard-2026-04` |
| **Lifecycle** | Create → Enable gradually → Full rollout → Remove flag + dead code within 2 sprints |
| **Governance** | Max active release flags: [N]; stale flag alert after 30 days; cleanup tracked as tech debt |
| **Testing** | Test both flag-on and flag-off paths; flag combinations tested for critical paths |

### 5.4 Design Rollback Strategy

**Application Rollback:**

| Mechanism | When to Use | RTO |
|-----------|------------|-----|
| **Feature flag off** | Feature-level rollback; fastest | Seconds |
| **Revert to previous artifact** | Full deployment rollback; redeploy N-1 image/artifact | < 5 minutes |
| **Blue-green switchback** | Switch traffic back to previous environment | < 1 minute |
| **Canary abort** | Stop canary promotion; route all traffic to stable | < 1 minute |

**Database Rollback:**

| Approach | When to Use | Complexity |
|----------|------------|-----------|
| **Expand-and-contract** | Preferred for all schema changes; backward-compatible migrations | Medium |
| **Reversible migrations** | Simple column additions or index changes | Low |
| **Data restore from backup** | Last resort; data loss between backup and restore | High |

**Rollback Decision Tree:**

```
Issue detected in production
  ├── Feature-scoped? → Disable feature flag → Monitor → Investigate
  ├── Deployment-scoped? → Redeploy previous artifact → Monitor → Investigate
  ├── Data corruption? → Stop writes → Assess scope → Restore if needed
  └── Infrastructure? → IaC rollback to previous state → Verify
```

**Rollback ownership:**
- **Who can trigger**: [On-call engineer / Team lead / Automated system]
- **Who must be notified**: [Team channel / Incident manager / Stakeholders]
- **Post-rollback**: Incident ticket created; root cause analysis within 48 hours

### 5.5 Design Hotfix Path

| Aspect | Standard Path | Hotfix Path |
|--------|--------------|-------------|
| **Branch** | Feature branch → main | `hotfix/AM-XXX-description` → main |
| **Pipeline stages** | All 6 stages | Stages 1-3 (lint, unit, integration) + Stage 6 (smoke) — skip E2E if time-critical |
| **Approval** | Standard PR review | Expedited review (1 reviewer minimum) |
| **Staging** | Full E2E on staging | Smoke test on staging (abbreviated) |
| **Prod deploy** | Scheduled or on-demand | Immediate after approval |
| **Post-deploy** | Standard smoke + monitor | Enhanced monitoring for 2 hours |
| **Follow-up** | None | Full E2E run within 24 hours; incident review |

**STOP — AskUserQuestion:**

```
Question DS-13
  Header:      "Release strategy review"
  Question:    "I've recommended [deployment style] with [feature flags: yes/no]
                and [progressive delivery: yes/no] based on the system's criticality
                and team maturity. Does this approach work?"
  Multi-select: No
  Options:
    - Release strategy is correct     — Proceed as designed
    - Simpler deployment style        — We need a simpler approach
    - More sophisticated              — We need canary / progressive delivery
    - Adjust rollback approach         — Tell me your rollback requirements
```

## Checkpoint

- [ ] Deployment style selected with rationale
- [ ] Progressive delivery designed (if applicable)
- [ ] Feature flag strategy defined
- [ ] Rollback strategy documented (application + database)
- [ ] Hotfix path documented
- [ ] User confirmed release strategy

## Exit Criteria

- Release and deployment strategy is complete
- Ready to design observability

## Next Step

-> [06-design-observability.md](./06-design-observability.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.define-devops-strategy:0.1.3:2026-09-01T09:19:01Z -->
