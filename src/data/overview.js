import { C } from '../theme.js'

export const kpis = [
  { label: 'Agents monitored', value: '214', sub: '9 shadow discovered · 3 on endpoints', subColor: 'rgb(194,98,17)' },
  { label: 'High risk agents', value: '25', sub: '8 device · 10 DIY cloud · 7 SaaS', subColor: C.red },
  { label: 'Mean time to resolution', value: '4.2h', sub: 'replay-proof required to close', subColor: C.sec },
  { label: 'Median decision latency', value: '0.9ms', sub: 'budget 10 ms · edge, offline-safe', subColor: C.green },
]

export const coverage = [
  { cls: 'Device', icon: 'laptop', count: 58, breakdown: 'Claude Code 31 · Cursor 19 · browsers 8', planes: 'hooks + process + network effects', segs: [{ w: 14, color: C.red }, { w: 30, color: C.warn }, { w: 56, color: C.green }] },
  { cls: 'DIY cloud', icon: 'stack', count: 121, breakdown: 'LangGraph 64 · Bedrock 33 · AgentKit 24', planes: 'hooks + LLM proxy + OTel — full triad', segs: [{ w: 8, color: C.red }, { w: 22, color: C.warn }, { w: 70, color: C.green }] },
  { cls: 'SaaS', icon: 'building', count: 35, breakdown: 'Copilot 21 · Agentforce 9 · Gemini 5', planes: 'audit-log only — rule families auto-degraded', segs: [{ w: 20, color: C.red }, { w: 37, color: C.warn }, { w: 43, color: C.green }] },
]

export const funnel = [
  { name: 'Tier 1 — static rules', share: '99.92% resolved · free', w: 100, color: 'rgb(26,26,26)' },
  { name: 'Tier 2 — SLM fleet', share: '0.07% · cheap semantic checks', w: 34, color: C.navy },
  { name: 'Tier 3 — LLM reasoning', share: '0.009% · ambiguous residue', w: 12, color: C.orange },
  { name: 'Tier 4 — deep adjudication', share: '0.0002% · novel & critical', w: 4, color: C.red },
]

export const autonomy = [
  { label: 'L0 recommend', w: 18, color: 'rgb(225,225,226)' },
  { label: 'L1 approve first', w: 27, color: 'rgb(253,186,114)' },
  { label: 'L2 notify after', w: 41, color: C.orange },
  { label: 'L3 autonomous', w: 14, color: C.navy },
].map((a) => ({ ...a, legend: a.label + ' · ' + a.w + '%' }))

export const tokenTeamsBase = [
  { name: 'Platform', tokens: '1.42B', cost: '$17.9k', w: 100 },
  { name: 'Payments', tokens: '980M', cost: '$12.6k', w: 69 },
  { name: 'Support eng', tokens: '760M', cost: '$9.4k', w: 54 },
  { name: 'Data', tokens: '640M', cost: '$8.1k', w: 45 },
  { name: 'Growth', tokens: '420M', cost: '$5.2k', w: 30 },
]
export const tokenEngineersBase = [
  { name: 'M. Chen', tokens: '312M', cost: '$4.1k', w: 100 },
  { name: 'A. Okafor', tokens: '288M', cost: '$3.7k', w: 92 },
  { name: 'S. Lindqvist', tokens: '241M', cost: '$3.1k', w: 77 },
  { name: 'J. Ribeiro', tokens: '205M', cost: '$2.6k', w: 66 },
  { name: 'P. Nair', tokens: '188M', cost: '$2.4k', w: 60 },
]
export const tokenAgentsBase = [
  { name: 'deploy-bot', tokens: '620M', cost: '$8.3k', w: 100 },
  { name: 'support-triage', tokens: '540M', cost: '$6.9k', w: 87 },
  { name: 'code-review', tokens: '470M', cost: '$5.8k', w: 76 },
  { name: 'etl-runner', tokens: '390M', cost: '$4.7k', w: 63 },
  { name: 'sec-scanner', tokens: '310M', cost: '$3.9k', w: 50 },
]

// Safe AI adoption trend (per-cohort). Months Feb..Oct, forecast begins after Jun.
export const adoptionTrend = {
  months: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  observedCount: 6, // Feb..Jul observed, Aug..Oct forecast
  users: {
    head: '72% low risk · forecast 85% by Oct',
    low: [40, 46, 54, 62, 68, 72, 77, 81, 85],
    med: [40, 36, 31, 27, 24, 21, 18, 15, 12],
    high: [20, 18, 15, 11, 8, 7, 5, 4, 3],
  },
  agents: {
    head: '66% low risk · forecast 80% by Oct',
    low: [28, 35, 43, 52, 59, 66, 71, 76, 80],
    med: [44, 41, 36, 31, 28, 24, 20, 16, 13],
    high: [28, 24, 21, 17, 13, 10, 9, 8, 7],
  },
  packs: [
    { i: 2, label: 'v40' },
    { i: 3, label: 'v41' },
    { i: 5, label: 'v41.2' },
    { i: 6, label: 'v42 · planned' },
  ],
  chips: [
    { label: 'v40  MCP pinning · Mar', active: false },
    { label: 'v41  network-effect · May', active: false },
    { label: 'v41.2  tune · Jun', active: false },
    { label: 'v42  data-residency · planned Aug', active: true },
  ],
}

export const deployment = {
  total: '214 agents',
  segs: [
    { label: 'Internal dev & testing', n: 77, pct: 36, color: 'rgb(253,186,114)' },
    { label: 'Production deployed', n: 137, pct: 64, color: C.orange },
  ],
}

export const tokenSummary = {
  totalTokens: '4.8B', totalCost: '$61.4k', delta: '−8% vs May',
  segs: [
    { label: 'Internal dev', detail: '1.7B tokens · $19.8k (35%)', pct: 35, color: 'rgb(253,186,114)' },
    { label: 'Production', detail: '3.1B tokens · $41.6k (65%)', pct: 65, color: C.orange },
  ],
}

export const tourSteps = [
  { k: 'TRIAGE', title: 'A critical finding surfaces', desc: 'Start on Overview: posture KPIs, the adoption trend, and the findings queue. INC-0041 — prompt injection via a poisoned KB document on support-rag-agent — sits at the top, already blocked inline.' },
  { k: 'INVESTIGATE', title: 'Open the case file', desc: 'The finding reconstructs the kill chain from content-addressed claims: poisoned document → embedded instruction ingested → unplanned egress attempt → blocked. The narrative is a pure function of the evidence.' },
  { k: 'INVESTIGATE', title: 'Trace the session', desc: 'Session analysis renders run run_7f3a12 as a graph — where the instruction entered, which tools were called, where the block landed. Root cause confirmed.' },
  { k: 'REMEDIATE', title: 'Compile the rule', desc: 'Back on the finding, Armor1.ai suggests the fix and the Rule Compiler distills the tier-4 reasoning trace into a deterministic tier-1 rule — watch it pass the golden corpus, then it awaits your gate.' },
  { k: 'REMEDIATE', title: 'Promote to policy', desc: 'Candidate rule DPE-R-2301 lands in bundle v42-rc behind a human gate. Review the predicate and provenance; it ships in monitor mode before enforce.' },
  { k: 'VERIFY', title: 'Close the loop', desc: 'Back on Overview: the finding is contained, the compiled rule now decides this pattern inline in under a millisecond, and the adoption trend keeps moving toward low risk. The finding closes after 14 clean days.' },
]
