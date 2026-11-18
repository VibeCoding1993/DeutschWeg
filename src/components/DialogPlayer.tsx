import { useEffect, useMemo, useRef, useState } from 'react';
import type { Dialog } from '../types';
import Scene, { CAST } from './Scene';
import { germanVoices, listen, speak, speakerVoice, stopSpeaking, sttAvailable, type Listener } from '../lib/speech';
import { alignSpeech } from '../lib/check';
import { sfx } from '../lib/sound';
import { addXP, setState } from '../lib/store';
import { CHARACTER_VOICE } from '../data/voices';
import Pron from './Pron';

type Mode = 'idle' | 'play' | 'role';

export default function DialogPlayer({ dialog }: { dialog: Dialog }) {
  const cast = useMemo(() => Array.from(new Set(dialog.lines.map((l) => l.who))), [dialog]);
  const [cur, setCur] = useState<number | null>(null);
  const [mode, setMode] = useState<Mode>('idle');
  const [slow, setSlow] = useState(false);
  const [showEn, setShowEn] = useState(false);
  const [hideDe, setHideDe] = useState(false);
  const [me, setMe] = useState<string | null>(null);
  const [heard, setHeard] = useState<Record<number, { text: string; score: number }>>({});
  const [rec, setRec] = useState(false);
  const run = useRef(0);               // cancels a running playback when bumped
  const lis = useRef<Listener | null>(null);
  const [, setVoicesReady] = useState(0);
  useEffect(() => { const t = setTimeout(() => setVoicesReady((x) => x + 1), 600); return () => { clearTimeout(t); run.current++; stopSpeaking(); lis.current?.stop(); }; }, []);

  const voiceOf = (who: string) => {
    const f = CAST[who]?.look.f ?? true;
    const slot = cast.filter((c) => (CAST[c]?.look.f ?? true) === f).indexOf(who);
    return speakerVoice(f, Math.max(0, slot));
  };
  void germanVoices;

  const sayLine = (i: number, then?: () => void) => {
    const l = dialog.lines[i];
    const v = voiceOf(l.who);
    setCur(i);
    speak(l.de, { ...v, neural: CHARACTER_VOICE[l.who], rate: slow ? 0.65 : undefined, onEnd: then });
  };

  const stop = () => { run.current++; stopSpeaking(); lis.current?.stop(); setMode('idle'); setCur(null); setRec(false); };

  const playFrom = (start: number, role: string | null) => {
    const token = ++run.current;
    setMode(role ? 'role' : 'play');
    const step = (i: number) => {
      if (token !== run.current) return;
      if (i >= dialog.lines.length) {
        setMode('idle'); setCur(null);
        if (role) { sfx('win'); addXP(10); setState((s) => { s.speakCount++; }); } else addXP(3);
        return;
      }
      const l = dialog.lines[i];
      if (role && l.who === role) {
        // learner's turn: listen
        setCur(i);
        if (!sttAvailable()) { setTimeout(() => step(i + 1), 2500 + l.de.length * 60); return; }
        setRec(true);
        lis.current = listen({
          onText: (t) => setHeard((h) => ({ ...h, [i]: { text: t, score: alignSpeech(l.de, t).score } })),
          onEnd: (t) => {
            setRec(false);
            const score = alignSpeech(l.de, t).score;
            setHeard((h) => ({ ...h, [i]: { text: t, score } }));
            sfx(score >= 70 ? 'ok' : 'bad');
            setTimeout(() => step(i + 1), 500);
          },
        });
        return;
      }
      sayLine(i, () => setTimeout(() => step(i + 1), 350));
    };
    step(start);
  };

  const speaking = cur !== null && mode !== 'idle' ? dialog.lines[cur].who : null;

  return (
    <div className="dialog">
      <div className="dialog-head">
        <h3 className="de">🎬 {dialog.title}</h3>
        <div className="cast-line">{cast.map((c) => <span key={c} title={CAST[c]?.bio}>{CAST[c]?.name}</span>)}</div>
      </div>
      <div className="scene-wrap"><Scene kind={dialog.scene} cast={cast} speaking={speaking} me={me} />
        {cur !== null && mode !== 'idle' && !hideDe && <div className="subtitle de">{dialog.lines[cur].de}</div>}
      </div>
      <div className="dialog-controls">
        {mode === 'idle'
          ? <button className="btn primary" onClick={() => { setMe(null); playFrom(0, null); }}>▶ Play dialog</button>
          : <button className="btn danger" onClick={stop}>⏹ Stop</button>}
        <button className={`btn ghost ${slow ? 'on' : ''}`} onClick={() => setSlow(!slow)}>🐢 {slow ? 'Slow' : 'Normal'}</button>
        <button className={`btn ghost ${hideDe ? 'on' : ''}`} onClick={() => setHideDe(!hideDe)}>{hideDe ? '👁 Show text' : '🙈 Hide text'}</button>
        <button className={`btn ghost ${showEn ? 'on' : ''}`} onClick={() => setShowEn(!showEn)}>🇬🇧 {showEn ? 'Hide' : 'Show'} English</button>
      </div>
      <div className="roleplay">
        <span className="muted small">🎭 Role-play — you speak:</span>
        {cast.map((c) => (
          <button key={c} className="chip-btn" disabled={mode !== 'idle'} onClick={() => { setMe(c); setHeard({}); playFrom(0, c); }}>{CAST[c]?.name}</button>
        ))}
        {!sttAvailable() && <span className="muted small">(no mic in this browser: pauses so you can say your lines aloud)</span>}
      </div>
      <ol className="lines">
        {dialog.lines.map((l, i) => {
          const h = heard[i];
          const mine = me === l.who && mode === 'role';
          return (
            <li key={i} className={`line ${cur === i ? 'cur' : ''} ${CAST[l.who]?.look.f ? 'fem' : 'masc'} ${mine ? 'mine' : ''}`}
              onClick={() => mode === 'idle' && sayLine(i, () => setCur(null))}>
              <b className="who">{CAST[l.who]?.name}</b>
              <div className="grow">
                <div className={`de ${hideDe ? 'blur' : ''}`}>
                  {h ? alignSpeech(l.de, h.text).words.map((w, k) => <span key={k} className={w.ok ? 'hit' : 'miss'}>{w.w} </span>) : l.de}
                </div>
                {!hideDe && <Pron text={l.de} />}
                {showEn && <div className="muted small">{l.en}</div>}
                {h && <div className="small muted">🎙️ {h.score}% {cur === i && rec ? '· listening…' : ''}</div>}
                {cur === i && rec && !h && <div className="small rec-dot">● Your turn — speak now</div>}
              </div>
              <span className="play-ico">🔊</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
