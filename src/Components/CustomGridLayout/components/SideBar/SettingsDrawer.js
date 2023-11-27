import {
  Box,
  Drawer as MuiDrawer,
  Divider,
  Typography,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import * as CustomWidgets from '../../../../Widgets';
import { useDashboardContext } from '../../hooks/DashboardContext';
import { labelGenerator } from '../DynamicDataTable/helpers';

const drawerWidth = 300;

const Drawer3 = styled(MuiDrawer, {
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

export default function SettingsDrawer({ open }) {
  const { settings, handleConfigFieldChange, onSubmit, selectedValues } =
    useDashboardContext();

  return (
    <Box mt={8}>
      <Drawer3
        variant="permanent"
        open={open}
        sx={{ height: '100vh', overflowY: 'hidden' }}
      >
        <Divider />
        <Box p={2}>
          <Typography variant="subtitle1" gutterBottom>
            Widget Settings
          </Typography>
          <Divider />
          <form onSubmit={(e) => onSubmit(e, settings.uniqueId)}>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              {settings.config &&
                Object.entries(settings.config).map(([field, config]) => {
                  switch (config.type) {
                    case 'text':
                      return (
                        // eslint-disable-next-line
                        <CustomWidgets.default.TextField
                          fullWidth
                          label={config.label}
                          value={
                            (selectedValues[settings.uniqueId] &&
                              selectedValues[settings.uniqueId][field]) ||
                            ''
                          }
                          onChange={(event) =>
                            handleConfigFieldChange(
                              field,
                              event,
                              config.w_id,
                              settings.uniqueId
                            )
                          }
                          {...config.props}
                        />
                      );
                    case 'dropdown':
                      return (
                        <Box mb={1}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            color="primary"
                            sx={{ mb: 1 }}
                          >
                            Choose {config.label}
                          </Typography>
                          {/* eslint-disable-next-line */}
                          <CustomWidgets.default.SelectField
                            fullWidth
                            label={config.label}
                            value={
                              (selectedValues[settings.uniqueId] &&
                                selectedValues[settings.uniqueId][field]) ||
                              ''
                            }
                            onChange={(event) =>
                              handleConfigFieldChange(
                                field,
                                event,
                                config.w_id,
                                settings.uniqueId
                              )
                            }
                            options={config.options.map((option) => {
                              let label = option.label
                                ? option.label
                                : labelGenerator(option.name);
                              return {
                                label: label,
                                value: option.name,
                              };
                            })}
                            {...config.props}
                          />
                        </Box>
                      );

                    default:
                      return null;
                  }
                })}
              <Button
                variant="contained"
                type="submit"
                // onClick={() => getGraphData()}
              >
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Drawer3>
    </Box>
  );
}
