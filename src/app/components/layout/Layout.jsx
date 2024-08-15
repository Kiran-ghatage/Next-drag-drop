"use client";
import { useContext, useState } from "react";

import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import "./Layout.scss";
import DragDrop from "../DragDrop/DragDropTablePlayground";
import SchedulersList from "../schedulers/SchedulersList";
import Collapsible from "../CollapsibleDropdown/Collapsible";
import { DragDropContext } from "../../Context/DragDropContext/DragDropContext";

const Layout = () => {
  const flooreId = 1;
  const defaultTable = { name: "Floore", skills: "tc", id: flooreId };
  const [selectedTable, setSelectedTable] = useState("");

  const {
    strings,
    users,
    tables,
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
    setTables,
  } = useContext(DragDropContext);

  const hanldeTableDropDownElementOnDragStart = (event, table) => {
    console.log("table-------##------", table);
    if (!table?.userId) {
      setDraggingTable(table);
      event.dataTransfer.setData("table", table);
    } else {
      setDraggingTable(null);
    }
  };

  const objectExists = (array, newItem) => {
    return array.some(
      (item) => item?.name === newItem?.name && item?.skills === newItem?.skills
    );
  };
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

  const handleTableDropDownElementOnDragOver = (event) => {
    event.preventDefault();
  };
  const getTablesUi = () => (
    <>
      {tables.map((table) => (
        <ListItem
          key={table.id}
          component="div"
          disablePadding
          draggable
          onDragStart={(event) =>
            hanldeTableDropDownElementOnDragStart(event, table)
          }
        >
          <ListItemButton>
            <ListItemText primary={table.name} />
          </ListItemButton>
        </ListItem>
        // <div
        //   key={table.id}
        //   draggable
        //   onDragStart={(event) =>
        //     hanldeTableDropDownElementOnDragStart(event, table)
        //   }
        //   className="collapsible-content"
        // >
        //   {table.name}
        // </div>
      ))}
    </>
  );

  //Cards Start
  const handleUserDropDownElementOnDragStart = (event, element) => {
    console.log("element------##---layout--", element);
    if (element?.userId) {
      setDraggingTableUser(element);
      setDraggingUserFromDropDownList(element);
      event.dataTransfer.setData("tableUser", element);
    }
  };

  const isUserExists = (array, newItem) => {
    return array.some(
      (item) =>
        item?.userId === newItem?.userId &&
        item?.employeeNumber === newItem?.employeeNumber
    );
  };
  const onElementDropOnCard = (event) => {
    console.log("-------------");
    //   if (!isUserExists(stringTableUsers, draggingTableUser)) {
    //     const newId =
    //       stringTableUsers.length > 0
    //         ? Math.max(...stringTableUsers.map((item) => item.id)) + 1
    //         : 1;
    //     setStringTableUsers([
    //       ...stringTableUsers,
    //       { ...draggingTableUser, id: newId },
    //     ]);
    //   } else {
    //     console.log("User already exists");
    //   }
  };

  const onTableElementDragOver = (event) => {
    event.preventDefault();
  };

  const getUsersUi = () => (
    <>
      {users.map((user) => (
        <div
          key={user.userId}
          draggable
          onDragStart={(event) =>
            handleUserDropDownElementOnDragStart(event, user)
          }
          className="collapsible-content"
        >
          {`${user.firstName} - ${user.userId}`}
        </div>
      ))}
    </>
  );
  //Cards End

  return (
    <div className="container">
      <div className="section section-75">
        <SchedulersList 
            handleTableDropDownElementOnDrop={handleTableDropDownElementOnDrop}
            handleTableDropDownElementOnDragOver={handleTableDropDownElementOnDragOver}
        />
        {/* <DragDrop
          cards={stringTables}
          handleTableDropDownElementOnDrop={handleTableDropDownElementOnDrop}
          handleTableDropDownElementOnDragOver={handleTableDropDownElementOnDragOver}
          setStringTables={setStringTables}
          flooreTable={flooreTable}
          onElementDropOnCard={onElementDropOnCard}
        /> */}
      </div>
      <div className="section section-25">
        <Collapsible title="Tables">{getTablesUi()}</Collapsible>
        <Collapsible title="Users">{getUsersUi()}</Collapsible>
      </div>
    </div>
  );
};

export default Layout;
