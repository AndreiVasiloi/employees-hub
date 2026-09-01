# Step 4: System Map

## Objective

Document system components and integrations with detailed architecture, including integration tables and data flow diagrams.

## Entry Criteria

- [ ] Step 3 (Domain Model) complete with confirmed entity model

## Actions

### 4.1 Document System Map

Create integration architecture and data flows:

```
System Map

### Integration Architecture

| Component | Role | Technology | Integrates With | Data Flow |
|-----------|------|------------|-----------------|-----------|
| **[Component 1]** | [Role/purpose] | [Technology stack] | [Other components] | [How data flows] |
| **[Component 2]** | [Role/purpose] | [Technology stack] | [Other components] | [How data flows] |
| **[External System]** | [Role/purpose] | [Technology] (external) | [Components] | [How data flows] |

### Data Flow Diagrams

Build-time flow (if applicable):
```
[Source] → [Process] → [Output] → [Storage] → [Distribution]
           ↑
    [External data source]
```

Runtime flow:
```
[User] → [Entry point] → [Component 1]
                       ↓
            [Component 2] → [External API] → [External system]
                         → [Auth service]
```

Critical Dependencies:
- [Dependency 1]: [Impact if unavailable]
- [Dependency 2]: [Impact if unavailable]

Confirm this system map or tell me what to add/correct.
```

**STOP**: Wait for human to validate system map.

## Exit Criteria

- [ ] Integration architecture table complete
- [ ] Data flow diagrams created (build-time and runtime)
- [ ] Critical dependencies identified with impact
- [ ] Human validated system map

## Next Step

→ [05-technical-constraints.md](./05-technical-constraints.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.context-documentation:0.1.2:2026-08-27T13:34:36Z -->
