import React, {  useState , useContext} from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";

import './login.css'
import {useNavigate} from 'react-router-dom';

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);


const HandleSubmit = (e) => {
  e.preventDefault();
  console.log(email);
  console.log(password);
  loginCall(
    { email: email, password: password },
    dispatch
  );
 
  
  };

 

    return (
        <div className="loginPage">
      <div className="loginBox">
        <div className="Container">
            <h1>Login</h1>
        <form className="formLogin" onSubmit={(e) => HandleSubmit(e)}>
      
  
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email"
            name="email"
            value={email}/>
  
          <input
          onChange={(e) => setPassword(e.target.value)}
           type="password" name="password" placeholder="password" 
           value={password}/>
          <input className="button" type="submit" value="Envoyer" />
        </form>
        <span className="goRegister">you don't have an account <a href="/Register">Register</a></span>
        </div>
        </div>
      </div>
    )
}
