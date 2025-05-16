const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/UserModel");
const Post = require("../../models/PostModel");
const { storage } = require("../../cloudConfig");
const multer = require("multer");
const upload = multer({ storage });

router.post("/signup", async (req, res) => {
  try {
    let { username, email, name, password, gender } = req.body;
    const newUser = new User({ email, username, name, gender });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return res.status(500).json({ message: "Login failed", error: err });
      }
      res.status(201).json({
        message: `Dear ${username}, welcome to InstaBuzz!`,
        user: registeredUser,
      });
    });
  } catch (e) {
    res.status(400).json({ message: "Signup failed", error: e.message });
  }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  if (!req.user) {
    return res
      .status(400)
      .json({ success: false, message: "Authentication failed" });
  }
  const { username } = req.body;
  res.status(200).json({
    message: `Welcome back to Instabuzz, ${username}!`,
    success: true,
    user: req.user,
  });
});

router.put("/:user/edit", async (req, res) => {
  try {
    let { username, name, gender, bio } = req.body;
    console.log("Incoming data:", req.body);
    console.log("Incoming username:", username);
    const user = await User.findOneAndUpdate(
      { username },
      { name, gender, bio },
      { new: true, runValidators: true }
    );
    console.log("User successfully updated:", user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      message: "Profile updated successfully!",
      user,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", success: false });
    }
    res.status(200).json({ success: true, message: "You are logged out!" });
  });
});

router.put("/:user/upload", upload.single("profileImg"), async (req, res) => {
  const username = req.params.user;
  if (!req.file) {
    return res.status(400).json({ error: "Image upload failed" });
  }

  const imageUrl = req.file.path;
  try {
    let user = await User.findOne({ username });
    user.profileImg = imageUrl;
    await user.save();
    console.log("User profile image updated:", user);
    res
      .status(200)
      .json({ message: "Profile image uploaded successfully", user });
  } catch (err) {
    console.error("Error in image upload:", err);
    return res.status(500).json({ error: "Image upload failed" });
  }
});

router.get("/:user/getposts", async (req, res) => {
  const username = req.params.user;
  try {
    const user = await User.findOne({ username }).populate({
      path: "posts",
      populate: {
        path: "author",
        select: "username profileImg",
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const posts = user.posts;
    const postCount = posts.length;
    if (postCount === 0) {
      return res.status(200).json({ posts: [], postCount: 0 });
    }

    res.status(200).json({ posts, postCount });
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/:username/create", upload.single("postImg"), async (req, res) => {
  const { username } = req.params;
  const { caption } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("File path:", req.file.path);

    if (!req.file) {
      console.error("File not uploaded");
      return res.status(400).json({ error: "File not uploaded" });
    }

    const newPost = new Post({
      imageUrl: req.file.path,
      caption,
      author: user._id,
    });

    await newPost.save();
    user.posts.push(newPost._id);
    await user.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
    console.log("Post created successfully:", newPost);
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
