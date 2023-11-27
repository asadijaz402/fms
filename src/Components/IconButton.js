import { IconButton as MUIIconButton } from '@mui/material';
import useInstallerContext from '../hooks/useInstallerContext';

export function IconButton({ children, installer = false, ...props }) {
  const { installerHidden } = useInstallerContext();

  if (installer && installerHidden(installer)) {
    return <></>;
  }

  return <MUIIconButton {...props}>{children}</MUIIconButton>;
}
