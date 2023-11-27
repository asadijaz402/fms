import { makeStyles } from '@mui/styles';
import {
  Settings as SettingsIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { Box, IconButton, Card } from '@mui/material';
import { useSideBarContext } from '../../hooks/SideBarContext';
import { useDashboardContext } from '../../hooks/DashboardContext';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    p: 0,
    m: 0,
  },
  spacer: {
    flexGrow: 1,
  },
  body: {
    flexGrow: 1,
  },
});

const Container = ({ mode, item, children, onRemoveItem, openOptions }) => {
  const classes = useStyles();

  switch (mode) {
    case 'draft':
      return (
        <Card className={classes.root}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row-reverse',
              width: '100%',
              mb: (theme) => theme.spacing(-5),
              pr: (theme) => theme.spacing(1),
            }}
          >
            <IconButton size="small" onClick={() => onRemoveItem(item)}>
              <CancelIcon fontSize="small" color="error" />
            </IconButton>
            <IconButton size="small" onClick={() => openOptions()}>
              <SettingsIcon fontSize="small" />
            </IconButton>
          </Box>
          <div className={classes.body}>{children}</div>
        </Card>
      );
    case 'new':
      return (
        <Card className={classes.root}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row-reverse',
              width: '100%',
              mb: (theme) => theme.spacing(-5),
              pr: (theme) => theme.spacing(1),
            }}
          >
            <IconButton size="small" onClick={() => onRemoveItem(item)}>
              <CancelIcon fontSize="small" color="error" />
            </IconButton>
            <IconButton size="small" onClick={() => openOptions()}>
              <SettingsIcon fontSize="small" />
            </IconButton>
          </Box>
          <div className={classes.body}>{children}</div>
        </Card>
      );
    case 'preview':
      return <>{children}</>;
    default:
      return <>{children}</>;
  }
};

export default function Widget({
  uniqueId,
  component: Component,
  columns,
  item,
  w_id,
}) {
  const { toggleDrawer } = useSideBarContext();
  const { props, onRemoveItem, onSettings, mode } = useDashboardContext();

  const openOptions = () => {
    onSettings(item);
    toggleDrawer('options');
  };

  return (
    <Container
      mode={mode}
      item={item}
      onRemoveItem={onRemoveItem}
      openOptions={openOptions}
    >
      <Component
        w_id={w_id}
        dataTable={props}
        columns={columns}
        uniqueId={uniqueId}
      />
    </Container>
  );
}
