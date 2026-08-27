# dft skills

Manage Flow Skills — versioned packages that codify processes. Package-manager-like operations for installing, listing, and removing skills.

## Commands

| Command | Type | Purpose |
|---------|------|---------|
| `dft skills add <slug[@version]>` | Mutating | Install skill(s) with transitive dependency resolution |
| `dft skills list` | Read-only | Display installed skills as dependency tree |
| `dft skills remove <slug>` | Mutating | Remove skill(s) and clean up orphaned dependencies |
| `dft skills search <query>` | Read-only | Search the registry for skills |
| `dft skills info <slug>` | Read-only | Display detailed information about a skill |
| `dft skills update` | Mutating | Update skills to latest compatible versions |
| `dft skills clean` | Mutating | Reset skills folder to match the manifest |
| `dft skills create <slug>` | Mutating | Scaffold a new project skill |
| `dft skills submit` | Mutating | Submit a project skill to the registry |

## Key Behaviours

- **`add`** resolves full transitive dependency tree and installs all new skills to `skills/`
- **`remove`** re-resolves the tree from remaining explicit deps and removes orphans
- **`clean`** resets `skills/` to match `skills.toml` — useful after manual edits or failed installs
- **`list --flat`** gives alphabetical flat list; **`list --explicit`** shows only directly-added skills

## On-Demand Skill Installation for Agents

**Agents MUST install required skills before using them.** When an agent needs a skill that isn't installed:

1. Check if the skill exists: `dft skills list | grep <slug>`
2. If missing, install it: `dft skills add <slug>`
3. Wait for installation to complete before proceeding
4. The skill files will be available in `skills/<slug>/`

This pattern applies to all phase agents (signal, explore, govern, evolve) when they need workflow-specific skills. For example:

```bash
# Govern agent needs task-planning skill
dft skills list | grep govern.proc.task-planning || dft skills add govern.proc.task-planning

# Explore agent needs wireframing skill  
dft skills list | grep explore.proc.wireframing || dft skills add explore.proc.wireframing
```

**Do not attempt to use a skill that isn't installed.** The skill files won't exist and you'll fail to load the process.

## Common Patterns

```bash
dft skills add govern.proc.task-planning          # Install with deps
dft skills add govern.proc.task-planning@0.2.0    # Pin specific version
dft skills add explore.agent govern.guide.golang   # Install multiple at once
dft skills list --explicit                         # Show what you explicitly added
dft skills remove govern.guide.golang              # Remove + clean orphans
```

## Deeper Documentation

```bash
dft skills --llm
```
