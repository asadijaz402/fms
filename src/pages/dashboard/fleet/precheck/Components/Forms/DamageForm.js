import React from "react";
import { Grid, Button, TextField, Typography, Box } from "@mui/material";

export default function DamageForm({
  onChange,
  value,
  handleNext,
  handleBack,
  rowId,
}) {
  const onSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  return (
    <form onSubmit={onSubmit}>
      <Box mt={2}>
        <img
          src="/images/Carout.jpg"
          alt="Vehicle Check"
          style={{
            width: "100%",
          }}
        />
      </Box>
      <Box mt={2}>
        <Typography variant="h6">Damage Description</Typography>
      </Box>
      <Box mt={2}>
        <Grid container item spacing={2}>
          <Grid item xs={12}>
            <TextField
              value={value.Major_Damage}
              fullWidth
              onChange={onChange}
              InputProps={{
                readOnly: rowId,
              }}
              label="Major Damage"
              name="Major_Damage"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={value.Dent}
              fullWidth
              onChange={onChange}
              label="Dent"
              name="Dent"
              variant="outlined"
              InputProps={{
                readOnly: rowId,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={value.Scratch}
              fullWidth
              onChange={onChange}
              label="Scratch"
              name="Scratch"
              InputProps={{
                readOnly: rowId,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={value.Rust}
              fullWidth
              onChange={onChange}
              label="Rust"
              InputProps={{
                readOnly: rowId,
              }}
              name="Rust"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={value.Missing}
              fullWidth
              onChange={onChange}
              InputProps={{
                readOnly: rowId,
              }}
              label="Missing"
              name="Missing"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={value.Chip}
              fullWidth
              onChange={onChange}
              label="Chip"
              InputProps={{
                readOnly: rowId,
              }}
              name="Chip"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={value.Crack}
              fullWidth
              InputProps={{
                readOnly: rowId,
              }}
              onChange={onChange}
              label="Crack"
              name="Crack"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              value={value.Scrape}
              fullWidth
              onChange={onChange}
              label="Scrape"
              InputProps={{
                readOnly: rowId,
              }}
              name="Scrape"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={value.Poor_Repair}
              fullWidth
              onChange={onChange}
              InputProps={{
                readOnly: rowId,
              }}
              label="Poor Repair"
              name="Poor_Repair"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={value.OutOf_Alignment}
              fullWidth
              InputProps={{
                readOnly: rowId,
              }}
              onChange={onChange}
              label="Out of Alignment"
              name="OutOf_Alignment"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={value.Loose_Fitting}
              fullWidth
              onChange={onChange}
              label="Loose Fitting"
              InputProps={{
                readOnly: rowId,
              }}
              name="Loose_Fitting"
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
            Finish
          </Button>
        </Box>
        <Box mr={1}>
          <Button onClick={handleBack}>Back</Button>
        </Box>
      </Box>
    </form>
  );
}
