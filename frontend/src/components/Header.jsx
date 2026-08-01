import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import AccountCircle from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Header(){
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleProfile = () => {
    navigate('/app/profile')
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Carbon Footprint
          </Typography>

          {user && (
            <>
              <Typography variant="body2" sx={{mr:2}}>{user.firstName || user.username}</Typography>
              <IconButton color="inherit" onClick={handleProfile}>
                <AccountCircle />
              </IconButton>
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
