+++
title = "How It Works"
template = "docs.html"
+++

# How it Works

Boxxy is designed to be more than just a terminal with a chat window. It is built from the ground up to be a truly agentic environment that learns from you as you work.

Below is a breakdown of the core components that make Boxxy tick.

---

## Terminals & Characters

When =BoxxyClaw= is enabled, every terminal instance is paired with a =Character=. Each character is a dedicated session from your chosen =LLM Model=.

The core philosophy here is isolation: users typically spawn a new terminal to tackle a specific task. By assigning a unique character to each terminal, we ensure that the context for that specific task remains isolated from your other ongoing work.

To provide assistance, the character tracks your terminal's activity — what commands were run in the past and what is currently executing. When necessary, they can also read directly from the terminal buffer using a smart paging system (see [Terminal Buffer](#terminal-buffer) below).

However, it's very common to use multiple terminals simultaneously for a single, complex project. In these scenarios, you can explicitly ask a character (by name) to collaborate with another. When linked this way, they will share their context, allowing them to work together seamlessly across multiple terminal panes or windows.

---

## Self-Improving

Boxxy doesn't just forget everything when you close a tab. It is designed to learn your preferences, project structures, and "lessons learned" through a sophisticated, dual-layered memory system.

### A Mirror of Your Brain
While you work, Boxxy silently extracts facts—like your favorite editor or local environment specs—and mirrors them to a human-readable file at `~/.config/boxxy-terminal/boxxyclaw/MEMORY.md`. You are always in control of what the AI knows:

- **Verification**: New facts appear in  =Pending= until you move them to =Active.=
- **Manual Edits**: You can open the file and type your own facts directly into your character's "brain" at any time.
- **Smart Scoping**: Memories can be =Global= (applying everywhere) or =Project-Specific= (only active when you are working in a specific folder).
- **Pinning (📌)**: Add a 📌 emoji to any memory in the file to ensure it is always injected into the character's context, regardless of what you are doing.

---

## Terminal Buffer

Your characters aren't disconnected chatbots; they are deeply integrated into your terminal environment. Each pane has its own dedicated character, and you can see their name displayed directly in the terminal interface.

### Intelligent Paging
To provide the best assistance, characters have "eyes" on your terminal's activity. When necessary, they can read directly from the active terminal buffer to understand exactly what error you are seeing.

To optimize resource usage and radically reduce token consumption, Boxxy employs a smart **paging system**:
1. When you ask a question or an error occurs, the character initially requests only a small snapshot of the last **50 lines** of output.
2. If that snapshot isn't sufficient to understand the context, they will dynamically request the *preceding* 50 lines.
3. They iterate backwards through the buffer history until identifying the root cause of the issue.

This ensures the character gets the precise context needed without unnecessarily flooding the model with thousands of lines of irrelevant history.

---

## Resume Session 

Boxxy supports a stateless =Resume Session= model that allows you to restore any of your last 10 active sessions—or any session you've explicitly pinned—into any terminal pane.

### Stateless Resumption
Unlike other AI tools that rely on provider-side "Threads," Boxxy stores your entire conversation history locally in its SQLite database. When you use `/resume`:
- **Rehydration:** Boxxy loads the previous messages and "cleans" them of transient data (like old terminal snapshots).
- **Visual Logs:** Your entire sidebar history—diagnoses, proposed actions, and tool results—is re-rendered instantly.
- **Environment Sync:** Boxxy attempts to restore the terminal's =Working Directory= and re-activates any pending scheduled tasks.

### Switching Brains on the Fly
Because Boxxy's resumption is stateless, you can start a session with one model (e.g., "Gemini 3.1" ) and resume it with another (e.g., "Claude 4.6"). The new model simply reads the previous exchange and continues as if it were there all along.

### Persistent Analytics
Resuming a session also restores its =Cumulative Context Analytics=. Your sidebar will accurately reflect the total token spend for the entire life of that session, even if you've switched model providers or restarted the application.

---

## Toolbox

Think of the **Toolbox** as your character's set of "superpowers." Instead of simply guessing and typing commands into your terminal, they use a library of highly reliable, structured tools to interact with your computer.

These tools are grouped into specialized categories:
- **File Operations**: Safely read, write, and list directories. The AI can even read specific line ranges to save time and tokens.
- **System Monitoring**: View active processes and hardware specs as clean, structured data.
- **Web & Network**: Fetch documentation or look up code examples directly from the web with built-in safety limits.
- **Clipboard Access**: Securely read from and write to your system clipboard.

### Safety First: The Approval Protocol
We believe in **Supervised Autonomy**. Boxxy never performs a "dangerous" action (like deleting a file, killing a process, or reading your clipboard) without your explicit permission. 

When a character wants to use a sensitive tool, they will pause and present their plan to you in a popover. Only after you click **Approve** will the tool execute. This ensures you are always in control of what your character is doing on your machine.

---

## Boxxy Agent

The =Boxxy Agent= is a persistent host-level daemon that manages all privileged operations on your machine. It started as a workaround for Flatpak sandboxing — sandboxed applications cannot normally see or interact with the host OS — but has since grown into the backbone of the entire application.

The agent runs as a **single shared instance** for all open Boxxy windows. When Boxxy launches, it starts the daemon (or detects an already-running one) and claims a fixed name on your D-Bus session bus. All UI processes then communicate with it over this private, fast D-Bus connection.

### What the daemon manages

- **PTY sessions**: Spawns and owns all your terminal shells. Each session is tracked with a ring buffer, so context survives even if a pane is closed and resumed later.
- **Claw toolbox**: Handles the privileged side of all character tools — shell execution, file I/O (with path blacklisting), process management, and clipboard access.
- **Character claims**: Tracks which character is assigned to which terminal pane. Claims are held in memory only; nothing is written to disk.
- **Background maintenance**: Monitors system state (power source, ghost mode) and coordinates background work like the =Dreams= consolidation pipeline.

### Lifecycle

The agent can be controlled directly from the command line:
```bash
boxxy-agent start       # run the daemon
boxxy-agent stop        # clean shutdown
boxxy-agent restart     # reload without downtime
boxxy-agent list-sessions  # show active PTY sessions
```

In short: Boxxy's UI is a thin, sandboxed frontend. The Boxxy Agent is where everything actually runs.
