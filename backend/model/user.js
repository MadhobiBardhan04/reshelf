import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firebaseUid: {
      type: String,
      unique: true,
      sparse: true,
    },

    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    displayName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    password: {
      type: String,
    },

    photoURL: {
      type: String,
    },

    provider: {
      type: String,
      enum: ["email", "phone", "google", "apple"],
      default: "email",
    },
  },
  {
    timestamps: true,
  },
);

const User = model("User", userSchema);

export default User;
