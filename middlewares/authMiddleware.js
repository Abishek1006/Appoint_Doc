const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization token missing or malformed",
        success: false,
      });
    }
    
    const token = authHeader.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({
        message: "Token not found in Authorization header",
        success: false,
      });
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        let errorMessage = "Authentication failed";
        
        if (err.name === "TokenExpiredError") {
          errorMessage = "Token has expired";
        } else if (err.name === "JsonWebTokenError") {
          errorMessage = "Invalid token";
        } else if (err.name === "NotBeforeError") {
          errorMessage = "Token not active yet";
        }
        
        return res.status(401).json({
          message: errorMessage,
          success: false,
        });
      }
      
      req.body.userId = decoded.id;
      next();
    });
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};