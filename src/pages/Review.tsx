import { useMemo, useRef, useState } from 'react';
import { findWord } from '../data';
import { Art, Confetti, SpeakBtn, UmlautBar } from '../components/ui';
import { checkAnswer, shuffle } from '../lib/check';
import { dueCards } from '../lib/progress';
import { ivlLabel, schedule } from '../lib/srs';
import { addXP, getState, setState, useStore } from '../lib/store';
import { speak } from '../lib/speech';
import { sfx } from '../lib/sound';
import { go } from '../router';
import Pron from '../components/Pron';
import { Mascot } from '../components/Brand';

export default function Review() {
  const total = useStore((s) => Object.keys(s.srs).length);
  const [session] = useState(() => shuffle(dueCards(getState()).map(([k]) => k)).slice(0, 30));
  const [queue, setQueue] = useState(session);
  const [shown, setShown] = useState(false);
  const [typed, setTyped] = useState('');
  const [done, setDone] = useState(0);
  const ref = useRef<HTMLInputElement>(null);
  const key = queue[0];
  const item = useMemo(() => (key ? findWord(key) : null), [key]);
  const card = useStore((s) => (key ? s.srs[key] : undefined));

  if (!session.length || !queue.length) {
    return (
      <div className="page narrow center-text">
        {session.length > 0 && <Confetti run />}
        <Mascot size={120} mood={session.length ? 'cheer' : 'happy'} say={session.length ? 'Gut gemacht!' : 'Alles wiederholt!'} />
        <h1>{session.length ? 'Review complete!' : 'Nothing to review right now'}</h1>
        <p className="muted">{total === 0 ? 'Finish a unit to add its words to your deck.' : `Your deck has ${total} words. Come back later — reviews appear exactly when you're about to forget.`}</p>
        <div className="row center"><button className="btn primary" onClick={() => go('/')}>Continue learning</button><button className="btn ghost" onClick={() => go('/practice')}>Drills</button></div>
      </div>
    );
  }
  if (!item || !card) { setQueue((q) => q.slice(1)); return null; }
  const { word, unit } = item;
  const full = word.g ? `${word.g} ${word.de}` : word.de;
  const verdict = shown && typed ? checkAnswer(typed, [full, word.de]) : null;

  const reveal = () => { setShown(true); speak(full); if (typed) sfx(checkAnswer(typed, [full, word.de]).ok ? 'ok' : 'bad'); };
  const grade = (g: 0 | 1 | 2 | 3) => {
    setState((s) => { s.srs[key] = schedule(s.srs[key], g); });
    addXP(g === 0 ? 1 : 2);
    setQueue((q) => (g === 0 ? [...q.slice(1), key] : q.slice(1)));
    if (g > 0) setDone((d) => d + 1);
    setShown(false); setTyped('');
    setTimeout(() => ref.current?.focus(), 50);
  };

  return (
    <div className="page narrow">
      <div className="row between"><button className="link" onClick={() => go('/practice')}>← Practice</button><span className="muted">{done} / {session.length} reviewed</span></div>
      <div className={`flash ${shown ? 'flipped' : ''}`}>
        <div className="eyebrow">{unit.level} · {unit.title}</div>
        <div className="flash-en">{word.en}</div>
        {!shown ? (
          <>
            <input ref={ref} autoFocus className="answer de center-text" placeholder={word.g ? 'with article, e.g. der Hund' : 'German word'} value={typed}
              onChange={(e) => setTyped(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && reveal()} spellCheck={false} autoCapitalize="off" />
            <UmlautBar target={ref} onInsert={setTyped} />
            <button className="btn primary big" onClick={reveal}>{typed ? 'Check' : 'Show answer'}</button>
          </>
        ) : (
          <>
            <div className="flash-de de"><Art g={word.g} /> {word.de} <SpeakBtn text={full} /></div>
            <Pron text={full} />
            {verdict && <div className={verdict.ok ? 'ok-text' : 'bad-text'}>{verdict.ok ? '✓ ' + (verdict.note || 'Correct') : `✗ You wrote "${typed}"`}</div>}
            {word.pl && word.pl !== '-' && word.g && <div className="muted">Plural: die {word.pl}</div>}
            {word.ex && <div className="ex-line de">„{word.ex}" <SpeakBtn small text={word.ex} /></div>}
            <div className="grades">
              <button className="g0" onClick={() => grade(0)}>Again<small>{ivlLabel(card, 0)}</small></button>
              <button className="g1" onClick={() => grade(1)}>Hard<small>{ivlLabel(card, 1)}</small></button>
              <button className="g2" onClick={() => grade(2)}>Good<small>{ivlLabel(card, 2)}</small></button>
              <button className="g3" onClick={() => grade(3)}>Easy<small>{ivlLabel(card, 3)}</small></button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
