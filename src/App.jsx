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

  const [loadingSavedState, setLoadingSavedState] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const savedGroupBy = localStorage.getItem("groupBy") || "priority";
    const savedSortOption = localStorage.getItem("sortOption") || "priority";

    setGroupBy(savedGroupBy);
    setSortOption(savedSortOption);
    // console.log("savedGroupBy", savedGroupBy);
    // console.log("savedSortOption", savedSortOption);
    setLoadingSavedState(false);
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
    const newGroupBy = event.target.value;
    localStorage.setItem("groupBy", newGroupBy);
  }

  function handleSortOptionChange(event) {
    const newSortOption = event.target.value;

    localStorage.setItem("sortOption", newSortOption);
    setSortOption(event.target.value);
  }

  return (
    <>
      <div className="kanban-board">
        {!isLoading && !loadingSavedState && (
          <Navbar
            groupBy={groupBy}
            sortOption={sortOption}
            onGroupByChange={handleGroupByChange}
            onSortOptionChange={handleSortOptionChange}
          />
        )}
        {isLoading ? (
          <div className="loading">
            <span className="loading-text">Loading</span>
            <div className="loading-dots">
              <div className="dot dot1"></div>
              <div className="dot dot2"></div>
              <div className="dot dot3"></div>
            </div>
          </div>
        ) : (
          <>
            {Object.entries(groupTasksByGrouping()).sort((a, b) => b[0] - a[0]).map(
              ([groupTitle, groupTasks]) => (
                <PriorityColumn
                  key={groupTitle}
                  title={groupTitle}
                  tasks={sortTasksByCriteria(groupTasks, sortOption)}
                  users={users}
                  groupBy={groupBy}
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
