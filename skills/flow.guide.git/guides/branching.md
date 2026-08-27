# Branching

## Branch Naming Convention

Format: `<type>/<ID>-<slug>`

### Types

| Type | Activity | ID Prefix | Example |
|------|----------|-----------|---------|
| `plan` | Planning session | `NCPT` | `plan/NCPT-0033-country-registration-workflow` |
| `iter` | Iteration management | `NCPI` | `iter/NCPI-0163-configuration-approvals` |
| `impl` | Implementation / coding | `NCPT` | `impl/NCPT-0038-country-command-validation` |
| `epic` | Epic forming | `NCPE` | `epic/NCPE-0162-participant-onboarding` |
| `docs` | Documentation / ways of working | `NCPT` | `docs/NCPT-0159-agents-warehouse-alignment` |
| `spec` | Specification updates | `NCPT` | `spec/NCPT-0100-country-functional-view` |
| `decision` | Decision records | `NCPD` | `decision/NCPD-0001-flow-skills-entrypoint` |
| `chore` | Housekeeping | none | `chore/fix-typos-in-readme` |

### Slug Rules

- Lowercase only
- Hyphens to separate words
- Derived from the task title
- Short but descriptive (3–6 words)
- No special characters

### Creating a Branch

```bash
git checkout -b <type>/<ID>-<slug>
```

**Always create from an up-to-date main/default branch:**

```bash
git fetch
git checkout main
git pull --rebase
git checkout -b impl/NCPT-0038-country-command-validation
```

### Violations

- ❌ Branch type does not match the work being done (e.g., `impl/` for planning)
- ❌ Missing task ID (except for `chore` branches)
- ❌ Uppercase letters in branch name
- ❌ Spaces or special characters in slug
- ❌ Branch created from stale main (always fetch + pull first)
