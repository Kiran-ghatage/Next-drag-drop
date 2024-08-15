"use client"
import React, { createContext, useState } from "react";
import { stringData, usersData, tablesData } from "../../MockData/Data";
import { defaultTable } from "../../Constants/Constants";
export const DragDropContext = createContext();

export const DrapDropProvider = ({ children }) => {
  const [strings, setStrings] = useState(stringData);
  const [users, setUsers] = useState(usersData);
  const [tables, setTables] = useState(tablesData);

  const [stringTables, setStringTables] = useState([]);
  const [draggingTable, setDraggingTable] = useState(null);
  const [flooreTable, setFlooreTable] = useState(defaultTable);
  const [draggingTableUser, setDraggingTableUser] = useState();
  const [stringTableUsers, setStringTableUsers] = useState([]);

  const [elementDroppedOnIndexOfCard, setElementDroppedOnIndexOfCard] =
    useState(null);
  const [draggingUserFromDropDownList, setDraggingUserFromDropDownList] =
    useState();
  const [draggingUserFromCardList, setDraggingUserFromCardList] = useState();

  const handleRemoveTable = (card) => {
    const updatedTables = stringTables?.filter((table) => table.id !== card.id);
    setStringTables(updatedTables);
    const updatedStrings = [card, ...tables]
    setTables(updatedStrings)
  };

  return (
    <DragDropContext.Provider
      value={{
        strings,
        setStrings,
        users,
        tables,
        setTables,
        stringTables,
        setStringTables,
        draggingTable,
        setDraggingTable,
        flooreTable,
        setFlooreTable,
        draggingTableUser,
        setDraggingTableUser,
        stringTableUsers,
        setStringTableUsers,
        elementDroppedOnIndexOfCard,
        setElementDroppedOnIndexOfCard,
        draggingUserFromDropDownList,
        setDraggingUserFromDropDownList,
        draggingUserFromCardList,
        setDraggingUserFromCardList,
        handleRemoveTable,
      }}
    >
      {children}
    </DragDropContext.Provider>
  );
};
