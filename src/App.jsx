import "./App.css";
import React, { useState, useEffect } from "react";
import PriorityColumn from "./components/PriorityColumn/PriorityColumn";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://apimocha.com/quicksell/data");
      const jsonData = await response.json();

      setTasks(jsonData.tickets || []);
      setUsers(jsonData.users || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  function filterTasksByPriority(priority) {
    return tasks.filter((task) => task.priority === priority);
  }

  function handleGroupByChange(event) {
    setGroupBy(event.target.value);
  }

  function groupTasksByGrouping() {
    const groupedTasks = {};

    tasks.forEach(task => {
      if (!groupedTasks[task[groupBy]]) {
        groupedTasks[task[groupBy]] = [];
      }
      groupedTasks[task[groupBy]].push(task);
    });

    return groupedTasks;
  }
  

  return (
    <>
      <Navbar />

      <div className="kanban-board">
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <PriorityColumn title="Urgent" tasks={filterTasksByPriority(4)} users={users} />
          <PriorityColumn title="High" tasks={filterTasksByPriority(3)} users={users} />
          <PriorityColumn title="Medium" tasks={filterTasksByPriority(2)} users={users} />
          <PriorityColumn title="Low" tasks={filterTasksByPriority(1)} users={users} />
          <PriorityColumn title="No Priority" tasks={filterTasksByPriority(0)} users={users} />
        </>
      )}
      </div>
    </>
  );
}

export default App;
