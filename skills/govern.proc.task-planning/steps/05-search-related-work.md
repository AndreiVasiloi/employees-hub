# Step 5: Search Related Work

## Objective

Search for existing decisions and related work to prevent gaps and contradictions. Create interim artifact `work/05-research.md`.

## Entry Criteria

- Goals and constraints defined (Step 4 complete)
- `work/04-goals.md` exists
- Understanding of task domain and key concepts

## Actions

### 5.1 Identify Search Terms

Extract 3-5 key search terms from the task domain:
- Technical concepts (e.g., "concurrency", "idempotency", "locking")
- Domain terms (e.g., "clearing", "settlement", "adapter")
- Integration points (e.g., "Kafka", "S3", "SFTP")

### 5.2 Search Decisions

Search `explore/decisions/` for each term:
```bash
grep -r "<term>" explore/decisions/
```

Or use code_search tool for semantic search.

### 5.3 Search Related Tasks

Search by domain, provider, lifecycle, integration, concern tags.

Also search:
- `work/03-pending-implementation/`
- `work/04-implementing/`
- `work/05-pending-completion/` (completed, awaiting final completion)
- `work/06-completed/` (completed work)

### 5.4 Read Matching Documents

**CRITICAL**: Read ALL matching decisions and tasks fully:
- Note their status (Accepted/Proposed/Rejected for decisions)
- Extract implementation details that resolve ambiguities
- Do NOT ask user questions that can be answered by reading related tasks

### 5.5 Create Interim Artifact

Write findings to `work/05-research.md`:

```markdown
# Research Findings

## Search Terms
- [Term 1]
- [Term 2]
- [Term 3]

## Decision Inventory

| Decision ID | Status | Key Requirement | Link |
|-------------|--------|-----------------|------|
| 250930-xxx | Accepted | [Requirement] | [Link] |
| 251002-xxx | Accepted | [Requirement] | [Link] |

## Related Tasks

| Task ID | Status | Relationship | Link |
|---------|--------|--------------|------|
| 0025 | Done | [How related] | [Link] |
| 0070 | Implementing | [How related] | [Link] |

## Documentation References

| Document | Relevance | Link |
|----------|-----------|------|
| [Doc name] | [Why relevant] | [Link] |

## Conflicts and Gaps

| Conflict/Gap | Description | Resolution |
|--------------|-------------|------------|
| [Issue] | [Details] | [How to resolve] |
```

## 💬 If GOVERNED Mode

- **Stop**
- Display > ## 💬 Discussion Point
- Present findings to user:
  - "Found X decisions and Y related tasks"
  - "Key decisions to follow: [list]"
  - "Conflicts or gaps found: [list]"
  - "Should I proceed with refinement?"

**STOP and ask user** if you find:
- Conflicts that cannot be resolved by reading documentation
- Ambiguities not addressed by existing decisions

Wait for confirmation before continuing execution.

## 🤖 If DELEGATED Mode

- Apply the following heuristic
- Search using all identified terms
- Read all matching documents
- Create `work/05-research.md` with inventories
- Flag conflicts but proceed if resolvable
- Only stop for true conflicts requiring user input
- Proceed to Step 6 after artifact created

## Exit Criteria

- [ ] 3-5 search terms identified and searched
- [ ] Decision Inventory created
- [ ] Related Tasks list created
- [ ] Conflicts or gaps documented
- [ ] All blocking/related tasks read to resolve ambiguities
- [ ] `work/05-research.md` created

## Next Step

→ [06-update-task-with-research.md](./06-update-task-with-research.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-planning:0.2.0:2026-09-01T12:25:50Z -->
