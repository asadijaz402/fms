import { Link as RouterLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "../../../../icons/ChevronRight";
import useSettings from "../../../../hooks/useSettings";
import useVehicleDetails from "./hooks/useVehicleDetails";
import Tabs from "./Tabs";
import AddVehicleDialog from "../vehicles/dialogs/AddVehicleDialog";

const CustomerDetails = () => {
  const { details, loading } = useVehicleDetails();
  const { settings } = useSettings();

  return (
    <>
      <Helmet>
        <title>Fleet: Vehicle Details | Fleet Management System</title>
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
              <Typography color="textPrimary" variant="h5">
                {details.vehicle_reg_no}
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
                  Management
                </Link>
                <Typography color="textSecondary" variant="subtitle2">
                  {details.vehicle_reg_no}
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
                <AddVehicleDialog id={details.id} />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>{!loading && <Tabs details={details} />}</Box>
        </Container>
      </Box>
    </>
  );
};

export default CustomerDetails;
