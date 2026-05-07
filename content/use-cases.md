+++
title = "Use Cases"
template = "docs.html"
+++

# Use Cases

Boxxy is built to handle everything from daily terminal tasks to complex Linux system administration. Think of it as your ultimate Linuxbox assistant. Here are five ways Boxxy can supercharge your workflow:

### 1. Fixing Broken Dependencies
* **The Scenario:** You try to install a package with `apt` or `dnf`, but it fails due to a nightmare of conflicting dependencies or missing GPG keys.
* **The Boxxy Way:** Instead of hunting through StackOverflow, press `Control + /` and type "fix this." Boxxy automatically reads the failure from your terminal buffer, uses its Toolbox to check your package manager's state, and proposes the exact commands needed to resolve the conflicts or import the missing keys.

### 2. Complex System Configuration
* **The Scenario:** You need to configure a new Nginx site with SSL, set up a complicated `systemd` service, or tweak your firewall rules.
* **The Boxxy Way:** Press `Control + /` and ask: "Help me set up an Nginx site for example.com with SSL." Boxxy checks your OS version, verifies if Nginx is installed, proposes the necessary configuration file writes in `/etc/nginx`, and guides you through the SSL generation—all while you simply click "Approve" for each step.

### 3. System Cleanup & Maintenance
* **The Scenario:** Your root partition is at 99% capacity and you have no idea where the space went.
* **The Boxxy Way:** Press `Control + /` and type: "My disk is full, help me clean it up safely." Because Boxxy can execute host-level commands, it runs `du` or `ncdu` in the background, analyzes the largest directories, and safely proposes the deletion of old Docker images, stale package caches, or orphaned logs.

### 4. Interactive Scripting with Bookmarks
* **The Scenario:** You have a common deployment or cleanup script you run frequently, but it requires different parameters each time.
* **The Boxxy Way:** Save the script as a **Bookmark** using `{{{project_name}}}` variables. When you run it from the Command Palette, Boxxy natively prompts you for the dynamic inputs, executes the script, and your character monitors the output to ensure everything ran successfully.

### 5. Context-Aware Log Analysis
* **The Scenario:** You're tailing `journalctl` or a production log file and spot a recurring system error that makes no sense.
* **The Boxxy Way:** Press `Control + /` and ask: "What does this kernel panic mean?" Boxxy analyzes the surrounding log context in your terminal buffer, looks up documentation using its Web Search tool, and explains the root cause without you ever leaving the terminal.
