const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  profileImg: {
    type: String,
    default: "",
  },
  bio: { type: String, default: "" },
  gender: { type: String, default: "male" },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

userSchema.plugin(passportLocalMongoose);

userSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    { id: this._id, username: this.username },
    process.env.SECRET,
    { expiresIn: "7d" }
  );
  return token;
};

module.exports = mongoose.model("User", userSchema);
