import { useMemo } from 'react'
import ReactFlow, { Handle, Position, Background } from 'reactflow'
import 'reactflow/dist/style.css'
import { useStore } from '../store.jsx'
import { C, mono } from '../theme.js'
import { Card, Badge, Mono } from '../components/ui.jsx'
import { runDefs, laneTop, NODE_W, NODE_H } from '../data/sessions.js'
import { planeStyle } from '../theme.js'

const LANE_META = {
  LLM: { label: 'CLAIMED — LLM PLANE', bg: 'rgba(38,49,74,0.05)', color: C.navy },
  Hooks: { label: 'DECIDED — HOOKS', bg: 'rgba(233,89,12,0.05)', color: C.orange },
  OTel: { label: 'OBSERVED — OTEL / INFRA', bg: 'rgba(22,162,73,0.05)', color: C.green },
}
const LANE_H = 132

function StepNode({ data }) {
  const s = data
  return (
    <div style={{
      width: NODE_W, minHeight: NODE_H, background: '#fff', borderRadius: 10, padding: '9px 11px',
      border: `1.5px solid ${s.border}`, boxShadow: s.shadow, cursor: 'pointer', boxSizing: 'border-box',
    }}>
      <Handle type="target" position={Position.Left} id="l" style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Top} id="t" style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} id="r" style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} id="b" style={{ opacity: 0 }} />
      <div style={{ fontFamily: mono, fontSize: 10.5, color: C.ter, marginBottom: 3 }}>{s.t}</div>
      <div style={{ fontSize: 12, fontWeight: 700, color: C.ink, lineHeight: 1.25, marginBottom: 3 }}>{s.title}</div>
      <div style={{ fontSize: 10.5, color: s.subColor, lineHeight: 1.3 }}>{s.sub}</div>
    </div>
  )
}
function LaneNode({ data }) {
  return (
    <div style={{ width: data.w, height: LANE_H, background: data.bg, borderRadius: 10 }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 0.8, color: data.color, padding: '8px 12px' }}>{data.label}</div>
    </div>
  )
}
const nodeTypes = { step: StepNode, lane: LaneNode }

export default function Sessions() {
  const { state, set } = useStore()
  const runId = runDefs[state.sessionRun] ? state.sessionRun : 'run_7f3a12'
  const rd = runDefs[runId]
  const activeNode = rd.rawNodes.some((n) => n.id === state.selNode) ? state.selNode : rd.defaultNode

  const { nodes, edges } = useMemo(() => {
    const col = (i) => 20 + i * 150
    const laneNodes = Object.keys(laneTop).map((lane) => ({
      id: 'lane-' + lane, type: 'lane', position: { x: -10, y: laneTop[lane] }, draggable: false, selectable: false,
      data: { ...LANE_META[lane], w: rd.width }, zIndex: 0, focusable: false,
    }))
    const stepNodes = rd.rawNodes.map((n) => {
      const selected = activeNode === n.id
      const hot = rd.hotIds.indexOf(n.id) !== -1
      const border = selected ? C.orange : n.id === rd.blockId ? C.red : hot ? 'rgba(251,146,60,0.7)' : C.line
      return {
        id: n.id, type: 'step', position: { x: col(n.cx), y: laneTop[n.lane] + 22 }, draggable: false,
        data: { ...n, border, shadow: selected ? '0 0 0 3px rgba(233,89,12,0.15)' : '0 1px 3px rgba(26,26,26,0.1)', subColor: hot ? 'rgb(194,98,17)' : C.ter },
        zIndex: 2,
      }
    })
    const hmap = { seq: ['r', 'l'], vert: ['b', 't'], step: ['r', 'l'] }
    const edgs = rd.edgeSpec.map(([kind, a, b, div], i) => {
      const [sh, th] = hmap[kind]
      return {
        id: 'e' + i, source: a, target: b, sourceHandle: sh, targetHandle: th, type: 'smoothstep',
        style: { stroke: div ? C.red : 'rgb(200,200,203)', strokeWidth: 2, strokeDasharray: div ? '5 5' : undefined },
        animated: !!div, zIndex: 1,
      }
    })
    return { nodes: [...laneNodes, ...stepNodes], edges: edgs }
  }, [runId, activeNode])

  const sel = rd.rawNodes.find((n) => n.id === activeNode) || rd.rawNodes[0]
  const selPlane = sel.id === rd.blockId ? 'DPE' : sel.lane
  const pStyle = planeStyle[selPlane]

  const runTabs = Object.keys(runDefs)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 4, background: C.chip, padding: 3, borderRadius: 9 }}>
          {runTabs.map((k) => (
            <button key={k} onClick={() => set({ sessionRun: k, selNode: runDefs[k].defaultNode })} style={{
              fontSize: 12.5, fontWeight: runId === k ? 600 : 500, color: runId === k ? C.ink : C.sec,
              background: runId === k ? '#fff' : 'transparent', boxShadow: runId === k ? '0 1px 2px rgba(26,26,26,0.1)' : 'none',
              padding: '6px 12px', borderRadius: 7,
            }}>{runDefs[k].incidentId} · {runDefs[k].agent}</button>
          ))}
        </div>
        <Mono style={{ background: '#fff', border: `1px solid ${C.line}`, padding: '6px 12px', borderRadius: 8, color: C.ink }}>{runId}</Mono>
        <span style={{ fontSize: 13, color: C.sec }}>{rd.agent} · started {rd.started} · {rd.steps}</span>
        <Badge bg="rgba(22,162,73,0.1)" color={C.green} style={{ marginLeft: 4 }}>Correlation health {rd.corr}</Badge>
      </div>
      <button onClick={() => set({ screen: 'incidents', incidentId: rd.incidentId })}
        style={{ alignSelf: 'flex-start', fontSize: 13, fontWeight: 600, color: C.ink, background: '#fff', border: `1px solid ${C.line}`, padding: '8px 14px', borderRadius: 9 }}>Open {rd.incidentId}</button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 16, alignItems: 'start' }}>
        <Card pad={16}>
          <div style={{ height: 470, borderRadius: 10 }}>
            <ReactFlow
              nodes={nodes} edges={edges} nodeTypes={nodeTypes}
              fitView fitViewOptions={{ padding: 0.08 }}
              nodesDraggable={false} nodesConnectable={false} elementsSelectable
              zoomOnScroll={false} zoomOnPinch={false} zoomOnDoubleClick={false}
              panOnDrag={false} panOnScroll={false} preventScrolling={false} proOptions={{ hideAttribution: true }}
              onNodeClick={(e, n) => { if (n.type === 'step') set({ selNode: n.id }) }}
            >
              <Background color="#f0f0f0" gap={0} />
            </ReactFlow>
          </div>
          <div style={{ display: 'flex', gap: 22, marginTop: 12, fontSize: 12, color: C.sec, borderTop: `1px solid ${C.line}`, paddingTop: 12 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><span style={{ width: 18, height: 2, background: 'rgb(200,200,203)' }} /> Correlated (θ ≥ 0.9)</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><span style={{ width: 18, borderTop: `2px dashed ${C.red}` }} /> Divergence</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><span style={{ width: 9, height: 9, borderRadius: '50%', background: C.red }} /> Blocked effect</span>
            <span style={{ marginLeft: 'auto', color: C.ter }}>Click a node to inspect its claim</span>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Badge bg={pStyle.bg} color={pStyle.color}>{selPlane}</Badge>
            <Mono style={{ fontSize: 11.5, color: C.ter }}>{sel.t}</Mono>
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.ink, marginBottom: 10 }}>{sel.title}</div>
          <div style={{ fontSize: 13, color: C.sec, lineHeight: 1.6, marginBottom: 14 }}>{sel.detail}</div>
          <pre style={{ fontFamily: mono, fontSize: 11.5, color: C.ink, background: C.chip, borderRadius: 8, padding: 12, whiteSpace: 'pre-wrap', lineHeight: 1.5, margin: '0 0 16px' }}>{sel.payload}</pre>
          <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 12 }}>
            {[['Claim digest', sel.digest], ['Verifier', sel.verifier], ['Confidence', sel.conf], ['Tier', sel.tier]].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', gap: 12, marginBottom: 8, fontSize: 12.5 }}>
                <span style={{ width: 84, color: C.ter, flexShrink: 0 }}>{k}</span>
                <span style={{ fontFamily: mono, color: k === 'Confidence' ? C.green : C.ink, fontSize: 12 }}>{v}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
