import React, { useState } from "react";
import "./Navbar.css";

function Navbar({ groupBy, sortOption, onGroupByChange, onSortOptionChange }) {
  const [showDisplayBox, setShowDisplayBox] = useState(false); // Initialize with false
  
  const toggleDisplayBox = () => {
    setShowDisplayBox(!showDisplayBox); // Toggle the value
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div
          className={`display-button-container ${showDisplayBox ? "show" : ""}`}
        >
          <button className="display-button" onClick={toggleDisplayBox}>
            Display
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`dropdown-arrow ${showDisplayBox ? 'show' : ''}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
            
          </button>

         
          <div className={`button-box ${showDisplayBox ? "show" : ""}`}>
              <div className="grouping-options">
                <div className="select-container">
                  <label htmlFor="groupSelect">Group by:</label>
                  <select
                    id="groupSelect"
                    value={groupBy}
                    onChange={onGroupByChange}
                  >
                    <option value="status">By Status</option>
                    <option value="userId">By User</option>
                    <option value="priority">By Priority</option>
                  </select>
                </div>
              </div>

              <div className="sorting-options">
                <div className="select-container">
                  <label htmlFor="sortSelect">Sort by:</label>
                  <select
                    id="sortSelect"
                    value={sortOption}
                    onChange={onSortOptionChange}
                  >
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                  </select>
                </div>
              </div>
            </div>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
