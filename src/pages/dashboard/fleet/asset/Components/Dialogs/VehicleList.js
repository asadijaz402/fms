import React, { useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  List,
  Avatar,
  ListItemText,
  DialogActions,
  Typography,
  Checkbox,
  DialogContent,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { putData } from '../../../../../../slices/CustomSlices/actions/apiActions';

export const VehicleList = ({ row }) => {
  let id_token = localStorage.getItem('accessToken');

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  const handleChange = (e, id) => {
    if (e.target.checked) {
      setItems([...items, id]);
    } else {
      setItems(items.filter((i) => i !== id));
    }
  };

  const handleDelete = (id = false) => {
    dispatch(
      putData(
        id
          ? { vehicle_ids: [id], asset: [row.id] }
          : { vehicle_ids: items, asset: [row.id] },
        'assets/assigned',
        id_token
      )
    );
  };
  return (
    <Box>
      <Button variant="text" size="small" onClick={() => setOpen(true)}>
        <Box mr={1}>
          <Typography variant="caption">
            {row?.assigned[0]?.vehicle?.vehicle_reg_no}{' '}
            {row?.assigned.length > 1 && '...More'}{' '}
          </Typography>
        </Box>
      </Button>

      <Dialog fullWidth={true} maxWidth={'xs'} open={open}>
        <DialogTitle>Assigned Vehicle List</DialogTitle>
        <DialogContent dividers>
          <List sx={{ pt: 0 }}>
            {row?.assigned.map((email) => (
              <ListItem disableGutters>
                <ListItemButton key={email.vehicle.id}>
                  <Checkbox
                    checked={items.includes(email.vehicle.id)}
                    onChange={(e) => handleChange(e, email.vehicle.id)}
                  />
                  <ListItemText primary={email.vehicle.vehicle_reg_no} />
                  <ListItemAvatar
                    onClick={() => handleDelete(email.vehicle.id)}
                  >
                    <Avatar>
                      <DeleteIcon />
                    </Avatar>
                  </ListItemAvatar>
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <DialogActions>
            <Button onClick={() => setOpen(false)}>Close</Button>
            <Button
              disabled={items.length < 1 ? true : false}
              sx={{ textAlign: 'left' }}
              onClick={() => handleDelete()}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
