const express = require("express");
const router = express.Router();
const Request = require("../models/Request");
const WasteMaterial = require("../models/WasteMaterial");

// GET IMPACT STATS
router.get("/", async (req, res) => {
  try {
    // Fetch approved requests and populate material
    const approvedRequests = await Request.find({ status: "approved" }).populate("material");

    const totalWasteReusedKg = approvedRequests.reduce(
      (acc, req) => acc + Number(req.material.quantity || 0),
      0
    );

    const categoryImpact = {};
    approvedRequests.forEach((req) => {
      const cat = req.material.category;
      if (!categoryImpact[cat]) categoryImpact[cat] = { wasteReusedKg: 0, co2SavedKg: 0 };
      categoryImpact[cat].wasteReusedKg += Number(req.material.quantity || 0);
      categoryImpact[cat].co2SavedKg += Number(req.material.quantity || 0) * 0.5; // Example CO2 formula
    });

    res.json({
      totalWasteReusedKg,
      totalApprovedRequests: approvedRequests.length,
      activeMaterials: approvedRequests.length,
      co2SavedKg: totalWasteReusedKg * 0.5,
      categoryImpact: Object.entries(categoryImpact).map(([category, data]) => ({
        category,
        ...data,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch impact data" });
  }
});

module.exports = router;
