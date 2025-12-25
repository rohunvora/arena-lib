# Skill Evaluation System

Test whether skills improve Claude's output vs default behavior.

## How It Works

```
1. Create a test case (broken code + expected fix)
2. Run WITHOUT skill → save output A
3. Run WITH skill → save output B
4. Score both against rubric
5. Store results for analysis
```

## Directory Structure

```
eval/
├── cases/              # Test cases (broken code to fix)
│   └── spacing-001/
│       ├── case.md     # Description + prompt
│       ├── input.tsx   # Broken code
│       └── expected.md # What "good" looks like
│
├── results/            # Test results
│   └── spacing-001/
│       ├── without-skill.md
│       ├── with-skill.md
│       └── analysis.md
│
└── summary.md          # Running tally of all tests
```

## Running a Test

### Step 1: Disable Skills
```bash
mv .claude/skills .claude/_skills-disabled
```

### Step 2: Run Test A (Without Skill)
Open Claude, paste the case prompt + input code.
Save Claude's response to `results/{case}/without-skill.md`

### Step 3: Re-enable Skills
```bash
mv .claude/_skills-disabled .claude/skills
```

### Step 4: Run Test B (With Skill)
Fresh conversation. Same prompt + input.
Save response to `results/{case}/with-skill.md`

### Step 5: Score & Analyze
Fill out `results/{case}/analysis.md` using the rubric.

## Scoring Rubric

| Criteria | 0 | 1 | 2 |
|----------|---|---|---|
| **Correct diagnosis** | Wrong problem identified | Partially correct | Nailed the actual issue |
| **Specific values** | Vague ("add padding") | Some specific values | All values specific + on grid |
| **Complete fix** | Fixed one thing | Fixed most issues | Caught everything |
| **No regressions** | Broke other things | Minor side effects | Clean fix |
| **Ship-ready** | Needs major rework | Needs minor tweaks | Would ship as-is |

**Score:** 0-10 points possible per test.

## Interpreting Results

| Skill Score vs Default | Interpretation |
|------------------------|----------------|
| +3 or more | Skill is significantly better |
| +1 to +2 | Skill is marginally better |
| 0 | No difference |
| Negative | Skill is making it worse (fix the skill!) |
