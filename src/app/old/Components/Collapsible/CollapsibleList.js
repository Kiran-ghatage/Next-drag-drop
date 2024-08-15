import React, { useState } from "react";
import "./CollapsibleList.css";

const CollapsibleList = ({ items }) => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="collapsible-list">
      {items.map((item, index) => (
        <div key={index} className="collapsible-item">
          <div className="collapsible-header" onClick={() => toggleItem(index)}>
            <span className="collapsible-icon">
              {openItems[index] ? "-" : "+"}
            </span>
            {item.title}
          </div>
          {openItems[index] && <>{item.content()}</>}
        </div>
      ))}
    </div>
  );
};

export default CollapsibleList;
