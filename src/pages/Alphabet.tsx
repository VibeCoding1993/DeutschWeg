import { useEffect, useMemo, useRef, useState } from 'react';
import { SpeakBtn, UmlautBar } from '../components/ui';
import Pron from '../components/Pron';
import { checkAnswer, pick, shuffle } from '../lib/check';
import { speak, stopSpeaking } from '../lib/speech';
import { sfx } from '../lib/sound';
import { addXP, setState } from '../lib/store';
import { go } from '../router';
import { LETTERS, SPELL_WORDS } from '../data/alphabet';

const byLetter = (c: string) => LETTERS.find((x) => x.l === c.toUpperCase() || (c === 'ß' && x.l === 'ß'));

/** Spell a word letter by letter with the recorded letter names, then say the word. */
export function spell(word: string, token: { cancelled: boolean }, onDone?: () => void, sayWord = true) {
  const chars = [...word].filter((c) => /[a-zäöüß]/i.test(c));
  const step = (i: number) => {
    if (token.cancelled) return;
    if (i >= chars.length) { if (sayWord) setTimeout(() => !token.cancelled && speak(word, { onEnd: onDone }), 350); else onDone?.(); return; }
    const L = byLetter(chars[i]);
    speak(L ? L.name : chars[i], { onEnd: () => setTimeout(() => step(i + 1), 220) });
  };
  step(0);
}

type Tab = 'learn' | 'quiz' | 'spell' | 'name';

export default function Alphabet() {
  const [tab, setTab] = useState<Tab>('learn');
  return (
    <div className="page">
      <button className="link" onClick={() => go('/')}>← Lernen</button>
      <section className="hero alpha-hero">
        <div>
          <div className="eyebrow">🔤 Für Anfänger · Schritt 1</div>
          <h1>Das deutsche Alphabet</h1>
          <p className="muted">26 letters + Ä, Ö, Ü and ß. Learn how Germans <b>name</b> each letter — you need it to spell your name at offices, on the phone and in the exam.</p>
        </div>
        <div className="alpha-big">ABC<br /><span>ÄÖÜß</span></div>
      </section>
      <div className="tabs">
        <button className={tab === 'learn' ? 'on' : ''} onClick={() => setTab('learn')}>📖 Learn</button>
        <button className={tab === 'quiz' ? 'on' : ''} onClick={() => setTab('quiz')}>🎧 Letter quiz</button>
        <button className={tab === 'spell' ? 'on' : ''} onClick={() => setTab('spell')}>✍️ Spelling game</button>
        <button className={tab === 'name' ? 'on' : ''} onClick={() => setTab('name')}>🪪 Spell your name</button>
      </div>
      {tab === 'learn' && <Learn />}
      {tab === 'quiz' && <Quiz />}
      {tab === 'spell' && <SpellGame />}
      {tab === 'name' && <SpellName />}
    </div>
  );
}

function Learn() {
  const [sel, setSel] = useState<string | null>(null);
  const tok = useRef({ cancelled: false });
  const all = () => {
    tok.current.cancelled = true; tok.current = { cancelled: false };
    const t = tok.current;
    const step = (i: number) => { if (t.cancelled || i >= LETTERS.length) { setSel(null); return; } setSel(LETTERS[i].l); speak(LETTERS[i].name, { onEnd: () => setTimeout(() => step(i + 1), 250) }); };
    step(0);
  };
  useEffect(() => () => { tok.current.cancelled = true; stopSpeaking(); }, []);
  const cur = LETTERS.find((x) => x.l === sel);
  return (
    <>
      <div className="row wrap"><button className="btn primary" onClick={all}>▶ Play the whole alphabet</button><button className="btn ghost" onClick={() => { tok.current.cancelled = true; stopSpeaking(); setSel(null); }}>⏹ Stop</button></div>
      <div className="alpha-grid">
        {LETTERS.map((x) => (
          <button key={x.l} className={`letter ${sel === x.l ? 'on' : ''} ${'ÄÖÜß'.includes(x.l) ? 'special' : ''}`}
            onClick={() => { setSel(x.l); tok.current.cancelled = true; speak(x.name, { onEnd: () => setTimeout(() => speak(x.word), 300) }); }}>
            <b>{x.l}{x.l !== 'ß' ? x.l.toLowerCase() : ''}</b><small>„{x.name}"</small>
          </button>
        ))}
      </div>
      {cur && (
        <div className="card letter-card">
          <div className="letter-huge">{cur.l}</div>
          <div className="grow">
            <div className="de"><b>Name:</b> {cur.name} <span className="muted">— say „{cur.say}"</span> <SpeakBtn small text={cur.name} /></div>
            <div className="de"><b>Beispiel:</b> {cur.word} <span className="muted">({cur.en})</span> <SpeakBtn small text={cur.word} /></div>
            <Pron text={cur.word} />
            {cur.tip && <div className="tip-box">💡 {cur.tip}</div>}
          </div>
        </div>
      )}
      <div className="tip-box">💡 <b>The tricky ones for English speakers:</b> E is "eh", I is "ee", A is "ah", J is "yot", V is "fow", W is "veh", Z is "tset". Practise them in the quiz!</div>
    </>
  );
}

function Quiz() {
  const [q, setQ] = useState(() => pick(LETTERS));
  const opts = useMemo(() => shuffle([q, ...shuffle(LETTERS.filter((x) => x !== q)).slice(0, 3)]), [q]);
  const [res, setRes] = useState<string | null>(null);
  const [score, setScore] = useState({ r: 0, t: 0 });
  useEffect(() => { const t = setTimeout(() => speak(q.name), 300); return () => clearTimeout(t); }, [q]);
  const answer = (x: (typeof LETTERS)[number]) => {
    if (res) return;
    const ok = x === q;
    setRes(x.l); sfx(ok ? 'ok' : 'bad');
    setScore((s) => ({ r: s.r + (ok ? 1 : 0), t: s.t + 1 }));
    if (ok) addXP(1);
    setState((s) => { const d = s.drills.alphabet || { right: 0, total: 0 }; s.drills.alphabet = { right: d.right + (ok ? 1 : 0), total: d.total + 1 }; });
  };
  return (
    <div className="drill-box">
      <div className="row between"><span className="muted">Which letter do you hear?</span><span className="muted">{score.r}/{score.t}</span></div>
      <div className="listen-row center"><SpeakBtn text={q.name} /><SpeakBtn text={q.name} slow /></div>
      <div className="options quad">
        {opts.map((x) => <button key={x.l} className={`option letter-opt ${res && x === q ? 'right' : ''} ${res === x.l && x !== q ? 'wrong' : ''}`} onClick={() => answer(x)}><b>{x.l}</b></button>)}
      </div>
      {res && <div className="drill-reveal"><div className={res === q.l ? 'ok-text' : 'bad-text'}>{res === q.l ? '✓ Richtig!' : `✗ It was ${q.l} — „${q.name}"`}</div>
        <button className="btn primary" autoFocus onClick={() => { setQ(pick(LETTERS)); setRes(null); }}>Next ↵</button></div>}
    </div>
  );
}

function SpellGame() {
  const [word, setWord] = useState(() => pick(SPELL_WORDS));
  const [val, setVal] = useState('');
  const [res, setRes] = useState<null | boolean>(null);
  const [hint, setHint] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const tok = useRef({ cancelled: false });
  const play = () => { tok.current.cancelled = true; tok.current = { cancelled: false }; spell(word, tok.current, undefined, false); };
  useEffect(() => { const t = setTimeout(play, 300); ref.current?.focus(); return () => { clearTimeout(t); tok.current.cancelled = true; }; }, [word]); // eslint-disable-line react-hooks/exhaustive-deps
  const check = () => {
    const ok = checkAnswer(val, [word]).ok && val.trim().toLowerCase() === word.toLowerCase();
    setRes(ok); sfx(ok ? 'ok' : 'bad'); if (ok) addXP(2);
    tok.current.cancelled = true; setTimeout(() => speak(word), 200);
    setState((s) => { const d = s.drills.alphabet || { right: 0, total: 0 }; s.drills.alphabet = { right: d.right + (ok ? 1 : 0), total: d.total + 1 }; });
  };
  const next = () => { setWord(pick(SPELL_WORDS.filter((w) => w !== word))); setVal(''); setRes(null); setHint(false); };
  return (
    <div className={`drill-box ${res === null ? '' : res ? 'good' : 'bad'}`}>
      <p className="muted">Listen: the word is spelled letter by letter. Write the word.</p>
      <div className="listen-row center"><button className="btn primary" onClick={play}>🔁 Spell again</button><button className="btn ghost" onClick={() => setHint(true)}>💡 Hint</button></div>
      {hint && <div className="hint center-text">{word.length} letters · starts with „{word[0]}"</div>}
      <input ref={ref} className="answer de center-text" value={val} disabled={res !== null} onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); if (res === null && val.trim()) check(); else if (res !== null) next(); } }} placeholder="Type the word" autoCapitalize="off" spellCheck={false} />
      {res === null && <UmlautBar target={ref} onInsert={setVal} />}
      {res === null ? <button className="btn primary" disabled={!val.trim()} onClick={check}>Check</button> : (
        <div className="drill-reveal"><div className={res ? 'ok-text' : 'bad-text'}>{res ? '✓ Super!' : '✗ The word was:'}</div>
          <div className="spelled">{[...word].map((c, i) => <span key={i}>{c}</span>)}</div><Pron text={word} />
          <button className="btn primary" autoFocus onClick={next}>Next ↵</button></div>
      )}
    </div>
  );
}

function SpellName() {
  const [name, setName] = useState('');
  const tok = useRef({ cancelled: false });
  const letters = [...name].filter((c) => /[a-zäöüß]/i.test(c));
  return (
    <div className="card">
      <p>At the office: <i className="de">„Wie schreibt man das?"</i> — type your name and hear how to spell it in German.</p>
      <input className="answer de" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Otmane" />
      <div className="spelled">{letters.map((c, i) => { const L = byLetter(c); return <span key={i} title={L?.say}>{c.toUpperCase()}<small>{L?.name}</small></span>; })}</div>
      <div className="row"><button className="btn primary" disabled={!letters.length} onClick={() => { tok.current.cancelled = true; tok.current = { cancelled: false }; spell(name, tok.current, undefined, false); }}>▶ Spell it</button></div>
      <div className="tip-box">Useful: <i className="de">„groß"</i> = capital, <i className="de">„klein"</i> = small letter, <i className="de">„doppel-s"</i> = ss, <i className="de">„Bindestrich"</i> = hyphen.</div>
    </div>
  );
}
