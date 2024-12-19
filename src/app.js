const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const serviceRouter = require("./routes/services");
const cors = require("cors");

app.use(
  cors({
    origin: "https://uptime-web-olive.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", serviceRouter);

app.use("/", (req, res) => {
  res.send("NAMASTE!!!! WELCOME TO UPTIME SERVER");
});

connectDB()
  .then(() => {
    console.log("Database connection established successfully");
  })
  .catch((err) => {
    console.error("Database is unable to connect!!!");
  });

module.exports = app;
