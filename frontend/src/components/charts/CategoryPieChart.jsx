import React, { useMemo } from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1']

export default function CategoryPieChart({ activities }){
  const data = useMemo(() => {
    const map = {}
    (activities || []).forEach(a => {
      const cat = a.category || 'Unknown'
      map[cat] = (map[cat] || 0) + Number(a.emissionKg || 0)
    })
    return Object.keys(map).map((k, i) => ({ name: k, value: Number(map[k].toFixed(3)) }))
  }, [activities])

  return (
    <div style={{width:'100%', height:300}}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
