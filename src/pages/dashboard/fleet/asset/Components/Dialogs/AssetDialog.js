import React, { useState } from 'react';
import {
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Button,
} from '@mui/material';
import AssetForm from '../Forms/AssetForm';
import {
  AddCircleOutlineRounded as AddIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

export default function AssetDialog({ rowId, data, type = 'default' }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {rowId ? (
        type === 'assign' ? (
          <Button
            onClick={() => {
              setOpen(true);
            }}
            size="small"
            fullWidth
          >
            Assign
          </Button>
        ) : (
          <Tooltip placement="top" title="Edit Asset">
            <Button
              size="small"
              onClick={() => {
                setOpen(true);
              }}
              fullWidth
              startIcon={<EditIcon fontSize="small" />}
            >
              Edit
            </Button>
          </Tooltip>
        )
      ) : (
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
      )}

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>
          {rowId ? 'Edit ' : 'Add '}
          Asset Details
        </DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <AssetForm
              handleClose={() => setOpen(false)}
              data={data}
              rowId={rowId}
              step={type === 'assign' ? 1 : 0}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
