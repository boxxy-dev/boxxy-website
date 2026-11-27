+++
title = "Skills"
template = "docs.html"
+++

# Skills

Skills are reusable playbooks that teach your =BoxxyClaw= characters how to handle specific workflows — without stuffing every conversation with instructions they don't need.

Instead of repeating the same rules over and over, drop a Markdown playbook into your skills folder and let Boxxy load it automatically whenever it's relevant.

---

## Built-in Skills

Boxxy ships with **three official skills** ready to use. They are **turned off by default** so they never clutter everyday coding turns — enable any of them anytime in =Preferences= (`Ctrl+,`) → =Skills=.

### Boxxy Theme Creator
Design a custom look for Boxxy just by describing a vibe or palette. Your character writes a ready-to-use `.toml` theme straight into your themes folder so you can pick it immediately in =Preferences= → =Themes=.

> **Try asking:** *"Create a Boxxy theme inspired by Studio Ghibli"*

### Boxxy Character Creator
Build a brand-new AI companion from scratch. Your character walks you through a quick 4-question interview, generates (or crops your own) `16:9` portrait and `1:1` avatar artwork, and packages a complete character ready to use in your drawer.

> **Try asking:** *"Let's create a new character"*

### Boxxy Self-Dev & Bug Reporter
Spot a bug in Boxxy or want to contribute a fix? Your character can shallow-clone Boxxy's source code to pinpoint the root cause and draft a clean GitHub issue — or even implement a fix, test it live in an isolated `--dev` window, and open a PR with your approval.

> **Try asking:** *"Help me investigate and report a bug in Boxxy"*

---

## How Skills Work

- **Automatic Matching:** When you send a message, Boxxy matches it locally against your enabled skills (with zero extra LLM calls) and injects the right instructions right when they're needed.
- **Zero Overhead When Off:** Skills toggled off in =Preferences= → =Skills= are skipped completely — zero tokens spent until you turn them on.
- **Hot Reload:** Edit or add a skill file and Boxxy picks it up automatically, without restarting the terminal.

---

## Creating Your Own Skills

You can add your own skills for anything you do repeatedly — deploying an app, cleaning up Docker, following team conventions, or running local scripts.

Open =Preferences= → =Skills= and click **Open Skills Folder** (located at `~/.config/boxxy-terminal/boxxyclaw/skills/`), then create a folder with a `SKILL.md` file inside:

```
~/.config/boxxy-terminal/boxxyclaw/skills/
└── my-deploy/
    └── SKILL.md
```

*(A single flat `<name>.md` file works too if you don't need extra scripts alongside it.)*

Here's a minimal `SKILL.md`:

```markdown
---
name: "My Deploy Workflow"
description: "Safe staging and production deployments for our web app"
triggers:
  - deploy
  - release
pinned: false
---

# Instructions

When the user asks to deploy:
1. Run `cargo test` first and stop if anything fails.
2. Check that `git status` is clean.
3. Run `./scripts/deploy.sh staging` and summarize the output.
```

- **`triggers`** *(optional)* — Keywords or phrases that help Boxxy match the skill right away.
- **`pinned`** *(optional)* — Set to `true` if you want this skill always active on every turn.
