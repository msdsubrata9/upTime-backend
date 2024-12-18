const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const serviceRouter = require("./routes/services");
const cors = require("cors");

const corsOptions = {
  origin: "https://uptime-web-45ccd.web.app/", // The correct frontend URL
  credentials: true, // Allow cookies to be sent
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

// Apply CORS middleware globally before defining routes
app.use(cors(corsOptions));

// Ensure that your backend can handle OPTIONS preflight requests
app.options("*", cors(corsOptions));

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
