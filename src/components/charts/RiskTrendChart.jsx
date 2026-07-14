import ReactECharts from 'echarts-for-react'
import { C, sans } from '../../theme.js'

// Low/Med/High risk-share trend over months, with a selectable month cursor.
export default function RiskTrendChart({ months, low, med, high, selMonth, onPickMonth, height = 260 }) {
  const line = (data, color, fill) => ({
    type: 'line', data, smooth: 0.35, showSymbol: true, symbolSize: 6,
    lineStyle: { color, width: 2.4 }, itemStyle: { color },
    areaStyle: fill ? { color: fill } : undefined, z: 3,
  })
  const option = {
    animationDuration: 500,
    grid: { left: 6, right: 14, top: 22, bottom: 26, containLabel: true },
    tooltip: {
      trigger: 'axis', backgroundColor: '#fff', borderColor: C.line, borderWidth: 1,
      textStyle: { color: C.ink, fontSize: 12, fontFamily: sans },
      formatter: (ps) => `<b>${months[ps[0].dataIndex]}</b><br/>Low ${low[ps[0].dataIndex]}% · Med ${med[ps[0].dataIndex]}% · High ${high[ps[0].dataIndex]}%`,
    },
    xAxis: {
      type: 'category', data: months, boundaryGap: false,
      axisLine: { lineStyle: { color: C.line } }, axisTick: { show: false },
      axisLabel: { color: (v) => C.sec, fontSize: 12, fontFamily: sans,
        formatter: (v, i) => `{${i === selMonth ? 'sel' : 'norm'}|${v}}`,
        rich: { sel: { color: C.ink, fontWeight: 700, fontSize: 12.5 }, norm: { color: C.ter, fontSize: 12 } } },
    },
    yAxis: {
      type: 'value', min: 0, max: 100,
      splitLine: { lineStyle: { color: 'rgba(0,0,0,0.05)' } },
      axisLabel: { color: C.ter, fontSize: 10.5, formatter: '{value}%' }, axisLine: { show: false }, axisTick: { show: false },
    },
    series: [
      { type: 'line', data: months.map(() => 100), silent: true, showSymbol: false, lineStyle: { width: 0 },
        markLine: { symbol: 'none', silent: true, label: { show: false }, lineStyle: { color: C.ink, type: 'solid', width: 1 }, data: [{ xAxis: selMonth }] } },
      line(low, C.green, 'rgba(22,162,73,0.08)'),
      line(med, C.warn),
      line(high, C.red),
    ],
  }
  return (
    <ReactECharts option={option} style={{ height, width: '100%', cursor: 'pointer' }} opts={{ renderer: 'svg' }}
      onEvents={{ click: (p) => onPickMonth && p.dataIndex != null && onPickMonth(p.dataIndex) }} />
  )
}
