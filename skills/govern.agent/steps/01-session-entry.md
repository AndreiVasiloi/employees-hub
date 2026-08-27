# Step 1: Session Entry

**Objective**: Load project configuration, confirm session identity, and prepare the orchestration context.

**Entry Criteria**: User triggered the Govern Agent via "Let's Govern", `/govern`, or `$govern`.

**Exit Criteria**: `.flow/govern.toml` loaded, project identity confirmed, ready for work discovery.

---

## Actions

### Action 1: Load Configuration

Read `.flow/govern.toml` from the warehouse root.

**If file not found**: Offer to bootstrap from the template bundled with this skill:

```
⚠️ .flow/govern.toml not found.

The Govern Agent requires this configuration file to operate.

Would you like me to create it from the template?
  → Copy templates/govern.toml → .flow/govern.toml
  → You'll then customise the project identity, stack, and knowledge entries.
```

If the user accepts, copy `templates/govern.toml` from this skill's directory to `<warehouse-root>/.flow/govern.toml`, then guide the user through filling in `[project]` fields before proceeding.

If the user declines: STOP. The agent cannot operate without configuration.

**If file found**: Parse and hold in session context. Do NOT dump the entire config to the user.

---

### Action 2: Confirm Project Identity

Present a brief session greeting confirming the project:

```
Govern session started.

Project: [project.name]
Scope:   [project.scope]
Config:  .flow/govern.toml ✓

Ready to discover available work.
```

---

### Action 3: Verify project.agent Dependency

Check that `skills/project.agent/` exists (provides constraining guides referenced by config).

**If missing**: Warn but do not block:

```
⚠️ WARNING: skills/project.agent/ not found.
Guide loading will be unavailable for this session.
Proceeding without constraining guides.
```

**If present**: Confirm silently (no output needed).

---

## Exit

Proceed to Step 2 (Work Discovery).

---

## Related

- **Next Step**: `02-work-discovery.md`
- **Config File**: `.flow/govern.toml`
- **Dependency**: `skills/project.agent/` (guides)
