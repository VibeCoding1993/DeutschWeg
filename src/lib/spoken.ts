import type { Exercise } from '../types';

/** Shared by the app and scripts/collect-audio.ts so every spoken sentence has a recording. */

export const stripParens = (s: string) => s.replace(/\s*\([^)]*\)/g, '').replace(/\s+/g, ' ').trim();

/** Fill a gap sentence with its answer ("Ich ___ um 6 Uhr ___." + "stehe auf"). */
export function fillSentence(q: string, answer: string) {
  const parts = q.split('___');
  const n = parts.length - 1;
  const words = answer.split(' ');
  const fills = n > 1 && words.length === n ? words : [answer, ...Array(Math.max(0, n - 1)).fill('')];
  return stripParens(parts.map((p, i) => p + (i < n ? fills[i] : '')).join(''));
}

const ENGLISH = /\b(the|is|are|you|was|that|to|of|it|he|she|they|a|an|be|been|must|should|said|wants|can|not|but|really|probably|very|became|seemingly)\b/i;

/** What the app reads aloud after an exercise (null = nothing). */
export function exerciseSpeech(ex: Exercise): string | null {
  switch (ex.t) {
    case 'mc': {
      const ans = ex.options[ex.a];
      if (ex.q.includes('___')) return fillSentence(ex.q, ans);
      if (/in German\?|=\s*$|:\s*$|„[^"]*"\s*=|bedeutet/.test(ex.q) && !ENGLISH.test(ans)) return stripParens(ans);
      return null;
    }
    case 'fill': return fillSentence(ex.q, ex.a[0]);
    case 'translate': return ex.a[0];
    case 'order': return ex.de;
    case 'listen': case 'speak': return ex.text;
    case 'match': return null;
  }
}

/** Speaker of a B2 exam listening line ("Moderatorin: …"). */
export function splitScript(script: string): { who: string | null; text: string }[] {
  return script.split('\n').map((l) => l.trim()).filter(Boolean).map((l) => {
    const m = l.match(/^([A-ZÄÖÜ][\wäöüß]+):\s*(.*)$/);
    return m ? { who: m[1], text: m[2] } : { who: null, text: l };
  });
}
const FEMALE_ROLES = /in$|^(Frau|Moderatorin|Sprecherin|Ärztin)$/;
export const roleIsFemale = (who: string | null) => !who || FEMALE_ROLES.test(who);

// ---------- deterministic pools for the number drill ----------
function rng(seed: number) {
  return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const r = rng(42);
const int = (max: number) => Math.floor(r() * max);

export interface NumberItem { kind: 'n' | 'price' | 'time' | 'year' | 'phone'; say: string; answers: string[]; reveal: string }

export const NUMBER_POOL: NumberItem[] = (() => {
  const out: NumberItem[] = [];
  const nums = new Set<number>();
  for (let i = 0; i <= 20; i++) nums.add(i);
  [30, 40, 50, 60, 70, 80, 90, 100, 1000].forEach((x) => nums.add(x));
  while (nums.size < 230) { const max = [100, 100, 1000, 10000, 1000000][int(5)]; nums.add(int(max)); }
  nums.forEach((n) => out.push({ kind: 'n', say: String(n), answers: [String(n)], reveal: n.toLocaleString('de-DE') }));
  for (let i = 0; i < 120; i++) {
    const e = int(99) + 1, c = [0, 49, 99, 50, 25, 90][int(6)];
    const ans = c ? `${e},${String(c).padStart(2, '0')}` : `${e}`;
    out.push({ kind: 'price', say: c ? `${e} Euro ${c}` : `${e} Euro`, answers: [ans, ans.replace(',', '.'), ...(c ? [] : [`${e},00`])], reveal: `${ans} €` });
  }
  const labels: [string, number][] = [['Viertel nach', 15], ['halb', 30], ['Viertel vor', 45], ['zehn nach', 10], ['fünf vor', 55]];
  for (let h = 1; h <= 12; h++) for (const [label, m] of labels) {
    const hh = m >= 30 ? (h % 12) + 1 : h;
    const say = `${label} ${hh === 1 ? 'eins' : hh}`;
    const mm = String(m).padStart(2, '0');
    out.push({ kind: 'time', say: `Es ist ${say}.`, answers: [`${h}:${mm}`, `${h}.${mm}`, `${String(h).padStart(2, '0')}:${mm}`], reveal: `${h}:${mm} — ${say}` });
  }
  for (let y = 1905; y <= 2025; y += 1) if (y % 3 === 0 || y >= 1990) out.push({ kind: 'year', say: `im Jahr ${y}`, answers: [String(y)], reveal: String(y) });
  for (let i = 0; i < 60; i++) {
    const d = Array.from({ length: 6 }, () => int(10));
    out.push({ kind: 'phone', say: d.join(' '), answers: [d.join(''), d.join(' ')], reveal: d.join(' ') });
  }
  return out;
})();
