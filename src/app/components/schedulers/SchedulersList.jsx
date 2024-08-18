"use client";
import { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { DragDropContext } from "../../Context/DragDropContext/DragDropContext";
import { SchedulerContext } from "../../Context/SchedulerContext/SchedulerContext";
import { SCHEDULER_TYPES } from "../../Constants/SchedulerTypes";
import { BASE_PATH } from "../../Constants/Constants";
import Card from "../Card/Card1";
import Loader from "../Common/Loader";

import "./SchedulersList.scss";
import axios from "axios";

function SchedulersList({
  handleTableDropDownElementOnDrop,
  handleTableDropDownElementOnDragOver,
}) {
  const { strings, setStrings, dateTime } = useContext(SchedulerContext);
  const {
    isStringTablesCanSwipe,
    setIsStringTablesCanSwipe,
    draggingFloorTable,
    setDraggingFloorTable,
  } = useContext(DragDropContext);

  const [draggingCard, setDraggingCard] = useState(null);
  const [loading, setLoading] = useState(false);
  // let defaultDate = "2024-05-25"
  let defaultDate = dateTime;
  const getStrings = async () => {
    try {
      setLoading(true);
      let strings = await axios.get(
        `${BASE_PATH}/api/StringData?selectedDateTime=${defaultDate}`
      );
      setStrings(strings?.data);
      setLoading(false);
    } catch (error) {
      console.log("something went wrong while fetching Strings", error);
    }
  };

  useEffect(() => {
    getStrings();
  }, [dateTime]);

  // const getHeaderClass = (type) => {
  //   switch (type) {
  //     case SCHEDULER_TYPES.STRING:
  //       return "string";
  //     case SCHEDULER_TYPES.PIT:
  //       return "pit";
  //     default:
  //       return "pit";
  //   }
  // };

  const getHeaderClass = (type) => {    
    switch (type) {
      case 1:
        return "string";
      case 2:
        return "pit";
      case 3:
        return "floor";
      case 4:
        return "posion";
      default:
        return "pit";
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
            {/* <Typography>{string?.name?.toUpperCase()}</Typography> */}
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
                      headerClass={getHeaderClass(string.id)}
                    />
                  </div>
                ))}
              {/* {string?.stateInfo?.length < 4 && (
                <div
                  style={{ height: "140px", width: "20%" }}
                  onDrop={(event) => handleCardOnDrop(event, null, string.id)}
                ></div>
              )} */}
            </div>
          </div>
        ))}
    </div>
  );
}

export default SchedulersList;
