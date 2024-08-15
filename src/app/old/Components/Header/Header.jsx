import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Box, InputBase } from "@mui/material";
import { DateTimePicker } from "@mui/lab";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left side: App Name and Current Date & Time */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6">My App</Typography>
          <Typography variant="caption">
            {currentTime.toLocaleDateString()}{" "}
            {currentTime.toLocaleTimeString()}
          </Typography>
        </Box>

        {/* Right side: Search Bar and Date-Time Picker */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ ml: 2 }}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Select Date & Time"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
