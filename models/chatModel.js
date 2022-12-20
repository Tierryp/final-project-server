const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");

const chatSchema = new Schema(
  {
    members: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Messages",
    },
    unreadMessages: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Chat = model("Chat", chatSchema)

module.exports = Chat