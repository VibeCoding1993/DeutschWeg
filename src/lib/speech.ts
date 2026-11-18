import { getState } from './store';
import { NARRATOR, audioKey } from '../data/voices';

// ---------- Pre-recorded neural audio ----------
let manifest: Record<string, string> = {};
const normText = (t: string) => t.replace(/[„“”"‚‘’«»]/g, '').replace(/\s*…\s*/g, ' ').replace(/[.!?,;:]+$/g, '').replace(/\s+/g, ' ').trim();
let loose: Record<string, string> = {};
fetch(`${import.meta.env.BASE_URL}audio/manifest.json`).then((r) => (r.ok ? r.json() : {})).then((m: Record<string, string>) => {
  manifest = m;
  loose = {};
  for (const [k, f] of Object.entries(m)) { const i = k.indexOf('#'); const lk = `${k.slice(0, i)}#${normText(k.slice(i + 1))}`; if (!loose[lk]) loose[lk] = f; }
}).catch(() => {});

/** Texts that had no recording (inspect with window.__missingAudio in the console). */
const missing = new Set<string>();
(window as unknown as { __missingAudio: Set<string> }).__missingAudio = missing;
let current: HTMLAudioElement | null = null;
// Demo/recording mode (set by the video recorder only): logs every played clip with a wall-clock time.
const W = window as unknown as { __DW_DEMO?: boolean; __speechLog?: { t: number; url: string }[] };
const logClip = (url: string) => { if (W.__DW_DEMO) (W.__speechLog ||= []).push({ t: Date.now(), url }); };

/** Returns the recorded clip URL for this text (character voice first, then narrator). */
export function clipFor(text: string, voice?: string): string | null {
  const t = text.trim();
  const n = normText(t);
  const f = (voice && (manifest[audioKey(voice, t)] || loose[`${voice}#${n}`])) || manifest[audioKey(NARRATOR, t)] || loose[`${NARRATOR}#${n}`];
  return f ? `${import.meta.env.BASE_URL}audio/${f}` : null;
}
let ttsTurn = 0;
const ttsCache = new Map<string, Promise<string | null>>();
function serverTts(text: string, voice: string): Promise<string | null> {
  const key = `${voice}#${text}`;
  if (!ttsCache.has(key)) {
    let token = '';
    try { token = localStorage.getItem('deutschweg.token') || ''; } catch { /* ignore */ }
    const p = fetch('/api/tts', { method: 'POST', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify({ text, voice }) })
      .then((r) => (r.ok ? r.json() : null)).then((d) => d?.url ?? null).catch(() => null);
    ttsCache.set(key, p);
    p.then((u) => { if (!u) ttsCache.delete(key); });
  }
  return ttsCache.get(key)!;
}

export const hasRecordings = () => Object.keys(manifest).length > 0;

// ---------- Text to speech ----------
let voices: SpeechSynthesisVoice[] = [];
function loadVoices() {
  if (!('speechSynthesis' in window)) return;
  voices = speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith('de'));
}
if ('speechSynthesis' in window) {
  loadVoices();
  speechSynthesis.onvoiceschanged = loadVoices;
}

export const germanVoices = () => voices;
export const ttsAvailable = () => 'speechSynthesis' in window;

function bestVoice(): SpeechSynthesisVoice | undefined {
  const pref = getState().settings.voice;
  return (
    voices.find((v) => v.voiceURI === pref) ||
    voices.find((v) => /google/i.test(v.name)) ||
    voices.find((v) => /natural|neural|online/i.test(v.name)) ||
    voices.find((v) => v.lang === 'de-DE') ||
    voices[0]
  );
}

const FEMALE = /anna|petra|katja|hedda|marlene|vicki|female|helena|amala|seraphina|elke|ingrid|louisa|gisela|tanja|klarissa|maja|google deutsch/i;
const MALE = /stefan|markus|conrad|hans|yannick|\bmale|killian|florian|jonas|ralf|bernd|christoph|kasper|klaus|georg/i;

/**
 * Pick a distinct voice + pitch for a dialog speaker so characters sound different.
 * `slot` separates several speakers of the same gender.
 */
export function speakerVoice(female: boolean, slot: number): { voice?: SpeechSynthesisVoice; pitch: number } {
  const pool = voices.filter((v) => (female ? FEMALE : MALE).test(v.name));
  if (pool.length) {
    const voice = pool[slot % pool.length];
    return { voice, pitch: pool.length > slot ? 1 : female ? 1.15 + 0.1 * slot : 0.85 - 0.08 * slot };
  }
  // Only one generic voice available: separate the characters by pitch.
  return { voice: bestVoice(), pitch: female ? 1.2 + 0.12 * slot : 0.7 - 0.1 * slot };
}

export function speak(text: string, opts: { rate?: number; pitch?: number; voice?: SpeechSynthesisVoice; neural?: string; onEnd?: () => void } = {}) {
  stopSpeaking();
  const clip = clipFor(text, opts.neural);
  if (clip) {
    const a = new Audio(clip);
    logClip(clip);
    current = a;
    const r = opts.rate ?? getState().settings.rate;
    a.playbackRate = Math.max(0.6, Math.min(1.3, r < 0.7 ? 0.72 : r + 0.05));
    a.preservesPitch = true;
    let done = false;
    const end = () => { if (done) return; done = true; if (current === a) current = null; opts.onEnd?.(); };
    a.onended = end; a.onerror = () => { done = true; fallbackSpeak(text, opts); };
    a.play().catch(() => { if (!done) { done = true; fallbackSpeak(text, opts); } });
    return;
  }
  if (Object.keys(manifest).length && !missing.has(text)) { missing.add(text); if (import.meta.env.DEV) console.debug('[audio] no recording for:', text); }
  // Ask the server to record it with the same natural voice; browser voice only if that fails.
  const myTurn = ++ttsTurn;
  serverTts(text, opts.neural || NARRATOR).then((url) => {
    if (myTurn !== ttsTurn) return;                 // user started something else meanwhile
    if (!url) { fallbackSpeak(text, opts); return; }
    const a = new Audio(url);
    logClip(url);
    current = a;
    a.playbackRate = (opts.rate ?? getState().settings.rate) < 0.7 ? 0.72 : 1;
    let done = false;
    a.onended = () => { if (done) return; done = true; if (current === a) current = null; opts.onEnd?.(); };
    a.onerror = () => { if (!done) { done = true; fallbackSpeak(text, opts); } };
    a.play().catch(() => { if (!done) { done = true; fallbackSpeak(text, opts); } });
  });
}

function fallbackSpeak(text: string, opts: { rate?: number; pitch?: number; voice?: SpeechSynthesisVoice; onEnd?: () => void }) {
  if (!ttsAvailable()) { opts.onEnd?.(); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'de-DE';
  const v = opts.voice || bestVoice();
  if (v) u.voice = v;
  u.pitch = opts.pitch ?? 1;
  u.rate = opts.rate ?? getState().settings.rate;
  u.onend = () => opts.onEnd?.();
  u.onerror = () => opts.onEnd?.();
  speechSynthesis.speak(u);
}

export const stopSpeaking = () => {
  ttsTurn++;
  if (current) { const a = current; current = null; a.onended = null; a.onerror = null; a.pause(); }
  if (ttsAvailable()) speechSynthesis.cancel();
};

// ---------- Speech recognition ----------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRec = any;
const Rec: AnyRec = (window as AnyRec).SpeechRecognition || (window as AnyRec).webkitSpeechRecognition;
export const sttAvailable = () => !!Rec;

export interface Listener { stop: () => void }

/**
 * Listen in German. `continuous` keeps listening (for free speaking) until stop() is called.
 * onText gets the full transcript so far (final + interim).
 */
export function listen(opts: {
  continuous?: boolean;
  onText: (text: string, final: boolean) => void;
  onEnd: (finalText: string) => void;
  onError?: (msg: string) => void;
}): Listener {
  if (!Rec) { opts.onError?.('Speech recognition is not supported in this browser. Use Chrome or Edge.'); opts.onEnd(''); return { stop() {} }; }
  const r = new Rec();
  r.lang = 'de-DE';
  r.interimResults = true;
  r.continuous = !!opts.continuous;
  r.maxAlternatives = 1;
  let finalText = '';
  let stopped = false;
  r.onresult = (e: AnyRec) => {
    let interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const res = e.results[i];
      if (res.isFinal) finalText += (finalText ? ' ' : '') + res[0].transcript.trim();
      else interim += res[0].transcript;
    }
    opts.onText((finalText + ' ' + interim).trim(), !interim);
  };
  r.onerror = (e: AnyRec) => {
    if (e.error === 'no-speech' || e.error === 'aborted') return;
    opts.onError?.(e.error === 'not-allowed' ? 'Microphone access was blocked. Allow it in your browser settings.' : `Speech error: ${e.error}`);
  };
  r.onend = () => {
    // Chrome ends continuous sessions after silence; restart until the user stops.
    if (opts.continuous && !stopped) { try { r.start(); return; } catch { /* fallthrough */ } }
    opts.onEnd(finalText);
  };
  r.start();
  return { stop() { stopped = true; try { r.stop(); } catch { /* already stopped */ } } };
}
