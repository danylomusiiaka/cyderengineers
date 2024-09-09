const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require("http");
const mongoose = require("./config/mongodb");
const { setupWebSocketServer } = require("./config/websocket");
require("dotenv").config({ path: "../.env" });

const app = express();
const server = http.createServer(app);
const web_url = process.env.WEB_URL || "http://localhost:5173";

setupWebSocketServer(server);

// Middleware
app.use(
  cors({
    origin: web_url,
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require("./routes/userMethods");
const testRoutes = require("./routes/testMethods");
//const devRoutes = require("./routes/devMethods");

app.use("/users", userRoutes);
app.use("/tests", testRoutes);
//app.use("/", devRoutes);

server.listen(3001, () => {
  console.log("Server is listening on port 3001");
});
