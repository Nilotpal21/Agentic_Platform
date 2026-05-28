# 11 — Projects

**Implements BRD §9.20 Projects. Surfaces visible across all personas; settings are CU Admin / Project Admin.**

A Project is a business-area grouping inside the credit union (workspace) tenant. Process Owners, Reviewers, Knowledge, Apps, SOPs, Evaluations, Mission Control views, audit, cost envelopes, and KPIs all scope by Project.

Three screens:
1. **Projects list** (`/projects`)
2. **Project detail** (`/projects/[projectId]`)
3. **Project settings** (`/projects/[projectId]/settings`)

Plus a **Project switcher** in the topbar (specified in `01-app-shell-and-dashboard.md` — referenced here).

## Screen 1: Projects list (`/projects`)

### Page header

- H1: *"Projects"*
- Sub: *"Business-area groupings inside Cornerstone FCU. Each project has its own SOPs, apps, reviewers, knowledge, and KPIs."*
- Right side:
  - **New project** primary button (CU Admin only; disabled with tooltip for non-Admin personas)
  - Kebab menu: "Compare projects" (cross-project comparison view), "Archive view"

### Filter row

- Search input
- Tag filters: chips for `Card Services`, `Lending`, `Member Onboarding`, `Collections`, `Fraud`, `Compliance Programs`
- Status filter: `Active` · `Archived`

### Projects grid

A grid of project cards (3-up on lg screens). Each card:

- Project name (semibold, larger)
- Tag chips (1–2 visible, "+N more" overflow)
- Status pill: `Active` (green) / `Archived` (muted)
- Stats row (small): *N apps · M SOPs · K reviewers · X% avg evaluation score*
- Sparkline of conversations · last 24h (Recharts, no axes)
- Cost-envelope strip: small horizontal bar showing % of monthly budget used (color-coded — green <80%, warning 80–95%, error >95%)
- Owner row: small avatar of the Project Admin
- Click → `/projects/[projectId]`

### Cross-project comparison panel (collapsible, CU Admin only)

Below the grid. When expanded, shows a table:

| Project | Apps | Conv 24h | Avg eval | Tasks completed | Cost · MTD | Reviewer pool |
|---|---|---|---|---|---|---|
| Card Services | 2 | 1,240 | 94 | 1,102 | 62% | 3 |
| Member Onboarding | 1 | 412 | 91 | 380 | 21% | 2 |
| Lending | 1 | 0 | 79 | 0 | 4% | 1 |
| Fraud Operations | 1 | 0 | 96 | 0 | 8% | 2 |

Sort by any column. Highlight projects whose evaluation score has dropped >5 points this week.

## Screen 2: Project detail (`/projects/[projectId]`)

### Page header

- Breadcrumb: `Projects > Card Services`
- H1: *"Card Services"* + tag chips + status pill
- Sub: *"Owned by Jordan Chen · 3 members · 2 apps deployed · default channel set: digital, voice"*
- Right side: **Open in Mission Control** button · kebab → "Settings," "Archive," "Compare with other project"

### KPI strip

Four KPI cards scoped to this project (same shape as the dashboard KPI row from `01-app-shell-and-dashboard.md`):

| Card | Project-scoped value |
|---|---|
| Active apps | `2` |
| Conversations · 24h | `1,240` |
| Avg evaluation score | `94` |
| Tasks completed · 24h | `1,102` |

### Activity feed (project-scoped)

A panel showing the last ~10 events scoped to this project. Same `ActivityEvent` shape from `02-sop-to-app-flow.md`/`99-mock-data.md`, filtered by `projectId`.

### Apps grid (project-scoped)

App cards for the apps in this project (same `AppCard` component as the dashboard, just filtered by `projectId`). Shows status pill, score+trend badge, channel icons, source SOP citation.

### SOPs list (project-scoped, compact)

A compact list of SOPs uploaded into this project, with quick link to each. Each row: filename, pages, version, flag counts, generated-app reference.

### Knowledge scope summary (compact)

A panel:
- *"Knowledge sources visible to this project:"*
- A 2-line breakdown: *"X tenant-wide sources · Y project-scoped sources"*
- "Open Knowledge Library →" link to filtered view

### Reviewer pool (compact)

A panel listing the 3 configured reviewers for this project with avatars and active-status dots. Link: "Manage in Settings."

### Cost envelope (compact)

A panel:
- Project monthly budget: `$1,200` (configurable)
- MTD spend: `$742 · 62% of budget`
- Horizontal bar with color tier
- Breakdown by category: Apps · Helper · Continuous evaluation (mini stacked bar)

### Helper integration

A small purple Helper card at the bottom:
- *"Want me to summarize how Card Services is doing this week?"* — opens Helper anchored to this project.

## Screen 3: Project settings (`/projects/[projectId]/settings`)

### Tab structure

Settings is a sub-page with tabs:

```
[Overview] [Membership & RBAC] [Reviewer pool] [Knowledge scope] [Model overrides] [Tools] [Cost & budget] [Channels] [Archive]
```

Each tab is a `Tabs` (Radix) instance. Below, the spec for each tab.

### Overview tab

- Editable: project name, description, tags
- Read-only: project ID (mono), created by, created at
- "Save changes" button at the top right; disabled if no change

### Membership & RBAC tab

Two columns:
- Left: list of project members with their per-project role (Process Owner / Reviewer / Project Admin / Knowledge Editor / Observer)
- Right: "Invite member" form (email + role picker; submitting toasts a mock invite)

Per-row actions: change role, remove from project.

### Reviewer pool tab

- List of project reviewers with status (active / on leave)
- Configurable: dual-approval matrix (which categories of apps trigger dual approval) — checkboxes for `Money-moving tools`, `Reg-E disputes`, `Member NPI access`, etc.
- Cross-project escalation: toggle "Escalate to tenant-wide compliance pool when project queue is empty for >24h"

### Knowledge scope tab

- Two sections:
  - **Tenant-wide sources** (read-only) — list inherited from the Knowledge Library
  - **Project-scoped sources** — sources owned by this project; same UX as the Knowledge Library detail Sheet but in tab form
- "Attach a tenant-wide source as project default" affordance

### Model overrides tab

A scoped version of `09-model-integration.md`'s configuration overview:
- Per-purpose model assignments with **"Inherit tenant default"** as a default radio option
- Overriding any purpose surfaces the endpoint picker

### Tools tab

- Tools and integrations available to this project
- Two scopes: tenant-wide tools (read-only) and project-scoped tools (editable)
- Per-tool data-access disclosure in plain language

### Cost & budget tab

- Monthly budget input (defaults to a fraction of tenant budget if set)
- Alerting thresholds: warning at X%, hard cap at Y%
- MTD spend breakdown (Apps / Helper / Continuous eval / Knowledge ingestion)
- Historical spend chart (last 6 months, monthly stacked)

### Channels tab

- Default channel set for new apps generated in this project: Digital · Voice · SMS · Email
- Channel-specific guardrails (e.g., TCPA for SMS) auto-applied

### Archive tab

- Status: Active / Archived
- "Archive this project" button — opens a confirmation Dialog explaining: *"All apps in this project will be paused. SOPs, audit, and historical data remain queryable. You can restore the project later."*
- For archived projects: "Restore this project" button instead

## Click model (cross-screen)

| Element | Action |
|---|---|
| Topbar Project switcher | DropdownMenu of all projects the user belongs to + "View all projects" → `/projects` |
| Sidebar "Projects" | → `/projects` (CU Admin sidebar; for Process Owner sidebar this could be added too if useful) |
| Project card | → `/projects/[projectId]` |
| "Settings" kebab item | → `/projects/[projectId]/settings` |
| Tab switching | Updates URL hash for shareable links |
| Invite member | Toasts "Invitation sent" (decorative) |
| Archive | Confirmation Dialog → status flip + visual dimming |

## States to render

- **Multi-project (default)** — 4 projects: Card Services, Member Onboarding, Lending, Fraud Operations
- **Single project (degenerate)** — only the Default Project exists; Project switcher still renders but with one option
- **Archived project** — at least one project in archived state; visible in archived filter
- **Cost-envelope exceeded** — at least one project's bar is in the warning or error band

## Out of scope

- Real RBAC enforcement
- Real invitation acceptance flow
- Real cost computation
- Cross-project resource transfer (move SOPs from project A to project B)
- Audit of every project setting change (covered by the general audit log)

## Acceptance criteria

- Project list renders 4 project cards with correct stats.
- Cross-project comparison panel renders the table for CU Admin only.
- Project detail page scopes all stats / activity / apps / SOPs / knowledge / reviewers / cost to the active project.
- Settings tabs all render with mock content.
- Archive flow flips project status and dims the card.
- Topbar Project switcher (specified in `01-app-shell-and-dashboard.md` v2) routes between projects.
