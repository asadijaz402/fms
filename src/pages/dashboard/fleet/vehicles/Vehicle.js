import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Link,
  Typography,
  Hidden,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { Settings as SettingsIcon } from '@mui/icons-material';
import ChevronRightIcon from '../../../../icons/ChevronRight';
import DownloadIcon from '../../../../icons/Download';
import useSettings from '../../../../hooks/useSettings';
import Tabs from './Tabs';
import useExport from '../../../../hooks/useExport';
import { Help } from '../../../../Components/Help';
import useListData from './useListData';
import SubModuleDialog from '../SubModules/components/SubModuleDialog';
import BuySlotDialog from '../../../../Components/payment/dialogs/BuySlotDialog';
import More from './components/More';
import Import from './dialogs/Import';

const VehicleList = () => {
  const { settings } = useSettings();
  const [bulk, setBulk] = React.useState(false);
  const location = useLocation();

  const handleClickBulk = () => {
    setBulk(true);
  };

  const handleClose = () => {
    setBulk(false);
  };
  const { loading, onClickExport } = useExport('csv', 'vehicle/download');
  const video =
    location.pathname.split('/')[3] === 'VOR'
      ? 'https://youtu.be/V6B7OqrohNc?list=PLhcwGGAFEZdcj8jtuUqCp7k2AxFIG1CRz'
      : location.pathname.split('/')[3] === 'VOR_garage'
      ? 'https://youtu.be/Kr8t4r63cOw?list=PLhcwGGAFEZdcj8jtuUqCp7k2AxFIG1CRz'
      : location.pathname.split('/')[3] === 'defleeted'
      ? 'https://youtu.be/w4pXxhdx_aM?list=PLhcwGGAFEZdcj8jtuUqCp7k2AxFIG1CRz'
      : 'https://youtu.be/FN1rMhmBT-o?list=PLhcwGGAFEZdcj8jtuUqCp7k2AxFIG1CRz';
  const { open, setOpen } = useListData();
  const text = `Oops! Looks like there are no Groups added.\nFor adding new Vehicles,\nFirst you have to add Groups in SubModules.`;

  const wiki =
    location.pathname.split('/')[3] === 'VOR'
      ? 'https://wiki-fleetvantage.bondwest.co.uk/en/guide/fleet/vor'
      : location.pathname.split('/')[3] === 'VOR_garage'
      ? 'https://wiki-fleetvantage.bondwest.co.uk/en/guide/fleet/vor'
      : 'https://wiki-fleetvantage.bondwest.co.uk/en/guide/fleet/vehicles';

  return (
    <>
      <Helmet>
        <title>Fleet: Vehicle List | Fleet Management System</title>
      </Helmet>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8,
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Grid
                container
                alignItems={'center'}
                justifyContent="space-between"
                spacing={3}
              >
                <Grid item>
                  <Typography color="textPrimary" variant="h5">
                    Vehicles List
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
                      Vehicles
                    </Typography>
                  </Breadcrumbs>
                  <Box
                    display="flex"
                    sx={{
                      mb: -1,
                      mx: -1,
                      mt: 1,
                    }}
                  >
                    <Box>
                      <Button
                        color="primary"
                        startIcon={<DownloadIcon fontSize="small" />}
                        sx={{ m: 1 }}
                        onClick={onClickExport}
                      >
                        Export
                      </Button>
                    </Box>
                    <Box>
                      <Import />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Hidden smDown>
              <Box>
                <Button
                  size="small"
                  startIcon={<SettingsIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  href="/fleet/submodules/types"
                >
                  Sub Modules
                </Button>
              </Box>
            </Hidden>
            <Grid>
              <Box display={'flex'} sx={{ alignItems: 'center' }}>
                <Box>
                  <Help video={video} wiki={wiki} />
                </Box>
                <Box>
                  <More />
                </Box>
              </Box>
            </Grid>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Tabs />
            <SubModuleDialog
              id="Group"
              open={open}
              setOpen={setOpen}
              title="Please Add Groups!"
              description={text}
              ButtonText="Add a Group"
            />
            <BuySlotDialog />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default VehicleList;
