import React, { useEffect, useState } from "react";
import ListHeader from "../ListHeader/ListHeader";
import ListItem from "../ListItem/ListItem";

const Home = () => {
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
      <ListHeader listName={" 🏖️ Holiday Tick List"} getData={getData} />
      {sortedTasks?.map((task) => (
        <ListItem key={task.id} task={task} getData={getData} />
      ))}
    </div>
  );
};

export default Home;
