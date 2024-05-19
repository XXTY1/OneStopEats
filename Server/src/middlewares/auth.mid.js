// Import the necessary functions and constants
import pkg from "jsonwebtoken";
const { verify } = pkg; // Destructure the verify function from the jsonwebtoken package
import { UNAUTHORIZED } from "../constants/httpStatus.js"; // Import the UNAUTHORIZED status constant

// Define the middleware function
export default (req, res, next) => {
  // Retrieve the access token from the request headers
  const token = req.headers.access_token;

  // If there is no token, return an UNAUTHORIZED status response
  if (!token) {
    res.status(UNAUTHORIZED).send("Access token is required.");
    return;
  }

  // Try to verify the token
  try {
    // Decode the token using the secret key from environment variables
    const decoded = verify(token, process.env.JWT_SECRET);
    // Attach the decoded user information to the request object
    req.user = decoded;
  } catch (error) {
    // If token verification fails, return an UNAUTHORIZED status response
    res.status(UNAUTHORIZED).send("Invalid or expired access token.");
    return;
  }

  // If everything is okay, proceed to the next middleware or route handler
  return next();
};
