+++
template_name = "Context Documentation Template"
version = "1.0"
output_format = "explore/explore-[slug]/context.md"
validation_required = true
+++

# Context: {Project Name}

**Signal**: {signal-id}  
**Phase**: SP1 — Context Capture & Signal Enrichment  
**Created**: {YYYY-MM-DD}  
**Status**: {Draft / Complete}  

---

## Problem Statement

**Reframed from Signal**:

{2-3 paragraph problem statement that reframes the Signal's problem with deeper analysis. Include:
- What problem exists for whom
- Root cause analysis
- Current impact/consequences
- Desired outcome}

**Root cause**: {Single sentence identifying the fundamental issue}

**Impact**: {Specific consequences if problem remains unsolved}

**Desired outcome**: {Specific, measurable outcome that solves the problem}

---

## Scope & Boundaries

### In Scope

**Core Platform**:
- ✅ {Core capability 1 with technology/approach}
- ✅ {Core capability 2 with technology/approach}
- ✅ {Core capability 3 with technology/approach}

**Pages & Features**:
- ✅ {Feature 1}
- ✅ {Feature 2}
- ✅ {Feature 3}

**Infrastructure**:
- ✅ {Infrastructure component 1}
- ✅ {Infrastructure component 2}

**Developer Experience** (if applicable):
- ✅ {Developer tool/framework 1}
- ✅ {Developer tool/framework 2}

### Out of Scope

**Explicitly excluded**:
- ❌ {Excluded item 1} — **TBD in SP2** (needs stakeholder clarification)
- ❌ {Excluded item 2} — **TBD in SP2** (needs stakeholder clarification)
- ❌ {Excluded item 3} — {Reason for exclusion}

### Boundary Conditions

**Integration boundaries**:
- Platform consumes {external system} ({read/write} for {purpose})
- Platform writes to {external system} ({purpose})
- Platform reads from {external system} ({purpose})

**Ownership boundaries**:
- {Organization} builds: {Components owned}
- {External party} provides: {Components provided}
- {Infrastructure provider}: **Ownership TBD in SP2** (needs clarification)

---

## Domain Model

### Core Entities

| Entity | Description | Key Attributes | Relationships |
|--------|-------------|----------------|---------------|
| **{Entity 1}** | {Description of entity} | `attribute1`, `attribute2`, `attribute3` | {Relationships to other entities} |
| **{Entity 2}** | {Description of entity} | `attribute1`, `attribute2`, `attribute3` | {Relationships to other entities} |
| **{Entity 3}** | {Description of entity} | `attribute1`, `attribute2`, `attribute3` | {Relationships to other entities} |

### Entity Relationships

```
{Entity 1} (1) ──< (many) {Entity 2}
{Entity 2} (many) ──> (1) {Entity 3}
{Entity 3} (1) ──< (many) {Entity 4}
```

---

## System Map

### Integration Architecture

| Component | Role | Technology | Integrates With | Data Flow |
|-----------|------|------------|-----------------|-----------|
| **{Component 1}** | {Role/purpose} | {Technology stack} | {Other components} | {How data flows} |
| **{Component 2}** | {Role/purpose} | {Technology stack} | {Other components} | {How data flows} |
| **{External System}** | {Role/purpose} | {Technology} (external) | {Components} | {How data flows} |

### Data Flow Diagrams

**Build-time flow** (if applicable):
```
{Source} → {Process} → {Output} → {Storage} → {Distribution}
           ↑
    {External data source}
```

**Runtime flow**:
```
{User} → {Entry point} → {Component 1}
                       ↓
            {Component 2} → {External API} → {External system}
                         → {Auth service}
```

**{Custom flow name}** (if applicable):
```
{Flow description with ASCII diagram}
```

---

## Technical Constraints

| Constraint | Source | Status | Impact | Notes |
|------------|--------|--------|--------|-------|
| **{Constraint 1}** | {Client requirement / Regulatory / Technical limitation} | ✅ Confirmed / ⚠️ Assumed / ❌ Open | High/Medium/Low | {Additional context} |
| **{Constraint 2}** | {Source} | ✅ Confirmed / ⚠️ Assumed / ❌ Open | High/Medium/Low | {Additional context} |
| **{Constraint 3}** | {Source} | ✅ Confirmed / ⚠️ Assumed / ❌ Open | High/Medium/Low | {Additional context} |

**Status Legend**:
- ✅ Confirmed = Validated with stakeholders
- ⚠️ Assumed = Inferred from Signal, needs validation in SP2
- ❌ Open = Unknown, requires stakeholder input

---

## Stakeholder Map & RACI

### Stakeholders

| Stakeholder | Organization | Role | Interest | Influence | Engagement Strategy |
|-------------|--------------|------|----------|-----------|---------------------|
| **{Name}** | {Organization} | {Title, Decision Authority} | {What they care about} | High/Medium/Low | {When/how to engage} |
| **{Name}** | {Organization} | {Title, Decision Authority} | {What they care about} | High/Medium/Low | {When/how to engage} |

### RACI Matrix

| Activity | {Stakeholder 1} | {Stakeholder 2} | {Stakeholder 3} | {Stakeholder 4} | {Team} |
|----------|-----------------|-----------------|-----------------|-----------------|--------|
| **Signal approval** | C | C | R | A | I |
| **Explore Bundle approval** | I | I | R | A | I |
| **SP1: Context Capture** | I | I | R/A | I | I |
| **SP2: Stakeholder interviews** | C | C | R | A | I |
| **Gate 2: Hypothesis evaluation** | I | I | R/A | I | I |
| **Hypothesis approval** | C | C | R | A | I |
| **Gate 3: Stakeholder validation** | A | A | R | C | I |
| **SP3: Architecture (HLD)** | C | I | R/A | I | I |
| **SP4: Risk assessment** | C | C | R/A | I | I |
| **Gate 4: PRD-ready evaluation** | I | I | R/A | I | I |
| **SP5: PRD approval** | A | A | R | C | I |
| **SP5: Backlog creation** | I | I | R/A | I | C |
| **Govern: Implementation** | I | I | A | I | R |

**Legend**: R = Responsible, A = Accountable, C = Consulted, I = Informed

---

## Governance Framework

### Decision Authority

| Decision Type | Decision Maker | Consulted | Informed | Escalation Path |
|---------------|----------------|-----------|----------|-----------------|
| **Architecture (tech stack, patterns)** | {Name (Title)} | {Names} | {Names} | {Escalation contact} |
| **Product scope (features in/out)** | {Name (Title)} | {Names} | {Names} | {Escalation contact} |
| **{Custom decision type}** | {Name} / **TBD in SP2** | {Names} | {Names} | **Needs clarification** |
| **Timeline & resourcing** | {Name (Title)} | {Names} | {Names} | {Escalation contact} |
| **Implementation details** | {Team} | {Names} | {Names} | {Escalation contact} |

### Approval Gates

| Gate | Approver | Criteria | Fallback |
|------|----------|----------|----------|
| **Gate 1: Signal sufficient** | Agent (auto) | Problem clear, context sufficient | Human override if agent wrong |
| **Gate 2: Hypothesis-ready** | Agent (auto) | Evidence-based personas, testable hypothesis | Human override if agent wrong |
| **Gate 3: Hypothesis validated** | {Name} + {Name} | Stakeholder sign-off | {Name} escalates if concerns |
| **Gate 4: PRD-ready** | Agent (auto) | Architecture validated, risks mitigated | Human override if agent wrong |
| **Govern Readiness** | Agent (auto) | All artifacts complete, no blockers | Human override if agent wrong |

---

## Assumptions Catalogue

| # | Assumption (from Signal) | Open Question | Risk if Wrong | Owner | Closes In |
|---|--------------------------|---------------|---------------|-------|-----------|
| 1 | {Assumption statement} | {Question to resolve assumption} | {Impact if assumption is incorrect} | {Stakeholder name} | {SP# or Activity code} |
| 2 | {Assumption statement} | {Question to resolve assumption} | {Impact if assumption is incorrect} | {Stakeholder name} | {SP# or Activity code} |
| 3 | {Assumption statement} | {Question to resolve assumption} | {Impact if assumption is incorrect} | {Stakeholder name} | {SP# or Activity code} |

---

## Gaps Catalogue

**Items SP2 must gather** (via stakeholder interviews):

| # | Gap | Why It Matters | Question for Stakeholder | Stakeholder |
|---|-----|----------------|--------------------------|-------------|
| 1 | {Gap description} | {Impact on project} | {Specific question to ask} | {Stakeholder name} |
| 2 | {Gap description} | {Impact on project} | {Specific question to ask} | {Stakeholder name} |
| 3 | {Gap description} | {Impact on project} | {Specific question to ask} | {Stakeholder name} |

---

## Context Summary

### One-Page Baseline

**Problem**: {One sentence problem statement}

**Solution**: {One sentence solution approach}

**Scope**: {In scope summary}. **Out**: {Out of scope summary}.

**Actors**: {Key stakeholders with roles}

**Constraints**: {Top 3-5 constraints}

**Assumptions**: {Number} open questions ({brief list of categories})

**Next**: {Next step in Explore process}

---

## Enrichment Log

| Date | Trigger | Change |
|------|---------|--------|
| {YYYY-MM-DD} | SP1 completion | Initial context baseline created |
| {YYYY-MM-DD} | {Event} | {What changed} |

---

**Last Updated**: {YYYY-MM-DD}  
**Updated By**: {Agent or Human name}

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.context-documentation:0.1.2:2026-08-27T13:34:36Z -->
