import React from "react";
import "./TicketCard.css";

function TicketCard({ task }) {
  return (
    <div className="ticket-card">
      <div className="card-body">
        {task.id}
        <h3 className="title"> {task.title}</h3> {/* Display id as title */}
        <p className="tag">
          {" "}
          <span className="tag-text">{task.tag}</span>
        </p>
      </div>
    </div>
  );
}

export default TicketCard;
