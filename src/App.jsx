import "./App.css";
import React, { useState, useEffect } from "react";
import PriorityColumn from "./components/PriorityColumn/PriorityColumn";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [groupBy, setGroupBy] = useState("priority");

  const [sortOption, setSortOption] = useState("priority");

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

  function filterTasksByCriteria(task) {
    switch (groupBy) {
      case "status":
        return task.status;
      case "userId":
        return task.userId;
      case "priority":
        return task.priority;
      default:
        return null;
    }
  }

  function groupTasksByGrouping() {
    const groupedTasks = {};

    tasks.forEach((task) => {
      const groupCriteria = filterTasksByCriteria(task);
      if (groupCriteria !== null) {
        if (!groupedTasks[groupCriteria]) {
          groupedTasks[groupCriteria] = [];
        }
        groupedTasks[groupCriteria].push(task);
      }
    });

    return groupedTasks;
  }

  function sortTasksByCriteria(tasks, sortOption) {
    return tasks.slice().sort((a, b) => {
      if (sortOption === "priority") {
        return b.priority - a.priority;
      } else if (sortOption === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }

  function handleGroupByChange(event) {
    setGroupBy(event.target.value);
  }

  function handleSortOptionChange(event) {
    setSortOption(event.target.value);
  }

  return (
    <>
      <div className="kanban-board">
        {!isLoading && (
          <Navbar
            groupBy={groupBy}
            sortOption={sortOption}
            onGroupByChange={handleGroupByChange}
            onSortOptionChange={handleSortOptionChange}
          />
        )}
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            {Object.entries(groupTasksByGrouping()).map(
              ([groupTitle, groupTasks]) => (
                <PriorityColumn
                  key={groupTitle}
                  title={groupTitle}
                  tasks={sortTasksByCriteria(groupTasks, sortOption)}
                  users={users}
                />
              )
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
