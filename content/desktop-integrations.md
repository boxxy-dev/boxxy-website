+++
title = "Desktop Integrations"
template = "docs.html"
+++

# Desktop Integrations & Companion API

Boxxy Terminal exposes a reactive, zero-polling IPC interface over your user's **Session D-Bus**. Whether you are building a top-bar panel extension, a status bar module, or a quick-launcher plugin for =GNOME Shell=, =KDE Plasma=, =COSMIC=, =Waybar=, =Hyprland=, =Rofi=, or =Walker=, you can monitor `boxxy-agent`, restore detached background shells, inspect pending AI reminders, and focus or spawn characters in real time.

For a complete production reference implementation, check out the official [GNOME Shell Boxxy Companion Extension](https://github.com/boxxy-dev/gnome-shell-boxxy-companion).

---

## Bus & Service Details

All companion methods and push signals live on a single D-Bus object in `boxxy-agent`:

- **Bus:** Session Bus (`DBUS_SESSION_BUS_ADDRESS`)
- **Service Name (Stable):** `dev.boxxy.BoxxyAgent`
- **Service Name (`--dev` Mode):** `dev.boxxy.BoxxyAgent.Devel` (or `dev.boxxy.BoxxyAgent.Devel.i_<slug>` for named `--instance <slug>` runs)
- **Object Path:** `/dev/boxxy/Agent`
- **Interface:** `dev.boxxy.BoxxyTerminal.Agent`

*Note: Boxxy is written in Rust with `zbus`, which maps Rust `snake_case` method names to `PascalCase` on the D-Bus wire. Complex payloads use UTF-8 JSON strings (`s`) so status bar scripts (`jq`, Python, GJS, QML, Rust) can consume them without custom struct marshalling.*

### Best Practice: Watch Without Auto-Starting

Companion applets should observe `dev.boxxy.BoxxyAgent` name ownership (`NameOwnerChanged` / `Gio.bus_watch_name`) and pass `NO_AUTO_START` when calling methods so an idle status bar never spawns `boxxy-agent` on its own.

---

## 1. Daemon Status & Lifecycle API

| Method | Signature | Type | Description |
| :--- | :--- | :--- | :--- |
| `GetDaemonStatus` | `() -> (s)` | Method | Returns a JSON snapshot (`DaemonStatusSnapshot`) summarizing daemon version, power state, Dream Cycle status, and active session counts in a single call. |
| `GetVersion` | `() -> (s)` | Method | Returns the running daemon version string (appends `-stale` if the on-disk binary was upgraded since launch). |
| `GetConfigDir` | `() -> (s)` | Method | Returns the active configuration directory path (e.g. `~/.config/boxxy-terminal`). |
| `RequestReload` | `() -> ()` | Method | Flushes telemetry and reloads `boxxy-agent` in-place via `execvp()`, preserving PID and background shells. |
| `RequestStop` | `() -> ()` | Method | Gracefully terminates active sessions, flushes telemetry, and stops the daemon. |

### `GetDaemonStatus` JSON Schema

```json
{
  "bus_name": "dev.boxxy.BoxxyAgent",
  "version": "0.4.2+a1b2c3d",
  "is_stale_binary": false,
  "is_dev": false,
  "instance_slug": null,
  "is_ephemeral": false,
  "config_dir": "/home/me/.config/boxxy-terminal",
  "on_battery": false,
  "power_source": "AC",
  "dream_cycle": "paused_ui_attached",
  "is_ghost": false,
  "active_claw_panes": 2,
  "detached_shells": 1,
  "pending_tasks": 1
}
```

---

## 2. Character Roster, Focus & Spawning API

| Method / Signal | Signature | Type | Description |
| :--- | :--- | :--- | :--- |
| `GetRegistrySnapshot` | `() -> (s)` | Method | Returns a JSON `RegistrySnapshot` containing the full character `catalog`, active `claims`, and monotonic `revision`. |
| `RequestFocusPane` | `(s) -> ()` | Method | Accepts `pane_id`. Raises the Boxxy window and focuses that pane (or queues restoration if the pane is detached in the background). |
| `RequestSpawnCharacter` | `(s, s) -> ()` | Method | Accepts `(character, cwd)` where `character` is a UUID, slug (`niko-una`), or display name (`Niko`), and `cwd` is an optional working directory (`""` for default). If the character is already active, focuses its pane; otherwise opens a new Claw tab with that character claimed (queuing for startup if no Boxxy window is open). |
| `ClaimsChanged` | `(s)` | Signal | Broadcast whenever a character is claimed, released, or reloaded. Payload matches `GetRegistrySnapshot` JSON. |
| `SpawnCharacterRequested` | `(s, s)` | Signal | Emitted to open Boxxy UI windows (`(character_id, cwd)`) when `RequestSpawnCharacter` targets an available character while a window is attached. |

### `GetRegistrySnapshot` / `ClaimsChanged` JSON Schema

```json
{
  "catalog": [
    {
      "config": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "niko-una",
        "display_name": "Niko",
        "color": "#a855f7",
        "duties": "Systems & Rust engineering",
        "personality": "Curious, sharp, concise"
      },
      "status": {
        "Active": {
          "pane_id": "6f8a0c1e-3a4b-4d2a-9c1b-8e7f6a5b4c3d"
        }
      },
      "has_avatar": true
    },
    {
      "config": {
        "id": "8c1b2d3e-4f5a-6b7c-8d9e-0f1a2b3c4d5e",
        "name": "levi-kujo",
        "display_name": "Levi",
        "color": "#204a87",
        "duties": "Linux kernel & infrastructure",
        "personality": "Direct and methodical"
      },
      "status": "Available",
      "has_avatar": true
    }
  ],
  "claims": [
    {
      "holder_id": "6f8a0c1e-3a4b-4d2a-9c1b-8e7f6a5b4c3d",
      "holder_kind": "Pane",
      "character_id": "550e8400-e29b-41d4-a716-446655440000",
      "session_id": "9a8b7c6d-5e4f-3a2b-1c0d-e9f8a7b6c5d4",
      "petname": "crimson-falcon",
      "owner_bus_name": ":1.142"
    }
  ],
  "revision": 7
}
```

- **Avatar Resolution:** When `has_avatar` is `true`, the character's avatar image is located at `<config_dir>/boxxyclaw/characters/<config.name>/AVATAR.png`.
- **Cold-Window Launch Flow:** When calling `RequestFocusPane`, `RequestSpawnCharacter`, or `RequestRestoreDetached` while no Boxxy UI window is open (`is_ghost == true`), `boxxy-agent` queues the action in memory. Immediately launch `boxxy-terminal --present` afterward—the newly opened window automatically drains the pending queue on startup.

---

## 3. Detached Background Shells API

When a user closes a Boxxy tab or window while a foreground command (`cargo build`, `nvim`, `top`, `pacman -Syu`, or a background AI session) is running, `boxxy-agent` keeps the PTY alive in a 4 MB ring buffer so any companion applet can restore or terminate it.

| Method / Signal | Signature | Type | Description |
| :--- | :--- | :--- | :--- |
| `GetDetachedSessions` | `() -> (s)` | Method | Returns a JSON array of `DetachedSessionInfo` objects for all background shells hosted by `boxxy-agent`. |
| `RequestRestoreDetached` | `(u) -> ()` | Method | Accepts `pid` (`u32`, or `0` to restore **all** detached shells preserving split layouts). Restores immediately into an open Boxxy window or queues for `boxxy-terminal --present`. |
| `TerminateDetachedSession` | `(u) -> ()` | Method | Accepts `pid` (`u32`, or `0` to terminate **all** detached shells). Disables persistence and sends `SIGTERM` to the background process group. |
| `DetachedSessionsChanged` | `(s)` | Signal | Broadcast whenever a shell detaches, reattaches, is terminated, or exits. Payload matches `GetDetachedSessions`. |
| `RestoreDetachedRequested` | `(u, s)` | Signal | Internal UI signal (`(pid, cwd)`) emitted to attached Boxxy windows when `RequestRestoreDetached` is called. |

### `GetDetachedSessions` / `DetachedSessionsChanged` JSON Schema

```json
[
  {
    "pid": 121283,
    "pane_id": "6f8a0c1e-3a4b-4d2a-9c1b-8e7f6a5b4c3d",
    "idle_secs": 6,
    "cwd": "/home/me/Projects/boxxy-dev/boxxy-terminal",
    "foreground_process": "cachy-update",
    "waiting_for_input": true,
    "character_id": "",
    "character_name": "",
    "character_slug": "",
    "session_id": "",
    "pending_task_count": 0
  }
]
```

- `waiting_for_input`: `true` when Linux `/proc/<fg_pid>/wchan` indicates the foreground child process is blocked on interactive TTY input (`n_tty_read` / `tty_read`, such as a `[Y/n]` or `sudo` password prompt)—ideal for highlighting your panel badge in warning amber.

---

## 4. Pending Reminders & Scheduled Tasks API

Characters in =BoxxyClaw= can schedule timers, interval laps, background commands, and deferred AI queries. Companions can display live countdowns and cancel or jump to any scheduled task.

| Method / Signal | Signature | Type | Description |
| :--- | :--- | :--- | :--- |
| `GetPendingTasks` | `() -> (s)` | Method | Returns a JSON array of `PendingTaskInfo` sorted by `due_at_unix`. |
| `CancelPendingTask` | `(s, s) -> ()` | Method | Accepts `(pane_id, task_id)` and cancels the scheduled task. |
| `PendingTasksChanged` | `(s)` | Signal | Broadcast whenever a task is scheduled, completed, cancelled, or detached/reattached. Payload matches `GetPendingTasks`. |

### `GetPendingTasks` / `PendingTasksChanged` JSON Schema

```json
[
  {
    "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
    "pane_id": "6f8a0c1e-3a4b-4d2a-9c1b-8e7f6a5b4c3d",
    "session_id": "9a8b7c6d-5e4f-3a2b-1c0d-e9f8a7b6c5d4",
    "character_id": "550e8400-e29b-41d4-a716-446655440000",
    "character_name": "Niko",
    "character_slug": "niko-una",
    "task_type": "Notification",
    "payload": "Check deployment logs",
    "due_at_unix": 1763308800,
    "remaining_secs": 185,
    "is_detached": false,
    "pid": 124910
  }
]
```

- `task_type`: `"Notification"` (reminder), `"Command"`, or `"Query"`.
- If `is_detached` is `true` and `pid` is non-null, call `RequestRestoreDetached(pid)` to bring the backgrounded agent session back into a live tab; otherwise call `RequestFocusPane(pane_id)`.

---

## Quick CLI & Status Bar Examples

### `busctl` (CLI Inspection & Scripting)

```bash
# 1. Single-call daemon status summary (pipe to jq!)
busctl --user -j call dev.boxxy.BoxxyAgent /dev/boxxy/Agent \
  dev.boxxy.BoxxyTerminal.Agent GetDaemonStatus | jq -r '.data[0] | fromjson'

# 2. Inspect character catalog and active pane claims
busctl --user -j call dev.boxxy.BoxxyAgent /dev/boxxy/Agent \
  dev.boxxy.BoxxyTerminal.Agent GetRegistrySnapshot | jq -r '.data[0] | fromjson'

# 3. Focus or spawn a character by slug (then raise/launch Boxxy Terminal)
busctl --user call dev.boxxy.BoxxyAgent /dev/boxxy/Agent \
  dev.boxxy.BoxxyTerminal.Agent RequestSpawnCharacter ss "niko-una" ""
boxxy-terminal --present

# 4. Restore all detached background shells
busctl --user call dev.boxxy.BoxxyAgent /dev/boxxy/Agent \
  dev.boxxy.BoxxyTerminal.Agent RequestRestoreDetached u 0
boxxy-terminal --present

# 5. Stop a running `--dev` agent instance cleanly over D-Bus
busctl --user call dev.boxxy.BoxxyAgent.Devel /dev/boxxy/Agent \
  dev.boxxy.BoxxyTerminal.Agent RequestStop
```

### Minimal Waybar Custom Module

```json
"custom/boxxy": {
  "exec": "busctl --user -j call dev.boxxy.BoxxyAgent /dev/boxxy/Agent dev.boxxy.BoxxyTerminal.Agent GetDaemonStatus 2>/dev/null | jq -rc '.data[0] | fromjson | {text: (\"boxxy \" + ((.detached_shells + .pending_tasks) | tostring)), tooltip: (\"Boxxy v\" + .version + \" (\" + .power_source + \")\")}'",
  "return-type": "json",
  "interval": 5,
  "on-click": "boxxy-terminal --present"
}
```
