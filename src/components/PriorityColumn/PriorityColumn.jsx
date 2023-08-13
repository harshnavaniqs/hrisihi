import React from 'react';
import './PriorityColumn.css';
import TicketCard from '../TicketCard/TicketCard';

function PriorityColumn({ title, tasks, users }) {
  return (
    <div className="priority-column">
      <h2 className="column-title">{title}</h2>
      <div className="cards">
        {tasks.map((task) => (
          <TicketCard key={task.id} task={task} users={users} />
        ))}
      </div>
    </div>
  );
}

export default PriorityColumn;
