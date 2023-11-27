import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listData } from '../../../slices/CustomSlices/actions/apiActions';
import useMediaQuery from '@mui/material/useMediaQuery';
import moment from 'moment-timezone';
import { useNavigate } from 'react-router-dom';
// import moment from "moment";

export default function useCalendar(calendarRef) {
  const mobileDevice = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(mobileDevice ? 'listWeek' : 'dayGridMonth');
  const [events, setEvents] = useState([]);
  const [isModalOpen, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);
  const { selectedRange } = useSelector((state) => state.calendar);
  const [selectedEvent, setSelectedEvent] = useState();
  const [dates, setDates] = useState({});
  let navigate = useNavigate();
  useEffect(() => {
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
    setDates({
      start: firstDay,
      end: lastDay,
    });
  }, []);

  const handleDateToday = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.today();

      var date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();
      var firstDay = new Date(y, m, 1);
      var lastDay = new Date(y, m + 1, 0);
      setDate(calendarApi.getDate());
      setDates({
        start: firstDay,
        end: lastDay,
      });
    }
  };

  const getEvents = () => {
    if (Object.keys(dates).length !== 0) {
      dispatch(
        listData(
          'calendar/list/events/' +
            moment(dates.start).format('YYYY-MM-DD') +
            '/' +
            moment(dates.end).format('YYYY-MM-DD'),
          id_token,
          false
        )
      ).then((res) => {
        setEvents(
          res.data.map((row) => {
            if (row.category === 'Booking') {
              return {
                ...row,
                start: row.start,
                end: parseInt(moment.utc(row.end, 'X').local().format('X')),
                url: `/bookings/details/overview/${row.details.bookingGroup}`,
              };
            } else {
              return {
                ...row,
                start: row.start,
                end: parseInt(moment.utc(row.end, 'X').local().format('X')),
              };
            }
          })
        );
      });
    }
  };

  useEffect(() => {
    getEvents();
    setDate(moment(dates.start).toDate());
    // eslint-disable-next-line
  }, [isModalOpen, dates]);

  const handleDateNext = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.next();
      setDates({
        start: moment(
          calendarEl._calendarApi.currentDataManager.data.currentDate
        ).format('YYYY-MM-01'),
        end: moment(calendarEl._calendarApi.currentDataManager.data.currentDate)
          .add(1, 'M')
          .format('YYYY-MM-01'),
      });
    }
  };

  const handleDatePrev = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      console.log(calendarEl._calendarApi.currentDataManager.data.currentDate);
      calendarApi.prev();
      setDates({
        start: moment(
          calendarEl._calendarApi.currentDataManager.data.currentDate
        ).format('YYYY-MM-01'),
        end: moment(calendarEl._calendarApi.currentDataManager.data.currentDate)
          .add(1, 'M')
          .format('YYYY-MM-01'),
      });
    }
  };

  const handleEventSelect = (arg) => {
    // navigate('/bookings/details/overview/U4C14-230111-1-A');
    arg.jsEvent.preventDefault();
    if (arg.event._def.extendedProps.category === 'Booking') {
      navigate(arg.event._def.url);
    } else {
      setOpenModal(true);
    }

    setSelectedEvent(arg.event._def);
  };

  const handleAddClick = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedEvent({});
  };

  return {
    events,
    setEvents,
    isModalOpen,
    selectedRange,
    selectedEvent,
    handleEventSelect,
    handleAddClick,
    handleClose,
    date,
    view,
    setView,
    handleDateNext,
    handleDatePrev,
    handleDateToday,
  };
}
