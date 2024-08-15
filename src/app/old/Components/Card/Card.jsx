import React, { useContext } from "react";
import { DragDropContext } from "../../Context/DragDropContext/DragDropContext";

import "./Card.css";
const Card = ({
  card,
  onCardDragStart,
  draggable,
  onCardElementDragStart,
  stringTableUsers,
}) => {
  const { handleRemoveTable } = useContext(DragDropContext);

  return (
    <div
      draggable={draggable}
      onDragStart={(event) => onCardDragStart(event, card)}
    >
      <header className="card-header">
        {card?.name}{" "}
        {draggable && (
          <i
            class="fa fa-times"
            aria-hidden="true"
            onClick={() => handleRemoveTable(card)}
          ></i>
        )}
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
      </article>
    </div>
  );
};

export default Card;
