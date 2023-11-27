import React from "react";
import {
  Box,
  Select,
  FormControl,
  Backdrop,
  CircularProgress,
  Button,
  Typography,
} from "@mui/material";
import usePermissions from "../hooks/usePermissions";

export default function PermissionForm({ data, handleClickClose, open }) {
  const { loading, response, handleChange, onSubmit, value, heading, error } =
    usePermissions(open, data, handleClickClose);

  return (
    <form onSubmit={onSubmit}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box>
        <FormControl sx={{ m: 1, width: 300 }}>
          <Select
            multiple
            native
            value={value}
            onChange={handleChange}
            inputProps={{
              id: "select-multiple-native",
            }}
          >
            <option aria-label="None" value="" />
            {heading.map((table) => {
              return (
                <optgroup
                  label={table.charAt(0).toUpperCase() + table.slice(1)}
                >
                  {response
                    ?.filter((row) => row.table === table)
                    .map((row) => {
                      return (
                        <option key={row.id} value={JSON.stringify(row)}>
                          {row.title}
                        </option>
                      );
                    })}
                </optgroup>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      {error && (
        <Typography align="center" variant="body2" color="error">
          {error}
        </Typography>
      )}
      <Box sx={{ mt: 3 }}>
        <Button
          color="primary"
          disabled={loading}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Update
        </Button>
      </Box>
    </form>
  );
}
