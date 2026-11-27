+++
title = "Run in Background"
template = "docs.html"
+++

# Run in Background

Started a long `cargo build`, system upgrade, or local dev server and want to close your tab — or quit Boxxy altogether — without losing it? **Run in Background** keeps your shells alive after the window closes, and lets you pick up right where you left off.

---

## How to Use It

- **When Closing a Tab or Window:** If a pane has a running process, an active =BoxxyClaw= character, or a pending reminder, Boxxy shows a quick 3-button prompt: **Cancel**, **Terminate**, or **Run in Background**.
- **Make It Automatic:** Turn on =Always Keep Running Processes in Background= in =Preferences= → =Advanced= → =Shell=. Active shells and AI sessions will automatically detach whenever you close a tab or quit, while idle shells close cleanly without getting in your way.

---

## How It Works

Your terminal sessions don't actually live inside the Boxxy window — they're hosted by `boxxy-agent`, a lightweight background daemon running on your system.

- **Instant Detach:** Choosing **Run in Background** simply disconnects the UI from your shell while `boxxy-agent` keeps the process running.
- **Full Screen & Output Preserved:** The daemon keeps a 4 MB output buffer per detached shell, so interactive TUI apps (`vim`, `htop`, builds, logs) come back intact with their scrollback and state.
- **AI Sessions & Reminders Stay Awake:** If that tab had an active character or scheduled timer, it stays alive in the daemon too — your reminders will still fire desktop notifications right on schedule, even with Boxxy closed.

---

## Coming Back to Your Work

- **Header Bar Badge:** When you reopen Boxxy, click the background shells indicator in the header bar to reattach any individual shell — or hit **Restore All** to reconstruct your exact vertical and horizontal split-pane layout in one click.
- **Ask Your Character:** You can also just ask a character *"Restore my background shell"* and they'll bring it back into a new tab for you.
- **Desktop Top Bar:** Using the [GNOME Shell Extension or COSMIC Applet](@/desktop-integrations.md)? You can monitor detached shells and jump straight back into them from your desktop panel.

---

## Good to Know

- **Works on Native & Flatpak:** Because `boxxy-agent` runs on the host, background shells work identically whether you installed Boxxy natively or via Flatpak.
- **Automatic Cleanup:** Once a detached shell finishes on its own, Boxxy automatically sweeps it up after 4 hours so old sessions never pile up.
