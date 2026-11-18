// Builds YouTube extras from video/build/timeline.json: captions (.srt), chapters, thumbnail.
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { chromium } from 'playwright-core';
const tl = JSON.parse(readFileSync('video/build/timeline.json', 'utf8'));
const src = readFileSync('video/record.mjs', 'utf8');
const LINES = Object.fromEntries([...src.matchAll(/^\s{2}(\w+): ['"](.+)['"],$/gm)].map((m) => [m[1], m[2].replace(/\\'/g, "'")]));
const order = Object.keys(LINES);
const dur = (f) => Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString());
const ts = (s, sep = ',') => { const ms = Math.round(s * 1000); const h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, sec = Math.floor(ms / 1000) % 60; return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}${sep}${String(ms % 1000).padStart(3, '0')}`; };
let srt = '';
tl.narr.forEach((n, i) => {
  const start = (n.t - tl.t0) / 1000, end = start + dur(n.file);
  const text = LINES[order[i]];
  // split long lines into two caption blocks
  const words = text.split(' '), half = Math.ceil(words.length / 2);
  const parts = words.length > 18 ? [words.slice(0, half).join(' '), words.slice(half).join(' ')] : [text];
  parts.forEach((p, k) => {
    const a = start + ((end - start) * k) / parts.length, b = start + ((end - start) * (k + 1)) / parts.length;
    srt += `${srt.split('\n\n').length}\n${ts(a)} --> ${ts(b)}\n${p}\n\n`;
  });
});
writeFileSync('video/DeutschWeg-promo.en.srt', srt.trim() + '\n');
const chapterKeys = [['intro', 'Intro'], ['login', 'Student account'], ['path', 'Learning path A1–C2'], ['alpha', 'Alphabet for beginners'], ['story', 'Story dialogs with real voices'], ['pron', 'Pronunciation help & role-play'],
  ['ex', 'Interactive exercises'], ['drills', 'Drills'], ['speak', 'Speaking lab'], ['write', 'Writing lab'], ['tests', 'Test Center (5,000+ questions)'], ['stats', 'Learning time & statistics'], ['admin', 'Teacher dashboard'], ['outro', 'Outro']];
const chapters = chapterKeys.map(([k, name]) => { const i = order.indexOf(k); const t = k === 'intro' ? 0 : (tl.narr[i].t - tl.t0) / 1000; const m = Math.floor(t / 60), s = Math.floor(t % 60); return `${m}:${String(s).padStart(2, '0')} ${name}`; });
const desc = `🇩🇪 DeutschWeg — learn German from A1 to C2, step by step and with fun.

In this video I show the complete platform:
✅ A learning path from A1 to C2 (37 units: grammar, vocabulary, exercises)
🔤 Alphabet & pronunciation for total beginners
🎬 Story dialogs with natural German voices + role-play with your microphone
🗣 Pronunciation guide under every sentence
🎯 Endless drills: der/die/das, verbs, adjective endings, numbers
🎙️ Speaking lab & ✍️ writing lab in real exam formats (with optional AI feedback)
📝 Test Center with 5,000+ questions (A1–C2) + placement test
📊 Daily learning time & statistics
🛡️ Admin dashboard for teachers

⏱ Chapters
${chapters.join('\n')}

#LearnGerman #Deutschlernen #GermanA1 #GoetheB2 #DeutschWeg`;
writeFileSync('video/youtube.txt', `TITLE\nLearn German from A1 to C2 — Full Tour of DeutschWeg (Dialogs, Tests, Speaking & More)\n\nDESCRIPTION\n${desc}\n\nTAGS\nlearn german, deutsch lernen, german for beginners, A1 german, B2 german, goethe exam, german app, german pronunciation, german grammar\n`);

// thumbnail 1280x720 rendered from HTML (uses a real app screenshot as background)
execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', String((tl.narr[order.indexOf('story')].t - tl.t0) / 1000 + dur(tl.narr[order.indexOf('story')].file) + 3.5), '-i', 'video/DeutschWeg-promo.mp4', '-frames:v', '1', 'video/build/thumb-bg.png']);
const b = await chromium.launch({ executablePath: process.env.HOME + '/.cache/ms-playwright/chromium-1187/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
const bg = readFileSync('video/build/thumb-bg.png').toString('base64');
await p.setContent(`<html><head><link href="https://fonts.googleapis.com/css2?family=Nunito:wght@900&display=swap" rel="stylesheet"></head>
<body style="margin:0;width:1280px;height:720px;overflow:hidden;font-family:Nunito,sans-serif;background:#14122b">
<img src="data:image/png;base64,${bg}" style="position:absolute;right:-180px;top:40px;width:1000px;border-radius:28px;transform:rotate(-4deg);box-shadow:0 30px 80px rgba(0,0,0,.6)"/>
<div style="position:absolute;inset:0;background:linear-gradient(90deg,#14122b 38%,rgba(20,18,43,.2) 75%)"></div>
<div style="position:absolute;left:60px;top:70px;color:#fff">
 <div style="font-size:42px;color:#ffd23f">🇩🇪 DeutschWeg</div>
 <div style="font-size:118px;line-height:.95;letter-spacing:-3px;margin-top:14px">LEARN<br/>GERMAN</div>
 <div style="font-size:64px;margin-top:18px;background:linear-gradient(90deg,#ffd23f,#ff7a59);-webkit-background-clip:text;color:transparent">A1 → C2</div>
 <div style="display:flex;gap:12px;margin-top:30px;font-size:28px">
  <span style="background:#7c5cff;padding:10px 20px;border-radius:999px">🎧 Real voices</span><span style="background:#ff5d73;padding:10px 20px;border-radius:999px">📝 5000+ tests</span></div>
</div></body></html>`);
await p.waitForTimeout(1500);
await p.screenshot({ path: 'video/DeutschWeg-thumbnail.png' });
await b.close();
console.log(chapters.join('\n'));
