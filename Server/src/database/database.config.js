// Import the necessary modules from mongoose and bcrypt
import { connect, set } from "mongoose";
import bcrypt from "bcrypt";
// Import the models and sample data
import { userModel } from "../models/user.model.js";
import { foodModel } from "../models/food.model.js";
import { sample_foods, sample_users } from "../data.js";

// Define the number of salt rounds for bcrypt hashing
const SALT_ROUNDS_FOR_BCRYPT = 10;

// Set mongoose to use strict query mode
set("strictQuery", true);

// Function to connect to the database and seed data
export const dbconnect = async () => {
  try {
    // Connect to the MongoDB database using the URI from environment variables
    connect(process.env.MONGO_URI);
    console.log("Database connection successful");

    // Seed users and foods into the database
    await seedUsers();
    await seedFoods();
  } catch (error) {
    // Log any errors that occur during the connection or seeding process
    console.log(error);
  }
};

// Function to seed users
async function seedUsers() {
  // Check if users have already been seeded
  const usersCount = await userModel.countDocuments();
  if (usersCount > 0) {
    console.log("Users seed is already done");
    return;
  }

  // If not, hash the passwords and create new users
  for (let user of sample_users) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS_FOR_BCRYPT);
    await userModel.create(user);
  }
  console.log("Users seed is done");
}

// Function to seed food items
async function seedFoods() {
  try {
    // Check if food items have already been seeded
    const foodCount = await foodModel.countDocuments();
    if (foodCount > 0) {
      console.log("Food Items already seeded");
      return;
    }

    // If not, update image URLs and create new food items
    for (const food of sample_foods) {
      food.imageUrl = `/foods/${food.imageUrl}`;
      await foodModel.create(food);
    }
  } catch (error) {
    // Log any errors that occur during the seeding process
    console.log(error);
  }
}
