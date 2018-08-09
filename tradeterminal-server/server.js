const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const feed = require("./create-feeds");
//adding cors to allow crossorigin requests
var cors = require("cors");

const port = process.env.port || 4001;
const index = require("./index");
const app = express();
app.use(index);
app.use(cors());

const server = http.createServer(app);

const io = socketIo(server);


io.on("connection", socket => {
  console.log("New client connected " + socket.id);

  socket.on("join", function(rooms) {
    console.log("Socket %s subscribed to %s", socket.id, rooms);
    if (Array.isArray(rooms)) {
      //console.log("rooms :" + rooms);
      rooms.forEach(function(roomId) {
        socket.join(roomId);
      });
    } else {
      socket.join(roomId);
    }

    socket.on("leave", ( room) => {
      console.log("on leave called");   
      socket.leave(room);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
});

feed.start(
  function(room, type, message) {
    io.in(room).clients((err, clients) => {
     // console.log(room+" "+clients); // an array containing socket ids in 'room3'
    });
    io.to(room).emit(type, message);
  }
  //stocks => {
  //console.log("before emit");
  //console.log(stocks);
  // io.emit("stock", stocks);
);

if (server.listen(port)) {
  console.log("server listing port " + port);
}
