# Step 4: Design Environment Strategy and Infrastructure as Code

## Objective

Design the environment topology, ephemeral environment strategy, and Infrastructure as Code approach. Ensure environments are reproducible, isolated, and aligned with the pipeline stages from Step 3.

## Entry Criteria

- [ ] Step 3 complete with confirmed pipeline design
- [ ] Cloud platform and container strategy known from Step 2
- [ ] Architecture type known from Step 1

## Actions

### 4.1 Design Environment Topology

**Map environments to pipeline stages and user needs:**

| Environment | Purpose | Pipeline Stage | Data | Who Uses It | Provisioning | Lifecycle |
|-------------|---------|---------------|------|-------------|-------------|-----------|
| **Local** | Developer inner loop | Pre-commit | In-memory / Testcontainers | Individual developer | Manual / docker-compose | Permanent |
| **CI** | PR validation | Stages 1-3 | Ephemeral containers | Automated per PR | IaC / CI runner | Ephemeral (per PR) |
| **Staging** | Release validation | Stages 4-5 | Production-like (anonymised) | QA, automated E2E | IaC / automated | Persistent, refreshed |
| **Production** | Live system | Stage 6 | Real | End users | IaC / automated | Persistent |

**Adapt per strategy profile:**

| Profile | Environment Model |
|---------|------------------|
| **Lean** | Local + CI + Prod (staging optional; use feature flags for validation) |
| **Standard** | Local + CI + Staging + Prod |
| **Enterprise** | Local + CI + Staging + Pre-prod + Prod (+ ephemeral review environments per PR) |

**Adapt per architecture type:**

| Architecture | Environment Adaptation |
|--------------|----------------------|
| **Monolith** | Shared environments; single deployment target per env |
| **Microservices** | Per-service ephemeral environments in CI; shared staging with service mesh; namespace isolation |
| **Event-driven** | Event broker (Kafka/RabbitMQ) in all environments; schema registry shared; dead-letter queue monitoring per env |

### 4.2 Design Ephemeral Environments (Standard + Enterprise profiles)

Ephemeral environments provide isolated, short-lived environments for PR validation:

| Aspect | Design |
|--------|--------|
| **Trigger** | PR opened or updated |
| **What's provisioned** | Application under change + dependencies (stubs or shared services) |
| **Data** | Seed data from version-controlled scripts; anonymised |
| **DNS / Access** | `pr-[number].[service].dev.example.com` or namespace-based |
| **Teardown** | Automatic on PR merge or close |
| **Cost control** | Auto-teardown after [N] hours of inactivity; max [N] concurrent |

### 4.3 Define Environment Parity Rules

| Rule | Rationale |
|------|-----------|
| Staging mirrors production topology | Catches infra-related failures before prod |
| Same container images across environments | Ensures what's tested is what's deployed |
| Environment-specific config via injection only | Secrets, endpoints, feature flags injected at deploy time |
| No shared databases across environments | Prevents data leakage and test pollution |
| Production credentials never in non-prod | Security boundary; separate secret stores per env |

### 4.4 Design Infrastructure as Code Approach

**IaC Principles:**
- All infrastructure defined in version-controlled code
- IaC changes go through the same PR review process as application code
- Policy gates validate IaC before apply
- Drift detection alerts when actual state diverges from declared state

**IaC Stack Selection (based on DS-06 cloud platform answer):**

| Cloud | IaC Tool | State Management | Module Registry |
|-------|----------|-----------------|-----------------|
| AWS | Terraform / OpenTofu | S3 + DynamoDB | Private module registry |
| Azure | Terraform / Bicep | Azure Storage | Private module registry |
| GCP | Terraform / Pulumi | GCS | Private module registry |
| Cloud-agnostic | Terraform / OpenTofu | Remote backend | Private module registry |

**IaC Repository Structure:**

```
infrastructure/
├── modules/               # Reusable infrastructure modules
│   ├── network/
│   ├── database/
│   ├── compute/
│   ├── monitoring/
│   └── security/
├── environments/          # Environment-specific compositions
│   ├── dev/
│   ├── staging/
│   └── production/
├── policies/              # Policy-as-code rules (OPA / Sentinel)
└── README.md
```

**IaC Pipeline:**

| Stage | Action | Gate |
|-------|--------|------|
| 1. Validate | `terraform validate` / `terraform fmt` | Syntax and format clean |
| 2. Plan | `terraform plan` — show proposed changes | Plan review (automated + human for prod) |
| 3. Policy Check | Run policy engine (OPA / Sentinel / Checkov) | Zero policy violations |
| 4. Apply | `terraform apply` — execute changes | Approval required for staging/prod |
| 5. Verify | Health checks on provisioned resources | Resources healthy and accessible |

### 4.5 Define Drift Management

| Aspect | Approach |
|--------|----------|
| **Detection** | Scheduled `terraform plan` (daily or on-demand) comparing actual vs declared state |
| **Alert** | Drift detected → alert to infrastructure channel; severity based on resource type |
| **Remediation** | For non-critical: auto-reconcile. For critical (prod): human approval then apply |
| **Prevention** | All changes via IaC PRs; no manual console/CLI changes allowed (except break-glass) |

**STOP — AskUserQuestion:**

```
Question DS-12
  Header:      "Environment and IaC review"
  Question:    "I've designed a [N]-environment topology with IaC-based provisioning.
                Ephemeral environments are [included/excluded] based on the strategy profile.
                Does this environment model fit your needs?"
  Multi-select: No
  Options:
    - Environment model is correct       — Proceed as designed
    - Add more environments              — Tell me which environments to add
    - Remove environments                — Tell me which to simplify
    - Adjust IaC approach                — Tell me your preferred IaC tooling
```

## Checkpoint

- [ ] Environment topology defined with purpose, data, users, and provisioning per env
- [ ] Ephemeral environment strategy defined (if applicable)
- [ ] Environment parity rules documented
- [ ] IaC approach, tooling, and pipeline defined
- [ ] Drift management strategy defined
- [ ] User confirmed environment model

## Exit Criteria

- Environment strategy and IaC approach are complete
- Ready to design release strategy

## Next Step

-> [05-design-release-strategy.md](./05-design-release-strategy.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.define-devops-strategy:0.1.3:2026-09-01T09:19:01Z -->
