import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import ViewConfigIcon from "@mui/icons-material/ViewComfy";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import ViewDayIcon from "@mui/icons-material/ViewDay";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import React, { useEffect } from "react";

const viewOptions = [
  {
    icon: ViewConfigIcon,
    label: "Month",
    value: "dayGridMonth",
  },
  {
    icon: ViewWeekIcon,
    label: "Week",
    value: "timeGridWeek",
  },
  {
    icon: ViewDayIcon,
    label: "Day",
    value: "timeGridDay",
  },
  {
    icon: ViewAgendaIcon,
    label: "Agenda",
    value: "listWeek",
  },
];

const CalendarToolbar = (props) => {
  const {
    date,
    data,
    onDateNext,
    onDatePrev,
    onDateToday,
    onViewChange,
    view,
    setData,
    events,
    checked,
    setChecked,
    ...other
  } = props;

  const handleViewChange = (newView) => {
    if (onViewChange) {
      onViewChange(newView);
    }
  };
  useEffect(() => {
    setData(events.filter((item) => checked.includes(item.category)));
    // eslint-disable-next-line
  }, [checked]);

  const onClick = (label) => {
    if (checked.includes(label)) {
      setChecked(checked.filter((item) => item !== label));
    } else {
      setChecked([...checked, label]);
    }
  };

  return (
    <Grid
      alignItems="center"
      container
      justifyContent="space-between"
      spacing={3}
      {...other}
    >
      <Grid item>
        <ButtonGroup size="small">
          <Button onClick={onDatePrev}>Prev</Button>
          <Button onClick={onDateToday}>Today</Button>
          <Button onClick={onDateNext}>Next</Button>
        </ButtonGroup>
      </Grid>
      <Grid item>
        <Typography color="textPrimary" variant="h3">
          {format(date, "MMMM y")}
        </Typography>
      </Grid>
      <Grid item>
        <Box sx={{ color: "text.primary" }}>
          {viewOptions.map((viewOption) => {
            const Icon = viewOption.icon;

            return (
              <Tooltip key={viewOption.value} title={viewOption.label}>
                <IconButton
                  color={viewOption.value === view ? "primary" : "inherit"}
                  onClick={() => handleViewChange(viewOption.value)}
                >
                  <Icon fontSize="small" />
                </IconButton>
              </Tooltip>
            );
          })}
        </Box>
      </Grid>
      <Grid item>
        <FormControlLabel
          value="Service"
          onClick={() => onClick("Service")}
          control={<Checkbox />}
          label="Service"
          labelPlacement="Service"
        />
        <FormControlLabel
          value="Brake"
          onClick={() => onClick("Brake")}
          control={<Checkbox />}
          label="Brake"
          labelPlacement="Brake"
        />
        <FormControlLabel
          value="Booking"
          onClick={() => onClick("Booking")}
          control={<Checkbox />}
          label="Booking"
          labelPlacement="Booking"
        />
        <FormControlLabel
          value="Tire"
          onClick={() => onClick("Tire")}
          control={<Checkbox />}
          label="Tire"
          labelPlacement="Tire"
        />
        <FormControlLabel
          value="Accident"
          onClick={() => onClick("Accident")}
          control={<Checkbox />}
          label="Accident"
          labelPlacement="Accident"
        />
      </Grid>
    </Grid>
  );
};

CalendarToolbar.propTypes = {
  children: PropTypes.node,
  date: PropTypes.instanceOf(Date).isRequired,
  onAddClick: PropTypes.func,
  onDateNext: PropTypes.func,
  onDatePrev: PropTypes.func,
  onDateToday: PropTypes.func,
  onViewChange: PropTypes.func,
  view: PropTypes.oneOf([
    "dayGridMonth",
    "timeGridWeek",
    "timeGridDay",
    "listWeek",
  ]),
};

export default CalendarToolbar;
