# B.3: Review & Hardening

## Objective

Harden the HLD for implementation safety through four sequential sub-steps: integrate stakeholder feedback, align with adjacent domains, escalate unvalidated assumptions, and run the configurable canonical hardening checklist.

## Entry Criteria

- [ ] Gate B.2 PASS or CONDITIONAL PASS
- [ ] `[slug]-hld.md` complete (all 14 sections)
- [ ] `[slug]-decision-log.md` and `[slug]-blocker-register.md` current

**Load skill**: `explore.proc.feedback-integration`
**Conditional**: Load `explore.util.cross-domain-alignment` if adjacent HLDs available in `persistent-knowledge/`

---

## B.3.1 — Feedback Integration

**When to run**: Only if stakeholder feedback on the HLD draft is available. Skip if no feedback has been provided.

**Inputs consumed**:
- `context.md` — Stakeholder Map & RACI (authority weighting source)
- Stakeholder feedback provided by PM/Architect

**Actions**:

1. **Catalog** feedback — tag each item with source stakeholder and authority level from RACI
2. **Consistency audit** — before rewriting, check for:
   - Terminology drift from `domain-analysis.md` glossary
   - Boundary changes that contradict validated `[slug]-boundary-map.md`
   - Semantic shifts in component responsibilities
   - Silent decision reversals on accepted ADRs
3. **Disposition** — per item, RACI-weighted:
   - `ACCEPT` — integrate as-is
   - `ACCEPT WITH MODIFICATION` — integrate with scoped adjustment
   - `REJECT` — document rationale; high-authority stakeholder rejection escalates to decision log
   - `DEFER TO LLD` — out of HLD scope; flag for LLD
4. **Integrate** accepted items → regression check after each integration
5. Write `explore/hlds/[slug]-feedback-disposition.md`

---

## B.3.2 — Cross-Domain Alignment

**When to run**: Only if adjacent HLDs are available in `persistent-knowledge/` or `explore/hlds/`. Skip and log reason if none available.

**Load skill**: `explore.util.cross-domain-alignment`

**Actions**:

1. Compare contracts, events, APIs, and identity models between this HLD and each adjacent domain HLD
2. Classify each mismatch:
   - `BLOCKING` — prevents integration without resolution; add to blocker register
   - `SIGNIFICANT` — requires coordination before implementation; flag in decision log
   - `MINOR` — cosmetic or naming difference; note in HLD Section 13
3. Write `explore/hlds/[slug]-cross-domain-alignment.md`

---

## B.3.3 — Evidence Escalation

**Inputs consumed**:
- `[slug]-blocker-register.md` — all current blockers

**Actions**:

1. Walk blocker register — identify every item tagged `ASM` (ASSUMED)
2. For each ASM item: attempt to load real upstream evidence from any available Explore artifact
3. Classify each:
   - `RESOLVED` — evidence found; update tag to OBS or INF; remove from blocker register
   - `CORRECTED` — evidence found but contradicts assumption; update HLD accordingly; log in decision log
   - `CONFIRMED BLOCKER` — no evidence available; retain as BLOCKER with severity and resolution deadline
   - `DEFERRED` — cannot resolve now; accepted risk with owner assigned
4. Update `[slug]-blocker-register.md` and `[slug]-decision-log.md`

**Rule**: Never begin canonical hardening (B.3.4) over unvalidated ASM items. All ASM items must be classified before proceeding.

---

## B.3.4 — Canonical Hardening

**Inputs consumed**:
- `hypothesis.md` — stakeholder-validated hypothesis (validation criterion)
- `[slug]-prd.md` — all R-XXX and NFR-XXX requirements (delivery validation)
- `risks.md` — assessed risks with mitigations (risk cross-check)
- `architecture-context.md` — constraints register for constraint validation
- `handoff-notes.md` — interaction-driven NFRs (conditional: D/C)
- `regulatory-compliance.md` — compliance requirements (if EXTENDED hardening configured)

Run the configurable hardening checklist (configured in B.1.1 engagement setup):

### BASE Categories (always, all domains)

**1. BOUNDARY INTEGRITY (M1, M4)**
- No component owns logic outside its declared boundary
- Every component has negative boundary statements (what it does NOT own)
- Cross-boundary logic is flagged and resolved
- Truth hierarchy respected — Canonical items never overridden by Directional without ADR

**2. CROSS-VIEW CONSISTENCY (M3)**
- All diagrams tell the same story (C4 context, containers, components)
- Decisions in ADRs are visible in HLD sections
- Technology stack in Section 6 matches what appears in diagrams and Section 3
- Component names consistent across all sections

**3. FAILURE MODE ANALYSIS**
- Critical failure scenarios documented for each integration boundary
- Upstream data incomplete: what happens when a dependency returns partial/corrupt data?
- Concurrent race conditions: identified for shared state operations
- External system unavailability: degraded mode or fallback defined for each integration

**4. CONTRACT COMPLETENESS (M8, M9)**
- Every upstream dependency in `[slug]-boundary-map.md` has a contract status
- PROVISIONAL contracts are in blocker register with resolution deadline
- Downstream schemas defined for all events produced (M6)
- API contracts in Section 11 are complete (endpoint, method, request/response schema, error semantics)

### EXTENDED Categories (from engagement brief quality attributes)

Run only the categories configured in B.1.1:

| Category | Trigger | What is Checked |
|----------|---------|-----------------|
| **REGULATORY COMPLIANCE** | `regulatory-compliance.md` exists | Data residency, consent tracking, audit trail, non-negotiables from regulatory-compliance.md |
| **LATENCY BUDGET** | NFR latency targets defined | End-to-end latency chain across integration boundaries vs NFR-XXX targets |
| **THREAT MODEL** | Security quality attribute in engagement brief | Authentication, authorization, data protection, injection surfaces, secrets management |
| **AVAILABILITY** | Availability SLO target in engagement brief | SLO targets vs architecture redundancy; SPOF analysis |
| **AUDITABILITY** | Audit/compliance requirements | Audit event coverage, tamper-proof log storage, retention policy |

### DOMAIN Categories

Run categories listed in `persistent-knowledge/[domain]-profile.md` domain-specific hardening rules (if profile exists).

### Resolution Priority

Resolve findings in this order — P1 must be resolved before P2 can begin:

```
P1 — Truth hierarchy / ownership violations    (M1, M4)
P2 — Runtime correctness / determinism issues  (M5, M6)
P3 — Abstraction level violations              (M7, M8)
P4 — Polish / terminology / formatting         (M3)
```

### Hypothesis Validation

Verify the architecture can deliver the stakeholder-validated hypothesis from `hypothesis.md`:
- Each hypothesis success metric maps to at least one HLD component
- If the architecture CANNOT deliver a success metric → flag as `BLOCKING`

### PRD Validation

Verify the architecture can deliver all PRD requirements:
- Every R-XXX requirement maps to at least one HLD component
- Every NFR-XXX target has a corresponding quality attribute constraint in HLD Section 8
- Cross-check NFR targets against HLD Sections 9 (Scalability) and 11 (Monitoring)

## Checkpoint

**STOP — AskUserQuestion:**

```
Question ARCH-B3
  Header:      "Hardening Results"
  Question:    "Hardening complete:
                - [N] BLOCKER issues
                - [N] SIGNIFICANT issues
                - [N] MINOR issues
                - Hypothesis validation: [VALIDATES / CONCERNS / DOES NOT VALIDATE]
                - PRD validation: [ALL REQUIREMENTS ADDRESSED / GAPS FOUND]
                
                [List BLOCKER and SIGNIFICANT issues with proposed resolution for each]
                
                How should we proceed?"
  Multi-select: No
  Options:
    - Resolve blockers now — address blocker issues in this session
    - Accept classification — proceed to finalization with tracked caveats
    - Reclassify — adjust severity levels for specific items
```

**Gate B.3** (human decides):
- **PASS** — no BLOCKERs → proceed to B.4
- **CONDITIONAL PASS** — BLOCKERs accepted with explicit rationale and owner → proceed to B.4 with caveats tracked
- **FAIL** — BLOCKERs must be resolved → loop back to address specific issues
- **WHOLESALE REDESIGN** — fundamental architectural flaw → retain completed outcomes per M12 → loop to B.1.1

**On WHOLESALE REDESIGN**: Log all retained outcomes (completed components, validated decisions, confirmed boundaries) to `[slug]-decision-log.md` before looping.

## Exit Criteria

- [ ] B.3.1: `[slug]-feedback-disposition.md` written (or skipped with reason logged)
- [ ] B.3.2: `[slug]-cross-domain-alignment.md` written (or skipped with reason logged)
- [ ] B.3.3: All ASM items classified; blocker register updated
- [ ] B.3.4: Canonical hardening complete — all BASE categories run; applicable EXTENDED and DOMAIN categories run
- [ ] Hypothesis validation result documented
- [ ] PRD validation result documented (all R-XXX and NFR-XXX addressed or gap logged)
- [ ] All findings P1–P4 resolved or explicitly accepted with owner
- [ ] Gate B.3 PASS or CONDITIONAL PASS (or WHOLESALE REDESIGN with M12 outcomes retained)

## Next Step

→ [B4-finalization-handoff.md](./B4-finalization-handoff.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.architecture-solutioning:1.0.1:2026-09-01T08:21:26Z -->
