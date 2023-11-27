import React from 'react';
import DashboardProvider from './hooks/DashboardContext';
import CustomDashboard from './components/Dashboard/CustomDashboard';
import SideBarProvider from './hooks/SideBarContext';
import { InstallerProvider } from '../../contexts/InstallerContext';

function MainDashboard() {
  return (
    <InstallerProvider>
      <DashboardProvider>
        <SideBarProvider>
          <CustomDashboard />
        </SideBarProvider>
      </DashboardProvider>
    </InstallerProvider>
  );
}

export default MainDashboard;
