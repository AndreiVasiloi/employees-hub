# Commits

## Commit Message Convention

Format: `<type>(<ID>): <description>`

### Structure

```
<type>(<ID>): <description>

[optional body]

[optional footer(s)]
```

### Type and ID

- **Type** must match the branch type (`impl`, `plan`, `epic`, `docs`, `spec`, `iter`, `decision`, `chore`)
- **ID** must match the task/epic/iteration/decision being worked on
- `chore` commits may omit the ID: `chore: <description>`

### Description Rules

- Imperative mood ("add validation" not "added validation")
- Lowercase first letter
- No trailing period
- Max 72 characters for the subject line
- Specific enough to understand the change without reading the diff

### Examples

```
impl(NCPT-0038): add Country command validation rules
plan(NCPT-0033): complete Country registration workflow plan
epic(NCPE-0162): define participant onboarding epic
docs(NCPT-0159): align AGENTS.md with warehouse structure
spec(NCPT-0100): add Country functional view specification
decision(NCPD-0001): adopt Flow Skills as warehouse entrypoint
chore: fix typos in working folder READMEs
```

### Staging

**Always stage specific paths — never use `git add .`**

```bash
git add govern/working/04-implementing/NCPT-0038-country-validation/task.md
git add govern/working/04-implementing/NCPT-0038-country-validation/plan.md
```

**Verify before committing:**

```bash
git diff --staged    # Review what will be committed
git status           # Confirm only intended files are staged
```

### Violations

- ❌ `git add .` or `git add -A` (stages everything including unintended files)
- ❌ Type mismatch between branch and commit (e.g., `plan()` commit on `impl/` branch)
- ❌ Missing ID (except for `chore`)
- ❌ Past tense description ("added" instead of "add")
- ❌ Vague description ("update files", "fix stuff")
- ❌ Subject line exceeds 72 characters
