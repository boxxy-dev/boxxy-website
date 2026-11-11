+++
title = "Development"
template = "docs.html"
+++

# Development

Boxxy is largely developed using =AI Agents=. The most efficient way to start contributing to Boxxy is to clone the repository and ask your preferred agent to read the `AGENTS.md` file to familiarize itself with the project's architecture and conventions.

---

## Workflow & Committing

Boxxy is in a high-velocity development phase. Once a task or feature is finalized and verified with unit tests and `scenario-runner`, changes are merged into the =main= branch with clear, user-readable commit summaries.

---

## Contributing

We welcome contributions! For the best results, check the root `AGENTS.md` and crate-level `AGENTS.md` files before opening an issue or pull request so your changes match Boxxy's modular crate boundaries.

---

## Requirements, Building & Testing

Boxxy is built with =Rust 2024 (v1.98+)= and requires =GTK 4.24+= and =Libadwaita 1.10+=. For standard development and local testing, use =Cargo= directly:

```bash
cargo build -p boxxy-agent -p boxxy-app
cargo test
```

Please note that a standard Cargo build runs natively on your host; if you are working on sandbox-specific features, test inside a =Flatpak= build as well.

### Building the Flatpak

To build and test the =Flatpak= bundle locally, follow these steps:

1. **Generate Sources:**
   ```bash
   python3 flatpak/flatpak-cargo-generator.py Cargo.lock -o flatpak/cargo-sources.json
   ```

2. **Build & Export Bundle:**
   ```bash
   flatpak-builder --repo=repo --force-clean build-dir flatpak/dev.boxxy.BoxxyTerminal.yml
   flatpak build-bundle repo boxxy.flatpak dev.boxxy.BoxxyTerminal
   ```

**Alternative:** To build and install the Flatpak to your user environment in a single command:
```bash
flatpak-builder --user --install --force-clean build-dir flatpak/dev.boxxy.BoxxyTerminal.yml
```

---

## Developing Boxxy Inside Boxxy (`--dev` Mode)

You can use your daily =Stable Boxxy= installation to develop, run, and test source builds of Boxxy side-by-side without colliding on GTK or D-Bus singletons.

Passing `--dev` (or setting `BOXXY_DEV=1`) launches an isolated host daemon (`dev.boxxy.BoxxyAgent.Devel`) and client window (`dev.boxxy.BoxxyTerminal.Devel`), marked with a warning-colored `[dev]` badge in the headerbar while disabling self-updates and telemetry.

### Two-Pane Split Workflow

Open two split panes inside Stable Boxxy and use the workspace Cargo aliases:

```bash
# Pane 1 — Run the isolated dev daemon in the foreground
BOXXY_DEBUG_CONTEXT=1 cargo dev-agent

# Pane 2 — Launch the isolated dev client window
cargo dev-app
```

### Configuration & Profile Modes

- **Seeded Dev Profile (Default — `--dev`):** Uses `~/.config/boxxy-terminal-dev/`. On first launch, it automatically copies your `settings.json`, API keys, themes, profile avatar, bookmarks, characters, and skills from `~/.config/boxxy-terminal/` while keeping a separate SQLite database (`boxxy.db`) so schema changes never affect Stable. To pull updated settings from Stable later, run:
  ```bash
  cargo dev-sync
  ```
- **Clean Factory Defaults (`--ephemeral`):** Starts with a fresh, lock-coordinated temporary directory (`$XDG_RUNTIME_DIR/boxxy-terminal-ephemeral-dev`) to test default settings and first-run behavior:
  ```bash
  # Optional Pane 1 (foreground logs): BOXXY_DEBUG_CONTEXT=1 cargo dev-agent-ephemeral
  cargo dev-ephemeral
  ```
- **Named Parallel Instances (`--instance <slug>` / `BOXXY_INSTANCE=<slug>`):** Spawns completely separate D-Bus/GTK namespaces (`[dev:<slug>]`) when testing multiple branches or Git worktrees simultaneously.

---

## Context Debugging

One of the most useful things to inspect during AI development is the exact context Boxxy sends to the model. Since prompt assembly runs inside `boxxy-agent`, enable high-signal context logging on the daemon with:

```bash
BOXXY_DEBUG_CONTEXT=1 cargo dev-agent
```

(This works in both debug and release builds and remains completely silent unless `BOXXY_DEBUG_CONTEXT=1` is set.)

---

## Packaging for Linux Distributions

If you are packaging Boxxy for a system package manager (Nix, Arch AUR, Debian, Fedora, etc.), you **must** disable the built-in self-updater. When distributed through a package manager, updates are the package manager's responsibility — the in-app updater should never run.

Build with the `disable-self-update` Cargo feature:

```bash
cargo build --release --features disable-self-update
```

This compiles `boxxy-app` → `boxxy-window` with the feature propagated through the crate hierarchy. The resulting binary will never attempt to update itself, regardless of the environment it runs in.

The self-update UI and version-check network requests are fully compiled out, so there are no runtime flags or config files to manage — the package build alone is sufficient.
