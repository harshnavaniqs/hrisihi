import React from "react";
import "./PriorityColumn.css";
import TicketCard from "../TicketCard/TicketCard";

import { AiOutlineWarning } from "react-icons/ai";

import { BiDotsHorizontalRounded } from "react-icons/bi";

import {
  MdSignalCellularAlt,
  MdSignalCellularAlt2Bar,
  MdSignalCellularAlt1Bar,
} from "react-icons/md";

function formatTitle(title) {
  return title
    .split(/(?=[A-Z])/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const priorityNames = {
  0: "No Priority",
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Urgent",
};

const priorityIcons = {
  "No Priority": <BiDotsHorizontalRounded />,
  Low: <MdSignalCellularAlt1Bar />,
  Medium: <MdSignalCellularAlt2Bar />,
  High: <MdSignalCellularAlt />,
  Urgent: <AiOutlineWarning />,
};

function PriorityColumn({ title, tasks, users, groupBy }) {
  if (groupBy === "userId") {
    const user = users.find((user) => user.id === title);
    if (user) {
      title = user.name;
    }
  } else if (groupBy === "status") {
    // Format status titles with capitalization and spacing
    title = formatTitle(title);
  } else if (groupBy === "priority") {
    // console.log("Priority Icon for", title, ":", priorityIcons[title]);
    title = priorityNames[title];
  }

  return (
    <div className="priority-column">
      <h2 className="column-title">
      {groupBy === 'priority' && (
          <span className="priority-icon">
            {priorityIcons[title]}
          </span>
        )}
       {title}
        &nbsp; &nbsp; {tasks.length}{" "}
        <span className="column-title-dots">+ &nbsp; ···</span>{" "}
      </h2>
      <div className="cards">
        {tasks.map((task) => (
          <TicketCard key={task.id} task={task} users={users} grouping={groupBy}/>
        ))}
      </div>
    </div>
  );
}

export default PriorityColumn;
