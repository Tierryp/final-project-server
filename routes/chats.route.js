const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Chat = require("../models/chatModel");

//CHAT CREATION

router.post("/create-new-chat", authMiddleware, async (req, res) => {
  try {
    const newChat = new Chat(req.body);
    const savedChat = await newChat.save();
    res.send({
      success: true,
      message: "Chat created!",
      data: savedChat,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Chat creation error!",
      data: error.message,
    });
  }
});

// CURRENT CHATS OF CURRENT USER

router.get("/get-all-chats", authMiddleware, async (req, res) => {
  try {
    const chats = await Chat.find({
      members: {
        $in: [req.body.userId],
      },
    })
    .populate("members").populate("lastMessage")
    .sort({updatedAt: -1})
    res.send({
      success: true,
      message: "Chats recieved",
      data: chats,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Error receiving chats",
      data: error.message,
    });
  }
});



module.exports =  router