// Import the UNAUTHORIZED status constant
import { UNAUTHORIZED } from "../constants/httpStatus.js";
// Import the authentication middleware
import authMiddleware from "./auth.mid.js";

// Define the admin middleware
const adminMiddleware = (req, res, next) => {
  // Check if the user is an admin
  if (!req.user.isAdmin) {
    // If not, send an UNAUTHORIZED status response and stop further processing
    res
      .status(UNAUTHORIZED)
      .send("You are not authorized to perform this action.");
    return;
  }

  // If the user is an admin, continue to the next middleware or route handler
  return next();
};

// Export both the authentication and admin middlewares as an array
export default [authMiddleware, adminMiddleware];
