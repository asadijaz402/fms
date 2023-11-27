import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getData } from '../../../slices/CustomSlices/actions/apiActions';
import DriverBasicDetailsCard from './Components/DriverBasicdetailsCard';
import DriverCustomDetailsCard from './Components/DriverCustomDetailsCard';

export const DriverDetail = ({ content }) => {
  let id_token = localStorage.getItem('accessToken');
  const [details, setDetail] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData(content, 'driver', id_token)).then((res) =>
      setDetail(res.data)
    );
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item sm={12} xs={12} md={6} lg={6}>
          <DriverBasicDetailsCard details={details} />
        </Grid>
        {details?.customFields && (
          <Grid item sm={12} xs={12} md={6} lg={6}>
            <DriverCustomDetailsCard details={details} />
          </Grid>
        )}
      </Grid>
    </div>
  );
};
