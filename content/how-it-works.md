+++
title = "How It Works"
template = "docs.html"
+++

# How it Works

Boxxy is designed to be more than just a terminal with a chat window. It is built from the ground up to be a truly agentic environment that learns from you as you work and stays alive in the background when you need it.

Below is a breakdown of the core components that make Boxxy tick.

---

## Terminals, Characters & Swarm Coordination

When =BoxxyClaw= is enabled, every terminal pane claims a unique =Character= from the central `CharacterRegistry` managed by `boxxy-agent`.

Each pane is isolated by default so that context for one task never pollutes another. However, all active panes are connected through Boxxy's **Global Workspace Radar**:
- You can ask one character (by name) to read another pane's output, delegate subtasks, or coordinate across splits.
- Characters also see any **detached background shells** in their radar and can restore them back into a tab whenever you ask.

---

## Self-Improving Memory & Dreaming

Boxxy doesn't forget everything when you close a tab. It learns your preferences, project structures, and environment through a fast, two-tier memory system:

### 1. Sub-Millisecond Recall & Batch Extraction
- **Zero-Lag Turn Recall:** Before every turn, Boxxy queries a local SQLite FTS5 index in under `1ms` — injecting relevant memories and core system facts (OS, shell, package manager) with **zero extra LLM calls** on the critical path.
- **Batch Flush:** As conversation history slides past the active window or when a session goes to sleep/closes, a background pass extracts candidate facts and a concise episodic summary without slowing down your live chat.

### 2. The Dream Cycle & `MEMORY.md`
When your PC is on AC power and all Boxxy windows are closed (Ghost Mode), the `boxxy-agent` daemon runs a low-priority **Dream Cycle**:
- **Reinforcement:** Candidate facts that have been observed multiple times with high confidence are promoted to verified long-term memories.
- **Conflict Resolution:** Outdated facts are automatically demoted when your habits change, while your explicit preferences and manual edits are strictly protected.
- **Human-Readable Sync:** Verified memories are mirrored to `~/.config/boxxy-terminal/boxxyclaw/MEMORY.md` and logged in `DREAMS.md`.

---

## Terminal Buffer & Origin-Aware Diagnosis

Your characters have "eyes" on your terminal grid powered by **OSC 133** semantic prompt markers (`[PROMPT]`, `[COMMAND]`, `[OUTPUT]`):

- **Smart Snapshot Deduplication & Paging:** If the terminal hasn't changed since the last turn, Boxxy sends a tiny `[NO_CHANGE]` token instead of re-sending the buffer. When investigating long logs, the character pages backwards 50 lines at a time (`read_scrollback_page`) only as needed.
- **Origin-Aware Errors:** If an agent-proposed command exits with an error, the character auto-diagnoses it immediately. If a command *you* typed fails, Boxxy shows a zero-token **"Error Detected"** pill in the corner so typos never waste tokens unless you click it.

---

## Resume Session

Boxxy stores your conversation history, tool logs, and token analytics locally in SQLite so you can pick up any session in any pane:

- **Sidebar & `/resume`:** Browse your recent and **Pinned** conversations directly in the =Claw Sidebar= on any new pane (with quick actions to pin, unpin, or delete), or press `Ctrl+/` and type `/resume`.
- **Switch Models Anytime:** Because history is stored locally in a provider-agnostic format, you can start a session with Gemini, switch to Claude or a custom OpenAI-compatible endpoint mid-conversation, and keep your full context and cumulative token/cost stats intact.

---

## Toolbox & Supervised Autonomy

Instead of blindly guessing shell commands, characters use a structured toolbox:
- **File & Workspace Tools**: `file_read`, `file_write`, `replace_in_file` (with unified diff preview), `file_delete`, `list_directory`, `glob_search`, and `grep_search`.
- **System & Background Tools**: `list_processes`, `kill_process`, `get_system_info`, and `run_background_command` (for launching detached GUI apps, dev servers, and scripts).
- **Web & Clipboard Tools**: Native server-side web search, Tavily `web_search`, `http_fetch`, and clipboard read/write.

### The Approval Protocol
Boxxy enforces **Supervised Autonomy**. Sensitive actions (running shell commands, modifying files, killing processes, or accessing the clipboard) always pause and present an in-terminal **Approve / Reject** card first. Nothing executes without your say-so.

---

## Boxxy Agent & Background Persistence

The =Boxxy Agent= (`boxxy-agent`) is a lightweight, host-privileged daemon that powers all terminal shells and AI sessions over a fast D-Bus connection — allowing Boxxy to work seamlessly both natively and inside a **Flatpak** sandbox (such as Fedora Silverblue).

### What the daemon manages
- **Detached Background Shells**: Owns all PTY sessions with a 4 MB ring buffer and full ANSI/TUI screen snapshots. When you choose **Run in Background** on tab or window close, your processes keep running and can be restored individually or in their original split-pane layout.
- **Persistent AI Sessions & Timers**: Keeps backgrounded `ClawSession` actors and their scheduled **reminders/tasks** alive even when all UI windows are closed, firing native desktop notifications via `org.freedesktop.Notifications` right on time.
- **Desktop Companion D-Bus API**: Broadcasts real-time signals (`DetachedSessionsChanged`, `PendingTasksChanged`) consumed by the [GNOME Shell Extension](https://github.com/boxxy-dev/gnome-shell-boxxy-companion) and [COSMIC Desktop Applet](https://github.com/boxxy-dev/cosmic-boxxy-companion).

### CLI Control
You can inspect or control the daemon anytime from your shell:
```bash
boxxy-agent status         # inspect daemon, dreaming status & active sessions
boxxy-agent list-sessions  # list active and background PTY sessions
boxxy-agent restart        # reload the daemon cleanly
boxxy-agent stop           # shut down the daemon
```
