"use client";
import { useContext, useEffect, useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ListItemIcon from "@mui/material/ListItemIcon";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import Divider from "@mui/material/Divider";

import axios from "axios";
import Collapsible from "./Collapsible";
import Loader from "../Common/Loader";
import { SchedulerContext } from "../../Context/SchedulerContext/SchedulerContext";
import { DragDropContext } from "../../Context/DragDropContext/DragDropContext";
import { EMPLOYEES, ROTATION_STATES, BASE_PATH } from "../../Constants/Constants";
import { searchEmployees } from "../../Utils/utils";

function CollapsiblesParent() {
  const {
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
    dealers,
    setDealers,
    floorManagers,
    setFloorManagers,
    pitManagers,
    setPitManagers,
    dateTime
  } = useContext(SchedulerContext);
  const {
    setDraggingTable,
    handleFloorTableDraggedFromDropDoanListOnDragStart,
  } = useContext(DragDropContext);

  const [loading, setLoading] = useState(false);
  const [searchDealer, setSearchDealer] = useState("");
  const [searchFloorManager, setSearchFloorManager] = useState("");
  const [searchPitManager, setSearchPitManager] = useState("");

  const [filteredDealers, setFilteredDealers] = useState(dealers);
  const [filteredFloorManagers, setFilteredFloorManagers] =
    useState(floorManagers);
  const [filteredPitManagers, setFilteredPitManagers] = useState(pitManagers);

 

  const handleDealerSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchDealer(value);
    let searchRes = searchEmployees(value, dealers);
    if (searchRes) setFilteredDealers(searchRes);
  };

  const handleFloorManagersSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchFloorManager(value);
    let searchRes = searchEmployees(value, floorManagers);
    if (searchRes) setFilteredFloorManagers(searchRes);
  };

  const handlePitManagersSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchPitManager(value);
    let searchRes = searchEmployees(value, pitManagers);
    if (searchRes) setFilteredPitManagers(searchRes);
  };
  const getFloors = async () => {
    try {
      setLoading(true);
      let floors = await axios.get(`${BASE_PATH}/api/State/Floors/1`);
      setFloors(floors?.data);
      setLoading(false);
    } catch (error) {
      console.log("something went wrong while fetching floors", error);
    }
  };

  const getPits = async () => {
    try {
      setLoading(true);
      let pits = await axios.get(`${BASE_PATH}/api/State/Pits/1`);
      setPits(pits?.data);
      setLoading(false);
    } catch (error) {
      console.log("something went wrong while fetching pits", error);
    }
  };

  const getPositions = async () => {
    try {
      setLoading(true);
      let positions = await axios.get(`${BASE_PATH}/api/State/Positions/1`);
      setPositions(positions?.data);
      setLoading(false);
    } catch (error) {
      console.log("something went wrong while fetching positions", error);
    }
  };

  const getTables = async () => {
    try {
      setLoading(true);
      let tables = await axios.get(`${BASE_PATH}/api/State/Tables/1`);
      setTables(tables?.data);
      setLoading(false);
    } catch (error) {
      console.log("something went wrong while fetching tables", error);
    }
  };

  // let defaultDate = "2024-05-25"
  let defaultDate = dateTime

  const getDealers = async () => {
    try {
      setLoading(true);
      let dealers = await axios.get(
        `${BASE_PATH}/api/Employees/Dealers/1?selectedDate=${defaultDate}`
        //year-month-date-thms.milisec
        //yyyy-mm-ddTHH:MM:00.000z
      );
      setDealers(dealers?.data);
      setLoading(false);
    } catch (error) {
      console.log("something went wrong while fetching dealers", error);
    }
  };

  const getFloorManagers = async () => {
    try {
      setLoading(true);
      let floorManagers = await axios.get(
        `${BASE_PATH}/api/Employees/FloorManagers/1?selectedDate=${defaultDate}`
      );
      setFloorManagers(floorManagers?.data);
      setLoading(false);
    } catch (error) {
      console.log("something went wrong while fetching Floor Managers", error);
    }
  };

  const getPitManagers = async () => {
    try {
      setLoading(true);
      let pitManagers = await axios.get(
        `${BASE_PATH}/api/Employees/PitManagers/1?selectedDate=${defaultDate}`
      );
      setPitManagers(pitManagers?.data);
      setLoading(false);
    } catch (error) {
      console.log("something went wrong while fetching Pit Managers", error);
    }
  };

  useEffect(() => {
    getFloors();
    getPits();
    getPositions();
    getTables();
    getDealers();
    getFloorManagers();
    getPitManagers();
  }, [dateTime]);

  const hanldeTableDropDownElementOnDragStart = (event, table) => {
    console.log("table-------##------", table);
    if (!table?.userId) {
      setDraggingTable(table);
      event.dataTransfer.setData("table", table);
    } else {
      setDraggingTable(null);
    }
  };

  const dataNotFound = (
    <Paper elevation={24}>
      <Typography
        variant="overline"
        display="block"
        sx={{ padding: "20px" }}
        gutterBottom
      >
        Data not found
      </Typography>
    </Paper>
  );

  const tableContentView = (table) => (
    <ListItemButton>
      <ListItemIcon>
        <CalendarViewMonthIcon />
      </ListItemIcon>
      <ListItemText primary={table?.name} />
    </ListItemButton>
  );

  const employeesContentView = (employee) => (
    <ListItemButton>
      <ListItemIcon>
        <PersonOutlineIcon />
      </ListItemIcon>
      <ListItemText
        sx={{ fontSize: "10px" }}
        primary={`${employee.firstName} ${employee.lastName} (${employee.employeeNumber})`}
        secondary={`${employee.scheduleDate}  `}
      />
    </ListItemButton>
  );

  const getParkingLotsUi = () => (
    <>
      {loading ? (
        <Loader />
      ) : parkingLots?.length > 0 ? (
        parkingLots.map((table, tableIndex) => (
          <Paper elevation={24} key={`${table.name - tableIndex}`}>
            <ListItem
              component="div"
              disablePadding
              draggable
              onDragStart={(event) =>
                hanldeTableDropDownElementOnDragStart(event, table)
              }
            >
              {tableContentView(table)}
            </ListItem>
          </Paper>
        ))
      ) : (
        dataNotFound
      )}
    </>
  );

  const getFloorsUi = () => (
    <>
      {loading ? (
        <Loader />
      ) : floors?.length > 0 ? (
        floors.map((table, tableIndex) => (
          <Paper elevation={24} key={`${table.name - tableIndex}`}>
            <ListItem
              component="div"
              disablePadding
              draggable
              onDragStart={(event) =>
                handleFloorTableDraggedFromDropDoanListOnDragStart(event, table)
              }
            >
              {tableContentView(table)}
            </ListItem>
          </Paper>
        ))
      ) : (
        dataNotFound
      )}
    </>
  );

  const getPitsUi = () => (
    <>
      {loading ? (
        <Loader />
      ) : pits?.length > 0 ? (
        pits.map((table, tableIndex) => (
          <Paper elevation={24} key={`${table.name - tableIndex}`}>
            <ListItem
              component="div"
              disablePadding
              draggable
              onDragStart={(event) =>
                hanldeTableDropDownElementOnDragStart(event, table)
              }
            >
              {tableContentView(table)}
            </ListItem>{" "}
          </Paper>
        ))
      ) : (
        dataNotFound
      )}
    </>
  );

  const getPositionsUi = () => (
    <>
      {loading ? (
        <Loader />
      ) : (
        positions?.length > 0 &&
        positions.map((table, tableIndex) => (
          <Paper elevation={24} key={`${table.name - tableIndex}`}>
            <ListItem
              component="div"
              disablePadding
              draggable
              onDragStart={(event) =>
                hanldeTableDropDownElementOnDragStart(event, table)
              }
            >
              {tableContentView(table)}
            </ListItem>{" "}
          </Paper>
        ))
      )}
    </>
  );

  const getTablesUi = () => (
    <>
      {loading ? (
        <Loader />
      ) : (
        tables?.length > 0 &&
        tables.map((table, tableIndex) => (
          <Paper elevation={24} key={`${table.name - tableIndex}`}>
            <ListItem
              component="div"
              disablePadding
              draggable
              onDragStart={(event) =>
                hanldeTableDropDownElementOnDragStart(event, table)
              }
            >
              {tableContentView(table)}
            </ListItem>
          </Paper>
        ))
      )}
    </>
  );

  const getDealersUi = () => (
    <>
      {loading ? (
        <Loader />
      ) : searchDealer !== "" && filteredDealers?.length > 0 ? (
        filteredDealers.map((table, tableIndex) => (
          <Paper elevation={24} key={table.employeeNumber}>
            <ListItem
              component="div"
              disablePadding
              draggable
              onDragStart={(event) =>
                hanldeTableDropDownElementOnDragStart(event, table)
              }
            >
              {employeesContentView(table)}
            </ListItem>{" "}
          </Paper>
        ))
      ) : dealers?.length > 0 ? (
        dealers.map((table, tableIndex) => (
          <Paper elevation={24} key={table.employeeNumber}>
            <ListItem
              component="div"
              disablePadding
              draggable
              onDragStart={(event) =>
                hanldeTableDropDownElementOnDragStart(event, table)
              }
            >
              {employeesContentView(table)}
            </ListItem>
          </Paper>
        ))
      ) : (
        dataNotFound
      )}
    </>
  );

  const getFloorManagersUi = () => (
    <>
      {/* {console.log(
        " searchFloorManager filteredFloorManagers?.length > 0---",
        searchFloorManager
      )}
      {console.log("v------", filteredFloorManagers)} */}
      {loading ? (
        <Loader />
      ) : searchFloorManager !== "" && filteredFloorManagers?.length > 0 ? (
        filteredFloorManagers.map((table, tableIndex) => (
          <Paper elevation={24} key={table.employeeNumber}>
            <ListItem
              component="div"
              disablePadding
              draggable
              onDragStart={(event) =>
                hanldeTableDropDownElementOnDragStart(event, table)
              }
            >
              {employeesContentView(table)}
            </ListItem>{" "}
          </Paper>
        ))
      ) : floorManagers?.length > 0 ? (
        floorManagers.map((table, tableIndex) => (
          <Paper elevation={24} key={table.firstName}>
            <ListItem
              component="div"
              disablePadding
              draggable
              onDragStart={(event) =>
                hanldeTableDropDownElementOnDragStart(event, table)
              }
            >
              {employeesContentView(table)}
            </ListItem>{" "}
          </Paper>
        ))
      ) : (
        dataNotFound
      )}
    </>
  );

  const getPitManagersUi = () => (
    <>
      {loading ? (
        <Loader />
      ) : searchPitManager !== "" && filteredPitManagers?.length > 0 ? (
        filteredPitManagers.map((table, tableIndex) => (
          <Paper elevation={24} key={table.employeeNumber}>
            <ListItem
              component="div"
              disablePadding
              draggable
              onDragStart={(event) =>
                hanldeTableDropDownElementOnDragStart(event, table)
              }
            >
              {employeesContentView(table)}
            </ListItem>{" "}
          </Paper>
        ))
      ) : pitManagers?.length > 0 ? (
        pitManagers.map((table, tableIndex) => (
          <Paper elevation={24} key={table.firstName}>
            <ListItem
              component="div"
              disablePadding
              draggable
              onDragStart={(event) =>
                hanldeTableDropDownElementOnDragStart(event, table)
              }
            >
              {employeesContentView(table)}
            </ListItem>{" "}
          </Paper>
        ))
      ) : (
        dataNotFound
      )}
    </>
  );
  return (
    <div className="collaplisble_container">
      <Collapsible
        title={ROTATION_STATES}
        kay="All Tables"
        containerClass="groupr_collapsible"
      >
        <Collapsible
          title={`Unassigned Parking lots (${parkingLots.length})`}
          kay="Parking Lots"
        >
          {getParkingLotsUi()}
        </Collapsible>

        <Collapsible
          title={`Unassigned Floors (${floors.length})`}
          kay="Floors"
        >
          {getFloorsUi()}
        </Collapsible>

        <Collapsible title={`Unassigned Pits (${pits.length})`} kay="Pits">
          {getPitsUi()}
        </Collapsible>

        <Collapsible
          title={`Unassigned Positions (${positions.length})`}
          kay="Positions"
        >
          {getPositionsUi()}
        </Collapsible>

        <Collapsible
          title={`Unassigned Tables (${tables.length})`}
          kay="Tables"
        >
          {getTablesUi()}
        </Collapsible>
      </Collapsible>
      <Divider />
      <Collapsible
        title={EMPLOYEES}
        kay="All Employees"
        containerClass="groupr_collapsible"
      >
        <Collapsible
          title={
            searchDealer !== "" && filteredDealers?.length > 0
              ? `Unassigned Dealers (${filteredDealers.length})`
              : `Unassigned Dealers (${dealers.length})`
          }
          kay="Dealers"
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TextField
              id="standard-basic"
              label="Search Here"
              variant="standard"
              value={searchDealer}
              onChange={handleDealerSearchChange}
              // defaultValue="Default Value"
              // helperText="Some important text"
            />
          </div>
          {getDealersUi()}
        </Collapsible>

        <Collapsible
          title={
            searchFloorManager !== "" && filteredFloorManagers?.length > 0
              ? `Unassigned Dealers (${filteredFloorManagers.length})`
              : `Unassigned Floor Managers (${floorManagers.length})`
          }
          kay="Floor Managers"
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TextField
              id="standard-basic"
              label="Search Here"
              variant="standard"
              value={searchFloorManager}
              onChange={handleFloorManagersSearchChange}
            />
          </div>
          {getFloorManagersUi()}
        </Collapsible>

        <Collapsible
          title={
            searchPitManager !== "" && filteredPitManagers?.length > 0
              ? `Unassigned Dealers (${filteredPitManagers.length})`
              : `Unassigned Pit Managers (${pitManagers.length})`
          }
          kay="Pit Managers"
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TextField
              id="standard-basic"
              label="Search Here"
              variant="standard"
              value={searchPitManager}
              onChange={handlePitManagersSearchChange}
            />
          </div>
          {getPitManagersUi()}
        </Collapsible>
      </Collapsible>

      {/* <Collapsible title="Users">{getUsersUi()}</Collapsible> */}
    </div>
  );
}

export default CollapsiblesParent;
