import React, { useMemo } from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

function formatDateLabel(date) {
  const d = new Date(date)
  return `${d.getMonth()+1}/${d.getDate()}`
}

export default function WeeklyLineChart({ activities }){
  const data = useMemo(() => {
    const days = []
    const now = new Date()
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i)
      const key = d.toISOString().slice(0,10)
      days.push({ key, label: formatDateLabel(d), total: 0 })
    }

    (activities || []).forEach(a => {
      if (!a.activityDate) return
      const key = new Date(a.activityDate).toISOString().slice(0,10)
      const entry = days.find(x => x.key === key)
      if (entry) entry.total += Number(a.emissionKg || 0)
    })

    return days.map(d => ({ name: d.label, emission: Number(d.total.toFixed(3)) }))
  }, [activities])

  return (
    <div style={{width:'100%', height:240}}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="emission" stroke="#1976d2" strokeWidth={2} dot={{ r:2 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
