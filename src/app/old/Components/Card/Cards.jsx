import React from "react";
import "./Card.css";
const Cards = ({ card, onDragStart, draggable }) => {
  return (
    <div draggable={draggable} onDragStart={(event) => onDragStart(event, card)}>
      <header className="card-header">{card.name}</header>
      <article
        className="card-content"
        // draggable
        // onDragStart={(event) => onTableDragStart(event, table)}
      >
        <p>{card.name}</p>
        <p>{card.skills}</p>
      </article>
    </div>
  );
};

export default Cards;
