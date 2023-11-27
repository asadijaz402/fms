import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Tooltip,
} from '@mui/material';
import { Replay as ReplayIcon } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import DateRangePicker from '../DateRangePicker';

export default function TrackerDevice({ onTop = false }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({});
  const navigate = useNavigate();
  const { vehicleId } = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(
      `/fleet/map/replay/${vehicleId}/${value.start_date}T00:00:00.000Z/${value.end_date}T00:00:00.000Z`
    );
  };

  return (
    <div>
      {onTop ? (
        <Tooltip title="Replay">
          <Fab
            size="medium"
            color="primary"
            sx={{
              bottom: 0,
              margin: (theme) => theme.spacing(0, 4, 12, 0),
              position: 'fixed',
              right: 0,
              zIndex: (theme) => theme.zIndex.speedDial,
            }}
            onClick={handleClickOpen}
          >
            <ReplayIcon fontSize="small" />
          </Fab>
        </Tooltip>
      ) : (
        <Button
          variant="outlined"
          startIcon={<ReplayIcon />}
          onClick={handleClickOpen}
        >
          Replay
        </Button>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Location History</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ width: '100%' }}>
              <DateRangePicker setValue={setValue} />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
