import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { speak } from '../lib/speech';
import { addXP, onToast } from '../lib/store';

export function SpeakBtn({ text, slow, small, label }: { text: string; slow?: boolean; small?: boolean; label?: string }) {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      className={`speak-btn ${small ? 'small' : ''} ${on ? 'on' : ''}`}
      title={slow ? 'Play slowly' : 'Play'}
      aria-label={label || (slow ? 'Play slowly' : 'Play audio')}
      onClick={(e) => { e.stopPropagation(); setOn(true); speak(text, { rate: slow ? 0.6 : undefined, onEnd: () => setOn(false) }); }}
    >
      {slow ? '🐢' : '🔊'}
    </button>
  );
}

/** Buttons that insert ä ö ü ß into the referenced input/textarea. */
export function UmlautBar({ target, onInsert }: { target: RefObject<HTMLInputElement | HTMLTextAreaElement | null>; onInsert: (v: string) => void }) {
  const chars = ['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü', '„', '“'];
  return (
    <div className="umlauts">
      {chars.map((c) => (
        <button
          key={c}
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            const el = target.current;
            if (!el) return;
            const s = el.selectionStart ?? el.value.length, e = el.selectionEnd ?? el.value.length;
            const v = el.value.slice(0, s) + c + el.value.slice(e);
            onInsert(v);
            requestAnimationFrame(() => { el.focus(); el.setSelectionRange(s + 1, s + 1); });
          }}
        >{c}</button>
      ))}
    </div>
  );
}

export function Progress({ value, color }: { value: number; color?: string }) {
  return <div className="bar"><div style={{ width: `${Math.max(0, Math.min(100, value))}%`, background: color }} /></div>;
}

export function Ring({ value, size = 56, stroke = 6, color = 'var(--accent)', children }: { value: number; size?: number; stroke?: number; color?: string; children?: ReactNode }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--line)" strokeWidth={stroke} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - Math.min(1, value))} transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: 'stroke-dashoffset .6s' }} />
      </svg>
      <div className="ring-in">{children}</div>
    </div>
  );
}

export function Confetti({ run }: { run: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!run || !ref.current) return;
    const cv = ref.current, ctx = cv.getContext('2d')!;
    cv.width = innerWidth; cv.height = innerHeight;
    const colors = ['#7c5cff', '#ffd23f', '#ff5d73', '#2ec4b6', '#3a86ff'];
    const ps = Array.from({ length: 140 }, () => ({
      x: innerWidth / 2, y: innerHeight / 3, vx: (Math.random() - 0.5) * 14, vy: Math.random() * -14 - 4,
      s: Math.random() * 7 + 4, c: colors[Math.floor(Math.random() * colors.length)], r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3,
    }));
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      ps.forEach((p) => { p.vy += 0.35; p.x += p.vx; p.y += p.vy; p.r += p.vr; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6); ctx.restore(); });
      if (t - t0 < 2800) raf = requestAnimationFrame(tick); else ctx.clearRect(0, 0, cv.width, cv.height);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run]);
  return <canvas ref={ref} className="confetti" aria-hidden />;
}

export function ToastHost() {
  const [items, setItems] = useState<{ id: number; msg: string; icon?: string }[]>([]);
  useEffect(() => {
    onToast((msg, icon) => {
      const id = Date.now() + Math.random();
      setItems((x) => [...x, { id, msg, icon }]);
      setTimeout(() => setItems((x) => x.filter((i) => i.id !== id)), 3500);
    });
  }, []);
  return <div className="toasts">{items.map((t) => <div key={t.id} className="toast"><span>{t.icon || '✨'}</span>{t.msg}</div>)}</div>;
}

/** Minimal, safe Markdown → React for AI answers (bold, italics, lists, paragraphs). */
export function MD({ text }: { text: string }) {
  const lines = text.split('\n');
  const out: ReactNode[] = [];
  let list: ReactNode[] = [];
  const inline = (s: string, k: number) => {
    const parts = s.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
    return <span key={k}>{parts.map((p, i) => p.startsWith('**') ? <b key={i}>{p.slice(2, -2)}</b> : p.startsWith('*') && p.length > 2 ? <i key={i}>{p.slice(1, -1)}</i> : p)}</span>;
  };
  const flush = () => { if (list.length) { out.push(<ul key={`l${out.length}`}>{list}</ul>); list = []; } };
  lines.forEach((l, i) => {
    const m = l.match(/^\s*([-*•]|\d+\.)\s+(.*)/);
    if (m) list.push(<li key={i}>{inline(m[2], i)}</li>);
    else { flush(); if (l.trim()) out.push(<p key={i}>{inline(l.replace(/^#+\s*/, ''), i)}</p>); }
  });
  flush();
  return <div className="md">{out}</div>;
}

export function useTimer(seconds: number, running: boolean, onEnd?: () => void) {
  const [left, setLeft] = useState(seconds);
  const endRef = useRef(onEnd);
  endRef.current = onEnd;
  useEffect(() => setLeft(seconds), [seconds]);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setLeft((l) => {
      if (l <= 1) { clearInterval(id); endRef.current?.(); return 0; }
      return l - 1;
    }), 1000);
    return () => clearInterval(id);
  }, [running]);
  return [left, setLeft] as const;
}

export const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export function XPButton({ xp, children, onClick, className = 'btn primary' }: { xp: number; children: ReactNode; onClick?: () => void; className?: string }) {
  return <button className={className} onClick={() => { addXP(xp); onClick?.(); }}>{children}</button>;
}

export const Art = ({ g }: { g?: string }) => g ? <span className={`art ${g === 'der' ? 'm' : g === 'die' ? 'f' : 'n'}`}>{g}</span> : null;
