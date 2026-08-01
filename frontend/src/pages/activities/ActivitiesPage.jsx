import React, { useState } from 'react'
import { Container, Box, TextField, Button, MenuItem, Typography, Snackbar, Alert, Grid } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import axios from '../../services/axios'
import ActivityHistory from './ActivityHistory'

export default function ActivitiesPage(){
  const { control, handleSubmit, reset } = useForm({ defaultValues:{ category:'transport', activity:'', quantity:'', unit:'' }})
  const [snack, setSnack] = useState({open:false, severity:'success', message:''})
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await axios.post('/api/activities', data)
      setSnack({open:true, severity:'success', message:'Activity logged'})
      reset({ category:'transport', activity:'', quantity:'', unit:'' })
    } catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data || err.message || 'Log failed'
      setSnack({open:true, severity:'error', message: String(msg)})
    } finally { setLoading(false) }
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{py:4}}>
        <Typography variant="h5" gutterBottom>Log Activity</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Controller name="category" control={control} render={({field}) => (
                <TextField {...field} select label="Category" fullWidth margin="normal">
                  <MenuItem value="transport">Transport</MenuItem>
                  <MenuItem value="electricity">Electricity</MenuItem>
                  <MenuItem value="food">Food</MenuItem>
                  <MenuItem value="shopping">Shopping</MenuItem>
                </TextField>
              )} />
            </Grid>

            <Grid item xs={12} md={5}>
              <Controller name="activity" control={control} render={({field}) => <TextField {...field} label="Activity" fullWidth margin="normal" />} />
            </Grid>

            <Grid item xs={6} md={2}>
              <Controller name="quantity" control={control} render={({field}) => <TextField {...field} label="Quantity" type="number" fullWidth margin="normal" />} />
            </Grid>

            <Grid item xs={6} md={2}>
              <Controller name="unit" control={control} render={({field}) => <TextField {...field} label="Unit" fullWidth margin="normal" />} />
            </Grid>
          </Grid>

          <Box sx={{display:'flex', justifyContent:'flex-end', mt:2}}>
            <Button variant="contained" type="submit" disabled={loading}>Submit</Button>
          </Box>
        </form>

        <Snackbar open={snack.open} autoHideDuration={3000} onClose={()=>setSnack(s=>({...s, open:false}))}>
          <Alert severity={snack.severity}>{snack.message}</Alert>
        </Snackbar>
      </Box>

      <ActivityHistory />
    </Container>
  )
}
