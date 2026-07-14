import { C } from '../theme.js'
import Icon from './Icon.jsx'
import { useStore, initialState } from '../store.jsx'
import { USER } from '../data/auth.js'

const builtScreens = { overview: 1, incidents: 1, sessions: 1, runtime: 1, policy: 1, settings: 1, adoptiondrill: 1, costdrill: 1 }

const groups = [
  { label: 'POSTURE', items: [
    ['overview', 'Overview', 'gauge'],
    ['adoption', 'AI Adoption', 'adoption'],
    ['apps', 'Agentic Apps', 'robot'],
    ['mcp', 'MCP Servers', 'plugs'],
    ['skills', 'Skills', 'stack'],
    ['users', 'Users', 'user'],
    ['insights', 'Insights', 'lightbulb'],
  ] },
  { label: 'SOC', items: [
    ['incidents', 'Findings', 'warning', 'findings'],
    ['sessions', 'Session Analysis', 'tree'],
    ['runtime', 'Runtime Operations', 'lightning', 'runtime'],
    ['policy', 'Policy Management', 'shield'],
  ] },
  { label: 'ADMIN', items: [
    ['usermgmt', 'User Management', 'usersFour'],
    ['settings', 'Settings', 'gear'],
  ] },
]

function Logo({ collapsed }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: collapsed ? 'center' : 'flex-start', padding: collapsed ? 0 : '4px 4px 2px' }}>
      <svg width="26" height="18" viewBox="0 0 120 80" aria-hidden>
        <rect x="36" y="22" width="17" height="36" rx="2" fill="#C03F0C" />
        <path d="M36 22 h17 v10 h-7 a10 10 0 0 1 -10 -10 z" fill="#C03F0C" />
        <rect x="57" y="22" width="17" height="36" rx="2" fill="#FB923C" />
        <path d="M74 58 h-17 v-10 h7 a10 10 0 0 1 10 10 z" fill="#FB923C" />
        <rect x="78" y="22" width="6" height="36" rx="1.5" fill="#1A1A1A" />
      </svg>
      {!collapsed && <>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 16, letterSpacing: -0.3, color: C.ink }}>armor1</span>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1, color: C.ter, marginTop: 3 }}>SOC</span>
      </>}
    </div>
  )
}

export default function Sidebar() {
  const { state, set } = useStore()
  const S = state
  const collapsed = !!S.navCollapsed
  const findingsCount = '38'
  const runtimeCount = String(3 - Object.keys(S.resolved).length)
  const counts = { findings: { v: findingsCount, hot: true }, runtime: { v: runtimeCount === '0' ? null : runtimeCount, hot: false } }
  const user = S.user || USER

  const pick = (id, label) => set({ screen: id, incidentId: null, stubLabel: builtScreens[id] ? undefined : label })

  const W = collapsed ? 68 : 232

  return (
    <aside style={{ width: W, minWidth: W, height: '100vh', background: C.white, borderRight: `1px solid ${C.line}`, display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, transition: 'width .18s ease, min-width .18s ease' }}>
      <div style={{ padding: collapsed ? '18px 0 6px' : '18px 16px 6px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <Logo collapsed={collapsed} />
        {!collapsed && (
          <button title="Collapse" onClick={() => set({ navCollapsed: true })}
            style={{ position: 'absolute', right: 12, top: 20, width: 26, height: 26, borderRadius: 7, display: 'grid', placeItems: 'center', border: `1px solid ${C.line}`, background: '#fff' }}>
            <Icon name="chevronsLeft" size={15} color={C.ter} />
          </button>
        )}
      </div>

      {collapsed && (
        <button title="Expand" onClick={() => set({ navCollapsed: false })}
          style={{ margin: '4px auto 8px', width: 30, height: 26, borderRadius: 7, display: 'grid', placeItems: 'center', border: `1px solid ${C.line}`, background: '#fff' }}>
          <Icon name="chevronsLeft" size={15} color={C.ter} style={{ transform: 'rotate(180deg)' }} />
        </button>
      )}

      <nav style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: collapsed ? '6px 10px' : '10px 12px' }}>
        {groups.map((g) => (
          <div key={g.label} style={{ marginBottom: collapsed ? 8 : 18 }}>
            {collapsed
              ? <div style={{ height: 1, background: C.chip, margin: '8px 6px' }} />
              : <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: 0.9, color: C.ter, padding: '0 10px 8px' }}>{g.label}</div>}
            {g.items.map(([id, label, icon, countKey]) => {
              const active = S.screen === id
              const cnt = countKey ? counts[countKey] : null
              return (
                <button key={id} onClick={() => pick(id, label)} title={collapsed ? label : undefined}
                  style={{
                    position: 'relative', display: 'flex', alignItems: 'center', gap: 11, width: '100%',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    padding: collapsed ? '9px 0' : '8px 10px', borderRadius: 9, marginBottom: 2,
                    background: active ? C.softOrange : 'transparent',
                    color: active ? C.orange : C.sec, fontWeight: active ? 600 : 500, fontSize: 13.5, transition: 'background .12s',
                  }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'rgba(0,0,0,0.03)' }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent' }}
                >
                  <span style={{ position: 'relative', display: 'grid', placeItems: 'center' }}>
                    <Icon name={icon} size={17} color={active ? C.orange : C.ter} strokeWidth={active ? 1.9 : 1.7} />
                    {collapsed && cnt && cnt.v && (
                      <span style={{ position: 'absolute', top: -5, right: -6, minWidth: 15, height: 15, padding: '0 4px', borderRadius: 8, fontSize: 9.5, fontWeight: 700, display: 'grid', placeItems: 'center', background: cnt.hot ? C.red : C.ter, color: '#fff', border: '1.5px solid #fff' }}>{cnt.v}</span>
                    )}
                  </span>
                  {!collapsed && <>
                    <span style={{ flex: 1, textAlign: 'left', whiteSpace: 'nowrap' }}>{label}</span>
                    {cnt && cnt.v && (
                      <span style={{ fontSize: 11, fontWeight: 600, padding: '1px 7px', borderRadius: 20, background: cnt.hot ? 'rgba(220,40,40,0.1)' : C.chip, color: cnt.hot ? C.red : C.sec }}>{cnt.v}</span>
                    )}
                  </>}
                </button>
              )
            })}
          </div>
        ))}
      </nav>

      <div style={{ borderTop: `1px solid ${C.line}`, padding: collapsed ? '12px 0' : '14px 16px', display: 'flex', alignItems: 'center', gap: 11, justifyContent: 'center' }}>
        <div title={collapsed ? user.name : undefined} style={{ width: 32, height: 32, minWidth: 32, borderRadius: '50%', background: C.navy, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 600 }}>{user.initials}</div>
        {!collapsed && <>
          <div style={{ lineHeight: 1.3, flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
            <div style={{ fontSize: 11.5, color: C.ter, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</div>
          </div>
          <button title="Sign out" onClick={() => set({ ...initialState })}
            style={{ display: 'grid', placeItems: 'center', width: 30, height: 30, borderRadius: 8, flexShrink: 0 }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.04)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
            <Icon name="logout" size={16} color={C.ter} />
          </button>
        </>}
      </div>
      {collapsed && (
        <button title="Sign out" onClick={() => set({ ...initialState })}
          style={{ display: 'grid', placeItems: 'center', height: 34, borderTop: `1px solid ${C.line}` }}>
          <Icon name="logout" size={16} color={C.ter} />
        </button>
      )}
    </aside>
  )
}
