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
import { FinanceForm } from '../Forms/FinanceForm';
import {
  AddCircleOutlineRounded as AddIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
const FinanceDialog = ({ rowId, data, type = 'default' }) => {
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
            variant="outlined"
          >
            Assign
          </Button>
        ) : (
          <Tooltip placement="top" title="Edit Finance">
            <IconButton
              size="small"
              onClick={() => {
                setOpen(true);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )
      ) : (
        <Tooltip title="Add New Finance">
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
          Finance Details
        </DialogTitle>
        <DialogContent>
          <Box mb={2} mt={2}>
            <FinanceForm
              handleClose={() => setOpen(false)}
              data={data}
              rowId={rowId}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FinanceDialog;
