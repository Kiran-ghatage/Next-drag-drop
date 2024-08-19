"use client";
import React, { createContext, useState } from "react";
import dayjs from "dayjs";
import _ from "lodash";
import { stringData, usersData, tablesData } from "../../MockData/Data";
import { DATE_TIME_FORMAT, DATE_FORMAT } from "../../Constants/Constants";
import { filterTables } from "../../Utils/utils";

export const SchedulerContext = createContext();

export const SchedulerProvider = ({ children }) => {
  // const [strings, setStrings] = useState(stringData);
  const [strings, setStrings] = useState([]);

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
      let newFilterdStrings;
      let filterdStrings = filterTables(value, strings);
      newFilterdStrings = _.cloneDeep(filterdStrings);
      setFilteredTables(filterdStrings);

      // if (newFilterdStrings?.length > 0) {
      //   let moreFiltered = newFilterdStrings[0].stateInfo?.filter((state) =>
      //     state.name.toLowerCase().includes(value)
      //   );
      //   newFilterdStrings[0].stateInfo = moreFiltered;
      //   setFilteredTables(newFilterdStrings);
      // } else {
      //   setFilteredTables(filterdStrings);
      // }
    }
  };

  const handleCloseTable = (stringId, stateId) => {
    const filteredString = strings.filter((string) => string.id === stringId);

    const updatedTables = filteredString[0].stateInfo.filter(
      (state) => state.id !== stateId
    );

    filteredString[0].stateInfo = updatedTables;
    setStrings((prev) => {
      return [...prev, filteredString];
    });
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
        handleCloseTable,
      }}
    >
      {children}
    </SchedulerContext.Provider>
  );
};
