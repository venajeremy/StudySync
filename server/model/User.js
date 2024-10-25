const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /@sjsu\.edu$/,
  },
  password: { type: String, required: true },
  isEmailVerified: { type: Boolean, default: false },
  resetPasswordToken: String,
  createdAt: { type: Date, default: Date.now },
  courses: [{ type: String }],
  location: [{ type: String }],
  time: [{ type: Date }],
  studyGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: "StudyGroup" }],
  preferences: {
    notifications: { type: Boolean, default: true },
    receiveEmails: { type: Boolean, default: true },
  },
});

module.exports = mongoose.model("User", UserSchema);
