import React, { useMemo } from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

function monthLabel(d) {
  const dt = new Date(d)
  return `${dt.getFullYear()}-${(dt.getMonth()+1).toString().padStart(2,'0')}`
}

export default function MonthlyTrend({ activities }){
  const data = useMemo(()=>{
    const now = new Date()
    const months = []
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const key = `${d.getFullYear()}-${d.getMonth()+1}`
      months.push({ key, label: monthLabel(d), total:0 })
    }
    (activities || []).forEach(a => {
      if (!a.activityDate) return
      const dt = new Date(a.activityDate)
      const key = `${dt.getFullYear()}-${dt.getMonth()+1}`
      const entry = months.find(m => m.key === key)
      if (entry) entry.total += Number(a.emissionKg || 0)
    })
    return months.map(m => ({ name: m.label, emission: Number(m.total.toFixed(3)) }))
  }, [activities])

  return (
    <div style={{width:'100%', height:240}}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="emission" stroke="#82ca9d" strokeWidth={2} dot={{ r:2 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
