import React from "react";
import "./PriorityColumn.css";
import TicketCard from "../TicketCard/TicketCard";

function formatTitle(title) {
  return title
    .split(/(?=[A-Z])/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function PriorityColumn({ title, tasks, users, groupBy }) {
  if (groupBy === "userId") {
    const user = users.find((user) => user.id === title);
    if (user) {
      title = user.name;
    }
  } else if (groupBy === "status") {
    // Format status titles with capitalization and spacing
    title = formatTitle(title);
  }

  return (
    <div className="priority-column">
      <h2 className="column-title">
        {title}&nbsp; &nbsp; {tasks.length}  <span className="column-title-dots">+ &nbsp; ···</span>{" "}
      </h2>
      <div className="cards">
        {tasks.map((task) => (
          <TicketCard key={task.id} task={task} users={users} />
        ))}
      </div>
    </div>
  );
}

export default PriorityColumn;
