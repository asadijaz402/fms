import React, { createContext, useContext } from 'react';
import useWidgetsAdd from './useWidgetsAdd';

const DashboardContext = createContext();

export const useDashboardContext = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  const widgets = useWidgetsAdd();

  return (
    <DashboardContext.Provider value={{ ...widgets }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
