// Armor1 design tokens — extracted from the original prototype.
export const C = {
  ink: 'rgb(26,26,26)',
  sec: 'rgb(82,82,91)',
  ter: 'rgb(161,161,170)',
  orange: 'rgb(233,89,12)',
  orangeDeep: 'rgb(206,90,7)',
  amber: 'rgb(194,98,17)',
  softOrange: 'rgb(255,222,204)',
  green: 'rgb(22,162,73)',
  red: 'rgb(220,40,40)',
  warn: 'rgb(251,146,60)',
  navy: 'rgb(38,49,74)',
  line: 'rgb(225,225,226)',
  chip: 'rgb(244,244,245)',
  bg: '#fcfcfc',
  white: '#ffffff',
}

export const mono = "'JetBrains Mono', ui-monospace, monospace"
export const sans = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"

// Severity / status / plane style maps (mirror the original).
export const sevStyle = {
  Critical: { bg: 'rgba(220,40,40,0.09)', color: C.red },
  High: { bg: 'rgba(233,89,12,0.1)', color: C.orange },
  Medium: { bg: 'rgba(251,146,60,0.14)', color: 'rgb(194,98,17)' },
  Low: { bg: 'rgb(244,244,245)', color: C.sec },
}
export const statusColor = {
  Contained: C.navy,
  Investigating: C.orange,
  'Remediation open': 'rgb(194,98,17)',
  Triaged: C.sec,
  'Closed — proven': C.green,
}
export const planeStyle = {
  LLM: { bg: 'rgba(38,49,74,0.08)', color: C.navy },
  Hooks: { bg: 'rgba(233,89,12,0.1)', color: C.orange },
  OTel: { bg: 'rgba(22,162,73,0.1)', color: C.green },
  DPE: { bg: 'rgba(220,40,40,0.09)', color: C.red },
}
export const verdictStyle = {
  ALLOW: { bg: 'rgba(22,162,73,0.1)', color: C.green },
  BLOCK: { bg: 'rgba(220,40,40,0.09)', color: C.red },
  REDACT: { bg: 'rgba(38,49,74,0.08)', color: C.navy },
  'STEP-UP': { bg: 'rgb(255,222,204)', color: 'rgb(206,90,7)' },
}
