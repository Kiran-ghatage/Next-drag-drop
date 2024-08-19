"use client";
import React, { createContext, useState, useContext } from "react";
import { stringData, usersData, tablesData } from "../../MockData/Data";
import { defaultTable } from "../../Constants/Constants";
export const DragDropContext = createContext();

import { SchedulerContext } from "../SchedulerContext/SchedulerContext";

export const DrapDropProvider = ({ children }) => {
  const { strings, setStrings } = useContext(SchedulerContext);
  const [draggingTable, setDraggingTable] = useState(null);
  const [isStringTablesCanSwipe, setIsStringTablesCanSwipe] = useState(true);
  const [draggingFloorTable, setDraggingFloorTable] = useState(null);
  const [draggingDealer, setDraggingDealer] = useState(null);

  const handleFloorTableDraggedFromDropDoanListOnDragStart = (event, table) => {
    console.log(
      "table-------##--handleFloorTableDraggedFromDropDoanListOnDragStart----",
      table
    );

    setIsStringTablesCanSwipe(false);
    if (!table?.userId) {
      setDraggingFloorTable(table);
      event.dataTransfer.setData("table", table);
    } else {
      setDraggingFloorTable(null);
    }
  };

  const handleFloorTableDraggedFromDropDoanListOnDrop = () => {};
  const handleTableDropDownElementOnDrop = (event) => {
    if (!objectExists(stringTables, draggingTable) && draggingTable) {
      const newId =
        stringTables.length > 0
          ? Math.max(...stringTables.map((item) => item.id)) + 1
          : 1;
      setStringTables([...stringTables, { ...draggingTable, id: newId }]);
      const updatedStrings = tables?.filter(
        (table) => table.name !== draggingTable.name
      );
      setTables(updatedStrings);
    } else {
      console.log("Table already exists");
    }
  };

  const handleRemoveTable = (card) => {
    const updatedTables = stringTables?.filter((table) => table.id !== card.id);
    setStringTables(updatedTables);
    const updatedStrings = [card, ...tables];
    setTables(updatedStrings);
  };

  const handleDealerDraggedFromDropDoanListOnDragStart = (event, employee) => {
    console.log(
      "employee-------##--handleDealerDraggedFromDropDoanListOnDragStart----",
      employee
    );

    setIsStringTablesCanSwipe(false);
    if (employee?.employeeNumber) {
      setDraggingDealer(employee);
      // event.dataTransfer.setData("table", table);
    } else {
      setDraggingDealer(null);
    }
  };

  return (
    <DragDropContext.Provider
      value={{
        draggingTable,
        setDraggingTable,
        isStringTablesCanSwipe,
        setIsStringTablesCanSwipe,
        handleRemoveTable,

        handleFloorTableDraggedFromDropDoanListOnDragStart,
        draggingFloorTable,
        setDraggingFloorTable,

        handleDealerDraggedFromDropDoanListOnDragStart,
        draggingDealer,
        setDraggingDealer,
      }}
    >
      {children}
    </DragDropContext.Provider>
  );
};
