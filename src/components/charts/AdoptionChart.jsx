import ReactECharts from 'echarts-for-react'
import { C, sans } from '../../theme.js'

// Dual-tone risk trend: solid observed line + dashed forecast, with policy-pack markers.
export default function AdoptionChart({ months, observedCount, cohort, packs, height = 210, onClick }) {
  const obs = observedCount - 1 // last observed index
  const split = (arr) => {
    const solid = arr.map((v, i) => (i <= obs ? v : null))
    const dash = arr.map((v, i) => (i >= obs ? v : null))
    return { solid, dash }
  }
  const mk = (arr, color) => {
    const { solid, dash } = split(arr)
    return [
      { type: 'line', data: solid, smooth: 0.35, showSymbol: false, lineStyle: { color, width: 2.4 }, z: 3, silent: true },
      { type: 'line', data: dash, smooth: 0.35, showSymbol: false, lineStyle: { color, width: 2, type: 'dashed', opacity: 0.85 }, z: 2, silent: true,
        endLabel: false,
        markPoint: { symbol: 'circle', symbolSize: 7, data: [{ coord: [months[months.length - 1], arr[arr.length - 1]], itemStyle: { color: '#fff', borderColor: color, borderWidth: 2 } }] } },
    ]
  }

  const packMarks = {
    type: 'line', data: months.map(() => null), silent: true,
    markLine: {
      symbol: 'none', silent: true,
      lineStyle: { color: C.line, type: [4, 4], width: 1 },
      label: {
        position: 'end', formatter: (p) => p.name, color: C.ter, fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace",
        padding: [0, 0, 6, 0], fontWeight: 600,
      },
      data: packs.map((pk) => ({ xAxis: months[pk.i], name: pk.label, lineStyle: { color: pk.label.includes('planned') ? 'rgba(233,89,12,0.5)' : C.line } })),
    },
  }

  const option = {
    animationDuration: 500,
    grid: { left: 6, right: 34, top: 26, bottom: 22, containLabel: true },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#fff', borderColor: C.line, borderWidth: 1,
      textStyle: { color: C.ink, fontSize: 12, fontFamily: sans },
      formatter: (ps) => {
        const i = ps[0].dataIndex
        const fc = i > obs ? ' · forecast' : ''
        return `<b>${months[i]}${fc}</b><br/>Low ${cohort.low[i]}% · Med ${cohort.med[i]}% · High ${cohort.high[i]}%`
      },
    },
    xAxis: {
      type: 'category', data: months, boundaryGap: false,
      axisLine: { lineStyle: { color: C.line } }, axisTick: { show: false },
      axisLabel: { color: C.ter, fontSize: 11.5, fontFamily: sans },
    },
    yAxis: {
      type: 'value', min: 0, max: 90, position: 'right',
      splitLine: { lineStyle: { color: 'rgba(0,0,0,0.05)' } },
      axisLabel: { color: C.ter, fontSize: 10.5, formatter: (v) => (v === 25 || v === 50 || v === 75 ? v + '%' : ''), fontFamily: sans },
      axisLine: { show: false }, axisTick: { show: false },
    },
    series: [
      { type: 'line', data: months.map(() => null), silent: true,
        markArea: { silent: true, itemStyle: { color: 'rgba(0,0,0,0.025)' }, data: [[{ xAxis: months[obs] }, { xAxis: months[months.length - 1] }]] } },
      packMarks,
      ...mk(cohort.high, C.red),
      ...mk(cohort.med, C.warn),
      ...mk(cohort.low, C.green),
    ],
  }
  return (
    <ReactECharts option={option} style={{ height, width: '100%', cursor: onClick ? 'pointer' : 'default' }}
      onEvents={onClick ? { click: onClick } : undefined} opts={{ renderer: 'svg' }} />
  )
}
