const jwt = require("jsonwebtoken");

async function verifyAdmin(req, res, next) {
  const token = req.cookies.token;

  // If no token is provided, send a 401 Unauthorized response
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    // Verify the token asynchronously using jwt.verify wrapped with promisify
    const decoded = await jwt.verify(token, "DEV@Tinder$790");

    // Check if the decoded role is 'admin'
    if (decoded.role !== "admin") {
      return res.status(403).send("Forbidden");
    }

    // If everything is fine, proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Handle errors (invalid token, token expired, etc.)
    res.status(401).send("Unauthorized");
  }
}

module.exports = { verifyAdmin };
