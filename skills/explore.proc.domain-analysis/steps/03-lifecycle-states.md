# Step 3: Document Lifecycle States

## Objective

Define how entities change over time — states, transitions, allowed actions, and rules per state.

## Entry Criteria

- [ ] Step 2 (Domain Entities) complete with entities and relationships mapped

## Actions

### 3.1 Define States per Entity

For each core entity, document its lifecycle:

**Entity**: [Name]

**For each state, document**:
1. **[State Name]**: [Description]
   - Entry conditions: [What triggers this state]
   - Exit conditions: [What moves it to next state]
   - Allowed actions: [What can be done in this state]
   - Business rules: [Rules that apply in this state]

### 3.2 Map State Transitions

**State transitions**:
- [State 1] → [State 2]: [Trigger/condition]
- [State 2] → [State 3]: [Trigger/condition]

**Terminal states**: [States where entity lifecycle ends]

**Invalid transitions**: [State changes that are not allowed]

### 3.3 Document Implications

State lifecycles inform:
- Workflow design
- Validation rules
- User permissions per state
- UI states and transitions

## Exit Criteria

- [ ] Lifecycle states documented for all core entities
- [ ] State transitions mapped with triggers
- [ ] Terminal states identified
- [ ] Invalid transitions documented

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.domain-analysis:0.1.2:2026-08-27T13:34:37Z -->
