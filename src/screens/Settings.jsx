import { useStore } from '../store.jsx'
import { C, mono } from '../theme.js'
import { Card, Badge } from '../components/ui.jsx'
import { integrationGroups, connDefaults, settingsTabs } from '../data/settings.js'

export default function Settings() {
  const { state, set } = useStore()
  const conn = { ...connDefaults, ...(state.conn || {}) }
  const toggle = (id) => set({ conn: { ...conn, [id]: !conn[id] } })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', gap: 6 }}>
        {settingsTabs.map((t) => {
          const active = state.settingsTab === t
          return (
            <button key={t} onClick={() => set({ settingsTab: t })} style={{
              fontSize: 13, fontWeight: active ? 600 : 500, color: active ? '#fff' : C.sec,
              background: active ? C.ink : '#fff', border: `1px solid ${active ? C.ink : C.line}`, padding: '8px 16px', borderRadius: 9,
            }}>{t}</button>
          )
        })}
      </div>

      {state.settingsTab !== 'Integrations' ? (
        <Card style={{ textAlign: 'center', padding: '70px 40px' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.ink, marginBottom: 6 }}>{state.settingsTab}</div>
          <div style={{ fontSize: 13, color: C.sec }}>Shown for navigation completeness — the built settings surface is Integrations.</div>
        </Card>
      ) : (
        integrationGroups.map((g) => (
          <Card key={g.label} pad={0} style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, padding: '16px 20px', borderBottom: `1px solid ${C.line}` }}>
              <div style={{ fontSize: 14.5, fontWeight: 600 }}>{g.label}</div>
              <div style={{ fontSize: 12.5, color: C.ter }}>{g.note}</div>
            </div>
            {g.items.map((it) => {
              const on = !!conn[it.id]
              return (
                <div key={it.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '15px 20px', borderBottom: `1px solid ${C.chip}` }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: C.chip, display: 'grid', placeItems: 'center', fontFamily: mono, fontSize: 12, fontWeight: 700, color: C.sec, flexShrink: 0 }}>{it.mono}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 13.5, fontWeight: 600, color: C.ink }}>{it.name}</span>
                      {it.chips.map((c) => <Badge key={c} bg={C.chip} color={C.sec} style={{ fontWeight: 500 }}>{c}</Badge>)}
                    </div>
                    <div style={{ fontSize: 12.5, color: C.sec, lineHeight: 1.45 }}>{it.desc}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, width: 108, justifyContent: 'flex-end' }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: on ? C.green : C.line }} />
                    <span style={{ fontSize: 12.5, fontWeight: 500, color: on ? C.green : C.ter }}>{on ? 'Connected' : 'Not connected'}</span>
                  </div>
                  <button onClick={() => toggle(it.id)} style={{
                    fontSize: 12.5, fontWeight: 600, padding: '8px 16px', borderRadius: 8, minWidth: 88,
                    color: on ? C.ink : '#fff', background: on ? '#fff' : C.orange, border: `1px solid ${on ? C.line : C.orange}`,
                  }}>{on ? 'Manage' : 'Connect'}</button>
                </div>
              )
            })}
          </Card>
        ))
      )}
    </div>
  )
}
