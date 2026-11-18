export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export type Gender = 'der' | 'die' | 'das';

export interface Word {
  de: string;          // without article, e.g. "Hund" or "laufen"
  en: string;
  g?: Gender;          // nouns only
  pl?: string;         // plural form, "-" when none
  ex?: string;         // example sentence in German
}

/** Exercise kinds. Answers in `a` arrays are all accepted. */
export type Exercise =
  | { t: 'mc'; q: string; options: string[]; a: number; explain?: string }
  | { t: 'fill'; q: string; a: string[]; hint?: string; explain?: string }   // q contains "___"
  | { t: 'order'; en: string; de: string; explain?: string }                 // build de from shuffled words
  | { t: 'translate'; en: string; a: string[]; explain?: string }
  | { t: 'match'; pairs: [string, string][] }
  | { t: 'listen'; text: string; en?: string }                               // dictation
  | { t: 'speak'; text: string; en?: string };                               // read aloud

export type SceneKind = 'welcome' | 'cafe' | 'classroom' | 'city' | 'berlin' | 'flat' | 'office' | 'street' | 'beach' | 'mountains' | 'market' | 'shop' | 'doctor' | 'phone';

export interface DialogLine { who: string; de: string; en: string }
export interface Dialog { title: string; scene: SceneKind; lines: DialogLine[] }

export interface Unit {
  id: string;
  track?: 'studio';
  dialogs?: Dialog[];
  level: Level;
  icon: string;
  title: string;       // German title
  sub: string;         // English subtitle
  can: string;         // "can-do" goal
  grammar: { title: string; html: string };
  vocab: Word[];
  ex: Exercise[];
}

export interface WritingTask {
  id: string;
  level: Level;
  type: string;        // "E-Mail", "Forumsbeitrag" ...
  title: string;
  prompt: string;      // German task
  en: string;          // English gloss
  points?: string[];   // content points to cover
  words: [number, number];
  minutes: number;
  formal: boolean;
  phrases: string[];   // Redemittel
  model?: string;
}

export interface SpeakingTask {
  id: string;
  level: Level;
  type: string;
  title: string;
  prompt: string;
  en: string;
  prepSec: number;
  talkSec: number;
  phrases: string[];
}
