import { Grid } from '@mui/material';
import { LastPosition, TrackerInfo } from './components';
import LastPositionMap from '../../../../../../../Components/Traccar/LastPositionMap';
import useTrackerContext from '../../../hooks/useTrackerContext';

export default function Summary() {
  const { tracker } = useTrackerContext();

  return (
    <Grid container spacing={1} sx={{ mt: 1 }}>
      {tracker && (
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <TrackerInfo />
        </Grid>
      )}
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <LastPosition />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <LastPositionMap />
      </Grid>
    </Grid>
  );
}
