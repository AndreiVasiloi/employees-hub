# Step 4: Draft Key Decisions and Technology Stack

Document architectural decisions with ADR references, and declare the technology stack (committed choices vs TBD items).

```
HLD: Key Architectural Decisions + Technology Stack

## Key Architectural Decisions
Reference ADRs for detailed rationale:

1. [Decision title] — see [adr-reference]
   - Decision: [What was decided]
   - Impact: [What this means for the design]

## Technology Stack

Frontend:
- Framework: [Choice or TBD]
- State Management: [Choice or TBD]
- UI Library: [Choice or TBD]
- Channel posture: [Description]

Backend:
- Language: [Choice or TBD]
- Framework: [Choice or TBD]
- API Style: [Choice or TBD]
- Core backend shape: [Description]

Data Layer:
- Primary Database: [Choice or TBD]
- Cache: [Choice or TBD / not yet evidenced]
- Message Queue: [Choice or TBD / not yet evidenced]

Infrastructure:
- Cloud Provider: [Choice or TBD / not yet evidenced]
- Container Orchestration: [Choice or TBD / not yet evidenced]
- CI/CD: [Choice or TBD / not yet evidenced]

⚙️ Abstraction rules enforced:
- [✓/✗] Every technology choice justified by THIS workload's requirements
- [✓/✗] No infrastructure inherited from adjacent systems without justification
- [✓/✗] TBD items explicitly marked — not silently assumed

Committed decisions: [N] | TBD items: [N]

How would you like to proceed?
- Correct — proceed to security and operational sections
- Adjust decisions — tell me which decision and what to change
- Adjust tech stack — tell me which choices should be different
```

**STOP**: Wait for architect to validate decisions and technology stack.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.hld-drafting:0.2.1:2026-08-31T12:53:29Z -->
