+++
title = "Getting Started"
template = "docs.html"
+++

# Getting Started

Boxxy is an agentic terminal. You can certainly use it without the AI features...
<br />but then again, where's the fun in that? 😅

Press `Control + Shift + p` to open the Command Palette and start exploring!

---

## Shell Integration

Boxxy respects your environment. It relies on your existing shell and avoids injecting features to modify it. For the best experience, it is **strongly** recommended to use a modern, Rust-based shell like [Fish](https://github.com/fish-shell/fish-shell). 

To enable terminal hyperlinks =(OSC 8)=, ensure that CLI tools like `ls` or `eza` are configured to use the `--hyperlink=auto` flag.

---

## Model Selection

Navigate to =Preferences= -> =APIs= and enter the connection strings for your preferred LLM providers. Then, open =Model Selection= to assign specific models to Boxxy's core functions:

- `AI Chat:` Used exclusively for the AI Chat in the sidebar. This model is completely stateless and separate from the rest of the application's UI and Database.
- `Claw:` Powers your characters and assists with `Bookmarks Scripts`. A highly capable, yet fast, reasoning-focused model is recommended here.
- `Memories & Dreams:` Responsible for extracting background facts and matching database memories. A fast, lightweight model is ideal for this task.

**Pro Tip:** Press `Shift + Control + p` and type =Models= to quickly jump to the =Model Selection= menu. Experiment with different models until you find the perfect balance of speed and intelligence.

--- 

## Characters Conversation

Press `Control + /` to start a new conversation with a character. Boxxy comes with 3 pre-installed characters, but you can edit them [or add your own](@/characters.md).

You can also use the Message Bar to paste large chunks of text or even **images** directly from your clipboard to provide extra context to your character! 

---

## Reminders & Scheduled Tasks

Your characters understand when you ask them to **remind you of something!** For example, you can ask your character "Remind me to take my dog out in 10 minutes", and they will send you a notification. You can set as many reminders as you like, and at any time you can ask them to list pending reminders.

You can also set scheduled tasks — for example, "Please clean up my PC in 20 minutes". In this case, Boxxy will present an approval widget before executing.

**Note:** Tasks and Reminders are scoped per character. Closing a pane will automatically cancel its pending reminders and scheduled tasks.

---

## Bookmarks

Open =Bookmarks= from the =Command Palette=. Here, you can create and save =Python= and =Shell= scripts. Boxxy automatically registers your saved bookmarks as quick-actions in the =Command Palette= for lightning-fast execution. 

Need dynamic inputs? Define runtime variables using the `{{{my_var}}}` syntax. Boxxy will prompt you to fill them out right when you invoke the script.

All your scripts are safely stored locally at `~/.config/boxxy-terminal/bookmarks`.

---

## Picking Up Where You Left Off

Never lose your context again. You can resume any of your **last 10 sessions** in any terminal pane by pressing `Control + /` and typing `/resume`. Boxxy will present your recent history, making it easy to pick up exactly where you left off.

If you want to keep a specific session forever, you can =Pin it= using the pin toggle in the message bar. Pinned sessions are always displayed at the top of your list and are never automatically deleted, no matter how many new sessions you start! 

See more at [How It Works](@/how-it-works.md#resume-session).

--- 

## Memories & Dreams

Boxxy is a self-improving system with two complementary layers that build up knowledge about you over time.

**Memories** are persistent facts your character knows about you. They are collected in two ways:
- **Explicit**: Tell your character directly — ='My favorite editor is micro'= — and it will store that fact immediately.
- **Implicit**: A background model evaluates every conversation turn and silently extracts durable preferences and patterns without interrupting you.

All memories are stored in a human-readable file at `~/.config/boxxy-terminal/boxxyclaw/MEMORY.md` that you can view, edit, or add to at any time.

**Dreams** are how Boxxy consolidates what it has learned. When your machine is on AC power and idle, a low-priority background pipeline runs a three-phase process: it ingests recent interactions, extracts lasting behavioral patterns while resolving any conflicts, and then promotes the distilled facts into the memory database. Think of it as the system "sleeping on" your session to build a cleaner, more accurate picture of your preferences.

**Note:** Boxxy is currently in =PREVIEW=. Short-term memories may be wiped during application updates, but your long-term memory in `MEMORY.md` will survive.

--- 

## Token Consumption

Boxxy is not context-cheap! To perform at its best, it simultaneously processes a comprehensive set of data: the core toolbox, your active skills, relevant memories, and a snapshot of the terminal buffer. 

You can monitor real-time usage via the =ClawSidebar=. However, modern flagship models (like Gemini, Claude, and GPT) utilize advanced **Context Caching**. This typically reduces the actual billable tokens by up to 80-90% for subsequent requests in the same session. 

To inspect the exact payload Boxxy is broadcasting, run:

```bash
BOXXY_DEBUG_CONTEXT=1 boxxy-agent start
```

---

## Desktop Shell Extension

Boxxy has an optional companion extension for **GNOME Shell** that brings daemon controls and character management into your desktop panel. You can monitor the agent, start or stop it, browse your characters, and jump directly to an active pane — all without touching the terminal.

Get it here: [gnome-shell-boxxy-companion](https://github.com/boxxy-dev/gnome-shell-boxxy-companion)

Support for other desktops (KDE Plasma, COSMIC, Waybar, etc.) is not available yet, but community plugins are very welcome — the integration is simple D-Bus calls against the `boxxy-agent` daemon.

---

## Troubleshooting: inotify Limits

Depending on your distribution, you may need to raise your system's `inotify` limits. Boxxy uses file-watching heavily (for hot-reloading skills, characters, and memories), and low inotify limits can cause silent failures. Check your current values with:

```bash
cat /proc/sys/fs/inotify/max_user_instances
cat /proc/sys/fs/inotify/max_user_watches
```

For example, Fedora's defaults are often too low for modern development. You can safely raise both values by running:

```bash
echo fs.inotify.max_user_instances=65536 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```
