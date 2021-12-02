import express from "express";
const router = express.Router();
import { isSignedIn, isAuthenticated, isAdmin } from "../controllers/auth.js";
import { getUserById, pushOrderInPurchaseList } from "../controllers/user.js";
import { updateStock } from "../controllers/product.js";

import {
  getOrderById,
  createOrder,
  getAllOrders,
  updateStatus,
  getOrderStatus,
} from "../controllers/order.js";

// params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

// Actual routes

// create
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

// read
router.get(
  "/order/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

// status of order
router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);
router.put(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);

export default router;
