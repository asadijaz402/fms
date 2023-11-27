import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ChevronRightIcon from '../../../../icons/ChevronRight';

import { getData } from '../../../../slices/CustomSlices/actions/apiActions';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import useSettings from '../../../../hooks/useSettings';
import DetailTabs from './Components/DetailTabs';
const AssetDetails = () => {
  const { assetId } = useParams();
  let id_token = localStorage.getItem('accessToken');
  const [loading, setLoading] = useState(false);
  const [details, setDetail] = useState({});
  const dispatch = useDispatch();
  const { settings } = useSettings();

  useEffect(() => {
    setLoading(true);
    dispatch(getData(assetId, 'assets', id_token)).then((res) => {
      setDetail(res.data);
      setLoading(false);
    });
    // eslint-disable-next-line
  }, [assetId]);

  return (
    <>
      <Helmet>
        <title>Fleet: Asset Details | Fleet Management System</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8,
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
          <Grid container justifyContent="space-between" spacing={3}>
            <Grid item>
              <Typography color="textPrimary" variant="h5">
                {details?.name}
              </Typography>
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<ChevronRightIcon fontSize="small" />}
                sx={{ mt: 1 }}
              >
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  to="/dashboard"
                  variant="subtitle2"
                >
                  Dashboard
                </Link>
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  to="/fleet/assets/all"
                  variant="subtitle2"
                >
                  Assets
                </Link>
                <Typography color="textSecondary" variant="subtitle2">
                  {details.name}
                </Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                {/* <AddVehicleDialog id={details.id} /> */}
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            {!loading && <DetailTabs details={details} />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AssetDetails;
