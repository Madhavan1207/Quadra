const express = require("express");
const router = express.Router();

const Request = require("../models/Request");
const WasteMaterial = require("../models/WasteMaterial");
const Notification = require("../models/Notification");
const User = require("../models/User");

// --------------------
// TEST ROUTE
// --------------------
router.get("/", (req, res) => {
  res.json({ message: "Request route working" });
});

// --------------------
// CREATE REQUEST
// --------------------
router.post("/", async (req, res) => {
  try {
    const { materialId, requestedBy } = req.body;

    if (!materialId || !requestedBy) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Create request
    const request = await Request.create({
      material: materialId,
      requestedBy,
    });

    // Notify the owner of the material
    const material = await WasteMaterial.findById(materialId).populate("postedBy");
    if (material && material.postedBy) {
      await Notification.create({
        user: material.postedBy._id, // owner of material
        message: `New request for your material "${material.title}"`,
        link: "/dashboard", // optional link
        isRead: false,
      });
    }

    res.status(201).json({
      message: "Request created successfully",
      data: request,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Request creation failed" });
  }
});

// --------------------
// APPROVE REQUEST
// --------------------
router.patch("/:id/approve", async (req, res) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate("material requestedBy");

    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = "approved";
    await request.save();

    // Update material status
    const material = await WasteMaterial.findById(request.material._id);
    material.status = "allocated";
    await material.save();

    // Notify the requester
    await Notification.create({
      user: request.requestedBy._id,
      message: `Your request for "${material.title}" has been approved`,
      link: "/dashboard",
      isRead: false,
    });

    res.json({ message: "Request approved and material allocated", data: request });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Approval failed" });
  }
});

// --------------------
// REJECT REQUEST
// --------------------
router.patch("/:id/reject", async (req, res) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate("material requestedBy");

    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = "rejected";
    await request.save();

    // Notify the requester
    await Notification.create({
      user: request.requestedBy._id,
      message: `Your request for "${request.material.title}" has been rejected`,
      link: "/dashboard",
      isRead: false,
    });

    res.json({ message: "Request rejected", data: request });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Rejection failed" });
  }
});

module.exports = router;
