import {
  CheckCircle,
  Cancel as CancelIcon,
  Upload as UploadIcon,
} from '@mui/icons-material';
import {
  Paper,
  Box,
  Typography,
  Divider,
  Icon,
  IconButton,
  Tooltip,
} from '@mui/material';
import useTrackerContext from '../../../../hooks/useTrackerContext';
import TrackerDevice from '../../../Dialog/TrackerDevice';
import { ListElement } from './ListElement';

export function TrackerInfo() {
  const { tracker, vehicleId, refreshAPI } = useTrackerContext();

  return (
    <Paper elevation={0} variant="outlined" sx={{ height: '100%' }}>
      <Box p={1} display="flex" sx={{ width: '100%', alignItems: 'center' }}>
        <Box flexGrow={1} mr={1}>
          <Typography variant="h6" color="primary">
            Tracker Device Info:{' '}
          </Typography>
        </Box>
        <Box mr={1}>
          <TrackerDevice
            resetAPI={refreshAPI}
            vehicle_id={vehicleId}
            button="EditIcon"
          />
        </Box>
        <Box>
          <Tooltip title="Send Command">
            <IconButton size="small">
              <UploadIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ p: 1 }}>
        <ListElement heading="Device #" content={tracker.code} />
        <ListElement heading="Provider" content={tracker.provider} />
        <ListElement
          heading="Status"
          content={
            !tracker.status ? (
              <Icon color="success">
                <CheckCircle />
              </Icon>
            ) : (
              <Icon color="error">
                <CancelIcon />
              </Icon>
            )
          }
        />
        <ListElement heading="Contact Person" content={tracker.person_name} />
        <ListElement
          heading="Contact Number"
          content={tracker.person_contact_number}
        />
      </Box>
    </Paper>
  );
}
