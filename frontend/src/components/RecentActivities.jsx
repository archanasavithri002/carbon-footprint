import React from 'react'
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider, CircularProgress } from '@mui/material'

export default function RecentActivities({ activities, loading }){
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>Recent Activities</Typography>
        {loading ? <CircularProgress size={24} /> : (
          <List dense>
            {activities && activities.length > 0 ? activities.map(a => (
              <React.Fragment key={a.id}>
                <ListItem>
                  <ListItemText primary={`${a.activity} (${a.category})`} secondary={`${a.emissionKg || 0} kg — ${a.activityDate ? new Date(a.activityDate).toLocaleString() : ''}`} />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            )) : <Typography color="text.secondary">No recent activities</Typography>}
          </List>
        )}
      </CardContent>
    </Card>
  )
}
