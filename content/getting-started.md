+++
title = "Getting Started"
template = "docs.html"
+++

# Getting Started

Boxxy is an agentic terminal. You can certainly use it without the AI features...
<br />but then again, where's the fun in that? 😅

Press `Control + Shift + p` to open the Command Palette and start exploring!

---

## Shell & Files Integration

Boxxy respects your environment. It relies on your existing shell and avoids injecting features to modify it. For the best experience, it is **strongly** recommended to use a modern shell like [Fish](https://github.com/fish-shell/fish-shell).

To enable terminal hyperlinks =(OSC 8)=, ensure that CLI tools like `ls` or `eza` are configured to use the `--hyperlink=auto` flag.

Boxxy also integrates directly with **GNOME Files (Nautilus)** out of the box! Right-click any folder in Files and choose **Open With Boxxy** to launch a new window or tab straight in that directory (manageable in =Preferences= -> =Advanced= -> =Shell=).

---

## Model Selection & Custom Endpoints

Navigate to =Preferences= -> =APIs= to enter your API keys or add **OpenAI-Compatible Custom Endpoints** (with built-in presets for **OpenCode Go**, **OpenCode Zen**, **LiteLLM**, and local **vLLM / llama.cpp** servers, complete with automatic `/models` discovery).

Then open =Models Selection= (or click the quick model links right in the =Claw Sidebar=) to assign specific models to Boxxy's three roles:

- `AI Chat:` Used exclusively for the stateless AI Chat tab in the sidebar.
- `Claw:` Powers your terminal characters and assists with `Bookmarks Scripts`. A fast, capable reasoning model is recommended here.
- `Memories & Dreams:` Extracts background facts and consolidates long-term memories. A fast, lightweight model is ideal.

**Pro Tip:** Press `Shift + Control + p` and type =Models= to jump straight to =Models Selection=.

---

## Characters Conversation

Press `Control + /` to start a conversation with a character in your active pane. Boxxy comes with 3 pre-installed characters, and you can edit them [or add your own](@/characters.md). You can also set your own name and avatar under the **"You"** section in =Preferences= -> =Characters= so your characters know how to address you!

The =Message Bar= automatically wraps multi-line prompts and lets you paste large text snippets or **images** directly from your clipboard (rendered as compact thumbnails) to give your character visual context.

---

## Background Tasks & Detached Shells

Running a system upgrade, dev server, or long build and want to close your tab or quit Boxxy? Just choose **Run in Background** when closing (or enable =Always Keep Running Processes in Background= in =Preferences= -> =Advanced=).

- **Zero Lost Work:** The `boxxy-agent` background daemon keeps both your shell and your active =Claw= character session alive in the background with a full terminal screen buffer.
- **One-Click & Split-Layout Restore:** When you come back, click the background shells badge in the header bar (or ask your character *"Restore my background shell"*) to reattach individual tabs — or hit **Restore All** to reconstruct your exact vertical and horizontal split-pane layout!
- **Launch Detached Apps:** You can also ask your character to launch GUI apps, dev servers, or background scripts directly without blocking your active prompt.

---

## Reminders & Scheduled Tasks

Your characters understand when you ask them to **remind you of something!** Ask *"Remind me to take my dog out in 10 minutes"* or *"Remind me to check the deployment in 30 minutes"*, and they will send you a rich desktop notification with their avatar right on time. You can also schedule deferred commands — Boxxy will pop up an approval card when the timer goes off.

**Works Even With Boxxy Closed:** If you close a tab or window that has an active character or pending timer and choose **Run in Background**, your character stays awake in the background daemon. Your reminders keep ticking and will still notify your desktop on schedule!

---

## Bookmarks

Open =Bookmarks= from the left sidebar or the =Command Palette= to create, search, and run reusable =Bash= and =Python= scripts.

- **Dynamic Template Variables:** Add placeholders using <code>&#123;&#123;&#123;my_var&#125;&#125;&#125;</code> syntax (or click the interactive variable bar in the editor). When you run the bookmark, Boxxy opens a clean in-terminal form prompting you for each value.
- **AI Script Generation:** Describe what you want in plain English and let Boxxy write or refine the script for you.

All your scripts are stored locally at `~/.config/boxxy-terminal/bookmarks`.

---

## Picking Up Where You Left Off

Never lose your context again. Whenever you open the =Claw Sidebar= on a new pane, your **Past Conversations** are listed right there for one-click resumption — or press `Control + /` and type `/resume`.

Use the per-conversation menu (or the pin icon in the message bar) to =Pin= important sessions to the top of your list so they are never rotated out, or delete old ones you no longer need. See more at [How It Works](@/how-it-works.md#resume-session).

---

## Memories & Dreams

Boxxy is a self-improving system with two complementary layers that build up knowledge about you over time:

**Memories** are persistent facts your character knows about you:
- **Explicit**: Tell your character directly — *"My favorite editor is micro"* — and it stores that preference immediately.
- **Implicit**: As conversations wrap up, a background pass extracts candidate facts and preferences without slowing down your live turns.

All verified memories are synced to a human-readable file at `~/.config/boxxy-terminal/boxxyclaw/MEMORY.md` that you can view or edit anytime.

**Dreams** are how Boxxy consolidates what it has learned. When your machine is on AC power and Boxxy's UI is closed, the background daemon runs a low-priority Dream Cycle: it reviews recent interactions, promotes reinforced facts into long-term memory, resolves outdated contradictions, and logs every verified promotion to `DREAMS.md`.

---

## Token Consumption

Boxxy is context-rich! To perform at its best, it processes your active toolbox, relevant skills, memories, and terminal snapshots.

You can monitor real-time token and cost usage (`% used` and `$ spent`) in the =Claw Sidebar=. Modern providers (Gemini, Claude, OpenAI) also leverage **Context Caching**, reducing billable input tokens by up to 80–90% across multi-turn sessions.

To inspect the exact payload Boxxy sends to a model, run:

```bash
BOXXY_DEBUG_CONTEXT=1 cargo run
```

---

## Desktop Companion Extensions (GNOME Shell & COSMIC)

Boxxy offers native desktop panel companions for both **GNOME Shell** and the **COSMIC Desktop**!

They connect directly to `boxxy-agent` over D-Bus so you can monitor active characters, see live reminder countdowns, cancel timers, and restore detached background shells right from your top panel — even when all Boxxy windows are closed:

- **GNOME Shell Extension:** [gnome-shell-boxxy-companion](https://github.com/boxxy-dev/gnome-shell-boxxy-companion)
- **COSMIC Desktop Applet:** [cosmic-boxxy-companion](https://github.com/boxxy-dev/cosmic-boxxy-companion)

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
