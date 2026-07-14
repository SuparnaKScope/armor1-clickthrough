import { C, verdictStyle } from '../theme.js'

export const runtimeKpis = [
  { label: 'Inline decisions · 24h', value: '1.21M', sub: 'allow 1.19M · redact 12.4k', color: C.ink },
  { label: 'Blocks · 24h', value: '214', sub: '0 false-positive reports', color: C.red },
  { label: 'Step-ups · 24h', value: '11', sub: 'median human response 6 min', color: 'rgb(194,98,17)' },
  { label: 'Decision p99', value: '0.9ms', sub: 'edge · no frontier-model calls', color: C.green },
  { label: 'Bundle live', value: 'v41.2', sub: 'signed · rollback ready', color: C.navy },
]

export const rawStepUps = [
  { id: 's1', t: '2 min ago', action: 'release-agent requests prod database migration', context: 'Plan includes schema change on prod-us-1. Policy requires human approval for prod writes by agents below L3 precision history.', rule: 'DPE-R-1187', agent: 'release-agent · DIY cloud', autonomy: 'L1 — approve first' },
  { id: 's2', t: '14 min ago', action: 'browse-assist requests credentialed session on admin.acme.internal', context: "Agentic browser on E. Moran's device navigating to an internal admin panel with stored credentials. Step-up per device-agent policy.", rule: 'DPE-R-0921', agent: 'browse-assist · Device', autonomy: 'L1 — approve first' },
  { id: 's3', t: '31 min ago', action: 'copilot-sales requests export of 1,200 CRM records', context: 'Bulk export exceeds the 500-record threshold learned from 90-day baseline. SaaS plane — audit-log evidence only.', rule: 'DPE-R-1493', agent: 'copilot-sales · SaaS', autonomy: 'L1 — approve first' },
]

export const decisions = [
  { t: '16:22:41', verdict: 'BLOCK', action: 'session-cookie replay staging.acme-portal.com — cursor-agent', rule: 'DPE-R-2231', tier: 'rule', lat: '0.7ms' },
  { t: '15:04:11', verdict: 'BLOCK', action: 'egress api.telemetry-sync.io — support-rag-agent', rule: 'DPE-R-2214', tier: 'rule', lat: '0.8ms' },
  { t: '15:03:58', verdict: 'REDACT', action: 'AWS key-shaped string in tool output — etl-helper', rule: 'DPE-R-0034', tier: 'regex', lat: '0.1ms' },
  { t: '15:03:41', verdict: 'ALLOW', action: 'kb_search vendor docs — support-rag-agent', rule: 'DPE-R-0002', tier: 'rule', lat: '0.05ms' },
  { t: '15:03:12', verdict: 'STEP-UP', action: 'prod migration request — release-agent', rule: 'DPE-R-1187', tier: 'rule', lat: '0.3ms' },
  { t: '15:02:47', verdict: 'REDACT', action: 'customer email addresses in draft — copilot-sales', rule: 'DPE-R-0871', tier: 'SLM v3', lat: '3.2ms' },
  { t: '15:02:31', verdict: 'ALLOW', action: 'git diff read — pr-review-agent', rule: 'DPE-R-0002', tier: 'rule', lat: '0.05ms' },
  { t: '15:02:02', verdict: 'BLOCK', action: 'unpinned MCP server connect — kb-summarizer', rule: 'DPE-R-1808', tier: 'rule', lat: '0.2ms' },
  { t: '15:01:44', verdict: 'ALLOW', action: 'calendar read — exec-assist', rule: 'DPE-R-0002', tier: 'rule', lat: '0.04ms' },
].map((d) => ({ ...d, vBg: verdictStyle[d.verdict].bg, vColor: verdictStyle[d.verdict].color }))
