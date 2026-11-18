import { dueCards } from '../lib/progress';
import { useStore } from '../lib/store';
import { go } from '../router';

const DRILLS = [
  { id: 'articles', icon: '🎨', name: 'der · die · das', desc: 'Guess the gender of every noun you\'ve met' },
  { id: 'verbs', icon: '🔁', name: 'Verb conjugation', desc: 'Präsens, Präteritum & Perfekt of 90 verbs' },
  { id: 'adjectives', icon: '🧩', name: 'Adjective endings', desc: 'Infinite generated phrases, all cases' },
  { id: 'prepositions', icon: '🧭', name: 'Prepositions + case', desc: 'mit dem, für den, wegen des …' },
  { id: 'numbers', icon: '🔢', name: 'Numbers by ear', desc: 'Hear a number, prices or time — type it' },
  { id: 'dictation', icon: '🎧', name: 'Dictation', desc: 'Listen to sentences from your level and write them' },
];

export default function Practice() {
  const s = useStore((x) => x);
  const due = dueCards(s).length;
  return (
    <div className="page">
      <h1>Üben</h1>
      <p className="muted">Short, focused practice. Do your reviews first — that's where long-term memory is built.</p>
      <button className="review-card" onClick={() => go('/review')}>
        <div className="review-num">{due}</div>
        <div className="grow"><b>Wortschatz-Wiederholung</b><div className="muted small">{due ? `${due} word${due > 1 ? 's are' : ' is'} due — spaced repetition` : `All ${Object.keys(s.srs).length} words reviewed. 🎉`}</div></div>
        <span className="btn primary">Review →</span>
      </button>
      <div className="drill-grid">
        <button className="drill-card" onClick={() => go('/alphabet')}><span className="drill-icon">🔤</span><b>Alphabet & spelling</b><small className="muted">Letter names, quiz and spelling game</small></button>
        {DRILLS.map((d) => {
          const st = s.drills[d.id];
          return (
            <button key={d.id} className="drill-card" onClick={() => go(`/drill/${d.id}`)}>
              <span className="drill-icon">{d.icon}</span>
              <b>{d.name}</b>
              <small className="muted">{d.desc}</small>
              {st && <small className="drill-stat">{st.right}/{st.total} correct · {Math.round((st.right / Math.max(1, st.total)) * 100)}%</small>}
            </button>
          );
        })}
      </div>
      <button className="review-card" onClick={() => go('/grammar')}>
        <div className="review-num">📐</div>
        <div className="grow"><b>Grammatik-Übersicht</b><div className="muted small">All grammar explanations A1–C2, searchable — plus ask the AI tutor</div></div>
        <span className="btn ghost">Open →</span>
      </button>
    </div>
  );
}
