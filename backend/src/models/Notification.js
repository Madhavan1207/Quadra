const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // recipient
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  link: { type: String }, // optional, link to click to view
}, { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema);
