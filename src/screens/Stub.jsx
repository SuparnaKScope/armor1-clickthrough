import { useStore } from '../store.jsx'
import { C } from '../theme.js'
import Icon from '../components/Icon.jsx'
import { Card } from '../components/ui.jsx'

const titles = {
  adoption: 'AI Adoption', apps: 'Agentic Apps', mcp: 'MCP Servers', skills: 'Skills',
  users: 'Users', insights: 'Insights', usermgmt: 'User Management',
}

export default function Stub() {
  const { state, set } = useStore()
  const label = titles[state.screen] || state.stubLabel || 'This section'
  return (
    <Card pad={0} style={{ overflow: 'hidden' }}>
      <div style={{ display: 'grid', placeItems: 'center', padding: '90px 40px', textAlign: 'center' }}>
        <div style={{ width: 54, height: 54, borderRadius: 14, background: C.chip, display: 'grid', placeItems: 'center', marginBottom: 18 }}>
          <Icon name="stack" size={26} color={C.ter} />
        </div>
        <div style={{ fontSize: 19, fontWeight: 700, color: C.ink, marginBottom: 8 }}>{label}</div>
        <div style={{ maxWidth: 520, fontSize: 13.5, color: C.sec, lineHeight: 1.6 }}>
          {label} is out of scope for this prototype — shown for navigation completeness. The built flows are
          {' '}Overview, Findings, Session Analysis, Runtime Operations and Policy Management.
        </div>
        <button onClick={() => set({ screen: 'overview', incidentId: null })}
          style={{ marginTop: 22, fontSize: 13, fontWeight: 600, color: '#fff', background: C.orange, padding: '9px 18px', borderRadius: 9 }}>
          Back to Overview
        </button>
      </div>
    </Card>
  )
}
