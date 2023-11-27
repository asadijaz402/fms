import { createContext } from 'react';
import PropTypes from 'prop-types';
import useInstaller from '../hooks/useInstaller';

const InstallerContext = createContext(null);

export const InstallerProvider = ({ children }) => {
  const installer = useInstaller();

  return (
    <InstallerContext.Provider value={{ ...installer }}>
      {children}
    </InstallerContext.Provider>
  );
};

InstallerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InstallerContext;
