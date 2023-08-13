import React from "react";
import "./PriorityColumn.css"; // Import the PriorityColumn.css stylesheet

function PriorityColumn({ title, tasks, users }) {
  function getUserById(userId) {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown User";
  }

  return (
    <div className="column">
      <h2>{title}</h2>
      {tasks.map((task) => (
        <div key={task.id} className="task-card">
          <div className="task-title">{task.title}</div>
          <div className="task-priority">Priority: {task.priority}</div>
          <div className="task-user">
            Assigned to: {getUserById(task.userId)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PriorityColumn;
