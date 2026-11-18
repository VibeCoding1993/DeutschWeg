import { useEffect, useMemo, useRef, useState } from 'react';
import { A1_TEST, SECTIONS, type Section, type TQ } from '../data/a1test';
import { BANK, bankStats, type BQ } from '../data/bank';
import { LEVELS, type Level } from '../types';
import { LEVEL_INFO } from '../data';
import { CHARACTER_VOICE, NARRATOR } from '../data/voices';
import { Confetti, Progress, fmt, useTimer } from '../components/ui';
import { shuffle } from '../lib/check';
import { speak, stopSpeaking } from '../lib/speech';
import { sfx } from '../lib/sound';
import { api, saveResult, useUser } from '../lib/api';
import { addXP, checkAchievements } from '../lib/store';
import { DEMO } from '../lib/demo';
import { Mascot } from '../components/Brand';

export const voiceFor = (who: string) => (who === 'F' ? NARRATOR : who === 'M' ? CHARACTER_VOICE.karim : who);
type AnyQ = TQ | BQ;

interface Mode { id: string; title: string; questions: AnyQ[]; minutes: number; placement?: boolean }

function playLines(lines: [string, string][], onDone: () => void, token: { cancelled: boolean }) {
  const step = (i: number) => {
    if (token.cancelled) return;
    if (i >= lines.length) { onDone(); return; }
    speak(lines[i][1], { neural: voiceFor(lines[i][0]), onEnd: () => setTimeout(() => step(i + 1), 350) });
  };
  step(0);
}

export default function Tests() {
  const user = useUser();
  const [mode, setMode] = useState<Mode | null>(null);
  const [history, setHistory] = useState<{ test_id: string; title: string; score: number; total: number; created_at: string }[]>([]);
  useEffect(() => { if (user) api<typeof history>('/results').then(setHistory).catch(() => {}); }, [user, mode]);

  if (mode) return <Runner mode={mode} onExit={() => setMode(null)} />;

  const start = (m: Mode) => { setMode(m); scrollTo({ top: 0 }); };
  const bySection = (s: Section) => A1_TEST.filter((q) => q.section === s);
  const best = (id: string) => { const r = history.filter((h) => h.test_id === id); return r.length ? Math.max(...r.map((x) => Math.round((100 * x.score) / x.total))) : null; };

  return (
    <div className="page">
      <section className="hero test-hero">
        <div>
          <div className="eyebrow">📝 Prüfungstraining A1–C2</div>
          <h1>Test-Center A1–C2</h1>
          <p className="muted">{TOTAL.toLocaleString('de-DE')} questions from A1 to C2 in four parts — listening, reading, vocabulary and grammar — plus a 100-question A1 mock exam. Your scores are saved to your account; 60% is a pass.</p>
          <div className="hero-cta">
            <button className="btn primary big" onClick={() => start({ id: 'a1-full', title: 'A1 Modelltest (100 Fragen)', questions: SECTIONS.flatMap((s) => bySection(s.name)), minutes: 75 })}>🎓 Full mock test · 100 questions</button>
            <button className="btn ghost big" onClick={() => start({ id: 'a1-quick', title: 'A1 Schnelltest (20 Fragen)', questions: shuffle(A1_TEST).slice(0, 20), minutes: 15 })}>⚡ Quick test · 20 random</button>
          </div>
        </div>
        <div className="big-score"><b>{(TOTAL / 1000).toFixed(1)}k</b><small>questions</small></div>
      </section>

      <BankPicker start={start} best={best} />

      <h2>A1 Modelltest — practise one part</h2>
      <div className="task-list">
        {SECTIONS.map((s) => {
          const b = best(`a1-${s.name}`);
          return (
            <button key={s.name} className="task-card section-card" onClick={() => start({ id: `a1-${s.name}`, title: `A1 ${s.name}`, questions: bySection(s.name), minutes: s.minutes })}>
              <div className="scenario-icon">{s.icon}</div><b className="de">{s.name}</b><small className="muted">{s.desc}</small>
              <small>25 questions · {s.minutes} min</small>
              {b != null && <small className={b >= 60 ? 'ok-text' : 'bad-text'}>Best: {b}%</small>}
            </button>
          );
        })}
      </div>

      {history.length > 0 && (
        <section className="card">
          <h2>Your results</h2>
          <div className="spark">{[...history].reverse().slice(-24).map((h, i) => { const p = Math.round((100 * h.score) / h.total); return <div key={i} title={`${h.title}: ${p}%`} style={{ height: `${Math.max(6, p)}%` }} className={p >= 60 ? 'good' : 'bad'} />; })}</div>
          <table className="admin-table small-table"><tbody>
            {history.slice(0, 10).map((h, i) => { const p = Math.round((100 * h.score) / h.total); return (
              <tr key={i}><td className="muted small">{h.created_at.slice(0, 16)}</td><td>{h.title}</td><td><span className={`pill ${p >= 60 ? 'good' : 'bad'}`}>{h.score}/{h.total} · {p}%</span></td></tr>
            ); })}
          </tbody></table>
        </section>
      )}
    </div>
  );
}

const STATS = bankStats();
const TOTAL = BANK.length;

function seededPick<T>(arr: T[], n: number): T[] { return shuffle(arr).slice(0, n); }

function BankPicker({ start, best }: { start: (m: Mode) => void; best: (id: string) => number | null }) {
  const [level, setLevel] = useState<Level | 'mix'>('A1');
  const [section, setSection] = useState<Section | 'all'>('all');
  const [count, setCount] = useState(20);
  const pool = BANK.filter((q) => (level === 'mix' || q.level === level) && (section === 'all' || q.section === section));
  const go = () => {
    // spread the questions across the four parts when "all" is selected
    let qs: AnyQ[];
    if (section === 'all') {
      const per = Math.ceil(count / 4);
      qs = SECTIONS.flatMap((s) => seededPick(pool.filter((q) => q.section === s.name), per)).slice(0, count);
      qs = qs.length < count ? [...qs, ...seededPick(pool.filter((q) => !qs.includes(q)), count - qs.length)] : qs;
      qs.sort((a, b) => SECTIONS.findIndex((s) => s.name === a.section) - SECTIONS.findIndex((s) => s.name === b.section));
    } else qs = seededPick(pool, count);
    const lv = level === 'mix' ? 'A1–C2' : level;
    start({ id: `bank-${level}-${section}`, title: `${lv} · ${section === 'all' ? 'alle Teile' : section} · ${qs.length} Fragen`, questions: qs, minutes: Math.max(5, Math.round(qs.length * 0.9)) });
  };
  const placement = () => {
    const qs = LEVELS.flatMap((l) => SECTIONS.flatMap((s) => seededPick(BANK.filter((q) => q.level === l && q.section === s.name), s.name === 'Lesen' && ['C1', 'C2'].includes(l) ? 1 : 2)));
    start({ id: 'bank-placement', title: 'Einstufungstest A1–C2', questions: qs, minutes: 40, placement: true });
  };
  return (
    <section className="card bank">
      <div className="row between wrap">
        <div><h2 style={{ margin: 0 }}>🗂️ Fragenbank — {TOTAL.toLocaleString('de-DE')} Fragen</h2>
          <div className="muted small">Every level from A1 to C2 · listening, reading, vocabulary and grammar · a new mix every time</div></div>
        <button className="btn ghost" onClick={placement}>🧭 Einstufungstest A1–C2 (~45 Fragen){best('bank-placement') != null ? ` · best ${best('bank-placement')}%` : ''}</button>
      </div>
      <div className="bank-grid">
        <div><div className="muted small">Niveau</div>
          <div className="level-pills">
            {LEVELS.map((l) => (
              <button key={l} className={`lvl-pill ${level === l ? 'on' : ''}`} style={{ ['--lv' as string]: LEVEL_INFO[l].color }} onClick={() => setLevel(l)}>
                <b>{l}</b><small>{Object.values(STATS[l] || {}).reduce((a, b) => a + b, 0)}</small>
              </button>
            ))}
            <button className={`lvl-pill ${level === 'mix' ? 'on' : ''}`} style={{ ['--lv' as string]: '#9aa' }} onClick={() => setLevel('mix')}><b>Mix</b><small>{TOTAL}</small></button>
          </div>
        </div>
        <div><div className="muted small">Teil</div>
          <div className="seg">
            <button className={section === 'all' ? 'on' : ''} onClick={() => setSection('all')}>Alle</button>
            {SECTIONS.map((s) => <button key={s.name} className={section === s.name ? 'on' : ''} onClick={() => setSection(s.name)}>{s.icon} {s.name}</button>)}
          </div>
        </div>
        <div><div className="muted small">Anzahl</div>
          <div className="seg">{[10, 20, 30, 50, 100].map((n) => <button key={n} className={count === n ? 'on' : ''} onClick={() => setCount(n)}>{n}</button>)}</div>
        </div>
      </div>
      <div className="row between wrap">
        <span className="muted small">{pool.length.toLocaleString('de-DE')} questions available{level !== 'mix' && section === 'all' ? ` · ${SECTIONS.map((s) => `${s.icon} ${(STATS[level] || {})[s.name] || 0}`).join('  ')}` : ''}
          {best(`bank-${level}-${section}`) != null && <> · best <b>{best(`bank-${level}-${section}`)}%</b></>}</span>
        <button className="btn primary big" disabled={!pool.length} onClick={go}>Start test →</button>
      </div>
    </section>
  );
}

function placementLevel(qs: AnyQ[], answers: (number | null)[]) {
  let reached: Level | null = null;
  const per: Record<string, { r: number; t: number }> = {};
  qs.forEach((q, i) => { const l = (q as BQ).level || 'A1'; const s = (per[l] ||= { r: 0, t: 0 }); s.t++; if (answers[i] === q.a) s.r++; });
  for (const l of LEVELS) { const s = per[l]; if (s && s.r / s.t >= 0.6) reached = l; else break; }
  return { reached, per };
}

function Runner({ mode, onExit }: { mode: Mode; onExit: () => void }) {
  const qs = mode.questions;
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(qs.length).fill(null));
  const [finished, setFinished] = useState(false);
  const [plays, setPlays] = useState<Record<string, number>>({});
  const [playing, setPlaying] = useState(false);
  const token = useRef({ cancelled: false });
  const [left] = useTimer(mode.minutes * 60, !finished, () => finish());
  const q = qs[i];

  useEffect(() => () => { token.current.cancelled = true; stopSpeaking(); }, []);
  useEffect(() => { token.current.cancelled = true; stopSpeaking(); setPlaying(false); }, [i]);

  const play = () => {
    if (!q.audio) return;
    token.current = { cancelled: false };
    setPlaying(true);
    setPlays((p) => ({ ...p, [q.id]: (p[q.id] || 0) + 1 }));
    playLines(q.audio, () => setPlaying(false), token.current);
  };
  // auto-play listening questions once
  useEffect(() => { if (q?.audio && !finished && !plays[q.id]) { const t = setTimeout(play, 500); return () => clearTimeout(t); } }, [i]); // eslint-disable-line react-hooks/exhaustive-deps

  const result = useMemo(() => {
    const sections: Record<string, { score: number; total: number }> = {};
    qs.forEach((x, k) => { const s = (sections[x.section] ||= { score: 0, total: 0 }); s.total++; if (answers[k] === x.a) s.score++; });
    const score = Object.values(sections).reduce((a, s) => a + s.score, 0);
    return { sections, score, total: qs.length };
  }, [answers, qs]);

  function finish() {
    if (finished) return;
    token.current.cancelled = true; stopSpeaking();
    setFinished(true);
    const pct = result.score / result.total;
    sfx(pct >= 0.6 ? 'win' : 'bad');
    addXP(10 + result.score);
    checkAchievements();
    saveResult(mode.id, mode.title, result.score, result.total, { sections: result.sections, minutesUsed: Math.round((mode.minutes * 60 - left) / 60), ...(mode.placement ? { level: placementLevel(qs, answers).reached } : {}) });
  }

  const choose = (k: number) => { sfx('tap'); setAnswers((a) => a.map((x, j) => (j === i ? k : x))); };

  if (finished) {
    const pct = Math.round((100 * result.score) / result.total);
    const wrong = qs.map((x, k) => ({ x, k })).filter(({ x, k }) => answers[k] !== x.a);
    return (
      <div className="page narrow">
        <Confetti run={pct >= 60} />
        {mode.placement && (() => { const p = placementLevel(qs, answers); return (
          <div className="card center-text placement-res">
            <div className="eyebrow">Your estimated level</div>
            <div className="lvl-result" style={{ ['--lv' as string]: p.reached ? LEVEL_INFO[p.reached].color : '#999' }}>{p.reached ?? 'below A1'}</div>
            <div className="row center wrap">{LEVELS.map((l) => p.per[l] && <span key={l} className={`pill ${p.per[l].r / p.per[l].t >= 0.6 ? 'good' : 'bad'}`}>{l} {p.per[l].r}/{p.per[l].t}</span>)}</div>
            <p className="muted small">A level counts as reached with 60%+ — and all levels below it too.</p>
          </div>); })()}
        <div className="center-text">
          <Mascot size={120} mood={pct >= 60 ? 'cheer' : 'think'} say={pct >= 80 ? 'Ausgezeichnet!' : pct >= 60 ? 'Bestanden — super!' : 'Nicht schlimm — wir üben weiter!'} />
          <h1>{pct >= 60 ? 'Bestanden!' : 'Noch nicht bestanden'}</h1>
          <div className={`score huge ${pct >= 60 ? 'good' : 'low'}`}>{pct}%</div>
          <p className="muted">{result.score} of {result.total} correct · {pct >= 60 ? 'Great job — your result is saved.' : 'You need 60%. Review the mistakes below and try again.'}</p>
        </div>
        <div className="section-results">
          {Object.entries(result.sections).map(([k, v]) => {
            const p = Math.round((100 * v.score) / v.total);
            return <div key={k} className="sec-res"><div className="row between"><b>{SECTIONS.find((s) => s.name === k)?.icon} {k}</b><span>{v.score}/{v.total}</span></div><Progress value={p} color={p >= 60 ? 'var(--green)' : 'var(--red)'} /></div>;
          })}
        </div>
        {wrong.length > 0 && (
          <section className="card">
            <h2>Review your mistakes ({wrong.length})</h2>
            {wrong.map(({ x, k }) => (
              <div key={x.id} className="review-item">
                <div className="muted small">{x.section} · Frage {k + 1}</div>
                {x.text && <pre className="de mini-text">{x.text}</pre>}
                {x.audio && <div className="mini-text de">🎧 {x.audio.map((l) => l[1]).join(' — ')}</div>}
                <div className="de"><b>{x.q}</b></div>
                <div>{answers[k] != null ? <span className="bad-text">✗ {x.options[answers[k]!]}</span> : <span className="muted">no answer</span>} → <span className="ok-text">✓ {x.options[x.a]}</span></div>
                {x.explain && <div className="muted small">💡 {x.explain}</div>}
              </div>
            ))}
          </section>
        )}
        <div className="row center"><button className="btn primary" onClick={onExit}>Back to Test-Center</button></div>
      </div>
    );
  }

  const answered = answers.filter((a) => a !== null).length;
  return (
    <div className="page narrow test-runner">
      <div className="row between">
        <button className="link" onClick={() => { if (confirm('Leave the test? Your answers will be lost.')) onExit(); }}>✕ {mode.title}</button>
        <span className={`timer small ${left < 120 ? 'warn' : ''}`}>⏱ {fmt(left)}</span>
      </div>
      <Progress value={((i + 1) / qs.length) * 100} />
      <div className="q-meta"><span className="tag">{SECTIONS.find((s) => s.name === q.section)?.icon} {q.section}{'level' in q ? ` · ${q.level}` : ''}{'kind' in q && q.kind.length < 28 ? ` · ${q.kind}` : ''}</span><span className="muted small">Frage {i + 1} / {qs.length} · {answered} answered</span></div>
      <div className="card question-card">
        {q.audio && (
          <div className="audio-box">
            <button className={`play-big ${playing ? 'on' : ''}`} disabled={playing || (plays[q.id] || 0) >= 2} onClick={play}>{playing ? '🔊' : '▶'}</button>
            <div><b>Hörtext</b><div className="muted small">{playing ? 'Playing…' : `You can listen ${Math.max(0, 2 - (plays[q.id] || 0))} more time(s).`}</div></div>
          </div>
        )}
        {q.text && <pre className="de read-text">{q.text}</pre>}
        <div className="ex-q de">{q.q}</div>
        <div className={`options ${q.options.length <= 2 ? 'two' : ''}`}>
          {q.options.map((o, k) => (
            <button key={k} data-ok={DEMO && k === q.a ? '1' : undefined} className={`option ${answers[i] === k ? 'sel' : ''}`} onClick={() => choose(k)}>
              <span className="key">{String.fromCharCode(97 + k)}</span><span className="de">{o}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="row between">
        <button className="btn ghost" disabled={i === 0} onClick={() => setI(i - 1)}>← Zurück</button>
        {i < qs.length - 1
          ? <button className="btn primary" onClick={() => setI(i + 1)}>Weiter →</button>
          : <button className="btn primary" onClick={() => { if (answered < qs.length && !confirm(`${qs.length - answered} questions unanswered. Submit anyway?`)) return; finish(); }}>Abgeben ✓</button>}
      </div>
      <div className="q-dots">{qs.map((x, k) => <button key={x.id} className={`${k === i ? 'cur' : ''} ${answers[k] !== null ? 'ans' : ''}`} onClick={() => setI(k)} aria-label={`Frage ${k + 1}`} />)}</div>
    </div>
  );
}
