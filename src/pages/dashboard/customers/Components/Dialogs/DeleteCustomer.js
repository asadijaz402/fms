import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tooltip,
  Button,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  Refresh as RecovcerIcon,
  Block as BlockIcon,
} from '@mui/icons-material';
import useDeleteCustomer from '../Hooks/useDeleteCustomer';

export default function DeleteServiceDialog({ data }) {
  const { loading, handleSubmit, setOpen, open } = useDeleteCustomer(data);

  return (
    <>
      {data.banned ? (
        <Tooltip placement="top" title="Recover">
          <IconButton
            size="small"
            color="error"
            variant="outlined"
            onClick={() => setOpen(true)}
          >
            <RecovcerIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip placement="top" title="Ban a Customer">
          <IconButton
            size="small"
            color="error"
            variant="outlined"
            onClick={() => setOpen(true)}
          >
            <BlockIcon fontSize="small" />
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
          {data.banned ? 'Recover ' : 'Ban '}Customer?{' '}
          {loading && <CircularProgress />}
        </DialogTitle>
        <DialogContent style={{ paddingBottom: '20px' }}>
          <DialogContentText>
            Are you sure, you want to{data.banned ? ' recover ' : ' ban '}
            following customer.
            <br />
            <br />
            Name : <b>{data.name}</b>
            <br />
            Email : <b>{data.email}</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleSubmit();
            }}
          >
            {data.banned ? 'Recover' : 'Ban'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
