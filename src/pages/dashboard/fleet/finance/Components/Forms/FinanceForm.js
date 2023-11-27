import React, { useState, useEffect } from 'react';
import {
  Grid,
  TextField,
  Box,
  Button,
  CircularProgress,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  createUpdateData,
  editUpdateData,
  getData,
} from '../../../../../../slices/CustomSlices/actions/apiActions';

export const FinanceForm = ({
  onChange,
  rowId = false,
  disabled = false,
  handleClose,
}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  useEffect(() => {
    if (rowId) {
      setLoading(true);
      dispatch(getData(rowId, 'finances/invoice', id_token, false)).then(
        (res) => {
          setData({ ...res.data, customer: res.data.customer.id });
          setLoading(false);
          dispatch(getData('', 'hiring/bookings/list', id_token, false)).then(
            (res) => {
              setOptions(
                res.data.results.map((data) => {
                  return { label: data?.bookingGroup, value: data?.id };
                })
              );
              setLoading(false);
            }
          );
        }
      );
    }

    // eslint-disable-next-line
  }, [rowId]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    dispatch(
      !loading &&
        (!rowId
          ? createUpdateData(data, 'finances/invoice', id_token, false)
          : editUpdateData(
              !data.booking[0].bookingGroup
                ? data
                : { ...data, booking: data.booking.map((item) => item.id) },
              'finances/invoice',
              rowId,
              id_token,
              false
            ))
    ).then((res) => {
      setLoading(false);
      handleClose();
      onChange({
        target: {
          name: 'customer',
          value: res.data.customer.id,
        },
      });
    });
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
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Autocomplete
              // disablePortal
              multiple
              fullWidth
              defaultValue={data?.booking?.map((item) => {
                return { label: item?.bookingGroup, value: item?.id };
              })}
              options={options}
              onChange={(event, newValue) => {
                console.log(newValue.map((item) => item));
                setData({
                  ...data,
                  booking: newValue.map((item) => item.value),
                });
              }}
              renderInput={(params) => (
                <TextField {...params} fullWidth label="Booking ID" />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              required
              label="Amount"
              variant="outlined"
              name="total_cash"
              value={data.total_cash}
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
              label="Customer"
              variant="outlined"
              name="customer"
              value={data.customer}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            {/* <TextField
              label="Status"
              variant="outlined"
              name="status"
              value={data.status}
              fullWidth
              onChange={handleChange}
              // InputProps={{
              //   readOnly: disabled,
              // }}
            /> */}

            <FormControl sx={{ width: '100%' }}>
              <InputLabel id="demo-multiple-name-label">
                {data?.status || 'Status'}
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select"
                value={data.status}
                name="status"
                onChange={(e) => handleChange(e, false)}
              >
                <MenuItem value={'canceled'}>Canceled</MenuItem>
                <MenuItem value={'paid'}>Paid</MenuItem>
                <MenuItem value={'Unpaid'}>Unpaid</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {!disabled && (
          <Box
            mt={4}
            mb={2}
            width={'100%'}
            display="flex"
            flexDirection="row-reverse"
          >
            <Box>
              <Button
                // InputProps={{
                //   readOnly: disabled,
                // }}
                variant="contained"
                color="primary"
                type="submit"
              >
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
};
