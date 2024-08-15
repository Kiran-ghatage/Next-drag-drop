import React, { useState } from 'react';
import './Collapsible.css';

const Collapsible = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapsible">
      <button onClick={toggleCollapsible} className="collapsible__button">
        {title}
        <span className="collapsible__icon">
          {isOpen ? (
            <i className="fas fa-chevron-up"></i>
          ) : (
            <i className="fas fa-chevron-down"></i>
          )}
        </span>
      </button>
      {isOpen && <div className="collapsible__content">{children}</div>}
    </div>
  );
};

export default Collapsible;
