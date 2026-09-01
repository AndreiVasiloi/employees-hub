# Step 11b: Write HLD

**Mode**: `baseline` only

## Objective

Write the approved HLD to the output file. Mark the document as `Status: Existing Baseline` to distinguish it from any new design HLD for the same slug.

## Entry Criteria

- [ ] Step 10b complete — human has approved the HLD draft

## Actions

### 11b.1 Set Document Header

Set the header fields as follows:

```markdown
# [System Name] — High-Level Design

**Slug**: `[slug]`
**Version**: 0.1
**Status**: Existing Baseline
**Date**: [today's date]
**Author**: [agent / human name if provided]
```

The `Status: Existing Baseline` marker distinguishes this document from a new design HLD. Downstream consumers (Architecture Discovery Phase A) use this status to identify the document as a starting point for new design work, not the target state.

### 11b.2 Write to Output Path

Write the complete HLD to:

```
explore/hlds/[slug]-existing-hld.md
```

**Important**: The output path uses `-existing-hld.md` (not `-hld.md`) to prevent silent overwrite if a new design HLD is later produced for the same slug.

### 11b.3 Verify File Written

Confirm the file exists at the output path and contains all 13 sections.

## Exit Criteria

- [ ] HLD written to `explore/hlds/[slug]-existing-hld.md`
- [ ] Status set to `Existing Baseline`
- [ ] All 13 sections present in the written file

## Next Step

→ [12-b-create-adrs.md](./12-b-create-adrs.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.hld-drafting:0.2.1:2026-08-31T12:53:29Z -->
