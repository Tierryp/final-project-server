require("dotenv/config");
const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT;

const mongoose = require("mongoose");

app.use(express.json());

userRoutes = require("./routes/user.routes");
chatsRoutes = require("./routes/chats.route");
messagesRoute = require("./routes/messages.route");

app.use(cors());

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: process.env.FRONTEND_URI,
    methods: ["GET", "POST"],
  },
});

// This will allow us to check the connection from the client, once we are connected we will trigger the callback.

io.on("connection", (socket) => {
  // SOCKET EVENTS
  socket.on("join-room", (userId) => {
    socket.join(userId);
  });

  //FIRST EVENT

  // Sending message to client who are in the same "room" (Present in members id array.)
  socket.on("send-message", (message) => {
    socket
      .to(message.members[0])
      .to(message.members[1])
      .emit("receive-message", message);
  });
// We are sending to the first and second member in our members Id array there are only 2 in the first place anyway.
  
});

app.use("/api/users", userRoutes);
app.use("/api/chats", chatsRoutes);
app.use("/api/messages", messagesRoute);

mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    console.log("connected to db", x.connections[0].name);
  })
  .catch((err) => console.log(err));

server.listen(PORT, () => console.log(`connected to:${PORT}`));
