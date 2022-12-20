const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Chat = require("../models/chatModel");
const Messages = require("../models/messageModel");

//CHAT CREATION

router.post("/create-new-chat", authMiddleware, async (req, res) => {
  try {
    const newChat = new Chat(req.body);
    const savedChat = await newChat.save();
   
  (await savedChat.populate("members"))
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


// CLEAR UNREAD MESSAGES 
router.post("/clear-unread-messages", authMiddleware, async (req,res) => {
  try {

    // FIND  CHAT  UPDATE MESSAGE INCREMENT
    const chat = await Chat.findById(req.body.chat)
    if(!chat){
      return res.send({
        success:false,
        message: "Chat not found",
      })
    }
      const updatedChat = await Chat.findByIdAndUpdate(
        req.body.chat,
        {
          unreadMessages: 0,
        },
        {new: true}
      ).populate("members").populate("lastMessage")
    // FIND UNREAD MESSAGES OF CHAT AND UPDATE TO READ
await Messages.updateMany(
  {
    chat:req.body.chat,
    read: false,
  },
  {
    read: true,
  }
)
      res.send({
        success:true,
        message: "Unread messages cleared successfully",
        data: updatedChat,
      })
  } catch (error) {
    res.send({
      success: false,
      message: "Error clearing unread messages",
      error: error.message,
    }) 
  }
})



module.exports =  router