import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { searchData } from "../../slices/CustomSlices/actions/apiActions";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@mui/lab/Autocomplete";
import { SearchRounded as SearchIcon } from "@mui/icons-material";

export default function CustomerSearch({
  handleChange,
  name,
  customer,
  InputProps,
}) {
  const [value, setValue] = useState({});
  const dispatch = useDispatch();
  const id_token = useSelector((state) => state.user.id_token);

  const onDropChangeNew = (event, values) => {
    let options = [];
    let customerId = "";
    dispatch(searchData(values, "hiring/customer/list/", id_token, false)).then(
      (res) => {
        res.data.results.filter((row) => {
          return row.name === values
            ? (customerId = row.id)
            : (customerId = "");
        });
        res.data.results.length !== 0 &&
          res.data.results.map((data) => {
            return (options = [...options, data.name]);
          });

        setValue({
          ...value,
          options: options,
          loading: false,
          customer: customerId,
        });
        handleChange({
          target: {
            name: name,
            value: customerId,
          },
        });
      }
    );
  };

  return (
    <Autocomplete
      value={customer?.email}
      freeSolo
      disableClearable
      fullWidth
      options={value.options ? value.options : [""]}
      onInputChange={onDropChangeNew}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Customer"
          margin="normal"
          required
          fullWidth
          variant="outlined"
          InputProps={
            InputProps
              ? { ...params.InputProps, ...InputProps, type: "search" }
              : {
                  ...params.InputProps,
                  type: "search",
                  startAdornment: (
                    <InputAdornment position="start" className="searchIcons">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }
          }
        />
      )}
    />
  );
}
