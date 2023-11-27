import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Link,
  Typography,
  Hidden,
} from "@mui/material";
import { Settings as SettingsIcon } from "@mui/icons-material";
import ChevronRightIcon from "../../../../../icons/ChevronRight";
import useSettings from "../../../../../hooks/useSettings";
import Tabs from "./Tabs";

const SupplierVehicleList = () => {
  const { settings } = useSettings();
  const params = useParams();

  return (
    <>
      <Helmet>
        <title>
          Fleet: {params.supplierName} Vehicle List | Fleet Management System
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
          <Box display="flex">
            <Box flexGrow={1}>
              <Grid container justifyContent="space-between" spacing={3}>
                <Grid item>
                  <Typography color="textPrimary" variant="h5">
                    <b>Supplier, </b> {params.supplierName} Vehicles List
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
                      Fleet Dashboard
                    </Link>
                    <Link
                      color="textPrimary"
                      component={RouterLink}
                      to="/suppliers/all"
                      variant="subtitle2"
                    >
                      Suppliers
                    </Link>
                    <Typography color="textSecondary" variant="subtitle2">
                      Vehicles
                    </Typography>
                  </Breadcrumbs>
                </Grid>
              </Grid>
            </Box>
            <Hidden smDown>
              <Box>
                <Button
                  color="primary"
                  startIcon={<SettingsIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  href="/fleet/submodules/types"
                >
                  Sub Modules
                </Button>
              </Box>
            </Hidden>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Tabs />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SupplierVehicleList;
