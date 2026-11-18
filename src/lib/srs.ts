import type { Card } from './store';

const DAY = 86400000;

export const newCard = (): Card => ({ due: Date.now(), ivl: 0, ease: 2.5, reps: 0, lapses: 0 });

/** SM-2 style scheduling. grade: 0 again, 1 hard, 2 good, 3 easy */
export function schedule(c: Card, grade: 0 | 1 | 2 | 3): Card {
  const n = { ...c };
  if (grade === 0) {
    n.lapses++;
    n.reps = 0;
    n.ivl = 0;
    n.ease = Math.max(1.3, n.ease - 0.2);
    n.due = Date.now() + 60 * 1000; // see again this session
    return n;
  }
  n.reps++;
  if (n.reps === 1) n.ivl = grade === 3 ? 3 : 1;
  else if (n.reps === 2) n.ivl = grade === 1 ? 2 : grade === 3 ? 7 : 4;
  else n.ivl = Math.round(n.ivl * (grade === 1 ? 1.2 : grade === 3 ? n.ease * 1.3 : n.ease));
  n.ease = Math.max(1.3, n.ease + (grade === 1 ? -0.15 : grade === 3 ? 0.15 : 0));
  n.due = Date.now() + n.ivl * DAY;
  return n;
}

export const ivlLabel = (c: Card, g: 0 | 1 | 2 | 3) => {
  if (g === 0) return '1 min';
  const d = schedule(c, g).ivl;
  return d < 30 ? `${d} d` : d < 365 ? `${Math.round(d / 30)} mo` : `${(d / 365).toFixed(1)} y`;
};
