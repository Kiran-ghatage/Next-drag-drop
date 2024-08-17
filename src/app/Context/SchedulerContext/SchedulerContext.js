"use client";
import React, { createContext, useState } from "react";
import { stringData, usersData, tablesData } from "../../MockData/Data";
import { defaultTable } from "../../Constants/Constants";
export const SchedulerContext = createContext();

export const SchedulerProvider = ({ children }) => {
  const [strings, setStrings] = useState(stringData);
  const [dateTime, setDataTime] = useState();
  const [users, setUsers] = useState(usersData);
  const [parkingLots, setParkingLots] = useState([]);
  const [floors, setFloors] = useState([]);
  const [pits, setPits] = useState([]);
  const [positions, setPositions] = useState([]);
  const [tables, setTables] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [floorManagers, setFloorManagers] = useState([]);
  const [pitManagers, setPitManagers] = useState([]);
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
      }}
    >
      {children}
    </SchedulerContext.Provider>
  );
};
