import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Tooltip,
  useTheme,
  Button,
  IconButton,
  Grid,
  TextField,
  Box,
  Autocomplete,
} from '@mui/material';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import {
  Close as CloseIcon,
  AddCircleOutlineRounded as AddIcon,
  EditRounded as EditIcon,
} from '@mui/icons-material';
import {
  createUpdateData,
  searchData,
} from '../../../../../slices/CustomSlices/actions/apiActions';

export const AddOdometerAndFuel = ({ id = false, dashboard = false }) => {
  let id_token = localStorage.getItem('accessToken');
  const [vehicles, setVehicles] = useState([]);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({ vehicle_search: '' });
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createUpdateData(values, 'tracker/odometer', id_token)).then(
      (res) => {
        if (res?.response?.status !== 404) {
          setValues('');
          handleClickClose();
          toast.success('Submitted');
        } else {
          toast.error('Fail');
        }
      }
    );
  };

  useEffect(() => {
    dispatch(
      searchData(values.vehicle_search, 'vehicle/search', id_token)
    ).then((res) => setVehicles(res?.data?.results));
    // eslint-disable-next-line
  }, [values.vehicle_search]);

  const defaultProps = {
    options: vehicles,
    getOptionLabel: (option) => option.vehicle_reg_no,
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchVehicle = (event, value) => {
    setValues({ ...values, vehicle: value.id });
  };

  return (
    <>
      {id ? (
        <Button
          size="small"
          fullWidth
          onClick={() => setOpen(true)}
          startIcon={<EditIcon />}
        >
          Edit Vehicle
        </Button>
      ) : dashboard ? (
        <Button
          sx={{ mr: 1 }}
          size="small"
          variant="contained"
          onClick={() => setOpen(true)}
          startIcon={<AddIcon />}
        >
          Add Odometer And Fuel
        </Button>
      ) : (
        <Tooltip title="Add Odometer and Fuel">
          <IconButton onClick={handleClickOpen}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}

      <Dialog open={open}>
        <DialogTitle>
          {id ? 'Edit  Odometer and Fuel' : 'Add Odometer and Fuel'}
        </DialogTitle>
        <IconButton
          style={{
            position: 'absolute',
            right: theme.spacing(2),
            top: theme.spacing(2),
          }}
          onClick={handleClickClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Autocomplete
                  {...defaultProps}
                  onChange={handleSearchVehicle}
                  id="clear-on-escape"
                  name="vehicle_search"
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Find Vehicle"
                      name="vehicle_search"
                      onChange={handleChange}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  required
                  label="Odometer"
                  name="odometer"
                  variant="outlined"
                  onChange={handleChange}
                  fullWidth
                  value={values?.odometer}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  required
                  label="Fuel"
                  name="fuel"
                  variant="outlined"
                  onChange={handleChange}
                  fullWidth
                  value={values?.fuel}
                />
              </Grid>
            </Grid>

            <Box mt={2} mb={2} width={'100%'} display="flex">
              <Box flexGrow={1}>
                {values?.id && (
                  <Button
                    variant="outlined"
                    color="primary"
                    // onClick={handleSave}
                  >
                    Quick Save & Close
                  </Button>
                )}
              </Box>
              <Box mr={1}>
                <Button onClick={handleClickClose}>Close</Button>
              </Box>
              <Box>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Box>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
