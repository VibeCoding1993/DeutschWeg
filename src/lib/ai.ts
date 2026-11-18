import { getState } from './store';

/** Optional AI tutor. Uses the learner's own Google Gemini API key (stored only in this browser). */

export const aiReady = () => !!getState().settings.geminiKey.trim();

interface Msg { role: 'user' | 'model'; text: string }

async function call(system: string, msgs: Msg[], json = false): Promise<string> {
  const { geminiKey, model } = getState().settings;
  if (!geminiKey) throw new Error('Add your Gemini API key in Settings to use the AI tutor.');
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model || 'gemini-2.5-flash')}:generateContent`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': geminiKey.trim() },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: msgs.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
        generationConfig: { temperature: json ? 0.3 : 0.8, ...(json ? { responseMimeType: 'application/json' } : {}) },
      }),
    },
  );
  if (!res.ok) {
    const body = await res.text();
    if (res.status === 400 && /API key/i.test(body)) throw new Error('Your Gemini API key was rejected. Check it in Settings.');
    if (res.status === 429) throw new Error('Rate limit reached on your Gemini key. Wait a minute and try again.');
    throw new Error(`AI request failed (${res.status}).`);
  }
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || '').join('') || '';
  if (!text) throw new Error('The AI returned an empty answer. Try again.');
  return text;
}

const lang = () => (getState().settings.explainLang === 'fr' ? 'French' : 'English');

export interface WritingFeedback {
  level: string;
  score: number; // 0-100
  criteria: { name: string; score: number; comment: string }[];
  corrections: { original: string; corrected: string; why: string }[];
  improved: string;
  tips: string[];
}

export async function correctWriting(task: string, level: string, text: string): Promise<WritingFeedback> {
  const sys = `You are an experienced Goethe-Institut examiner and German teacher. A learner targeting ${level} wrote a text for this task:
"""${task}"""
Evaluate it like the Goethe/telc ${level} writing rubric. Respond ONLY with JSON matching:
{"level": "estimated CEFR level of the text, e.g. B1+", "score": 0-100 overall for the target level,
"criteria": [{"name":"Aufgabenerfüllung","score":0-100,"comment":"..."},{"name":"Kohärenz","score":0-100,"comment":"..."},{"name":"Wortschatz","score":0-100,"comment":"..."},{"name":"Strukturen","score":0-100,"comment":"..."}],
"corrections": [{"original":"exact erroneous fragment from the text","corrected":"corrected fragment","why":"short grammar explanation"}],
"improved": "a corrected and slightly improved version of the whole text at ${level} level, keeping the learner's ideas",
"tips": ["3 concrete tips to reach ${level}"]}
List up to 15 of the most important corrections. Write comments, explanations and tips in ${lang()}.`;
  const out = await call(sys, [{ role: 'user', text }], true);
  return JSON.parse(out.replace(/^```json\s*|```$/g, ''));
}

export interface SpeakingFeedback { score: number; summary: string; corrections: { original: string; corrected: string; why: string }[]; better: string; tips: string[] }

export async function rateSpeaking(task: string, level: string, transcript: string): Promise<SpeakingFeedback> {
  const sys = `You are a Goethe-Institut speaking examiner. The learner (target ${level}) answered this speaking task orally:
"""${task}"""
You get an automatic speech-to-text transcript (punctuation and capitalisation are unreliable; ignore them).
Respond ONLY with JSON: {"score":0-100 for the target level,"summary":"2-3 sentences on content, fluency, range, accuracy",
"corrections":[{"original":"...","corrected":"...","why":"..."}],"better":"a model answer of similar length at ${level}","tips":["3 tips"]}.
Write summary, explanations and tips in ${lang()}.`;
  const out = await call(sys, [{ role: 'user', text: transcript }], true);
  return JSON.parse(out.replace(/^```json\s*|```$/g, ''));
}

export async function chatTurn(scenario: string, level: string, history: Msg[]): Promise<string> {
  const sys = `You are a friendly native German conversation partner. Role-play this scenario: ${scenario}
The learner is at CEFR ${level}. Speak ONLY German, adapted to ${level} (short sentences for A1/A2, natural speech for B2+).
Keep each reply to 1-3 sentences and end with a question or prompt that keeps the conversation going.
If the learner's last message has a clear mistake, append on a new line: "💡 " followed by the corrected sentence (in German) — nothing else.`;
  return call(sys, history);
}

export async function explain(question: string): Promise<string> {
  const sys = `You are a patient German grammar teacher. Answer in ${lang()} with short German examples. Be concise (max 180 words). Use simple Markdown (bold, lists).`;
  return call(sys, [{ role: 'user', text: question }]);
}
