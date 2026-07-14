export const connDefaults = { splunk: true, sentinel: true, chronicle: false, panther: false, kscope: true, snyk: true, straiker: false, runlayer: true, jira: true, servicenow: false, reports: true, slack: true, teams: false, pagerduty: true, otel: true }

export const integrationGroups = [
  { label: 'Security tooling', note: 'External findings become evidence and rule candidates — never opaque verdicts.', items: [
    { id: 'snyk', mono: 'Sn', name: 'Snyk', desc: 'Dependency and IaC findings on agent codebases enrich risk posture and PR checks.', chips: ['Posture enrichment'] },
    { id: 'straiker', mono: 'St', name: 'Straiker', desc: 'Red-team findings compile into candidate rules via the Rule Compiler, with provenance.', chips: ['Findings → rule candidates'] },
    { id: 'runlayer', mono: 'Rl', name: 'Runlayer', desc: 'Runtime MCP guardrails and tool-call inspection stream in as evidence; blocked calls become rule candidates with full context.', chips: ['Runtime guardrails', 'MCP inspection'] },
    { id: 'wiz', mono: 'Wz', name: 'Wiz', desc: 'Cloud risk context on agent infrastructure; toxic combinations raise the risk of agents running on affected resources.', chips: ['Posture enrichment', 'Cloud context'] },
    { id: 'bigid', mono: 'Bi', name: 'BigID', desc: 'Data classification labels ground DATA_LEAKAGE and residency findings — severity scales with the sensitivity of what moved.', chips: ['Data classification'] },
  ] },
  { label: 'IAM & Identity', note: 'Agent identities resolve to real principals; grants stay right-sized from observed need.', items: [
    { id: 'okta', mono: 'Ok', name: 'Okta', desc: 'Maps agent service accounts to human owners; step-up approvals verified against Okta groups.', chips: ['Identity mapping', 'Step-up auth'] },
    { id: 'entra', mono: 'En', name: 'Microsoft Entra ID', desc: 'Conditional-access signals on agent principals; disabled identities quarantine their agents.', chips: ['Identity mapping', 'Conditional access'] },
    { id: 'awsiam', mono: 'IA', name: 'AWS IAM', desc: 'Observed-need baselines drive right-sized role policies; SCOPE_EXCEEDED findings link to the offending grant.', chips: ['Grant right-sizing'] },
    { id: 'vault', mono: 'Va', name: 'HashiCorp Vault', desc: 'Short-lived credentials for agent tool calls; leases revoked automatically on containment.', chips: ['Secrets', 'Auto-revoke'] },
  ] },
  { label: 'SIEM & SOAR', note: 'Bi-directional — findings export as OCSF; your SOAR can trigger playbooks back.', items: [
    { id: 'splunk', mono: 'Sp', name: 'Splunk', desc: 'OCSF finding and decision-log export to Splunk ES; response actions callable from SOAR.', chips: ['Bi-directional', 'OCSF'] },
    { id: 'sentinel', mono: 'Se', name: 'Microsoft Sentinel', desc: 'OCSF export via data connector; Sentinel automation rules can invoke Armor1 playbooks.', chips: ['Bi-directional', 'OCSF'] },
    { id: 'kscope', mono: 'Ks', name: 'Kscope', desc: 'Findings sync into the Kscope context graph; compound-risk paths flow back as evidence on affected agents.', chips: ['Bi-directional', 'Context graph'] },
    { id: 'chronicle', mono: 'Ch', name: 'Google Chronicle', desc: 'Stream findings and enforcement decisions into Chronicle UDM via OCSF mapping.', chips: ['Bi-directional', 'OCSF'] },
    { id: 'panther', mono: 'Pa', name: 'Panther', desc: 'OCSF log source for detections-as-code teams; Panther alerts link back to session graphs.', chips: ['Bi-directional', 'OCSF'] },
  ] },
  { label: 'Ticketing & reporting', note: 'Every ticket carries the evidence bundle; every report is re-derivable.', items: [
    { id: 'jira', mono: 'Ji', name: 'Jira', desc: 'Findings open tickets with the canonical narrative and claim digests attached.', chips: ['Tickets'] },
    { id: 'servicenow', mono: 'SN', name: 'ServiceNow', desc: 'SIR finding sync with bi-directional status updates.', chips: ['Tickets'] },
    { id: 'reports', mono: 'Rp', name: 'Compliance reports', desc: 'Scheduled EU AI Act and SOC 2 evidence exports; provenance on every enforcement decision.', chips: ['EU AI Act', 'SOC 2'] },
  ] },
  { label: 'Notifications', note: 'Route by finding type and severity; step-ups page the on-call.', items: [
    { id: 'slack', mono: 'Sl', name: 'Slack', desc: 'Finding and step-up notifications to #agent-ops; approve or deny step-ups in-channel.', chips: ['Alerts', 'Step-up actions'] },
    { id: 'teams', mono: 'Tm', name: 'Microsoft Teams', desc: 'Adaptive-card notifications with links into the session graph.', chips: ['Alerts'] },
    { id: 'pagerduty', mono: 'PD', name: 'PagerDuty', desc: 'Critical findings and L1 step-ups page the on-call rotation.', chips: ['Paging'] },
  ] },
]

export const settingsTabs = ['Workspace', 'Integrations', 'Members', 'Deployment']
