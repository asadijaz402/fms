import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Breadcrumbs,
  Button,
  Hidden,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "../../../../icons/ChevronRight";
import { Settings as SettingsIcon } from "@mui/icons-material";
import useSettings from "../../../../hooks/useSettings";
import Tabs from "./Tabs";
import { Help } from "../../../../Components/Help";
import SubModuleDialog from "../SubModules/components/SubModuleDialog";
import useGarageList from "./useGarageList.js";

const TestCom = () => {
  return <h1>Test</h1>;
};

const VehicleList = () => {
  const { settings } = useSettings();
  const { open, setOpen } = useGarageList();
  const text = `Looks like there are no Garages added.\n For adding new Services,\nFirst, you have to add Garages and \n Manufacturer_Garages in SubModules.`;

  console.log(TestCom);

  return (
    <>
      <Helmet>
        <title>Fleet: Servicing | Fleet Management System</title>
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
              <Grid
                container
                alignItems={"center"}
                justifyContent="space-between"
                spacing={3}
              >
                <Grid item>
                  <Typography color="textPrimary" variant="h5">
                    Servicing
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
                      to="/fleet/vehicles/live"
                      variant="subtitle2"
                    >
                      Vehicles
                    </Link>
                    <Typography color="textSecondary" variant="subtitle2">
                      Servicing
                    </Typography>
                  </Breadcrumbs>
                </Grid>
              </Grid>
            </Box>
            <Hidden smDown>
              <Box>
                <Button
                  color="primary"
                  size="small"
                  startIcon={<SettingsIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  href="/fleet/submodules/garage"
                >
                  Sub Modules
                </Button>
              </Box>
            </Hidden>
            <Grid>
              <Help
                video="https://youtu.be/u4uiXf8NsL8?list=PLhcwGGAFEZdcj8jtuUqCp7k2AxFIG1CRz"
                wiki="https://wiki-fleetvantage.bondwest.co.uk/en/guide/fleet/services"
              />
            </Grid>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Tabs />
            <SubModuleDialog
              id="Garage"
              open={open}
              setOpen={setOpen}
              title="Please Add Garages!"
              description={text}
              ButtonText="Add a Garage"
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default VehicleList;
