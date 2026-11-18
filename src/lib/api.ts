import { useSyncExternalStore } from 'react';
import { getState, replaceState, subscribe, toast, type State } from './store';

export interface User { id: number; username: string; displayName: string; role: 'admin' | 'student'; createdAt?: string; lastSeen?: string }

const TOKEN = 'deutschweg.token';
const USER = 'deutschweg.user';
let user: User | null = (() => { try { return JSON.parse(localStorage.getItem(USER) || 'null'); } catch { return null; } })();
let token: string | null = (() => { try { return localStorage.getItem(TOKEN); } catch { return null; } })();
const subs = new Set<() => void>();
const emit = () => subs.forEach((f) => f());

export const useUser = () => useSyncExternalStore((cb) => { subs.add(cb); return () => subs.delete(cb); }, () => user);
export const currentUser = () => user;

export async function api<T = unknown>(path: string, opts: { method?: string; body?: unknown } = {}): Promise<T> {
  const res = await fetch(`/api${path}`, {
    method: opts.method || (opts.body ? 'POST' : 'GET'),
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  let data: unknown = null;
  try { data = await res.json(); } catch { /* empty */ }
  if (res.status === 401 && token && !path.startsWith('/login')) { setSession(null, null); }
  if (!res.ok) throw new Error((data as { error?: string })?.error || (res.status >= 500 || res.status === 404 ? 'The server is not reachable. Start it with "npm run server".' : `Error ${res.status}`));
  return data as T;
}

function setSession(t: string | null, u: User | null) {
  token = t; user = u;
  try {
    if (t && u) { localStorage.setItem(TOKEN, t); localStorage.setItem(USER, JSON.stringify(u)); }
    else { localStorage.removeItem(TOKEN); localStorage.removeItem(USER); }
  } catch { /* storage blocked */ }
  emit();
}

export async function login(username: string, password: string) {
  const r = await api<{ token: string; user: User; state: State | null }>('/login', { body: { username, password } });
  replaceState(r.state);
  setSession(r.token, r.user);
}

export async function register(username: string, password: string, displayName: string) {
  const r = await api<{ token: string; user: User }>('/register', { body: { username, password, displayName } });
  replaceState({ name: displayName });
  setSession(r.token, r.user);
  pushNow();
}

export async function logout() {
  try { await pushNow(); await api('/logout', { method: 'POST' }); } catch { /* offline */ }
  setSession(null, null);
  replaceState(null);
}

export async function refreshMe() {
  if (!token) return;
  try {
    const r = await api<{ user: User; state: State | null }>('/me');
    setSession(token, r.user);
    // Server is the source of truth unless this device has more progress (e.g. offline work).
    if (r.state && (r.state.xp ?? 0) > getState().xp) replaceState(r.state);
  } catch { /* offline: keep local */ }
}

// ---------- progress sync ----------
let timer: ReturnType<typeof setTimeout> | null = null;
export async function pushNow() {
  if (!token) return;
  if (timer) { clearTimeout(timer); timer = null; }
  await api('/progress', { method: 'PUT', body: { state: getState() } });
}
subscribe(() => {
  if (!token) return;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => { pushNow().catch(() => {}); }, 2500);
});
addEventListener('beforeunload', () => {
  if (!token) return;
  try { fetch('/api/progress', { method: 'PUT', keepalive: true, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ state: getState() }) }); } catch { /* ignore */ }
});

export async function saveResult(testId: string, title: string, score: number, total: number, detail?: unknown) {
  if (!token) return;
  try { await api('/results', { body: { testId, title, score, total, detail } }); toast(`Result saved: ${score}/${total}`, '📊'); }
  catch (e) { toast((e as Error).message, '⚠️'); }
}
