import type { SceneKind } from '../types';

/** Recurring cast of the course story. All characters are original. */
export interface Look { f: boolean; skin: string; hair: string; style: 'short' | 'long' | 'bun' | 'curly' | 'bald' | 'ponytail' | 'beard'; shirt: string; glasses?: boolean; old?: boolean }

export const CAST: Record<string, { name: string; look: Look; bio: string }> = {
  lena: { name: 'Lena', bio: 'Grafikdesignerin aus Hamburg', look: { f: true, skin: '#f2c9a5', hair: '#7a4a2a', style: 'long', shirt: '#ff6b8a' } },
  karim: { name: 'Karim', bio: 'kommt aus Marrakesch, lernt Deutsch in Berlin', look: { f: false, skin: '#c98d5e', hair: '#1e1a18', style: 'curly', shirt: '#3a86ff' } },
  weber: { name: 'Frau Weber', bio: 'Deutschlehrerin', look: { f: true, skin: '#f4d2b8', hair: '#b9b4b0', style: 'bun', shirt: '#2ec4b6', glasses: true, old: true } },
  bauer: { name: 'Herr Bauer', bio: 'Kellner und Café-Besitzer', look: { f: false, skin: '#efc3a0', hair: '#5a3d2b', style: 'beard', shirt: '#ffffff' } },
  mia: { name: 'Mia', bio: 'Studentin aus Wien', look: { f: true, skin: '#f6d5bd', hair: '#e8c35a', style: 'ponytail', shirt: '#ffd23f' } },
  jonas: { name: 'Jonas', bio: 'Ingenieur, Lenas Bruder', look: { f: false, skin: '#f0c7a6', hair: '#c4572e', style: 'short', shirt: '#8f5cff' } },
  yilmaz: { name: 'Dr. Yılmaz', bio: 'Ärztin', look: { f: true, skin: '#d9a77f', hair: '#2b1d16', style: 'long', shirt: '#ffffff', glasses: true } },
  paul: { name: 'Paul', bio: 'Verkäufer', look: { f: false, skin: '#a8714a', hair: '#141414', style: 'bald', shirt: '#ff9f1c' } },
  amira: { name: 'Amira', bio: 'Karims Kollegin', look: { f: true, skin: '#b97f56', hair: '#1a1210', style: 'curly', shirt: '#3ddc97' } },
};

function Person({ look, x, talking, active }: { look: Look; x: number; talking: boolean; active: boolean }) {
  const { skin, hair, style, shirt, glasses, old, f } = look;
  return (
    <g transform={`translate(${x},0)`} className={`person ${talking ? 'talking' : ''} ${active ? 'active' : ''}`}>
      <ellipse cx="0" cy="214" rx="34" ry="5" fill="rgba(0,0,0,.18)" />
      {/* body */}
      <path d={f ? 'M-30 214 Q-30 150 0 146 Q30 150 30 214 Z' : 'M-32 214 Q-32 148 0 145 Q32 148 32 214 Z'} fill={shirt} stroke="rgba(0,0,0,.15)" />
      <path d="M-8 147 L0 160 L8 147" fill="none" stroke="rgba(0,0,0,.18)" strokeWidth="2" />
      <rect x="-6" y="132" width="12" height="16" rx="5" fill={skin} />
      {/* hair back */}
      {style === 'long' && <path d="M-27 105 Q-30 150 -18 160 L18 160 Q30 150 27 105 Z" fill={hair} />}
      {style === 'ponytail' && <path d="M22 100 Q44 118 30 150 Q26 128 16 112 Z" fill={hair} />}
      {style === 'bun' && <circle cx="0" cy="76" r="12" fill={hair} />}
      {/* head */}
      <circle cx="0" cy="106" r="27" fill={skin} />
      <circle cx="-26" cy="108" r="5" fill={skin} /><circle cx="26" cy="108" r="5" fill={skin} />
      {/* hair front */}
      {style === 'short' && <path d="M-27 102 Q-26 76 0 76 Q26 76 27 102 Q14 88 -27 102 Z" fill={hair} />}
      {(style === 'long' || style === 'ponytail') && <path d="M-28 106 Q-28 76 0 76 Q28 76 28 106 Q20 88 4 86 Q-14 92 -28 106 Z" fill={hair} />}
      {style === 'bun' && <path d="M-27 104 Q-26 80 0 80 Q26 80 27 104 Q0 90 -27 104 Z" fill={hair} />}
      {style === 'curly' && <g fill={hair}>{[-22, -11, 0, 11, 22].map((cx) => <circle key={cx} cx={cx} cy={cx === 0 ? 78 : 84 - Math.abs(cx) * 0.1} r="11" />)}<circle cx="-25" cy="96" r="8" /><circle cx="25" cy="96" r="8" /></g>}
      {style === 'beard' && <><path d="M-27 100 Q-25 78 0 78 Q25 78 27 100 Q10 90 -27 100 Z" fill={hair} /><path d="M-24 112 Q-22 136 0 136 Q22 136 24 112 Q12 126 0 124 Q-12 126 -24 112 Z" fill={hair} /></>}
      {style === 'bald' && <path d="M-26 98 Q-24 80 0 79 Q24 80 26 98" fill="none" stroke="rgba(0,0,0,.08)" strokeWidth="3" />}
      {/* face */}
      <circle cx="-10" cy="106" r="3" fill="#2a2030" /><circle cx="10" cy="106" r="3" fill="#2a2030" />
      <path d={`M-15 ${old ? 97 : 98} q5 -3 9 0 M6 ${old ? 97 : 98} q5 -3 9 0`} stroke={hair === '#b9b4b0' ? '#8a847f' : hair} strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="-17" cy="116" r="4" fill="#ff8f8f" opacity=".35" /><circle cx="17" cy="116" r="4" fill="#ff8f8f" opacity=".35" />
      <ellipse className="mouth" cx="0" cy="120" rx="6" ry="2.5" fill="#7a2e3a" />
      {glasses && <g fill="none" stroke="#2a2030" strokeWidth="2"><circle cx="-10" cy="106" r="7" /><circle cx="10" cy="106" r="7" /><path d="M-3 106 h6" /></g>}
    </g>
  );
}

const sky = (a: string, b: string) => (
  <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient></defs>
);

function Background({ kind }: { kind: SceneKind }) {
  switch (kind) {
    case 'cafe': return <g>
      <rect width="400" height="220" fill="#f3e3cf" /><rect y="150" width="400" height="70" fill="#b98a5e" />
      <rect x="20" y="22" width="120" height="80" rx="6" fill="#bfe3ff" stroke="#8a5a36" strokeWidth="6" /><path d="M80 22 v80 M20 62 h120" stroke="#8a5a36" strokeWidth="4" />
      <rect x="250" y="30" width="120" height="70" rx="6" fill="#3b2a22" /><text x="310" y="52" fill="#fff" fontSize="13" textAnchor="middle" fontFamily="Nunito" fontWeight="800">KARTE</text>
      <text x="264" y="72" fill="#ffd23f" fontSize="10" fontFamily="Nunito">Kaffee 2,80</text><text x="264" y="88" fill="#ffd23f" fontSize="10" fontFamily="Nunito">Tee 2,40 · Kuchen 3,50</text>
      {[175, 225].map((x) => <g key={x}><path d={`M${x} 0 v20`} stroke="#555" /><path d={`M${x - 12} 32 q12 -16 24 0 z`} fill="#ff9f1c" /></g>)}
      <rect x="150" y="160" width="100" height="10" rx="4" fill="#6b4226" /><rect x="195" y="170" width="10" height="44" fill="#6b4226" />
      <path d="M180 160 v-10 h14 v10 M210 160 v-12 h12 v12" fill="#fff" stroke="#ccc" />
    </g>;
    case 'classroom': return <g>
      <rect width="400" height="220" fill="#e9f1ff" /><rect y="170" width="400" height="50" fill="#c8b48f" />
      <rect x="110" y="20" width="180" height="90" rx="6" fill="#2f5d50" stroke="#a37b4f" strokeWidth="6" />
      <text x="200" y="55" fill="#fff" fontSize="20" textAnchor="middle" fontFamily="Nunito" fontWeight="800">Deutsch</text>
      <text x="200" y="82" fill="#d9f0e4" fontSize="12" textAnchor="middle" fontFamily="Nunito">der · die · das</text>
      <rect x="20" y="30" width="60" height="70" rx="4" fill="#fff" stroke="#ccd" /><text x="50" y="72" fontSize="26" textAnchor="middle">🌍</text>
      <rect x="320" y="40" width="60" height="44" rx="4" fill="#ffd23f" /><text x="350" y="68" fontSize="12" textAnchor="middle" fontFamily="Nunito" fontWeight="800">A1</text>
    </g>;
    case 'welcome': return <g>{sky('#8fd3ff', '#e7f6ff')}<rect width="400" height="220" fill="url(#sky)" />
      <circle cx="340" cy="40" r="22" fill="#ffd23f" /><rect y="175" width="400" height="45" fill="#8fd18a" />
      {['#ff6b8a', '#3a86ff', '#ffd23f', '#2ec4b6', '#8f5cff'].map((c, i) => <path key={c} d={`M${30 + i * 75} 20 l20 0 l-10 18 z`} fill={c} />)}
      <path d="M0 20 Q200 40 400 20" stroke="#888" fill="none" />
      <text x="200" y="56" fontSize="18" textAnchor="middle" fontFamily="Nunito" fontWeight="900" fill="#1d1a3a">Willkommen!</text>
    </g>;
    case 'city': case 'berlin': return <g>{sky(kind === 'berlin' ? '#ffb88a' : '#9fd4ff', '#fff3e0')}<rect width="400" height="220" fill="url(#sky)" />
      {[[10, 70, 60], [75, 50, 90], [135, 40, 60], [255, 60, 80], [325, 70, 55]].map(([x, w, h], i) => <g key={i}><rect x={x} y={180 - h - 20} width={w} height={h + 20} fill={['#6c6a9c', '#8a86c2', '#5d5a8a', '#7975b0', '#6c6a9c'][i]} />
        {Array.from({ length: Math.floor(w / 16) }).map((_, k) => Array.from({ length: Math.floor(h / 20) }).map((__, r) => <rect key={`${k}-${r}`} x={x + 6 + k * 16} y={180 - h - 12 + r * 20} width="8" height="10" fill="#ffe9a8" opacity=".8" />))}</g>)}
      {kind === 'berlin' ? <g fill="#5d5a8a"><rect x="208" y="20" width="6" height="140" /><circle cx="211" cy="62" r="14" /><path d="M209 8 h4 v14 h-4z" /></g>
        : <g><circle cx="210" cy="95" r="45" fill="none" stroke="#5d5a8a" strokeWidth="5" />{Array.from({ length: 8 }).map((_, i) => <line key={i} x1="210" y1="95" x2={210 + 45 * Math.cos(i * Math.PI / 4)} y2={95 + 45 * Math.sin(i * Math.PI / 4)} stroke="#5d5a8a" strokeWidth="2" />)}<path d="M195 160 L210 95 L225 160" stroke="#5d5a8a" strokeWidth="5" fill="none" /></g>}
      <rect y="170" width="400" height="50" fill="#9a98b8" /><path d="M0 195 h400" stroke="#fff" strokeDasharray="18 14" strokeWidth="3" />
    </g>;
    case 'flat': return <g>
      <rect width="400" height="220" fill="#fff1e6" /><rect y="175" width="400" height="45" fill="#d9a36b" />
      <rect x="40" y="25" width="90" height="100" fill="#bfe3ff" stroke="#fff" strokeWidth="8" /><path d="M85 25 v100" stroke="#fff" strokeWidth="5" />
      <rect x="250" y="120" width="130" height="55" rx="14" fill="#3a86ff" /><rect x="250" y="105" width="130" height="30" rx="12" fill="#5c9cff" />
      <rect x="160" y="40" width="50" height="40" fill="#ffd23f" stroke="#a37b4f" strokeWidth="4" />
      <g transform="translate(20 140)"><rect x="0" y="12" width="26" height="24" rx="4" fill="#c4572e" /><circle cx="13" cy="4" r="14" fill="#3ddc97" /></g>
    </g>;
    case 'office': return <g>
      <rect width="400" height="220" fill="#eef2f7" /><rect y="180" width="400" height="40" fill="#b7c0cc" />
      <rect x="250" y="120" width="140" height="10" fill="#6b7a8c" /><rect x="260" y="130" width="8" height="50" fill="#6b7a8c" /><rect x="372" y="130" width="8" height="50" fill="#6b7a8c" />
      <rect x="290" y="78" width="60" height="40" rx="4" fill="#1d1a3a" /><rect x="296" y="84" width="48" height="28" fill="#3a86ff" /><rect x="315" y="118" width="10" height="4" fill="#1d1a3a" />
      <rect x="30" y="20" width="110" height="60" rx="4" fill="#fff" stroke="#c9d1dc" /><path d="M42 66 l20 -18 l20 10 l20 -24 l20 14" stroke="#ff6b8a" strokeWidth="3" fill="none" />
      <rect x="170" y="20" width="50" height="50" rx="25" fill="#fff" stroke="#6b7a8c" strokeWidth="3" /><path d="M195 45 v-16 M195 45 h12" stroke="#1d1a3a" strokeWidth="3" />
    </g>;
    case 'street': return <g>{sky('#a9dcff', '#f2fbff')}<rect width="400" height="220" fill="url(#sky)" />
      <rect x="0" y="60" width="140" height="120" fill="#f4a261" /><rect x="260" y="50" width="140" height="130" fill="#e9c46a" />
      {[20, 60, 100, 280, 320, 360].map((x) => <rect key={x} x={x} y="80" width="22" height="28" fill="#fff" />)}
      <rect y="170" width="400" height="50" fill="#8d8aa8" /><g transform="translate(180 60)"><rect x="8" y="0" width="6" height="110" fill="#555" /><rect x="0" y="0" width="22" height="50" rx="5" fill="#333" /><circle cx="11" cy="12" r="6" fill="#ff5d73" /><circle cx="11" cy="26" r="6" fill="#ffd23f" opacity=".4" /><circle cx="11" cy="40" r="6" fill="#3ddc97" opacity=".4" /></g>
      <rect x="215" y="70" width="40" height="22" rx="3" fill="#2f5d50" /><text x="235" y="85" fill="#fff" fontSize="9" textAnchor="middle" fontFamily="Nunito">← Bahnhof</text>
    </g>;
    case 'beach': return <g>{sky('#6cc8ff', '#d9f2ff')}<rect width="400" height="220" fill="url(#sky)" /><circle cx="320" cy="45" r="26" fill="#ffd23f" />
      <rect y="120" width="400" height="50" fill="#2a9df4" /><path d="M0 125 q20 -6 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke="#fff" fill="none" opacity=".6" />
      <rect y="165" width="400" height="55" fill="#f6d79b" /><path d="M60 170 L90 100 L120 170" fill="#ff6b8a" /><rect x="88" y="100" width="4" height="80" fill="#8a5a36" />
    </g>;
    case 'mountains': return <g>{sky('#8fd3ff', '#ffffff')}<rect width="400" height="220" fill="url(#sky)" />
      <path d="M0 170 L90 50 L170 170 Z" fill="#7a86b8" /><path d="M70 76 L90 50 L110 76 L100 70 L90 80 L80 70Z" fill="#fff" />
      <path d="M120 170 L250 30 L380 170 Z" fill="#6474a8" /><path d="M224 58 L250 30 L276 58 L262 52 L250 64 L238 52Z" fill="#fff" />
      <rect y="165" width="400" height="55" fill="#7cc77a" />
    </g>;
    case 'market': return <g>
      <rect width="400" height="220" fill="#fff8ec" /><rect y="185" width="400" height="35" fill="#cfc4b4" />
      {[30, 90, 150].map((y, r) => <g key={y}><rect x="10" y={y + 30} width="150" height="6" fill="#a37b4f" />
        {Array.from({ length: 6 }).map((_, i) => <circle key={i} cx={24 + i * 24} cy={y + 20} r="10" fill={[['#ff5d73', '#ff9f1c', '#ffd23f'], ['#3ddc97', '#ff5d73', '#ff9f1c'], ['#ffd23f', '#3ddc97', '#8f5cff']][r][i % 3]} />)}</g>)}
      <rect x="250" y="40" width="130" height="60" rx="6" fill="#2ec4b6" /><text x="315" y="66" fill="#fff" fontSize="14" textAnchor="middle" fontFamily="Nunito" fontWeight="900">ANGEBOT</text><text x="315" y="88" fill="#fff" fontSize="11" textAnchor="middle" fontFamily="Nunito">1 kg Äpfel 1,99 €</text>
    </g>;
    case 'shop': return <g>
      <rect width="400" height="220" fill="#fdf0f6" /><rect y="185" width="400" height="35" fill="#d8c6d2" />
      <rect x="20" y="40" width="160" height="5" fill="#666" />{['#ff6b8a', '#3a86ff', '#ffd23f', '#2ec4b6', '#8f5cff', '#1d1a3a'].map((c, i) => <path key={c} d={`M${30 + i * 25} 45 l-10 12 v40 h22 v-40 l-10 -12 z`} fill={c} />)}
      <rect x="290" y="30" width="80" height="140" rx="40" fill="#e0e7ff" stroke="#a7b0d8" strokeWidth="4" /><text x="330" y="190" fontSize="10" textAnchor="middle" fill="#666" fontFamily="Nunito">Spiegel</text>
    </g>;
    case 'doctor': return <g>
      <rect width="400" height="220" fill="#eefaf8" /><rect y="185" width="400" height="35" fill="#bfd9d5" />
      <rect x="40" y="30" width="54" height="54" rx="8" fill="#fff" stroke="#2ec4b6" strokeWidth="3" /><path d="M67 42 v30 M52 57 h30" stroke="#ff5d73" strokeWidth="9" />
      <rect x="270" y="130" width="120" height="20" rx="6" fill="#fff" stroke="#9cc" /><rect x="270" y="150" width="8" height="35" fill="#9cc" /><rect x="382" y="150" width="8" height="35" fill="#9cc" />
      <rect x="150" y="30" width="80" height="60" rx="4" fill="#fff" stroke="#9cc" /><text x="190" y="55" fontSize="9" textAnchor="middle" fontFamily="Nunito">Praxis</text><text x="190" y="72" fontSize="9" textAnchor="middle" fontFamily="Nunito">Mo–Fr 8–18 Uhr</text>
    </g>;
    case 'phone': return <g>
      <rect width="400" height="220" fill="#f1edff" /><rect x="185" y="20" width="30" height="190" fill="#d6d0f5" />
      <rect x="40" y="30" width="60" height="44" rx="4" fill="#fff" stroke="#ccd" /><text x="70" y="58" fontSize="10" textAnchor="middle" fontFamily="Nunito">📅 Mai</text>
      <rect x="300" y="30" width="60" height="60" rx="30" fill="#fff" stroke="#8f5cff" strokeWidth="3" /><path d="M330 60 v-18 M330 60 h14" stroke="#1d1a3a" strokeWidth="3" />
      <text x="200" y="120" fontSize="26" textAnchor="middle">📞</text>
    </g>;
  }
}

export default function Scene({ kind, cast, speaking, me }: { kind: SceneKind; cast: string[]; speaking?: string | null; me?: string | null }) {
  const n = cast.length;
  const xs = n === 1 ? [200] : n === 2 ? [125, 275] : n === 3 ? [90, 200, 310] : cast.map((_, i) => 60 + i * (280 / (n - 1)));
  return (
    <svg className="scene" viewBox="0 0 400 220" role="img" aria-label={`Scene: ${kind}`}>
      <Background kind={kind} />
      {cast.map((c, i) => CAST[c] && (
        <g key={c}>
          <Person look={CAST[c].look} x={xs[i]} talking={speaking === c} active={!speaking || speaking === c} />
          <g transform={`translate(${xs[i]},218)`}>
            <rect x="-40" y="-14" width="80" height="16" rx="8" fill={me === c ? 'var(--accent)' : 'rgba(20,18,43,.75)'} />
            <text y="-2" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="Nunito" fontWeight="800">{CAST[c].name}{me === c ? ' (du)' : ''}</text>
          </g>
        </g>
      ))}
    </svg>
  );
}
