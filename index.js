import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import connectDB from "./db/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();

dotenv.config();

const server = http.createServer(app);

const io = new Server(server);

const __dirname = path.resolve();

const PORT = process.env.PORT;

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

mongoose.set("strictQuery", true);

connectDB(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
