import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import connectDB from "./db/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { fomartMessage } from "./utils/conversation.js";
import {
  getCurrentUser,
  getRoomUser,
  userJoin,
  userLeaves,
} from "./utils/users.js";
import Chat from "./models/chatModel.js";
import moment from "moment";

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

connectDB(process.env.MONGO_URI)
  .then(() => {
    io.on("connection", (socket) => {
      //connect to the chat
      socket.on("connectAgent", ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        socket.emit(
          "message",
          fomartMessage(
            "Agent",
            " Hello, welcome to Super Awesome Co. How may I help you?"
          )
        );

        socket.broadcast
          .to(user.room)
          .emit("message", fomartMessage("Agent", ` ${user.username} joined`));

        //get chats from database
        let chat = async function getChats() {
          const chats = await Chat.find();

          return chats;
        };

        chat()
          .then((chat) => {
            const filtered = chat.filter((item) => item.room === user.room);

            io.to(user.room).emit("oldMessage", filtered);
          })
          .catch((err) => console.log(err));

        //send users info
        io.to(user.room).emit("roomUsers", {
          room: user.room,
          user: getRoomUser(user.room),
        });
      });

      //user chats
      socket.on("conversation", (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit("message", fomartMessage(user.username, msg));

        const newChat = new Chat({
          name: user.username,
          content: msg,
          room: user.room,
          time: moment().format("h:mm a"),
        });

        newChat.save();
      });

      //user disconects from the chat
      socket.on("disconnect", () => {
        const user = userLeaves(socket.id);
        if (user) {
          io.to(user.room).emit(
            "message",
            fomartMessage("Agent", `${user.username} left`)
          );

          io.to(user.room).emit("roomUsers", {
            room: user.room,
            user: getRoomUser(user.room),
          });
        }
      });
    });

    mongoose.set("strictQuery", true);

    server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.log(err));

//when sockets are running can you perfom asyncronous requests
