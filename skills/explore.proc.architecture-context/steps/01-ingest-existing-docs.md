# Step 1: Ingest Existing Documents

## Objective

Read all client-provided architecture documents, extract architecture-relevant content, and produce an existing-state architecture baseline. This is the "read and document" foundation — capture what exists before analyzing it.

## Entry Criteria

- [ ] `explore/explore-[slug]/context.md` exists (Context Documentation complete)
- [ ] `explore/explore-[slug]/technical-feasibility.md` exists (Technical Feasibility complete)
- [ ] Slug confirmed

## Actions

### 1.1 Inventory Available Documents

Scan for and catalog all architecture-relevant documents:

**From Explore artifacts (already in Context Warehouse):**

| Artifact | Path | What to Extract |
|----------|------|-----------------|
| Context baseline | `explore/explore-[slug]/context.md` | Domain model, system map, stakeholder map, technical constraints |
| Technical feasibility | `explore/explore-[slug]/technical-feasibility.md` | System context, integrations, dependencies, design guardrails |
| Regulatory compliance | `explore/explore-[slug]/regulatory-compliance.md` | Compliance constraints, non-negotiables (if Activity 4 ran) |
| Market research | `explore/explore-[slug]/market-research.md` | Competitive landscape (if Activity 2 ran) |

**From client-provided documents (may need ingestion):**

| Document Type | What to Extract |
|---------------|-----------------|
| Existing HLDs | Current architecture state, component inventory, integration points |
| System diagrams | Component relationships, data flows, deployment topology |
| API specifications | Endpoint inventory, contract formats, versioning |
| Runbooks / operational docs | Operational constraints, SLA expectations, failure modes |
| Infrastructure docs | Platform capabilities, hosting model, cloud services |
| Security docs | Auth model, encryption, compliance posture |
| Previous ADRs | Existing architectural decisions and their rationale |

**If binary documents exist (.pdf, .docx, .pptx):**
> **Load skill:** `explore.util.document-ingestion`
>
> Convert binary documents to markdown before proceeding.

### 1.2 Read and Extract

For each document found:
1. **Read** the document end-to-end
2. **Classify** its status: `CURRENT` / `OUTDATED` / `DRAFT` / `UNKNOWN`
3. **Extract** architecture-relevant content:
   - Components and their responsibilities
   - Integration points and protocols
   - Technology stack (languages, frameworks, databases, cloud services)
   - Data ownership and flow patterns
   - Security and compliance posture
   - Operational characteristics (deployment, monitoring, scaling)
   - Known decisions and their rationale
   - Known gaps and limitations
4. **Tag** each extracted item with evidence label:
   - `OBS` — directly stated in the document
   - `INF` — inferred from document content
   - `ASM` — assumed (document is ambiguous or outdated)

### 1.3 Identify Conflicts and Gaps

Cross-reference extracted content across documents:
- **Conflicts** — where documents disagree (e.g., different tech stacks, conflicting boundaries)
- **Gaps** — areas with no documentation coverage
- **Staleness** — content that appears outdated based on cross-referencing

### 1.4 Produce Existing-State Baseline

**If a legacy/existing system is being inherited or extended (ERC or Diverge/Converge):**

> **Load skill:** `explore.proc.hld-drafting` with `mode: baseline`
>
> Execute Steps 08b–13b. Use the documents inventoried and extracted in Steps 1.1–1.3 as the primary evidence source.
>
> Expected outputs:
> - `explore/hlds/[slug]-existing-hld.md` (Status: Existing Baseline)
> - `explore/decisions/[slug]-adr-NNN-[name].md` (Status: Accepted)
>
> After `hld-drafting` baseline completes, return here to the Step 1 Checkpoint below.

**If greenfield (no existing system):**
Skip. Note: "Greenfield — no existing architecture to baseline."

**If Fast Lane:**
Skip existing-state HLD. Extracted findings feed directly into `architecture-context.md` (Step 5).

## Checkpoint

Present the document inventory and extracted findings:

```
Document Ingestion Complete:

Documents ingested: [N]
  • [doc name] — status: [CURRENT/OUTDATED/DRAFT] — [N] findings extracted
  • [doc name] — status: [CURRENT/OUTDATED/DRAFT] — [N] findings extracted

Existing-state baseline: [Produced via hld-drafting baseline / Greenfield — skipped]
Existing decisions extracted: [N] ADRs (via hld-drafting baseline, if applicable)
Conflicts found: [N]
Gaps identified: [N]

Items I need your input on:
  1. [Conflict/gap] — [description]
  2. [Conflict/gap] — [description]
```

**STOP — AskUserQuestion:**

```
Question AC-1
  Header:      "Document Ingestion Review"
  Question:    "I've ingested [N] documents and extracted architecture findings.
                Are there additional documents I should read?"
  Multi-select: No
  Options:
    - Complete — no additional documents; proceed to landscape capture
    - Additional docs — I have more documents to provide
    - Resolve conflicts — let's address the [N] conflicts I found
```

## Exit Criteria

- [ ] All available architecture documents inventoried and read
- [ ] Each document classified by status (CURRENT/OUTDATED/DRAFT)
- [ ] Architecture-relevant content extracted with evidence labels
- [ ] Conflicts and gaps identified
- [ ] Existing-state HLD produced via `explore.proc.hld-drafting` mode `baseline` (if legacy system) or greenfield noted
- [ ] Existing ADRs created and validated via `hld-drafting` baseline (if applicable)
- [ ] Human confirmed document coverage is complete

## Next Step

→ [02-capture-landscape.md](./02-capture-landscape.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.architecture-context:1.0.1:2026-08-27T13:34:38Z -->
