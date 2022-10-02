import React, { useEffect, useState } from 'react'
import {user} from "../Join/Join";
import socketIo from "socket.io-client";
import Logo from "./W_Chat (2).png";
import "./chat.css";
import { AiOutlineSend,AiOutlineLogout } from 'react-icons/ai';
import Message from "../Message/message";
import ReactScrollToBottom from "react-scroll-to-bottom"
let socket;

const ENDPOINT="https://we-chat-appp.herokuapp.com/";

const Chat = () => {
 const[id,setId]=useState("");
 const[messages, setMessage]=useState([])
  const send = () =>{
    const message=document.getElementById('chatInput').value;
    socket.emit('message',{message,id});
    document.getElementById('chatInput').value="";
  }
  useEffect(() => {

    socket = socketIo(ENDPOINT, { transports: ['websocket'] });

    socket.on('connect', () => {
        alert('Connected');
        setId(socket.id);
        

    })
    console.log(socket);
    socket.emit('joined', { user })

    socket.on('welcome', (data) => {
      setMessage([...messages,data])
        console.log(data.user, data.message);
    })

    socket.on('userJoined', (data) => {
      setMessage([...messages,data])
        console.log(data.user, data.message);
    })

    socket.on('leave', (data) => {
      setMessage([...messages,data])
        console.log(data.user, data.message)
    })

    return () => {
        socket.emit('disconnectt');
        socket.off();
    }
}, [])

useEffect(()=>{
socket.on('sendMessage',(data)=>{
  setMessage([...messages,data])
console.log(data.message, data.user, data.id);
})
return () =>{
socket.off()
}
},[messages])

  return (
    <div className='chatPage'>
      <div className='chatContainer'>

      <div className='header'>
<img src={Logo} className="logoHeader"/>
<a href="/"><AiOutlineLogout className="logOut"style={{marginRight:'10% !important', cursor:'pointer', color:"#fff"}}/></a>
      </div>
      <ReactScrollToBottom className='chatBox '>
       {messages.map((item,i)=><Message  message={item.message} classs={item.id===id?'right':'left'} user={item.id===id?'':item.user}/>)}

      </ReactScrollToBottom>
      <div className='inputBox'>
<input type="text" onKeyPress={(e) => e.key==="Enter" && messages!=null ?send():""}  placeholder='Enter Message' id='chatInput' />
<button onClick={send} className='sendBtn'>
  <AiOutlineSend id="sendBtnLogo"/>
</button>
      </div>


      </div>
     
    </div>
  )
}

export default Chat
