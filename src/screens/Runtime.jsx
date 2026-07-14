import { useStore } from '../store.jsx'
import { C, mono } from '../theme.js'
import { Card, Badge } from '../components/ui.jsx'
import Icon from '../components/Icon.jsx'
import { runtimeKpis, rawStepUps, decisions } from '../data/runtime.js'

export default function Runtime() {
  const { state, set } = useStore()
  const resolve = (id, verdict) => set({ resolved: { ...state.resolved, [id]: verdict } })
  const stepUps = rawStepUps.filter((s) => !state.resolved[s.id])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14 }}>
        {runtimeKpis.map((k) => (
          <Card key={k.label} pad={16}>
            <div style={{ fontSize: 12.5, color: C.sec, marginBottom: 8 }}>{k.label}</div>
            <div style={{ fontSize: 27, fontWeight: 700, letterSpacing: -0.6, color: k.color, lineHeight: 1 }}>{k.value}</div>
            <div style={{ fontSize: 12, color: C.ter, marginTop: 8 }}>{k.sub}</div>
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ fontSize: 15.5, fontWeight: 600 }}>Step-up queue</div>
            {stepUps.length > 0 && <Badge bg={C.softOrange} color={C.orangeDeep}>{stepUps.length} pending</Badge>}
            <span style={{ fontSize: 12.5, color: C.ter }}>human judgment requested by policy</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {stepUps.length === 0 && (
              <Card style={{ textAlign: 'center', padding: 40 }}>
                <Icon name="checkCircle" size={30} color={C.green} style={{ margin: '0 auto 12px' }} />
                <div style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>Queue clear</div>
                <div style={{ fontSize: 12.5, color: C.ter, marginTop: 4 }}>All step-ups adjudicated. New requests appear here.</div>
              </Card>
            )}
            {stepUps.map((s) => (
              <Card key={s.id} pad={18}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
                  <Badge bg={C.softOrange} color={C.orangeDeep} mono>STEP-UP</Badge>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: C.ink }}>{s.action}</div>
                  <span style={{ marginLeft: 'auto', fontFamily: mono, fontSize: 11, color: C.ter, whiteSpace: 'nowrap' }}>{s.t}</span>
                </div>
                <div style={{ fontSize: 12.5, color: C.sec, lineHeight: 1.55, marginBottom: 10 }}>{s.context}</div>
                <div style={{ fontFamily: mono, fontSize: 11, color: C.ter, marginBottom: 14 }}>{s.rule} · {s.agent} · {s.autonomy}</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={() => resolve(s.id, 'approved')} style={{ background: C.green, color: '#fff', fontWeight: 600, fontSize: 12.5, padding: '8px 16px', borderRadius: 8 }}>Approve once</button>
                  <button onClick={() => resolve(s.id, 'denied')} style={{ background: C.red, color: '#fff', fontWeight: 600, fontSize: 12.5, padding: '8px 16px', borderRadius: 8 }}>Deny</button>
                  <button style={{ color: C.sec, fontWeight: 600, fontSize: 12.5, padding: '8px 16px', borderRadius: 8, border: `1px solid ${C.line}` }}>Propose rule change</button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ fontSize: 15.5, fontWeight: 600 }}>Inline decision log</div>
            <span style={{ fontSize: 12.5, color: C.ter }}>every decision replayable · rule id + bundle + input digest</span>
          </div>
          <Card pad={0} style={{ overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '78px 84px 1fr 108px 62px 66px', padding: '11px 16px', borderBottom: `1px solid ${C.line}`, fontSize: 10.5, fontWeight: 600, letterSpacing: 0.5, color: C.ter }}>
              <div>TIME</div><div>VERDICT</div><div>ACTION</div><div>RULE</div><div>TIER</div><div>LATENCY</div>
            </div>
            {decisions.map((d, i) => (
              <div key={i} className="row-hover" style={{ display: 'grid', gridTemplateColumns: '78px 84px 1fr 108px 62px 66px', alignItems: 'center', padding: '11px 16px', borderBottom: `1px solid ${C.chip}`, fontSize: 12.5 }}>
                <div style={{ fontFamily: mono, fontSize: 11.5, color: C.sec }}>{d.t}</div>
                <div><Badge bg={d.vBg} color={d.vColor} mono style={{ fontSize: 10.5 }}>{d.verdict}</Badge></div>
                <div style={{ color: C.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 10 }}>{d.action}</div>
                <div style={{ fontFamily: mono, fontSize: 11, color: C.sec }}>{d.rule}</div>
                <div style={{ fontSize: 11.5, color: C.ter }}>{d.tier}</div>
                <div style={{ fontFamily: mono, fontSize: 11, color: C.ter }}>{d.lat}</div>
              </div>
            ))}
          </Card>
          <div style={{ fontSize: 12, color: C.ter, marginTop: 12, lineHeight: 1.5 }}>
            Engine runs at the customer edge. No network calls to frontier models on the hot path — p99 budget 10 ms, measured 0.9 ms.
          </div>
        </div>
      </div>
    </div>
  )
}
