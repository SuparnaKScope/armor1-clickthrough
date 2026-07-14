import { C } from '../theme.js'
import Icon from './Icon.jsx'
import { useStore } from '../store.jsx'

const titles = {
  overview: 'Fleet overview', incidents: 'Findings', sessions: 'Session analysis',
  runtime: 'Runtime operations', policy: 'Policy management',
  adoption: 'AI Adoption', apps: 'Agentic Apps', mcp: 'MCP Servers', skills: 'Skills',
  users: 'Users', insights: 'Insights', usermgmt: 'User Management', settings: 'Settings',
  adoptiondrill: 'Safe AI adoption', costdrill: 'Token usage & cost',
}
const modeDots = { 'Monitor only': C.ter, 'Enforce on critical': C.orange, 'Full policy': C.green }

export default function TopBar() {
  const { state, set } = useStore()
  const title = titles[state.screen] || 'Armor1'
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40, background: 'rgba(252,252,252,0.85)', backdropFilter: 'blur(8px)',
      borderBottom: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', gap: 14, padding: '13px 28px',
    }}>
      <h1 style={{ fontSize: 19, fontWeight: 700, color: C.ink, letterSpacing: -0.3 }}>{title}</h1>
      <button onClick={() => set({ tour: 0, screen: 'overview', incidentId: null })}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: C.softOrange, color: C.orangeDeep, fontWeight: 600, fontSize: 13, padding: '6px 12px', borderRadius: 20 }}>
        <Icon name="play" size={13} color={C.orange} fill={C.orange} strokeWidth={1} /> Play the common flow
      </button>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: C.white, border: `1px solid ${C.line}`, borderRadius: 9, padding: '8px 12px', width: 300, color: C.ter }}>
        <Icon name="search" size={15} color={C.ter} />
        <span style={{ fontSize: 13 }}>Search agents, findings, rules</span>
      </div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: `1px solid ${C.line}`, borderRadius: 9, padding: '7px 12px', fontSize: 13, fontWeight: 500, color: C.sec, background: C.white }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: modeDots[state.enforcementMode] || C.orange }} />
        {state.enforcementMode}
      </div>
      <button style={{ background: C.orange, color: '#fff', fontWeight: 600, fontSize: 13, padding: '9px 16px', borderRadius: 9 }}>Run scan</button>
    </header>
  )
}
