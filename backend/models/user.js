const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
