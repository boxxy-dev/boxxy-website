+++
title = "Boxxy Theme API"
template = "theme_api.html"
+++

# Boxxy Theme Engine & API

Boxxy separates **Terminal Palettes** (the 16 ANSI colors inside your shell grid) from **Application Chrome Themes** (tabs, sidebars, menus, dialogs, and the Claw drawer). Every Boxxy theme pairs crisp 2px ink borders with a **3-color identity triad** — **`accent`** (primary selection & active controls), **`secondary`** (tags, metadata pills, and `@file` mentions), and **`highlight`** (discovery badges, search matches, and `:character` mentions) — using perceptual **OKLCH** lightness clamping so text stays readable on every surface.

Even if you prefer **Legacy Adwaita** (`System Follow`, `System Dark`, `System Light`), Boxxy brings the same `secondary` (Iris Lavender) and `highlight` (Solar Amber / Tangerine) colors to Adwaita while keeping primary accents synced with your desktop's live system accent color.

Try the **Live Theme & Accent Playground** below to switch themes or test custom accent colors in real time.

<div id="bx-theme-scope" class="bx-theme-root">

<div class="bx-playground-toolbar">
  <div class="bx-playground-group">
    <span class="bx-playground-label">Theme Preset:</span>
    <button type="button" class="bx-preset-chip is-active" onclick="bxSetTheme('boxxy-dark', this)">Boxxy Dark</button>
    <button type="button" class="bx-preset-chip" onclick="bxSetTheme('boxxy-light', this)">Boxxy Light</button>
    <button type="button" class="bx-preset-chip" onclick="bxSetTheme('cotton-candy', this)">Cotton Candy</button>
    <button type="button" class="bx-preset-chip" onclick="bxSetTheme('bauhaus', this)">Bauhaus</button>
  </div>
  <div class="bx-playground-group">
    <span class="bx-playground-label">Accent Override:</span>
    <button type="button" class="bx-accent-swatch" style="background:#7ec868" title="Peanut Green (#7ec868)" onclick="bxSetAccent('#7ec868','#0d140a',this)"></button>
    <button type="button" class="bx-accent-swatch" style="background:#00acc1" title="Boxxy Cyan (#00acc1)" onclick="bxSetAccent('#00acc1','#0d1117',this)"></button>
    <button type="button" class="bx-accent-swatch" style="background:#e87a64" title="Ember Coral (#e87a64)" onclick="bxSetAccent('#e87a64','#111418',this)"></button>
    <button type="button" class="bx-accent-swatch" style="background:#a78bfa" title="Aurora Violet (#a78bfa)" onclick="bxSetAccent('#a78bfa','#111418',this)"></button>
    <button type="button" class="bx-accent-swatch" style="background:#ff7eb6" title="Bubblegum Pink (#ff7eb6)" onclick="bxSetAccent('#ff7eb6','#111418',this)"></button>
    <button type="button" class="bx-accent-swatch" style="background:#f59e0b" title="Solar Amber (#f59e0b)" onclick="bxSetAccent('#f59e0b','#111418',this)"></button>
  </div>
</div>

---

## Live Widget Gallery

### 1. HeaderBar, Terminal Tabs & Unified Window Controls

The main window headerbar (`.content-header`) places the tab bar and new-tab button (`+`) between the Sidebar Toggle on the left and the Background Shells pill and Window Controls on the right.

- **Flush Terminal Tabs:** Selected tabs fill with `@accent_bg_color` inside a 2px `@boxxy_ink` border with `box-shadow: none`, keeping the compact tab strip crisp without clipping.
- **Matching Square Header Buttons:** Sidebar toggle and window control buttons share one unified square button size across the headerbar and dialogs.

<div class="bx-widget-stage">
  <div class="bx-widget-caption">
    <span>.content-header + tabbar tab + windowcontrols &gt; button</span>
    <span>Click tabs or buttons to test active states</span>
  </div>
  <div class="bx-demo-headerbar">
    <div class="bx-demo-header-side">
      <button type="button" class="bx-demo-icon-btn" title="Toggle Sidebar"><span class="bx-icon" style="--icon: url('/icons/dock-left.svg')"></span></button>
    </div>
    <div class="bx-demo-tabbar">
      <div class="bx-demo-tab is-selected" onclick="bxSelectTab(this)">
        <span>boxxy-terminal</span>
        <span class="bx-demo-tab-close"><span class="bx-icon" style="--icon: url('/icons/cross-small.svg'); width: 13px; height: 13px;"></span></span>
      </div>
      <div class="bx-demo-tab" onclick="bxSelectTab(this)">
        <span>nvim · themes</span>
        <span class="bx-demo-tab-close"><span class="bx-icon" style="--icon: url('/icons/cross-small.svg'); width: 13px; height: 13px;"></span></span>
      </div>
      <div class="bx-demo-tab" onclick="bxSelectTab(this)">
        <span>cargo test</span>
        <span class="bx-demo-tab-close"><span class="bx-icon" style="--icon: url('/icons/cross-small.svg'); width: 13px; height: 13px;"></span></span>
      </div>
      <button type="button" class="bx-demo-new-tab-btn" title="New Tab"><span class="bx-icon" style="--icon: url('/icons/plus.svg'); width: 14px; height: 14px;"></span></button>
    </div>
    <div class="bx-demo-header-side">
      <span class="bx-demo-detached-pill" title="Background Shells (.detached-shells-pill)">&gt;_ 1</span>
      <button type="button" class="bx-demo-icon-btn" title="Close (windowcontrols > button)"><span class="bx-icon" style="--icon: url('/icons/window-close.svg'); width: 14px; height: 14px;"></span></button>
    </div>
  </div>
</div>

### 2. Sidebar ViewSwitcher & Navigation Capsule Pills

Unlike terminal tabs, the sidebar header switcher buttons (`viewswitcher > button`) and selected sidebar rows (`.navigation-sidebar > row:selected`) float on `@sidebar_bg_color` and cast tactile `2px 3px 0px @boxxy_shadow` offset drop-shadows.

<div class="bx-widget-stage">
  <div class="bx-widget-caption">
    <span>viewswitcher &gt; button + .navigation-sidebar &gt; row</span>
    <span>Click switcher buttons or list rows</span>
  </div>
  <div class="bx-demo-sidebar">
    <div class="bx-demo-viewswitcher">
      <div class="bx-demo-switcher-btn is-checked" onclick="bxSelectSibling(this, 'is-checked')">
        <span class="bx-icon" style="--icon: url('/icons/boxxyclaw.svg')"></span>
        <span>Claw</span>
      </div>
      <div class="bx-demo-switcher-btn" onclick="bxSelectSibling(this, 'is-checked')">
        <span class="bx-icon" style="--icon: url('/icons/bookmark.svg')"></span>
        <span>Bookmarks</span>
      </div>
      <div class="bx-demo-switcher-btn" onclick="bxSelectSibling(this, 'is-checked')">
        <span class="bx-icon" style="--icon: url('/icons/appearance.svg')"></span>
        <span>Colors</span>
      </div>
    </div>
    <div class="bx-demo-nav-list">
      <div class="bx-demo-nav-row is-selected" onclick="bxSelectSibling(this, 'is-selected')">
        <span>Polishing Boxxy Theme Engine</span>
        <span style="font-size:0.74rem;opacity:0.8">Niko · 2m</span>
      </div>
      <div class="bx-demo-nav-row" onclick="bxSelectSibling(this, 'is-selected')">
        <span>Trending GitHub CLI Apps</span>
        <span style="font-size:0.74rem;opacity:0.65">Niko · 1h</span>
      </div>
      <div class="bx-demo-nav-row" onclick="bxSelectSibling(this, 'is-selected')">
        <span>Workspace Refactoring Plan</span>
        <span style="font-size:0.74rem;opacity:0.65">Levi · 4h</span>
      </div>
    </div>
  </div>
</div>

### 3. Tactile Buttons, Identity Triad Badges & Flat Utility Controls

Raised buttons (`.suggested-action`, `.secondary-action`, `.destructive-action`) and dialog footer `.pill` CTAs cast crisp offset `@boxxy_shadow` drop-shadows and physically press down by `1px` when clicked. Quiet `.flat` utility buttons stay transparent at rest and reveal a clean recessed cutout on hover.

<div class="bx-widget-stage">
  <div class="bx-widget-caption">
    <span>accent (.suggested-action) · secondary (.secondary-action) · highlight (.whats-new-badge &amp; live lap) · button.flat cutout</span>
    <span>Switch theme presets above to see all 3 color roles update live</span>
  </div>
  <div class="bx-demo-btn-row">
    <button type="button" class="bx-demo-btn">Standard Button</button>
    <button type="button" class="bx-demo-btn is-suggested">Accept &amp; Run (.suggested-action)</button>
    <button type="button" class="bx-demo-btn is-secondary">Okay (.secondary-action)</button>
    <button type="button" class="bx-demo-btn is-destructive">Reject (.destructive-action)</button>
    <button type="button" class="bx-demo-btn is-suggested is-pill">Read What's New (.pill)</button>
    <button type="button" class="bx-demo-btn is-flat"><span class="bx-icon" style="--icon: url('/icons/copy.svg'); width: 14px; height: 14px;"></span> Ask Another AI (button.flat)</button>
    <span class="bx-demo-highlight-badge"><span class="bx-icon" style="--icon: url('/icons/fresh-update.svg'); width: 13px; height: 13px;"></span> FRESH UPDATE</span>
  </div>
  <div class="bx-demo-round-strip">
    <div class="bx-demo-round-top">
      <span style="font-weight:700;font-size:0.86rem;display:inline-flex;align-items:center;gap:6px;"><span class="bx-icon" style="--icon: url('/icons/bell.svg'); width: 14px; height: 14px;"></span> Boxing</span>
      <span class="bx-demo-lap-pill">● LAP 2/6</span>
    </div>
    <div class="bx-demo-round-top">
      <div class="bx-demo-pips" title="Done = accent, Active = highlight, Upcoming = window_bg">
        <span class="bx-demo-pip is-done"></span>
        <span class="bx-demo-pip is-active"></span>
        <span class="bx-demo-pip"></span>
        <span class="bx-demo-pip"></span>
        <span class="bx-demo-pip"></span>
        <span class="bx-demo-pip"></span>
      </div>
      <span style="font-size:0.78rem;font-weight:800;color:var(--accent-bg)">00:19 left</span>
    </div>
  </div>
</div>

### 4. Terminal Context Menu (`popover.terminal-menu`)

The terminal context menu (`popover.terminal-menu > contents`) uses `@popover_bg_color`, which matches `@sidebar_bg_color` (`#2e2e32` in `Boxxy Dark`), while inner linked button strips (`popover.menu box.linked`) use `@card_bg_color` (`#26262a`) for crisp contrast. Both text items (`modelbutton`) and segmented buttons (`box.linked > button.model`) share the exact `min-height: 24px; padding: 5px 10px;` geometry.

<div class="bx-widget-stage">
  <div class="bx-widget-caption">
    <span>popover.terminal-menu &gt; contents (@popover_bg_color == @sidebar_bg_color)</span>
    <span>Hover menu rows and segmented buttons</span>
  </div>
  <div class="bx-demo-popover">
    <div class="bx-demo-linked-strip">
      <button type="button" class="bx-demo-linked-btn">Copy</button>
      <button type="button" class="bx-demo-linked-btn">Copy Link</button>
    </div>
    <div class="bx-demo-modelbutton">Paste</div>
    <div class="bx-demo-modelbutton">Select All</div>
    <div class="bx-demo-modelbutton">Reset</div>
    <div class="bx-demo-linked-strip">
      <button type="button" class="bx-demo-linked-btn" title="Split Vertical"><span class="bx-icon" style="--icon: url('/icons/split-vertical.svg')"></span></button>
      <button type="button" class="bx-demo-linked-btn" title="Split Horizontal"><span class="bx-icon" style="--icon: url('/icons/split-horizontal.svg')"></span></button>
      <button type="button" class="bx-demo-linked-btn" title="Maximize Pane"><span class="bx-icon" style="--icon: url('/icons/split-maximize.svg')"></span></button>
      <button type="button" class="bx-demo-linked-btn" title="Close Pane"><span class="bx-icon" style="--icon: url('/icons/split-close.svg')"></span></button>
    </div>
    <div class="bx-demo-modelbutton">Open in Files</div>
    <div class="bx-demo-modelbutton is-hovered">Command Palette</div>
    <div class="bx-demo-modelbutton">Preferences</div>
  </div>
</div>

### 5. Preference Rows & Boxed Lists (`.boxed-list`, `.boxed-list-separate`)

Preference cards sit on `@card_bg_color` with `8px` corners, a `2px solid @boxxy_ink` frame, and crisp ink row dividers. Hovering an activatable row recesses it into `@window_bg_color`, while theme tag pills use `@boxxy_secondary_bg_color` alongside the 4 signature theme preview dots (`[window_bg, accent, secondary, highlight]`).

<div class="bx-widget-stage">
  <div class="bx-widget-caption">
    <span>.boxed-list (border-radius: 8px; border: 2px solid @boxxy_ink) + ActionRow + SwitchRow</span>
    <span>Hover rows to see the recessed @window_bg_color cutout</span>
  </div>
  <div class="bx-demo-boxed-list">
    <div class="bx-demo-action-row">
      <div class="bx-demo-row-titles">
        <span class="bx-demo-row-title">Boxxy Dark</span>
        <span class="bx-demo-row-subtitle">Carbon dark surfaces with peanut green accents, sky cyan tags, and warm solar highlights.</span>
      </div>
      <div class="bx-demo-row-suffix">
        <span class="bx-demo-tag-pill">dark</span>
        <span class="bx-demo-tag-pill">default</span>
        <span class="bx-demo-dot" style="background:#1d1d20" title="window_bg"></span>
        <span class="bx-demo-dot" style="background:#7ec868" title="accent"></span>
        <span class="bx-demo-dot" style="background:#7dc4e4" title="secondary"></span>
        <span class="bx-demo-dot" style="background:#f5b971" title="highlight"></span>
        <span style="font-weight:900;margin-left:4px">✓</span>
      </div>
    </div>
    <div class="bx-demo-action-row">
      <div class="bx-demo-row-titles">
        <span class="bx-demo-row-title">Smart Tab Naming</span>
        <span class="bx-demo-row-subtitle">Automatically show active command or directory in tab titles</span>
      </div>
      <div class="bx-demo-row-suffix">
        <div class="bx-demo-switch is-checked" onclick="this.classList.toggle('is-checked')">
          <div class="bx-demo-switch-knob"></div>
        </div>
      </div>
    </div>
    <div class="bx-demo-action-row">
      <div class="bx-demo-row-titles">
        <span class="bx-demo-row-title">Open Themes Folder</span>
        <span class="bx-demo-row-subtitle">Add or edit .toml community themes in your file manager</span>
      </div>
      <div class="bx-demo-row-suffix">
        <span style="font-size:1.05rem">📂</span>
      </div>
    </div>
  </div>
</div>

### 6. Search Entries & Claw MsgBar (`searchentry`, `.boxxy-msgbar`)

Input fields and the Claw message bar rest on `@card_bg_color` with a `2px solid @boxxy_ink` outline that highlights with `@accent_color` on focus, while `@file` attachments and `:character` mentions pick up contrast-clamped `secondary` and `highlight` colors.

<div class="bx-widget-stage">
  <div class="bx-widget-caption">
    <span>searchentry / .claw-drawer .boxxy-msgbar (:focus-within -&gt; @accent_color)</span>
    <span>Click inside the input to see the focus outline</span>
  </div>
  <div class="bx-demo-entry">
    <span style="font-weight:800;opacity:0.75">＋</span>
    <input type="text" value="Ask Niko, attach @crates/themes/src/app_theme/mod.rs, or invite :levi..." aria-label="Demo MsgBar Input" />
  </div>
</div>

</div>

<script>
const BX_THEMES = {
  'boxxy-dark': {
    '--window-bg': '#1d1d20', '--window-fg': '#f2f4f2',
    '--sidebar-bg': '#2e2e32', '--sidebar-fg': '#f2f4f2',
    '--card-bg': '#26262a', '--card-fg': '#f2f4f2',
    '--headerbar-bg': '#1d1d20', '--headerbar-fg': '#f2f4f2',
    '--popover-bg': '#2e2e32', '--popover-fg': '#f2f4f2',
    '--accent-bg': '#7ec868', '--accent-fg': '#0d140a',
    '--secondary-bg': '#7dc4e4', '--secondary-fg': '#0b1620',
    '--highlight-bg': '#f5b971', '--highlight-fg': '#201407',
    '--boxxy-ink': '#050505', '--boxxy-shadow': '#050505',
    '--destructive-bg': '#c01c28', '--destructive-fg': '#ffffff'
  },
  'boxxy-light': {
    '--window-bg': '#ecfafb', '--window-fg': '#111418',
    '--sidebar-bg': '#ffffff', '--sidebar-fg': '#111418',
    '--card-bg': '#ffffff', '--card-fg': '#111418',
    '--headerbar-bg': '#ffffff', '--headerbar-fg': '#111418',
    '--popover-bg': '#ffffff', '--popover-fg': '#111418',
    '--accent-bg': '#00acc1', '--accent-fg': '#0d1117',
    '--secondary-bg': '#a594f9', '--secondary-fg': '#111418',
    '--highlight-bg': '#ff9f43', '--highlight-fg': '#111418',
    '--boxxy-ink': '#111418', '--boxxy-shadow': '#111418',
    '--destructive-bg': '#e01b24', '--destructive-fg': '#ffffff'
  },
  'cotton-candy': {
    '--window-bg': '#fff5f8', '--window-fg': '#1e1b24',
    '--sidebar-bg': '#fce8ef', '--sidebar-fg': '#1e1b24',
    '--card-bg': '#ffffff', '--card-fg': '#1e1b24',
    '--headerbar-bg': '#fce8ef', '--headerbar-fg': '#1e1b24',
    '--popover-bg': '#fce8ef', '--popover-fg': '#1e1b24',
    '--accent-bg': '#ff7eb6', '--accent-fg': '#1e1b24',
    '--secondary-bg': '#7cc6fe', '--secondary-fg': '#1e1b24',
    '--highlight-bg': '#ffe066', '--highlight-fg': '#1e1b24',
    '--boxxy-ink': '#1e1b24', '--boxxy-shadow': '#1e1b24',
    '--destructive-bg': '#e01b24', '--destructive-fg': '#ffffff'
  },
  'bauhaus': {
    '--window-bg': '#f7f3e8', '--window-fg': '#141413',
    '--sidebar-bg': '#ede6d3', '--sidebar-fg': '#141413',
    '--card-bg': '#fffdf7', '--card-fg': '#141413',
    '--headerbar-bg': '#ede6d3', '--headerbar-fg': '#141413',
    '--popover-bg': '#ede6d3', '--popover-fg': '#141413',
    '--accent-bg': '#e63946', '--accent-fg': '#ffffff',
    '--secondary-bg': '#1d4ed8', '--secondary-fg': '#ffffff',
    '--highlight-bg': '#f4b400', '--highlight-fg': '#141413',
    '--boxxy-ink': '#141413', '--boxxy-shadow': '#141413',
    '--destructive-bg': '#e01b24', '--destructive-fg': '#ffffff'
  }
};

function bxSetTheme(id, btn) {
  const scope = document.getElementById('bx-theme-scope');
  const vars = BX_THEMES[id];
  if (!scope || !vars) return;
  Object.entries(vars).forEach(([k, v]) => scope.style.setProperty(k, v));
  document.querySelectorAll('.bx-preset-chip').forEach(el => el.classList.remove('is-active'));
  document.querySelectorAll('.bx-accent-swatch').forEach(el => el.classList.remove('is-active'));
  if (btn) btn.classList.add('is-active');
}

function bxSetAccent(hex, fg, btn) {
  const scope = document.getElementById('bx-theme-scope');
  if (!scope) return;
  scope.style.setProperty('--accent-bg', hex);
  scope.style.setProperty('--accent-fg', fg);
  document.querySelectorAll('.bx-accent-swatch').forEach(el => el.classList.remove('is-active'));
  if (btn) btn.classList.add('is-active');
}

function bxSelectTab(el) {
  el.parentElement.querySelectorAll('.bx-demo-tab').forEach(t => t.classList.remove('is-selected'));
  el.classList.add('is-selected');
}

function bxSelectSibling(el, cls) {
  Array.from(el.parentElement.children).forEach(c => c.classList.remove(cls));
  el.classList.add(cls);
}
</script>

---

## The 4-Layer GTK CssProvider Cascade

Boxxy styles application chrome using four prioritized GTK 4 CssProvider layers so custom themes can be toggled or hot-reloaded at runtime without restarting the application:

| Layer | GTK Priority | Source | Lifecycle | Responsibility |
| :--- | :--- | :--- | :--- | :--- |
| **Layer 1 (Base)** | 600 (PRIORITY_APPLICATION) | `resources/style.css` | Always loaded | Base widget geometry, spacing, layout rules, and static fallback `@define-color` tokens. |
| **Layer 1b (Palette)** | 610 (PRIORITY_APPLICATION + 10) | `build.rs` (`generate_gtk_css`) | Loaded when a terminal palette is selected | Terminal-coupled `.terminal-header` and `.claw-drawer` colors when running in Legacy Adwaita mode. |
| **Layer 2 (Skeleton)** | 800 (PRIORITY_USER) | `resources/themes/boxxy_skeleton.css` | Loaded only in Boxxy Theme mode | Playful neo-brutalist outlines (`@boxxy_ink`), tactile offset drop-shadows (`@boxxy_shadow`), capsule navigation pills, and active button press states. |
| **Layer 3 (Theme Tokens)** | 810 (PRIORITY_USER + 10) | `to_gtk_css()` / `generate_adwaita_tokens_css()` | Always loaded | Defines full theme tokens in Boxxy Theme mode, and supplies `secondary` (`#a594f9`) &amp; `highlight` (`#f5b971` / `#ff9f43`) in Legacy Adwaita while leaving `@accent_*` synced with your OS accent color. |
| **Layer 4 (Accent Override)** | 820 (PRIORITY_USER + 20) | `generate_accent_override_css()` | Loaded when a custom accent is set in Boxxy mode | Overrides `@accent_color`, `@accent_bg_color`, and auto-contrasted `@accent_fg_color` independently of `secondary` and `highlight`. |

---

## Official Built-in Palettes (`Boxxy Dark` & `Boxxy Light`)

| Token (`AppThemeColors`) | `Boxxy Dark` (`boxxy-dark`) | `Boxxy Light` (`boxxy-light`) | Surface Role |
| :--- | :--- | :--- | :--- |
| <span class="bx-var-name">window_bg</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#1d1d20"></span>#1d1d20</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#ecfafb"></span>#ecfafb</span> | Primary window, dialog, and Claw overlay drawer canvas background. |
| <span class="bx-var-name">window_fg</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#f2f4f2"></span>#f2f4f2</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#111418"></span>#111418</span> | Primary text and icon foreground on `window_bg`. |
| <span class="bx-var-name">sidebar_bg</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#2e2e32"></span>#2e2e32</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#ffffff"></span>#ffffff</span> | Left sidebar (Claw, Bookmarks, Colors) and Preferences navigation sidebar. |
| <span class="bx-var-name">sidebar_fg</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#f2f4f2"></span>#f2f4f2</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#111418"></span>#111418</span> | Text and icon foreground on `sidebar_bg`. |
| <span class="bx-var-name">card_bg</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#26262a"></span>#26262a</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#ffffff"></span>#ffffff</span> | Tactile buttons, unselected tabs, preference cards, entries, and linked button strips inside menus. |
| <span class="bx-var-name">card_fg</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#f2f4f2"></span>#f2f4f2</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#111418"></span>#111418</span> | Text and icon foreground on `card_bg`. |
| <span class="bx-var-name">headerbar_bg</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#1d1d20"></span>#1d1d20</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#ffffff"></span>#ffffff</span> | Main content headerbar, dialog headerbars, and non-frosted terminal headerbar. |
| <span class="bx-var-name">headerbar_fg</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#f2f4f2"></span>#f2f4f2</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#111418"></span>#111418</span> | Text and icon foreground on `headerbar_bg`. |
| <span class="bx-var-name">popover_bg</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#2e2e32"></span>#2e2e32</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#ffffff"></span>#ffffff</span> | Matches `sidebar_bg`. Used by the terminal right-click menu, command palette, and autocomplete popover. |
| <span class="bx-var-name">popover_fg</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#f2f4f2"></span>#f2f4f2</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#111418"></span>#111418</span> | Text and icon foreground on `popover_bg`. |
| <span class="bx-var-name">accent</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#7ec868"></span>#7ec868</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#00acc1"></span>#00acc1</span> | **Primary interaction:** Selected tabs, active sidebar rows, active switcher buttons, `.suggested-action` buttons, checked switches, focus rings, and `@boxxy_surface_hover`. |
| <span class="bx-var-name">accent_fg</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#0d140a"></span>#0d140a</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#0d1117"></span>#0d1117</span> | High-contrast ink text and icons rendered on top of `accent` surfaces. |
| <span class="bx-var-name">secondary</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#7dc4e4"></span>#7dc4e4</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#a594f9"></span>#a594f9</span> | **Supporting identity:** `.secondary-action` (`Okay` button), `.claw-round-phase-work` (`● LAP X/N` pill), `.detached-shells-pill`, theme tag pills, bookmark variable chips, task kind badges, and `@file` input tags. |
| <span class="bx-var-name">secondary_fg</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#0b1620"></span>#0b1620</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#111418"></span>#111418</span> | High-contrast ink text and icons rendered on top of solid `secondary` surfaces. |
| <span class="bx-var-name">highlight</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#f5b971"></span>#f5b971</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#ff9f43"></span>#ff9f43</span> | **Attention &amp; discovery:** `.whats-new-badge` (`FRESH UPDATE`), `.claw-round-pip-active` (live active lap capsule), `.avatar-vibe-badge`, search matches, and `:character` mention tags. |
| <span class="bx-var-name">highlight_fg</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#201407"></span>#201407</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#111418"></span>#111418</span> | High-contrast ink text and icons rendered on top of solid `highlight` badges. |
| <span class="bx-var-name">ink_border</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#050505"></span>#050505</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#111418"></span>#111418</span> | Crisp 2px neo-brutalist outlines and structural pane dividers (`@boxxy_ink`). |
| <span class="bx-var-name">shadow</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#050505"></span>#050505</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#111418"></span>#111418</span> | Solid offset drop-shadows (`@boxxy_shadow`). |

---

## Complete `@define-color` Variable Catalog & Component Mapping

Components never hardcode hex or RGB values for surfaces, borders, or semantic states. Every stylesheet rule references the semantic `@define-color` variables below:

| CSS Variable | Source Field / Formula | Where It Is Used |
| :--- | :--- | :--- |
| <span class="bx-var-name">@window_bg_color</span> | <span class="bx-source-name">colors.window_bg</span> | Main window background, dialog sheets (`@dialog_bg_color`), Claw overlay drawer background (`.claw-drawer`), OSD overlays, bookmark preview frames, and avatar status badges. |
| <span class="bx-var-name">@window_fg_color</span> | <span class="bx-source-name">colors.window_fg</span> | Primary text inside windows, dialogs (`@dialog_fg_color`), Claw overlay conversation rows, and OSD overlays. |
| <span class="bx-var-name">@sidebar_bg_color</span> | <span class="bx-source-name">colors.sidebar_bg</span> | Left workspace sidebar (`.sidebar-toolbar`, `.sidebar-pane`) and the Preferences navigation sidebar. |
| <span class="bx-var-name">@sidebar_fg_color</span> | <span class="bx-source-name">colors.sidebar_fg</span> | All text, icons, and `.sidebar-header` inside the left sidebar and Preferences sidebar. |
| <span class="bx-var-name">@headerbar_bg_color</span> | <span class="bx-source-name">colors.headerbar_bg</span> | Main window headerbar (`.content-header`), `.terminal-header`, and dialog headerbars. |
| <span class="bx-var-name">@headerbar_fg_color</span> | <span class="bx-source-name">colors.headerbar_fg</span> | Titles, buttons, and icons inside `.terminal-header`, `.content-header`, and dialog headerbars. |
| <span class="bx-var-name">@card_bg_color</span> | <span class="bx-source-name">colors.card_bg</span> | Unselected terminal tabs, standard tactile buttons, preference boxed-list groups, search & text entries, Claw message bar (`.boxxy-msgbar`), diagnosis/diff viewer cards, character selector pills, status pills, and linked button strips inside menus (`popover.menu box.linked`). |
| <span class="bx-var-name">@card_fg_color</span> | <span class="bx-source-name">colors.card_fg</span> | Text, labels, and icons inside all `@card_bg_color` widgets above. |
| <span class="bx-var-name">@popover_bg_color</span> | <span class="bx-source-name">colors.popover_bg</span> | Terminal right-click menu (`popover.terminal-menu`), dropdown menus (`popover.menu`), command palette, search popover, and `@file` autocomplete popover. |
| <span class="bx-var-name">@popover_fg_color</span> | <span class="bx-source-name">colors.popover_fg</span> | Menu items (`modelbutton`) and labels inside all popovers. |
| <span class="bx-var-name">@accent_bg_color</span> | <span class="bx-source-name">colors.accent</span> | Selected terminal tab, selected sidebar row, active sidebar switcher button, pressed tactile buttons, `.suggested-action` buttons, hovered popover menu items, checked switches &amp; checkboxes, completed interval lap dots, and selected character pills. |
| <span class="bx-var-name">@accent_fg_color</span> | <span class="bx-source-name">colors.accent_fg</span> | High-contrast text and icons inside all `@accent_bg_color` and `@boxxy_surface_hover` surfaces. |
| <span class="bx-var-name">@accent_color</span> | <span class="bx-source-name">colors.accent</span> | Focus outlines on search entries, text inputs, and the Claw message bar (`.boxxy-msgbar:focus-within`), plus task countdown timers and inline links. |
| <span class="bx-var-name">@boxxy_secondary_bg_color</span> | <span class="bx-source-name">colors.secondary</span> | Solid comic fill for `button.secondary-action` (`Okay` button), `.claw-round-phase-work` (`● LAP X/N`), `.detached-shells-pill`, `.boxxy-theme-tag-pill`, `.bookmark-var-chip`, `.claw-task-kind-badge`, and `.boxxy-badge-secondary`. |
| <span class="bx-var-name">@boxxy_secondary_fg_color</span> | <span class="bx-source-name">colors.secondary_fg</span> | High-contrast text and icons inside `@boxxy_secondary_bg_color` buttons and pills. |
| <span class="bx-var-name">@boxxy_secondary_color</span> | <span class="bx-source-name">OKLCH clamped on card_bg</span> | Contrast-safe standalone secondary text/border color on `@card_bg_color` and live `@file` input highlighting. |
| <span class="bx-var-name">@boxxy_secondary_subtle</span> | <span class="bx-source-name">alpha(@boxxy_secondary_bg_color, 0.16)</span> | Subtle translucent secondary wash for Default GTK fallback chips. |
| <span class="bx-var-name">@boxxy_highlight_bg_color</span> | <span class="bx-source-name">colors.highlight</span> | Solid discovery &amp; spotlight fill for `.whats-new-badge`, `.claw-round-pip-active` (current live lap), `.avatar-vibe-badge`, `.detached-shells-pill.warning`, and `.boxxy-badge-highlight`. |
| <span class="bx-var-name">@boxxy_highlight_fg_color</span> | <span class="bx-source-name">colors.highlight_fg</span> | High-contrast text and symbolic icons inside `@boxxy_highlight_bg_color` badges. |
| <span class="bx-var-name">@boxxy_highlight_color</span> | <span class="bx-source-name">OKLCH clamped on card_bg</span> | Contrast-safe standalone discovery text/border color on `@card_bg_color` and live `:character` mention highlighting. |
| <span class="bx-var-name">@boxxy_search_match_bg</span> | <span class="bx-source-name">alpha(@boxxy_highlight_bg_color, 0.32)</span> | `.boxxy-search-match` text and filter match highlight background. |
| <span class="bx-var-name">@boxxy_ink</span> | <span class="bx-source-name">colors.ink_border</span> | 2px solid outlines on tabs, sidebar rows, tactile buttons, window controls, entries, boxed lists, cards, popovers, dialogs, switches, checkboxes, and structural pane dividers. |
| <span class="bx-var-name">@boxxy_shadow</span> | <span class="bx-source-name">colors.shadow</span> | Hard-edge offset drop-shadows (`2px 3px 0px`, `3px 4px 0px`, `4px 5px 0px`) on tactile buttons, selected sidebar pills, boxed lists, cards, popovers, and dialogs. |
| <span class="bx-var-name">@boxxy_surface_hover</span> | <span class="bx-source-name">mix(@card_bg_color, @accent_bg_color, 0.82)</span> | Vibrant hover background (82% accent + 18% card, paired with `@accent_fg_color` ink text) for unselected tabs, shadowed `.navigation-sidebar > row` items, raised tactile buttons, character selector pills, and What's New stat tiles. |
| <span class="bx-var-name">@destructive_bg_color</span> | <span class="bx-source-name">Dark: #c01c28 · Light: #e01b24</span> | Destructive action buttons (`.destructive-action`), error progress bars, avatar remove badge hover, and diff deletion ratio bars. |
| <span class="bx-var-name">@success_bg_color</span> | <span class="bx-source-name">Dark: #26a269 · Light: #2ec27e</span> | Terminal progress bars, model ready status titles, and diff addition counters/bars. |

---

## Visual Hierarchy: Shadow vs. Non-Shadow Matrix

| Component | Has `@boxxy_shadow`? | Shadow Offset | Rationale |
| :--- | :--- | :--- | :--- |
| **Sidebar & Dialog Switcher Buttons** (`viewswitcher > button`, `stackswitcher > button`) | **Yes** | `2px 3px 0px @boxxy_shadow` | Top-level mode switchers (Claw, Bookmarks, Colors in the sidebar; Characters and Dreams in Models Selection) sit in spacious headers with inter-button gaps (`2px` / `6px`) and act as tactile physical toggles. |
| **Hero / Advertising CTA Buttons** (`button.pill:not(.flat)`) | **Yes** | `3px 4px 0px @boxxy_shadow` (`4px 5px 0px` on `:hover`) | Primary dialog footer actions (`Done`, `Save`, `Apply`, `Read What's New`, `Cancel`/`Close`) use boxy-rounded `10px` corners, `6px 22px` padding, and a slight hover lift (`translate(-1px, -1px)`). |
| **Sidebar & Command Palette Rows** (`.navigation-sidebar > row:selected`, `:hover`, `.menu-open`) | **Yes** | `2px 3px 0px @boxxy_shadow` | Lifts the active or hovered conversation, command palette item, bookmark, or preferences category above the flat list. Depresses to `1px 1px 0px` on click. |
| **Terminal Tabs** (`tabbar tab`, `tabbar tab:selected`) | **No** (`box-shadow: none`) | `none` | Tabs live inside the compact 28px tab bar strip. Keeping `box-shadow: none` (while retaining the 2px `@boxxy_ink` outline and `@accent_bg_color` active fill) prevents bottom shadow clipping inside `AdwTabBox`. |
| **Standalone Tactile Buttons** (`headerbar button`, `windowcontrols > button`, `dialog button`) | **Yes** | `2px 3px 0px @boxxy_shadow` | Primary interactive buttons. Depress by `translate(1px, 1px)` with `1px 1px 0px @boxxy_shadow` when clicked. |
| **Popover Linked Button Container** (`popover.menu box.linked`) | **Yes (Container only)** | `2px 3px 0px @boxxy_shadow` | The outer segmented bar (`Copy \| Copy Link`, split/close bar) casts a single unified shadow. |
| **Individual Linked Buttons** (`popover.menu box.linked > button.model`) | **No** (`box-shadow: none`) | `none` | Inner segments are separated by `border-right: 2px solid @boxxy_ink` inside the shared container; per-segment shadows would overlap adjacent buttons. |
| **Dropdown & Menu List Rows** (`dropdown > popover.menu > contents listview > row`, `popover.menu modelbutton`) | **On Hover (`2px 2px 0px @boxxy_shadow`)** | `2px 2px 0px @boxxy_shadow` | Hovered menu and dropdown items snap instantly (`transition: none`) into `@accent_bg_color` with a `2px solid @boxxy_ink` border and `2px 2px 0px` offset shadow. |
| **Preference Boxed Lists** (`.boxed-list`, `.boxed-list-separate`, `preferencesgroup listbox`) | **Yes** | `2px 3px 0px @boxxy_shadow` | Structured `8px`-radius preference groups with a `2px solid @boxxy_ink` frame, recessed `1.5px solid alpha(@boxxy_ink, 0.55)` row grooves, and recessed `@window_bg_color` `row.activatable:hover` states. |
| **Flat Utility Buttons, Links &amp; Commit Rows** (`button.flat`, `.boxxy-link`, `.whats-new-commit-row`) | **No** (`box-shadow: none`) | `none` | Quiet inline utility actions stay transparent at rest and snap into a shadowless recessed surface cutout (`@window_bg_color` / `@card_bg_color`) + `1.5px` `@boxxy_ink` hairline on `:hover`, never competing with raised buttons. |
| **Scale Sliders & Squared Scrollbars** (`scale > trough > slider`, `scrollbar.overlay-indicator`) | **Yes (Slider) / Inset (Scrollbar)** | `1.5px 2px 0px @boxxy_shadow` | `scale` uses a `24×20px` `@card_fg_color` block grabber (`border-radius: 6px`). Overlay scrollbars use a squared `3px`-radius thumb with zero-allocation `inset 0 0 0 1.5px @boxxy_ink` borders. |
| **Popovers & Dialog Sheets** (`popover > contents`, `dialog sheet`) | **Yes** | `4px 5px 0px @boxxy_shadow` | Highest elevation layer floating above the window canvas. |

---

## Community Theme `.toml` API Specification

Users and community authors can drop `.toml` files into `~/.config/boxxy-terminal/themes/` (or `$BOXXY_CONFIG_DIR/themes/`). On first launch, Boxxy seeds `README.md`, `cotton-candy.toml`, and `bauhaus.toml` into this folder. While **Preferences → Themes** is open, Boxxy polls the folder every 500 ms (using a zero-I/O `(filename, mtime, size)` metadata stamp) and live-reloads any edits immediately.

### Full `.toml` Schema

```toml
[meta]
name = "Cotton Candy"                                         # Optional (defaults to filename stem with spaces)
author = "nukeop"                                             # Optional (defaults to "community")
description = "Soft pastels in baby pink, sky blue, and lemon candy" # Optional (defaults to "")
mode = "light"                                                # Optional: "light" or "dark" (auto-detected from window_bg WCAG luminance if omitted)
tags = ["pastel", "pink", "cute"]                             # Optional: up to 6 tags (first 3 shown as pills in Preferences)

[colors]
# --- REQUIRED (5 fields) ---
window_bg = "#fff5f8"
window_fg = "#1e1b24"
accent    = "#ff7eb6"
secondary = "#7cc6fe"
highlight = "#ffe066"

# --- OPTIONAL (13 fields — automatically derived if omitted) ---
sidebar_bg   = "#fce8ef"   # Defaults to `window_bg`
sidebar_fg   = "#1e1b24"   # Defaults to `window_fg`
card_bg      = "#ffffff"   # Defaults to `window_bg`
card_fg      = "#1e1b24"   # Defaults to `window_fg`
headerbar_bg = "#fce8ef"   # Defaults to `sidebar_bg`
headerbar_fg = "#1e1b24"   # Defaults to `sidebar_fg`
popover_bg   = "#fce8ef"   # Defaults to `sidebar_bg` (matches sidebar surface!)
popover_fg   = "#1e1b24"   # Defaults to `sidebar_fg`
accent_fg    = "#1e1b24"   # Defaults to `contrast_fg_for_hex(accent)` (#ffffff or #111418)
secondary_fg = "#1e1b24"   # Defaults to `contrast_fg_for_hex(secondary)`
highlight_fg = "#1e1b24"   # Defaults to `contrast_fg_for_hex(highlight)`
ink_border   = "#1e1b24"   # Defaults to "#07080c" (dark mode) or "#111418" (light mode)
shadow       = "#1e1b24"   # Defaults to `ink_border`
```

### Automatic Surface &amp; Foreground Fallback Chain

A valid community theme requires **5 core colors** (`window_bg`, `window_fg`, `accent`, `secondary`, `highlight`). All secondary surfaces, ink borders, and readable foreground tokens derive automatically in `parse_community_theme_toml()`:

```text
window_bg ──┬──► sidebar_bg ──┬──► headerbar_bg
            │                 └──► popover_bg
            └──► card_bg

window_fg ──┬──► sidebar_fg ──┬──► headerbar_fg
            │                 └──► popover_fg
            └──► card_fg

accent    ─────► accent_fg    (WCAG linearized relative luminance: Y < 0.22 → #ffffff, >= 0.22 → #111418)
secondary ─────► secondary_fg (WCAG linearized relative luminance)
highlight ─────► highlight_fg (WCAG linearized relative luminance)

mode (is_dark) ► ink_border (#07080c if dark, #111418 if light) ──► shadow
```

### Security & Validation (`sanitize_hex_color`)
- Every color string in `[colors]` (and any user `custom_accent_color`) is validated through `sanitize_hex_color(raw: &str) -> Option<String>`.
- Only exact 6-digit (`#RRGGBB`) or opaque 8-digit (`#RRGGBBFF`, normalized to `#rrggbb`) ASCII hexadecimal strings are accepted; translucent `#RRGGBBAA` strings are rejected so solid surface tokens can never become invisible.
- Any invalid hex or CSS injection attempt (e.g., `#ffffff; @import ...` or arbitrary CSS rules) returns `None`, guaranteeing community themes can never break widget geometry or inject arbitrary CSS.
