const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

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
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
