const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const serviceRouter = require("./routes/services");
const cors = require("cors");

app.use(
  cors({
    origin: "http://uptime-web-olive.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-CSRF-Token",
      "X-Requested-With",
      "Accept",
      "Accept-Version",
    ],
  })
);

app.options("*", (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://uptime-web-olive.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-CSRF-Token"
  );
  res.sendStatus(200);
});

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
    app.listen(7777, () => {
      console.log("Serever is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database is unable to connect!!!");
  });

module.exports = app;
