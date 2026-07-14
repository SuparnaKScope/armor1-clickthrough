import { useStore } from '../store.jsx'
import { C, mono } from '../theme.js'
import Icon from '../components/Icon.jsx'
import { Card, Badge, Kicker, SegBar } from '../components/ui.jsx'
import CostDailyChart from '../components/charts/CostDailyChart.jsx'
import { buildCost, DIMS } from '../data/cost.js'

export default function CostDrill() {
  const { state, set } = useStore()
  const dim = state.costDim || 'team'
  const m = buildCost({ dim, selName: state.costSel, selDay: state.costDay })

  const Legend = ({ color, label, hatch }) => (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: C.sec }}>
      <span style={{ width: 11, height: 11, borderRadius: 3, background: hatch ? 'repeating-linear-gradient(45deg,rgba(233,89,12,0.5) 0 3px,rgba(233,89,12,0.14) 3px 6px)' : color }} />{label}
    </span>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <button onClick={() => set({ screen: 'overview' })} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: C.sec, background: '#fff', border: `1px solid ${C.line}`, padding: '8px 14px', borderRadius: 9 }}>
          <Icon name="arrowLeft" size={15} color={C.sec} /> Overview
        </button>
        <div style={{ fontSize: 16, fontWeight: 700 }}>Token usage &amp; cost — June 2026</div>
        <div style={{ fontSize: 12.5, color: C.ter }}>June actuals · July projected from current trend · list-price attribution</div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {['team', 'engineer', 'agent'].map((d) => (
            <button key={d} onClick={() => set({ costDim: d, costSel: null })} style={{
              fontSize: 12.5, fontWeight: dim === d ? 600 : 500, color: dim === d ? '#fff' : C.sec,
              background: dim === d ? C.ink : '#fff', border: `1px solid ${dim === d ? C.ink : C.line}`, padding: '7px 15px', borderRadius: 8,
            }}>{DIMS[d].label}</button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14 }}>
        {m.kpis.map((k) => (
          <Card key={k.label} pad={16}>
            <Kicker style={{ marginBottom: 8 }}>{k.label}</Kicker>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5, color: C.ink, lineHeight: 1 }}>{k.value}</div>
            <div style={{ fontSize: 11.5, color: k.noteColor, marginTop: 7 }}>{k.note}</div>
          </Card>
        ))}
      </div>

      {/* Daily chart */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Daily cost &amp; projection — {m.scopeLabel}</div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Legend color={C.orange} label="Production" />
            <Legend color="rgb(253,186,114)" label="Internal dev" />
            <Legend hatch label="Projected · July" />
            <Legend color={C.red} label="Anomaly" />
          </div>
        </div>
        <CostDailyChart bars={m.cdBars} onPickDay={(day) => set({ costDay: day })} />
        <div style={{ fontSize: 11.5, color: C.ter, marginTop: 2, marginBottom: 14 }}>Projection: trailing 7-day average, weekday-adjusted · band widens with horizon · anomaly days excluded from trend</div>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center', borderTop: `1px solid ${C.line}`, paddingTop: 16 }}>
          <div><Kicker style={{ marginBottom: 5 }}>{m.selDayLabel} spend</Kicker><div style={{ fontSize: 16, fontWeight: 700 }}>{m.selDayCost} <span style={{ fontSize: 12, fontWeight: 400, color: C.ter }}>· {m.selDayTokens} tokens</span></div></div>
          <div><Kicker style={{ marginBottom: 5 }}>vs 30-day avg</Kicker><div style={{ fontSize: 16, fontWeight: 700, color: m.selDayDeltaColor }}>{m.selDayDelta}</div></div>
          <div><Kicker style={{ marginBottom: 5 }}>Top spender</Kicker><div style={{ fontSize: 14, fontWeight: 600, fontFamily: mono }}>{m.selDayTop}</div></div>
          <div style={{ flex: 1, fontSize: 12, color: C.sec, lineHeight: 1.45, maxWidth: 380 }}>{m.selDayNote}</div>
          {m.isAnom && <button onClick={() => set({ screen: 'incidents', incidentId: 'INC-0019' })} style={{ fontSize: 12.5, fontWeight: 600, color: C.ink, border: `1px solid ${C.line}`, background: '#fff', padding: '8px 14px', borderRadius: 20, whiteSpace: 'nowrap' }}>View finding</button>}
        </div>
      </Card>

      {/* By dim + All */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 16, alignItems: 'start' }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
            <div style={{ fontSize: 14.5, fontWeight: 600 }}>By {m.D.noun}</div>
            <div style={{ fontSize: 12, color: C.ter }}>{m.D.note}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 62px 62px 52px 1fr 62px', padding: '0 0 8px', fontSize: 10, fontWeight: 600, letterSpacing: 0.4, color: C.ter, borderBottom: `1px solid ${C.chip}` }}>
            <div>NAME</div><div style={{ textAlign: 'right' }}>TOKENS</div><div style={{ textAlign: 'right' }}>COST</div><div style={{ textAlign: 'right' }}>Δ MAY</div><div style={{ paddingLeft: 12 }}>BUDGET</div><div style={{ textAlign: 'right' }}>JUN→JUL</div>
          </div>
          {m.cdRows.map((r) => (
            <div key={r.name} onClick={() => set({ costSel: r.selected ? null : r.name })} className="clickable"
              style={{ display: 'grid', gridTemplateColumns: '1fr 62px 62px 52px 1fr 62px', alignItems: 'center', padding: '11px 0', borderBottom: `1px solid ${C.chip}`, fontSize: 12.5, background: r.selected ? 'rgb(255,244,237)' : 'transparent' }}>
              <div style={{ fontFamily: r.mono ? mono : 'inherit', fontWeight: r.selected ? 700 : 500, color: C.ink, fontSize: r.mono ? 12 : 12.5 }}>{r.name}</div>
              <div style={{ textAlign: 'right', fontWeight: 600 }}>{r.tokens}</div>
              <div style={{ textAlign: 'right', color: C.sec }}>{r.cost}</div>
              <div style={{ textAlign: 'right', color: r.deltaColor, fontWeight: 600 }}>{r.delta}</div>
              <div style={{ paddingLeft: 12 }}>
                <div style={{ display: 'flex', height: 8, background: C.chip, borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: r.budgetW + '%', background: r.budgetColor }} />
                  <div style={{ width: r.projExtW + '%', background: r.projBg }} />
                </div>
              </div>
              <div style={{ textAlign: 'right', fontFamily: mono, fontSize: 11, color: r.pctColor, fontWeight: 600 }}>{r.pct}</div>
            </div>
          ))}
          <div style={{ fontSize: 11.5, color: C.ter, marginTop: 12, lineHeight: 1.5 }}>Solid = June spend vs monthly budget · hatched = July projection at current trend. {m.breachNote} Click a row to scope the chart, detail and sessions.</div>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
            <div style={{ fontSize: 14.5, fontWeight: 600 }}>{m.scopeLabel}</div>
          </div>
          <div style={{ fontSize: 12, color: C.ter, marginBottom: 16 }}>{m.detMeta}</div>
          <Kicker style={{ marginBottom: 10 }}>By model</Kicker>
          {m.cdModels.map((mo) => (
            <div key={mo.name} style={{ marginBottom: 11 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                <span style={{ fontFamily: mono, color: C.ink }}>{mo.name}</span>
                <span style={{ color: C.sec }}><b style={{ color: C.ink }}>{mo.tokens}</b> · {mo.cost}</span>
              </div>
              <div style={{ height: 5, background: C.chip, borderRadius: 3, overflow: 'hidden' }}><div style={{ width: mo.w + '%', height: '100%', background: C.navy, borderRadius: 3 }} /></div>
            </div>
          ))}
          <Kicker style={{ margin: '18px 0 10px' }}>Token mix</Kicker>
          <SegBar segs={[{ w: m.mixP, color: C.orange }, { w: m.mixC, color: 'rgb(253,186,114)' }, { w: m.mixCa, color: C.green }]} height={12} />
          <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 11.5, color: C.sec, flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 9, height: 9, borderRadius: 2, background: C.orange }} /> Prompt {m.mixP}%</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 9, height: 9, borderRadius: 2, background: 'rgb(253,186,114)' }} /> Completion {m.mixC}%</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 9, height: 9, borderRadius: 2, background: C.green }} /> Cache read {m.mixCa}% <span style={{ color: C.ter }}>(90% cheaper)</span></span>
          </div>
          <div style={{ display: 'flex', gap: 22, marginTop: 18, borderTop: `1px solid ${C.line}`, paddingTop: 14 }}>
            <div><Kicker style={{ marginBottom: 5 }}>Cost / session</Kicker><div style={{ fontSize: 18, fontWeight: 700 }}>{m.perSession}</div></div>
            <div><Kicker style={{ marginBottom: 5 }}>Sessions</Kicker><div style={{ fontSize: 18, fontWeight: 700 }}>{m.sessCount}</div></div>
            <div><Kicker style={{ marginBottom: 5 }}>Avg tokens / session</Kicker><div style={{ fontSize: 18, fontWeight: 700 }}>{m.avgTokSession}</div></div>
          </div>
        </Card>
      </div>

      {/* Sessions + anomaly */}
      <Card pad={0} style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, padding: '16px 20px', borderBottom: `1px solid ${C.line}` }}>
          <div style={{ fontSize: 14.5, fontWeight: 600 }}>Most expensive sessions — {m.scopeLabel}</div>
          <div style={{ fontSize: 12, color: C.ter }}>June · cost attributed per run across all planes</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '110px 150px 1fr 84px 70px 84px 90px 62px', padding: '11px 20px', borderBottom: `1px solid ${C.line}`, fontSize: 10.5, fontWeight: 600, letterSpacing: 0.5, color: C.ter }}>
          <div>RUN</div><div>AGENT</div><div>USER</div><div style={{ textAlign: 'right' }}>TOKENS</div><div style={{ textAlign: 'right' }}>COST</div><div style={{ textAlign: 'right' }}>DURATION</div><div style={{ textAlign: 'center' }}>FLAG</div><div style={{ textAlign: 'right' }}></div>
        </div>
        {m.cdSessions.map((s) => (
          <div key={s.run} className="row-hover" style={{ display: 'grid', gridTemplateColumns: '110px 150px 1fr 84px 70px 84px 90px 62px', alignItems: 'center', padding: '12px 20px', borderBottom: `1px solid ${C.chip}`, fontSize: 12.5 }}>
            <div style={{ fontFamily: mono, fontSize: 11.5, color: C.sec }}>{s.run}</div>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.ink }}>{s.agent}</div>
            <div style={{ color: C.sec }}>{s.user}</div>
            <div style={{ textAlign: 'right', fontWeight: 600 }}>{s.tokens}</div>
            <div style={{ textAlign: 'right', color: C.ink, fontWeight: 600 }}>{s.cost}</div>
            <div style={{ textAlign: 'right', color: C.sec }}>{s.dur}</div>
            <div style={{ textAlign: 'center' }}>{s.flag !== '—' ? <Badge bg={s.flagBg} color={s.flagColor} mono style={{ fontSize: 10 }}>{s.flag}</Badge> : <span style={{ color: C.ter }}>—</span>}</div>
            <div style={{ textAlign: 'right' }}><button onClick={() => set({ screen: 'sessions' })} style={{ fontSize: 12, fontWeight: 600, color: C.orange }}>Trace →</button></div>
          </div>
        ))}
      </Card>

      {m.anomInScope && (
        <Card style={{ borderColor: 'rgba(220,40,40,0.3)', background: 'rgba(255,247,246,0.7)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Icon name="warning" size={16} color={C.red} />
            <div style={{ fontSize: 13.5, fontWeight: 600, color: C.red }}>Waste insight</div>
          </div>
          <div style={{ fontSize: 13, color: C.ink, lineHeight: 1.6, marginBottom: 12 }}>{m.anomText}</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => set({ screen: 'incidents', incidentId: 'INC-0019' })} style={{ fontSize: 12.5, fontWeight: 600, color: '#fff', background: C.orange, padding: '8px 14px', borderRadius: 8 }}>Open INC-0019</button>
            <button onClick={() => set({ screen: 'sessions' })} style={{ fontSize: 12.5, fontWeight: 600, color: C.ink, border: `1px solid ${C.line}`, padding: '8px 14px', borderRadius: 8 }}>Trace the run</button>
          </div>
        </Card>
      )}
    </div>
  )
}
