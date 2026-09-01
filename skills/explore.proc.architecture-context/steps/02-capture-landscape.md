# Step 2: Capture Architecture Landscape

## Objective

Understand the existing IT environment, organizational context, stakeholder landscape, and delivery maturity using structured questions. Answers come from ingested documents first; gaps are filled via human elicitation.

## Entry Criteria

- [ ] Step 1 complete — documents ingested, existing-state baseline produced (or greenfield noted)

## Explore Type Gate

| Explore Type | Action |
|---|---|
| **Fast Lane** | ❌ **Skip this step entirely** — use constraints from `technical-feasibility.md` only. Proceed to Step 3. |
| **ERC** | ⚠️ Targeted — ask only AQ questions NOT already answered by Explore artifacts or ingested documents |
| **Diverge/Converge** | ✅ Full question bank (AQ-001–012) |

## Actions

### 2.1 Pre-Populate from Existing Sources

Before asking any questions, attempt to answer each from existing artifacts:

| Source | Questions Likely Answered |
|--------|--------------------------|
| `context.md` | AQ-001 (business driver), AQ-002 (timeline) |
| `technical-feasibility.md` | AQ-004/005 (scale), AQ-006/007 (data), AQ-010 (tech constraints) |
| `regulatory-compliance.md` | AQ-011 (compliance frameworks) |
| Ingested client documents (Step 1) | AQ-008/009 (integrations), AQ-010 (mandated tech), AQ-012 (risk tolerance) |

Mark each answer as: `CONFIRMED` (from document) / `PARTIAL` (incomplete answer) / `UNANSWERED` (no source).

### 2.2 Ask Structured Questions (gaps only)

Present only UNANSWERED and PARTIAL questions to the human:

**Business Context**

| ID | Question | If Already Known |
|----|----------|-----------------|
| AQ-001 | What is the primary business driver for this system — revenue generation, cost reduction, compliance, or operational efficiency? | Check PRD Goals |
| AQ-002 | What is the expected timeline from architecture approval to first production release? | Check PRD constraints |

**Scale & Load**

| ID | Question | If Already Known |
|----|----------|-----------------|
| AQ-004 | What are the expected concurrent users, requests per second (average and peak), and data volume at launch and at 2× growth? | Check PRD NFRs |
| AQ-005 | Are there seasonal, event-driven, or time-of-day load patterns? | Check domain context |

**Data Characteristics**

| ID | Question | If Already Known |
|----|----------|-----------------|
| AQ-006 | What data does this system own (source of truth) vs. data it reads from external systems? What are the data residency requirements? | Check boundary map |
| AQ-007 | What is the data consistency model — can you tolerate eventual consistency for any data, or must all data be strongly consistent? | Check PRD technical notes |

**Integration Landscape**

| ID | Question | If Already Known |
|----|----------|-----------------|
| AQ-008 | List all external systems this system must integrate with. For each: what protocol (REST, SOAP, file, event), who owns the contract, and what is the SLA? | Check PRD dependencies |
| AQ-009 | Are there any integration points where the external system's API is unknown, unstable, or under active development? | Check PRD blockers |

**Constraints**

| ID | Question | If Already Known |
|----|----------|-----------------|
| AQ-010 | What technology constraints are non-negotiable? (mandated languages, frameworks, cloud providers, databases, IdP) | Check PRD constraints |
| AQ-011 | What compliance and regulatory frameworks apply? (GDPR, FCA, PCI-DSS, HIPAA, SOC2, industry-specific) What audit requirements exist? | Check PRD NFRs |

**Risk Tolerance**

| ID | Question | If Already Known |
|----|----------|-----------------|
| AQ-012 | For architecture decisions with trade-offs, does the organization prefer: (a) proven/conservative choices with lower risk, or (b) modern/innovative choices with higher upside but less certainty? | Assess from maturity |

### 2.3 Explore IT Context

Using Step 1 ingested documents + question answers, capture:
- IT strategy and guiding principles
- Enterprise architecture and governance model
- Current technology stack and vendor relationships
- Hosting model, operations, and deployment practices
- Organizational structure and decision-making authority
- Development platform, SDLC, and delivery pipeline

### 2.4 Assess Maturity

Summarize the organization's maturity level in:
- **Architecture governance** — formal review boards, standards enforcement, or ad-hoc
- **Technology adoption** — early adopter, mainstream, or conservative
- **Operational readiness** — mature observability, incident response, or emerging
- **Delivery practices** — continuous delivery, sprint-based, or waterfall
- **Cloud maturity** — cloud-native, lift-and-shift, or on-premises

### 2.5 Synthesize Landscape Findings

Create a concise landscape summary:
- Key environmental facts (not assumptions) — with source references
- Critical constraints that will shape the architecture
- Stakeholders who must be involved in design decisions
- Maturity gaps that create risk
- Conflicts between existing documents and current reality
- Question answers summary (AQ-001 to AQ-012 with classifications)

Tag every finding: `OBS` / `INF` / `ASM`.

## Checkpoint

Present the landscape summary to the human:

```
Landscape Capture Complete:

AQ questions: [N] confirmed from docs, [N] answered by human, [N] remaining gaps
IT environment: [summary]
Maturity: [governance / tech / ops / delivery / cloud levels]
Key constraints: [top 3-5]
Stakeholders: [N] identified with influence areas

Gaps requiring resolution:
  1. [Gap] — impact if not resolved
  2. [Gap] — impact if not resolved
```

**STOP**: Get human confirmation that the landscape is correctly captured before proceeding to driver extraction.

## Exit Criteria

- [ ] All AQ questions answered, confirmed, or documented as gaps (per Explore Type depth)
- [ ] IT environment and organizational context captured
- [ ] Maturity assessment completed
- [ ] Landscape summary written with evidence labels
- [ ] Human has confirmed the landscape summary

## Next Step

→ [03-extract-drivers.md](./03-extract-drivers.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.architecture-context:1.0.1:2026-08-27T13:34:38Z -->
