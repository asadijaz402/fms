import React, { useState, useEffect } from "react";
import {
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createUpdateData } from "../../slices/CustomSlices/actions/apiActions";
import { AddCircleOutlineRounded as AddIcon } from "@mui/icons-material";

export default function FormDialog({
  url,
  label,
  onChange,
  name,
  fetchData,
  handleUpdateChange,
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValue] = useState({});
  const [formFields, setFormFeilds] = useState([]);
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  useEffect(() => {
    if (fetchData) {
      setFormFeilds(Object.keys(fetchData));
    }
  }, [fetchData]);

  const onSubmit = () => {
    setLoading(true);
    dispatch(createUpdateData(values, url, id_token, false)).then((res) => {
      onChange({
        target: {
          name: name,
          value: res.data.id,
        },
      });
      handleUpdateChange();
      setLoading(false);
      setOpen(false);
    });
  };

  const handleChange = (e) => {
    setValue({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <IconButton onClick={() => setOpen(true)} edge="start">
          <AddIcon />
        </IconButton>
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New {label}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {formFields
              .filter(
                (field) =>
                  field !== "id" &&
                  field !== "date_created" &&
                  field !== "company" &&
                  field !== "is_global"
              )
              .map((field, index) => {
                return (
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box pt={1}>
                      <TextField
                        autoFocus={index === 1}
                        label={
                          field.charAt(0).toUpperCase() +
                          field.replaceAll("_", " ").slice(1)
                        }
                        onChange={handleChange}
                        name={field}
                        fullWidth
                        variant="outlined"
                        required
                        type={field.includes("date") && "date"}
                      />
                    </Box>
                  </Grid>
                );
              })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={onSubmit} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
