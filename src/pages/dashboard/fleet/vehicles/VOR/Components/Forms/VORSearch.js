import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { editUpdateData } from '../../../../../../../slices/CustomSlices/actions/apiActions';
import { useDispatch, useSelector } from 'react-redux';
import AsyncSeacrchInput from './AsyncSearchInput';
import toast from 'react-hot-toast';

export default function VORSearch({ vehicleData }) {
  const [open, setOpen] = useState(false);
  const [vor, setVor] = useState('');
  const [vorList, setVorList] = useState([]);
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  const openDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const AddToVOR = () => {
    let vor_id;
    let data;

    vorList.map((val) => {
      if (val.name === vor) {
        let vehicle_list = [];
        vehicle_list = val.vehicles.map((val) => {
          return val.id;
        });
        vehicle_list.push(vehicleData.id);
        data = {
          name: val.name,
          address: val.address,
          city: val.city,
          country: val.country,
          other_details: val.other_details,
          vehicles: vehicle_list,
        };
        vor_id = val.id;
      }
      return data;
    });

    dispatch(
      editUpdateData(data, 'vehicle/vortype', vor_id, id_token, false)
    ).then((res) => {
      let status_response = res;
      handleClose();
      if (
        status_response &&
        (status_response.status === 201 || status_response.status === 200)
      ) {
        toast.success('Vehicle entry added Successfully!');
      } else {
        toast.danger('Error adding Vehicle entry!');
      }
    });
  };

  const handleChange = (value) => {
    setVor(value);
  };

  return (
    <>
      <Tooltip placement="left" title="Add Vehicle to VOR">
        <Button
          size="small"
          fullWidth
          onClick={() => openDialog()}
          startIcon={<AddIcon fontSize="small" />}
        >
          Add to VOR Garage
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add VOR</DialogTitle>
        <IconButton
          aria-label="close"
          style={{ position: 'absolute', right: '8px', top: '8px' }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Box width={300}>
            <Box mb={2} fullWidth>
              <AsyncSeacrchInput
                url="vehicle/vortype/list/"
                handleChange={handleChange}
                vor={true}
                setVorList={setVorList}
              />
            </Box>
            <Box
              fullWidth
              pt={2}
              mb={2}
              style={{
                float: 'right',
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => AddToVOR()}
              >
                Finish
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
