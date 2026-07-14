import { C } from '../theme.js'

const money = (k) => (k >= 1 ? '$' + Math.round(k * 10) / 10 + 'k' : '$' + Math.round(k * 1000))
const toks = (m) => (m >= 1000 ? (m / 1000).toFixed(2).replace(/\.?0+$/, '') + 'B' : Math.round(m) + 'M')
const seedOf = (str) => { let h = 9; for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 99991; return h }
const rng = (s) => { let x = s + 7; return () => { x = (x * 1103515245 + 12345) % 2147483648; return x / 2147483648 } }

const AGENTS = ['deploy-bot', 'support-triage', 'code-review', 'etl-runner', 'sec-scanner']
const USERS = ['M. Chen', 'A. Okafor', 'S. Lindqvist', 'J. Ribeiro', 'P. Nair']

export const DIMS = {
  team: { label: 'Teams', noun: 'team', note: 'top 5 of 12 teams · sorted by June cost', rows: [
    { name: 'Platform', tokN: 1420, costN: 17.9, delta: '+4%', up: 1, budN: 21 },
    { name: 'Payments', tokN: 980, costN: 12.6, delta: '−11%', up: 0, budN: 15 },
    { name: 'Support eng', tokN: 760, costN: 9.4, delta: '−6%', up: 0, budN: 12 },
    { name: 'Data', tokN: 640, costN: 8.1, delta: '+9%', up: 1, budN: 8 },
    { name: 'Growth', tokN: 420, costN: 5.2, delta: '−2%', up: 0, budN: 8 },
  ] },
  engineer: { label: 'Engineers', noun: 'engineer', note: 'top 5 of 84 engineers · sorted by June cost', rows: [
    { name: 'M. Chen', tokN: 312, costN: 4.1, delta: '+6%', up: 1, budN: 5 },
    { name: 'A. Okafor', tokN: 288, costN: 3.7, delta: '−4%', up: 0, budN: 5 },
    { name: 'S. Lindqvist', tokN: 241, costN: 3.1, delta: '+21%', up: 1, budN: 3.2 },
    { name: 'J. Ribeiro', tokN: 205, costN: 2.6, delta: '−9%', up: 0, budN: 5 },
    { name: 'P. Nair', tokN: 188, costN: 2.4, delta: '+2%', up: 1, budN: 4 },
  ] },
  agent: { label: 'Agents', noun: 'agent', mono: 1, note: 'top 5 of 61 agents · sorted by June cost', rows: [
    { name: 'deploy-bot', tokN: 620, costN: 8.3, delta: '−3%', up: 0, budN: 12 },
    { name: 'support-triage', tokN: 540, costN: 6.9, delta: '+7%', up: 1, budN: 8 },
    { name: 'code-review', tokN: 470, costN: 5.8, delta: '−12%', up: 0, budN: 10 },
    { name: 'etl-runner', tokN: 390, costN: 4.7, delta: '+31%', up: 1, budN: 4 },
    { name: 'sec-scanner', tokN: 310, costN: 3.9, delta: '+1%', up: 1, budN: 5.2 },
  ] },
}

const anomIdx = 26
const wkOf = (i) => (i % 7 === 5 || i % 7 === 6 ? 0.42 : 1)
const sessRate = 12.8

function genDaily(name, costN, anomOn) {
  const rd = rng(seedOf(name) + 3)
  const vals = []
  for (let i = 0; i < 30; i++) {
    let v = (0.85 + (i / 30) * 0.3) * wkOf(i) * (0.85 + rd() * 0.3)
    if (i === anomIdx && anomOn) v *= 1.7
    vals.push(v)
  }
  const vSum = vals.reduce((a, b) => a + b, 0)
  const dailyArr = vals.map((v) => (v / vSum) * costN)
  let tS = 0, tW = 0
  for (let i = 23; i < 30; i++) { if (anomOn && i === anomIdx) continue; tS += dailyArr[i]; tW += wkOf(i) }
  const base = tS / tW
  let jul = 0
  for (let i = 30; i < 61; i++) jul += base * wkOf(i) * (1 + (i - 29) * 0.006)
  return { daily: dailyArr, base, jul }
}

// Build the full cost-drill view model for the given dimension / selection / day.
export function buildCost({ dim = 'team', selName = null, selDay = null }) {
  const D = DIMS[dim]
  const selRow = selName ? D.rows.find((r) => r.name === selName) : null
  const scope = selRow || { name: 'All ' + D.label.toLowerCase(), tokN: 4800, costN: 61.4 }
  const anomInScope = !selRow || selRow.name === 'etl-runner' || selRow.name === 'Data'

  const projOf = (r) => {
    const pct0 = Math.round((r.costN / r.budN) * 100)
    const mag = parseInt(r.delta.replace(/[^0-9]/g, ''), 10) || 0
    return { pct: pct0, projPct: Math.max(0, Math.round(pct0 * (1 + (r.up ? 1 : -1) * mag / 100))) }
  }
  const breachNames = D.rows.filter((r) => projOf(r).projPct > 100).map((r) => r.name)
  const cdRows = D.rows.map((r) => {
    const { pct, projPct } = projOf(r)
    const over = projPct > 100
    return {
      name: r.name, tokens: toks(r.tokN), cost: money(r.costN), delta: r.delta, deltaColor: r.up ? C.red : C.green,
      budgetW: Math.min(pct, 100), projExtW: Math.max(0, Math.min(projPct, 100) - Math.min(pct, 100)),
      projBg: over ? 'repeating-linear-gradient(45deg, rgba(220,40,40,0.55) 0 3px, rgba(220,40,40,0.15) 3px 6px)' : 'repeating-linear-gradient(45deg, rgba(233,89,12,0.5) 0 3px, rgba(233,89,12,0.14) 3px 6px)',
      pct: pct + '→' + projPct + '%',
      budgetColor: pct > 100 ? C.red : pct > 85 ? C.warn : C.orange,
      pctColor: over ? C.red : projPct > 85 ? 'rgb(194,98,17)' : C.sec,
      mono: !!D.mono, selected: selName === r.name,
    }
  })

  const rgen = rng(seedOf(scope.name))
  const MODELS = ['claude-sonnet-4.5', 'gpt-4o', 'claude-haiku-4', 'text-embed-3']
  let shares = [0.5, 0.24, 0.17, 0.09].map((b) => b * (0.7 + 0.6 * rgen()))
  const shSum = shares.reduce((a, b) => a + b, 0)
  shares = shares.map((s) => s / shSum)
  const cdModels = MODELS.map((m, i) => ({ name: m, tokens: toks(scope.tokN * shares[i]), cost: money(scope.costN * shares[i] * (i === 3 ? 0.25 : 1)), w: Math.round((shares[i] / shares[0]) * 100) }))
  const mixP = Math.round(52 + rgen() * 14)
  const mixCa = Math.round(10 + rgen() * 10)
  const mixC = 100 - mixP - mixCa
  const sessN = Math.round(scope.tokN * (13 + 4 * rgen()))
  const perSess = (scope.costN * 1000) / sessN

  const cdSessions = [0, 1, 2, 3].map((i) => {
    if (i === 0 && anomInScope) {
      return { run: 'run_2b91ce', agent: 'sync-bridge', user: 'service account', tokens: '41M', cost: '$520', dur: '90 s', flag: 'INC-0019', flagBg: 'rgba(220,40,40,0.09)', flagColor: C.red }
    }
    const rr = rng(seedOf(scope.name) + i * 131)
    const run = 'run_' + (((seedOf(scope.name) + 1) * 2654435761 + i * 179426549) >>> 0).toString(16).slice(-6)
    const costD = Math.max(24, perSess * (220 - i * 45) * (0.8 + rr() * 0.5))
    const tokM = costD / sessRate
    return {
      run,
      agent: dim === 'agent' && selRow ? scope.name : AGENTS[Math.floor(rr() * AGENTS.length)],
      user: dim === 'engineer' && selRow ? scope.name : USERS[Math.floor(rr() * USERS.length)],
      tokens: tokM >= 1 ? tokM.toFixed(1) + 'M' : Math.round(tokM * 1000) + 'k',
      cost: '$' + Math.round(costD), dur: Math.max(4, Math.round(tokM * (2.5 + rr() * 2))) + ' min',
      flag: '—', flagBg: 'transparent', flagColor: C.ter,
    }
  }).sort((a, b) => parseInt(String(b.cost).slice(1), 10) - parseInt(String(a.cost).slice(1), 10))

  const G = genDaily('All ' + D.label.toLowerCase(), 61.4, true)
  const SC = selRow ? genDaily(scope.name, scope.costN, anomInScope) : G
  const daily = SC.daily
  const proj = []
  for (let i = 30; i < 42; i++) {
    const c = SC.base * wkOf(i) * (1 + (i - 29) * 0.006)
    const sp = 0.1 + (i - 30) * 0.016
    proj.push({ c, lo: c * (1 - sp), hi: c * (1 + sp) })
  }
  const maxV = Math.max(...daily, ...proj.map((p) => p.hi))
  const selDayR = selDay == null ? (anomInScope ? anomIdx : 29) : selDay

  const cdBars = daily.map((v, i) => {
    const on = i === selDayR
    return { day: i, kind: 'actual', v, ratio: v / maxV, on, anom: i === anomIdx && anomInScope, isProj: false, label: 'Jun ' + (i + 1) + ' · ' + money(v) }
  })
  proj.forEach((p, j) => {
    const i = 30 + j
    const on = i === selDayR
    cdBars.push({ day: i, kind: 'proj', lo: p.lo, hi: p.hi, c: p.c, ratioLo: p.lo / maxV, ratioHi: p.hi / maxV, on, isProj: true, first: j === 0, label: 'Jul ' + (j + 1) + ' (projected) · ' + money(p.c) })
  })

  const isProjDay = selDayR >= 30
  const pSel = isProjDay ? proj[selDayR - 30] : null
  const dv = isProjDay ? pSel.c : daily[selDayR]
  const dDelta = Math.round((dv / (scope.costN / 30) - 1) * 100)
  const isAnom = !isProjDay && selDayR === anomIdx && anomInScope
  const isWeekend = wkOf(selDayR) < 1

  return {
    scope, dim, D, selRow, anomInScope, maxV,
    breachNote: breachNames.length ? 'On current trend, ' + breachNames.join(' and ') + (breachNames.length === 1 ? ' exceeds' : ' exceed') + ' budget in July.' : '',
    kpis: [
      { label: 'TOTAL COST · JUNE', value: '$61.4k', note: '−8% vs May', noteColor: C.green },
      { label: 'PROJECTED · JULY', value: money(G.jul), note: 'range ' + money(G.jul * 0.88) + '–' + money(G.jul * 1.12) + ' · ' + (G.jul >= 61.4 ? '+' : '−') + Math.abs(Math.round((G.jul / 61.4 - 1) * 100)) + '% vs June', noteColor: G.jul > 61.4 ? 'rgb(194,98,17)' : C.green },
      { label: 'TOTAL TOKENS', value: '4.8B', note: 'proj. ' + toks((G.jul / sessRate) * 1000) + ' in July', noteColor: C.ter },
      { label: 'BUDGET USED', value: '68%', note: 'of $90k cap · proj. ' + Math.round((G.jul / 90) * 100) + '% in July', noteColor: G.jul > 90 ? C.red : C.sec },
      { label: 'WASTE FLAGGED', value: '$1.9k', note: 'retries · loops · oversized context', noteColor: C.red },
    ],
    cdBars, cdRows, cdModels, cdSessions,
    scopeLabel: scope.name,
    selDayLabel: isProjDay ? 'JUL ' + (selDayR - 29) + ' · PROJECTED' : 'JUN ' + (selDayR + 1),
    selDayCost: money(dv), selDayTokens: toks((dv / sessRate) * 1000),
    selDayDelta: (dDelta >= 0 ? '+' : '−') + Math.abs(dDelta) + '%',
    selDayDeltaColor: dDelta > 25 ? C.red : dDelta > 0 ? 'rgb(194,98,17)' : C.green,
    selDayTop: isProjDay ? '—' : isAnom ? 'sync-bridge (retry loop)' : D.rows[0].name,
    selDayNote: isProjDay ? 'Projected from the trailing 7-day weekday-adjusted average. Expected range ' + money(pSel.lo) + '–' + money(pSel.hi) + '.' : isAnom ? 'Retry loop on sync-bridge — 412 identical calls in 90 s before the rate-cap fired (INC-0019).' : isWeekend ? 'Weekend baseline — scheduled agents only.' : 'Within normal range for this scope.',
    isAnom,
    detMeta: toks(scope.tokN) + ' tokens · ' + money(scope.costN) + (selRow ? ' · ' + Math.round((selRow.costN / selRow.budN) * 100) + '% of ' + money(selRow.budN) + ' budget' : ' · fleet total · June') + ' · proj. ' + money(SC.jul) + ' in July',
    mixP, mixC, mixCa, perSession: '$' + perSess.toFixed(2),
    sessCount: sessN >= 1000 ? Math.round(sessN / 100) / 10 + 'k' : String(sessN),
    avgTokSession: Math.round((scope.tokN * 1000) / sessN) + 'k',
    anomText: 'Retry loop on sync-bridge issued 412 identical calls in 90 s on Jun 27, burning 41M tokens ($520) before the rate-cap rule fired. Loop detection now decides this pattern at tier 1; enabling response caching on sync-bridge and etl-runner would cut steady-state spend an estimated 18% (~$1.4k/mo).',
    detTitleMono: !!D.mono && !!selRow,
  }
}
