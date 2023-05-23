import mongoose from "mongoose";
import bcrypt from "bcrypt";

const AgentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

AgentSchema.statics.signup = async function (name, password) {
  if (!name || !password) {
    throw Error("Please fill in all fields");
  }

  const exists = await this.findOne({ name: name });

  if (exists) {
    throw Error("user already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const newAgent = await this.create({
    name,
    password: hash,
  });

  return newAgent;
};

AgentSchema.statics.login = async function (name, password) {
  if (!password || !name) {
    throw Error("Please fill in all fields");
  }

  const exists = await this.findOne({ name: name });

  if (!exists) {
    throw Error("Name not found");
  }

  const match = await bcrypt.compare(password, exists.password);

  if (!match) {
    throw Error("Incorect pin");
  }

  return exists;
};

const Agent = mongoose.model("Agent", AgentSchema);

export default Agent;
