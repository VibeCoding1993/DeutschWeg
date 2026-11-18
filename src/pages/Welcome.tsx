import { useState } from 'react';
import { setState } from '../lib/store';
import { speak } from '../lib/speech';
import { go } from '../router';
import { Logo, Mascot } from '../components/Brand';

export default function Welcome() {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState(50);
  const start = (placement: boolean) => {
    setState((s) => { s.name = name.trim(); s.dailyGoal = goal; s.onboarded = true; });
    go(placement ? '/placement' : '/');
  };
  return (
    <div className="welcome">
      <div className="welcome-card">
        <div className="welcome-brand"><Mascot size={120} mood="wave" say="Hallo! Ich bin Wegi — ich begleite dich auf deinem Weg zu Deutsch." /><Logo size={54} big /></div>
        <h1>Learn German from <span className="hl">A1</span> to <span className="hl">C2</span></h1>
        <p className="muted">Grammar that makes sense, vocabulary that sticks, real speaking & writing practice — and Goethe‑style B2 exam training.</p>
        <button className="btn ghost" onClick={() => speak('Herzlich willkommen! Schön, dass du Deutsch lernst.')}>🔊 Hör mal: „Herzlich willkommen!"</button>
        <label className="field">What should we call you?<input className="answer" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" /></label>
        <div className="field">Daily goal
          <div className="goal-row">
            {[[20, '☕', 'Casual', '5 min'], [50, '🚶', 'Regular', '15 min'], [100, '🏃', 'Serious', '30 min'], [150, '🚀', 'Intense', '45 min']].map(([g, i, l, t]) => (
              <button key={g} className={`goal ${goal === g ? 'on' : ''}`} onClick={() => setGoal(g as number)}><span>{i}</span><b>{l}</b><small>{t}/day</small></button>
            ))}
          </div>
        </div>
        <div className="row center wrap">
          <button className="btn primary big" onClick={() => start(false)}>I'm a beginner →</button>
          <button className="btn ghost big" onClick={() => start(true)}>I know some German — test me</button>
        </div>
      </div>
    </div>
  );
}
