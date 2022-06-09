const mongoose = require("mongoose");
const http = require("http");
const app = require("../boot/index");
const server = http.createServer(app);
const { Server } = require("socket.io");
const db = mongoose.connection;

require("dotenv").config();

const PORT = process.env.PORT || 5000;



//dbConnection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Connected");
    // Server listen
    server.listen(PORT, () => console.log(`Server Connected on port ${PORT}`));
  })
  .catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
  });

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
  
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
  