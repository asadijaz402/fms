// import { Link as RouterLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Box,
  // Breadcrumbs,
  // Button,
  Container,
  Grid,
  // Link,
  Typography,
} from "@mui/material";
import {
  AnalyticsGeneralOverview,
  // AnalyticsMostVisitedPages,
  // AnalyticsSocialMediaSources,
  // AnalyticsByTopClients,
  VOR,
  RevenueCashCollection,
  // AnalyticsTrafficSources,
} from "../../Components/Dashboard/analytics";
import useAuth from "../../hooks/useAuth";
import useSettings from "../../hooks/useSettings";
// import ChevronDownIcon from "../../icons/ChevronDown";
// import ChevronRightIcon from "../../icons/ChevronRight";
// import DownloadIcon from "../../icons/Download";
import VehicleTrends from "../../Components/Dashboard/analytics/VehicleRentTrend/VehicleTrends";
import generateGreetings from "../../lib/generateGreetings";
// import { useSelector, useDispatch } from "react-redux";
// import { downloadData } from "../../slices/CustomSlices/actions/apiActions";

const Analytics = () => {
  const { settings } = useSettings();
  const { user } = useAuth();
  // const dispatch = useDispatch();
  // let id_token = useSelector((state) => state.user.id_token);

  // const exportCSV = () => {
  //   dispatch(downloadData("vehicle/download", id_token, false));
  // };

  return (
    <>
      <Helmet>
        <title>Dashboard: Analytics | Fleet Management System</title>
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
            <Grid item>
              <Typography color="textSecondary" variant="overline">
                Analytics
              </Typography>
              <Typography color="textPrimary" variant="h5">
                {generateGreetings()}, {user.first_name}
              </Typography>
              <Typography color="textSecondary" variant="subtitle2">
                Here&apos;s what&apos;s happening today
              </Typography>
              {/* <Breadcrumbs
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
                <Typography color="textSecondary" variant="subtitle2">
                  Analytics
                </Typography>
              </Breadcrumbs> */}
            </Grid>
            <Grid item>
              {/* <Button
                endIcon={<DownloadIcon fontSize="small" />}
                variant="outlined"
                onClick={exportCSV}
              >
                Export
              </Button> */}
              {/* <Button
                color="primary"
                endIcon={<ChevronDownIcon fontSize="small" />}
                sx={{ ml: 2 }}
                variant="contained"
              >
                Last month
              </Button> */}
            </Grid>
          </Grid>
          <Box sx={{ py: 3 }}>
            <AnalyticsGeneralOverview />
          </Box>
          <Grid container spacing={3}>
            <Grid item xl={9} md={8} xs={12}>
              {/* <AnalyticsTrafficSources sx={{ height: "100%" }} /> */}
              <VehicleTrends />
            </Grid>
            {/* <Grid item xl={3} md={4} xs={12}>
              <AnalyticsByTopClients />
            </Grid> */}
            <Grid item xl={9} md={8} xs={12}>
              <VOR />
            </Grid>
            <Grid item xl={3} md={4} xs={12}>
              <RevenueCashCollection />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Analytics;
