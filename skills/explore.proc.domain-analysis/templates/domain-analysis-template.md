+++
template_name = "Domain Analysis Template"
version = "1.0"
output_format = "explore/explore-[slug]/domain-analysis.md"
validation_required = true
+++

# Domain Analysis: {Project Name}

**Project**: {project-name}  
**Created**: {YYYY-MM-DD}  
**Last Updated**: {YYYY-MM-DD}  
**Status**: Draft | In Review | Validated

---

## 1. Domain Glossary

**Purpose**: Define domain-specific terms that must be used consistently across all artifacts.

### Core Domain Terms

| Term | Definition | Synonyms (Avoid) | Context | Examples |
|------|------------|------------------|---------|----------|
| **{Term 1}** | {Clear, unambiguous definition} | {Alternative terms to avoid} | {When/where this term is used} | {Concrete examples} |
| **{Term 2}** | {Clear, unambiguous definition} | {Alternative terms to avoid} | {When/where this term is used} | {Concrete examples} |
| **{Term 3}** | {Clear, unambiguous definition} | {Alternative terms to avoid} | {When/where this term is used} | {Concrete examples} |

### Domain Actions (Verbs)

| Action | Definition | When Used | Examples |
|--------|------------|-----------|----------|
| **{Action 1}** | {What this action means} | {Context} | {Example usage} |
| **{Action 2}** | {What this action means} | {Context} | {Example usage} |
| **{Action 3}** | {What this action means} | {Context} | {Example usage} |

### States and Statuses

| State | Definition | Applies To | Next States |
|-------|------------|------------|-------------|
| **{State 1}** | {What this state means} | {Which entities} | {Possible next states} |
| **{State 2}** | {What this state means} | {Which entities} | {Possible next states} |
| **{State 3}** | {What this state means} | {Which entities} | {Possible next states} |

### Roles and Actors

| Role | Definition | Responsibilities | Not To Be Confused With |
|------|------------|------------------|-------------------------|
| **{Role 1}** | {What this role represents in the domain} | {Key responsibilities} | {Similar roles or job titles} |
| **{Role 2}** | {What this role represents in the domain} | {Key responsibilities} | {Similar roles or job titles} |
| **{Role 3}** | {What this role represents in the domain} | {Key responsibilities} | {Similar roles or job titles} |

---

## 2. Domain Model

**Purpose**: Map core entities, their attributes, and relationships to support product and architecture decisions.

### Core Entities

**{Entity 1 Name}**

- **Description**: {What this entity represents in the domain}
- **Category**: {Core / Supporting / Reference / Transactional}
- **Key Attributes**:
  - `{attribute_1}`: {Type} — {Description}
  - `{attribute_2}`: {Type} — {Description}
  - `{attribute_3}`: {Type} — {Description}
- **Lifecycle States**: {List of states this entity can be in}
- **Relationships**:
  - Has many `{Entity 2}` (one-to-many)
  - Belongs to `{Entity 3}` (many-to-one)
  - References `{Entity 4}` (lookup)
- **Business Rules**: {Rules that govern this entity}

---

**{Entity 2 Name}**

- **Description**: {What this entity represents}
- **Category**: {Core / Supporting / Reference / Transactional}
- **Key Attributes**:
  - `{attribute_1}`: {Type} — {Description}
  - `{attribute_2}`: {Type} — {Description}
- **Lifecycle States**: {List of states}
- **Relationships**:
  - Belongs to `{Entity 1}` (many-to-one)
  - Has many `{Entity 5}` (one-to-many)
- **Business Rules**: {Rules that govern this entity}

---

**{Entity 3 Name}**

{Repeat structure for each core entity}

---

### Supporting Entities

**{Supporting Entity 1}**

- **Description**: {What this entity represents}
- **Purpose**: {Why this entity exists}
- **Key Attributes**: {Brief list}
- **Relationships**: {How it relates to core entities}

**{Supporting Entity 2}**

{Repeat for each supporting entity}

---

### Reference Data

| Reference Type | Description | Examples | Source |
|----------------|-------------|----------|--------|
| **{Type 1}** | {What this reference data represents} | {Example values} | {Where it comes from} |
| **{Type 2}** | {What this reference data represents} | {Example values} | {Where it comes from} |
| **{Type 3}** | {What this reference data represents} | {Example values} | {Where it comes from} |

---

### Entity Relationship Diagram (Text-Based)

```
{Entity 1}
  |
  |-- has many --> {Entity 2}
  |                   |
  |                   |-- belongs to --> {Entity 3}
  |
  |-- references --> {Entity 4} (lookup)
  |
  |-- composed of --> {Entity 5} (composition)

{Entity 6}
  |
  |-- aggregates --> {Entity 7} (aggregation)
```

---

## 3. Entity Lifecycle States

**Purpose**: Define how entities change over time and what actions are allowed in each state.

### {Entity 1 Name} Lifecycle

**States**:

**1. {State 1}** (e.g., Draft, Pending, Created)
- **Description**: {What this state means}
- **Entry conditions**: {What triggers this state}
- **Exit conditions**: {What moves it to next state}
- **Allowed actions**: {What can be done in this state}
  - {Action 1}
  - {Action 2}
- **Business rules**: {Rules that apply in this state}
- **User permissions**: {Who can interact with entity in this state}

**2. {State 2}** (e.g., Active, In Progress, Approved)
- **Description**: {What this state means}
- **Entry conditions**: {What triggers this state}
- **Exit conditions**: {What moves it to next state}
- **Allowed actions**: {What can be done in this state}
  - {Action 1}
  - {Action 2}
- **Business rules**: {Rules that apply in this state}
- **User permissions**: {Who can interact with entity in this state}

**3. {State 3}** (e.g., Completed, Cancelled, Archived)
- **Description**: {What this state means}
- **Entry conditions**: {What triggers this state}
- **Exit conditions**: {Terminal state or next state}
- **Allowed actions**: {What can be done in this state}
- **Business rules**: {Rules that apply in this state}
- **User permissions**: {Who can interact with entity in this state}

**State Transitions**:
- `{State 1}` → `{State 2}`: {Trigger/condition}
- `{State 2}` → `{State 3}`: {Trigger/condition}
- `{State 2}` → `{State 1}`: {Trigger/condition — if reversible}

**Terminal States**: {States where entity lifecycle ends}

**Invalid Transitions**: {State changes that are not allowed}
- `{State 1}` → `{State 3}`: {Why this is not allowed}

---

### {Entity 2 Name} Lifecycle

{Repeat structure for each entity with significant lifecycle}

---

## 4. Domain Rules and Constraints

**Purpose**: Document what must be true in the domain to inform validation logic and business rules implementation.

### Business Rules

**BR-1: {Rule Name}**
- **Description**: {What must be true}
- **Applies to**: {Which entities/processes}
- **Validation**: {How to check if rule is satisfied}
- **Exception handling**: {What happens if rule is violated}
- **Example**: {Concrete example}

**BR-2: {Rule Name}**
- **Description**: {What must be true}
- **Applies to**: {Which entities/processes}
- **Validation**: {How to check if rule is satisfied}
- **Exception handling**: {What happens if rule is violated}
- **Example**: {Concrete example}

**BR-3: {Rule Name}**
{Repeat for each business rule}

---

### Constraints

**C-1: {Constraint Name}**
- **Description**: {Limitation or boundary}
- **Type**: {Technical / Business / Regulatory}
- **Impact**: {What this constrains}
- **Rationale**: {Why this constraint exists}
- **Workaround** (if any): {How to work within this constraint}

**C-2: {Constraint Name}**
{Repeat for each constraint}

---

### Invariants (Always True)

1. **{Invariant 1}**: {What must always be true}
   - Enforced by: {System / Process / Manual}
   - Validation: {How to verify}

2. **{Invariant 2}**: {What must always be true}
   - Enforced by: {System / Process / Manual}
   - Validation: {How to verify}

3. **{Invariant 3}**: {What must always be true}
   - Enforced by: {System / Process / Manual}
   - Validation: {How to verify}

---

### Calculations and Formulas

| Calculation | Formula | Inputs | Output | Example |
|-------------|---------|--------|--------|---------|
| **{Calc 1}** | {Formula} | {Required inputs} | {What it produces} | {Example with numbers} |
| **{Calc 2}** | {Formula} | {Required inputs} | {What it produces} | {Example with numbers} |

---

### Validation Rules

| Entity/Field | Rule | Error Message | Severity |
|--------------|------|---------------|----------|
| **{Entity}.{field}** | {Validation requirement} | {User-facing error message} | {Critical / Warning / Info} |
| **{Entity}.{field}** | {Validation requirement} | {User-facing error message} | {Critical / Warning / Info} |
| **{Entity}.{field}** | {Validation requirement} | {User-facing error message} | {Critical / Warning / Info} |

---

## 5. User Roles and Responsibilities

**Purpose**: Define roles based on domain responsibilities (not organizational structure) to inform permissions and workflows.

### Role Definitions

**{Role 1 Name}** (e.g., Healthcare Provider, Transporter, Administrator)

- **Description**: {What this role represents in the domain}
- **Responsibilities**:
  - {Responsibility 1}
  - {Responsibility 2}
  - {Responsibility 3}
- **Permissions**: {What this role can do}
  - Create: {What entities}
  - Read: {What entities}
  - Update: {What entities}
  - Delete: {What entities}
  - Special actions: {Domain-specific actions}
- **Constraints**: {What this role cannot do}
- **Typical tasks**:
  1. {Task 1}: {Brief workflow}
  2. {Task 2}: {Brief workflow}
  3. {Task 3}: {Brief workflow}

---

**{Role 2 Name}**

{Repeat structure for each role}

---

### Role Relationships

- **{Role 1}** → **{Role 2}**: {How they interact}
  - Example: "Healthcare Provider requests transport from Transporter"
- **{Role 1}** delegates to **{Role 3}**: {What is delegated}
  - Example: "Administrator delegates user management to System Admin"

---

### Permission Matrix

| Role | {Entity 1} | {Entity 2} | {Entity 3} | Special Actions |
|------|------------|------------|------------|-----------------|
| **{Role 1}** | Create, Read, Update | Read | Read | {Action 1}, {Action 2} |
| **{Role 2}** | Read | Create, Read, Update, Delete | Read | {Action 3} |
| **{Role 3}** | Read, Update | Read, Update | Create, Read, Update, Delete | {Action 4}, {Action 5} |

**Legend**:
- Create: Can create new instances
- Read: Can view existing instances
- Update: Can modify existing instances
- Delete: Can remove instances
- Special Actions: Domain-specific actions beyond CRUD

---

## 6. Current State

**Purpose**: Document how the domain operates today to understand what to preserve vs what to change.

### Current Processes

**Process 1: {Process Name}**

- **Description**: {What this process does}
- **Current workflow**:
  1. {Step 1}
  2. {Step 2}
  3. {Step 3}
- **Tools used**: {Systems, manual processes, spreadsheets}
- **Frequency**: {How often this process runs}
- **Pain points**:
  - {Pain point 1}: {Description and impact}
  - {Pain point 2}: {Description and impact}
- **Workarounds**: {How people cope with issues}

---

**Process 2: {Process Name}**

{Repeat for each key process}

---

### Current Systems

| System | Purpose | Limitations | Integration Points |
|--------|---------|-------------|-------------------|
| **{System 1}** | {What it does} | {What it doesn't do well} | {How it connects to other systems} |
| **{System 2}** | {What it does} | {What it doesn't do well} | {How it connects to other systems} |
| **{System 3}** | {What it does} | {What it doesn't do well} | {How it connects to other systems} |

---

### Current Data Flows

| Source | Destination | Data | Frequency | Issues |
|--------|-------------|------|-----------|--------|
| **{Source}** | **{Destination}** | {What data} | {How often} | {Problems with this flow} |
| **{Source}** | **{Destination}** | {What data} | {How often} | {Problems with this flow} |

---

### Known Pain Points (Prioritized)

**High Priority**:

**1. {Pain Point 1}**
- **Description**: {What's broken or inefficient}
- **Impact**: {Who it affects, severity}
- **Frequency**: {How often this occurs}
- **Current mitigation**: {How it's handled today}
- **Cost**: {Time, money, or opportunity cost}

**2. {Pain Point 2}**
{Repeat structure}

**Medium Priority**:

**3. {Pain Point 3}**
{Repeat structure}

**Low Priority**:

**4. {Pain Point 4}**
{Repeat structure}

---

### What Works Well (Don't Break This)

1. **{Aspect 1}**: {What works and why}
   - Preserve because: {Reason}

2. **{Aspect 2}**: {What works and why}
   - Preserve because: {Reason}

3. **{Aspect 3}**: {What works and why}
   - Preserve because: {Reason}

---

## 7. Domain Risks and Unknowns

**Purpose**: Document what we don't know and what could go wrong to inform validation priorities.

### Unknowns (What We Need to Learn)

**U-1: {Unknown 1}**
- **What we don't know**: {Description}
- **Why it matters**: {Impact on product decisions}
- **How to resolve**: {Research method — user research, stakeholder interview, pilot}
- **Owner**: {Who will investigate}
- **Deadline**: {When we need to know}
- **Priority**: {High / Medium / Low}

**U-2: {Unknown 2}**
{Repeat structure}

---

### Assumptions (What We're Assuming)

**A-1: {Assumption 1}**
- **Assumption**: {What we're assuming is true}
- **Risk if wrong**: {Impact on product}
- **Validation method**: {How to test this assumption}
- **Status**: {[VALIDATED] / [NEEDS VALIDATION]}
- **Owner**: {Who validates}
- **Priority**: {High / Medium / Low}

**A-2: {Assumption 2}**
{Repeat structure}

---

### Domain Risks

**R-1: {Risk 1}**
- **Description**: {What could go wrong}
- **Likelihood**: {High / Medium / Low}
- **Impact**: {High / Medium / Low}
- **Mitigation**: {Strategy to reduce or eliminate risk}
- **Owner**: {Who is responsible}
- **Status**: {Open / Mitigated / Accepted}

**R-2: {Risk 2}**
{Repeat structure}

---

### Complexity Areas

1. **{Area 1}**: {Why it's complex}
   - Implications: {What this means for product design}
   - Approach: {How to manage this complexity}

2. **{Area 2}**: {Why it's complex}
   - Implications: {What this means for product design}
   - Approach: {How to manage this complexity}

---

### Edge Cases to Consider

| Edge Case | Scenario | How to Handle | Priority |
|-----------|----------|---------------|----------|
| **{Edge case 1}** | {Description of scenario} | {Approach} | {High / Medium / Low} |
| **{Edge case 2}** | {Description of scenario} | {Approach} | {High / Medium / Low} |
| **{Edge case 3}** | {Description of scenario} | {Approach} | {High / Medium / Low} |

---

## 8. Domain Model Summary

**Purpose**: Synthesize findings into actionable insights for product and architecture decisions.

### Core Entities ({N} entities)

1. **{Entity 1}**: {Brief description}
   - Key relationships: {Entity 2}, {Entity 3}
   - Complexity: {What makes this entity complex}

2. **{Entity 2}**: {Brief description}
   - Key relationships: {Entity 1}, {Entity 4}
   - Complexity: {What makes this entity complex}

3. **{Entity 3}**: {Brief description}
   - Key relationships: {Entity 1}, {Entity 5}
   - Complexity: {What makes this entity complex}

---

### Key Relationships

- **{Entity 1}** → **{Entity 2}**: {Relationship type and cardinality}
  - Business rule: {Rule that governs this relationship}

- **{Entity 2}** → **{Entity 3}**: {Relationship type and cardinality}
  - Business rule: {Rule that governs this relationship}

- **{Entity 3}** → **{Entity 4}**: {Relationship type and cardinality}
  - Business rule: {Rule that governs this relationship}

---

### Critical Business Rules ({N} rules)

1. **{Rule 1}**: {Brief statement}
   - Impact: {Why this rule matters}

2. **{Rule 2}**: {Brief statement}
   - Impact: {Why this rule matters}

3. **{Rule 3}**: {Brief statement}
   - Impact: {Why this rule matters}

---

### Domain Complexity Drivers

1. **{Driver 1}**: {Why this adds complexity}
   - Mitigation: {How to manage}

2. **{Driver 2}**: {Why this adds complexity}
   - Mitigation: {How to manage}

3. **{Driver 3}**: {Why this adds complexity}
   - Mitigation: {How to manage}

---

### Implications for Product Design

1. **{Implication 1}**: {How domain shapes product}
   - Recommendation: {Design approach}

2. **{Implication 2}**: {How domain shapes product}
   - Recommendation: {Design approach}

3. **{Implication 3}**: {How domain shapes product}
   - Recommendation: {Design approach}

---

### Implications for Technical Architecture

1. **{Implication 1}**: {How domain shapes architecture}
   - Recommendation: {Architecture approach}

2. **{Implication 2}**: {How domain shapes architecture}
   - Recommendation: {Architecture approach}

3. **{Implication 3}**: {How domain shapes architecture}
   - Recommendation: {Architecture approach}

---

## 9. Assumptions to Validate

**Purpose**: Prioritize what needs validation before proceeding to design and development.

### High Priority (Must Validate Before Design)

**1. {Assumption 1}**
- **Statement**: {What we're assuming}
- **Risk if wrong**: {Impact — e.g., "Invalidates core product concept"}
- **Validation method**: {User research / Stakeholder interview / Pilot / Data analysis}
- **Owner**: {Who validates}
- **Deadline**: {When needed}
- **Status**: {[NEEDS VALIDATION]}

**2. {Assumption 2}**
{Repeat structure}

---

### Medium Priority (Validate Before Development)

**3. {Assumption 3}**
- **Statement**: {What we're assuming}
- **Risk if wrong**: {Impact — e.g., "Requires significant rework"}
- **Validation method**: {Method}
- **Owner**: {Who validates}
- **Deadline**: {When needed}
- **Status**: {[NEEDS VALIDATION]}

**4. {Assumption 4}**
{Repeat structure}

---

### Low Priority (Validate During Pilot)

**5. {Assumption 5}**
- **Statement**: {What we're assuming}
- **Risk if wrong**: {Impact — e.g., "Minor feature adjustment"}
- **Validation method**: {Method}
- **Owner**: {Who validates}
- **Deadline**: {When needed}
- **Status**: {[NEEDS VALIDATION]}

**6. {Assumption 6}**
{Repeat structure}

---

### Validation Plan

| Activity | Method | Timeline | Owner | Dependencies |
|----------|--------|----------|-------|--------------|
| **{Activity 1}** | {User research / Interview / Pilot} | {When} | {Who} | {What must happen first} |
| **{Activity 2}** | {User research / Interview / Pilot} | {When} | {Who} | {What must happen first} |
| **{Activity 3}** | {User research / Interview / Pilot} | {When} | {Who} | {What must happen first} |

---

## Related Artifacts

- **Context**: `explore/explore-[slug]/context.md`
- **Market Research**: `explore/explore-[slug]/market-research.md`
- **Personas**: `explore/domain/personas-[slug].md`
- **Journey Maps**: `explore/domain/journey-[slug].md`
- **Architecture Documentation**: `explore/hlds/[slug]-hld.md`
- **PRD**: `explore/prds/[slug]-prd.md`

---

**Last Updated**: {YYYY-MM-DD}  
**Status**: {Draft | In Review | Validated}

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.domain-analysis:0.1.2:2026-08-27T13:34:37Z -->
