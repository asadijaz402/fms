import * as React from 'react';
import {
  Box,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Tooltip,
  DialogTitle,
} from '@mui/material';
import { Add, Edit as EditIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import useTrackerDevice from '../../hooks/useTrackerDevice';

export default function TrackerDevice({
  vehicle_id,
  button = 'Add Device',
  resetAPI = false,
}) {
  const {
    open,
    loading,
    handleClickOpen,
    handleClose,
    handleSubmit,
    handleChange,
    value,
  } = useTrackerDevice(vehicle_id, resetAPI);

  return (
    <div>
      {button === 'Add Device' && (
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={handleClickOpen}
        >
          Add Device
        </Button>
      )}

      {button === 'EditIcon' && (
        <Tooltip title="Edit Device">
          <IconButton size="small" onClick={handleClickOpen}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tracker Device</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box>
              <TextField
                autoFocus
                onChange={handleChange}
                value={value.code}
                name="code"
                label="Code"
                fullWidth
                required
                variant="outlined"
                helperText="IMEI, serial number or other id. It has to match the identifier device reports to the server."
              />
            </Box>
            <Box mt={2}>
              <TextField
                label="Provider"
                fullWidth
                value={value.provider}
                onChange={handleChange}
                variant="outlined"
                name="provider"
              />
            </Box>
            <Box mt={2}>
              <TextField
                label="Disabled"
                onChange={handleChange}
                name="disabled"
                fullWidth
                SelectProps={{
                  native: true,
                }}
                select
                variant="outlined"
                required
                value={value.disabled}
              >
                <option value={true}>True</option>
                <option value={false}>False</option>
              </TextField>
            </Box>
            <Box mt={2}>
              <TextField
                variant="outlined"
                label="Person Name"
                value={value.person_name}
                onChange={handleChange}
                name="person_name"
                fullWidth
              />
            </Box>
            <Box mt={2}>
              <TextField
                fullWidth
                onChange={handleChange}
                value={value.person_contact_number}
                variant="outlined"
                label="Person Contact Number"
                name="person_contact_number"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <LoadingButton variant="contained" loading={loading} type="submit">
              <span>Submit</span>
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
