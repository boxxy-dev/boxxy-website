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

Boxxy is built with =Rust 2024 (v1.98+)= and requires =GTK 4.24+= and =Libadwaita 1.9+=. For standard development and local testing, use =Cargo= directly:

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

## Context Debugging

One of the most useful things to inspect during AI development is the exact context Boxxy sends to the model. Enable high-signal context logging with:

```bash
BOXXY_DEBUG_CONTEXT=1 cargo run
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
