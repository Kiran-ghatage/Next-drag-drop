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
  } = useContext(SchedulerContext);
  const {
    setDraggingTable,
    handleFloorTableDraggedFromDropDoanListOnDragStart,
  } = useContext(DragDropContext);

  const [loading, setLoading] = useState(false);
  const basePath = "https://localhost:44355";

  const getFloors = async () => {
    try {
      setLoading(true);
      let floors = await axios.get(`${basePath}/api/State/Floors/1`);
      setFloors(floors?.data);
      setLoading(false);
    } catch (error) {
      console.log("something went wrong while fetching floors", error);
    }
  };

  const getPits = async () => {
    try {
      setLoading(true);
      let pits = await axios.get(`${basePath}/api/State/Pits/1`);
      setPits(pits?.data);
      setLoading(false);
    } catch (error) {
      console.log("something went wrong while fetching pits", error);
    }
  };

  const getPositions = async () => {
    try {
      setLoading(true);
      let positions = await axios.get(`${basePath}/api/State/Positions/1`);
      setPositions(positions?.data);
      setLoading(false);
    } catch (error) {
      console.log("something went wrong while fetching positions", error);
    }
  };

  const getTables = async () => {
    try {
      setLoading(true);
      let tables = await axios.get(`${basePath}/api/State/Tables/1`);
      setTables(tables?.data);
      setLoading(false);
    } catch (error) {
      console.log("something went wrong while fetching tables", error);
    }
  };

  const getDealers = async () => {
    try {
      setLoading(true);
      let dealers = await axios.get(
        `${basePath}/api/Employees/Dealers/1?selectedDate=2024-05-25`
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
        `${basePath}/api/Employees/FloorManagers/1?selectedDate=2024-05-25`
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
        `${basePath}/api/Employees/PitManagers/1?selectedDate=2024-05-25`
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
    getPitManagers()
  }, []);

  
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
  const getParkingLotsUi = () => (
    <>
      {loading ? (
        <Loader />
      ) : parkingLots?.length > 0 ? (
        parkingLots.map((table) => (
          <Paper elevation={24} key={table.name}>
            <ListItem
              component="div"
              disablePadding
              draggable
              onDragStart={(event) =>
                hanldeTableDropDownElementOnDragStart(event, table)
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <CalendarViewMonthIcon />
                </ListItemIcon>
                <ListItemText primary={table.name} />
              </ListItemButton>
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
        floors.map((table) => (
          <Paper elevation={24} key={table.name}>
            <ListItem
              component="div"
              disablePadding
              draggable
              onDragStart={(event) =>
                handleFloorTableDraggedFromDropDoanListOnDragStart(event, table)
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <CalendarViewMonthIcon />
                </ListItemIcon>
                <ListItemText primary={table.name} />
              </ListItemButton>
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
        pits.map((table) => (
          <Paper elevation={24} key={table.name}>
            <ListItem
              component="div"
              disablePadding
              draggable
              onDragStart={(event) =>
                hanldeTableDropDownElementOnDragStart(event, table)
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <CalendarViewMonthIcon />
                </ListItemIcon>
                <ListItemText primary={table.name} />
              </ListItemButton>
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
        positions.map((table) => (
          <Paper elevation={24} key={table.name}>
            <ListItem
              component="div"
              disablePadding
              draggable
              onDragStart={(event) =>
                hanldeTableDropDownElementOnDragStart(event, table)
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <CalendarViewMonthIcon />
                </ListItemIcon>
                <ListItemText primary={table.name} />
              </ListItemButton>
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
        tables.map((table) => (
          <Paper elevation={24} key={table.name}>
            <ListItem
              component="div"
              disablePadding
              draggable
              onDragStart={(event) =>
                hanldeTableDropDownElementOnDragStart(event, table)
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <CalendarViewMonthIcon />
                </ListItemIcon>
                <ListItemText primary={table.name} />
              </ListItemButton>
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
      ) : dealers?.length > 0 ? (
        dealers.map((table) => (
          <Paper elevation={24} key={table.firstName}>
            <ListItem
              component="div"
              disablePadding
              draggable
              onDragStart={(event) =>
                hanldeTableDropDownElementOnDragStart(event, table)
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <PersonOutlineIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontSize: "10px" }}
                  primary={`${table.firstName} ${table.lastName} (${table.employeeNumber})`}
                  secondary={`${table.scheduleDate}  `}
                />
                {/* <ListItemText primary={`${table.scheduleDate}  `} /> */}
              </ListItemButton>
            </ListItem>{" "}
          </Paper>
        ))
      ) : (
        dataNotFound
      )}
    </>
  );

  const getFloorManagersUi = () => (
    <>
      {loading ? (
        <Loader />
      ) : floorManagers?.length > 0 ? (
        floorManagers.map((table) => (
          <Paper elevation={24} key={table.firstName}>
            <ListItem
              component="div"
              disablePadding
              draggable
              onDragStart={(event) =>
                hanldeTableDropDownElementOnDragStart(event, table)
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <PersonOutlineIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontSize: "10px" }}
                  primary={`${table.firstName} ${table.lastName} (${table.employeeNumber})`}
                  secondary={`${table.scheduleDate}  `}
                />
                {/* <ListItemText primary={`${table.scheduleDate}  `} /> */}
              </ListItemButton>
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
      ) : pitManagers?.length > 0 ? (
        pitManagers.map((table) => (
          <Paper elevation={24} key={table.firstName}>
            <ListItem
              component="div"
              disablePadding
              draggable
              onDragStart={(event) =>
                hanldeTableDropDownElementOnDragStart(event, table)
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <PersonOutlineIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontSize: "10px" }}
                  primary={`${table.firstName} ${table.lastName} (${table.employeeNumber})`}
                  secondary={`${table.scheduleDate}  `}
                />
                {/* <ListItemText primary={`${table.scheduleDate}  `} /> */}
              </ListItemButton>
            </ListItem>{" "}
          </Paper>
        ))
      ) : (
        dataNotFound
      )}
    </>
  );
  return (
    <>
      <Collapsible
        title={`All Tables`}
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
        title={`All Employees`}
        kay="All Employees"
        containerClass="groupr_collapsible"
      >
        <Collapsible
          title={`Unassigned Dealers (${dealers.length})`}
          kay="Dealers"
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TextField
              id="standard-basic"
              label="Search Here"
              variant="standard"
              // defaultValue="Default Value"
              // helperText="Some important text"
            />
          </div>
          {getDealersUi()}
        </Collapsible>

        <Collapsible
          title={`Unassigned Floor Managers (${floorManagers.length})`}
          kay="Floor Managers"
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TextField
              id="standard-basic"
              label="Search Here"
              variant="standard"
              // defaultValue="Default Value"
              // helperText="Some important text"
            />
          </div>
          {getFloorManagersUi()}
        </Collapsible>

        <Collapsible
          title={`Unassigned Pit Managers (${pitManagers.length})`}
          kay="Pit Managers"
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TextField
              id="standard-basic"
              label="Search Here"
              variant="standard"
              // defaultValue="Default Value"
              // helperText="Some important text"
            />
          </div>
          {getPitManagersUi()}
        </Collapsible>
      </Collapsible>

      {/* <Collapsible title="Users">{getUsersUi()}</Collapsible> */}
    </>
  );
}

export default CollapsiblesParent;
