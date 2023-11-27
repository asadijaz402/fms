import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import useNotes from "../../hooks/useNotes";
import NoteIcon from "@mui/icons-material/Note";

export default function FormDialog({ data }) {
  const {
    open,
    handleClickOpen,
    handleClose,
    handleChange,
    value,
    loading,
    handleSubmit,
  } = useNotes(data);

  return (
    <>
      <Button
        startIcon={<NoteIcon />}
        variant="contained"
        onClick={handleClickOpen}
      >
        Notes
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Notes</DialogTitle>
        {data[0].notes && data[0].notes.length !== 0 && (
          <Box sx={{ width: "100%", maxHeight: "80vh", overflowY: "scroll" }}>
            {data[0].notes.map((row) => {
              return (
                <>
                  <Box p={2} key={row.dateTime}>
                    <Typography variant="subtitle2" color="CaptionText">
                      @{row.user}
                    </Typography>
                    <Typography variant="body1" color="primary">
                      {row.content}
                    </Typography>
                    <Typography variant="body2" color="GrayText">
                      {row.dateTime}
                    </Typography>
                  </Box>
                  <Divider />
                </>
              );
            })}
          </Box>
        )}
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Add Note"
              fullWidth
              variant="outlined"
              value={value}
              multiline
              rows={4}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button loading={loading} variant="contained" type="submit">
              Add Note
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
