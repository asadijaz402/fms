import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  useTheme,
} from "@mui/material";
import useDynamicDialogs from "./useDynamicDialogs";
import FormDialog from "./FormDialog";

function getStyles(name, value, theme) {
  return {
    fontWeight:
      value.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function DynamicDialogs({
  url,
  required = false,
  onChange,
  value,
  name,
  label,
  sts,
  inputText,
  post = true,
  autoFocus = false,
  multiple = false,
}) {
  const [update, setUpdate] = useState(false);
  const { loading, fetchData } = useDynamicDialogs(url, update);
  const theme = useTheme();

  const handleUpdateChange = () => {
    setUpdate(!update);
  };

  if (multiple) {
    return (
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
        {sts === "disabled" ? (
          <Select
            multiple
            disabled
            required={required}
            autoFocus={autoFocus}
            value={value ? value : []}
            name={name}
            onChange={onChange}
            input={<OutlinedInput label={label} />}
            // MenuProps={MenuProps}
          >
            {fetchData.map((row) => (
              <MenuItem
                key={row.id}
                value={row.id}
                style={getStyles(row.name, fetchData, theme)}
              >
                {row.name}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <Select
            multiple
            required={required}
            autoFocus={autoFocus}
            value={value ? value : []}
            name={name}
            onChange={onChange}
            input={<OutlinedInput label={label} />}
            // MenuProps={MenuProps}
          >
            {fetchData.map((row) => (
              <MenuItem
                key={row.id}
                value={row.id}
                style={getStyles(row.name, fetchData, theme)}
              >
                {row.name}
              </MenuItem>
            ))}
          </Select>
        )}{" "}
      </FormControl>
    );
  } else {
    return sts === "disabled" ? (
      <TextField
        select
        disabled
        required={required}
        name={name}
        label={label}
        multiple={multiple}
        autoFocus={autoFocus}
        value={value}
        onChange={onChange}
        fullWidth
        SelectProps={{
          native: true,
        }}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {loading ? (
                <CircularProgress />
              ) : (
                post && (
                  <FormDialog
                    name={name}
                    label={label}
                    onChange={onChange}
                    url={url}
                    fetchData={fetchData[0]}
                    handleUpdateChange={handleUpdateChange}
                  />
                )
              )}
            </InputAdornment>
          ),
        }}
      >
        <option value=""></option>
        {fetchData.map((option) => (
          <option key={option[inputText]} value={option.id}>
            {option[inputText]}
          </option>
        ))}
      </TextField>
    ) : (
      <TextField
        select
        sts
        required={required}
        name={name}
        label={label}
        multiple={multiple}
        autoFocus={autoFocus}
        value={value}
        onChange={onChange}
        fullWidth
        SelectProps={{
          native: true,
        }}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {loading ? (
                <CircularProgress />
              ) : (
                post && (
                  <FormDialog
                    name={name}
                    label={label}
                    onChange={onChange}
                    url={url}
                    fetchData={fetchData[0]}
                    handleUpdateChange={handleUpdateChange}
                  />
                )
              )}
            </InputAdornment>
          ),
        }}
      >
        <option value=""></option>
        {fetchData.map((option) => (
          <option key={option[inputText]} value={option.id}>
            {option[inputText]}
          </option>
        ))}
      </TextField>
    );
  }
}
