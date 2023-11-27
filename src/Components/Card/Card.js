import React from "react";
import { Paper, Box, Typography, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ArrowRightAlt as ArrowIcon } from "@mui/icons-material";
import CircularPercentage from "./components/CircularPercentage";
import clsx from "clsx";
import InformationCircleIcon from "../../icons/InformationCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    height: "100%",
  },
  differenceUp: {
    fontSize: "15px",
    color: theme.palette.success.main,
    fontWeight: 600,
  },
  differenceDown: {
    fontSize: "15px",
    color: theme.palette.secondary.main,
    fontWeight: 600,
  },
  arrowUp: {
    transform: "rotate(-90deg)",
    marginLeft: "-10px",
  },
  arrowDown: {
    transform: "rotate(90deg)",
    marginLeft: "-10px",
  },
  dummyHidden: {
    display: "none",
  },
}));

export default function Card({
  primary,
  secondary,
  compareText = false,
  primaryCount,
  percentage = false,
  comparePercentage,
  compareState = true,
  href = false,
}) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="subtitle2" color="textPrimary">
            {primary}
          </Typography>
        </Box>
        {href && (
          <Box>
            <IconButton size="small" href={href}>
              <InformationCircleIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>
      <Box pt={1} display="flex">
        <Box flexGrow={1}>
          <Box>
            <Typography color="textPrimary" variant="h4">
              {primaryCount}
            </Typography>
          </Box>
          <Box>
            <Typography color="textPrimary" variant="caption">
              {secondary}
            </Typography>
          </Box>
          <Box mt={1}>
            <Typography variant="caption" color="textSecondary">
              <span
                className={clsx({
                  [classes.differenceUp]: compareState,
                  [classes.differenceDown]: !compareState,
                  [classes.dummyHidden]: !compareText,
                })}
              >
                {isFinite(comparePercentage) ? comparePercentage : "0.00"}%{" "}
                <ArrowIcon
                  className={{
                    [classes.arrowUp]: compareState,
                    [classes.arrowDown]: !compareState,
                    [classes.dummyHidden]: !compareText || compareState,
                  }}
                />
              </span>{" "}
              {compareText}
            </Typography>
          </Box>
        </Box>
        {percentage !== false && (
          <Box>
            <CircularPercentage percentage={percentage} />
          </Box>
        )}
      </Box>
    </Paper>
  );
}
