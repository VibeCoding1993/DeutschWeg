import { useEffect } from 'react';
import { useRoute, go } from './router';
import { liveStreak, today, useStore } from './lib/store';
import { dueCards } from './lib/progress';
import { refreshMe, useUser } from './lib/api';
import { ToastHost } from './components/ui';
import { Logo } from './components/Brand';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import Review from './pages/Review';
import Practice from './pages/Practice';
import Drill from './pages/Drill';
import Speak from './pages/Speak';
import Write from './pages/Write';
import Exam from './pages/Exam';
import Grammar from './pages/Grammar';
import Placement from './pages/Placement';
import Me from './pages/Me';
import Welcome from './pages/Welcome';
import Studio from './pages/Studio';
import Login from './pages/Login';
import Tests from './pages/Tests';
import Admin from './pages/Admin';
import Stats from './pages/Stats';
import Alphabet from './pages/Alphabet';
import { startStudyTimer } from './lib/timer';

const NAV = [
  { path: '/', icon: '🗺️', label: 'Lernen', mobile: true },
  { path: '/studio', icon: '📘', label: 'Kursbuch', mobile: true },
  { path: '/practice', icon: '🎯', label: 'Üben', mobile: true },
  { path: '/tests', icon: '📝', label: 'Tests', mobile: true },
  { path: '/speak', icon: '🎙️', label: 'Sprechen', mobile: true },
  { path: '/write', icon: '✍️', label: 'Schreiben', mobile: false },
  { path: '/exam', icon: '🎓', label: 'B2-Prüfung', mobile: false },
  { path: '/stats', icon: '📊', label: 'Statistik', mobile: false },
];

export default function App() {
  const route = useRoute();
  const user = useUser();
  const theme = useStore((s) => s.settings.theme);
  const onboarded = useStore((s) => s.onboarded);
  const streak = useStore(liveStreak);
  const xpToday = useStore((s) => s.daily[today()] || 0);
  const goal = useStore((s) => s.dailyGoal);
  const due = useStore((s) => dueCards(s).length);
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  useEffect(() => { refreshMe(); startStudyTimer(); }, []);

  const [, seg, arg] = route.split('/');

  if (!user) return <div className="app focus"><main className="no-pad"><Login /></main><ToastHost /></div>;

  const focus = !onboarded || seg === 'lesson' || seg === 'placement';
  let page;
  if (!onboarded && seg !== 'placement') page = <Welcome />;
  else switch (seg) {
    case 'lesson': page = <Lesson key={arg} id={arg} />; break;
    case 'review': page = <Review />; break;
    case 'practice': page = <Practice />; break;
    case 'drill': page = <Drill key={arg} id={arg} />; break;
    case 'speak': page = <Speak tab={arg} />; break;
    case 'write': page = <Write key={arg || 'list'} id={arg} />; break;
    case 'exam': page = <Exam />; break;
    case 'grammar': page = <Grammar />; break;
    case 'placement': page = <Placement />; break;
    case 'me': page = <Me />; break;
    case 'studio': page = <Studio />; break;
    case 'tests': page = <Tests />; break;
    case 'admin': page = <Admin />; break;
    case 'stats': page = <Stats />; break;
    case 'alphabet': page = <Alphabet />; break;
    default: page = <Home />;
  }

  const active = (p: string) => (p === '/' ? ['', 'lesson'].includes(seg) : route.startsWith(p) || (p === '/practice' && ['review', 'drill', 'grammar'].includes(seg)));
  const initial = (user.displayName || user.username).slice(0, 1).toUpperCase();

  return (
    <div className={`app ${focus ? 'focus' : ''}`}>
      {onboarded && (
        <>
          <aside className="side">
            <Logo size={38} onClick={() => go('/')} />
            <nav>
              {NAV.map((n) => (
                <button key={n.path} className={active(n.path) ? 'on' : ''} onClick={() => go(n.path)}>
                  <span>{n.icon}</span>{n.label}{n.path === '/practice' && due > 0 && <em className="badge">{due}</em>}
                </button>
              ))}
              {user.role === 'admin' && <button className={`admin-link ${seg === 'admin' ? 'on' : ''}`} onClick={() => go('/admin')}><span>🛡️</span>Admin</button>}
            </nav>
            <div className="side-foot">
              <div className="row"><div className="chip"><span>🔥</span><b>{streak}</b></div><div className="chip"><span>⚡</span><b>{xpToday}</b>/{goal}</div></div>
              <button className={`me-card ${seg === 'me' ? 'on' : ''}`} onClick={() => go('/me')}>
                <span className="avatar-sm">{initial}</span>
                <div><b>{user.displayName}</b><small>{user.role === 'admin' ? 'Administrator' : `@${user.username}`}</small></div>
              </button>
            </div>
          </aside>
          <header className="topbar">
            <Logo size={30} onClick={() => go('/')} />
            <div className="row">
              <div className="chip"><span>🔥</span><b>{streak}</b></div>
              <div className="chip"><span>⚡</span><b>{xpToday}</b></div>
              {user.role === 'admin' && <button className="avatar" onClick={() => go('/admin')} aria-label="Admin">🛡️</button>}
              <button className="avatar initial" onClick={() => go('/me')} aria-label="Profile">{initial}</button>
            </div>
          </header>
        </>
      )}
      <main>{page}</main>
      {onboarded && (
        <nav className="bottom">
          {NAV.filter((n) => n.mobile).map((n) => (
            <button key={n.path} className={active(n.path) ? 'on' : ''} onClick={() => go(n.path)}>
              <span>{n.icon}</span><small>{n.label}</small>{n.path === '/practice' && due > 0 && <em className="badge">{due}</em>}
            </button>
          ))}
        </nav>
      )}
      <ToastHost />
    </div>
  );
}
