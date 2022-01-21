import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import "./register.css";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  let navigate = useNavigate();
  const HandleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    console.log(username);
    axios
      .post("http://localhost:8080/api/auth/register", {
        username,
        email,
        password,
      })
      .then((res) => {
        setEmail("");
        setPassword("");
        setUsername("");
        
        navigate("/login");
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="registerPage">
      <div className="registerBox">
        <div className="Container">
          <h1>Register</h1>
          <form className="formRegister" onSubmit={(e) => HandleSubmit(e)}>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              name="username"
              placeholder="username"
              value={username}
            />

            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email"
              name="email"
              value={email}
            />

            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="password"
              value={password}
            />
            <input className="button" type="submit" value="Envoyer" />
          </form>
          <span className="goLogin">you already have an account <a href="/login">Login</a></span>
        </div>
      </div>
    </div>
  );
}
