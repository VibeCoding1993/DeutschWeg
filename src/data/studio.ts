import type { Exercise, Unit } from '../types';
import { STUDIO_1 } from './studio1';
import { STUDIO_2 } from './studio2';

const BASE = [...STUDIO_1, ...STUDIO_2];

/** Review unit built from the three units before it. */
function station(n: number, units: Unit[]): Unit {
  const ex: Exercise[] = units.flatMap((u) => u.ex.filter((_, i) => i % 2 === 0));
  return {
    id: `st-station-${n}`, level: 'A1', track: 'studio', icon: '🚉', title: `Station ${n}`,
    sub: `Review: ${units.map((u) => u.title).join(' · ')}`,
    can: 'Repeat and consolidate the last three units.',
    grammar: {
      title: `Station ${n} — what you can do now`,
      html: `<ul>${units.map((u) => `<li><b>${u.icon} ${u.title}</b>: ${u.can}<br/><small>Grammar: ${u.grammar.title}</small></li>`).join('')}</ul>
<div class="tip">Replay the dialogs below with <b>Hide text</b> switched on — can you understand everything by ear? Then try each role yourself.</div>`,
    },
    dialogs: units.map((u) => u.dialogs![0]),
    vocab: units.flatMap((u) => u.vocab.slice(0, 4)),
    ex,
  };
}

export const STUDIO: Unit[] = [];
BASE.forEach((u, i) => {
  STUDIO.push(u);
  // stations after units 3, 6, 9, 12 (index 3, 6, 9, 12 because of the start unit)
  if (i > 0 && i % 3 === 0) STUDIO.push(station(i / 3, BASE.slice(i - 2, i + 1)));
});
