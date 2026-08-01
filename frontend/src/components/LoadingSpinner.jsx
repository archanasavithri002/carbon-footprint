import React from 'react'
import { Box, CircularProgress } from '@mui/material'

export default function LoadingSpinner(){
  return (
    <Box sx={{width:'100%', height:'60vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <CircularProgress />
    </Box>
  )
}
