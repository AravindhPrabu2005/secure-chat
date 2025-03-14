const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
  
    socket.on("sendMessage", (message) => {
      console.log("Message received:", message);
      socket.broadcast.emit("receiveMessage", message);
    });
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
app.use(express.json());
app.use(cors());

connectDB().then(() => {
    app.use("/api", authRoutes);
    app.use("/api", userRoutes);
    const port = 5000;
    server.listen(port, () => console.log(`Server running on port ${port}`));
}).catch((err) => {
    console.log("Error while connecting DB:", err.message);
});
