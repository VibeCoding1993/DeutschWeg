// Create (or reset) an admin account:  node server/create-admin.mjs <username> <password> [display name]
import { DatabaseSync } from 'node:sqlite';
import { randomBytes, scryptSync } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DB_PATH = process.env.DB_PATH || join(ROOT, 'server', 'data.db');
const [username, password, ...name] = process.argv.slice(2);
if (!username || !password || password.length < 6) {
  console.error('Usage: node server/create-admin.mjs <username> <password (min 6)> [display name]');
  process.exit(1);
}
if (!existsSync(DB_PATH)) { console.error('Start the server once first (npm run server) so the database exists.'); process.exit(1); }
const db = new DatabaseSync(DB_PATH);
const salt = randomBytes(16).toString('hex');
const h = `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;
const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
if (existing) db.prepare("UPDATE users SET pass_hash = ?, role = 'admin' WHERE id = ?").run(h, existing.id);
else db.prepare("INSERT INTO users (username, display_name, pass_hash, role) VALUES (?, ?, ?, 'admin')").run(username, name.join(' ') || username, h);
console.log(`Admin "${username}" ${existing ? 'updated' : 'created'}.`);
