import Agent from "../models/authModel";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "2d" });
};

export const agentLogin = async (req, res) => {
  const { name, password } = req.body;
  try {
    //login the user to the db
    const user = await Agent.login(name, password);

    //create the token
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const agentSignup = async (req, res) => {
  const { name, birth, pin } = req.body;

  try {
    //sign up the user
    const user = await Agent.signup(name, password);

    //create the token
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
