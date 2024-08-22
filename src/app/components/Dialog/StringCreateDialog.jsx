import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
// import { Add, Remove } from '@mui/icons-material';
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DateTimePicker from "../DateTime/DateTimePicker";

import { SchedulerContext } from "../../Context/SchedulerContext/SchedulerContext";
import { DragDropContext } from "../../Context/DragDropContext/DragDropContext";

import { createStringObject } from "../../Utils/utils";

const RotationDialog = ({ open, onClose }) => {
  const { dateTime, setStrings } = useContext(SchedulerContext);
  const { draggingFloorTable } = useContext(DragDropContext);

  const [stringName, setStringName] = useState("");
  const [rotationTime, setRotationTime] = useState(30);
  const [rotationType, setRotationType] = useState(0);
  const [startDateOfString, setStartDateOfString] = useState(dateTime);

  const handleSave = () => {
    console.log({
      stringName,
      rotationTime,
      rotationType,
    });

    let string = createStringObject(
      {
        stringName,
        rotationTime,
        rotationType,
        startDate: dateTime,
      },
      draggingFloorTable
    );

    if (string) {
      //   setStrings((prev) => [...prev, string]);
      setStrings((prev) => [string, ...prev]);
    }

    onClose();
  };

  const increaseRotationTime = () => {
    setRotationTime((prevTime) => prevTime + 5);
  };

  const decreaseRotationTime = () => {
    setRotationTime((prevTime) => (prevTime > 5 ? prevTime - 5 : prevTime));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      // fullScreen={"md"}
    >
      <DialogTitle>Rotation Settings</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="String Name"
          type="text"
          fullWidth
          variant="outlined"
          value={stringName}
          onChange={(e) => setStringName(e.target.value)}
        />

        <div style={{ padding: "20px 20px 20px 0px" }}>
          Rotation Time{" "}
          <IconButton onClick={increaseRotationTime}>
            <AddIcon />
          </IconButton>{" "}
          {rotationTime}{" "}
          <IconButton onClick={decreaseRotationTime}>
            <RemoveIcon />
          </IconButton>
        </div>
        <TextField
          margin="dense"
          label="Rotation Type"
          select
          fullWidth
          variant="outlined"
          value={rotationType}
          onChange={(e) => setRotationType(Number(e.target.value))}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
        </TextField>
        <div style={{ padding: "20px 0px 20px 0px" }}>
          <DateTimePicker
            dateTimePickerLable={"Start Date"}
            pickerStyle={{
              minWidth: 305,
              svg: { color: "#ccc" },
              input: { color: "#000" },
            }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RotationDialog;
