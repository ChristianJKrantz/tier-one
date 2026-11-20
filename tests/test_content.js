// Content integrity: every chapter loads, every question has a valid answer and a reason for each wrong option,
// every drill has two hints, and no hint or wrong-answer reason gives away the answer.
// Run: node tests/test_content.js
const assert = require('assert');
global.W = require('../js/data.js');
require('../js/content-1.js'); require('../js/content-2.js'); require('../js/content-3.js');
const norm = s => String(s).toLowerCase().replace(/\s+/g, ' ').trim();
let fails = 0;
const check = (ok, msg) => { if (!ok) { fails++; console.error('FAIL', msg); } };
check(W.chapters.length === 24, `expected 24 chapters/appendixes, got ${W.chapters.length}`);
const ids = new Set();
W.chapters.forEach(c => {
  check(!ids.has(c.id), `${c.id} duplicate id`); ids.add(c.id);
  check(c.learn.length >= 2, `${c.id} needs at least 2 lessons`);
  check(c.cards.length >= 4, `${c.id} needs at least 4 flashcards`);
  check(c.quiz.length >= 3, `${c.id} needs at least 3 questions`);
  c.learn.forEach((s, i) => check(s.t && s.p.length && (s.key || []).length, `${c.id} learn ${i} needs title, text and lock-it-in lines`));
  c.quiz.forEach((q, i) => {
    const [text, opts, ans, hint, sec, why] = q, right = norm(opts[ans]);
    check(opts.length >= 3 && opts.length <= 4, `${c.id} q${i} should have 3-4 options`);
    check(new Set(opts.map(norm)).size === opts.length, `${c.id} q${i} has duplicate options`);
    check(hint && hint.length > 5, `${c.id} q${i} needs a hint`);
    check(Array.isArray(why) && why.length === opts.length, `${c.id} q${i} needs one reason per option`);
    opts.forEach((_, k) => { if (k !== ans) check(why[k] && why[k].length > 3, `${c.id} q${i} option ${k} needs a reason`); });
    // hints and reasons must not contain the full correct option (when it is specific enough to give it away)
    if (right.length > 8) {
      check(!norm(hint).includes(right), `${c.id} q${i} hint gives away the answer`);
      why.forEach((w, k) => check(!norm(w).includes(right), `${c.id} q${i} reason ${k} gives away the answer`));
    }
    check(sec >= 0 && sec < c.learn.length, `${c.id} q${i} section link out of range`);
  });
  c.run.forEach((r, i) => {
    const ans = (Array.isArray(r[1]) ? r[1] : r[1].split('|')).map(norm);
    check(ans.length && ans.every(Boolean), `${c.id} drill ${i} has an empty answer`);
    [r[2], r[3]].forEach((h, k) => {
      check(h && h.length > 5, `${c.id} drill ${i} needs hint ${k + 1}`);
      // squash spaces, plus signs and quotes so "dev + mgmt + .msc" counts as spelling out devmgmt.msc
      const squash = s => norm(s).replace(/[\s+"'`]/g, '');
      ans.forEach(a => check(!squash(h).includes(squash(a)) || squash(a).length < 4, `${c.id} drill ${i} hint ${k + 1} spells out the answer "${a}"`));
    });
  });
});
const t = W.chapters.reduce((o, c) => ({ s: o.s + c.learn.length, k: o.k + c.cards.length, r: o.r + c.run.length, q: o.q + c.quiz.length }), { s: 0, k: 0, r: 0, q: 0 });
console.log(`${W.chapters.length} chapters · ${t.s} lessons · ${t.k} flashcards · ${t.r} drills · ${t.q} questions`);
if (fails) { console.error(`${fails} problem(s)`); process.exit(1); }
console.log('content OK');
