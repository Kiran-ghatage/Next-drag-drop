"use client";
import { useContext, useState } from "react";
import Typography from "@mui/material/Typography";
import { DragDropContext } from "../../Context/DragDropContext/DragDropContext";
import { SchedulerContext } from "../../Context/SchedulerContext/SchedulerContext";
import { SCHEDULER_TYPES } from "../../Constants/SchedulerTypes";
import Card from "../Card/Card1";

import "./SchedulersList.scss";

function SchedulersList({
  handleTableDropDownElementOnDrop,
  handleTableDropDownElementOnDragOver,
}) {
  const { strings, setStrings } = useContext(SchedulerContext);

  const [draggingCard, setDraggingCard] = useState(null);

  const getHeaderClass = (type) => {
    switch (type) {
      case SCHEDULER_TYPES.STRING:
        return "string";
      case SCHEDULER_TYPES.PIT:
        return "pit";
      default:
        break;
    }
  };

  const onCardDragStart = (event, card) => {
    if (card) {
      console.log("card----------##---", card);
      setDraggingCard(card);
      event.dataTransfer.effectAllowed = "move";
    }
  };

  //Cars swiping and adding users to card
  const handleCardOnDrop = (event, index) => {
    console.log("dropper something-----------", index, draggingCard);
    event.preventDefault();

    const filteredString = strings.filter(
      (card) =>
        card.id === draggingCard.stringId &&
        card?.stateInfo?.id !== draggingCard.id
    );
    console.log("filteredString-----------", filteredString);

    const newCards = filteredString[0]?.stateInfo?.filter(
      (state) => state?.id !== draggingCard.id
    );

    console.log("newCards-----------", newCards);
    newCards.splice(index, 0, draggingCard);
    filteredString[0].stateInfo = newCards;
    setStrings((prev) => {
      return [...prev, filteredString];
    });
    // setDraggingCard(null);
  };
  return (
    <div
      className="scheduler_container"
      onDrop={handleTableDropDownElementOnDrop}
      onDragOver={handleTableDropDownElementOnDragOver}
    >
      {strings?.length > 0 &&
        strings.map((string, stringIndex) => (
          <div key={stringIndex}>
            <Typography>{string?.name?.toUpperCase()}</Typography>
            <div key={string.id} className="scheduler_cards">
              {string?.stateInfo?.length > 0 &&
                string.stateInfo.map((state, stateIndex) => (
                  <div onDrop={(event) => handleCardOnDrop(event, stateIndex)}>
                    <Card
                      key={state.id}
                      card={state}
                      onCardDragStart={onCardDragStart}
                      draggable={true}
                      onCardElementDragStart={() => {}}
                      headerClass={getHeaderClass(string.name)}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default SchedulersList;
