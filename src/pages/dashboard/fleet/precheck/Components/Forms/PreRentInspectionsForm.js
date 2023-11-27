import React from "react";
import {
  Grid,
  Checkbox,
  Button,
  Typography,
  FormGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Box,
} from "@mui/material";

export default function PreRentInspectionsForm({
  value,
  onChange,
  handleNext,
  handleBack,
  rowId,
}) {
  const onHandlechangecheck = (e) => {
    onChange({
      target: {
        name: e.target.name,
        value: e.target.checked,
      },
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    handleNext();
  };

  return (
    <form onSubmit={onSubmit}>
      <Box mt={2}>
        <Typography variant="h6">Prerent Inspection Checks</Typography>
      </Box>
      <Box mt={2}>
        <Grid container item spacing={2}>
          <Grid
            style={{ textAlign: "left" }}
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
          >
            <FormControl component="fieldset">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      required
                      checked={value.levels}
                      onChange={onHandlechangecheck}
                      name="levels"
                      InputProps={{
                        readOnly: rowId,
                      }}
                    />
                  }
                  label="Levels checked(oil, water,
                        wash brakes"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      required
                      checked={value.seatbelts}
                      onChange={onHandlechangecheck}
                      name="seatbelts"
                      InputProps={{
                        readOnly: rowId,
                      }}
                    />
                  }
                  label="Seatbelts checked"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      required
                      checked={value.controls}
                      onChange={onHandlechangecheck}
                      name="controls"
                      InputProps={{
                        readOnly: rowId,
                      }}
                    />
                  }
                  label="Controls checked (lights,
                        indicators, steering, clutch,
                        brakes)
                        "
                />
              </FormGroup>
            </FormControl>
            <FormControl component="fieldset">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={value.jackTools}
                      onChange={onHandlechangecheck}
                      name="jackTools"
                      InputProps={{
                        readOnly: rowId,
                      }}
                    />
                  }
                  label="Jack & Tools Provided"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={value.vehicle_valeted}
                      onChange={onHandlechangecheck}
                      name="vehicle_valeted"
                      InputProps={{
                        readOnly: rowId,
                      }}
                    />
                  }
                  label="Vehicle Valeted"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={value.wheelNut}
                      onChange={onHandlechangecheck}
                      name="wheelNut"
                      InputProps={{
                        readOnly: rowId,
                      }}
                    />
                  }
                  label="Locking Wheel Nut Present"
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              value={value.Wheels}
              fullWidth
              onChange={onChange}
              label="Wheels"
              name="Wheels"
              variant="outlined"
              InputProps={{
                readOnly: rowId,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              value={value.Service_Interval}
              fullWidth
              onChange={onChange}
              label="Service Interval"
              name="Service_Interval"
              variant="outlined"
              InputProps={{
                readOnly: rowId,
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box mt={4}>
        <Typography variant="h6">Tyres Measurements(mm)</Typography>
      </Box>
      <Box mt={2}>
        <Grid container item spacing={2}>
          <Grid item xs={12}>
            <Typography style={{ textAlign: "left" }} variant="body1">
              NearSide Front
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={4}>
            <TextField
              type="number"
              value={value.NearSideFront_Depth}
              label="Depth"
              fullWidth
              name="NearSideFront_Depth"
              onChange={onChange}
              InputProps={{
                readOnly: rowId,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={4}>
            <TextField
              value={value.NearSideFront_Make}
              label="Make"
              fullWidth
              onChange={onChange}
              name="NearSideFront_Make"
              variant="outlined"
              InputProps={{
                readOnly: rowId,
              }}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={4}>
            <TextField
              type="number"
              value={value.NearSideFront_Size}
              fullWidth
              onChange={onChange}
              name="NearSideFront_Size"
              label="Size"
              InputProps={{
                readOnly: rowId,
              }}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography style={{ textAlign: "left" }} variant="body1">
              NearSide Rear
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={4}>
            <TextField
              type="number"
              value={value.NearSideRear_Depth}
              name="NearSideRear_Depth"
              label="Depth"
              fullWidth
              InputProps={{
                readOnly: rowId,
              }}
              onChange={onChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={4}>
            <TextField
              value={value.NearSideRear_Make}
              fullWidth
              onChange={onChange}
              InputProps={{
                readOnly: rowId,
              }}
              label="Make"
              name="NearSideRear_Make"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={4}>
            <TextField
              type="number"
              value={value.NearSideRear_Size}
              fullWidth
              InputProps={{
                readOnly: rowId,
              }}
              onChange={onChange}
              label="Size"
              name="NearSideRear_Size"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ textAlign: "left" }} variant="body1">
              OffSide Front
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={4}>
            <TextField
              type="number"
              value={value.OffSideFront_Depth}
              label="Depth"
              name="OffSideFront_Depth"
              fullWidth
              InputProps={{
                readOnly: rowId,
              }}
              onChange={onChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={4}>
            <TextField
              value={value.OffSideFront_Make}
              fullWidth
              onChange={onChange}
              label="Make"
              name="OffSideFront_Make"
              InputProps={{
                readOnly: rowId,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={4}>
            <TextField
              type="number"
              value={value.OffSideFront_Size}
              fullWidth
              onChange={onChange}
              InputProps={{
                readOnly: rowId,
              }}
              label="Size"
              name="OffSideFront_Size"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography style={{ textAlign: "left" }} variant="body1">
              OffSide Rear
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={4}>
            <TextField
              type="number"
              value={value.OffSideRear_Depth}
              label="Depth"
              name="OffSideRear_Depth"
              InputProps={{
                readOnly: rowId,
              }}
              fullWidth
              onChange={onChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={4}>
            <TextField
              value={value.OffSideRear_Make}
              fullWidth
              onChange={onChange}
              label="Make"
              InputProps={{
                readOnly: rowId,
              }}
              name="OffSideRear_Make"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={4}>
            <TextField
              type="number"
              value={value.OffSideRear_Size}
              fullWidth
              onChange={onChange}
              InputProps={{
                readOnly: rowId,
              }}
              label="Size"
              name="OffSideRear_Size"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ textAlign: "left" }} variant="body1">
              Spare
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={4}>
            <TextField
              type="number"
              label="Depth"
              InputProps={{
                readOnly: rowId,
              }}
              name="Spare_Depth"
              value={value.Spare_Depth}
              fullWidth
              onChange={onChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={4}>
            <TextField
              value={value.Spare_Make}
              fullWidth
              onChange={onChange}
              InputProps={{
                readOnly: rowId,
              }}
              label="Make"
              name="Spare_Make"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={4}>
            <TextField
              type="number"
              value={value.Spare_Size}
              fullWidth
              onChange={onChange}
              label="Size"
              name="Spare_Size"
              InputProps={{
                readOnly: rowId,
              }}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        mt={4}
        mb={2}
        width={"100%"}
        display="flex"
        flexDirection="row-reverse"
      >
        <Box>
          <Button variant="contained" color="primary" type="submit">
            Next
          </Button>
        </Box>
        <Box mr={1}>
          <Button onClick={handleBack}>Back</Button>
        </Box>
      </Box>
    </form>
  );
}
