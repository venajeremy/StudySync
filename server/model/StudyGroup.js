const mongoose = require("mongoose");

const StudyGroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  course: { type: String, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  coModerators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  location: { type: String, required: true },
  time: { type: Date, required: true },
  maxMembers: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

module.exports = mongoose.model("StudyGroup", StudyGroupSchema);
