import React, { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import { Box, TextField, Autocomplete, Typography } from '@mui/material';
import { quicksearchData } from '../../../slices/CustomSlices/actions/apiActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSettings from '../../../hooks/useSettings';
import { labelGenerator } from '../../DynamicDataTable/helpers';

export default function Grouped() {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let id_token = useSelector((state) => state.user.id_token);
  const { settings } = useSettings();

  // eslint-disable-next-line
  const searchData = useCallback(
    _.debounce((searchTerm) => {
      setLoading(true);
      dispatch(
        quicksearchData(searchTerm, 'global/search/', id_token, false)
      ).then((response) => {
        setOptions(() => {
          let groups = Object.keys(response.data);
          let options = [];
          // eslint-disable-next-line
          groups.map((column) => {
            // eslint-disable-next-line
            response.data[column]?.map((row) => {
              options = [
                ...options,
                {
                  group: labelGenerator(column),
                  ...row,
                },
              ];
            });
          });
          return options;
        });
        setLoading(false);
      });
    }, 500),
    []
  );

  useEffect(() => {
    if (searchTerm) {
      searchData(searchTerm);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [searchTerm]);

  const handleSelection = (event, value) => {
    if (value.group === 'Vehicles') {
      navigate(`/fleet/vehicle/${value.id}/details`);
    } else if (value.group === 'Bookings') {
      navigate(`/bookings/details/overview/${value.label} `);
    } else if (value.group === 'Customers') {
      navigate(
        `/bookings/customers/bookings/${value.label}/${value.id}/customer_detail`
      );
    } else if (value.group === 'Drivers') {
      navigate(
        `/bookings/driver/records/${value.label}/${value.id}/driver_detail`
      );
    }
  };

  return (
    <Box
      mr={3}
      sx={
        settings.theme === 'LIGHT' && {
          backgroundColor: '#e2e2e2',
          borderRadius: 1,
        }
      }
    >
      <Autocomplete
        groupBy={(option) => option.group}
        id="grouped-autocomplete"
        freeSolo
        options={options}
        onChange={handleSelection}
        sx={{ width: 300 }}
        filterOptions={(x) => x}
        loading={loading}
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            <Box>
              <Typography>{option.label}</Typography>
              <Typography variant="subtitle2" color="GrayText">
                {option.sub_label}
              </Typography>
            </Box>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Quick Search"
            size="small"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        )}
      />
    </Box>
  );
}
