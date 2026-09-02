# Epic Pattern Analysis

## Existing Landscape

No epic artifacts exist yet in `explore/epics/`; only the folder index is present. There is therefore no project-specific epic pattern to amend or imitate.

## Adopted Initial Pattern

- **Grouping logic:** an independently valuable business capability, sequenced by prerequisite capability rather than by frontend/backend technical layer.
- **Naming:** `EH-E<n> - <capability>` aligned with the approved PRD E1-E6 labels.
- **Domain:** Employee Leave Management.
- **Status:** Ready for Breakdown after steering-team acceptance and Govern-readiness validation.
- **Epochs:** one initial epoch (`0`) per epic. Future epochs represent material approved scope changes, not ordinary task progress.
- **Scope level:** target future state, high-level observable behaviors and acceptance criteria; no task list, demo plan, or implementation design.
- **Cross-cutting quality:** each epic carries applicable security, accessibility, testing, audit, and observability obligations. E6 integrates production-like delivery but does not own or defer those foundations.

## Boundary Rule

Create a new epic when the capability creates a distinct user/business outcome with a coherent dependency boundary. Under that rule, the six PRD outcomes are six new epics rather than amendments or technical-layer epics.

