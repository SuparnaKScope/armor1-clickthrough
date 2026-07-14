# Armor1 SOC — Clickthrough

A production-style React clickthrough of the **Armor1 SOC** (Security Operations Center for
AI-agent security), rebuilt from the `Armor1 SOC - Standalone-7-12.html` design bundle into a
real, navigable app.

- **Charts** are rendered with **ECharts** (adoption trend + forecast, daily cost & projection,
  policy adoption-impact spline, risk-mix trend).
- **The session graph** is rendered with **React Flow** (claim / decision / observed lanes with
  correlation and divergence edges).
- **All data is simulated** — findings, case files, kill chains, claims, playbooks, policy
  bundles/rules, runtime decisions, token cost, and adoption cohorts — and rendered live.

## Run

```bash
npm install
npm run dev      # http://localhost:5180
npm run build    # production build to dist/
```

## What's built (fully interactive)

| Section | Screen |
|---|---|
| Posture | **Overview** — adoption trend + forecast, deployment stage, KPIs, token cost, coverage, judgment ladder |
| SOC | **Findings** list (severity filters) → **Incident detail** (case file, kill chain, evidence, enforcement record, playbook, **Rule Compiler** animation, **PR review** modal, A/B/C layout variants) |
| SOC | **Session Analysis** — React Flow graph across LLM / Hooks / OTel planes (3 replayable runs) |
| SOC | **Runtime Operations** — step-up queue (approve/deny), inline decision log |
| SOC | **Policy Management** — bundles, rules, rule detail, adoption impact, held-back-by-policy |
| Admin | **Settings** — integrations (connect/manage toggles) |
| Drill-downs | **Safe AI adoption** (users/agents cohorts) · **Token usage & cost** (team/engineer/agent) |

The other nav entries (AI Adoption, Agentic Apps, MCP Servers, Skills, Users, Insights, User
Management) are navigation stubs, matching the original prototype's scope.

Click **"Play the common flow"** in the top bar for a 6-step guided tour through triage →
investigation → remediation → verification.

## Structure

```
src/
  App.jsx            router + shell        store.jsx  central click-through state
  theme.js           design tokens
  components/        Sidebar, TopBar, Tour, PrModal, Icon, ui kit, charts/
  data/              simulated data (incidents, caseFiles, sessions, runtime, policy,
                     overview, adoption, cost, settings)
  screens/           one file per screen
```
