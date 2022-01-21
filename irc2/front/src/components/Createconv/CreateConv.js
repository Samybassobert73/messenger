import React, { useState, useEffect } from "react";
import "./createconv.css";
import axios from "axios";
export default function CreateConv({ currentUser }) {
  const [users, setUsers] = useState([]);
  //create une conversation
  const [select, setSelect] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/users/all");
        var data = res.data;
        let adduser = data.filter((user) => user._id !== currentUser._id);
        setUsers(adduser);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const checkedUser = users.filter((user) => user.isChecked === true);
    let receivers = checkedUser.map((user) => user._id);
    const convuser = {
      sender: currentUser._id,
      receivers,
    };
    try {
      const res = await axios.post(
        "http://localhost:8080/api/conversation/",
        convuser
      );
    //   console.log(res);
      setSelect(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(tempUser);
    } else {
      let tempUser = users.map((user) =>
        user.username === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
    }
  };

  

  return (
    <div >
      {select ? (
        <div className="createConvx" >
          <div className="createConvBoxx">
            <form className="form">
              <h3>Select Users</h3>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="allSelect"
                  checked={!users.some((user) => user?.isChecked !== true)}
                  onChange={handleChange}
                />
                <label className="form-check-label ">All Select</label>
              </div>
              {users.map((user, index) => (
                <div className="form-check" key={index}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name={user.username}
                    checked={user?.isChecked || false}
                    onChange={handleChange}
                  />
                  <label className="form-check-label ">
                    {user.username}
                  </label>
                </div>
              ))}
              <input type="submit" ClassName="createButton" onClick={handleSubmit} value="Create a conv" />
              <button ClassName="deleteButton" onClick={() =>{ setSelect(false)} }>annuler</button>
            </form>
          </div>
        </div>
      ) : (
        <button className="createButton" onClick={() => setSelect(true)}>
          select
        </button>
      )}
    </div>
  );
}
