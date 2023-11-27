import { useState } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

const Options = [
  {
    name: 'widgets',
    icon: <DashboardIcon />,
  },
  {
    name: 'options',
    icon: <SettingsSuggestIcon />,
  },
];

export default function useWidgetDrawer() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const toggleDrawer = (name) => {
    if (name === 'widgets') {
      if (open2) {
        setOpen2(false);
      }
      setOpen(!open);
    } else if (name === 'options') {
      if (open) {
        setOpen(false);
      }
      setOpen2(true);
    }
  };

  return { open, open2, Options, setOpen2, toggleDrawer };
}
