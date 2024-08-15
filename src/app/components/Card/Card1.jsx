import React, { useContext } from "react";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { DragDropContext } from "../../Context/DragDropContext/DragDropContext";

import "./Card.scss";
const Card = ({
  card,
  onCardDragStart,
  draggable,
  onCardElementDragStart,
  headerClass,
}) => {
  const { handleRemoveTable } = useContext(DragDropContext);

  return (
    <div
      draggable={draggable}
      onDragStart={(event) => onCardDragStart(event, card)}
    >
      <Paper elevation={3} className="scheduler-container">
        <header className={`card-header ${headerClass}`}>
          {card?.name}{" "}
          {draggable && card?.sequenceId !== 0 && <p className={`dots`}>...</p>}
        </header>
        <article className="card-content">
          {card?.users?.length > 0 &&
            card?.users.map((user) => {
              return (
                <div
                  className="card-element"
                  draggable={draggable}
                  onDragStart={(event) => onCardElementDragStart(event, card)}
                >{`${user?.userId} - ${user?.firstName}`}</div>
              );
            })}
          <div className="card-content-user">
            <Avatar sx={{ fontSize: "small",  width: 30, height: 30  }} alt="Remy Sharp">
              <PersonOutlineIcon />
            </Avatar>
           <p className="user-text"> {`${card?.userInfo.firstName} ${card?.userInfo.lastName} (${card?.userInfo.employeeNumber})`}{" "} </p>
          </div>
        </article>
      </Paper>
    </div>
  );
};

export default Card;
