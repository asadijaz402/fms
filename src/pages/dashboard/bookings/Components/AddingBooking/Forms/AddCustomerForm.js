import React, { useState, useEffect } from 'react';
import { Grid, TextField, Box, Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  createUpdateData,
  getData,
} from '../../../../../../slices/CustomSlices/actions/apiActions';

export default function AddCustomerForm({
  onChange,
  userId = false,
  disabled = false,
  handleClose,
}) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      dispatch(getData(userId, 'hiring/customer', id_token, false)).then(
        (res) => {
          setData(res.data);
          setLoading(false);
        }
      );
    }
    // eslint-disable-next-line
  }, [userId]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(createUpdateData(data, 'hiring/customer', id_token, false)).then(
      (res) => {
        onChange({
          target: {
            name: 'customer',
            value: res.data.id,
          },
        });
        setLoading(false);
        handleClose();
      }
    );
  };

  if (loading) {
    return (
      <Box fullWidth style={{ textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              required
              variant='outlined'
              label='Name'
              value={data.name}
              fullWidth
              onChange={handleChange}
              // InputProps={{
              //   readOnly: disabled,
              // }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              required
              label='Email'
              variant='outlined'
              value={data.email}
              type='email'
              fullWidth
              onChange={handleChange}
              // InputProps={{
              //   readOnly: disabled,
              // }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              InputProps={{
                readOnly: disabled,
              }}
              required
              label='Mobile Number'
              variant='outlined'
              value={data.mobile}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              label='Passport Number'
              variant='outlined'
              value={data.passport_number}
              fullWidth
              onChange={handleChange}
              // InputProps={{
              //   readOnly: disabled,
              // }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              label='Bank Account Number'
              variant='outlined'
              value={data.bank_account_number}
              fullWidth
              // InputProps={{
              //   readOnly: disabled,
              // }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              InputProps={{
                readOnly: disabled,
              }}
              label='Insurance Number'
              value={data.insurance_number}
              fullWidth
              variant='outlined'
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              // InputProps={{
              //   readOnly: disabled,
              // }}
              label='Driving License'
              variant='outlined'
              value={data.driving_license}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              label='Business Registration Number'
              value={data.business_reg_number}
              variant='outlined'
              fullWidth
              // InputProps={{
              //   readOnly: disabled,
              // }}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        {!disabled && (
          <Box
            mt={4}
            mb={2}
            width={'100%'}
            display='flex'
            flexDirection='row-reverse'>
            <Box>
              <Button
                // InputProps={{
                //   readOnly: disabled,
                // }}
                variant='contained'
                color='primary'
                type='submit'>
                Submit
              </Button>
            </Box>
            <Box mr={1}>
              <Button onClick={handleClose}>Close</Button>
            </Box>
          </Box>
        )}
      </form>
    );
  }
}
