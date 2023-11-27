import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Backdrop,
  CircularProgress,
  TextField,
  Box,
  MenuItem,
  // Collapse,
  Divider,
  // InputAdornment,
  IconButton,
  // Tooltip,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import useCustomField from '../hook/useCustomField';

export default function AddEditCustomFieldDialog({
  model_table,
  id = false,
  rowData,
}) {
  const {
    open,
    loading,
    handleClickOpen,
    handleClose,
    value,
    handleChange,
    handleSubmit,
    data,
    // optionsCRUD,
    // options,
    handleDelete,
  } = useCustomField(model_table, true, id);

  return (
    <>
      {id ? (
        <>
          <ListItem disablePadding>
            <ListItemButton onClick={handleClickOpen}>
              <ListItemText
                primary={'Name: ' + rowData.name}
                secondary={'Type: ' + rowData.fieldType.name}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
        </>
      ) : (
        <Button onClick={handleClickOpen} variant="contained">
          Add New Field
        </Button>
      )}
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <Box flexGrow={1} mr={4}>
                <Typography variant="h6">
                  {id ? 'Update' : 'Add New'} Custom Fields
                </Typography>
              </Box>
              <Box>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box mt={2}>
              <TextField
                label="Field Name"
                onKeyDown={(e) => {
                  e.stopPropagation();
                }}
                required
                value={value.name}
                name="name"
                fullWidth
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
                variant="outlined"
              />
            </Box>
            <Box mt={2}>
              <TextField
                label="Field Type"
                required
                select
                onKeyDown={(e) => {
                  e.stopPropagation();
                }}
                value={value.fieldType}
                name="fieldType"
                // InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={handleChange}
                variant="outlined"
              >
                {data.map((row) => {
                  return (
                    <MenuItem key={row.id} value={row.id}>
                      {row.name}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Box>
          </DialogContent>
          {/* <Collapse in={options.length !== 0}>
            <Divider />
            <DialogContent>
              {options.map((row) => {
                return (
                  <Box mb={2}>
                    <TextField
                      fullWidth
                      required
                      label="Option"
                      varinat="contained"
                      size="small"
                      key={row.id}
                      onChange={(e) => optionsCRUD("changeValue", e)}
                      value={row.value}
                      name={row.id}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip label="Remove option">
                              <IconButton
                                size="small"
                                onClick={() => optionsCRUD("remove", row.id)}
                              >
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                );
              })}
              <Box>
                <Button
                  onClick={() => optionsCRUD("add")}
                  size="small"
                  variant="contained"
                  fullWidth
                >
                  Add Option
                </Button>
              </Box>
            </DialogContent>
          </Collapse> */}
          <Divider />
          <Box sx={{ width: '100%', display: 'flex', pt: 1, pl: 1, pr: 1 }}>
            <Box flexGrow={1} mr={1}>
              <Button
                sx={{ textAlign: 'left' }}
                onClick={handleDelete}
                variant="contained"
                color="error"
              >
                Delete
              </Button>
            </Box>
            <Box>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Box>
          </Box>
        </form>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Dialog>
    </>
  );
}
