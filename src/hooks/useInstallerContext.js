import { useContext } from 'react';
import InstallerContext from '../contexts/InstallerContext';

const useInstallerContext = () => useContext(InstallerContext);

export default useInstallerContext;
