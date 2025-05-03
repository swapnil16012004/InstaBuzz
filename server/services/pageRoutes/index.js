const express = require("express");
const router = express.Router();

const rawData = {
  title: "Instagram",
  description: "Social media platform for sharing photos and videos",
  features: [
    "Photo sharing",
    "Video sharing",
    "Stories",
    "Direct messaging",
    "Explore page",
    "Reels",
  ],
};

router.get("/", (req, res) => {
  try {
    res.json(rawData);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
