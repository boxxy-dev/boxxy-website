+++
title = "Characters"
template = "docs.html"
+++

# Characters

Instead of interacting with a faceless LLM, every =BoxxyClaw= character has a **personality, avatar, and color**. Characters are per-pane — you can run different characters in different splits, each with its own tone and expertise.

---

## The Default Characters

Boxxy ships with three bundled characters:

<div style="display: flex; gap: 1.25rem; flex-wrap: wrap; margin: 1.5rem 0;">

<div style="flex: 1; min-width: 200px; background: #1e1e2e; border: 2px solid #8035D4; border-radius: 12px; padding: 1.25rem; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 0.75rem;">
  <img src="https://raw.githubusercontent.com/boxxy-dev/boxxy/main/resources/characters/niko-una/AVATAR.png" style="width: 80px; height: 80px; border-radius: 50%; border: 2px solid #8035D4;" alt="Niko Una">
  <div>
    <div style="font-weight: 700; font-size: 1.1rem; color: #cdd6f4;">Niko Una</div>
    <div style="color: #8035D4; font-size: 0.8rem; font-weight: 600; margin-top: 2px;">Tsundere Maid of the Linux Desktop</div>
  </div>
  <p style="color: #a6adc8; font-size: 0.875rem; margin: 0;">Technically sharp but flustered by praise. Will absolutely help you — just don't expect a thank-you.</p>
</div>

<div style="flex: 1; min-width: 200px; background: #1e1e2e; border: 2px solid #204A87; border-radius: 12px; padding: 1.25rem; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 0.75rem;">
  <img src="https://raw.githubusercontent.com/boxxy-dev/boxxy/main/resources/characters/levi-kujo/AVATAR.png" style="width: 80px; height: 80px; border-radius: 50%; border: 2px solid #204A87;" alt="Levi Kujo">
  <div>
    <div style="font-weight: 700; font-size: 1.1rem; color: #cdd6f4;">Levi Kujo</div>
    <div style="color: #204A87; font-size: 0.8rem; font-weight: 600; margin-top: 2px;">Full-Metal Kernel Alchemist</div>
  </div>
  <p style="color: #a6adc8; font-size: 0.875rem; margin: 0;">No-nonsense and brutally direct. Values demonstrated expertise and has zero patience for cargo-cult practices.</p>
</div>

<div style="flex: 1; min-width: 200px; background: #1e1e2e; border: 2px solid #B31825; border-radius: 12px; padding: 1.25rem; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 0.75rem;">
  <img src="https://raw.githubusercontent.com/boxxy-dev/boxxy/main/resources/characters/kuro/AVATAR.png" style="width: 80px; height: 80px; border-radius: 50%; border: 2px solid #B31825;" alt="Kuro">
  <div>
    <div style="font-weight: 700; font-size: 1.1rem; color: #cdd6f4;">Kuro</div>
    <div style="color: #B31825; font-size: 0.8rem; font-weight: 600; margin-top: 2px;">Demonic Arch User, btw</div>
  </div>
  <p style="color: #a6adc8; font-size: 0.875rem; margin: 0;">Theatrical and sardonic. Celebrates every successful build as a minor dark victory, and will remind you to use the ArchWiki.</p>
</div>

</div>

---

## Changing a Character

1. Open the =Claw Message Bar= (`Ctrl+/`) on the target pane.
2. Type `@` to open the character picker.
3. Select a different character to reassign.

> The session restarts with the new personality. Your conversation history is preserved and rehydrated automatically.

---

## Creating Custom Characters

Characters are simple directories inside your Boxxy config folder:

```
~/.config/boxxy-terminal/boxxyclaw/characters/<slug>/
├── CHARACTER.toml
└── AVATAR.png        (optional — 256×256 PNG)
```

**CHARACTER.toml**

```toml
display_name = "My Custom Character"
color = "#7B61FF"
duties = "Expert in Python backend development and Docker orchestration."
personality = "Patient and thorough. Always explains the 'why' behind every suggestion."
```

| Field | Description |
| :--- | :--- |
| `display_name` | Name shown in the badge, sidebar, and swarm tools. |
| `color` | CSS hex color for the pane badge and UI accents. |
| `duties` | Short role description injected into the system prompt. |
| `personality` | Behavioral guidelines that shape how the character communicates. |

A stable UUID is auto-generated on first load. You can safely share character directories — Boxxy detects and resolves any ID collisions automatically.

### Hot Reload

You don't need to restart anything. The =boxxy-agent= daemon watches the characters directory for changes and picks up edits to `CHARACTER.toml` or `AVATAR.png` within seconds. Active sessions whose character's personality changed will apply the new prompt on the very next turn.

### Sorting

Create a `characters.json` in the characters directory to control the display order:

```json
["niko-una", "levi-kujo", "my-custom-character", "kuro"]
```

You can also drag and drop characters directly in =Preferences= to reorder them.

---

## Resetting to Defaults

Open =Preferences= (`Ctrl+,`), navigate to =Characters=, and click **Reset to Defaults**. This wipes all custom characters and re-extracts the three bundled defaults.
