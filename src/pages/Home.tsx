import { LEVEL_INFO, UNITS } from '../data';
import { LEVELS } from '../types';
import { liveStreak, today, useStore } from '../lib/store';
import { currentLevel, dueCards, isUnlocked, levelProgress, nextUnit } from '../lib/progress';
import { Ring } from '../components/ui';
import { go } from '../router';
import { Mascot } from '../components/Brand';

export default function Home() {
  const s = useStore((x) => x);
  const next = nextUnit(s);
  const todayXP = s.daily[today()] || 0;
  const due = dueCards(s).length;
  const streak = liveStreak(s);
  const cur = currentLevel(s);
  const b2 = ['A1', 'A2', 'B1', 'B2'].reduce((a, l) => a + levelProgress(s, l as never).done, 0);
  const b2Total = UNITS.filter((u) => ['A1', 'A2', 'B1', 'B2'].includes(u.level)).length;
  const hour = new Date().getHours();
  const greet = hour < 11 ? 'Guten Morgen' : hour < 18 ? 'Guten Tag' : 'Guten Abend';

  return (
    <div className="page">
      <section className="hero">
        <div>
          <div className="eyebrow">{greet}{s.name ? `, ${s.name}` : ''}!</div>
          <h1>Your road to <span className="hl">B2</span> and beyond</h1>
          <p className="muted">You're working on <b style={{ color: LEVEL_INFO[cur].color }}>{cur} · {LEVEL_INFO[cur].name}</b>. {b2}/{b2Total} units done on the way to B2.</p>
          <div className="hero-cta">
            {next ? (
              <button className="btn primary big" onClick={() => go(`/lesson/${next.id}`)}>
                {s.units[next.id] ? 'Continue' : 'Start'}: {next.icon} {next.title} →
              </button>
            ) : <button className="btn primary big" onClick={() => go('/exam')}>🎓 Everything done — try the B2 mock exam</button>}
            {due > 0 && <button className="btn ghost big" onClick={() => go('/review')}>🧠 Review {due} word{due > 1 ? 's' : ''}</button>}
          </div>
        </div>
        <div className="home-mascot"><Mascot size={110} mood={todayXP >= s.dailyGoal ? 'cheer' : 'wave'} say={todayXP >= s.dailyGoal ? 'Tagesziel geschafft! 🎉' : streak ? `${streak} Tage in Folge — weiter so!` : 'Los geht\'s — eine Lektion pro Tag!'} /></div>
        <div className="hero-stats">
          <Ring value={todayXP / s.dailyGoal} size={92} stroke={9} color="var(--yellow)">
            <div className="ring-big">{todayXP}</div><div className="ring-small">/ {s.dailyGoal} XP</div>
          </Ring>
          <div className="stat-chips">
            <div className="chip"><span>🔥</span><b>{streak}</b> day streak</div>
            <div className="chip"><span>⚡</span><b>{s.xp}</b> XP total</div>
            <div className="chip"><span>📚</span><b>{Object.keys(s.srs).length}</b> words</div>
          </div>
        </div>
      </section>

      <button className="review-card start-here" onClick={() => go('/alphabet')}>
        <div className="review-num" style={{ background: 'var(--green)' }}>🔤</div>
        <div className="grow"><b>{Object.keys(s.units).length ? 'Das Alphabet' : 'Start here: Das Alphabet'}</b><div className="muted small">Letter names, sounds, a listening quiz and a spelling game — perfect first step</div></div>
        <span className="btn primary">Open →</span>
      </button>
      <button className="review-card studio-card" onClick={() => go('/studio')}>
        <div className="review-num" style={{ background: '#ff7a59' }}>📘</div>
        <div className="grow"><b>Kursbuch-Begleiter A1 — Deutsch mit Lena & Karim</b><div className="muted small">Animated dialogs with voices & role-play, following the A1 coursebook unit order</div></div>
        <span className="btn primary">Open →</span>
      </button>
      <section className="quick">
        <button className="quick-card" onClick={() => go('/speak')}><span>🎙️</span><b>Speaking</b><small>Shadowing, tasks & AI partner</small></button>
        <button className="quick-card" onClick={() => go('/write')}><span>✍️</span><b>Writing</b><small>E-Mails, Forumsbeiträge, essays</small></button>
        <button className="quick-card" onClick={() => go('/practice')}><span>🎯</span><b>Drills</b><small>Articles, verbs, endings, numbers</small></button>
        <button className="quick-card" onClick={() => go('/tests')}><span>📝</span><b>Test-Center</b><small>5,000+ questions A1–C2</small></button>
      </section>

      {!s.startLevel && Object.keys(s.units).length === 0 && (
        <div className="banner">
          <div><b>Already know some German?</b> Take the 5‑minute placement test to skip what you know.</div>
          <button className="btn" onClick={() => go('/placement')}>Take placement test</button>
        </div>
      )}

      {LEVELS.map((lv) => {
        const info = LEVEL_INFO[lv];
        const lp = levelProgress(s, lv);
        return (
          <section key={lv} className="level" style={{ ['--lv' as string]: info.color }}>
            <header className="level-head">
              <div className="level-badge">{lv}</div>
              <div className="grow">
                <h2>{info.name}</h2>
                <div className="muted small">{info.desc}</div>
                <div className="level-bar"><div style={{ width: `${lp.pct * 100}%` }} /></div>
              </div>
              <div className="level-count">{lp.done}/{lp.total}</div>
            </header>
            <div className="units">
              {UNITS.map((u, idx) => {
                if (u.level !== lv) return null;
                const open = isUnlocked(s, idx);
                const p = s.units[u.id];
                const isNext = next?.id === u.id;
                return (
                  <button key={u.id} className={`unit ${open ? '' : 'locked'} ${p?.done ? 'done' : ''} ${isNext ? 'next' : ''}`}
                    onClick={() => open && go(`/lesson/${u.id}`)} disabled={!open} title={open ? u.can : 'Finish the previous unit to unlock'}>
                    <div className="unit-icon">{open ? u.icon : '🔒'}</div>
                    <div className="unit-body">
                      <b className="de">{u.title}</b>
                      <small>{u.sub}</small>
                    </div>
                    <div className="stars">{[1, 2, 3].map((k) => <span key={k} className={p && p.stars >= k ? 'on' : ''}>★</span>)}</div>
                    {isNext && <div className="next-tag">NEXT</div>}
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
