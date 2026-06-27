// @ts-nocheck
/* ============================================================
   PatilOS client - window manager, terminal, cursor, sound.
   ============================================================ */

/* ================= BOOT ================= */
const bootLines = [
  'PATIL/OS v2026.06 - boot sequence initiated',
  '[ OK ] mounting /home/ankush ............................. done',
  '[ OK ] loading kernel module: cloud_architecture.ko ...... done',
  '[ OK ] loading kernel module: cybersecurity.ko ........... done',
  '[ OK ] loading kernel module: automation.ko .............. done',
  '[ OK ] verifying credentials: 3x AWS, 1x Google, 28x CrowdStrike (2026) ... valid',
  '[ AU ] medal detected: GOLD - Skills Ontario 2026',
  '[ AG ] medal detected: SILVER - Skills Canada Nationals 2026',
  '[ OK ] gpa_check --strict ................................ 4.0/4.0',
  '',
  'Welcome, visitor. Starting desktop…',
];
const bootEl = document.getElementById('boot');
const bootText = document.getElementById('boot-text');
const bootBar = document.querySelector('#bootbar i');
const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
let bi = 0,
  bootDone = false;
function bootStep() {
  if (bootDone) return;
  if (bootBar) bootBar.style.width = Math.round((bi / bootLines.length) * 100) + '%';
  if (bi < bootLines.length) {
    bootText.textContent += bootLines[bi++] + '\n';
    setTimeout(bootStep, reduce ? 0 : 170);
  } else {
    if (bootBar) bootBar.style.width = '100%';
    setTimeout(endBoot, reduce ? 0 : 500);
  }
}
function endBoot() {
  if (bootDone) return;
  bootDone = true;
  bootEl.classList.add('done');
  if (isMobile()) {
    openWin('win-about');
    return;
  }
  openWin('win-about');
  setTimeout(() => openWin('win-terminal'), 250);
  setTimeout(() => openWin('win-medals'), 450);
}
['keydown', 'click', 'touchstart'].forEach((ev) => bootEl.addEventListener(ev, endBoot));
bootStep();

/* ================= WINDOWS ================= */
const isMobile = () => matchMedia('(max-width:760px)').matches;
let zTop = 20;
function focusWin(w) {
  document.querySelectorAll('.window').forEach((x) => x.classList.remove('focus'));
  w.classList.add('focus');
  w.style.zIndex = ++zTop;
}
function openWin(id) {
  const w = document.getElementById(id);
  if (!w) return;
  if (isMobile()) {
    document.querySelectorAll('.window.open').forEach((x) => {
      if (x !== w) {
        x.classList.remove('open');
        (x as HTMLElement).style.display = 'none';
      }
    });
  }
  const wasOpen = w.classList.contains('open');
  w.querySelectorAll('.proj,.medal-card,.r-sec').forEach((el, i) => {
    (el as HTMLElement).style.transitionDelay = 60 + i * 70 + 'ms';
  });
  w.style.display = 'flex';
  requestAnimationFrame(() => {
    w.classList.add('open');
    syncDock(); // re-sync after `.open` lands so the last-opened window is never missed
  });
  focusWin(w);
  syncDock();
  if (!wasOpen) sfx('open');
  document.querySelectorAll('.dock-btn[data-open="' + id + '"]').forEach((b) => {
    b.classList.remove('pop');
    void (b as HTMLElement).offsetWidth;
    b.classList.add('pop');
  });
  if (isMobile()) setTimeout(() => w.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  if (id === 'win-terminal') setTimeout(() => document.getElementById('term-in').focus({ preventScroll: true }), 300);
}
function closeWin(w) {
  sfx('close');
  w.classList.add('closing');
  w.classList.remove('open');
  syncDock(); // clear the dock indicator immediately on close
  setTimeout(() => {
    w.style.display = 'none';
    w.classList.remove('closing');
    syncDock();
  }, 280);
}
/* mobile launcher empty-state */
const launcherHint = document.createElement('div');
launcherHint.id = 'launcher-hint';
launcherHint.innerHTML = '<div class="lh-logo">patil<b>OS</b></div><p>Tap an app in the dock below ↓</p>';
document.body.appendChild(launcherHint);
function updateLauncherHint() {
  // check inline display (set synchronously in openWin) so this is correct
  // even before the .open class lands on the next animation frame.
  const anyOpen = [...document.querySelectorAll('.window')].some((w) => (w as HTMLElement).style.display === 'flex');
  launcherHint.style.display = isMobile() && !anyOpen ? 'flex' : 'none';
}
addEventListener('resize', updateLauncherHint);

function syncDock() {
  document.querySelectorAll('.dock-btn').forEach((b) => {
    const w = document.getElementById(b.dataset.open);
    // Read the inline display set synchronously in openWin/closeWin rather than
    // the `.open` class (which lands one animation frame later) - so the running
    // indicator (gold icon + dot) appears on the FIRST click, not the second.
    const running = !!w && (w as HTMLElement).style.display === 'flex' && !w.classList.contains('closing');
    b.classList.toggle('running', running);
  });
  updateLauncherHint();
}
document.querySelectorAll('[data-open]').forEach((el) => el.addEventListener('click', () => openWin(el.dataset.open)));

/* ---- snap helpers ---- */
const snapPrev = document.createElement('div');
snapPrev.id = 'snap-preview';
document.body.appendChild(snapPrev);
function snapZone(x, y) {
  const T = 32,
    m = 16,
    W = innerWidth,
    H = innerHeight,
    bh = H - T - 2 * m,
    bt = T + m;
  if (y < T + 10) return { left: '2%', top: '6%', width: '96%', height: '86%', box: [m, bt, W - 2 * m, bh] };
  if (x < 10) return { left: m + 'px', top: bt + 'px', width: W / 2 - m * 1.5 + 'px', height: bh + 'px', box: [m, bt, W / 2 - m * 1.5, bh] };
  if (x > W - 10) return { left: W / 2 + m * 0.5 + 'px', top: bt + 'px', width: W / 2 - m * 1.5 + 'px', height: bh + 'px', box: [W / 2 + m * 0.5, bt, W / 2 - m * 1.5, bh] };
  return null;
}
function showSnap(z) {
  if (!z) {
    snapPrev.style.opacity = '0';
    return;
  }
  const [l, t, w, h] = z.box;
  Object.assign(snapPrev.style, { left: l + 'px', top: t + 'px', width: w + 'px', height: h + 'px', opacity: '1' });
}
function animateBox(w, box) {
  w.classList.add('animating');
  Object.assign(w.style, box);
  setTimeout(() => w.classList.remove('animating'), 260);
}
snapPrev.style.cssText =
  'position:fixed;z-index:8;pointer-events:none;border-radius:12px;opacity:0;border:1.5px solid var(--iris);background:rgba(154,140,255,.10);box-shadow:inset 0 0 40px rgba(154,140,255,.12);transition:left .14s ease,top .14s ease,width .14s ease,height .14s ease,opacity .16s ease';

document.querySelectorAll('.window').forEach((w) => {
  w.addEventListener('pointerdown', () => focusWin(w));
  w.querySelector('.dot-close').addEventListener('click', (e) => {
    e.stopPropagation();
    closeWin(w);
  });
  w.querySelector('.dot-min').addEventListener('click', (e) => {
    e.stopPropagation();
    closeWin(w);
  });
  w.querySelector('.dot-max').addEventListener('click', (e) => {
    e.stopPropagation();
    if (isMobile()) return;
    sfx('snap');
    if (w.dataset.max) {
      animateBox(w, JSON.parse(w.dataset.max));
      delete w.dataset.max;
    } else {
      w.dataset.max = JSON.stringify({ left: w.style.left, top: w.style.top, width: w.style.width, height: w.style.height });
      animateBox(w, { left: '2%', top: '6%', width: '96%', height: '86%' });
    }
  });
  /* drag with edge-snap */
  const head = w.querySelector('.win-head');
  head.addEventListener('pointerdown', (e) => {
    if (isMobile() || e.target.closest('.win-dots')) return;
    focusWin(w);
    if (w.dataset.max) delete w.dataset.max;
    const r = w.getBoundingClientRect(),
      ox = e.clientX - r.left,
      oy = e.clientY - r.top;
    let zone = null;
    function mv(e2) {
      w.style.left = Math.min(innerWidth - 80, Math.max(-r.width + 120, e2.clientX - ox)) + 'px';
      w.style.top = Math.min(innerHeight - 60, Math.max(32, e2.clientY - oy)) + 'px';
      zone = snapZone(e2.clientX, e2.clientY);
      showSnap(zone);
    }
    function up() {
      removeEventListener('pointermove', mv);
      removeEventListener('pointerup', up);
      showSnap(null);
      if (zone) {
        animateBox(w, { left: zone.left, top: zone.top, width: zone.width, height: zone.height });
        sfx('snap');
      }
    }
    addEventListener('pointermove', mv);
    addEventListener('pointerup', up);
  });
  /* resize handle */
  if (!isMobile()) {
    const rs = document.createElement('div');
    rs.className = 'win-resize';
    rs.style.cssText = 'position:absolute;right:0;bottom:0;width:18px;height:18px;cursor:nwse-resize;z-index:4';
    w.appendChild(rs);
    rs.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      e.preventDefault();
      focusWin(w);
      if (w.dataset.max) delete w.dataset.max;
      const r = w.getBoundingClientRect(),
        sx = e.clientX,
        sy = e.clientY,
        sw = r.width,
        sh = r.height;
      function mv(e2) {
        w.style.width = Math.max(300, Math.min(innerWidth - 20, sw + (e2.clientX - sx))) + 'px';
        w.style.height = Math.max(220, Math.min(innerHeight - 44, sh + (e2.clientY - sy))) + 'px';
      }
      function up() {
        removeEventListener('pointermove', mv);
        removeEventListener('pointerup', up);
      }
      addEventListener('pointermove', mv);
      addEventListener('pointerup', up);
    });
  }
});

/* keep windows hidden until boot opens them */
document.querySelectorAll('.window').forEach((w) => (w.style.display = 'none'));

/* ================= CLOCK ================= */
const clock = document.getElementById('clock');
setInterval(() => {
  clock.textContent = new Date().toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit' });
}, 1000);

/* ================= SOUND ================= */
let actx,
  soundOn = localStorage.getItem('patilos_sound') !== 'off';
function ensureCtx() {
  if (!actx) {
    try {
      actx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {}
  }
  if (actx && actx.state === 'suspended') actx.resume();
}
function tone(freq, dur, type, vol, when) {
  if (!soundOn || !actx) return;
  const t = actx.currentTime + (when || 0);
  const o = actx.createOscillator(),
    g = actx.createGain();
  o.type = type || 'sine';
  o.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol || 0.05, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(actx.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}
const sfxMap = {
  open: () => {
    tone(523, 0.12, 'sine', 0.045);
    tone(784, 0.13, 'sine', 0.035, 0.05);
  },
  close: () => {
    tone(440, 0.12, 'sine', 0.04);
    tone(294, 0.14, 'sine', 0.03, 0.05);
  },
  click: () => tone(660, 0.04, 'triangle', 0.025),
  key: () => tone(880, 0.018, 'square', 0.012),
  snap: () => {
    tone(660, 0.07, 'sine', 0.045);
    tone(990, 0.07, 'sine', 0.03, 0.04);
  },
};
function sfx(n) {
  ensureCtx();
  (sfxMap[n] || (() => {}))();
}
['pointerdown', 'keydown', 'touchstart'].forEach((ev) => addEventListener(ev, ensureCtx, { passive: true }));
const sndBtn = document.getElementById('snd');
function renderSnd() {
  sndBtn.innerHTML = '<svg class="ic ic-sm"><use href="#' + (soundOn ? 'i-vol' : 'i-vol-off') + '"></use></svg>';
  sndBtn.classList.toggle('off', !soundOn);
  sndBtn.title = soundOn ? 'Sound on' : 'Sound off';
}
sndBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  soundOn = !soundOn;
  localStorage.setItem('patilos_sound', soundOn ? 'on' : 'off');
  renderSnd();
  if (soundOn) {
    ensureCtx();
    sfx('open');
  }
});
renderSnd();
document.querySelectorAll('.icon,.dock-btn,#menubar .item').forEach((el) => el.addEventListener('click', () => sfx('click')));

/* ================= TERMINAL ================= */
const out = document.getElementById('term-out'),
  tin = document.getElementById('term-in'),
  tbody = document.getElementById('term-body');
function print(html, cls) {
  const d = document.createElement('div');
  d.className = 'ln' + (cls ? ' ' + cls : '');
  d.innerHTML = html;
  out.appendChild(d);
  tbody.scrollTop = tbody.scrollHeight;
}
const themes = [
  ['#F0B64B', 'liquid gold'],
  ['#9A8CFF', 'iris'],
  ['#5FD0A8', 'jade'],
  ['#FF6B4A', 'ember'],
];
let themeIdx = Math.min(+(localStorage.getItem('patilos_theme') || 0), themes.length - 1);
function applyTheme() {
  document.documentElement.style.setProperty('--accent', themes[themeIdx][0]);
}
function cycleTheme() {
  themeIdx = (themeIdx + 1) % themes.length;
  localStorage.setItem('patilos_theme', String(themeIdx));
  applyTheme();
  sfx('snap');
  print('theme → <span class="em">' + themes[themeIdx][1] + '</span>', 'ok');
}
applyTheme();

const cmds = {
  help: () =>
    print(
      `available commands:
  <span class="em">whoami</span>      - who is this guy        <span class="em">neofetch</span>   - system summary
  <span class="em">ls</span>          - list desktop items     <span class="em">skills</span>     - core skills
  <span class="em">medals</span>      - 2026 competition record <span class="em">projects</span>   - selected work
  <span class="em">certs</span>       - credentials (2026)      <span class="em">education</span>  - schools &amp; GPA
  <span class="em">experience</span>  - work behind the résumé
  <span class="em">contact</span> / <span class="em">social</span> - reach me     <span class="em">date</span> · <span class="em">pwd</span> · <span class="em">echo</span> &lt;text&gt;
  <span class="em">open &lt;name&gt;</span> - open a window         <span class="em">cat &lt;file&gt;</span> - read a "file"
  <span class="em">theme</span>       - cycle accent colour     <span class="em">clear</span>      - wipe the screen
  <span class="em">sudo hire</span>   - try it
  <span class="sub">tip: ↑ / ↓ scroll through command history</span>`
    ),
  whoami: () =>
    print(
      `<span class="em">Ankush Patil</span> - Cloud Engineer, Toronto, ON.
AWS-first, security always. 4.0 GPA ×2 programs. Authorized to work in Canada.`,
      'ok'
    ),
  neofetch: () =>
    print(
      `<span class="au">        ⬢⬢⬢⬢⬢</span>      <span class="em">ankush@patil-os</span>
<span class="au">      ⬢⬢     ⬢⬢</span>    ─────────────────
<span class="au">     ⬢⬢  Au   ⬢⬢</span>   <span class="ok">os</span>      PATIL/OS v2026.06
<span class="au">     ⬢⬢  Ag   ⬢⬢</span>   <span class="ok">role</span>    Cloud Engineer
<span class="au">      ⬢⬢     ⬢⬢</span>    <span class="ok">host</span>    Toronto, ON 🇨🇦
<span class="au">        ⬢⬢⬢⬢⬢</span>      <span class="ok">gpa</span>     4.0 / 4.0 ×2 programs
                      <span class="ok">awards</span>  🥇 Ontario · 🥈 Canada (2026)
                      <span class="ok">certs</span>   AWS ×3 · Google · CrowdStrike ×28
                      <span class="ok">stack</span>   AWS · Terraform · Azure · Falcon`,
      'ok'
    ),
  ls: () =>
    print(`about.md        medals.app      projects/
credentials.db  experience.log  contact.sh`),
  skills: () =>
    print(`cloud      AWS · ECS Fargate · EKS/IRSA · CloudFront · WAF · KMS
iac        Terraform · CI/CD (GitHub Actions)
security   CrowdStrike Falcon · CyberArk Application Control · Splunk SIEM · least privilege
azure      Azure Arc · P2S VPN · Azure SQL · Cosmos DB · ZRS
code       Python · PowerShell · SQL`),
  medals: () =>
    print(`<span class="au">🥇 GOLD   - Skills Ontario 2026</span> (provincial championships, cloud computing)
<span class="ag">🥈 SILVER - Skills Canada Nationals 2026, Toronto</span> (representing Ontario)`),
  projects: () =>
    print(`house-of-north/   multi-AZ AWS e-commerce - ECS Fargate · Aurora · WAF · KMS · Terraform
build-roulette/   personal project on Engineering Decision Records - buildroulette.dev
eks-irsa/         pod-level IAM on Amazon EKS - Helm, HPA
azure-hybrid/     P2S VPN · Azure Arc · Azure SQL · Cosmos DB · ZRS`),
  certs: () =>
    print(`AWS: Solutions Architect - Associate · AI Practitioner · Cloud Practitioner   <span class="em">[2026]</span>
Google Cybersecurity Professional Certificate                                 <span class="em">[2026]</span>
CrowdStrike ×28 - across 7 domains                                            <span class="em">[2026]</span>`),
  education: () =>
    print(`Seneca Polytechnic   Cloud Architecture & Administration · GPA 4.0   <span class="em">[2025-26]</span>
Georgian College     PG Cybersecurity · GPA 4.0                  <span class="em">[2024-25]</span>
SVKM's IoT, Dhule    B.Tech, Computer Engineering                <span class="em">[2022]</span>`),
  experience: () =>
    print(`2025       Cyber Security Analyst - Intact (co-op, Toronto)
2022-2023  Software Engineer - Persistent Systems (Pune)`),
  contact: () =>
    print(
      `email     <a href="mailto:ankushgp@icloud.com">ankushgp@icloud.com</a>
github    <a href="https://github.com/AnkushPatil45" target="_blank" rel="noopener">github.com/AnkushPatil45</a>
linkedin  <a href="https://linkedin.com/in/ankush-p-a47664167" target="_blank" rel="noopener">linkedin.com/in/ankush-p-a47664167</a>`,
      'ok'
    ),
  social: () => cmds.contact(),
  date: () => print(new Date().toString()),
  pwd: () => print('/home/ankush'),
  theme: () => cycleTheme(),
  clear: () => {
    out.innerHTML = '';
  },
  'sudo hire': () =>
    print(
      `[sudo] permission granted. drafting offer letter… <span class="ok">✔</span>
just kidding - but the email works: <a href="mailto:ankushgp@icloud.com">ankushgp@icloud.com</a>`,
      'au'
    ),
};
const winAlias = {
  about: 'win-about',
  medals: 'win-medals',
  projects: 'win-projects',
  creds: 'win-creds',
  credentials: 'win-creds',
  xp: 'win-xp',
  experience: 'win-xp',
  contact: 'win-contact',
  terminal: 'win-terminal',
};
const catMap = {
  'about.md': 'whoami',
  about: 'whoami',
  'medals.app': 'medals',
  'projects/': 'projects',
  projects: 'projects',
  'credentials.db': 'certs',
  'experience.log': 'experience',
  'contact.sh': 'contact',
};
const hist = [];
let hidx = 0;
tin.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') {
    if (hidx > 0) {
      hidx--;
      tin.value = hist[hidx] || '';
    }
    e.preventDefault();
  } else if (e.key === 'ArrowDown') {
    if (hidx < hist.length) {
      hidx++;
      tin.value = hist[hidx] || '';
    }
    e.preventDefault();
  } else if (e.key.length === 1 || e.key === 'Backspace') sfx('key');
});
document.getElementById('term-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const raw = tin.value.trim();
  tin.value = '';
  if (!raw) return;
  hist.push(raw);
  hidx = hist.length;
  print(`<span class="ok">ankush@patil-os ~ $</span> ${raw.replace(/</g, '&lt;')}`);
  const low = raw.toLowerCase();
  if (cmds[low]) {
    cmds[low]();
    return;
  }
  if (low.startsWith('open ')) {
    const t = winAlias[low.slice(5).trim()];
    if (t) {
      openWin(t);
      print(`opening ${low.slice(5).trim()}…`, 'ok');
    } else print('open: no such window', 'err');
    return;
  }
  if (low.startsWith('cat ')) {
    const f = low.slice(4).trim(),
      k = catMap[f];
    if (k && cmds[k]) cmds[k]();
    else print(`cat: ${f.replace(/</g, '&lt;')}: no such file`, 'err');
    return;
  }
  if (low.startsWith('echo ')) {
    print(raw.slice(5).replace(/</g, '&lt;'));
    return;
  }
  if (low === 'sudo') {
    print('usage: sudo hire', 'err');
    return;
  }
  print(`zsh: command not found: ${raw.replace(/</g, '&lt;')} - try <span class="em">help</span>`, 'err');
});
print(`PATIL/OS terminal - type <span class="em">help</span> to look around.`);
syncDock();

/* ================= CUSTOM CURSOR + MAGNETIC DOCK ================= */
(function () {
  if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  document.body.classList.add('cursor-on');
  const cursor = document.getElementById('cursor');
  let mx = innerWidth / 2,
    my = innerHeight / 2,
    rx = mx,
    ry = my;
  addEventListener(
    'mousemove',
    (e) => {
      mx = e.clientX;
      my = e.clientY;
    },
    { passive: true }
  );
  addEventListener('mousedown', () => cursor.classList.add('click'));
  addEventListener('mouseup', () => cursor.classList.remove('click'));
  (function loop() {
    rx += (mx - rx) * 0.3;
    ry += (my - ry) * 0.3;
    cursor.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
    requestAnimationFrame(loop);
  })();
  const hot = 'a,button,.icon,[data-open],.win-dots span,.win-resize,input,#snd';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hot)) cursor.classList.add('hot');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hot)) cursor.classList.remove('hot');
  });
  document.querySelectorAll('.dock-btn').forEach((b) => {
    b.addEventListener('mousemove', (e) => {
      const r = b.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2),
        dy = e.clientY - (r.top + r.height / 2);
      b.style.transform = 'translate(' + dx * 0.3 + 'px,' + (dy * 0.3 - 8) + 'px) scale(1.18)';
    });
    b.addEventListener('mouseleave', () => {
      b.style.transform = '';
    });
  });
})();

/* ================= TEXT SCRAMBLE (menubar nav) ================= */
(function () {
  if (reduce) return;
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/<>_·';
  function scramble(el) {
    const final = el.dataset.txt || el.textContent;
    el.dataset.txt = final;
    let frame = 0;
    const settle = final.length + 6;
    clearInterval(el._sc);
    el._sc = setInterval(() => {
      el.textContent = final
        .split('')
        .map((c, i) => {
          if (c === ' ') return ' ';
          if (i < frame - 6) return final[i];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      if (frame++ > settle) {
        clearInterval(el._sc);
        el.textContent = final;
      }
    }, 26);
  }
  document.querySelectorAll('#menubar .item').forEach((el) => el.addEventListener('mouseenter', () => scramble(el)));
})();

/* ================= DEEP LINK (#win-xxx opens that app maximized) ================= */
(function () {
  const h = location.hash;
  if (h && h.indexOf('#win-') === 0) {
    bootDone = true;
    bootEl.classList.add('done');
    const id = h.slice(1);
    const w = document.getElementById(id);
    if (w) {
      if (!isMobile()) Object.assign(w.style, { left: '4%', top: '6%', width: '92%', height: '86%' });
      openWin(id);
    }
  }
})();
