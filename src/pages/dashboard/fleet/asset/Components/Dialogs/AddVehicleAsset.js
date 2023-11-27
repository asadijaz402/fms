import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Box } from '@mui/system';
import { AddCircleOutlineRounded as AddIcon } from '@mui/icons-material';
import { AssetVehicleForm } from '../Forms/AssetVehicleForm';

export const AddVehicleAsset = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Tooltip title="Add New Asset">
        <IconButton
          size="small"
          onClick={() => {
            setOpen(true);
          }}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>Add Asset Details</DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <AssetVehicleForm setOpen={setOpen} />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
