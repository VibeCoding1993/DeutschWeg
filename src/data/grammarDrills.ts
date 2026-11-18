import { pick } from '../lib/check';

/** Rule-based generators for infinite practice of adjective endings and preposition cases. */

type G = 'm' | 'f' | 'n' | 'pl';
type Case = 'Nom' | 'Akk' | 'Dat' | 'Gen';
interface Noun { sg: string; g: Exclude<G, 'pl'>; gen: string; pl: string; datpl: string; en: string }

export const NOUNS: Noun[] = [
  { sg: 'Hund', g: 'm', gen: 'Hundes', pl: 'Hunde', datpl: 'Hunden', en: 'dog' },
  { sg: 'Mann', g: 'm', gen: 'Mannes', pl: 'Männer', datpl: 'Männern', en: 'man' },
  { sg: 'Freund', g: 'm', gen: 'Freundes', pl: 'Freunde', datpl: 'Freunden', en: 'friend' },
  { sg: 'Lehrer', g: 'm', gen: 'Lehrers', pl: 'Lehrer', datpl: 'Lehrern', en: 'teacher' },
  { sg: 'Nachbar', g: 'm', gen: 'Nachbarn', pl: 'Nachbarn', datpl: 'Nachbarn', en: 'neighbour' },
  { sg: 'Frau', g: 'f', gen: 'Frau', pl: 'Frauen', datpl: 'Frauen', en: 'woman' },
  { sg: 'Katze', g: 'f', gen: 'Katze', pl: 'Katzen', datpl: 'Katzen', en: 'cat' },
  { sg: 'Lehrerin', g: 'f', gen: 'Lehrerin', pl: 'Lehrerinnen', datpl: 'Lehrerinnen', en: 'teacher (f)' },
  { sg: 'Familie', g: 'f', gen: 'Familie', pl: 'Familien', datpl: 'Familien', en: 'family' },
  { sg: 'Kind', g: 'n', gen: 'Kindes', pl: 'Kinder', datpl: 'Kindern', en: 'child' },
  { sg: 'Mädchen', g: 'n', gen: 'Mädchens', pl: 'Mädchen', datpl: 'Mädchen', en: 'girl' },
  { sg: 'Pferd', g: 'n', gen: 'Pferdes', pl: 'Pferde', datpl: 'Pferden', en: 'horse' },
];

const ADJ = ['klein', 'groß', 'alt', 'jung', 'nett', 'freundlich', 'müde', 'lustig', 'glücklich', 'neu', 'ruhig', 'krank'];

const IDX: Record<G, number> = { m: 0, f: 1, n: 2, pl: 3 };
const DEF: Record<Case, string[]> = {
  Nom: ['der', 'die', 'das', 'die'], Akk: ['den', 'die', 'das', 'die'],
  Dat: ['dem', 'der', 'dem', 'den'], Gen: ['des', 'der', 'des', 'der'],
};
const INDEF: Record<Case, string[]> = {
  Nom: ['ein', 'eine', 'ein', 'keine'], Akk: ['einen', 'eine', 'ein', 'keine'],
  Dat: ['einem', 'einer', 'einem', 'keinen'], Gen: ['eines', 'einer', 'eines', 'keiner'],
};
const WEAK: Record<Case, string[]> = { Nom: ['e', 'e', 'e', 'en'], Akk: ['en', 'e', 'e', 'en'], Dat: ['en', 'en', 'en', 'en'], Gen: ['en', 'en', 'en', 'en'] };
const MIXED: Record<Case, string[]> = { Nom: ['er', 'e', 'es', 'en'], Akk: ['en', 'e', 'es', 'en'], Dat: ['en', 'en', 'en', 'en'], Gen: ['en', 'en', 'en', 'en'] };
const STRONG: Record<Case, string[]> = { Nom: ['er', 'e', 'es', 'e'], Akk: ['en', 'e', 'es', 'e'], Dat: ['em', 'er', 'em', 'en'], Gen: ['en', 'er', 'en', 'er'] };

const nounForm = (n: Noun, g: G, c: Case) =>
  g === 'pl' ? (c === 'Dat' ? n.datpl : n.pl) : c === 'Gen' && n.g !== 'f' ? n.gen : n.sg === 'Nachbar' && c !== 'Nom' ? 'Nachbarn' : n.sg;

const FRAME: Record<Case, (x: string, pl: boolean) => string> = {
  Nom: (x, pl) => (pl ? `Hier sind ${x}.` : `Hier ist ${x}.`),
  Akk: (x) => `Ich sehe ${x}.`,
  Dat: (x) => `Ich spreche mit ${x}.`,
  Gen: (x) => `Das ist das Haus ${x}.`,
};

export interface AdjQ { sentence: string; answer: string; caseName: Case; type: string; full: string; explain: string }

export function adjQuestion(): AdjQ {
  const n = pick(NOUNS);
  const plural = Math.random() < 0.25;
  const g: G = plural ? 'pl' : n.g;
  const c = pick<Case>(['Nom', 'Akk', 'Dat', 'Dat', 'Akk', 'Gen']);
  let kind = pick(['def', 'indef', 'none'] as const);
  // Strong endings without an article only sound natural with plurals of count nouns.
  if (kind === 'none' && !plural) kind = pick(['def', 'indef'] as const);
  const adj = pick(ADJ);
  const i = IDX[g];
  const art = kind === 'def' ? DEF[c][i] : kind === 'indef' ? INDEF[c][i] : '';
  const end = (kind === 'def' ? WEAK : kind === 'indef' ? MIXED : STRONG)[c][i];
  const noun = nounForm(n, g, c);
  const gap = `${art ? art + ' ' : ''}${adj}___ ${noun}`;
  const full = `${art ? art + ' ' : ''}${adj}${end} ${noun}`;
  const typeName = kind === 'def' ? 'after der/die/das (weak)' : kind === 'indef' ? 'after ein/kein (mixed)' : 'no article (strong)';
  return {
    sentence: FRAME[c](gap, plural),
    answer: end,
    caseName: c,
    type: typeName,
    full: FRAME[c](full, plural),
    explain: `${c} · ${g === 'pl' ? 'plural' : g === 'm' ? 'masculine' : g === 'f' ? 'feminine' : 'neuter'} · ${typeName} → -${end}`,
  };
}

const PREPS: { p: string; c: Case }[] = [
  { p: 'mit', c: 'Dat' }, { p: 'nach', c: 'Dat' }, { p: 'bei', c: 'Dat' }, { p: 'seit', c: 'Dat' }, { p: 'von', c: 'Dat' },
  { p: 'zu', c: 'Dat' }, { p: 'aus', c: 'Dat' }, { p: 'gegenüber', c: 'Dat' },
  { p: 'für', c: 'Akk' }, { p: 'durch', c: 'Akk' }, { p: 'gegen', c: 'Akk' }, { p: 'ohne', c: 'Akk' }, { p: 'um', c: 'Akk' },
  { p: 'wegen', c: 'Gen' }, { p: 'trotz', c: 'Gen' }, { p: 'während', c: 'Gen' }, { p: 'statt', c: 'Gen' },
];

export interface PrepQ { prompt: string; options: string[]; answer: number; explain: string }

export function prepQuestion(): PrepQ {
  const { p, c } = pick(PREPS);
  const n = pick(NOUNS.filter((x) => x.sg !== 'Nachbar'));
  const plural = Math.random() < 0.2;
  const g: G = plural ? 'pl' : n.g;
  const i = IDX[g];
  const form = (cs: Case) => `${DEF[cs][i]} ${nounForm(n, g, cs)}`;
  const correct = form(c);
  const opts = Array.from(new Set([correct, form('Akk'), form('Dat'), form('Gen'), form('Nom')]));
  const shuffled = opts.sort(() => Math.random() - 0.5).slice(0, 4);
  if (!shuffled.includes(correct)) shuffled[0] = correct;
  const final = shuffled.sort(() => Math.random() - 0.5);
  return {
    prompt: `${p} ___ (${DEF.Nom[i]} ${plural ? n.pl : n.sg})`,
    options: final,
    answer: final.indexOf(correct),
    explain: `"${p}" always takes the ${c === 'Dat' ? 'dative' : c === 'Akk' ? 'accusative' : 'genitive'} → ${p} ${correct}`,
  };
}

/** Every sentence adjQuestion() can produce (used to pre-record audio). */
export function allAdjSentences(): string[] {
  const out = new Set<string>();
  for (const n of NOUNS) for (const adj of ADJ) for (const plural of [false, true]) {
    const g: G = plural ? 'pl' : n.g;
    const i = IDX[g];
    for (const c of ['Nom', 'Akk', 'Dat', 'Gen'] as Case[]) for (const kind of plural ? ['def', 'indef', 'none'] : ['def', 'indef']) {
      const art = kind === 'def' ? DEF[c][i] : kind === 'indef' ? INDEF[c][i] : '';
      const end = (kind === 'def' ? WEAK : kind === 'indef' ? MIXED : STRONG)[c][i];
      out.add(FRAME[c](`${art ? art + ' ' : ''}${adj}${end} ${nounForm(n, g, c)}`, plural));
    }
  }
  return [...out];
}
