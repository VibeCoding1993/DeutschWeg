/**
 * Generated test bank (A1–C2). Every question is derived from checked course content
 * (vocabulary, dialogs, exercises, verb tables, grammar generators), so answers are correct
 * by construction. A seeded RNG keeps question ids and distractors stable between visits.
 */
import type { Level, Unit, Word } from '../types';
import { LEVELS } from '../types';
import { UNITS, STUDIO } from './index';
import { CHARACTER_VOICE, NARRATOR } from './voices';
import { VERBS, PRONOUNS, present, praeteritum, perfekt } from './verbs';
import { NOUNS } from './grammarDrills';
import { NUMBER_POOL, fillSentence, stripParens } from '../lib/spoken';
import { A1_TEST, type Section, type TQ } from './a1test';
import { READING, LISTENING, CLOZE } from './exam';
import { roleIsFemale, splitScript } from '../lib/spoken';

export interface BQ extends Omit<TQ, 'audio'> { level: Level; audio?: [string, string][]; kind: string }

// ---------- seeded helpers ----------
function rng(seed: number) {
  return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const hash = (s: string) => { let h = 2166136261; for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return h >>> 0; };
function sshuffle<T>(arr: T[], seed: string): T[] {
  const r = rng(hash(seed)); const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
/** Build an MC question: correct answer + up to n distractors (unique, not equal to the answer). */
function mc(id: string, correct: string, pool: string[], n = 3): { options: string[]; a: number } | null {
  const norm = (x: string) => x.trim().toLowerCase();
  const seen = new Set([norm(correct)]);
  const distract: string[] = [];
  for (const p of sshuffle(pool, id)) { if (distract.length >= n) break; if (!p || seen.has(norm(p))) continue; seen.add(norm(p)); distract.push(p); }
  if (distract.length < Math.min(2, n)) return null;
  const options = sshuffle([correct, ...distract], id + 'o');
  return { options, a: options.indexOf(correct) };
}

const out: BQ[] = [];
const ids = new Set<string>();
function push(q: BQ | null) { if (q && !ids.has(q.id)) { ids.add(q.id); out.push(q); } }

const ALL_UNITS: Unit[] = [...UNITS, ...STUDIO];
const lvIdx = (l: Level) => LEVELS.indexOf(l);
const near = (l: Level, x: Level) => Math.abs(lvIdx(l) - lvIdx(x)) <= 1;
const words = ALL_UNITS.flatMap((u) => u.vocab.map((w) => ({ w, u })));
const isNoun = (w: Word) => !!w.g;
const isVerb = (w: Word) => !w.g && /^(sich )?[a-zäöü]+(en|ern|eln)( [a-zäöü]+)?$/.test(w.de) && /^to /.test(w.en);
const cleanEn = (s: string) => s.replace(/\s*\(.*?\)\s*/g, ' ').trim();
const display = (w: Word) => (w.g ? `${w.g} ${w.de}` : w.de);

// ---------- WORTSCHATZ ----------
for (const { w, u } of words) {
  const same = words.filter((x) => near(x.u.level, u.level) && x.w !== w && (isNoun(w) ? isNoun(x.w) : isVerb(w) ? isVerb(x.w) : !isNoun(x.w) && !isVerb(x.w)));
  const fallback = words.filter((x) => x.w !== w);
  const pick = same.length >= 3 ? same : fallback;
  // English → German
  let m = mc(`v-ed-${u.id}-${w.de}`, display(w), pick.map((x) => display(x.w)));
  if (m) push({ id: `v-ed-${u.id}-${w.de}`, level: u.level, section: 'Wortschatz', kind: 'Englisch → Deutsch', q: `Was heißt „${cleanEn(w.en)}" auf Deutsch?`, ...m });
  // German → English
  m = mc(`v-de-${u.id}-${w.de}`, cleanEn(w.en), pick.map((x) => cleanEn(x.w.en)));
  if (m) push({ id: `v-de-${u.id}-${w.de}`, level: u.level, section: 'Wortschatz', kind: 'Deutsch → Englisch', q: `Was bedeutet „${display(w)}"?`, ...m });
  // article
  if (w.g) push({ id: `v-art-${w.de}`, level: u.level, section: 'Wortschatz', kind: 'Artikel', q: `___ ${w.de} (${cleanEn(w.en)})`, options: ['der', 'die', 'das'], a: ['der', 'die', 'das'].indexOf(w.g) });
  // plural
  if (w.g && w.pl && w.pl !== '-' && w.pl !== w.de) {
    const fakes = [`${w.de}s`, `${w.de}en`, `${w.de}e`, `${w.de}er`, `${w.de}n`].filter((f) => f !== w.pl);
    const mm = mc(`v-pl-${w.de}`, `die ${w.pl}`, fakes.map((f) => `die ${f}`), 2);
    if (mm) push({ id: `v-pl-${w.de}`, level: u.level, section: 'Wortschatz', kind: 'Plural', q: `Plural: ${w.g} ${w.de} → …`, ...mm });
  }
}

// ---------- sentences (for Hören / Lesen) ----------
interface Sent { de: string; en?: string; level: Level; voice: string; unit: string }
const sents: Sent[] = [];
for (const u of ALL_UNITS) {
  u.vocab.forEach((w) => w.ex && sents.push({ de: w.ex, level: u.level, voice: NARRATOR, unit: u.id }));
  u.ex.forEach((e) => {
    if ((e.t === 'listen' || e.t === 'speak') && e.text) sents.push({ de: e.text, en: e.en, level: u.level, voice: NARRATOR, unit: u.id });
    if (e.t === 'order') sents.push({ de: e.de, en: e.en, level: u.level, voice: NARRATOR, unit: u.id });
    if (e.t === 'translate') sents.push({ de: e.a[0], en: e.en, level: u.level, voice: NARRATOR, unit: u.id });
  });
  u.dialogs?.forEach((d) => d.lines.forEach((l) => sents.push({ de: l.de, en: l.en, level: u.level, voice: CHARACTER_VOICE[l.who] || NARRATOR, unit: u.id })));
}
const uniq = new Map<string, Sent>();
sents.forEach((s) => { if (!uniq.has(s.de)) uniq.set(s.de, s); });
const S = [...uniq.values()];
const wc = (s: string) => s.split(/\s+/).length;

for (const s of S) {
  const similar = S.filter((x) => x !== s && near(x.level, s.level) && Math.abs(wc(x.de) - wc(s.de)) <= 3);
  // Hören: which sentence do you hear?
  let m = mc(`h-sat-${s.de}`, s.de, similar.map((x) => x.de));
  if (m) push({ id: `h-sat-${hash(s.de)}`, level: s.level, section: 'Hören', kind: 'Satz erkennen', q: 'Welchen Satz hören Sie?', audio: [[s.voice, s.de]], ...m });
  if (s.en) {
    const enPool = S.filter((x) => x !== s && x.en && near(x.level, s.level)).map((x) => x.en!);
    // Hören: meaning of what you hear
    m = mc(`h-bed-${s.de}`, s.en, enPool);
    if (m) push({ id: `h-bed-${hash(s.de)}`, level: s.level, section: 'Hören', kind: 'Hörverstehen', q: 'Was bedeutet der Satz, den Sie hören?', audio: [[s.voice, s.de]], ...m });
    // Lesen: meaning of what you read
    m = mc(`l-bed-${s.de}`, s.en, enPool);
    if (m) push({ id: `l-bed-${hash(s.de)}`, level: s.level, section: 'Lesen', kind: 'Leseverstehen', text: s.de, q: 'Was bedeutet dieser Satz?', ...m });
  }
}

// Lesen: which reply fits? (dialog turn-taking)
const allLines = ALL_UNITS.flatMap((u) => (u.dialogs || []).flatMap((d) => d.lines.map((l) => ({ ...l, level: u.level }))));
for (const u of ALL_UNITS) for (const d of u.dialogs || []) {
  d.lines.forEach((l, i) => {
    const next = d.lines[i + 1];
    if (!next || next.who === l.who || !/\?$/.test(l.de.trim())) return;
    const pool = allLines.filter((x) => x.de !== next.de && x.de !== l.de && near(x.level, u.level) && !/\?$/.test(x.de)).map((x) => x.de);
    const m = mc(`l-ant-${l.de}`, next.de, pool);
    if (m) push({ id: `l-ant-${hash(l.de + next.de)}`, level: u.level, section: 'Lesen', kind: 'Passende Antwort', text: `— ${l.de}`, q: 'Welche Antwort passt?', ...m });
  });
}

// Hören: numbers, prices, times, years (capped so they don't dominate A1)
const numberSample = NUMBER_POOL.filter((n, i) => n.kind !== 'n' || i % 2 === 0).filter((n, i) => n.kind !== 'year' || i % 3 === 0);
for (const n of numberSample) {
  const pool = NUMBER_POOL.filter((x) => x.kind === n.kind && x !== n).map((x) => x.reveal);
  const m = mc(`h-num-${n.say}`, n.reveal, pool);
  const q = { n: 'Welche Zahl hören Sie?', price: 'Welchen Preis hören Sie?', time: 'Wie spät ist es?', year: 'Welches Jahr hören Sie?', phone: 'Welche Nummer hören Sie?' }[n.kind];
  if (m) push({ id: `h-num-${n.kind}-${n.say}`, level: n.kind === 'year' || n.kind === 'phone' ? 'A2' : 'A1', section: 'Hören', kind: 'Zahlen', q, audio: [[NARRATOR, n.say]], ...m });
}
// Hören: which word?
for (const { w, u } of words) {
  if (!w.g) continue;
  const pool = words.filter((x) => x.w.g && x.w !== w && near(x.u.level, u.level) && x.w.de[0] === w.de[0]).map((x) => display(x.w));
  const m = mc(`h-wort-${w.de}`, display(w), pool.length >= 2 ? pool : words.filter((x) => x.w.g && x.w !== w).map((x) => display(x.w)));
  if (m) push({ id: `h-wort-${w.de}`, level: u.level, section: 'Hören', kind: 'Wort erkennen', q: 'Welches Wort hören Sie?', audio: [[NARRATOR, display(w)]], ...m });
}

// ---------- GRAMMATIK ----------
for (const u of ALL_UNITS) {
  const fillAnswers = u.ex.flatMap((e) => (e.t === 'fill' ? [e.a[0]] : []));
  u.ex.forEach((e, k) => {
    if (e.t === 'mc') push({ id: `g-mc-${u.id}-${k}`, level: u.level, section: 'Grammatik', kind: u.grammar.title, q: e.q, options: e.options, a: e.a, explain: e.explain });
    if (e.t === 'fill') {
      const n = e.q.split('___').length - 1;
      const pool = [...fillAnswers, ...ALL_UNITS.filter((x) => x.level === u.level).flatMap((x) => x.ex.flatMap((y) => (y.t === 'fill' ? [y.a[0]] : [])))]
        .filter((x) => x.split(' ').length === e.a[0].split(' ').length);
      const m = mc(`g-fill-${u.id}-${k}`, e.a[0], pool);
      if (m) push({ id: `g-fill-${u.id}-${k}`, level: u.level, section: 'Grammatik', kind: u.grammar.title, q: n > 1 ? e.q.replace(/___/g, '…') + ` → ${e.a[0].split(' ').length > 1 ? '(… …)' : ''}` : e.q, explain: e.explain, ...m });
    }
    if (e.t === 'order' && wc(e.de) <= 10) {
      // word order: choose the correctly ordered sentence
      const w = e.de.split(' ');
      const wrong = [sshuffle(w, e.de + 1).join(' '), sshuffle(w, e.de + 2).join(' '), [...w.slice(1), w[0]].join(' '), [w[0], ...w.slice(2), w[1]].join(' ')];
      const m = mc(`g-ord-${u.id}-${k}`, e.de, wrong);
      if (m) push({ id: `g-ord-${u.id}-${k}`, level: u.level, section: 'Grammatik', kind: 'Satzstellung', q: `Welcher Satz ist richtig? („${e.en}")`, ...m });
    }
  });
}
// verb forms
for (const v of VERBS) {
  const tenses: [string, string[]][] = [['Präsens', present(v)], ['Präteritum', praeteritum(v)], ['Perfekt', perfekt(v)]];
  for (const [t, forms] of tenses) {
    for (const i of [0, 1, 2]) {
      if (forms[i] === '–') continue;
      const others = [...tenses.flatMap(([, f]) => f), ...forms].filter((f) => f !== forms[i] && f !== '–');
      const lvl: Level = t === 'Präsens' ? v.lv : t === 'Perfekt' ? (lvIdx(v.lv) < 1 ? 'A2' : v.lv) : (lvIdx(v.lv) < 2 ? 'B1' : v.lv);
      const m = mc(`g-verb-${v.inf}-${t}-${i}`, forms[i], others);
      if (m) push({ id: `g-verb-${v.inf}-${t}-${i}`, level: lvl, section: 'Grammatik', kind: `Verben · ${t}`, q: `${t} von „${v.inf}": ${PRONOUNS[i].split('/')[0]} ___`, ...m });
    }
  }
}
// prepositions + case (definite article forms)
const DEF: Record<string, string[]> = { Nom: ['der', 'die', 'das'], Akk: ['den', 'die', 'das'], Dat: ['dem', 'der', 'dem'], Gen: ['des', 'der', 'des'] };
const PREPS: [string, string, Level][] = [['mit', 'Dat', 'A1'], ['zu', 'Dat', 'A1'], ['bei', 'Dat', 'A2'], ['nach', 'Dat', 'A2'], ['von', 'Dat', 'A2'], ['aus', 'Dat', 'A2'], ['seit', 'Dat', 'A2'], ['für', 'Akk', 'A1'], ['ohne', 'Akk', 'A2'], ['durch', 'Akk', 'A2'], ['gegen', 'Akk', 'A2'], ['um', 'Akk', 'A2'], ['wegen', 'Gen', 'B1'], ['trotz', 'Gen', 'B1'], ['während', 'Gen', 'B1'], ['statt', 'Gen', 'B1']];
for (const [p, c, lvl] of PREPS) for (const n of NOUNS.filter((x) => x.sg !== 'Nachbar')) {
  const gi = { m: 0, f: 1, n: 2 }[n.g];
  const form = (cs: string) => `${DEF[cs][gi]} ${cs === 'Gen' && n.g !== 'f' ? n.gen : n.sg}`;
  const correct = form(c);
  const m = mc(`g-prep-${p}-${n.sg}`, correct, ['Nom', 'Akk', 'Dat', 'Gen'].map(form));
  if (m) push({ id: `g-prep-${p}-${n.sg}`, level: lvl, section: 'Grammatik', kind: 'Präpositionen', q: `${p} ___ (${DEF.Nom[gi]} ${n.sg})`, explain: `„${p}" + ${c === 'Dat' ? 'Dativ' : c === 'Akk' ? 'Akkusativ' : 'Genitiv'}`, ...m });
}
// adjective endings (definite / indefinite, all cases, singular)
const ADJ = ['klein', 'groß', 'alt', 'jung', 'nett', 'neu'];
const WEAK: Record<string, string[]> = { Nom: ['e', 'e', 'e'], Akk: ['en', 'e', 'e'], Dat: ['en', 'en', 'en'] };
const MIXED: Record<string, string[]> = { Nom: ['er', 'e', 'es'], Akk: ['en', 'e', 'es'], Dat: ['en', 'en', 'en'] };
const INDEF: Record<string, string[]> = { Nom: ['ein', 'eine', 'ein'], Akk: ['einen', 'eine', 'ein'], Dat: ['einem', 'einer', 'einem'] };
const FRAME: Record<string, (x: string) => string> = { Nom: (x) => `Hier ist ${x}.`, Akk: (x) => `Ich sehe ${x}.`, Dat: (x) => `Ich spreche mit ${x}.` };
for (const n of NOUNS.filter((x) => x.sg !== 'Nachbar')) for (const adj of ADJ) for (const c of ['Nom', 'Akk', 'Dat']) for (const kind of ['def', 'indef']) {
  const gi = { m: 0, f: 1, n: 2 }[n.g];
  const art = kind === 'def' ? DEF[c][gi] : INDEF[c][gi];
  const end = (kind === 'def' ? WEAK : MIXED)[c][gi];
  const id = `g-adj-${n.sg}-${adj}-${c}-${kind}`;
  push({ id, level: 'B1', section: 'Grammatik', kind: 'Adjektivendungen', q: FRAME[c](`${art} ${adj}___ ${n.sg}`), options: ['e', 'en', 'er', 'es', 'em'].slice(0, 4).map((x) => `-${x}`), a: ['e', 'en', 'er', 'es'].indexOf(end) });
}

// ---------- B2 exam material ----------
for (const r of READING) r.questions.forEach((q, k) => push({ id: `b2-r-${r.id}-${k}`, level: 'B2', section: 'Lesen', kind: r.title, text: r.text, q: q.q, options: q.options, a: q.a }));
for (const l of LISTENING) l.questions.forEach((q, k) => push({ id: `b2-l-${l.id}-${k}`, level: 'B2', section: 'Hören', kind: l.title, q: q.q, options: q.options, a: q.a,
  audio: splitScript(l.script).map(({ who, text }) => [roleIsFemale(who) ? NARRATOR : CHARACTER_VOICE.karim, text] as [string, string]) }));
for (const c of CLOZE) c.gaps.forEach((g, k) => {
  const marked = c.text.replace(`[${k + 1}]`, '【 ? 】').replace(/\[\d+\]/g, '…');
  push({ id: `b2-c-${c.id}-${k}`, level: 'B2', section: 'Lesen', kind: c.title, text: marked, q: `Welches Wort passt in die Lücke 【 ? 】?`, options: g.options, a: g.a });
});

// ---------- hand-written A1 exam questions ----------
for (const q of A1_TEST) push({ ...q, level: 'A1', kind: 'A1-Modelltest', audio: q.audio?.map(([w, t]) => [w === 'F' ? NARRATOR : CHARACTER_VOICE.karim, t]) });

export const BANK: BQ[] = out.filter((q) => q.options.length >= 2 && q.a >= 0);

export function bankStats() {
  const by: Record<string, Record<string, number>> = {};
  for (const q of BANK) { (by[q.level] ||= {}); by[q.level][q.section] = (by[q.level][q.section] || 0) + 1; }
  return by;
}

export const SECTION_LIST: Section[] = ['Hören', 'Lesen', 'Wortschatz', 'Grammatik'];
export { stripParens, fillSentence };
