import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

const io = new Server(server);

const __dirname = path.resolve();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  socket.on("newuser", (username) => {
    socket.broadcast.emit("update", username + " joined the conversation");
  });
  socket.on("exituser", (username) => {
    socket.broadcast.emit("update", username + " left the conversation");
  });
  socket.on("chat", (message) => {
    socket.broadcast.emit("chat", message);
  });
});
server.listen(5000, () => {
  console.log("listening on port 5000");
});
