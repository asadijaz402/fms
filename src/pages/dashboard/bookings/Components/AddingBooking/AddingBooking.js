import React, { useState, useEffect } from "react";
import {
  DialogContent,
  DialogTitle,
  IconButton,
  useTheme,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { Button, Dialog } from "../../../../../Components";
import {
  AddCircleOutlineRounded as AddIcon,
  Edit as EditIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import BookingStepper from "./BookingStepper";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../../../slices/CustomSlices/actions/apiActions";

export default function AddingBooking({
  rowId = false,
  data = false,
  dashboard,
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const theme = useTheme();
  let id_token = useSelector((state) => state.user.id_token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (rowId) {
      setLoading(true);
      dispatch(getData(rowId, "hiring/bookings", id_token, false)).then(
        (res) => {
          setValue(res.data);
          setLoading(false);
        }
      );
    }
    // eslint-disable-next-line
  }, [rowId]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {data ? (
        <Button
          color="primary"
          onClick={() => setOpen(true)}
          startIcon={<EditIcon fontSize="small" />}
          sx={{ m: 1 }}
          installer="rentals"
          variant="contained"
        >
          Edit
        </Button>
      ) : dashboard ? (
        <Button
          size="small"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          installer="rentals"
          variant="contained"
        >
          Add Booking
        </Button>
      ) : (
        <Tooltip placement="top" title="Create Booking">
          <IconButton onClick={() => setOpen(true)}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}

      <Dialog
        fullWidth
        maxWidth="md"
        // onClose={() => setOpen(false)}
        installer="rentals"
        open={open}
      >
        <DialogTitle>Create Booking</DialogTitle>
        <IconButton
          style={{
            position: "absolute",
            right: theme.spacing(2),
            top: theme.spacing(2),
          }}
          onClick={() => {
            setOpen(false);
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>
          {loading ? (
            <CircularProgress />
          ) : (
            <BookingStepper data={value} handleClose={handleClose} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
