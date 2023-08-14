import React, { useState, useEffect } from "react";
import "./TicketCard.css";

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
      <div
        className="circle"
        onClick={handleToggleComplete}
      >
        {/* {isCompleted ? '✓' : ''} */}

        {isCompleted && <span className="tick">✔</span>}
      </div>
      <div className="ticket-details">
        <div className="card-body">
          {task.id}
          <h3 className="title"> {task.title}</h3> {/* Display id as title */}
          <p className="tag">
            {" "}
            <span className="tag-text">{task.tag}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TicketCard;
