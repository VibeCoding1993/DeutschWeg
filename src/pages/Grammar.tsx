import { useState } from 'react';
import { LEVEL_INFO, UNITS } from '../data';
import { MD } from '../components/ui';
import { aiReady, explain } from '../lib/ai';
import { go } from '../router';

export default function Grammar() {
  const [q, setQ] = useState('');
  const [ask, setAsk] = useState('');
  const [ans, setAns] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const strip = (h: string) => h.replace(/<[^>]+>/g, ' ');
  const list = UNITS.filter((u) => !q || (u.title + u.sub + u.grammar.title + strip(u.grammar.html)).toLowerCase().includes(q.toLowerCase()));

  const doAsk = async () => {
    setBusy(true); setErr(''); setAns('');
    try { setAns(await explain(ask)); } catch (e) { setErr((e as Error).message); }
    setBusy(false);
  };

  return (
    <div className="page">
      <button className="link" onClick={() => go('/practice')}>← Practice</button>
      <h1>Grammatik</h1>
      <div className="card ask">
        <h3>🤖 Ask the grammar tutor</h3>
        {aiReady() ? (
          <>
            <div className="chat-input">
              <input className="answer" value={ask} onChange={(e) => setAsk(e.target.value)} placeholder='e.g. "When do I use wenn vs. als?" or "Why is it ‚dem Mann‘ here?"'
                onKeyDown={(e) => e.key === 'Enter' && ask.trim() && doAsk()} />
              <button className="btn primary" disabled={!ask.trim() || busy} onClick={doAsk}>{busy ? '…' : 'Ask'}</button>
            </div>
            {err && <div className="error">{err}</div>}
            {ans && <MD text={ans} />}
          </>
        ) : <p className="muted">Add a Gemini key in <a href="#/me">Settings</a> to ask any grammar question.</p>}
      </div>
      <input className="answer search" placeholder="🔎 Search grammar (e.g. Dativ, Passiv, Konjunktiv)…" value={q} onChange={(e) => setQ(e.target.value)} />
      {list.map((u) => (
        <details key={u.id} className="card g-item" style={{ ['--lv' as string]: LEVEL_INFO[u.level].color }}>
          <summary><span className="level-badge sm">{u.level}</span> <b>{u.grammar.title}</b> <span className="muted small">· {u.title}</span></summary>
          <div className="g-html" dangerouslySetInnerHTML={{ __html: u.grammar.html }} />
          <button className="btn ghost" onClick={() => go(`/lesson/${u.id}`)}>Practise this unit →</button>
        </details>
      ))}
      {!list.length && <p className="muted">Nothing found.</p>}
    </div>
  );
}
