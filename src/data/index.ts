import type { Level, Unit, Word } from '../types';
import { A1 } from './a1';
import { A2 } from './a2';
import { B1 } from './b1';
import { B2 } from './b2';
import { C1, C2 } from './c';
import { STUDIO } from './studio';

export { STUDIO };

export const UNITS: Unit[] = [...A1, ...A2, ...B1, ...B2, ...C1, ...C2];

export const LEVEL_INFO: Record<Level, { name: string; color: string; desc: string }> = {
  A1: { name: 'Anfänger', color: '#2ec4b6', desc: 'Basics: introduce yourself, numbers, daily life' },
  A2: { name: 'Grundlagen', color: '#3a86ff', desc: 'Past tense, cases, everyday situations' },
  B1: { name: 'Mittelstufe', color: '#8f5cff', desc: 'Independent: opinions, stories, work' },
  B2: { name: 'Fortgeschritten', color: '#ff5d8f', desc: 'Exam level: argue, report, formal writing' },
  C1: { name: 'Fachkundig', color: '#ff9f1c', desc: 'Academic & professional German' },
  C2: { name: 'Meisterschaft', color: '#ffd23f', desc: 'Near-native nuance, idiom and style' },
};

export const unitById = (id: string) => UNITS.find((u) => u.id === id) || STUDIO.find((u) => u.id === id);
export const trackOf = (u: Unit) => (u.track === 'studio' ? STUDIO : UNITS);

export const wordKey = (u: Unit, w: Word) => `${u.id}|${w.de}`;

export function findWord(key: string): { unit: Unit; word: Word } | null {
  const [uid, de] = key.split('|');
  const unit = unitById(uid);
  const word = unit?.vocab.find((w) => w.de === de);
  return unit && word ? { unit, word } : null;
}

export const allNouns = () =>
  [...UNITS, ...STUDIO].flatMap((u) => u.vocab.filter((w) => w.g).map((w) => ({ ...w, level: u.level })));
