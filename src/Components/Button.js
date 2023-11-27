import { Button as MUIButton } from '@mui/material';
import useInstallerContext from '../hooks/useInstallerContext';

export function Button({ children, installer = false, ...props }) {
  const { installerHidden } = useInstallerContext();

  if (installer && installerHidden(installer)) {
    return <></>;
  }

  return <MUIButton {...props}>{children}</MUIButton>;
}
