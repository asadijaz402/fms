import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Box,
  DialogTitle,
  Backdrop,
  CircularProgress,
  Typography,
  List,
} from "@mui/material";
import DataObjectIcon from "@mui/icons-material/DataObject";
import useCustomField from "../hook/useCustomField";
import AddEditCustomFieldDialog from "./AddEditFieldDialog";
import { Close as CloseIcon } from "@mui/icons-material";

export default function CustomFieldDialog({ model_table }) {
  const { open, loading, handleClickOpen, handleClose, data } = useCustomField(
    model_table,
    false
  );

  return (
    <>
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
          <DataObjectIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Custom Field</ListItemText>
      </MenuItem>
      <Dialog open={open}>
        <DialogTitle>
          <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
            <Box flexGrow={1} mr={4}>
              <Typography variant="h6">Custom Fields</Typography>
            </Box>
            <Box>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        {data.length === 0 ? (
          <DialogContent>
            <Typography variant="body1" align="center">
              {!loading && "No Custom fields exists."}
            </Typography>
          </DialogContent>
        ) : (
          <List>
            {data.map((row) => (
              <AddEditCustomFieldDialog
                model_table={model_table}
                rowData={row}
                id={row.id}
              />
            ))}
          </List>
        )}
        <DialogActions>
          <AddEditCustomFieldDialog model_table={model_table} />
        </DialogActions>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Dialog>
    </>
  );
}
