import React, { useContext, useState } from "react";
import DragDropCardPlayground from "../Card/DragDropCardPlayground";
import { DragDropContext } from "../../Context/DragDropContext/DragDropContext";
import { isUserExists } from "../../Utils/utils";
import "./DragDrop.scss";

const DragDropTablePlayground = ({
  cards,
  handleTableDropDownElementOnDrop,
  handleTableDropDownElementOnDragOver,
  setStringTables,
  flooreTable,
  onElementDropOnCard,
}) => {
  const { draggingUserFromDropDownList, string } = useContext(DragDropContext);
  const [draggingCard, setDraggingCard] = useState(null);
  const [isCardDraggable, setIsCardDraggable] = useState(true);

  console.log("cards----------##---", cards);
  console.log("string----------##---", string);

  const onCardDragStart = (event, card) => {
    if (card) {
      console.log("card----------##---", card);
      setDraggingCard(card);
      event.dataTransfer.effectAllowed = "move";
    }
  };


  //Cars swiping and adding users to card
  const handleCardOnDrop = (event, index) => {
    console.log("dropper something-----------", index);
    event.preventDefault();
    if (draggingCard) {
      const newCards = cards.filter((card) => card !== draggingCard);

      newCards.splice(index, 0, draggingCard);
      setStringTables(newCards);
      setDraggingCard(null);
    } else {
      const userDroppedonCard = cards[index];
      const addUser = {
        ...userDroppedonCard,
        users: [draggingUserFromDropDownList],
      };
      setStringTables((prv) =>
        prv.map((table) => {
          if (table.id === userDroppedonCard.id) {
            if (table?.users) {
              if (!isUserExists(table?.users, draggingUserFromDropDownList)) {
                return {
                  ...table,
                  users: [...table.users, draggingUserFromDropDownList],
                };
              } else {
                return table;
              }
            } else {
              return addUser;
            }
          } else {
            return table;
          }
        })
      );
    }
  };
  return (
    <div className="drag-drop-context">
      <div
        className="drop-area"
        onDrop={handleTableDropDownElementOnDrop}
        onDragOver={handleTableDropDownElementOnDragOver}
      >
        {cards.length > 0 && (
          <div
            className="card-container"
            draggable={false}
            key={flooreTable?.id}
          >
            <DragDropCardPlayground
              card={flooreTable}
              key={flooreTable?.id}
              onCardDragStart={onCardDragStart}
              draggable={false}
              onElementDropOnCard={onElementDropOnCard}
            />{" "}
          </div>
        )}
        {cards.map((card, index) => (
          <div
            className="card-container"
            onDrop={(event) => handleCardOnDrop(event, index)}
            key={card?.id || index}
          >
            <DragDropCardPlayground
              key={card?.id || index}
              card={card}
              onCardDragStart={onCardDragStart}
              draggable={isCardDraggable}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragDropTablePlayground;
