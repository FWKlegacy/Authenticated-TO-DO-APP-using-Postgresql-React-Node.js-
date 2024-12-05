import { useEffect, useState } from "react";
import ListHeader from "../ListHeader/ListHeader";
import ListItem from "../ListItem/ListItem";

const Home = () => {
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    const userEmail = "wanjalawafulabrevian@gmail.com"; // This should be dynamically fetched from logged-in user data (e.g., from localStorage)
    const token = localStorage.getItem("token"); // Retrieve the JWT token from localStorage (or cookie)

    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch tasks.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []); // Ensure this only runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
