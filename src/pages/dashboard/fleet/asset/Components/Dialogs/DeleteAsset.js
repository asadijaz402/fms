import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tooltip,
  Button,
  CircularProgress,
} from '@mui/material';
import {
  Block as BlockIcon,
  Refresh as RecovcerIcon,
} from '@mui/icons-material';
import useDeleteAsset from '../Hooks/useDeleteAsset';

export default function DeleteServiceDialog({ data }) {
  const { loading, handleSubmit, unAssigned, setOpen, open } =
    useDeleteAsset(data);

  return (
    <>
      {!data.is_active ? (
        <Tooltip placement="top" title="Activate">
          <Button
            size="small"
            color="warning"
            variant="outlined"
            onClick={() => setOpen(true)}
            startIcon={<RecovcerIcon fontSize="small" />}
          >
            Recover
          </Button>
        </Tooltip>
      ) : (
        <>
          {data?.status === 'Assigned' && (
            <Button
              onClick={() => {
                unAssigned(data.id);
              }}
              size="small"
              fullWidth
            >
              De Activate
            </Button>
          )}
          {!data.status && (
            <Tooltip placement="top" title="De Activate">
              <Button
                size="small"
                fullWidth
                color="error"
                onClick={() => setOpen(true)}
                startIcon={<BlockIcon fontSize="small" />}
              >
                De Activate
              </Button>
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
          {!data.is_active ? 'Recover ' : 'Ban '}Asset?{' '}
          {loading && <CircularProgress />}
        </DialogTitle>
        <DialogContent style={{ paddingBottom: '20px' }}>
          <DialogContentText>
            Are you sure, you want to {!data.is_active ? 'recover ' : 'ban '}
            following asset.
            <br />
            <br />
            Name : <b>{data.name}</b>
            <br />
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
            {!data.is_active ? 'Activate' : 'De Activate'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
