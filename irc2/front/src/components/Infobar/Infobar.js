import axios from "axios";
import React, { useState, useEffect} from "react";
import "./infobar.css";
export default function Infobar({ currentChat }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [editedName, setEditedName] = useState("");

useEffect(() => {
  setName(currentChat.name)
  
},[currentChat])

  const handleModification = async (e) => {
    e.preventDefault();
    const message = {
      name: editedName,
    };

    try {
      const res = await axios.put(
        `http://localhost:8080/api/conversation/name/${currentChat._id}`,
        message
      );
      // setName(currentChat.name);
      // // console.log(res.data);
      setEditedName("");
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="infobar">
      {isEditing ? (
        <input
          type="text"
          value={isEditing ? editedName : name}
          onChange={(e) => setEditedName(e.target.value)}
          placeholder={isEditing ?name: editedName}
        />
      ) : (
        <h1>{name}</h1>
      )}

      {isEditing ? (
        <button className="putButton" onClick={handleModification}>
          validé
        </button>
      ) : (
        <button
          className="putButton"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          modifier
        </button>
      )}
    </div>
  );
}
