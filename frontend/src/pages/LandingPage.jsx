import React from 'react'
import { Container, Box, Typography, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function LandingPage(){
  return (
    <Container maxWidth="lg">
      <Box sx={{textAlign:'center', py:8}}>
        <Typography variant="h2" gutterBottom>
          Carbon Footprint Monitoring
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{mb:4}}>
          Track and reduce your carbon footprint with personalized insights.
        </Typography>
        <Box>
          <Button component={RouterLink} to="/login" variant="contained" sx={{mr:2}}>Login</Button>
          <Button component={RouterLink} to="/register" variant="outlined">Register</Button>
        </Box>
      </Box>

      <Box sx={{py:4}}>
        <Typography variant="h4" gutterBottom>About</Typography>
        <Typography color="text.secondary">This application helps users log activities and calculate CO₂ emissions.</Typography>
      </Box>

      <Box sx={{py:4}}>
        <Typography variant="h4" gutterBottom>Features</Typography>
        <ul>
          <li>Activity logging</li>
          <li>Emission calculation</li>
          <li>User profile</li>
        </ul>
      </Box>
    </Container>
  )
}
