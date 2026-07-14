import { useStore } from '../store.jsx'
import { C, mono } from '../theme.js'
import Icon from '../components/Icon.jsx'
import { Card, SectionTitle, SegBar, Kicker } from '../components/ui.jsx'
import AdoptionChart from '../components/charts/AdoptionChart.jsx'
import {
  kpis, coverage, funnel, autonomy, deployment, tokenSummary,
  tokenTeamsBase, tokenEngineersBase, tokenAgentsBase, adoptionTrend,
} from '../data/overview.js'

function LegendDot({ color, dashed, label }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.sec }}>
      {dashed
        ? <span style={{ width: 16, borderTop: `2px dashed ${color}` }} />
        : <span style={{ width: 16, height: 3, borderRadius: 2, background: color }} />}
      {label}
    </span>
  )
}

function Cohort({ label, head, cohort, onClick }) {
  return (
    <div className="clickable" onClick={onClick} style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{label}</div>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: C.green }}>{head}</div>
      </div>
      <AdoptionChart months={adoptionTrend.months} observedCount={adoptionTrend.observedCount}
        cohort={cohort} packs={adoptionTrend.packs} />
    </div>
  )
}

function TokenColumn({ title, rows, onPick }) {
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <Kicker style={{ marginBottom: 10 }}>{title}</Kicker>
      {rows.map((r) => (
        <div key={r.name} onClick={() => onPick(r.name)} className="clickable" style={{ marginBottom: 11 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 4 }}>
            <span style={{ fontFamily: title === 'BY AGENT' ? mono : 'inherit', color: C.ink, fontWeight: 500 }}>{r.name}</span>
            <span style={{ color: C.sec }}><b style={{ color: C.ink }}>{r.tokens}</b> · {r.cost}</span>
          </div>
          <div style={{ height: 5, background: C.chip, borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: r.w + '%', height: '100%', background: C.orange, borderRadius: 3 }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Overview() {
  const { state, set } = useStore()
  const goCost = (dim, name) => set({ screen: 'costdrill', costDim: dim, costSel: name, costDay: null })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontSize: 13.5, color: C.sec }}>Fleet posture across device, DIY cloud and SaaS agents</span>
        <span style={{ fontSize: 12.5, color: C.ter }}>Updated 2 min ago</span>
      </div>

      {/* Safe AI adoption */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 15.5, fontWeight: 600 }}>Safe AI adoption · last 6 months + forecast</div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <LegendDot color={C.green} label="Low risk" />
            <LegendDot color={C.warn} label="Medium risk" />
            <LegendDot color={C.red} label="High risk" />
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.sec }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.orange }} /> Pack shipped</span>
            <LegendDot color={C.ter} dashed label="Forecast" />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 30 }}>
          <Cohort label="Users" head={adoptionTrend.users.head} cohort={adoptionTrend.users} onClick={() => set({ screen: 'adoptiondrill', adCohort: 'users' })} />
          <Cohort label="Agents" head={adoptionTrend.agents.head} cohort={adoptionTrend.agents} onClick={() => set({ screen: 'adoptiondrill', adCohort: 'agents' })} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8, flexWrap: 'wrap' }}>
          {adoptionTrend.chips.map((c, i) => (
            <span key={i} style={{
              fontSize: 12, fontFamily: mono, color: c.active ? C.orangeDeep : C.sec,
              background: c.active ? C.softOrange : '#fff', border: `1px solid ${c.active ? 'transparent' : C.line}`,
              padding: '4px 10px', borderRadius: 20, fontWeight: c.active ? 600 : 500,
            }}>{c.label}</span>
          ))}
          <button onClick={() => set({ screen: 'policy' })} style={{ marginLeft: 'auto', fontSize: 13, fontWeight: 600, color: C.orange }}>View policy packs →</button>
        </div>
        <div style={{ marginTop: 12, fontSize: 12.5, color: C.ter, lineHeight: 1.5 }}>
          Solid lines are observed share by risk level; markers show where each policy pack shipped. Dashed lines project the trend assuming v42 · data-residency ships in August. Click a chart to drill down.
        </div>
      </Card>

      {/* Deployment stage */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Deployment stage</div>
          <div style={{ fontSize: 13, color: C.ter }}>{deployment.total}</div>
        </div>
        <SegBar segs={deployment.segs.map((s) => ({ w: s.pct, color: s.color }))} height={14} />
        <div style={{ display: 'flex', gap: 22, marginTop: 12, fontSize: 12.5, color: C.sec }}>
          {deployment.segs.map((s) => (
            <span key={s.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
              <span style={{ width: 9, height: 9, borderRadius: 2, background: s.color }} />
              {s.label} · <b style={{ color: C.ink }}>{s.n}</b> ({s.pct}%)
            </span>
          ))}
        </div>
      </Card>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
        {kpis.map((k) => (
          <Card key={k.label} pad={18}>
            <div style={{ fontSize: 13, color: C.sec, marginBottom: 8 }}>{k.label}</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: -1, color: C.ink, lineHeight: 1 }}>{k.value}</div>
            <div style={{ fontSize: 12.5, color: k.subColor, marginTop: 8 }}>{k.sub}</div>
          </Card>
        ))}
      </div>

      {/* Token usage & cost */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 12, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Token usage &amp; cost · June</div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'baseline', gap: 18, fontSize: 13, color: C.sec }}>
            <span>Total tokens <b style={{ color: C.ink }}>{tokenSummary.totalTokens}</b></span>
            <span>Total cost <b style={{ color: C.ink }}>{tokenSummary.totalCost}</b></span>
            <span style={{ color: C.green, fontWeight: 600 }}>{tokenSummary.delta}</span>
            <button onClick={() => set({ screen: 'costdrill', costSel: null, costDay: null })} style={{ fontSize: 13, fontWeight: 600, color: C.orange }}>View breakdown →</button>
          </div>
        </div>
        <SegBar segs={tokenSummary.segs.map((s) => ({ w: s.pct, color: s.color }))} height={12} />
        <div style={{ display: 'flex', gap: 22, marginTop: 12, marginBottom: 20, fontSize: 12.5, color: C.sec }}>
          {tokenSummary.segs.map((s) => (
            <span key={s.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
              <span style={{ width: 9, height: 9, borderRadius: 2, background: s.color }} /> {s.label} · <b style={{ color: C.ink }}>{s.detail}</b>
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 42, borderTop: `1px solid ${C.line}`, paddingTop: 18 }}>
          <TokenColumn title="BY TEAM" rows={tokenTeamsBase} onPick={(n) => goCost('team', n)} />
          <TokenColumn title="BY ENGINEER" rows={tokenEngineersBase} onPick={(n) => goCost('engineer', n)} />
          <TokenColumn title="BY AGENT" rows={tokenAgentsBase} onPick={(n) => goCost('agent', n)} />
        </div>
      </Card>

      {/* Coverage + Judgment ladder */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card>
          <SectionTitle title="Coverage by agent class" note="inventory · usage · attribution" />
          {coverage.map((c) => (
            <div key={c.cls} style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: C.chip, display: 'grid', placeItems: 'center' }}>
                  <Icon name={c.icon} size={17} color={C.sec} />
                </div>
                <div style={{ flex: '0 0 130px' }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>{c.cls} · <span style={{ color: C.sec }}>{c.count}</span></div>
                  <div style={{ fontSize: 11.5, color: C.ter }}>{c.breakdown}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <SegBar segs={c.segs} height={8} />
                  <div style={{ fontSize: 11, color: C.ter, marginTop: 6 }}>{c.planes}</div>
                </div>
              </div>
            </div>
          ))}
        </Card>
        <Card>
          <SectionTitle title="Judgment ladder" note={null} right={<span style={{ fontSize: 12, color: C.ter }}>4M signals</span>} />
          {funnel.map((f) => (
            <div key={f.name} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                <span style={{ fontWeight: 500, color: C.ink }}>{f.name}</span>
                <span style={{ color: C.sec }}>{f.share}</span>
              </div>
              <div style={{ height: 6, background: C.chip, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: f.w + '%', height: '100%', background: f.color, borderRadius: 4 }} />
              </div>
            </div>
          ))}
          <div style={{ marginTop: 22 }}>
            <Kicker style={{ marginBottom: 12 }}>Autonomy distribution</Kicker>
            <SegBar segs={autonomy} height={12} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 12 }}>
              {autonomy.map((a) => (
                <span key={a.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.sec }}>
                  <span style={{ width: 9, height: 9, borderRadius: 2, background: a.color }} /> {a.legend}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
