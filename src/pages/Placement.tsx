import { useMemo, useState } from 'react';
import { PLACEMENT } from '../data/placement';
import { LEVELS, type Level } from '../types';
import { LEVEL_INFO } from '../data';
import { Confetti, Progress } from '../components/ui';
import { shuffle } from '../lib/check';
import { addXP, setState } from '../lib/store';
import { sfx } from '../lib/sound';
import { go } from '../router';

/** Adaptive-ish placement: stops early once a level is clearly failed. */
export default function Placement() {
  const qs = useMemo(() => PLACEMENT.map((q) => { const order = shuffle(q.options.map((_, i) => i)); return { ...q, order }; }), []);
  const [i, setI] = useState(0);
  const [score, setScore] = useState<Record<string, number>>({});
  const [result, setResult] = useState<Level | 'none' | null>(null);

  const levelOf = (sc: Record<string, number>): Level | 'none' => {
    let passed: Level | 'none' = 'none';
    for (const l of LEVELS) { if ((sc[l] || 0) >= 4) passed = l; else break; }
    return passed;
  };

  const answer = (k: number) => {
    const q = qs[i];
    const ok = k === q.a;
    sfx(ok ? 'ok' : 'tap');
    const sc = { ...score, [q.lv]: (score[q.lv] || 0) + (ok ? 1 : 0) };
    setScore(sc);
    const isLastOfLevel = i + 1 >= qs.length || qs[i + 1].lv !== q.lv;
    if (isLastOfLevel && (sc[q.lv] || 0) < 4) { setResult(levelOf(sc)); return; }
    if (i + 1 >= qs.length) { setResult(levelOf(sc)); return; }
    setI(i + 1);
  };

  const apply = () => {
    setState((s) => { s.startLevel = result === 'none' ? null : (result as Level); s.onboarded = true; });
    addXP(10);
    go('/');
  };

  if (result) {
    const nextLv = result === 'none' ? 'A1' : LEVELS[Math.min(LEVELS.length - 1, LEVELS.indexOf(result) + 1)];
    return (
      <div className="page narrow center-text">
        <Confetti run={result !== 'none'} />
        <div className="done-icon">🧭</div>
        <h1>{result === 'none' ? 'Start from the beginning' : `You're above ${result}!`}</h1>
        <p className="muted">{result === 'none'
          ? 'Perfect — the path starts with the basics and builds up step by step.'
          : `All units up to ${result} are now unlocked (you can still do them for review). Your next stop: ${nextLv} · ${LEVEL_INFO[nextLv].name}.`}</p>
        <button className="btn primary big" onClick={apply}>Let's go →</button>
      </div>
    );
  }
  const q = qs[i];
  return (
    <div className="page narrow">
      <button className="link" onClick={() => go('/')}>✕ Skip test</button>
      <h1>Einstufungstest</h1>
      <p className="muted">Answer what you know. If you don't know, pick "I don't know" — no guessing needed.</p>
      <Progress value={(i / qs.length) * 100} />
      <div className="card">
        <div className="tag">Question {i + 1} · up to {q.lv}</div>
        <div className="ex-q de">{q.q}</div>
        <div className="options">
          {q.order.map((k) => <button key={k} className="option" onClick={() => answer(k)}><span className="de">{q.options[k]}</span></button>)}
          <button className="option idk" onClick={() => answer(-1)}>🤷 I don't know</button>
        </div>
      </div>
    </div>
  );
}
