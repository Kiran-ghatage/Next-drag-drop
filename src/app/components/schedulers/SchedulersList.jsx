"use client";
import { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import { DragDropContext } from "../../Context/DragDropContext/DragDropContext";
import { SchedulerContext } from "../../Context/SchedulerContext/SchedulerContext";
import { SCHEDULER_TYPES } from "../../Constants/SchedulerTypes";
import { BASE_PATH } from "../../Constants/Constants";
import Card from "../Card/Card1";
import Loader from "../Common/Loader";
import StringCreateDialog from "../Dialog/StringCreateDialog";
import "./SchedulersList.scss";
import axios from "axios";

function SchedulersList({
  handleTableDropDownElementOnDrop,
  handleTableDropDownElementOnDragOver,
}) {
  const { strings, setStrings, dateTime, searchTableTerm, filteredTables } =
    useContext(SchedulerContext);
  const {
    isStringTablesCanSwipe,
    setIsStringTablesCanSwipe,
    draggingFloorTable,
    setDraggingFloorTable,
    draggingDealer,
  } = useContext(DragDropContext);

  const [draggingCard, setDraggingCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  let defaultDate = "2024-06-16";
  // let defaultDate = dateTime;
  const getStrings = async () => {
    try {
      setLoading(true);
      let strings = await axios.get(
        `${BASE_PATH}/api/StringData?selectedDateTime=${defaultDate}`
      );
      setStrings(strings?.data);
      // setFilterTables(strings?.data);
      setLoading(false);
    } catch (error) {
      console.log("something went wrong while fetching Strings", error);
    }
  };

  useEffect(() => {
    if (!searchTableTerm.length > 0) getStrings();
  }, [dateTime, searchTableTerm]);

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
  const handleCardOnDrop = (event, index, stringId, stateId) => {
    console.log("handleCardOnDrop--called-----", stringId);
    console.log("handleCardOnDrop--draggingDealer-----", draggingDealer);
    console.log("stateId----", stateId);

    event.preventDefault();

    if (isStringTablesCanSwipe) {
      const isSameString = stringId !== draggingCard.stringId;
      if (isSameString) {
        // start----remove table from parent string start
        const dragedTableFromString = strings.filter(
          (string) =>
            string.id === draggingCard.stringId &&
            string?.stateInfo?.id !== draggingCard.id
        );

        const filteredTables = dragedTableFromString[0]?.stateInfo?.filter(
          (state) => state?.id !== draggingCard.id
        );

        dragedTableFromString[0].stateInfo = filteredTables;
        setStrings((prev) => {
          return [...prev, filteredString];
        });
        // end---- remove table from parent string start

        console.log(
          "dragedTableFromString---------------",
          dragedTableFromString
        );

        const filteredString = strings.filter(
          (string) => string.id === stringId
        );

        draggingCard.stringId = stringId;
        let tables = filteredString[0].stateInfo;
        tables.push(draggingCard);
        setStrings((prev) => {
          return [...prev, filteredString];
        });
      } else {
        // start ----------- for existing Cars swiping with in string
        const filteredString = strings.filter(
          (string) =>
            string.id === draggingCard.stringId &&
            string?.stateInfo?.id !== draggingCard.id
        );

        console.log("draggingFloorTable---------------", filteredString);
        console.log("draggingCard---------------", draggingCard);
        const newCards = filteredString[0]?.stateInfo?.filter(
          (state) => state?.id !== draggingCard.id
        );
        console.log("newCards---------------", newCards);

        newCards.splice(index, 0, draggingCard);
        filteredString[0].stateInfo = newCards;
        setStrings((prev) => {
          return [...prev, filteredString];
        });
        // End ----------- for existing Cars swiping with in string
      }
    } else {
      //add dealer to table
      if (draggingDealer?.employeeNumber && stateId) {
        const filteredString = strings.filter(
          (string) => string.id === stringId
        );

        const filteredTables = filteredString[0]?.stateInfo?.map((state) => {
          if (state?.id === stateId) {
            state.userInfo = draggingDealer;
            return state;
          } else {
            return state;
          }
        });

        filteredString[0].stateInfo = filteredTables;
        setStrings((prev) => {
          return [...prev, filteredString];
        });
        setIsStringTablesCanSwipe(true);
      } else {
        //add new table to string
        setIsStringTablesCanSwipe(true);
        const filteredString = strings.filter(
          (string) => string.id === stringId
        );
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
    }
    // setDraggingCard(null);
  };

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const createNewString = (event) => {
    event.preventDefault();
    handleOpenDialog(true);
  };

  return (
    <>
      {loading ? (
        <div className="scheduler_container">
          <Loader />
        </div>
      ) : (
        <div
          className="scheduler_container"
          onDrop={handleTableDropDownElementOnDrop}
          onDragOver={handleTableDropDownElementOnDragOver}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50px",
              background: "#ccc",
              margin: "10px 75px 30px 75px",
              borderRadius: "10px",
            }}
            onDrop={(event) => createNewString(event)}
          >
            <Avatar
              sx={{ fontSize: "small", width: 30, height: 30 }}
              alt="add icon"
            >
              <AddIcon />
            </Avatar>
          </div>
          {filteredTables?.length > 0
            ? filteredTables.map((string, stringIndex) => (
                <div key={stringIndex}>
                  {/* <Typography>{string?.name?.toUpperCase()}</Typography> */}
                  <div key={string.id} className="scheduler_cards">
                    {string?.stateInfo?.length > 0 &&
                      string.stateInfo.map((state, stateIndex) => (
                        <div
                          className={"scheduler_cards_width"}
                          key={stateIndex}
                          onDrop={(event) =>
                            handleCardOnDrop(
                              event,
                              stateIndex,
                              string?.id,
                              state?.id
                            )
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
                    {string?.stateInfo?.length < 5 && (
                      <div
                      style={{ height: "90px", width: "20%", border: "1px dotted", borderRadius: "15px" }}
                      onDrop={(event) =>
                          handleCardOnDrop(event, null, string.id)
                        }
                      ></div>
                    )}
                  </div>
                </div>
              ))
            : strings?.length > 0 &&
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
                            handleCardOnDrop(
                              event,
                              stateIndex,
                              string.id,
                              state?.id
                            )
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
                    {string?.stateInfo?.length < 5 && (
                      <div
                        style={{ height: "90px", width: "20%", border: "1px dotted", borderRadius: "15px" }}
                        onDrop={(event) =>
                          handleCardOnDrop(event, null, string.id)
                        }
                      ></div>
                    )}
                  </div>
                </div>
              ))}
          <StringCreateDialog open={dialogOpen} onClose={handleCloseDialog} />
        </div>
      )}
    </>
  );
}

export default SchedulersList;
