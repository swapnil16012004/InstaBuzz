const express = require("express");
const router = express.Router();
const Post = require("../../models/PostModel");

router.get("/", async (req, res) => {
  try {
    let allPosts = await Post.find({}).sort({ createdAt: -1 }).populate({
      path: "author",
      select: "username profileImg",
    });

    res.json(allPosts);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
