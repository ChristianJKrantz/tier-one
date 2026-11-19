// NST 115 exam prep content checks: every review-sheet item exists and is complete, definitions don't
// name the item they define (that would give away practice-exam answers), and terminal drills are well formed.
// Run: node tests/test_course.js
const C = require('../js/course.js');
let fails = 0;
const check = (ok, msg) => { if (!ok) { fails++; console.error('FAIL', msg); } };
const norm = s => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
Object.values(C.terms).forEach(t => {
  check(t.t && t.d && Array.isArray(t.a) && t.a.length, `${t.id} incomplete`);
  check(/^(b\d+|class|gen)$/.test(t.s), `${t.id} bad source tag ${t.s}`);
  const name = norm(t.t);
  if (name.length >= 3 && name.split(' ').length <= 3 && !t.id.startsWith('cmd_')) check(!norm(t.d).split(' ').join(' ').includes(name), `${t.id} definition names the item ("${t.t}")`);
});
C.decks.forEach(d => {
  check(d.terms.length >= 4, `${d.id} needs at least 4 items`);
  d.terms.forEach(id => check(C.terms[id], `${d.id} refers to missing item ${id}`));
  check(new Set(d.terms).size === d.terms.length, `${d.id} lists an item twice`);
});
['ue1', 'ue2', 'ue3', 'ue4', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13', 'q14', 'lx1', 'lx2', 'lx3', 'lx25'].forEach(id => check(C.decks.some(d => d.id === id), `missing deck ${id}`));
C.terminal.forEach((r, i) => {
  check(r.length === 4 && r[1].length, `terminal ${i} malformed`);
  [r[2], r[3]].forEach((h, k) => r[1].forEach(a => check(!h.replace(/\s+/g, '').includes(a.replace(/\s+/g, '')) || a.length < 3, `terminal ${i} hint ${k + 1} contains "${a}"`)));
});
console.log(`${C.decks.length} review decks · ${Object.keys(C.terms).length} items · ${C.terminal.length} terminal drills`);
if (fails) { console.error(`${fails} problem(s)`); process.exit(1); }
console.log('course content OK');
