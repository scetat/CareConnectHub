const express = require("express");
const HomeContent = require("../models/HomeContent");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const homeContent = await HomeContent.findOne();
    if (!homeContent) {
      return res.status(404).json({ message: "Home content not found" });
    }
    res.json(homeContent);
  } catch (error) {
    console.error("Error fetching home content:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
