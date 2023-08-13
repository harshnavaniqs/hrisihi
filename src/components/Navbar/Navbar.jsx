import React from 'react';
import './Navbar.css';

function Navbar({ groupBy, sortOption, onGroupByChange, onSortOptionChange }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="grouping-options">
          <label htmlFor="groupSelect">Group by:</label>
          <select id="groupSelect" value={groupBy} onChange={onGroupByChange}>
          <option value="status">By Status</option>
            <option value="userId">By User</option>
            <option value="priority">By Priority</option>
          </select>
        </div>
        <div className="sorting-options">
          <label htmlFor="sortSelect">Sort by:</label>
          <select id="sortSelect" value={sortOption} onChange={onSortOptionChange}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;





