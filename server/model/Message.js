const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  studyGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StudyGroup",
    required: true,
  },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Message", MessageSchema);
