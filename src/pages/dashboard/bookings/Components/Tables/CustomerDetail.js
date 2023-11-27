import { Grid } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getData } from '../../../../../slices/CustomSlices/actions/apiActions';
import CustomerBasicDetailsCard from '../CustomerDetailsCard';
import CustomerCustomDetailsCard from '../CustomerCustomDetailsCard';

export const CustomerDetail = ({ context }) => {
  let id_token = localStorage.getItem('accessToken');
  const [details, setDetail] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData(context, 'hiring/customer', id_token)).then((res) =>
      setDetail(res.data)
    );
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item sm={12} xs={12} md={6} lg={6}>
          <CustomerBasicDetailsCard details={details} />
        </Grid>
        {details?.customFields && (
          <Grid item sm={12} xs={12} md={6} lg={6}>
            <CustomerCustomDetailsCard details={details} />
          </Grid>
        )}
      </Grid>
    </div>
  );
};
