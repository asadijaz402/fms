import {
  Box,
  Drawer as MuiDrawer,
  Divider,
  Typography,
  List,
  ListItemButton,
} from '@mui/material';
import { components as componentList } from '../../helpers/componentsList';
import { styled } from '@mui/material/styles';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const drawerWidth = 300;

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
      width: 0,
      [theme.breakpoints.up('sm')]: {
        width: 0,
      },
    }),
  },
}));

export default function WidgetDrawer({ open, onAddItem }) {
  return (
    <Box mt={8}>
      <Drawer
        variant="permanent"
        open={open}
        sx={{ height: '100vh', overflowY: 'hidden' }}
      >
        <Divider />
        <Droppable droppableId="dashboard">
          {(provided, snapshot) => (
            <List
              component="nav"
              sx={{ p: 2 }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <Typography variant="subtitle1" gutterBottom color="primary">
                Widgets
              </Typography>
              <Divider />

              {componentList.map((row) => {
                return (
                  <Box mt={2}>
                    <Typography align="center" variant="subtitle2" gutterBottom>
                      {row.label}
                    </Typography>
                    <Box p={2}>
                      {row.component.map((item, index) => {
                        return (
                          <Box sx={{ height: '5rem', mb: 2 }}>
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided) => (
                                <Box
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <ListItemButton
                                    onDoubleClick={() => onAddItem(item)}
                                    sx={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      height: '100%',
                                    }}
                                  >
                                    {item.icon ? (
                                      item.icon
                                    ) : (
                                      <img
                                        src={item.image}
                                        height={50}
                                        alt=""
                                        width={90}
                                        style={{ borderRadius: '10px' }}
                                      />
                                    )}
                                    <Typography
                                      variant="body1"
                                      color="primary"
                                      sx={{ mt: 1 }}
                                    >
                                      {item.name}
                                    </Typography>
                                  </ListItemButton>
                                  {index === row.component.length - 1 && (
                                    <Divider sx={{ mt: 2 }} />
                                  )}
                                </Box>
                              )}
                            </Draggable>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                );
              })}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </Drawer>
    </Box>
  );
}
