import React from 'react';
import {
  Grid,
  Box,
  TextField,
  Button,
  Backdrop,
  CircularProgress,
  Typography,
  Divider,
} from '@mui/material';
import useCustomerForm from '../Hooks/useCustomerForm';

export default function CustomerForm({ rowId, data, handleClose }) {
  const { handleSubmit, handleChange, value, loading, error } = useCustomerForm(
    rowId,
    data,
    handleClose
  );

  return (
    <form autoComplete='on' onSubmit={handleSubmit}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box pt={1}>
            <TextField
              fullWidth
              required
              autoFocus
              variant='outlined'
              label='Name'
              name='name'
              value={value.name}
              onChange={handleChange}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box pt={1}>
            <TextField
              fullWidth
              required
              name='email'
              label='Email'
              variant='outlined'
              value={value.email}
              type='email'
              onChange={handleChange}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box>
            <TextField
              fullWidth
              required
              name='mobile'
              label='Mobile Number'
              variant='outlined'
              value={value.mobile}
              onChange={handleChange}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box>
            <TextField
              fullWidth
              label='Passport Number'
              name='passport_number'
              variant='outlined'
              value={value.passport_number}
              onChange={handleChange}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box>
            <TextField
              fullWidth
              label='Bank Account Number'
              variant='outlined'
              name='bank_account_number'
              value={value.bank_account_number}
              onChange={handleChange}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box>
            <TextField
              fullWidth
              label='Insurance Number'
              name='insurance_number'
              value={value.insurance_number}
              variant='outlined'
              onChange={handleChange}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box>
            <TextField
              fullWidth
              label='Driving License'
              name='driving_license'
              variant='outlined'
              value={value.driving_license}
              onChange={handleChange}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box>
            <TextField
              fullWidth
              label='Business Registration Number'
              value={value.business_reg_number}
              variant='outlined'
              name='business_reg_number'
              onChange={handleChange}
            />
          </Box>
        </Grid>
      </Grid>
      <Box mt={2} mb={2}>
        <Divider />
      </Box>
      {error && (
        <Typography align='center' variant='body2' color='error'>
          {error}
        </Typography>
      )}
      <Box
        style={{
          mt: 3,
        }}>
        <Button
          fullWidth
          disabled={loading}
          size='large'
          variant='contained'
          color='primary'
          type='submit'>
          {rowId ? 'Update' : 'Add'}
        </Button>
      </Box>
    </form>
  );
}
