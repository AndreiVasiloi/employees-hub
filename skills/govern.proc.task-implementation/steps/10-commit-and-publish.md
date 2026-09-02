# Step 10: Commit and Publish

## Objective

Commit the implementation, push to remote, create merge request with full description, and suggest next steps.

## Entry Criteria

- Implementation finalized and approved (Step 9 complete)
- On implementation branch (typically `feat/{TASK_ID}-{slug}` or similar)
- Ready for commit and MR creation

## Actions

### 10.1 Stage and Commit

Stage the task folder and all implementation changes:
```bash
git add work/04-implementing/{TASK_ID}-<slug>/
git add <any-other-changed-files>
```

Create commit:
```
feat(impl): complete implementation for {TASK_ID} - {brief-title}

- Implement all acceptance criteria
- Add comprehensive test coverage
- Verify real integration points
- Update documentation

Completes implementation of {TASK_ID}

Task: {TASK_ID}
```

### 10.2 Push to Remote

Push to implementation branch:
```bash
git push origin <implementation-branch>
```

Confirm push succeeded.

### 10.3 Generate Merge Request Description

Create MR description following `templates/merge-request-description.md` in this skill:

**Title**: `{TASK_ID} - <Task title> <optional emoji>`

**Description**: 2-3 short sentences covering:
- What the task achieves
- Core implementation approach
- Key coverage (tests, integration points)

**Verification Steps**: 3-7 numbered steps with:
- Infrastructure startup
- Full test suite
- Application run (local profile)
- Health checks
- Domain-specific flows (HTTP ingestion, API calls)
- State/cache verification
- Additional confirmations

**Each verification step must include**: `# Expected: ...` comment

### 10.4 Create Merge Request

**Check for CLI Tools:**
```bash
# Check for GitLab CLI
if command -v glab &> /dev/null; then
    echo "GitLab CLI (glab) available"
    GITLAB_CLI=true
else
    echo "GitLab CLI (glab) not found"
    GITLAB_CLI=false
fi

# Check for GitHub CLI  
if command -v gh &> /dev/null; then
    echo "GitHub CLI (gh) available"
    GITHUB_CLI=true
else
    echo "GitHub CLI (gh) not found"
    GITHUB_CLI=false
fi
```

**Option A: Automatic MR Creation (if CLI available)**

If `glab` is available (GitLab):
```bash
glab mr create \
  --title "{TASK_ID} - <Task title>" \
  --description "<generated-description-from-10.3>" \
  --source-branch <implementation-branch> \
  --target-branch main \
  --assignee @<reviewer-username> \
  --label "implementation" \
  --label "{TASK_ID}"
```

If `gh` is available (GitHub):
```bash
gh pr create \
  --title "{TASK_ID} - <Task title>" \
  --body "<generated-description-from-10.3>" \
  --base main \
  --head <implementation-branch> \
  --reviewer <reviewer-username> \
  --label "implementation,{TASK_ID}"
```

**Option B: Manual MR Creation**

If no CLI available or user prefers manual:
1. Navigate to GitLab/GitHub merge request page
2. Use generated title and description from Step 10.3
3. Link to task: `work/04-implementing/{TASK_ID}-<slug>/task.md`
4. Request review from appropriate stakeholders
5. Add any relevant labels or milestones

**CLI Tool Offer:**
```
I found GitLab CLI (glab) and/or GitHub CLI (gh) available.
Would you like me to create the MR/PR automatically using the CLI?
- If yes: I'll create it with the generated description and proper labels
- If no: I'll provide the manual creation instructions
```

### 10.5 Update Assignment Status

Update the task status in assignments.toml:
```toml
# Developer who picked up the specification work (empty = available)
specification = ""

# Developer who picked up the implementation work (empty = available)
implementation = "<user-email>"  # Mark as completed
```

Commit the assignment update:
```
chore(impl): mark implementation complete for {TASK_ID}

Implementation complete and MR created for review

Task: {TASK_ID}
```

### 10.6 Move Task to Pending Release

Once MR is merged, move the task to the pending-release folder grouped by its target release:

1. **Read release identifier** from the task's TOML frontmatter (`[metadata].release`)
2. **Determine release slug**: Use the release identifier (e.g., `DFI-001`) as the subfolder name
3. **Create release subfolder** if it doesn't exist: `work/05-pending-release/{release-slug}/`
4. **Move task folder**: `work/04-implementing/{TASK_ID}-<slug>/` → `work/05-pending-release/{release-slug}/{TASK_ID}-<slug>/`

```bash
mkdir -p work/05-pending-release/{release-slug}/
git mv work/04-implementing/{TASK_ID}-<slug>/ work/05-pending-release/{release-slug}/{TASK_ID}-<slug>/
```

Commit the move:
```
chore(release): move {TASK_ID} to pending-release {release-slug}

Implementation complete and MR merged. Task awaiting release.

Task: {TASK_ID}
Release: {release-slug}
```

**If release field is empty**: Ask the user which release this task belongs to before moving.

### 10.7 Suggest Next Steps

Inform user:
- Implementation is complete and committed
- MR created with full verification instructions
- Task is ready for code review
- Once MR is merged, task will be moved to `work/05-pending-release/{release-slug}/`
- Task will remain in pending-release until the release is cut (moved to `06-released/` by a future release process)

## Discussion Point (Governed Mode)

**STOP**: Confirm completion and CLI tool offer:
- "Implementation committed and pushed to `<implementation-branch>`"
- "MR description generated with manual testing instructions"
- "CLI tools detected: GitLab CLI (glab): [yes/no], GitHub CLI (gh): [yes/no]"
- "Would you like me to create the MR/PR automatically using the CLI?"
- If user agrees: Create MR/PR using appropriate CLI
- If user declines: Provide manual creation instructions
- "Task is ready for code review and merge"

## Heuristic (Delegated Mode)

If in delegated mode:
- Commit and push without confirmation
- Generate MR description following template
- Check for CLI tools (glab/gh) and use if available
- If CLI available: Create MR/PR automatically
- If no CLI: Provide manual creation instructions
- Update assignment status
- Report completion with MR link (if created) or instructions

## Exit Criteria

- [ ] Changes committed to implementation branch
- [ ] Pushed to origin
- [ ] Merge request created (CLI auto or manual) with full description
- [ ] MR includes manual testing instructions
- [ ] Assignment status updated
- [ ] Task ready for code review
- [ ] CLI tools detected and offered to user

## Session Complete

```
Task implementation complete. Outputs:

- work/04-implementing/{TASK_ID}-<slug>/ - Complete implementation
- summary.md - Implementation summary
- Merge request: [link]
- Session history: [optional]

Implementation summary:
- ID: {TASK_ID}
- Acceptance criteria: [count] implemented
- Tests: [count] passing
- Integration points: [list]
- Quality gates: All passed

Task is ready for code review and merge.
Release: {release-slug} (pending completion)
```

## Links

- [templates/merge-request-description.md](../templates/merge-request-description.md) — MR description template
- [docs/ways-of-working.md](../../../ways-of-working.md) — PR guidelines

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-implementation:0.2.2:2026-09-02T06:10:56Z -->
