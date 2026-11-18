import { setState, today } from './store';

/** Counts real study time: tab visible + user active in the last 60 s. Flushes every 30 s. */
const AREA: Record<string, string> = {
  '': 'Lektionen', lesson: 'Lektionen', studio: 'Kursbuch', practice: 'Üben', review: 'Wiederholung', drill: 'Drills',
  speak: 'Sprechen', write: 'Schreiben', exam: 'B2-Prüfung', tests: 'Tests', grammar: 'Grammatik', alphabet: 'Alphabet',
  placement: 'Tests', stats: 'Statistik', me: 'Profil', admin: 'Admin',
};
let lastInput = Date.now();
let pending: Record<string, number> = {};
let started = false;

export function startStudyTimer() {
  if (started) return;
  started = true;
  ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach((e) => addEventListener(e, () => { lastInput = Date.now(); }, { passive: true }));
  setInterval(() => {
    if (document.visibilityState !== 'visible' || Date.now() - lastInput > 60_000) return;
    const seg = location.hash.replace(/^#\/?/, '').split('/')[0];
    const area = AREA[seg] ?? 'Andere';
    if (area === 'Profil' || area === 'Admin') return; // not learning time
    pending[area] = (pending[area] || 0) + 5;
  }, 5000);
  const flush = () => {
    const total = Object.values(pending).reduce((a, b) => a + b, 0);
    if (!total) return;
    const p = pending; pending = {};
    setState((s) => {
      const d = today();
      s.time = s.time || {}; s.timeByArea = s.timeByArea || {};
      s.time[d] = (s.time[d] || 0) + total;
      for (const [k, v] of Object.entries(p)) s.timeByArea[k] = (s.timeByArea[k] || 0) + v;
    });
  };
  setInterval(flush, 30_000);
  addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush(); });
  addEventListener('beforeunload', flush);
}

export const minutes = (sec: number) => Math.round(sec / 60);
export const fmtDuration = (sec: number) => {
  const m = Math.round(sec / 60);
  return m < 60 ? `${m} min` : `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, '0')} min`;
};
