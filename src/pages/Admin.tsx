import { useEffect, useMemo, useState } from 'react';
import { api, useUser, type User } from '../lib/api';
import { toast } from '../lib/store';
import { go } from '../router';

interface Row extends User { minutesTotal: number; minutes7d: number; minutesToday: number; xp: number; streak: number; unitsDone: number; words: number; progressAt?: string; tests: number; avgScore: number | null; bestScore: number | null }
interface Result { id: number; test_id: string; title: string; score: number; total: number; created_at: string; detail?: { sections?: Record<string, { score: number; total: number }> } | null }

const pct = (r: { score: number; total: number }) => Math.round((100 * r.score) / Math.max(1, r.total));
const ago = (iso?: string) => {
  if (!iso) return '—';
  const d = (Date.now() - new Date(iso.replace(' ', 'T') + 'Z').getTime()) / 1000;
  return d < 60 ? 'just now' : d < 3600 ? `${Math.floor(d / 60)} min ago` : d < 86400 ? `${Math.floor(d / 3600)} h ago` : `${Math.floor(d / 86400)} d ago`;
};

export default function Admin() {
  const me = useUser();
  const [rows, setRows] = useState<Row[]>([]);
  const [err, setErr] = useState('');
  const [q, setQ] = useState('');
  const [sel, setSel] = useState<Row | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [showNew, setShowNew] = useState(false);
  const [nu, setNu] = useState({ username: '', password: '', displayName: '', role: 'student' });

  const load = () => api<Row[]>('/admin/users').then((rs) => setRows(rs.map((r) => ({ ...r, minutesToday: r.minutesToday ?? 0, minutes7d: r.minutes7d ?? 0, minutesTotal: r.minutesTotal ?? 0 })))).catch((e) => setErr(e.message));
  useEffect(() => { load(); }, []);
  useEffect(() => { if (sel) api<Result[]>(`/admin/users/${sel.id}/results`).then(setResults).catch((e) => setErr(e.message)); }, [sel]);

  const students = rows.filter((r) => r.role === 'student');
  const stats = useMemo(() => ({
    users: students.length,
    active: students.filter((r) => r.lastSeen && Date.now() - new Date(r.lastSeen.replace(' ', 'T') + 'Z').getTime() < 7 * 864e5).length,
    tests: rows.reduce((a, r) => a + r.tests, 0),
    avgMin: students.length ? Math.round(students.reduce((a, r) => a + r.minutes7d, 0) / students.length / 7) : 0,
    avg: (() => { const s = students.filter((r) => r.avgScore != null); return s.length ? Math.round(s.reduce((a, r) => a + (r.avgScore || 0), 0) / s.length) : null; })(),
  }), [rows]); // eslint-disable-line react-hooks/exhaustive-deps

  if (me?.role !== 'admin') return <div className="page"><h1>Admins only</h1><button className="btn" onClick={() => go('/')}>Home</button></div>;

  const list = rows.filter((r) => !q || (r.username + r.displayName).toLowerCase().includes(q.toLowerCase()));

  const create = async () => {
    try { await api('/admin/users', { body: nu }); toast(`Account "${nu.username}" created`, '✅'); setNu({ username: '', password: '', displayName: '', role: 'student' }); setShowNew(false); load(); }
    catch (e) { toast((e as Error).message, '⚠️'); }
  };
  const resetPw = async (u: Row) => {
    const pw = prompt(`New password for ${u.username} (min. 6 characters):`);
    if (!pw) return;
    try { await api(`/admin/users/${u.id}/password`, { body: { password: pw } }); toast('Password changed', '🔑'); } catch (e) { toast((e as Error).message, '⚠️'); }
  };
  const toggleRole = async (u: Row) => {
    try { await api(`/admin/users/${u.id}/role`, { body: { role: u.role === 'admin' ? 'student' : 'admin' } }); load(); } catch (e) { toast((e as Error).message, '⚠️'); }
  };
  const del = async (u: Row) => {
    if (!confirm(`Delete ${u.username} and all their progress? This cannot be undone.`)) return;
    try { await api(`/admin/users/${u.id}`, { method: 'DELETE' }); setSel(null); load(); } catch (e) { toast((e as Error).message, '⚠️'); }
  };
  const exportCsv = () => {
    const head = 'username,name,role,minutes_7d,minutes_total,xp,streak,units,words,tests,avg_score,best_score,last_seen';
    const lines = rows.map((r) => [r.username, `"${r.displayName.replace(/"/g, '""')}"`, r.role, r.minutes7d, r.minutesTotal, r.xp, r.streak, r.unitsDone, r.words, r.tests, r.avgScore ?? '', r.bestScore != null ? Math.round(r.bestScore) : '', r.lastSeen ?? ''].join(','));
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([[head, ...lines].join('\n')], { type: 'text/csv' }));
    a.download = 'deutschweg-students.csv'; a.click();
  };

  return (
    <div className="page wide-page">
      <div className="row between wrap"><h1>🛡️ Administration</h1>
        <div className="row"><button className="btn ghost" onClick={exportCsv}>⬇ Export CSV</button><button className="btn primary" onClick={() => setShowNew(!showNew)}>＋ New account</button></div></div>
      {err && <div className="error">{err}</div>}
      <div className="kpis">
        <div className="kpi"><span>👥</span><b>{stats.users}</b><small>students</small></div>
        <div className="kpi"><span>🟢</span><b>{stats.active}</b><small>active this week</small></div>
        <div className="kpi"><span>⏱️</span><b>{stats.avgMin} min</b><small>avg. study time / student / day</small></div>
        <div className="kpi"><span>📝</span><b>{stats.tests}</b><small>tests taken</small></div>
        <div className="kpi"><span>🎯</span><b>{stats.avg != null ? `${stats.avg}%` : '—'}</b><small>average score</small></div>
      </div>
      {showNew && (
        <div className="card new-user">
          <h3>Create account</h3>
          <div className="form-grid">
            <input className="answer" placeholder="Display name" value={nu.displayName} onChange={(e) => setNu({ ...nu, displayName: e.target.value })} />
            <input className="answer" placeholder="Username" value={nu.username} onChange={(e) => setNu({ ...nu, username: e.target.value })} autoCapitalize="off" />
            <input className="answer" placeholder="Password (min. 6)" value={nu.password} onChange={(e) => setNu({ ...nu, password: e.target.value })} />
            <select value={nu.role} onChange={(e) => setNu({ ...nu, role: e.target.value })}><option value="student">Student</option><option value="admin">Admin</option></select>
          </div>
          <button className="btn primary" onClick={create}>Create</button>
        </div>
      )}
      <input className="answer search" placeholder="🔎 Search students…" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="table-wrap card">
        <table className="admin-table">
          <thead><tr><th>Student</th><th>⏱ Today</th><th>⏱ 7 days</th><th>⏱ Total</th><th>XP</th><th>🔥</th><th>Units</th><th>Words</th><th>Tests</th><th>Avg</th><th>Best</th><th>Last seen</th></tr></thead>
          <tbody>
            {list.map((r) => (
              <tr key={r.id} className={sel?.id === r.id ? 'sel' : ''} onClick={() => setSel(r)}>
                <td><div className="who-cell"><span className="avatar-sm">{r.displayName.slice(0, 1).toUpperCase()}</span><div><b>{r.displayName}</b>{r.role === 'admin' && <span className="tag">admin</span>}<div className="muted small">@{r.username}</div></div></div></td>
                <td>{r.minutesToday} min</td><td><b>{r.minutes7d} min</b></td><td className="muted">{Math.floor(r.minutesTotal / 60)} h {r.minutesTotal % 60} m</td><td><b>{r.xp}</b></td><td>{r.streak}</td><td>{r.unitsDone}</td><td>{r.words}</td><td>{r.tests}</td>
                <td><span className={`pill ${r.avgScore == null ? '' : r.avgScore >= 60 ? 'good' : 'bad'}`}>{r.avgScore != null ? `${r.avgScore}%` : '—'}</span></td>
                <td>{r.bestScore != null ? `${Math.round(r.bestScore)}%` : '—'}</td>
                <td className="muted small">{ago(r.lastSeen)}</td>
              </tr>
            ))}
            {!list.length && <tr><td colSpan={12} className="muted center-text">No accounts yet.</td></tr>}
          </tbody>
        </table>
      </div>
      {sel && (
        <div className="card detail">
          <div className="row between wrap">
            <div><h2 style={{ margin: 0 }}>{sel.displayName} <span className="muted small">@{sel.username}</span></h2>
              <div className="muted small">Joined {sel.createdAt?.slice(0, 10)} · progress synced {ago(sel.progressAt)}</div></div>
            <div className="row wrap">
              <button className="btn ghost" onClick={() => resetPw(sel)}>🔑 Reset password</button>
              <button className="btn ghost" onClick={() => toggleRole(sel)}>{sel.role === 'admin' ? 'Make student' : 'Make admin'}</button>
              <button className="btn danger" onClick={() => del(sel)}>Delete</button>
              <button className="link" onClick={() => setSel(null)}>✕</button>
            </div>
          </div>
          <h3>Test results</h3>
          {results.length ? (
            <>
              <div className="spark">{[...results].reverse().slice(-20).map((r) => <div key={r.id} title={`${r.title}: ${pct(r)}%`} style={{ height: `${Math.max(6, pct(r))}%` }} className={pct(r) >= 60 ? 'good' : 'bad'} />)}</div>
              <table className="admin-table small-table">
                <thead><tr><th>Date</th><th>Test</th><th>Score</th><th>Sections</th></tr></thead>
                <tbody>{results.map((r) => (
                  <tr key={r.id}><td className="muted small">{r.created_at.slice(0, 16)}</td><td>{r.title}</td>
                    <td><span className={`pill ${pct(r) >= 60 ? 'good' : 'bad'}`}>{r.score}/{r.total} · {pct(r)}%</span></td>
                    <td className="small">{r.detail?.sections ? Object.entries(r.detail.sections).map(([k, v]) => `${k} ${v.score}/${v.total}`).join(' · ') : '—'}</td></tr>
                ))}</tbody>
              </table>
            </>
          ) : <p className="muted">No tests taken yet.</p>}
        </div>
      )}
    </div>
  );
}
