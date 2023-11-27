import React, { useState, useEffect } from 'react';

// https://www.npmjs.com/package/react-date-range

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker, createStaticRanges } from 'react-date-range';
import {
  addDays,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfWeek,
  endOfWeek,
  isSameDay,
  differenceInCalendarDays,
  getMonth,
} from 'date-fns';
import moment from 'moment';

const defineds = {
  startOfWeek: startOfWeek(new Date()),
  endOfWeek: endOfWeek(new Date()),
  startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
  endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
  startOfToday: startOfDay(new Date()),
  endOfToday: endOfDay(new Date()),
  startOfYesterday: startOfDay(addDays(new Date(), -1)),
  endOfYesterday: endOfDay(addDays(new Date(), -1)),
  startOfMonth: startOfMonth(new Date()),
  endOfMonth: endOfMonth(new Date()),
  startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
  endOfNextMonth: endOfMonth(addMonths(new Date(), +1)),
  endOfThisYear: endOfMonth(
    addMonths(new Date(), +(11 - getMonth(new Date())))
  ),
};

const staticRanges = [
  ...createStaticRanges([
    {
      label: 'yesterday',
      range: () => ({
        endDate: addDays(new Date(), +1),
        startDate: addDays(new Date(), -1),
      }),
    },
    {
      label: 'last 7 days',
      range: () => ({
        endDate: addDays(new Date(), +1),
        startDate: addDays(new Date(), -7),
      }),
    },
    {
      label: 'last 28 days',
      range: () => ({
        endDate: addDays(new Date(), +1),
        startDate: addDays(new Date(), -28),
      }),
    },
    {
      label: 'End of Month',
      range: () => ({
        endDate: addDays(new Date(), +1),
        startDate: defineds.endOfMonth,
      }),
    },
    {
      label: 'End of Last Month',
      range: () => ({
        endDate: addDays(new Date(), +1),
        startDate: defineds.endOfLastMonth,
      }),
    },
    {
      label: 'End of Year',
      range: () => ({
        startDate: addDays(new Date(), +1),
        endDate: defineds.endOfThisYear,
      }),
    },
    {
      label: 'End of Next Month',
      range: () => ({
        startDate: addDays(new Date(), +1),
        endDate: defineds.endOfNextMonth,
      }),
    },
    {
      label: 'next 28 days',
      range: () => ({
        startDate: addDays(new Date(), +1),
        endDate: addDays(new Date(), 28),
      }),
    },
    {
      label: 'next 7 days',
      range: () => ({
        startDate: addDays(new Date(), +1),
        endDate: addDays(new Date(), +7),
      }),
    },
    {
      label: 'tomorrow',
      range: () => ({
        startDate: addDays(new Date(), +1),
        endDate: addDays(new Date(), +1),
      }),
    },
  ]),
];

const staticInputs = [
  {
    label: 'days starting today',
    range(value) {
      const today = new Date();
      return {
        startDate: today,
        endDate: addDays(today, Math.max(Number(value), 1) - 1),
      };
    },
    getCurrentValue(range) {
      if (!isSameDay(range.startDate, defineds.startOfToday)) return '-';
      if (!range.endDate) return '∞';
      return differenceInCalendarDays(range.endDate, defineds.startOfToday) + 1;
    },
  },
];

export default function DRP({ setValue }) {
  const [start_date, setStartDate] = useState(addDays(new Date(), -7));
  const [end_date, setEndDate] = useState(addDays(new Date(), 1));

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  useEffect(() => {
    setValue({
      start_date: moment(start_date).format('YYYY-MM-DD'),
      end_date: moment(end_date).format('YYYY-MM-DD'),
    });

    // eslint-disable-next-line
  }, [start_date, end_date]);

  return (
    <DateRangePicker
      direction="vertical"
      months={1}
      ranges={[
        {
          startDate: start_date,
          endDate: end_date,
          key: 'selection',
        },
      ]}
      onChange={handleSelect}
      staticRanges={staticRanges}
      inputRanges={staticInputs}
      // minDate={new Date()}
      showDateDisplay={true}
    />
  );
}
