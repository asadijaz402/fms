import { useRef, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import timelinePlugin from "@fullcalendar/timeline";
import {
  Box,
  Breadcrumbs,
  // Button,
  Card,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { alpha, experimentalStyled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CalendarToolbar } from "../../../Components/Dashboard/calendar";
import ChevronRightIcon from "../../../icons/ChevronRight";
// import PlusIcon from "../../../icons/Plus";
import {
  //  openModal,
  selectRange,
  //  updateEvent
} from "../../../slices/calendar";
import { useDispatch } from "../../../store";
import useCalendar from "./useCalendar";
import Dialogs from "./Dialogs";

const FullCalendarWrapper = experimentalStyled("div")(({ theme }) => ({
  "& .fc-license-message": {
    display: "none",
  },
  "& .fc": {
    "--fc-bg-event-opacity": 1,
    "--fc-border-color": theme.palette.divider,
    "--fc-daygrid-event-dot-width": "10px",
    "--fc-event-text-color": theme.palette.text.primary,
    "--fc-list-event-hover-bg-color": theme.palette.background.default,
    "--fc-neutral-bg-color": theme.palette.background.default,
    "--fc-page-bg-color": theme.palette.background.default,
    "--fc-today-bg-color": alpha(theme.palette.primary.main, 0.25),
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
  },
  "& .fc .fc-col-header-cell-cushion": {
    paddingBottom: "10px",
    paddingTop: "10px",
  },
  "& .fc .fc-day-other .fc-daygrid-day-top": {
    color: theme.palette.text.secondary,
  },
  "& .fc-daygrid-event": {
    padding: "10px",
  },
}));

const Calendar = () => {
  const calendarRef = useRef(null);
  const {
    events,
    isModalOpen,
    // selectedRange,
    selectedEvent,
    // setEvents,
    handleEventSelect,
    // handleAddClick,
    handleClose,
    date,
    view,
    setView,
    handleDateNext,
    handleDatePrev,
    handleDateToday,
  } = useCalendar(calendarRef);
  const dispatch = useDispatch();
  const mobileDevice = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [data, setData] = useState(events);
  const [checked, setChecked] = useState([]);
  useEffect(() => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = mobileDevice ? "listWeek" : "dayGridMonth";

      calendarApi.changeView(newView);
      setView(newView);
    }
    // eslint-disable-next-line
  }, [mobileDevice]);

  const handleViewChange = (newView) => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  // const handleAddClick = () => {
  //   dispatch(openModal());
  // };

  const handleRangeSelect = (arg) => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.unselect();
    }

    dispatch(selectRange(arg.start.getTime(), arg.end.getTime()));
  };

  // const handleEventSelect = (arg) => {
  //   dispatch(selectEvent(arg.event.id));
  // };

  // const handleEventResize = async ({ event }) => {
  //   try {
  //     await dispatch(
  //       updateEvent(event.id, {
  //         allDay: event.allDay,
  //         start: event.start,
  //         end: event.end,
  //       })
  //     );
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const handleEventDrop = async ({ event }) => {
  //   try {
  //     await dispatch(
  //       updateEvent(event.id, {
  //         allDay: event.allDay,
  //         start: event.start,
  //         end: event.end,
  //       })
  //     );
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const handleEventMouseEnter = (event) => {
    event.el.style.cursor = "pointer";
  };

  const handleEventMouseLeave = (event) => {
    event.el.style.cursor = "default";
  };

  return (
    <>
      <Helmet>
        <title>Dashboard: Calendar | Material Kit Pro</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container justifyContent="space-between" spacing={3}>
            <Grid item>
              <Typography color="textPrimary" variant="h5">
                Here&apos;s what you planned
              </Typography>
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<ChevronRightIcon fontSize="small" />}
                sx={{ mt: 1 }}
              >
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  to="/dashboard"
                  variant="subtitle2"
                >
                  Dashboard
                </Link>
                <Typography color="textSecondary" variant="subtitle2">
                  Calendar
                </Typography>
              </Breadcrumbs>
            </Grid>
            {/* <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  onClick={handleAddClick}
                  startIcon={<PlusIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="contained"
                >
                  New Event
                </Button>
              </Box>
            </Grid> */}
          </Grid>
          <Box sx={{ mt: 3 }}>
            <CalendarToolbar
              date={date}
              checked={checked}
              data={data}
              setChecked={setChecked}
              setData={setData}
              events={events}
              onDateNext={handleDateNext}
              onDatePrev={handleDatePrev}
              onDateToday={handleDateToday}
              onViewChange={handleViewChange}
              view={view}
            />
          </Box>
          <Card
            sx={{
              mt: 3,
              p: 2,
            }}
          >
            <FullCalendarWrapper>
              <FullCalendar
                allDayMaintainDuration
                dayMaxEventRows={3}
                droppable={false}
                editable={false}
                eventClick={handleEventSelect}
                eventDisplay="block"
                // eventDrop={handleEventDrop}
                // eventResizableFromStart
                // eventResize={handleEventResize}
                events={checked.length === 0 ? events : data}
                headerToolbar={false}
                eventMouseEnter={handleEventMouseEnter}
                eventMouseLeave={handleEventMouseLeave}
                height={800}
                initialDate={date}
                initialView={view}
                plugins={[
                  dayGridPlugin,
                  interactionPlugin,
                  listPlugin,
                  timeGridPlugin,
                  timelinePlugin,
                ]}
                ref={calendarRef}
                rerenderDelay={10}
                select={handleRangeSelect}
                selectable={false}
                weekends
              />
            </FullCalendarWrapper>
          </Card>
          <Dialogs
            open={isModalOpen}
            event={selectedEvent}
            handleClose={handleClose}
          />
        </Container>
      </Box>
    </>
  );
};

export default Calendar;
