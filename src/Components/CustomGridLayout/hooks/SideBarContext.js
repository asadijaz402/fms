import React, { createContext, useContext } from 'react';
import useWidgetDrawer from './useWidgetDrawer';

const SideBarContext = createContext();

export const useSideBarContext = () => useContext(SideBarContext);

export const SideBarProvider = ({ children }) => {
  const sidebar = useWidgetDrawer();
  return (
    <SideBarContext.Provider value={{ ...sidebar }}>
      {children}
    </SideBarContext.Provider>
  );
};

export default SideBarProvider;
