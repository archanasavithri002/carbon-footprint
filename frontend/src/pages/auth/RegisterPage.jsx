import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  Stepper,
  Step,
  StepLabel,
  TextField,
  MenuItem,
  Typography,
  Snackbar,
  Alert
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import axios from '../../services/axios'

const steps = ['Personal', 'Address', 'Government']

export default function RegisterPage(){
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [snack, setSnack] = useState({open:false, severity:'success', message:''})

  const { control, handleSubmit, trigger, getValues } = useForm({
    defaultValues: {
      firstName:'', lastName:'', gender:'', dob:'', phone:'', email:'',
      addressLine1:'', city:'', state:'', country:'', postalCode:'',
      govIdType:'', govIdNumber:''
    }
  })

  const next = async () => {
    // validate current step fields
    let valid = false
    if (activeStep === 0) {
      valid = await trigger(['firstName','email','phone'])
    } else if (activeStep === 1) {
      valid = await trigger(['addressLine1','city','state','country','postalCode'])
    } else {
      valid = true
    }
    if (valid) setActiveStep(s => Math.min(s+1, steps.length-1))
  }

  const prev = () => setActiveStep(s => Math.max(s-1,0))

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      await axios.post('/api/registration', data)
      setSnack({open:true, severity:'success', message:'Registration submitted successfully'})
      setTimeout(()=>navigate('/login'), 1200)
    } catch (err) {
      console.error(err)
      setSnack({open:true, severity:'error', message: err?.response?.data?.message || 'Registration failed'})
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Container maxWidth="md">
      <Box sx={{py:6}}>
        <Typography variant="h4" gutterBottom>Register</Typography>
        <Stepper activeStep={activeStep} sx={{mb:4}}>
          {steps.map(s => (
            <Step key={s}><StepLabel>{s}</StepLabel></Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit(onSubmit)}>
          {activeStep === 0 && (
            <Box sx={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:2}}>
              <Controller name="firstName" control={control} rules={{required:'First name required'}} render={({field, fieldState})=> (
                <TextField {...field} label="First Name" error={!!fieldState.error} helperText={fieldState.error?.message} />
              )} />

              <Controller name="lastName" control={control} render={({field})=> (
                <TextField {...field} label="Last Name" />
              )} />

              <Controller name="gender" control={control} render={({field})=> (
                <TextField {...field} label="Gender" select>
                  <MenuItem value="">Prefer not to say</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              )} />

              <Controller name="dob" control={control} render={({field})=> (
                <TextField {...field} label="Date of Birth" type="date" InputLabelProps={{shrink:true}} />
              )} />

              <Controller name="phone" control={control} rules={{required:'Phone required'}} render={({field, fieldState})=> (
                <TextField {...field} label="Phone" error={!!fieldState.error} helperText={fieldState.error?.message} />
              )} />

              <Controller name="email" control={control} rules={{required:'Email required', pattern:{value:/^\S+@\S+$/i, message:'Invalid email'}}} render={({field, fieldState})=> (
                <TextField {...field} label="Email" error={!!fieldState.error} helperText={fieldState.error?.message} />
              )} />
            </Box>
          )}

          {activeStep === 1 && (
            <Box sx={{display:'grid', gridTemplateColumns:'1fr', gap:2}}>
              <Controller name="addressLine1" control={control} rules={{required:'Address required'}} render={({field, fieldState})=> (
                <TextField {...field} label="Address" error={!!fieldState.error} helperText={fieldState.error?.message} />
              )} />

              <Box sx={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:2}}>
                <Controller name="city" control={control} rules={{required:'City required'}} render={({field, fieldState})=> (
                  <TextField {...field} label="City" error={!!fieldState.error} helperText={fieldState.error?.message} />
                )} />

                <Controller name="state" control={control} rules={{required:'State required'}} render={({field, fieldState})=> (
                  <TextField {...field} label="State" error={!!fieldState.error} helperText={fieldState.error?.message} />
                )} />
              </Box>

              <Box sx={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:2}}>
                <Controller name="country" control={control} rules={{required:'Country required'}} render={({field, fieldState})=> (
                  <TextField {...field} label="Country" error={!!fieldState.error} helperText={fieldState.error?.message} />
                )} />

                <Controller name="postalCode" control={control} rules={{required:'Pincode required'}} render={({field, fieldState})=> (
                  <TextField {...field} label="Pincode" error={!!fieldState.error} helperText={fieldState.error?.message} />
                )} />
              </Box>
            </Box>
          )}

          {activeStep === 2 && (
            <Box sx={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:2}}>
              <Controller name="govIdType" control={control} render={({field})=> (
                <TextField {...field} label="Gov ID Type (e.g., Aadhaar)" />
              )} />

              <Controller name="govIdNumber" control={control} render={({field})=> (
                <TextField {...field} label="Gov ID Number" />
              )} />
            </Box>
          )}

          <Box sx={{display:'flex', justifyContent:'space-between', mt:4}}>
            <Button disabled={activeStep===0} onClick={prev}>Previous</Button>
            {activeStep < steps.length -1 ? (
              <Button variant="contained" onClick={next}>Next</Button>
            ) : (
              <Button type="submit" variant="contained" disabled={submitting}>Submit</Button>
            )}
          </Box>
        </form>

        <Snackbar open={snack.open} autoHideDuration={3000} onClose={()=>setSnack(s=>({...s, open:false}))}>
          <Alert severity={snack.severity} sx={{width:'100%'}}>{snack.message}</Alert>
        </Snackbar>
      </Box>
    </Container>
  )
}
