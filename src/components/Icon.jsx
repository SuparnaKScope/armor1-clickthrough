// Lightweight line-icon set (feather-style) covering the glyphs used across the app.
const P = {
  gauge: 'M12 14a2 2 0 100-4 2 2 0 000 4zm1.4-1.4L17 9 M4.5 18a9 9 0 1115 0',
  adoption: 'M4 19V5 M4 19h16 M7 15l3-4 3 2 4-6',
  robot: 'M9 3v2 M12 3v2 M6 7h12a1 1 0 011 1v9a2 2 0 01-2 2H7a2 2 0 01-2-2V8a1 1 0 011-1z M9.5 12h.01 M14.5 12h.01 M9 16h6',
  plugs: 'M8 3v5 M12 3v5 M6 8h8v3a4 4 0 01-4 4 4 4 0 01-4-4V8z M10 15v3 M10 18h6a2 2 0 012 2',
  stack: 'M12 3l9 5-9 5-9-5 9-5z M3 13l9 5 9-5 M3 16.5l9 5 9-5',
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8z M5 20a7 7 0 0114 0',
  lightbulb: 'M9 18h6 M10 21h4 M8 11a4 4 0 118 0c0 1.7-1 2.6-1.6 3.4-.4.6-.4 1.2-.4 1.6H10c0-.4 0-1-.4-1.6C9 13.6 8 12.7 8 11z',
  warning: 'M12 4l9 16H3l9-16z M12 10v4 M12 17h.01',
  tree: 'M6 5h4v3H6V5z M14 3h4v3h-4V3z M14 10h4v3h-4v-3z M8 8v6a2 2 0 002 2h4 M12 12h2',
  lightning: 'M13 3L5 13h5l-1 8 8-11h-5l1-7z',
  shield: 'M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z M9 12l2 2 4-4',
  usersFour: 'M8 11a3 3 0 100-6 3 3 0 000 6z M16 11a3 3 0 100-6 3 3 0 000 6z M3 19a5 5 0 0110 0 M14 19a5 5 0 0110 0',
  gear: 'M12 15a3 3 0 100-6 3 3 0 000 6z M19 12l1.5-1-1.2-3-1.8.4a6 6 0 00-1.2-.7L15.5 4h-3l-.6 1.8a6 6 0 00-1.2.7L8.9 6.1 7.7 9l1.5 1a6 6 0 000 1.9L7.7 13l1.2 3 1.8-.4a6 6 0 001.2.7l.6 1.8h3l.6-1.8a6 6 0 001.2-.7l1.8.4 1.2-3-1.5-1a6 6 0 000-1.9z',
  laptop: 'M6 6h12v9H6V6z M3 19h18 M3 19l1.5-3M21 19l-1.5-3',
  building: 'M5 21V5a2 2 0 012-2h6a2 2 0 012 2v16 M15 9h3a2 2 0 012 2v10 M8 7h2 M8 11h2 M8 15h2',
  search: 'M11 19a8 8 0 100-16 8 8 0 000 16z M21 21l-4.3-4.3',
  play: 'M7 5l11 7-11 7V5z',
  sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z',
  prohibit: 'M12 21a9 9 0 100-18 9 9 0 000 18z M5.6 5.6l12.8 12.8',
  pause: 'M12 21a9 9 0 100-18 9 9 0 000 18z M10 9v6 M14 9v6',
  lock: 'M6 11h12v9H6v-9z M9 11V8a3 3 0 016 0v3 M12 15v2',
  bell: 'M6 16V11a6 6 0 1112 0v5l2 2H4l2-2z M10 20a2 2 0 004 0',
  refresh: 'M20 11a8 8 0 10-1.5 6 M20 5v6h-6',
  checkCircle: 'M12 21a9 9 0 100-18 9 9 0 000 18z M8.5 12.5l2.5 2.5 4.5-5',
  circleNotch: 'M12 3a9 9 0 109 9',
  circleDashed: 'M12 3a9 9 0 010 18 M3 12a9 9 0 019-9',
  arrowLeft: 'M19 12H5 M11 6l-6 6 6 6',
  x: 'M6 6l12 12 M18 6L6 18',
  trace: 'M4 7h6 M4 12h10 M4 17h7 M17 9l3 3-3 3',
  clock: 'M12 21a9 9 0 100-18 9 9 0 000 18z M12 8v4l3 2',
  dot: 'M12 13a1 1 0 100-2 1 1 0 000 2z',
  rollback: 'M9 14l-4-4 4-4 M5 10h9a5 5 0 010 10h-4',
  diff: 'M6 3v12 M6 21a2 2 0 100-4 2 2 0 000 4z M6 7a2 2 0 100-4 2 2 0 000 4z M18 9v8 M18 21a2 2 0 100-4 2 2 0 000 4z M18 9a2 2 0 100-4 2 2 0 000 4z M9 6h6a3 3 0 013 3',
  logout: 'M9 4H6a2 2 0 00-2 2v12a2 2 0 002 2h3 M16 17l5-5-5-5 M21 12H9',
  chevronsLeft: 'M11 7l-5 5 5 5 M18 7l-5 5 5 5',
  mail: 'M4 6h16v12H4z M4 7l8 6 8-6',
  eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z M12 15a3 3 0 100-6 3 3 0 000 6z',
  eyeOff: 'M3 3l18 18 M10.6 10.6a3 3 0 004.2 4.2 M9.9 5.1A9.7 9.7 0 0112 5c6.5 0 10 7 10 7a13 13 0 01-2.7 3.3 M6.1 6.1A13 13 0 002 12s3.5 7 10 7a9.7 9.7 0 002.1-.2',
}

export default function Icon({ name, size = 18, color = 'currentColor', strokeWidth = 1.7, style, className, fill }) {
  const d = P[name]
  if (!d) return null
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} className={className}
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {d.split(' M').map((seg, i) => (
        <path key={i} d={(i === 0 ? seg : 'M' + seg)} fill={fill || 'none'} />
      ))}
    </svg>
  )
}
