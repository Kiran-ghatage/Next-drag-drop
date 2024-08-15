import { useContext, useState } from "react";
import { DragDropContext } from "../../Context/DragDropContext/DragDropContext";
import Card from "./Card";

const DragDropCardPlayground = ({
  card,
  onCardDragStart,
  draggable,
  onElementDropOnCard,
}) => {
//   const [stringTableUsers, setStringTableUsers] = useState([]);
  const [draggingTableUser, setDraggingTableUser] = useState();

  const {
    draggingUserFromDropDownList,
    setDraggingUserFromDropDownList,
    stringTableUsers,
    setStringTableUsers,
    setDraggingUserFromCardList
  } = useContext(DragDropContext);

  const onCardElementDragStart = (event, element) => {
    console.log("element----onCardElementDragStart--##-----", element);

    if (element?.userId) {
      setDraggingUserFromCardList(element)
      event.dataTransfer.setData("tableUser", element);
    } else {
      console.log(
        "element-inside else--------------------setDraggingUserFromDropDownList----##-----",
        element
      );
    }
  };

  const objectExists = (array, newItem) => {
    return array.some(
      (item) =>
        item?.userId === newItem?.userId &&
        item?.employeeNumber === newItem?.employeeNumber
    );
  };

//   const onElementDropOnCard = (event) => {
//     if (!objectExists(stringTableUsers, draggingUserFromDropDownList)) {
//       const newId =
//         stringTableUsers.length > 0
//           ? Math.max(...stringTableUsers.map((item) => item.id)) + 1
//           : 1;
//       setStringTableUsers([
//         ...stringTableUsers,
//         { ...draggingUserFromDropDownList, id: newId },
//       ]);
//     } else {
//       console.log("User already exists");
//     }
//   };
  // const onElementDropOnCard = (event) => {
  //   if (!objectExists(stringTableUsers, draggingTableUser)) {
  //     const newId =
  //       stringTableUsers.length > 0
  //         ? Math.max(...stringTableUsers.map((item) => item.id)) + 1
  //         : 1;
  //     setStringTableUsers([
  //       ...stringTableUsers,
  //       { ...draggingTableUser, id: newId },
  //     ]);
  //   } else {
  //     console.log("User already exists");
  //   }
  // };

  const onTableElementDragOver = (event) => {
    event.preventDefault();
  };
  return (
    <div onDrop={onElementDropOnCard} onDragOver={onTableElementDragOver}>
      <Card
        key={card?.id}
        card={card}
        onCardDragStart={onCardDragStart}
        draggable={draggable}
        stringTableUsers={stringTableUsers}
        onCardElementDragStart={onCardElementDragStart}
      />
    </div>
  );
};

export default DragDropCardPlayground;
