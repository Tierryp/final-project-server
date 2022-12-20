require("dotenv/config")
const express = require("express")
const app = express()
const cors = require("cors");

const PORT = process.env.PORT

const mongoose = require("mongoose");

app.use(express.json());

userRoutes = require("./routes/user.routes")
chatsRoutes = require("./routes/chats.route")
messagesRoute = require("./routes/messages.route")

app.use(cors());


app.use("/api/users", userRoutes)
app.use("/api/chats", chatsRoutes)
app.use("/api/messages", messagesRoute)


mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    console.log("connected to db", x.connections[0].name);
  })
  .catch((err) => console.log(err));


app.listen(PORT, () => console.log(`connected to:${PORT}`))