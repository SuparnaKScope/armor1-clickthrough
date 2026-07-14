import { useStore } from '../store.jsx'
import { C } from '../theme.js'
import Icon from '../components/Icon.jsx'
import { Card, Kicker, SegBar } from '../components/ui.jsx'
import RiskTrendChart from '../components/charts/RiskTrendChart.jsx'
import { AD, AD_MONTHS } from '../data/adoption.js'

export default function AdoptionDrill() {
  const { state, set } = useStore()
  const cohort = state.adCohort === 'agents' ? 'agents' : 'users'
  const d = AD[cohort]
  const month = state.adMonth == null ? 5 : state.adMonth
  const moved = d.moved[month]

  const Tab = ({ id, label }) => {
    const active = cohort === id
    return (
      <button onClick={() => set({ adCohort: id })} style={{
        fontSize: 13, fontWeight: active ? 600 : 500, color: active ? '#fff' : C.sec,
        background: active ? C.ink : '#fff', border: `1px solid ${active ? C.ink : C.line}`, padding: '7px 16px', borderRadius: 20,
      }}>{label}</button>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => set({ screen: 'overview' })} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: C.sec, background: '#fff', border: `1px solid ${C.line}`, padding: '8px 14px', borderRadius: 9 }}>
          <Icon name="arrowLeft" size={15} color={C.sec} /> Overview
        </button>
        <div style={{ fontSize: 16, fontWeight: 700 }}>Safe AI adoption</div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <Tab id="users" label="Users" />
          <Tab id="agents" label="Agents" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16, alignItems: 'start' }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
            <div style={{ fontSize: 15.5, fontWeight: 600 }}>{d.label} · risk mix</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.green }}>{d.head}</div>
            <div style={{ marginLeft: 'auto', fontSize: 12.5, color: C.ter }}>{d.total}</div>
          </div>
          <RiskTrendChart months={AD_MONTHS} low={d.low} med={d.med} high={d.high} selMonth={month} onPickMonth={(i) => set({ adMonth: i })} />
          <div style={{ display: 'flex', gap: 22, marginTop: 6, fontSize: 12.5 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: C.sec }}><span style={{ width: 10, height: 3, borderRadius: 2, background: C.green }} /> Low {d.low[month]}%</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: C.sec }}><span style={{ width: 10, height: 3, borderRadius: 2, background: C.warn }} /> Medium {d.med[month]}%</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: C.sec }}><span style={{ width: 10, height: 3, borderRadius: 2, background: C.red }} /> High {d.high[month]}%</span>
            <span style={{ marginLeft: 'auto', color: C.ter }}>Selected: <b style={{ color: C.ink }}>{AD_MONTHS[month]}</b> · click a month</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
            <div style={{ border: `1px solid ${C.line}`, borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: C.green }}>{moved ? '+' + moved.in : '—'}</div>
              <div style={{ fontSize: 12, color: C.sec, marginTop: 4 }}>{moved ? moved.inNote : 'baseline month — movement starts Mar'}</div>
            </div>
            <div style={{ border: `1px solid ${C.line}`, borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: C.red }}>{moved ? '−' + moved.out : '—'}</div>
              <div style={{ fontSize: 12, color: C.sec, marginTop: 4 }}>{moved ? moved.outNote : 'baseline month — movement starts Mar'}</div>
            </div>
          </div>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
              <div style={{ fontSize: 14.5, fontWeight: 600 }}>{d.bdTitle}</div>
              <div style={{ fontSize: 12, color: C.ter }}>{d.bdNote}</div>
            </div>
            {d.breakdown.map((b) => (
              <div key={b.name} onClick={() => set({ screen: d.to, stubLabel: d.label })} className="clickable" style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 5 }}>
                  <span style={{ color: C.ink, fontWeight: 500 }}>{b.name} <span style={{ color: C.ter }}>· {b.count}</span></span>
                  <span style={{ color: C.green, fontWeight: 600 }}>{b.low}% low</span>
                </div>
                <SegBar segs={[{ w: b.low, color: C.green }, { w: b.med, color: C.warn }, { w: b.high, color: C.red }]} height={8} />
              </div>
            ))}
          </Card>
          <Card>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
              <div style={{ fontSize: 14.5, fontWeight: 600 }}>{d.blkTitle}</div>
              <div style={{ fontSize: 12, color: C.ter }}>{d.blkNote}</div>
            </div>
            {d.blockers.map((bl) => (
              <div key={bl.label} className="clickable row-hover" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 8px', borderRadius: 8, marginBottom: 2 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, color: C.ink, fontWeight: 500 }}>{bl.label}</div>
                  <div style={{ fontSize: 11.5, color: C.ter }}>{bl.count}</div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.orange, whiteSpace: 'nowrap' }}>{bl.action} →</span>
              </div>
            ))}
            {d.autonomy && (
              <div style={{ marginTop: 12, background: 'rgba(22,162,73,0.06)', border: '1px solid rgba(22,162,73,0.2)', borderRadius: 10, padding: 12, fontSize: 12, color: 'rgb(17,110,55)', lineHeight: 1.5 }}>{d.autonomy}</div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
