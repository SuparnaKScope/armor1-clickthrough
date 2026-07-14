import ReactECharts from 'echarts-for-react'
import { C, sans } from '../../theme.js'

// Adoption-impact area spline for the policy screen, with pack-ship markers.
export default function ImpactSpline({ months, low, packs, height = 220 }) {
  const option = {
    animationDuration: 500,
    grid: { left: 6, right: 14, top: 34, bottom: 24, containLabel: true },
    tooltip: {
      trigger: 'axis', backgroundColor: '#fff', borderColor: C.line, borderWidth: 1,
      textStyle: { color: C.ink, fontSize: 12, fontFamily: sans },
      formatter: (ps) => `<b>${months[ps[0].dataIndex]}</b><br/>Low-risk share ${low[ps[0].dataIndex]}%`,
    },
    xAxis: {
      type: 'category', data: months, boundaryGap: false,
      axisLine: { lineStyle: { color: C.line } }, axisTick: { show: false },
      axisLabel: { color: C.ter, fontSize: 11.5, fontFamily: sans },
    },
    yAxis: { type: 'value', min: 25, max: 80, show: false },
    series: [
      { type: 'line', data: low, smooth: 0.4, showSymbol: false, lineStyle: { color: C.green, width: 2.6 },
        areaStyle: { color: 'rgba(22,162,73,0.09)' }, z: 3,
        markLine: {
          symbol: 'none', silent: true, lineStyle: { color: C.line, type: [4, 4], width: 1 },
          label: { position: 'end', color: C.navy, fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, padding: [0, 0, 6, 0] },
          data: packs.map((p) => ({ xAxis: p.x, name: p.label })),
        },
        markPoint: { symbol: 'circle', symbolSize: 8, data: packs.map((p) => ({ coord: [p.x, p.v], itemStyle: { color: '#fff', borderColor: C.green, borderWidth: 2 } })) } },
    ],
  }
  return <ReactECharts option={option} style={{ height, width: '100%' }} opts={{ renderer: 'svg' }} />
}
