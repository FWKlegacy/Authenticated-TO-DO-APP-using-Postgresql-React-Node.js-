import React from "react";
import "./ListItem.css";
import TickIcon from "../../Components/TickIcon/TickIcon";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
const ListItem = ({ task }) => {
  return (
    <li className="list-item">
      <div className="info-container">
        <p className="task-title">
          <TickIcon />
          {task.title}
        </p>
        <ProgressBar />
      </div>
      <div className="buttons">
        <button className="edit-btn">TO EDIT</button>
        <button className="delete-btn">TO DELETE</button>
      </div>
    </li>
  );
};

export default ListItem;
