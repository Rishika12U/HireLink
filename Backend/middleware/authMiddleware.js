import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Middleware to protect routes
export const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header is present and starts with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info to request
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Continue to route
    } catch (error) {
      console.error("Token error:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
