# Step 3: Docs Format and Structure Validation

## Objective

Validate the format consistency, structural integrity, and navigational elements of the docs/ folder, ensuring all documentation follows established standards and provides effective user navigation.

## Entry Criteria

- docs/ folder content quality analysis completed in Step 2
- Quality issues identified and categorized
- Ready to validate format and structure consistency

## Actions

### 3.1 Index File Validation

Ensure all folders have proper index files and navigation:

#### 3.1.1 Root Index Validation

Check docs/README.md completeness:

```bash
# Verify root index exists and is accessible
ls -la docs/README.md
head -20 docs/README.md
```

**Root index requirements:**
- **Overview**: Clear description of docs/ folder purpose
- **Structure**: Explanation of folder organization
- **Navigation**: Links to key sections and documents
- **Quick start**: Getting started information
- **Key resources**: Links to most important documentation

#### 3.1.2 Subdirectory Index Validation

Validate index files in all subdirectories:

```bash
# Find all subdirectories
find docs/ -type d | sort

# Check for index files in each directory
for dir in $(find docs/ -type d); do
    if [ ! -f "$dir/README.md" ] && [ ! -f "$dir/index.md" ]; then
        echo "Missing index in: $dir"
    fi
done
```

**Subdirectory index requirements:**
- **Purpose statement**: Clear description of subdirectory contents
- **File listing**: Overview of files in the directory
- **Navigation**: Links to parent and related directories
- **Context**: How this content fits into overall documentation

#### 3.1.3 Index Up-to-Date Validation

Check if index files reflect current content:

```bash
# Compare index listings with actual files
for index in $(find docs/ -name "README.md" -o -name "index.md"); do
    dir=$(dirname "$index")
    echo "Checking index for: $dir"
    ls "$dir"/*.md 2>/dev/null | sort
done
```

**Validation criteria:**
- **File completeness**: All .md files mentioned in index
- **No orphaned files**: All files have index entries
- **Current descriptions**: File descriptions match current content
- **Accurate links**: All links in index point to existing files

### 3.2 Markdown Format Consistency

Validate consistent markdown formatting across all files:

#### 3.2.1 Heading Structure Analysis

```bash
# Check heading hierarchy consistency
find docs/ -name "*.md" -exec grep -H "^#" {} \; | sort

# Identify heading level issues
find docs/ -name "*.md" -exec awk '/^#/ {print FILENAME, length($1), $0}' {} \; | sort
```

**Heading consistency rules:**
- **H1 usage**: One H1 per file (document title)
- **Hierarchy**: No skipped levels (H1 → H3 without H2)
- **Spacing**: Consistent spacing around headings
- **Capitalization**: Consistent title case or sentence case

#### 3.2.2 Code Block Validation

```bash
# Check code block language specification
find docs/ -name "*.md" -exec grep -H "```" {} \; | grep -v "```[a-zA-Z]"

# Check for unclosed code blocks
find docs/ -name "*.md" -exec awk '/```/ {count++} END {if (count % 2 != 0) print FILENAME ": unclosed code block"}' {} \;
```

**Code block requirements:**
- **Language specification**: All code blocks specify language
- **Consistent formatting**: Proper opening/closing tags
- **No orphaned blocks**: All code blocks properly closed
- **Relevant examples**: Code examples are functional and relevant

#### 3.2.3 List and Table Formatting

```bash
# Check list consistency
find docs/ -name "*.md" -exec grep -H "^[-*+]" {} \; | head -20
find docs/ -name "*.md" -exec grep -H "^[0-9]\+\." {} \; | head -20

# Check table formatting
find docs/ -name "*.md" -exec grep -H "|" {} \; | head -10
```

**List formatting rules:**
- **Consistent bullets**: Same bullet style within document
- **Proper indentation**: Nested lists properly indented
- **Numbered lists**: Sequential numbering where used
- **Mixed lists**: Proper handling of mixed bullet/number lists

**Table formatting rules:**
- **Header rows**: Clear table headers
- **Alignment**: Consistent column alignment
- **Completeness**: All rows have same number of columns
- **Readability**: Tables not excessively wide

#### 3.2.4 Link Formatting Validation

```bash
# Check link format consistency
find docs/ -name "*.md" -exec grep -H "\[.*\]" {} \; | head -20

# Check for bare URLs vs formatted links
find docs/ -name "*.md" -exec grep -H "http[s]://[^)]*" {} \;
```

**Link formatting standards:**
- **Descriptive text**: Links have meaningful text, not just URLs
- **Consistent style**: Similar links use similar formatting
- **External links**: Clear indication of external resources
- **Internal links**: Proper relative path formatting

### 3.3 Document Structure Validation

Ensure consistent document organization and structure:

#### 3.3.1 Front Matter Consistency

```bash
# Check for front matter usage
find docs/ -name "*.md" -exec head -5 {} \; | grep -E "^---|^#"

# Validate front matter format where present
find docs/ -name "*.md" -exec awk '/^---$/ {if (frontmatter) print FILENAME ": multiple front matter"; frontmatter=1; next} /^---$/ && frontmatter {frontmatter=0}' {} \;
```

**Front matter standards:**
- **Consistent fields**: Same metadata fields across documents
- **Required fields**: Essential metadata always present
- **Format validation**: Valid YAML/TOML formatting
- **Optional usage**: Front matter used where beneficial

#### 3.3.2 Document Section Organization

Validate standard document sections:

**Standard section order:**
1. **Title/Heading**: Document title (H1)
2. **Overview/Purpose**: Brief description
3. **Prerequisites**: Requirements or dependencies
4. **Main content**: Core documentation
5. **Examples**: Practical examples (if applicable)
6. **References**: Links to related content
7. **Troubleshooting**: Common issues and solutions

**Section validation:**
```bash
# Check for standard section patterns
find docs/ -name "*.md" -exec grep -H -i "overview\|purpose\|prerequisites\|examples\|troubleshooting" {} \;
```

#### 3.3.3 Navigation Elements Validation

Check for consistent navigation elements:

**Navigation elements to validate:**
- **Breadcrumbs**: Path indication in documents
- **Related links**: Links to related documents
- **Parent/child navigation**: Links to parent/child documents
- **Process flows**: Links to process steps where relevant

```bash
# Look for navigation patterns
find docs/ -name "*.md" -exec grep -H -i "related\|see also\|previous\|next\|parent" {} \;
```

### 3.4 Cross-Reference Consistency

Validate consistency in how documents reference each other:

#### 3.4.1 Process Reference Validation

Check consistency in process documentation references:

```bash
# Find process references
find docs/ -name "*.md" -exec grep -H "docs/process/" {} \;

# Validate process naming consistency
find docs/ -name "*.md" -exec grep -H "workflow-.*" {} \;
```

**Process reference standards:**
- **Consistent naming**: Same process names across all references
- **Complete paths**: Full paths to process documentation
- **Trigger phrases**: Consistent trigger phrase documentation
- **Version references**: Process version consistency

#### 3.4.2 Repository Reference Validation

Validate repository documentation consistency:

```bash
# Check repository references
find docs/ -name "*.md" -exec grep -H -i "repository\|repo\|github\|gitlab" {} \;

# Validate repository naming
find docs/ -name "*.md" -exec grep -H "dava\.flow-" {} \;
```

**Repository reference standards:**
- **Consistent naming**: Repository names match actual names
- **URL consistency**: Repository URLs are consistent and correct
- **Description consistency**: Repository descriptions match across documents
- **Link validity**: Repository links are accessible

#### 3.4.3 Tool and Dependency References

Validate references to tools, libraries, and dependencies:

```bash
# Find tool references
find docs/ -name "*.md" -exec grep -H -E "(tool|library|dependency|package)" {} \;

# Check version consistency
find docs/ -name "*.md" -exec grep -H -E "v[0-9]+\.[0-9]+" {} \;
```

**Tool reference standards:**
- **Consistent naming**: Tool names are consistent
- **Version specificity**: Version references are specific and consistent
- **Link consistency**: Tool documentation links are consistent
- **Usage context**: Tool usage context is clear

### 3.5 Accessibility and Usability Validation

Assess documentation accessibility and usability:

#### 3.5.1 Readability Assessment

```bash
# Check for very long paragraphs
find docs/ -name "*.md" -exec awk '/^[^#]/ {para=para $0 " "} /^$/ {if (length(para) > 500) print FILENAME ": long paragraph"; para=""}' {} \;

# Check sentence complexity (rough estimate)
find docs/ -name "*.md" -exec grep -o "\. " {} \; | wc -l
```

**Readability criteria:**
- **Paragraph length**: Paragraphs not excessively long
- **Sentence complexity**: Reasonable sentence length
- **Technical jargon**: Jargon explained or linked
- **Clarity**: Clear, direct language

#### 3.5.2 Navigation Accessibility

Check ease of navigation through documentation:

**Navigation assessment:**
- **Link density**: Appropriate number of links per document
- **Link relevance**: Links are relevant to content
- **Navigation depth**: Reasonable navigation depth
- **Back navigation**: Easy to return to previous sections

#### 3.5.3 Searchability Validation

Assess how easily users can find information:

```bash
# Check for keyword consistency
find docs/ -name "*.md" -exec grep -l -i "installation\|setup\|configuration" {} \;

# Check heading keyword usage
find docs/ -name "*.md" -exec grep -H "^#" {} \; | grep -i -E "(install|setup|config|troubleshoot)"
```

**Searchability factors:**
- **Keyword consistency**: Important concepts use consistent terminology
- **Heading keywords**: Headings contain relevant keywords
- **Index completeness**: Index files contain key terms
- **Cross-references**: Related topics are cross-referenced

### 3.6 Format Score Calculation

Calculate format and structure consistency scores:

#### 3.6.1 Format Consistency Metrics

**Scoring categories (0-10 scale):**
- **Markdown consistency**: Proper markdown formatting
- **Structure consistency**: Consistent document organization
- **Navigation quality**: Effective navigation elements
- **Index completeness**: Comprehensive index files
- **Cross-reference quality**: Accurate cross-references

#### 3.6.2 Overall Format Score

**Weighted calculation:**
- Markdown formatting: 30%
- Document structure: 25%
- Navigation: 20%
- Index files: 15%
- Cross-references: 10%

### 3.7 Format Issues Classification

Classify format and structure issues:

#### 3.7.1 Critical Format Issues

**Critical (Blockers):**
- Missing index files for major sections
- Broken navigation preventing access to content
- Inconsistent formatting that affects readability
- Invalid markdown that breaks rendering

#### 3.7.2 High Priority Format Issues

**High (Significant):**
- Inconsistent heading structures
- Missing navigation elements
- Outdated index files
- Inconsistent cross-reference formatting

#### 3.7.3 Medium Priority Format Issues

**Medium (Moderate):**
- Minor formatting inconsistencies
- Some missing navigation links
- Incomplete front matter
- Minor readability issues

#### 3.7.4 Low Priority Format Issues

**Low (Minor):**
- Minor style inconsistencies
- Could-be-better navigation
- Optional front matter missing
- Minor readability improvements

### 3.8 Format Validation Report

Compile comprehensive format validation report:

#### 3.8.1 Format Summary Statistics

```
📋 Docs/ Format Validation Summary

Files analyzed: <total-files>
Format score: <overall-score>/10

Breakdown:
- Markdown consistency: <score>/10
- Document structure: <score>/10
- Navigation quality: <score>/10
- Index completeness: <score>/10
- Cross-reference quality: <score>/10
```

#### 3.8.2 Format Issues Breakdown

```
🔧 Format Issues by Category

Critical: <count> issues
High: <count> issues
Medium: <count> issues
Low: <count> issues

By type:
- Index issues: <count>
- Heading structure: <count>
- Navigation problems: <count>
- Cross-reference errors: <count>
- Formatting inconsistencies: <count>
```

#### 3.8.3 Recommended Format Improvements

Top format improvements to prioritize:
1. **[Critical]** <improvement description> - <affected-files>
2. **[High]** <improvement description> - <affected-files>
3. **[Medium]** <improvement description> - <affected-files>

## Discussion Point (Governed Mode)

**STOP** for critical format issues:
- "Found <count> critical format issues affecting navigation"
- "Major inconsistency in <specific-format-element> across documents"
- "Index files for <folders> are missing or outdated"

**STOP** for overall format score:
- "Docs/ folder format score: <score>/10"
- "Key format issues: <summary>"
- "Recommended focus areas: <areas>"

## Heuristic (Delegated Mode)

If in delegated mode:
- Auto-classify format issues based on severity
- Calculate format scores automatically
- Generate improvement recommendations
- Proceed to next folder analysis step
- Flag only critical issues for user attention

## Exit Criteria

- [ ] All index files validated for completeness and accuracy
- [ ] Markdown format consistency assessed across all files
- [ ] Document structure consistency validated
- [ ] Cross-reference consistency checked
- [ ] Navigation accessibility assessed
- [ ] Format scores calculated
- [ ] Format issues classified by priority
- [ ] Format validation report compiled
- [ ] Ready to proceed to next folder (specification) or work plan generation

## Next Step

→ [06-specification-content-review.md](./06-specification-content-review.md) (if specification folder selected)
→ [09-workflow-process-validation.md](./09-workflow-process-validation.md) (if only workflow folder selected)
→ [11-work-plan-generation.md](./11-work-plan-generation.md) (if docs was only selected folder)

## Troubleshooting

### Common Issues

**Index file validation failures:**
- Check for different index file names (README.md vs index.md)
- Verify file permissions and accessibility
- Handle case sensitivity issues

**Format consistency detection:**
- Account for intentional format variations
- Handle different markdown extensions
- Consider document-specific formatting needs

**Cross-reference validation:**
- Handle relative vs absolute path resolution
- Account for symbolic links or file system quirks
- Validate external links when network access available

### Recovery Actions

**Partial format validation:**
- Document which files were successfully validated
- Note areas requiring manual review
- Continue with available validation results

**Score calculation issues:**
- Use simplified scoring for problematic areas
- Document scoring methodology and limitations
- Proceed with available metrics

## Integration Notes

This step integrates with:
- **task-review**: For understanding review criteria and standards
- **process-breakdown**: For process documentation structure validation
- **AGENTS.md**: For understanding project formatting standards and conventions

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:flow.proc.workflow-check-consistency:0.1.2:2026-09-01T11:38:02Z -->
