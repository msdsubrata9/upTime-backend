const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const serviceRouter = require("./routes/services");
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", serviceRouter);

connectDB()
  .then(() => {
    console.log("Database connection established successfully");
    // Vercel requires the app to export a request handler
    module.exports = app; // Make sure the app is exported as a module
  })
  .catch((err) => {
    console.error("Database is unable to connect!!!");
  });
