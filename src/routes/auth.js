const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { validateSignupData } = require("../utils/validation");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res, next) => {
  try {
    // validate signup data
    validateSignupData(req);
    const { firstName, lastName, emailId, password } = req.body;
    // encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    const savedUser = await user.save();
    // create the JWT token
    const token = await savedUser.getJWT();
    // add the token to the cookie and send the response back to the user
    res.cookie("token", token);
    res.json({ message: "User added successfully", data: savedUser });
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Creds");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // create the JWT token
      const token = await user.getJWT();
      // add the token to the cookie and send the response back to the user
      res.cookie("token", token);
      res.send(user);
    } else {
      throw new Error("Invalid Creds");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful!!!");
});

module.exports = authRouter;
