const mongoose = require("mongoose");

const wasteMaterialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    category: {
      type: String,
      required: true,
    },

    quantity: {
      type: String,
    },

    location: {
      type: String,
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["available", "requested", "allocated"],
      default: "available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WasteMaterial", wasteMaterialSchema);
