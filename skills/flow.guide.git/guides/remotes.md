# Remote Operations

## Fetching

```bash
git fetch              # Fetch all remote refs — safe, read-only
```

Always fetch before creating branches or comparing with remote state.

## Pulling

**Always use `--rebase`:**

```bash
git pull --rebase      # Pull and rebase local commits on top of remote
```

- Keeps history linear — no merge commits from pulls
- If conflicts arise, resolve them and `git rebase --continue`
- Never use bare `git pull` (creates merge commits)

## Pushing

```bash
git push               # Push current branch to its tracking remote
git push -u origin <branch>   # First push — set upstream tracking
```

### First Push Pattern

```bash
git checkout -b impl/NCPT-0038-country-command-validation
# ... make changes, commit ...
git push -u origin impl/NCPT-0038-country-command-validation
```

### Subsequent Pushes

```bash
git push               # Tracking is already set
```

## Merge Requests / Pull Requests

All merges to the default branch happen via MR/PR workflow on the remote platform (GitLab/GitHub). Never merge locally.

### Workflow

1. Create branch locally
2. Make commits
3. Push branch to remote
4. Create MR/PR on the platform
5. Review and approve on the platform
6. Merge on the platform (squash or rebase — per project convention)
7. Pull the updated default branch locally

## Disallowed Remote Operations

| Command | Reason |
|---------|--------|
| `git push --force` | Rewrites remote history — destructive |
| `git push --force-with-lease` | Still rewrites history — only with explicit human instruction |
| `git merge origin/main` | Use `pull --rebase` instead |

## Stashing (for context switches)

```bash
git stash              # Save working changes
git stash list         # List stashes
git stash pop          # Restore most recent stash
```

Use stashing when you need to switch branches mid-work. Always `stash pop` after returning.
