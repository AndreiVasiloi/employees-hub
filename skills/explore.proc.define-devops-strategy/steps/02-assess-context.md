# Step 2: Assess Context via User Questions

## Objective

Ask targeted questions to clarify system scale, criticality, team maturity, platform constraints, and deployment expectations. These answers drive adaptive recommendations in subsequent steps — avoiding both over-engineering and under-engineering.

## Entry Criteria

- [ ] Step 1 complete with confirmed context profile
- [ ] Gaps identified where document context is insufficient

## Actions

### 2.1 Select Questions Based on Gaps

From the context profile, determine which questions are needed. **Do not ask questions already answered by PRD/HLD/ADRs**. Select only questions whose answers would materially change the strategy.

Maximum: **10 questions** per pass. Group by theme.

### 2.2 Core Question Set

**STOP — AskUserQuestion (present as numbered list, grouped by theme):**

**System Scale and Criticality**

```
Question DS-01
  Header:      "System criticality"
  Question:    "How would you classify this system's criticality?"
  Multi-select: No
  Options:
    - Safety-critical          — Human safety depends on system correctness (medical, transport)
    - Business-critical        — Revenue or regulatory compliance depends on system availability
    - Standard commercial      — Important but downtime is tolerable for short periods
    - Internal / MVP           — Low risk; speed of learning matters more than reliability
```

```
Question DS-02
  Header:      "Expected deployment frequency"
  Question:    "How often do you expect to deploy to production?"
  Multi-select: No
  Options:
    - Multiple times per day   — Continuous delivery; trunk-based development
    - Daily to weekly          — Regular releases; short-lived feature branches
    - Bi-weekly to monthly     — Sprint-aligned releases
    - Quarterly or less        — Formal release cycles; change advisory board
```

```
Question DS-03
  Header:      "Expected concurrent users at peak"
  Question:    "What peak concurrent user load should the system handle?"
  Multi-select: No
  Options:
    - < 100 users              — Small internal team
    - 100-1,000 users          — Department-level or SME application
    - 1,000-10,000 users       — Mid-scale commercial application
    - 10,000+ users            — Large-scale public-facing application
```

**Team and Maturity**

```
Question DS-04
  Header:      "Team DevOps maturity"
  Question:    "How would you describe the team's current DevOps maturity?"
  Multi-select: No
  Options:
    - Beginner                 — Manual deployments; no CI/CD; limited automation
    - Developing               — Basic CI/CD exists; some automation; manual steps remain
    - Mature                   — Automated pipelines; IaC; observability in place
    - Advanced                 — Platform engineering; self-service; policy-as-code; DORA-tracked
```

```
Question DS-05
  Header:      "Team size and structure"
  Question:    "What is the development team structure?"
  Multi-select: No
  Options:
    - Single team (< 5 devs)  — One team owns everything
    - Small team (5-10 devs)   — One team with role specialisation
    - Multiple teams (10-30)   — Cross-functional squads; need coordination
    - Large org (30+ devs)     — Multiple squads; platform team needed
```

**Platform and Infrastructure**

```
Question DS-06
  Header:      "Cloud platform"
  Question:    "Which cloud platform will host the production environment?"
  Multi-select: No
  Options:
    - AWS                      — Amazon Web Services
    - Azure                    — Microsoft Azure
    - GCP                      — Google Cloud Platform
    - Not yet decided          — Strategy will remain cloud-agnostic for now
```

```
Question DS-07
  Header:      "CI/CD platform"
  Question:    "Which CI/CD platform will be used?"
  Multi-select: No
  Options:
    - GitHub Actions           — GitHub-native; YAML workflows
    - GitLab CI/CD             — GitLab-native; .gitlab-ci.yml
    - Azure DevOps Pipelines   — Azure-native; YAML pipelines
    - Not yet decided          — Strategy will use generic pipeline stages
```

```
Question DS-08
  Header:      "Container strategy"
  Question:    "Will applications be containerised?"
  Multi-select: No
  Options:
    - Yes, Kubernetes          — Container orchestration with K8s (EKS/AKS/GKE)
    - Yes, managed containers  — ECS, Cloud Run, Azure Container Apps (no K8s)
    - No, PaaS / serverless    — App Service, Lambda, Cloud Functions
    - Not yet decided          — Strategy will cover container and non-container options
```

**Security and Compliance**

```
Question DS-09
  Header:      "Regulatory requirements"
  Question:    "Are there specific regulatory or compliance requirements affecting deployment?"
  Multi-select: Yes
  Options:
    - FCA / insurance regulation — Financial Conduct Authority; audit trails required
    - GDPR / data protection     — PII handling; data residency; right to erasure
    - PCI-DSS                    — Payment card data; network segmentation; scanning
    - No specific requirements   — Standard commercial security practices apply
```

```
Question DS-10
  Header:      "Security scanning maturity"
  Question:    "What security scanning is currently in place (or planned)?"
  Multi-select: Yes
  Options:
    - Dependency vulnerability scanning (Snyk, Dependabot, Trivy)
    - Static analysis (SonarQube, Semgrep, CodeQL)
    - Container image scanning
    - None currently — define from scratch
```

### 2.3 Compile Assessment Profile

Combine context profile from Step 1 with user answers:

```
DevOps Assessment Profile:

System Criticality:     [from DS-01]
Deployment Frequency:   [from DS-02]
Peak Concurrent Users:  [from DS-03]
Team Maturity:          [from DS-04]
Team Size:              [from DS-05]
Cloud Platform:         [from DS-06]
CI/CD Platform:         [from DS-07]
Container Strategy:     [from DS-08]
Regulatory:             [from DS-09]
Security Scanning:      [from DS-10]

Architecture Type:      [from Step 1]
Tech Stack:             [from Step 1]
NFR Highlights:         [from Step 1]
```

### 2.4 Derive Strategy Profile

Based on the assessment, determine the strategy profile that will guide all subsequent steps:

| Assessment | Low Complexity | Medium Complexity | High Complexity |
|------------|---------------|-------------------|-----------------|
| Criticality | Internal/MVP | Standard commercial | Business/Safety-critical |
| Frequency | Monthly+ | Weekly | Daily/Continuous |
| Scale | < 100 | 100-10,000 | 10,000+ |
| Maturity | Beginner | Developing/Mature | Advanced |
| Regulation | None | GDPR | FCA + GDPR + PCI |

**Strategy Profile**:
- **Lean** (low complexity) — Simple pipeline; minimal environments; basic observability; manual where acceptable
- **Standard** (medium complexity) — Full pipeline; 3-4 environments; automated security; SLOs defined
- **Enterprise** (high complexity) — Platform engineering; policy-as-code; progressive delivery; full observability; audit trails

Present the derived strategy profile to the human for confirmation.

## Checkpoint

- [ ] All relevant questions asked and answered
- [ ] Assessment profile compiled
- [ ] Strategy profile derived (Lean / Standard / Enterprise)
- [ ] Human confirmed strategy profile

## Exit Criteria

- Assessment and strategy profiles complete
- Ready to design CI/CD pipeline

## Next Step

-> [03-design-pipeline.md](./03-design-pipeline.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.define-devops-strategy:0.1.3:2026-09-01T09:19:01Z -->
