import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

const Chat = mongoose.model("Chat", ChatSchema);

export default Chat;
