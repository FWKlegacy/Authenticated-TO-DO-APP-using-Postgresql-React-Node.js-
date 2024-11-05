import React, { useState } from "react";
import "./Modal.css";
import { MdClear } from "react-icons/md";

const Modal = ({ mode, setShowModal }) => {
  const editMode = mode === "edit-btn" ? true : false;
  const [data, setData] = useState({
    user_email: "",
    title: "",
    progress: "",
    date: editMode ? "" : new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));

    console.log(data);
  };
  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>lets create your task</h3>
          <button onClick={() => setShowModal(false)}>
            <MdClear />
          </button>
        </div>
        <form>
          <input
            required
            maxLength={30}
            placeholder="your task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="range">Drag to select your cureewnt progress</label>
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
