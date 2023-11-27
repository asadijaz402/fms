import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "../../../../../icons/ChevronRight";
import useSettings from "../../../../../hooks/useSettings";
import Tabs from "./Tabs";
import DriverDialog from "../../Components/Dialogs/DriverDialog";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../../../slices/CustomSlices/actions/apiActions";

const VehicleList = () => {
  const { settings } = useSettings();
  const params = useParams();
  const dispatch = useDispatch();
  const idToken = useSelector((state) => state.user.id_token);

  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const fetchDriverData = () => {
    setLoading(true);
    dispatch(getData(params.driverId, "driver", idToken, false)).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  };

  React.useEffect(() => {
    if (params?.driverId) {
      fetchDriverData();
    }

    // eslint-disable-next-line
  }, [params]);

  return (
    <>
      <Helmet>
        <title>
          Driver: {params.driverName} Vehicle Records | Fleet Management System
        </title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 8,
        }}
      >
        <Container maxWidth={settings.compact ? "xl" : false}>
          <Grid container justifyContent="space-between" spacing={3}>
            <Grid item xs={12} sm={12} md={10} lg={10}>
              <Typography color="textPrimary" variant="h5">
                Driver, {params.DriverName} Vehicle Records
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
                  to="/bookings/drivers/active"
                  variant="subtitle2"
                >
                  Drivers
                </Link>
                <Typography color="textSecondary" variant="subtitle2">
                  {params.driverName} Vehicle Records
                </Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2}>
              <Box sx={{ width: "100%", textAlign: "right" }}>
                {!loading && (
                  <DriverDialog type="assign" rowId={data.id} data={data} />
                )}
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Tabs />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default VehicleList;
