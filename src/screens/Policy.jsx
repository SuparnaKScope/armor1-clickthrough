import { useStore } from '../store.jsx'
import { C, mono } from '../theme.js'
import { Card, Badge, Kicker } from '../components/ui.jsx'
import Icon from '../components/Icon.jsx'
import ImpactSpline from '../components/charts/ImpactSpline.jsx'
import { rawBundles, rawRules, decorateRule, ruleDetailFor, adoptionImpact, heldBack } from '../data/policy.js'

function Pill({ children, bg, color }) {
  return <span style={{ background: bg, color, fontFamily: mono, fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 5 }}>{children}</span>
}

export default function Policy() {
  const { state, set } = useStore()
  const selBundle = state.selBundle
  const bundleObj = rawBundles.find((b) => b.version === selBundle) || rawBundles[1]
  const ruleDet = ruleDetailFor(state.selRule, selBundle)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 16, alignItems: 'start' }}>
      {/* Bundle list */}
      <div>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Policy bundles</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {rawBundles.map((b) => (
            <Card key={b.version} pad={16} onClick={() => set({ selBundle: b.version })}
              style={{ borderColor: selBundle === b.version ? C.orange : C.line, borderWidth: selBundle === b.version ? 1.5 : 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontFamily: mono, fontSize: 14, fontWeight: 700, color: C.ink }}>{b.version}</span>
                <Badge bg={b.statusBg} color={b.statusColor}>{b.status}</Badge>
              </div>
              <div style={{ fontSize: 12, color: C.sec, lineHeight: 1.5, marginBottom: 8 }}>{b.desc}</div>
              <div style={{ fontSize: 11, color: C.ter }}>{b.meta}</div>
            </Card>
          ))}
        </div>
        <div style={{ fontSize: 11.5, color: C.ter, marginTop: 14, lineHeight: 1.55 }}>
          Bundles are signed and versioned. One-click rollback; new rules carry a blast-radius cap — monitor-only for the first 7 days.
        </div>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Card pad={0} style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 20px', borderBottom: `1px solid ${C.line}` }}>
            <div style={{ fontSize: 15.5, fontWeight: 600 }}>Bundle {bundleObj.version}</div>
            <div style={{ fontSize: 12.5, color: C.ter }}>{bundleObj.meta}</div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 600, color: C.ink, border: `1px solid ${C.line}`, padding: '7px 13px', borderRadius: 8 }}><Icon name="rollback" size={14} color={C.sec} /> Rollback</button>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 600, color: '#fff', background: C.orange, padding: '7px 13px', borderRadius: 8 }}><Icon name="diff" size={14} color="#fff" /> Diff vs previous</button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '128px 1fr 148px 108px 62px 90px 78px', padding: '11px 20px', borderBottom: `1px solid ${C.line}`, fontSize: 10.5, fontWeight: 600, letterSpacing: 0.5, color: C.ter }}>
            <div>RULE</div><div>NAME</div><div>FAMILY</div><div>TIER</div><div>AUTON.</div><div>PRECISION</div><div>STATUS</div>
          </div>
          {rawRules.map((raw) => {
            const r = decorateRule(raw, state.selRule)
            return (
              <div key={r.id} onClick={() => set({ selRule: r.id })} className="clickable"
                style={{ display: 'grid', gridTemplateColumns: '128px 1fr 148px 108px 62px 90px 78px', alignItems: 'center', padding: '12px 20px', borderBottom: `1px solid ${C.chip}`, fontSize: 12.5, background: r.bg }}>
                <div style={{ fontFamily: mono, fontSize: 11.5, color: C.sec }}>{r.id}</div>
                <div style={{ color: C.ink, paddingRight: 10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.name}</div>
                <div style={{ fontFamily: mono, fontSize: 10.5, color: C.sec }}>{r.family}</div>
                <div><Pill bg={r.tierBg} color={r.tierColor}>{r.tier}</Pill></div>
                <div><Pill bg={r.autBg} color={r.autColor}>{r.autonomy}</Pill></div>
                <div style={{ fontFamily: mono, fontSize: 11.5, color: r.precColor, fontWeight: 600 }}>{r.precision}</div>
                <div style={{ fontSize: 12, color: r.statusColor, fontWeight: 500 }}>{r.status}</div>
              </div>
            )
          })}
        </Card>

        {/* Rule detail */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
            <span style={{ fontFamily: mono, fontSize: 14, fontWeight: 700, color: C.ink }}>{ruleDet.id}</span>
            <span style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>{ruleDet.name}</span>
            <span style={{ marginLeft: 'auto', fontSize: 12, color: C.ter }}>compiled {ruleDet.compiled}</span>
          </div>
          <div style={{ fontSize: 13, color: C.sec, lineHeight: 1.6, marginBottom: 18 }}>{ruleDet.desc}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            <div style={{ border: `1px solid ${C.line}`, borderRadius: 10, padding: 14 }}>
              <Kicker style={{ marginBottom: 10 }}>Provenance</Kicker>
              {ruleDet.provenance.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 7, fontSize: 12, color: C.sec, marginBottom: 8, lineHeight: 1.45 }}><span style={{ color: C.ter }}>·</span> {p}</div>
              ))}
            </div>
            <div style={{ border: `1px solid ${C.line}`, borderRadius: 10, padding: 14 }}>
              <Kicker style={{ marginBottom: 10 }}>Validation</Kicker>
              <div style={{ fontSize: 12.5, color: C.sec, lineHeight: 1.8 }}>
                <div>Golden corpus <b style={{ color: C.green }}>{ruleDet.corpus}</b></div>
                <div>Historical replay FP rate <b style={{ color: C.green }}>{ruleDet.fp}</b></div>
                <div>Rollout: {ruleDet.rollout}</div>
                <div>Human review: {ruleDet.review}</div>
              </div>
            </div>
            <div style={{ border: `1px solid ${C.line}`, borderRadius: 10, padding: 14 }}>
              <Kicker style={{ marginBottom: 10 }}>Autonomy</Kicker>
              <div style={{ fontSize: 12.5, color: C.sec, lineHeight: 1.6 }}>
                <div style={{ marginBottom: 4 }}>Current level <b style={{ color: C.ink }}>{ruleDet.autonomy}</b></div>
                <div style={{ marginBottom: 8 }}>Trailing precision <b style={{ color: C.green }}>{ruleDet.precision}</b></div>
                <div style={{ color: C.ter, fontSize: 11.5 }}>{ruleDet.autonomyNote}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Bottom two cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 4 }}>
              <div style={{ fontSize: 14.5, fontWeight: 600 }}>Adoption impact of shipped packs</div>
              <div style={{ marginLeft: 'auto', fontSize: 12.5, fontWeight: 600, color: C.green }}>low-risk share 34% → 72%</div>
            </div>
            <ImpactSpline months={adoptionImpact.months} low={adoptionImpact.low} packs={adoptionImpact.packs} />
            <div style={{ marginTop: 10, borderTop: `1px solid ${C.line}`, paddingTop: 12 }}>
              {adoptionImpact.legend.map((l) => (
                <div key={l.v} style={{ display: 'flex', gap: 12, fontSize: 12.5, marginBottom: 8 }}>
                  <span style={{ fontFamily: mono, fontWeight: 700, color: C.ink, width: 42 }}>{l.v}</span>
                  <span style={{ color: C.sec, flex: 1 }}>{l.name}</span>
                  <span style={{ color: C.green, fontWeight: 600, textAlign: 'right' }}>{l.gain}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
              <div style={{ fontSize: 14.5, fontWeight: 600 }}>Held back by policy</div>
              <div style={{ fontSize: 12, color: C.ter }}>what ships next unlocks adoption</div>
            </div>
            {heldBack.map((h) => (
              <div key={h.title} style={{ border: `1px solid ${C.line}`, borderRadius: 10, padding: 14, marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{h.title}</div>
                  <Badge bg={h.badgeBg} color={h.badgeColor} style={{ marginLeft: 'auto' }}>{h.badge}</Badge>
                </div>
                <div style={{ fontSize: 12, color: C.sec, lineHeight: 1.5, marginBottom: 6 }}>{h.desc}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.green }}>{h.proj}</div>
              </div>
            ))}
            <div style={{ fontSize: 11.5, color: C.ter, marginTop: 4 }}>Projections re-derived nightly from the current medium-risk cohort.</div>
          </Card>
        </div>
      </div>
    </div>
  )
}
