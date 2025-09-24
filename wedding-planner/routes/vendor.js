require("dotenv").config();
const express = require("express");
const Vendor = require("../models/Vendor");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const JWT_SECRET = process.env.JWT_SECRET;


// Middleware (for protected routes)
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, email, role }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};


// Vendor Registration (Signup)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, category } = req.body;

    if (!name || !email || !password || !phone || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if email already exists
    const existing = await Vendor.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create vendor
    const vendor = await Vendor.create({
      name,
      email,
      password: hashedPassword,
      phone,
      category,
    });

    // Exclude password from response
    const { password: _, ...vendorData } = vendor.toJSON();

    res.status(201).json({ message: "Vendor registered successfully", vendor: vendorData });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find vendor
    const vendor = await Vendor.findOne({ where: { email } });
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT (include role for RBAC)
    const token = jwt.sign(
      { id: vendor.id, email: vendor.email, role: "vendor" },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// CRUD Routes

// Create vendor (Admin use, not public register)
router.post("/", auth, async (req, res) => {
  try {
    const vendor = await Vendor.create(req.body);
    res.json(vendor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all vendors (Protected)
router.get("/", auth, async (req, res) => {
  try {
    const vendors = await Vendor.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch vendors", details: err.message });
  }
});

// Get vendor by name 
router.get("/:name",auth, async (req, res) => {
  try {
    const vendor = await Vendor.findOne({
      where: { name:{ [Op.like] : `${req.params.name}%` }},
      attributes: { exclude: ["password"] },
    });

    vendor
      ? res.json(vendor)
      : res.status(404).json({ error: "Vendor not found" });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Delete vendor (Protected, only admin ideally)
router.delete("/:id", auth, async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id);
    if (!vendor) return res.status(404).json({ error: "Vendor not found" });

    await vendor.destroy();
    res.json({ message: "Vendor deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
