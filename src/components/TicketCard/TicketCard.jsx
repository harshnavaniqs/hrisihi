import React, { useState, useEffect } from "react";
import "./TicketCard.css";
import { AiOutlineWarning } from "react-icons/ai";

import { BiDotsHorizontalRounded } from "react-icons/bi";

import {
  MdSignalCellularAlt,
  MdSignalCellularAlt2Bar,
  MdSignalCellularAlt1Bar,
} from "react-icons/md";


const priorityIcons = {
 0: <BiDotsHorizontalRounded />,
  1: <MdSignalCellularAlt1Bar />,
  2: <MdSignalCellularAlt2Bar />,
  3: <MdSignalCellularAlt />,
  4: <AiOutlineWarning />,
};

function truncateTitle(title, maxLength) {
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + "...";
  }
  return title;
}

function TicketCard({ task, users, grouping }) {
  const [isCompleted, setIsCompleted] = useState(task.completed || false);

  useEffect(() => {
    const savedCompletionState = localStorage.getItem(`completed_${task.id}`);

    if (savedCompletionState) {
      setIsCompleted(JSON.parse(savedCompletionState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(`completed_${task.id}`, JSON.stringify(isCompleted));
  }, [isCompleted]);

  const handleToggleComplete = () => {
    setIsCompleted(!isCompleted);
  };

  const renderPriorityIcon = () => {
    if (grouping !== "priority") {
      return priorityIcons[task.priority] || null;
    } else {
      return null;
    }
  };

  return (
    <div className={`ticket-card ${isCompleted ? "completed" : ""}`}>
      <div className="circle" onClick={handleToggleComplete}>
        {/* {isCompleted ? '✓' : ''} */}

        {isCompleted && <span className="tick">✔</span>}
      </div>
      <div className="ticket-details">
        <div className="card-body">
          {task.id}
          <h3 className="title"> {truncateTitle(task.title, 35)}</h3>{" "}
          {/* Display id as title */}
          <div className="tag">
            {" "}
            <div className="exclamation-box">{renderPriorityIcon()}</div>
            <span className="tag-text">{task.tag}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketCard;
