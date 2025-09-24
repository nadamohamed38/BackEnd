const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
require("dotenv").config(); // Load .env variables

// Import routes
const bookingRoutes = require("./routes/booking");
const clientsRoutes = require("./routes/client");
const eventRoutes = require("./routes/event");
const reviewRoutes = require("./routes/review");
const vendorRoutes = require("./routes/vendor");
const venueRoutes = require("./routes/venue");
const adminRoutes = require("./routes/admin");
const postRoutes = require("./routes/communityPost");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/booking", bookingRoutes);
app.use("/client", clientsRoutes);
app.use("/event", eventRoutes);
app.use("/review", reviewRoutes);
app.use("/vendor", vendorRoutes);
app.use("/venue", venueRoutes);
app.use("/admin", adminRoutes);
app.use("/communityPost", postRoutes);

// Health check
app.get("/", (req, res) => res.send("Wedding Planner API is running"));

// Sync database safely
(async () => {
  try {
    const isDev = process.env.NODE_ENV !== "production";

    await sequelize.sync({
      force: false, // Never drop tables automatically
      alter: false,  // Apply only necessary changes to schema
    });

    console.log("Database synced successfully");

    app.listen(3000, () =>
      console.log("Server running on http://localhost:3000")
    );
  } catch (err) {
    console.error("Failed to sync database:", err.message);
  }
})();
