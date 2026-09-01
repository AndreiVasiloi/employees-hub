# Step 10b: Present HLD for Review

**Mode**: `baseline` only

## Objective

Present the populated HLD draft to the steering team for confirmation. Resolve human-input flags. Obtain approval before writing the document to the output path.

## Entry Criteria

- [ ] Step 09b complete — all 13 HLD sections populated

## Actions

### 10b.1 Present HLD Summary

Present the following to the human:

1. **System identified**: `[slug]` — `[system name and one-line description]`
2. **Evidence coverage**: How many sections are `OBS`-majority vs `ASM`-majority
3. **Human-input flags**: The consolidated list of sections requiring human input (from Step 09b.3)
4. **Key findings**: Any surprising or notable observations about the existing architecture
5. **Proposed ADR topics**: A preliminary list of significant decisions identified for Step 12b

### 10b.2 Resolve Human-Input Flags

For each flagged section, ask the specific question collected in Step 09b.3.

```
Sections needing your input:

[Section N] — [specific question]
[Section N] — [specific question]

Please provide what you know. For items you cannot answer, I will mark them
ASM and include them in Section 12.3 as open questions.
```

Wait for human response before proceeding.

### 10b.3 Incorporate Human Input

Update the relevant sections with the human's responses. Apply `OBS` tags to confirmed information provided directly by the human.

### 10b.4 Request Approval

Present a section-by-section summary and ask for approval to write the document:

```
HLD draft is ready for [slug]. Summary:

| Section | Status | Evidence Level |
|---------|--------|---------------|
| 1. Executive Summary | ✅ Complete | OBS |
| 2. System Overview | ✅ Complete | OBS/INF |
| ... | ... | ... |
| [N]. [Section] | ⚠️ Partial | ASM |

Proceed to write? Or would you like to adjust any section?
```

**STOP**: Wait for human approval before writing. If changes are requested, apply them and re-present the affected sections.

## Exit Criteria

- [ ] Human-input flags resolved (answered or explicitly deferred to Section 12.3)
- [ ] Human has confirmed the HLD draft is ready to write

## Next Step

→ [11-b-write-hld.md](./11-b-write-hld.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.hld-drafting:0.2.1:2026-08-31T12:53:29Z -->
