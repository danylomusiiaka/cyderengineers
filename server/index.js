const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require("http");
const mongoose = require("./config/mongodb");
const { setupWebSocketServer } = require("./config/websocket");

const app = express();
const server = http.createServer(app);

// Initialize WebSocket server
setupWebSocketServer(server);

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const userRoutes = require("./routes/userMethods");
const testRoutes = require("./routes/testMethods");

app.use("/users", userRoutes);
app.use("/tests", testRoutes);

// Server
server.listen(3001, () => {
  console.log("Server is listening on port 3001");
});
