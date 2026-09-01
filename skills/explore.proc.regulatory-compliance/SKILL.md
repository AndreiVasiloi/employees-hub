+++
name = "explore.proc.regulatory-compliance"
description = "Use this skill when you need to capture regulatory constraints, compliance requirements, and evidence needs that shape the product — covering standards, data handling rules, accessibility mandates, and compliance risk registers. Also relevant when someone says 'what regulations apply,' 'are we GDPR compliant,' 'legal requirements,' or 'audit readiness.' Does NOT assess general project risks — use Risk Documentation for non-regulatory risk identification and mitigation."
license = "Proprietary. See LICENSE.md"
+++

# Regulatory and Compliance Focus

Capture regulatory constraints, compliance requirements, and evidence needs that shape the product experience.

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## When to Use

Use this skill when you need to:
- Identify regulatory constraints that shape product design
- Document compliance requirements by region or jurisdiction
- Define data handling rules (collection, retention, consent, auditability)
- Establish accessibility requirement baselines
- Specify copy and disclosure requirements
- Document evidence requirements (logs, confirmations, records)
- Create risk register for compliance failures
- Define non-negotiable compliance requirements
- Generate compliance acceptance criteria

**Key principle**: Regulatory and compliance analysis captures constraints that shape the experience and defines what must be proven, ensuring the product can legally and safely operate in target markets.

## Pre-Check

If regulatory compliance documentation already exists at `explore/explore-[slug]/regulatory-compliance.md`:
1. Load the existing compliance documentation
2. Present to the steering team: "Existing regulatory compliance documentation found. Review and update, or create fresh?"
3. If updating → skip to the validation step with existing data for review
4. If creating fresh → proceed from Step 1

## Inputs to Request (if missing)

Before conducting regulatory and compliance analysis, ensure you have:

1. **Context baseline** - From Context Documentation skill (problem statement, scope)
2. **Target markets** - Geographic regions where product will operate
3. **Industry/domain** - Specific industry regulations that apply
4. **Data types** - What personal or sensitive data will be handled
5. **User types** - Who will use the product (consumers, businesses, minors, etc.)
6. **Slug** - Project identifier for file naming (e.g., `care-it`)

**Optional inputs**:
- Existing compliance documentation
- Legal counsel guidance
- Industry standards documentation
- Competitor compliance approaches
- Known regulatory risks

**STOP**: If target markets or data types are unclear, work with stakeholders to define them before proceeding.

## Process Steps

| Step | File | Purpose |
|------|------|---------|
| 1 | [01-applicable-standards.md](./steps/01-applicable-standards.md) | Identify applicable standards and policies |
| 2 | [02-data-handling.md](./steps/02-data-handling.md) | Define data handling rules |
| 3 | [03-accessibility.md](./steps/03-accessibility.md) | Establish accessibility requirement baseline |
| 4 | [04-disclosures.md](./steps/04-disclosures.md) | Document copy and disclosure requirements |
| 5 | [05-evidence.md](./steps/05-evidence.md) | Define evidence requirements |
| 6 | [06-risk-register.md](./steps/06-risk-register.md) | Create compliance risk register |
| 7 | [07-non-negotiables.md](./steps/07-non-negotiables.md) | Define non-negotiables |
| 8 | [08-acceptance-criteria.md](./steps/08-acceptance-criteria.md) | Generate compliance acceptance criteria |
| 9 | [09-write-document.md](./steps/09-write-document.md) | Write regulatory and compliance document |
| 10 | [10-validation.md](./steps/10-validation.md) | Run completeness validation |

## Output Format

```
explore/explore-[slug]/regulatory-compliance.md
```

**Template**: `templates/regulatory-compliance-template.md`

**Complete Structure** (8 sections):
1. **Applicable Standards and Policies** - By region, industry, data type, certifications
2. **Data Handling Rules** - Collection, retention, access, security, transfers
3. **Accessibility Requirements** - Standards, obligations, baseline, testing, documentation
4. **Copy and Disclosure Requirements** - Disclosures, consent, notices, warnings
5. **Evidence Requirements** - Audit logs, confirmations, proof, retention, retrieval
6. **Compliance Risk Register** - Risks with likelihood, impact, consequences, mitigation
7. **Non-Negotiables List** - Legal, data protection, accessibility, security, disclosure, evidence
8. **Compliance Acceptance Criteria** - Testable criteria by compliance area

## Integration with Workflows

**Consumes**:
- **Context Documentation** — Provides regulatory context for constraints
- **Domain Analysis** — Regulatory rules inform domain rules
- **Market Research** — Regional regulations inform market entry strategy

**Produces** (consumed by):
- **Accessibility Specifications** (`explore.proc.accessibility-specifications`) — Accessibility requirements inform detailed specs
- **Architecture Context** (`explore.proc.architecture-context`) — Security and data requirements inform architecture context
- **Architecture Solutioning** (`explore.proc.architecture-solutioning`) — Compliance constraints inform HLD security section
- **PRD Generation** (`explore.proc.prd-generation`) — Compliance acceptance criteria as product constraints
- **Risk Documentation** (`explore.proc.risk-documentation`) — Compliance risks feed into risk register
- **Test Strategy** (`explore.proc.test-strategy`) — Regulatory testing requirements
- **DevOps Strategy** (`explore.proc.define-devops-strategy`) — Compliance audit pipeline requirements
- **Problem Framing** (Step 3 Phase A) — Regulatory constraints inform framing
- **Idea Evaluation** (Step 3 Phase D) — Compliance as evaluation criterion

## Best Practices

**Do**:
- ✅ Research regulations early (before design decisions are made)
- ✅ Consult legal counsel for interpretation and validation
- ✅ Document requirements by region (regulations vary)
- ✅ Define non-negotiables clearly (cannot be compromised)
- ✅ Create testable acceptance criteria (for QA validation)
- ✅ Identify compliance risks with mitigation strategies
- ✅ Document evidence requirements (what must be logged)
- ✅ Update regularly (regulations change frequently)

**Don't**:
- ❌ Assume regulations are the same across regions
- ❌ Skip legal review (AI cannot provide legal advice)
- ❌ Treat compliance as optional or "nice to have"
- ❌ Wait until after development to address compliance
- ❌ Ignore accessibility requirements (legal obligation in many jurisdictions)
- ❌ Forget to document evidence requirements (needed for audits)
- ❌ Underestimate compliance risks (fines can be substantial)
- ❌ Copy compliance approaches from other products (context matters)

## Completeness Checklist

**Post-edit**: Re-run this checklist after any modification to the output artifact.

- [ ] Applicable regulations identified with jurisdiction scope
- [ ] Compliance requirements mapped to system components
- [ ] Inter-jurisdiction conflicts identified (not just per-jurisdiction lists)
- [ ] Evidence and audit requirements specified with retention periods
- [ ] Non-negotiable requirements clearly separated from recommendations
- [ ] Acceptance criteria written as testable statements for QA

## Gotchas

- ⚡ **Jurisdiction stacking**: When a product operates in multiple regions, the agent tends to list regulations per region independently. This misses conflicts between jurisdictions (e.g., data localization vs. cross-border transfer). Always identify inter-jurisdiction conflicts, not just per-jurisdiction requirements.
- ⚡ **Compliance copy-paste**: The agent may reuse compliance frameworks from a previous engagement without verifying applicability. Compliance requirements are deeply context-specific — never assume "same industry = same requirements."
- ⚡ **Evidence requirements underspecified**: Regulatory compliance often requires proving compliance, not just being compliant. The agent tends to document what must be done but not what evidence must be retained. Always specify retention periods, audit formats, and evidence collection mechanisms.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.regulatory-compliance:0.1.2:2026-08-31T11:38:09Z -->
