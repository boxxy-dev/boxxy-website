+++
title = "Core Features"
template = "docs.html"
+++

# Terminal Features

Boxxy is, first and foremost, a high-performance Linux terminal built for modern developers (requiring **GTK 4.24+**). Before you even turn on the AI features, you're using a top-tier terminal emulator designed for speed, clarity, and deep desktop integration.

---

### The Core Engine (boxxy-vte)
At the heart of Boxxy is a custom-built, 100% Rust terminal engine. It replaces traditional C-based libraries with a modern, async-first lock-free architecture.

- **GPU Accelerated Rendering**: Uses GTK4's GSK scene graph and frosted-glass backdrop blur to render text and images with silky-smooth performance.
- **Kittygraphics & Image Viewer**: Native support for the Kitty graphics protocol in the grid, plus a built-in multi-tab **Image Viewer** with high-speed 4K/8K thumbnail decoding, pan/zoom, and clipboard copy.
- **Semantic Shell Integration**: Full support for **OSC 133** markers. Boxxy understands the exact boundaries between your prompt, your command, and the resulting output.
- **Bidirectional Reflow & Smart Selection**: Smooth text wrapping on resize and full-scrollback selection with edge autoscrolling and reliable Wayland clipboard persistence.
- **Advanced Regex Search**: A lightning-fast, Unicode-aware search system with automatic viewport scrolling.
- **Robust CWD & Files Integration**: Instant directory tracking via **OSC 7**, plus a built-in **Nautilus ("Open With Boxxy")** context-menu extension and `-d` / `-t` CLI flags.

### UI, Layout & Background Shells
Boxxy is designed to maximize your screen real estate and keep long-running work safe.

- **Run in Background & Split-Layout Restore**: Close a tab or quit the entire app while builds, updates, or AI sessions are running by choosing **Run in Background**. The daemon preserves full TUI/ANSI screen state and lets you restore single shells or reconstruct your entire vertical/horizontal split layout in one click.
- **Dynamic Splits with Soft Swap**: Split your terminal vertically or horizontally as many times as you need, and swap active panes anytime via keyboard shortcuts.
- **iTerm2 Themes & Frosted Glass**: Supports community iTerm2 color schemes, custom window transparency with native Wayland frosted-glass blur, and tab-wide background images.
- **Inactive Pane Dimming**: Automatically dims inactive terminal panes so your active focus is always crystal clear.
- **Modern Hyperlinks & Progress Bars**: Support for **OSC 8** hyperlinks with media previews on hover, and **OSC 9;4** sequences (from Cargo, Flatpak, etc.) rendered as native GTK progress bars.

---

## Agentic Features

BoxxyClaw is the AI layer built directly into the terminal. Unlike chat-window add-ons, it has full access to your shell, file system, and terminal buffer — allowing it to act, not just advise.

---

### Origin-Aware Error Diagnosis

Boxxy knows the difference between a command the agent proposed and a quick typo you made yourself:
- **Agent Commands**: If a command proposed by your character fails, the character automatically diagnoses the error and proposes a fix.
- **User Commands (Zero-Token Pill)**: If you mistype a command yourself, Boxxy shows a subtle **"Error Detected"** pill in the corner of the pane without spending a single token. Click it only when you want your character to jump in and help!

---

### Characters & Your Profile

Each terminal pane gets its own =Character=: a persistent AI session with a distinct name, avatar, personality, and color. Characters are coordinated by a central registry so no two panes accidentally claim the same persona at once, and they can collaborate across splits using the **Collaborative Swarm** toolbox.

Boxxy ships with three pre-built characters (`Niko Una`, `Levi Kujo`, and `Kuro`), and you can also configure your own **"You" Profile** (name, avatar, and accent color) in =Preferences= → =Characters=. See [Characters](@/characters.md) for details.

---

### Memory System & Dreaming

Boxxy is self-improving. It recalls relevant facts in under a millisecond using local SQLite FTS5 search and consolidates new knowledge in the background:

- **Provisional → Verified**: Implicitly observed facts start as provisional candidates and are promoted to verified long-term memory once reinforced across sessions.
- **Background Dream Cycle**: When your PC is on AC power and Boxxy's UI is closed, `boxxy-agent` runs a low-priority consolidation pass that syncs verified insights to `~/.config/boxxy-terminal/boxxyclaw/MEMORY.md` and writes an auditable log to `DREAMS.md`.
- **Zero Hot-Path Lag**: Regular conversation turns never block on background memory LLM calls.

---

### Toolbox & Approval Protocol

Characters interact with your machine through a structured library of tools rather than blind shell guessing:

- **File Operations & Diffing**: Read (`file_read`), write (`file_write`), delete (`file_delete`), and perform surgical edits (`replace_in_file`) with live diff previews, plus fast `glob_search` and `grep_search`.
- **System & Background Processes**: Inspect processes (`list_processes`), check hardware specs, or spawn detached GUI apps and dev servers (`run_background_command`).
- **Web, Network & Clipboard**: Fetch live documentation (`http_fetch`), search the web, and read/write the system clipboard.
- **Shell & Workspace**: Run commands in the terminal, restore background shells (`restore_background_shell`), and coordinate with peer panes.

Every sensitive action (running commands, editing files, killing processes, clipboard access) requires your explicit confirmation via an in-terminal **Approve** popover.

---

### Skills & MCP Support

- **Skills**: Characters automatically load specialized Markdown instruction sets from `~/.config/boxxy-terminal/skills/` (like `linux-system`, `linux-cleaner`, `docker-admin`, and `network-analyzer`) with instant hot-reload. See [Character Skills](@/skills.md).
- **MCP Support**: Connect characters to external tools and APIs via **Stdio** or **Streamable HTTP** in =Preferences= → =MCP=. See [MCP](@/mcp.md).

---

### Built-In & Tavily Web Search

Characters can search the web in real time using either **Built-in Native Search** (server-side grounding on Gemini, OpenAI, and Anthropic) or **Tavily** (automatically used as a fallback for local and third-party models), with more search providers coming soon. Toggle web search per pane using the **Globe Icon** in the message bar. See [Providers](@/providers.md#web-search-providers).

---

### Sidebar History & Session Resumption

Open the =Claw Sidebar= on any new pane to browse your **Past Conversations**, with **Pinned** sessions at the top for one-click restoration — or press `Ctrl+/` and type `/resume`.

Because session history is stored locally in SQLite with cumulative token and cost analytics, you can start a conversation with one provider (like Gemini) and seamlessly continue it with another (like Claude, Ollama, or a custom OpenAI-compatible endpoint).

---

### Persistent Reminders, Bookmarks & Desktop Companions

- **Persistent Reminders & Timers**: Ask your character to set a reminder or schedule a task. When you send a tab or window to the background, `boxxy-agent` keeps the timer running and fires native desktop notifications on time.
- **Interactive Bookmarks**: Save reusable Bash and Python scripts with <code>&#123;&#123;&#123;variable&#125;&#125;&#125;</code> placeholders, search them in the Bookmarks gallery, and generate scripts with AI.
- **GNOME Shell & COSMIC Companions**: Monitor detached background shells, active characters, and live reminder countdowns straight from your desktop top bar with the [GNOME Shell Extension](https://github.com/boxxy-dev/gnome-shell-boxxy-companion) and [COSMIC Desktop Applet](https://github.com/boxxy-dev/cosmic-boxxy-companion).
