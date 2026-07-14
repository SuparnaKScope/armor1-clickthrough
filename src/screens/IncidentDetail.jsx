import { useStore } from '../store.jsx'
import { C, mono } from '../theme.js'
import Icon from '../components/Icon.jsx'
import { Card, Badge, Kicker } from '../components/ui.jsx'
import { incidents } from '../data/incidents.js'
import { caseFileFor } from '../data/caseFiles.js'
import PrModal from '../components/PrModal.jsx'

function Row({ k, v, vMono }) {
  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: 9, fontSize: 12.5 }}>
      <div style={{ width: 92, color: C.ter, flexShrink: 0 }}>{k}</div>
      <div style={{ color: C.ink, fontFamily: vMono ? mono : 'inherit', fontSize: vMono ? 12 : 12.5 }}>{v}</div>
    </div>
  )
}

function KillChain({ cf }) {
  return (
    <Card>
      <Kicker style={{ marginBottom: 16 }}>Kill chain</Kicker>
      {cf.killChain.map((s, i) => (
        <div key={i} style={{ display: 'flex', gap: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: s.dot, boxShadow: `0 0 0 4px ${s.dotRing}`, marginTop: 3 }} />
            <span style={{ flex: 1, width: 2, background: s.lineColor, minHeight: 30 }} />
          </div>
          <div style={{ paddingBottom: 22, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 4 }}>
              <span style={{ fontFamily: mono, fontSize: 12, color: C.sec }}>{s.t}</span>
              <Badge bg={s.planeBg} color={s.planeColor}>{s.plane}</Badge>
              {s.blocked && <Badge bg={C.red} color="#fff" mono>BLOCKED INLINE</Badge>}
            </div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: C.ink, marginBottom: 3 }}>{s.title}</div>
            <div style={{ fontSize: 12.5, color: C.sec, lineHeight: 1.5, marginBottom: 5 }}>{s.desc}</div>
            <div style={{ fontFamily: mono, fontSize: 11, color: C.ter }}>{s.digest}</div>
          </div>
        </div>
      ))}
    </Card>
  )
}

function RuleCompiler() {
  const { state, set } = useStore()
  const det = incidents.find((i) => i.id === state.incidentId) || incidents[0]
  const cf = caseFileFor(det)
  const compile = state.compile || 'idle'
  const stepIx = state.compileStep || 0

  const rawSteps = [
    { label: 'Distill predicate from reasoning trace ' + cf.traceId, detail: '3-feature predicate' },
    { label: 'Canonicalize features — strip tenant identifiers', detail: '0 identifying features kept' },
    { label: 'Replay against golden corpus', detail: '96/96 pass' },
    { label: 'False-positive sweep — 30-day decision replay', detail: '0.00% FP · 1.21M decisions' },
  ]
  const badge = {
    idle: { label: 'READY — TIER-4 COMPLETE', bg: C.chip, color: C.sec },
    running: { label: 'COMPILING', bg: C.softOrange, color: 'rgb(206,90,7)' },
    candidate: { label: 'CANDIDATE — AWAITING REVIEW', bg: C.softOrange, color: 'rgb(206,90,7)' },
    promoted: { label: 'SHIPPED — MONITOR-ONLY', bg: 'rgba(22,162,73,0.1)', color: C.green },
  }[compile]

  const start = () => {
    set({ compile: 'running', compileStep: 0 })
    ;[1, 2, 3].forEach((n) => setTimeout(() => set({ compileStep: n }), n * 800))
    setTimeout(() => set({ compile: 'candidate' }), 4 * 800)
  }

  const provenance = [
    det.id + ' @ this tenant — tier-4 adjudicated ' + (/today/.test(det.detectedLabel) ? 'today' : det.detected),
    'Reasoning trace ' + cf.traceId + ' → compiler run cc_v42_003',
    'Generalizes beyond this finding — matches the canonicalized ' + det.type + ' pattern fleet-wide',
  ]

  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <Icon name="refresh" size={17} color={C.orange} />
        <div style={{ fontSize: 14.5, fontWeight: 600 }}>Rule Compiler</div>
        <Badge bg={badge.bg} color={badge.color} mono style={{ marginLeft: 'auto' }}>{badge.label}</Badge>
      </div>
      <div style={{ fontSize: 12.5, color: C.sec, lineHeight: 1.55, marginBottom: 14 }}>
        Distills the tier-4 reasoning trace into a deterministic tier-1 rule — provenance-carrying, corpus-tested and versioned before it can ship.
      </div>

      {compile === 'idle' && (
        <button onClick={start} style={{ width: '100%', background: C.orange, color: '#fff', fontWeight: 600, fontSize: 13, padding: '11px', borderRadius: 9 }}>Compile candidate rule →</button>
      )}

      {compile !== 'idle' && (
        <div style={{ marginBottom: 14 }}>
          {rawSteps.map((cs, i) => {
            const done = i < stepIx || compile === 'candidate' || compile === 'promoted'
            const active = i === stepIx && compile === 'running'
            const icon = done ? 'checkCircle' : active ? 'circleNotch' : 'circleDashed'
            const col = done ? C.green : active ? C.orange : C.line
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0' }}>
                <Icon name={icon} size={16} color={col} className={active ? 'a1-spin' : ''} />
                <span style={{ flex: 1, fontSize: 12.5, color: done || active ? C.ink : C.ter, fontWeight: active ? 600 : 500 }}>{cs.label}</span>
                <span style={{ fontSize: 11.5, color: done ? C.green : C.ter, fontFamily: mono }}>{done ? cs.detail : active ? 'running…' : ''}</span>
              </div>
            )
          })}
        </div>
      )}

      {(compile === 'candidate' || compile === 'promoted') && (
        <>
          <div style={{ background: 'rgb(24,24,27)', borderRadius: 10, padding: 14, marginBottom: 14 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <Badge bg="rgba(255,255,255,0.1)" color="#fff" mono>{cf.candidateId}</Badge>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{cf.candidateName}</span>
            </div>
            <pre style={{ fontFamily: mono, fontSize: 11.5, color: '#e4e4e7', whiteSpace: 'pre-wrap', lineHeight: 1.6, margin: 0 }}>{cf.candidateCode}</pre>
          </div>
          <Kicker style={{ marginBottom: 8 }}>Provenance</Kicker>
          {provenance.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, fontSize: 12, color: C.sec, marginBottom: 6, lineHeight: 1.5 }}>
              <span style={{ color: C.ter }}>·</span> {p}
            </div>
          ))}
        </>
      )}

      {compile === 'candidate' && (
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <button onClick={() => set({ compile: 'promoted' })} style={{ flex: 1, background: C.orange, color: '#fff', fontWeight: 600, fontSize: 13, padding: '10px', borderRadius: 9 }}>Promote to bundle v42-rc</button>
          <button onClick={() => set({ compile: 'idle', compileStep: 0 })} style={{ fontSize: 13, fontWeight: 600, color: C.sec, border: `1px solid ${C.line}`, padding: '10px 16px', borderRadius: 9 }}>Discard</button>
        </div>
      )}
      {compile === 'promoted' && (
        <button onClick={() => set({ screen: 'policy', selBundle: 'v42-rc', selRule: 'DPE-R-2301' })}
          style={{ width: '100%', marginTop: 14, background: '#fff', color: C.ink, fontWeight: 600, fontSize: 13, padding: '10px', borderRadius: 9, border: `1px solid ${C.line}` }}>
          View in Policy Management →
        </button>
      )}
    </Card>
  )
}

export default function IncidentDetail() {
  const { state, set } = useStore()
  const det = incidents.find((i) => i.id === state.incidentId) || incidents[0]
  const cf = caseFileFor(det)

  const variantTabs = [
    ['A', 'A · Case file'], ['B', 'B · Evidence-first'], ['C', 'C · Timeline'],
  ]

  const narrative = (
    <Card>
      <Kicker style={{ marginBottom: 12 }}>Canonical narrative</Kicker>
      <div style={{ fontSize: 14.5, color: C.ink, lineHeight: 1.7, marginBottom: 14 }}>{cf.narrative1}</div>
      <div style={{ fontSize: 12.5, color: C.ter, lineHeight: 1.6 }}>{cf.narrative2}</div>
    </Card>
  )

  const suggestion = (
    <Card style={{ borderColor: 'rgba(233,89,12,0.35)', background: 'rgba(255,247,240,0.6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <Icon name="sparkle" size={16} color={C.orange} fill={C.orange} strokeWidth={0.5} />
        <div style={{ fontSize: 13.5, fontWeight: 600, color: C.orangeDeep }}>Armor1.ai suggestion:</div>
      </div>
      <div style={{ fontSize: 13.5, color: C.ink, lineHeight: 1.6, marginBottom: 14 }}>{cf.suggestion}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff', border: `1px solid ${C.line}`, borderRadius: 10, padding: 14 }}>
        <Icon name="diff" size={17} color={C.sec} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{cf.prTitle.replace(/^PR #\d+ — /, cf.prRef + ' — ')}</div>
          <div style={{ fontSize: 12, color: C.ter }}>Sandbox replay proof: <b style={{ color: C.green }}>{cf.prProof}</b> · regression watch armed after merge</div>
        </div>
        <button onClick={() => set({ prModal: true })} style={{ fontSize: 12.5, fontWeight: 600, color: '#fff', background: C.orange, padding: '8px 14px', borderRadius: 8, whiteSpace: 'nowrap' }}>Review PR</button>
      </div>
    </Card>
  )

  const enforcement = (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <Badge bg={cf.actionBg} color="#fff" mono>{cf.action}</Badge>
        <div style={{ fontSize: 14.5, fontWeight: 600 }}>Enforcement record</div>
      </div>
      <Row k="Rule" v={cf.ruleId} vMono />
      <Row k="Name" v={cf.ruleName} />
      <Row k="Bundle" v={cf.bundle} vMono />
      <Row k="Tier" v={'Compiled rule — deterministic'} />
      <Row k="Decision" v={cf.decisionText} />
      <Row k="Input digest" v={cf.digest} vMono />
      <button style={{ width: '100%', marginTop: 8, background: '#fff', border: `1px solid ${C.line}`, color: C.ink, fontWeight: 600, fontSize: 13, padding: '10px', borderRadius: 9 }}>Replay this decision</button>
      <div style={{ fontSize: 11.5, color: C.ter, textAlign: 'center', marginTop: 10, lineHeight: 1.5 }}>The decision was a rule we can show you — not a model we ask you to trust.</div>
    </Card>
  )

  const evidence = (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>Evidence — {cf.claimsLabel}</div>
        <button onClick={() => set({ screen: 'sessions', sessionRun: det.id === 'INC-0045' ? 'run_9c4e2b' : det.id === 'INC-0046' ? 'run_6dfe7e' : 'run_7f3a12', selNode: det.id === 'INC-0045' ? 'c2' : det.id === 'INC-0046' ? 'g4' : 'n4' })}
          style={{ marginLeft: 'auto', fontSize: 12.5, fontWeight: 600, color: C.orange }}>Open session graph</button>
      </div>
      {cf.claims.map((c, i) => (
        <div key={i} style={{ border: `1px solid ${C.line}`, borderRadius: 10, padding: '11px 13px', marginBottom: 9 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Badge bg={c.planeBg} color={c.planeColor}>{c.plane}</Badge>
            <span style={{ fontFamily: mono, fontSize: 11, color: C.ter }}>{c.digest}</span>
            <span style={{ marginLeft: 'auto', fontSize: 11, color: C.ter }}>{c.tier}</span>
          </div>
          <div style={{ fontSize: 12.5, color: C.ink, lineHeight: 1.45 }}>{c.statement}</div>
        </div>
      ))}
    </Card>
  )

  const playbook = (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{cf.playbookName}</div>
      </div>
      <div style={{ fontFamily: mono, fontSize: 11, color: C.ter, marginBottom: 14 }}>{cf.playbookMeta}</div>
      {cf.playbook.map((p, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 11, marginBottom: 12 }}>
          <Icon name={p.icon} size={16} color={p.iconColor} style={{ marginTop: 1, flexShrink: 0 }} />
          <div style={{ flex: 1, fontSize: 12.5, color: C.ink, lineHeight: 1.45 }}>{p.action}</div>
          <span style={{ fontFamily: mono, fontSize: 11, color: C.ter, whiteSpace: 'nowrap' }}>{p.t}</span>
        </div>
      ))}
    </Card>
  )

  const leftOrder = state.variant === 'B'
    ? [evidence, narrative, <KillChain key="kc" cf={cf} />, suggestion, <RuleCompiler key="rc" />]
    : state.variant === 'C'
    ? [<KillChain key="kc" cf={cf} />, narrative, suggestion, <RuleCompiler key="rc" />]
    : [narrative, <KillChain key="kc" cf={cf} />, suggestion, <RuleCompiler key="rc" />]

  const rightOrder = state.variant === 'B' ? [enforcement, playbook] : [enforcement, evidence, playbook]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <button onClick={() => set({ incidentId: null })} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: C.sec, alignSelf: 'flex-start' }}>
        <Icon name="arrowLeft" size={15} color={C.sec} /> Findings
      </button>

      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: mono, fontSize: 13, color: C.sec }}>{det.id}</span>
          <Badge bg={det.sevBg} color={det.sevColor}>{det.severity}</Badge>
          <Badge bg="rgba(38,49,74,0.08)" color={C.navy}>{det.status}</Badge>
          <Badge bg={C.chip} color={C.sec} mono>{det.type}</Badge>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 4, background: C.chip, padding: 3, borderRadius: 9 }}>
            {variantTabs.map(([v, label]) => (
              <button key={v} onClick={() => set({ variant: v })} style={{
                fontSize: 12.5, fontWeight: state.variant === v ? 600 : 500, color: state.variant === v ? C.ink : C.sec,
                background: state.variant === v ? '#fff' : 'transparent', boxShadow: state.variant === v ? '0 1px 2px rgba(26,26,26,0.1)' : 'none',
                padding: '6px 12px', borderRadius: 7,
              }}>{label}</button>
            ))}
          </div>
        </div>
        <div style={{ fontSize: 21, fontWeight: 700, color: C.ink, letterSpacing: -0.3, marginBottom: 10, lineHeight: 1.3 }}>{det.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 13, color: C.sec, flexWrap: 'wrap' }}>
          <span>Agent <b style={{ color: C.ink }}>{det.agent}</b></span>
          <span>Class <b style={{ color: C.ink }}>{det.cls}</b></span>
          <span>Run <span style={{ fontFamily: mono, color: C.ink }}>{cf.runId}</span></span>
          <span>Correlation θ <b style={{ color: det.corrColor }}>{det.corr}</b></span>
          <span>Detected <b style={{ color: C.ink }}>{det.detectedLabel}</b></span>
          <span style={{ marginLeft: 'auto', fontFamily: mono, fontSize: 11.5, color: C.ter }}>{cf.mitre}</span>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 440px', gap: 16, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{leftOrder.map((el, i) => <div key={i}>{el}</div>)}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{rightOrder.map((el, i) => <div key={i}>{el}</div>)}</div>
      </div>

      {state.prModal && <PrModal det={det} cf={cf} />}
    </div>
  )
}
