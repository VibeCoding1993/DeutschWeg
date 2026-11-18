import { useEffect, useState } from 'react';
import { LEVEL_INFO, STUDIO } from '../data';
import { LEVELS } from '../types';
import { liveStreak, setState, today, useStore } from '../lib/store';
import { levelProgress } from '../lib/progress';
import { fmtDuration, minutes } from '../lib/timer';
import { api } from '../lib/api';
import { Ring } from '../components/ui';

const DAY_NAMES = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
const lastDays = (n: number) => Array.from({ length: n }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (n - 1 - i)); return d; });

function Bars({ data, goal, unit, color }: { data: { label: string; value: number; title: string }[]; goal?: number; unit: string; color: string }) {
  const max = Math.max(goal || 0, ...data.map((d) => d.value), 1) * 1.18;
  return (
    <div className="bars">
      {goal ? <div className="goal-line" style={{ bottom: `${(goal / max) * 100}%` }}><span>goal {goal} {unit}</span></div> : null}
      {data.map((d, i) => (
        <div key={i} className="bar-col" title={d.title}>
          <div className="bar-fill" style={{ height: `${(d.value / max) * 100}%`, background: goal && d.value >= goal ? 'var(--green)' : color }}>{d.value > 0 && data.length <= 14 && <em>{d.value}</em>}</div>
          <small>{d.label}</small>
        </div>
      ))}
    </div>
  );
}

export default function Stats() {
  const s = useStore((x) => x);
  const [range, setRange] = useState<7 | 30>(7);
  const [results, setResults] = useState<{ title: string; score: number; total: number; created_at: string }[]>([]);
  useEffect(() => { api<typeof results>('/results').then(setResults).catch(() => {}); }, []);

  const time = s.time || {};
  const t = today();
  const todaySec = time[t] || 0;
  const days = lastDays(range);
  const week = lastDays(7).reduce((a, d) => a + (time[today(d)] || 0), 0);
  const allSec = Object.values(time).reduce((a, b) => a + b, 0);
  const activeDays = Object.values(time).filter((v) => v >= 60).length;
  const avg = activeDays ? allSec / activeDays : 0;
  const bestDay = Object.entries(time).sort((a, b) => b[1] - a[1])[0];
  const daysGoal = lastDays(7).filter((d) => minutes(time[today(d)] || 0) >= s.dailyMinutes).length;
  const areas = Object.entries(s.timeByArea || {}).sort((a, b) => b[1] - a[1]);
  const areaMax = Math.max(1, ...areas.map((a) => a[1]));

  // vocabulary maturity
  const cards = Object.values(s.srs);
  const vocab = { neu: cards.filter((c) => c.reps === 0).length, lernen: cards.filter((c) => c.reps > 0 && c.ivl < 21).length, sicher: cards.filter((c) => c.ivl >= 21).length };
  const drills = Object.entries(s.drills);
  const studioDone = STUDIO.filter((u) => s.units[u.id]?.done).length;

  return (
    <div className="page">
      <h1>📊 Statistik</h1>
      <div className="kpis">
        <div className="kpi time-kpi"><Ring value={minutes(todaySec) / s.dailyMinutes} size={64} stroke={7} color="var(--green)"><span>{minutes(todaySec) >= s.dailyMinutes ? '✅' : '⏱'}</span></Ring>
          <div className="time-kpi-text"><b>{minutes(todaySec)}<span>/{s.dailyMinutes} min</span></b><small>today</small></div></div>
        <div className="kpi"><span>📅</span><b>{fmtDuration(week)}</b><small>last 7 days · goal met {daysGoal}/7 days</small></div>
        <div className="kpi"><span>⏳</span><b>{fmtDuration(avg)}</b><small>average per study day</small></div>
        <div className="kpi"><span>🏁</span><b>{fmtDuration(allSec)}</b><small>total · {activeDays} study days</small></div>
        <div className="kpi"><span>🔥</span><b>{liveStreak(s)}</b><small>day streak (best {s.bestStreak})</small></div>
        <div className="kpi"><span>🏆</span><b>{bestDay ? fmtDuration(bestDay[1]) : '—'}</b><small>best day {bestDay ? bestDay[0].slice(5) : ''}</small></div>
      </div>

      <section className="card">
        <div className="row between wrap">
          <h2 style={{ margin: 0 }}>⏱️ Lernzeit pro Tag</h2>
          <div className="row">
            <div className="seg"><button className={range === 7 ? 'on' : ''} onClick={() => setRange(7)}>7 days</button><button className={range === 30 ? 'on' : ''} onClick={() => setRange(30)}>30 days</button></div>
            <label className="select small">Daily goal
              <select value={s.dailyMinutes} onChange={(e) => setState((x) => { x.dailyMinutes = Number(e.target.value); })}>{[5, 10, 15, 20, 30, 45, 60, 90].map((m) => <option key={m} value={m}>{m} min</option>)}</select>
            </label>
          </div>
        </div>
        <Bars unit="min" goal={s.dailyMinutes} color="var(--accent)" data={days.map((d) => ({ label: range === 7 ? DAY_NAMES[d.getDay()] : String(d.getDate()), value: minutes(time[today(d)] || 0), title: `${today(d)}: ${fmtDuration(time[today(d)] || 0)}` }))} />
      </section>

      <div className="stats-grid">
        <section className="card">
          <h2>⚡ XP pro Tag</h2>
          <Bars unit="XP" goal={s.dailyGoal} color="var(--yellow)" data={lastDays(7).map((d) => ({ label: DAY_NAMES[d.getDay()], value: s.daily[today(d)] || 0, title: `${today(d)}: ${s.daily[today(d)] || 0} XP` }))} />
        </section>
        <section className="card">
          <h2>🧭 Zeit nach Bereich</h2>
          {areas.length ? areas.map(([k, v]) => (
            <div key={k} className="hbar"><span>{k}</span><div className="bar"><div style={{ width: `${(v / areaMax) * 100}%` }} /></div><small>{fmtDuration(v)}</small></div>
          )) : <p className="muted">Start learning — your time will appear here.</p>}
        </section>
        <section className="card">
          <h2>📚 Wortschatz</h2>
          <div className="vocab-split">
            <div style={{ flex: vocab.neu || 0.0001 }} className="v-new" /><div style={{ flex: vocab.lernen || 0.0001 }} className="v-learn" /><div style={{ flex: vocab.sicher || 0.0001 }} className="v-sure" />
          </div>
          <div className="row wrap small"><span>⚪ {vocab.neu} new</span><span>🟡 {vocab.lernen} learning</span><span>🟢 {vocab.sicher} mastered (21+ days)</span></div>
        </section>
        <section className="card">
          <h2>🗺️ Fortschritt</h2>
          {LEVELS.map((l) => { const p = levelProgress(s, l); return (
            <div key={l} className="hbar"><span>{l}</span><div className="bar"><div style={{ width: `${p.pct * 100}%`, background: LEVEL_INFO[l].color }} /></div><small>{p.done}/{p.total}</small></div>
          ); })}
          <div className="hbar"><span>📘</span><div className="bar"><div style={{ width: `${(studioDone / STUDIO.length) * 100}%`, background: '#ff7a59' }} /></div><small>{studioDone}/{STUDIO.length}</small></div>
        </section>
        <section className="card">
          <h2>🎯 Drills (Genauigkeit)</h2>
          {drills.length ? drills.map(([k, d]) => { const p = Math.round((100 * d.right) / Math.max(1, d.total)); return (
            <div key={k} className="hbar"><span>{k}</span><div className="bar"><div style={{ width: `${p}%`, background: p >= 80 ? 'var(--green)' : p >= 60 ? 'var(--orange)' : 'var(--red)' }} /></div><small>{p}% · {d.total}</small></div>
          ); }) : <p className="muted">No drills yet.</p>}
        </section>
        <section className="card">
          <h2>📝 Testergebnisse</h2>
          {results.length ? <>
            <div className="spark">{[...results].reverse().slice(-20).map((r, i) => { const p = Math.round((100 * r.score) / r.total); return <div key={i} title={`${r.title}: ${p}%`} style={{ height: `${Math.max(6, p)}%` }} className={p >= 60 ? 'good' : 'bad'} />; })}</div>
            <div className="small muted">Last: {results[0].title} — {Math.round((100 * results[0].score) / results[0].total)}% · Average: {Math.round(results.reduce((a, r) => a + (100 * r.score) / r.total, 0) / results.length)}%</div>
          </> : <p className="muted">Take a test in the Test-Center.</p>}
        </section>
      </div>
    </div>
  );
}
