import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import './i18n';
import SettingsDrawer from './Components/SettingsDrawer';
import SplashScreen from './Components/SplashScreen';
import { gtmConfig } from './config';
import useAuth from './hooks/useAuth';
import useScrollReset from './hooks/useScrollReset';
import useSettings from './hooks/useSettings';
import gtm from './lib/gtm';
import routes from './Routes';
import { createCustomTheme } from './theme';
import useInitialNotifications from './services/useInitialNotifications';
import { BuySlotDialogProvider } from './Components/payment/context/BuySlotDialogContext';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const App = () => {
  // useInitialNotifications();
  const content = useRoutes(routes);
  const { settings } = useSettings();
  const auth = useAuth();

  useScrollReset();

  useEffect(() => {
    gtm.initialize(gtmConfig);
  }, []);

  const theme = createCustomTheme({
    responsiveFontSizes: settings.responsiveFontSizes,
    roundedCorners: settings.roundedCorners,
    theme: settings.theme,
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-center" />
      <SettingsDrawer />
      <BuySlotDialogProvider>
        {auth.isInitialized ? content : <SplashScreen />}
      </BuySlotDialogProvider>
    </ThemeProvider>
  );
};

export default App;
