import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { MdOutlineDisplaySettings } from "react-icons/md";

function Navbar({ groupBy, sortOption, onGroupByChange, onSortOptionChange }) {
  const [showDisplayBox, setShowDisplayBox] = useState(false); // Initialize with false

  const toggleDisplayBox = () => {
    setShowDisplayBox(!showDisplayBox); // Toggle the value
  };

  useEffect(() => {
    const handleDocumentClick = (e) => {
      // Check if the click target is not within the display box
      if (!e.target.closest(".display-button-container")) {
        setShowDisplayBox(false);
      }
    };

    // Add event listener to listen for clicks on the entire document
    document.addEventListener("click", handleDocumentClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div
          className={`display-button-container ${showDisplayBox ? "show" : ""}`}
        >
          <button className="display-button" onClick={toggleDisplayBox}>
            <MdOutlineDisplaySettings
              size={16}
              className="display-button-icon"
            />{" "}
            {/* down arrow on the left */}
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
              className={`dropdown-arrow ${showDisplayBox ? "show" : ""}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          <div className={`button-box ${showDisplayBox ? "show" : ""}`}>
          {showDisplayBox && ( 
            <div className="grouping-options">
              <div className="select-container">
                <label htmlFor="groupSelect">Grouping :</label>
                <select
                  id="groupSelect"
                  value={groupBy}
                  onChange={onGroupByChange}
                >
                  <option value="status">Status</option>
                  <option value="userId">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
            </div>
          )}
          {showDisplayBox && (
            <div className="sorting-options">
              <div className="select-container">
                <label htmlFor="sortSelect">Sorting :</label>
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
            )}
          
          </div>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
