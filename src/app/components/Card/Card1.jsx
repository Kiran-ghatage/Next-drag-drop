"use client";
import React, { useContext } from "react";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { DragDropContext } from "../../Context/DragDropContext/DragDropContext";
import Menu from '../Common/Menu'
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
      key={card?.name}
      draggable={card?.sequenceId !== 0 ? draggable : false}
      onDragStart={(event) => onCardDragStart(event, card)}
    >
      <Paper elevation={3} className="scheduler-container">
        <header className={`card-header ${headerClass}`}>
          {card?.name}{" "}
          {draggable && card?.sequenceId !== 0 && <Menu card={card}/>}
        </header>
        <article className="card-content">
          {card?.userInfo && (
            <div className="card-content-user">
              <Avatar
                sx={{ fontSize: "small", width: 30, height: 30 }}
                alt="user icon"
              >
                <PersonOutlineIcon />
              </Avatar>
              <p className="user-text">
                {" "}
                {`${card?.userInfo.name || card?.userInfo?.firstName} (${card?.userInfo.employeeNumber})`}{" "}
              </p>
            </div>
          )}
        </article>
      </Paper>
    </div>
  );
};

export default Card;
