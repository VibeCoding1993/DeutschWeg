import { useMemo, useState } from 'react';
import { unitById, trackOf, wordKey, LEVEL_INFO } from '../data';
import DialogPlayer from '../components/DialogPlayer';
import Pron from '../components/Pron';
import { Mascot } from '../components/Brand';
import type { Exercise, Unit } from '../types';
import ExerciseView from '../components/Exercise';
import { Art, Confetti, Progress, SpeakBtn } from '../components/ui';
import { shuffle } from '../lib/check';
import { addXP, checkAchievements, setState } from '../lib/store';
import { newCard } from '../lib/srs';
import { sfx } from '../lib/sound';
import { go } from '../router';

/** Extra auto-generated exercises from the unit's vocabulary. */
function vocabExercises(u: Unit): Exercise[] {
  const words = shuffle(u.vocab);
  const out: Exercise[] = [];
  const pairs = words.slice(0, 4).map((w) => [w.g ? `${w.g} ${w.de}` : w.de, w.en.replace(/\s*\(.*\)/, '')] as [string, string]);
  if (pairs.length === 4) out.push({ t: 'match', pairs });
  words.slice(4, 6).forEach((w) => {
    const others = shuffle(u.vocab.filter((x) => x !== w)).slice(0, 3);
    const opts = shuffle([w, ...others]);
    out.push({ t: 'mc', q: `What is "${w.en}" in German?`, options: opts.map((o) => (o.g ? `${o.g} ${o.de}` : o.de)), a: opts.indexOf(w) });
  });
  // exercises from the unit's dialogs: dictation, sentence building, speaking
  const lines = shuffle((u.dialogs || []).flatMap((d) => d.lines).filter((l) => !/[–]/.test(l.de)));
  const short = lines.filter((l) => { const n = l.de.split(' ').length; return n >= 4 && n <= 9; });
  if (short[0]) out.push({ t: 'order', en: short[0].en, de: short[0].de.replace(/[.!?]$/, '') });
  if (short[1]) out.push({ t: 'listen', text: short[1].de, en: short[1].en });
  if (short[2]) out.push({ t: 'speak', text: short[2].de, en: short[2].en });
  const noun = words.find((w) => w.g);
  if (noun) out.push({ t: 'mc', q: `___ ${noun.de} (${noun.en})`, options: ['der', 'die', 'das'], a: ['der', 'die', 'das'].indexOf(noun.g!) });
  return out;
}

export default function Lesson({ id }: { id: string }) {
  const unit = unitById(id);
  const [phase, setPhase] = useState<'learn' | 'practice' | 'done'>('learn');
  const [result, setResult] = useState<Result | null>(null);
  if (!unit) return <div className="page"><p>Unit not found.</p><button className="btn" onClick={() => go('/')}>Home</button></div>;
  return (
    <div className="page lesson">
      {phase === 'learn' && <Learn unit={unit} onStart={() => setPhase('practice')} />}
      {phase === 'practice' && <Practice key={unit.id} unit={unit} onDone={(r) => { setResult(r); setPhase('done'); }} />}
      {phase === 'done' && <Done unit={unit} last={result} onAgain={() => setPhase('practice')} />}
    </div>
  );
}

function Learn({ unit, onStart }: { unit: Unit; onStart: () => void }) {
  const info = LEVEL_INFO[unit.level];
  return (
    <>
      <button className="link back" onClick={() => go(unit.track === 'studio' ? '/studio' : '/')}>← Path</button>
      <header className="lesson-head" style={{ ['--lv' as string]: info.color }}>
        <div className="lesson-icon">{unit.icon}</div>
        <div>
          <div className="eyebrow">{unit.level} · {info.name}</div>
          <h1 className="de">{unit.title}</h1>
          <p className="muted">{unit.sub} — <i>{unit.can}</i></p>
        </div>
      </header>
      {unit.dialogs?.map((d, i) => (
        <article key={i} className="card">{i === 0 && <div className="eyebrow">🎧 Hören & Sprechen — listen first, then role-play</div>}<DialogPlayer dialog={d} /></article>
      ))}
      <article className="card grammar">
        <h2>📐 {unit.grammar.title}</h2>
        <div className="g-html de-mixed" dangerouslySetInnerHTML={{ __html: unit.grammar.html }} />
      </article>
      <article className="card">
        <h2>📚 Wortschatz <span className="muted small">— tap 🔊 to hear each word</span></h2>
        <div className="vocab-grid">
          {unit.vocab.map((w) => (
            <div key={w.de} className="vocab">
              <SpeakBtn small text={w.g ? `${w.g} ${w.de}` : w.de} />
              <div className="grow">
                <div className="de"><Art g={w.g} /> <b>{w.de}</b>{w.pl && w.pl !== '-' && w.g && <span className="muted small"> · pl. {w.pl}</span>}</div>
                <Pron text={w.g ? `${w.g} ${w.de}` : w.de} tips={false} />
                <div className="muted small">{w.en}</div>
                {w.ex && <div className="small ex-line de">„{w.ex}" <SpeakBtn small text={w.ex} /></div>}
              </div>
            </div>
          ))}
        </div>
      </article>
      <div className="sticky-cta"><button className="btn primary big" onClick={onStart}>Start practice →</button></div>
    </>
  );
}

function Practice({ unit, onDone }: { unit: Unit; onDone: (r: Result) => void }) {
  const initial = useMemo(() => {
    // Beginners build translations from word tiles instead of typing them.
    const ex = shuffle(unit.ex).map((e): Exercise => (unit.level === 'A1' && e.t === 'translate' && e.a[0].split(' ').length <= 9
      ? { t: 'order', en: e.en, de: e.a[0].replace(/[.!?]$/, ''), explain: e.explain } : e));
    const gen = vocabExercises(unit);
    // put the vocabulary warm-up first, then the unit exercises
    return [...gen.slice(0, 2), ...ex, ...gen.slice(2)];
  }, [unit]);
  const easy = unit.level === 'A1' || unit.level === 'A2';
  const pool = useMemo(() => unit.ex.flatMap((e) => (e.t === 'fill' ? [e.a[0]] : [])), [unit]);
  const [queue, setQueue] = useState<Exercise[]>(initial);
  const [pos, setPos] = useState(0);
  const [stats, setStats] = useState({ right: 0, wrong: 0, combo: 0, best: 0 });
  const [retried] = useState(() => new Set<Exercise>());

  const ex = queue[pos];
  const total = initial.length;
  const firstPassDone = Math.min(pos, total);

  const handle = (ok: boolean) => {
    const isRetry = pos >= total;
    const right = stats.right + (ok && !isRetry ? 1 : 0);
    const combo = ok ? stats.combo + 1 : 0;
    const best = Math.max(stats.best, combo);
    setStats({ right, wrong: stats.wrong + (!ok && !isRetry ? 1 : 0), combo, best });
    let q = queue;
    if (!ok && !retried.has(ex)) { retried.add(ex); q = [...queue, ex]; setQueue(q); }
    if (pos + 1 >= q.length) { onDone(finishUnit(unit, right / total, best)); return; }
    setPos(pos + 1);
  };

  return (
    <div className="practice">
      <div className="practice-top">
        <button className="link" onClick={() => { if (confirm('Leave this lesson? Progress in this session will be lost.')) go('/'); }}>✕</button>
        <Progress value={(firstPassDone / total) * 100} color="var(--green)" />
        <div className={`combo ${stats.combo >= 3 ? 'hot' : ''}`}>🔥 {stats.combo}</div>
      </div>
      {pos >= total && <div className="retry-tag">🔁 Second chance — mistakes from earlier</div>}
      <ExerciseView key={pos} ex={ex} onDone={handle} easy={easy} pool={pool} />
    </div>
  );
}

interface Result { accuracy: number; stars: number; xp: number }

function finishUnit(unit: Unit, accuracy: number, bestCombo: number): Result {
  const stars = accuracy >= 0.95 ? 3 : accuracy >= 0.8 ? 2 : 1;
  const xp = 15 + Math.round(accuracy * 20) + stars * 5 + Math.min(10, bestCombo);
  setState((s) => {
    const prev = s.units[unit.id];
    s.units[unit.id] = {
      best: Math.max(prev?.best || 0, Math.round(accuracy * 100)),
      stars: Math.max(prev?.stars || 0, stars),
      done: true,
      plays: (prev?.plays || 0) + 1,
    };
    unit.vocab.forEach((w) => { const k = wordKey(unit, w); if (!s.srs[k]) s.srs[k] = newCard(); });
  });
  addXP(xp);
  checkAchievements();
  sfx('win');
  return { accuracy, stars, xp };
}

function Done({ unit, last, onAgain }: { unit: Unit; last: Result | null; onAgain: () => void }) {
  const list = trackOf(unit);
  const idx = list.findIndex((u) => u.id === unit.id);
  const next = list[idx + 1];
  const acc = Math.round((last?.accuracy ?? 0) * 100);
  return (
    <div className="done">
      <Confetti run />
      <Mascot size={130} mood="cheer" say={(last?.stars ?? 0) === 3 ? 'Perfekt! Drei Sterne! 🏆' : 'Toll gemacht! Weiter so!'} />
      <h1>Unit geschafft!</h1>
      <div className="big-stars">{[1, 2, 3].map((k) => <span key={k} className={(last?.stars ?? 0) >= k ? 'on' : ''}>★</span>)}</div>
      <div className="done-stats">
        <div><b>{acc}%</b><small>accuracy</small></div>
        <div><b>+{last?.xp ?? 0}</b><small>XP</small></div>
        <div><b>{unit.vocab.length}</b><small>words to review</small></div>
      </div>
      <p className="muted">The new words are now in your review deck — come back tomorrow to lock them in.</p>
      <div className="row center">
        <button className="btn ghost" onClick={onAgain}>Practise again</button>
        {next ? <button className="btn primary" onClick={() => go(`/lesson/${next.id}`)}>Next: {next.icon} {next.title} →</button>
          : <button className="btn primary" onClick={() => go('/')}>Back to path</button>}
      </div>
    </div>
  );
}
