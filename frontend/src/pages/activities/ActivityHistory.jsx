import React, { useEffect, useState } from 'react'
import { Container, Box, Typography } from '@mui/material'
import axios from '../../services/axios'
import ActivityTable from '../../components/ActivityTable'

export default function ActivityHistory(){
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    axios.get('/api/activities').then(res => {
      if (mounted) setActivities(res.data || [])
    }).catch(err => {
      console.error('Failed to fetch activities', err)
    }).finally(() => { if (mounted) setLoading(false) })
    return () => mounted = false
  }, [])

  return (
    <Container maxWidth="lg">
      <Box sx={{py:3}}>
        <Typography variant="h6" gutterBottom>Activity History</Typography>
        <ActivityTable rows={activities} />
      </Box>
    </Container>
  )
}
