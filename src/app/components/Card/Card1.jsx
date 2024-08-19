"use client";
import React, { useContext } from "react";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { DragDropContext } from "../../Context/DragDropContext/DragDropContext";
import { SchedulerContext } from "../../Context/SchedulerContext/SchedulerContext";

import Menu from "../Common/Menu";
import "./Card.scss";
const Card = ({
  card,
  onCardDragStart,
  draggable,
  onCardElementDragStart,
  headerClass,
}) => {
  const { handleRemoveTable } = useContext(DragDropContext);
  const { searchTableTerm } = useContext(SchedulerContext);

  return (
    <div
      key={card?.name}
      draggable={card?.sequenceId !== 0 ? draggable : false}
      onDragStart={(event) => onCardDragStart(event, card)}
    >
      <Paper
        elevation={searchTableTerm && card?.name.toLowerCase().includes(searchTableTerm) ? 22:1}
        className={
          searchTableTerm && card?.name.toLowerCase().includes(searchTableTerm)
            ? "scheduler-container_searched"
            : "scheduler-container"
        }
      >
        <header className={`card-header ${headerClass}`}>
          {card?.name}{" "}
          {draggable && card?.sequenceId !== 0 && <Menu card={card} />}
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
                {`${card?.userInfo.name || card?.userInfo?.firstName} (${
                  card?.userInfo.employeeNumber
                })`}{" "}
              </p>
            </div>
          )}
        </article>
      </Paper>
    </div>
  );
};

export default Card;
