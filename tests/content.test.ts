import { describe, expect, it } from 'vitest';
import { UNITS, STUDIO } from '../src/data';
import { CAST } from '../src/components/Scene';
import { A1_TEST } from '../src/data/a1test';
import { BANK } from '../src/data/bank';
import { VERBS, present, praeteritum, perfekt } from '../src/data/verbs';
import { adjQuestion, prepQuestion, NOUNS } from '../src/data/grammarDrills';
import { checkAnswer, alignSpeech } from '../src/lib/check';
import { PLACEMENT } from '../src/data/placement';
import { READING, LISTENING, CLOZE } from '../src/data/exam';

const v = (inf: string) => VERBS.find((x) => x.inf === inf)!;

describe('curriculum', () => {
  it('has units for every level and unique ids', () => {
    const ids = UNITS.map((u) => u.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const lv of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']) expect(UNITS.some((u) => u.level === lv)).toBe(true);
  });
  it('every exercise is well-formed', () => {
    for (const u of [...UNITS, ...STUDIO]) {
      expect(u.vocab.length, u.id).toBeGreaterThanOrEqual(10);
      for (const e of u.ex) {
        if (e.t === 'mc') { expect(e.a, `${u.id} ${e.q}`).toBeLessThan(e.options.length); expect(new Set(e.options).size).toBe(e.options.length); }
        if (e.t === 'fill') {
          const gaps = e.q.split('___').length - 1;
          expect(gaps, `${u.id} ${e.q}`).toBeGreaterThan(0);
          if (gaps > 1) expect(e.a[0].split(' ').length, `${u.id} ${e.q}`).toBe(gaps);
        }
        if (e.t === 'order') expect(e.de.split(' ').length).toBeGreaterThan(2);
        if (e.t === 'match') expect(e.pairs.length).toBeGreaterThanOrEqual(3);
      }
    }
  });
  it('placement and exam answers are in range', () => {
    PLACEMENT.forEach((q) => expect(q.a).toBeLessThan(q.options.length));
    [...READING, ...LISTENING].forEach((p) => p.questions.forEach((q) => expect(q.a).toBeLessThan(q.options.length)));
    CLOZE.forEach((c) => { expect(c.text.match(/\[\d+\]/g)!.length).toBe(c.gaps.length); c.gaps.forEach((g) => expect(g.a).toBeLessThan(g.options.length)); });
  });
});

describe('companion course', () => {
  it('has 13 units + 4 stations with dialogs by known characters', () => {
    expect(STUDIO.length).toBe(17);
    expect(STUDIO.filter((u) => u.id.includes('station')).length).toBe(4);
    for (const u of STUDIO) {
      expect(u.dialogs?.length, u.id).toBeGreaterThanOrEqual(2);
      for (const d of u.dialogs!) for (const l of d.lines) expect(CAST[l.who], `${u.id} ${l.who}`).toBeTruthy();
    }
  });
});

describe('A1 test bank', () => {
  it('has 100 questions, 25 per section, valid answers, unique ids', () => {
    expect(A1_TEST.length).toBe(100);
    for (const sec of ['Hören', 'Lesen', 'Wortschatz', 'Grammatik']) expect(A1_TEST.filter((q) => q.section === sec).length, sec).toBe(25);
    expect(new Set(A1_TEST.map((q) => q.id)).size).toBe(100);
    for (const q of A1_TEST) {
      expect(q.a, q.q).toBeLessThan(q.options.length);
      expect(new Set(q.options).size, q.q).toBe(q.options.length);
      if (q.section === 'Hören') expect(q.audio?.length, q.q).toBeGreaterThan(0);
    }
  });
});

describe('test bank', () => {
  it('has 2000+ valid questions on every level and part', () => {
    expect(BANK.length).toBeGreaterThanOrEqual(2000);
    expect(new Set(BANK.map((q) => q.id)).size).toBe(BANK.length);
    for (const lv of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']) for (const sec of ['Hören', 'Lesen', 'Wortschatz', 'Grammatik'])
      expect(BANK.filter((q) => q.level === lv && q.section === sec).length, `${lv} ${sec}`).toBeGreaterThan(0);
    for (const q of BANK) {
      expect(q.a, q.id).toBeGreaterThanOrEqual(0);
      expect(q.a, q.id).toBeLessThan(q.options.length);
      expect(new Set(q.options.map((o) => o.toLowerCase())).size, q.id).toBe(q.options.length);
      if (q.section === 'Hören') expect(q.audio?.length, q.id).toBeGreaterThan(0);
    }
  });
  it('is stable between runs (seeded)', async () => {
    const again = (await import('../src/data/bank?again')).BANK;
    expect(again.slice(0, 50).map((q) => q.options.join('|'))).toEqual(BANK.slice(0, 50).map((q) => q.options.join('|')));
  });
});

describe('verbs', () => {
  it('conjugates present', () => {
    expect(present(v('arbeiten'))).toEqual(['arbeite', 'arbeitest', 'arbeitet', 'arbeiten', 'arbeitet', 'arbeiten']);
    expect(present(v('kommen'))).toEqual(['komme', 'kommst', 'kommt', 'kommen', 'kommt', 'kommen']);
    expect(present(v('wohnen'))[1]).toBe('wohnst');
    expect(present(v('fahren'))[2]).toBe('fährt');
    expect(present(v('aufstehen'))[0]).toBe('stehe auf');
  });
  it('conjugates Präteritum', () => {
    expect(praeteritum(v('machen'))).toEqual(['machte', 'machtest', 'machte', 'machten', 'machtet', 'machten']);
    expect(praeteritum(v('gehen'))).toEqual(['ging', 'gingst', 'ging', 'gingen', 'gingt', 'gingen']);
    expect(praeteritum(v('finden'))[4]).toBe('fandet');
    expect(praeteritum(v('werden'))).toEqual(['wurde', 'wurdest', 'wurde', 'wurden', 'wurdet', 'wurden']);
    expect(praeteritum(v('sein'))[4]).toBe('wart');
    expect(praeteritum(v('einkaufen'))[3]).toBe('kauften ein');
    expect(praeteritum(v('lesen'))[1]).toBe('lasest');
  });
  it('builds Perfekt with the right auxiliary', () => {
    expect(perfekt(v('gehen'))[0]).toBe('bin gegangen');
    expect(perfekt(v('machen'))[2]).toBe('hat gemacht');
  });
  it('every verb has 6 present forms', () => VERBS.forEach((x) => expect(present(x).length, x.inf).toBe(6)));
});

describe('generators', () => {
  it('adjective endings are consistent', () => {
    for (let i = 0; i < 500; i++) {
      const q = adjQuestion();
      expect(['e', 'en', 'er', 'es', 'em']).toContain(q.answer);
      expect(q.full).not.toContain('___');
      // definite nominative singular must be -e
      if (/^Hier ist (der|die|das) /.test(q.full)) expect(q.answer).toBe('e');
      if (/^Ich spreche mit /.test(q.full)) expect(['en', 'em', 'er']).toContain(q.answer);
      if (/^Hier ist ein [a-zäöü]+ /.test(q.full)) expect(q.answer).toBe(q.full.split(' ')[3].endsWith('es') ? 'es' : 'er');
      // no strong singular without article
      const m = q.full.match(/^(?:Hier ist|Hier sind|Ich sehe|Ich spreche mit|Das ist das Haus) ([a-zäöü]+) ([A-ZÄÖÜ]\w+)/);
      if (m) expect(NOUNS.some((n) => n.pl === m[2] || n.datpl === m[2]), q.full).toBe(true);
    }
  });
  it('preposition questions have the right answer included', () => {
    for (let i = 0; i < 300; i++) {
      const q = prepQuestion();
      expect(q.answer).toBeGreaterThanOrEqual(0);
      expect(new Set(q.options).size).toBe(q.options.length);
    }
  });
});

describe('answer checking', () => {
  it('is tolerant but honest', () => {
    expect(checkAnswer('ich wohne in hamburg', ['Ich wohne in Hamburg.']).ok).toBe(true);
    expect(checkAnswer('Ich mochte einen Kaffee', ['Ich möchte einen Kaffee']).note).toMatch(/spelling|typo/);
    expect(checkAnswer('Ich moechte einen Kaffee', ['Ich möchte einen Kaffee']).ok).toBe(true);
    expect(checkAnswer('Ich habe kein Hunger', ['Ich habe keinen Hunger']).ok).toBe(false);
  });
  it('aligns speech', () => {
    expect(alignSpeech('Ich bin müde.', 'ich bin müde').score).toBe(100);
    expect(alignSpeech('Ich bin sehr müde.', 'ich bin müde').score).toBe(75);
  });
});
