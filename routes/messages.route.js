const authMiddleware = require("../middlewares/authMiddleware");
const Chat = require("../models/chatModel");
const Messages = require("../models/messageModel");
const router = require("express").Router();

router.post("/new-message", async (req, res) => {
  try {
    // NEW MESSAGE CREATE
    const newMessage = new Messages(req.body);
    const savedMessage = await newMessage.save();

    //LAST MESSAGE UPDATE
    await Chat.findOneAndUpdate(
      { _id: req.body.chat },
      {
        lastMessage: savedMessage._id,
        $inc : {unreadMessages : 1},
      }
    );
    res.send({
      success: true,
      message: "Message sent!",
      data: savedMessage,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Error sending message!",
      data: error.message,
    });
  }
});

//Get all messages in chat

router.get("/get-all-messages/:chatId", async (req, res) => {
  try {
    const messages = await Messages.find({
      chat: req.params.chatId,
    }).sort({ createdAt: 1 });
    res.send({
      success: true,
      message: "Messages fetched!",
      data: messages,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Error fetching messages!",
      data: error.message,
    });
  }
});

module.exports = router;
