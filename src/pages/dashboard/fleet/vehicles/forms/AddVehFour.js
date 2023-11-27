import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  FormControlLabel,
  Button,
  Checkbox,
  FormControl,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Progress from "./Progress";
import {
  createUpdateData,
  getData,
  editUpdateData,
} from "../../../../../slices/CustomSlices/actions/apiActions";

export default function AddVehicleFour({
  handleBack,
  handleChange,
  handleNext,
  values,
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ is_working: false });
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  useEffect(() => {
    if (values.tracker_id) {
      setLoading(true);
      dispatch(
        getData(values.tracker_id, "vehicle/tracker", id_token, false)
      ).then((res) => {
        setData(res.data);
        setLoading(false);
      });
    }
    // eslint-disable-next-line
  }, [values.tracker_id]);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (data.is_working) {
      if (values.tracker_id) {
        dispatch(
          editUpdateData(
            data,
            "vehicle/tracker",
            values.tracker_id,
            id_token,
            false
          )
        ).then((res) => {
          setLoading(false);
          handleNext();
        });
      } else {
        dispatch(
          createUpdateData(data, "vehicle/tracker", id_token, false)
        ).then((res) => {
          if (!res.data.id) {
            setMsg(res.data.code);
            setLoading(false);
          } else {
            handleChange({
              target: {
                name: "tracker_id",
                value: res.data.id,
              },
            });
            setLoading(false);
            handleNext();
          }
        });
      }
    } else {
      setLoading(false);
      handleNext();
    }
  };

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleWorking = (e) => {
    setData({
      ...data,
      is_working: e.target.checked,
    });
  };

  if (loading) {
    return <Progress />;
  } else {
    return (
      <form onSubmit={onSubmit}>
        <Grid container item spacing={2}>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormControlLabel
                control={
                  <Checkbox
                    value={data.is_working}
                    checked={data.is_working}
                    onChange={handleWorking}
                    inputProps={{
                      "aria-label": "If Tracker is in working condition",
                    }}
                  />
                }
                label="Is tracker active"
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="code"
              label="Code"
              name="code"
              required={data.is_working ? true : false}
              value={data.code}
              error={msg}
              variant="outlined"
              helperText={msg}
              onChange={onChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="provider"
              value={data.provider}
              label="Provider"
              required={data.is_working ? true : false}
              name="provider"
              variant="outlined"
              onChange={onChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="name"
              label="Person Name"
              value={data.person_name}
              name="person_name"
              required={data.is_working ? true : false}
              variant="outlined"
              onChange={onChange}
              fullWidth
              helperText="Reference person of contact name."
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              id="contact"
              label="Person Contact Number"
              name="person_contact_number"
              required={data.is_working ? true : false}
              value={data.person_contact_number}
              variant="outlined"
              onChange={onChange}
              fullWidth
              helperText="Reference person of contact information."
            />
          </Grid>
        </Grid>

        <Box
          mt={2}
          mb={2}
          width={"100%"}
          display="flex"
          flexDirection="row-reverse"
        >
          <Box>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Box>
          <Box mr={1}>
            <Button onClick={handleBack}>Back</Button>
          </Box>
        </Box>
      </form>
    );
  }
}
