import { useStore } from '../store.jsx'
import { C, mono } from '../theme.js'
import Icon from './Icon.jsx'
import { Badge } from './ui.jsx'

const badges = {
  open: { label: 'OPEN', bg: 'rgb(255,222,204)', color: 'rgb(206,90,7)' },
  approved: { label: 'APPROVED', bg: 'rgba(22,162,73,0.1)', color: 'rgb(22,162,73)' },
  merged: { label: 'MERGED', bg: 'rgb(38,49,74)', color: '#fff' },
}

const diff = [
  ['  tools:', null], ['    - name: http_fetch', null],
  ['-     allowed_hosts: ["*"]', 'del'],
  ['+     allowed_hosts: ["kb.internal", "api.support.internal"]', 'add'],
  ['  retrieval:', null],
  ['-   sources: unpinned', 'del'],
  ['+   sources: signed-only        # content-addressed digests', 'add'],
  ['+ egress:', 'add'],
  ['+   unlisted_host: block        # DPE-R-2301 backstop', 'add'],
]

export default function PrModal({ det, cf }) {
  const { state, set } = useStore()
  const stage = state.prStage || 'open'
  const b = badges[stage]
  const agentSlug = String(det.agent).split(' ')[0]
  const num = (cf.prRef.match(/#\d+/) || ['#' + (400 + (parseInt(det.id.slice(4), 10) || 0))])[0]
  const checks = [
    { name: 'Golden corpus', detail: '96/96 pass' },
    { name: 'Sandbox replay', detail: cf.prProof },
    { name: 'Policy lint', detail: '0 warnings' },
  ]

  return (
    <div onClick={() => set({ prModal: false })} style={{ position: 'fixed', inset: 0, background: 'rgba(20,20,22,0.45)', backdropFilter: 'blur(2px)', zIndex: 150, display: 'grid', placeItems: 'center', padding: 24 }}>
      <div onClick={(e) => e.stopPropagation()} className="a1-fade" style={{ width: 720, maxWidth: '96vw', maxHeight: '90vh', overflow: 'auto', background: '#fff', borderRadius: 16, border: `1px solid ${C.line}`, boxShadow: '0 24px 60px rgba(0,0,0,0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '18px 22px', borderBottom: `1px solid ${C.line}` }}>
          <Icon name="diff" size={18} color={C.sec} />
          <span style={{ fontFamily: mono, fontSize: 13, color: C.sec }}>{num}</span>
          <Badge bg={b.bg} color={b.color} mono>{b.label}</Badge>
          <button onClick={() => set({ prModal: false })} style={{ marginLeft: 'auto', color: C.ter, display: 'grid', placeItems: 'center' }}><Icon name="x" size={17} color={C.ter} /></button>
        </div>

        <div style={{ padding: 22 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.ink, marginBottom: 6 }}>{cf.prTitle.replace(/^PR #\d+ — /, '')}</div>
          <div style={{ display: 'flex', gap: 16, fontSize: 12.5, color: C.sec, marginBottom: 18 }}>
            <span>branch <span style={{ fontFamily: mono, color: C.ink }}>fix/{det.id.toLowerCase()}-{agentSlug}</span></span>
            <span>file <span style={{ fontFamily: mono, color: C.ink }}>agents/{agentSlug}/policy.yaml</span></span>
          </div>

          <div style={{ background: 'rgb(24,24,27)', borderRadius: 10, padding: 14, marginBottom: 18, overflow: 'auto' }}>
            {diff.map(([text, kind], i) => (
              <div key={i} style={{ fontFamily: mono, fontSize: 12, whiteSpace: 'pre', padding: '1px 6px', borderRadius: 3,
                background: kind === 'add' ? 'rgba(22,162,73,0.18)' : kind === 'del' ? 'rgba(220,40,40,0.16)' : 'transparent',
                color: kind === 'add' ? 'rgb(134,239,172)' : kind === 'del' ? 'rgb(252,165,165)' : 'rgb(212,212,216)' }}>{text}</div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
            {checks.map((c) => (
              <div key={c.name} style={{ flex: 1, border: `1px solid ${C.line}`, borderRadius: 9, padding: '10px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                  <Icon name="checkCircle" size={14} color={C.green} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: C.ink }}>{c.name}</span>
                </div>
                <div style={{ fontSize: 11.5, color: C.green, fontFamily: mono }}>{c.detail}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {stage === 'open' && (
              <button onClick={() => set({ prStage: 'approved' })} style={{ flex: 1, background: C.green, color: '#fff', fontWeight: 600, fontSize: 13, padding: '11px', borderRadius: 9 }}>Approve PR</button>
            )}
            {stage === 'approved' && (
              <button onClick={() => set({ prStage: 'merged' })} style={{ flex: 1, background: C.navy, color: '#fff', fontWeight: 600, fontSize: 13, padding: '11px', borderRadius: 9 }}>Merge PR</button>
            )}
            {stage === 'merged' && (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'rgba(38,49,74,0.06)', color: C.navy, fontWeight: 600, fontSize: 13, padding: '11px', borderRadius: 9 }}>
                <Icon name="checkCircle" size={16} color={C.navy} /> Merged · regression watch armed
              </div>
            )}
            <button onClick={() => set({ prModal: false })} style={{ fontSize: 13, fontWeight: 600, color: C.sec, border: `1px solid ${C.line}`, padding: '11px 18px', borderRadius: 9 }}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}
