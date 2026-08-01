import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Container, Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material'
import axios from '../../services/axios'

export default function ProfilePage(){
  const { control, handleSubmit, reset } = useForm()
  const [loading, setLoading] = useState(false)
  const [snack, setSnack] = useState({open:false, severity:'success', message:''})

  useEffect(()=> {
    let mounted = true
    axios.get('/api/user/profile').then(res => { if (mounted) reset(res.data) }).catch(() => {})
    return ()=> mounted = false
  }, [reset])

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res = await axios.put('/api/user/profile', data)
      setSnack({open:true, severity:'success', message:'Profile saved'})
      reset(res.data)
    } catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data || err.message || 'Save failed'
      setSnack({open:true, severity:'error', message: String(msg)})
    } finally { setLoading(false) }
  }

  return (
    <Container maxWidth="md">
      <Box sx={{py:4}}>
        <Typography variant="h5" gutterBottom>Profile</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller name="firstName" control={control} defaultValue="" render={({field})=> <TextField {...field} label="First Name" fullWidth margin="normal" /> } />
          <Controller name="lastName" control={control} defaultValue="" render={({field})=> <TextField {...field} label="Last Name" fullWidth margin="normal" /> } />
          <Controller name="phone" control={control} defaultValue="" render={({field})=> <TextField {...field} label="Phone" fullWidth margin="normal" /> } />
          <Controller name="addressLine1" control={control} defaultValue="" render={({field})=> <TextField {...field} label="Address" fullWidth margin="normal" /> } />
          <Box sx={{display:'flex', gap:2}}>
            <Controller name="city" control={control} defaultValue="" render={({field})=> <TextField {...field} label="City" fullWidth margin="normal" /> } />
            <Controller name="state" control={control} defaultValue="" render={({field})=> <TextField {...field} label="State" fullWidth margin="normal" /> } />
          </Box>
          <Box sx={{display:'flex', justifyContent:'flex-end', mt:2}}>
            <Button type="submit" variant="contained" disabled={loading}>Save</Button>
          </Box>
        </form>
      </Box>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={()=>setSnack(s=>({...s, open:false}))}>
        <Alert severity={snack.severity}>{snack.message}</Alert>
      </Snackbar>
    </Container>
  )
}
