// Import the necessary modules and middleware
import { Router } from "express";
import { foodModel } from "../models/food.model.js";
import asyncHandler from "express-async-handler";
import adminMiddleware from "../middlewares/admin.mid.js";

// Create a new router object for handling routes
const router = Router();

// Route to get all food items
router.get(
  "/",
  asyncHandler(async (req, res) => {
    // Retrieve all food items from the database
    const foods = await foodModel.find({});
    // Send the list of food items back to the client
    res.send(foods);
  })
);

// Route to create a new food item
router.post(
  "/",
  adminMiddleware,
  asyncHandler(async (req, res) => {
    // Destructure the food item details from the request body
    const {
      name,
      price,
      tags,
      favorite,
      imageUrl,
      origins,
      cookTime,
      description,
    } = req.body;

    // Create a new food item using the provided details
    const food = new foodModel({
      name,
      price,
      // Convert tags and origins from a comma-separated string to an array, if necessary
      tags: tags.split ? tags.split(",") : tags,
      favorite,
      imageUrl,
      origins: origins.split ? origins.split(",") : origins,
      cookTime,
      description,
    });

    // Save the new food item to the database
    await food.save();

    // Send the newly created food item back to the client
    res.send(food);
  })
);

// Route to update an existing food item
router.put(
  "/",
  adminMiddleware,
  asyncHandler(async (req, res) => {
    // Destructure the updated details from the request body
    const {
      _id,
      name,
      price,
      tags,
      favorite,
      imageUrl,
      origins,
      cookTime,
      description,
    } = req.body;

    // Update the food item with the new details
    await foodModel.updateOne(
      { _id },
      {
        name,
        price,
        tags: tags.split ? tags.split(",") : tags,
        favorite,
        imageUrl,
        origins: origins.split ? origins.split(",") : origins,
        cookTime,
        description,
      }
    );

    // Send a confirmation response
    res.send("Food item updated successfully.");
  })
);

// Route to delete a food item
router.delete(
  "/:foodId",
  adminMiddleware,
  asyncHandler(async (req, res) => {
    // Get the food item ID from the request parameters
    const { foodId } = req.params;

    // Delete the food item from the database
    await foodModel.deleteOne({ _id: foodId });

    // Send a confirmation response
    res.send("Food item deleted successfully.");
  })
);

// Route to get food items by tags
router.get(
  "/tags",
  asyncHandler(async (req, res) => {
    // Aggregate the tags and count how many times each tag appears
    const tags = await foodModel.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $project: { _id: 0, name: "$_id", count: "$count" } },
    ]).sort({ count: -1 });

    // Add a 'All' tag that represents the total count of food items
    const all = { name: "All", count: await foodModel.countDocuments() };
    tags.unshift(all);

    // Send the list of tags back to the client
    res.send(tags);
  })
);

// Route to search for food items by name
router.get(
  "/search/:searchTerm",
  asyncHandler(async (req, res) => {
    // Get the search term from the request parameters
    const { searchTerm } = req.params;
    // Create a regex for case-insensitive search
    const searchRegex = new RegExp(searchTerm, "i");

    // Find food items that match the search term
    const foods = await foodModel.find({ name: { $regex: searchRegex } });
    // Send the matching food items back to the client
    res.send(foods);
  })
);

// Route to get food items by a specific tag
router.get(
  "/tags/:tag",
  asyncHandler(async (req, res) => {
    // Get the tag from the request parameters
    const { tag } = req.params;

    // Find food items that have the specified tag
    const foods = await foodModel.find({ tags: tag });
    // Send the food items back to the client
    res.send(foods);
  })
);

// Route to get a specific food item by ID
router.get(
  "/:foodId",
  asyncHandler(async (req, res) => {
    // Get the food item ID from the request parameters
    const { foodId } = req.params;

    // Find the food item by its ID
    const food = await foodModel.findById(foodId);
    // Send the food item back to the client
    res.send(food);
  })
);

// Export the router for use in other parts of the application
export default router;
