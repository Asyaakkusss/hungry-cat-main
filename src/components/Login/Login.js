import React, { useState } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import { loginUser } from '../api.js'; 
import Button from '@mui/material/Button';


export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const approvedUsers = ["noah", "asya", "maisoon", "hart", "caio"]; 
  const approvedPWDs = ["noahisawesome", 
                        "asyaisawesome", 
                        "maisoonisawesome", 
                        "hartisawesome", 
                        "caioisawesome"]

  const handleSubmit = async e => {
    e.preventDefault();

    //returns -1 if the user is not found 
    const userIndex = approvedUsers.indexOf(username);

    if (userIndex !== -1 && approvedPWDs[userIndex] === password) {
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }
  else {
    alert("you are not an approved user. fuck off!")
  }
  }

  return(
    
    <div className="login-wrapper">
      <div className="top-bar">
      <div style={{ marginLeft: 'left' }} className="guest-option">
        <Button style={{ marginLeft: 'left' }}>Continue as Guest</Button>
      </div>
      </div>
      <div className="login-header">
      <h1>Please Log In</h1>
      </div>
     
    <form onSubmit={handleSubmit}>
      <label>
        <p>Username</p>
        <input type="text" onChange={e => setUserName(e.target.value)}/>
      </label>
      <label>
        <p>Password</p>
        <input type="password" onChange={e => setPassword(e.target.value)}/>
      </label>
      <div className = "submit-button">
        <Button type="submit">Submit</Button>
      </div>
    </form>
    </div>
  )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }; 