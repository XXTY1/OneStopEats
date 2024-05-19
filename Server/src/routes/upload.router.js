// Import necessary modules and middleware
import { Router } from "express";
import adminMiddleware from "../middlewares/admin.mid.js";
import multer from "multer";
import asyncHandler from "express-async-handler";
import { BAD_REQUEST } from "../constants/httpStatus.js";
import { configureCloudinary } from "../config/cloudinary.config.js";

// Create a new router object to handle routes
const router = Router();

// Set up multer for file uploads
const upload = multer();

// Define a POST route for image uploads
router.post(
  "/",
  adminMiddleware,
  upload.single("image"),
  asyncHandler(async (req, res) => {
    // Try to get the uploaded file from the request
    const file = req.file;

    // If no file is found, return a BAD_REQUEST status
    if (!file) {
      res.status(BAD_REQUEST).send("No image file provided.");
      return;
    }

    // If a file is found, try to upload it to Cloudinary
    try {
      const imageUrl = await uploadImageToCloudinary(file.buffer);
      res.send({ imageUrl });
    } catch (error) {
      res.status(BAD_REQUEST).send("Failed to upload image.");
    }
  })
);

// Function to upload an image buffer to Cloudinary
const uploadImageToCloudinary = async (imageBuffer) => {
  // Configure Cloudinary with settings from config file
  const cloudinary = configureCloudinary();

  // Return a promise that resolves with the image URL or rejects with an error
  return new Promise((resolve, reject) => {
    if (!imageBuffer) {
      reject("No image buffer provided.");
      return;
    }

    // Use Cloudinary's upload_stream method to upload the image buffer
    cloudinary.uploader
      .upload_stream((error, result) => {
        if (error || !result) {
          reject(error);
        } else {
          resolve(result.url);
        }
      })
      .end(imageBuffer);
  });
};

// Export the router to be used in other parts of the application
export default router;
