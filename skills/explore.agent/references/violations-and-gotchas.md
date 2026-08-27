### Sequencing Constraints

- **Cross-domain alignment requires all adjacent HLDs to exist.** The `explore.util.cross-domain-alignment` skill treats missing adjacent HLDs as BLOCKERs. In multi-domain Explores, ensure all adjacent domains have completed HLD drafting (B.2) before running cross-domain alignment in any domain's B.3 (Review & Hardening). Recommend completing parallel HLD drafts before starting alignment on any single domain.

## Violation Checks

**Human-First Pattern Violations:**
- ❌ Agent produced artifact for activity steering team did not select in Step 1
- ❌ Agent asked "Should I create [artifact]?" during Steps 2-4
- ❌ Agent automatically proceeded to epic forming without steering team trigger
- ❌ Agent made refinement changes before steering team approved impact

**Quality & Process Violations:**
- ❌ Gate advanced without agent declaring PASS
- ❌ Hypothesis written before inline readiness evaluation
- ❌ PRD written before inline readiness evaluation
- ❌ Explore Bundle skipped
- ❌ Stakeholder validation skipped
- ❌ Signal `[ASSUMPTION]` claims not listed as open questions
- ❌ Domains validation skipped
- ❌ Govern Readiness Check not run by agent

**Domain Traceability Violations:**
- ❌ PRD or HLD named without consulting Domain Glossary
- ❌ Domain name does not exactly match Domain Glossary entry
- ❌ PRD generated for domain not in domain-analysis.md
- ❌ Agent invented or inferred domain name instead of using glossary
- ❌ Traceability header block missing or incomplete
- ❌ `[GLOSSARY-GAP]` flags not reviewed before Govern Readiness
- ❌ Multi-domain Explore proceeded without domain-analysis.md

**Domain-Driven Labels** (non-blocking flags, must resolve before Govern Readiness):
- `[GLOSSARY-GAP: term "{term}" not found in domain-analysis.md]` — term used in PRD/HLD not present in Domain Glossary
- `[DOMAIN-RULE-VIOLATION: requirement conflicts with rule "{rule}" in domain-analysis.md]` — requirement contradicts a documented domain rule

## Success Indicators

### Red Flags
- ⚠️ Step 1 stalls → Steering team not aligned on scope
- ⚠️ Steps 2-4 consume disproportionate effort → Too many activities selected
- ⚠️ Step 5 consumes disproportionate effort → Insufficient discovery in Steps 2-4
- ⚠️ <60% quality score → Inconsistencies not caught early
- ⚠️ >30% rework rate → Discovery insufficient or requirements changing

## Gotchas

- ⚡ **Explore Type lock-in**: Once the steering team selects an Explore Type (Fast Lane / ERC / Diverge/Converge), the agent tends to rigidly follow that intensity even when early findings suggest a different depth is needed. Re-evaluate Explore Type after Step 2 if discovery reveals unexpected complexity.
- ⚡ **Activity overload**: Steering teams often approve too many activities "just in case." The agent will faithfully execute all of them, consuming the budget. Push back during Step 1 — fewer, better-scoped activities produce higher-quality artifacts.
- ⚡ **Silent assumption propagation**: If a `[ASSUMPTION]` tag in an early artifact (e.g., context documentation) is never validated, it silently propagates into hypotheses, PRDs, and epics as if it were fact. Run assumption audits at each step transition, not just at the end.
- ⚡ **Glossary drift**: If `domain-analysis.md` is updated during Steps 4–5 (e.g., new terms discovered during PRD or HLD drafting), re-validate all existing PRD/HLD terminology against the updated glossary. Stale glossary references are worse than no glossary.
- ⚡ **Subdomain vs. domain confusion**: The steering team must decide the mapping level — whether PRDs/HLDs are per-domain or per-subdomain. The agent should not infer this; ask explicitly during the domain-to-artifact mapping gate.
- ⚡ **Cross-domain requirements**: Requirements that span multiple domains live in the owning domain's PRD and are cross-referenced from other domain PRDs. Never duplicate requirements across PRDs.
- ⚡ **Discovery/solutioning bleed**: Architecture Context (Activity 6 in Step 2) should produce architectural drivers and domain context — NOT design decisions. If the agent starts making design choices during discovery, redirect to Step 5 where design decisions belong.
- ⚡ **Architecture context continuity**: If the team ran Architecture Context in Step 2, the consolidated `architecture-context.md` is automatically consumed by Architecture Solutioning in Step 5 B.1.1. No manual artifact mapping needed — single consolidated document replaces the former multi-artifact handoff.
