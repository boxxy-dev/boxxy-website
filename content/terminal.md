+++
title = "Terminal"
template = "docs.html"
+++

# Terminal

Boxxy is, first and foremost, a fast Linux terminal built in Rust for **GTK 4.24+**. Even if you never turn on the AI features, you get a crisp, responsive terminal designed for everyday speed and clean desktop integration.

---

## Fast Rust Engine (`boxxy-vte`)

At the core of Boxxy is a custom, 100% Rust terminal engine built for smooth rendering and modern shell features:

- **GPU-Accelerated Rendering:** Uses GTK4's scene graph with optional native Wayland frosted-glass blur for crisp text and silky scrolling.
- **Kitty Graphics & Built-In Image Viewer:** Render images directly in the terminal grid, or inspect high-res images in Boxxy's built-in multi-tab **Image Viewer** with fast thumbnail decoding, pan/zoom, and clipboard copy.
- **Smart Shell Integration:** Full support for **OSC 133** prompt markers, **OSC 7** directory tracking, **OSC 8** clickable hyperlinks (with media previews on hover), and **OSC 9;4** progress bars (from Cargo, Flatpak, and more) rendered natively in the UI.
- **Reflow, Search & Wayland Clipboard:** Smooth text reflow on window resize, fast Unicode-aware regex search, full-scrollback selection with edge autoscrolling, and reliable Wayland clipboard persistence.

---

## Panes, Tabs & Background Shells

- **Splits & Drag-and-Drop Panes:** Split your terminal vertically or horizontally as much as you like, swap panes with shortcuts, or grab the subtle top handle to drag and drop a pane into any split zone — even across tabs.
- **Smart Tab Naming:** Tabs automatically stay readable by showing what matters most — remote host and directory (`host · dir`), active commands like `vim`, or smart folder disambiguation (`src · parent`) — with the full path on hover.
- **Inactive Pane Dimming:** Subtly dims unfocused splits so your active cursor always stands out.
- **Run in Background:** Close a tab or quit Boxxy without killing builds, servers, or system upgrades, and restore your entire split layout whenever you come back. [Learn how Run in Background works →](@/run-in-background.md)

---

## Themes & Appearance

- **Boxxy Themes:** Switch between official =Boxxy Dark= and =Boxxy Light=, pick a custom **Accent Color**, load hot-reloaded community `.toml` themes, or follow your system's Adwaita style. See the [Boxxy Theme API](@/theme-api.md).
- **Terminal Palettes & Glass:** Choose from community iTerm2 terminal color schemes, adjust window opacity with frosted-glass blur, or set tab-wide background images.

---

## Bookmarks, Shortcuts & CLI

- **Interactive Bookmarks:** Save reusable =Bash= and =Python= scripts with <code>&#123;&#123;&#123;variable&#125;&#125;&#125;</code> placeholders and run them through a quick in-terminal form. [Learn how Bookmarks work →](@/bookmarks.md)
- **Command Palette & Custom Shortcuts:** Press `Ctrl+Shift+P` to jump to any action, or click-to-record your own keybindings (and Smart Shortcuts) in =Preferences= → =Shortcuts=. [See all default Keybindings →](@/keybindings.md)
- **Modern CLI:** Open tabs, directories, or commands from anywhere (`-t`, `-d`, `-e`, `--hold`), or run headless utilities like `boxxy-terminal +doctor`, `+env`, and `+agent status`.
- **Desktop Integration:** Right-click any folder in **GNOME Files (Nautilus)** to **Open With Boxxy**, and keep an eye on background shells from your panel with the [GNOME Shell & COSMIC companions](@/desktop-integrations.md).

