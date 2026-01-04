const express = require("express");
const cors = require("cors");
const path = require("path");

// Import routes
const testRoutes = require("./routes/test.route");
const wasteRoutes = require("./routes/waste.route");
const requestRoutes = require("./routes/request.route");
const userRoutes = require("./routes/user.route");
const impactRoutes = require("./routes/impact.route");
const notificationRoutes = require("./routes/notification.route"); // ✅ Notifications

const app = express();

// --------------------
// MIDDLEWARES
// --------------------
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// --------------------
// ROUTES
// --------------------
app.use("/api/test", testRoutes);
app.use("/api/users", userRoutes);        // User APIs
app.use("/api/waste", wasteRoutes);       // Waste APIs
app.use("/api/request", requestRoutes);   // Request APIs
app.use("/api/impact", impactRoutes);     // Impact APIs
app.use("/api/notifications", notificationRoutes); // Notifications

// --------------------
// ROOT ROUTE
// --------------------
app.get("/", (req, res) => {
  res.send("UpCycle Connect Backend Running");
});

module.exports = app;

