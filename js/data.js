/* Tier One: content loader. Chapter files call W.chapter({...}); this checks each one is well formed
   so a typo in the content shows up as a console error instead of a broken page. */
'use strict';
const W = {
  chapters: [],
  parts: {
    1: 'Part I · Windows essentials',
    2: 'Part II · Managing Windows 11',
    3: 'Part III · For IT pros & experts',
    4: 'Part IV · Appendixes',
    5: 'Part V · Class units'
  },
  chapter(c) {
    const problems = [];
    if (!c.id || !c.title || !Array.isArray(c.learn)) problems.push('missing id, title or learn');
    (c.quiz || []).forEach((q, i) => {
      if (!Array.isArray(q[1]) || q[2] < 0 || q[2] >= q[1].length) problems.push(`quiz ${i}: answer index out of range`);
      if (q[4] >= c.learn.length) problems.push(`quiz ${i}: section index out of range`);
    });
    (c.run || []).forEach((r, i) => { if (r.length < 4) problems.push(`run ${i}: needs task, answers and two hints`); });
    if (problems.length) { console.error('Tier One content problem in', c.id, problems); return; }
    c.cards = c.cards || []; c.run = c.run || []; c.quiz = c.quiz || [];
    this.chapters.push(c);
  },
  byId(id) { return this.chapters.find(c => c.id === id); }
};
if (typeof module !== 'undefined') module.exports = W;
