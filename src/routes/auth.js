const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { validateSignupData } = require("../utils/validation");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res, next) => {
  try {
    // Validate signup data
    validateSignupData(req);
    const { firstName, lastName, emailId, password } = req.body;

    // Extract domain from email and convert to lowercase for consistency
    const domain = emailId.split("@")[1].toLowerCase();

    // Default role is 'user', but change it if the email is not from common providers
    let role = "user";
    const commonEmailDomains = ["gmail.com", "outlook.com", "yahoo.com"];

    if (!commonEmailDomains.includes(domain)) {
      role = "admin"; // Assign 'admin' role to non-common email domains
    }

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      role: role,
    });
    const savedUser = await user.save();

    // Create the JWT token
    const token = await savedUser.getJWT();

    // Add the token to the cookie and send the response back to the user
    res.cookie("token", token);
    res.json({ message: "User added successfully", data: savedUser, token });
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
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
      res.status(200).json({ token, user });
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
