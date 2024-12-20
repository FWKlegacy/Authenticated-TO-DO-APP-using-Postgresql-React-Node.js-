import React, { useState } from "react";
import "./ListHeader.css";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";

const ListHeader = ({ listName, getData }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleSignOut = () => {
    navigate("/login");
  };
  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="buttons">
        <button className="create-btn" onClick={() => setShowModal(true)}>
          Add New
        </button>
        <button className="signout-btn" onClick={handleSignOut}>
          Sign Out
        </button>
        {showModal && (
          <Modal
            mode={"create-btn"}
            setShowModal={setShowModal}
            getData={getData}
          />
        )}
      </div>
    </div>
  );
};

export default ListHeader;
