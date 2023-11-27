import { Box } from '@mui/material';
import TraccarMap from '../../Components/Traccar';
import { TrackerProvider } from '../dashboard/fleet/vehicleDetails/context/TrackerContext';
import { Loader } from '../dashboard/fleet/vehicleDetails/Components/Tracker/Summary/components';

export default function Traccar() {
  return (
    <TrackerProvider>
      <Loader>
        <Box sx={{ width: '100%', height: '100vh - 60px' }}>
          <TraccarMap />
        </Box>
      </Loader>
    </TrackerProvider>
  );
}
