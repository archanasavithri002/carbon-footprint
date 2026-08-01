import React from 'react'
import { Container, Box, Typography } from '@mui/material'

export default function NotFoundPage(){
  return (
    <Container>
      <Box sx={{textAlign:'center', py:8}}>
        <Typography variant="h3">404 - Page Not Found</Typography>
      </Box>
    </Container>
  )
}
