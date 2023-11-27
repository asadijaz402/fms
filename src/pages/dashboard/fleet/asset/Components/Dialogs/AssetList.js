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
  Checkbox,
  DialogContent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { putData } from '../../../../../../slices/CustomSlices/actions/apiActions';

export const AssetList = ({ data, type = false }) => {
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
          ? {
              vehicle_ids: type ? [data?.vehicle?.id] : [id],
              asset: type ? [id] : [data?.id],
            }
          : {
              vehicle_ids: type ? [data?.vehicle?.id] : items,
              asset: type ? items : [data?.id],
            },
        'assets/assigned',
        id_token
      )
    );
  };
  return (
    <Box>
      <Button
        disabled={data.asset.length === 0}
        variant="outlined"
        size="small"
        onClick={() => setOpen(true)}
      >
        Asset List
      </Button>

      <Dialog fullWidth={true} maxWidth={'xs'} open={open}>
        <DialogTitle>Assigned Vehicle List</DialogTitle>
        <DialogContent dividers>
          <List sx={{ pt: 0 }}>
            {data?.asset?.map((item) => (
              <ListItem disableGutters>
                <ListItemButton key={item?.id}>
                  <Checkbox
                    checked={items.includes(item?.id)}
                    onChange={(e) => handleChange(e, item?.id)}
                  />
                  <ListItemText primary={item?.name} />
                  <ListItemAvatar onClick={() => handleDelete(item?.id)}>
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
