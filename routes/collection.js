import express from "express";
const router = express.Router();
import {
  getCollectionById,
  createCollection,
  getCollection,
  getAllCollections,
  updateCollection,
  removeCollection,
} from "../controllers/collection.js";
import { isAdmin, isAuthenticated, isSignedIn } from "../controllers/auth.js";
import { getUserById } from "../controllers/user.js";

// params
router.param("userId", getUserById);
router.param("collectionId", getCollectionById);

// Actual routes goes here
// Create
router.post(
  "/collection/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCollection
);

// get
router.get("/collection/:collectionId", getCollection);
router.get("/collections", getAllCollections);

// update
router.put(
  "/collection/:collectionId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCollection
);

// Delete
router.delete(
  "/collection/:collectionId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCollection
);

export default router;
