import express from "express";
const router = express.Router();

import {
  getRatingById,
  getAllRatings,
  getRating,
  createRatings,
  updateRatings,
  removeRatings,
} from "../controllers/ratings.js";
import { isSignedIn, isAuthenticated, isAdmin } from "../controllers/auth.js";
import { getUserById } from "../controllers/user.js";

// params
router.param("userId", getUserById);
router.param("ratingsId", getRatingById);

// Actual routes goes here
// Create
router.post("/rating/create", createRatings);

router.get("/rating/:ratingsId", getRating);
router.get("/ratings", getAllRatings);

router.put("/update/rating/:ratingsId/:userId", updateRatings);

router.delete(
  "/delete/rating/:ratingsId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeRatings
);

export default router;
