const express = require("express");
const Booking = require("../models/Booking");
const Vendor = require("../models/Vendor"); 
const Venue = require("../models/Venue");
const router = express.Router();

// Create Booking
router.post("/", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Bookings
router.get("/", async (req, res) => {
  const bookings = await Booking.findAll();
  res.json(bookings);
});


router.get("/:status", async(req,res)=>{
  try {
    const Bookings = await Booking.findOne({
      where:{status:req.params.status}
    });
    if(Bookings){
      res.json(Bookings)

    }else{
       res.status(404).json({ error: "not found" });
    }
  } catch (error) {
    
  }
})

// Get bookings by vendor's name
router.get("/vendor/:name", async (req, res) => {
  try {
    const vendor = await Vendor.findOne({
      where: { name: req.params.name }
    });

    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    const booking = await Booking.findAll({
      where: { vendor_id: vendor.id }
    });

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Get bookings by venue's name
router.get("/Venue/:name", async (req, res) => {
  try {
    const venue = await Venue.findOne({
      where: { name: req.params.name }
    });

    if (!venue) {
      return res.status(404).json({ error: "venue not found" });
    }

    const booking = await Booking.findAll({
      where: { venue_id: venue.id }
    });

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Get bookings by event's name
router.get("/Event/:name", async (req, res) => {
  try {
    const event = await Event.findOne({
      where: { name: req.params.name }
    });

    if (!event) {
      return res.status(404).json({ error: "event not found" });
    }

    const booking = await Booking.findAll({
      where: { event_id: event.id }
    });

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
