# Step 8: Design Governance and Policy-as-Code

## Objective

Design governance workflows, policy-as-code enforcement, approval models, audit trails, and change management processes. Ensure compliance is automated and embedded, not manual and after-the-fact.

## Entry Criteria

- [ ] Step 7 complete with confirmed DevSecOps design
- [ ] Regulatory requirements known from DS-09
- [ ] Deployment frequency and approval expectations known from Step 2

## Actions

### 8.1 Design Policy-as-Code Framework

**Policy-as-code principles:**
- Policies are version-controlled code, reviewed via PRs
- Policies are evaluated automatically in CI/CD pipeline — not manually checked
- Policy violations block pipeline progression (not just warn)
- Policies have owners, versions, and review cycles

**Policy Engine Selection:**

| Engine | Best For | Language |
|--------|----------|----------|
| **OPA / Rego** | Kubernetes admission, API authorization, general policy | Rego |
| **Kyverno** | Kubernetes-native policies | YAML |
| **Sentinel** | Terraform Enterprise / HCP | Sentinel |
| **Checkov** | IaC scanning (Terraform, CloudFormation, K8s) | Python/YAML |

**Policy Categories:**

| Category | Examples | Enforcement Point |
|----------|----------|------------------|
| **Security** | No public S3 buckets; encryption at rest required; no root containers | IaC PR gate; K8s admission |
| **Compliance** | Audit logging enabled; data residency enforced; PII masking required | IaC PR gate; application build |
| **Cost** | Max instance size per env; no GPU in dev; auto-scaling limits | IaC PR gate |
| **Quality** | Min test coverage; no skipped tests in main; lint pass required | Application PR gate |
| **Operational** | Health checks required; resource limits set; labels present | K8s admission; deploy gate |

### 8.2 Design Approval Workflows

**GitOps-based approval model** (all changes via PRs):

| Change Type | Reviewers Required | Auto-merge Eligible | Approval Gate |
|-------------|-------------------|-------------------|---------------|
| **Application code** | 1 peer reviewer | Yes (if all gates pass) | PR merge gate |
| **IaC (non-prod)** | 1 peer reviewer | Yes (if policy gates pass) | IaC PR gate |
| **IaC (production)** | 2 reviewers (1 must be platform/senior) | No — manual approval | IaC PR gate + manual |
| **Pipeline config** | 1 peer + 1 platform engineer | No | PR merge gate |
| **Policy changes** | 2 reviewers (1 must be security/compliance) | No | PR merge gate |
| **Hotfix** | 1 reviewer (expedited) | No | Hotfix gate |
| **Production deploy** | Automated gates + [manual approval / automated] | Per strategy profile | Promotion gate |

**Adapt per strategy profile:**

| Profile | Production Deploy Approval |
|---------|--------------------------|
| **Lean** | Manual approval by team lead after automated gates pass |
| **Standard** | Automated gates + manual approval by designated deployer |
| **Enterprise** | Automated gates + canary validation + automated promotion (manual override available) |

### 8.3 Design Audit Trail

**What must be auditable:**

| Event | What's Recorded | Retention |
|-------|----------------|-----------|
| Code change | PR author, reviewers, approval timestamp, linked ticket | Permanent (in Git) |
| Pipeline execution | Stage results, gate outcomes, artifact versions, duration | 365 days minimum |
| Deployment | Who triggered, what version, which environment, timestamp | 365 days minimum |
| Configuration change | IaC diff, approval chain, policy gate results | 365 days minimum |
| Secret access | Who accessed, which secret, timestamp | 365 days minimum |
| Incident | Detection time, responders, actions taken, resolution time | 365 days minimum |

**Audit evidence package per release:**
- PR link with review history
- Pipeline run with all gate results
- Test results summary (pass/fail counts, coverage)
- Security scan results (SAST, DAST, dependency, container)
- SBOM
- Deployment record (version, environment, timestamp, deployer)
- Approval chain (who approved, when)

### 8.4 Design Change Management Integration

**For teams with formal change management (CAB/ITIL):**

| Change Type | Process | Automation |
|-------------|---------|-----------|
| **Standard change** | Pre-approved template; no CAB review | Automated: pipeline executes; record filed |
| **Normal change** | CAB review required; scheduled window | Semi-automated: pipeline prepares; human approves; pipeline deploys |
| **Emergency change** | Expedited review; immediate deploy | Hotfix path: 1-reviewer approval; deploy immediately; retrospective CAB review |

**Standard change pre-approval criteria:**
- All pipeline gates pass
- No policy violations
- Change is within defined scope (e.g., same service, no infra changes)
- Rollback tested or feature-flagged

### 8.5 Design Branch Strategy

| Strategy | Best For | Description |
|----------|----------|-------------|
| **Trunk-based** | Continuous delivery; mature teams | Short-lived feature branches (< 1 day); merge to main frequently; feature flags for incomplete work |
| **GitHub Flow** | Regular releases; most teams | Feature branches; PR to main; deploy from main |
| **GitFlow** | Formal release cycles; regulated environments | Develop + release branches; versioned releases |

**Recommendation per strategy profile:**

| Profile | Branch Strategy |
|---------|----------------|
| **Lean** | GitHub Flow — simple; deploy from main |
| **Standard** | GitHub Flow with release tags |
| **Enterprise** | Trunk-based with feature flags (preferred) or GitHub Flow with release branches |

## Checkpoint

- [ ] Policy-as-code framework designed
- [ ] Approval workflows defined per change type
- [ ] Audit trail requirements documented
- [ ] Change management integration defined (if applicable)
- [ ] Branch strategy selected
- [ ] User confirmed governance design

## Exit Criteria

- Governance and policy-as-code strategy is complete
- Ready to define DORA metrics

## Next Step

-> [09-dora-metrics.md](./09-dora-metrics.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.define-devops-strategy:0.1.3:2026-09-01T09:19:01Z -->
