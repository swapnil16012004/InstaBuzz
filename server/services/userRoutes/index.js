const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/UserModel");

router.post("/signup", async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
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

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", success: false });
    }
    res.status(200).json({ success: true, message: "You are logged out!" });
  });
});

module.exports = router;
