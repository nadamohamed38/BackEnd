const express = require("express");
const CommunityPost = require("../models/CommunityPost");
const Vendor = require("../models/Vendor"); 
const router = express.Router();

// Create CommunityPost
router.post("/", async (req, res) => {
  try {
    const post = await CommunityPost.create(req.body);
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all CommunityPosts
router.get("/", async (req, res) => {
  try {
    const posts = await CommunityPost.findAll();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get posts by vendor's name
router.get("/vendor/:name", async (req, res) => {
  try {
    const vendor = await Vendor.findOne({
      where: { name: req.params.name }
    });

    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    const posts = await CommunityPost.findAll({
      where: { vendor_id: vendor.id }
    });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
