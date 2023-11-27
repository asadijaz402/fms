import React from "react";
import { Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import BlockIcon from "@mui/icons-material/Block";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    border: "1.5px",
    backgroundColor: "#222b36",
    borderRadius: 8,
    // boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing(8),
  },
  title: {
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    color: "#0070ba",
  },
  subtitle: {
    marginBottom: theme.spacing(4),
    color: "#6d6d6d",
  },
  button: {
    width: 200,
    fontWeight: 600,
    textTransform: "none",
    marginBottom: theme.spacing(2),
    borderRadius: 4,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  },
  cancelButton: {
    backgroundColor: "#f2f2f2",
    color: "#5f6368",
    "&:hover": {
      backgroundColor: "#eaeaea",
    },
  },
  confirmButton: {
    backgroundColor: "#0070ba",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#005c8c",
    },
  },
}));

const SubscriptionPage = ({ onCancel, onConfirm }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5" align="center" style={{ color: "#FF0000" }}>
        <BlockIcon fontSize="large" height="250" width="250" />
      </Typography>
      <Typography variant="h5" className={classes.title}>
        Cancel Your Future Automatic Payments
      </Typography>
      <Typography variant="body1" className={classes.subtitle}>
        Are you sure you want to cancel your future automatic payments? You will
        not be billed for this service after the next payment date.
      </Typography>
      <Button
        variant="contained"
        className={`${classes.button} ${classes.cancelButton}`}
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        className={`${classes.button} ${classes.confirmButton}`}
        onClick={onConfirm}
      >
        Yes, Cancel Future Payments
      </Button>
    </div>
  );
};

export default SubscriptionPage;
