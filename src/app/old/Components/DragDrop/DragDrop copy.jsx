import React, { useState } from "react";
import Card from "../Card/Cards";
import "./DragDrop.css";

const DragDropContext = () => {
  const [cards, setCards] = useState([]);

  const onDragStart = (event, item) => {
    event.dataTransfer.setData("item", item);
  };

  const onDrop = (event) => {
    const item = event.dataTransfer.getData("item");
    setCards([...cards, { id: cards.length + 1, content: item }]);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="drag-drop-context">
      <div className="draggable-items">
        <div
          className="draggable-item"
          draggable
          onDragStart={(event) => onDragStart(event, "New Card Content")}
        >
          Drag me to create a card
        </div>
      </div>
      <div className="drop-area" onDrop={onDrop} onDragOver={onDragOver}>
        {cards.map((card, index) => (
          <Card key={card.id} title={card.id} content={card.content} />
        ))}
      </div>
    </div>
  );
};

export default DragDropContext;
