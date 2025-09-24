require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const Vendor = require("../models/Vendor");
const Client = require("../models/Client");
const Venue = require("../models/Venue");
const Review = require("../models/Review");
const CommunityPost = require("../models/CommunityPost");
const Booking = require("../models/Booking");
const Event = require("../models/Event");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to protect routes
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// ================= ADMIN AUTH =================

// Get all Admins (protected)
router.get("/", auth, async (req, res) => {
  try {
    const admins = await Admin.findAll({ attributes: { exclude: ["password"] } });
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin registration (public)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    res.json({ message: "Admin registered successfully", admin });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin login (public)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Get logged-in admin info (protected)
router.get("/me", auth, async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.admin.id, {
      attributes: { exclude: ["password"] },
    });
    if (!admin) return res.status(404).json({ error: "Admin not found" });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= ADMIN DELETE ACTIONS =================

router.delete("/vendor/:id", auth, async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(403).json({ error: "Access denied" });
    }

    const vendor = await Vendor.findByPk(req.params.id);
    if (!vendor) return res.status(404).json({ error: "Vendor not found" });

    await CommunityPost.destroy({ where: { vendor_id: vendor.id } });
    await Booking.destroy({ where: { vendor_id: vendor.id } });
    await Review.destroy({ where: { vendor_id: vendor.id } });
    await vendor.destroy();

    res.json({ message: "Vendor deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Delete Client
router.delete("/client/:id", auth, async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) return res.status(404).json({ error: "Client not found" });
    await Review.destroy({ where: { client_id: client.id } });
    await Event.destroy({ where: { client_id: client.id } });
    await client.destroy();
    res.json({ message: "Client deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Venue
router.delete("/venue/:id", auth, async (req, res) => {
  try {
    const venue = await Venue.findByPk(req.params.id);
    if (!venue) return res.status(404).json({ error: "Venue not found" });
    await Booking.destroy({ where: { venue_id: venue.id } });
    await Review.destroy({ where: { venue_id: venue.id } });
    await venue.destroy();
    res.json({ message: "Venue deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Review
router.delete("/review/:id", auth, async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ error: "Review not found" });
    await review.destroy();
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Community Post
router.delete("/post/:id", auth, async (req, res) => {
  try {
    const post = await CommunityPost.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    await post.destroy();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
