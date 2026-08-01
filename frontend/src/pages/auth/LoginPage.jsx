import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { Box, Container, TextField, Button, Typography, Snackbar, Alert } from '@mui/material'
import axios from '../../services/axios'
import { useAuth } from '../../contexts/AuthContext'

export default function LoginPage() {
  const { login, setUser } = useAuth()
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm({ defaultValues: { username: '', password: '' } })
  const [snack, setSnack] = useState({ open:false, severity:'error', message:'' })
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res = await axios.post('/api/auth/login', data)
      const token = res.data?.token
      if (!token) throw new Error('No token received')
      // Save token in context
      login(token)
      // Fetch profile immediately using token
      const profile = await axios.get('/api/user/profile', { headers: { Authorization:`Bearer ${token}` } })
      setUser(profile.data)
      // If mustResetPassword flag exists and true -> redirect to change-password
      if (profile.data?.mustResetPassword) {
        navigate('/change-password', { replace: true })
      } else {
        navigate('/app', { replace: true })
      }
    } catch (err) {
      console.error(err)
      const msg = err?.response?.data?.message || err?.response?.data || err.message || 'Login failed'
      setSnack({ open:true, severity:'error', message: String(msg) })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{py:8}}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller name="username" control={control} rules={{ required: 'Username required' }}
            render={({ field, fieldState }) => (
              <TextField {...field} label="Username" fullWidth margin="normal" error={!!fieldState.error} helperText={fieldState.error?.message}/>
          )} />
          <Controller name="password" control={control} rules={{ required: 'Password required' }}
            render={({ field, fieldState }) => (
              <TextField {...field} label="Password" type="password" fullWidth margin="normal" error={!!fieldState.error} helperText={fieldState.error?.message}/>
          )} />

          <Box sx={{display:'flex', justifyContent:'flex-end', mt:2}}>
            <Button type="submit" variant="contained" disabled={loading}>Login</Button>
          </Box>
        </form>
      </Box>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={()=>setSnack(s=>({...s,open:false}))}>
        <Alert severity={snack.severity}>{snack.message}</Alert>
      </Snackbar>
    </Container>
  )
}
