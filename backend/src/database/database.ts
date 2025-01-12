import mongoose from "mongoose";
import { config } from "../config/app.config";

const conncectDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed");
    process.exit(1);
  }
};

export default conncectDatabase;
