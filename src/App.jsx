import { StoreProvider, useStore } from './store.jsx'
import Sidebar from './components/Sidebar.jsx'
import TopBar from './components/TopBar.jsx'
import Tour from './components/Tour.jsx'
import { C } from './theme.js'

import Overview from './screens/Overview.jsx'
import Findings from './screens/Findings.jsx'
import IncidentDetail from './screens/IncidentDetail.jsx'
import Sessions from './screens/Sessions.jsx'
import Runtime from './screens/Runtime.jsx'
import Policy from './screens/Policy.jsx'
import Settings from './screens/Settings.jsx'
import AdoptionDrill from './screens/AdoptionDrill.jsx'
import CostDrill from './screens/CostDrill.jsx'
import Stub from './screens/Stub.jsx'
import Login from './screens/Login.jsx'

const built = { overview: 1, incidents: 1, sessions: 1, runtime: 1, policy: 1, settings: 1, adoptiondrill: 1, costdrill: 1 }

function Router() {
  const { state } = useStore()
  const s = state.screen
  let view
  if (s === 'overview') view = <Overview />
  else if (s === 'incidents') view = state.incidentId ? <IncidentDetail /> : <Findings />
  else if (s === 'sessions') view = <Sessions />
  else if (s === 'runtime') view = <Runtime />
  else if (s === 'policy') view = <Policy />
  else if (s === 'settings') view = <Settings />
  else if (s === 'adoptiondrill') view = <AdoptionDrill />
  else if (s === 'costdrill') view = <CostDrill />
  else if (!built[s]) view = <Stub />
  else view = <Overview />

  return (
    <div key={s + (state.incidentId || '')} className="a1-fade" style={{ padding: '24px 28px 80px', maxWidth: 1560, margin: '0 auto' }}>
      {view}
    </div>
  )
}

function Shell() {
  const { state } = useStore()
  if (!state.user) return <Login />
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: C.bg }}>
      <Sidebar />
      <main style={{ flex: 1, minWidth: 0 }}>
        <TopBar />
        <Router />
      </main>
      <Tour />
    </div>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  )
}
