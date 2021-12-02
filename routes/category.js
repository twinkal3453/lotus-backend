import express from "express";
const router = express.Router();
import imageController from "../config/image.js";

import {
  getCategoryById,
  createCategory,
  getCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
} from "../controllers/category.js";
import { isAdmin, isAuthenticated, isSignedIn } from "../controllers/auth.js";
import { getUserById } from "../controllers/user.js";

// params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

// All actual routes
router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  imageController.single("photo"),
  createCategory
);

router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategories);

router.delete(
  "/delete/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteCategory
);

router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  imageController.single("photo"),
  updateCategory
);

export default router;
