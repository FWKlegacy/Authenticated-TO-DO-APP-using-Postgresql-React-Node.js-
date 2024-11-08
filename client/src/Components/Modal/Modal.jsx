import React, { useEffect, useRef, useState } from "react";
import "./Modal.css";
import { MdClear } from "react-icons/md";

const Modal = ({ mode, setShowModal, task, getData }) => {
  const editMode = mode === "edit-btn" ? true : false;
  const inputRef = useRef();
  const [data, setData] = useState({
    user_email: editMode ? task.user_email : "wanjalawafulabrevian@gmail.com",
    title: editMode ? task.title : "",
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date(),
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //edit todo
  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/todos/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        console.log("edit success");
        setShowModal(false);
        getData(); // Assuming getData fetches updated task data
      } else {
        console.log("Failed to edit task", response.status);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //Add new todo
  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        console.log("task added");
        setShowModal(false);
        getData(); // Assuming getData fetches updated task data
      } else {
        console.log("Failed to create task", response.status);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };
  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>lets create your task</h3>
          <span>
            <button onClick={() => setShowModal(false)}>
              <MdClear />
            </button>
          </span>
        </div>
        <form onSubmit={editMode ? editData : postData}>
          <input
            ref={inputRef}
            required
            maxLength={30}
            placeholder="your task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="range">Drag to select your current progress</label>
          <input
            id="range"
            type="range"
            required
            max="100"
            min="0"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input type="submit" className={mode} />
        </form>
      </div>
    </div>
  );
};

export default Modal;
