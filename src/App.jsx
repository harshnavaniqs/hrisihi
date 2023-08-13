import "./App.css";
import React, { useState, useEffect } from "react";
import PriorityColumn from "./components/PriorityColumn/PriorityColumn";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://apimocha.com/quicksell/data");
        const jsonData = await response.json();

        if (
          typeof jsonData === "object" &&
          jsonData !== null &&
          jsonData &&
          jsonData.tickets
        ) {
          setData(jsonData);
        } else {
          console.error("Fetched data is not a valid object:", jsonData);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

 
  const ticketsByPriority = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
  };

  // Group tickets by priority using for...of loop
  if (data.tickets && data.tickets.length > 0) {
    for (const ticket of data.tickets) {
      ticketsByPriority[ticket.priority].push(ticket);
    }
  }

  return (
    <>
      <Navbar />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="kanban-board">
          <PriorityColumn priorityLabel="No Priority" items={ticketsByPriority[0]} />
          <PriorityColumn priorityLabel="Urgent" items={ticketsByPriority[1]} />
          <PriorityColumn priorityLabel="High" items={ticketsByPriority[2]} />
          <PriorityColumn priorityLabel="Medium" items={ticketsByPriority[3]} />
          <PriorityColumn priorityLabel="Low" items={ticketsByPriority[4]} />
        </div>
      )}
    </>
  );
}

export default App;
