# Step 3: Domain Model

## Objective

Create a comprehensive entity-relationship model with table format showing entities, attributes, and relationships.

## Entry Criteria

- [ ] Step 2 (Scope & Boundaries) complete with confirmed scope

## Actions

### 3.1 Create Domain Model

Document entities and relationships:

```
Domain Model

### Core Entities

| Entity | Description | Key Attributes | Relationships |
|--------|-------------|----------------|---------------|
| **[Entity 1]** | [Description] | `attr1`, `attr2`, `attr3` | [Relationships to other entities] |
| **[Entity 2]** | [Description] | `attr1`, `attr2`, `attr3` | [Relationships to other entities] |
| **[Entity 3]** | [Description] | `attr1`, `attr2`, `attr3` | [Relationships to other entities] |

### Entity Relationships

```
[Entity 1] (1) ──< (many) [Entity 2]
[Entity 2] (many) ──> (1) [Entity 3]
[Entity 3] (1) ──< (many) [Entity 4]
```

Business Rules:
- [Rule 1]
- [Rule 2]

Confirm this model or tell me what's missing/incorrect.
```

**STOP**: Wait for human to validate domain model.

## Exit Criteria

- [ ] Core entities documented with descriptions, attributes, and relationships
- [ ] Entity relationships diagrammed
- [ ] Business rules identified
- [ ] Human validated domain model

## Next Step

→ [04-system-map.md](./04-system-map.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.context-documentation:0.1.2:2026-08-27T13:34:36Z -->
