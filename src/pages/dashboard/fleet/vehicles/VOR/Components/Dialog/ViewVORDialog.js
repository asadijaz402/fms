import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
  IconButton,
  Button,
  CircularProgress,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import MUIDataTable from 'mui-datatables';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../../../../../../slices/CustomSlices/actions/apiActions';
import VORSearch from '../Forms/VORSearch';

export default function ViewVORDialog({ vehicleData }) {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const id_token = useSelector((state) => state.user.id_token);

  useEffect(() => {
    if (open) {
      dispatch(
        getData(vehicleData.id, 'vehicle/vorhistory', id_token, false)
      ).then((res) => {
        setHistory(res.data);
        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const column = [
    {
      label: 'Id',
      name: 'id',
      options: {
        filter: false,
        sort: false,
        display: true,
      },
    },
    {
      label: 'VOR Name',
      name: 'name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      label: 'Created At',
      name: 'created_at',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return moment(value, 'YYYY-MM-DDThh:mm').format('ddd Do MMM YYYY');
        },
      },
    },
  ];

  const openDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const addNew = <VORSearch vehicleData={vehicleData} />;

  var options = {
    responsive: 'stacked',
    filter: false,
    selectableRows: 'none',
    selectableRowsOnClick: false,
    download: false,
    print: false,
    customToolbar: () => {
      if (addNew) {
        return addNew;
      } else {
        return true;
      }
    },
  };

  return (
    <>
      <Tooltip placement="left" title="View VOR History">
        <Button
          fullWidth
          // variant="outlined"
          size="small"
          color="info"
          onClick={() => openDialog()}
          startIcon={<VisibilityIcon fontSize="small" />}
        >
          VOR History
        </Button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">VOR History</DialogTitle>
        <IconButton
          aria-label="close"
          style={{ position: 'absolute', right: '8px', top: '8px' }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {loading ? (
            <CircularProgress />
          ) : (
            <MUIDataTable options={options} columns={column} data={history} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
