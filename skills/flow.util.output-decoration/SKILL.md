+++
name = "flow.util.output-decoration"
description = "Canonical output decoration conventions for all Dava.Flow skills and agents — heading hierarchy, emoji palette, banner formats, progress indicators, and handoff lines."
license = """
© 2026 Endava (UK) Limited. All rights reserved.
Endava Confidential and Proprietary. May include Endava trade secrets.
Internal reference / reusable material.
Use is restricted to authorised persons on a need-to-know basis for approved Endava or project purposes.
Do not disclose outside authorised recipients except under applicable confidentiality obligations. See the LICENSE.md file in this repository.
"""
+++

# Output Decoration

Canonical reference for all Dava.Flow output decoration conventions. Load this skill when authoring or updating any Dava.Flow skill or agent to ensure consistent, coherent output formatting.

**Upstream source**: `specification/architecture/turbine/personality.md` in `dava.flow-core-warehouse`. All content below is extracted verbatim from that document. If conventions change, update this skill to match.

## When to Use

Load this skill when:
- Authoring a new agent `SKILL.md` and need the correct startup banner format
- Authoring a new process `SKILL.md` and need the correct process banner and progress line format
- Updating an existing skill to use the canonical emoji palette
- Reviewing output formatting for consistency (e.g. DFT-0195 — Agent Banner Standardisation)

## Principle

Output should be **informative first, decorative second**. Emojis and formatting exist to aid scanning and convey tone — not to add noise. Every decoration must earn its place.

## Heading Hierarchy

| Context | Style | Example |
|---------|-------|---------|
| Agent startup banner | `#` H1, emoji prefix | `# 🌊 Flow Agent` |
| Process startup banner | `##` H2, emoji prefix | `## 🔍 Explore — Discovery Planning` |
| Step header | `###` H3, no emoji | `### Step 1: Session Entry` |
| Section within a step | `####` H4, no emoji | `#### Project Identity` |

H1 is reserved for the outermost container (agent or CLI command). H2 for processes and major phases. H3/H4 for internal structure only.

## Agent Startup Banner

Every agent begins its first message with a consistent banner block:

```
# {emoji} {Agent Name}

**Phase**: {Phase}  
**Triggered by**: {trigger phrase}  
**Session**: {date}

---
```

Example (`govern.agent`):

```
# ⚙️ Govern Agent

**Phase**: Govern  
**Triggered by**: Let's Govern  
**Session**: Tuesday 8 April 2026

---
```

The banner is output **once** at the start of the agent session. It is not repeated between steps.

## Process Startup Banner

When a process skill starts (either standalone or loaded by an agent), it outputs:

```
## {emoji} {Process Name}

> {one-line description of what this process does}

**Step 1 of {N}** — {Step Name}
```

Example (`govern.proc.task-planning`):

```
## 📋 Task Planning

> Transform a validated task definition into a comprehensive technical implementation plan.

**Step 1 of 4** — Load Task Context
```

## Progress Indicators

Use a consistent progress line at the start of each step transition:

```
**Step {N} of {Total}** — {Step Name}
```

For multi-item progress within a step (e.g. scanning files, installing skills):

```
  ✓ Loaded AGENTS.md
  ✓ Found 3 tasks in work/02-planning/
  ⚠ No .flow/config.toml found — using defaults
  ✗ Registry unreachable — skills check skipped
```

Status icons:

| Icon | Meaning |
|------|---------|
| ✓ | Completed / found / success |
| ⚠ | Warning / degraded / optional |
| ✗ | Failed / missing / blocked |
| → | Routing / handing off |
| … | In progress / loading |

## Emoji Palette

Emojis are assigned by phase and archetype. Use these consistently — do not improvise:

| Phase / Context | Emoji | Usage |
|-----------------|-------|-------|
| Flow (cross-cutting) | 🌊 | Flow Agent banner, flow-level messages |
| Signal | 📡 | Signal Agent banner, signal-level messages |
| Explore | 🔍 | Explore Agent banner, explore-level messages |
| Govern | ⚙️ | Govern Agent banner, govern-level messages |
| Evolve | 📈 | Evolve Agent banner, evolve-level messages |
| Success / complete | ✓ | Inline status |
| Warning | ⚠ | Inline status |
| Error / blocked | ✗ | Inline status |
| Routing / handoff | → | Transition lines |
| Thinking / loading | … | In-progress indicators |
| Setup / onboarding | 🚀 | Init and setup completion |
| Task / planning | 📋 | Task-related processes |
| Calendar / time | 📅 | Date-related context |

Do not use emojis in:
- Step headers (H3 and below)
- Error messages
- Code blocks or TOML/JSON output
- Table cell content (except the palette table above)

## Handoff Lines

When an agent or process hands off to another, use a consistent closing line:

```
→ Routing to {Target Agent/Process}.
---
```

For process completion:

```
✓ {Process Name} complete. Returning to {Agent Name}.
---
```
