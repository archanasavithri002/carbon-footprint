import React from 'react'
import WeeklyLineChart from '../../components/charts/WeeklyLineChart'
import CategoryPieChart from '../../components/charts/CategoryPieChart'
import MonthlyTrend from '../../components/charts/MonthlyTrend'
import { Grid, Box, Typography } from '@mui/material'

export default function DashboardCharts({ activities }){
  return (
    <Box sx={{mt:3}}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">Weekly Emissions</Typography>
          <WeeklyLineChart activities={activities} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">Category Breakdown</Typography>
          <CategoryPieChart activities={activities} />
        </Grid>

        <Grid item xs={12} md={12}>
          <Typography variant="subtitle1">Monthly Trend</Typography>
          <MonthlyTrend activities={activities} />
        </Grid>
      </Grid>
    </Box>
  )
}
