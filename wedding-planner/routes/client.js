require("dotenv").config();
const express = require("express");
const Client = require("../models/Client");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

//Middleware for auth
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // store { id, email, role } here
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

//Get all Clients (Protected)
router.get("/", auth, async (req, res) => {
  try {
    const clients = await Client.findAll({
      attributes: { exclude: ["password"] }, // never expose password
    });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch clients", details: err.message });
  }
});

//Get client by name (Public for now)
router.get("/:name",auth, async (req, res) => {
  try {
    const client = await Client.findOne({
      where: { name:{ [Op.like] : `${req.params.name}%` }},
      attributes: { exclude: ["password"] },
    });

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.json(client);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

//Register (Signup)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    // Check if already exists
    const existing = await Client.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create client
    const client = await Client.create({
      name,
      email,
      password: hashedPassword,
    });

    // Exclude password from response
    const { password: _, ...clientData } = client.toJSON();

    res.status(201).json({ message: "Client registered successfully", client: clientData });
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

    // Find client
    const client = await Client.findOne({ where: { email } });
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Create JWT token (include role for future role-based auth)
    const token = jwt.sign(
      { id: client.id, email: client.email, role: "client" },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
