import React from "react";
import { Typography, Paper, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 50,
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.background.main,
    // padding: theme.spacing(2, 1),
    height: theme.spacing(8),
    width: theme.spacing(8),
    // alignItems: "center",
    position: "relative",
  },
  text: {
    fontWeight: 600,
    fontSize: 20,
    margin: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

export default function CircularPercentage({ percentage }) {
  const classes = useStyles();

  return (
    <Paper variant="outlined" square className={classes.root}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Box width={"100%"} style={{ textAlign: "center" }}>
          <Typography
            color="primary"
            className={classes.text}
            variant="subtitle1"
          >
            {percentage}%
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
