import React, { useState } from "react";
import "./Join.css";
import { Link } from "react-router-dom";
import Logo from "./W_Chat (1).png";
let user;
const sendUser = () =>{
    user = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value="";

}
const Join = () => {
const[name,setName]=useState("");
  return (
    <div className="joinPage">
      <div className="joinContainer">
        <img src={Logo} id="logo"/>
        <h1>Chat App</h1>
        <input  onChange={(e)=> setName (e.target.value)} type="text" placeholder="Enter Your Name" id="joinInput"/>
    <Link onClick={(e) =>!name?e.preventDefault():null} to="/chat">   <button onClick={sendUser} className="Joinbutton">Login</button> </Link> 
      </div>
    </div>
  );
};

export default Join;
export{user};
