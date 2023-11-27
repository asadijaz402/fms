import React, { useState, useEffect } from "react";

// https://www.npmjs.com/package/react-date-range

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker, createStaticRanges } from "react-date-range";
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
} from "date-fns";
import moment from "moment";
import { Box, Button } from "@mui/material";

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
      label: "1 day",
      range: () => ({
        startDate: addDays(new Date(), +1),
        endDate: addDays(new Date(), +1),
      }),
    },
    {
      label: "7 days",
      range: () => ({
        startDate: addDays(new Date(), +1),
        endDate: addDays(new Date(), +7),
      }),
    },
    {
      label: "28 days",
      range: () => ({
        startDate: addDays(new Date(), +1),
        endDate: addDays(new Date(), +28),
      }),
    },
    {
      label: "End of Month",
      range: () => ({
        startDate: addDays(new Date(), +1),
        endDate: defineds.endOfMonth,
      }),
    },
    {
      label: "End of Next Month",
      range: () => ({
        startDate: addDays(new Date(), +1),
        endDate: defineds.endOfNextMonth,
      }),
    },
    {
      label: "End of Year",
      range: () => ({
        startDate: addDays(new Date(), +1),
        endDate: defineds.endOfThisYear,
      }),
    },
  ]),
];

const staticInputs = [
  {
    label: "days starting today",
    range(value) {
      const today = new Date();
      return {
        startDate: today,
        endDate: addDays(today, Math.max(Number(value), 1) - 1),
      };
    },
    getCurrentValue(range) {
      if (!isSameDay(range.startDate, defineds.startOfToday)) return "-";
      if (!range.endDate) return "∞";
      return differenceInCalendarDays(range.endDate, defineds.startOfToday) + 1;
    },
  },
];

export default function DRP({ value, onChange, handleBack, handleNext }) {
  const [start_date, setStartDate] = useState(addDays(new Date(), 1));
  const [end_date, setEndDate] = useState(addDays(new Date(), 1));

  const handleSelect = (ranges) => {
    if (start_date !== value.start_date) {
      setStartDate(ranges.selection.startDate);
    }

    if (end_date !== value.end_date) {
      setEndDate(ranges.selection.endDate);
    }
  };

  useEffect(() => {
    if (value.start_date && value.end_date) {
      setStartDate(moment(value.start_date, "YYYY-MM-DDThh:mm"));
      setEndDate(moment(value.end_date, "YYYY-MM-DDThh:mm"));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    onChange({
      target: {
        name: "date_range",
        value: {
          start_date: moment(start_date).format("YYYY-MM-DDThh:mm"),
          end_date: moment(end_date).format("YYYY-MM-DDThh:mm"),
        },
      },
    });
    // eslint-disable-next-line
  }, [start_date, end_date]);

  return (
    <>
      <DateRangePicker
        direction="vertical"
        months={1}
        ranges={[
          {
            startDate: start_date,
            endDate: end_date,
            key: "selection",
          },
        ]}
        onChange={handleSelect}
        staticRanges={staticRanges}
        inputRanges={staticInputs}
        minDate={new Date()}
        showDateDisplay={true}
      />
      <Box
        // mt={-4}
        // mb={2}
        width={"100%"}
        display="flex"
        flexDirection="row-reverse"
      >
        <Box>
          <Button
            variant="contained"
            color="primary"
            disabled={!value.date_range}
            onClick={handleNext}
          >
            Next
          </Button>
        </Box>
        <Box mr={1}>
          <Button onClick={handleBack}>Back</Button>
        </Box>
      </Box>
    </>
  );
}
