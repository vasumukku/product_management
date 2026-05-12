const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {

  
  const token = req.headers.authorization;

  
  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  try {

    
    const decoded = jwt.verify(token, "secret_key");

    
    if (decoded.role !== "admin") {
      return res.status(403).json({
        message: "Admin only",
      });
    }

    
    req.user = decoded;

    next();

  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = adminMiddleware;