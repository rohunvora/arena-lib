# Write Real Scenarios

Paste this when: You're about to design something but it feels abstract. You need concrete context to design against.

---

## Is This Your Situation?

- [ ] You have a persona but it's just demographics, not behavior
- [ ] Requirements feel vague ("users should be able to...")
- [ ] You're designing in a vacuum without real constraints
- [ ] Edge cases keep surprising you late in the process
- [ ] Your designs work in ideal conditions but fail in reality

---

## The Core Idea

**Personas without scenarios are characters without a plot.**

A persona tells you WHO. A scenario tells you:
- WHAT they're trying to do
- WHERE they are when they do it
- WHEN and under what pressure
- WHY it matters to them
- WHAT HAPPENS if they fail

---

## The Process

### Step 1: Start With the Job to Be Done

Before writing scenarios, clarify the core job:

```
When [situation], I want to [motivation], so I can [outcome].

Example:
When I'm reviewing my team's work before a deadline,
I want to quickly see what's done and what's stuck,
so I can unblock issues before we miss the deadline.
```

### Step 2: Write 3-5 Scenarios

For each scenario, fill in ALL of these:

```
SCENARIO: [Give it a name]

WHO:
- [Name/role]
- [Experience level with your product]
- [Technical comfort level]

WHAT they're trying to do:
- [Specific task/goal]

WHERE (physical context):
- [Location]: [e.g., office, commute, couch, coffee shop]
- [Device]: [e.g., phone, laptop, tablet, desktop]
- [Environment]: [e.g., quiet, noisy, public, private]

WHEN (time pressure):
- [How much time do they have?]
- [Is there a deadline?]
- [Is this planned or urgent/reactive?]

CONSTRAINTS:
- [Internet]: [reliable / spotty / offline]
- [Attention]: [focused / distracted / multitasking]
- [Privacy]: [can others see their screen?]
- [Interruptions]: [likely / unlikely]

EMOTIONAL STATE:
- [How are they feeling?] (stressed, calm, frustrated, curious)
- [What just happened before this?]

STAKES (what happens if they fail):
- [Consequence of not completing the task]
- [Who else is affected?]

SUCCESS LOOKS LIKE:
- [What specifically means they succeeded?]
- [How will they know they're done?]
```

### Step 3: Stress-Test With Extreme Scenarios

Write at least one "worst case" scenario:

```
STRESS SCENARIO: [Name]

Combine multiple constraints:
- Worst device (old phone, tiny screen)
- Worst connectivity (spotty/offline)
- Worst attention (distracted, multitasking)
- Highest stakes (if they fail, serious consequence)
- Time pressure (needs to complete in <2 minutes)
```

If your design works in the stress scenario, it'll work everywhere.

### Step 4: Extract Design Requirements

From your scenarios, pull out concrete requirements:

```
FROM SCENARIOS, WE LEARNED:

Must work:
- [ ] On mobile (scenarios 1, 3)
- [ ] With intermittent connectivity (scenario 2)
- [ ] In under 2 minutes (scenario 4)

Must support:
- [ ] [Specific capability from scenarios]
- [ ] [Specific capability from scenarios]

Must NOT require:
- [ ] Full attention (users are distracted)
- [ ] [Thing scenarios revealed is unrealistic]
```

---

## Output Format

```
## Scenarios for [Feature/Product]

### Job to Be Done
When [situation], I want to [motivation], so I can [outcome].

### Scenario 1: [Name]
- Who: [description]
- Task: [what they're doing]
- Context: [where/when/device]
- Constraints: [limitations]
- Stakes: [what if they fail]

### Scenario 2: [Name]
[...]

### Scenario 3: [Name]
[...]

### Stress Scenario: [Name]
[Worst case combination]

### Design Requirements Derived
Must work: [list]
Must support: [list]
Must NOT require: [list]
```

---

## Example: Expense Reporting App

```
SCENARIO: "Receipt Capture at Dinner"

WHO: Sales rep, uses app weekly, comfortable with phone

WHAT: Capture receipt for client dinner before leaving restaurant

WHERE:
- Restaurant booth, dim lighting
- Phone (iPhone)
- Noisy, others at table

WHEN:
- Right now, before they forget or lose receipt
- ~30 seconds before conversation resumes
- Unplanned (just remembered)

CONSTRAINTS:
- Internet: Probably fine
- Attention: Very distracted, conversation happening
- Privacy: Client can see their screen
- Interruptions: Constant

EMOTIONAL STATE:
- Slightly awkward (doing admin in front of client)
- Wants to be quick

STAKES:
- If they don't capture now, they'll lose the receipt
- If it takes too long, it's embarrassing

SUCCESS:
- Receipt photo captured
- Can categorize later (not now)
- Done in <15 seconds
```

**Design requirements from this scenario:**
- Camera must open in 1 tap
- Must work in low light
- Categorization should be optional/deferrable
- Minimal UI while capturing (not embarrassing)

---

## Anti-Patterns to Avoid

- **Too vague:** "User wants to complete task" (which user? what task? where?)
- **Too ideal:** "User has plenty of time in a quiet room" (when does this happen?)
- **Demographic-only:** "Sarah, 32, marketing manager" (so what?)
- **No stakes:** If failure doesn't matter, why are we designing for this?

---

## When This Works Best

- Starting any new feature design
- When requirements feel abstract
- When you're getting pushback ("users won't use it like that")
- When QA keeps finding "edge cases"

## When to Skip This

- Optimizing existing flow with clear analytics
- Technical/infrastructure work
- You already have rich user research data
