// Creates fictional demo students with realistic progress for the promo video.
// Usage: node video/seed-demo.mjs   (server must run on :8787)
const API = 'http://localhost:8787/api';
const day = (k) => { const d = new Date(Date.now() - k * 864e5); return d.toISOString().slice(0, 10); };
async function call(path, body, token, method) {
  const r = await fetch(API + path, { method: method || (body ? 'POST' : 'GET'), headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: body ? JSON.stringify(body) : undefined });
  return r.json();
}
const students = [
  { u: 'demo_sara', n: 'Sara M.', xp: 2840, streak: 12, units: ['a1-1', 'a1-2', 'a1-3', 'a1-4', 'a1-5', 'a1-6', 'st-0', 'st-1', 'st-2', 'st-3'], mins: [34, 41, 25, 38, 52, 30, 45, 28, 36, 40, 22, 31, 47, 39], tests: [[12, 20], [15, 20], [17, 20], [71, 100]] },
  { u: 'demo_youssef', n: 'Youssef A.', xp: 1920, streak: 6, units: ['a1-1', 'a1-2', 'a1-3', 'st-0', 'st-1'], mins: [20, 18, 25, 0, 30, 22, 19, 15, 0, 26, 21, 17, 24, 20], tests: [[9, 20], [13, 20], [14, 20]] },
  { u: 'demo_lea', n: 'Léa D.', xp: 4310, streak: 21, units: ['a1-1', 'a1-2', 'a1-3', 'a1-4', 'a1-5', 'a1-6', 'a1-7', 'a1-8', 'a2-1', 'a2-2', 'a2-3'], mins: [55, 48, 62, 40, 58, 51, 66, 45, 49, 60, 53, 57, 44, 61], tests: [[16, 20], [18, 20], [82, 100], [24, 30]] },
  { u: 'demo_omar', n: 'Omar K.', xp: 760, streak: 3, units: ['a1-1', 'st-0'], mins: [12, 15, 10, 0, 0, 14, 9, 0, 11, 13, 0, 8, 16, 12], tests: [[8, 20]] },
];
for (const s of students) {
  let r = await call('/register', { username: s.u, password: 'demo-pass-123', displayName: s.n });
  if (!r.token) r = await call('/login', { username: s.u, password: 'demo-pass-123' });
  const time = {}, daily = {};
  s.mins.forEach((m, k) => { if (m) { time[day(13 - k)] = m * 60; daily[day(13 - k)] = Math.round(m * 4.2); } });
  const units = Object.fromEntries(s.units.map((id, i) => [id, { best: 80 + (i * 7) % 20, stars: 2 + (i % 2), done: true, plays: 1 }]));
  const srs = {};
  s.units.forEach((id) => { for (let i = 0; i < 12; i++) srs[`${id}|w${i}`] = { due: Date.now() + (i - 3) * 864e5, ivl: (i * 5) % 40, ease: 2.5, reps: i % 6, lapses: 0 }; });
  const state = {
    name: s.n, onboarded: true, xp: s.xp, streak: s.streak, bestStreak: s.streak + 2, lastDay: day(0), daily, time, dailyMinutes: 30, dailyGoal: 100,
    timeByArea: { Lektionen: 9200, Kursbuch: 5400, Tests: 3100, Sprechen: 2600, Drills: 2900, Wiederholung: 1800, Schreiben: 900 },
    units, srs, drills: { verbs: { right: 182, total: 214 }, articles: { right: 240, total: 301 }, adjectives: { right: 64, total: 92 }, alphabet: { right: 55, total: 60 } },
    writing: [], speakCount: 14, achievements: ['first', 'xp500', 'streak3', 'perfect'], examScores: {}, startLevel: null, unlockAll: false,
    settings: { theme: 'dark', sound: true, rate: 0.95, voice: '', geminiKey: '', model: 'gemini-2.5-flash', explainLang: 'en', showPron: true },
  };
  await call('/progress', { state }, r.token, 'PUT');
  for (const [sc, tot] of s.tests) await call('/results', { testId: tot === 100 ? 'a1-full' : 'bank-A1-all', title: tot === 100 ? 'A1 Modelltest (100 Fragen)' : `A1 · alle Teile · ${tot} Fragen`, score: sc, total: tot,
    detail: { sections: { Hören: { score: Math.round(sc * 0.24), total: Math.round(tot / 4) }, Lesen: { score: Math.round(sc * 0.26), total: Math.round(tot / 4) }, Wortschatz: { score: Math.round(sc * 0.27), total: Math.round(tot / 4) }, Grammatik: { score: sc - Math.round(sc * 0.24) - Math.round(sc * 0.26) - Math.round(sc * 0.27), total: tot - 3 * Math.round(tot / 4) } } } }, r.token);
  console.log('seeded', s.u);
}
