import { useState } from 'react';
import { pronounce, soundTips } from '../lib/pronounce';
import { useStore } from '../lib/store';

/** "🗣 ikh hy-suh …" line with tap-to-open sound tips. Hidden when the learner turns it off. */
export default function Pron({ text, tips = true }: { text: string; tips?: boolean }) {
  const show = useStore((s) => s.settings.showPron !== false);
  const [open, setOpen] = useState(false);
  if (!show || !text) return null;
  const t = tips ? soundTips(text) : [];
  return (
    <div className="pron" onClick={(e) => e.stopPropagation()}>
      <span className="pron-text" title="Approximate pronunciation">🗣 {pronounce(text)}</span>
      {t.length > 0 && <button className="pron-tip-btn" onClick={() => setOpen(!open)} aria-label="Pronunciation tips">{open ? '×' : '?'}</button>}
      {open && <ul className="pron-tips">{t.map((x) => <li key={x.sound}><b>{x.sound}</b> — {x.tip}</li>)}</ul>}
    </div>
  );
}
