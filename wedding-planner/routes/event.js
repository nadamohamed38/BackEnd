const express = require("express");
const Event = require("../models/Event");
const router = express.Router();

// Create Event
router.post("/", async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Events
router.get("/", async (req, res) => {
  const events = await Event.findAll();
  res.json(events);
});

// Get Event by date
router.get("/date/:date", async (req, res) => {
  try {
    const event = await Event.findOne({
      where: { date: req.params.date }
    });

    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: "Event not found on this date" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});


module.exports = router;
