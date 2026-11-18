import { STUDIO, UNITS } from '../data';
import type { Unit } from '../types';
import { LEVELS, type Level } from '../types';
import type { State } from './store';

export function isUnlocked(s: State, idx: number, list: Unit[] = UNITS) {
  if (s.unlockAll || idx === 0) return true;
  const u = list[idx];
  if (u.track === 'studio') return !!s.units[list[idx - 1].id]?.done || !!s.units[u.id]?.done;
  if (s.startLevel && LEVELS.indexOf(u.level) <= LEVELS.indexOf(s.startLevel)) return true;
  // the first unit of the start level+1 path opens via previous unit completion
  return !!s.units[list[idx - 1].id]?.done || !!s.units[u.id]?.done;
}

export function nextUnit(s: State, list: Unit[] = UNITS) {
  const i = list.findIndex((u, k) => isUnlocked(s, k, list) && !s.units[u.id]?.done);
  return i >= 0 ? list[i] : null;
}

export const studioProgress = (s: State) => {
  const done = STUDIO.filter((u) => s.units[u.id]?.done).length;
  return { done, total: STUDIO.length };
};

export function levelProgress(s: State, lv: Level) {
  const us = UNITS.filter((u) => u.level === lv);
  const done = us.filter((u) => s.units[u.id]?.done).length;
  return { done, total: us.length, pct: us.length ? done / us.length : 0 };
}

/** The level the learner is currently working on. */
export function currentLevel(s: State): Level {
  return nextUnit(s)?.level ?? 'C2';
}

export const dueCards = (s: State) => Object.entries(s.srs).filter(([, c]) => c.due <= Date.now());
