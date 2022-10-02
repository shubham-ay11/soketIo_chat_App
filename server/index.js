const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const socketIo = require("socket.io");
const { message } = require("statuses");
const port= process.env.PORT;
const users=[{}];
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('joined',({user})=>{
      users[socket.id]=user;
      //Send to all expect who has joined
      socket.broadcast.emit('userJoined',{user:"Admin",message:`${users[socket.id]} has Joined`})
      socket.emit('welcome',{user:"Admin", message:`Welcome to the chat ${users[socket.id]}`});


    });
    app.get("/",(req,res)=>{
      res.send("Hello");
    })
    socket.on('disconnectt',()=>{
      socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]}  has left`});
    console.log(`user left`);
})

socket.on('message',({message,id})=>{
  io.emit('sendMessage',{user:users[id],message,id});
  console.log(message)
})
    
  });
server.listen(port, () => {
    console.log("working");
  });