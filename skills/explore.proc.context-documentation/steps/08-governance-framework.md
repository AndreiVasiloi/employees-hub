# Step 8: Governance Framework

## Objective

Document decision authority and approval gates for the project.

## Entry Criteria

- [ ] Step 7 (Assumptions & Gaps) complete with confirmed catalogues

## Actions

### 8.1 Document Decision Authority

Define who makes which decisions:

```
Governance Framework

### Decision Authority

| Decision Type | Decision Maker | Consulted | Informed | Escalation Path |
|---------------|----------------|-----------|----------|-----------------|
| **Architecture (tech stack, patterns)** | [Name (Title)] | [Names] | [Names] | [Escalation contact] |
| **Product scope (features in/out)** | [Name (Title)] | [Names] | [Names] | [Escalation contact] |
| **[Custom decision type]** | [Name] / TBD in SP2 | [Names] | [Names] | Needs clarification |
| **Timeline & resourcing** | [Name (Title)] | [Names] | [Names] | [Escalation contact] |
```

### 8.2 Define Approval Gates

```
### Approval Gates

| Gate | Approver | Criteria | Fallback |
|------|----------|----------|----------|
| Gate 1: Signal sufficient | Agent (auto) | Problem clear, context sufficient | Human override if agent wrong |
| Gate 2: Hypothesis-ready | Agent (auto) | Evidence-based personas, testable hypothesis | Human override if agent wrong |
| Gate 3: Hypothesis validated | [Name] + [Name] | Stakeholder sign-off | [Name] escalates if concerns |
| Gate 4: PRD-ready | Agent (auto) | Architecture validated, risks mitigated | Human override if agent wrong |
| Govern Readiness | Agent (auto) | All artifacts complete, no blockers | Human override if agent wrong |

Confirm governance structure or tell me what to adjust.
```

**STOP**: Wait for human to validate governance framework.

## Exit Criteria

- [ ] Decision authority defined for all decision types
- [ ] Escalation paths identified
- [ ] Approval gates defined with criteria and fallbacks
- [ ] Human validated governance framework

## Next Step

→ [09-context-summary.md](./09-context-summary.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.context-documentation:0.1.2:2026-08-27T13:34:36Z -->
