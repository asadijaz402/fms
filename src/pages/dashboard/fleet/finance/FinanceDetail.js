import { Link as RouterLink, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import useSettings from '../../../../hooks/useSettings';
import ChevronRightIcon from '../../../../icons/ChevronRight';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../../../slices/CustomSlices/actions/apiActions';
import Tabs from './Components/FinanceDetail/Tabs';

const FinanceDetail = () => {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState();

  let { id } = useParams();
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  const { settings } = useSettings();

  useEffect(() => {
    setLoading(true);
    dispatch(getData(id, 'finances/invoice', id_token, false)).then((res) => {
      if (res.status === 200) {
        setDetails(res.data);
        setLoading(false);
      }
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Fleet: Invoice Details | Fleet Management System</title>
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
                {details?.created_by}
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
                  to="/dashboard"
                  variant="subtitle2"
                >
                  Finance
                </Link>
                <Typography color="textSecondary" variant="subtitle2">
                  {details?.created_by}
                </Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                {/* <Button
              color="primary"
              component={RouterLink}
              startIcon={<PencilAltIcon fontSize="small" />}
              sx={{ m: 1 }}
              to="/dashboard/customers/1/edit"
              variant="contained"
            >
              Edit
            </Button> */}
                {/* {details.id && <FinanceDialog id={details?.id} />} */}
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>{!loading && <Tabs details={details} />}</Box>
        </Container>
      </Box>
    </>
  );
};

export default FinanceDetail;
