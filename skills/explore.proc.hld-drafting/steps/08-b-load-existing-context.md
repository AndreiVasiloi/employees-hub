# Step 08b: Load Existing Context

**Mode**: `baseline` only

## Objective

Load the canonical HLD template and all available context about the existing system. Confirm the slug and verify that required inputs are present before populating the HLD.

## Entry Criteria

- [ ] `mode: baseline` declared at skill invocation
- [ ] Context baseline available (domain model, system map, constraints)
- [ ] Slug identified for file naming

## Actions

### 08b.1 Load HLD Template

Load the canonical template from `explore.util.hld-template/templates/hld-template.md`.

This is the authoritative 13-section structure. All sections must be present in the output.

### 08b.2 Load Existing System Context

Load available context artifacts. Map each to the HLD section it will inform:

| Artifact | Path | HLD Sections |
|----------|------|--------------|
| Context documentation | `explore/explore-[slug]/context.md` | 1, 2 |
| Domain analysis | `explore/explore-[slug]/domain-analysis.md` | 8 |
| Technical feasibility | `explore/explore-[slug]/technical-feasibility.md` | 3, 4, 9 |
| System map / integrations | `explore/explore-[slug]/system-map.md` | 2.4, 5, 11 |
| Risk register | `explore/explore-[slug]/risks.md` | 12.1 |
| Existing ADRs | `explore/decisions/[slug]-adr-*.md` | 1.4, 12.2 |

Load what exists. For missing artifacts, mark the corresponding HLD section with `[ASM — [artifact] not available]`.

### 08b.3 Verify Required Inputs

Confirm minimum required inputs are available:
- [ ] At least one description of what the existing system does
- [ ] At least one integration or component boundary known
- [ ] Slug confirmed

**STOP**: If no system context exists at all, ask the human to provide a brief description of the system before proceeding. Architecture documentation without any context produces unreliable baselines.

### 08b.4 Confirm Output Path

The baseline HLD writes to a dedicated path to avoid overwriting any new design HLD:

```
explore/hlds/[slug]-existing-hld.md   (Status: Existing Baseline)
```

Confirm the slug with the human if it has not already been used in this engagement.

## Exit Criteria

- [ ] HLD template loaded from `explore.util.hld-template`
- [ ] Available context artifacts loaded and mapped to HLD sections
- [ ] Missing artifacts noted with `ASM` tags
- [ ] Output path confirmed

## Next Step

→ [09-b-populate-hld.md](./09-b-populate-hld.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.hld-drafting:0.2.1:2026-08-31T12:53:29Z -->
