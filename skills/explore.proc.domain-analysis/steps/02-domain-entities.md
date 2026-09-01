# Step 2: Model Domain Entities and Relationships

## Objective

Map the core entities and how they relate to support product and architecture decisions.

## Entry Criteria

- [ ] Step 1 (Domain Glossary) complete with terms defined

## Actions

### 2.1 Identify Entities

**For each entity, document**:
- **Entity name**: [Name]
- **Description**: [What it represents]
- **Key attributes**: [Essential properties]
- **Lifecycle states**: [States this entity can be in]
- **Relationships**: [How it relates to other entities]
- **Business rules**: [Rules that govern this entity]

### 2.2 Categorize Entities

**Entity categories**:
1. **Core entities**: Primary domain objects (e.g., Patient, Equipment, Transport)
2. **Supporting entities**: Secondary objects that support core entities
3. **Reference data**: Lookup tables, categories, types
4. **Transactional entities**: Records of actions or events

### 2.3 Map Relationships

**Relationship types**:
- One-to-one
- One-to-many
- Many-to-many
- Composition (part-of)
- Aggregation (has-a)
- Inheritance (is-a)

Create a visual representation (text-based) showing entities and their relationships.

### 2.4 Human Checkpoint

Present entity model and ask:
- Are there existing data models or entity diagrams I should reference?
- Are any entities missing or incorrectly modeled?

**STOP**: Wait for human to provide existing models or confirm to proceed.

## Exit Criteria

- [ ] All core entities identified with attributes
- [ ] Entity categories assigned
- [ ] Relationships mapped with types and cardinality
- [ ] Text-based entity relationship diagram created
- [ ] Human has reviewed and approved entity model

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.domain-analysis:0.1.2:2026-08-27T13:34:37Z -->
