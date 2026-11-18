// Records the DeutschWeg promo video: drives the real app, narrates with a neural voice,
// logs the app's own German audio, then mixes everything with ffmpeg.
// Usage: node video/record.mjs <adminPassword>     (dev server on :5179, API on :8787, demo users seeded)
import { chromium } from 'playwright-core';
import { execFileSync } from 'node:child_process';
import { mkdirSync, existsSync, readdirSync, writeFileSync, renameSync, rmSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const CLEAN = process.env.CLEAN === '1';             // no subtitles (used for the landing-page teaser)
const OUT = join(ROOT, 'video', CLEAN ? 'build-clean' : 'build');
const BASE = process.env.APP_URL || 'http://localhost:5179/';
const ADMIN_PW = process.argv[2];
const NARRATOR = 'en-US-AndrewNeural';
if (!ADMIN_PW) { console.error('Usage: node video/record.mjs <adminPassword>'); process.exit(1); }
rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, 'raw'), { recursive: true });

// ---------- narration ----------
const LINES = {
  intro: 'Want to learn German — from your very first word, all the way to fluent? Meet DeutschWeg.',
  login: 'Every student gets a personal account. Progress, scores and study time are saved automatically, on any device.',
  path: 'The learning path covers every level, from A1 to C2: thirty-seven units with clear grammar, useful vocabulary, and lots of fun exercises.',
  goals: 'Daily goals, streaks and XP keep you motivated, every single day.',
  alpha: 'Complete beginners start with the alphabet. Every letter and every word is spoken by a natural German voice.',
  story: 'In the coursebook companion, you follow a story with recurring characters. Listen to each dialog: in a café, at the doctor, or in the city.',
  pron: 'Under every sentence there is an easy pronunciation guide, with tips for tricky sounds like ü, ch, and the German r.',
  role: "Then it's your turn: choose a character, and play the role yourself with your microphone.",
  ex: 'Each unit comes with interactive exercises: multiple choice, gap filling, sentence building, listening and speaking. Beginners get a word bank and hints.',
  check: 'Every answer is checked instantly, and you hear the correct sentence.',
  drills: 'Endless drills train the hardest parts of German: der, die, das, verb forms, adjective endings and numbers.',
  speak: 'In the speaking lab, you shadow native sentences, practise timed exam tasks, and even talk with an A.I. conversation partner.',
  write: 'The writing lab uses real exam formats, with a timer, a phrase bank, live checks, and optional A.I. correction.',
  tests: 'The Test Center has more than five thousand questions from A1 to C2 — listening, reading, vocabulary and grammar — plus a placement test that finds your level.',
  stats: 'Your statistics show how many minutes you study each day, your progress on every level, and all your test results.',
  admin: "And teachers get an admin dashboard: every student's study time, streak, units and test scores, at a glance.",
  outro: 'DeutschWeg. Learn German step by step, and have fun doing it. Viel Spaß!',
};
const dur = {};
const nfile = {};
const NDIR = join(ROOT, 'video', 'narration');
mkdirSync(NDIR, { recursive: true });
for (const [k, text] of Object.entries(LINES)) {
  const f = join(NDIR, `${k}-${Buffer.from(text).toString('base64url').slice(0, 10)}.mp3`);
  if (existsSync(f) && statSync(f).size > 1000) { dur[k] = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString()) * 1000; nfile[k] = f; continue; }
  execFileSync('sleep', ['1']);
  for (let attempt = 1; ; attempt++) {
    try { execFileSync(join(ROOT, '.venv', 'bin', 'edge-tts'), ['--voice', NARRATOR, '--rate=+2%', '--text', text, '--write-media', f], { stdio: ['ignore', 'ignore', 'pipe'] }); if (statSync(f).size > 1000) break; throw Object.assign(new Error('empty'), { stderr: 'empty audio file' }); }
    catch (e) { if (attempt >= 6) { console.error(`narration "${k}" failed:`, String(e.stderr).slice(-300)); process.exit(1); } execFileSync('sleep', [String(attempt * 5)]); }
  }
  nfile[k] = f;
  dur[k] = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString()) * 1000;
}
console.log('narration ready', Object.values(dur).reduce((a, b) => a + b, 0) / 1000, 's');

// ---------- browser ----------
const browser = await chromium.launch({
  executablePath: process.env.CHROME || join(process.env.HOME, '.cache/ms-playwright/chromium-1187/chrome-linux/chrome'),
  args: ['--autoplay-policy=no-user-gesture-required', '--mute-audio', '--force-device-scale-factor=1'],
});
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, recordVideo: { dir: join(OUT, 'raw'), size: { width: 1920, height: 1080 } } });
await ctx.addInitScript(() => {
  window.__DW_DEMO = true;
  const css = `
  #ov-title{position:fixed;top:26px;left:50%;transform:translateX(-50%) translateY(-20px);opacity:0;z-index:99999;padding:12px 26px;border-radius:999px;
    background:linear-gradient(90deg,#7c5cff,#ff7a59);color:#fff;font:800 30px Nunito,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.35);transition:all .5s;pointer-events:none;white-space:nowrap}
  #ov-title.on{opacity:1;transform:translateX(-50%) translateY(0)}
  #ov-sub{position:fixed;bottom:44px;left:50%;transform:translateX(-50%);max-width:1400px;z-index:99999;padding:14px 26px;border-radius:16px;background:rgba(10,8,30,.82);
    color:#fff;font:600 30px/1.35 Inter,sans-serif;text-align:center;opacity:0;transition:opacity .3s;pointer-events:none}
  #ov-sub.on{opacity:1}
  #ov-card{position:fixed;inset:0;z-index:100000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;
    background:radial-gradient(70% 70% at 30% 20%,#3b2a8a,#14122b 70%);color:#fff;font-family:Nunito,sans-serif;opacity:0;transition:opacity .6s;pointer-events:none;text-align:center}
  #ov-card.on{opacity:1}
  #ov-card .lg{font-family:'IBM Plex Mono',monospace;font-size:110px;font-weight:700;letter-spacing:-5px} #ov-card .lg span{color:#DD0000}
  #ov-card .t{font-size:52px;font-weight:800} #ov-card .s{font-size:30px;color:#c9c3ff;font-family:Inter,sans-serif}
  #ov-card .pills{display:flex;gap:14px;margin-top:20px} #ov-card .pills b{padding:10px 22px;border-radius:999px;background:rgba(255,255,255,.12);font-size:26px}
  #ov-cursor{position:fixed;left:0;top:0;width:26px;height:26px;margin:-4px 0 0 -4px;z-index:100001;pointer-events:none;transition:transform .45s cubic-bezier(.3,.8,.3,1)}
  #ov-cursor.click::after{content:'';position:absolute;left:-14px;top:-14px;width:54px;height:54px;border-radius:50%;border:4px solid #ffd23f;animation:ovp .45s ease-out}
  @keyframes ovp{from{transform:scale(.3);opacity:1}to{transform:scale(1.2);opacity:0}}`;
  const mount = () => {
    if (document.getElementById('ov-title')) return;
    const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    document.body.insertAdjacentHTML('beforeend', `<div id="ov-title"></div><div id="ov-sub"></div><div id="ov-card"></div>
      <svg id="ov-cursor" viewBox="0 0 24 24"><path d="M3 2l7 19 2.5-7.5L20 11z" fill="#fff" stroke="#14122b" stroke-width="1.6"/></svg>`);
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', mount) : mount();
  window.__ov = {
    title: (t) => { const e = document.getElementById('ov-title'); if (!t) { e.classList.remove('on'); return; } e.textContent = t; e.classList.add('on'); },
    sub: (t) => { const e = document.getElementById('ov-sub'); if (!t) { e.classList.remove('on'); return; } e.textContent = t; e.classList.add('on'); },
    card: (h) => { const e = document.getElementById('ov-card'); if (!h) { e.classList.remove('on'); return; } e.innerHTML = h; e.classList.add('on'); },
    move: (x, y, click) => { const c = document.getElementById('ov-cursor'); c.style.transform = `translate(${x}px,${y}px)`; if (click) { c.classList.remove('click'); void c.offsetWidth; c.classList.add('click'); } },
  };
});
const MARK = `<svg viewBox="320 190 440 540" width="150" height="184"><path d="M525 268 C 510 450, 440 600, 343 716 L 474 716 C 540 560, 555 420, 535 268 Z" fill="#111" stroke="rgba(255,255,255,.6)" stroke-width="6"/><path d="M535 268 C 555 420, 540 560, 474 716 L 605 716 C 625 600, 615 430, 545 268 Z" fill="#DD0000"/><path d="M545 268 C 615 430, 625 600, 605 716 L 736 716 C 720 560, 660 410, 553 268 Z" fill="#FFCE00"/><circle cx="540" cy="231" r="22" fill="#DD0000"/></svg>`;
const t0 = Date.now();
const page = await ctx.newPage();
page.on('dialog', (d) => d.accept().catch(() => {}));
page.on('pageerror', (e) => console.error('PAGE ERROR', e.message));
const narr = [];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ov = (fn, arg) => page.evaluate(([f, a]) => window.__ov[f](a), [fn, arg]);

/** Narrate a line (non-blocking). Returns a promise that resolves when the line has finished. */
function say(key) {
  narr.push({ t: Date.now(), file: nfile[key] });
  if (!CLEAN) ov('sub', LINES[key]);
  return sleep(dur[key] + 250).then(() => ov('sub', null));
}
async function cursorTo(loc) {
  const box = await loc.boundingBox();
  if (!box) return;
  await page.evaluate(([x, y]) => window.__ov.move(x, y, false), [box.x + box.width / 2, box.y + box.height / 2]);
  await sleep(480);
}
async function click(sel, opts = {}) {
  const loc = typeof sel === 'string' ? page.locator(sel).first() : sel;
  await loc.scrollIntoViewIfNeeded().catch(() => {});
  await cursorTo(loc);
  const box = await loc.boundingBox();
  if (box) await page.evaluate(([x, y]) => window.__ov.move(x, y, true), [box.x + box.width / 2, box.y + box.height / 2]);
  await loc.click(opts);
  await sleep(250);
}
async function typeInto(sel, text, delay = 55) { await click(sel); await page.locator(sel).first().pressSequentially(text, { delay }); }
async function nav(hash) { await page.evaluate((h) => { location.hash = h; scrollTo(0, 0); }, hash); await sleep(250); await page.evaluate(() => scrollTo(0, 0)); await sleep(500); }
async function scroll(y, steps = 12) { for (let i = 0; i < steps; i++) { await page.mouse.wheel(0, y / steps); await sleep(60); } }

/** Solve whatever exercise is on screen correctly (uses demo-only data attributes). */
async function solveExercise() {
  const ex = page.locator('.exercise');
  if (await ex.locator('.match').count()) {
    const n = await ex.locator('.match > div:first-child .tile').count();
    for (let k = 0; k < n; k++) { await click(`.match > div:first-child [data-pair="${k}"]`); await click(`.match > div:last-child [data-pair="${k}"]`); }
    await sleep(600); return;
  }
  if (await ex.locator('.option[data-ok]').count()) await click('.exercise .option[data-ok]');
  else if (await ex.locator('.word-bank').count()) {
    const n = await ex.locator('.gap-input').count();
    for (let k = 0; k < n; k++) await click(`.word-bank [data-ok="${k}"]`);
  } else if (await ex.locator('.gap-input').count()) {
    const n = await ex.locator('.gap-input').count();
    for (let k = 0; k < n; k++) await page.locator('.gap-input').nth(k).fill('');
  } else if (await ex.locator('.pool .tile').count()) {
    const n = await ex.locator('.pool .tile').count();
    for (let k = 0; k < n; k++) await click(`.pool [data-i="${k}"]`);
  } else if (await ex.locator('textarea[data-answer]').count()) {
    const a = await ex.locator('textarea[data-answer]').getAttribute('data-answer');
    await typeInto('.exercise textarea', a, 35);
  } else if (await ex.locator('text=Can\'t speak right now').count()) { await click('text=Can\'t speak right now'); await sleep(1200); return; }
  const check = page.locator('.ex-foot button:has-text("Check")');
  if (await check.count() && await check.isEnabled()) await click(check);
  await sleep(2600); // feedback + German sentence
}
async function nextExercise() { const c = page.locator('.ex-foot button:has-text("Continue")'); if (await c.count()) await click(c); await sleep(400); }

// =============== SCRIPT ===============
await page.goto(BASE); await sleep(1200);
// 1. Intro card
await ov('card', `${MARK}<div class="lg">Deutsch<span>Weg</span></div><div class="t">Learn German from A1 to C2</div><div class="s">Grammar · Vocabulary · Speaking · Writing · Exams</div>
  <div class="pills"><b>🎧 Real voices</b><b>🎭 Role-play</b><b>📝 5,000+ test questions</b><b>📊 Statistics</b></div>`);
await sleep(1000);
await say('intro');
await ov('card', null); await sleep(600);

// 2. Login
await ov('title', '🔐 Your own account');
const pLogin = say('login');
await typeInto('input[autocomplete=username]', 'demo_sara');
await typeInto('input[type=password]', 'demo-pass-123', 40);
await click('button:has-text("Anmelden →")');
await pLogin;

// 3. Home + path
await ov('title', '🗺️ Learning path A1 → C2');
const pPath = say('path');
await sleep(2500); await scroll(700, 20); await sleep(2500); await scroll(900, 20);
await pPath;
const pGoals = say('goals');
await scroll(-1600, 20); await sleep(800);
await cursorTo(page.locator('.hero-stats'));
await pGoals;

// 4. Alphabet
await nav('#/alphabet');
await ov('title', '🔤 Start with the alphabet');
await say('alpha');
await click('.letter:has-text("Jj")'); await sleep(2600);
await click('.letter:has-text("Zz")'); await sleep(2600);
await click('.letter:has-text("Üü")'); await sleep(2400);

// 5. Story dialog
await nav('#/lesson/st-1');
await ov('title', '🎬 Story dialogs with real voices');
await say('story');
await click('button:has-text("Play dialog")');
await sleep(10500);
await click('button:has-text("Stop")');
await ov('title', '🗣 Pronunciation help');
const pPron = say('pron');
await sleep(1500); await click(page.locator('.pron-tip-btn').first());
await pPron;
await ov('title', '🎭 Role-play');
const pRole = say('role');
for (const n of ['Herr Bauer', 'Lena', 'Karim']) await cursorTo(page.locator(`.chip-btn:has-text("${n}")`).first());
await pRole;

// 6. Exercises (beginner unit)
await nav('#/lesson/a1-5');
await ov('title', '✅ Interactive exercises');
await click('button:has-text("Start practice")');
const pEx = say('ex');
await solveExercise(); await nextExercise();
await solveExercise(); await nextExercise();
await pEx;
const pCheck = say('check');
await solveExercise(); await nextExercise();
await solveExercise();
await pCheck;

// 7. Drills
await nav('#/drill/articles');
await ov('title', '🎯 Endless drills');
const pDr = say('drills');
for (let i = 0; i < 3; i++) { await click('.drill-box .option[data-ok]'); await sleep(1300); await click('button:has-text("Next")'); }
await nav('#/drill/verbs');
const ans = await page.locator('.drill-box input[data-answer]').getAttribute('data-answer');
await typeInto('.drill-box input.answer', ans, 70); await click('.drill-box button:has-text("Check")'); await sleep(1500);
await pDr;

// 8. Speaking
await nav('#/speak/shadow');
await ov('title', '🎙️ Speaking lab');
const pSp = say('speak');
await click(page.locator('.listen-row.center .speak-btn').first()); await sleep(3000);
await click('.tabs button:has-text("Exam tasks")'); await sleep(1200);
await click(page.locator('.task-card').nth(1)); await sleep(1500);
await pSp;

// 9. Writing
await nav('#/write/w-b2-1');
await ov('title', '✍️ Writing lab');
const pWr = say('write');
for (const k of [0, 1, 2]) { await click(page.locator('.phrase').nth(k)); await sleep(700); }
await page.locator('.editor').pressSequentially(' Homeoffice spart viel Zeit, weil man nicht pendeln muss.', { delay: 45 });
await pWr;

// 10. Tests
await nav('#/tests');
await ov('title', '📝 Test Center · 5,000+ questions');
const pTe = say('tests');
await sleep(1500);
await click('.lvl-pill:has-text("A2")'); await sleep(500);
await click('.bank .seg button:has-text("10")'); await sleep(400);
await click('button:has-text("Start test")'); await sleep(1800);
for (let i = 0; i < 3; i++) { await sleep(1600); await click('.question-card .option[data-ok]'); await sleep(500); await click('button:has-text("Weiter")'); }
await pTe;

// 11. Statistics
await nav('#/stats');
await ov('title', '📊 Your learning time & statistics');
const pSt = say('stats');
await sleep(3000); await scroll(800, 25); await sleep(2500);
await pSt;

// 12. Admin
await ov('title', '🛡️ Teacher dashboard');
await nav('#/me'); await sleep(500);
await click('button:has-text("Abmelden")'); await sleep(1200);
await typeInto('input[autocomplete=username]', 'admin', 40);
await page.locator('input[type=password]').fill(ADMIN_PW);
await click('button:has-text("Anmelden →")'); await sleep(1200);
if (await page.locator("text=I'm a beginner").count()) await click("text=I'm a beginner");
await nav('#/admin');
const pAd = say('admin');
await sleep(2500);
await click(page.locator('.admin-table tbody tr', { hasText: 'Léa' }).first()); await sleep(1500); await scroll(600, 20);
await pAd;

// 13. Outro
await ov('title', null);
await ov('card', `${MARK}<div class="lg">Deutsch<span>Weg</span></div><div class="t">Viel Spaß beim Deutschlernen! 🇩🇪</div>
  <div class="pills"><b>👍 Like</b><b>🔔 Subscribe</b><b>💬 Comment</b></div>`);
await sleep(700);
await say('outro');
await sleep(1500);

// ---------- collect & save ----------
const clips = await page.evaluate(() => window.__speechLog || []);
const tEnd = Date.now();
await ctx.close(); await browser.close();
const raw = readdirSync(join(OUT, 'raw')).find((f) => f.endsWith('.webm'));
renameSync(join(OUT, 'raw', raw), join(OUT, 'screen.webm'));
writeFileSync(join(OUT, 'timeline.json'), JSON.stringify({ t0, tEnd, narr, clips }, null, 1));
console.log(`recorded ${(tEnd - t0) / 1000}s · ${narr.length} narration lines · ${clips.length} app clips`);

// ---------- mix audio ----------
const fileFor = (url) => url.startsWith('/api/tts/') ? join(ROOT, 'server', 'tts-cache', url.slice(9)) : join(ROOT, 'public', url.replace(/^\//, ''));
const tracks = [
  ...narr.map((n) => ({ file: n.file, t: n.t - t0, vol: 1.0 })),
  ...clips.map((c) => ({ file: fileFor(c.url), t: c.t - t0, vol: 0.85 })).filter((c) => existsSync(c.file)),
];
const args = ['-y'];
tracks.forEach((tr) => args.push('-i', tr.file));
const filters = tracks.map((tr, i) => `[${i}:a]aresample=48000,aformat=channel_layouts=stereo,volume=${tr.vol},adelay=${Math.max(0, Math.round(tr.t))}|${Math.max(0, Math.round(tr.t))}[a${i}]`);
filters.push(`${tracks.map((_, i) => `[a${i}]`).join('')}amix=inputs=${tracks.length}:normalize=0:dropout_transition=0,loudnorm=I=-14:TP=-1.5:LRA=11[mix]`);
writeFileSync(join(OUT, 'filter.txt'), filters.join(';\n'));
execFileSync('ffmpeg', [...args, '-filter_complex_script', join(OUT, 'filter.txt'), '-map', '[mix]', '-t', String((tEnd - t0) / 1000), join(OUT, 'audio.wav')], { stdio: 'ignore' });
execFileSync('ffmpeg', ['-y', '-i', join(OUT, 'screen.webm'), '-i', join(OUT, 'audio.wav'), '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', '30',
  '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', '-shortest', join(ROOT, 'video', CLEAN ? 'build-clean/clean.mp4' : 'DeutschWeg-promo.mp4')], { stdio: 'ignore' });
console.log('done →', CLEAN ? 'video/build-clean/clean.mp4' : 'video/DeutschWeg-promo.mp4');
