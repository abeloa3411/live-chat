import mongoose from "mongoose";

const connectDB = (connectionString) => {
  return mongoose.connect(connectionString);
};

export default connectDB;
