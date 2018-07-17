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
let interval;
io.on("connection", socket => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


feed.start((stocks)=>{
  //console.log("before emit");
  //console.log(stocks);
  io.emit('stock', stocks);
});

if(server.listen(port)){console.log('server listing port '+port)};
