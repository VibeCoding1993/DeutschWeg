import { useEffect, useMemo, useRef, useState } from 'react';
import { allNouns, UNITS } from '../data';
import { adjQuestion, prepQuestion } from '../data/grammarDrills';
import { perfekt, praeteritum, present, PRONOUNS, VERBS } from '../data/verbs';
import { LEVELS, type Level } from '../types';
import { Art, SpeakBtn, UmlautBar } from '../components/ui';
import { checkAnswer, norm, pick } from '../lib/check';
import { speak } from '../lib/speech';
import { sfx } from '../lib/sound';
import { addXP, setState, useStore } from '../lib/store';
import { currentLevel } from '../lib/progress';
import { go } from '../router';
import { NUMBER_POOL } from '../lib/spoken';
import { DEMO } from '../lib/demo';

interface Q {
  prompt: React.ReactNode;
  audio?: string;           // speak on show
  answers?: string[];       // typed answer
  options?: string[];       // multiple choice
  correct?: number;
  reveal: React.ReactNode;  // shown after answering
  speakAfter?: string;
}

const NAMES: Record<string, string> = {
  articles: 'der · die · das', verbs: 'Verb conjugation', adjectives: 'Adjective endings',
  prepositions: 'Prepositions + case', numbers: 'Numbers by ear', dictation: 'Dictation',
};

function numberWordsQ(): Q {
  const it = pick(NUMBER_POOL);
  const prompt = { n: 'Which number? (type digits)', price: 'What does it cost? (type e.g. 12,99)', time: 'What time is it? (type e.g. 7:30 — 12h clock)', year: 'Which year? (type digits)', phone: 'Type the phone number digits' }[it.kind];
  return { prompt, audio: it.say, answers: it.answers, reveal: <span>{it.reveal}</span> };
}

export default function Drill({ id }: { id: string }) {
  const lvl = useStore((s) => currentLevel(s));
  const [maxLevel, setMaxLevel] = useState<Level>(lvl);
  const [tense, setTense] = useState<'Präsens' | 'Präteritum' | 'Perfekt' | 'Mix'>('Präsens');
  const allowed = LEVELS.slice(0, LEVELS.indexOf(maxLevel) + 1);
  const nouns = useMemo(() => allNouns().filter((n) => allowed.includes(n.level)), [maxLevel]); // eslint-disable-line react-hooks/exhaustive-deps
  const sentences = useMemo(() => UNITS.filter((u) => allowed.includes(u.level)).flatMap((u) => [
    ...u.ex.filter((e) => e.t === 'listen' || e.t === 'speak').map((e) => (e as { text: string }).text),
    ...u.vocab.filter((w) => w.ex).map((w) => w.ex!),
  ]), [maxLevel]); // eslint-disable-line react-hooks/exhaustive-deps

  const make = (): Q => {
    if (id === 'articles') {
      const n = pick(nouns);
      return {
        prompt: <span className="de big-word">{n.de}<div className="muted small">{n.en}</div></span>,
        options: ['der', 'die', 'das'], correct: ['der', 'die', 'das'].indexOf(n.g!),
        reveal: <span className="de"><Art g={n.g} /> {n.de}{n.pl && n.pl !== '-' ? <span className="muted"> · die {n.pl}</span> : ''}</span>,
        speakAfter: `${n.g} ${n.de}`,
      };
    }
    if (id === 'verbs') {
      const vs = VERBS.filter((v) => allowed.includes(v.lv));
      const v = pick(vs);
      const t = tense === 'Mix' ? pick(['Präsens', 'Präteritum', 'Perfekt'] as const) : tense;
      const forms = t === 'Präsens' ? present(v) : t === 'Präteritum' ? praeteritum(v) : perfekt(v);
      let i = Math.floor(Math.random() * 6);
      if (forms[i] === '–') i = 2;
      const pr = PRONOUNS[i].split('/')[0];
      return {
        prompt: <span><span className="tag">{t}</span> <span className="de big-word">{pr} ___</span><div className="muted">{v.inf} — {v.en}</div></span>,
        answers: [forms[i]],
        reveal: <span className="de">{PRONOUNS[i]} <b>{forms[i]}</b></span>,
        speakAfter: `${pr} ${forms[i]}`,
      };
    }
    if (id === 'adjectives') {
      const q = adjQuestion();
      return { prompt: <span><span className="tag">{q.caseName}</span> <span className="de big-word">{q.sentence}</span></span>, answers: [q.answer], reveal: <span><span className="de">{q.full}</span><div className="muted small">{q.explain}</div></span>, speakAfter: q.full };
    }
    if (id === 'prepositions') {
      const q = prepQuestion();
      return { prompt: <span className="de big-word">{q.prompt}</span>, options: q.options, correct: q.answer, reveal: <span className="muted">{q.explain}</span> };
    }
    if (id === 'numbers') return numberWordsQ();
    const t = pick(sentences);
    return { prompt: 'Listen and write the sentence', audio: t, answers: [t], reveal: <span className="de">{t}</span> };
  };

  const [q, setQ] = useState<Q>(make);
  const [val, setVal] = useState('');
  const [res, setRes] = useState<null | { ok: boolean; note?: string }>(null);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState({ r: 0, t: 0 });
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => { setQ(make()); setRes(null); setVal(''); }, [id, maxLevel, tense]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (q.audio) { const t = setTimeout(() => speak(q.audio!), 300); return () => clearTimeout(t); } }, [q]);
  useEffect(() => { if (!res) ref.current?.focus(); }, [q, res]);

  const answer = (ok: boolean, note?: string) => {
    setRes({ ok, note });
    sfx(ok ? 'ok' : 'bad');
    if (q.speakAfter) speak(q.speakAfter);
    setStreak((s) => (ok ? s + 1 : 0));
    setScore((s) => ({ r: s.r + (ok ? 1 : 0), t: s.t + 1 }));
    setState((s) => { const d = s.drills[id] || { right: 0, total: 0 }; s.drills[id] = { right: d.right + (ok ? 1 : 0), total: d.total + 1 }; });
    if (ok) addXP(streak >= 4 ? 3 : 2);
  };
  const submitTyped = () => {
    if (!val.trim() || !q.answers) return;
    const strictShort = id === 'adjectives' || id === 'numbers';
    const v = checkAnswer(val, q.answers);
    if (strictShort && norm(val) !== norm(v.best) && !q.answers.some((a) => norm(a) === norm(val))) v.ok = false;
    answer(v.ok, v.note);
  };
  const next = () => { setQ(make()); setRes(null); setVal(''); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (res && e.key === 'Enter') { e.preventDefault(); next(); return; }
      if (!res && q.options) {
        const n = Number(e.key);
        if (n >= 1 && n <= q.options.length) answer(n - 1 === q.correct);
      }
    };
    addEventListener('keydown', onKey); return () => removeEventListener('keydown', onKey);
  });

  if (!NAMES[id]) return <div className="page"><p>Unknown drill.</p></div>;
  if (id === 'articles' && !nouns.length) return <div className="page"><p>No nouns yet.</p></div>;

  return (
    <div className="page narrow">
      <div className="row between"><button className="link" onClick={() => go('/practice')}>← Practice</button><span className="muted">{score.r}/{score.t} · 🔥 {streak}</span></div>
      <h1>{NAMES[id]}</h1>
      <div className="row wrap">
        {id !== 'numbers' && id !== 'prepositions' && id !== 'adjectives' && (
          <label className="select">Up to level
            <select value={maxLevel} onChange={(e) => setMaxLevel(e.target.value as Level)}>{LEVELS.map((l) => <option key={l}>{l}</option>)}</select>
          </label>
        )}
        {id === 'verbs' && (
          <div className="seg">{(['Präsens', 'Präteritum', 'Perfekt', 'Mix'] as const).map((t) => <button key={t} className={tense === t ? 'on' : ''} onClick={() => setTense(t)}>{t}</button>)}</div>
        )}
      </div>
      <div className={`drill-box ${res ? (res.ok ? 'good' : 'bad') : ''}`}>
        <div className="drill-prompt">{q.prompt}</div>
        {q.audio && <div className="listen-row center"><SpeakBtn text={q.audio} /><SpeakBtn text={q.audio} slow /></div>}
        {q.options ? (
          <div className={`options ${q.options.length === 3 ? 'three' : ''}`}>
            {q.options.map((o, i) => (
              <button key={o} disabled={!!res} data-ok={DEMO && i === q.correct ? '1' : undefined} onClick={() => answer(i === q.correct)}
                className={`option ${id === 'articles' ? 'art-' + o : ''} ${res && i === q.correct ? 'right' : ''}`}><span className="key">{i + 1}</span><span className="de">{o}</span></button>
            ))}
          </div>
        ) : (
          <>
            <input ref={ref} data-answer={DEMO ? q.answers?.[0] : undefined} className="answer de center-text" value={val} disabled={!!res} onChange={(e) => setVal(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !res) { e.preventDefault(); e.stopPropagation(); submitTyped(); } }}
              placeholder={id === 'adjectives' ? 'ending only, e.g. en' : 'Type your answer'} autoCapitalize="off" spellCheck={false} autoComplete="off" />
            {!res && id !== 'numbers' && id !== 'adjectives' && <UmlautBar target={ref} onInsert={setVal} />}
            {!res && <button className="btn primary" disabled={!val.trim()} onClick={submitTyped}>Check</button>}
          </>
        )}
        {res && (
          <div className="drill-reveal">
            <div className={res.ok ? 'ok-text' : 'bad-text'}>{res.ok ? '✓ Richtig!' : '✗ Falsch'} {res.note && <span className="muted small">{res.note}</span>}</div>
            {q.reveal}
            <button className="btn primary" autoFocus onClick={next}>Next ↵</button>
          </div>
        )}
      </div>
    </div>
  );
}
