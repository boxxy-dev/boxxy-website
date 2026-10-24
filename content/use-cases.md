+++
title = "Use Cases"
template = "docs.html"
+++

# Use Cases

Boxxy is built to handle everything from everyday reminders and background jobs to deep Linux system administration. Think of it as your ultimate Linux companion. Here are the most popular ways people use Boxxy every day:

### 1. Debugging & Fixing Your Linux Box
* **The Scenario:** You try to run a system update or start a service, and it fails with conflicting packages, broken GPG keys, or a cryptic `systemd` error.
* **The Boxxy Way:** Instead of hunting through forum threads, press `Control + /` (or click the **Error Detected** pill) and type "fix this." Boxxy reads the failure straight from your terminal buffer, checks your OS and package manager state, and proposes the exact commands to fix it — waiting for your click on **Approve**.

### 2. Sending Long Tasks to the Background
* **The Scenario:** You're compiling a huge Rust workspace, running a full distro upgrade, or hosting a local dev server, and you need to close your terminal window to declutter your desktop.
* **The Boxxy Way:** Close the tab or window and click **Run in Background**. Boxxy's background daemon keeps your shell and AI character running safely. You can monitor or reattach it from the **GNOME Shell** or **COSMIC** top-panel companion, or reopen Boxxy later and click **Restore All** to get your exact split-pane layout and TUI screen back instantly.

### 3. Persistent Reminders & Scheduled Tasks
* **The Scenario:** You're deep in code and want to remember to check a deployment in 20 minutes, take a break in an hour, or run a cleanup task later.
* **The Boxxy Way:** Press `Control + /` and tell your character: "Remind me to check the staging deploy in 20 minutes." Even if you close the terminal into the background, your character's timer keeps ticking in the daemon and sends a native desktop notification with their avatar right on schedule.

### 4. Chatting & Pairing with Your Favorite Character
* **The Scenario:** Standard AI assistants feel robotic, forget your setup between tabs, and don't know whether you prefer `fish` over `bash` or `podman` over `docker`.
* **The Boxxy Way:** Pair up with **Niko**, **Levi**, or **Kuro** — or create your own character in seconds. Your character knows your name, keeps their unique personality, and automatically learns your tools and project habits over time through **Memories & Dreams**.

### 5. System Cleanup & Disk Maintenance
* **The Scenario:** Your root partition hits 98% capacity and you aren't sure what is eating up your drive.
* **The Boxxy Way:** Ask your character: "My disk is almost full, help me clean it up safely." They will inspect disk usage, identify heavy caches, old container images, or orphaned packages, and propose safe cleanup steps one by one for your approval.

### 6. One-Click Parameterized Scripts with Bookmarks
* **The Scenario:** You have deployment, backup, or SSH tunnel scripts that you run often, but you always have to edit flags or hostnames by hand.
* **The Boxxy Way:** Save the script in **Bookmarks** using <code>&#123;&#123;&#123;environment&#125;&#125;&#125;</code> or <code>&#123;&#123;&#123;host&#125;&#125;&#125;</code> variables (or ask Boxxy to generate the script for you). Whenever you run it, Boxxy prompts you for those variables in a clean overlay form and executes it right in your pane.
