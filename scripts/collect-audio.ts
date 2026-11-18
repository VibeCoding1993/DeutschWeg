// Collects every fixed German sentence in the app → scripts/audio-jobs.json
// Run: npx vite-node scripts/collect-audio.ts
import { writeFileSync } from 'node:fs';
import { UNITS, STUDIO } from '../src/data';
import { CHARACTER_VOICE, NARRATOR } from '../src/data/voices';
import { SPEAKING } from '../src/data/speaking';
import { WRITING } from '../src/data/writing';
import { LISTENING } from '../src/data/exam';
import { VERBS, PRONOUNS, present, praeteritum, perfekt } from '../src/data/verbs';
import { A1_TEST } from '../src/data/a1test';
import { READING } from '../src/data/exam';
import { allAdjSentences } from '../src/data/grammarDrills';
import { LETTERS, SPELL_WORDS } from '../src/data/alphabet';
import { exerciseSpeech, NUMBER_POOL, roleIsFemale, splitScript } from '../src/lib/spoken';

const jobs = new Map<string, { voice: string; text: string }>();
const add = (voice: string, text?: string) => {
  if (!text) return;
  const t = text.trim();
  if (!t || /___/.test(t)) return;
  jobs.set(`${voice}#${t}`, { voice, text: t });
};
const clean = (s: string) => s.replace(/…/g, '').replace(/\s+/g, ' ').trim();

for (const u of [...UNITS, ...STUDIO]) {
  for (const w of u.vocab) {
    add(NARRATOR, w.g ? `${w.g} ${w.de}` : w.de);
    add(NARRATOR, w.de);
    add(NARRATOR, w.ex);
  }
  for (const e of u.ex) {
    if (e.t === 'listen' || e.t === 'speak') add(NARRATOR, e.text);
    if (e.t === 'order') { add(NARRATOR, e.de); }
    if (e.t === 'translate') add(NARRATOR, e.a[0]);
    add(NARRATOR, exerciseSpeech(e) ?? undefined);
    if (e.t === 'translate') e.a.forEach((x) => add(NARRATOR, x));
    if (false && e.t === 'fill') add(NARRATOR, e.q.split('___').map((p, i, arr) => p + (i < arr.length - 1 ? (e.a[0].split(' ').length === arr.length - 1 ? e.a[0].split(' ')[i] : i === 0 ? e.a[0] : '') : '')).join('').replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim());
    if (e.t === 'match') e.pairs.forEach(([de]) => add(NARRATOR, de));
  }
  for (const d of u.dialogs || []) for (const l of d.lines) {
    add(CHARACTER_VOICE[l.who] || NARRATOR, l.de);
    add(NARRATOR, l.de); // also usable in exercises
  }
}
for (const t of SPEAKING) { add(NARRATOR, t.prompt); t.phrases.forEach((p) => add(NARRATOR, clean(p))); }
for (const t of WRITING) { if (t.model) add(NARRATOR, t.model); }
for (const l of LISTENING) splitScript(l.script).forEach(({ who, text }) => add(roleIsFemale(who) ? NARRATOR : CHARACTER_VOICE.karim, text));
for (const r of READING) add(NARRATOR, r.text);
for (const s of allAdjSentences()) add(NARRATOR, s);
for (const it of NUMBER_POOL) add(NARRATOR, it.say);
LETTERS.forEach((x) => { add(NARRATOR, x.name); add(NARRATOR, x.word); });
SPELL_WORDS.forEach((w) => add(NARRATOR, w));
['Hallo! So klinge ich.', 'Das ist meine normale Geschwindigkeit.'].forEach((t) => add(NARRATOR, t));
// verb drill: "ich gehe", "du gingst", "er ist gegangen" …
for (const v of VERBS) for (const forms of [present(v), praeteritum(v), perfekt(v)])
  forms.forEach((f, i) => { if (f !== '–') add(NARRATOR, `${PRONOUNS[i].split('/')[0]} ${f}`); });
// A1 test listening items (female = narrator, male = Karim's voice)
for (const q of A1_TEST) q.audio?.forEach(([who, t]) => add(who === 'F' ? NARRATOR : CHARACTER_VOICE.karim, t));
add(NARRATOR, 'Herzlich willkommen! Schön, dass du Deutsch lernst.');

writeFileSync('scripts/audio-jobs.json', JSON.stringify([...jobs.values()], null, 0));
console.log(`${jobs.size} clips`);
