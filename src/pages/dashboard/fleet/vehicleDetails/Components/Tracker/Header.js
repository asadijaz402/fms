import { Paper, Box, Button } from '@mui/material';
import {
  Fullscreen as FullscreenIcon,
  Upload as UploadIcon,
} from '@mui/icons-material';
import TrackerDevice from '../Dialog/TrackerDevice';
import useTrackerContext from '../../hooks/useTrackerContext';
import { Link } from 'react-router-dom';
import TrackerReplayDialog from '../Dialog/TrackerReplayDialog';

export default function Header() {
  const { vehicleId, tracker } = useTrackerContext();

  return (
    <Paper elevation={0} variant="outlined">
      <Box sx={{ width: '100%', p: 1, display: 'flex' }}>
        <Box mr={1} flexGrow={1}></Box>
        {!tracker ? (
          <Box mr={1}>
            <TrackerDevice vehicle_id={vehicleId} />
          </Box>
        ) : (
          <>
            <Box mr={1}>
              <Button
                to={`/fleet/map/${vehicleId}/live`}
                component={Link}
                startIcon={<FullscreenIcon />}
                variant="outlined"
              >
                Show Live Map
              </Button>
            </Box>

            <Box mr={1}>
              <Button startIcon={<UploadIcon />} variant="outlined">
                Send Command
              </Button>
            </Box>
            <Box mr={1}>
              <TrackerReplayDialog />
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
}
