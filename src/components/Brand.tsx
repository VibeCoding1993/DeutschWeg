/** DeutschWeg logo (the user's design, redrawn as SVG) and the mascot "Wegi" built from it. */

const BANDS = {
  black: 'M525 268 C 510 450, 440 600, 343 716 L 474 716 C 540 560, 555 420, 535 268 Z',
  red: 'M535 268 C 555 420, 540 560, 474 716 L 605 716 C 625 600, 615 430, 545 268 Z',
  gold: 'M545 268 C 615 430, 625 600, 605 716 L 736 716 C 720 560, 660 410, 553 268 Z',
};
export const DE = { black: '#111111', red: '#DD0000', gold: '#FFCE00' };

export function LogoMark({ size = 36, title = 'DeutschWeg' }: { size?: number; title?: string }) {
  return (
    <svg className="logo-mark" width={size} height={size} viewBox="320 190 440 540" role="img" aria-label={title}>
      <path d={BANDS.black} fill={DE.black} className="band-black" />
      <path d={BANDS.red} fill={DE.red} />
      <path d={BANDS.gold} fill={DE.gold} />
      <circle cx="540" cy="231" r="22" fill={DE.red} />
    </svg>
  );
}

/** Mark + wordmark. "Deutsch" follows the theme text colour, "Weg" is always red. */
export function Logo({ size = 34, onClick, big }: { size?: number; onClick?: () => void; big?: boolean }) {
  const inner = (
    <>
      <LogoMark size={size} />
      <span className="wordmark" style={{ fontSize: size * (big ? 0.95 : 0.7) }}>Deutsch<span>Weg</span></span>
    </>
  );
  return onClick ? <button className={`brand ${big ? 'big' : ''}`} onClick={onClick} aria-label="DeutschWeg home">{inner}</button> : <div className={`brand ${big ? 'big' : ''}`}>{inner}</div>;
}

type Mood = 'wave' | 'happy' | 'cheer' | 'think' | 'sad';

/** Wegi — the DeutschWeg mascot: the logo's road as a body, the red dot as a head with a face. */
export function Mascot({ size = 140, mood = 'wave', say }: { size?: number; mood?: Mood; say?: string }) {
  const mouth = mood === 'sad' ? 'M-9 14 Q0 7 9 14' : mood === 'think' ? 'M-7 12 L7 12' : 'M-11 9 Q0 21 11 9';
  return (
    <div className={`mascot mood-${mood}`} style={{ width: size }}>
      {say && <div className="mascot-bubble">{say}</div>}
      <svg viewBox="300 60 480 680" width={size} height={size * 1.4} aria-hidden>
        <ellipse cx="540" cy="722" rx="200" ry="14" fill="rgba(0,0,0,.18)" />
        <g className="m-body">
          <path d={BANDS.black} fill={DE.black} className="band-black" />
          <path d={BANDS.red} fill={DE.red} />
          <path d={BANDS.gold} fill={DE.gold} />
          {/* arms */}
          <path className="m-arm-l" d="M470 470 Q 400 450 372 400" stroke={DE.black} strokeWidth="22" strokeLinecap="round" fill="none" />
          <path className="m-arm-r" d="M612 470 Q 690 430 712 370" stroke="#e6b400" strokeWidth="22" strokeLinecap="round" fill="none" />
          <circle className="m-arm-r" cx="716" cy="358" r="17" fill="#e6b400" />
          <circle cx="368" cy="392" r="17" fill={DE.black} />
          {/* feet */}
          <ellipse cx="430" cy="716" rx="46" ry="16" fill={DE.black} /><ellipse cx="650" cy="716" rx="46" ry="16" fill="#e6b400" />
        </g>
        <g className="m-head" transform="translate(540 180)">
          <circle r="92" fill={DE.red} />
          <circle cx="-30" cy="-30" r="26" fill="#ff4d4d" opacity=".5" />
          <g transform="scale(3.2)">
            {mood === 'cheer' || mood === 'happy'
              ? <><path d="M-17 -6 q5 -6 10 0" stroke="#fff" strokeWidth="3.2" fill="none" strokeLinecap="round" /><path d="M7 -6 q5 -6 10 0" stroke="#fff" strokeWidth="3.2" fill="none" strokeLinecap="round" /></>
              : <><ellipse className="m-eye" cx="-12" cy="-5" rx="5" ry="6.5" fill="#fff" /><ellipse className="m-eye" cx="12" cy="-5" rx="5" ry="6.5" fill="#fff" />
                <circle cx={mood === 'think' ? -10 : -11} cy={mood === 'think' ? -8 : -4} r="2.6" fill="#111" /><circle cx={mood === 'think' ? 14 : 13} cy={mood === 'think' ? -8 : -4} r="2.6" fill="#111" /></>}
            <path d={mouth} stroke="#fff" strokeWidth="3.4" fill={mood === 'cheer' ? '#7a0000' : 'none'} strokeLinecap="round" />
            <circle cx="-20" cy="7" r="3.4" fill="#ff9a9a" opacity=".7" /><circle cx="20" cy="7" r="3.4" fill="#ff9a9a" opacity=".7" />
          </g>
        </g>
        {mood === 'cheer' && <g className="m-stars" fill={DE.gold}>{[[360, 120], [720, 110], [330, 300], [760, 260]].map(([x, y], i) => <path key={i} transform={`translate(${x} ${y})`} d="M0 -22 L6 -6 L22 0 L6 6 L0 22 L-6 6 L-22 0 L-6 -6 Z" />)}</g>}
      </svg>
    </div>
  );
}
