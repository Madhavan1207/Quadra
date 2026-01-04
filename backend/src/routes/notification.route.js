const express = require("express");
const router = express.Router();

const Request = require("../models/Request");
const WasteMaterial = require("../models/WasteMaterial");
const User = require("../models/User");

// GET notifications for a user
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // 1️⃣ Notifications: requests for your posted materials
    const myMaterials = await WasteMaterial.find({ postedBy: userId });
    const materialIds = myMaterials.map((m) => m._id);

    const requests = await Request.find({ material: { $in: materialIds } })
      .populate("material")
      .populate("requestedBy")
      .sort({ createdAt: -1 });

    const notifications = requests.map((req) => {
      let message = "";
      if (req.status === "pending") {
        message = `${req.requestedBy.name} requested your material "${req.material.title}"`;
      } else if (req.status === "approved") {
        message = `Your request for "${req.material.title}" was approved`;
      } else if (req.status === "rejected") {
        message = `Your request for "${req.material.title}" was rejected`;
      }

      return {
        id: req._id,
        message,
        read: false, // you can later implement marking as read
        createdAt: req.createdAt,
      };
    });

    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
});

module.exports = router;
