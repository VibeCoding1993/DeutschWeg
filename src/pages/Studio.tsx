import { STUDIO } from '../data';
import { CAST } from '../components/Scene';
import Scene from '../components/Scene';
import { useStore } from '../lib/store';
import { isUnlocked, nextUnit, studioProgress } from '../lib/progress';
import { Progress } from '../components/ui';
import { go } from '../router';

export default function Studio() {
  const s = useStore((x) => x);
  const next = nextUnit(s, STUDIO);
  const p = studioProgress(s);
  return (
    <div className="page" style={{ ['--lv' as string]: '#ff7a59' }}>
      <section className="hero studio-hero">
        <div>
          <div className="eyebrow">📘 Kursbuch-Begleiter · A1</div>
          <h1>Deutsch mit Lena & Karim</h1>
          <p className="muted">A story-based A1 course that follows the unit order of common A1 coursebooks (Start · Kaffee oder Tee? · Sprache im Kurs · … · Körper und Gesundheit). Use it alongside your book: every unit has animated dialogs with voices, role-play, vocabulary and exercises.</p>
          <div className="row"><Progress value={(p.done / p.total) * 100} color="var(--lv)" /><span className="muted small">{p.done}/{p.total}</span></div>
          {next && <button className="btn primary big" onClick={() => go(`/lesson/${next.id}`)}>{s.units[next.id] ? 'Continue' : 'Start'}: {next.icon} {next.title} →</button>}
        </div>
        <div className="studio-scene"><Scene kind="welcome" cast={['lena', 'karim', 'mia']} /></div>
      </section>

      <h2>Die Figuren</h2>
      <div className="cast-grid">
        {Object.entries(CAST).map(([k, c]) => (
          <div key={k} className="cast-card"><Scene kind="welcome" cast={[k]} /><b>{c.name}</b><small className="muted">{c.bio}</small></div>
        ))}
      </div>

      <h2>Kapitel</h2>
      <div className="units">
        {STUDIO.map((u, idx) => {
          const open = isUnlocked(s, idx, STUDIO);
          const pr = s.units[u.id];
          const isStation = u.id.includes('station');
          return (
            <button key={u.id} className={`unit ${open ? '' : 'locked'} ${pr?.done ? 'done' : ''} ${next?.id === u.id ? 'next' : ''} ${isStation ? 'station' : ''}`}
              disabled={!open} onClick={() => open && go(`/lesson/${u.id}`)} title={u.can}>
              <div className="unit-icon">{open ? u.icon : '🔒'}</div>
              <div className="unit-body">
                <small className="muted">{isStation ? 'Wiederholung' : u.id === 'st-0' ? 'Start' : `Kapitel ${u.id.slice(3)}`}</small>
                <b className="de">{u.title}</b>
                <small>{u.dialogs?.length ?? 0} dialogs · {u.sub}</small>
              </div>
              <div className="stars">{[1, 2, 3].map((k) => <span key={k} className={pr && pr.stars >= k ? 'on' : ''}>★</span>)}</div>
              {next?.id === u.id && <div className="next-tag">NEXT</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
