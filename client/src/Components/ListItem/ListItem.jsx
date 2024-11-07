import React, { useState } from "react";
import "./ListItem.css";
import TickIcon from "../../Components/TickIcon/TickIcon";
import Modal from "../Modal/Modal";

const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false);

  //delete todo
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/todos/${task.id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        console.log("deleted successful");
        getData();
      } else {
        console.log("failed to delete", response.status);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <li className="list-item">
      <div className="info-container">
        <p className="task-title">
          <TickIcon />
          {task.title}
        </p>
      </div>
      <div className="buttons">
        <button className="edit-btn" onClick={() => setShowModal(true)}>
          EDIT
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          DELETE
        </button>
        {showModal && (
          <Modal
            mode={"edit-btn"}
            setShowModal={setShowModal}
            task={task}
            getData={getData}
          />
        )}
      </div>
    </li>
  );
};

export default ListItem;
