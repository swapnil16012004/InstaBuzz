const express = require("express");
const router = express.Router();
const Message = require("../../models/MessageModel");
const User = require("../../models/UserModel");

router.get("/users", async (req, res) => {
  const { currUsername } = req.query;

  try {
    const currUser = await User.findOne({ username: currUsername });

    if (!currUser) {
      return res.status(404).json({ error: "Current user not found" });
    }

    const users = await User.find({ username: { $ne: currUsername } });

    const usersWithLastMsg = await Promise.all(
      users.map(async (user) => {
        const lastMessage = await Message.findOne({
          $or: [
            { sender: currUser._id, receiver: user._id },
            { sender: user._id, receiver: currUser._id },
          ],
        })
          .sort({ createdAt: -1 })
          .limit(1);

        const unreadCount = await Message.countDocuments({
          sender: user._id,
          receiver: currUser._id,
          read: false,
        });

        return {
          _id: user._id,
          username: user.username,
          profileImg: user.profileImg,
          lastMsg: lastMessage ? lastMessage.text : null,
          lastMsgTime: lastMessage ? lastMessage.createdAt : null,
          unreadCount,
        };
      })
    );

    res.json({ users: usersWithLastMsg });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.post("/mark-as-read", async (req, res) => {
  const { senderId, receiverId } = req.body;

  if (!senderId || !receiverId) {
    return res.status(400).json({ error: "Missing sender or receiver ID" });
  }

  try {
    await Message.updateMany(
      { sender: senderId, receiver: receiverId, read: false },
      { $set: { read: true } }
    );

    res.status(200).json({ message: "Messages marked as read" });
  } catch (err) {
    console.error("Error marking messages as read:", err);
    res.status(500).json({ error: "Failed to mark as read" });
  }
});

router.get("/messages", async (req, res) => {
  const { user1, user2 } = req.query;
  try {
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender", "username")
      .populate("receiver", "username");

    res.status(200).json({ messages });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

router.get("/get-id-by-username/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }, "_id");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ _id: user._id });
  } catch (err) {
    console.error("❌ Error in /get-id-by-username:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/messages", async (req, res) => {
  try {
    const { sender, receiver, text } = req.body;

    if (!sender || !receiver || !text) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newMessage = new Message({ sender, receiver, text });
    await newMessage.save();

    res.status(201).json({ message: "Message sent", data: newMessage });
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({ error: "Failed to save message" });
  }
});

module.exports = router;
