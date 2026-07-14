import ReactECharts from 'echarts-for-react'
import { C, sans } from '../../theme.js'

// Stacked daily-cost bars (production + internal dev) with a hatched July projection band.
export default function CostDailyChart({ bars, selDay, onPickDay, height = 210 }) {
  const devShare = 0.32
  const cats = bars.map((b) => (b.isProj ? 'Jul ' + (b.day - 29) : 'Jun ' + (b.day + 1)))
  const scale = 148

  const prod = [], dev = [], projLo = [], projBand = []
  bars.forEach((b) => {
    if (!b.isProj) {
      const h = Math.max(4, b.ratio * scale)
      prod.push({ value: Math.round(h * (1 - devShare)), itemStyle: { color: b.on ? C.orange : 'rgba(233,89,12,0.4)' } })
      dev.push({ value: Math.round(h * devShare), itemStyle: { color: b.on ? 'rgb(253,186,114)' : 'rgba(253,186,114,0.5)' } })
      projLo.push('-'); projBand.push('-')
    } else {
      prod.push('-'); dev.push('-')
      const lo = Math.max(3, b.ratioLo * scale)
      const band = Math.max(2, (b.ratioHi - b.ratioLo) * scale)
      projLo.push({ value: Math.round(lo), itemStyle: { color: b.on ? 'rgba(233,89,12,0.85)' : 'rgba(233,89,12,0.42)',
        decal: { symbol: 'line', dashArrayX: [1, 0], dashArrayY: [2, 4], rotation: -Math.PI / 4, color: 'rgba(255,255,255,0.55)' } } })
      projBand.push({ value: Math.round(band), itemStyle: { color: b.on ? 'rgba(233,89,12,0.22)' : 'rgba(233,89,12,0.1)' } })
    }
  })

  const anomIdx = bars.findIndex((b) => b.anom)

  const option = {
    animationDuration: 400,
    grid: { left: 4, right: 6, top: 16, bottom: 22, containLabel: true },
    tooltip: {
      trigger: 'axis', axisPointer: { type: 'none' },
      backgroundColor: '#fff', borderColor: C.line, borderWidth: 1, textStyle: { color: C.ink, fontSize: 12, fontFamily: sans },
      formatter: (ps) => bars[ps[0].dataIndex].label,
    },
    xAxis: {
      type: 'category', data: cats,
      axisLine: { lineStyle: { color: C.line } }, axisTick: { show: false },
      axisLabel: { color: C.ter, fontSize: 10.5, fontFamily: sans, interval: (i) => [0, 7, 14, 21, 29, 35, 41].includes(i),
        formatter: (v, i) => ({ 0: 'Jun 1', 7: 'Jun 8', 14: 'Jun 15', 21: 'Jun 22', 29: 'Jun 30', 35: 'Jul 6', 41: 'Jul 12' }[i] || '') },
    },
    yAxis: { type: 'value', show: false, max: scale + 6 },
    series: [
      { name: 'prod', type: 'bar', stack: 'a', data: prod, barWidth: '62%', z: 2,
        markLine: anomIdx >= 0 ? { symbol: 'none', silent: true, lineStyle: { color: C.red, width: 0 }, data: [] } : undefined },
      { name: 'dev', type: 'bar', stack: 'a', data: dev, barWidth: '62%', z: 2 },
      { name: 'projLo', type: 'bar', stack: 'a', data: projLo, barWidth: '62%', z: 1 },
      { name: 'projBand', type: 'bar', stack: 'a', data: projBand, barWidth: '62%', z: 1 },
    ],
  }
  return (
    <ReactECharts option={option} style={{ height, width: '100%', cursor: 'pointer' }} opts={{ renderer: 'svg' }}
      onEvents={{ click: (p) => onPickDay && onPickDay(bars[p.dataIndex].day) }} />
  )
}
