# Step 1: Folder Selection and Context Loading

## Objective

Determine which folders to analyze for consistency checking and load the necessary context for the analysis process.

## Entry Criteria

- Process initiated via `workflow-check-consistency` command
- User may or may not have specified target folders
- Working directory is the dava-flow tooling context warehouse

## Actions

### 1.1 Parse Folder Arguments

Check if folders were specified via command line arguments:

```bash
# Direct folder specification
workflow-check-consistency --folders docs,specification
workflow-check-consistency --folders workflow
workflow-check-consistency --folders docs,specification,workflow
```

**If folders specified:**
- Parse comma-separated folder list
- Validate each folder exists
- Proceed to context loading for specified folders

**If no folders specified:**
- Initiate interactive folder selection
- Present available options to user

### 1.2 Interactive Folder Selection (if needed)

When no folders are specified, present the following options:

```
🔍 Workflow Check Consistency - Folder Selection

Available folders for analysis:
1. docs/ - General documentation, process guides, operational procedures
2. explore/ - Technical specs, architectural decisions, design documents  
3. workflow/ - Workflow definitions, process flows, operational procedures

Options:
- Enter folder names (comma-separated): docs,specification
- Enter numbers (comma-separated): 1,2
- Enter "all" to analyze all folders
- Enter "none" to cancel process

Which folders would you like to analyze?
```

**Validation rules:**
- Accept folder names: docs, specification, workflow
- Accept numbers: 1, 2, 3 (corresponding to above)
- Accept "all" → select all three folders
- Accept "none" → terminate process gracefully
- Reject invalid inputs with helpful error message

### 1.3 Validate Folder Existence

For each selected folder, verify:

```bash
# Check folder exists
ls -la <folder-path>

# Check folder contains content
find <folder-path> -name "*.md" | head -5
```

**Expected folder structure:**
- `docs/` - Should contain README.md and process documentation
- `explore/` - Should contain README.md and specification files
- `workflow/` - Should contain process definitions and workflows

**If folder doesn't exist:**
```
⚠️ Folder '<folder-name>' not found at expected location: <path>

This may indicate:
1. Folder has been moved or renamed
2. Working directory is incorrect
3. Repository structure has changed

Options:
1. Continue with remaining folders
2. Cancel process and verify repository state
3. Specify alternative folder path
```

### 1.4 Load Context for Selected Folders

For each validated folder, load context information:

#### 1.4.1 Folder Structure Analysis
```bash
# Get folder overview
find <folder> -type f -name "*.md" | wc -l
find <folder> -type d | sort
ls -la <folder> | head -10
```

#### 1.4.2 Key Files Identification
Identify important files for each folder type:

**For docs/ folder:**
- README.md (main documentation index)
- process/ subdirectory (process documentation)
- architecture/ subdirectory (if present)
- repositories.md (repository overview)

**For explore/ folder:**
- README.md (specification index)
- architecture/ subdirectory
- concepts/ subdirectory
- decisions/ subdirectory (if present)

**For workflow/ folder:**
- Process definition files
- Workflow diagrams
- Integration documentation

#### 1.4.3 Cross-Reference Mapping
Build initial mapping of potential cross-references:
- Process references in documentation
- Specification links in process docs
- Workflow dependencies

### 1.5 Initialize Analysis State

Create analysis context structure:

```yaml
analysis_session:
  timestamp: <current-time>
  selected_folders: <list-of-folders>
  folder_contexts:
    docs:
      file_count: <number>
      key_files: <list>
      structure: <summary>
    specification:
      file_count: <number>
      key_files: <list>
      structure: <summary>
    workflow:
      file_count: <number>
      key_files: <list>
      structure: <summary>
  cross_references:
    identified: <initial-count>
    to_validate: <list>
```

### 1.6 Confirm Analysis Scope

Present summary to user for confirmation:

```
🔍 Analysis Scope Confirmation

Selected folders: <folder-list>
Total files to analyze: <total-count>

Folder breakdown:
- docs/: <file-count> files
- explore/: <file-count> files  
- workflow/: <file-count> files

Estimated analysis time: <time-estimate>

Proceed with consistency analysis? (Y/n)
```

**If user confirms:** Proceed to Step 2 (or skip to appropriate step based on selected folders)
**If user declines:** Return to folder selection or terminate process

## Discussion Point (Governed Mode)

**STOP** for folder selection confirmation:
- "You've selected the following folders for analysis: <list>"
- "This will analyze approximately <file-count> files"
- "Estimated time: <estimate>. Proceed?"

**STOP** for missing folders:
- "Folder <name> was not found. Continue with remaining folders?"
- "Would you like to specify an alternative path?"

## Heuristic (Delegated Mode)

If in delegated mode:
- Auto-select "all" folders if no specification provided
- Validate folder existence automatically
- Continue with available folders if some are missing
- Log warnings for missing folders but don't stop
- Proceed to Step 2 after loading context

## Exit Criteria

- [ ] Target folders selected (either via arguments or interactive selection)
- [ ] All selected folders validated as existing and accessible
- [ ] Context loaded for each selected folder (structure, key files, counts)
- [ ] Cross-reference mapping initialized
- [ ] Analysis scope confirmed by user (or auto-confirmed in delegated mode)
- [ ] Ready to proceed with folder-specific analysis steps

## Next Step
  
→ [04-docs-content-quality-analysis-file-by-file.md](./04-docs-content-quality-analysis-file-by-file.md) (if docs folder selected)
→ [06-specification-content-review.md](./06-specification-content-review.md) (if specification folder selected)
→ [09-workflow-process-validation.md](./09-workflow-process-validation.md) (if workflow folder selected)

## Troubleshooting

### Common Issues

**Folder not found:**
- Verify working directory: `pwd` should be tooling context warehouse
- Check repository structure: `ls -la`
- Consider recent repository reorganization

**Permission denied:**
- Check file permissions: `ls -la <folder>`
- Verify LLM has read access to target directories

**Empty folders:**
- Confirm folder should contain content
- Check if content is in a subdirectory
- Verify this isn't a newly created/empty folder

### Recovery Actions

**Partial folder selection:**
- Continue with available folders
- Note missing folders in final report
- Consider running process again when missing folders are available

**Context loading failures:**
- Retry folder structure analysis
- Fall back to basic file listing
- Log error and continue with limited context

## Integration Notes

This step integrates with:
- **process-breakdown**: For understanding process structure
- **task-planning**: For understanding task organization
- **Repository structure**: For validating expected folder layouts

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:flow.proc.workflow-check-consistency:0.1.2:2026-09-01T11:38:02Z -->
