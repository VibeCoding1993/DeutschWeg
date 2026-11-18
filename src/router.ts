import { useSyncExternalStore } from 'react';

const sub = (cb: () => void) => { addEventListener('hashchange', cb); return () => removeEventListener('hashchange', cb); };
const get = () => location.hash.replace(/^#/, '') || '/';

export const useRoute = () => useSyncExternalStore(sub, get);
export function go(path: string) {
  location.hash = path;
  scrollTo({ top: 0 });
}
