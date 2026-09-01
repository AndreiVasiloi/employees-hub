# Step 7: Validate and Finalize Draft

Run the validation checklist on the complete HLD.

**Validation checklist:**

- [ ] All 14 template sections present and complete
- [ ] System Overview clearly states architectural boundary and exclusions
- [ ] Architecture Approach pattern justified by current evidence
- [ ] Component Breakdown has non-overlapping responsibilities
- [ ] Integration & Data Flows cover all external and internal dependencies
- [ ] Key Decisions reference ADR files with decision + impact summaries
- [ ] Technology Stack distinguishes committed choices from TBD items
- [ ] Security covers auth, encryption, compliance, auditability, retention
- [ ] Scalability, Deployment, and Monitoring are proportionate to current evidence
- [ ] Open Questions have owners and target resolution dates
- [ ] Architecture rules enforced: bounded-context, input binding, event-driven, terminal states, layer separation, human flows, immutable corrections
- [ ] Abstraction rules enforced: no unjustified infrastructure, TBD items explicit
- [ ] Decision log updated with any new decisions from drafting
- [ ] Blocker register updated with any new blockers from drafting
- [ ] Enrichment Log and Document History are current
- [ ] File written to correct path with correct slug

```
HLD Draft Complete

File: explore/hlds/[slug]-hld.md
Sections: 14
Components: [N]
External integrations: [N] (in scope: [N], excluded: [N])
Key flows: [N]
Decisions documented: [N]
Technology choices committed: [N] | TBD: [N]
Open questions: [N] (with owners)
Blockers discovered during drafting: [N]
Architecture rules: [N] of 7 enforced ✓
Abstraction rules: [N] of 3 enforced ✓
Validation: [N] of 16 checks passed ✓

Ready for Feedback Integration skill (after stakeholder review).
```

**STOP**: Wait for architect to confirm the draft is ready for stakeholder distribution.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.hld-drafting:0.2.1:2026-08-31T12:53:29Z -->
