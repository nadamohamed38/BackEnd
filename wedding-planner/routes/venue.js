const express = require("express");
const Venue = require("../models/Venue");
const router = express.Router();

// Create Venue
router.post("/", async (req, res) => {
  try {
    const venue = await Venue.create(req.body);
    res.json(venue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Venues
router.get("/", async (req, res) => {
  const venues = await Venue.findAll();
  res.json(venues);
});

// Get Venue by name
router.get("/:name", async (req, res) => {
  try {
    const venue = await Venue.findOne({
      where: { name: req.params.name }
    });

    if (venue) {
      res.json(venue);
    } else {
      res.status(404).json({ error: "Venue not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const venue = await Venue.findByPk(id);

    if (!venue) {
      return res.status(404).json({ error: "Venue not found" });
    }

    await venue.destroy();
    res.json({ message: "Venue deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete venue" });
  }
});

module.exports = router;
