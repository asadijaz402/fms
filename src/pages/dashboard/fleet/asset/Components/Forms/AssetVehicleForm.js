import { Autocomplete, Box, Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  createUpdateData,
  getData,
} from '../../../../../../slices/CustomSlices/actions/apiActions';

export const AssetVehicleForm = ({ setOpen }) => {
  const [assetOptions, setAssetOptions] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [asset, setAsset] = useState([]);
  const [vehicle, setVehicle] = useState([]);

  const dispatch = useDispatch();
  let id_token = localStorage.getItem('accessToken');

  const vehicleChange = (value) => {
    setVehicle(value.map((data) => data.value));
  };

  const AssetChange = (value) => {
    setAsset(value.map((data) => data.value));
  };

  useEffect(() => {
    dispatch(getData('', 'assets/list', id_token, false)).then((res) => {
      setAssetOptions(
        res.data.results.map((data) => {
          return { label: data.name, value: data.id };
        })
      );
    });

    dispatch(getData('', 'vehicle/list', id_token, false)).then((res) => {
      setVehicleOptions(
        res.data.results.map((data) => {
          return { label: data.vehicle_reg_no, value: data.id };
        })
      );
    });
    // eslint-disable-next-line
  }, []);

  const handelSubmit = () => {
    dispatch(
      createUpdateData(
        {
          asset,
          vehicle_ids: vehicle,
        },
        `assets/assigned`,
        id_token,
        false
      )
    ).then((res) => setOpen(false));
  };
  return (
    <Box>
      <Autocomplete
        multiple
        // disablePortal
        options={vehicleOptions}
        onChange={(event, newValue) => {
          vehicleChange(newValue);
        }}
        sx={{ minWidth: 300, width: '100%' }}
        renderInput={(params) => (
          <TextField {...params} label="Vehicle Number" />
        )}
      />

      <Autocomplete
        multiple
        // disablePortal
        options={assetOptions}
        onChange={(event, newValue) => {
          AssetChange(newValue);
        }}
        sx={{ minWidth: 300, mt: 2, width: '100%' }}
        renderInput={(params) => <TextField {...params} label="Asset Name" />}
      />

      <Button
        variant="contained"
        sx={{ mt: 2, mr: 3, width: '46%' }}
        onClick={() => setOpen(false)}
        fullWidth
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        disabled={vehicle.length === 0}
        sx={{ mt: 2, width: '46%' }}
        onClick={handelSubmit}
        fullWidth
      >
        Submit
      </Button>
    </Box>
  );
};
