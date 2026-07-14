// Adoption drill-down data (per cohort: users / agents).
export const AD_MONTHS = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']

export const AD = {
  users: {
    label: 'Users', head: '72% low risk · up from 34%', total: '8,412 users observed',
    low: [34, 38, 51, 57, 63, 72], med: [41, 37, 32, 28, 24, 21], high: [25, 22, 19, 15, 11, 7],
    moved: [null,
      { in: 118, inNote: 'medium → low · skill review sweep', out: 22, outNote: 'low → medium · new shadow agents' },
      { in: 312, inNote: 'medium → low · v40 MCP pinning pack', out: 41, outNote: 'low → medium · shadow-agent findings' },
      { in: 176, inNote: 'medium → low · step-up gate coverage', out: 18, outNote: 'low → medium · unreviewed skills' },
      { in: 214, inNote: 'medium → low · v41 network-effect pack', out: 29, outNote: 'low → medium · residency findings' },
      { in: 288, inNote: 'medium → low · v41.2 threshold tune', out: 12, outNote: 'low → medium · step-up fatigue' },
    ],
    bdTitle: 'Breakdown by department', bdNote: 'click a row to open Users pre-filtered',
    breakdown: [
      { name: 'Finance', count: '1,102', low: 41, med: 44, high: 15 },
      { name: 'Legal', count: '388', low: 38, med: 47, high: 15 },
      { name: 'Marketing', count: '743', low: 63, med: 28, high: 9 },
      { name: 'Support', count: '1,655', low: 71, med: 22, high: 7 },
      { name: 'Sales', count: '1,983', low: 76, med: 19, high: 5 },
      { name: 'Engineering', count: '2,541', low: 89, med: 9, high: 2 },
    ],
    blkTitle: 'Stuck cohort — why 28% are not low risk', blkNote: 'each reason links to the action that moves it',
    blockers: [
      { label: 'Unreviewed skills in use', count: '214 users', action: 'Skill review queue' },
      { label: 'Step-up fatigue — ≥3 gates/day', count: '122 users', action: 'Enforce DPE-R-2231 at L2' },
      { label: 'Shadow agents on workstation', count: '87 users', action: 'Register or retire' },
      { label: 'EU residency unproven — Copilot Studio', count: '1,240 users', action: 'Residency routing pack' },
    ],
    autonomy: '', to: 'users',
  },
  agents: {
    label: 'Agents', head: '66% low risk · up from 28%', total: '205 agents enforced',
    low: [28, 35, 43, 52, 59, 66], med: [44, 41, 36, 31, 28, 24], high: [28, 24, 21, 17, 13, 10],
    moved: [null,
      { in: 14, inNote: 'medium → low · MCP pinning adopted', out: 3, outNote: 'low → medium · unpinned connects' },
      { in: 21, inNote: 'medium → low · v40 MCP pinning pack', out: 2, outNote: 'low → medium · scope drift' },
      { in: 17, inNote: 'medium → low · grant right-sizing', out: 4, outNote: 'low → medium · residency findings' },
      { in: 16, inNote: 'medium → low · v41 network-effect pack', out: 2, outNote: 'low → medium · shadow discovery' },
      { in: 15, inNote: 'medium → low · v41.2 threshold tune', out: 1, outNote: 'low → medium · insecure protocol' },
    ],
    bdTitle: 'Breakdown by class', bdNote: 'click a row to open Agentic Apps pre-filtered',
    breakdown: [
      { name: 'DIY cloud', count: '64', low: 52, med: 34, high: 14 },
      { name: 'Device agents', count: '43', low: 61, med: 30, high: 9 },
      { name: 'SaaS', count: '98', low: 78, med: 17, high: 5 },
    ],
    blkTitle: 'What keeps agents out of low risk', blkNote: 'finding families · each links to Findings pre-filtered',
    blockers: [
      { label: 'EXCESSIVE_PERMISSION — grants beyond observed need', count: '24 agents', action: 'Right-size via AWS IAM' },
      { label: 'SHADOW_AGENT — unregistered processes', count: '11 agents', action: 'Register or retire' },
      { label: 'DATA_RESIDENCY — region-less routing', count: '9 agents', action: 'Residency routing pack' },
      { label: 'INSECURE_PROTOCOL — cleartext MCP', count: '6 agents', action: 'Transport security floor' },
    ],
    autonomy: '17 agents at L2 have earned L3 eligibility — ≥99% trailing precision over 120 days. Promotion ships with bundle v43.',
    to: 'apps',
  },
}
