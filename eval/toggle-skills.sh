#!/bin/bash

# Toggle skills on/off for A/B testing

SKILLS_DIR=".claude/skills"
DISABLED_DIR=".claude/_skills-disabled"

if [ -d "$SKILLS_DIR" ]; then
    mv "$SKILLS_DIR" "$DISABLED_DIR"
    echo "Skills DISABLED (moved to $DISABLED_DIR)"
    echo "Run test WITHOUT skill, then run this again to re-enable"
elif [ -d "$DISABLED_DIR" ]; then
    mv "$DISABLED_DIR" "$SKILLS_DIR"
    echo "Skills ENABLED (restored to $SKILLS_DIR)"
    echo "Run test WITH skill"
else
    echo "No skills directory found"
    exit 1
fi
