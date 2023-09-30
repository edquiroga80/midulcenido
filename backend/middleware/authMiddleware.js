import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read the JWT from cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Token no autorizado, falló el token");
    }
  } else {
    res.status(401);
    throw new Error("Token no autorizado");
  }
});

// Admin Middleware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin){
        next();
    } else {
        res.status(401);
        throw new Error('No autorizado como administrador');
    }
};

export { protect, admin };

