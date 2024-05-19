// Import the necessary modules and middleware
import { Router } from "express";
import asyncHandler from "express-async-handler";
import authenticateMiddleware from "../middlewares/auth.mid.js";
import { BAD_REQUEST, UNAUTHORIZED } from "../constants/httpStatus.js";
import { OrderModel } from "../models/order.model.js";
import { OrderStatus } from "../constants/orderStatus.js";
import { UserModel } from "../models/user.model.js";

// Create a new router object for handling routes
const router = Router();

// Apply the authentication middleware to all routes
router.use(authenticateMiddleware);

// Helper function to find a new order for the current user
const getNewOrderForCurrentUser = async (req) => {
  return await OrderModel.findOne({
    user: req.user.id,
    status: OrderStatus.NEW,
  }).populate("user");
};

// Route to create a new order
router.post(
  "/create",
  asyncHandler(async (req, res) => {
    const orderDetails = req.body;

    // Check if the order has items
    if (orderDetails.items.length === 0) {
      res.status(BAD_REQUEST).send("Your cart is empty.");
      return;
    }

    // Delete any existing new order for the user
    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });

    // Create a new order with the provided details
    const newOrder = new OrderModel({
      ...orderDetails,
      user: req.user.id,
    });

    // Save the new order to the database
    await newOrder.save();

    // Send back the new order details
    res.send(newOrder);
  })
);

// Route to mark an order as paid
router.put(
  "/pay",
  asyncHandler(async (req, res) => {
    const { paymentId } = req.body;

    // Get the user's new order
    const order = await getNewOrderForCurrentUser(req);

    // If no order is found, send an error
    if (!order) {
      res.status(BAD_REQUEST).send("Order not found.");
      return;
    }

    // Update the order with the payment ID and mark as paid
    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;

    // Save the updated order
    await order.save();

    // Send back the order ID
    res.send(order._id);
  })
);

// Route to track an order by ID
router.get(
  "/track/:orderId",
  asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const user = await UserModel.findById(req.user.id);

    // Set up the search filter
    const filter = { _id: orderId };

    // If the user is not an admin, restrict to their orders only
    if (!user.isAdmin) {
      filter.user = user._id;
    }

    // Find the order with the given ID
    const order = await OrderModel.findOne(filter);

    // If no order is found, send an unauthorized error
    if (!order) {
      res.status(UNAUTHORIZED).send("Unauthorized access.");
      return;
    }

    // Send back the order details
    res.send(order);
  })
);

// Route to get the new order for the current user
router.get(
  "/newOrderForCurrentUser",
  asyncHandler(async (req, res) => {
    const order = await getNewOrderForCurrentUser(req);

    // If an order is found, send it back
    if (order) {
      res.send(order);
    } else {
      // Otherwise, send an error
      res.status(BAD_REQUEST).send("No new orders found.");
    }
  })
);

// Route to get all possible order statuses
router.get("/allstatus", (req, res) => {
  const allStatuses = Object.values(OrderStatus);
  res.send(allStatuses);
});

// Route to get orders by status
router.get(
  "/:status?",
  asyncHandler(async (req, res) => {
    const { status } = req.params;
    const user = await UserModel.findById(req.user.id);

    // Set up the search filter
    const filter = {};

    // If the user is not an admin, restrict to their orders only
    if (!user.isAdmin) filter.user = user._id;

    // If a status is provided, add it to the filter
    if (status) filter.status = status;

    // Find and sort orders according to the filter
    const orders = await OrderModel.find(filter).sort("-createdAt");

    // Send back the found orders
    res.send(orders);
  })
);

// Export the router for use in other parts of the application
export default router;
