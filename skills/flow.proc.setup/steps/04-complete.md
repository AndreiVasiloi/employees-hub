# Step 4 — Complete

## Objective

Present all deferred items with re-invoke instructions, offer an optional initial git commit, clear `pending_setup` from `.flow/config.toml`, and hand off to `flow.agent`.

## Entry Criteria

- Steps 1–3 are complete or deferred
- All changes from previous steps have been saved

## Actions

### 4.1 Deferred Items Summary

Present the deferred items collected during this session. Use the format below. If nothing was deferred, skip this section silently.

```
## 🚀 Warehouse Setup — Deferred Items

The following items were skipped and can be completed at any time:

| # | Item | How to Resume |
|---|------|---------------|
| 1 | 1.1 Warehouse Identity (AGENTS.md / README.md) | Say "Let's Flow Setup — Step 1" |
| 2 | 1.2 Tech Stack (specification/tooling.md) | Say "Let's Flow Setup — Step 1" |
| 3 | 1.3 Repository Documentation (docs/repositories.md) | Say "Let's Flow Setup — Step 1" |
| 4 | 1.4 Spec Folder Selection (specification/) | Say "Let's Flow Setup — Step 1" |
| 5 | 1.5 Guidelines Cleanup (govern/guidelines/) | Say "Let's Flow Setup — Step 1" |
| 6 | 1.6 Task ID Configuration (.flow/config.toml) | Say "Let's Flow Setup — Step 1" |
| 7 | Skills Check | Run `dft skills update` in your terminal |
| 8 | JIRA Sync Profile | Say "Setup JIRA" or load flow.proc.config-jira |
| 9 | Miro Sync Profile | Say "Setup Miro" or load flow.proc.config-miro |
| 10 | Per-Phase Workflow Bindings | Edit `.flow/{phase}.toml` files — see ADR 260417 |
```

Only include items that were actually deferred this session.

---

### 4.2 Optional Initial Git Commit

Ask:
> "Would you like to create an initial git commit with the setup changes? (Yes / Skip)"

If Yes:
- Stage the relevant files:
  ```bash
  git add .flow/ explore/ skills/ README.md AGENTS.md repositories.md
  ```
- Show the staged file list and ask for confirmation
- Commit with:
  ```bash
  git commit -m "chore: initial warehouse setup

  - Configure project identity
  - Set tech stack and repository documentation
  - Configure workflow bindings (.flow/govern.toml)
  - Initial setup complete via flow.proc.setup"
  ```

If Skip:
- "Skipping initial commit — you can commit your changes manually when ready."

---

### 4.3 Clear `pending_setup` Flag

Remove the `pending_setup = true` line from `.flow/config.toml`:

1. Read the current contents of `.flow/config.toml`
2. Remove the line `pending_setup = true` (exact match, including any trailing whitespace)
3. Write the updated contents back
4. Verify the file is still valid TOML by checking that the remaining structure looks correct

> ⚠️ Only remove the `pending_setup = true` line. Do not modify any other keys or sections.

After removing the line, confirm:
- "✓ `pending_setup` cleared from `.flow/config.toml`. Setup state has been reset."

If the line is not found (was already removed or never written):
- "✓ `pending_setup` flag was not present — nothing to remove. Setup state is clean."

---

### 4.4 Completion Banner and Handoff

Output the completion banner:

```
## 🚀 Warehouse Setup — Complete

Your warehouse is configured and ready.

Setup complete. Say **"Let's Flow"** to begin your first session.
---
```

Then hand off:

```
→ Routing to flow.agent.
---
```

## Discussion Point (Governed)

Before clearing `pending_setup`, ask:
- "Setup is complete. Shall I clear the `pending_setup` flag and hand off to `flow.agent`? (Yes / Review deferred items first)"

## Heuristic (Delegated)

In delegated mode: present deferred items table if any items exist, skip commit prompt, clear `pending_setup`, output completion banner and handoff without waiting for confirmation.

## Next Step

This is the final step. On completion, the user says "Let's Flow" to start their first `flow.agent` session.
