import { useState } from 'react';
import { Logo, Mascot } from '../components/Brand';
import { login, register } from '../lib/api';

export default function Login() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [showFull, setShowFull] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(''); setBusy(true);
    try {
      if (mode === 'login') await login(username.trim(), password);
      else await register(username.trim(), password, displayName.trim() || username.trim());
    } catch (e2) { setErr((e2 as Error).message); }
    setBusy(false);
  };

  return (
    <div className="auth">
      <div className="auth-art">
        <Logo size={64} big />
        <h1>Von <span className="hl">A1</span> bis <span className="hl">C2</span> — mit Spaß.</h1>
        <p>Dialogs with real voices, speaking practice, exam training and your progress saved in your account.</p>
        <div className="teaser">
          <video src="/media/teaser.mp4" poster="/media/teaser.jpg" autoPlay muted loop playsInline preload="auto" aria-label="DeutschWeg in 45 seconds" />
          <button className="teaser-play" onClick={() => setShowFull(true)}>▶ Watch the full tour · 3 min with sound</button>
        </div>
        <div className="cta-row">
          <button className="btn primary big" onClick={() => { setMode('register'); setErr(''); document.querySelector('.auth-card')?.scrollIntoView({ behavior: 'smooth' }); }}>✨ Create a free account</button>
          <span className="muted small">Free · no credit card · start in 30 seconds</span>
        </div>
        <ul className="auth-points">
          <li>🎧 6,800+ sentences spoken by natural German voices</li>
          <li>🎭 Story dialogs & role-play with your microphone</li>
          <li>📝 5,000+ test questions from A1 to C2 + placement test</li>
          <li>📊 Daily learning time, statistics & a teacher dashboard</li>
        </ul>
      </div>
      {showFull && (
        <div className="video-modal" onClick={() => setShowFull(false)}>
          <div className="video-modal-inner" onClick={(e) => e.stopPropagation()}>
            <button className="video-close" onClick={() => setShowFull(false)} aria-label="Close">✕</button>
            <video src="/media/DeutschWeg-promo.mp4" poster="/media/promo.jpg" controls autoPlay playsInline>
              <track kind="captions" src="/media/promo.en.vtt" srcLang="en" label="English" default />
            </video>
            <button className="btn primary big" onClick={() => { setShowFull(false); setMode('register'); }}>✨ Create my free account</button>
          </div>
        </div>
      )}
      <form className="auth-card" onSubmit={submit}>
        <div className="seg wide">
          <button type="button" className={mode === 'login' ? 'on' : ''} onClick={() => { setMode('login'); setErr(''); }}>Anmelden</button>
          <button type="button" className={mode === 'register' ? 'on' : ''} onClick={() => { setMode('register'); setErr(''); }}>Registrieren</button>
        </div>
        <div className="auth-mascot"><Mascot size={92} mood={err ? 'sad' : mode === 'login' ? 'wave' : 'happy'} say={err ? 'Oje! Noch einmal?' : mode === 'login' ? 'Hallo! Schön, dass du da bist!' : 'Super! Los geht\'s!'} /></div>
        <h2>{mode === 'login' ? 'Willkommen zurück! 👋' : 'Konto erstellen ✨'}</h2>
        {mode === 'register' && (
          <label className="field">Your name<input className="answer" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="e.g. Otmane" autoComplete="name" /></label>
        )}
        <label className="field">Username<input className="answer" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" autoComplete="username" autoCapitalize="off" required /></label>
        <label className="field">Password<input className="answer" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={mode === 'register' ? 'at least 6 characters' : '••••••'} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} required /></label>
        {err && <div className="error">{err}</div>}
        <button className="btn primary big" disabled={busy || !username || !password}>{busy ? '…' : mode === 'login' ? 'Anmelden →' : 'Konto erstellen →'}</button>
        <p className="muted small center-text">{mode === 'login' ? 'No account yet? ' : 'Already registered? '}
          <button type="button" className="link inline" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>{mode === 'login' ? 'Register' : 'Log in'}</button></p>
      </form>
    </div>
  );
}
