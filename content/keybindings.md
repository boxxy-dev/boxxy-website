+++
title = "Keybindings"
template = "docs.html"
+++

# Keybindings

Boxxy comes with sensible defaults for tabs, splits, navigation, and =BoxxyClaw= — and every shortcut can be customized in =Preferences= (`Ctrl+,`) → =Shortcuts= or directly in `~/.config/boxxy-terminal/keybindings.toml`.

You can also print your active keymap anytime from the CLI:

```bash
boxxy-terminal +keybinds
```

---

## General

| Action | Default Shortcut |
| :--- | :--- |
| Command Palette | `Ctrl+Shift+P` |
| Ask Boxxy-Claw | `Ctrl+/` |
| Ask Side Question (`/btw`) | `Ctrl+Shift+B` |
| Toggle Claw Code & Diff Blocks | `Ctrl+Shift+D` |
| Toggle Sidebar | `Ctrl+Shift+J` |
| New Window | `Ctrl+Shift+N` |
| Preferences | `Ctrl+,` |

---

## Terminal

| Action | Default Shortcut |
| :--- | :--- |
| Copy / Paste | `Ctrl+Shift+C` / `Ctrl+Shift+V` |
| Select All | `Ctrl+Shift+A` |
| Search Scrollback | `Ctrl+Shift+F` |
| Previous / Next Command Block | `Ctrl+Shift+PageUp` / `Ctrl+Shift+PageDown` |
| Open Scrollback in Editor | `Ctrl+Alt+Shift+J` |
| Zoom In / Out / Reset | `Ctrl++` / `Ctrl+-` / `Ctrl+0` |

---

## Split Panes

| Action | Default Shortcut |
| :--- | :--- |
| Split Right / Split Down | `Ctrl+Shift+O` / `Ctrl+Shift+E` |
| Close Pane | `Ctrl+Shift+W` |
| Focus Pane | `Ctrl+Alt+Arrows` |
| Swap Pane | `Ctrl+Shift+Arrows` |

---

## Tabs

| Action | Default Shortcut |
| :--- | :--- |
| New Tab / Close Tab | `Ctrl+Shift+T` / `Ctrl+Shift+Q` |
| Next / Previous Tab | `Ctrl+Tab` / `Ctrl+Shift+Tab` *(or `Ctrl+PageDown` / `PageUp`)* |
| Jump to Tab 1–10 | `Alt+1` – `Alt+9`, `Alt+0` |

---

## Customizing & Smart Shortcuts

- **Click-to-Record UI:** Open =Preferences= → =Shortcuts= to rebind any action, assign multiple chords, or revert individual rows in one click. Actions without a default shortcut (like **Toggle Maximize Pane**, **Equalize Splits**, **Copy Last Command Output**, **Bookmarks**, or **Background Shells**) can also be bound here.
- **Smart Shortcuts (`performable:`):** Toggle **Smart Shortcut** on actions like Copy to make them context-aware — for example, binding `performable:Ctrl+C` copies when text is selected and sends a normal `^C` interrupt when nothing is selected.
- **Dotfile-Friendly Config:** Only your customized bindings are written to `~/.config/boxxy-terminal/keybindings.toml`, so untouched shortcuts automatically stay up to date, and edits hot-reload when the window regains focus.
