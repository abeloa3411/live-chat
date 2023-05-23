import express from "express";
import { agentLogin, agentSignup } from "../controllers/authController.js";

const router = express.Router();

router.route("/register").post(agentSignup);
router.route("/register").post(agentLogin);

export default router;
