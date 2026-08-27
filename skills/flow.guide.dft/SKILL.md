+++
name = "flow.guide.dft"
description = "Progressive-disclosure reference for the Dava.Flow Turbine CLI (dft). Load this skill to understand what dft can do; load individual guide files for deeper command-family detail. Always prefer dft over manual file operations when a deterministic command exists."
license = "Proprietary. See LICENSE.md"
+++

# Dava.Flow Turbine CLI Guide

`dft` is the deterministic CLI for Dava.Flow Context Warehouses. Both humans and LLMs use it to initialise warehouses, manage skills, navigate tasks, run syncs, and generate reports.

## Core Principle

**Prefer `dft` over manual operations.** If a `dft` command exists for an action, use it instead of hand-editing files, moving folders, or scripting. `dft` commands are idempotent, safe, and produce predictable output.

## Getting Deeper Documentation

Every command family supports `--llm` for machine-readable documentation:

```bash
dft <command> --llm
```

Use this when you need argument details, behaviour descriptions, safety guardrails, or examples beyond what this index provides.

## Command Family Index

| Family | Command | Type | One-liner | Guide |
|--------|---------|------|-----------|-------|
| **init** | `dft init [path]` | Mutating | Scaffold a new Context Warehouse with phase-aligned structure | [guides/init.md](./guides/init.md) |
| **skills** | `dft skills <sub>` | Mixed | Manage Flow Skills — install, list, remove, search, update | [guides/skills.md](./guides/skills.md) |
| **task** | `dft task <sub>` | Mixed | Map dependencies, suggest next tasks, claim work | [guides/task.md](./guides/task.md) |
| **sync** | `dft sync <profile>` | Mutating | Sync with external systems (JIRA, GitHub, etc.) | [guides/sync.md](./guides/sync.md) |
| **activity** | `dft activity <sub>` | Mixed | Bind files to external collaboration tools (Miro, etc.) | [guides/activity.md](./guides/activity.md) |
| **reports** | `dft reports <sub>` | Read-only | Generate metrics, velocity, and sprint reports | [guides/reports.md](./guides/reports.md) |
| **config** | `dft config check` | Read-only | Validate warehouse configuration | [guides/config.md](./guides/config.md) |
| **aux** | `dft aux <sub>` | Read-only | Auxiliary tools — video generation, PDF generation | [guides/aux.md](./guides/aux.md) |
| **res** | `dft res <sub>` | Read-only | Context Warehouse utilities — artifact resolution, frontmatter extraction | [guides/res.md](./guides/res.md) |

## Quick Reference — Most Used Commands

### Task Discovery
```bash
dft task next              # Suggest next task based on dependency graph
dft task map               # Visualise task dependency graph
dft task claim <task-id>   # Claim a task to begin work
```

### Skill Management
```bash
dft skills list            # Show installed skills (tree view)
dft skills add <slug>      # Install skill + transitive dependencies
dft skills remove <slug>   # Remove skill + clean orphans
dft skills search <query>  # Search the registry
dft skills info <slug>     # Detailed skill info
dft skills update          # Update to latest compatible versions
dft skills clean           # Reset skills/ to match manifest
```

### Configuration & Validation
```bash
dft config check           # Validate warehouse config
```

### Reports
```bash
dft reports numbers        # Velocity and sprint metrics (TOML output)
```

## Safety Classification

| Safety Level | Commands |
|-------------|----------|
| **Read-only** (safe for autonomous use) | `task next`, `task map`, `skills list`, `skills search`, `skills info`, `config check`, `reports numbers`, `res fm`, `activity list`, `activity status` |
| **Mutating** (require human approval) | `init`, `skills add`, `skills remove`, `skills update`, `skills clean`, `task claim`, `sync`, `activity start`, `activity sync`, `activity unbind`, `aux videogen` |

## Integration with Workflows

- **govern.agent**: Uses `dft task next` for work discovery, `dft skills add` for on-demand skill installation
- **govern.proc.***: Workflow skills may use `dft task claim` and `dft reports numbers`
- **flow.guide.git**: Complements this guide — `dft` handles warehouse operations, `git` handles version control

## On-Demand Skill Installation

**Agents MUST install required skills before using them.** When a workflow requires a skill that isn't installed:

```bash
# Check and install if missing
dft skills list | grep <slug> || dft skills add <slug>
```

This is the standard pattern for all phase agents. Do not attempt to load or reference a skill that isn't installed — the files won't exist.

## Gotchas

- ⚡ **`--llm` is read-only**: Always safe to run. Use it liberally when you need deeper docs.
- ⚡ **`dft skills add` installs transitive deps**: You don't need to manually install dependencies of dependencies.
- ⚡ **`dft task next` is deterministic**: Do not apply LLM heuristics on top of its output — present it faithfully.
- ⚡ **`dft sync` touches external systems**: Never run without human approval. Credentials must never be logged.
