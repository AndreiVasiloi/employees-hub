+++
name = "flow.proc.setup"
description = "Guided first-run warehouse setup. Walks through project identity, skills check, integration configuration, and workspace completion. Triggered by flow.agent when pending_setup = true."
license = """
© 2026 Endava (UK) Limited. All rights reserved.
Endava Confidential and Proprietary. May include Endava trade secrets.
Internal reference / reusable material.
Use is restricted to authorised persons on a need-to-know basis for approved Endava or project purposes.
Do not disclose outside authorised recipients except under applicable confidentiality obligations. See the LICENSE.md file in this repository.
"""
+++

# Warehouse Setup

## Step Execution Rule

**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step  
❌ Reading ahead &nbsp; ❌ Multiple steps &nbsp; ❌ Skipping step files

## Overview

`flow.proc.setup` is the guided first-run configuration process for a newly initialised Dava.Flow Context Warehouse. It is triggered automatically by `flow.agent` when `pending_setup = true` is present in `.flow/config.toml`, and can also be invoked directly by the user at any time.

The process walks through four deferrable steps:

1. **Project Identity** — name, tech stack, repos, spec structure
2. **Skills Check** — verify and install the base skills profile
3. **Integrations** — sync profiles and per-phase workflow bindings
4. **Complete** — deferred items, optional commit, clear `pending_setup`

Every sub-section within each step can be skipped with "Skip for now". Step 4 surfaces all skipped items with instructions to re-invoke them later. The skill is **re-entrant**: say "Let's Flow Setup" at any time to resume or revisit any step.

Output formatting follows `flow.util.output-decoration` conventions.

## Trigger Phrases

| Trigger | Context |
|---------|---------|
| `Let's Flow Setup` | Start or resume setup |
| `Setup` | Shorthand trigger |
| `/setup` | Slash command variant |
| Automatic | `flow.agent` routes here when `pending_setup = true` |

## Prerequisites

- `dft init` has been run (warehouse scaffold and `.flow/config.toml` exist)
- `dft auth` has been run (Conduit authentication in `~/.config/dft/`)

## Process Steps

| # | Step File | Purpose |
|---|-----------|---------|
| 1 | [01-project-identity.md](./steps/01-project-identity.md) | Warehouse name, tech stack, repos, spec structure, guidelines, task ID |
| 2 | [02-skills-check.md](./steps/02-skills-check.md) | Verify and install base skills via `dft skills update` |
| 3 | [03-integrations.md](./steps/03-integrations.md) | Sync connection profiles and per-phase workflow bindings |
| 4 | [04-complete.md](./steps/04-complete.md) | Deferred items list, optional commit, clear `pending_setup`, handoff |

## Deferral Pattern

When the user says "Skip for now" on any sub-section:

1. Acknowledge: "Noted — skipping [sub-section name]. I'll add it to the deferred list."
2. Add the item to your in-session deferred list (internal context only)
3. Continue to the next sub-section immediately
4. Step 4 presents the full deferred list with re-invoke instructions

## Re-entry

This skill is re-entrant. Say "Let's Flow Setup" at any time to resume setup.

- To configure JIRA later: say "Setup JIRA" or load `flow.proc.config-jira`
- To configure Miro later: say "Setup Miro" or load `flow.proc.config-miro`
- To re-run any individual step: say "Let's Flow Setup — Step [N]"
