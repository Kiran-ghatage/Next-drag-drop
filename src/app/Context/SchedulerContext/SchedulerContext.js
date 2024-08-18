"use client";
import React, { createContext, useState } from "react";
import dayjs from "dayjs";
import { stringData, usersData, tablesData } from "../../MockData/Data";
import { DATE_TIME_FORMAT, DATE_FORMAT } from "../../Constants/Constants";
import { filterTables } from "../../Utils/utils";

export const SchedulerContext = createContext();

export const SchedulerProvider = ({ children }) => {
  const [strings, setStrings] = useState(stringData);
  const [dateTime, setDataTime] = useState(dayjs().format(DATE_FORMAT));
  const [users, setUsers] = useState(usersData);
  const [parkingLots, setParkingLots] = useState([]);
  const [floors, setFloors] = useState([]);
  const [pits, setPits] = useState([]);
  const [positions, setPositions] = useState([]);
  const [tables, setTables] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [floorManagers, setFloorManagers] = useState([]);
  const [pitManagers, setPitManagers] = useState([]);
  const [searchTableTerm, setSearchTableTerm] = useState("");
  const [filteredTables, setFilteredTables] = useState("");

  const handleStringSearch = (value) => {
    setSearchTableTerm(value);
    if (value?.length > 2 && strings?.length > 0) {
      let filterdStrings = filterTables(value, strings);
      setFilteredTables(filterdStrings);
    }
  };
  return (
    <SchedulerContext.Provider
      value={{
        strings,
        setStrings,
        users,
        setUsers,
        parkingLots,
        setParkingLots,
        floors,
        setFloors,
        pits,
        setPits,
        positions,
        setPositions,
        tables,
        setTables,
        dateTime,
        setDataTime,
        dealers,
        setDealers,
        floorManagers,
        setFloorManagers,
        pitManagers,
        setPitManagers,
        handleStringSearch,
        searchTableTerm,
        filteredTables,
        setFilteredTables,
      }}
    >
      {children}
    </SchedulerContext.Provider>
  );
};
