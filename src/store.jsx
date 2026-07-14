import { createContext, useContext, useReducer, useCallback } from 'react'

export const initialState = {
  user: null,
  navCollapsed: false,
  screen: 'overview',
  incidentId: null,
  variant: 'A',
  sevFilter: 'All',
  selNode: 'n4',
  sessionRun: 'run_7f3a12',
  selBundle: 'v41.2',
  selRule: 'DPE-R-2214',
  resolved: {},
  tour: -1,
  compile: 'idle',
  compileStep: 0,
  prModal: false,
  prStage: 'open',
  conn: {},
  adCohort: 'users',
  adMonth: 5,
  settingsTab: 'Integrations',
  costDim: 'team',
  costSel: null,
  costDay: null,
  stubLabel: undefined,
  enforcementMode: 'Full policy',
  networkOptIn: true,
}

function reducer(state, action) {
  if (action.type === 'set') return { ...state, ...action.patch }
  if (action.type === 'merge') return { ...state, [action.key]: { ...state[action.key], ...action.patch } }
  return state
}

const Ctx = createContext(null)

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const set = useCallback((patch) => dispatch({ type: 'set', patch }), [])
  const merge = useCallback((key, patch) => dispatch({ type: 'merge', key, patch }), [])
  return <Ctx.Provider value={{ state, set, merge }}>{children}</Ctx.Provider>
}

export function useStore() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useStore outside provider')
  return v
}
