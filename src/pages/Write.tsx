import { useMemo, useRef, useState } from 'react';
import { WRITING } from '../data/writing';
import { LEVELS, type Level, type WritingTask } from '../types';
import { fmt, MD, SpeakBtn, UmlautBar, useTimer } from '../components/ui';
import { aiReady, correctWriting, type WritingFeedback } from '../lib/ai';
import { addXP, checkAchievements, setState, today, useStore } from '../lib/store';
import { currentLevel } from '../lib/progress';
import { go } from '../router';

export default function Write({ id }: { id?: string }) {
  const task = WRITING.find((w) => w.id === id);
  if (task) return <Editor task={task} />;
  return <List />;
}

function List() {
  const lvl = useStore(currentLevel);
  const written = useStore((s) => s.writing);
  const [level, setLevel] = useState<Level>(lvl);
  const list = WRITING.filter((w) => w.level === level);
  return (
    <div className="page">
      <h1>Schreiben</h1>
      <p className="muted">Real exam formats with a timer, word counter, phrase bank, automatic checks and (optional) AI examiner correction.</p>
      <div className="seg">{LEVELS.map((l) => <button key={l} className={level === l ? 'on' : ''} onClick={() => setLevel(l)}>{l}</button>)}</div>
      <div className="task-list">
        {list.map((t) => {
          const n = written.filter((w) => w.taskId === t.id).length;
          return (
            <button key={t.id} className="task-card" onClick={() => go(`/write/${t.id}`)}>
              <div className="tag">{t.type}</div>
              <b className="de">{t.title}</b>
              <small className="muted">{t.en}</small>
              <small>📝 {t.words[0]}–{t.words[1]} words · ⏱ {t.minutes} min {t.formal ? '· formal' : ''}{n ? ` · ✓ written ${n}×` : ''}</small>
            </button>
          );
        })}
      </div>
      {written.length > 0 && (
        <section className="card">
          <h2>Your texts</h2>
          {[...written].reverse().slice(0, 10).map((w) => {
            const t = WRITING.find((x) => x.id === w.taskId);
            return <details key={w.id} className="past"><summary>{w.date} · {t?.title}{w.score != null ? ` · ${w.score}/100` : ''}</summary><pre className="de">{w.text}</pre></details>;
          })}
        </section>
      )}
    </div>
  );
}

const CONNECTORS = ['weil', 'denn', 'obwohl', 'trotzdem', 'deshalb', 'deswegen', 'außerdem', 'aber', 'jedoch', 'dass', 'wenn', 'falls', 'als', 'damit', 'sodass', 'einerseits', 'andererseits', 'zum beispiel', 'zuerst', 'danach', 'schließlich', 'zusammenfassend', 'meiner meinung nach', 'allerdings', 'darüber hinaus', 'hinzu kommt', 'während', 'indem', 'je', 'desto', 'nicht nur', 'sondern auch', 'sowohl', 'zwar', 'dennoch', 'folglich', 'daher'];

function autoChecks(text: string, task: WritingTask) {
  const lower = ' ' + text.toLowerCase().replace(/[.,!?;:]/g, ' ') + ' ';
  const words = text.trim() ? text.trim().split(/\s+/) : [];
  const sentences = text.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
  const used = CONNECTORS.filter((c) => lower.includes(` ${c} `));
  const freq: Record<string, number> = {};
  words.forEach((w) => { const k = w.toLowerCase().replace(/[^a-zäöüß]/g, ''); if (k.length > 4) freq[k] = (freq[k] || 0) + 1; });
  const repeated = Object.entries(freq).filter(([, n]) => n >= 4).map(([w]) => w);
  const avg = sentences.length ? Math.round(words.length / sentences.length) : 0;
  const checks: { ok: boolean; text: string }[] = [];
  const [min, max] = task.words;
  checks.push({ ok: words.length >= min && words.length <= max * 1.15, text: `Length: ${words.length} words (target ${min}–${max})` });
  const wantConn = LEVELS.indexOf(task.level) >= 2 ? 5 : 2;
  checks.push({ ok: used.length >= wantConn, text: `Connectors: ${used.length} different (${used.slice(0, 8).join(', ') || 'none'}) — aim for ${wantConn}+` });
  if (task.formal) {
    const hasGreeting = /sehr geehrte/i.test(text);
    const hasClosing = /mit freundlichen grüßen|freundliche grüße/i.test(text);
    const du = /\b(du|dich|dir|dein|deine)\b/i.test(text);
    checks.push({ ok: hasGreeting && hasClosing, text: `Formal greeting & closing ${hasGreeting && hasClosing ? 'present' : '— add "Sehr geehrte …" and "Mit freundlichen Grüßen"'}` });
    checks.push({ ok: !du, text: du ? 'You used "du" in a formal text — use "Sie/Ihnen/Ihr".' : 'Consistent "Sie" form' });
  }
  checks.push({ ok: avg >= (LEVELS.indexOf(task.level) >= 3 ? 10 : 6), text: `Average sentence length: ${avg} words ${avg < 8 ? '— combine sentences with weil, dass, obwohl…' : ''}` });
  if (repeated.length) checks.push({ ok: false, text: `Repeated words: ${repeated.join(', ')} — try synonyms` });
  const lowerNouns = (text.match(/\b(der|die|das|den|dem|des|ein|eine|einen|einem)\s+([a-zäöü][a-zäöüß]{3,})\b/g) || [])
    .filter((m) => !/\s(gut|neu|alt|groß|klein|erst|letzt|nächst|ander|ganz|einzig|wichtig|gleich|schön|best)/.test(m))
    .slice(0, 4);
  if (lowerNouns.length) checks.push({ ok: false, text: `Possible nouns without a capital letter: ${lowerNouns.join(' · ')}` });
  return checks;
}

function Editor({ task }: { task: WritingTask }) {
  const draftKey = `dw.draft.${task.id}`;
  const [text, setText] = useState(() => { try { return localStorage.getItem(draftKey) || ''; } catch { return ''; } });
  const [running, setRunning] = useState(false);
  const [left] = useTimer(task.minutes * 60, running);
  const [fb, setFb] = useState<WritingFeedback | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [showModel, setShowModel] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  const checks = useMemo(() => autoChecks(text, task), [text, task]);
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  const update = (v: string) => { setText(v); try { localStorage.setItem(draftKey, v); } catch { /* ignore */ } if (!running && v) setRunning(true); };
  const insert = (p: string) => {
    const el = ref.current; const s = el?.selectionStart ?? text.length;
    const add = p.replace(/…/g, '').trimEnd() + ' ';
    update(text.slice(0, s) + add + text.slice(s));
    requestAnimationFrame(() => { el?.focus(); el?.setSelectionRange(s + add.length, s + add.length); });
  };

  const submit = async () => {
    setRunning(false); setSubmitted(true);
    let score: number | undefined;
    if (aiReady()) {
      setLoading(true); setErr('');
      try { const f = await correctWriting(`${task.prompt}\nInhaltspunkte: ${(task.points || []).join('; ')}\nUmfang: ${task.words[0]}-${task.words[1]} Wörter`, task.level, text); setFb(f); score = f.score; }
      catch (e) { setErr((e as Error).message); }
      setLoading(false);
    }
    setState((s) => { s.writing.push({ id: String(Date.now()), taskId: task.id, text, date: today(), score }); });
    addXP(Math.min(40, 10 + Math.round(words / 8)));
    checkAchievements();
    try { localStorage.removeItem(draftKey); } catch { /* ignore */ }
  };

  return (
    <div className="page write">
      <button className="link" onClick={() => go('/write')}>← Writing tasks</button>
      <div className="write-grid">
        <div>
          <div className="tag">{task.level} · {task.type}</div>
          <h1 className="de">{task.title}</h1>
          <div className="card task-box">
            <p className="de">{task.prompt}</p>
            <p className="muted small">{task.en}</p>
            {task.points && <ul className="points">{task.points.map((p) => <li key={p} className="de">☐ {p}</li>)}</ul>}
          </div>
          <div className="editor-top">
            <span className={`timer small ${left < 300 && running ? 'warn' : ''}`}>⏱ {fmt(left)}</span>
            <span className={words >= task.words[0] ? 'ok-text' : 'muted'}>{words} / {task.words[0]}–{task.words[1]} words</span>
          </div>
          <textarea ref={ref} className="editor de" value={text} disabled={submitted} onChange={(e) => update(e.target.value)} spellCheck={false}
            placeholder={task.formal ? 'Sehr geehrte Damen und Herren, …' : 'Hallo …'} />
          {!submitted && <UmlautBar target={ref} onInsert={update} />}
          {!submitted ? (
            <div className="row"><button className="btn primary big" disabled={words < 10} onClick={submit}>{aiReady() ? 'Submit for AI correction' : 'Submit'}</button></div>
          ) : (
            <div className="row"><button className="btn ghost" onClick={() => { setSubmitted(false); setFb(null); }}>Revise my text</button><button className="btn" onClick={() => { update(''); setSubmitted(false); setFb(null); }}>Start over</button></div>
          )}
          {loading && <div className="card loading">🤖 The examiner is reading your text…</div>}
          {err && <div className="error">{err}</div>}
          {submitted && !aiReady() && <div className="banner">Want detailed corrections, a band score and an improved version? Add a free Gemini API key in <a href="#/me">Settings</a>.</div>}
          {fb && <Feedback fb={fb} />}
        </div>
        <aside>
          <div className="card">
            <h3>✅ Live checks</h3>
            <ul className="checks">{checks.map((c, i) => <li key={i} className={c.ok ? 'ok' : 'no'}>{c.ok ? '✓' : '•'} {c.text}</li>)}</ul>
          </div>
          <div className="card">
            <h3>🧰 Phrase bank <span className="muted small">click to insert</span></h3>
            <div className="phrase-bank">{task.phrases.map((p) => <button key={p} className="phrase de" onClick={() => insert(p)} disabled={submitted}>{p}</button>)}</div>
          </div>
          {task.model && (
            <div className="card">
              <h3>📄 Model answer</h3>
              {showModel ? <><pre className="de model">{task.model}</pre><SpeakBtn text={task.model} /></> : <button className="btn ghost" onClick={() => setShowModel(true)}>Reveal (try first!)</button>}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function Feedback({ fb }: { fb: WritingFeedback }) {
  return (
    <div className="card feedback">
      <div className="score-line">
        <div className={`score ${fb.score >= 70 ? 'good' : fb.score >= 50 ? 'mid' : 'low'}`}>{fb.score}</div>
        <div><b>Estimated level: {fb.level}</b><div className="muted small">Score for the target level (60+ ≈ pass)</div></div>
      </div>
      <div className="criteria">
        {fb.criteria?.map((c) => (
          <div key={c.name} className="crit"><div className="row between"><b className="de">{c.name}</b><span>{c.score}</span></div>
            <div className="bar"><div style={{ width: `${c.score}%` }} /></div><MD text={c.comment} /></div>
        ))}
      </div>
      {fb.corrections?.length > 0 && <>
        <h3>Corrections</h3>
        <ul className="corrections">{fb.corrections.map((c, i) => <li key={i}><s className="de">{c.original}</s> → <b className="de">{c.corrected}</b><div className="muted small">{c.why}</div></li>)}</ul>
      </>}
      <h3>Improved version</h3>
      <pre className="de model">{fb.improved}</pre>
      <h3>Tips</h3>
      <ul>{fb.tips?.map((t, i) => <li key={i}><MD text={t} /></li>)}</ul>
    </div>
  );
}
