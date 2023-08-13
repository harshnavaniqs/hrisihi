import React from 'react';
import './PriorityColumn.css';
import { FaExclamation, FaBolt, FaSignal } from 'react-icons/fa';

const PriorityColumn = ({ priorityLabel, items, priority }) => {
  // Define icons for each priority
  const priorityIcons = {
    0: '...',
    1: <FaExclamation />,
    2: <FaBolt />,
    3: <FaSignal />,
    4: <FaSignal />,
  };

  return (
    <div className={`kanban-column priority-${priority}`}>
      <div className="priority-icon">{priorityIcons[priority]}</div>
      <h2>{priorityLabel}</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PriorityColumn;
