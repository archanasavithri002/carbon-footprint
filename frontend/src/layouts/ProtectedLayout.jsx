import React from 'react'
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default function ProtectedLayout(){
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  )
}
