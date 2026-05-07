+++
title = "Development"
template = "docs.html"
+++

# Development

Boxxy is largely developed using =AI Agents=. The most efficient way to start contributing to Boxxy is to clone the repository and ask your preferred agent to read the `AGENTS.md` file to familiarize itself with the project's architecture and conventions.

---

## Workflow & Committing

Boxxy is currently in an early, high-velocity development phase. To maintain maximum speed, we utilize a private =dev= branch for active development. 

Once a major task or feature is finalized, we squash all related commits into a single =consolidated commit= before merging into the =main= branch. While this results in larger individual commits, the logic remains easy to parse and understand when analyzed by an =Agent=.

---

## Contributing

We welcome code contributions! However, due to the rapid pace of downstream development, traditional PRs can be difficult to merge if they fall out of sync. 

For the best results, we prefer =agentic-style= contributions: clear prompts accompanied by code examples or detailed implementation strategies that our internal agents can help integrate seamlessly.

---

## Building & Testing

Boxxy is built with =Rust 1.94=. For standard development and local testing, you can use =Cargo= directly:

```bash
cargo build -p boxxy-agent -p boxxy-terminal
```

Please note that a successful Cargo build does not always guarantee identical behavior within a =Flatpak= environment, especially for components involving `boxxy-agent`.

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

## Context

One of the most important things to monitor is the exact context Boxxy sends to the model. You can inspect this by enabling context logging:

```bash
BOXXY_DEBUG_CONTEXT=1 cargo run -p boxxy-agent
```

(This works in both debug and release builds, but will remain completely silent unless the variable is set to 1.)

---

## Packaging for Linux Distributions

If you are packaging Boxxy for a system package manager (Nix, Arch AUR, Debian, Fedora, etc.), you **must** disable the built-in self-updater. When distributed through a package manager, updates are the package manager's responsibility — the in-app updater should never run.

Build with the `disable-self-update` Cargo feature:

```bash
cargo build --release --features disable-self-update
```

This compiles `boxxy-app` → `boxxy-window` → `boxxy-ai-core` with the feature propagated through the entire crate hierarchy. The resulting binary will never attempt to update itself, regardless of the environment it runs in.

The self-update UI and version-check network requests are fully compiled out, so there are no runtime flags or config files to manage — the package build alone is sufficient.
