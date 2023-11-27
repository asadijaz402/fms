import React, { useState } from "react";
import {
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import { ListAlt as ListIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../../../slices/CustomSlices/actions/apiActions";
import Alert from "@mui/lab/Alert";
import ViewServiceTable from "../ServiceHistory/ViewServiceTable";
import Progress from "../../../../../Components/Progress";

export default function PreviousFormsDialog({ row_id, reg_number }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  const openDialog = () => {
    setLoading(true);
    setOpen(true);
    dispatch(
      getData(row_id, "vehicle_accessories/service/history", id_token, false)
    ).then((res) => {
      if (res !== undefined && res.data.length !== 0) {
        setData(res.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  };

  return (
    <>
      <Tooltip placement="top" title="View Previous Entries">
        <Button
          variant="outlined"
          size="small"
          color="info"
          onClick={openDialog}
          startIcon={<ListIcon />}
        >
          Logs
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle id="alert-dialog-title">
          Service History List for {reg_number}
        </DialogTitle>
        {isLoading ? (
          <DialogContent>
            <Progress />
          </DialogContent>
        ) : data.length !== 0 ? (
          <ViewServiceTable data={data} />
        ) : (
          <Alert severity="error">
            No Servicing History found for the selected vehicle!
          </Alert>
        )}
      </Dialog>
    </>
  );
}
