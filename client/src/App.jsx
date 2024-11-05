import React, { useEffect, useState } from "react";
import "./App.css";
import ListHeader from "../src/Components/ListHeader/ListHeader";
import ListItem from "../src/Components/ListItem/ListItem";

function App() {
  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    const userEmail = "wanjalawafulabrevian@gmail.com";
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`);
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => getData, []);

  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  return (
    <div className="app">
      <ListHeader listName={" 🏖️ Holiday Tick List"} />
      {sortedTasks?.map((task) => (
        <ListItem key={task.id} task={task} />
      ))}
    </div>
  );
}

export default App;
