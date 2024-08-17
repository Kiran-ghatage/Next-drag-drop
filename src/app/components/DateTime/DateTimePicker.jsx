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

export default function ReferenceDateExplicitDateTimePicker() {
  const { dateTime, setDataTime } = useContext(SchedulerContext);
  const [value, setValue] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack
        spacing={2}
        sx={{ minWidth: 305, svg: { color: "#fff" }, input: { color: "#fff" } }}
      >
        {/* <Typography> */}
          <DateTimePicker
            value={dateTime}
            onChange={setDataTime}
            referenceDate={dayjs("2022-04-17T15:30")}
          />
          {/* Stored value: {dateTime == null ? "null" : dateTime.format()} */}
        {/* </Typography> */}
      </Stack>
    </LocalizationProvider>
  );
}
