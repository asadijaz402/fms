import React from "react";
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
import Tabs from "./Tabs";
import { Help } from "../../../../Components/Help";
import { BuySlotDialogProvider } from "../../../../Components/payment/context/BuySlotDialogContext";
import BuySlotDialog from "../../../../Components/payment/dialogs/BuySlotDialog";

const VehicleList = () => {
  const { settings } = useSettings();

  return (
    <>
      <BuySlotDialogProvider>
        <Helmet>
          <title>Fleet: Submodules | Fleet Management System</title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: "background.default",
            minHeight: "100%",
            py: 8,
          }}
        >
          <Container maxWidth={settings.compact ? "xl" : false}>
            <Grid
              container
              alignItems={"center"}
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item>
                <Typography color="textPrimary" variant="h5">
                  Sub Modules
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
                  <Typography color="textSecondary" variant="subtitle2">
                    Submodules
                  </Typography>
                </Breadcrumbs>
              </Grid>
              <Grid item>
                <Help
                  video="https://www.youtube.com/watch?v=Zs7DFt7rVAg&list=PLhcwGGAFEZdcj8jtuUqCp7k2AxFIG1CRz&index=3"
                  wiki="https://wiki-fleetvantage.bondwest.co.uk/en/guide/sub-modules"
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <Tabs />
            </Box>
          </Container>
        </Box>
        <BuySlotDialog />
      </BuySlotDialogProvider>
    </>
  );
};

export default VehicleList;
