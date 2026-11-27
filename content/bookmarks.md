+++
title = "Bookmarks"
template = "docs.html"
+++

# Bookmarks

Stop digging through shell history for the same SSH tunnels, Docker cleanups, or deploy commands. **Bookmarks** let you save reusable =Bash= and =Python= scripts and run them in one click from the sidebar, the Bookmarks gallery, or the Command Palette (`Ctrl+Shift+P`).

---

## Dynamic Variables

Wrap any value in triple curly braces — <code>&#123;&#123;&#123;name&#125;&#125;&#125;</code> — to turn a static script into a reusable template:

{% raw %}
```bash
#!/bin/bash
ssh -L {{{local_port}}}:localhost:{{{remote_port}}} {{{user}}}@{{{host}}}
```
{% endraw %}

- **Live Preview in the Editor:** As you type, the Bookmark Editor detects every placeholder automatically, shows them as chips in the variable bar, and gives you a **<code>+ Insert &#123;&#123;&#123;var&#125;&#125;&#125;</code>** button.
- **Prompt on Run:** Whenever you launch a bookmark with placeholders, Boxxy asks you for the values right before running it in your active terminal.

---

## Generate with AI

Don't want to write Bash or Python boilerplate by hand? Click **Generate with AI** inside the Bookmark Editor, describe what you want in plain English, and let Boxxy draft the script for you — complete with syntax highlighting and template variables you can tweak before saving.

You can also ask any =BoxxyClaw= character to create a bookmark during a chat and save it with one click.

---

## Running & Organizing

- **Left Sidebar:** Switch to =Bookmarks= in the sidebar (`Ctrl+Shift+J`) for one-click execution, variable count badges, and drag-and-drop reordering.
- **Bookmarks Gallery & Command Palette:** Open the full **Bookmarks** tab to search and preview your scripts, or press `Ctrl+Shift+P` to fuzzy-find and run any bookmark straight from the keyboard.
- **Plain Local Files:** Your scripts live right on disk at `~/.config/boxxy-terminal/bookmarks/` (as standard `.sh` and `.py` files alongside `bookmarks.json`), making them easy to back up or version-control with your dotfiles.
