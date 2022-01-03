import express from "express";
const router = express.Router();
import imageController from "../config/image.js";

import {
  getProductById,
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  delteProduct,
  getAllUniqueCategories,
  getAllUniqueCollections,
} from "../controllers/product.js";
import { isAdmin, isAuthenticated, isSignedIn } from "../controllers/auth.js";
import { getUserById } from "../controllers/user.js";

// params
router.param("userId", getUserById);
router.param("productId", getProductById);

// All actual routes
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  imageController.array("photos", 12),
  createProduct
);

router.get("/product/:productId", getProduct);

router.get("/products", getAllProducts);

router.put(
  "/product/update/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  imageController.array("photos", 12),
  updateProduct
);

router.delete(
  "/product/delete/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  delteProduct
);

router.get("/products/categories", getAllUniqueCategories);
router.get("/products/collections", getAllUniqueCollections);

export default router;
