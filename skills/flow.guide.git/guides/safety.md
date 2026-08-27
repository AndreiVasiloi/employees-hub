# Git Safety

## Command Safety Classification

### ✅ Safe for Autonomous Use (Read-Only)

These commands have no side effects. LLMs and automation can run them freely.

```bash
git status
git diff
git diff --staged
git log -n <N>           # ALWAYS limit with -n
git branch
git branch --show-current
git stash list
git remote -v
```

### ✅ Allowed — Requires Human Approval

These commands modify local or remote state. Present the command to the human and wait for approval.

```bash
git add <specific-paths>   # Never git add . or git add -A
git commit -m "<msg>"      # Verify message follows conventions
git checkout -b <branch>   # Verify naming convention
git switch <branch>        # Verify target
git push                   # Verify branch and remote
git push -u origin <branch>
git pull --rebase          # Verify no conflict risk
git fetch                  # Network operation
git stash                  # Verify intent
git stash pop              # Verify target
```

### ❌ Never Use — Destructive or History-Rewriting

These commands are **never** acceptable unless the human explicitly requests one and confirms understanding of the consequences. Even then, flag the risk.

| Command | Risk |
|---------|------|
| `git push --force` | Rewrites remote history. Other developers lose commits. |
| `git push --force-with-lease` | Safer but still rewrites. Only with explicit human instruction. |
| `git reset --hard` | Destroys all uncommitted changes permanently. |
| `git clean -fd` | Deletes all untracked files permanently. |
| `git rebase -i` | Interactive rebase rewrites commit history. |
| `git merge` | Creates merge commits. Use MR/PR workflow instead. |
| `git cherry-pick` | Creates duplicate commits. Prefer MR workflow. |
| `git commit --amend` | Rewrites the last commit. Only with explicit human instruction. |
| `git checkout .` | Discards ALL unstaged changes in the entire tree. |
| `git branch -D` | Force-deletes a branch even if unmerged. |

## Recovery Patterns

If something goes wrong:

### Accidentally staged wrong files
```bash
git reset HEAD <file>     # Unstage specific file (safe — does not discard changes)
```

### Need to undo last commit (not pushed)
```bash
git reset --soft HEAD~1   # Undo commit but keep changes staged
```
**Note**: Only use if the commit has NOT been pushed. If pushed, ask the human.

### Conflict during rebase
```bash
# Resolve conflicts in the files, then:
git add <resolved-files>
git rebase --continue

# Or abort the rebase entirely:
git rebase --abort
```

## Golden Rules

1. **Never `git add .`** — always stage specific paths
2. **Always `--rebase` on pull** — linear history
3. **Never force push** — ask the human
4. **Always limit `git log`** — use `-n <N>` to avoid context flooding
5. **Branch type must match work type** — violations are caught in review
6. **Commit message must follow convention** — type, ID, imperative mood
7. **All merges via MR/PR** — never merge locally to default branch
