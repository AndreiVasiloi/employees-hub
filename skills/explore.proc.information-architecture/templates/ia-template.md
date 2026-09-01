+++
template_name = "Information Architecture Template"
version = "1.0"
output_format = "explore/design/information-architecture-[slug].md"
validation_required = true
+++

# Information Architecture: {Project Name}

**Project**: {project-name}  
**Created**: {YYYY-MM-DD}  
**Last Updated**: {YYYY-MM-DD}  
**Status**: Draft | Validated | Approved

---

## 1. Snapshot

### Objective
Define the information structure, navigation, and labeling that enables users to find content and complete key tasks with minimal friction.

### Scope

**In scope**:
- Define navigation model and hierarchy for the target experience
- Define labeling and taxonomy for sections, screens, and entities
- Define entry points and wayfinding rules
- Identify role or permission impacts on structure and access

**Out of scope**:
- Visual design and UI styling decisions
- Detailed interaction rules beyond navigation and wayfinding
- Full backlog creation (capture only IA-relevant requirements)

### Users and Top Tasks

**Primary user**: {persona-name}
- Top task 1: {task-description}
- Top task 2: {task-description}
- Top task 3: {task-description}

**Secondary user**: {persona-name} (if applicable)
- Top task 1: {task-description}
- Top task 2: {task-description}

**Admin or power user**: {persona-name} (if applicable)
- Manage entities, settings, and governance

### Surfaces
- Responsive web (assumed unless specified)
- Mobile considerations: {describe where mobile affects hierarchy or navigation patterns}

### Assumptions
- Context baseline exists or will be provided (`context.md` or equivalent)
- A small number of primary tasks drive most navigation needs
- Labels must be clear, consistent, and support search and scanning
- {Additional assumption}
- {Additional assumption}

### Constraints

**Known**:
- {Constraint 1}
- {Constraint 2}

**Unknown** (to validate):
- {Unknown constraint 1}
- {Unknown constraint 2}

---

## 2. Organizing Principles

### Primary Grouping Strategy

**Selected strategy**: {Goal-based / Entity-based / Lifecycle-based / Responsibility-based}

**Justification**:
{Explain why this strategy best supports the top tasks and user mental models. For example:
- Goal-based: Users think in terms of what they're trying to accomplish
- Entity-based: Users work primarily with specific objects (projects, requests, campaigns)
- Lifecycle-based: Users follow a clear process (create → manage → review → track)
- Responsibility-based: Users focus on their work vs team work vs admin tasks}

### Supporting Principles
- Keep hierarchy shallow (2 to 4 levels) unless content-heavy
- Prioritize primary tasks over internal org structure
- Use consistent, plain-language labels and avoid synonyms in nav
- Separate operational/admin areas from day-to-day user work
- Prefer progressive disclosure over deep nesting
- {Additional principle}

### Trade-offs

**Optimizes for**:
- {What this structure prioritizes - e.g., "Quick access to most common tasks"}
- {What this structure prioritizes - e.g., "Clear separation of user vs admin functions"}

**May sacrifice**:
- {What this structure deprioritizes - e.g., "Discoverability of rarely-used features"}
- {What this structure deprioritizes - e.g., "Flexibility for power users who want shortcuts"}

---

## 3. Navigation Model

### Proposed Model

**Selected model**: {Side navigation / Tabs / Hub-and-spoke / Search-first / Linear flow / Wizard}

### Rationale
**Why this model fits the tasks**:
- {Reason related to user tasks}

**Why this model fits the scale**:
- {Reason related to number of sections/screens}

**Why this model fits the constraints**:
- {Reason related to technical or business constraints}

### Behavior Rules

**Persistent navigation**:
- Appears: {Where it appears - e.g., "Left side on desktop, hamburger menu on mobile"}
- Stays visible: {What stays visible - e.g., "Main sections always accessible"}
- Collapses: {When/how it collapses - e.g., "On mobile, collapses to hamburger menu"}

**Contextual navigation**:
- Changes based on: {Selected entity / Role / State}
- Example: {Describe what changes - e.g., "When viewing a project, contextual tabs appear for Activity, Files, Settings"}

**Breadcrumbs**:
- Used: {Yes / No}
- Where: {If yes, describe where - e.g., "On all detail pages and nested views"}
- Format: {e.g., "Home > Projects > Project Name > Activity"}

**Search**:
- Scope: {Global / Section-specific / Entity-specific}
- Index: {What content is searchable - e.g., "All projects, requests, users, and documentation"}
- Results grouping: {By entity type / By date / By relevance / By section}
- Behavior: {e.g., "Search opens as overlay, results grouped by entity type with filters"}

**Cross-links**:
- Rules: {How related areas link to each other}
- Example: {e.g., "From a project detail page, users can click to related requests or team members"}

---

## 4. Sitemap or Screen Hierarchy

```
{Provide as ASCII tree structure}

Example:

- Home
  - Overview
  - My work
  - Recent activity
- Projects
  - List view (all projects)
  - Detail view (single project)
    - Overview
    - Activity
    - Files
    - Team
    - Settings (role-gated)
- Requests
  - List view (all requests)
  - Detail view (single request)
    - Overview
    - Comments
    - History
- Reports
  - Dashboard
  - Custom reports
  - Scheduled reports
- Admin (role-gated)
  - Users
  - Permissions
  - System settings
  - Audit log
```

### Notes

**Depth limits**:
- Maximum depth: {N} levels
- Rationale: {Why this depth is appropriate}

**Global vs contextual**:
- Global (always available): {List sections}
- Contextual (entity-scoped): {List sections}

**Naming conventions**:
- Singular vs plural: {e.g., "Use plural for list views (Projects), singular for detail views (Project Settings)"}
- Verb vs noun: {e.g., "Use nouns for sections (Reports), verbs for actions (Create Report)"}

---

## 5. Content Model Alignment

### Key Entities

**Entity 1**: {entity-name}
- Definition: {What it is}
- Where it lives in IA: {Section/location}
- Primary views: {List view, Detail view, etc.}
- Key attributes: {Important fields that affect navigation}

**Entity 2**: {entity-name}
- Definition: {What it is}
- Where it lives in IA: {Section/location}
- Primary views: {List view, Detail view, etc.}
- Key attributes: {Important fields that affect navigation}

**Entity 3**: {entity-name}
- Definition: {What it is}
- Where it lives in IA: {Section/location}
- Primary views: {List view, Detail view, etc.}
- Key attributes: {Important fields that affect navigation}

### Relationships That Influence Navigation

- {Entity A} contains {Entity B}
  - Navigation impact: {e.g., "From Entity A detail page, users can view and manage contained Entity B items"}

- {Entity C} is associated with {Entity D}
  - Navigation impact: {e.g., "Cross-links appear between associated entities"}

- {Entity E} transitions through states that change available sections
  - States: {List states - e.g., "Draft, In Review, Approved, Archived"}
  - Navigation impact: {e.g., "Settings tab only appears for Draft and In Review states"}

### Governance and Ownership

**Who can create/edit/delete key entities**:
- {Entity}: {Role requirements}
- {Entity}: {Role requirements}

**Where governance actions live**:
- Admin functions: {Global admin section / Contextual settings / Both}
- User permissions: {Where managed}
- Entity permissions: {Where managed}

---

## 6. Labeling and Taxonomy

### Section Labels

**Preferred labels** (main navigation):
- {Label 1}: {Purpose/description}
- {Label 2}: {Purpose/description}
- {Label 3}: {Purpose/description}
- {Label 4}: {Purpose/description}

### Screen Labels

**Page titles**:
- {Label}: {Purpose - e.g., "Project Overview - Shows project status, team, and key metrics"}
- {Label}: {Purpose - e.g., "Create Request - Form for submitting new requests"}
- {Label}: {Purpose - e.g., "User Settings - Manage profile, notifications, and preferences"}

### Controlled Vocabulary

**Preferred terms**:
- {Term}: {Definition - e.g., "Project - A collection of related work items with a defined goal and timeline"}
- {Term}: {Definition - e.g., "Request - A formal submission for work, review, or approval"}
- {Term}: {Definition - e.g., "Dashboard - Overview page showing key metrics and recent activity"}

**Synonyms** (acceptable in content, not in navigation):
- {Synonym} for {Preferred term} - e.g., "Initiative" for "Project"
- {Synonym} for {Preferred term} - e.g., "Ticket" for "Request"

**Do not use**:
- {Term}: {Reason - e.g., "Task - Too generic, conflicts with sub-items within projects"}
- {Term}: {Reason - e.g., "Workspace - Ambiguous, could mean team space or user space"}

### Facets and Filters

**Facet 1**: {facet-name}
- Values: {e.g., "All, Active, Archived, Draft"}
- Default behavior: {e.g., "Show Active by default"}
- Where used: {e.g., "Project list view, Request list view"}

**Facet 2**: {facet-name}
- Values: {e.g., "My Items, Team Items, All Items"}
- Default behavior: {e.g., "Show My Items by default"}
- Where used: {e.g., "All list views"}

**Facet 3**: {facet-name}
- Values: {e.g., "Last 7 days, Last 30 days, Last 90 days, All time"}
- Default behavior: {e.g., "Show Last 30 days by default"}
- Where used: {e.g., "Activity feeds, Reports"}

---

## 7. Entry Points and Wayfinding

### Primary Entry Points

**Home or landing page**:
- Purpose: {e.g., "Dashboard showing recent activity and quick access to top tasks"}
- Content: {What users see}
- CTAs: {Primary calls to action}

**Global navigation**:
- Always accessible: {List sections}
- Behavior: {How it works}

**Search**:
- Access: {Where search is available}
- Scope: {What can be searched}
- Prominence: {How prominent it is}

**Primary calls to action**:
- {CTA 1}: {Where it appears and what it does}
- {CTA 2}: {Where it appears and what it does}

### Secondary Entry Points

**Notifications**:
- How they work: {e.g., "Bell icon in header, shows unread count"}
- Link behavior: {e.g., "Click notification to go directly to relevant entity"}

**Deep links from email/chat**:
- Format: {e.g., "app.example.com/projects/123"}
- Behavior: {e.g., "Opens directly to entity if user has permission"}

**Shared links**:
- Format: {e.g., "app.example.com/share/abc123"}
- Behavior: {e.g., "Public view with limited actions, prompt to sign in for full access"}

**Cross-links from related entities**:
- Rules: {e.g., "Related entities appear in sidebar with quick links"}
- Example: {e.g., "From a project, users can click to view related requests"}

### Deep Linking Rules

**Resolution behavior**:
- Deep links resolve to the most specific permitted view
- If no permission: {Show access denied message with recovery paths - e.g., "Request access button, link to help"}
- If entity missing: {Show not found page with search and support routes - e.g., "Search for similar items, contact support"}

**URL structure**:
- Pattern: {e.g., "/[entity-type]/[entity-id]/[view]"}
- Examples:
  - {e.g., "/projects/123/overview"}
  - {e.g., "/requests/456/comments"}

### Location Awareness

**Page titles**:
- Format: {e.g., "[Entity Name] - [View] | [App Name]"}
- Example: {e.g., "Q4 Marketing Campaign - Activity | ProjectHub"}

**Selected nav state**:
- Behavior: {e.g., "Current section highlighted in main nav, current view highlighted in contextual nav"}

**Return paths**:
- Detail pages: {e.g., "Breadcrumbs and back button to return to list view"}
- Nested views: {e.g., "Tabs show current view, clicking parent tab returns to overview"}

---

## 8. Roles and Permissions Impact

### Roles

**Role 1**: {role-name}
- Description: {What this role can do}
- Typical users: {Who has this role}

**Role 2**: {role-name}
- Description: {What this role can do}
- Typical users: {Who has this role}

**Role 3**: {role-name}
- Description: {What this role can do}
- Typical users: {Who has this role}

**Role 4**: {role-name}
- Description: {What this role can do}
- Typical users: {Who has this role}

### What Changes by Role

**Which sections are visible**:
- {Role 1}: {List visible sections}
- {Role 2}: {List visible sections}
- {Role 3}: {List visible sections}
- {Role 4}: {List visible sections}

**Which actions appear as primary vs secondary**:
- {Action}: Primary for {roles}, secondary for {roles}, hidden for {roles}
- {Action}: Primary for {roles}, secondary for {roles}, hidden for {roles}

**Admin areas**:
- Location: {Separate global nav section / Contextual settings / Both}
- Visibility: {Which roles can access}

**Search results**:
- {Role 1}: {What appears in search results}
- {Role 2}: {What appears in search results}
- {Role 3}: {What appears in search results}

### Navigation Visibility by Role

| Section | {Role 1} | {Role 2} | {Role 3} | {Role 4} |
|---------|----------|----------|----------|----------|
| {Section 1} | ✅ | ✅ | ✅ | ✅ |
| {Section 2} | ✅ | ✅ | ✅ | ❌ |
| {Section 3} | ✅ | ✅ | ❌ | ❌ |
| {Admin} | ❌ | ❌ | ✅ | ✅ |

---

## 9. Open Questions and Validation Plan

### Open Questions (Prioritized)

**Question 1**: {question}
- **Why it matters**: {Impact on IA - e.g., "Affects whether we need separate sections or can combine"}
- **How to validate**: {Method - e.g., "Tree testing with 10 users to measure findability"}
- **Participants**: {Who to involve - e.g., "5 primary users, 5 admin users"}
- **Timeline**: {When to validate}

**Question 2**: {question}
- **Why it matters**: {Impact on IA}
- **How to validate**: {Method - e.g., "Card sorting to confirm grouping makes sense"}
- **Participants**: {Who to involve}
- **Timeline**: {When to validate}

**Question 3**: {question}
- **Why it matters**: {Impact on IA}
- **How to validate**: {Method - e.g., "First-click testing on primary entry points"}
- **Participants**: {Who to involve}
- **Timeline**: {When to validate}

### Validation Methods

**Tree testing**:
- Purpose: Test findability of key tasks
- Tasks to test: {List 5-7 key tasks}
- Success criteria: {e.g., ">80% success rate, <30 seconds per task"}

**Card sorting**:
- Purpose: Confirm grouping and labeling
- Cards: {Number of cards representing sections/features}
- Method: {Open sort / Closed sort / Hybrid}

**First-click testing**:
- Purpose: Validate primary entry points
- Scenarios: {List scenarios to test}
- Success criteria: {e.g., ">75% correct first clicks"}

**Stakeholder walkthrough**:
- Purpose: Map IA to top tasks and constraints
- Participants: {Stakeholders to involve}
- Format: {e.g., "Guided walkthrough of sitemap with task scenarios"}

---

## 10. Decisions Log

### Decision 1

**What was decided**: {Decision made}

**Alternatives considered**:
- {Alternative 1}: {Why not chosen}
- {Alternative 2}: {Why not chosen}

**Rationale**: {Why this decision was made}

**Date**: {YYYY-MM-DD}

---

### Decision 2

**What was decided**: {Decision made}

**Alternatives considered**:
- {Alternative 1}: {Why not chosen}
- {Alternative 2}: {Why not chosen}

**Rationale**: {Why this decision was made}

**Date**: {YYYY-MM-DD}

---

### Decision 3

**What was decided**: {Decision made}

**Alternatives considered**:
- {Alternative 1}: {Why not chosen}
- {Alternative 2}: {Why not chosen}

**Rationale**: {Why this decision was made}

**Date**: {YYYY-MM-DD}

---

## Acceptance Criteria

- [ ] Navigation model is selected and justified
- [ ] Sitemap or hierarchy covers the full defined scope
- [ ] Labels are consistent and supported by a controlled vocabulary
- [ ] Entry points and wayfinding rules are defined
- [ ] Role or permission impacts are explicit where relevant
- [ ] Open questions and a validation plan are prioritized and actionable
- [ ] Top tasks can be completed using the proposed structure
- [ ] Hierarchy depth is appropriate (2-4 levels maximum)
- [ ] All sections have clear, plain-language labels
- [ ] Search scope and behavior are defined
- [ ] Deep linking and error states are documented
- [ ] Content model entities are mapped to navigation

---

## Related Artifacts

- **Context**: `explore/explore-[slug]/context.md`
- **Personas**: `explore/domain/personas-[slug].md`
- **Journey Maps**: `explore/domain/journey-[slug].md`
- **User Flows**: `explore/domain/flows-[slug].md`
- **Wireframes**: `explore/design/wireframes-[slug].md` (next step)
- **PRD**: `explore/prds/[slug]-prd.md`

---

**Last Updated**: {YYYY-MM-DD}  
**Status**: {Draft | Validated | Approved}

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.information-architecture:0.1.2:2026-08-31T12:24:54Z -->
