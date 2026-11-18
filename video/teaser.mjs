// Cuts a ~45 s muted landing-page teaser from video/build-clean (recorded with CLEAN=1).
import { readFileSync, copyFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const tl = JSON.parse(readFileSync('video/build-clean/timeline.json', 'utf8'));
const src = readFileSync('video/record.mjs', 'utf8');
const keys = [...src.matchAll(/^\s{2}(\w+): ['"](.+)['"],$/gm)].map((m) => m[1]);
const dur = (f) => Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString());
const at = (k) => (tl.narr[keys.indexOf(k)].t - tl.t0) / 1000;
const end = (k) => at(k) + dur(tl.narr[keys.indexOf(k)].file);
// [start, length] in seconds of the clean recording
const segs = [
  [at('intro') + 0.4, 3.6],   // intro card with logo
  [at('path') + 1.2, 5],      // learning path
  [end('alpha') + 0.2, 5],    // alphabet letters
  [end('story') + 0.8, 6.5],  // dialog playing
  [at('pron') + 1.6, 4],      // pronunciation tips
  [at('ex') + 1.5, 6],        // exercises
  [at('drills') + 0.5, 4],    // drills
  [at('tests') + 4.5, 6],     // test center + listening question
  [at('stats') + 0.5, 4.5],   // statistics
  [at('admin') + 1.5, 4.5],   // teacher dashboard
  [at('outro') + 0.2, Math.min(4, dur(tl.narr[keys.indexOf('outro')].file))], // outro card
];
const X = 0.45; // crossfade
const inputs = segs.flatMap(([s, l]) => ['-ss', s.toFixed(2), '-t', l.toFixed(2), '-i', 'video/build-clean/clean.mp4']);
let f = segs.map((_, i) => `[${i}:v]scale=1280:720:flags=lanczos,fps=30,format=yuv420p,setpts=PTS-STARTPTS[v${i}]`).join(';');
let prev = 'v0', offset = segs[0][1] - X;
for (let i = 1; i < segs.length; i++) {
  const out = i === segs.length - 1 ? 'vout' : `x${i}`;
  f += `;[${prev}][v${i}]xfade=transition=fade:duration=${X}:offset=${offset.toFixed(2)}[${out}]`;
  prev = out; offset += segs[i][1] - X;
}
writeFileSync('video/build-clean/teaser-filter.txt', f);
execFileSync('ffmpeg', ['-v', 'error', '-y', ...inputs, '-filter_complex_script', 'video/build-clean/teaser-filter.txt', '-map', '[vout]', '-an', '-pix_fmt', 'yuv420p',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '28', '-profile:v', 'high', '-movflags', '+faststart', 'public/media/teaser.mp4']);
execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', (segs[3][0] + 2).toFixed(2), '-i', 'video/build-clean/clean.mp4', '-frames:v', '1', '-vf', 'scale=1280:720', '-q:v', '4', 'public/media/teaser.jpg']);
console.log('teaser', dur('public/media/teaser.mp4').toFixed(1) + 's');
