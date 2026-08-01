import React from 'react'
import { Grid, Card, CardContent, Typography } from '@mui/material'

export default function DashboardCards({ today, week, month }){
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">Today's Carbon Footprint</Typography>
            <Typography variant="h5" sx={{mt:1}}>{Number(today || 0).toFixed(2)} kg CO₂e</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">This Week</Typography>
            <Typography variant="h5" sx={{mt:1}}>{Number(week || 0).toFixed(2)} kg CO₂e</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">This Month</Typography>
            <Typography variant="h5" sx={{mt:1}}>{Number(month || 0).toFixed(2)} kg CO₂e</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
