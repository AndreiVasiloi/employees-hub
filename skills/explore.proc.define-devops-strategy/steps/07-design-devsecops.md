# Step 7: Design DevSecOps Integration

## Objective

Design security integration across the entire delivery pipeline — shift-left scanning, supply chain security, secrets management, and compliance automation. Security must be embedded into every pipeline stage, not bolted on at the end.

## Entry Criteria

- [ ] Step 6 complete with confirmed observability design
- [ ] Regulatory requirements known from DS-09
- [ ] Security scanning maturity known from DS-10
- [ ] Tech stack and container strategy known from Steps 1-2

## Actions

### 7.1 Design Shift-Left Security Pipeline

**Security checks mapped to pipeline stages:**

| Pipeline Stage | Security Check | Tool Category | Blocks On |
|---------------|---------------|--------------|-----------|
| **Pre-commit** | Secret detection in code | [git-secrets / gitleaks / pre-commit hooks] | Any detected secret |
| **Stage 1 (Lint)** | SAST — static analysis for code vulnerabilities | [SonarQube / Semgrep / CodeQL / Checkmarx] | Critical / High findings |
| **Stage 2 (Unit)** | Security-focused unit tests (auth, input validation) | [Jest / JUnit] | Test failures |
| **Stage 3 (Integration)** | Dependency vulnerability scanning | [Snyk / Trivy / Dependabot / OWASP Dependency-Check] | Critical vulnerabilities |
| **Stage 3 (Integration)** | License compliance check | [FOSSA / Snyk / license-checker] | Non-compliant licenses |
| **Stage 4 (Build)** | Container image scanning | [Trivy / Snyk Container / Grype] | Critical/High CVEs |
| **Stage 4 (Build)** | SBOM generation | [Syft / Trivy / CycloneDX] | SBOM not generated |
| **Stage 5 (E2E)** | DAST — dynamic security testing on staging | [OWASP ZAP / Burp Suite / Nuclei] | Critical findings |
| **Stage 5 (E2E)** | IaC security scanning | [Checkov / tfsec / Trivy config] | Misconfigurations |

**Adapt per strategy profile:**

| Profile | Security Scope |
|---------|---------------|
| **Lean** | Dependency scanning + secret detection + basic SAST. DAST and container scanning deferred. |
| **Standard** | Full shift-left pipeline above. SBOM generated. DAST on staging. |
| **Enterprise** | Full pipeline + artifact signing + SLSA provenance + attestation + audit-ready evidence chain. |

### 7.2 Design Supply Chain Security (Standard + Enterprise)

**Software Bill of Materials (SBOM):**

| Aspect | Design |
|--------|--------|
| **Format** | CycloneDX or SPDX (industry standards) |
| **Generation** | Automated at build stage for every release artifact |
| **Storage** | Stored alongside artifact in registry; linked to deployment record |
| **Scope** | All direct and transitive dependencies; OS packages in container images |
| **Consumption** | Queryable for vulnerability response ("are we affected by CVE-XXXX?") |

**Artifact Signing and Provenance (Enterprise):**

| Aspect | Design |
|--------|--------|
| **Signing tool** | [Cosign / Sigstore / Notation] |
| **What's signed** | Container images, build artifacts, SBOMs |
| **Provenance** | SLSA Level 2+ — build system generates provenance attestation |
| **Verification** | Deployment pipeline verifies signature before deploying to staging/prod |

### 7.3 Design Secrets Management

| Aspect | Design |
|--------|--------|
| **Secret store** | [AWS Secrets Manager / Azure Key Vault / HashiCorp Vault / GCP Secret Manager] |
| **Injection** | Secrets injected at deploy time via environment variables or mounted volumes; never baked into images |
| **Rotation** | Automated rotation for database credentials, API keys; rotation period: 90 days max |
| **Access control** | Per-environment, per-service access policies; principle of least privilege |
| **Audit** | All secret access logged; alert on unusual access patterns |
| **Git prevention** | Pre-commit hooks + CI scanning prevent secrets from entering version control |

**Secret categories:**

| Category | Examples | Rotation | Access |
|----------|----------|----------|--------|
| **Infrastructure** | Database credentials, cloud API keys | 90-day auto-rotate | Infrastructure pipeline only |
| **Application** | Third-party API keys (DVLA, Experian), encryption keys | 90-day or per-vendor | Application at runtime only |
| **CI/CD** | Registry tokens, deployment credentials | 90-day auto-rotate | CI/CD pipeline only |
| **Developer** | Personal access tokens, SSH keys | 365-day; revoke on offboarding | Individual developer |

### 7.4 Design Vulnerability Management Process

**Vulnerability Triage SLAs:**

| Severity | Detection → Triage | Triage → Remediation | Exemption Process |
|----------|-------------------|---------------------|-------------------|
| **Critical** | < 4 hours | < 24 hours (hotfix) | CTO/CISO approval; documented risk acceptance |
| **High** | < 1 business day | < 7 days | Team lead approval; tracked as tech debt |
| **Medium** | < 3 business days | < 30 days | Team decision; tracked in backlog |
| **Low** | < 5 business days | Next convenient release | No formal process; backlog item |

**Vulnerability Dashboard:**
- Total open vulnerabilities by severity
- Mean time to remediate (MTTR) by severity
- Aging vulnerabilities (> SLA)
- Dependency freshness (% of dependencies at latest minor/patch)

### 7.5 Design Compliance Automation (if regulatory requirements from DS-09)

**For FCA / Insurance regulation:**
- Audit trail for all production changes (who, what, when, approval)
- Segregation of duties enforced in pipeline (deployer ≠ approver)
- Change records linked to tickets/PRs
- Evidence package per release: PR reviews, test results, security scans, SBOM, approvals

**For GDPR:**
- PII handling in test data (anonymisation pipeline)
- Data access logging and audit
- Right-to-erasure compliance in test environments
- Data residency enforcement via IaC policy

**For PCI-DSS (if applicable):**
- Network segmentation enforced via IaC
- Quarterly vulnerability scans
- Penetration testing schedule
- Encryption at rest and in transit validated per environment

## Checkpoint

- [ ] Shift-left security pipeline designed
- [ ] Supply chain security defined (SBOM, signing — per profile)
- [ ] Secrets management strategy defined
- [ ] Vulnerability management SLAs defined
- [ ] Compliance automation defined (per regulatory requirements)
- [ ] User confirmed DevSecOps design

## Exit Criteria

- DevSecOps integration is complete
- Ready to design governance

## Next Step

-> [08-design-governance.md](./08-design-governance.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.define-devops-strategy:0.1.3:2026-09-01T09:19:01Z -->
