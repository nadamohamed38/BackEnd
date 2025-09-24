const express = require("express");
const Review = require("../models/Review");
const Vendor = require("../models/Vendor");
const Venue = require("../models/Venue");
const Client = require("../models/Client");
const router = express.Router();

// Create Review
router.post("/", async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Reviews
router.get("/", async (req, res) => {
  const reviews = await Review.findAll();
  res.json(reviews);
});

// Get Review by ID
router.get("/:id", async (req, res) => {
  const review = await Review.findByPk(req.params.id);
  review ? res.json(review) : res.status(404).json({ error: "Review not found" });
});

// Get vendor's name
router.get("/vendor/:name", async (req, res) => {
  try {
    const vendor = await Vendor.findOne({
      where: { name: req.params.name }
    });

    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    const review = await Review.findAll({
      where: { vendor_id: vendor.id }
    });

    res.json(review);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Get  venue's name
router.get("/Venue/:name", async (req, res) => {
  try {
    const venue = await Venue.findOne({
      where: { name: req.params.name }
    });

    if (!venue) {
      return res.status(404).json({ error: "venue not found" });
    }

    const review = await Review.findAll({
      where: { venue_id: venue.id }
    });

    res.json(review);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

router.get("/Client/:name", async (req, res) => {
  try {
    const client = await Client.findOne({
      where: { name: req.params.name }
    });

    if (!client) {
      return res.status(404).json({ error: "client not found" });
    }

    const review = await Review.findAll({
      where: { client_id: client.id }
    });

    res.json(review);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Delete Review by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Review.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});


module.exports = router;
