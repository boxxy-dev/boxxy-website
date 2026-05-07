+++
title = "Core Features"
template = "docs.html"
+++

# Terminal Features

Boxxy is, first and foremost, a high-performance Linux terminal built for modern developers. Before you even turn on the AI features, you're using a top-tier terminal emulator designed for speed, clarity, and deep shell integration.

---

### The Core Engine (boxxy-vte)
At the heart of Boxxy is a custom-built, 100% Rust terminal engine. It replaces traditional C-based libraries with a modern, async-first architecture.

- **GPU Accelerated Rendering**: Uses GTK4's GSK scene graph to render text and images with silky-smooth performance and zero tearing.
- **Kittygraphics Support**: Native support for the Kitty graphics protocol, allowing you to render high-resolution images and even rich media directly in your terminal grid.
- **Semantic Shell Integration**: Full support for **OSC 133** markers. Boxxy understands the difference between your prompt, your command, and the resulting output, allowing for smarter context awareness.
- **Bidirectional Reflow**: Smart text wrapping and unwrapping when you resize your window, ensuring your logs remain readable at any size.
- **Advanced Regex Search**: A lightning-fast, Unicode-aware search system with automatic viewport scrolling and word-boundary detection.
- **Robust CWD Tracking**: Instant directory tracking via **OSC 7**, which works seamlessly even over SSH or through sandboxed environments.

### UI & Layout
Boxxy is designed to maximize your screen real estate and keep you focused on your work.

- **Dynamic Splits with Soft Swap**: Split your terminal vertically or horizontally as many times as you need. With "Soft Swap", you can seamlessly exchange the contents of two active panes via a simple keyboard shortcut without breaking your workflow.
- **iTerm2 Themes**: Fully supports the popular iTerm2 color scheme format, giving you access to thousands of community-created themes. Switch between them instantly.
- **Seamless Background Images**: Set a background image for your entire tab. Boxxy intelligently spans the image across all transparent terminal splits for a gorgeous, unified look.
- **Inactive Pane Dimming**: Never get lost in your splits again. Boxxy automatically dims inactive terminal panes so your active focus is always crystal clear.
- **Modern Hyperlinks**: Support for **OSC 8** hyperlinks with robust media previews on hover, making your terminal feel more like a modern web browser.
- **Native Progress Bars**: Intercepts **OSC 9;4** sequences (like those from Cargo or Flatpak) to render native GTK progress bars directly in the UI.

---

## Agentic Features

BoxxyClaw is the AI layer built directly into the terminal. Unlike chat-window add-ons, it has full access to your shell, file system, and terminal buffer — allowing it to act, not just advise.

---

### Characters

Each terminal pane gets its own =Character=: a persistent AI session with a distinct name, personality, and color. Characters are isolated by design — one terminal per task — but you can explicitly link two characters so they share context when working on a multi-terminal project.

Boxxy ships with three pre-built characters. You can edit any of them or add your own via Markdown files in `~/.config/boxxy-terminal/boxxyclaw/characters/`. See [Characters](@/characters.md) for details.

---

### Memory System

Boxxy is self-improving. While you work, it silently extracts facts (your preferred editor, your project stack, lessons learned) and stores them in a human-readable file at `~/.config/boxxy-terminal/boxxyclaw/MEMORY.md`.

- **Pending → Active**: New facts wait for your approval before influencing the character.
- **Project-scoped**: Memories can apply globally or only when you are inside a specific folder.
- **Pinned memories (📌)**: Mark any fact with 📌 to force it into every context window, no matter what.
- **Long-term survival**: Long-term memories persist across app updates; short-term ones may not during preview phases.

---

### Toolbox & Approval Protocol

Characters interact with your machine through a structured set of tools rather than free-form shell guessing. Tools are grouped by capability:

- **File Operations**: Read, write, and list files — with line-range support to keep tokens low.
- **System Monitoring**: Process lists and hardware specs as clean, structured data.
- **Web & Network**: Fetch live documentation or look up error codes.
- **Clipboard**: Read from and write to your system clipboard.
- **Shell Execution**: Run commands directly in your terminal environment.

Any sensitive action (file deletion, process kill, clipboard access) requires your explicit approval via an **Approve** popover. The character presents its intent; nothing executes until you confirm.

---

### Skills

Characters can dynamically load specialized instruction sets called =Skills= to gain expert-level knowledge on demand. Skills are plain Markdown files in `~/.config/boxxy-terminal/skills/` and are hot-reloaded without restarting the terminal.

Bundled examples include `linux-system`, `linux-cleaner`, `docker-admin`, and `network-analyzer`. Activation is automatic — the character reads your prompt and loads whichever skill is most relevant.

See [Character Skills](@/skills.md) for the full guide and how to create your own.

---

### MCP Support

Boxxy natively supports the **Model Context Protocol**, letting you connect characters to external tools and APIs — live documentation servers, Git repositories, Slack, Jira, GitHub, or custom internal scripts.

Servers are configured in =Preferences= → =MCP= and boot lazily: Boxxy caches available tools at startup but only spawns the background process when a tool is actually needed, keeping terminal startup instant even with dozens of servers configured.

See [MCP](@/mcp.md) for setup instructions.

---

### Web Search

Characters can search the web in real time using **Tavily**, a search provider optimized for LLMs. Toggle web search per character from the Globe Icon in the message bar, or set it globally in =Preferences= → =Characters=.

Your terminal history and file contents are never sent to the search provider — only the query itself. See [Web Search](@/web-search.md).

---

### Resume Sessions

Press `Ctrl+/` and type `/resume` to restore any of your last 10 sessions — or any pinned session — into any terminal pane. Boxxy stores history locally in SQLite and rehydrates the full sidebar, context analytics, and working directory.

Because resumption is stateless, you can start a session with one model and continue it with another. The new model reads the transcript and picks up without interruption.

---

### Reminders & Bookmarks

**Reminders:** Ask your character to remind you of something ("remind me to check the deploy in 20 minutes") and they will send a native notification on time. Reminders are scoped per pane and cancelled automatically when you close it.

**Bookmarks:** Save Python or shell scripts in =Bookmarks= (accessible from the Command Palette). Use `{{{my_var}}}` syntax to define runtime variables — Boxxy will prompt for inputs when you invoke the script. All bookmarks are stored locally at `~/.config/boxxy-terminal/bookmarks`.
