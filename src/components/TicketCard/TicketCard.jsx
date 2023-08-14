import React, { useState, useEffect } from "react";
import "./TicketCard.css";

function truncateTitle(title, maxLength) {
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + "...";
  }
  return title;
}

function TicketCard({ task, users }) {
  const [isCompleted, setIsCompleted] = useState(task.completed || false);

  useEffect(() => {
    const savedCompletionState = localStorage.getItem(`completed_${task.id}`);

    if (savedCompletionState) {
      setIsCompleted(JSON.parse(savedCompletionState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(`completed_${task.id}`, JSON.stringify(isCompleted));
    console.log("isCompleted", isCompleted);
    console.log("task.id", task.id);
  }, [isCompleted]);

  const handleToggleComplete = () => {
    setIsCompleted(!isCompleted);
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
            <div className="exclamation-box">!</div>
            <span className="tag-text">{task.tag}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketCard;
