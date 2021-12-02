import express from "express";
const router = express.Router();
import imageController from "../config/image.js";

import {
  getBrandById,
  createBrand,
  getBrand,
  getAllBrand,
  deleteBrand,
  updateBrand,
} from "../controllers/brand.js";
import { isAdmin, isAuthenticated, isSignedIn } from "../controllers/auth.js";
import { getUserById } from "../controllers/user.js";

// params
router.param("userId", getUserById);
router.param("brandId", getBrandById);

router.post(
  "/brand/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  imageController.single("photo"),
  createBrand
);

router.get("/brand/:brandId", getBrand);
router.get("/brands", getAllBrand);

router.delete(
  "/delete/brand/:brandId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteBrand
);

const next = (req, res, next) => {
  console.log("Twinkal");
  next();
};

router.put(
  "/update/brand/:brandId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  imageController.single("photo"),
  updateBrand
);

export default router;
