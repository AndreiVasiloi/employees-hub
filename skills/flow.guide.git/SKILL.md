+++
name = "flow.guide.git"
description = "Constrained git instructions for LLM and human use in Context Warehouses. Covers allowed/disallowed commands, branch naming, commit message format, and safe operational patterns."
license = "Proprietary. See LICENSE.md"
+++

# Git Conventions Guide

Constrained git instructions for working in Dava.Flow Context Warehouses. This guide defines what you **can** and **cannot** do with git, and the naming conventions that must be followed.

## Core Principle

**Git is for version control only.** Use `dft` for warehouse operations (task management, skill installation, reporting). Use git for commits, branches, and remote interaction.

## Guide Index

| Topic | Guide | When to Load |
|-------|-------|--------------|
| **Branching** | [guides/branching.md](./guides/branching.md) | Creating or switching branches |
| **Commits** | [guides/commits.md](./guides/commits.md) | Staging and committing changes |
| **Remote Operations** | [guides/remotes.md](./guides/remotes.md) | Push, pull, fetch, MR workflows |
| **Safety** | [guides/safety.md](./guides/safety.md) | Understanding allowed vs disallowed commands |

## Command Classification

### ✅ Allowed — Safe for Autonomous Use

| Command | Purpose |
|---------|---------|
| `git status` | Check working tree state |
| `git diff` | View unstaged changes |
| `git diff --staged` | View staged changes |
| `git log -n <N>` | View recent history (always limit with `-n`) |
| `git branch` | List branches |
| `git branch --show-current` | Show current branch name |
| `git stash list` | List stashes |
| `git remote -v` | Show remotes |

### ✅ Allowed — Requires Human Approval

| Command | Purpose | Approval Reason |
|---------|---------|----------------|
| `git add <paths>` | Stage specific files | Verify correct files staged |
| `git commit -m "<msg>"` | Commit with message | Verify message format |
| `git checkout -b <branch>` | Create and switch branch | Verify naming convention |
| `git switch <branch>` | Switch branches | Verify target branch |
| `git push` | Push to remote | Verify branch and remote |
| `git pull --rebase` | Pull with rebase | Verify no conflicts |
| `git fetch` | Fetch remote refs | Network operation |
| `git stash` | Stash working changes | Verify intent |
| `git stash pop` | Restore stashed changes | Verify target |

### ❌ Disallowed — Never Use

| Command | Reason |
|---------|--------|
| `git push --force` | Rewrites remote history — destructive |
| `git push --force-with-lease` | Still rewrites history — use only with explicit human instruction |
| `git reset --hard` | Destroys uncommitted work |
| `git clean -fd` | Deletes untracked files permanently |
| `git rebase -i` | Interactive rebase rewrites history |
| `git merge` | Use MR/PR workflow instead of local merges |
| `git cherry-pick` | Creates duplicate commits — prefer MR workflow |
| `git commit --amend` | Rewrites last commit — only with explicit human instruction |
| `git checkout .` | Discards all unstaged changes |
| `git branch -D` | Force-deletes branch without merge check |

## Branch Naming Convention

Format: `<type>/<ID>-<slug>`

| Type | Activity | Example |
|------|----------|---------|
| `plan` | Planning session | `plan/NCPT-0033-country-registration-workflow` |
| `iter` | Iteration management | `iter/NCPI-0163-configuration-approvals` |
| `impl` | Implementation / coding | `impl/NCPT-0038-country-command-validation` |
| `epic` | Epic forming | `epic/NCPE-0162-participant-onboarding` |
| `docs` | Documentation / ways of working | `docs/NCPT-0159-agents-warehouse-alignment` |
| `spec` | Specification updates | `spec/NCPT-0100-country-functional-view` |
| `decision` | Decision records | `decision/NCPD-0001-flow-skills-entrypoint` |
| `chore` | Housekeeping (no task ID required) | `chore/fix-typos-in-readme` |

## Commit Message Convention

Format: `<type>(<ID>): <description>`

```
impl(NCPT-0038): Country command validation
plan(NCPT-0033): Country registration workflow
epic(NCPE-0162): Participant onboarding
docs(NCPT-0159): AGENTS warehouse alignment
chore: Fix typos in working folder READMEs
```

**Rules**:
- Type must match branch type
- ID must match the task/epic/iteration/decision being worked on
- Description is imperative mood, lowercase start, no trailing period
- `chore` commits may omit the ID parenthetical

## Identifier Prefixes

| Prefix | Entity |
|--------|--------|
| `NCPT` | Task |
| `NCPE` | Epic |
| `NCPI` | Iteration |
| `NCPD` | Decision |

## Integration with Workflows

- **govern.agent**: Loads this guide to constrain git operations during task execution
- **govern.proc.task-implementation**: Branch creation and commit patterns during coding
- **flow.guide.dft**: Complements this guide — `dft` handles warehouse operations, `git` handles version control

## Gotchas

- ⚡ **Never `git add .`**: Always stage specific paths. Wildcard staging risks committing unintended files.
- ⚡ **Always `--rebase` on pull**: Keeps history linear. Never use merge pulls in warehouse repos.
- ⚡ **Never force push**: If you need to rewrite history, stop and ask the human.
- ⚡ **Branch type must match work type**: An `impl/` branch for planning work is a violation.
- ⚡ **Limit `git log` output**: Always use `-n <N>` to avoid flooding context with history.
