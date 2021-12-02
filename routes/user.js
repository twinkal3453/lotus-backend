import express from "express";
const router = express.Router();

import {
  getUser,
  getUserById,
  getAllUsers,
  updateUser,
  userPurchaseList,
} from "../controllers/user.js";
import { isSignedIn, isAuthenticated, isAdmin } from "../controllers/auth.js";

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

router.get("/users/:userId", isSignedIn, isAuthenticated, isAdmin, getAllUsers);

router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

router.get(
  "/orders/user/:userId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

export default router;
