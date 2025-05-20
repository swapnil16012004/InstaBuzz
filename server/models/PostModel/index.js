const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../UserModel");

const postSchema = new Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: [
    {
      likeAuthor: {
        type: String,
      },
      authorImg: {
        type: String,
      },
    },
  ],

  comments: [
    {
      commentAuthor: {
        type: String,
      },
      comment: {
        type: String,
      },
      authorImg: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);
