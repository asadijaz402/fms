import { Dialog as MUIDialog } from '@mui/material';
import useInstallerContext from '../hooks/useInstallerContext';

export function Dialog({ children, installer = false, ...props }) {
  const { installerHidden } = useInstallerContext();

  if (installer && installerHidden(installer)) {
    return <></>;
  }

  return <MUIDialog {...props}>{children}</MUIDialog>;
}
