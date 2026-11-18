import { useEffect, useState } from 'react';
import { LEVEL_INFO } from '../data';
import { LEVELS } from '../types';
import { ACHIEVEMENTS, exportData, importData, liveStreak, resetAll, setState, today, useStore } from '../lib/store';
import { levelProgress } from '../lib/progress';
import { germanVoices, speak } from '../lib/speech';
import { Progress } from '../components/ui';
import { go } from '../router';
import { api, logout, useUser } from '../lib/api';

export default function Me() {
  const s = useStore((x) => x);
  const user = useUser();
  const [board, setBoard] = useState<{ name: string; xp: number; streak: number; units_done: number }[]>([]);
  useEffect(() => { api<typeof board>('/leaderboard').then(setBoard).catch(() => {}); }, [s.xp]);
  const [pw, setPw] = useState({ old: '', next: '' });
  const [voices, setVoices] = useState(germanVoices());
  const [key, setKey] = useState(s.settings.geminiKey);
  useEffect(() => { const t = setInterval(() => setVoices(germanVoices()), 800); return () => clearInterval(t); }, []);

  const days = Array.from({ length: 28 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (27 - i)); return today(d); });
  const maxDay = Math.max(1, ...days.map((d) => s.daily[d] || 0));
  const set = (patch: Partial<typeof s.settings>) => setState((x) => { x.settings = { ...x.settings, ...patch }; });

  return (
    <div className="page">
      <div className="profile-head">
        <span className="avatar-lg">{(user?.displayName || '?').slice(0, 1).toUpperCase()}</span>
        <div className="grow"><h1 style={{ margin: 0 }}>{user?.displayName}</h1><div className="muted">@{user?.username} · {user?.role === 'admin' ? '🛡️ Administrator' : 'Student'}</div></div>
        {user?.role === 'admin' && <button className="btn ghost" onClick={() => go('/admin')}>🛡️ Admin</button>}
        <button className="btn ghost" onClick={() => { if (confirm('Log out?')) logout(); }}>Abmelden</button>
      </div>
      <div className="profile-stats">
        <div className="pstat"><span>🔥</span><b>{liveStreak(s)}</b><small>streak (best {s.bestStreak})</small></div>
        <div className="pstat"><span>⚡</span><b>{s.xp}</b><small>total XP</small></div>
        <div className="pstat"><span>📚</span><b>{Object.keys(s.srs).length}</b><small>words</small></div>
        <div className="pstat"><span>✍️</span><b>{s.writing.length}</b><small>texts</small></div>
        <div className="pstat"><span>🎙️</span><b>{s.speakCount}</b><small>speaking tasks</small></div>
      </div>

      <section className="card">
        <h2>Last 4 weeks</h2>
        <div className="heat">{days.map((d) => { const v = s.daily[d] || 0; return <div key={d} title={`${d}: ${v} XP`} style={{ opacity: v ? 0.25 + 0.75 * (v / maxDay) : 1 }} className={v ? 'on' : ''} />; })}</div>
        <label className="select">Daily goal
          <select value={s.dailyGoal} onChange={(e) => setState((x) => { x.dailyGoal = Number(e.target.value); })}>
            {[20, 50, 100, 150, 250].map((g) => <option key={g} value={g}>{g} XP {g === 20 ? '(casual)' : g === 50 ? '(regular)' : g === 100 ? '(serious)' : g === 150 ? '(intense)' : '(exam mode)'}</option>)}
          </select>
        </label>
      </section>

      {board.length > 0 && (
        <section className="card">
          <h2>🏆 Rangliste</h2>
          <ol className="board">{board.map((b, i) => (
            <li key={i} className={b.name === user?.displayName ? 'me' : ''}><span className="rank">{i < 3 ? ['🥇', '🥈', '🥉'][i] : i + 1}</span><b className="grow">{b.name}</b><span className="muted small">🔥 {b.streak} · {b.units_done} units</span><b>{b.xp} XP</b></li>
          ))}</ol>
        </section>
      )}

      <section className="card">
        <h2>Levels</h2>
        {LEVELS.map((l) => { const p = levelProgress(s, l); return (
          <div key={l} className="lvl-row"><span className="level-badge sm" style={{ ['--lv' as string]: LEVEL_INFO[l].color }}>{l}</span><div className="grow"><Progress value={p.pct * 100} color={LEVEL_INFO[l].color} /></div><span className="muted small">{p.done}/{p.total}</span></div>
        ); })}
        <div className="row"><button className="btn ghost" onClick={() => go('/placement')}>Retake placement test</button></div>
      </section>

      <section className="card">
        <h2>Achievements</h2>
        <div className="ach-grid">{ACHIEVEMENTS.map((a) => { const got = s.achievements.includes(a.id); return (
          <div key={a.id} className={`ach ${got ? 'got' : ''}`}><span>{got ? a.icon : '🔒'}</span><b>{a.name}</b><small>{a.desc}</small></div>
        ); })}</div>
      </section>

      <section className="card settings">
        <h2>Settings</h2>
        <label className="field">Your name<input className="answer" value={s.name} onChange={(e) => setState((x) => { x.name = e.target.value; })} /></label>
        <label className="field">Theme
          <div className="seg"><button className={s.settings.theme === 'dark' ? 'on' : ''} onClick={() => set({ theme: 'dark' })}>🌙 Dark</button><button className={s.settings.theme === 'light' ? 'on' : ''} onClick={() => set({ theme: 'light' })}>☀️ Light</button></div>
        </label>
        <label className="field">German voice
          <select value={s.settings.voice} onChange={(e) => { set({ voice: e.target.value }); setTimeout(() => speak('Hallo! So klinge ich.'), 50); }}>
            <option value="">Automatic (best available)</option>
            {voices.map((v) => <option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>)}
          </select>
          {!voices.length && <small className="muted">No German voice found. On Windows: Settings → Time & language → Speech → add German. On Linux, Chrome has Google voices built in.</small>}
        </label>
        <label className="field">Speech speed: {s.settings.rate.toFixed(2)}×
          <input type="range" min={0.6} max={1.2} step={0.05} value={s.settings.rate} onChange={(e) => set({ rate: Number(e.target.value) })} onMouseUp={() => speak('Das ist meine normale Geschwindigkeit.')} />
        </label>
        <label className="check"><input type="checkbox" checked={s.settings.showPron !== false} onChange={(e) => set({ showPron: e.target.checked })} /> Show pronunciation help (🗣) under German sentences</label>
        <label className="check"><input type="checkbox" checked={s.settings.sound} onChange={(e) => set({ sound: e.target.checked })} /> Sound effects</label>
        <label className="check"><input type="checkbox" checked={s.unlockAll} onChange={(e) => setState((x) => { x.unlockAll = e.target.checked; })} /> Unlock all units (free navigation)</label>

        <h3>🤖 AI tutor (optional)</h3>
        <p className="muted small">AI writing correction, speaking feedback, the conversation partner and grammar Q&A use <b>your own Google Gemini API key</b> — free tier available at <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer">aistudio.google.com/apikey</a>. The key is stored only in this browser and sent only to Google.</p>
        <label className="field">Gemini API key
          <div className="chat-input"><input className="answer" type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder="AIza…" />
            <button className="btn primary" onClick={() => set({ geminiKey: key.trim() })}>Save</button></div>
          {s.settings.geminiKey && <small className="ok-text">✓ Key saved — AI features are on.</small>}
        </label>
        <label className="field">Model<input className="answer" value={s.settings.model} onChange={(e) => set({ model: e.target.value })} /></label>
        <label className="field">Explanation language
          <div className="seg"><button className={s.settings.explainLang === 'en' ? 'on' : ''} onClick={() => set({ explainLang: 'en' })}>English</button><button className={s.settings.explainLang === 'fr' ? 'on' : ''} onClick={() => set({ explainLang: 'fr' })}>Français</button></div>
        </label>

        <h3>🔑 Change password</h3>
        <div className="form-grid">
          <input className="answer" type="password" placeholder="Current password" value={pw.old} onChange={(e) => setPw({ ...pw, old: e.target.value })} autoComplete="current-password" />
          <input className="answer" type="password" placeholder="New password (min. 6)" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} autoComplete="new-password" />
          <button className="btn" disabled={!pw.old || pw.next.length < 6} onClick={async () => {
            try { await api('/password', { body: { oldPassword: pw.old, newPassword: pw.next } }); setPw({ old: '', next: '' }); alert('Password changed.'); } catch (e) { alert((e as Error).message); }
          }}>Change</button>
        </div>

        <h3>💾 Your data</h3>
        <p className="muted small">Progress is saved to your account automatically and works on every device you log in on. You can also export a file backup.</p>
        <div className="row wrap">
          <button className="btn ghost" onClick={() => {
            const blob = new Blob([exportData()], { type: 'application/json' });
            const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `deutschweg-backup-${today()}.json`; a.click();
          }}>Export backup</button>
          <label className="btn ghost">Import backup<input type="file" accept="application/json" hidden onChange={async (e) => {
            const f = e.target.files?.[0]; if (!f) return;
            try { importData(await f.text()); alert('Backup restored.'); } catch (err) { alert((err as Error).message); }
          }} /></label>
          <button className="btn danger" onClick={() => { if (confirm('Delete ALL progress? This cannot be undone.')) { resetAll(); go('/'); } }}>Reset progress</button>
        </div>
      </section>
    </div>
  );
}
