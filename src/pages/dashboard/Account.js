import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Breadcrumbs,
  Container,
  Divider,
  Grid,
  Link,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import {
  AccountBillingSettings,
  AccountGeneralSettings,
  AccountNotificationsSettings,
  AccountSecuritySettings,
} from '../../Components/Dashboard/account';
import useSettings from '../../hooks/useSettings';
import ChevronRightIcon from '../../icons/ChevronRight';
import MasterExport from '../../Components/Dashboard/account/MasterExport';
import CompanyInfo from '../../Components/Dashboard/account/CompanyInfo';
import InstallApps from '../../Components/Dashboard/account/InstallApps';

const tabs = [
  { label: 'General', value: 'general' },
  // { label: "Billing", value: "billing" },
  // { label: "Notifications", value: "notifications" },
  { label: 'Security', value: 'security' },
  { label: 'Master Export', value: 'masterExport' },
  { label: 'Subscription Detail', value: 'CompanyInfo' },
  { label: 'Apps', value: 'apps' },
];

const Account = () => {
  const { settings } = useSettings();
  const [currentTab, setCurrentTab] = useState('general');

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <>
      <Helmet>
        <title>Dashboard: Account | FMS</title>
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
                Account
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
                <Typography color="textSecondary" variant="subtitle2">
                  Account
                </Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
          </Box>
          <Divider />
          <Box sx={{ mt: 3 }}>
            {currentTab === 'general' && <AccountGeneralSettings />}
            {currentTab === 'billing' && <AccountBillingSettings />}
            {currentTab === 'notifications' && <AccountNotificationsSettings />}
            {currentTab === 'security' && <AccountSecuritySettings />}
            {currentTab === 'masterExport' && <MasterExport />}
            {currentTab === 'CompanyInfo' && <CompanyInfo />}
            {currentTab === 'apps' && <InstallApps />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Account;
