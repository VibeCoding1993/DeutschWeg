/** Answer checking: tolerant of punctuation/case, flags missing umlauts and small typos. */

export const stripPunct = (s: string) =>
  s.replace(/[.,!?;:"„“”‚‘’«»()\-–—]/g, ' ').replace(/\s+/g, ' ').trim();

export const norm = (s: string) => stripPunct(s).toLowerCase();

export const deUmlaut = (s: string) =>
  s.replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');

export function lev(a: string, b: string): number {
  if (a === b) return 0;
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}

export type Verdict = { ok: boolean; note?: string; best: string };

export function checkAnswer(input: string, accepted: string[]): Verdict {
  const best = accepted[0];
  const ni = norm(input);
  if (!ni) return { ok: false, best };
  for (const a of accepted) {
    const na = norm(a);
    if (ni === na) {
      // exact apart from punctuation — check capitalisation of nouns
      if (stripPunct(input) !== stripPunct(a) && stripPunct(input).toLowerCase() === stripPunct(a).toLowerCase()) {
        const capsDiff = stripPunct(a).split(' ').some((w, i) => {
          const iw = stripPunct(input).split(' ')[i];
          return i > 0 && w[0] && w[0] === w[0].toUpperCase() && iw && iw[0] !== w[0];
        });
        if (capsDiff) return { ok: true, note: 'Remember: German nouns start with a capital letter.', best: a };
      }
      return { ok: true, best: a };
    }
  }
  for (const a of accepted) {
    const na = norm(a);
    if (deUmlaut(ni) === deUmlaut(na)) return { ok: true, note: 'Watch the spelling: ä ö ü ß.', best: a };
  }
  for (const a of accepted) {
    const na = norm(a);
    const d = lev(ni, na);
    if (na.length >= 5 && d === 1) return { ok: true, note: 'Small typo — almost perfect!', best: a };
  }
  return { ok: false, best };
}

/** Word-level alignment for speech: which target words were heard. */
export function alignSpeech(target: string, heard: string) {
  const t = norm(target).split(' ').filter(Boolean);
  const h = norm(heard).split(' ').filter(Boolean);
  const close = (x: string, y: string) => x === y || deUmlaut(x) === deUmlaut(y) || (x.length > 4 && lev(x, y) <= 1);
  // LCS
  const dp: number[][] = Array.from({ length: t.length + 1 }, () => Array(h.length + 1).fill(0));
  for (let i = t.length - 1; i >= 0; i--)
    for (let j = h.length - 1; j >= 0; j--)
      dp[i][j] = close(t[i], h[j]) ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const hit = new Array(t.length).fill(false);
  let i = 0, j = 0;
  while (i < t.length && j < h.length) {
    if (close(t[i], h[j])) { hit[i] = true; i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else j++;
  }
  const words = stripPunct(target).split(' ').filter(Boolean);
  const score = t.length ? Math.round((hit.filter(Boolean).length / t.length) * 100) : 0;
  return { words: words.map((w, k) => ({ w, ok: hit[k] })), score };
}

export const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
