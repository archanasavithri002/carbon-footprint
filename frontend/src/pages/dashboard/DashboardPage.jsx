import React, { useEffect, useState } from 'react'
import { Container, Grid, Box, Typography } from '@mui/material'
import axios from '../../services/axios'
import DashboardCards from '../../components/DashboardCards'
import RecentActivities from '../../components/RecentActivities'
import DashboardCharts from '../../components/charts/DashboardCharts'

export default function DashboardPage(){
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    axios.get('/api/activities').then(res => {
      if (mounted) setActivities(res.data || [])
    }).catch(err => {
      console.error('Failed to fetch activities', err)
    }).finally(()=>{ if (mounted) setLoading(false) })
    return ()=> mounted = false
  }, [])

  // Aggregations
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay())
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const sumEmission = (list, startDate) => {
    return (list || []).reduce((acc, it) => {
      const d = it.activityDate ? new Date(it.activityDate) : null
      if (!d) return acc
      if (d >= startDate) {
        const val = it.emissionKg ? Number(it.emissionKg) : 0
        return acc + val
      }
      return acc
    }, 0)
  }

  const todayTotal = sumEmission(activities, startOfToday)
  const weekTotal = sumEmission(activities, startOfWeek)
  const monthTotal = sumEmission(activities, startOfMonth)

  const recent = (activities || []).slice(0,5)

  return (
    <Container maxWidth="lg">
      <Box sx={{py:4}}>
        <Typography variant="h4" gutterBottom>Dashboard</Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <DashboardCards today={todayTotal} week={weekTotal} month={monthTotal} />

            <DashboardCharts activities={activities} />
          </Grid>

          <Grid item xs={12} md={4}>
            <RecentActivities activities={recent} loading={loading} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
