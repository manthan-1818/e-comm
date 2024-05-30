const mongoose = require("mongoose");

const tempUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    },
    password: { type: String, required: true },
    role: { type: String, required: true },
    verificationToken: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: "5m" },
  },
  { timestamps: true }
);

 const tempUserModel= mongoose.model("TempUser", tempUserSchema);

 module.exports = tempUserModel;