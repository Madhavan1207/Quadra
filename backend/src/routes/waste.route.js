const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const WasteMaterial = require("../models/WasteMaterial"); // correct model import

// -----------------------
// MULTER CONFIGURATION
// -----------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// -----------------------
// GET ALL MATERIALS
// -----------------------
router.get("/", async (req, res) => {
  try {
    const materials = await WasteMaterial.find();
    res.json(materials);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch materials" });
  }
});

// -----------------------
// CREATE NEW MATERIAL
// -----------------------
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, category, quantity, location, description } = req.body;

    if (!title || !category || !quantity || !location) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const newMaterial = new WasteMaterial({
      title,
      category,
      quantity,
      location,
      description: description || "",
      image: req.file ? req.file.filename : null,
      status: "available", // default status
    });

    const savedMaterial = await newMaterial.save();

    res.status(201).json({
      message: "Material added successfully",
      data: savedMaterial,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add material" });
  }
});

module.exports = router;

