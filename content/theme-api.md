+++
title = "Boxxy Theme API"
template = "theme_api.html"
+++

# Boxxy Theme Engine & API

Boxxy decouples **Terminal Palettes** (the 16 ANSI colors and canvas background inside the terminal grid) from **Application Chrome Themes** (`crates/themes/src/app_theme.rs` and `resources/themes/boxxy_skeleton.css`).

All widgets below are rendered live in HTML and CSS using Boxxy's exact design tokens, borders, shadows, and padding rules. Use the **Live Theme & Accent Playground** toolbar to switch themes or override the accent color across every widget on this page in real time.

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

The main window headerbar (`.content-header`) hosts the tab bar in the center, the Sidebar Toggle icon button on the left, and the Hamburger Menu button + Window Controls (`×`) on the right.

- **Flush Terminal Tabs:** Use crisp 2px `@boxxy_ink` outlines and `@accent_bg_color` when selected, with **no drop-shadow** (`box-shadow: none`) so tabs sit flush inside the 28px headerbar strip without clipping.
- **Unified Icon Button Sizing:** After stripping internal image padding on `windowcontrols > button > image`, both `.content-header button.image-button:not(.flat)` and `.content-header windowcontrols > button` share one single CSS rule (`min-width: 24px; min-height: 24px; padding: 0px 6px; margin-top: 6px; margin-bottom: 6px;`).

<div class="bx-widget-stage">
  <div class="bx-widget-caption">
    <span>.content-header + tabbar tab + windowcontrols &gt; button</span>
    <span>Click tabs or buttons to test active states</span>
  </div>
  <div class="bx-demo-headerbar">
    <div class="bx-demo-header-side">
      <button type="button" class="bx-demo-icon-btn" title="Toggle Sidebar">◧</button>
    </div>
    <div class="bx-demo-tabbar">
      <div class="bx-demo-tab is-selected" onclick="bxSelectTab(this)">
        <span>boxxy-terminal</span>
        <span class="bx-demo-tab-close">×</span>
      </div>
      <div class="bx-demo-tab" onclick="bxSelectTab(this)">
        <span>nvim · themes</span>
        <span class="bx-demo-tab-close">×</span>
      </div>
      <div class="bx-demo-tab" onclick="bxSelectTab(this)">
        <span>cargo test</span>
        <span class="bx-demo-tab-close">×</span>
      </div>
    </div>
    <div class="bx-demo-header-side">
      <button type="button" class="bx-demo-icon-btn" title="Menu (.image-button)">☰</button>
      <button type="button" class="bx-demo-icon-btn" title="Close (windowcontrols > button)">✕</button>
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
      <div class="bx-demo-switcher-btn" onclick="bxSelectSibling(this, 'is-checked')">
        <span>✦</span>
        <span>AI Chat</span>
      </div>
      <div class="bx-demo-switcher-btn is-checked" onclick="bxSelectSibling(this, 'is-checked')">
        <span>🦖</span>
        <span>Claw</span>
      </div>
      <div class="bx-demo-switcher-btn" onclick="bxSelectSibling(this, 'is-checked')">
        <span>🔖</span>
        <span>Bookmarks</span>
      </div>
      <div class="bx-demo-switcher-btn" onclick="bxSelectSibling(this, 'is-checked')">
        <span>🎨</span>
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

### 3. Tactile Buttons (Single Source of Truth Padding)

All standard buttons, action buttons (`.suggested-action`, `.destructive-action`), popover menu text rows (`modelbutton`), and popover segmented buttons (`box.linked > button.model`) share **one single CSS padding rule**: `min-height: 24px; padding: 5px 10px;`. To make a button smaller, apply `.compact-btn` (`min-height: 20px; padding: 2px 8px;`) instead of writing per-widget rules.

<div class="bx-widget-stage">
  <div class="bx-widget-caption">
    <span>min-height: 24px; padding: 5px 10px; · box-shadow: 2px 3px 0px @boxxy_shadow</span>
    <span>Click and hold to test active press translation</span>
  </div>
  <div class="bx-demo-btn-row">
    <button type="button" class="bx-demo-btn">Standard Button</button>
    <button type="button" class="bx-demo-btn is-suggested">Accept &amp; Run (.suggested-action)</button>
    <button type="button" class="bx-demo-btn is-destructive">Reject (.destructive-action)</button>
    <button type="button" class="bx-demo-btn is-compact">Compact (.compact-btn)</button>
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
    <div class="bx-demo-linked-strip">
      <button type="button" class="bx-demo-linked-btn" title="Split Vertical">⇹</button>
      <button type="button" class="bx-demo-linked-btn" title="Split Horizontal">⇳</button>
      <button type="button" class="bx-demo-linked-btn" title="Maximize Pane">⤢</button>
      <button type="button" class="bx-demo-linked-btn" title="Close Pane">☒</button>
    </div>
    <div class="bx-demo-modelbutton is-hovered">New Tab</div>
    <div class="bx-demo-modelbutton">New Window</div>
    <div class="bx-demo-menu-sep"></div>
    <div class="bx-demo-modelbutton">Open in Files</div>
    <div class="bx-demo-modelbutton">Reset</div>
    <div class="bx-demo-menu-sep"></div>
    <div class="bx-demo-modelbutton">Preferences</div>
  </div>
</div>

### 5. Preference Rows & Boxed Lists (`listbox.boxed-list`)

Preference group cards (`listbox.boxed-list`), action rows, switch rows, and theme selector rows use `@card_bg_color` with a `2px solid @boxxy_ink` outline and a `3px 4px 0px @boxxy_shadow` offset shadow.

<div class="bx-widget-stage">
  <div class="bx-widget-caption">
    <span>preferencesgroup listbox.boxed-list + ActionRow + SwitchRow</span>
    <span>Click the switch to toggle state</span>
  </div>
  <div class="bx-demo-boxed-list">
    <div class="bx-demo-action-row">
      <div class="bx-demo-row-titles">
        <span class="bx-demo-row-title">Boxxy Dark</span>
        <span class="bx-demo-row-subtitle">Carbon dark surfaces with crisp ink borders and peanut green accents.</span>
      </div>
      <div class="bx-demo-row-suffix">
        <span class="bx-demo-tag-pill">dark</span>
        <span class="bx-demo-tag-pill">default</span>
        <span class="bx-demo-dot" style="background:#7ec868"></span>
        <span class="bx-demo-dot" style="background:#1d1d20"></span>
        <span class="bx-demo-dot" style="background:#26262a"></span>
        <span class="bx-demo-dot" style="background:#050505"></span>
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

Input fields (`searchentry`, `entry:not(.flat)`, `.claw-drawer .boxxy-msgbar`) rest on `@card_bg_color` with a `2px solid @boxxy_ink` outline, and switch their outline to `@accent_color` on `:focus-within`.

<div class="bx-widget-stage">
  <div class="bx-widget-caption">
    <span>searchentry / .claw-drawer .boxxy-msgbar (:focus-within -&gt; @accent_color)</span>
    <span>Click inside the input to see the focus outline</span>
  </div>
  <div class="bx-demo-entry">
    <span>🦖</span>
    <input type="text" value="Ask Niko or reference @crates/themes/src/app_theme.rs..." aria-label="Demo MsgBar Input" />
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
| **Layer 1 (Base)** | 600 (PRIORITY_APPLICATION) | `resources/style.css` | Always loaded | Base widget geometry, spacing, layout rules, and fallback `@define-color` tokens for Legacy Adwaita. |
| **Layer 1b (Palette)** | 610 (PRIORITY_APPLICATION + 10) | `build.rs` (`generate_gtk_css`) | Loaded when a terminal palette is selected | Terminal-coupled `.terminal-header` and `.claw-drawer` colors when running in Legacy Adwaita mode. |
| **Layer 2 (Skeleton)** | 800 (PRIORITY_USER) | `resources/themes/boxxy_skeleton.css` | Loaded only in Boxxy Theme mode | Playful neo-brutalist outlines (`@boxxy_ink`), tactile offset drop-shadows (`@boxxy_shadow`), capsule navigation pills, and active button press states. |
| **Layer 3 (Theme Tokens)** | 810 (PRIORITY_USER + 10) | `AppThemeColors::to_gtk_css()` | Loaded only in Boxxy Theme mode | Defines all semantic `@define-color` variables from the active built-in or community `.toml` theme. |
| **Layer 4 (Accent Override)** | 820 (PRIORITY_USER + 20) | `generate_accent_override_css()` | Loaded when a custom accent is set | Overrides `@accent_color`, `@accent_bg_color`, and auto-contrasted `@accent_fg_color` on top of any active theme. |

---

## Official Built-in Palettes (`Boxxy Dark` & `Boxxy Light`)

| Token (`AppThemeColors`) | `Boxxy Dark` (`boxxy-dark`) | `Boxxy Light` (`boxxy-light`) | Surface Role |
| :--- | :--- | :--- | :--- |
| <span class="bx-var-name">window_bg</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#1d1d20"></span>#1d1d20</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#ecfafb"></span>#ecfafb</span> | Primary window, dialog, and Claw overlay drawer canvas background. |
| <span class="bx-var-name">window_fg</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#f2f4f2"></span>#f2f4f2</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#111418"></span>#111418</span> | Primary text and icon foreground on `window_bg`. |
| <span class="bx-var-name">sidebar_bg</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#2e2e32"></span>#2e2e32</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#ffffff"></span>#ffffff</span> | Left sidebar (AI Chat, Claw, Bookmarks, Colors) and Preferences navigation sidebar. |
| <span class="bx-var-name">sidebar_fg</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#f2f4f2"></span>#f2f4f2</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#111418"></span>#111418</span> | Text and icon foreground on `sidebar_bg`. |
| <span class="bx-var-name">card_bg</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#26262a"></span>#26262a</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#ffffff"></span>#ffffff</span> | Tactile buttons, unselected tabs, preference cards, entries, and linked button strips inside menus. |
| <span class="bx-var-name">card_fg</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#f2f4f2"></span>#f2f4f2</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#111418"></span>#111418</span> | Text and icon foreground on `card_bg`. |
| <span class="bx-var-name">headerbar_bg</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#1d1d20"></span>#1d1d20</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#ffffff"></span>#ffffff</span> | Main content headerbar, dialog headerbars, and non-frosted terminal headerbar. |
| <span class="bx-var-name">headerbar_fg</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#f2f4f2"></span>#f2f4f2</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#111418"></span>#111418</span> | Text and icon foreground on `headerbar_bg`. |
| <span class="bx-var-name">popover_bg</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#2e2e32"></span>#2e2e32</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#ffffff"></span>#ffffff</span> | Matches `sidebar_bg`. Used by the terminal right-click menu, hamburger menu, command palette, and autocomplete popover. |
| <span class="bx-var-name">popover_fg</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#f2f4f2"></span>#f2f4f2</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#111418"></span>#111418</span> | Text and icon foreground on `popover_bg`. |
| <span class="bx-var-name">accent</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#7ec868"></span>#7ec868</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#00acc1"></span>#00acc1</span> | Selected tabs, active sidebar rows, active switcher buttons, suggested-action buttons, checked switches, and focus rings. |
| <span class="bx-var-name">accent_fg</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#0d140a"></span>#0d140a</span> | <span class="bx-color-chip"><span class="bx-color-chip-box" style="background:#0d1117"></span>#0d1117</span> | High-contrast ink text and icons rendered on top of `accent` surfaces. |
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
| <span class="bx-var-name">@popover_bg_color</span> | <span class="bx-source-name">colors.popover_bg</span> | Terminal right-click menu (`popover.terminal-menu`), hamburger menu (`popover.menu`), command palette, search popover, and `@file` autocomplete popover. |
| <span class="bx-var-name">@popover_fg_color</span> | <span class="bx-source-name">colors.popover_fg</span> | Menu items (`modelbutton`) and labels inside all popovers. |
| <span class="bx-var-name">@accent_bg_color</span> | <span class="bx-source-name">colors.accent</span> | Selected terminal tab, selected sidebar row, active sidebar switcher button, pressed tactile buttons, `.suggested-action` buttons, hovered popover menu items, checked switches & checkboxes, selected character pills, and theme tag pills. |
| <span class="bx-var-name">@accent_fg_color</span> | <span class="bx-source-name">colors.accent_fg</span> | High-contrast text and icons inside all `@accent_bg_color` surfaces. |
| <span class="bx-var-name">@accent_color</span> | <span class="bx-source-name">colors.accent</span> | Focus outlines on search entries, text inputs, and the Claw message bar (`.boxxy-msgbar:focus-within`), plus bookmark variable chips and Vibe badges. |
| <span class="bx-var-name">@boxxy_ink</span> | <span class="bx-source-name">colors.ink_border</span> | 2px solid outlines on tabs, sidebar rows, tactile buttons, window controls, entries, boxed lists, cards, popovers, dialogs, switches, checkboxes, and structural pane dividers. |
| <span class="bx-var-name">@boxxy_shadow</span> | <span class="bx-source-name">colors.shadow</span> | Hard-edge offset drop-shadows (`2px 3px 0px`, `3px 4px 0px`, `4px 5px 0px`) on tactile buttons, selected sidebar pills, boxed lists, cards, popovers, and dialogs. |
| <span class="bx-var-name">@boxxy_surface_hover</span> | <span class="bx-source-name">mix(@card_bg_color, @accent_bg_color, 0.82)</span> | Vibrant hover background (82% accent + 18% card, paired with `@accent_fg_color` ink text) for unselected tabs, unselected sidebar rows, tactile buttons, character selector pills, and What's New stat tiles. |
| <span class="bx-var-name">@destructive_bg_color</span> | <span class="bx-source-name">Dark: #c01c28 · Light: #e01b24</span> | Destructive action buttons (`.destructive-action`), error progress bars, avatar remove badge hover, and diff deletion ratio bars. |
| <span class="bx-var-name">@success_bg_color</span> | <span class="bx-source-name">Dark: #26a269 · Light: #2ec27e</span> | Terminal progress bars, model ready status titles, What's New hero badge, and diff addition counters/bars. |

---

## Visual Hierarchy: Shadow vs. Non-Shadow Matrix

| Component | Has `@boxxy_shadow`? | Shadow Offset | Rationale |
| :--- | :--- | :--- | :--- |
| **Sidebar Switcher Buttons** (`viewswitcher > button`) | **Yes** | `2px 3px 0px @boxxy_shadow` | Top-level mode switchers (AI Chat, Claw, Bookmarks, Colors) sit in the spacious sidebar header with a 2px inter-button gap and act as tactile physical toggles. |
| **Sidebar & Command Palette Rows** (`.navigation-sidebar > row:selected`, `:hover`, `.menu-open`) | **Yes** | `2px 3px 0px @boxxy_shadow` | Lifts the active or hovered conversation, command palette item, bookmark, or preferences category above the flat list. Depresses to `1px 1px 0px` on click. |
| **Terminal Tabs** (`tabbar tab`, `tabbar tab:selected`) | **No** (`box-shadow: none`) | `none` | Tabs live inside the compact 28px tab bar strip. Keeping `box-shadow: none` (while retaining the 2px `@boxxy_ink` outline and `@accent_bg_color` active fill) prevents bottom shadow clipping inside `AdwTabBox`. |
| **Standalone Tactile Buttons** (`headerbar button`, `windowcontrols > button`, `dialog button`) | **Yes** | `2px 3px 0px @boxxy_shadow` | Primary interactive buttons. Depress by `translate(1px, 1px)` with `1px 1px 0px @boxxy_shadow` when clicked. |
| **Popover Linked Button Container** (`popover.menu box.linked`) | **Yes (Container only)** | `2px 3px 0px @boxxy_shadow` | The outer segmented bar (`Copy \| Copy Link`, split/close bar) casts a single unified shadow. |
| **Individual Linked Buttons** (`popover.menu box.linked > button.model`) | **No** (`box-shadow: none`) | `none` | Inner segments are separated by `border-right: 2px solid @boxxy_ink` inside the shared container; per-segment shadows would overlap adjacent buttons. |
| **Preference Groups & Cards** (`listbox.boxed-list`, `.card`) | **Yes** | `3px 4px 0px @boxxy_shadow` | Large elevated content containers. |
| **Popovers & Dialog Sheets** (`popover > contents`, `dialog sheet`) | **Yes** | `4px 5px 0px @boxxy_shadow` | Highest elevation layer floating above the window canvas. |

---

## Community Theme `.toml` API Specification

Users and community authors can drop `.toml` files into `~/.config/boxxy-terminal/themes/` (or `$BOXXY_CONFIG_DIR/themes/`). On first launch, Boxxy seeds `README.md`, `cotton-candy.toml`, and `bauhaus.toml` into this folder. While **Preferences → Themes** is open, Boxxy polls the folder every 500 ms (using a zero-I/O `(filename, mtime, size)` metadata stamp) and live-reloads any edits immediately.

### Full `.toml` Schema

```toml
[meta]
name = "Cotton Candy"                                  # Optional (defaults to filename stem with spaces)
author = "nukeop"                                      # Optional (defaults to "community")
description = "Soft pastels in baby pink and blue"     # Optional (defaults to "")
mode = "light"                                         # Optional: "light" or "dark" (auto-detected from window_bg luminance if omitted)
tags = ["pastel", "pink", "cute"]                      # Optional: up to 6 tags (first 3 shown as pills in Preferences)

[colors]
# --- REQUIRED (3 fields) ---
window_bg = "#fff5f8"
window_fg = "#1e1b24"
accent    = "#ff7eb6"

# --- OPTIONAL (11 fields — automatically derived if omitted) ---
sidebar_bg   = "#fce8ef"   # Defaults to `window_bg`
sidebar_fg   = "#1e1b24"   # Defaults to `window_fg`
card_bg      = "#ffffff"   # Defaults to `window_bg`
card_fg      = "#1e1b24"   # Defaults to `window_fg`
headerbar_bg = "#fce8ef"   # Defaults to `sidebar_bg`
headerbar_fg = "#1e1b24"   # Defaults to `sidebar_fg`
popover_bg   = "#fce8ef"   # Defaults to `sidebar_bg` (matches sidebar surface!)
popover_fg   = "#1e1b24"   # Defaults to `sidebar_fg`
accent_fg    = "#1e1b24"   # Defaults to `contrast_fg_for_hex(accent)` (#ffffff or #111418)
ink_border   = "#1e1b24"   # Defaults to "#07080c" (dark mode) or "#111418" (light mode)
shadow       = "#1e1b24"   # Defaults to `ink_border`
```

### Automatic Fallback Derivation Chain

A valid community theme only requires **3 colors** (`window_bg`, `window_fg`, `accent`). All remaining tokens derive automatically in `parse_community_theme_toml()`:

```text
window_bg ──┬──► sidebar_bg ──┬──► headerbar_bg
            │                 └──► popover_bg
            └──► card_bg

window_fg ──┬──► sidebar_fg ──┬──► headerbar_fg
            │                 └──► popover_fg
            └──► card_fg

accent ────────► accent_fg (via relative luminance: < 0.38 → #ffffff, >= 0.38 → #111418)

mode (is_dark) ► ink_border (#07080c if dark, #111418 if light) ──► shadow
```

### Security & Validation (`sanitize_hex_color`)
- Every color string in `[colors]` (and any user `custom_accent_color`) is validated through `sanitize_hex_color(raw: &str) -> Option<String>`.
- Only exact 6-digit (`#RRGGBB`) or 8-digit (`#RRGGBBAA`) ASCII hexadecimal strings are accepted.
- Any invalid hex or CSS injection attempt (e.g., `#ffffff; @import ...` or arbitrary CSS rules) returns `None`, guaranteeing community themes can never break widget geometry or inject arbitrary CSS.
