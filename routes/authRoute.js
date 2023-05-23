import express from "express";
import { registerAgent } from "../controllers/authController";

const router = express.Router();

router.route("/register").post(registerAgent);

export default router;
