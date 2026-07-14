import { useState } from 'react'
import { C, mono } from '../theme.js'
import Icon from '../components/Icon.jsx'
import { useStore } from '../store.jsx'
import { CREDENTIALS, USER } from '../data/auth.js'

function Field({ icon, type, value, onChange, placeholder, autoFocus, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: `1px solid ${C.line}`, borderRadius: 10, padding: '0 12px', height: 46 }}>
      <Icon name={icon} size={17} color={C.ter} />
      <input
        type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} autoFocus={autoFocus}
        style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 14, fontFamily: 'inherit', color: C.ink }}
      />
      {right}
    </div>
  )
}

export default function Login() {
  const { set } = useStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setError('')
    if (email.trim().toLowerCase() !== CREDENTIALS.email || password !== CREDENTIALS.password) {
      setError('Incorrect email or password.')
      return
    }
    setBusy(true)
    setTimeout(() => set({ user: USER, screen: 'overview' }), 450)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', background: C.bg }}>
      {/* Brand panel */}
      <div style={{ position: 'relative', background: 'linear-gradient(155deg, #1a1a1a 0%, #26314a 100%)', color: '#fff', padding: '56px 60px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(600px 400px at 80% -10%, rgba(233,89,12,0.35), transparent 60%)' }} />
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="30" height="20" viewBox="0 0 120 80" aria-hidden>
            <rect x="36" y="22" width="17" height="36" rx="2" fill="#F97316" />
            <path d="M36 22 h17 v10 h-7 a10 10 0 0 1 -10 -10 z" fill="#F97316" />
            <rect x="57" y="22" width="17" height="36" rx="2" fill="#FDBA72" />
            <path d="M74 58 h-17 v-10 h7 a10 10 0 0 1 10 10 z" fill="#FDBA72" />
            <rect x="78" y="22" width="6" height="36" rx="1.5" fill="#fff" />
          </svg>
          <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 19, letterSpacing: -0.3 }}>armor1</span>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.5, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>SOC</span>
        </div>

        <div style={{ position: 'relative', marginTop: 'auto' }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1, color: 'rgb(253,186,114)', marginBottom: 16 }}>SECURITY OPERATIONS CENTER</div>
          <div style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.25, letterSpacing: -0.6, maxWidth: 460 }}>
            Every agent decision — a rule we can show you, not a model we ask you to trust.
          </div>
          <div style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginTop: 18, maxWidth: 460 }}>
            Deterministic policy at the edge. Content-addressed evidence across the LLM, Hooks and OTel planes. Sub-millisecond, replay-proof containment.
          </div>
          <div style={{ display: 'flex', gap: 26, marginTop: 34 }}>
            {[['214', 'agents monitored'], ['0.9ms', 'median decision'], ['1.21M', 'inline decisions · 24h']].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5 }}>{v}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div style={{ display: 'grid', placeItems: 'center', padding: 40 }}>
        <form onSubmit={submit} className="a1-fade" style={{ width: 380, maxWidth: '100%' }}>
          <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.4, color: C.ink }}>Sign in</div>
          <div style={{ fontSize: 13.5, color: C.sec, marginTop: 6, marginBottom: 26 }}>Welcome back. Enter your credentials to reach the console.</div>

          <label style={{ fontSize: 12.5, fontWeight: 600, color: C.sec, display: 'block', marginBottom: 7 }}>Work email</label>
          <Field icon="mail" type="email" value={email} onChange={setEmail} placeholder="you@armor1.com" autoFocus />

          <label style={{ fontSize: 12.5, fontWeight: 600, color: C.sec, display: 'block', margin: '16px 0 7px' }}>Password</label>
          <Field icon="lock" type={show ? 'text' : 'password'} value={password} onChange={setPassword} placeholder="••••••••"
            right={<button type="button" onClick={() => setShow((s) => !s)} style={{ display: 'grid', placeItems: 'center' }}><Icon name={show ? 'eyeOff' : 'eye'} size={17} color={C.ter} /></button>} />

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, background: 'rgba(220,40,40,0.07)', border: '1px solid rgba(220,40,40,0.25)', borderRadius: 9, padding: '9px 12px', fontSize: 12.5, color: C.red }}>
              <Icon name="warning" size={15} color={C.red} /> {error}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '16px 0 20px' }}>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12.5, color: C.sec, cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: C.orange, width: 14, height: 14 }} /> Keep me signed in
            </label>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: C.orange, cursor: 'pointer' }}>Forgot password?</span>
          </div>

          <button type="submit" disabled={busy} style={{ width: '100%', background: busy ? 'rgb(206,90,7)' : C.orange, color: '#fff', fontWeight: 600, fontSize: 14, padding: '12px', borderRadius: 10, opacity: busy ? 0.85 : 1 }}>
            {busy ? 'Signing in…' : 'Sign in'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 22, background: C.chip, borderRadius: 9, padding: '10px 12px', fontSize: 12, color: C.sec, lineHeight: 1.5 }}>
            <Icon name="lightbulb" size={15} color={C.ter} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>Demo login — <span style={{ fontFamily: mono, color: C.ink }}>{CREDENTIALS.email}</span> / <span style={{ fontFamily: mono, color: C.ink }}>{CREDENTIALS.password}</span></span>
          </div>

          <div style={{ textAlign: 'center', fontSize: 12, color: C.ter, marginTop: 22 }}>
            Protected by Armor1 · SSO available via Okta &amp; Microsoft Entra ID
          </div>
        </form>
      </div>
    </div>
  )
}
