// DeutschWeg API + static server.
// Database: Postgres when DATABASE_URL is set (production, e.g. Supabase), otherwise a local SQLite file.
// Run: node server/index.mjs   (PORT=8787, DB_PATH=server/data.db, DATABASE_URL=postgres://…)
import { createServer } from 'node:http';
import { randomBytes, scryptSync, timingSafeEqual, createHash } from 'node:crypto';
import { readFileSync, existsSync, statSync, mkdirSync, createReadStream } from 'node:fs';
import { execFile } from 'node:child_process';
import { join, extname, dirname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const PORT = Number(process.env.PORT || 8787);
const DIST = join(ROOT, 'dist');
const PG = !!process.env.DATABASE_URL;

// ---------- database adapter (async API for both engines) ----------
let q; // (sql, params) => rows   — write SQL with "?" placeholders
if (PG) {
  const { default: pg } = await import('pg');
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.PGSSL === 'off' ? false : { rejectUnauthorized: false }, max: 5 });
  const toPg = (sql) => { let i = 0; return sql.replace(/\?/g, () => `$${++i}`); };
  q = async (sql, p = []) => (await pool.query(toPg(sql), p)).rows;
  await q(`CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username TEXT NOT NULL, display_name TEXT NOT NULL, pass_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'student', created_at TEXT NOT NULL, last_seen TEXT)`);
  await q('CREATE UNIQUE INDEX IF NOT EXISTS users_username_lower ON users (lower(username))');
  await q('CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, expires_at BIGINT NOT NULL)');
  await q(`CREATE TABLE IF NOT EXISTS progress (user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, state TEXT NOT NULL,
    xp INTEGER NOT NULL DEFAULT 0, streak INTEGER NOT NULL DEFAULT 0, units_done INTEGER NOT NULL DEFAULT 0, words INTEGER NOT NULL DEFAULT 0,
    minutes_total INTEGER NOT NULL DEFAULT 0, minutes_7d INTEGER NOT NULL DEFAULT 0, minutes_today INTEGER NOT NULL DEFAULT 0, updated_at TEXT NOT NULL)`);
  await q(`CREATE TABLE IF NOT EXISTS results (id SERIAL PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, test_id TEXT NOT NULL,
    title TEXT NOT NULL, score INTEGER NOT NULL, total INTEGER NOT NULL, detail TEXT, created_at TEXT NOT NULL)`);
  await q('CREATE INDEX IF NOT EXISTS results_user ON results (user_id)');
} else {
  const { DatabaseSync } = await import('node:sqlite');
  const DB_PATH = process.env.DB_PATH || join(ROOT, 'server', 'data.db');
  mkdirSync(dirname(DB_PATH), { recursive: true });
  const db = new DatabaseSync(DB_PATH);
  db.exec(`PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL COLLATE NOCASE, display_name TEXT NOT NULL,
      pass_hash TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'student', created_at TEXT NOT NULL DEFAULT (datetime('now')), last_seen TEXT);
    CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, expires_at INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS progress (user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, state TEXT NOT NULL, xp INTEGER NOT NULL DEFAULT 0,
      streak INTEGER NOT NULL DEFAULT 0, units_done INTEGER NOT NULL DEFAULT 0, words INTEGER NOT NULL DEFAULT 0, updated_at TEXT NOT NULL DEFAULT (datetime('now')));
    CREATE TABLE IF NOT EXISTS results (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, test_id TEXT NOT NULL,
      title TEXT NOT NULL, score INTEGER NOT NULL, total INTEGER NOT NULL, detail TEXT, created_at TEXT NOT NULL DEFAULT (datetime('now')));
    PRAGMA foreign_keys = ON;`);
  for (const col of ['minutes_total INTEGER NOT NULL DEFAULT 0', 'minutes_7d INTEGER NOT NULL DEFAULT 0', 'minutes_today INTEGER NOT NULL DEFAULT 0']) {
    try { db.exec(`ALTER TABLE progress ADD COLUMN ${col}`); } catch { /* already there */ }
  }
  q = async (sql, p = []) => {
    const st = db.prepare(sql);
    if (/^\s*(select|with)\b/i.test(sql) || /\breturning\b/i.test(sql)) return st.all(...p);
    st.run(...p); return [];
  };
}
const one = async (sql, p) => (await q(sql, p))[0];
const NOW = () => new Date().toISOString().replace('T', ' ').slice(0, 19);
const num = (v) => (v === null || v === undefined ? null : Number(v));
console.log(`database: ${PG ? 'Postgres' : 'SQLite'}`);

// ---------- on-demand neural TTS (edge-tts) for text without a pre-recorded clip ----------
const TTS_BIN = process.env.TTS_BIN || join(ROOT, '.venv', 'bin', 'edge-tts');
const TTS_DIR = process.env.TTS_DIR || join(ROOT, 'server', 'tts-cache');
mkdirSync(TTS_DIR, { recursive: true });
const VOICE_OK = /^de-(DE|AT|CH)-[A-Za-z]+Neural\|[+-]\d{1,2}Hz\|[+-]\d{1,2}%$/;
let ttsRunning = 0;
const ttsQueue = [];
function runTts(voiceSpec, text, file) {
  return new Promise((resolve, reject) => {
    const go = () => {
      ttsRunning++;
      const [voice, pitch, rate] = voiceSpec.split('|');
      execFile(TTS_BIN, ['--voice', voice, `--pitch=${pitch}`, `--rate=${rate}`, '--text', text, '--write-media', file], { timeout: 30000 }, (err) => {
        ttsRunning--; ttsQueue.shift()?.();
        err ? reject(err) : resolve();
      });
    };
    ttsRunning < 3 ? go() : ttsQueue.push(go);
  });
}

// ---------- helpers ----------
const hash = (pw) => { const salt = randomBytes(16).toString('hex'); return `${salt}:${scryptSync(pw, salt, 64).toString('hex')}`; };
const verify = (pw, stored) => {
  const [salt, h] = stored.split(':');
  const a = Buffer.from(h, 'hex'), b = scryptSync(pw, salt, 64);
  return a.length === b.length && timingSafeEqual(a, b);
};
const SESSION_DAYS = 30;
async function newSession(userId) {
  const token = randomBytes(32).toString('hex');
  await q('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)', [token, userId, Date.now() + SESSION_DAYS * 864e5]);
  return token;
}
const findUser = (username) => one('SELECT * FROM users WHERE lower(username) = lower(?)', [username]);
const publicUser = (u) => ({ id: num(u.id), username: u.username, displayName: u.display_name, role: u.role, createdAt: u.created_at, lastSeen: u.last_seen });

function send(res, status, data, headers = {}) {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers });
  res.end(JSON.stringify(data));
}
async function body(req) {
  let raw = '';
  for await (const chunk of req) { raw += chunk; if (raw.length > 2_000_000) throw new Error('too large'); }
  return raw ? JSON.parse(raw) : {};
}
async function auth(req) {
  const m = (req.headers.authorization || '').match(/^Bearer (\w+)$/);
  if (!m) return null;
  const row = await one('SELECT u.*, s.expires_at FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token = ?', [m[1]]);
  if (!row || Number(row.expires_at) < Date.now()) return null;
  row.id = num(row.id);
  await q('UPDATE users SET last_seen = ? WHERE id = ?', [NOW(), row.id]);
  return row;
}
const validName = (s) => typeof s === 'string' && /^[a-zA-Z0-9_.-]{3,30}$/.test(s);
const validPw = (s) => typeof s === 'string' && s.length >= 6 && s.length <= 200;
async function createUser(username, displayName, password, role = 'student') {
  const r = await one('INSERT INTO users (username, display_name, pass_hash, role, created_at) VALUES (?, ?, ?, ?, ?) RETURNING *', [username, String(displayName || username).slice(0, 60), hash(password), role, NOW()]);
  return r;
}

// Bootstrap an admin account from env (used online, where the CLI script can't reach the DB easily).
if (process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD) {
  const existing = await findUser(process.env.ADMIN_USERNAME);
  if (!existing) { await createUser(process.env.ADMIN_USERNAME, 'Administrator', process.env.ADMIN_PASSWORD, 'admin'); console.log(`admin "${process.env.ADMIN_USERNAME}" created`); }
  else if (existing.role !== 'admin') await q("UPDATE users SET role = 'admin' WHERE id = ?", [existing.id]);
}

// simple per-IP throttle for login/register
const attempts = new Map();
function throttled(ip) {
  const now = Date.now(), list = (attempts.get(ip) || []).filter((t) => now - t < 60_000);
  list.push(now); attempts.set(ip, list);
  return list.length > 20;
}
const clientIp = (req) => String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();

// ---------- routes ----------
async function api(req, res, path) {
  const method = req.method;
  const ip = clientIp(req);

  if (path === '/api/health') return send(res, 200, { ok: true, db: PG ? 'postgres' : 'sqlite' });

  if (path === '/api/register' && method === 'POST') {
    if (throttled(ip)) return send(res, 429, { error: 'Too many attempts. Wait a minute.' });
    const { username, password, displayName } = await body(req);
    if (!validName(username)) return send(res, 400, { error: 'Username: 3–30 letters, digits, _ . -' });
    if (!validPw(password)) return send(res, 400, { error: 'Password must have at least 6 characters.' });
    if (await findUser(username)) return send(res, 409, { error: 'This username is taken.' });
    const user = await createUser(username, displayName, password);
    return send(res, 201, { token: await newSession(num(user.id)), user: publicUser(user) });
  }

  if (path === '/api/login' && method === 'POST') {
    if (throttled(ip)) return send(res, 429, { error: 'Too many attempts. Wait a minute.' });
    const { username, password } = await body(req);
    const user = typeof username === 'string' ? await findUser(username) : null;
    if (!user || typeof password !== 'string' || !verify(password, user.pass_hash)) return send(res, 401, { error: 'Wrong username or password.' });
    await q('UPDATE users SET last_seen = ? WHERE id = ?', [NOW(), user.id]);
    const p = await one('SELECT state FROM progress WHERE user_id = ?', [user.id]);
    return send(res, 200, { token: await newSession(num(user.id)), user: publicUser(user), state: p ? JSON.parse(p.state) : null });
  }

  const tm = path.match(/^\/api\/tts\/([0-9a-f]{16}\.mp3)$/);
  if (tm && method === 'GET') {
    const f = join(TTS_DIR, tm[1]);
    if (!existsSync(f)) return send(res, 404, { error: 'Not found' });
    res.writeHead(200, { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'public, max-age=31536000' });
    return res.end(readFileSync(f));
  }

  const me = await auth(req);
  if (!me) return send(res, 401, { error: 'Please log in.' });

  if (path === '/api/logout' && method === 'POST') {
    await q('DELETE FROM sessions WHERE token = ?', [req.headers.authorization.slice(7)]);
    return send(res, 200, { ok: true });
  }
  if (path === '/api/me' && method === 'GET') {
    const p = await one('SELECT state FROM progress WHERE user_id = ?', [me.id]);
    return send(res, 200, { user: publicUser(me), state: p ? JSON.parse(p.state) : null });
  }
  if (path === '/api/password' && method === 'POST') {
    const { oldPassword, newPassword } = await body(req);
    if (!verify(String(oldPassword || ''), me.pass_hash)) return send(res, 400, { error: 'Current password is wrong.' });
    if (!validPw(newPassword)) return send(res, 400, { error: 'New password must have at least 6 characters.' });
    await q('UPDATE users SET pass_hash = ? WHERE id = ?', [hash(newPassword), me.id]);
    return send(res, 200, { ok: true });
  }
  if (path === '/api/progress' && method === 'PUT') {
    const { state } = await body(req);
    if (!state || typeof state !== 'object') return send(res, 400, { error: 'Missing state' });
    const units = Object.values(state.units || {}).filter((u) => u && u.done).length;
    const time = state.time && typeof state.time === 'object' ? state.time : {};
    const day = (d) => d.toISOString().slice(0, 10);
    const last7 = new Set(Array.from({ length: 7 }, (_, i) => day(new Date(Date.now() - i * 864e5))));
    const secs = Object.entries(time).filter(([, v]) => Number.isFinite(v));
    const mTotal = Math.round(secs.reduce((a, [, v]) => a + v, 0) / 60);
    const m7 = Math.round(secs.filter(([k]) => last7.has(k)).reduce((a, [, v]) => a + v, 0) / 60);
    const mToday = Math.round((Number(time[day(new Date())]) || 0) / 60);
    await q(`INSERT INTO progress (user_id, state, xp, streak, units_done, words, minutes_total, minutes_7d, minutes_today, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT (user_id) DO UPDATE SET state = excluded.state, xp = excluded.xp, streak = excluded.streak, units_done = excluded.units_done, words = excluded.words,
        minutes_total = excluded.minutes_total, minutes_7d = excluded.minutes_7d, minutes_today = excluded.minutes_today, updated_at = excluded.updated_at`,
    [me.id, JSON.stringify(state), Math.round(Number(state.xp) || 0), Math.round(Number(state.streak) || 0), units, Object.keys(state.srs || {}).length, mTotal, m7, mToday, NOW()]);
    return send(res, 200, { ok: true });
  }
  if (path === '/api/tts' && method === 'POST') {
    const { text, voice } = await body(req);
    const t = String(text || '').replace(/\s+/g, ' ').trim().slice(0, 2500);
    const v = VOICE_OK.test(String(voice)) ? String(voice) : 'de-DE-TanjaNeural|+0Hz|+0%';
    if (!t) return send(res, 400, { error: 'No text' });
    const name = createHash('sha1').update(`${v}#${t}`).digest('hex').slice(0, 16) + '.mp3';
    const file = join(TTS_DIR, name);
    if (!existsSync(file) || statSync(file).size === 0) {
      if (!existsSync(TTS_BIN)) return send(res, 503, { error: 'TTS not installed' });
      try { await runTts(v, t, file); } catch { return send(res, 502, { error: 'TTS failed' }); }
    }
    return send(res, 200, { url: `/api/tts/${name}` });
  }
  if (path === '/api/results' && method === 'POST') {
    const { testId, title, score, total, detail } = await body(req);
    if (typeof testId !== 'string' || !Number.isFinite(score) || !Number.isFinite(total)) return send(res, 400, { error: 'Bad result' });
    await q('INSERT INTO results (user_id, test_id, title, score, total, detail, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [me.id, testId.slice(0, 60), String(title || testId).slice(0, 120), Math.round(score), Math.round(total), detail ? JSON.stringify(detail).slice(0, 20000) : null, NOW()]);
    return send(res, 201, { ok: true });
  }
  if (path === '/api/results' && method === 'GET') {
    return send(res, 200, (await q('SELECT test_id, title, score, total, created_at FROM results WHERE user_id = ? ORDER BY id DESC LIMIT 200', [me.id]))
      .map((r) => ({ ...r, score: num(r.score), total: num(r.total) })));
  }
  if (path === '/api/leaderboard' && method === 'GET') {
    return send(res, 200, (await q(`SELECT u.display_name AS name, p.xp, p.streak, p.units_done FROM progress p JOIN users u ON u.id = p.user_id
      WHERE u.role = 'student' ORDER BY p.xp DESC LIMIT 20`)).map((r) => ({ ...r, xp: num(r.xp), streak: num(r.streak), units_done: num(r.units_done) })));
  }

  // ---------- admin ----------
  if (path.startsWith('/api/admin/')) {
    if (me.role !== 'admin') return send(res, 403, { error: 'Admins only.' });
    if (path === '/api/admin/users' && method === 'GET') {
      const rows = await q(`SELECT u.*, p.xp, p.streak, p.units_done, p.words, p.updated_at, p.minutes_total, p.minutes_7d, p.minutes_today,
          (SELECT COUNT(*) FROM results r WHERE r.user_id = u.id) AS tests,
          (SELECT ROUND(AVG(100.0 * r.score / r.total)) FROM results r WHERE r.user_id = u.id) AS avg_score,
          (SELECT MAX(100.0 * r.score / r.total) FROM results r WHERE r.user_id = u.id) AS best_score
        FROM users u LEFT JOIN progress p ON p.user_id = u.id ORDER BY u.created_at DESC`);
      return send(res, 200, rows.map((r) => ({ ...publicUser(r), xp: num(r.xp) || 0, streak: num(r.streak) || 0, unitsDone: num(r.units_done) || 0, words: num(r.words) || 0,
        progressAt: r.updated_at, minutesTotal: num(r.minutes_total) || 0, minutes7d: num(r.minutes_7d) || 0, minutesToday: num(r.minutes_today) || 0,
        tests: num(r.tests) || 0, avgScore: num(r.avg_score), bestScore: num(r.best_score) })));
    }
    if (path === '/api/admin/users' && method === 'POST') {
      const { username, password, displayName, role } = await body(req);
      if (!validName(username) || !validPw(password)) return send(res, 400, { error: 'Invalid username or password (min. 6 chars).' });
      if (await findUser(username)) return send(res, 409, { error: 'Username taken.' });
      await createUser(username, displayName, password, role === 'admin' ? 'admin' : 'student');
      return send(res, 201, { ok: true });
    }
    const m = path.match(/^\/api\/admin\/users\/(\d+)(\/results|\/password|\/role)?$/);
    if (m) {
      const id = Number(m[1]);
      const target = await one('SELECT * FROM users WHERE id = ?', [id]);
      if (!target) return send(res, 404, { error: 'No such user' });
      if (m[2] === '/results' && method === 'GET')
        return send(res, 200, (await q('SELECT id, test_id, title, score, total, detail, created_at FROM results WHERE user_id = ? ORDER BY id DESC', [id]))
          .map((r) => ({ ...r, id: num(r.id), score: num(r.score), total: num(r.total), detail: r.detail ? JSON.parse(r.detail) : null })));
      if (m[2] === '/password' && method === 'POST') {
        const { password } = await body(req);
        if (!validPw(password)) return send(res, 400, { error: 'Min. 6 characters.' });
        await q('UPDATE users SET pass_hash = ? WHERE id = ?', [hash(password), id]);
        await q('DELETE FROM sessions WHERE user_id = ?', [id]);
        return send(res, 200, { ok: true });
      }
      if (m[2] === '/role' && method === 'POST') {
        const { role } = await body(req);
        if (id === me.id) return send(res, 400, { error: 'You cannot change your own role.' });
        await q('UPDATE users SET role = ? WHERE id = ?', [role === 'admin' ? 'admin' : 'student', id]);
        return send(res, 200, { ok: true });
      }
      if (!m[2] && method === 'DELETE') {
        if (id === me.id) return send(res, 400, { error: 'You cannot delete yourself.' });
        await q('DELETE FROM sessions WHERE user_id = ?', [id]);
        await q('DELETE FROM progress WHERE user_id = ?', [id]);
        await q('DELETE FROM results WHERE user_id = ?', [id]);
        await q('DELETE FROM users WHERE id = ?', [id]);
        return send(res, 200, { ok: true });
      }
    }
  }
  return send(res, 404, { error: 'Not found' });
}

// ---------- static files (production), with HTTP range support for video ----------
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.mp3': 'audio/mpeg', '.mp4': 'video/mp4', '.vtt': 'text/vtt; charset=utf-8', '.json': 'application/json', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.txt': 'text/plain' };
function serveStatic(req, res, path) {
  if (!existsSync(DIST)) { res.writeHead(404); return res.end('Run "npm run build" first (or use "npm run dev").'); }
  let file = normalize(join(DIST, decodeURIComponent(path)));
  if (!file.startsWith(DIST)) { res.writeHead(403); return res.end(); }
  if (!existsSync(file) || statSync(file).isDirectory()) file = join(DIST, 'index.html');
  const ext = extname(file);
  const size = statSync(file).size;
  const headers = { 'Content-Type': TYPES[ext] || 'application/octet-stream', 'Accept-Ranges': 'bytes',
    'Cache-Control': ext === '.html' ? 'no-cache' : path.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'public, max-age=604800' };
  const range = req.headers.range && /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
  if (range) {
    const start = range[1] ? Number(range[1]) : size - Number(range[2]);
    const end = range[1] && range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
    if (start >= size || start > end) { res.writeHead(416, { 'Content-Range': `bytes */${size}` }); return res.end(); }
    res.writeHead(206, { ...headers, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': end - start + 1 });
    return createReadStream(file, { start, end }).pipe(res);
  }
  res.writeHead(200, { ...headers, 'Content-Length': size });
  if (req.method === 'HEAD') return res.end();
  createReadStream(file).pipe(res);
}

createServer(async (req, res) => {
  const path = new URL(req.url, 'http://x').pathname;
  try {
    if (path.startsWith('/api/')) return await api(req, res, path);
    serveStatic(req, res, path);
  } catch (e) {
    console.error(e);
    if (!res.headersSent) send(res, 500, { error: 'Server error' });
  }
}).listen(PORT, () => console.log(`DeutschWeg server on http://localhost:${PORT}`));
