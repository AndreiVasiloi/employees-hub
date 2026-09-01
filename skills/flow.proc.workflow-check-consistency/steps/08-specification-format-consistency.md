# Step 6: Specification Format Consistency

## Objective

Validate format consistency, structural integrity, and documentation standards across the explore/ folder, ensuring all specifications follow established patterns and provide effective technical documentation.

## Entry Criteria

- explore/ folder cross-reference validation completed in Step 5
- Reference issues identified and categorized
- Ready to validate format and structure consistency

## Actions

### 6.1 Specification Index Validation

Ensure comprehensive and accurate index files:

#### 6.1.1 Root Specification Index

Validate explore/README.md completeness:

```bash
# Check root specification index
ls -la explore/README.md
head -30 explore/README.md

# Validate index content
grep -E "(architecture|concepts|decisions|README)" explore/README.md
```

**Root index requirements:**
- **Overview**: Clear description of specification purpose and scope
- **Structure**: Explanation of specification organization
- **Navigation**: Links to all major sections and key specifications
- **Quick reference**: Links to most frequently accessed specifications
- **Contribution guidelines**: How to contribute to specifications

#### 6.1.2 Subdirectory Index Validation

Validate index files in specification subdirectories:

```bash
# Check all subdirectory indexes
find explore/ -type d -exec test -f "{}/README.md" \; -print
find explore/ -type d -exec test -f "{}/index.md" \; -print

# Validate index completeness
for dir in explore/*/; do
    echo "Checking index for: $dir"
    ls -la "$dir"*.md 2>/dev/null | wc -l
done
```

**Subdirectory index requirements:**
- **Purpose statement**: Clear description of subdirectory scope
- **Content listing**: Overview of specifications in the directory
- **Relationships**: How this content relates to other specifications
- **Navigation**: Links to parent and related directories

#### 6.1.3 Index Accuracy Validation

Verify index files reflect current content:

```bash
# Compare index listings with actual files
for index in $(find explore/ -name "README.md" -o -name "index.md"); do
    dir=$(dirname "$index")
    echo "Validating index for: $dir"
    find "$dir" -name "*.md" -not -name "README.md" -not -name "index.md" | sort
done
```

**Index accuracy criteria:**
- **Complete listing**: All specification files mentioned in index
- **No orphaned files**: All files have index entries
- **Current descriptions**: File descriptions match current content
- **Accurate links**: All links in index point to existing files

### 6.2 Specification Document Structure

Validate consistent document structure across specifications:

#### 6.2.1 Standard Document Sections

Check for consistent document sections:

```bash
# Analyze document section patterns
find explore/ -name "*.md" -exec grep -H "^#" {} \; | sort

# Check for standard section headers
find explore/ -name "*.md" -exec grep -l -E "(Overview|Purpose|Scope|Requirements|Implementation)" {} \;
```

**Standard specification sections:**
- **Title/Purpose**: Clear specification title and purpose
- **Scope**: Boundaries and applicability
- **Requirements**: Functional and non-functional requirements
- **Design**: Technical design and architecture
- **Implementation**: Implementation guidance and constraints
- **Testing**: Testing requirements and approaches
- **References**: Related specifications and resources

#### 6.2.2 Section Hierarchy Validation

Validate consistent heading hierarchy:

```bash
# Check heading hierarchy consistency
find explore/ -name "*.md" -exec awk '/^#/ {print FILENAME, length($1), $0}' {} \; | sort

# Identify hierarchy issues
find explore/ -name "*.md" -exec awk '/^#/ {if (prev > 0 && $1 > prev + 1) print FILENAME ": skipped level from " prev " to " $1; prev = length($1)}' {} \;
```

**Hierarchy consistency rules:**
- **H1 usage**: One H1 per file (specification title)
- **Sequential levels**: No skipped heading levels
- **Consistent depth**: Similar specifications use similar heading depth
- **Logical structure**: Heading order follows logical document flow

#### 6.2.3 Document Metadata Validation

Check for consistent document metadata:

```bash
# Look for document metadata patterns
find explore/ -name "*.md" -exec head -10 {} \; | grep -E "(version|status|author|date)"

# Check for front matter consistency
find explore/ -name "*.md" -exec head -5 {} \; | grep -E "^---$"
```

**Metadata standards:**
- **Version information**: Specification version tracking
- **Status information**: Current specification status
- **Author information**: Specification author/owner
- **Date information**: Creation and last modification dates
- **Review status**: Review and approval status

### 6.3 Technical Specification Format Validation

Validate format consistency for technical content:

#### 6.3.1 Code and Configuration Examples

```bash
# Check code block formatting
find explore/ -name "*.md" -exec grep -H "```" {} \; | head -20

# Validate language specification
find explore/ -name "*.md" -exec grep -H "```[a-zA-Z]" {} \; | head -10

# Check for unclosed code blocks
find explore/ -name "*.md" -exec awk '/```/ {count++} END {if (count % 2 != 0) print FILENAME ": unclosed code block"}' {} \;
```

**Code example standards:**
- **Language specification**: All code blocks specify language
- **Complete examples**: Code examples are complete and functional
- **Context clarity**: Code examples have clear context
- **Relevance**: Examples are relevant to specification content

#### 6.3.2 Diagram and Figure Validation

```bash
# Look for diagram references
find explore/ -name "*.md" -exec grep -H -i "(diagram|figure|chart|graph)" {} \;

# Check for mermaid diagrams
find explore/ -name "*.md" -exec grep -H "```mermaid" {} \;

# Check for image references
find explore/ -name "*.md" -exec grep -H "!\[.*\](" {} \;
```

**Diagram standards:**
- **Consistent formatting**: Similar diagram formats across specifications
- **Clear labels**: Diagrams have clear labels and legends
- **Text alternatives**: Text descriptions for complex diagrams
- **Accessibility**: Diagrams are accessible and understandable

#### 6.3.3 Table and Data Structure Validation

```bash
# Check table formatting
find explore/ -name "*.md" -exec grep -H "|" {} \; | head -10

# Validate table structure
find explore/ -name "*.md" -exec awk '/\|/ {table=1} /^$/ {if (table) table=0} END {if (table) print FILENAME ": unclosed table"}' {} \;
```

**Table formatting standards:**
- **Header rows**: Clear table headers with consistent formatting
- **Alignment**: Consistent column alignment
- **Completeness**: All rows have same number of columns
- **Readability**: Tables are formatted for readability

### 6.4 Specification Language and Terminology

Validate consistent language and terminology:

#### 6.4.1 Technical Terminology Consistency

```bash
# Extract key technical terms
find explore/ -name "*.md" -exec grep -o -E "(microservice|API|interface|component|service)" {} \; | sort -u

# Check for term variations
find explore/ -name "*.md" -exec grep -H -E "(micro-service|microservice)" {} \;
```

**Terminology consistency:**
- **Standard terms**: Use industry-standard terminology
- **Project-specific terms**: Consistent use of project-specific terms
- **Acronym definitions**: Acronyms defined on first use
- **Term variations**: Avoid unnecessary term variations

#### 6.4.2 Specification Language Quality

Assess language quality and clarity:

```bash
# Check for very long sentences (rough estimate)
find explore/ -name "*.md" -exec grep -E ".{80,}" {} \; | head -10

# Look for clarity indicators
find explore/ -name "*.md" -exec grep -l -i "(shall|must|should|may)" {} \;
```

**Language quality criteria:**
- **Precision**: Technical language is precise and unambiguous
- **Clarity**: Specifications are clear and understandable
- **Completeness**: All necessary information is provided
- **Consistency**: Language style is consistent across specifications

### 6.5 Specification Version and Change Management

Validate version control and change documentation:

#### 6.5.1 Version Information Consistency

```bash
# Check for version information
find explore/ -name "*.md" -exec grep -H -E "(version|v[0-9])" {} \;

# Validate version format
find explore/ -name "*.md" -exec grep -H -E "v[0-9]+\.[0-9]+\.[0-9]+" {} \;
```

**Version standards:**
- **Semantic versioning**: Use semantic versioning where appropriate
- **Version tracking**: All specifications have version information
- **Change history**: Document significant changes
- **Compatibility**: Note compatibility implications

#### 6.5.2 Change Documentation

```bash
# Look for change history sections
find explore/ -name "*.md" -exec grep -l -i "(changelog|history|changes)" {} \;

# Check for modification dates
find explore/ -name "*.md" -exec ls -la {} \; | head -10
```

**Change documentation standards:**
- **Change logs**: Document significant changes
- **Date tracking**: Track modification dates
- **Impact notes**: Document impact of changes
- **Rationale**: Include rationale for major changes

### 6.6 Specification Quality Metrics

Calculate quality scores for specification format consistency:

#### 6.6.1 Format Consistency Metrics

**Scoring categories (0-10 scale):**
- **Document structure**: Consistent organization and sections
- **Formatting standards**: Proper markdown and technical formatting
- **Index completeness**: Comprehensive and accurate indexes
- **Language quality**: Clear and consistent technical language
- **Version management**: Proper version and change tracking

#### 6.6.2 Overall Specification Format Score

**Weighted calculation:**
- Document structure: 30%
- Formatting standards: 25%
- Index completeness: 20%
- Language quality: 15%
- Version management: 10%

### 6.7 Format Issues Classification

Classify format consistency issues:

#### 6.7.1 Critical Format Issues

**Critical (Blockers):**
- Missing index files preventing navigation
- Inconsistent document structure affecting usability
- Invalid formatting that breaks rendering
- Missing version information for critical specifications

#### 6.7.2 High Priority Format Issues

**High (Significant):**
- Inconsistent heading structures across related specifications
- Missing standard sections in important specifications
- Incomplete or inaccurate index files
- Inconsistent terminology causing confusion

#### 6.7.3 Medium Priority Format Issues

**Medium (Moderate):**
- Minor formatting inconsistencies
- Some missing metadata information
- Inconsistent code example formatting
- Minor language quality issues

#### 6.7.4 Low Priority Format Issues

**Low (Minor):**
- Minor style improvements
- Optional metadata missing
- Could-be-better document organization
- Minor readability enhancements

### 6.8 Specification Format Report

Compile comprehensive format validation report:

#### 6.8.1 Format Summary Statistics

```
📋 Specification Format Validation Summary

Files analyzed: <total-files>
Format score: <overall-score>/10

Breakdown:
- Document structure: <score>/10
- Formatting standards: <score>/10
- Index completeness: <score>/10
- Language quality: <score>/10
- Version management: <score>/10
```

#### 6.8.2 Format Issues Breakdown

```
🔧 Format Issues by Category

Critical: <count> issues
High: <count> issues
Medium: <count> issues
Low: <count> issues

By type:
- Index issues: <count>
- Structure problems: <count>
- Formatting inconsistencies: <count>
- Language issues: <count>
- Version problems: <count>
```

#### 6.8.3 Recommended Format Improvements

Top format improvements to prioritize:
1. **[Critical]** <improvement description> - <affected-specs>
2. **[High]** <improvement description> - <affected-specs>
3. **[Medium]** <improvement description> - <affected-specs>

## Discussion Point (Governed Mode)

**STOP** for critical format issues:
- "Found <count> critical format issues affecting specification usability"
- "Major inconsistency in document structure across <spec-type> specifications"
- "Index files for <directories> are missing or incomplete"

**STOP** for overall format quality:
- "Specification/ folder format score: <score>/10"
- "Key format issues: <summary>"
- "Recommended focus areas: <areas>"

## Heuristic (Delegated Mode)

If in delegated mode:
- Auto-classify format issues based on impact
- Calculate format scores automatically
- Generate improvement recommendations
- Proceed to next folder analysis step
- Flag only critical format issues for user attention

## Exit Criteria

- [ ] All specification index files validated
- [ ] Document structure consistency assessed
- [ ] Technical format validation completed
- [ ] Language and terminology consistency checked
- [ ] Version and change management validated
- [ ] Quality scores calculated
- [ ] Issues classified by priority
- [ ] Format validation report compiled
- [ ] Ready to proceed to workflow folder analysis

## Next Step

→ [09-workflow-process-validation.md](./09-workflow-process-validation.md) (if workflow folder selected)
→ [11-work-plan-generation.md](./11-work-plan-generation.md) (if specification was last selected folder)

## Troubleshooting

### Common Issues

**Complex specification structures:**
- Account for different specification types (architecture vs concepts)
- Handle varying document complexity
- Allow for specification-specific formatting needs

**Technical content validation:**
- Handle various code block languages and formats
- Validate complex diagram and table structures
- Account for mathematical or technical notation

**Version tracking complexity:**
- Handle different versioning schemes
- Account for specification interdependencies
- Validate change history completeness

### Recovery Actions

**Partial format validation:**
- Document which specifications were validated
- Note areas requiring expert review
- Continue with available validation results

**Quality assessment limitations:**
- Use simplified scoring for complex specifications
- Document assessment methodology and limitations
- Proceed with available quality metrics

## Integration Notes

This step integrates with:
- **docs/architecture/**: For architecture specification format standards
- **decision-create**: For decision record format validation
- **AGENTS.md**: For understanding project documentation standards
- **docs/process/task-planning/**: For specification format standards

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:flow.proc.workflow-check-consistency:0.1.2:2026-09-01T11:38:02Z -->
