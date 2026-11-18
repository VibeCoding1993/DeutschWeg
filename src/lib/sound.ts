import { getState } from './store';

let ctx: AudioContext | null = null;

function tone(freq: number, start: number, dur: number, type: OscillatorType = 'sine', vol = 0.12) {
  if (!ctx) ctx = new AudioContext();
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(0, ctx.currentTime + start);
  g.gain.linearRampToValueAtTime(vol, ctx.currentTime + start + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur);
  o.connect(g).connect(ctx.destination);
  o.start(ctx.currentTime + start);
  o.stop(ctx.currentTime + start + dur + 0.05);
}

export function sfx(kind: 'ok' | 'bad' | 'win' | 'tap') {
  if (!getState().settings.sound) return;
  try {
    if (kind === 'ok') { tone(660, 0, 0.12, 'triangle'); tone(990, 0.08, 0.2, 'triangle'); }
    if (kind === 'bad') { tone(220, 0, 0.18, 'sawtooth', 0.06); tone(180, 0.1, 0.25, 'sawtooth', 0.05); }
    if (kind === 'tap') tone(520, 0, 0.05, 'sine', 0.05);
    if (kind === 'win') [523, 659, 784, 1046].forEach((f, i) => tone(f, i * 0.11, 0.3, 'triangle'));
  } catch { /* audio not available */ }
}
