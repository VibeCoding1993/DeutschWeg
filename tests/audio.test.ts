import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { UNITS, STUDIO } from '../src/data';
import { CHARACTER_VOICE, NARRATOR } from '../src/data/voices';
import { exerciseSpeech, NUMBER_POOL, roleIsFemale, splitScript } from '../src/lib/spoken';
import { allAdjSentences } from '../src/data/grammarDrills';
import { VERBS, PRONOUNS, present, praeteritum, perfekt } from '../src/data/verbs';
import { A1_TEST } from '../src/data/a1test';
import { LISTENING } from '../src/data/exam';
import { LETTERS, SPELL_WORDS } from '../src/data/alphabet';
import { BANK } from '../src/data/bank';

const manifest: Record<string, string> = JSON.parse(readFileSync('public/audio/manifest.json', 'utf8'));
const norm = (t: string) => t.replace(/[„“”"‚‘’«»]/g, '').replace(/\s*…\s*/g, ' ').replace(/[.!?,;:]+$/g, '').replace(/\s+/g, ' ').trim();
const have = new Set(Object.keys(manifest).map((k) => { const i = k.indexOf('#'); return `${k.slice(0, i)}#${norm(k.slice(i + 1))}`; }));
const missing: string[] = [];
const need = (voice: string, text: string | null | undefined) => { if (text && !have.has(`${voice}#${norm(text)}`)) missing.push(text); };

describe('every spoken sentence has a natural-voice recording', () => {
  it('units, dialogs, drills, tests, alphabet', () => {
    for (const u of [...UNITS, ...STUDIO]) {
      u.vocab.forEach((w) => { need(NARRATOR, w.g ? `${w.g} ${w.de}` : w.de); need(NARRATOR, w.ex); });
      u.ex.forEach((e) => need(NARRATOR, exerciseSpeech(e)));
      u.dialogs?.forEach((d) => d.lines.forEach((l) => need(CHARACTER_VOICE[l.who], l.de)));
    }
    allAdjSentences().forEach((s) => need(NARRATOR, s));
    NUMBER_POOL.forEach((n) => need(NARRATOR, n.say));
    VERBS.forEach((v) => [present(v), praeteritum(v), perfekt(v)].forEach((f) => f.forEach((x, i) => x !== '–' && need(NARRATOR, `${PRONOUNS[i].split('/')[0]} ${x}`))));
    A1_TEST.forEach((q) => q.audio?.forEach(([w, t]) => need(w === 'F' ? NARRATOR : CHARACTER_VOICE.karim, t)));
    LISTENING.forEach((l) => splitScript(l.script).forEach(({ who, text }) => need(roleIsFemale(who) ? NARRATOR : CHARACTER_VOICE.karim, text)));
    LETTERS.forEach((x) => { need(NARRATOR, x.name); need(NARRATOR, x.word); });
    SPELL_WORDS.forEach((w) => need(NARRATOR, w));
    BANK.forEach((q) => q.audio?.forEach(([v, t]) => need(v, t)));
    expect(missing.slice(0, 20), `${missing.length} sentences without audio`).toEqual([]);
  });
});
