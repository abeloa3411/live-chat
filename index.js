import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import connectDB from "./db/db";
import cors from "cors";
import authRotes from "./routes/authRoute.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server);

const __dirname = path.resolve();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);

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
  connectDB(process.env.MONGO_URI);
  console.log("listening on port 5000");
});
