# Step 13b: Validate

**Mode**: `baseline` only

## Objective

Run a completeness check on the HLD and all ADRs. Present the validation results to the steering team. This is the final step of `mode: baseline`.

## Entry Criteria

- [ ] Step 12b complete — ADRs created and linked to HLD

## Actions

### 13b.1 HLD Completeness Check

Verify the HLD at `explore/hlds/[slug]-existing-hld.md`:

- [ ] All 13 sections present and populated (stubs with `ASM` tags are acceptable)
- [ ] `Status: Existing Baseline` set in the document header
- [ ] Every claim tagged with `OBS`, `INF`, or `ASM` — no untagged assertions
- [ ] Section 1.4 lists all ADRs with one-line summaries
- [ ] ADR references present in relevant section bodies (bidirectional links)
- [ ] Section 12.3 lists all unresolved open questions with owners and target dates

### 13b.2 ADR Completeness Check

For each ADR at `explore/decisions/[slug]-adr-NNN-[name].md`:

- [ ] Numbering is sequential with no gaps
- [ ] Every ADR has at least 2 options documented
- [ ] Status is `Accepted` or `Superseded` — no ADRs remaining in `Proposed`
- [ ] Every ADR links back to the HLD section it affects
- [ ] Superseded ADRs reference the newer ADR that replaces them

### 13b.3 Present Validation Results

Present a summary to the human:

```
Baseline architecture documentation complete for [slug].

HLD: explore/hlds/[slug]-existing-hld.md
  ✅ 13 sections populated
  ✅ Evidence labels applied (OBS/INF/ASM)
  ⚠️ [N] sections with ASM-only content — listed in Section 12.3 as open questions

ADRs: [N] created at explore/decisions/[slug]-adr-*.md
  ✅ Sequential numbering (001–[NNN])
  ✅ All ADRs accepted
  ⚠️ [N] decisions with limited options evidence (flagged in ADR body)

Open questions for follow-up:
[list from Section 12.3]

This baseline HLD is ready as input to Architecture Context
(explore.proc.architecture-context).
```

### 13b.4 Flag Downstream Readiness

The baseline HLD is ready for:
- **Architecture Context** (`explore.proc.architecture-context`) — load as existing architecture context in Step 1 (Ingest Existing Docs)
- **Risk Documentation** (`explore.proc.risk-documentation`) — Section 12.1 feeds the risk register
- **Test Strategy** (`explore.proc.test-strategy`) — component boundaries and quality attributes inform test surface
- **Epic Forming** (`explore.proc.epic-forming`) — components and integration points inform task breakdown

## Exit Criteria

- [ ] HLD completeness check passed (or failures explicitly noted)
- [ ] ADR completeness check passed (or failures explicitly noted)
- [ ] Validation results presented to human
- [ ] Downstream readiness confirmed

## Completion

`mode: baseline` complete. Outputs:

| Artifact | Path | Status |
|----------|------|--------|
| Existing baseline HLD | `explore/hlds/[slug]-existing-hld.md` | Existing Baseline |
| ADRs | `explore/decisions/[slug]-adr-*.md` | Accepted |

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.hld-drafting:0.2.1:2026-08-31T12:53:29Z -->
