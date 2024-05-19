// Import the required modules
import express from "express"; // Express framework for creating the server
import cors from "cors"; // CORS middleware to allow cross-origin requests
import path from "path"; // Path module to work with file paths
import dotenv from "dotenv"; // Dotenv for loading environment variables
import { fileURLToPath } from "url"; // Convert URL to file path
import { dirname } from "path"; // Get directory name from a path

// Import routers for different resources
import foodRouter from "./routes/food.router.js";
import userRouter from "./routes/user.router.js";
import orderRouter from "./routes/order.router.js";
import uploadRouter from "./routes/upload.router.js";

// Import database connection function
import { dbconnect } from "./database/database.config.js";

// Load environment variables from .env file
dotenv.config();

// Connect to the database
dbconnect();

// Convert the current module URL to a file path and get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create an Express application
const app = express();

// Middleware to parse JSON and URL-encoded data in requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable all CORS requests
app.use(cors({ origin: "*" }));

// Set up routes for the API
app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);

// Serve static files from the 'public' directory
const publicFolder = path.join(__dirname, "public");
app.use(express.static(publicFolder));

// Serve the index.html file for any non-API GET requests
app.get("*", (req, res) => {
  const indexFilePath = path.join(publicFolder, "index.html");
  res.sendFile(indexFilePath);
});

// Start the server on the specified port
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running at port ${process.env.PORT || 3000}`);
});
