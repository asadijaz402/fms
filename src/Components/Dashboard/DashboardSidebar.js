import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Drawer,
  Link,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Typography,
  CircularProgress,
} from '@mui/material';
import HubspotForm from 'react-hubspot-form';
import BugReportIcon from '@mui/icons-material/BugReport';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import useMediaQuery from '@mui/material/useMediaQuery';
import useAuth from '../../hooks/useAuth';
import CalendarIcon from '../../icons/Calendar';
import ChartPieIcon from '../../icons/ChartPie';
import ShoppingBagIcon from '../../icons/ShoppingBag';
import UserIcon from '../../icons/User';
import UsersIcon from '../../icons/Users';
import Logo from '../Logo';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import NavSection from '../NavSection';
import Scrollbar from '../Scrollbar';
import {
  DriveEtaRounded as CarIcon,
  CleaningServices as CleaningServicesIcon,
  Gavel as GavelIcon,
  AssignmentTurnedIn as PrecheckIcon,
  Commute as DamageIcon,
} from '@mui/icons-material';
import PaymentsIcon from '@mui/icons-material/Payments';
import LocalGasStationSharpIcon from '@mui/icons-material/LocalGasStationSharp';

import usePermissions from '../../hooks/usePermissions';
import useDashboard from '../../hooks/useDashboard';
import useInstallerContext from '../../hooks/useInstallerContext';

const sections = [
  {
    title: 'General',
    display: true,
    items: [
      {
        title: 'Analytics',
        path: '/analytics',
        icon: <ChartPieIcon fontSize="small" />,
        display: true,
      },
      {
        title: 'Account',
        path: '/account',
        icon: <UserIcon fontSize="small" />,
        display: true,
      },
    ],
  },
  {
    title: 'rentals',
    display: false,
    items: [
      {
        title: 'Bookings',
        path: '/bookings/vehicles/bookings_list',
        icon: <ShoppingBagIcon fontSize="small" />,
      },
      {
        title: 'Customers',
        path: '/bookings/customers/active',
        icon: <UsersIcon fontSize="small" />,
      },
    ],
  },
  {
    title: 'drivers',
    display: false,
    items: [
      {
        title: 'All',
        path: '/bookings/drivers/all',
        icon: <UsersIcon fontSize="small" />,
      },
      {
        title: 'Active',
        path: '/bookings/drivers/active',
        icon: <UsersIcon fontSize="small" />,
      },
      {
        title: 'Banned',
        path: '/bookings/drivers/banned',
        icon: <UsersIcon fontSize="small" />,
      },
      {
        title: 'Assigned Vehicles',
        path: '/bookings/drivers/assigned',
        icon: <UsersIcon fontSize="small" />,
      },
    ],
  },

  {
    title: 'Fleet',
    items: [
      {
        title: 'Vehicles',
        path: '/fleet/vehicles/live',
        icon: <CarIcon fontSize="small" />,
        children: [
          {
            title: 'Live',
            path: '/fleet/vehicles/live',
            action: 'GET',
          },
          {
            title: 'All',
            path: '/fleet/vehicles/all',
            action: 'GET',
          },
          {
            title: 'De-fleeted',
            path: '/fleet/vehicles/defleeted',
          },
          {
            title: 'On Hire',
            path: '/fleet/vehicles/onhire',
          },
          {
            title: 'Off Hire',
            path: '/fleet/vehicles/offhire',
          },
          {
            title: 'VOR Garages',
            path: '/fleet/vehicles/VOR_garage',
          },

          {
            title: 'VOR',
            path: '/fleet/vehicles/VOR',
          },
        ],
      },
      {
        title: 'Servicing',
        path: '/fleet/servicing/all',
        icon: <CleaningServicesIcon fontSize="small" />,
        children: [
          {
            title: 'Service Bookings',
            path: '/fleet/servicing/service_bookings',
          },
          {
            title: 'Tyres Booking',
            path: '/fleet/servicing/tyres_bookings',
          },
          {
            title: 'Brakes Booking',
            path: '/fleet/servicing/brakes_bookings',
          },
        ],
      },
      {
        title: 'Gov',
        path: '/fleet/gov/mot_bookings',
        icon: <GavelIcon fontSize="small" />,
        children: [
          {
            title: 'MOT',
            path: '/fleet/gov/mot_bookings',
          },
          {
            title: 'Road Tax',
            path: '/fleet/gov/road_tax_bookings',
          },
        ],
      },
      {
        title: 'Precheck',
        path: '/fleet/precheck/vehicles',

        icon: <PrecheckIcon fontSize="small" />,
      },
      {
        title: 'Odometer And Fuel',
        path: '/fleet/odometerandfuel/vehicles',
        icon: <LocalGasStationSharpIcon fontSize="small" />,
      },
    ],
  },
  {
    title: 'finance',
    display: true,
    items: [
      {
        title: 'Invoices',
        path: '/finance/invoice/list',
        icon: <PaymentsIcon fontSize="small" />,
      },
    ],
  },
  {
    title: 'assets',
    display: false,
    items: [
      {
        title: 'All',
        path: '/assets/list/all',
      },
      {
        title: 'Active',
        path: '/assets/list/active',
      },
      {
        title: 'Banned',
        path: '/assets/list/banned',
      },
      {
        title: 'Assigned Vehicles',
        path: '/assets/list/assigned',
      },
    ],
  },
  {
    title: 'Claims',
    items: [
      {
        title: 'Accidents',
        path: '/claims/table',
        icon: <DamageIcon fontSize="small" />,
      },
      {
        title: 'Breakdown',
        path: '/claims/Breakdown/table',
        icon: <DamageIcon fontSize="small" />,
      },
    ],
  },
  {
    title: 'Apps',
    items: [
      {
        title: 'Calendar',
        path: '/calendar',
        icon: <CalendarIcon fontSize="small" />,
      },
    ],
  },
];

const help = [
  {
    title: 'Contact US',

    icon: <ContactPageIcon fontSize="small" />,
  },
  {
    title: 'Report a Bug',

    icon: <BugReportIcon fontSize="small" />,
  },
  {
    title: 'Request a new feature',

    icon: <FeaturedPlayListIcon fontSize="small" />,
  },
];

const DashboardSidebar = (props) => {
  const { list } = usePermissions(sections);
  const { onMobileClose, openMobile } = props;
  const location = useLocation();
  const { user } = useAuth();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const [formOpen, setFormOpen] = useState(0);

  const handleClose = () => {
    setFormOpen(0);
  };

  const openDialog = (id) => {
    setFormOpen(id);
  };

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  const { navigation } = useDashboard(list);
  const { setNavigation, installed } = useInstallerContext();

  useEffect(() => {
    setNavigation(navigation);
    // eslint-disable-next-line
  }, [navigation]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Scrollbar options={{ suppressScrollX: true }}>
        <Box
          sx={{
            display: {
              lg: 'none',
              xs: 'flex',
            },
            justifyContent: 'center',
            p: 2,
          }}
        >
          <RouterLink to="/">
            <Logo
              sx={{
                height: 40,
                width: 40,
              }}
            />
          </RouterLink>
        </Box>
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'background.default',
              borderRadius: 1,
              display: 'flex',
              overflow: 'hidden',
              p: 2,
            }}
          >
            <RouterLink to="/dashboard/account">
              <Avatar
                src={user.avatar && user.avatar}
                sx={{
                  cursor: 'pointer',
                  height: 48,
                  width: 48,
                }}
              />
            </RouterLink>
            <Box sx={{ ml: 2 }}>
              <Typography color="textPrimary" variant="subtitle2">
                {`${user.first_name}`}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                {user.groups.map(
                  (group, index) => `${index !== 0 ? ', ' : ''}${group.name}`
                )}
                <Link color="primary" component={RouterLink} to="/pricing">
                  {user.plan}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          {installed.map((section) => (
            <NavSection
              key={section.title}
              pathname={location.pathname}
              sx={{
                '& + &': {
                  mt: 3,
                },
              }}
              {...section}
            />
          ))}
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography color="textSecondary" variant="body2">
            Check our docs
          </Typography>
          <Button
            color="primary"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            href="https://wiki-fleetvantage.bondwest.co.uk/"
            variant="contained"
          >
            Documentation
          </Button>

          {help.map((section, index) => (
            <MenuItem
              component={RouterLink}
              onClick={() => openDialog(index + 1)}
            >
              <ListItemIcon>{section.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <Typography color="textPrimary" variant="subtitle2">
                    {section.title}
                  </Typography>
                }
              />
            </MenuItem>
          ))}

          <Dialog open={formOpen !== 0 && true} onClose={handleClose}>
            <DialogContent>
              {formOpen === 1 ? (
                <HubspotForm
                  portalId="26915899"
                  formId="6f99314d-858c-4543-b06d-f51eede40502"
                  region="eu1"
                  loading={<CircularProgress />}
                />
              ) : formOpen === 2 ? (
                <HubspotForm
                  portalId="26915899"
                  formId="595987c2-3bbe-4a80-9d60-0bd80add175b"
                  region="eu1"
                  loading={<CircularProgress />}
                />
              ) : (
                <HubspotForm
                  portalId="26915899"
                  formId="37a05bd7-f0bb-4be4-bb89-1a7de10ce1d3"
                  region="eu1"
                  loading={<CircularProgress />}
                />
              )}
            </DialogContent>
          </Dialog>
        </Box>
      </Scrollbar>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'background.paper',
            height: 'calc(100% - 64px) !important',
            top: '64px !Important',
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onMobileClose}
      open={openMobile}
      PaperProps={{
        sx: {
          backgroundColor: 'background.paper',
          width: 280,
        },
      }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default DashboardSidebar;
