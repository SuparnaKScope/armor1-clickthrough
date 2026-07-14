import { useStore } from '../store.jsx'
import { C, mono } from '../theme.js'
import Icon from '../components/Icon.jsx'
import { Card, Badge } from '../components/ui.jsx'
import { incidents, sevCounts } from '../data/incidents.js'

export default function Findings() {
  const { state, set } = useStore()
  const counts = sevCounts()
  const filters = ['All', 'Critical', 'High', 'Medium', 'Low']
  const filtered = state.sevFilter === 'All' ? incidents : incidents.filter((i) => i.severity === state.sevFilter)

  const open = (id) => set({ screen: 'incidents', incidentId: id, compile: 'idle', compileStep: 0, prModal: false, prStage: 'open' })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        {filters.map((sv) => {
          const active = state.sevFilter === sv
          return (
            <button key={sv} onClick={() => set({ sevFilter: sv })} style={{
              fontSize: 13, fontWeight: active ? 600 : 500,
              color: active ? '#fff' : C.sec, background: active ? C.ink : '#fff',
              border: `1px solid ${active ? C.ink : C.line}`, padding: '7px 14px', borderRadius: 20,
            }}>{sv} · {counts[sv]}</button>
          )
        })}
      </div>

      <Card pad={0} style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: `1px solid ${C.line}` }}>
          <Icon name="shield" size={18} color={C.green} />
          <div style={{ fontSize: 13, color: C.sec }}>
            <b style={{ color: C.ink }}>{incidents.length} findings</b> need judgment · <b style={{ color: C.ink }}>2.4M decisions</b> auto-resolved at the deterministic layer this week — 99.998% of agent actions never become a case.
          </div>
          <button onClick={() => set({ screen: 'runtime' })} style={{ marginLeft: 'auto', fontSize: 13, fontWeight: 600, color: C.orange, whiteSpace: 'nowrap' }}>View decision log</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '84px 92px 168px 1fr 170px 66px 132px 74px', gap: 0, padding: '11px 20px', borderBottom: `1px solid ${C.line}`, fontSize: 10.5, fontWeight: 600, letterSpacing: 0.6, color: C.ter }}>
          <div>ID</div><div>SEVERITY</div><div>DETECTION</div><div>FINDING</div><div>AGENT</div><div>θ CORR</div><div>STATUS</div><div>DETECTED</div>
        </div>

        <div>
          {filtered.map((i) => (
            <div key={i.id} onClick={() => open(i.id)} className="row-hover clickable"
              style={{ display: 'grid', gridTemplateColumns: '84px 92px 168px 1fr 170px 66px 132px 74px', gap: 0, alignItems: 'center', padding: '13px 20px', borderBottom: `1px solid ${C.chip}`, fontSize: 13 }}>
              <div style={{ fontFamily: mono, fontSize: 12, color: C.sec }}>{i.id}</div>
              <div><Badge bg={i.sevBg} color={i.sevColor}>{i.severity}</Badge></div>
              <div style={{ fontFamily: mono, fontSize: 11, color: C.sec }}>{i.type}</div>
              <div style={{ color: C.ink, paddingRight: 18, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{i.title}</div>
              <div style={{ color: C.sec, fontSize: 12.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 10 }}>{i.agent}</div>
              <div style={{ fontFamily: mono, fontSize: 12, color: i.corrColor, fontWeight: 600 }}>{i.corr}</div>
              <div style={{ color: i.stColor, fontSize: 12.5, fontWeight: 500 }}>{i.status}</div>
              <div style={{ color: C.ter, fontSize: 12 }}>{i.detected}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
