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
  Block as BlockIcon,
  Refresh as RecovcerIcon,
} from '@mui/icons-material';
import useDeleteDriver from '../Hooks/useDeleteDriver';

export default function DeleteServiceDialog({ data }) {
  const { loading, handleSubmit, unAssigned, setOpen, open } =
    useDeleteDriver(data);

  return (
    <>
      {data.banned ? (
        <Tooltip placement="top" title="Recover">
          <IconButton
            size="small"
            color="warning"
            variant="outlined"
            onClick={() => setOpen(true)}
          >
            <RecovcerIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          {data?.status === 'Assigned' && (
            <Button
              onClick={() => {
                unAssigned(data.id);
              }}
              size="small"
              variant="contained"
            >
              Ban
            </Button>
          )}
          {!data.status && (
            <Tooltip placement="top" title="Ban">
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
        </>
      )}
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>
          {data.banned ? 'Recover ' : 'Ban '}Driver?{' '}
          {loading && <CircularProgress />}
        </DialogTitle>
        <DialogContent style={{ paddingBottom: '20px' }}>
          <DialogContentText>
            Are you sure, you want to {data.banned ? 'recover ' : 'ban '}
            following driver.
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
