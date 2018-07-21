import openSocket from "socket.io-client";
var socket = openSocket("http://localhost:4001");

export function onValueChange(callback) {
  socket.on("stock", callback);
}

export function watch(symbols) {
  socket.emit("join", symbols);
}

export function unwatch(symbol) {
  console.log(symbol);
  socket.emit("leave", symbol);
}
