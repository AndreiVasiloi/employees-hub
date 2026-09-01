+++
template_name = "Wireframe Blueprint Template"
version = "1.0"
output_format = "explore/design/wireframes-[slug].md"
validation_required = true
+++

# Wireframe Blueprint: {Project Name}

**Project**: {project-name}  
**Created**: {YYYY-MM-DD}  
**Last Updated**: {YYYY-MM-DD}  
**Status**: Draft | In Review | Approved

---

## 1. Snapshot

### Objective
Produce low-fidelity wireframes that translate discovery context into clear screen structure, key flows, and interaction intent, enabling alignment before visual design and build.

### Inputs

**Required**:
- `context.md` (or equivalent discovery baseline)
- Primary users and top tasks
- Scope boundaries (in scope, out of scope)
- Target surfaces (web, mobile, responsive breakpoints)
- Must-have flows or screens (if known)

**Optional**:
- `information-architecture-[slug].md` (IA document)
- Existing patterns or design system constraints
- Content requirements and legal or compliance constraints
- Roles and permissions
- Technical constraints (data availability, integrations, auth)

### Output
- `wireframes-[slug].md` (this document)

**Optional** (if supported by the workflow):
- Low-fi prototype link (Figma/Sketch/etc.)
- PNG exports of key screens

### Fidelity Rules
- Layout and hierarchy only, no visual styling
- Use boxes, labels, and simple component names
- Use placeholder copy where necessary
- Capture behavior and states in notes, not in high-fi visuals

### Assumptions
- If IA is missing, a draft IA will be inferred and flagged as a risk
- If roles are unknown, default to standard user plus admin and flag as a gap
- If data constraints are unclear, assume partial data and define empty and error states

---

## 2. Users and Top Tasks

### Primary Users

**User group 1**: {user-group-name}
- Goals: {what they're trying to accomplish}
- Constraints: {limitations or challenges}
- Context of use: {where/when/how they use the product}

**User group 2**: {user-group-name} (if applicable)
- Goals: {what they're trying to accomplish}
- Constraints: {limitations or challenges}
- Context of use: {where/when/how they use the product}

### Top Tasks
1. {Task 1 - most important user task}
2. {Task 2 - second most important task}
3. {Task 3 - third most important task}
4. {Task 4 - if applicable}
5. {Task 5 - if applicable}

---

## 3. Scope and Constraints

### In Scope
- {Feature/screen/flow 1}
- {Feature/screen/flow 2}
- {Feature/screen/flow 3}

### Out of Scope
- {Feature/screen/flow 1 - explicitly excluded}
- {Feature/screen/flow 2 - explicitly excluded}
- {Feature/screen/flow 3 - explicitly excluded}

### Constraints

**Technical**:
- {Constraint 1 - e.g., "Must integrate with existing auth system"}
- {Constraint 2 - e.g., "API response time may be slow, need loading states"}

**Content**:
- {Constraint 1 - e.g., "Legal disclaimers required on all forms"}
- {Constraint 2 - e.g., "Character limits for user-generated content"}

**Compliance**:
- {Constraint 1 - e.g., "WCAG 2.1 AA accessibility required"}
- {Constraint 2 - e.g., "GDPR consent flows required"}

**Business**:
- {Constraint 1 - e.g., "Must support 3 languages"}
- {Constraint 2 - e.g., "Mobile-first design required"}

---

## 4. Information Architecture Alignment

### Navigation Model
**Selected model**: {Side nav / Tabs / Hub-and-spoke / Search-first / Linear flow}

**Rationale**: {Why this model was chosen}

### Primary Sections
- {Section 1}: {Purpose}
- {Section 2}: {Purpose}
- {Section 3}: {Purpose}
- {Section 4}: {Purpose}

### Key Entities
- **{Entity 1}**: {Definition and where it appears}
- **{Entity 2}**: {Definition and where it appears}
- **{Entity 3}**: {Definition and where it appears}

### Labeling Assumptions
**Preferred terms**:
- {Term 1}: {Definition}
- {Term 2}: {Definition}

**Synonyms** (acceptable in content, not in nav):
- {Synonym} for {Preferred term}

### Risks if IA is Not Confirmed
- {Risk 1 - e.g., "Navigation structure may need rework if sections change"}
- {Risk 2 - e.g., "Screen labels may be inconsistent if terminology not finalized"}

---

## 5. Key Flows

### Flow 1: {Flow Name}

**Purpose**: {What this flow accomplishes}

**Entry points**:
- {Entry point 1 - e.g., "Home page CTA"}
- {Entry point 2 - e.g., "Global navigation"}
- {Entry point 3 - e.g., "Deep link from email"}

**Steps**:
1. {Screen/action} → {Screen/action}
2. {Screen/action} → {Screen/action}
3. {Screen/action} → {Screen/action}
4. {Screen/action} → {Screen/action}

**Success outcome**: {What happens when flow completes successfully}

**Edge cases**:
- **No data**: {How this is handled - e.g., "Show empty state with CTA to create first item"}
- **Validation failure**: {How this is handled - e.g., "Inline error messages, form stays open"}
- **Permission denied**: {How this is handled - e.g., "Show access denied message with request access button"}
- **System error**: {How this is handled - e.g., "Show error toast with retry option"}

---

### Flow 2: {Flow Name}

**Purpose**: {What this flow accomplishes}

**Entry points**:
- {Entry point 1}
- {Entry point 2}

**Steps**:
1. {Screen/action} → {Screen/action}
2. {Screen/action} → {Screen/action}
3. {Screen/action} → {Screen/action}

**Success outcome**: {What happens when flow completes successfully}

**Edge cases**:
- **No data**: {How handled}
- **Validation failure**: {How handled}
- **Permission denied**: {How handled}
- **System error**: {How handled}

---

### Flow 3: {Flow Name}

{Repeat structure for additional flows}

---

## 6. Screen Inventory

### P0 (Must Have - Critical Path)
- **{Screen 1}**: {Purpose - e.g., "Home dashboard - primary entry point"}
- **{Screen 2}**: {Purpose - e.g., "Create form - main user action"}
- **{Screen 3}**: {Purpose - e.g., "Detail view - view/edit entity"}
- **{Screen 4}**: {Purpose}

### P1 (Should Have - Important but Not Blocking)
- **{Screen 5}**: {Purpose - e.g., "Settings - user preferences"}
- **{Screen 6}**: {Purpose - e.g., "Reports - analytics view"}
- **{Screen 7}**: {Purpose}

### P2 (Later - Nice to Have)
- **{Screen 8}**: {Purpose - e.g., "Advanced filters - power user feature"}
- **{Screen 9}**: {Purpose}

**Total screens**: {N} P0, {N} P1, {N} P2

---

## 7. Wireframe Conventions

### Layout Regions
**Consistent across screens**:
- **Header**: {Global nav, breadcrumbs, search, user menu, notifications}
- **Main**: {Primary content area - varies by screen}
- **Side**: {Filters, contextual info, secondary actions - optional, varies by screen}
- **Footer**: {Optional - legal links, help, version info}

### Component Naming
**Use consistent component terms**:
- List, Table, Card, Form, Modal, Drawer, Toast, Banner, Dropdown, Tabs, Accordion
- {Project-specific component 1}
- {Project-specific component 2}

### Annotation Style
- **Numbered callouts** for interactions (e.g., "1. Click to expand")
- **State notes** under each screen (e.g., "Loading state: show skeleton")
- **Open questions** captured at end of each screen

### Fidelity Rules
- Layout and hierarchy only, no visual styling
- Boxes, labels, and simple component names
- Placeholder copy where necessary (indicate intent, not final copy)
- Behavior and states in notes, not in high-fi visuals

---

## 8. Screen Specs

### Screen: {Screen Name}

**Purpose**: {What this screen accomplishes}

**Primary actions**:
- {Action 1 - e.g., "Create new project"}
- {Action 2 - e.g., "Search projects"}

**Secondary actions**:
- {Action 1 - e.g., "Filter by status"}
- {Action 2 - e.g., "Export to CSV"}

**Layout**:
- **Header**: {What appears in header - e.g., "Global nav, breadcrumbs, search"}
- **Main**: {What appears in main area - e.g., "Project list table with pagination"}
- **Side** (optional): {What appears in sidebar - e.g., "Filters: status, date range, owner"}
- **Footer** (optional): {What appears in footer}

**Components**:
- **{Component 1}**: {Purpose - e.g., "Table - displays project list with sortable columns"}
- **{Component 2}**: {Purpose - e.g., "Filter panel - allows filtering by status, date, owner"}
- **{Component 3}**: {Purpose - e.g., "Pagination - navigate through project list"}

**Content blocks** (placeholder copy):
- **{Block 1}**: {Placeholder text intent - e.g., "Page title: 'Projects' - indicates current section"}
- **{Block 2}**: {Placeholder text intent - e.g., "Empty state: 'No projects yet. Create your first project to get started.'"}
- **{Block 3}**: {Placeholder text intent - e.g., "Table headers: Name, Status, Owner, Last Updated"}

**Data needs**:
- **Entities**: {Entity 1, Entity 2 - e.g., "Project, User"}
- **Fields**: {Field 1, Field 2, Field 3 - e.g., "project.name, project.status, project.owner, project.updatedAt"}
- **Source** (if known): {API endpoint or data source - e.g., "GET /api/projects"}

**Interaction notes**:
1. {Interaction rule or behavior - e.g., "Click project name to open detail view"}
2. {Validation or system feedback - e.g., "Hover on row shows action menu (Edit, Delete, Share)"}
3. {Navigation behavior - e.g., "Breadcrumbs allow navigation back to parent sections"}
4. {Additional interaction - e.g., "Filters apply immediately, no submit button needed"}

**States**:
- **Empty**: {What user sees and recommended CTA - e.g., "Empty state illustration, 'No projects yet' message, 'Create Project' button"}
- **Loading**: {Skeleton/spinner and what remains usable - e.g., "Table skeleton with 5 rows, filters remain interactive"}
- **Error**: {Message type and recovery - e.g., "Error banner: 'Unable to load projects. Try again.' with Retry button"}
- **No permission**: {Message and next step - e.g., "Access denied message: 'You don't have permission to view projects. Request access from your admin.'"}
- **Offline** (if relevant): {Fallback - e.g., "Offline banner: 'You're offline. Showing cached data from [timestamp].'"}

**Accessibility notes**:
- **Focus order**: {Tab order - e.g., "Search → Filters → Table → Pagination"}
- **Keyboard behavior**: {Keyboard shortcuts - e.g., "Arrow keys navigate table rows, Enter opens detail view"}
- **Labels and instructions**: {ARIA labels - e.g., "Search input has aria-label='Search projects', Filter button has aria-expanded state"}
- **Contrast dependent elements**: {Avoid in lo-fi but note if needed - e.g., "Status badges must meet 4.5:1 contrast ratio"}
- **Screen reader announcements**: {Errors, toasts - e.g., "When filters apply, announce 'Showing X projects' to screen readers"}

**Instrumentation notes** (optional):
- **Events to track**: {Analytics events - e.g., "project_list_viewed, project_filtered, project_created"}
- **Success signal**: {Key metric - e.g., "User creates first project within 5 minutes"}

**Open questions**:
- {Question 1 - e.g., "Should filters persist across sessions?"}
- {Question 2 - e.g., "What's the default sort order?"}
- {Question 3 - e.g., "How many projects per page?"}

---

### Screen: {Screen Name}

{Repeat the above structure for each screen in the inventory}

---

## 9. Cross-Screen Patterns

### Navigation
- {Pattern 1 - e.g., "Breadcrumbs appear on all detail pages, format: Home > Section > Item"}
- {Pattern 2 - e.g., "Back button behavior: returns to previous list view with filters preserved"}
- {Pattern 3 - e.g., "Global nav remains accessible on all screens except modals"}

### Forms and Validation
- {Pattern 1 - e.g., "Inline validation on blur, summary errors at top of form"}
- {Pattern 2 - e.g., "Required fields marked with asterisk and aria-required"}
- {Pattern 3 - e.g., "Error messages appear below field with red icon"}
- {Pattern 4 - e.g., "Success confirmation via toast notification"}

### Feedback and Messaging
- {Pattern 1 - e.g., "Toasts for success/info (auto-dismiss after 5s)"}
- {Pattern 2 - e.g., "Banners for warnings/errors (persist until dismissed)"}
- {Pattern 3 - e.g., "Modals for destructive actions (require explicit confirmation)"}

### Tables and Lists
- **Pagination**: {Behavior - e.g., "Show 25 items per page, pagination at bottom"}
- **Sorting**: {Behavior - e.g., "Click column header to sort, arrow indicates direction"}
- **Filters**: {Behavior - e.g., "Filters in sidebar, apply immediately, show active filter count"}

### Search
- **Scope**: {Global / Section / Entity - e.g., "Global search in header, section search on list pages"}
- **Default behavior**: {What happens - e.g., "Search as you type, min 3 characters, debounced 300ms"}
- **No results behavior**: {What user sees - e.g., "No results message with suggestions, clear search button"}

### Permissions
- **What changes by role**: {Details - e.g., "Admins see Edit/Delete actions, Viewers see Read-only badge, Contributors see Edit only"}

---

## 10. Validation Checklist

### Coverage
- [ ] All P0 flows have start-to-finish coverage
- [ ] Edge cases are defined for each critical screen
- [ ] Screen inventory matches scope
- [ ] All must-have screens are documented

### Clarity
- [ ] Each screen has a single clear primary action
- [ ] Labels are consistent with IA assumptions
- [ ] Navigation is predictable and reversible
- [ ] Component naming is consistent across screens

### Feasibility
- [ ] Data needs are realistic or flagged as assumptions
- [ ] Dependencies and constraints are captured
- [ ] Permissions are not an afterthought
- [ ] Technical constraints are addressed

### Test Readiness
- [ ] Open questions are explicit
- [ ] Proposed test tasks can be derived from the flows
- [ ] States (empty, loading, error) are defined
- [ ] Accessibility considerations are documented

---

## 11. Open Questions and Decisions Needed

### Prioritized List

**1. {Question}**
- **Why it matters**: {Impact on wireframes or implementation}
- **Decision owner**: {Who needs to decide}
- **How to resolve**: {Method - e.g., "Stakeholder review", "User testing", "Technical feasibility check"}
- **Deadline**: {When decision is needed}

**2. {Question}**
- **Why it matters**: {Impact}
- **Decision owner**: {Who decides}
- **How to resolve**: {Method}
- **Deadline**: {When needed}

**3. {Question}**
- **Why it matters**: {Impact}
- **Decision owner**: {Who decides}
- **How to resolve**: {Method}
- **Deadline**: {When needed}

---

## 12. Next Steps

### Immediate
- Review IA alignment and confirm navigation model
- Walk through P0 flows with stakeholders
- Identify assumptions to validate with users
- {Additional immediate action}

### Near-term
- Convert wireframes to a clickable low-fi prototype (if needed)
- Prepare usability test tasks for first-click or flow validation
- Start interaction spec for key components and rules
- {Additional near-term action}

### Future
- {Future action 1}
- {Future action 2}

---

## Acceptance Criteria

- [ ] Includes IA alignment section and at least one navigation model
- [ ] Covers at least one end-to-end P0 flow and top edge cases
- [ ] Each P0 screen includes purpose, components, actions, interaction notes, and states
- [ ] Assumptions and open questions are explicit and prioritized
- [ ] Ready to hand off into interaction spec and visual design without rework on structure
- [ ] All states (empty, loading, error, no permission) are documented
- [ ] Cross-screen patterns are consistent and documented
- [ ] Accessibility considerations are included
- [ ] Validation checklist is complete

---

## Related Artifacts

- **Context**: `explore/explore-[slug]/context.md`
- **Information Architecture**: `explore/design/information-architecture-[slug].md`
- **Personas**: `explore/domain/personas-[slug].md`
- **Journey Maps**: `explore/domain/journey-[slug].md`
- **User Flows**: `explore/domain/flows-[slug].md`
- **PRD**: `explore/prds/[slug]-prd.md`

---

**Last Updated**: {YYYY-MM-DD}  
**Status**: {Draft | In Review | Approved}

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.wireframing:0.1.2:2026-08-31T13:28:29Z -->
