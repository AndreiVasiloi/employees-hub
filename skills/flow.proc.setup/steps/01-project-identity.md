# Step 1 — Project Identity

## Objective

Establish the warehouse's identity by updating key documentation files with project-specific content. Each sub-section is independently deferrable — the user may say "Skip for now" at any point.

## Entry Criteria

- `flow.proc.setup` has been loaded and started
- `dft init` has completed successfully (warehouse scaffold exists)
- `AGENTS.md`, `README.md`, `.flow/config.toml` are present

## Actions

Work through each sub-section in order. For each one, present the action, ask for the required information, make the change, then confirm before moving on. If the user says "Skip for now", note the item and proceed to the next sub-section.

### 1.1 Warehouse Identity

**Goal**: Update the project name and description in `AGENTS.md` and `README.md`.

Ask:
- "What is the name of this project or team?"
- "Give me a one-line description of what this warehouse coordinates."

Actions:
- Update the `## Project Context > ### Purpose` section in `AGENTS.md` with the project name and description
- Update the top-level heading and description paragraph in `README.md`
- Do not overwrite any process tables, skills tables, or structural sections

**Skip for now**: "Skip for now" → note "1.1 Warehouse Identity (AGENTS.md / README.md)" in deferred list → proceed to 1.2.

---

### 1.2 Tech Stack

**Goal**: Document the project's primary technology stack in `explore/tooling.md`.

Ask:
- "What programming language(s) will this project use?"
- "What frameworks or runtimes? (e.g. Spring Boot, React, Go standard library)"
- "What databases or storage systems?"
- "What testing frameworks and build tools?"
- "Any other significant tools or platforms?"

Actions:
- Read current `explore/tooling.md`
- Replace or augment the tech stack section with the collected information
- List technologies with version requirements where known
- Note any explicitly excluded technologies

**Skip for now**: "Skip for now" → note "1.2 Tech Stack (explore/tooling.md)" in deferred list → proceed to 1.3.

---

### 1.3 Repository Documentation

**Goal**: Document the code repositories that this warehouse coordinates in `docs/repositories.md`.

Ask:
- "Do you have any code repositories to document yet?"
- If yes: "What are their names, purposes, and technology stacks?"
- "How do they relate to each other?"

Actions:
- Read current `docs/repositories.md`
- Add an entry for each code repository using the existing template structure
- Update any Mermaid diagram showing repository relationships if present
- If no repositories exist yet: add a placeholder noting repositories will be added later

**Skip for now**: "Skip for now" → note "1.3 Repository Documentation (docs/repositories.md)" in deferred list → proceed to 1.4.

---

### 1.4 Explore Folder Selection

**Goal**: Remove unused sub-folders from `explore/` to reduce noise.

Present the user with the available Explore sub-folders (read `explore/` to find current folders). Ask:
- "Which of these Explore folders do you need for your project?"
- Suggest keeping: `decisions/`, `epics/`, `prds/`, `domain/` (core workflow)
- Suggest as optional: `architecture/`, `design/`, `hlds/`, `sources/`

Actions:
- Remove folders the user does not need (preserve any `README.md` within kept folders)
- Remove any example or template content from kept folders
- Update `explore/README.md` to reflect the kept folders

**Skip for now**: "Skip for now" → note "1.4 Explore Folder Selection (explore/)" in deferred list → proceed to 1.5.

---

### 1.5 Guidelines Cleanup

**Goal**: Remove irrelevant language/framework guideline files from `govern/guidelines/`.

Present the current guideline files from `govern/guidelines/`. Ask:
- "Which language or framework guidelines do you want to keep?"
- "All others will be removed — does that sound right?"

Actions:
- Remove guideline files for technologies not in this project's stack
- Keep shared baseline guidelines needed across Govern workflows
- Verify that setup docs and workflow steps no longer reference removed guideline files

**Skip for now**: "Skip for now" → note "1.5 Guidelines Cleanup (govern/guidelines/)" in deferred list → proceed to 1.6.

---

### 1.6 Task ID Configuration

**Goal**: Set the task ID prefix and format in `.flow/config.toml`.

Ask:
- "What prefix do you want for task IDs? (e.g. `DFT`, `PROJ`, `TASK`)"
- "What number format? (e.g. `0001`, `001`, or leave blank for sequential numbers only)"

Actions:
- Read current `.flow/config.toml`
- Set or update `[project]` section:
  ```toml
  [project]
  name = "{project-name}"
  task_id_prefix = "{PREFIX}"
  task_id_format = "{format}"
  ```
- Confirm the updated section with the user before writing

**Skip for now**: "Skip for now" → note "1.6 Task ID Configuration (.flow/config.toml [project])" in deferred list.

---

## Discussion Point (Governed)

After completing all sub-sections (or deferring them), summarise:
- Which sub-sections were completed
- Which were deferred (will appear again at Step 4)
- Any files that were modified

Ask: "Does the project identity look correct? Ready to move to Step 2 — Skills Check?"

## Heuristic (Delegated)

In delegated mode: collect project name and description from available context (task files, existing README). Make reasonable inferences for tech stack if a `explore/tooling.md` exists. Skip 1.4 and 1.5 if specification and guidelines folders are already customised. Proceed automatically to Step 2.

## Next Step

Proceed to [02-skills-check.md](./02-skills-check.md).
