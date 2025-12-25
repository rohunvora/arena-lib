# Pick the Right Flow Diagram

Paste this when: You need to document or communicate how something works, but you're not sure what type of diagram to make.

---

## Is This Your Situation?

- [ ] Someone asked for a "flow" and you're not sure what they mean
- [ ] You've made a diagram but it's confusing or at the wrong level
- [ ] You're mixing system logic with user journeys in one diagram
- [ ] Your flow has 50 boxes and is unreadable
- [ ] Developers and designers are looking at the same diagram differently

---

## The Three Types of Flows

### 1. Task Flow
**What it shows:** Steps for ONE user to complete ONE specific task. Linear.

**Use when:**
- Documenting a single, specific interaction
- The path is mostly linear (few or no branches)
- Designing a form, wizard, or checkout

**Looks like:**
```
[Step 1] → [Step 2] → [Step 3] → [Done]
```

**Example:** "How a user resets their password"
```
[Forgot password page] → [Enter email] → [Check email] → [Click link] → [Enter new password] → [Success]
```

**Keep it to:** 5-10 steps max. If longer, you have multiple tasks.

---

### 2. User Flow
**What it shows:** A user's journey through multiple screens to achieve a goal. Shows navigation paths.

**Use when:**
- Showing how screens connect
- Planning navigation and IA
- Multiple paths to same destination
- Communicating with designers/stakeholders

**Looks like:**
```
        ┌──▶ [Screen B] ──▶ [Screen D]
[Start] ┤
        └──▶ [Screen C] ──▶ [Screen D]
```

**Example:** "How a user finds and buys a product"
```
[Homepage] → [Search] → [Results] → [Product page] → [Add to cart] → [Cart] → [Checkout] → [Confirmation]
              ↓
           [Browse category] ──────────────┘
```

**Keep it to:** One user type, one goal. Separate flows for different goals.

---

### 3. Flow Chart (System Logic)
**What it shows:** Decision points, branches, and system behavior. Uses formal notation.

**Use when:**
- Documenting business logic
- Showing all possible paths including errors
- Communicating with developers
- Complex conditional behavior

**Notation (UML):**
```
( ) = Start/End (oval)
[ ] = Process/Screen (rectangle)
< > = Decision (diamond)
→  = Flow direction
```

**Looks like:**
```
(Start) → [Check auth] → <Logged in?> ──Yes──▶ [Dashboard]
                              │
                              No
                              ▼
                         [Login page] → <Valid?> ──Yes──▶ [Dashboard]
                                            │
                                            No
                                            ▼
                                       [Error message]
```

**Example:** "Authentication system logic"

**Keep it to:** One system/feature. Break up if >20 nodes.

---

## Decision Guide

Answer these questions:

```
1. Is this about USER actions or SYSTEM behavior?
   - User actions → Task Flow or User Flow
   - System behavior → Flow Chart

2. How many decision points?
   - None/few → Task Flow
   - Some (navigation choices) → User Flow
   - Many (conditional logic) → Flow Chart

3. Who's the audience?
   - Designers/stakeholders → User Flow (visual, high-level)
   - Developers → Flow Chart (precise, complete)
   - Documentation → Task Flow (simple, step-by-step)

4. What question are you answering?
   - "What steps does the user take?" → Task Flow
   - "How do screens connect?" → User Flow
   - "What does the system do in each case?" → Flow Chart
```

---

## Quick Reference: Notation

### Task Flow Notation
```
[Screen/Step] → [Screen/Step] → [Screen/Step]

Simple. Linear. Just boxes and arrows.
```

### User Flow Notation
```
[Screen name]
Brief description or state

Arrows show possible navigation paths.
Label arrows with the action that triggers them.
```

### Flow Chart Notation (UML)
```
( Start )              Oval = Start/End
    │
    ▼
[ Process ]            Rectangle = Action/Screen
    │
    ▼
< Decision? >          Diamond = Yes/No decision
   /    \
 Yes     No
  │       │
  ▼       ▼
[...]   [...]
```

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Mixing user flows and system logic | Make two separate diagrams |
| Too many nodes (50+) | Break into smaller flows by goal |
| No labels on arrows | Always label what triggers the transition |
| Showing every possible error | Separate "happy path" from "error handling" |
| Starting with the diagram | Start with: "What question am I answering?" |

---

## Output Format

Before making a diagram, fill in:

```
FLOW DIAGRAM SPEC

Question I'm answering: [What do I need to communicate?]

Type: [ ] Task Flow  [ ] User Flow  [ ] Flow Chart

Audience: [Who will read this?]

Scope:
- Starting point: [Where does this begin?]
- End point(s): [Where does this end?]
- What's OUT of scope: [What am I NOT showing?]

Level of detail:
- [ ] High-level (screens/major steps only)
- [ ] Detailed (includes substeps, all states)
```

Then make the diagram.

---

## When This Works Best

- Starting documentation
- Unclear communication ("what kind of flow do you want?")
- Diagram is getting unwieldy
- Developers and designers need different views

## When to Skip This

- You already know what diagram you need
- Quick whiteboard sketch (don't overthink it)
- You have a team standard already
