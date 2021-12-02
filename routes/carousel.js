import express from "express";
const router = express.Router();

import imageController from "../config/image.js";

import {
  getCarouselById,
  createCarousel,
  getACarousel,
  getAllCarousel,
  deleteCarousel,
  updateCarousel,
} from "../controllers/carousel.js";
import { isAdmin, isAuthenticated, isSignedIn } from "../controllers/auth.js";
import { getUserById } from "../controllers/user.js";

// params
router.param("userId", getUserById);
router.param("carouselId", getCarouselById);

// all routes
router.post(
  "/carousel/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  imageController.single("photo"),
  createCarousel
);

router.get("/carousels", getAllCarousel);

router.get("/carousel/:carouselId", getACarousel);

router.delete(
  "/delete/carousel/:carouselId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteCarousel
);

router.put(
  "/update/carousel/:carouselId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  imageController.single("photo"),
  updateCarousel
);

export default router;
