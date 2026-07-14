import { C, mono } from '../theme.js'

export function Card({ children, style, className = '', onClick, pad = 22 }) {
  return (
    <div
      onClick={onClick}
      className={`${className} ${onClick ? 'lift clickable' : ''}`}
      style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 14, padding: pad, ...style }}
    >
      {children}
    </div>
  )
}

export function Badge({ children, bg, color, mono: isMono, style }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5, background: bg, color,
      fontFamily: isMono ? mono : 'inherit', fontSize: isMono ? 11 : 11.5, fontWeight: 600,
      padding: '3px 8px', borderRadius: 6, letterSpacing: isMono ? 0.2 : 0.1, lineHeight: 1.3,
      whiteSpace: 'nowrap', ...style,
    }}>{children}</span>
  )
}

export function Kicker({ children, style }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.7, color: C.ter, textTransform: 'uppercase', ...style }}>
      {children}
    </div>
  )
}

export function Mono({ children, style, color = C.sec }) {
  return <span style={{ fontFamily: mono, color, ...style }}>{children}</span>
}

export function SectionTitle({ title, note, right, style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14, ...style }}>
      <div style={{ fontSize: 15.5, fontWeight: 600, color: C.ink }}>{title}</div>
      {note && <div style={{ fontSize: 12.5, color: C.ter }}>{note}</div>}
      {right && <div style={{ marginLeft: 'auto' }}>{right}</div>}
    </div>
  )
}

// Segmented horizontal meter (used for coverage / deployment / token split bars).
export function SegBar({ segs, height = 10, radius = 6, gap = 0 }) {
  return (
    <div style={{ display: 'flex', width: '100%', height, borderRadius: radius, overflow: 'hidden', gap }}>
      {segs.map((s, i) => (
        <div key={i} style={{ width: (s.w ?? s.pct) + '%', background: s.color, height: '100%' }} />
      ))}
    </div>
  )
}
