import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
});

const Chat = mongoose.model("Chat", ChatSchema);

export default Chat;
