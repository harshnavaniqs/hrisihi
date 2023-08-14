import React, { useState } from "react";
import "./TicketCard.css";

function TicketCard({ task, users }) {
  const [isCompleted, setIsCompleted] = useState(task.completed || false);

  const handleToggleComplete = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div className={`ticket-card ${isCompleted ? "completed" : ""}`}>
      <div className={`circle ${isCompleted ? 'completed' : ''}`} onClick={handleToggleComplete}>
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
