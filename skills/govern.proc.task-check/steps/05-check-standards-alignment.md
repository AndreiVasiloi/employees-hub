# Step 5: Check Standards Alignment

## Objective

Traverse from task to epic, then verify alignment with PRDs, architecture, accepted decisions, and platform standards.

## Entry Criteria

- Technical plan reviewed (Step 4 complete)
- Access to specification directories

## Actions

### 5.1 Traverse to Parent Epic

Locate the task's parent epic to establish context:

1. **Find epic reference** in task.md frontmatter (`epic:` field)
2. **Load epic** from `explore/epics/<epic-name>/`
3. **Note epic's linked artifacts**:
   - PRDs referenced by the epic
   - Architecture documents
   - Related decisions

**Record epic context:**
```markdown
### Epic Context
- Epic: `explore/epics/<epic-name>/`
- PRDs: [list from epic]
- Architecture: [list from epic]
- Decisions: [list from epic]
```

### 5.2 Check PRD Alignment

Review alignment with Product Requirements Documents referenced by the epic:

- [ ] Task scope aligns with PRD requirements
- [ ] Task deliverables match PRD specifications
- [ ] No conflicts with PRD constraints
- [ ] Task contributes to epic's PRD goals

**Record PRD alignment:**
```markdown
### PRD Alignment
- PRD: `explore/prds/<prd-name>.md`
- Alignment: ✓ Aligned / ⚠ Partial / ✗ Misaligned
- Notes: 
```

### 5.3 Check Architecture Alignment

Review alignment with architecture as documented in the epic and PRDs:

- [ ] Task respects component boundaries defined in epic/PRD
- [ ] Integration points align with epic's scope
- [ ] Data flows match what epic/PRD describes
- [ ] No architectural violations introduced

**Record architecture alignment:**
```markdown
### Architecture Alignment
- Source: Epic and PRD architecture sections
- Alignment: ✓ Aligned / ⚠ Partial / ✗ Misaligned
- Notes:
```

### 5.4 Check Decisions Conformance

Review alignment with accepted decisions in `explore/decisions/`:

- [ ] Task references relevant decisions (ADRs)
- [ ] No conflicts with accepted decisions
- [ ] Naming/conventions align with decisions
- [ ] If new patterns introduced, decision record exists or is proposed

**Record decisions conformance:**
```markdown
### Decisions Conformance
- Decision: `explore/decisions/<decision-name>.md`
- Conformance: ✓ Conforms / ⚠ Partial / ✗ Conflicts
- Notes:
```

### 5.5 Check Platform Standards

Review alignment with platform standards in `platform/docs/`:

| Standard | Location | Compliance |
|----------|----------|------------|
| **Performance** | `platform/docs/technical/standards/quality-attributes/performance.md` | ✓ / ⚠ / ✗ / N/A |
| **Observability** | `platform/docs/technical/standards/quality-attributes/observability.md` | ✓ / ⚠ / ✗ / N/A |
| **Security** | `platform/docs/technical/standards/security.md` | ✓ / ⚠ / ✗ / N/A |
| **Testing** | `platform/docs/technical/standards/testing.md` | ✓ / ⚠ / ✗ / N/A |
| **CI/CD** | `platform/docs/technical/standards/ci-cd-pipeline.md` | ✓ / ⚠ / ✗ / N/A |

### 5.6 Record Findings

```markdown
## Standards Alignment Findings

### Epic Context
- Epic: 
- Traversal complete: Yes / No

### PRD Alignment
- Status: 
- Gaps: 

### Architecture Alignment
- Status:
- Violations:

### Decisions Conformance
- Status: 
- Conflicts: 

### Platform Standards
- Status: 
- Non-compliant areas: 
```

## Discussion Point (Governed Mode)

**STOP**: Share standards alignment findings:
- "Standards alignment check complete."
- Highlight any conflicts or gaps
- "Shall I continue to architecture and test review?"

## Heuristic (Delegated Mode)

If in delegated mode:
- Flag missing epic traversal as blocker
- Flag PRD conflicts as major issues
- Flag architecture violations as major issues
- Flag decision conflicts as major issues
- Note missing standard compliance and proceed to Step 6

## Exit Criteria

- [ ] Parent epic identified and traversed
- [ ] PRD alignment checked (via epic)
- [ ] Architecture alignment verified (via epic)
- [ ] Decisions conformance verified
- [ ] Platform standards reviewed
- [ ] Findings documented with specific citations

## Next Step

→ [06-review-architecture-tests.md](./06-review-architecture-tests.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-check:0.2.1:2026-09-02T06:10:56Z -->
