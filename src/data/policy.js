import { C } from '../theme.js'

export const rawBundles = [
  { version: 'v42-rc', status: 'Staged', statusBg: 'rgb(255,222,204)', statusColor: 'rgb(206,90,7)', desc: '2 new rules from tier-4 adjudication of INC-0041. Monitor-only for 7 days (blast-radius cap).', meta: 'ships fleet-wide Jul 8 · human review passed' },
  { version: 'v41.2', status: 'Active', statusBg: 'rgba(22,162,73,0.1)', statusColor: 'rgb(22,162,73)', desc: 'Live fleet-wide. 87 compiled rules, 214 regex matchers, 3 SLM classifiers.', meta: 'signed Jun 29 · enforcing on 205 agents' },
  { version: 'v41.1', status: 'Superseded', statusBg: 'rgb(244,244,245)', statusColor: 'rgb(82,82,91)', desc: 'Patch: threshold tune on DPE-R-0871 after 2 FP reports.', meta: 'signed Jun 24' },
  { version: 'v40.7', status: 'Rollback point', statusBg: 'rgb(244,244,245)', statusColor: 'rgb(82,82,91)', desc: 'Last known-good before the v41 network-effect pack.', meta: 'signed Jun 11 · one-click restore' },
]

const tierStyle = {
  rule: { bg: 'rgb(244,244,245)', color: C.sec },
  regex: { bg: 'rgb(244,244,245)', color: C.sec },
  'SLM v3': { bg: 'rgba(38,49,74,0.08)', color: C.navy },
}
const autStyle = {
  L0: { bg: 'rgb(244,244,245)', color: C.sec }, L1: { bg: 'rgb(244,244,245)', color: C.sec },
  L2: { bg: 'rgba(233,89,12,0.1)', color: C.orange }, L3: { bg: 'rgba(22,162,73,0.1)', color: C.green },
}

export const rawRules = [
  { id: 'DPE-R-2214', name: 'Egress allowlist — retrieval agents', family: 'INJECTION_PIVOT', tier: 'rule', autonomy: 'L2', precision: '99.4%', status: 'Enforce' },
  { id: 'DPE-R-2215', name: 'Doc-origin instruction quarantine', family: 'INJECTION_PIVOT', tier: 'SLM v3', autonomy: 'L1', precision: '97.8%', status: 'Enforce' },
  { id: 'DPE-R-1808', name: 'Unpinned MCP server connect', family: 'POSTURE', tier: 'rule', autonomy: 'L3', precision: '99.9%', status: 'Enforce' },
  { id: 'DPE-R-0871', name: 'PII redaction in agent output', family: 'DATA_LEAKAGE', tier: 'SLM v3', autonomy: 'L2', precision: '98.6%', status: 'Enforce' },
  { id: 'DPE-R-1187', name: 'Prod write step-up gate', family: 'SCOPE_EXCEEDED', tier: 'rule', autonomy: 'L1', precision: '96.1%', status: 'Enforce' },
  { id: 'DPE-R-0034', name: 'Secret-shaped string redaction', family: 'DATA_LEAKAGE', tier: 'regex', autonomy: 'L3', precision: '99.97%', status: 'Enforce' },
  { id: 'DPE-R-2301', name: 'Session-context POST fingerprint (from INC-0041)', family: 'EXFIL', tier: 'rule', autonomy: 'L0', precision: '— new', status: 'Monitor' },
]

export function decorateRule(r, selRule) {
  return {
    ...r,
    tierBg: tierStyle[r.tier].bg, tierColor: tierStyle[r.tier].color,
    autBg: autStyle[r.autonomy].bg, autColor: autStyle[r.autonomy].color,
    precColor: r.precision.startsWith('9') ? C.green : C.ter,
    statusColor: r.status === 'Enforce' ? C.green : 'rgb(194,98,17)',
    bg: selRule === r.id ? 'rgb(255,248,243)' : 'transparent',
  }
}

const ruleDetails = {
  'DPE-R-2214': {
    id: 'DPE-R-2214', name: 'Egress allowlist — retrieval agents', compiled: 'Jun 29 · bundle v41.2',
    desc: 'Blocks any outbound network call from retrieval-class agents to hosts outside the compiled allowlist when the session carries an active INSTRUCTION_INGESTED claim. Distilled by the Rule Compiler from tier-4 adjudication of a cross-fleet exfil campaign.',
    provenance: ['INC-8812 @ anonymized tenant — first sighting, tier-4 adjudicated', 'INC-9034 @ anonymized tenant — pattern generalized', 'Reasoning trace rt_44c1 → compiler run cc_v41_017'],
    corpus: '148/148 pass', fp: '0.02% over 90-day replay', rollout: 'monitor 7d → enforce Jun 29', review: 'passed (network-effect rule)',
    autonomy: 'L2 — auto-contain, notify after', precision: '99.4% trailing 90d', autonomyNote: 'Earns L3 at ≥99% precision over 120 days. Autonomy is earned through measured precision, not configuration.',
  },
  'DPE-R-2301': {
    id: 'DPE-R-2301', name: 'Session-context POST fingerprint', compiled: 'Jul 5 · bundle v42-rc',
    desc: 'Matches the canonicalized shape of session-context exfil POSTs generalized from INC-0041. Currently monitor-only under the blast-radius cap for new rules.',
    provenance: ['INC-0041 @ this tenant — tier-4 adjudicated today', 'Reasoning trace rt_58a2 → compiler run cc_v42_003', 'Queued for network-effect pack (anonymized features only)'],
    corpus: '96/96 pass', fp: '0.00% over 30-day replay', rollout: 'monitor-only until Jul 12', review: 'pending — human gate',
    autonomy: 'L0 — recommend', precision: 'no history yet', autonomyNote: 'New rules start at L0 regardless of confidence; precision history accrues in monitor mode.',
  },
}

export function ruleDetailFor(selRule, selBundle) {
  if (ruleDetails[selRule]) return ruleDetails[selRule]
  const base = ruleDetails['DPE-R-2214']
  return {
    ...base,
    id: selRule,
    name: (rawRules.find((r) => r.id === selRule) || {}).name || '',
    desc: 'Compiled deterministic policy artifact. Ships with provenance, golden-corpus tests and a version; every inline decision it makes is replayable.',
    provenance: ['Vendor-published pack (Frames of reference: ATLAS/OWASP mapping)', 'Golden corpus + historical replay validated before ship', 'Signed into bundle ' + selBundle],
  }
}

// Adoption impact spline for the policy screen (low-risk share over 6 months).
export const adoptionImpact = {
  months: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  low: [34, 40, 49, 58, 66, 72],
  packs: [
    { x: 'Mar', label: 'v40 · Mar 18', v: 40 },
    { x: 'May', label: 'v41 · May 6', v: 58 },
    { x: 'Jun', label: 'v41.2 · Jun 29', v: 66 },
  ],
  legend: [
    { v: 'v40', name: 'MCP pinning pack', gain: '+13 pts low-risk in 30 days' },
    { v: 'v41', name: 'Network-effect pack', gain: '+9 pts · 3 apps cleared for GA' },
    { v: 'v41.2', name: 'Threshold tune on DPE-R-0871', gain: 'FP rate halved · step-ups −22%' },
  ],
}

export const heldBack = [
  { title: 'Copilot Studio — Finance', badge: 'Drafting', badgeBg: 'rgb(244,244,245)', badgeColor: C.sec, desc: 'Held at pilot — EU data residency unproven. Unlocks with the residency routing pack.', proj: 'projected +1,240 users to low risk' },
  { title: 'Claude Code — org-wide rollout', badge: 'In monitor', badgeBg: 'rgba(233,89,12,0.1)', badgeColor: C.orange, desc: 'Credential-store rules (DPE-R-2231 family) still at L1 — a step-up per run. Enforce at L2 removes the gate.', proj: 'projected +380 developers to low risk' },
  { title: 'Bedrock support agents', badge: 'Staged in v42-rc', badgeBg: 'rgb(255,222,204)', badgeColor: 'rgb(206,90,7)', desc: 'Prod-write gate lacks a ticket-scoped exception; every remediation escalates to a human.', proj: 'projected 3 apps to GA' },
]
