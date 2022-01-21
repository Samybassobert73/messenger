import React from "react";
import "./user.css";
export default function User({ select }) {
  return (
    <div className="user">
      <h2>user</h2>
      {select ? <input type="checkbox" /> : null}
    </div>
  );
}
