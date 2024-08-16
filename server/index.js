const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("./config/mongodb"); 

const app = express();

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

app.use(
  session({
    key: "userID",
    secret: "123456",
    resave: false,
    saveUninitialized: false,
  })
);

// Маршрути
const userRoutes = require("./routes/userMethods");
const testRoutes = require("./routes/testMethods");

app.use("/users", userRoutes);
app.use("/tests", testRoutes);

// Слухаємо порт
app.listen(3001, () => {
  console.log("connected to port 3001");
});
