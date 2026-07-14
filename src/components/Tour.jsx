import { useStore } from '../store.jsx'
import { C } from '../theme.js'
import Icon from './Icon.jsx'
import { tourSteps } from '../data/overview.js'

const applies = [
  { screen: 'overview', incidentId: null },
  { screen: 'incidents', incidentId: 'INC-0041', variant: 'A', compile: 'idle', compileStep: 0, prModal: false, prStage: 'open' },
  { screen: 'sessions', sessionRun: 'run_7f3a12', selNode: 'n4' },
  { screen: 'incidents', incidentId: 'INC-0041', variant: 'A' },
  { screen: 'policy', selBundle: 'v42-rc', selRule: 'DPE-R-2301', compile: 'promoted' },
  { screen: 'overview', incidentId: null },
]

export default function Tour() {
  const { state, set } = useStore()
  const tour = state.tour

  const go = (i) => {
    if (i < 0 || i > 5) { set({ tour: -1 }); return }
    set({ tour: i, ...applies[i] })
    if (i === 3 && state.compile !== 'candidate' && state.compile !== 'promoted') {
      set({ compile: 'running', compileStep: 0 })
      ;[1, 2, 3].forEach((n) => setTimeout(() => set({ compileStep: n }), n * 800))
      setTimeout(() => set({ compile: 'candidate' }), 4 * 800)
    }
  }

  if (tour < 0) return null
  const cur = tourSteps[tour] || tourSteps[0]

  return (
    <div style={{ position: 'fixed', left: 0, right: 0, bottom: 26, display: 'flex', justifyContent: 'center', zIndex: 200, pointerEvents: 'none' }}>
      <div className="a1-fade" style={{
        pointerEvents: 'auto', width: 560, maxWidth: '90vw', background: C.white, border: `1px solid ${C.line}`,
        borderRadius: 16, boxShadow: '0 12px 40px rgba(26,26,26,0.18)', padding: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 0.8, color: C.orange, background: C.softOrange, padding: '3px 8px', borderRadius: 6 }}>{cur.k}</span>
          <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: 0.5, color: C.ter }}>STEP {tour + 1} OF 6</span>
          <div style={{ flex: 1, display: 'flex', gap: 5, justifyContent: 'center' }}>
            {tourSteps.map((s, ix) => (
              <button key={ix} onClick={() => go(ix)} style={{
                width: ix === tour ? 18 : 6, height: 6, borderRadius: 3,
                background: ix === tour ? C.orange : ix < tour ? 'rgb(253,186,114)' : C.line, transition: 'all .2s',
              }} />
            ))}
          </div>
          <button onClick={() => set({ tour: -1 })} style={{ color: C.ter, display: 'grid', placeItems: 'center' }}><Icon name="x" size={16} color={C.ter} /></button>
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.ink, marginBottom: 5 }}>{cur.title}</div>
        <div style={{ fontSize: 13.5, color: C.sec, lineHeight: 1.55, marginBottom: 16 }}>{cur.desc}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {tour > 0 && <button onClick={() => go(tour - 1)} style={{ fontSize: 13, fontWeight: 600, color: C.sec, padding: '8px 14px', borderRadius: 8, border: `1px solid ${C.line}` }}>← Back</button>}
          <div style={{ flex: 1 }} />
          <button onClick={() => go(tour === 5 ? -1 : tour + 1)} style={{ fontSize: 13, fontWeight: 600, color: '#fff', background: C.orange, padding: '9px 18px', borderRadius: 8 }}>
            {tour === 5 ? 'Finish' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}
