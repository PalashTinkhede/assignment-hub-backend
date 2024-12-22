import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },// username
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
