# Structure App Around Objects

Paste this when: Starting a complex app from scratch, OR your existing app feels like a mess of disconnected screens.

---

## Is This Your Situation?

- [ ] You're designing a new app with multiple interconnected "things"
- [ ] Your current app has features scattered across random screens
- [ ] Users can't find things because the navigation doesn't match their mental model
- [ ] You keep adding screens but the IA is getting worse
- [ ] Different parts of the app show the same data inconsistently

---

## The Core Idea

**Design around NOUNS (objects), not VERBS (tasks).**

Bad approach: "What screens do we need?" → leads to disconnected features
Good approach: "What objects exist?" → leads to coherent structure

---

## The Process

### Step 1: Extract Objects

List every NOUN in your product. These are the "things" users think about:

```
OBJECTS IN THIS SYSTEM:
- [Object 1] (e.g., Project)
- [Object 2] (e.g., Task)
- [Object 3] (e.g., User)
- [Object 4] (e.g., Comment)
- [Object 5] (e.g., File)
...
```

**Tip:** Look at your database tables, user stories, or just listen to how users talk about your product. The nouns they use are your objects.

### Step 2: Define Each Object

For each object, answer:

```
OBJECT: [Name]

Core Properties (what makes it unique):
- [property]: [type] (e.g., "title: string")
- [property]: [type]
- [property]: [type]

States (what conditions can it be in):
- [state 1] (e.g., "draft", "published", "archived")
- [state 2]

Actions (what can you DO to it):
- [action 1] (e.g., "create", "edit", "delete")
- [action 2] (e.g., "assign", "share", "duplicate")
```

### Step 3: Map Relationships

Draw connections between objects:

```
[Object A] ──has many──▶ [Object B]
[Object B] ──belongs to──▶ [Object A]
[Object C] ──can be attached to──▶ [Object A] or [Object B]
```

Relationship types:
- **Has many / Belongs to** (Project has many Tasks)
- **Has one / Belongs to** (Task has one Assignee)
- **Many to many** (Users can be in many Projects, Projects have many Users)

### Step 4: Identify Core vs Supporting Objects

```
CORE OBJECTS (users primarily work with these):
- [Object]: [why it's core]
- [Object]: [why it's core]

SUPPORTING OBJECTS (exist to enhance core objects):
- [Object]: [supports which core object]
- [Object]: [supports which core object]
```

Core objects get their own dedicated screens.
Supporting objects appear within core object screens.

### Step 5: Derive Screens from Objects

For each CORE object, you typically need:

```
OBJECT: [Name]

Screens:
- LIST VIEW: See all [Objects], filter/sort/search
- DETAIL VIEW: See everything about ONE [Object]
- CREATE/EDIT: Form to make or modify [Object]

What appears on the Detail View:
- All properties of [Object]
- Related [Other Objects] (inline or linked)
- Available actions
- State indicators
```

### Step 6: Define Navigation

Navigation should reflect object relationships, not arbitrary grouping:

```
PRIMARY NAVIGATION (Core objects):
- [Object 1 - list view]
- [Object 2 - list view]
- [Object 3 - list view]

CONTEXTUAL NAVIGATION (when viewing an object):
- Related [Object A]
- Related [Object B]
- Actions for this object
```

---

## Output Format

```
## Object Model

### Objects Identified
| Object | Type | Key Properties |
|--------|------|----------------|
| [Name] | Core | [props] |
| [Name] | Core | [props] |
| [Name] | Supporting | [props] |

### Relationships
[Object A] ──relationship──▶ [Object B]
[Object A] ──relationship──▶ [Object C]

### Screen Structure
- /[objects] → List of [Object]
- /[objects]/:id → [Object] detail
- /[objects]/:id/[related] → Related items

### Navigation
Primary: [Object 1] | [Object 2] | [Object 3]
Contextual: Defined by relationships
```

---

## Example: Project Management App

```
CORE OBJECTS:
- Project (has many Tasks, has many Members)
- Task (belongs to Project, has Assignee, has many Comments)

SUPPORTING OBJECTS:
- Comment (belongs to Task)
- File (can attach to Project or Task)
- Member (belongs to Project, is a User)

SCREENS:
- /projects → All my projects
- /projects/:id → Project detail (shows Tasks, Members, Files)
- /projects/:id/tasks/:id → Task detail (shows Comments, Files)

NAVIGATION:
Primary: Projects | My Tasks | Team
On Project page: Tasks tab | Files tab | Members tab | Settings
```

---

## Anti-Patterns to Avoid

- **Feature-based navigation:** "Reports", "Analytics", "Settings" as top-level items instead of objects
- **Verb-based screens:** "Create Task" as a destination instead of a modal/form on Task list
- **Orphan data:** Showing object data on screens where users can't act on it
- **Inconsistent objects:** Same object looking different in different places

---

## When This Works Best

- Apps with multiple related data types
- Products where users manage "things" (projects, documents, people, etc.)
- Rebuilding a messy existing app

## When to Skip This

- Simple single-purpose tools (calculator, timer)
- Marketing sites
- Content-heavy sites where hierarchy matters more than objects
