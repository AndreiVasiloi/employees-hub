# Step 6: Design Observability and Incident Response

## Objective

Design the observability stack (logs, metrics, traces), define SLOs and error budgets, design alerting strategy, and establish incident response procedures. Ensure observability is built in from day one, not bolted on after production issues.

## Entry Criteria

- [ ] Step 5 complete with confirmed release strategy
- [ ] NFR targets known from Step 1 (response time, availability, throughput)
- [ ] Architecture type and integration points known from Step 1

## Actions

### 6.1 Design the Three Pillars of Observability

**Structured Logging:**

| Aspect | Design |
|--------|--------|
| **Format** | Structured JSON (not plain text) — machine-parseable, human-readable |
| **Fields** | `timestamp`, `level`, `service`, `traceId`, `spanId`, `userId`, `message`, `context` |
| **Levels** | ERROR (actionable failures), WARN (degradation), INFO (business events), DEBUG (development only) |
| **Correlation** | Every log entry includes `traceId` for cross-service correlation |
| **PII** | Never log PII (names, emails, policy numbers) — use anonymised identifiers |
| **Retention** | Hot: 30 days (searchable). Cold: 90-365 days (archive, compliance). Adapt per DS-09. |
| **Tool** | [ELK / Loki+Grafana / CloudWatch Logs / Datadog — based on cloud platform] |

**Metrics (RED + USE methods):**

| Method | Metric | What it tells you |
|--------|--------|-------------------|
| **RED** (request-driven) | **R**ate — requests per second | Traffic volume and trends |
| | **E**rrors — error rate (%) | System health; degradation detection |
| | **D**uration — latency percentiles (p50, p95, p99) | User experience; SLO compliance |
| **USE** (resource-driven) | **U**tilisation — CPU, memory, disk, network % | Capacity planning; saturation risk |
| | **S**aturation — queue depth, thread pool usage | Bottleneck detection |
| | **E**rrors — hardware/resource errors | Infrastructure health |

**Custom business metrics:**
- Quotes created per minute
- Policy bind success rate
- Third-party API response times (DVLA, Experian, etc.)
- Queue depths for async processing

**Tool**: [Prometheus+Grafana / CloudWatch Metrics / Datadog — based on cloud platform]

**Distributed Tracing:**

| Aspect | Design |
|--------|--------|
| **Standard** | OpenTelemetry (vendor-neutral; recommended for all new systems) |
| **Propagation** | W3C Trace Context headers across all service boundaries |
| **Sampling** | 100% for errors; [10-100]% for success (adapt per traffic volume) |
| **Span coverage** | HTTP requests, database queries, external API calls, message publish/consume |
| **Tool** | [Jaeger / Tempo+Grafana / X-Ray / Datadog APM — based on cloud platform] |

**Adapt per architecture type:**

| Architecture | Observability Adaptation |
|--------------|------------------------|
| **Monolith** | Application-level metrics; single log stream; tracing optional (useful for DB + external API calls) |
| **Microservices** | Distributed tracing essential; per-service dashboards; service mesh metrics |
| **Event-driven** | Event flow tracing; dead-letter queue monitoring; consumer lag metrics; schema registry metrics |

### 6.2 Define SLOs and Error Budgets

**SLO Design Principles:**
- Define SLOs per critical user journey, not per service
- SLOs reflect user experience, not raw infrastructure metrics
- Error budgets provide explicit trade-off between velocity and reliability

**SLO Template:**

| Journey | SLI (indicator) | SLO (target) | Window | Error Budget |
|---------|----------------|-------------|--------|-------------|
| [Critical journey 1] | Successful responses / total responses | 99.9% | 30-day rolling | 43.2 min downtime / month |
| [Critical journey 2] | p95 latency < [target]ms | 99.5% | 30-day rolling | 3.6 hours latency violations / month |
| [API endpoint] | Error rate < 1% | 99.0% | 7-day rolling | 1.68 hours / week |

**Error budget policy:**
- Budget > 50% remaining → Ship freely; focus on features
- Budget 25-50% remaining → Increase monitoring; reduce risky changes
- Budget < 25% remaining → Freeze non-critical deploys; focus on reliability
- Budget exhausted → Stop all feature work until reliability improves

### 6.3 Design Alerting Strategy

**Alert Design Principles (avoid alert fatigue):**
- Alert on symptoms (user impact), not causes (CPU high)
- Every alert must be actionable — if no one needs to act, it's a dashboard metric, not an alert
- Consolidate and deduplicate — one alert per incident, not per symptom
- Severity drives response time, not notification channel

**Alert Severity Matrix:**

| Severity | Criteria | Response Time | Notification | Example |
|----------|----------|--------------|-------------|---------|
| **P1 — Critical** | User-facing outage; SLO breach; data loss risk | < 15 min | PagerDuty/OpsGenie + phone | Production down; payment failures |
| **P2 — High** | Degraded performance; partial outage; error budget burning fast | < 1 hour | Slack alert channel + on-call | Latency spike; elevated error rate |
| **P3 — Medium** | Non-critical degradation; approaching thresholds | < 4 hours | Slack alert channel | Disk usage > 80%; cert expiring in 7 days |
| **P4 — Low** | Informational; trend-based; cleanup needed | Next business day | Slack info channel / ticket | Log volume spike; stale feature flags |

### 6.4 Design Incident Response

**Incident Lifecycle:**

```
Detection → Triage → Mitigation → Resolution → Post-Incident Review
(automated)  (on-call)  (restore service)  (fix root cause)  (learn + improve)
```

**On-call Design:**

| Aspect | Design |
|--------|--------|
| **Rotation** | Weekly rotation; [N]-person primary + secondary; follow-the-sun for distributed teams |
| **Escalation** | Primary (5 min) → Secondary (15 min) → Team Lead (30 min) → Engineering Manager (1 hour) |
| **Tools** | [PagerDuty / OpsGenie / Grafana OnCall] |
| **Runbooks** | Every P1/P2 alert has a linked runbook with diagnostic steps and mitigation actions |

**Post-Incident Review (PIR):**
- Conducted within 48 hours of P1/P2 resolution
- Blameless — focus on systemic causes, not individual mistakes
- Outputs: timeline, root cause, contributing factors, action items with owners and deadlines
- Action items tracked to completion; repeat incidents flagged as process failure

**Adapt per strategy profile:**

| Profile | Incident Response |
|---------|------------------|
| **Lean** | Shared on-call; basic runbooks; PIR for P1 only |
| **Standard** | Dedicated on-call rotation; runbooks for all P1/P2 alerts; PIR for P1/P2 |
| **Enterprise** | Follow-the-sun on-call; automated diagnostics; PIR for all incidents; chaos engineering |

### 6.5 Design Dashboards

**Standard Dashboard Set:**

| Dashboard | Audience | Key Metrics |
|-----------|----------|------------|
| **Service Health** | On-call / Ops | RED metrics per service; error rates; active alerts |
| **Deployment Tracker** | Dev team | Recent deployments; canary status; rollback history |
| **SLO Dashboard** | Team lead / Management | SLO compliance; error budget remaining; burn rate |
| **Infrastructure** | Platform / Ops | CPU, memory, disk, network; node health; pod restarts |
| **Business Metrics** | Product / Stakeholders | Quotes/min; bind rate; API response times; user sessions |

## Checkpoint

- [ ] Three pillars of observability designed (logs, metrics, traces)
- [ ] SLOs defined per critical user journey with error budgets
- [ ] Alerting strategy designed with severity matrix
- [ ] Incident response procedures defined
- [ ] Dashboard set defined
- [ ] User confirmed observability design

## Exit Criteria

- Observability and incident response strategy is complete
- Ready to design DevSecOps

## Next Step

-> [07-design-devsecops.md](./07-design-devsecops.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.define-devops-strategy:0.1.3:2026-09-01T09:19:01Z -->
