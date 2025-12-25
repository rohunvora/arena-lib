# Prioritize UX Work

Paste this when: You have a list of UX improvements but don't know what to do first, OR you need to justify UX work to stakeholders.

---

## Is This Your Situation?

- [ ] You have a backlog of UX issues and don't know where to start
- [ ] Stakeholders are asking "why should we spend time on this?"
- [ ] You need to make the case for UX investment
- [ ] You're choosing between several possible improvements
- [ ] Design debt is piling up and you need to triage

---

## The Framework

Map every UX activity on two axes:
- **Y-axis:** Business impact (revenue, conversion, retention, cost savings)
- **X-axis:** Strategic depth (tactical fix → systemic improvement)

```
                    HIGH BUSINESS IMPACT
                           │
     Quick wins            │           Big bets
     (Do now)              │           (Plan for)
                           │
TACTICAL ──────────────────┼────────────────── STRATEGIC
                           │
     Maybe never           │           Foundations
     (Deprioritize)        │           (Invest in)
                           │
                    LOW BUSINESS IMPACT
```

---

## The Process

### Step 1: List Your UX Activities

Write down everything you could work on:

```
UX BACKLOG:
1. [Activity/improvement]
2. [Activity/improvement]
3. [Activity/improvement]
...
```

### Step 2: Connect Each to Business Metrics

For each item, identify the business outcome:

```
| UX Activity | Business Metric | How It Helps |
|-------------|-----------------|--------------|
| [Activity 1] | [Metric] | [Explanation] |
| [Activity 2] | [Metric] | [Explanation] |
```

**Common business metrics:**
- Conversion rate (signups, purchases, upgrades)
- Retention / churn
- Time to value (how fast users get benefit)
- Support costs (fewer tickets)
- Task completion rate
- Revenue per user
- NPS / satisfaction scores

**If you can't connect it to a metric:** Question whether it matters, or find the indirect connection.

### Step 3: Rate Strategic Depth

For each activity, mark if it's:

```
TACTICAL (1-2):
- Fixes one specific thing
- Quick to implement
- Doesn't change underlying systems
- Examples: Fix a button color, adjust copy, fix a bug

MODERATE (3):
- Improves a flow or feature
- Medium effort
- Examples: Redesign a form, improve onboarding step

STRATEGIC (4-5):
- Changes how the product works fundamentally
- Requires significant investment
- Creates leverage for future improvements
- Examples: Design system, new IA, user research program
```

### Step 4: Rate Business Impact

For each activity, estimate impact:

```
LOW (1-2):
- Nice to have
- Affects small number of users
- Marginal improvement to metrics

MEDIUM (3):
- Meaningful improvement
- Affects significant portion of users
- Measurable metric change expected

HIGH (4-5):
- Critical to business goals
- Affects most/all users
- Large metric improvement expected
```

### Step 5: Plot and Prioritize

```
| UX Activity | Strategic (1-5) | Impact (1-5) | Priority |
|-------------|-----------------|--------------|----------|
| [Activity] | [score] | [score] | [calc] |
```

**Priority calculation:**
- **Quick wins (tactical + high impact):** Do immediately
- **Big bets (strategic + high impact):** Plan and resource properly
- **Foundations (strategic + lower impact):** Invest when you have capacity
- **Maybe never (tactical + low impact):** Deprioritize or cut

### Step 6: Write the Business Case

For your top priorities, write:

```
RECOMMENDATION: [UX Activity]

Business case:
- Affects: [which users, what % of base]
- Current state: [metric is X]
- Expected improvement: [metric will become Y]
- Investment required: [time/resources]
- ROI timeline: [when we'll see results]

Risk of NOT doing this:
- [consequence 1]
- [consequence 2]
```

---

## Output Format

```
## UX Prioritization

### Priority Matrix
| Activity | Strategic | Impact | Priority | Do When |
|----------|-----------|--------|----------|---------|
| [Name] | [1-5] | [1-5] | Quick win | Now |
| [Name] | [1-5] | [1-5] | Big bet | Q2 |
| [Name] | [1-5] | [1-5] | Foundation | Ongoing |
| [Name] | [1-5] | [1-5] | Deprioritize | Never |

### Top 3 Recommendations
1. [Activity]: [one-line business case]
2. [Activity]: [one-line business case]
3. [Activity]: [one-line business case]

### What We're NOT Doing (and why)
- [Activity]: [reason to deprioritize]
```

---

## Stakeholder Talking Points

When presenting to leadership:

```
"We're prioritizing [Activity] because it directly affects [metric],
which is [X% of revenue / affecting Y users / costing us $Z].

We expect [improvement] based on [evidence/benchmark].

The alternative is [consequence of not doing it]."
```

**Avoid:**
- "It's best practice"
- "Users don't like it"
- "It's ugly"
- "Competitors do it"

**Instead:**
- "It's costing us X conversions per month"
- "Support tickets about this cost us Y hours"
- "Users drop off here at Z% rate"

---

## When This Works Best

- Planning sprints or quarters
- Fighting for UX resources
- Choosing between competing improvements
- Justifying design system investment

## When to Skip This

- You already know the priority (just do it)
- Exploratory/research phase (too early to prioritize)
- Everything is genuinely equally important (rare)
