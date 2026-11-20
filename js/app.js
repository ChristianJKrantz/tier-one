/* Tier One app: routing, progress, and the five study modes (Learn, Flashcards, Run drills,
   Help desk practice, Certification exam) plus Review, Run Rush and Progress.
   Design rule: the app never shows the correct option or command. Wrong answers get a reason,
   a hint and a link back to the lesson; you keep going until you find it yourself. */
'use strict';
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const app = $('#app');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const md = s => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
  const CH = W.chapters;

  function paras(list) {
    let out = '', ul = [];
    const flush = () => { if (ul.length) { out += `<ul>${ul.map(li => `<li>${md(li)}</li>`).join('')}</ul>`; ul = []; } };
    list.forEach(p => { if (p.startsWith('- ')) ul.push(p.slice(2)); else { flush(); out += `<p>${md(p)}</p>`; } });
    flush();
    return out;
  }

  /* ---------- saved progress ---------- */
  const KEY = 'tierone.v1';
  const blank = () => ({ v: 1, xp: 0, streak: { day: '', n: 0 }, read: {}, cards: {}, drills: {}, practice: {}, belts: {}, missed: {}, rush: 0, theme: '', course: { m: {}, best: {} } });
  let S = load();
  function load() {
    try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.v === 1) return Object.assign(blank(), s); } catch (e) { /* storage blocked */ }
    return blank();
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage blocked: progress lasts this visit */ } }

  const dayStr = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const dayNum = s => { const [y, m, d] = s.split('-').map(Number); return Math.round(new Date(y, m - 1, d).getTime() / 864e5); };
  const today = () => dayNum(dayStr());
  function touchStreak() {
    const t = dayStr();
    if (S.streak.day === t) return;
    S.streak.n = S.streak.day && today() - dayNum(S.streak.day) === 1 ? S.streak.n + 1 : 1;
    S.streak.day = t;
  }
  function streakNow() { return S.streak.day && today() - dayNum(S.streak.day) <= 1 ? S.streak.n : 0; }
  function addXP(n, msg) { S.xp += n; touchStreak(); save(); renderTray(); toast(`+${n} XP${msg ? ' · ' + msg : ''}`); }

  /* ---------- certifications and the support career ladder ---------- */
  // Passing a chapter's certification exam (80%+) certifies you in it; certifications move you up the ladder.
  // (Scores are stored in S.belts for compatibility with progress saved by earlier versions.)
  const RANKS = [['Trainee', 0], ['Tier 1 Tech', 2], ['Tier 1 Lead', 5], ['Tier 2 Tech', 8], ['Tier 2 Lead', 11], ['Tier 3 Engineer', 14], ['Systems Admin', 17], ['Senior Sysadmin', 20], ['IT Lead', CH.length]];
  const certsEarned = () => CH.filter(c => (S.belts[c.id] || 0) >= 80).length;
  function rank() { const n = certsEarned(); let r = RANKS[0], next = RANKS[1], idx = 0; RANKS.forEach((x, i) => { if (n >= x[1]) { r = x; next = RANKS[i + 1]; idx = i; } }); return { name: r[0], n, next, idx }; }
  const tierChip = i => `<span class="tierchip rank-${i}" aria-hidden="true"></span>`;
  const idBadge = (r, cls = '') => `<div class="idbadge rank-${r.idx} ${cls}" aria-hidden="true"><span class="id-clip"></span><span class="id-top">Tier One · IT Support</span><span class="id-photo">${icon('headset')}</span><span class="id-role">${esc(r.name)}</span><span class="id-tier">${r.idx === 0 ? 'In training' : `Level ${r.idx}`}</span><span class="id-bar"></span></div>`;
  const seal = (on, cls = '') => `<div class="seal ${on ? 'on' : ''} ${cls}" aria-hidden="true">${icon(on ? 'cert' : 'lock')}<small>${on ? 'Certified' : 'Not yet'}</small></div>`;

  const INTERVALS = [0, 1, 3, 7, 14, 30, 60];
  const cardKey = (c, i) => `${c.id}:${i}`;
  const cardState = k => S.cards[k] || { box: 0, due: 0, seen: false };
  // A card is due once it has been seen and its day has come. Unseen cards only count as due after you
  // start the chapter's lesson, so a brand-new learner isn't greeted by hundreds of cards.
  const started = c => (S.read[c.id] || []).length > 0;
  const isDue = (k, c) => { const s = S.cards[k]; return s ? s.due <= today() : (!c || started(c)); };
  const dueCards = c => c.cards.map((_, i) => cardKey(c, i)).filter(k => isDue(k, c));
  const allDue = () => CH.reduce((n, c) => n + dueCards(c).length, 0);
  function stats(c) {
    const read = (S.read[c.id] || []).length / c.learn.length;
    const cards = c.cards.length ? c.cards.filter((_, i) => cardState(cardKey(c, i)).box >= 3).length / c.cards.length : 1;
    const drills = c.run.length ? c.run.filter((_, i) => S.drills[`${c.id}:${i}`]).length / c.run.length : null;
    const practice = c.quiz.filter((_, i) => S.practice[`${c.id}:${i}`]).length / c.quiz.length;
    const belt = S.belts[c.id] || 0;
    const parts = [read, cards, practice, belt >= 80 ? 1 : 0].concat(drills === null ? [] : [drills]);
    return { read, cards, drills, practice, belt, pct: Math.round(parts.reduce((a, b) => a + b, 0) / parts.length * 100) };
  }
  function ring(pct, label) {
    const r = 16, C = 2 * Math.PI * r, on = C * pct / 100;
    return `<svg class="ring" viewBox="0 0 40 40" role="img" aria-label="${esc(label || pct + '% complete')}"><circle cx="20" cy="20" r="${r}" class="ring-bg"/><circle cx="20" cy="20" r="${r}" class="ring-fg${pct ? '' : ' zero'}" stroke-dasharray="${on.toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 20 20)"/><text x="20" y="24" text-anchor="middle">${pct}</text></svg>`;
  }

  /* ---------- chrome: tray, taskbar, toast, theme ---------- */
  const tray = $('#tray');
  function renderTray() {
    const r = rank(), st = streakNow();
    tray.innerHTML = `${tierChip(r.idx)}<span class="tray-txt"><b>${esc(r.name)}</b><small>${S.xp.toLocaleString()} XP</small></span><span class="tray-streak" title="Day streak">${icon('flame')}${st}</span>`;
    const due = allDue(), b = $('#duebadge');
    b.hidden = !due; b.textContent = due > 99 ? '99+' : due;
  }
  let toastT;
  function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2200); }
  function applyTheme() {
    if (S.theme) document.documentElement.dataset.theme = S.theme; else delete document.documentElement.dataset.theme;
    const dark = S.theme ? S.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    $('#themebtn').innerHTML = icon(dark ? 'sun' : 'moon');
  }
  $('#themebtn').addEventListener('click', () => {
    const dark = S.theme ? S.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    S.theme = dark ? 'light' : 'dark'; save(); applyTheme();
  });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
  $('#startbtn').innerHTML = icon('start');
  [['home', 'home'], ['course', 'course'], ['linux', 'penguin'], ['review', 'review'], ['rush', 'rush'], ['progress', 'progress']].forEach(([k, ic]) => { const a = $(`[data-nav="${k}"]`); a.insertAdjacentHTML('afterbegin', icon(ic)); a.title = a.getAttribute('aria-label'); });
  $('#startbtn').title = 'Start: all chapters (Ctrl+K)';

  function setTitle(text, ic) { $('#wintitle').textContent = text; $('#tbicon').innerHTML = icon(ic || 'logo'); document.title = text === 'Tier One' ? 'Tier One: Windows 11 help desk training' : `${text} · Tier One`; }

  /* ---------- Start menu ---------- */
  const start = $('#start'), startBtn = $('#startbtn');
  function startHTML(q) {
    q = (q || '').trim().toLowerCase();
    let body;
    if (!q) {
      body = `<h2 class="st-h">All chapters</h2><div class="st-grid">${CH.map(c => `<a class="st-app" href="#/c/${c.id}"><span class="st-ic part${c.part}">${icon(c.icon)}${(S.belts[c.id] || 0) >= 80 ? `<span class="st-cert" title="Certified">${icon('check')}</span>` : ''}</span><span class="st-n">${esc(c.num)}</span><span class="st-t">${esc(c.short)}</span></a>`).join('')}</div>`;
    } else {
      const hits = [];
      CH.forEach(c => {
        if ((c.title + ' ' + c.short + ' ' + c.blurb).toLowerCase().includes(q)) hits.push({ c, label: `${c.num === 'A' || c.num === 'B' || c.num === 'C' ? 'Appendix' : 'Chapter'} ${c.num}: ${c.title}`, href: `#/c/${c.id}` });
        c.learn.forEach((s, i) => { if ((s.t + ' ' + s.p.join(' ') + ' ' + (s.key || []).join(' ')).toLowerCase().includes(q)) hits.push({ c, label: s.t, sub: `${c.num} · ${c.short}`, href: `#/c/${c.id}/learn/${i}` }); });
      });
      COURSE.decks.forEach(d => d.terms.forEach(t => { const x = COURSE.terms[t]; if (!hits.some(h => h.href.endsWith('/' + t)) && (x.t + ' ' + x.d).toLowerCase().includes(q)) hits.push({ c: { part: 'c', icon: d.kind === 'linux' ? 'penguin' : 'course' }, label: x.t, sub: d.kind === 'linux' ? `Linux · ${d.title}` : `NST 115 · Chapter ${d.num}: ${d.sub}`, href: `${d.kind === 'linux' ? '#/linux' : '#/course'}/${d.id}/sheet/${t}` }); }));
      body = `<h2 class="st-h">Best matches</h2>${hits.length ? `<ul class="st-res">${hits.slice(0, 12).map(h => `<li><a href="${h.href}"><span class="st-ic sm part${h.c.part}">${icon(h.c.icon)}</span><span><b>${esc(h.label)}</b>${h.sub ? `<small>${esc(h.sub)}</small>` : ''}</span></a></li>`).join('')}</ul>` : '<p class="muted st-none">No topics match. Try a tool name like "BitLocker" or "ipconfig".</p>'}`;
    }
    return body;
  }
  function openStart() {
    start.innerHTML = `<div class="st-search">${icon('search')}<input id="stq" type="search" placeholder="Search topics, tools and commands" aria-label="Search topics" autocomplete="off"></div><div id="stbody">${startHTML('')}</div><div class="st-foot">${tierChip(rank().idx)}<span>${esc(rank().name)} · ${certsEarned()} of ${CH.length} certifications</span></div>`;
    start.hidden = false; startBtn.setAttribute('aria-expanded', 'true'); startBtn.classList.add('on');
    const q = $('#stq'); q.focus();
    q.addEventListener('input', () => { $('#stbody').innerHTML = startHTML(q.value); });
    q.addEventListener('keydown', e => { if (e.key === 'Enter') { const a = $('#stbody a'); if (a) a.click(); } });
  }
  function closeStart() { if (start.hidden) return; start.hidden = true; startBtn.setAttribute('aria-expanded', 'false'); startBtn.classList.remove('on'); }
  startBtn.addEventListener('click', e => { e.stopPropagation(); start.hidden ? openStart() : (closeStart(), startBtn.focus()); });
  start.addEventListener('click', e => { if (e.target.closest('a')) closeStart(); });
  document.addEventListener('click', e => { if (!start.hidden && !start.contains(e.target) && e.target !== startBtn) closeStart(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !start.hidden) { closeStart(); startBtn.focus(); }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); start.hidden ? openStart() : closeStart(); }
  });

  /* ---------- router ---------- */
  let view = null; // per-view state for keyboard handling
  function route() {
    closeStart();
    const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    view = null;
    $$('.taskbar [data-nav]').forEach(a => a.classList.toggle('on', a.dataset.nav === (parts[0] || 'home')));
    if (parts[0] === 'c' && W.byId(parts[1])) chapterView(W.byId(parts[1]), parts[2] || 'learn', parts[3]);
    else if (parts[0] === 'review') reviewView(parts[1] || 'cards');
    else if (parts[0] === 'rush') rushView();
    else if (parts[0] === 'progress') progressView();
    else if (parts[0] === 'course') courseView(parts[1], parts[2], parts[3]);
    else if (parts[0] === 'linux') parts[1] ? courseView(parts[1], parts[2], parts[3]) : linuxHome();
    else homeView();
    renderTray();
    if (!(['c', 'course', 'linux'].includes(parts[0]) && parts[3] !== undefined)) app.scrollTop = 0;
    app.focus({ preventScroll: true });
  }
  window.addEventListener('hashchange', route);

  /* ---------- home ---------- */
  function nextStep() {
    for (const c of CH) {
      const s = stats(c);
      if (s.read < 1) return { c, mode: 'learn', label: 'Learn' };
      if (s.belt < 80) {
        if (s.practice < 1) return { c, mode: 'practice', label: 'Help desk practice' };
        if (s.drills !== null && s.drills < 1) return { c, mode: 'run', label: 'Run drills' };
        return { c, mode: 'exam', label: 'Certification exam' };
      }
    }
    return null;
  }
  function homeView() {
    setTitle('Tier One', 'logo');
    const r = rank(), due = allDue(), missed = Object.keys(S.missed).length, nx = nextStep();
    const partsHTML = [1, 2, 3, 4].map(p => `<section class="part"><h2 class="part-h">${esc(W.parts[p])}</h2><div class="tiles">${CH.filter(c => c.part === p).map(c => { const s = stats(c); return `<a class="tile" href="#/c/${c.id}"><span class="tile-ic part${p}">${icon(c.icon)}</span><span class="tile-txt"><small>${/[A-C]/.test(c.num) ? 'Appendix' : 'Chapter'} ${esc(c.num)}</small><b>${esc(c.short)}</b></span>${s.belt >= 80 ? `<span class="stamp" title="Certified (${s.belt}%)">${icon('cert')}</span>` : ''}${ring(s.pct, `${c.short}: ${s.pct}% complete`)}</a>`; }).join('')}</div></section>`).join('');
    app.innerHTML = `<div class="pad home">
      <section class="hero">
        <div class="hero-txt">
          <p class="eyebrow">Windows 11, chapter by chapter</p>
          <h2 class="hero-h">Start at the help desk. Work your way up.</h2>
          <p class="lead">Every chapter is a ticket queue: learn it, drill the commands, work the tickets, then pass the certification exam. Each certification moves you up the support ladder from Trainee to IT Lead. Hints point you to the answer. They never just hand it over.</p>
          <div class="hero-act">${nx ? `<a class="btn primary" href="#/c/${nx.c.id}/${nx.mode}">${icon('arrow')}Continue: ${esc(nx.c.num)} · ${esc(nx.label)}</a>` : `<a class="btn primary" href="#/rush">${icon('rush')}Fully certified! Try Run Rush</a>`}<button class="btn" type="button" data-act="openstart">${icon('search')}Find a topic</button></div>
        </div>
        <div class="rankcard">
          ${idBadge(r)}
          <p class="muted">${r.next ? `${plural(r.next[1] - r.n, 'certification')} to ${r.next[0]}` : 'Top of the ladder'}</p>
          <div class="statrow"><span><b>${S.xp.toLocaleString()}</b><small>XP</small></span><span><b>${streakNow()}</b><small>day streak</small></span><span><b>${r.n}/${CH.length}</b><small>certified</small></span></div>
        </div>
      </section>
      <a class="coursebanner" href="#/course">${icon('course')}<span><b>NST 115 exam prep</b><small>Quiz and unit exam reviews combined, chapter by chapter</small></span><span class="cb-go">Open ${icon('arrow')}</span></a>
      <section class="today" aria-label="Today">
        <a class="todo" href="#/review/cards">${icon('cards')}<span><b>${due ? plural(due, 'card') + ' due' : 'No cards due'}</b><small>${due ? 'Spaced review keeps it in long-term memory' : 'Cards join your review once you start a lesson'}</small></span></a>
        <a class="todo" href="#/review/reopened">${icon('ticket')}<span><b>${missed ? plural(missed, 'reopened ticket') : 'No reopened tickets'}</b><small>Anything you miss reopens here until you solve it first try</small></span></a>
        <a class="todo" href="#/rush">${icon('rush')}<span><b>Run Rush${S.rush ? ` · best ${S.rush}` : ''}</b><small>60 seconds, every command you know</small></span></a>
      </section>
      <section class="how" aria-label="How each chapter works">
        <div>${icon('learn')}<b>Learn</b><small>Short lessons with a think-first question and a "lock it in" summary to self-test</small></div>
        <div>${icon('cards')}<b>Remember</b><small>Flashcards return just before you'd forget them</small></div>
        <div>${icon('run')}<b>Drill</b><small>Type real commands into a Run box, with hints only</small></div>
        <div>${icon('ticket')}<b>Solve</b><small>Help desk tickets explain why a wrong choice misses</small></div>
        <div>${icon('cert')}<b>Get certified</b><small>Score 80% on the certification exam to move up the ladder</small></div>
      </section>
      ${partsHTML}
      <p class="fine">Lessons are original study notes that follow the chapter outline of <i>Windows 11 Inside Out</i> (Ed Bott, Microsoft Press, 2023), written for version 22H2. Use them alongside the book. Tier One isn't affiliated with Microsoft or Pearson. Progress is saved only in this browser.</p>
    </div>`;
  }

  /* ---------- chapter shell ---------- */
  const MODES = [['learn', 'Learn', 'learn'], ['cards', 'Flashcards', 'cards'], ['run', 'Run drills', 'run'], ['practice', 'Help desk practice', 'ticket'], ['exam', 'Certification', 'cert']];
  function chapterView(c, mode, arg) {
    if (!MODES.some(m => m[0] === mode)) mode = 'learn';
    const label = /[A-C]/.test(c.num) ? 'Appendix' : 'Chapter';
    setTitle(`${label} ${c.num}: ${c.short}`, c.icon);
    const s = stats(c), dueN = dueCards(c).length;
    const counts = { learn: `${(S.read[c.id] || []).length}/${c.learn.length}`, cards: dueN ? `${dueN} due` : '', run: c.run.length ? `${c.run.filter((_, i) => S.drills[`${c.id}:${i}`]).length}/${c.run.length}` : '', practice: `${c.quiz.filter((_, i) => S.practice[`${c.id}:${i}`]).length}/${c.quiz.length}`, exam: s.belt >= 80 ? 'Certified' : s.belt ? `${s.belt}%` : '' };
    const idx = CH.indexOf(c), prev = CH[idx - 1], next = CH[idx + 1];
    app.innerHTML = `<div class="chap">
      <nav class="cnav" aria-label="Chapter sections">
        <div class="cnav-head"><span class="cnav-ic part${c.part}">${icon(c.icon)}</span><div><small>${label} ${esc(c.num)}</small><b>${esc(c.title)}</b></div></div>
        <ul class="modes">${MODES.filter(m => m[0] !== 'run' || c.run.length).map(m => `<li><a href="#/c/${c.id}/${m[0]}" class="${m[0] === mode ? 'on' : ''}" ${m[0] === mode ? 'aria-current="page"' : ''}>${icon(m[2])}<span>${m[1]}</span>${counts[m[0]] ? `<em>${counts[m[0]]}</em>` : ''}</a></li>`).join('')}</ul>
        ${mode === 'learn' ? `<ol class="secs">${c.learn.map((x, i) => `<li><a href="#/c/${c.id}/learn/${i}" class="${(S.read[c.id] || []).includes(i) ? 'done' : ''}">${esc(x.t)}</a></li>`).join('')}</ol>` : ''}
        <div class="cnav-foot">${prev ? `<a href="#/c/${prev.id}" title="${esc(prev.title)}">${icon('back')}${esc(prev.num)}</a>` : '<span></span>'}${next ? `<a href="#/c/${next.id}" title="${esc(next.title)}">${esc(next.num)}${icon('arrow')}</a>` : ''}</div>
      </nav>
      <div class="cbody" id="cbody"></div>
    </div>`;
    const body = $('#cbody');
    ({ learn: learnMode, cards: cardsMode, run: runMode, practice: practiceMode, exam: examMode })[mode](c, body, arg);
  }

  /* ---------- Learn ---------- */
  function learnMode(c, body, arg) {
    const read = S.read[c.id] || [];
    body.innerHTML = `<div class="pad">
      <p class="lead">${esc(c.blurb)}</p>
      <div class="recall-bar"><label class="switch"><input type="checkbox" id="recall"><span></span>Recall mode</label><small class="muted">Cover every "Lock it in" line, say it from memory, then tap to check.</small></div>
      ${c.learn.map((x, i) => `<article class="sec card" id="s${i}" tabindex="-1">
        <h2><span class="secnum">${i + 1}</span>${esc(x.t)}</h2>
        ${x.q ? `<div class="think">${icon('bulb')}<p><b>Think first:</b> ${md(x.q)}</p></div>` : ''}
        <div class="prose">${paras(x.p)}</div>
        ${x.trap ? `<div class="trap"><b>Common trap</b><p>${md(x.trap)}</p></div>` : ''}
        ${x.key && x.key.length ? `<div class="lock"><h3>${icon('check')}Lock it in</h3><ul>${x.key.map(k => `<li><button type="button" class="lockline" data-act="reveal"><span class="lk-txt">${md(k)}</span><span class="lk-cover">Say it from memory, then tap to check</span></button></li>`).join('')}</ul></div>` : ''}
        <div class="sec-foot">${read.includes(i) ? `<span class="done-pill">${icon('check')}Learned</span>` : `<button class="btn" type="button" data-act="learned" data-i="${i}">${icon('check')}I've got this section</button>`}</div>
      </article>`).join('')}
      <div class="nextbar"><span class="muted">Ready to make it stick?</span><a class="btn primary" href="#/c/${c.id}/cards">${icon('cards')}Flashcards</a></div>
    </div>`;
    const sync = () => $$('.lockline', body).forEach(b => b.classList.toggle('covered', $('#recall').checked && !b.dataset.shown));
    $('#recall').addEventListener('change', () => { $$('.lockline', body).forEach(b => delete b.dataset.shown); sync(); });
    body.addEventListener('click', e => {
      const b = e.target.closest('[data-act]'); if (!b) return;
      if (b.dataset.act === 'reveal') { b.dataset.shown = '1'; b.classList.remove('covered'); }
      if (b.dataset.act === 'learned') {
        const i = +b.dataset.i; S.read[c.id] = Array.from(new Set([...(S.read[c.id] || []), i])); addXP(5, 'section learned');
        b.outerHTML = `<span class="done-pill">${icon('check')}Learned</span>`;
        const nav = $(`.secs a[href$="/learn/${i}"]`); if (nav) nav.classList.add('done');
        const m = $('.modes a[href$="/learn"] em'); if (m) m.textContent = `${S.read[c.id].length}/${c.learn.length}`;
      }
    });
    if (arg !== undefined) { const t = $(`#s${+arg}`); if (t) { t.scrollIntoView({ block: 'start' }); t.focus({ preventScroll: true }); } }
  }

  /* ---------- Flashcards (shared with Review) ---------- */
  function flashDeck(host, keys, opts) {
    // keys: [{c, i}]; opts: {cram, empty}
    let q = keys.slice(), cur = null, flipped = false, done = 0;
    function draw() {
      if (!q.length) { host.innerHTML = opts.empty(done); return; }
      cur = q[0]; flipped = false;
      const [front, back] = cur.c.cards[cur.i], st = cardState(cardKey(cur.c, cur.i));
      host.innerHTML = `<div class="deckbar"><span>${plural(q.length, 'card')} left${opts.cram ? ' · practice round (schedule unchanged)' : ''}</span>${opts.showChapter ? `<a href="#/c/${cur.c.id}" class="chip">${esc(cur.c.num)} · ${esc(cur.c.short)}</a>` : ''}<span class="boxes" title="Memory box ${st.box} of 6">${[1, 2, 3, 4, 5, 6].map(b => `<i class="${st.box >= b ? 'on' : ''}"></i>`).join('')}</span></div>
        <div class="flash" id="flash"><div class="face front"><small>Prompt</small><p>${md(front)}</p></div><div class="face back" hidden><small>Answer</small><p>${md(back)}</p></div></div>
        <div class="flash-act" id="fact"><p class="muted">Say your answer out loud first.</p><button class="btn primary" type="button" data-act="flip">${icon('eye')}Flip card <kbd>Space</kbd></button></div>`;
    }
    function flip() {
      if (flipped || !cur) return; flipped = true;
      $('.face.back', host).hidden = false; $('#flash', host).classList.add('flipped');
      $('#fact', host).innerHTML = `<p class="muted">How did you do? Be honest; the schedule depends on it.</p><div class="rate"><button class="btn bad" type="button" data-act="rate" data-r="0">Forgot <kbd>1</kbd></button><button class="btn mid" type="button" data-act="rate" data-r="1">Shaky <kbd>2</kbd></button><button class="btn good" type="button" data-act="rate" data-r="2">Knew it <kbd>3</kbd></button></div>`;
      $('[data-r="2"]', host).focus();
    }
    function rate(r) {
      if (!flipped) return;
      const k = cardKey(cur.c, cur.i), st = Object.assign({}, cardState(k));
      q.shift();
      if (!opts.cram) {
        if (r === 0) { st.box = 0; st.due = today(); q.splice(Math.min(3, q.length), 0, cur); }
        else if (r === 1) { st.box = Math.max(1, st.box); st.due = today() + 1; }
        else { st.box = Math.min(6, st.box + 1); st.due = today() + INTERVALS[st.box]; }
        st.seen = true; S.cards[k] = st;
      } else if (r === 0) q.push(cur);
      done++; addXP(r === 2 ? 3 : 1);
      draw();
    }
    host.onclick = e => { const b = e.target.closest('[data-act]'); if (!b) { if (e.target.closest('#flash')) flip(); return; } if (b.dataset.act === 'flip') flip(); if (b.dataset.act === 'rate') rate(+b.dataset.r); if (b.dataset.act === 'cram') { q = shuffle(keys.length ? keys : opts.all()); opts.cram = true; draw(); } };
    view = { key: e => { if (e.key === ' ' && !flipped) { e.preventDefault(); flip(); } else if (flipped && ['1', '2', '3'].includes(e.key)) rate(+e.key - 1); } };
    draw();
  }
  function cardsMode(c, body) {
    const keys = c.cards.map((_, i) => ({ c, i })).filter(k => isDue(cardKey(c, k.i)));  // here unseen cards are always in
    const mastered = c.cards.filter((_, i) => cardState(cardKey(c, i)).box >= 3).length;
    body.innerHTML = `<div class="pad"><div class="mode-head"><h2>Flashcards</h2><p class="muted">${plural(c.cards.length, 'card')} · ${mastered} mastered (box 3+). <b>Forgot</b> brings a card back this session, <b>Shaky</b> tomorrow, and <b>Knew it</b> moves it up a box (1, 3, 7, 14, 30, then 60 days).</p></div><div id="deck"></div></div>`;
    flashDeck($('#deck'), keys, { all: () => c.cards.map((_, i) => ({ c, i })), empty: n => `<div class="empty card">${icon('check')}<h3>${n ? 'Session complete' : 'Nothing due in this chapter'}</h3><p class="muted">Cards come back on their own schedule. Want extra practice now? A practice round won't change the schedule.</p><div class="row"><button class="btn" type="button" data-act="cram">Practice round</button>${c.run.length ? `<a class="btn primary" href="#/c/${c.id}/run">${icon('run')}Run drills</a>` : `<a class="btn primary" href="#/c/${c.id}/practice">${icon('ticket')}Help desk practice</a>`}</div></div>` });
  }

  /* ---------- Run drills ---------- */
  const norm = s => String(s).toLowerCase().replace(/[‘’“”]/g, m => (m === '“' || m === '”' ? '"' : "'")).replace(/\s+/g, ' ').replace(/\s*([|>])\s*/g, '$1').trim()
    .replace(/^(\S+?)\.exe(?=\s|$)/, '$1').replace(/[\\;]+$/, '');
  const answers = r => (Array.isArray(r[1]) ? r[1] : r[1].split('|')).map(norm);
  const isRight = (r, typed) => answers(r).includes(norm(typed));
  function runBox(c, r, hintsAllowed) {
    return `<div class="rundlg card" role="group" aria-label="Run dialog">
      <div class="run-top">${icon('run', 'run-ic')}<p>${md(r[0])}</p></div>
      <form class="run-form" data-act="runsubmit" autocomplete="off"><label for="runin">Open:</label><input id="runin" class="mono" type="text" spellcheck="false" autocapitalize="off" autocorrect="off" aria-describedby="runfb"><button class="btn primary" type="submit">OK</button></form>
      <div id="runfb" class="fb" aria-live="polite"></div>
      ${hintsAllowed ? '<div class="row run-row"><button class="btn" type="button" data-act="hint">' + icon('bulb') + 'Hint</button><button class="btn ghost" type="button" data-act="skip">Skip for now</button></div>' : ''}
    </div>`;
  }
  function runMode(c, body) {
    if (!c.run.length) { location.hash = `#/c/${c.id}/practice`; return; }
    let order = c.run.map((_, i) => i).filter(i => !S.drills[`${c.id}:${i}`]);
    if (!order.length) order = c.run.map((_, i) => i);
    let pos = 0, hints = 0, wrong = 0, solved = 0;
    const head = `<div class="mode-head"><h2>Run drills</h2><p class="muted">Type the command you'd use in the Run box (Windows key+R) or a terminal. Capitals don't matter. Hints narrow it down, but nobody types it for you.</p></div>`;
    function draw() {
      if (pos >= order.length) {
        const total = c.run.filter((_, i) => S.drills[`${c.id}:${i}`]).length;
        body.innerHTML = `<div class="pad">${head}<div class="empty card">${icon('check')}<h3>${total}/${c.run.length} commands mastered</h3><p class="muted">${total === c.run.length ? 'Every command in this chapter is yours. Try them again in Run Rush.' : 'Skipped ones are waiting. Reread the lesson, then come back.'}</p><div class="row"><button class="btn" type="button" data-act="again">Run them again</button><a class="btn primary" href="#/c/${c.id}/practice">${icon('ticket')}Help desk practice</a></div></div></div>`;
        return;
      }
      const i = order[pos]; hints = 0; wrong = 0;
      body.innerHTML = `<div class="pad">${head}<div class="dots" aria-label="Drill ${pos + 1} of ${order.length}">${order.map((_, k) => `<i class="${k < pos ? 'on' : k === pos ? 'cur' : ''}"></i>`).join('')}</div>${runBox(c, c.run[i], true)}</div>`;
      $('#runin').focus();
    }
    body.onclick = e => {
      const b = e.target.closest('[data-act]'); if (!b) return;
      const i = order[pos], r = c.run[i];
      if (b.dataset.act === 'hint') {
        hints = Math.min(2, hints + 1);
        $('#runfb').innerHTML = `<div class="hint">${icon('bulb')}<p><b>Hint ${hints}:</b> ${md(r[1 + hints])}</p></div>${hints === 2 ? '<p class="muted small">That\'s every hint. Still stuck? Skip it and reread the lesson. It will be here when you get back.</p>' : ''}`;
        if (hints === 2) b.disabled = true;
        $('#runin').focus();
      }
      if (b.dataset.act === 'skip') { order.push(order.splice(pos, 1)[0]); if (order.length - pos <= 1 && order.slice(pos).every(x => x === i)) pos++; draw(); }
      if (b.dataset.act === 'next') { pos++; draw(); }
      if (b.dataset.act === 'again') { order = c.run.map((_, k) => k); pos = 0; draw(); }
    };
    body.onsubmit = e => {
      e.preventDefault();
      const i = order[pos], r = c.run[i], inp = $('#runin'), val = inp.value;
      if (!val.trim()) return;
      if (isRight(r, val)) {
        const first = !wrong && !hints, k = `${c.id}:${i}`;
        const fresh = !S.drills[k]; S.drills[k] = first ? 'first' : (S.drills[k] || 'retry');
        inp.readOnly = true; inp.classList.add('ok');
        $('#runfb').innerHTML = `<div class="good-fb">${icon('check')}<p><b>That opens it.</b> ${first ? 'First try, no hints.' : 'Nice persistence.'}</p></div>`;
        $('.run-row', body).innerHTML = `<button class="btn primary" type="button" data-act="next">Next ${icon('arrow')}</button>`;
        $('[data-act="next"]', body).focus();
        addXP(fresh ? (first ? 10 : 5) : 2);
      } else {
        wrong++; inp.classList.remove('shake'); void inp.offsetWidth; inp.classList.add('shake');
        $('#runfb').innerHTML = `<div class="bad-fb">${icon('x')}<p><b>Windows can't find "${esc(val.trim())}".</b> ${wrong >= 2 && hints < 2 ? 'Try a hint.' : 'Check the spelling and the switches.'}</p></div>`;
        inp.select();
      }
    };
    draw();
  }

  /* ---------- Help desk practice (shared with Reopened tickets) ---------- */
  function ticketHTML(c, qi, opts) {
    const q = c.quiz[qi], ord = opts.order;
    const tag = q[6] ? `<span class="tk-tag">${icon('ticket')}Ticket ${esc(c.num)}-${String(qi + 1).padStart(3, '0')}</span>` : `<span class="tk-tag plain">Question ${opts.n}</span>`;
    return `<div class="ticket card ${q[6] ? 'is-ticket' : ''}">
      <div class="tk-head">${tag}${opts.showChapter ? `<a class="chip" href="#/c/${c.id}">${esc(c.num)} · ${esc(c.short)}</a>` : ''}</div>
      <h3 class="tk-q">${md(q[0])}</h3>
      <div class="opts" role="group" aria-label="Answer choices">${ord.map((oi, k) => `<button type="button" class="opt" data-act="pick" data-o="${oi}"><kbd>${k + 1}</kbd><span>${md(q[1][oi])}</span></button>`).join('')}</div>
      <div class="fb" id="tkfb" aria-live="polite"></div>
      <div class="row tk-row">${opts.noHints ? '' : `<button class="btn" type="button" data-act="thint">${icon('bulb')}Hint</button>`}</div>
    </div>`;
  }
  function practiceRunner(host, items, opts) {
    // items: [{c, qi}]
    let pos = 0, wrong = 0, solvedNow = false, order = [];
    function draw() {
      if (pos >= items.length) { host.innerHTML = opts.done(); return; }
      const { c, qi } = items[pos]; wrong = 0; solvedNow = false; order = shuffle(c.quiz[qi][1].map((_, i) => i));
      host.innerHTML = `<div class="dots">${items.map((_, k) => `<i class="${k < pos ? 'on' : k === pos ? 'cur' : ''}"></i>`).join('')}</div>${ticketHTML(c, qi, { order, n: pos + 1, showChapter: opts.showChapter })}`;
    }
    function pick(oi, btn) {
      if (solvedNow || btn.disabled) return;
      const { c, qi } = items[pos], q = c.quiz[qi], k = `${c.id}:${qi}`;
      if (oi === q[2]) {
        solvedNow = true; btn.classList.add('right');
        $$('.opt', host).forEach(o => { o.disabled = true; });
        const first = !wrong, fresh = !S.practice[k];
        S.practice[k] = first ? 'first' : (S.practice[k] || 'retry');
        if (first && opts.rematch) delete S.missed[k];
        $('#tkfb', host).innerHTML = `<div class="good-fb">${icon('check')}<p><b>${q[6] ? 'Ticket resolved.' : 'Correct.'}</b> ${first ? 'Solved on the first try.' : 'You found it.'}${opts.rematch && !first ? ' It stays reopened until you solve it on the first try.' : ''}</p></div>`;
        $('.tk-row', host).innerHTML = `<button class="btn primary" type="button" data-act="tnext">Next ${icon('arrow')}</button>`;
        $('[data-act="tnext"]', host).focus();
        addXP(fresh ? (first ? 10 : 4) : (first ? 3 : 1));
      } else {
        wrong++; btn.classList.add('wrong'); btn.disabled = true;
        S.missed[k] = true; save();
        const sec = c.learn[q[4]];
        $('#tkfb', host).innerHTML = `<div class="bad-fb">${icon('x')}<p><b>Not this one.</b> ${md(q[5][oi] || 'That doesn\'t fit this situation.')}</p></div><p class="reread">${icon('learn')}Reread: <a href="#/c/${c.id}/learn/${q[4]}">${esc(sec.t)}</a></p>`;
      }
    }
    host.onclick = e => {
      const b = e.target.closest('[data-act]'); if (!b) return;
      if (b.dataset.act === 'pick') pick(+b.dataset.o, b);
      if (b.dataset.act === 'thint') { const { c, qi } = items[pos]; $('#tkfb', host).insertAdjacentHTML('beforeend', `<div class="hint">${icon('bulb')}<p><b>Hint:</b> ${md(c.quiz[qi][3])}</p></div>`); b.disabled = true; }
      if (b.dataset.act === 'tnext') { pos++; draw(); }
      if (b.dataset.act === 'restart') { items = shuffle(items); pos = 0; draw(); }
    };
    view = { key: e => { const n = +e.key; if (n >= 1 && n <= 4 && !solvedNow) { const b = $$('.opt', host)[n - 1]; if (b) pick(+b.dataset.o, b); } } };
    draw();
  }
  function practiceMode(c, body) {
    body.innerHTML = `<div class="pad"><div class="mode-head"><h2>Help desk practice</h2><p class="muted">Real-world tickets and questions. A wrong pick tells you <i>why</i> it misses and which section to reread, never which one is right. Keys 1 to 4 pick an answer.</p></div><div id="prac"></div></div>`;
    const items = shuffle(c.quiz.map((_, qi) => ({ c, qi })));
    practiceRunner($('#prac'), items, { done: () => { const n = c.quiz.filter((_, i) => S.practice[`${c.id}:${i}`] === 'first').length; return `<div class="empty card">${icon('ticket')}<h3>Queue cleared</h3><p class="muted">${n}/${c.quiz.length} solved on the first try${n === c.quiz.length ? '. You\'re ready for the certification exam.' : '. Missed tickets reopen in Review.'}</p><div class="row"><button class="btn" type="button" data-act="restart">Shuffle and go again</button><a class="btn primary" href="#/c/${c.id}/exam">${icon('cert')}Certification exam</a></div></div>`; } });
  }

  /* ---------- Certification exam ---------- */
  function examMode(c, body) {
    const best = S.belts[c.id] || 0;
    const drills = shuffle(c.run.map((_, i) => i)).slice(0, 3);
    body.innerHTML = `<div class="pad"><div class="mode-head"><h2>Certification exam</h2></div><div class="card belt-intro">
      ${seal(best >= 80)}
      <div><p><b>${c.quiz.length} questions${drills.length ? ` + ${plural(drills.length, 'command')}` : ''}.</b> No hints and no feedback until the end. Score <b>80%</b> to get certified in this chapter.</p>
      <p class="muted">${best ? `Best score: ${best}%${best >= 80 ? ' · certified' : ''}.` : 'Not attempted yet.'} Missed items show the section to reread, not the answer.</p>
      <button class="btn primary" type="button" id="beltgo">${icon('cert')}Start the exam</button></div></div></div>`;
    $('#beltgo').onclick = () => {
      const items = shuffle(c.quiz.map((_, qi) => ({ t: 'q', qi }))).concat(drills.map(ri => ({ t: 'r', ri })));
      let pos = 0; const results = [];
      function draw() {
        if (pos >= items.length) return finish();
        const it = items[pos];
        const top = `<div class="pad"><div class="mode-head"><h2>Certification exam</h2><p class="muted">${pos + 1} of ${items.length}</p></div><div class="dots">${items.map((_, k) => `<i class="${k < pos ? 'on' : k === pos ? 'cur' : ''}"></i>`).join('')}</div>`;
        if (it.t === 'q') {
          body.innerHTML = top + ticketHTML(c, it.qi, { order: shuffle(c.quiz[it.qi][1].map((_, i) => i)), n: pos + 1, noHints: true }) + '</div>';
          view = { key: e => { const n = +e.key; const b = $$('.opt', body)[n - 1]; if (n >= 1 && b) b.click(); } };
        } else {
          body.innerHTML = top + runBox(c, c.run[it.ri], false) + '</div>';
          view = null; $('#runin').focus();
        }
      }
      body.onclick = e => { const b = e.target.closest('[data-act="pick"]'); if (!b) return; const it = items[pos]; results.push({ it, ok: +b.dataset.o === c.quiz[it.qi][2] }); pos++; draw(); };
      body.onsubmit = e => { e.preventDefault(); const v = $('#runin').value; if (!v.trim()) return; const it = items[pos]; results.push({ it, ok: isRight(c.run[it.ri], v) }); pos++; draw(); };
      function finish() {
        view = null;
        const score = Math.round(results.filter(r => r.ok).length / results.length * 100), pass = score >= 80, firstPass = pass && (S.belts[c.id] || 0) < 80;
        S.belts[c.id] = Math.max(S.belts[c.id] || 0, score);
        results.forEach(r => { if (!r.ok && r.it.t === 'q') S.missed[`${c.id}:${r.it.qi}`] = true; });
        save();
        if (firstPass) addXP(50, 'certified'); else addXP(5);
        const missed = results.filter(r => !r.ok);
        body.innerHTML = `<div class="pad"><div class="mode-head"><h2>Exam results</h2></div>
          <div class="card result ${pass ? 'pass' : 'fail'}">
            ${seal(pass, pass ? 'stampin' : '')}
            <div><p class="score">${score}%</p><p><b>${pass ? (firstPass ? `${/[A-C]/.test(c.num) ? 'Appendix' : 'Chapter'} ${esc(c.num)}: certified!${rank().n === RANKS.find(x => x[0] === rank().name)[1] && rank().idx > 0 ? ` Promoted to ${rank().name}.` : ''}` : 'Passed again. Still certified.') : 'Not yet. You need 80%.'}</b></p><p class="muted">${results.length - missed.length} of ${results.length} correct${pass ? '' : '. Review the sections below, practice, and try again.'}</p></div>
          </div>
          ${missed.length ? `<div class="card missed"><h3>Review these</h3><ul>${missed.map(r => r.it.t === 'q' ? `<li><p>${md(c.quiz[r.it.qi][0])}</p><p class="hint-line">${icon('bulb')}${md(c.quiz[r.it.qi][3])}</p><a href="#/c/${c.id}/learn/${c.quiz[r.it.qi][4]}">${icon('learn')}Reread: ${esc(c.learn[c.quiz[r.it.qi][4]].t)}</a></li>` : `<li><p>Command: ${md(c.run[r.it.ri][0])}</p><p class="hint-line">${icon('bulb')}${md(c.run[r.it.ri][2])}</p><a href="#/c/${c.id}/run">${icon('run')}Practice in Run drills</a></li>`).join('')}</ul></div>` : ''}
          <div class="row"><a class="btn" href="#/c/${c.id}/exam" data-act="retake">Retake</a>${pass && CH[CH.indexOf(c) + 1] ? `<a class="btn primary" href="#/c/${CH[CH.indexOf(c) + 1].id}">Next chapter ${icon('arrow')}</a>` : `<a class="btn primary" href="#/c/${c.id}/practice">${icon('ticket')}Practice</a>`}</div></div>`;
        const rt = $('[data-act="retake"]', body); rt.onclick = e => { e.preventDefault(); route(); };
      }
      draw();
    };
  }

  /* ---------- Review ---------- */
  function reviewView(tab) {
    setTitle('Review', 'review');
    const due = allDue(), missed = Object.keys(S.missed).filter(k => { const [id, qi] = k.split(':'); const c = W.byId(id); return c && c.quiz[+qi]; });
    app.innerHTML = `<div class="pad"><div class="mode-head"><h2>Review</h2><p class="muted">Due flashcards from every chapter, and every ticket you've missed, reopened until you solve it first try.</p></div>
      <div class="pivot" role="tablist"><a role="tab" href="#/review/cards" class="${tab === 'cards' ? 'on' : ''}" aria-selected="${tab === 'cards'}">${icon('cards')}Due cards <em>${due}</em></a><a role="tab" href="#/review/reopened" class="${tab === 'reopened' ? 'on' : ''}" aria-selected="${tab === 'reopened'}">${icon('ticket')}Reopened tickets <em>${missed.length}</em></a></div>
      <div id="rv"></div></div>`;
    const host = $('#rv');
    if (tab === 'reopened') {
      if (!missed.length) { host.innerHTML = `<div class="empty card">${icon('check')}<h3>No reopened tickets</h3><p class="muted">Questions you get wrong in practice or a certification exam reopen here until you answer them right on the first try.</p></div>`; return; }
      const items = shuffle(missed.map(k => { const [id, qi] = k.split(':'); return { c: W.byId(id), qi: +qi }; }));
      practiceRunner(host, items, { showChapter: true, rematch: true, done: () => `<div class="empty card">${icon('ticket')}<h3>Reopened queue worked</h3><p class="muted">${Object.keys(S.missed).length ? plural(Object.keys(S.missed).length, 'question') + ' still to beat on the first try.' : 'All cleared.'}</p><div class="row"><a class="btn primary" href="#/review/reopened" data-act="again2">Go again</a></div></div>` });
      host.addEventListener('click', e => { if (e.target.closest('[data-act="again2"]')) { e.preventDefault(); route(); } });
    } else {
      const keys = shuffle(CH.flatMap(c => c.cards.map((_, i) => ({ c, i })).filter(k => isDue(cardKey(c, k.i), c)))).slice(0, 40);
      flashDeck(host, keys, { showChapter: true, all: () => shuffle(CH.flatMap(c => c.cards.map((_, i) => ({ c, i })))).slice(0, 20), empty: n => `<div class="empty card">${icon('check')}<h3>${n ? 'All caught up' : 'No cards due'}</h3><p class="muted">Come back tomorrow, or run a 20-card practice round from every chapter.</p><div class="row"><button class="btn" type="button" data-act="cram">Practice round</button></div></div>` });
    }
  }

  /* ---------- Run Rush ---------- */
  function rushView() {
    setTitle('Run Rush', 'rush');
    const pool = CH.flatMap(c => c.run.map((r, i) => ({ c, r, i })));
    app.innerHTML = `<div class="pad"><div class="mode-head"><h2>Run Rush</h2><p class="muted">60 seconds. Commands from every chapter. Type each one and press Enter. Skip with the button or Esc. No hints. Best: <b>${S.rush}</b></p></div>
      <div class="card rush-intro"><p>${plural(pool.length, 'command')} in the pool. Missed ones come back as a list of chapters to drill, not answers.</p><button class="btn primary" type="button" id="rushgo">${icon('rush')}Start the clock</button></div></div>`;
    $('#rushgo').onclick = () => {
      const deck = shuffle(pool); let pos = 0, score = 0, left = 60; const skipped = [];
      const end = Date.now() + 60000;
      app.innerHTML = `<div class="pad"><div class="rush-bar"><span class="timer" id="timer">60</span><span>Score <b id="rscore">0</b></span></div><div id="rbox"></div></div>`;
      const draw = () => {
        const d = deck[pos % deck.length];
        $('#rbox').innerHTML = `<div class="rundlg card"><div class="run-top">${icon('run', 'run-ic')}<p>${md(d.r[0])}</p></div><form class="run-form" id="rform" autocomplete="off"><label for="runin">Open:</label><input id="runin" class="mono" type="text" spellcheck="false" autocapitalize="off"><button class="btn primary" type="submit">OK</button></form><div class="row run-row"><button class="btn ghost" type="button" id="rskip">Skip <kbd>Esc</kbd></button><a class="chip" href="#/c/${d.c.id}" tabindex="-1">${esc(d.c.num)} · ${esc(d.c.short)}</a></div></div>`;
        const inp = $('#runin'); inp.focus();
        $('#rform').onsubmit = e => { e.preventDefault(); if (isRight(d.r, inp.value)) { score++; $('#rscore').textContent = score; pos++; draw(); } else { inp.classList.remove('shake'); void inp.offsetWidth; inp.classList.add('shake'); inp.select(); } };
        $('#rskip').onclick = skip;
      };
      const skip = () => { skipped.push(deck[pos % deck.length]); pos++; draw(); };
      view = { key: e => { if (e.key === 'Escape') { e.preventDefault(); skip(); } } };
      const tick = setInterval(() => {
        if (!location.hash.startsWith('#/rush')) { clearInterval(tick); return; }
        left = Math.max(0, Math.ceil((end - Date.now()) / 1000)); $('#timer').textContent = left; $('#timer').classList.toggle('low', left <= 10);
        if (left <= 0) {
          clearInterval(tick); view = null;
          const best = score > S.rush; if (best) S.rush = score; save();
          if (score) addXP(score * 2, best ? 'new best' : '');
          const chs = Array.from(new Set(skipped.map(s => s.c)));
          app.innerHTML = `<div class="pad"><div class="mode-head"><h2>Time!</h2></div><div class="card result ${best ? 'pass' : ''}"><div><p class="score">${score}</p><p><b>${best ? 'New personal best!' : `Best: ${S.rush}`}</b></p><p class="muted">${plural(skipped.length, 'skip')}.</p></div></div>
            ${chs.length ? `<div class="card missed"><h3>Drill these chapters</h3><ul class="chiplist">${chs.map(c => `<li><a class="chip" href="#/c/${c.id}/run">${icon('run')}${esc(c.num)} · ${esc(c.short)}</a></li>`).join('')}</ul></div>` : ''}
            <div class="row"><a class="btn primary" href="#/rush" id="rushagain">${icon('rush')}Again</a></div></div>`;
          $('#rushagain').onclick = e => { e.preventDefault(); rushView(); };
        }
      }, 250);
      draw();
    };
  }

  /* ---------- Progress ---------- */
  function progressView() {
    setTitle('Progress', 'progress');
    const r = rank();
    const pctTxt = v => v === null ? '–' : `${Math.round(v * 100)}%`;
    app.innerHTML = `<div class="pad"><div class="mode-head"><h2>Progress</h2></div>
      <div class="card ladder">${idBadge(r)}<div><h3 class="ladder-h">Career ladder</h3><p class="rank-name">${esc(r.name)}</p><p class="muted">${r.next ? `${plural(r.next[1] - r.n, 'more certification')} to reach ${r.next[0]}.` : 'You made it to the top of the ladder.'}</p>
        <ol class="ranks">${RANKS.map((x, i) => `<li class="${r.n >= x[1] ? 'got' : ''}${i === r.idx ? ' cur' : ''}">${tierChip(i)}<span>${x[0]}</span><small>${x[1]} certs</small></li>`).join('')}</ol></div></div>
      <div class="statgrid"><div class="card"><b>${S.xp.toLocaleString()}</b><small>XP</small></div><div class="card"><b>${streakNow()}</b><small>day streak</small></div><div class="card"><b>${Object.values(S.cards).filter(x => x.box >= 3).length}</b><small>cards mastered</small></div><div class="card"><b>${S.rush}</b><small>Run Rush best</small></div></div>
      <div class="card tablewrap"><table class="prog"><caption class="sr">Progress by chapter</caption><thead><tr><th scope="col">Chapter</th><th scope="col">Learn</th><th scope="col">Cards</th><th scope="col">Drills</th><th scope="col">Practice</th><th scope="col">Certification</th></tr></thead><tbody>
        ${CH.map(c => { const s = stats(c); return `<tr><th scope="row"><a href="#/c/${c.id}">${esc(c.num)} · ${esc(c.short)}</a></th><td>${pctTxt(s.read)}</td><td>${pctTxt(s.cards)}</td><td>${pctTxt(s.drills)}</td><td>${pctTxt(s.practice)}</td><td>${s.belt >= 80 ? `<span class="got-belt">${icon('cert')}${s.belt}%</span>` : s.belt ? `${s.belt}%` : '–'}</td></tr>`; }).join('')}
      </tbody></table></div>
      <div class="card settings"><h3>Your data</h3><p class="muted">Progress lives only in this browser. Export it to move to another device.</p>
        <div class="row"><button class="btn" type="button" id="exp">Export progress</button><label class="btn" for="imp">Import progress</label><input id="imp" type="file" accept="application/json,.json" class="sr"><button class="btn bad" type="button" id="reset">Reset everything</button></div><p id="datamsg" class="muted" aria-live="polite"></p></div></div>`;
    $('#exp').onclick = () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' })); a.download = `tier-one-progress-${dayStr()}.json`; document.body.appendChild(a); a.click(); a.remove(); };
    $('#imp').onchange = e => { const f = e.target.files[0]; if (!f) return; f.text().then(t => { const d = JSON.parse(t); if (!d || d.v !== 1) throw new Error('bad'); S = Object.assign(blank(), d); save(); applyTheme(); progressView(); renderTray(); toast('Progress imported'); }).catch(() => { $('#datamsg').textContent = 'That file isn\'t a Tier One progress export.'; }); };
    $('#reset').onclick = e => { const b = e.currentTarget; if (!b.dataset.armed) { b.dataset.armed = '1'; b.textContent = 'Click again to erase all progress'; return; } const theme = S.theme; S = blank(); S.theme = theme; save(); progressView(); renderTray(); toast('Progress reset'); };
  }

  /* ---------- NST 115 exam prep (separate tab) ---------- */
  // Review sheets keep study answers visible (they are the lesson); the practice exam, terminal and
  // permissions drills follow the site rule: a wrong pick says what that pick really is, never which one is right.
  const CO = COURSE;
  const cS = () => (S.course = S.course || { m: {}, best: {} });
  const mastered = id => (cS().m[id] || 0) >= 2;
  const deckPct = d => Math.round(d.terms.filter(mastered).length / d.terms.length * 100);
  const srcTag = s => s === 'class' ? 'Class materials' : s === 'gen' ? 'General knowledge: check your notes' : `Book ch. ${s.slice(1)}`;
  const deckById = id => CO.decks.find(d => d.id === id);
  const base = d => d.kind === 'linux' ? '#/linux' : '#/course';
  const dIcon = d => d.kind === 'linux' ? 'penguin' : 'course';
  const onChips = id => (CO.on[id] || []).map(l => `<span class="onchip ${/Unit/.test(l) ? 'unit' : /slides/.test(l) ? 'slides' : ''}">${esc(l)}</span>`).join('');
  const DMODES = [['sheet', 'Review sheet', 'learn'], ['flash', 'Flash review', 'cards'], ['exam', 'Practice exam', 'ticket']];
  function courseView(id, mode, arg) {
    if (id === 'terminal') return terminalView();
    if (id === 'perms') return permsView();
    const d = deckById(id);
    if (!d) return courseHome();
    if (!DMODES.some(m => m[0] === mode)) mode = 'sheet';
    setTitle(`${d.kind === 'linux' ? 'Linux' : 'NST 115'} · ${d.title}`, dIcon(d));
    const best = cS().best[d.id];
    app.innerHTML = `<div class="chap">
      <nav class="cnav" aria-label="Review sections">
        <div class="cnav-head"><span class="cnav-ic ${d.kind}">${d.kind === 'chapter' ? `<span class="cnum">${d.num}</span>` : icon('penguin')}</span><div><small>${d.kind === 'chapter' ? esc((d.tests || []).join(' + ')) : 'Linux unit'}</small><b>${esc(d.kind === 'chapter' ? d.sub : `${d.title}: ${d.sub}`)}</b></div></div>
        <ul class="modes">${DMODES.map(m => `<li><a href="${base(d)}/${d.id}/${m[0]}" class="${m[0] === mode ? 'on' : ''}" ${m[0] === mode ? 'aria-current="page"' : ''}>${icon(m[2])}<span>${m[1]}</span><em>${m[0] === 'sheet' ? `${deckPct(d)}%` : m[0] === 'exam' && best !== undefined ? `best ${best}%` : ''}</em></a></li>`).join('')}
          ${d.perms ? `<li><a href="#/linux/perms">${icon('lock')}<span>Permissions trainer</span></a></li>` : ''}${d.kind === 'linux' ? `<li><a href="#/linux/terminal">${icon('term')}<span>Terminal drills</span></a></li>` : ''}</ul>
        ${mode === 'sheet' ? `<ol class="secs">${d.terms.map(t => `<li><a href="${base(d)}/${d.id}/sheet/${t}" class="${mastered(t) ? 'done' : ''}">${esc(CO.terms[t].t)}</a></li>`).join('')}</ol>` : ''}
        <div class="cnav-foot"><a href="${base(d)}">${icon('back')}${d.kind === 'linux' ? 'Linux unit' : 'All chapters'}</a></div>
      </nav><div class="cbody" id="cbody"></div></div>`;
    const body = $('#cbody');
    ({ sheet: sheetMode, flash: flashMode, exam: cExamMode })[mode](d, body, arg);
  }
  function courseHome() {
    setTitle('NST 115 exam prep', 'course');
    const units = [1, 2, 3, 4];
    app.innerHTML = `<div class="pad">
      <div class="mode-head"><p class="eyebrow">NST 115 · System Maintenance</p><h2>Exam prep by chapter</h2><p class="muted">Each chapter combines everything from its <b>quiz review</b> and its part of the <b>unit exam review</b>, answered from the textbook and your class materials. Badges show which test each item is on. Linux has <a href="#/linux">its own tab</a>.</p></div>
      ${units.map(u => { const ds = CO.decks.filter(d => d.kind === 'chapter' && d.unit === u); return `<h3 class="part-h">Chapters ${ds[0].num}-${ds[ds.length - 1].num} <span class="muted">· Unit Exam ${u}</span></h3><div class="tiles chtiles">${ds.map(chTile).join('')}</div>`; }).join('')}
      <h3 class="part-h">Chapters 13-14</h3><div class="tiles chtiles">${CO.decks.filter(d => d.kind === 'chapter' && !d.unit).map(chTile).join('')}</div>
      <p class="fine">Answers tagged <b>Book ch.</b> come from <i>Windows 11 Inside Out</i>; <b>Class materials</b> from your slides, handouts, the assigned article and video; <b>General knowledge</b> items aren't covered in either, so compare them with your notes. Progress is saved in this browser.</p></div>`;
  }
  function chTile(d) {
    const p = deckPct(d), b = cS().best[d.id];
    return `<a class="tile deck" href="#/course/${d.id}"><span class="tile-ic chapter"><span class="cnum">${d.num}</span></span><span class="tile-txt"><small>Chapter ${d.num} · ${d.terms.length} items</small><b>${esc(d.sub)}</b><span class="tchips">${(d.tests || []).map(t => `<span class="onchip ${/Unit/.test(t) ? 'unit' : /slides/.test(t) ? 'slides' : ''}">${esc(t)}</span>`).join('')}</span>${b !== undefined ? `<small>Practice exam best ${b}%</small>` : ''}</span>${ring(p, `${d.sub}: ${p}% of items mastered`)}</a>`;
  }
  function linuxHome() {
    setTitle('Linux unit', 'penguin');
    const card = d => { const p = deckPct(d); return `<a class="tile deck" href="#/linux/${d.id}"><span class="tile-ic linux">${icon('penguin')}</span><span class="tile-txt"><small>${esc(d.sub)}</small><b>${esc(d.title)}</b><small>${d.terms.length} items${cS().best[d.id] !== undefined ? ` · exam best ${cS().best[d.id]}%` : ''}</small></span>${ring(p, `${d.title}: ${p}% mastered`)}</a>`; };
    app.innerHTML = `<div class="pad"><div class="mode-head"><p class="eyebrow">NST 115 · Linux</p><h2>Linux unit</h2><p class="muted">The Linux days, the top 25 commands, and hands-on drills. Each set has a review sheet, flash review and practice exam.</p></div>
      <h3 class="part-h">Lessons</h3><div class="tiles">${CO.decks.filter(d => d.kind === 'linux').map(card).join('')}</div>
      <h3 class="part-h">Hands-on practice</h3><div class="tiles">
        <a class="tile deck" href="#/linux/terminal"><span class="tile-ic linux">${icon('term')}</span><span class="tile-txt"><small>Type real commands</small><b>Terminal drills</b><small>${CO.terminal.length} tasks</small></span></a>
        <a class="tile deck" href="#/linux/perms"><span class="tile-ic linux">${icon('lock')}</span><span class="tile-txt"><small>rwx ⇄ 755</small><b>Permissions trainer</b><small>Endless practice</small></span></a></div></div>`;
  }
  function sheetMode(d, body, arg) {
    body.innerHTML = `<div class="pad"><div class="mode-head"><h2>${esc(d.kind === 'chapter' ? `Chapter ${d.num}: ${d.sub}` : d.title)}</h2><p class="muted">${d.kind === 'chapter' ? 'Quiz items first, then the rest of the unit exam items for this chapter.' : 'Items in your instructor\'s order.'} Turn on <b>Recall mode</b> to hide the answers, say each one from memory, reveal, then mark it.</p></div>
      ${d.note ? `<div class="think">${icon('bulb')}<p><b>Heads up:</b> ${esc(d.note)}</p></div>` : ''}
      <div class="recall-bar"><label class="switch"><input type="checkbox" id="recall"><span></span>Recall mode</label><small class="muted">${d.terms.filter(mastered).length}/${d.terms.length} marked "Got it"</small></div>
      ${d.terms.map((id, i) => { const t = CO.terms[id]; return `<article class="sec card item" id="t-${id}" tabindex="-1"><h2><span class="secnum">${i + 1}</span>${esc(t.t)}</h2><div class="ans prose">${paras(t.a)}</div><button type="button" class="reveal btn ghost" data-act="show">${icon('eye')}Show answer</button><div class="sec-foot"><span class="src">${onChips(id)}${esc(srcTag(t.s))}</span><span class="row"><button class="btn mini ${(cS().m[id] || 0) === 1 ? 'on-bad' : ''}" type="button" data-act="mark" data-id="${id}" data-v="1">Again</button><button class="btn mini ${mastered(id) ? 'on-good' : ''}" type="button" data-act="mark" data-id="${id}" data-v="2">${icon('check')}Got it</button></span></div></article>`; }).join('')}
      <div class="nextbar"><a class="btn primary" href="${base(d)}/${d.id}/exam">${icon('ticket')}Take the practice exam</a></div></div>`;
    const rc = $('#recall');
    rc.addEventListener('change', () => { body.classList.toggle('recall', rc.checked); $$('.item', body).forEach(x => x.classList.remove('shown')); });
    body.onclick = e => {
      const b = e.target.closest('[data-act]'); if (!b) return;
      if (b.dataset.act === 'show') b.closest('.item').classList.add('shown');
      if (b.dataset.act === 'mark') {
        const id = b.dataset.id, v = +b.dataset.v, was = mastered(id); cS().m[id] = v; save();
        b.parentNode.querySelectorAll('button').forEach(x => x.classList.remove('on-good', 'on-bad')); b.classList.add(v === 2 ? 'on-good' : 'on-bad');
        if (v === 2 && !was) addXP(2); else renderTray();
        $$(`.secs a[href$="/${id}"]`).forEach(a => a.classList.toggle('done', v === 2));
        $('.recall-bar small', body).textContent = `${d.terms.filter(mastered).length}/${d.terms.length} marked "Got it"`;
      }
    };
    body.classList.remove('recall');
    if (arg) { const t = $(`#t-${arg}`); if (t) { t.scrollIntoView({ block: 'start' }); t.focus({ preventScroll: true }); } }
  }
  function flashMode(d, body) {
    let q = shuffle(d.terms.filter(t => !mastered(t))); if (!q.length) q = shuffle(d.terms);
    let flipped = false, n = 0;
    const draw = () => {
      if (!q.length) { body.innerHTML = `<div class="pad"><div class="empty card">${icon('check')}<h3>Round done: ${n} reviewed</h3><p class="muted">${d.terms.filter(mastered).length}/${d.terms.length} items marked "Got it".</p><div class="row"><a class="btn" href="${base(d)}/${d.id}/flash" data-act="again">Go again</a><a class="btn primary" href="${base(d)}/${d.id}/exam">${icon('ticket')}Practice exam</a></div></div></div>`; return; }
      const t = CO.terms[q[0]]; flipped = false;
      body.innerHTML = `<div class="pad"><div class="mode-head"><h2>Flash review</h2><p class="muted">${plural(q.length, 'item')} left. Explain it out loud, then flip.</p></div>
        <div class="flash" id="flash"><div class="face front"><small>Review item</small><p>${esc(t.t)}</p></div><div class="face back prose" hidden><small>Answer</small>${paras(t.a)}</div></div>
        <div class="flash-act" id="fact"><button class="btn primary" type="button" data-act="flip">${icon('eye')}Flip <kbd>Space</kbd></button></div></div>`;
    };
    const flip = () => { if (flipped || !q.length) return; flipped = true; $('.face.back', body).hidden = false; $('#flash', body).classList.add('flipped'); $('#fact', body).innerHTML = `<div class="rate"><button class="btn bad" type="button" data-act="r" data-v="1">Again <kbd>1</kbd></button><button class="btn good" type="button" data-act="r" data-v="2">Got it <kbd>2</kbd></button></div>`; };
    const rate = v => { if (!flipped) return; const id = q.shift(); const was = mastered(id); cS().m[id] = v; if (v === 1) q.splice(Math.min(3, q.length), 0, id); n++; save(); if (v === 2 && !was) addXP(2); draw(); };
    body.onclick = e => { const b = e.target.closest('[data-act]'); if (!b) { if (e.target.closest('#flash')) flip(); return; } if (b.dataset.act === 'flip') flip(); if (b.dataset.act === 'r') rate(+b.dataset.v); if (b.dataset.act === 'again') { e.preventDefault(); route(); } };
    view = { key: e => { if (e.key === ' ' && !flipped) { e.preventDefault(); flip(); } else if (flipped && (e.key === '1' || e.key === '2')) rate(+e.key); } };
    draw();
  }
  function cExamMode(d, body) {
    const pool = d.terms.length >= 6 ? d.terms : CO.decks.filter(x => x.kind === d.kind && (x.unit === d.unit || !d.unit)).flatMap(x => x.terms);
    const total = Math.min(d.terms.length, 20);
    const intro = () => { body.innerHTML = `<div class="pad"><div class="mode-head"><h2>Practice exam</h2></div><div class="card belt-intro">${seal((cS().best[d.id] || 0) >= 80)}<div><p><b>${total} questions</b> drawn from ${esc(d.kind === 'chapter' ? `Chapter ${d.num}` : d.title)}. Some show a definition and ask for the item, others ask what an item means.</p><p class="muted">A wrong pick tells you what that choice actually is, so you can try again. Only first-try answers count toward your score.${cS().best[d.id] !== undefined ? ` Best so far: ${cS().best[d.id]}%.` : ''}</p><button class="btn primary" type="button" id="cgo">${icon('ticket')}Start</button></div></div></div>`; $('#cgo').onclick = start; };
    function start() {
      const qs = shuffle(d.terms).slice(0, total).map(id => {
        const others = shuffle(Array.from(new Set(pool)).filter(x => x !== id && CO.terms[x].d !== CO.terms[id].d)).slice(0, 3);
        const long = CO.terms[id].t.length > 55;
        return { id, rev: !long && Math.random() < .5, opts: shuffle([id, ...others]) };
      });
      let pos = 0, wrong = 0, firstRight = 0; const missed = [];
      const draw = () => {
        if (pos >= qs.length) return finish();
        const q = qs[pos], t = CO.terms[q.id]; wrong = 0;
        body.innerHTML = `<div class="pad"><div class="mode-head"><h2>Practice exam</h2><p class="muted">${pos + 1} of ${qs.length}</p></div><div class="dots">${qs.map((_, k) => `<i class="${k < pos ? 'on' : k === pos ? 'cur' : ''}"></i>`).join('')}</div>
          <div class="ticket card"><div class="tk-head"><span class="tk-tag plain">${q.rev ? 'What does this mean?' : 'Which review item is this?'}</span></div>
          <h3 class="tk-q">${q.rev ? esc(t.t) : esc(t.d)}</h3>
          <div class="opts">${q.opts.map((o, k) => `<button type="button" class="opt" data-act="pick" data-o="${o}"><kbd>${k + 1}</kbd><span>${esc(q.rev ? CO.terms[o].d : CO.terms[o].t)}</span></button>`).join('')}</div>
          <div class="fb" id="tkfb" aria-live="polite"></div><div class="row tk-row"></div></div></div>`;
        view = { key: e => { const b = $$('.opt', body)[+e.key - 1]; if (b && !b.disabled) b.click(); } };
      };
      body.onclick = e => {
        const b = e.target.closest('[data-act]'); if (!b) return;
        if (b.dataset.act === 'next') { pos++; draw(); return; }
        if (b.dataset.act !== 'pick' || b.disabled) return;
        const q = qs[pos], o = b.dataset.o;
        if (o === q.id) {
          b.classList.add('right'); $$('.opt', body).forEach(x => { x.disabled = true; });
          if (!wrong) firstRight++; else missed.push(q.id);
          $('#tkfb', body).innerHTML = `<div class="good-fb">${icon('check')}<p><b>Correct.</b> ${wrong ? 'You got there.' : 'First try.'}</p></div>`;
          $('.tk-row', body).innerHTML = `<button class="btn primary" type="button" data-act="next">Next ${icon('arrow')}</button>`; $('[data-act="next"]', body).focus();
        } else {
          wrong++; b.classList.add('wrong'); b.disabled = true; const p = CO.terms[o];
          $('#tkfb', body).innerHTML = `<div class="bad-fb">${icon('x')}<p><b>Not this one.</b> ${q.rev ? `That describes <b>${esc(p.t)}</b>.` : `<b>${esc(p.t)}</b> means: ${esc(p.d)}`}</p></div>`;
        }
      };
      const finish = () => {
        view = null; const score = Math.round(firstRight / qs.length * 100), prev = cS().best[d.id];
        cS().best[d.id] = Math.max(prev || 0, score); save(); addXP(Math.round(score / 10) + (prev === undefined || score > prev ? 5 : 0), score > (prev || 0) ? 'new best' : '');
        body.innerHTML = `<div class="pad"><div class="mode-head"><h2>Results</h2></div><div class="card result ${score >= 80 ? 'pass' : 'fail'}">${seal(score >= 80, score >= 80 ? 'stampin' : '')}<div><p class="score">${score}%</p><p><b>${score >= 80 ? 'Exam-ready on this review.' : 'Keep studying, you\'re getting there.'}</b></p><p class="muted">${firstRight} of ${qs.length} right on the first try.</p></div></div>
          ${missed.length ? `<div class="card missed"><h3>Restudy these</h3><ul>${missed.map(id => `<li><a href="${base(d)}/${d.id}/sheet/${id}">${icon('learn')}${esc(CO.terms[id].t)}</a></li>`).join('')}</ul></div>` : ''}
          <div class="row"><button class="btn" type="button" id="cagain">Retake</button><a class="btn primary" href="${base(d)}">${d.kind === 'linux' ? 'Linux unit' : 'All chapters'}</a></div></div>`;
        $('#cagain').onclick = start;
      };
      draw();
    }
    intro();
  }
  function terminalView() {
    setTitle('Linux · Terminal drills', 'term');
    const items = CO.terminal; let order = shuffle(items.map((_, i) => i)), pos = 0, hints = 0, wrong = 0, solved = 0;
    const nrm = s => s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').replace(/\s*\|\s*/g, ' | ').trim();
    const draw = () => {
      if (pos >= order.length) { app.innerHTML = `<div class="pad"><div class="empty card">${icon('check')}<h3>${solved}/${items.length} solved</h3><p class="muted">Run through them again until every one is automatic.</p><div class="row"><a class="btn primary" href="#/linux/terminal" id="tagain">Again</a><a class="btn" href="#/linux">Linux unit</a></div></div></div>`; $('#tagain').onclick = e => { e.preventDefault(); terminalView(); }; return; }
      const r = items[order[pos]]; hints = 0; wrong = 0;
      app.innerHTML = `<div class="pad"><div class="mode-head"><h2>Terminal drills</h2><p class="muted">Type the Linux command. <b>Case matters</b>, just like in a real terminal. Hints narrow it down; no answers given.</p></div><div class="dots">${order.map((_, k) => `<i class="${k < pos ? 'on' : k === pos ? 'cur' : ''}"></i>`).join('')}</div>
        <div class="term card"><div class="term-task">${esc(r[0])}</div><form class="term-line" id="tform" autocomplete="off"><label for="tin" class="prompt">student@ubuntu:~$</label><input id="tin" type="text" spellcheck="false" autocapitalize="off" autocorrect="off"></form><div class="term-out" id="tout" aria-live="polite"></div></div>
        <div class="row run-row"><button class="btn" type="button" id="thint">${icon('bulb')}Hint</button><button class="btn ghost" type="button" id="tskip">Skip for now</button></div></div>`;
      const inp = $('#tin'); inp.focus();
      $('#tform').onsubmit = e => {
        e.preventDefault(); const v = nrm(inp.value); if (!v) return;
        if (r[1].map(nrm).includes(v)) {
          solved++; inp.readOnly = true; $('#tout').innerHTML = `<span class="ok">✓ Correct${!wrong && !hints ? ', first try' : ''}.</span>`;
          $('.run-row').innerHTML = `<button class="btn primary" type="button" id="tnext">Next ${icon('arrow')}</button>`; $('#tnext').onclick = () => { pos++; draw(); }; $('#tnext').focus();
          addXP(!wrong && !hints ? 5 : 2);
        } else {
          wrong++; const cmd = v.split(' ')[0];
          $('#tout').innerHTML = `<span class="err">${r[1].some(a => nrm(a).split(' ')[0] === cmd) ? 'Right command, but the options or arguments are off.' : r[1].some(a => nrm(a).split(' ')[0].toLowerCase() === cmd.toLowerCase()) ? `${esc(cmd)}: command not found (check the capitals)` : `${esc(cmd)}: not the command you need here`}</span>`;
          inp.select();
        }
      };
      $('#thint').onclick = () => { hints = Math.min(2, hints + 1); $('#tout').innerHTML = `<span class="hintline">Hint ${hints}: ${esc(r[1 + hints])}</span>`; if (hints === 2) $('#thint').disabled = true; inp.focus(); };
      $('#tskip').onclick = () => { order.push(order.splice(pos, 1)[0]); draw(); };
    };
    draw();
  }
  function permsView() {
    setTitle('Linux · Permissions trainer', 'lock');
    const sym = n => ['r', 'w', 'x'].map((c, i) => (n & (4 >> i)) ? c : '-').join('');
    let streak = 0, hints = 0;
    const draw = () => {
      const oct = [0, 1, 2].map(() => [7, 6, 5, 4, 0, 1, 3, 2][Math.floor(Math.random() * (Math.random() < .7 ? 4 : 8))]);
      const toOct = Math.random() < .5, str = oct.map(sym).join(''), ans = toOct ? oct.join('') : str; hints = 0;
      app.innerHTML = `<div class="pad"><div class="mode-head"><h2>Permissions trainer</h2><p class="muted">Convert between <code>ls -l</code> permission strings and <code>chmod</code> numbers. <b>r = 4, w = 2, x = 1</b>, added up for user, group and others. Streak: <b>${streak}</b></p></div>
        <div class="term card"><div class="term-task">${toOct ? `What number gives <code class="big">-${str}</code> ?` : `What does <code class="big">chmod ${oct.join('')}</code> look like in <code>ls -l</code>? (9 characters, skip the type)`}</div>
        <form class="term-line" id="pform" autocomplete="off"><label for="pin" class="prompt">${toOct ? 'chmod' : '-'}</label><input id="pin" type="text" spellcheck="false" autocapitalize="off" maxlength="${toOct ? 3 : 10}"></form><div class="term-out" id="pout" aria-live="polite"></div></div>
        <div class="row run-row"><button class="btn" type="button" id="phint">${icon('bulb')}Hint</button><button class="btn ghost" type="button" id="pnew">New one</button></div></div>`;
      const inp = $('#pin'); inp.focus();
      $('#pform').onsubmit = e => {
        e.preventDefault(); let v = inp.value.trim(); if (!toOct && v.length === 10) v = v.slice(1); if (!v) return;
        if (v === ans) { streak++; addXP(hints ? 1 : 3); $('#pout').innerHTML = '<span class="ok">✓ Correct.</span>'; setTimeout(draw, 700); }
        else {
          streak = 0; const parts = toOct ? v.split('') : [v.slice(0, 3), v.slice(3, 6), v.slice(6, 9)], who = ['user', 'group', 'others'];
          const bad = who.filter((_, i) => (toOct ? +parts[i] !== oct[i] : parts[i] !== sym(oct[i])));
          $('#pout').innerHTML = `<span class="err">Not quite: check the <b>${bad.join(', ') || 'format'}</b> part${bad.length > 1 ? 's' : ''}.</span>`; inp.select();
        }
      };
      $('#phint').onclick = () => { hints++; const i = Math.min(hints, 3) - 1; $('#pout').innerHTML = `<span class="hintline">${hints <= 3 ? `The ${['user', 'group', 'others'][i]} part is ${toOct ? `<code>${sym(oct[i])}</code>: add up r = 4, w = 2, x = 1` : `${oct[i]}: which of 4, 2 and 1 add up to it?`}` : 'That\'s every hint. Work it out one part at a time.'}</span>`; inp.focus(); };
      $('#pnew').onclick = () => { streak = 0; draw(); };
    };
    draw();
  }

  /* ---------- global wiring ---------- */
  app.addEventListener('click', e => { if (e.target.closest('[data-act="openstart"]')) { e.stopPropagation(); openStart(); } });
  document.addEventListener('keydown', e => {
    if (!view || !view.key || e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target; if (e.key !== 'Escape' && t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
    if (t && t.tagName === 'BUTTON' && (e.key === ' ' || e.key === 'Enter')) return;
    view.key(e);
  });
  applyTheme();
  route();
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
})();
