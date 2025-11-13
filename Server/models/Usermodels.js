import mongoose from "mongoose";
import { Schema } from "mongoose";

const userchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
    },
    savedPosts: {
      type: [String],
      default: [],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Users", userchema);