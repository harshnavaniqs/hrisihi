import React, { useState } from "react";
import "./DropdownButton.css";

const DropdownButton = () => {
  const [isParentOpen, setParentOpen] = useState(false);
  const [isGroupingOpen, setGroupingOpen] = useState(false);
  const [isSortingOpen, setSortingOpen] = useState(false);

  const toggleParent = () => {
    setParentOpen(!isParentOpen);
    setGroupingOpen(false);
    setSortingOpen(false);
  };

  const toggleGrouping = () => {
    setGroupingOpen(!isGroupingOpen);
    setSortingOpen(false);
  };

  const toggleSorting = () => {
    setSortingOpen(!isSortingOpen);
    setGroupingOpen(false);
  };

  return (
    <div className="dropdown-container">
      <button
        className="dropdown-button parent-dropdown"
        onClick={toggleParent}
      >
        <span>Display </span>
        <span className={`arrow ${isGroupingOpen ? "open" : ""}`}>&#9660;</span>
      </button>
      {isParentOpen && (
        <div
          className={`dropdown-menu parent-menu ${isParentOpen ? "show" : ""}`}
        >
          {/* Dropdown for Grouping */}
          <div className="menu-section">
            <div className="dropdown-label">Grouping:</div>
            <button className="dropdown-button" onClick={toggleGrouping}>
              <span>Dropdown</span>
              <span
                className="arrow"
                style={{
                  transform: `rotate(${isGroupingOpen ? "180deg" : "0"})`,
                }}
              >
                &#9660;
              </span>
            </button>
            {isGroupingOpen && (
              <div className="submenu">
                {/* Options for grouping dropdown */}
                <button className="option-button">Option 1</button>
                <button className="option-button">Option 2</button>
                {/* ... */}
              </div>
            )}
          </div>

          {/* Dropdown for Sorting */}
          <div className="menu-section">
            <div className="dropdown-label">Odering:</div>
            <button className="dropdown-button" onClick={toggleSorting}>
              <span>Dropdown</span>
              <span
                className="arrow"
                style={{
                  transform: `rotate(${isSortingOpen ? "180deg" : "0"})`,
                }}
              >
                &#9660;
              </span>
            </button>
            {isSortingOpen && (
              <div className="submenu">
                {/* Options for sorting dropdown */}
                <button className="option-button">Option A</button>
                <button className="option-button">Option B</button>
                {/* ... */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
