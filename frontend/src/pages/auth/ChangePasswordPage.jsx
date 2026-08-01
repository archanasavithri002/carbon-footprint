import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Container, Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material'
import axios from '../../services/axios'
import { useAuth } from '../../contexts/AuthContext'

export default function ChangePasswordPage(){
  const { token } = useAuth()
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm({ defaultValues:{ oldPassword:'', newPassword:'', confirmPassword:'' }})
  const [snack, setSnack] = useState({open:false, severity:'success', message:''})
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      setSnack({open:true, severity:'error', message:'Passwords do not match'})
      return
    }
    setLoading(true)
    try {
      await axios.post('/api/auth/change-password', { oldPassword: data.oldPassword, newPassword: data.newPassword })
      setSnack({open:true, severity:'success', message:'Password changed'})
      setTimeout(()=>navigate('/app'), 800)
    } catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data || err.message || 'Change password failed'
      setSnack({open:true, severity:'error', message: String(msg)})
    } finally { setLoading(false) }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{py:8}}>
        <Typography variant="h5" gutterBottom>Change Password</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller name="oldPassword" control={control} rules={{ required:'Old password required' }}
            render={({field, fieldState})=> <TextField {...field} label="Old Password" type="password" fullWidth margin="normal" error={!!fieldState.error} helperText={fieldState.error?.message}/> } />
          <Controller name="newPassword" control={control} rules={{ required:'New password required', minLength:{value:8, message:'Min 8 chars'} }}
            render={({field, fieldState})=> <TextField {...field} label="New Password" type="password" fullWidth margin="normal" error={!!fieldState.error} helperText={fieldState.error?.message}/> } />
          <Controller name="confirmPassword" control={control} rules={{ required:'Confirm password' }}
            render={({field, fieldState})=> <TextField {...field} label="Confirm Password" type="password" fullWidth margin="normal" error={!!fieldState.error} helperText={fieldState.error?.message}/> } />

          <Box sx={{display:'flex', justifyContent:'flex-end', mt:2}}>
            <Button type="submit" variant="contained" disabled={loading}>Change Password</Button>
          </Box>
        </form>
      </Box>
      <Snackbar open={snack.open} autoHideDuration={3000} onClose={()=>setSnack(s=>({...s, open:false}))}>
        <Alert severity={snack.severity}>{snack.message}</Alert>
      </Snackbar>
    </Container>
  )
}
