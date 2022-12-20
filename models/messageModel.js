const { model, Schema, mongo, default: mongoose } = require("mongoose");

const messageSchema = new Schema({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
}, {timestamps:true});

const Messages = model("Messages", messageSchema)

module.exports = Messages