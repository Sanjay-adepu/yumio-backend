const jwt = require('jsonwebtoken');

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'].split(" ")[1]; // Extract token from the Authorization header

  if (!token) {
    return res.status(403).json({ success: false, message: 'No token provided' });
  }

  jwt.verify(token, 'yumio', (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Failed to authenticate token' });
    }

    req.user = decoded;  // Save the decoded user info for use in other routes
    next();
  });
};

module.exports = verifyToken;