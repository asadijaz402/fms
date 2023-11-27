import React from 'react';
import {
  Box,
  Drawer as MuiDrawer,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const drawerWidth = '100%';
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function SideBar({ toggleDrawer, Options }) {
  return (
    <Box mt={8}>
      <Drawer variant="permanent" sx={{ height: '100vh', overflowY: 'hidden' }}>
        <List component="nav">
          {Options.map((item) => {
            return (
              <Box>
                <Box pb={1} pt={1}>
                  <ListItemButton onClick={() => toggleDrawer(item.name)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                  </ListItemButton>
                </Box>
                <Divider />
              </Box>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
}

export default SideBar;
