import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();

export const server = http.createServer(app);

export const io = new Server(server);

const __dirname = path.resolve();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);

if (process.env.environment === "production") {
  app.use(express.static(path.join(__dirname, "src", "public")));
  app.get("*", (req, res) => {
    res.send(path.join(__dirname, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json({
      msg: "The api is running well",
    });
  });
}

export default app;
