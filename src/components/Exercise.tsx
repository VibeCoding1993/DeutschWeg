import { useEffect, useMemo, useRef, useState } from 'react';
import type { Exercise } from '../types';
import { alignSpeech, checkAnswer, norm, shuffle, type Verdict } from '../lib/check';
import { listen, speak, sttAvailable, type Listener } from '../lib/speech';
import { sfx } from '../lib/sound';
import { SpeakBtn, UmlautBar } from './ui';
import { exerciseSpeech } from '../lib/spoken';
import Pron from './Pron';
import { DEMO } from '../lib/demo';

interface Props { ex: Exercise; onDone: (ok: boolean) => void; easy?: boolean; pool?: string[] }

const TITLES: Record<Exercise['t'], string> = {
  mc: 'Choose the right answer', fill: 'Fill in the gap', order: 'Build the sentence', translate: 'Translate into German',
  match: 'Match the pairs', listen: 'Write what you hear', speak: 'Say it out loud',
};

export default function ExerciseView({ ex, onDone, easy, pool = [] }: Props) {
  const [verdict, setVerdict] = useState<(Verdict & { shown?: string }) | null>(null);
  const [ready, setReady] = useState(false);
  const submitRef = useRef<() => void>(() => {});

  const finish = (v: Verdict & { shown?: string }) => {
    setVerdict(v); sfx(v.ok ? 'ok' : 'bad');
    const say = exerciseSpeech(ex);
    if (say && ex.t !== 'listen' && ex.t !== 'speak') setTimeout(() => speak(say), 450);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' || e.shiftKey) return;
      if (verdict) { e.preventDefault(); onDone(verdict.ok); }
      else if (ready) { e.preventDefault(); submitRef.current(); }
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [verdict, ready, onDone]);

  const body = (() => {
    switch (ex.t) {
      case 'mc': return <MC ex={ex} locked={!!verdict} setReady={setReady} submitRef={submitRef} finish={finish} />;
      case 'fill': return <Fill ex={ex} locked={!!verdict} setReady={setReady} submitRef={submitRef} finish={finish} easy={easy} pool={pool} />;
      case 'translate': return <Translate ex={ex} locked={!!verdict} setReady={setReady} submitRef={submitRef} finish={finish} />;
      case 'order': return <Order ex={ex} locked={!!verdict} setReady={setReady} submitRef={submitRef} finish={finish} />;
      case 'listen': return <Listen ex={ex} locked={!!verdict} setReady={setReady} submitRef={submitRef} finish={finish} />;
      case 'speak': return <Speak ex={ex} locked={!!verdict} setReady={setReady} submitRef={submitRef} finish={finish} />;
      case 'match': return <Match ex={ex} finish={finish} />;
    }
  })();

  const explain = 'explain' in ex ? ex.explain : undefined;

  return (
    <div className="exercise">
      <div className="ex-kind">{TITLES[ex.t]}</div>
      {body}
      <div className={`ex-foot ${verdict ? (verdict.ok ? 'good' : 'bad') : ''}`}>
        {verdict ? (
          <>
            <div className="ex-msg">
              <b>{verdict.ok ? pickPraise() : 'Not quite.'}</b>
              {verdict.note && <div>{verdict.note}</div>}
              {(!verdict.ok || verdict.shown) && verdict.best && <div>Correct: <b className="de">{verdict.shown || verdict.best}</b> {exerciseSpeech(ex) && <SpeakBtn small text={exerciseSpeech(ex)!} />}</div>}
              {exerciseSpeech(ex) && <Pron text={exerciseSpeech(ex)!} />}
              {explain && <div className="muted">{explain}</div>}
            </div>
            <button className={`btn ${verdict.ok ? 'primary' : 'danger'}`} autoFocus onClick={() => onDone(verdict.ok)}>Continue ↵</button>
          </>
        ) : ex.t !== 'match' ? (
          <>
            <span className="muted small">Press Enter to check</span>
            <button className="btn primary" disabled={!ready} onClick={() => submitRef.current()}>Check</button>
          </>
        ) : <span className="muted small">Tap a German word, then its meaning</span>}
      </div>
    </div>
  );
}

const PRAISE = ['Richtig! 🎉', 'Super! ✨', 'Genau! 👏', 'Sehr gut! 💪', 'Perfekt! 🌟', 'Toll! 🙌'];
const pickPraise = () => PRAISE[Math.floor(Math.random() * PRAISE.length)];

interface SubProps<T> { ex: T; locked: boolean; setReady: (b: boolean) => void; submitRef: React.MutableRefObject<() => void>; finish: (v: Verdict & { shown?: string }) => void }

/** Renders text with ___ gaps highlighted. */
const Gap = ({ q, fill }: { q: string; fill?: React.ReactNode }) => {
  const parts = q.split('___');
  return <span>{parts.map((p, i) => <span key={i}>{p}{i < parts.length - 1 && (fill ?? <span className="gap">____</span>)}</span>)}</span>;
};

function MC({ ex, locked, setReady, submitRef, finish }: SubProps<Extract<Exercise, { t: 'mc' }>>) {
  const order = useMemo(() => shuffle(ex.options.map((_, i) => i)), [ex]);
  const [sel, setSel] = useState<number | null>(null);
  useEffect(() => setReady(sel !== null), [sel, setReady]);
  submitRef.current = () => { if (sel === null) return; finish({ ok: sel === ex.a, best: ex.q.includes('___') ? ex.q.replace('___', ex.options[ex.a]) : ex.options[ex.a] }); };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { const n = Number(e.key); if (!locked && n >= 1 && n <= order.length) setSel(order[n - 1]); };
    addEventListener('keydown', onKey); return () => removeEventListener('keydown', onKey);
  }, [order, locked]);
  return (
    <>
      <div className="ex-q de">{ex.q.includes('___') ? <Gap q={ex.q} fill={sel !== null ? <span className="gap filled">{ex.options[sel]}</span> : undefined} /> : ex.q}</div>
      <div className="options">
        {order.map((i, k) => (
          <button key={i} disabled={locked} data-ok={DEMO && i === ex.a ? '1' : undefined}
            className={`option ${sel === i ? 'sel' : ''} ${locked && i === ex.a ? 'right' : ''} ${locked && sel === i && i !== ex.a ? 'wrong' : ''}`}
            onClick={() => { sfx('tap'); setSel(i); }}>
            <span className="key">{k + 1}</span><span className="de">{ex.options[i]}</span>
          </button>
        ))}
      </div>
    </>
  );
}

function Fill({ ex, locked, setReady, submitRef, finish, easy, pool = [] }: SubProps<Extract<Exercise, { t: 'fill' }>> & { easy?: boolean; pool?: string[] }) {
  const parts = ex.q.split('___');
  const n = parts.length - 1;
  const [vals, setVals] = useState<string[]>(() => Array(n).fill(''));
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const active = useRef<HTMLInputElement | null>(null);
  const [focusIdx, setFocusIdx] = useState(0);
  useEffect(() => { refs.current[0]?.focus(); }, []);
  useEffect(() => setReady(vals.every((v) => v.trim().length > 0)), [vals, setReady]);
  const joined = vals.map((v) => v.trim()).join(' ');
  submitRef.current = () => {
    const r = checkAnswer(joined, ex.a);
    // Gap answers are short: only umlaut slips are forgiven, not typos.
    if (r.note?.startsWith('Small typo') && norm(joined) !== norm(r.best)) r.ok = false;
    const words = r.best.split(' ');
    const fills = n > 1 && words.length === n ? words : [r.best, ...Array(n - 1).fill('')];
    finish({ ...r, shown: parts.map((p, i) => p + (i < n ? fills[i] : '')).join('').replace(/\s+/g, ' ') });
  };
  const expected = ex.a[0].split(' ');
  const [hinted, setHinted] = useState(false);
  const bank = useMemo(() => {
    const own = n > 1 && expected.length === n ? expected : [ex.a[0]];
    const others = shuffle(Array.from(new Set(pool.flatMap((p) => (n > 1 ? p.split(' ') : [p])))).filter((w) => !own.map((o) => o.toLowerCase()).includes(w.toLowerCase()))).slice(0, 3);
    return shuffle([...own, ...others]);
  }, [ex]); // eslint-disable-line react-hooks/exhaustive-deps
  const putChip = (w: string) => {
    sfx('tap');
    setVals((vs) => { const k = vs.findIndex((v) => !v.trim()); const idx = k === -1 ? focusIdx : k; return vs.map((x, j) => (j === idx ? w : x)); });
  };
  return (
    <>
      <div className="ex-q de">
        {parts.map((p, i) => (
          <span key={i}>{p}{i < n && (
            <input ref={(el) => { refs.current[i] = el; }} className="gap-input"
              style={{ width: `${Math.max(4, (n > 1 ? expected[i]?.length : ex.a[0].length) || 4) + 2}ch` }}
              value={vals[i]} disabled={locked} onFocus={(e) => { active.current = e.target; setFocusIdx(i); }}
              onChange={(e) => setVals((vs) => vs.map((x, k) => (k === i ? e.target.value : x)))}
              autoCapitalize="off" autoComplete="off" spellCheck={false} />
          )}</span>
        ))}
      </div>
      {ex.hint && <div className="hint">💡 {ex.hint}</div>}
      {hinted && <div className="hint">🔎 Starts with: {expected.map((w) => `„${w.slice(0, Math.max(1, Math.ceil(w.length / 3)))}…"`).join('  ')}</div>}
      {!locked && easy && <div className="word-bank">{bank.map((w, k) => <button key={k} className="tile chip" data-ok={DEMO && expected.includes(w) ? String(expected.indexOf(w)) : undefined} onClick={() => putChip(w)}>{w}</button>)}</div>}
      {!locked && <div className="row wrap">
        {!hinted && <button className="link" onClick={() => setHinted(true)}>💡 Hint</button>}
        {vals.some((v) => v) && <button className="link" onClick={() => setVals(Array(n).fill(''))}>↺ Clear</button>}
      </div>}
      {!locked && !easy && <UmlautBar target={active} onInsert={(v) => setVals((vs) => vs.map((x, k) => (k === focusIdx ? v : x)))} />}
    </>
  );
}

function Translate({ ex, locked, setReady, submitRef, finish }: SubProps<Extract<Exercise, { t: 'translate' }>>) {
  const [v, setV] = useState('');
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => { ref.current?.focus(); }, []);
  useEffect(() => setReady(v.trim().length > 0), [v, setReady]);
  submitRef.current = () => finish(checkAnswer(v, ex.a));
  return (
    <>
      <div className="ex-q">{ex.en}</div>
      <textarea ref={ref} data-answer={DEMO ? ex.a[0] : undefined} className="answer de" rows={2} placeholder="Auf Deutsch…" value={v} disabled={locked}
        onChange={(e) => setV(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }} spellCheck={false} />
      {!locked && <UmlautBar target={ref} onInsert={setV} />}
    </>
  );
}

function Order({ ex, locked, setReady, submitRef, finish }: SubProps<Extract<Exercise, { t: 'order' }>>) {
  const words = useMemo(() => ex.de.replace(/[.,!?]/g, '').split(/\s+/), [ex]);
  const pool = useMemo(() => {
    let s = shuffle(words.map((w, i) => ({ w, i })));
    for (let k = 0; k < 5 && s.every((x, j) => x.i === j) && words.length > 1; k++) s = shuffle(s);
    return s;
  }, [words]);
  const [picked, setPicked] = useState<number[]>([]);
  useEffect(() => setReady(picked.length === words.length), [picked, words, setReady]);
  submitRef.current = () => {
    const built = picked.map((i) => words[i]).join(' ');
    finish({ ok: norm(built) === norm(ex.de), best: ex.de });
  };
  return (
    <>
      <div className="ex-q">{ex.en}</div>
      <div className="built de">
        {picked.length === 0 && <span className="muted">Tap the words in order…</span>}
        {picked.map((i) => <button key={i} className="tile" disabled={locked} onClick={() => { sfx('tap'); setPicked((p) => p.filter((x) => x !== i)); }}>{words[i]}</button>)}
      </div>
      <div className="pool de">
        {pool.map(({ w, i }) => (
          <button key={i} data-i={DEMO ? i : undefined} className={`tile ${picked.includes(i) ? 'used' : ''}`} disabled={locked || picked.includes(i)}
            onClick={() => { sfx('tap'); setPicked((p) => [...p, i]); }}>{w}</button>
        ))}
      </div>
    </>
  );
}

function Listen({ ex, locked, setReady, submitRef, finish }: SubProps<Extract<Exercise, { t: 'listen' }>>) {
  const [v, setV] = useState('');
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => { const t = setTimeout(() => speak(ex.text), 350); ref.current?.focus(); return () => clearTimeout(t); }, [ex]);
  useEffect(() => setReady(v.trim().length > 0), [v, setReady]);
  submitRef.current = () => {
    const r = checkAnswer(v, [ex.text]);
    if (!r.ok) {
      const { score } = alignSpeech(ex.text, v);
      if (score >= 90) { finish({ ok: true, note: `Almost — ${score}% of words correct. Compare carefully:`, best: ex.text, shown: ex.text }); return; }
    }
    finish({ ...r, best: ex.text, shown: ex.en ? `${ex.text} — ${ex.en}` : ex.text });
  };
  return (
    <>
      <div className="listen-row">
        <SpeakBtn text={ex.text} label="Play sentence" />
        <SpeakBtn text={ex.text} slow />
        <span className="muted">Listen and type the sentence.</span>
      </div>
      <textarea ref={ref} data-answer={DEMO ? ex.text : undefined} className="answer de" rows={2} placeholder="Was hörst du?" value={v} disabled={locked}
        onChange={(e) => setV(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }} spellCheck={false} />
      {!locked && <UmlautBar target={ref} onInsert={setV} />}
    </>
  );
}

function Speak({ ex, locked, setReady, submitRef, finish }: SubProps<Extract<Exercise, { t: 'speak' }>>) {
  const [heard, setHeard] = useState('');
  const [rec, setRec] = useState(false);
  const [err, setErr] = useState('');
  const lis = useRef<Listener | null>(null);
  const result = heard ? alignSpeech(ex.text, heard) : null;
  useEffect(() => setReady(!!heard || !sttAvailable()), [heard, setReady]);
  useEffect(() => () => lis.current?.stop(), []);
  submitRef.current = () => {
    if (!sttAvailable()) { finish({ ok: true, best: ex.text, note: 'Speech recognition isn\'t available in this browser (try Chrome) — self-checked.' }); return; }
    if (!result) return;
    finish({ ok: result.score >= 70, best: ex.text, note: `Pronunciation match: ${result.score}%` });
  };
  const start = () => {
    setErr(''); setHeard(''); setRec(true);
    lis.current = listen({ onText: (t) => setHeard(t), onEnd: () => setRec(false), onError: setErr });
  };
  return (
    <>
      <div className="speak-target de">
        {result ? result.words.map((w, i) => <span key={i} className={w.ok ? 'hit' : 'miss'}>{w.w} </span>) : ex.text}
      </div>
      <Pron text={ex.text} />
      {ex.en && <div className="muted">{ex.en}</div>}
      <div className="listen-row">
        <SpeakBtn text={ex.text} /><SpeakBtn text={ex.text} slow />
        {sttAvailable() ? (
          <button className={`mic ${rec ? 'rec' : ''}`} disabled={locked} onClick={() => (rec ? lis.current?.stop() : start())}>
            {rec ? '⏹ Stop' : '🎙️ Tap & speak'}
          </button>
        ) : <span className="muted small">Mic recognition needs Chrome/Edge. Read it aloud, then press Check.</span>}
      </div>
      {heard && <div className="heard">I heard: <i>{heard}</i></div>}
      {err && <div className="error">{err}</div>}
      {!locked && sttAvailable() && <button className="link" onClick={() => finish({ ok: true, best: ex.text, note: 'Skipped the microphone.' })}>Can't speak right now → skip</button>}
    </>
  );
}

function Match({ ex, finish }: { ex: Extract<Exercise, { t: 'match' }>; finish: (v: Verdict) => void }) {
  const left = useMemo(() => shuffle(ex.pairs.map((p, i) => ({ s: p[0], i }))), [ex]);
  const right = useMemo(() => shuffle(ex.pairs.map((p, i) => ({ s: p[1], i }))), [ex]);
  const [sel, setSel] = useState<number | null>(null);
  const [done, setDone] = useState<number[]>([]);
  const [wrong, setWrong] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const tryMatch = (i: number) => {
    if (sel === null) return;
    if (sel === i) {
      sfx('tap');
      const nd = [...done, i]; setDone(nd); setSel(null);
      if (nd.length === ex.pairs.length) finish({ ok: errors <= 1, best: '', note: errors ? `${errors} mistake${errors > 1 ? 's' : ''}` : 'No mistakes!' });
    } else { sfx('bad'); setErrors((e) => e + 1); setWrong(i); setTimeout(() => setWrong(null), 500); }
  };
  return (
    <div className="match">
      <div>{left.map(({ s, i }) => (
        <button key={i} data-pair={DEMO ? i : undefined} className={`tile wide de ${sel === i ? 'sel' : ''} ${done.includes(i) ? 'done' : ''}`} disabled={done.includes(i)}
          onClick={() => { setSel(i); speak(s); }}>{s}</button>
      ))}</div>
      <div>{right.map(({ s, i }) => (
        <button key={i} data-pair={DEMO ? i : undefined} className={`tile wide ${done.includes(i) ? 'done' : ''} ${wrong === i ? 'shake' : ''}`} disabled={done.includes(i)}
          onClick={() => tryMatch(i)}>{s}</button>
      ))}</div>
    </div>
  );
}
