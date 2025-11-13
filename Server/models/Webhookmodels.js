import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    img: { type: String },
    savedPosts: { type: [String], default: [] },
    role: { type: String, enum: ["user", "admin"], required: true },
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError
export default mongoose.models.Users || mongoose.model("Users", userSchema);
