const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const serviceRouter = require("./routes/services");
const cors = require("cors");

app.use(
  cors({
    origin: "https://uptime-web-seven.vercel.app",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", serviceRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the uptime-backend API");
});

connectDB()
  .then(() => {
    console.log("Database connection established successfully");
  })
  .catch((err) => {
    console.error("Database is unable to connect!!!");
  });

module.exports = app;
