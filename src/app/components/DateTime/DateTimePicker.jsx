"use client";
import * as React from "react";
import { useState, useContext } from "react";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { SchedulerContext } from "../../Context/SchedulerContext/SchedulerContext";
import { DATE_TIME_FORMAT, DATE_FORMAT } from "../../Constants/Constants";

export default function ReferenceDateExplicitDateTimePicker({
  dateTimePickerLable,
  pickerStyle,
}) {
  const { dateTime, setDataTime } = useContext(SchedulerContext);
  const [value, setValue] = useState(dayjs()); // Initialize with current date and time

  const handleDateTimeChange = (newValue) => {
    setDataTime(newValue.format(DATE_FORMAT));
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack
        spacing={2}
        sx={
          pickerStyle || {
            minWidth: 305,
            svg: { color: "#fff" },
            input: { color: "#fff" },
          }
        }
      >
        <DateTimePicker
          label={dateTimePickerLable || ""}
          value={value}
          onChange={(newValue) => handleDateTimeChange(newValue)}
          referenceDate={dayjs("2022-04-17T15:30")}
        />
      </Stack>
    </LocalizationProvider>
  );
}
