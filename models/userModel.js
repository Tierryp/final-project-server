const { model, Schema } = require("mongoose");
const mongoose = require("mongoose")
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
//   profilePic: {
//     type: String,
//     required: true,
//   },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ], 
}, {timestamps:true});

const User = model("User", userSchema);

module.exports = { User };
