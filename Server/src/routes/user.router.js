// Import the necessary modules and middleware
import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/user.model.js";

// import { UserModel } from "../models/user.model.js";
import authMiddleware from "../middlewares/auth.mid.js";
import adminMiddleware from "../middlewares/admin.mid.js";
import { BAD_REQUEST } from "../constants/httpStatus.js";

// Define the number of rounds to use for password hashing
const PASSWORD_HASH_SALT_ROUNDS = 10;

// Create a new router object for handling routes
const router = Router();

// Route to handle user login
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    // Extract email and password from request body
    const { email, password } = req.body;
    // Find the user by email
    const user = await UserModel.findOne({ email });

    // If user is found and password is correct, send a token response
    if (user && (await bcrypt.compare(password, user.password))) {
      res.send(generateTokenResponse(user));
      return;
    }

    // If login fails, send a bad request response
    res.status(BAD_REQUEST).send("Username or password is invalid");
  })
);

// Route to handle user registration
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    // Extract user details from request body
    const { name, email, password, address } = req.body;
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      res.status(BAD_REQUEST).send("User already exists, please login!");
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(
      password,
      PASSWORD_HASH_SALT_ROUNDS
    );

    // Create a new user object
    const newUser = new UserModel({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      address,
    });

    // Save the new user and send a token response
    const result = await newUser.save();
    res.send(generateTokenResponse(result));
  })
);

// Route to update user profile
router.put(
  "/updateProfile",
  authMiddleware,
  asyncHandler(async (req, res) => {
    // Extract updated details from request body
    const { name, address } = req.body;
    // Update the user's profile
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user.id,
      { name, address },
      { new: true }
    );

    // Send a token response with updated user info
    res.send(generateTokenResponse(updatedUser));
  })
);

// Route to change user password
router.put(
  "/changePassword",
  authMiddleware,
  asyncHandler(async (req, res) => {
    // Extract current and new passwords from request body
    const { currentPassword, newPassword } = req.body;
    // Find the user by ID
    const user = await UserModel.findById(req.user.id);

    if (!user) {
      res.status(BAD_REQUEST).send("Change Password Failed!");
      return;
    }

    // Compare the current password with the stored hash
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordCorrect) {
      res.status(BAD_REQUEST).send("Current Password Is Not Correct!");
      return;
    }

    // Hash the new password and update the user's password
    user.password = await bcrypt.hash(newPassword, PASSWORD_HASH_SALT_ROUNDS);
    await user.save();

    // Send a confirmation response
    res.send("Password changed successfully.");
  })
);

// Admin route to get all users with optional search term
router.get(
  "/getall/:searchTerm?",
  adminMiddleware,
  asyncHandler(async (req, res) => {
    // Extract search term from request parameters
    const { searchTerm } = req.params;
    // Create a filter based on the search term
    const filter = searchTerm
      ? { name: { $regex: new RegExp(searchTerm, "i") } }
      : {};

    // Find users matching the filter without returning passwords
    const users = await UserModel.find(filter, { password: 0 });
    // Send the list of users back to the client
    res.send(users);
  })
);

// Admin route to toggle user block status
router.put(
  "/toggleBlock/:userId",
  adminMiddleware,
  asyncHandler(async (req, res) => {
    // Extract user ID from request parameters
    const { userId } = req.params;

    if (userId === req.user.id) {
      res.status(BAD_REQUEST).send("Can't block yourself!");
      return;
    }

    // Find the user and toggle the block status
    const user = await UserModel.findById(userId);
    user.isBlocked = !user.isBlocked;
    await user.save();

    // Send the new block status back to the client
    res.send(`User block status: ${user.isBlocked}`);
  })
);

// Admin route to get user by ID
router.get(
  "/getById/:userId",
  adminMiddleware,
  asyncHandler(async (req, res) => {
    // Extract user ID from request parameters
    const { userId } = req.params;
    // Find the user without returning the password
    const user = await UserModel.findById(userId, { password: 0 });
    // Send the user details back to the client
    res.send(user);
  })
);

// Admin route to update user details
router.put(
  "/update",
  adminMiddleware,
  asyncHandler(async (req, res) => {
    // Extract updated user details from request body
    const { _id, name, email, address, isAdmin } = req.body;
    // Update the user with the new details
    await UserModel.findByIdAndUpdate(_id, { name, email, address, isAdmin });
    // Send a confirmation response
    res.send("User updated successfully.");
  })
);

// Function to generate a token response for a user
const generateTokenResponse = (user) => {
  // Sign a new JWT token with user details
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  // Return user details along with the token
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token,
  };
};

// Export the router for use in other parts of the application
export default router;
