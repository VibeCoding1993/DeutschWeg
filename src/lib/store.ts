import { useSyncExternalStore } from 'react';
import type { Level } from '../types';

export interface Card {
  due: number;      // epoch ms
  ivl: number;      // days
  ease: number;
  reps: number;
  lapses: number;
}

export interface UnitProgress { best: number; stars: number; done: boolean; plays: number }

export interface WritingEntry { id: string; taskId: string; text: string; date: string; score?: number }

export interface State {
  name: string;
  onboarded: boolean;
  xp: number;
  streak: number;
  bestStreak: number;
  lastDay: string;               // yyyy-mm-dd of last XP gain
  daily: Record<string, number>; // day -> xp
  time: Record<string, number>;  // day -> seconds studied
  timeByArea: Record<string, number>; // area -> seconds (all time)
  dailyMinutes: number;          // time goal
  dailyGoal: number;
  startLevel: Level | null;      // from placement test: everything below is unlocked
  unlockAll: boolean;
  units: Record<string, UnitProgress>;
  srs: Record<string, Card>;     // key: unitId|de
  drills: Record<string, { right: number; total: number }>;
  writing: WritingEntry[];
  speakCount: number;
  achievements: string[];
  examScores: Record<string, number>;
  settings: {
    theme: 'dark' | 'light';
    sound: boolean;
    rate: number;           // TTS speed
    voice: string;          // voiceURI
    geminiKey: string;
    model: string;
    explainLang: 'en' | 'fr';
    showPron?: boolean;
  };
}

const KEY = 'deutschweg.v1';

const fresh = (): State => ({
  name: '',
  onboarded: false,
  xp: 0,
  streak: 0,
  bestStreak: 0,
  lastDay: '',
  daily: {},
  time: {},
  timeByArea: {},
  dailyMinutes: 20,
  dailyGoal: 50,
  startLevel: null,
  unlockAll: false,
  units: {},
  srs: {},
  drills: {},
  writing: [],
  speakCount: 0,
  achievements: [],
  examScores: {},
  settings: { theme: 'dark', sound: true, rate: 0.95, voice: '', geminiKey: '', model: 'gemini-2.5-flash', explainLang: 'en' },
});

function load(): State {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return fresh();
    const s = JSON.parse(raw);
    const f = fresh();
    return { ...f, ...s, settings: { ...f.settings, ...(s.settings || {}) } };
  } catch {
    return fresh();
  }
}

let state: State = load();
const listeners = new Set<() => void>();

function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage full or blocked */ }
}

export function getState() { return state; }

export function setState(fn: (s: State) => Partial<State> | void) {
  const draft = structuredClone(state);
  const patch = fn(draft);
  state = patch ? { ...draft, ...patch } : draft;
  persist();
  listeners.forEach((l) => l());
}

export function useStore<T>(sel: (s: State) => T): T {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb); },
    () => sel(state),
  );
}

export const today = (d = new Date()) => {
  const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, '0'), dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
};

const dayDiff = (a: string, b: string) =>
  Math.round((new Date(b + 'T12:00').getTime() - new Date(a + 'T12:00').getTime()) / 86400000);

/** Award XP and maintain the streak. */
export function addXP(n: number) {
  setState((s) => {
    const t = today();
    if (s.lastDay !== t) {
      const gap = s.lastDay ? dayDiff(s.lastDay, t) : 99;
      s.streak = gap === 1 ? s.streak + 1 : 1;
      s.lastDay = t;
    }
    s.bestStreak = Math.max(s.bestStreak, s.streak);
    s.xp += n;
    s.daily[t] = (s.daily[t] || 0) + n;
  });
  checkAchievements();
}

/** Streak shown to the user: 0 if they missed yesterday. */
export function liveStreak(s: State) {
  if (!s.lastDay) return 0;
  return dayDiff(s.lastDay, today()) <= 1 ? s.streak : 0;
}

export function subscribe(fn: () => void) { listeners.add(fn); return () => { listeners.delete(fn); }; }

/** Replace the whole state (used after login). Keeps device settings such as theme and API key. */
export function replaceState(next: Partial<State> | null) {
  const f = fresh();
  const keep = state.settings;
  state = next ? { ...f, ...next, settings: { ...f.settings, ...(next.settings || {}), geminiKey: next.settings?.geminiKey || keep.geminiKey, voice: keep.voice } } : { ...f, settings: keep };
  persist();
  listeners.forEach((l) => l());
}

export function exportData() { return JSON.stringify(state, null, 2); }
export function importData(json: string) {
  const s = JSON.parse(json);
  if (typeof s !== 'object' || s === null || !('xp' in s)) throw new Error('Not a DeutschWeg backup');
  state = { ...fresh(), ...s, settings: { ...fresh().settings, ...(s.settings || {}) } };
  persist();
  listeners.forEach((l) => l());
}
export function resetAll() { state = fresh(); persist(); listeners.forEach((l) => l()); }

// ---------- achievements ----------
export interface Achievement { id: string; icon: string; name: string; desc: string; test: (s: State) => boolean }

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first', icon: '🌱', name: 'Erster Schritt', desc: 'Finish your first unit', test: (s) => Object.values(s.units).some((u) => u.done) },
  { id: 'xp500', icon: '⚡', name: 'Fleißig', desc: 'Earn 500 XP', test: (s) => s.xp >= 500 },
  { id: 'xp5000', icon: '🚀', name: 'Unaufhaltsam', desc: 'Earn 5,000 XP', test: (s) => s.xp >= 5000 },
  { id: 'streak3', icon: '🔥', name: 'Dranbleiben', desc: '3‑day streak', test: (s) => s.bestStreak >= 3 },
  { id: 'streak14', icon: '🏔️', name: 'Durchhalter', desc: '14‑day streak', test: (s) => s.bestStreak >= 14 },
  { id: 'words100', icon: '📚', name: 'Wortschatz', desc: '100 words in your deck', test: (s) => Object.keys(s.srs).length >= 100 },
  { id: 'speak10', icon: '🎙️', name: 'Sprechmaschine', desc: 'Complete 10 speaking tasks', test: (s) => s.speakCount >= 10 },
  { id: 'write3', icon: '✍️', name: 'Schreiberling', desc: 'Write 3 texts', test: (s) => s.writing.length >= 3 },
  { id: 'perfect', icon: '💎', name: 'Fehlerfrei', desc: 'Get 3 stars on a unit', test: (s) => Object.values(s.units).some((u) => u.stars === 3) },
  { id: 'drill200', icon: '🎯', name: 'Drill‑Meister', desc: '200 correct drill answers', test: (s) => Object.values(s.drills).reduce((a, d) => a + d.right, 0) >= 200 },
  { id: 'exam', icon: '🎓', name: 'Prüfungsreif', desc: 'Score 60%+ on a B2 mock module', test: (s) => Object.values(s.examScores).some((v) => v >= 60) },
];

let toastFn: ((msg: string, icon?: string) => void) | null = null;
export function onToast(fn: (msg: string, icon?: string) => void) { toastFn = fn; }
export function toast(msg: string, icon?: string) { toastFn?.(msg, icon); }

export function checkAchievements() {
  const got = ACHIEVEMENTS.filter((a) => !state.achievements.includes(a.id) && a.test(state));
  if (!got.length) return;
  setState((s) => { s.achievements.push(...got.map((g) => g.id)); });
  got.forEach((g) => toast(`Achievement unlocked: ${g.name}`, g.icon));
}
