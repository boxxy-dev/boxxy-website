+++
title = "Reminders"
template = "docs.html"
+++

# Reminders & Laps

Need a quick nudge to check a build, take a break, or run a Pomodoro session? Just ask any =BoxxyClaw= character in plain English — no special syntax required.

<div style="background: #1d1d20; border: 2px solid #050505; border-radius: 14px; box-shadow: 4px 5px 0px #050505; padding: 1.25rem; margin: 1.5rem 0; max-width: 440px; font-family: 'Lexend', sans-serif;">
  <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.85rem;">
    <span style="font-size: 0.84rem; font-weight: 700; color: #f2f4f2;">Pending Tasks</span>
    <span style="background: #7ec868; color: #0d140a; border: 1.5px solid #050505; border-radius: 9999px; font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; font-weight: 800; padding: 0 7px; line-height: 1.45;">2</span>
  </div>
  <div id="bx-lap-card" style="background: #26262a; border: 2px solid #050505; border-radius: 10px; box-shadow: 2px 3px 0px #050505; padding: 0.85rem 0.95rem; margin-bottom: 0.75rem;">
    <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;">
      <div style="display: flex; align-items: center; gap: 0.45rem; font-weight: 700; font-size: 0.9rem; color: #f2f4f2;">
        <span class="bx-icon" style="--icon: url('/icons/bell.svg'); width: 15px; height: 15px;" aria-hidden="true"></span>
        <span>Lap timer</span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.45rem;">
        <span id="bx-lap-badge" style="background: #7dc4e4; color: #0b1620; border: 1.5px solid #050505; border-radius: 9999px; font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; font-weight: 800; padding: 1px 9px;">● LAP 1/6</span>
        <button type="button" id="bx-lap-toggle" title="Pause / Resume" style="background: transparent; color: #f2f4f2; border: 1.5px solid transparent; border-radius: 6px; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer;"><span id="bx-lap-toggle-icon" class="bx-icon" style="--icon: url('/icons/pause.svg'); width: 13px; height: 13px;"></span></button>
        <button type="button" id="bx-lap-reset" title="Reset demo" style="background: transparent; color: #a6adc8; border: 1.5px solid transparent; border-radius: 6px; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer;"><span class="bx-icon" style="--icon: url('/icons/cross-small.svg'); width: 14px; height: 14px;"></span></button>
      </div>
    </div>
    <div style="font-size: 0.76rem; color: #a6adc8; margin: 0.3rem 0 0.65rem;">3m lap · 1m break</div>
    <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; margin-bottom: 0.55rem;">
      <div id="bx-lap-pips" style="display: flex; align-items: center; gap: 5px;">
        <span style="width: 20px; height: 8px; border-radius: 9999px; background: #f5b971; border: 1.5px solid #050505; display: inline-block;"></span>
        <span style="width: 8px; height: 8px; border-radius: 9999px; background: #1d1d20; border: 1.5px solid #050505; display: inline-block;"></span>
        <span style="width: 8px; height: 8px; border-radius: 9999px; background: #1d1d20; border: 1.5px solid #050505; display: inline-block;"></span>
        <span style="width: 8px; height: 8px; border-radius: 9999px; background: #1d1d20; border: 1.5px solid #050505; display: inline-block;"></span>
        <span style="width: 8px; height: 8px; border-radius: 9999px; background: #1d1d20; border: 1.5px solid #050505; display: inline-block;"></span>
        <span style="width: 8px; height: 8px; border-radius: 9999px; background: #1d1d20; border: 1.5px solid #050505; display: inline-block;"></span>
      </div>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; font-weight: 700;">
        <span id="bx-lap-countdown" style="color: #7ec868;">02:59 left</span>
        <span style="color: #8e9390; font-weight: 500;"> · 08:13</span>
      </div>
    </div>
    <div style="height: 6px; background: #1d1d20; border: 1.5px solid #050505; border-radius: 9999px; overflow: hidden;">
      <div id="bx-lap-bar" style="width: 4%; height: 100%; background: #7ec868; transition: width 0.35s ease;"></div>
    </div>
  </div>
  <div style="background: #26262a; border: 2px solid #050505; border-radius: 10px; box-shadow: 2px 3px 0px #050505; padding: 0.8rem 0.95rem;">
    <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;">
      <div style="display: flex; align-items: center; gap: 0.45rem; font-weight: 700; font-size: 0.88rem; color: #f2f4f2;">
        <span class="bx-icon" style="--icon: url('/icons/bell.svg'); width: 15px; height: 15px;" aria-hidden="true"></span>
        <span>Check staging deploy</span>
      </div>
      <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; font-weight: 700; color: #7ec868;">14m left</span>
    </div>
  </div>
</div>

<script>
(function () {
  var total = 180;
  var remaining = 179;
  var paused = false;
  var countdownEl = document.getElementById('bx-lap-countdown');
  var barEl = document.getElementById('bx-lap-bar');
  var toggleBtn = document.getElementById('bx-lap-toggle');
  var toggleIcon = document.getElementById('bx-lap-toggle-icon');
  var resetBtn = document.getElementById('bx-lap-reset');
  var badgeEl = document.getElementById('bx-lap-badge');
  function render() {
    var m = String(Math.floor(remaining / 60)).padStart(2, '0');
    var s = String(remaining % 60).padStart(2, '0');
    countdownEl.textContent = paused ? m + ':' + s + ' paused' : m + ':' + s + ' left';
    countdownEl.style.color = paused ? '#f5b971' : '#7ec868';
    barEl.style.width = Math.max(4, Math.round(((total - remaining) / total) * 100)) + '%';
    toggleIcon.style.setProperty('--icon', paused ? "url('/icons/play.svg')" : "url('/icons/pause.svg')");
    badgeEl.style.background = paused ? '#f5b971' : '#7dc4e4';
    badgeEl.textContent = paused ? 'PAUSED' : '● LAP 1/6';
  }
  toggleBtn.addEventListener('click', function () {
    paused = !paused;
    render();
  });
  resetBtn.addEventListener('click', function () {
    remaining = 179;
    paused = false;
    render();
  });
  setInterval(function () {
    if (paused) return;
    remaining = remaining > 1 ? remaining - 1 : 179;
    render();
  }, 1000);
})();
</script>

---

## Setting Quick Reminders

Press `Ctrl+/` and tell your character what you want to be reminded about and when:

> *"Remind me to check the staging deploy in 15 minutes"*
> *"Remind me to take my dog out at 5:30 PM"*

When the timer goes off, Boxxy plays a chime and sends a desktop notification with your character's avatar and message.

---

## Setting Laps & Interval Timers

For workouts, boxing rounds, or Pomodoro focus blocks, ask for multi-round **laps** with breaks:

> *"Make 6 3-minute laps with a 1-minute break"*
> *"Start 4 Pomodoro rounds of 25 minutes with 5-minute breaks"*

Boxxy automatically tracks every active lap and break in the =Claw Sidebar= under **Pending Tasks**:
- **Live Lap Pips:** See completed laps, the active lap, and remaining rounds at a glance.
- **Pause, Resume & Dismiss:** Click `❚❚` / `▶` to pause or resume a session anytime, or `×` to cancel it — without sending another chat message.

---

## Works Even With Boxxy Closed

If you close a tab or quit Boxxy using [Run in Background](@/run-in-background.md), your timers and laps keep ticking inside `boxxy-agent` and still notify your desktop right on time.

Using the [GNOME Shell Extension or COSMIC Applet](@/desktop-integrations.md)? You'll see live countdowns straight in your desktop top bar too.
