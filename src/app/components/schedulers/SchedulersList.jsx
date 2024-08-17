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
  const {
    isStringTablesCanSwipe,
    setIsStringTablesCanSwipe,
    draggingFloorTable,
    setDraggingFloorTable,
  } = useContext(DragDropContext);

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
    if (card && isStringTablesCanSwipe) {
      console.log("card----------##---", card);
      setDraggingCard(card);
      event.dataTransfer.effectAllowed = "move";
    }
  };

  //Cars swiping and adding users to card
  const handleCardOnDrop = (event, index, stringId) => {
    console.log("handleCardOnDrop--called-----");

    event.preventDefault();

    if (isStringTablesCanSwipe) {
      // for existing Cars swiping with in string
      const filteredString = strings.filter(
        (card) =>
          card.id === draggingCard.stringId &&
          card?.stateInfo?.id !== draggingCard.id
      );
      const newCards = filteredString[0]?.stateInfo?.filter(
        (state) => state?.id !== draggingCard.id
      );

      newCards.splice(index, 0, draggingCard);
      filteredString[0].stateInfo = newCards;
      setStrings((prev) => {
        return [...prev, filteredString];
      });
    } else {
      setIsStringTablesCanSwipe(true);
      const filteredString = strings.filter((string) => string.id === stringId);
      console.log("draggingFloorTable---------------", draggingFloorTable);
      console.log("filteredString---------------", filteredString);

      if (filteredString?.length > 0) {
        const newTable = {
          id: filteredString[0]?.stringLength + 1,
          stringId: stringId,
          sequenceId: filteredString[0]?.stringLength + 1,
          name: draggingFloorTable.name,
          stateType: 0,
          startDate: "2024-06-25T14:07:51.327",
          endDate: null,
          userInfo: null,
          lastRecordUpdated: "0001-01-01T00:00:00",
        };

        let tables = filteredString[0].stateInfo;
        tables.push(newTable);
        setStrings((prev) => {
          return [...prev, filteredString];
        });
      }
    }
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
                  <div
                    className="scheduler_cards_width"
                    key={stateIndex}
                    onDrop={(event) =>
                      handleCardOnDrop(event, stateIndex, string.id)
                    }
                  >
                    <Card
                      card={state}
                      onCardDragStart={onCardDragStart}
                      draggable={isStringTablesCanSwipe}
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
