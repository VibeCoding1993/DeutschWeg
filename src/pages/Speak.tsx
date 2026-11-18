import { useEffect, useMemo, useRef, useState } from 'react';
import { UNITS } from '../data';
import { SCENARIOS, SPEAKING } from '../data/speaking';
import { LEVELS, type Level, type SpeakingTask } from '../types';
import { fmt, MD, SpeakBtn, useTimer } from '../components/ui';
import { aiReady, chatTurn, rateSpeaking, type SpeakingFeedback } from '../lib/ai';
import { alignSpeech, pick } from '../lib/check';
import { listen, speak, sttAvailable, type Listener } from '../lib/speech';
import { sfx } from '../lib/sound';
import { addXP, checkAchievements, setState, useStore } from '../lib/store';
import { currentLevel } from '../lib/progress';
import { go } from '../router';
import Pron from '../components/Pron';

export default function Speak({ tab }: { tab?: string }) {
  const t = tab || 'shadow';
  return (
    <div className="page">
      <h1>Sprechen</h1>
      {!sttAvailable() && <div className="banner warn">🎙️ Speech recognition needs <b>Chrome</b> or <b>Edge</b> (desktop or Android). You can still listen and practise aloud.</div>}
      <div className="tabs">
        <button className={t === 'shadow' ? 'on' : ''} onClick={() => go('/speak/shadow')}>🦜 Shadowing</button>
        <button className={t === 'tasks' ? 'on' : ''} onClick={() => go('/speak/tasks')}>⏱️ Exam tasks</button>
        <button className={t === 'chat' ? 'on' : ''} onClick={() => go('/speak/chat')}>💬 AI partner</button>
      </div>
      {t === 'shadow' && <Shadowing />}
      {t === 'tasks' && <Tasks />}
      {t === 'chat' && <Chat />}
    </div>
  );
}

function Shadowing() {
  const lvl = useStore(currentLevel);
  const [level, setLevel] = useState<Level>(lvl);
  const pool = useMemo(() => UNITS.filter((u) => u.level === level).flatMap((u) => [
    ...u.ex.filter((e) => e.t === 'speak' || e.t === 'listen').map((e) => (e as { text: string }).text),
    ...u.vocab.filter((w) => w.ex).map((w) => w.ex!),
  ]), [level]);
  const [text, setText] = useState(() => pick(pool));
  const [heard, setHeard] = useState('');
  const [rec, setRec] = useState(false);
  const [err, setErr] = useState('');
  const [best, setBest] = useState(0);
  const lis = useRef<Listener | null>(null);
  useEffect(() => { setText(pick(pool)); setHeard(''); setBest(0); }, [pool]);
  useEffect(() => () => lis.current?.stop(), []);
  const r = heard ? alignSpeech(text, heard) : null;

  const start = () => {
    setErr(''); setHeard(''); setRec(true);
    lis.current = listen({
      onText: setHeard,
      onError: setErr,
      onEnd: (final) => {
        setRec(false);
        const sc = alignSpeech(text, final).score;
        if (final) {
          sfx(sc >= 80 ? 'ok' : 'bad');
          if (sc > best) { if (sc >= 80 && best < 80) addXP(5); setBest(sc); }
        }
      },
    });
  };

  return (
    <div className="card">
      <div className="row between wrap">
        <p className="muted">Listen → repeat right after the speaker, copying rhythm and melody. Aim for 80%+.</p>
        <div className="seg">{LEVELS.map((l) => <button key={l} className={level === l ? 'on' : ''} onClick={() => setLevel(l)}>{l}</button>)}</div>
      </div>
      <div className="shadow-text de">
        {r ? r.words.map((w, i) => <span key={i} className={w.ok ? 'hit' : 'miss'}>{w.w} </span>) : text}
      </div>
      <div className="center-text"><Pron text={text} /></div>
      <div className="listen-row center">
        <SpeakBtn text={text} /><SpeakBtn text={text} slow />
        <button className={`mic big ${rec ? 'rec' : ''}`} onClick={() => (rec ? lis.current?.stop() : start())} disabled={!sttAvailable()}>{rec ? '⏹ Stop' : '🎙️ Speak'}</button>
      </div>
      {r && <div className="score-line"><div className={`score ${r.score >= 80 ? 'good' : r.score >= 50 ? 'mid' : 'low'}`}>{r.score}%</div><div className="muted">I heard: <i>{heard}</i></div></div>}
      {err && <div className="error">{err}</div>}
      <div className="row center"><button className="btn ghost" onClick={() => { setText(pick(pool)); setHeard(''); setBest(0); }}>Next sentence →</button></div>
      <div className="tip-box">💡 Words in red weren't recognised. Common reasons: <b>ü/ö</b> (round your lips), final <b>-er</b> (sounds like "a"), <b>ch</b> after i/e (soft, like a cat hissing), and word stress on the first syllable.</div>
    </div>
  );
}

function Tasks() {
  const lvl = useStore(currentLevel);
  const [level, setLevel] = useState<Level>(lvl === 'A1' ? 'A1' : lvl);
  const [task, setTask] = useState<SpeakingTask | null>(null);
  const list = SPEAKING.filter((s) => s.level === level);
  if (task) return <TaskRunner task={task} onBack={() => setTask(null)} />;
  return (
    <>
      <div className="seg">{LEVELS.map((l) => <button key={l} className={level === l ? 'on' : ''} onClick={() => setLevel(l)}>{l}</button>)}</div>
      <div className="task-list">
        {list.map((t) => (
          <button key={t.id} className="task-card" onClick={() => setTask(t)}>
            <div className="tag">{t.type}</div>
            <b className="de">{t.title}</b>
            <small className="muted">{t.en}</small>
            <small>⏱ {fmt(t.prepSec)} prep · {fmt(t.talkSec)} talk</small>
          </button>
        ))}
        {!list.length && <p className="muted">No tasks at this level yet.</p>}
      </div>
    </>
  );
}

function TaskRunner({ task, onBack }: { task: SpeakingTask; onBack: () => void }) {
  const [stage, setStage] = useState<'prep' | 'talk' | 'review'>('prep');
  const [text, setText] = useState('');
  const [fb, setFb] = useState<SpeakingFeedback | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const lis = useRef<Listener | null>(null);
  const finalRef = useRef('');
  const stopTalk = () => { lis.current?.stop(); setStage('review'); };
  const [prepLeft] = useTimer(task.prepSec, stage === 'prep', () => beginTalk());
  const [talkLeft] = useTimer(task.talkSec, stage === 'talk', stopTalk);
  useEffect(() => () => lis.current?.stop(), []);

  function beginTalk() {
    setStage('talk'); sfx('tap');
    if (sttAvailable()) lis.current = listen({ continuous: true, onText: (t) => { finalRef.current = t; setText(t); }, onEnd: () => {}, onError: setErr });
  }
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  const getFeedback = async () => {
    setLoading(true); setErr('');
    try { setFb(await rateSpeaking(`${task.prompt}`, task.level, text)); } catch (e) { setErr((e as Error).message); }
    setLoading(false);
  };
  const finish = () => {
    setState((s) => { s.speakCount++; });
    addXP(20); checkAchievements(); onBack();
  };

  return (
    <div className="card">
      <button className="link" onClick={() => { lis.current?.stop(); onBack(); }}>← Tasks</button>
      <div className="tag">{task.level} · {task.type}</div>
      <h2 className="de">{task.title}</h2>
      <p className="de task-prompt">{task.prompt} <SpeakBtn small text={task.prompt} /></p>
      <p className="muted small">{task.en}</p>
      <details className="phrases" open={stage !== 'review'}>
        <summary>🧰 Useful phrases (Redemittel)</summary>
        <ul>{task.phrases.map((p) => <li key={p} className="de">{p} <SpeakBtn small text={p.replace(/…/g, '')} /><Pron text={p.replace(/…/g, '')} tips={false} /></li>)}</ul>
      </details>
      {stage === 'prep' && (
        <div className="timer-box"><div className="timer">{fmt(prepLeft)}</div><div className="muted">Preparation — make notes, plan your structure.</div>
          <button className="btn primary" onClick={beginTalk}>I'm ready — start speaking 🎙️</button></div>
      )}
      {stage === 'talk' && (
        <div className="timer-box live"><div className="timer">{fmt(talkLeft)}</div><div className="rec-dot">● Recording</div>
          <div className="transcript de">{text || <span className="muted">Start speaking…</span>}</div>
          <button className="btn danger" onClick={stopTalk}>⏹ Finish</button></div>
      )}
      {stage === 'review' && (
        <div>
          <h3>Your answer</h3>
          <div className="transcript de">{text || <span className="muted">No speech captured{sttAvailable() ? '' : ' (speech recognition not supported in this browser)'}.</span>}</div>
          <div className="muted small">{words} words · ~{Math.round(words / Math.max(1, (task.talkSec - talkLeft) / 60))} words/minute (B2 speakers: ~100+)</div>
          {err && <div className="error">{err}</div>}
          {!fb && text && (aiReady()
            ? <button className="btn primary" disabled={loading} onClick={getFeedback}>{loading ? 'Analysing…' : '🤖 Get examiner feedback'}</button>
            : <div className="banner">Add a free Gemini API key in <a href="#/me">Settings</a> to get AI examiner feedback on your answer.</div>)}
          {fb && (
            <div className="feedback">
              <div className="score-line"><div className={`score ${fb.score >= 70 ? 'good' : fb.score >= 50 ? 'mid' : 'low'}`}>{fb.score}</div><MD text={fb.summary} /></div>
              {fb.corrections?.length > 0 && <><h4>Corrections</h4><ul className="corrections">{fb.corrections.map((c, i) => <li key={i}><s>{c.original}</s> → <b className="de">{c.corrected}</b><div className="muted small">{c.why}</div></li>)}</ul></>}
              <h4>Model answer</h4><p className="de">{fb.better} <SpeakBtn small text={fb.better} /></p>
              <h4>Tips</h4><ul>{fb.tips?.map((t, i) => <li key={i}>{t}</li>)}</ul>
            </div>
          )}
          <div className="self-check">
            <h4>Self-check</h4>
            {['I covered every point of the task', 'I used connectors (weil, obwohl, deshalb …)', 'I gave a personal example', 'I gave my opinion and a conclusion'].map((c) => <label key={c}><input type="checkbox" /> {c}</label>)}
          </div>
          <div className="row"><button className="btn ghost" onClick={() => { setText(''); setFb(null); setStage('prep'); }}>Try again</button><button className="btn primary" onClick={finish}>Done (+20 XP)</button></div>
        </div>
      )}
    </div>
  );
}

interface ChatMsg { role: 'user' | 'model'; text: string }

function Chat() {
  const lvl = useStore(currentLevel);
  const [sc, setSc] = useState<(typeof SCENARIOS)[number] | null>(null);
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [rec, setRec] = useState(false);
  const [err, setErr] = useState('');
  const [autoSpeak, setAutoSpeak] = useState(true);
  const lis = useRef<Listener | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);
  useEffect(() => () => lis.current?.stop(), []);

  if (!aiReady()) return (
    <div className="card center-text">
      <div className="done-icon">🤖</div>
      <h2>Talk with an AI conversation partner</h2>
      <p className="muted">Role-play real situations — at the bakery, a flat viewing, a job interview, a B2 discussion — by voice or text. Mistakes get corrected gently.</p>
      <p>This needs a <b>free Google Gemini API key</b> (takes 1 minute at <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer">aistudio.google.com/apikey</a>). It's stored only in your browser.</p>
      <button className="btn primary" onClick={() => go('/me')}>Add key in Settings</button>
    </div>
  );

  const send = async (text: string, history = msgs) => {
    if (!sc) return;
    const h: ChatMsg[] = text ? [...history, { role: 'user', text }] : history;
    setMsgs(h); setInput(''); setBusy(true); setErr('');
    try {
      const firstTurn: ChatMsg[] = h.length ? h : [{ role: 'user', text: '(Start the conversation now.)' }];
      const reply = await chatTurn(sc.scenario, LEVELS.indexOf(sc.level) > LEVELS.indexOf(lvl) ? sc.level : lvl, firstTurn);
      setMsgs([...h, { role: 'model', text: reply }]);
      if (autoSpeak) speak(reply.split('\n💡')[0]);
      if (text) addXP(3);
    } catch (e) { setErr((e as Error).message); }
    setBusy(false);
  };

  if (!sc) return (
    <div className="task-list">
      {SCENARIOS.map((s) => (
        <button key={s.id} className="task-card" onClick={() => { setSc(s); setMsgs([]); setTimeout(() => send('', []), 0); }}>
          <div className="scenario-icon">{s.icon}</div><div className="tag">{s.level}</div><b className="de">{s.title}</b>
        </button>
      ))}
    </div>
  );

  return (
    <div className="card chat">
      <div className="row between"><button className="link" onClick={() => { setSc(null); setMsgs([]); }}>← Scenarios</button><b className="de">{sc.icon} {sc.title}</b>
        <label className="small"><input type="checkbox" checked={autoSpeak} onChange={(e) => setAutoSpeak(e.target.checked)} /> read replies aloud</label></div>
      <div className="chat-log">
        {msgs.filter((m) => !m.text.startsWith('(Start')).map((m, i) => {
          const [main, tip] = m.text.split('\n💡');
          return (
            <div key={i} className={`bubble ${m.role}`}>
              <div className="de">{main}</div>
              {m.role === 'model' && <SpeakBtn small text={main} />}
              {tip && <div className="bubble-tip">💡 {tip.trim()}</div>}
            </div>
          );
        })}
        {busy && <div className="bubble model typing">…</div>}
        <div ref={endRef} />
      </div>
      {err && <div className="error">{err}</div>}
      <div className="chat-input">
        <input className="answer de" value={input} placeholder="Schreib oder sprich…" onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && input.trim() && !busy) send(input.trim()); }} />
        {sttAvailable() && <button className={`mic ${rec ? 'rec' : ''}`} onClick={() => {
          if (rec) { lis.current?.stop(); return; }
          setRec(true);
          lis.current = listen({ onText: setInput, onEnd: (t) => { setRec(false); if (t.trim()) send(t.trim()); }, onError: setErr });
        }}>{rec ? '⏹' : '🎙️'}</button>}
        <button className="btn primary" disabled={!input.trim() || busy} onClick={() => send(input.trim())}>Send</button>
      </div>
    </div>
  );
}
