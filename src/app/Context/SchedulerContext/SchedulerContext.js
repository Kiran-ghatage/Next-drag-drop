"use client";
import React, { createContext, useState } from "react";
import { stringData, usersData, tablesData } from "../../MockData/Data";
import { defaultTable } from "../../Constants/Constants";
export const SchedulerContext = createContext();

export const SchedulerProvider = ({ children }) => {
  const [strings, setStrings] = useState(stringData);
  const [users, setUsers] = useState(usersData);
  const [tables, setTables] = useState(tablesData);
  const [dateTime, setDataTime] = useState(null);

  return (
    <SchedulerContext.Provider
      value={{
        strings,
        setStrings,
        users,
        setUsers,
        tables,
        setTables,
        dateTime,
        setDataTime,
      }}
    >
      {children}
    </SchedulerContext.Provider>
  );
};
