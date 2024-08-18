import { useContext, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DraftsIcon from "@mui/icons-material/Drafts";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AssignmentLateOutlinedIcon from "@mui/icons-material/AssignmentLateOutlined";
import { SchedulerContext } from "../../Context/SchedulerContext/SchedulerContext";

const options = ["Unassign Employee", "Close Table"];

const ITEM_HEIGHT = 48;

export default function LongMenu({ card }) {
  const { handleCloseTable } = useContext(SchedulerContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    console.log("event.currentTarget----------", event.currentTarget);

    setAnchorEl(null);
  };
  const closeTable = () => {
    const { stringId, id } = card;
    handleCloseTable(stringId, id);
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "22ch",
          },
        }}
      >
        <MenuItem onClick={() => {}}>
          <ListItemIcon>
            <AssignmentLateOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Unassign Employee
          </Typography>
        </MenuItem>

        <MenuItem onClick={closeTable}>
          <ListItemIcon>
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Close Table
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
