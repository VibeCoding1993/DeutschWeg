import { useEffect, useRef, useState } from 'react';
import { CLOZE, LISTENING, READING, type MCQ } from '../data/exam';
import { SpeakBtn } from '../components/ui';
import { speak, stopSpeaking } from '../lib/speech';
import { addXP, checkAchievements, setState, useStore } from '../lib/store';
import { sfx } from '../lib/sound';
import { go } from '../router';
import { roleIsFemale, splitScript } from '../lib/spoken';
import { CHARACTER_VOICE, NARRATOR } from '../data/voices';

/** Play an exam script line by line, one voice per speaker. */
export function playScript(script: string, token: { cancelled: boolean }, onDone?: () => void) {
  const lines = splitScript(script);
  const step = (i: number) => {
    if (token.cancelled) return;
    if (i >= lines.length) { onDone?.(); return; }
    speak(lines[i].text, { neural: roleIsFemale(lines[i].who) ? NARRATOR : CHARACTER_VOICE.karim, rate: 0.95, onEnd: () => setTimeout(() => step(i + 1), 400) });
  };
  step(0);
}

type Mod = { kind: 'r' | 'l' | 'c'; id: string };

export default function Exam() {
  const scores = useStore((s) => s.examScores);
  const [mod, setMod] = useState<Mod | null>(null);
  if (mod) return <Runner mod={mod} onBack={() => setMod(null)} />;
  const Card = ({ kind, id, title, icon, info }: { kind: Mod['kind']; id: string; title: string; icon: string; info: string }) => (
    <button className="task-card" onClick={() => setMod({ kind, id })}>
      <div className="scenario-icon">{icon}</div><b className="de">{title}</b><small className="muted">{info}</small>
      {scores[id] != null && <small className={scores[id] >= 60 ? 'ok-text' : 'bad-text'}>Best: {scores[id]}% {scores[id] >= 60 ? '· bestanden ✓' : ''}</small>}
    </button>
  );
  return (
    <div className="page">
      <h1>B2 Prüfungstraining</h1>
      <p className="muted">Practice modules modelled on the <b>Goethe-Zertifikat B2</b> and <b>telc Deutsch B2</b> formats. 60% per module is a pass.</p>
      <div className="card exam-overview">
        <h3>Goethe B2 at a glance</h3>
        <div className="exam-grid">
          <div><b>📖 Lesen</b><small>65 min · 5 parts</small></div>
          <div><b>🎧 Hören</b><small>40 min · 4 parts</small></div>
          <div><b>✍️ Schreiben</b><small>75 min · forum post + formal message</small></div>
          <div><b>🎤 Sprechen</b><small>15 min · presentation + discussion</small></div>
        </div>
      </div>
      <h2>📖 Lesen</h2>
      <div className="task-list">{READING.map((r) => <Card key={r.id} kind="r" id={r.id} title={r.title.replace('Lesen · ', '')} icon="📖" info={`${r.questions.length} questions`} />)}</div>
      <h2>🎧 Hören</h2>
      <div className="task-list">{LISTENING.map((r) => <Card key={r.id} kind="l" id={r.id} title={r.title.replace('Hören · ', '')} icon="🎧" info={`${r.questions.length} questions · audio`} />)}</div>
      <h2>🧱 Sprachbausteine</h2>
      <div className="task-list">{CLOZE.map((r) => <Card key={r.id} kind="c" id={r.id} title={r.title.replace('Sprachbausteine · ', '')} icon="🧱" info={`${r.gaps.length} gaps`} />)}</div>
      <h2>✍️ Schreiben & 🎤 Sprechen</h2>
      <div className="task-list">
        <button className="task-card" onClick={() => go('/write/w-b2-1')}><div className="scenario-icon">✍️</div><b>Schreiben Teil 1</b><small className="muted">Forumsbeitrag · 150 words · 50 min</small></button>
        <button className="task-card" onClick={() => go('/write/w-b2-2')}><div className="scenario-icon">📨</div><b>Schreiben Teil 2</b><small className="muted">Formal message · 100 words · 25 min</small></button>
        <button className="task-card" onClick={() => go('/speak/tasks')}><div className="scenario-icon">🎤</div><b>Sprechen Teil 1 & 2</b><small className="muted">Presentation & discussion with timer</small></button>
      </div>
    </div>
  );
}

function Questions({ qs, answers, setAnswers, checked }: { qs: MCQ[]; answers: (number | null)[]; setAnswers: (a: (number | null)[]) => void; checked: boolean }) {
  return (
    <ol className="exam-qs">
      {qs.map((q, i) => (
        <li key={i}>
          <div className="de">{q.q}</div>
          <div className={`options ${q.options.length === 2 ? 'two' : ''}`}>
            {q.options.map((o, k) => (
              <button key={k} disabled={checked}
                className={`option ${answers[i] === k ? 'sel' : ''} ${checked && k === q.a ? 'right' : ''} ${checked && answers[i] === k && k !== q.a ? 'wrong' : ''}`}
                onClick={() => setAnswers(answers.map((a, j) => (j === i ? k : a)))}><span className="de">{o}</span></button>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}

function Runner({ mod, onBack }: { mod: Mod; onBack: () => void }) {
  const part = mod.kind === 'r' ? READING.find((r) => r.id === mod.id)! : mod.kind === 'l' ? LISTENING.find((r) => r.id === mod.id)! : CLOZE.find((r) => r.id === mod.id)!;
  const n = 'questions' in part ? part.questions.length : part.gaps.length;
  const [answers, setAnswers] = useState<(number | null)[]>(Array(n).fill(null));
  const [checked, setChecked] = useState(false);
  const [plays, setPlays] = useState(0);
  const [showScript, setShowScript] = useState(false);
  const tok = useRef({ cancelled: false });
  useEffect(() => () => { tok.current.cancelled = true; stopSpeaking(); }, []);
  const correctIdx = 'questions' in part ? part.questions.map((q) => q.a) : part.gaps.map((g) => g.a);
  const right = answers.filter((a, i) => a === correctIdx[i]).length;
  const pct = Math.round((right / n) * 100);

  const check = () => {
    setChecked(true); stopSpeaking();
    sfx(pct >= 60 ? 'win' : 'bad');
    setState((s) => { s.examScores[mod.id] = Math.max(s.examScores[mod.id] || 0, pct); });
    addXP(10 + right * 3); checkAchievements();
  };

  return (
    <div className="page narrow">
      <button className="link" onClick={() => { stopSpeaking(); onBack(); }}>← Exam overview</button>
      <h1 className="de">{part.title}</h1>
      <p className="muted de">{part.instructions}</p>
      {mod.kind === 'r' && 'text' in part && <article className="card exam-text de">{part.text.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}</article>}
      {mod.kind === 'l' && 'script' in part && (
        <div className="card">
          <div className="listen-row">
            <button className="btn primary" disabled={plays >= 2 && !checked} onClick={() => { setPlays((p) => p + 1); tok.current.cancelled = true; tok.current = { cancelled: false }; playScript(part.script, tok.current); }}>
              ▶ Play {plays >= 2 && !checked ? '(max. 2×)' : `(${2 - Math.min(2, plays)} left)`}
            </button>
            <button className="btn ghost" onClick={() => { tok.current.cancelled = true; stopSpeaking(); }}>⏹ Stop</button>
          </div>
          <p className="muted small">Read the questions first, like in the real exam. Then listen.</p>
          {checked && <button className="link" onClick={() => setShowScript(!showScript)}>{showScript ? 'Hide' : 'Show'} transcript</button>}
          {showScript && <pre className="de model">{part.script}</pre>}
        </div>
      )}
      {mod.kind === 'c' && 'gaps' in part ? (
        <article className="card exam-text de cloze">
          {part.text.split(/(\[\d+\])/).map((seg, i) => {
            const m = seg.match(/\[(\d+)\]/);
            if (!m) return <span key={i}>{seg}</span>;
            const gi = Number(m[1]) - 1; const g = part.gaps[gi];
            const st = checked ? (answers[gi] === g.a ? 'right' : 'wrong') : '';
            return (
              <select key={i} className={`cloze-sel ${st}`} disabled={checked} value={answers[gi] ?? ''}
                onChange={(e) => setAnswers(answers.map((a, j) => (j === gi ? Number(e.target.value) : a)))}>
                <option value="" disabled>({gi + 1}) …</option>
                {g.options.map((o, k) => <option key={k} value={k}>{o}</option>)}
              </select>
            );
          })}
          {checked && <ol className="small muted">{part.gaps.map((g, i) => <li key={i}>{g.options[g.a]}</li>)}</ol>}
        </article>
      ) : 'questions' in part && <Questions qs={part.questions} answers={answers} setAnswers={setAnswers} checked={checked} />}
      {!checked ? (
        <button className="btn primary big" disabled={answers.some((a) => a === null)} onClick={check}>Abgeben (submit)</button>
      ) : (
        <div className={`card result ${pct >= 60 ? 'good' : 'bad'}`}>
          <div className="score-line"><div className={`score ${pct >= 60 ? 'good' : 'low'}`}>{pct}%</div>
            <div><b>{right}/{n} correct — {pct >= 60 ? 'bestanden! 🎉' : 'not yet — 60% needed'}</b>
              <div className="muted small">{pct >= 60 ? 'Great work. Try the next module.' : 'Review the answers above, then retry tomorrow.'}</div></div></div>
          <div className="row"><button className="btn ghost" onClick={() => { setAnswers(Array(n).fill(null)); setChecked(false); setPlays(0); setShowScript(false); }}>Retry</button><button className="btn primary" onClick={onBack}>Back</button></div>
        </div>
      )}
      {mod.kind === 'r' && checked && <p className="muted small">Tip: in B2 reading, the answer is usually paraphrased — look for synonyms, not identical words. <SpeakBtn small text={'text' in part ? part.text : ''} /> listen to the text</p>}
    </div>
  );
}
